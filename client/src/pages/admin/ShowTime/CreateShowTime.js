import React, { useState, useEffect, useContext } from "react";
import { TextField, MenuItem } from "@mui/material";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import AppContext from "../../../context/AppContext";

dayjs.extend(utc);
dayjs.extend(timezone);

const CreateShowTime = () => {
  const [userInput, setUserInput] = useState({
    startAt: "",
    startDate: null,
    endDate: null,
    movieId: "",
    cinemaId: "",
  });

  const { token, navigate } = useContext(AppContext);
  const [movies, setMovies] = useState([]);
  const [cinemas, setCienmas] = useState([]);

  const today = dayjs()
    .tz("Asia/Ho_Chi_Minh")
    .startOf("day")
    .format("YYYY-MM-DD");

  const nowShowing = movies.filter((movie) => {
    const releaseDate = dayjs(movie.releaseDate)
      .tz("Asia/Ho_Chi_Minh")
      .startOf("day")
      .format("YYYY-MM-DD");

    const endDate = dayjs(movie.endDate)
      .tz("Asia/Ho_Chi_Minh")
      .startOf("day")
      .format("YYYY-MM-DD");

    return releaseDate <= today && endDate >= today;
  });
  const onChangeHandle = (e) => {
    setUserInput({ ...userInput, [e.target.name]: e.target.value });
    console.log(userInput);
  };
  const handleDateChange = (date, field) => {
    setUserInput({ ...userInput, [field]: date });
  };
  const selectedMovie = movies.find((movie) => movie._id === userInput.movieId);
  const maxDate = selectedMovie ? dayjs(selectedMovie.endDate) : null;

  useEffect(() => {
    const fetchMovieAndCinema = async () => {
      try {
        const movieResponse = await axios.get(
          "http://localhost:5000/api/v1/movie/getAllMovie",
          { headers: { Authorization: `Bearer ${token}` } }
        );
        const cinemaResponse = await axios.get(
          "http://localhost:5000/api/v1/cinema/getAllCinema",
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setMovies(movieResponse.data);
        setCienmas(cinemaResponse.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchMovieAndCinema();
  }, []);

  const handleSubmit = async (e) => {
    if (userInput.startAt === "") {
      alert("Please select a time");
      return;
    }
    try {
      e.preventDefault();
      const option = {
        method: "POST",
        url: "http://localhost:5000/api/v1/showtime/createShowtime",
        data: userInput,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios(option);
      console.log(response.data);
      navigate("/admin/showtime");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex h-auto justify-center items-center">
      <div className="w-full bg-white rounded p-3">
        <form autoComplete="off" noValidate onSubmit={handleSubmit}>
          <h2 className="text-xl font-bold mb-4">Thêm lịch chiếu</h2>
          <TextField
            select
            margin="dense"
            fullWidth
            id="outlined-basic"
            label="Thời gian chiếu*"
            name="startAt"
            value={userInput.startAt}
            helperText="Please select time"
            variant="outlined"
            onChange={onChangeHandle}
          >
            {[
              "09:00",
              "10:00",
              "11:00",
              "12:00",
              "13:00",
              "14:00",
              "15:00",
              "16:00",
              "17:00",
              "18:00",
              "19:00",
              "20:00",
              "21:00",
              "22:00",
              "23:00",
            ].map((time) => (
              <MenuItem key={time} value={time}>
                {time}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            select
            fullWidth
            label="Phim"
            margin="dense"
            required
            name="movieId"
            value={userInput.movieId}
            variant="outlined"
            onChange={onChangeHandle}
            className="w-[48%] mr-7 "
          >
            {nowShowing.map((movie) => (
              <MenuItem key={movie._id} value={movie._id}>
                {movie.movieName}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            select
            label="Rạp"
            required
            margin="dense"
            name="cinemaId"
            value={userInput.cinemaId}
            variant="outlined"
            onChange={onChangeHandle}
            className="w-[50%]"
          >
            {cinemas.map((cinema) => (
              <MenuItem key={cinema._id} value={cinema._id}>
                {cinema.name}
              </MenuItem>
            ))}
          </TextField>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              value={userInput.startDate}
              views={["year", "month", "day"]}
              minDate={new dayjs()}
              maxDate={maxDate}
              label="Ngày bắt đầu"
              id="startDate"
              onChange={(date) => handleDateChange(date, "startDate")}
              className="w-[48%] mr-7 mt-3"
              renderInput={(params) => <TextField {...params} />}
            />
            <DatePicker
              value={userInput.endDate}
              label="Ngày kết thúc"
              minDate={new dayjs(userInput.startDate)}
              maxDate={maxDate}
              name="endDate"
              views={["year", "month", "day"]}
              id="endDate"
              onChange={(date) => handleDateChange(date, "endDate")}
              className="w-[50%] mt-3"
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
          <button className="bg-blue-500 w-[10%] text-white rounded px-2 py-1 mt-3">
            Thêm
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateShowTime;
