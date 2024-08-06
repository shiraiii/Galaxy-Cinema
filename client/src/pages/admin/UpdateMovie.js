import axios from "axios"
import React, { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import dayjs from "dayjs"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers"
import OutlinedInput from "@mui/material/OutlinedInput"
import InputLabel from "@mui/material/InputLabel"
import MenuItem from "@mui/material/MenuItem"
import FormControl from "@mui/material/FormControl"
import ListItemText from "@mui/material/ListItemText"
import Select from "@mui/material/Select"
import Checkbox from "@mui/material/Checkbox"

const UpdateUser = () => {
  const { id } = useParams()

  const [movieName, setMovieName] = useState("")

  const [movieImg, setMovieImg] = useState("")

  const [movieRating, setMovieRating] = useState("")

  const [ageLimit, setAgeLimit] = useState("")

  const [movieBanner, setMovieBanner] = useState("")

  const [producers, setProducers] = useState("")

  const [directors, setDirectors] = useState("")

  const [actors, setActors] = useState("")

  const [casts, setCasts] = useState("")

  const [description, setDescription] = useState("")

  const [duration, setDuration] = useState("")

  const [nation, setNation] = useState("")

  const [releaseDate, setReleaseDate] = useState(dayjs())

  const [endDate, setEndDate] = useState(dayjs())

  const [genres, setGenres] = useState([])

  const genresOpt = [
    "Hành động",
    "giả tưởng",
    "phiêu lưu",
    "kinh diễn",
    "văn hóa",
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

  useEffect(() => {
    const fectchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/v1/movie/getMovie/" + id
        )
        const fectcGenres = response.data.genres.map((genre) => genre.trim())
        setMovieName(response.data.movieName)
        setMovieImg(response.data.movieImg)
        setMovieRating(response.data.movieRating)
        setAgeLimit(response.data.ageLimit)
        setMovieBanner(response.data.movieBanner)
        setActors(response.data.actors)
        setProducers(response.data.producers)
        setDirectors(response.data.directors)
        setCasts(response.data.casts)
        setDescription(response.data.description)
        setDuration(response.data.duration)
        setNation(response.data.nation)
        setReleaseDate(dayjs(response.data.releaseDate))
        setEndDate(dayjs(response.data.endDate))
        console.log("Fetched genres:", fectcGenres)
        setGenres(fectcGenres)
      } catch (err) {
        console.log(err)
      }
    }
    fectchData()
  }, [id])

  const navigate = useNavigate()

  const handleUpdate = (e) => {
    e.preventDefault()
    axios
      .put("http://localhost:5000/api/v1/movie/updateMovie/" + id, {
        movieName,
        movieImg,
        movieRating,
        ageLimit,
        movieBanner,
        producers,
        directors,
        actors,
        casts,
        description,
        duration,
        nation,
        releaseDate,
        endDate,
        genres,
      })
      .then((res) => {
        navigate("/admin/movie")
      })
      .catch((err) => console.log(err))
  }

  return (
    <div className="flex h-100 justify-center items-center">
      <div className="w-full bg-white rounded p-3">
        <form onSubmit={handleUpdate}>
          <h2>Update Movie</h2>
          <label
            htmlFor=""
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
              name="fullname"
              value={movieName}
              onChange={(e) => setMovieName(e.target.value)}
            ></input>
          </span>
          <label
            htmlFor=""
            className="text-xs block font-bold not-italic text-[#777777]"
          >
            Ảnh phim
          </label>
          <span className="w-full mb-1 relative h-auto border inline-flex items-center min-w-0 text-sm bg-white rounded transition-all duration-300">
            <input
              value={movieImg}
              required
              autoComplete="true"
              type="text"
              id="movieImg"
              placeholder="Ảnh phim"
              className="bg-transparent w-full h-9 focus:ring-2 focus:outline-blue-500 focus:rounded px-2"
              onChange={(e) => setMovieImg(e.target.value)}
            ></input>
          </span>
          <label
            htmlFor=""
            className="text-xs block font-bold not-italic text-[#777777]"
          >
            Ảnh banner phim
          </label>
          <span className="w-full mb-1 relative h-auto border inline-flex items-center min-w-0 text-sm bg-white rounded transition-all duration-300">
            <input
              value={movieBanner}
              required
              autoComplete="true"
              type="text"
              id="movieBanner"
              placeholder="Ảnh banner phim"
              className="bg-transparent w-full h-9 focus:ring-2 focus:outline-blue-500 focus:rounded px-2"
              onChange={(e) => setMovieBanner(e.target.value)}
            ></input>
          </span>
          <label
            htmlFor=""
            className="text-xs block font-bold not-italic text-[#777777]"
          >
            Đánh giá
          </label>
          <span className="w-full mb-1 relative h-auto border inline-flex items-center min-w-0 text-sm bg-white rounded transition-all duration-300">
            <input
              value={movieRating}
              required
              autoComplete="true"
              type="text"
              id="movieRating"
              placeholder="Nhập đánh giá"
              className="bg-transparent w-full h-9 focus:ring-2 focus:outline-blue-500 focus:rounded px-2"
              onChange={(e) => setMovieRating(e.target.value)}
            ></input>
          </span>
          <label
            htmlFor=""
            className="text-xs block font-bold not-italic text-[#777777]"
          >
            Độ tuổi
          </label>
          <span className="w-full mb-1 relative h-auto border inline-flex items-center min-w-0 text-sm bg-white rounded transition-all duration-300">
            <input
              value={ageLimit}
              autoComplete="true"
              type="text"
              id="ageLimit"
              placeholder="Nhập độ tuổi"
              className="bg-transparent w-full h-9 focus:ring-2 focus:outline-blue-500 focus:rounded px-2"
              onChange={(e) => setAgeLimit(e.target.value)}
            ></input>
          </span>
          <FormControl
            className="w-full mb-1 relative h-auto border inline-flex itemscenter min-w-0 text-sm bg-white rounded transition-all duration-500 "
            sx={{ m: 1, width: 300 }}
          >
            <InputLabel id="demo-multiple-checkbox-label">Thể loại</InputLabel>
            <Select
              id="genres"
              multiple
              value={genres}
              onChange={(e) => setGenres(e.target.value)}
              input={<OutlinedInput label="Tag" />}
              renderValue={(selected) => selected.join(", ")}
              MenuProps={MenuProps}
            >
              {genresOpt.map((genre) => (
                <MenuItem key={genre} value={genre}>
                  <Checkbox checked={genres.includes(genre)} />
                  <ListItemText primary={genre} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <label
            htmlFor=""
            className="text-xs block font-bold not-italic text-[#777777]"
          >
            Nhà sản xuất
          </label>
          <span className="w-full mb-1 relative h-auto border inline-flex items-center min-w-0 text-sm bg-white rounded transition-all duration-300">
            <input
              value={producers}
              autoComplete="true"
              type="text"
              id="producers"
              placeholder="Nhập nhà sản xuất"
              className="bg-transparent w-full h-9 focus:ring-2 focus:outline-blue-500 focus:rounded px-2"
              onChange={(e) => setProducers(e.target.value)}
            ></input>
          </span>
          <label
            htmlFor="releaseDate"
            className="text-xs block font-bold not-italic text-[#777777]"
          >
            Ngày chiếu
          </label>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              value={releaseDate}
              views={["year", "month", "day"]}
              id="releaseDate"
              onChange={(date) => setReleaseDate(date)}
            />
          </LocalizationProvider>

          <label
            htmlFor="endDate"
            className="text-xs block font-bold not-italic text-[#777777]"
          >
            Ngày kết thúc
          </label>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              value={endDate}
              views={["year", "month", "day"]}
              id="endDate"
              onChange={(date) => setEndDate(date)}
            />
          </LocalizationProvider>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white font-bold py-1 rounded"
          >
            Update
          </button>
          <button
            navigate="/admin/movie"
            className="w-full bg-gray-500 mt-2 text-white font-bold py-1 rounded"
          >
            Back
          </button>
        </form>
      </div>
    </div>
  )
}

export default UpdateUser
