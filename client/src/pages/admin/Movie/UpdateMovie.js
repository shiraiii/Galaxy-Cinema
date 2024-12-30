import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import OutlinedInput from "@mui/material/OutlinedInput";
import MenuItem from "@mui/material/MenuItem";
import { TextField, useTheme } from "@mui/material";
import AppContext from "../../../context/AppContext";

const UpdateUser = () => {
  const { id } = useParams();

  const theme = useTheme();

  const [movieName, setMovieName] = useState("");

  const [movieImg, setMovieImg] = useState("");

  const [movieRating, setMovieRating] = useState("");

  const [ageLimit, setAgeLimit] = useState("");

  const [movieBanner, setMovieBanner] = useState("");

  const [producers, setProducers] = useState("");

  const [directors, setDirectors] = useState("");

  const [actors, setActors] = useState("");

  const [casts, setCasts] = useState("");

  const [description, setDescription] = useState("");

  const [duration, setDuration] = useState("");

  const [nation, setNation] = useState("");

  const [releaseDate, setReleaseDate] = useState(dayjs());

  const [endDate, setEndDate] = useState(dayjs());

  const [genres, setGenres] = useState([]);

  const [trailer, setTrailer] = useState("");

  const { token } = useContext(AppContext);

  const genresOpt = [
    "Hài",
    "Hoạt hình",
    "Hành động",
    "giả tưởng",
    "gia đình",
    "phiêu lưu",
    "kinh điển",
    "văn hóa",
    "tốc nhiệm",
    "lãng mạn",
    "tâm lý",
    "hoạt hình",
    "kinh dị",
    "hài",
    "nhạc kịch",
    "tiểu sử",
    "tình cảm",
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

  useEffect(() => {
    const fectchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/v1/movie/getMovie/" + id
        );
        const fectcGenres = response.data.genres.map((genre) => genre.trim());
        setMovieName(response.data.movieName);
        setMovieImg(response.data.movieImg);
        setMovieRating(response.data.movieRating);
        setAgeLimit(response.data.ageLimit);
        setMovieBanner(response.data.movieBanner);
        setActors(response.data.actors);
        setProducers(response.data.producers);
        setDirectors(response.data.directors);
        setCasts(response.data.casts);
        setDescription(response.data.description);
        setDuration(response.data.duration);
        setNation(response.data.nation);
        setReleaseDate(dayjs(response.data.releaseDate));
        setEndDate(dayjs(response.data.endDate));
        setGenres(fectcGenres);
        setTrailer(response.data.trailer);
      } catch (err) {
        console.log(err);
      }
    };
    fectchData();
  }, [id]);

  const navigate = useNavigate();

  const handleUpdate = (e) => {
    e.preventDefault();
    axios
      .put(
        "http://localhost:5000/api/v1/movie/updateMovie/" + id,
        {
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
          trailer,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(() => {
        navigate("/admin/movie");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="flex h-100 justify-center items-center">
      <div className="w-full bg-white rounded p-3">
        <form onSubmit={handleUpdate}>
          <h2 className="mb-3">Cập nhật phim</h2>
          <TextField
            className="pr-2 w-[50%] mb-2 relative h-auto border inline-flex min-w-0 text-sm bg-white rounded transition-all duration-300"
            label="Tên phim"
            value={movieName}
            autoComplete="true"
            type="text"
            id="movieName"
            onChange={(e) => setMovieName(e.target.value)}
          ></TextField>
          <TextField
            className="pr-2 w-[50%] mb-2 relative h-auto border inline-flex min-w-0 text-sm bg-white rounded transition-all duration-300"
            label="Ảnh phim"
            value={movieImg}
            required
            autoComplete="true"
            type="text"
            id="movieImg"
            onChange={(e) => setMovieImg(e.target.value)}
          ></TextField>
          <TextField
            className="pr-2 w-[50%] mb-2 relative h-auto border inline-flex min-w-0 text-sm bg-white rounded transition-all duration-300"
            label="Ảnh banner phim"
            value={movieBanner}
            required
            autoComplete="true"
            type="text"
            id="movieBanner"
            onChange={(e) => setMovieBanner(e.target.value)}
          ></TextField>
          <TextField
            className="pr-2 w-[50%] mb-2 relative h-auto border inline-flex min-w-0 text-sm bg-white rounded transition-all duration-300"
            label="Trailer"
            value={trailer}
            autoComplete="true"
            type="text"
            id="trailer"
            onChange={(e) => setTrailer(e.target.value)}
          ></TextField>

          <TextField
            className="pr-2 w-[50%] mb-2 relative h-auto border inline-flex min-w-0 text-sm bg-white rounded transition-all duration-300"
            label="Độ tuổi"
            value={ageLimit}
            autoComplete="true"
            type="text"
            id="ageLimit"
            onChange={(e) => setAgeLimit(e.target.value)}
          ></TextField>

          <TextField
            id="genres"
            className="pr-2 w-[50%] mb-2 relative h-auto border inline-flex min-w-0 text-sm bg-white rounded transition-all duration-300"
            label="Thể loại"
            labelId="demo-multiple-checkbox-label"
            select
            name="genres"
            multiple
            value={genres}
            onChange={(e) => setGenres(e.target.value)}
            input={<OutlinedInput label="Tag" />}
            renderValue={(selected) => selected.join(", ")}
            MenuProps={MenuProps}
            SelectProps={{ multiple: true }}
          >
            {genresOpt.map((genre, index) => (
              <MenuItem
                className="capitalize"
                key={genre + "-" + index}
                value={genre}
                style={getStyles(genre, genresOpt, theme)}
              >
                {genre}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            className=" pr-2 w-[50%] mb-2 relative h-auto border inline-flex min-w-0 text-sm bg-white rounded transition-all duration-300"
            label="Nhà sản xuất"
            value={producers}
            type="text"
            id="producers"
            onChange={(e) => setProducers(e.target.value)}
          ></TextField>
          <TextField
            className=" pr-2 w-[50%] mb-2 relative h-auto border inline-flex min-w-0 text-sm bg-white rounded transition-all duration-300"
            id="actors"
            label="Diễn viện"
            value={casts}
            type="text"
            onChange={(e) => setActors(e.target.value)}
          ></TextField>
          <TextField
            className=" pr-2 w-[50%] mb-2 relative h-auto border inline-flex min-w-0 text-sm bg-white rounded transition-all duration-300"
            label="Đạo diễn"
            id="directors"
            value={directors}
            type="text"
            onChange={(e) => setDirectors(e.target.value)}
          ></TextField>
          <TextField
            className="pr-2 w-[50%] mb-2 relative h-auto border inline-flex min-w-0 text-sm bg-white rounded transition-all duration-300"
            label="Quốc gia"
            value={nation}
            type="text"
            id="nation"
            onChange={(e) => setNation(e.target.value)}
          ></TextField>
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
            Cập nhật
          </button>
          <button
            navigate="/admin/movie"
            className="w-full bg-gray-500 mt-2 text-white font-bold py-1 rounded"
          >
            Trở lại
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateUser;
