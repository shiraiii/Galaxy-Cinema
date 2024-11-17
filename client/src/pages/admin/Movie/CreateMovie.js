import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { TextField, useTheme } from "@mui/material";
import dayjs from "dayjs";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);

const CreateMovie = () => {
  const navigate = useNavigate();
  const theme = useTheme();

  const [userInput, setUserInput] = useState({
    movieName: "",
    movieImg: "",
    genres: [],
    directors: "",
    casts: "",
    description: "",
    producers: "",
    movieRating: "",
    ageLimit: "",
    movieBanner: "",
    duration: "",
    votes: 0,
    nation: "",
    releaseDate: dayjs(),
    endDate: dayjs(),
  });

  const genresOpt = [
    "Hành động",
    "giả tưởng",
    "phiêu lưu",
    "kinh diễn",
    "văn hóa",
    "tốc nhiệm",
    "lãng mạn",
    "tâm lý",
  ];

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

  function getStyles(genre, genresOpt, theme) {
    return {
      fontWeight:
        genresOpt.indexOf(genre) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
    };
  }
  const onChangeHandle = (e) => {
    setUserInput({ ...userInput, [e.target.name]: e.target.value });
  };

  const handleGenreChange = (e) => {
    const { value } = e.target;
    setUserInput({
      ...userInput,
      genres: typeof value === "string" ? value.split(",") : value,
      [e.target.name]: value,
    });
  };

  const handleDateChange = (date, field) => {
    setUserInput({ ...userInput, [field]: date });
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const releaseDate = dayjs(userInput.releaseDate).utc().format();
      const endDate = dayjs(userInput.endDate).utc().format();
      const data = {
        ...userInput,
        releaseDate,
        endDate,
      };
      const option = {
        method: "POST",
        url: "http://localhost:5000/api/v1/movie/createMovie",
        data,
      };
      const response = await axios(option);
      console.log(response.data);
      console.log(dayjs(releaseDate).tz("Asia/Ho_Chi_Minh").format());
      navigate("/admin/movie");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="flex h-auto justify-center items-center">
      <div className="w-full bg-white rounded p-3">
        <form onSubmit={handleSubmit} className="mb-3">
          <h2>Add Movie</h2>
          <TextField
            className="textField-css"
            id="movieName"
            label="Tên phim"
            name="movieName"
            value={userInput.movieName}
            onChange={onChangeHandle}
            variant="outlined"
          ></TextField>
          <TextField
            className="textField-css pr-2"
            id="producers"
            label="Nhà sản xuất"
            name="producers"
            value={userInput.producers}
            onChange={onChangeHandle}
          ></TextField>
          <TextField
            className="textField-css"
            labelId="demo-multiple-checkbox-label"
            id="genres"
            name="genres"
            label="Thể loại"
            select
            value={userInput.genres}
            onChange={handleGenreChange}
            input={<OutlinedInput label="Tag" />}
            renderValue={(selected) => selected.join(", ")}
            MenuProps={MenuProps}
            SelectProps={{
              multiple: true,
              value: userInput.genres,
            }}
          >
            {genresOpt.map((genre, index) => (
              <MenuItem
                key={genre + "-" + index}
                value={genre}
                style={getStyles(genre, genresOpt, theme)}
              >
                {genre}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            className="textField-css pr-2"
            autoComplete="true"
            id="directors"
            label="Đạo diễn"
            name="directors"
            value={userInput.directors}
            onChange={onChangeHandle}
          ></TextField>
          <TextField
            className="textField-css"
            id="casts"
            label="Diễn viên"
            name="casts"
            value={userInput.casts}
            onChange={onChangeHandle}
          ></TextField>

          <TextField
            className="textFeild-css pr-2"
            id="duration"
            label="Thời lượng phim"
            name="duration"
            value={userInput.nation}
            onChange={onChangeHandle}
            autoComplete="true"
          ></TextField>

          <TextField
            className="textField-css "
            id="movieImg"
            label="Ảnh phim"
            name="movieImg"
            value={userInput.movieImg}
            onChange={onChangeHandle}
            autoComplete="true"
          ></TextField>

          <TextField
            className="textField-css pr-2"
            id="movieBanner"
            label="Banner phim"
            name="movieBanner"
            value={userInput.movieBanner}
            onChange={onChangeHandle}
          ></TextField>

          <TextField
            className="textField-css"
            id="movieRating"
            label="Đánh giá"
            name="movieRating"
            value={userInput.movieRating}
            onChange={onChangeHandle}
          ></TextField>

          <TextField
            className="textField-css pr-2"
            id="ageLimit"
            name="ageLimit"
            label="Đồ tuổi"
            value={userInput.ageLimit}
            onChange={onChangeHandle}
          ></TextField>

          <TextField
            className="textField-css"
            id="nation"
            label="Quốc gia"
            name="nation"
            value={userInput.nation}
            onChange={onChangeHandle}
          ></TextField>

          <TextField
            className="textField-css pr-2"
            id="votes"
            type="number"
            label="Lượt đánh giá"
            name="votes"
            value={userInput.votes}
            onChange={onChangeHandle}
          ></TextField>

          <div className="flex gap-2">
            <label
              htmlFor="releaseDate"
              className="text-xs block font-bold not-italic text-[#777777]"
            >
              Ngày chiếu
            </label>
            <span className="w-1/2">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  value={dayjs(userInput.releaseDate).tz("Asia/Ho_Chi_Minh")}
                  views={["year", "month", "day"]}
                  id="releaseDate"
                  onChange={(date) => handleDateChange(date, "releaseDate")}
                />
              </LocalizationProvider>
            </span>
            <label
              htmlFor="releaseDate"
              className="text-xs block font-bold not-italic text-[#777777]"
            >
              Ngày kết thúc
            </label>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                value={dayjs(userInput.endDate).tz("Asia/Ho_Chi_Minh")}
                disablePast
                views={["year", "month", "day"]}
                id="endDate"
                onChange={(date) => handleDateChange(date, "endDate")}
              />
            </LocalizationProvider>
          </div>

          <button className="bg-blue-500 text-white rounded px-2 py-1">
            Thêm
          </button>
        </form>
        <Link to={"/admin"} className="bg-red-500 text-white rounded px-3 py-1">
          Back
        </Link>
      </div>
    </div>
  );
};

export default CreateMovie;
