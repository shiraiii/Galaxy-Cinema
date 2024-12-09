import React, { useContext, useMemo, useState } from "react";
import Select from "react-dropdown-select";
import { useNavigate } from "react-router-dom";
import "./buysection.css";
import AppContext from "../../../context/AppContext";
import "./buysection.css";
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import dayjs from "dayjs";
import "dayjs/locale/vi";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";

dayjs.extend(isSameOrAfter);

const Buysection = () => {
  const { movies, cinemas, showtimes, setShowLoginModal, setRedirectPath } =
    useContext(AppContext);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [selectedCinema, setSelectedCinema] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedShowtime, setSelectedShowtime] = useState(null);
  const [filteredCinemas, setFilteredCinemas] = useState([]);
  const [filteredShowtimes, setFilteredShowtimes] = useState([]);
  const [filteredDays, setFilteredDays] = useState([]);

  const navigate = useNavigate();
  const dataString = sessionStorage.getItem("userInfo");
  const data = JSON.parse(dataString);
  const today = dayjs().startOf("day");

  const movieOptions =
    movies?.map((movie) => ({
      value: movie?._id || "",
      label: movie?.movieName || "Unnamed Movie",
    })) || [];

  const handleMovieSelect = (selected) => {
    const movieId = selected[0]?.value;
    setSelectedMovie(movieId);

    const cinemasForMovie = showtimes
      .filter((showtime) => showtime.movieId === movieId)
      .map((showtime) => showtime.cinemaId);
    const cinemasForSelectedMovie = cinemas.filter((cinema) =>
      cinemasForMovie.some((cinemaId) => cinema._id === cinemaId)
    );

    setFilteredCinemas(
      cinemasForSelectedMovie?.map((cinema) => ({
        value: cinema._id || "",
        label: cinema.name || "",
      })) || []
    );
    setFilteredShowtimes([]);
    setFilteredDays([]);
    setSelectedCinema(null);
  };

  const isWithinNext3Days = (date) => {
    const today = new Date();
    const targetDate = new Date(date);
    const next3Days = new Date(today);
    next3Days.setDate(today.getDate() + 2);

    return targetDate >= today && targetDate <= next3Days;
  };

  const handleCinemaSelect = (selected) => {
    const cinemaId = selected[0]?.value;
    setSelectedCinema(cinemaId);

    const showtimesForCinema = showtimes.filter(
      (showtime) =>
        showtime.movieId === selectedMovie && showtime.cinemaId === cinemaId
    );

    const formattedDays = showtimesForCinema
      .map((showtime) => {
        const date = new Date(showtime.startDate);

        if (!isWithinNext3Days(date)) {
          return null;
        }

        const weekday = format(date, "iiii", { locale: vi });
        const formattedDate = format(date, "dd/MM/yyyy");

        return {
          value: showtime._id || "",
          label: `${weekday}, ${formattedDate}`,
        };
      })
      .filter(Boolean);

    setFilteredDays(formattedDays);
    setFilteredShowtimes([]);
  };

  const getDatesInRange = (start, end) => {
    const startDate = dayjs(start).startOf("day");
    const endDate = dayjs(end).startOf("day");
    const dateRange = [];
    let currentDate = startDate.isBefore(today) ? today : startDate;

    while (
      currentDate.isBefore(endDate) ||
      currentDate.isSame(endDate, "day")
    ) {
      dateRange.push(currentDate.format("YYYY-MM-DD"));
      currentDate = currentDate.add(1, "day");
    }
    return dateRange;
  };

  const groupedShowtimes = showtimes
    .filter((showtime) => {
      const showtimeDate = dayjs(showtime.date).tz("Asia/Ho_Chi_Minh");
      return showtimeDate.isAfter(today) || showtimeDate.isSame(today, "day");
    })
    .reduce((acc, showtime) => {
      const startDate = dayjs(showtime.startDate);
      const endDate = dayjs(showtime.endDate);
      const datesInRange = getDatesInRange(startDate, endDate);

      datesInRange.forEach((date) => {
        if (!acc[date]) {
          acc[date] = {
            date: date,
            showtimes: [],
          };
        }
        acc[date].showtimes.push(showtime);
      });

      return acc;
    }, {});

  const availableDates = useMemo(() => {
    return Object.keys(groupedShowtimes)
      .filter((date) => {
        const dateObj = dayjs(date);
        return (
          dateObj.isSameOrAfter(today) && dateObj.isBefore(today.add(4, "day"))
        );
      })
      .map((date) => {
        const dayOfWeek = dayjs(date).locale("vi").format("dddd");
        const formattedDate = dayjs(date).format("DD/MM/YYYY");

        return {
          value: date,
          label: `${dayOfWeek}, ${formattedDate}`,
        };
      });
  }, [groupedShowtimes, today]);

  const handleDaySelect = (selected) => {
    const selectedDayId = selected[0]?.value;

    if (!selectedDayId) {
      console.log("No day selected");
      setFilteredShowtimes([]);
      setSelectedShowtime(null);
      return;
    }

    if (selectedDayId) {
      setSelectedDate(dayjs(selectedDayId));
    }

    const selectedDay = dayjs(selectedDayId).local();

    const showtimesForDay = showtimes.filter((showtime) => {
      const showtimeStartDate = dayjs(showtime.startDate).local();
      const showtimeEndDate = dayjs(showtime.endDate).local();

      if (!showtimeStartDate.isValid() || !showtimeEndDate.isValid()) {
        return false;
      }

      return (
        showtime.movieId === selectedMovie &&
        showtime.cinemaId === selectedCinema &&
        selectedDay.isBetween(showtimeStartDate, showtimeEndDate, "day", "[]")
      );
    });

    const formattedShowtimes = showtimesForDay
      .map((showtime) => {
        const formattedTime = dayjs(
          `${selectedDay.format("YYYY-MM-DD")}T${showtime.startAt}`
        );

        if (!formattedTime.isValid()) {
          console.log("Invalid startAt for showtime:", showtime.startAt);
          return null; // Skip invalid time
        }

        return {
          value: showtime._id || "",
          label: formattedTime.format("HH:mm"),
        };
      })
      .filter(Boolean);

    setFilteredShowtimes(formattedShowtimes);
    setSelectedShowtime(null);
  };

  const handleShowtimeSelect = (selected) => {
    if (!selected || selected.length === 0) {
      if (filteredShowtimes.length > 0) {
        const defaultIndex = 0;
        const defaultShowtime = filteredShowtimes[defaultIndex];
        setSelectedShowtime(defaultShowtime);
      } else {
        setSelectedShowtime(null);
      }
    } else {
      const showtimeId = selected[0]?.value;
      const selectedShowtime = filteredShowtimes.find(
        (showtime) => showtime.value === showtimeId
      );

      if (selectedShowtime) {
        setSelectedShowtime(selectedShowtime);
      } else {
        setSelectedShowtime(null);
      }
    }
  };

  const bookingMovie = (movieId, cinemaId, showtime, date) => {
    const url = `/dat-ve/${movieId}?date=${encodeURIComponent(
      date
    )}&cinema=${encodeURIComponent(cinemaId)}&showtime=${showtime}`;
    if (data?.token) {
      navigate(url);
    } else {
      if (setRedirectPath) {
        setRedirectPath(url);
        setShowLoginModal(true);
      } else {
        console.error("setRedirectPath not found");
      }
    }
  };

  return (
    <div className="quick-buy hidden screen1200:grid absolute z-[500] grid-cols-11 max-w-6xl h-14 w-full shadow-2xl bg-white rounded left-2/4 bottom-14 translate-y-1/2 -translate-x-2/4 ">
      <div className="relative h-full col-span-3">
        <span className="number absolute bg-[#f58020] text-[10px] text-white font-bold px-1.5 py-0.5 rounded-full top-2/4 left-[3%] translate-x-[3%] -translate-y-[50%] ">
          1
        </span>
        <Select
          placeholder="Chọn phim"
          onChange={handleMovieSelect}
          options={movieOptions}
        />
      </div>
      <div className="relative h-full col-span-2">
        <span className="number absolute bg-[#f58020] text-[10px] text-white font-bold px-1.5 py-0.5 rounded-full top-2/4 left-[3%] translate-x-[3%] -translate-y-[50%] ">
          2
        </span>
        <Select
          placeholder="Chọn Rạp"
          options={filteredCinemas}
          onChange={handleCinemaSelect}
          disabled={!selectedMovie}
        />
      </div>
      <div className="relative h-full col-span-2">
        <span className="number absolute bg-[#f58020] text-[10px] text-white font-bold px-1.5 py-0.5 rounded-full top-2/4 left-[3%] translate-x-[3%] -translate-y-[50%] ">
          3
        </span>
        <Select
          placeholder="Chọn Ngày"
          onChange={handleDaySelect}
          disabled={!selectedCinema}
          options={availableDates}
        />
      </div>
      <div className="relative h-full col-span-2">
        <span className="number absolute bg-[#f58020] text-[10px] text-white font-bold px-1.5 py-0.5 rounded-full top-2/4 left-[3%] translate-x-[3%] -translate-y-[50%] ">
          4
        </span>
        <Select
          placeholder="Chọn Suất"
          onChange={handleShowtimeSelect}
          disabled={!selectedDate || !filteredShowtimes.length}
          options={filteredShowtimes}
        />
      </div>
      <div className="relative h-full col-span-2">
        <button
          className="bg-primary w-full h-full rounded-sm"
          disabled={
            !(
              selectedMovie &&
              selectedCinema &&
              selectedDate &&
              selectedShowtime
            )
          }
          onClick={() => {
            if (
              selectedMovie &&
              selectedCinema &&
              selectedShowtime !== undefined
            ) {
              bookingMovie(
                selectedMovie,
                selectedCinema,
                selectedShowtime.label,
                selectedDate
              );
            } else {
              console.error("Cannot proceed: Ensure all selections are made");
            }
          }}
        >
          Mua vé nhanh
        </button>
      </div>
    </div>
  );
};

export default Buysection;
