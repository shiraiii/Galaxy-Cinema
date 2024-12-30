const { default: mongoose } = require("mongoose");
const Reservation = require("../models/reservation");
const generateQR = require("../utils/generateQRCode");
const userModel = require("../models/User");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

//Global variables
const currency = "vnd";

//Gateway initialize

const createReservation = async (req, res, next) => {
  try {
    const { cinemaId, movieId, ...reservationData } = req.body;

    const requiredFields = [
      "seats",
      "date",
      "startAt",
      "ticketPrice",
      "userId",
      "username",
      "phone",
    ];
    for (const field of requiredFields) {
      if (!req.body[field]) {
        return res.status(400).send({ error: `${field} is required` });
      }
    }

    const movie = await mongoose.model("Movie").findById(movieId);
    const cinema = await mongoose.model("Cinema").findById(cinemaId);

    if (!cinema) return res.status(404).send({ error: "Cinema not found" });
    if (!movie) return res.status(404).send({ error: "Movie not found" });

    if (
      !Array.isArray(reservationData.seats) ||
      reservationData.seats.some((seat) => !seat.rowLetter || !seat.seatNumber)
    ) {
      return res.status(400).send({ error: "Invalid seat data" });
    }

    const reservation = new Reservation({
      ...reservationData,
      movieId,
      cinemaId,
    });

    await reservation.save();

    const populatedReservation = await Reservation.findById(reservation._id)
      .populate("movieId", "movieName")
      .populate("cinemaId", "name");

    const qrcodedata = {
      id: reservation._id,
    };

    const qrCodeDataURL = await generateQR(JSON.stringify(qrcodedata));
    reservation.qrCode = qrCodeDataURL;
    await reservation.save();
    res
      .status(201)
      .send({ reservation: populatedReservation, qrCode: qrCodeDataURL });
  } catch (err) {
    next(err);
  }
};

