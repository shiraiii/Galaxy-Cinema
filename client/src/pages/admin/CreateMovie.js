import React, { useState } from "react"
import axios from "axios"
import { useNavigate, Link } from "react-router-dom"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers"
import dayjs from "dayjs"
import OutlinedInput from "@mui/material/OutlinedInput"
import InputLabel from "@mui/material/InputLabel"
import MenuItem from "@mui/material/MenuItem"
import FormControl from "@mui/material/FormControl"
import ListItemText from "@mui/material/ListItemText"
import Select from "@mui/material/Select"
import Checkbox from "@mui/material/Checkbox"

const CreateMovie = () => {
  const navigate = useNavigate()

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
    releaseDate: dayjs().subtract(1, "day"),
    endDate: dayjs(),
  })

  const [errorMessage, setErrorMessage] = useState(null)

  const today = dayjs()

  const genres = [
    "Hành động",
    "giả tưởng",
    "phiêu lưu",
    "kinh diễn",
    "văn hòa",
    "văn hòa",
    "tốc nhiệm",
    "lãng mạn",
    "tâm lý",
  ]

  const ITEM_HEIGHT = 48
  const ITEM_PADDING_TOP = 8
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  }

  const onChangeHandle = (e) => {
    setUserInput({ ...userInput, [e.target.name]: e.target.value })
  }

  const handleGenreChange = (e) => {
    const { value } = e.target
    setUserInput({
      ...userInput,
      genres: typeof value === "string" ? value.split(",") : value,
      [e.target.name]: value,
    })
  }

  const handleDateChange = (date, field) => {
    setUserInput({ ...userInput, [field]: date })
  }

  const handleSubmit = async (e) => {
    try {
      e.preventDefault()
      const option = {
        method: "POST",
        url: "http://localhost:5000/api/v1/movie/createMovie",
        data: userInput,
      }
      const response = await axios(option)
      console.log(response.data)
      navigate("/admin/movie")
    } catch (err) {
      console.log(err)
    }
  }
  return (
    <div className="flex h-auto justify-center items-center">
      <div className="w-full bg-white rounded p-3">
        <form onSubmit={handleSubmit} className="mb-3">
          <h2>Add Movie</h2>
          <label
            htmlFor="movieName"
            className="text-xs block font-bold not-italic text-[#777777]"
          >
            Tên phim
          </label>
          <span className="w-full mb-1 relative h-auto border inline-flex items-center min-w-0 text-sm bg-white rounded transition-all duration-300">
            <input
              autoComplete="true"
              type="text"
              id="movieName"
              placeholder="Nhập tên phim"
              className="bg-transparent w-full h-9 focus:ring-2 focus:outline-blue-500 focus:rounded px-2"
              name="movieName"
              value={userInput.movieName}
              onChange={onChangeHandle}
            ></input>
          </span>
          <label
            htmlFor="producers"
            className="text-xs block font-bold not-italic text-[#777777]"
          >
            Nhà sản xuất
          </label>
          <span className="w-full mb-1 relative h-auto border inline-flex items-center min-w-0 text-sm bg-white rounded transition-all duration-300">
            <input
              autoComplete="true"
              type="text"
              id="producers"
              placeholder="Nhập nhà sản xuất"
              className="bg-transparent w-full h-9 focus:ring-2 focus:outline-blue-500 focus:rounded px-2"
              name="producers"
              value={userInput.producers}
              onChange={onChangeHandle}
            ></input>
          </span>
          <FormControl
            className="w-full mb-1 relative h-auto border inline-flex itemscenter min-w-0 text-sm bg-white rounded transition-all duration-500 "
            sx={{ m: 1, width: 300 }}
          >
            <InputLabel id="demo-multiple-checkbox-label">Thể loại</InputLabel>
            <Select
              labelId="demo-multiple-checkbox-label"
              id="genres"
              name="genres"
              multiple
              value={userInput.genres}
              onChange={handleGenreChange}
              input={<OutlinedInput label="Tag" />}
              renderValue={(selected) => selected.join(", ")}
              MenuProps={MenuProps}
            >
              {genres.map((genre) => (
                <MenuItem key={genre} value={genre}>
                  <Checkbox checked={userInput.genres.indexOf(genre) > -1} />
                  <ListItemText primary={genre} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <label
            htmlFor="directors"
            className="text-xs block font-bold not-italic text-[#777777]"
          >
            Đạo diễn
          </label>
          <span className="w-full mb-1 relative h-auto border inline-flex items-center min-w-0 text-sm bg-white rounded transition-all duration-300">
            <input
              autoComplete="true"
              type="text"
              id="directors"
              placeholder="Nhập đạo diện"
              className="bg-transparent w-full h-9 focus:ring-2 focus:outline-blue-500 focus:rounded px-2"
              name="directors"
              value={userInput.directors}
              onChange={onChangeHandle}
            ></input>
          </span>

          <label
            htmlFor="casts"
            className="text-xs block font-bold not-italic text-[#777777]"
          >
            Diễn viên
          </label>
          <span className="w-full mb-1 relative h-auto border inline-flex items-center min-w-0 text-sm bg-white rounded transition-all duration-300">
            <input
              autoComplete="true"
              type="text"
              id="casts"
              placeholder="Nhập diễn viên"
              className="bg-transparent w-full h-9 focus:ring-2 focus:outline-blue-500 focus:rounded px-2"
              name="casts"
              value={userInput.casts}
              onChange={onChangeHandle}
            ></input>
          </span>

          <label
            htmlFor="duration"
            className="text-xs block font-bold not-italic text-[#777777]"
          >
            Thời lượng phim
          </label>
          <span className="w-full mb-1 relative h-auto border inline-flex items-center min-w-0 text-sm bg-white rounded transition-all duration-300">
            <input
              required
              autoComplete="true"
              type="text"
              id="duration"
              placeholder="Thời lượng phim"
              className="bg-transparent w-full h-9 focus:ring-2 focus:outline-blue-500 focus:rounded px-2"
              name="duration"
              value={userInput.duration}
              onChange={onChangeHandle}
            ></input>
          </span>
          <label
            htmlFor="movieImg"
            className="text-xs block font-bold not-italic text-[#777777]"
          >
            Ảnh Phim
          </label>
          <span className="w-full mb-1 relative h-auto border inline-flex items-center min-w-0 text-sm bg-white rounded transition-all duration-300">
            <input
              required
              autoComplete="true"
              type="text"
              id="movieImg"
              placeholder="Ảnh phim"
              className="bg-transparent w-full h-9 focus:ring-2 focus:outline-blue-500 focus:rounded px-2"
              name="movieImg"
              value={userInput.movieImg}
              onChange={onChangeHandle}
            ></input>
          </span>

          <label
            htmlFor="movieBanner"
            className="text-xs block font-bold not-italic text-[#777777]"
          >
            Ảnh banner phim
          </label>
          <span className="w-full mb-1 relative h-auto border inline-flex items-center min-w-0 text-sm bg-white rounded transition-all duration-300">
            <input
              required
              autoComplete="false"
              type="text"
              id="movieBanner"
              placeholder="Nhập ảnh banner"
              className="bg-transparent w-full h-9 focus:ring-2 focus:outline-blue-500 focus:rounded px-2"
              name="movieBanner"
              value={userInput.movieBanner}
              onChange={onChangeHandle}
            ></input>
          </span>
          <label
            htmlFor="movieRating"
            className="text-xs block font-bold not-italic text-[#777777]"
          >
            Đánh giá
          </label>
          <span className="w-full mb-1 relative h-auto border inline-flex items-center min-w-0 text-sm bg-white rounded transition-all duration-300">
            <input
              required
              autoComplete="true"
              type="text"
              id="movieRating"
              placeholder="Nhập đánh giá"
              className="bg-transparent w-full h-9 focus:ring-2 focus:outline-blue-500 focus:rounded px-2"
              name="movieRating"
              value={userInput.movieRating}
              onChange={onChangeHandle}
            ></input>
          </span>
          <label
            htmlFor="ageLimit"
            className="text-xs block font-bold not-italic text-[#777777]"
          >
            Độ tuổi
          </label>
          <span className="w-full mb-1 relative h-auto border inline-flex items-center min-w-0 text-sm bg-white rounded transition-all duration-300">
            <input
              autoComplete="false"
              type="text"
              id="ageLimit"
              name="ageLimit"
              placeholder="Nhập độ tuổi"
              className="bg-transparent w-full h-9 focus:ring-2 focus:outline-blue-500 focus:rounded px-2"
              value={userInput.ageLimit}
              onChange={onChangeHandle}
            ></input>
          </span>
          <label
            htmlFor="nation"
            className="text-xs block font-bold not-italic text-[#777777]"
          >
            Quốc gia
          </label>
          <span className="w-full mb-1 relative h-auto border inline-flex items-center min-w-0 text-sm bg-white rounded transition-all duration-300">
            <input
              required
              autoComplete="true"
              type="text"
              id="nation"
              placeholder="Nhập quốc gia"
              className="bg-transparent w-full h-9 focus:ring-2 focus:outline-blue-500 focus:rounded px-2"
              name="nation"
              value={userInput.nation}
              onChange={onChangeHandle}
            ></input>
          </span>

          <label
            htmlFor="votes"
            className="text-xs block font-bold not-italic text-[#777777]"
          >
            Lượt đánh giá
          </label>
          <span className="w-full mb-1 relative h-auto border inline-flex items-center min-w-0 text-sm bg-white rounded transition-all duration-300">
            <input
              required
              autoComplete="true"
              type="number"
              id="votes"
              placeholder="Nhập lượt đánh giá"
              className="bg-transparent w-full h-9 focus:ring-2 focus:outline-blue-500 focus:rounded px-2"
              name="votes"
              value={userInput.votes}
              onChange={onChangeHandle}
            ></input>
          </span>
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
                  value={userInput.releaseDate}
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
                value={userInput.endDate}
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
  )
}

export default CreateMovie
