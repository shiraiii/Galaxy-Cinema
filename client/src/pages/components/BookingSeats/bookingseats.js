import dayjs from "dayjs";
import React, { useMemo, useEffect, useState, useContext, memo } from "react";
import { useParams, useLocation } from "react-router-dom";
import BookingSeatSummary from "./BookingSeats-summary";
import AppContext from "../../../context/AppContext";
import axios from "axios";
import Seats from "./Seats";
import BookingSeatProgress from "./bookingseats-progress";
import BookingPaymentMethod from "../Booking/Booking-paymentMethod";

const BookingSeats = () => {
  const [showtimes, setShowtimes] = useState([]);
  const [movies, setMovies] = useState([]);
  const [cinemas, setCinemas] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedShowtime, setSelectedShowtime] = useState(null);
  const [selectedCinemaId, setSelectedCinemaId] = useState("");
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [total, setTotal] = useState(0);
  const [bookedSeats, setBookedSeats] = useState([]);
  const [activeTab, setActiveTab] = useState(1);

  const {
    setShowLoginModal,
    setShowModal,
    setOverSeats,
    SEATLIMIT,
    setShowEmptySeatModal,
  } = useContext(AppContext);

  const { id } = useParams();
  const location = useLocation();

  const query = new URLSearchParams(location.search);
  const initialDate = query.get("date");
  const initialCinemaId = query.get("cinema");
  const initialTime = query.get("showtime");

  useEffect(() => {
    setSelectedDate(initialDate);
    setSelectedCinemaId(initialCinemaId);
    setSelectedShowtime(initialTime);
  }, [initialDate, initialCinemaId, initialTime]);

  useEffect(() => {
    fetch("http://localhost:5000/api/v1/movie/getMovie/" + id)
      .then((res) => res.json())
      .then((data) => setMovies(data))
      .catch((err) => console.error("Error fetching movie: ", err));
  }, [id]);

  useEffect(() => {
    fetch(`http://localhost:5000/api/v1/showtime/getShowtime/${id}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok " + res.statusText);
        }
        return res.json();
      })
      .then((data) => {
        setShowtimes(Array.isArray(data) ? data : []);
      })
      .catch((err) => console.error("Error fetching showtimes: ", err));
  }, [id]);

  useEffect(() => {
    if (selectedCinemaId) {
      fetch(`http://localhost:5000/api/v1/cinema/getCinema/${selectedCinemaId}`)
        .then((res) => res.json())
        .then((data) => setCinemas(data))
        .catch((err) => console.error("Error fetching cinema: ", err));
    }
  }, [selectedCinemaId]);

  useEffect(() => {
    const fetchBookedSeats = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/v1/reservation/getBookedSeats`,
          { params: { selectedCinemaId, selectedDate, id, selectedShowtime } }
        );
        setBookedSeats(response.data.bookedSeats);
      } catch (err) {
        console.error("Error fetching booked seats: ", err);
      }
    };
    fetchBookedSeats();
  }, [selectedCinemaId, selectedDate, id, selectedShowtime]);

  const isSeatBooked = (row, number) => {
    return bookedSeats.some(
      (seat) => seat.rowLetter === row && seat.seatNumber === number
    );
  };

  const filteredShowtimes = useMemo(() => {
    return showtimes.filter((showtime) => {
      const showtimeStartDate = dayjs(showtime.startDate, "YYYY-MM-DD");
      const showtimeEndDate = dayjs(showtime.endDate, "YYYY-MM-DD");
      const selectedDateObj = dayjs(selectedDate, "YYYY-MM-DD");
      return (
        selectedDateObj.isBetween(
          showtimeStartDate,
          showtimeEndDate,
          null,
          "[]"
        ) && showtime.cinemaId === selectedCinemaId
      );
    });
  }, [showtimes, selectedDate, selectedCinemaId]);

  const handleSeatClick = (
    rowLetter,
    seatNumber,
    uniqueSeatId,
    ticketPrice
  ) => {
    setSelectedSeats((prevSelectedSeats) => {
      const isSeatSelected = prevSelectedSeats.some(
        (seat) => seat.uniqueSeatId === uniqueSeatId
      );

      if (!isSeatSelected && prevSelectedSeats.length >= SEATLIMIT) {
        setShowModal(true);
        setShowLoginModal(false);
        setOverSeats(true);
        return prevSelectedSeats;
      }

      const newSelectedSeats = isSeatSelected
        ? prevSelectedSeats.filter((seat) => seat.uniqueSeatId !== uniqueSeatId)
        : [
            ...prevSelectedSeats,
            { rowLetter, seatNumber, uniqueSeatId, ticketPrice },
          ];

      const newTotal = newSelectedSeats.reduce(
        (sum, seat) => sum + seat.ticketPrice,
        0
      );

      setTotal(newTotal);

      return newSelectedSeats;
    });
  };

  const alphabets = "ABCDEFGHIJKLMNOPQRSTUVWXYZ ".split("");

  const handleShowtimeClick = (showtime) => {
    setSelectedShowtime(showtime);
    setSelectedSeats([]);
  };

  return (
    <>
      <BookingSeatProgress activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="md:container md:mx-auto screen1390:max-w-screen-xl xl:max-w-screen-screen1200 lg:max-w-4xl md:px-0 sm:px-[45px] grid xl:grid-cols-3 grid-cols-1 ">
        {activeTab === 1 && (
          <Seats
            filteredShowtimes={filteredShowtimes}
            selectedShowtime={selectedShowtime}
            handleShowtimeClick={handleShowtimeClick}
            cinemas={cinemas}
            alphabets={alphabets}
            handleSeatClick={handleSeatClick}
            isSeatBooked={isSeatBooked}
            selectedSeats={selectedSeats}
          ></Seats>
        )}
        {activeTab === 2 && <BookingPaymentMethod />}
        <BookingSeatSummary
          cinemas={cinemas}
          movies={movies}
          time={selectedShowtime}
          date={selectedDate}
          total={total}
          selectedSeats={selectedSeats}
          setShowEmptySeatModal={setShowEmptySeatModal}
          setActiveTab={setActiveTab}
          activeTab={activeTab}
        ></BookingSeatSummary>
      </div>
    </>
  );
};

export default memo(BookingSeats);