const createStripe = async (req, res, next) => {
  try {
    const { cinemaId, movieId, ...reservationData } = req.body;
    const { origin } = req.headers;

    const requiredFields = [
      "seats",
      "date",
      "startAt",
      "ticketPrice",
      "userId",
      "username",
      "phone",
    ];
    for (const field of requiredFields) {
      if (!req.body[field]) {
        return res.status(400).send({ error: `${field} is required` });
      }
    }

    // Populate cinema and movie details
    const cinema = await mongoose
      .model("Cinema")
      .findById(cinemaId)
      .select("name");
    const movie = await mongoose
      .model("Movie")
      .findById(movieId)
      .select("movieName");

    if (!cinema) return res.status(404).send({ error: "Cinema not found" });
    if (!movie) return res.status(404).send({ error: "Movie not found" });

    const reservation = new Reservation({
      ...reservationData,
      movieId,
      cinemaId,
    });

    const qrCodeData = {
      id: reservation._id,
    };

    // Generate QR code
    const qrCodeDataURL = await generateQR(JSON.stringify(qrCodeData));

    reservation.qrCode = qrCodeDataURL;
    await reservation.save();

    const line_items = [
      {
        price_data: {
          currency: currency,
          product_data: {
            name:
              `${movie.movieName} at ${cinema.name}, Seats: ` +
              reservation.seats
                .map((seat) => `Row ${seat.rowLetter}, Seat ${seat.seatNumber}`)
                .join(", "),
          },
          unit_amount: reservation.total,
        },
        quantity: 1,
      },
    ];

    const session = await stripe.checkout.sessions.create({
      success_url: `${origin}/verify?success=true&reservationId=${reservation._id}`,
      cancel_url: `${origin}/verify?success=false&reservationId=${reservation._id}`,
      line_items,
      mode: "payment",
    });

    res.json({ success: true, session_url: session.url });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const verifyStripe = async (req, res, next) => {
  const { reservationId, success } = req.body;

  if (!reservationId || !success) {
    return res
      .status(400)
      .json({ message: "Missing reservationId or success" });
  }

  try {
    const reservation = await Reservation.findById(reservationId)
      .populate("movieId", "movieName")
      .populate("cinemaId", "name");

    if (!reservation) {
      return res.status(404).json({ message: "Reservation not found" });
    }

    if (success === "true") {
      // Update reservation status to 'checkin: true' upon successful payment
      await Reservation.findByIdAndUpdate(reservationId, { checkin: true });

      // Generate QR code data

      res.json({
        success: true,
      });
    } else {
      // If payment failed, delete the reservation
      await Reservation.findByIdAndDelete(reservationId);
      res.json({ success: false });
    }
  } catch (err) {
    console.log(err);
    next(err);
  }
};

const getAllReservation = async (req, res, next) => {
  try {
    const reservation = await Reservation.find({});
    res.send(reservation);
  } catch (err) {
    next(err);
  }
};

const getReservation = async (req, res, next) => {
  const _id = req.params.id;
  try {
    const reservation = await Reservation.findById(_id);
    if (!reservation)
      return res.status(404).send({ error: "Reservation not found" });
    else {
      const qrCodeData = {
        id: reservation._id,
      };

      // Generate QR code
      const qrCodeDataURL = await generateQR(JSON.stringify(qrCodeData));
    }
    return res.json({ reservation, qrCode: qrCodeDataURL });
  } catch (err) {
    res.status(400).send(err);
    next(err);
  }
};

const getReservationByUserId = async (req, res, next) => {
  const { userId } = req.params;

  try {
    // Find all reservations for the user
    const reservations = await Reservation.find({ userId });

    // Get all movie IDs and cinema IDs from the reservations
    const movieIds = [...new Set(reservations.map((res) => res.movieId))]; // Unique movie IDs
    const cinemaIds = [...new Set(reservations.map((res) => res.cinemaId))]; // Unique cinema IDs

    // Batch query all movies and cinemas
    const movies = await mongoose
      .model("Movie")
      .find({ _id: { $in: movieIds } });
    const cinemas = await mongoose
      .model("Cinema")
      .find({ _id: { $in: cinemaIds } });

    // Create a map for faster lookup
    const movieMap = movies.reduce((map, movie) => {
      map[movie._id] = { movieName: movie.movieName, movieImg: movie.movieImg };
      return map;
    }, {});

    const cinemaMap = cinemas.reduce((map, cinema) => {
      map[cinema._id] = cinema.name;
      return map;
    }, {});

    // Map reservations to include movieName, movieImg, and cinemaName
    const reservationData = reservations.map((reservation) => ({
      ...reservation._doc,
      movieName: movieMap[reservation.movieId]?.movieName,
      movieImg: movieMap[reservation.movieId]?.movieImg,
      ageLimit: movieMap[reservation.movieId]?.ageLimit,
      cinemaName: cinemaMap[reservation.cinemaId],
    }));

    const qrCodeData = {
      id: reservations._id,
    };

    // Generate QR code
    const qrCodeDataURL = await generateQR(JSON.stringify(qrCodeData));

    res.status(200).json({
      success: true,
      reservation: reservationData,
      qrCode: qrCodeDataURL,
    });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
    next(err);
  }
};
const updateReservation = async (req, res, next) => {
  const _id = req.params.id;
  const updates = Object.keys(req.body);
  const allowedUpdates = [
    "date",
    "startAt",
    "seats",
    "ticketPrice",
    "total",
    "username",
    "phone",
    "checkin",
  ];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation)
    return res.status(400).send({ error: "invalid updates!" });

  try {
    const reservation = await Reservation.findById(_id);
    if (!reservation)
      return res.sendStatus(404).send({ error: "Reservation not found" });

    updates.forEach((update) => (reservation[update] = req.body[update]));
    await reservation.save();

    res.send(reservation);
  } catch (err) {
    return res.status(400).send(err);
    next(err);
  }
};

const deleteReservation = async (req, res, next) => {
  const _id = req.params.id;
  try {
    const reservation = await Reservation.findByIdAndDelete(_id);
    if (!reservation)
      return res.sendStatus(404).send({ error: "Reservation not found" });
    return res.send(reservation);
  } catch (err) {
    return res.sendStatus(400);
    next(err);
  }
};

const getBookedSeats = async (req, res) => {
  const { selectedCinemaId, selectedDate, id, selectedShowtime } = req.query;

  try {
    const date = new Date(selectedDate);
    const startOfDay = new Date(date.setHours(0, 0, 0, 0));
    const endOfDay = new Date(date.setHours(23, 59, 59, 999));
    const reservation = await Reservation.find({
      cinemaId: selectedCinemaId,
      movieId: id,
      startAt: selectedShowtime,
      date: { $gte: startOfDay.toISOString(), $lte: endOfDay.toISOString() },
    }).select("seats -_id");

    const bookedSeats = reservation.flatMap((reservation) => reservation.seats);
    res.status(200).json({ bookedSeats });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Error fetching booked seats", error });
  }
};

const revenue = async (req, res) => {
  try {
    const revenueData = await Reservation.aggregate([
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$date" } },
          totalRevenue: { $sum: "$total" },
        },
      },
      {
        $sort: { _id: 1 },
      },
    ]);
    res.status(200).json(revenueData);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch revenue data" });
  }
};

const totalInMonth = async (req, res) => {
  try {
    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth();

    const revenue = await Reservation.aggregate([
      {
        $match: {
          createdAt: {
            $gte: new Date(currentYear, currentMonth, 1),
            $lt: new Date(currentYear, currentMonth + 1, 1),
          },
        },
      },
      {
        $group: {
          _id: null,
          totalRevenue: {
            $sum: {
              $multiply: ["$ticketPrice", { $size: "$seats" }],
            },
          },
        },
      },
    ]);

    res.status(200).json(revenue[0]?.totalRevenue || 0);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  createReservation,
  getAllReservation,
  getReservation,
  updateReservation,
  deleteReservation,
  getBookedSeats,
  revenue,
  totalInMonth,
  createStripe,
  verifyStripe,
  getReservationByUserId,
};
