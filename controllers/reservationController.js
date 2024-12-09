const { format } = require("path-browserify");
const Reservation = require("../models/reservation");
const generateQR = require("../utils/generateQRCode");

const createReservation = async (req, res, next) => {
  try {
    const reservation = new Reservation(req.body);
    await reservation.save();

    const QRCode = await generateQR(reservation._id);

    res.status(201).send({ reservation, QRCode });
  } catch (err) {
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
    if (!reservation) return res.sendStatus(404);
    return res.send(reservation);
  } catch (err) {
    res.status(400).send(err);
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
    if (!selectedDate || isNaN(new Date(selectedDate))) {
      return res
        .status(400)
        .json({ message: "Invalid or missing selectedDate " });
    }
    const date = new Date(selectedDate);
    const formattedDate = date.toISOString();
    const reservation = await Reservation.find({
      cinemaId: selectedCinemaId,
      date: formattedDate,
      movieId: id,
      startAt: selectedShowtime,
    }).select("seats -_id");

    if (reservation.length === 0) {
      return res.status(200).json({ bookedSeats: [] });
    }

    const bookedSeats = reservation.flatMap((reservation) => reservation.seats);
    res.status(200).json({ bookedSeats });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Error fetching booked seats", error });
  }
};

module.exports = {
  createReservation,
  getAllReservation,
  getReservation,
  updateReservation,
  deleteReservation,
  getBookedSeats,
};
