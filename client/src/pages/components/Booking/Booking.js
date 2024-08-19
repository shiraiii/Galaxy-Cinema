import React, { useState, useEffect, useContext } from "react"
import { Link, useParams } from "react-router-dom"
import BookingSide from "./bookingSide"
import MovieContent from "./moviecontent"
import MovieShowtime from "./movieshowtime"
import { filterAndSortMovies } from "../../../utils/movieUtils"
import dayjs from "dayjs"
import utc from "dayjs/plugin/utc"
import timezone from "dayjs/plugin/timezone"
import AppContext from "../../../context/AppContext"

dayjs.extend(utc)
dayjs.extend(timezone)

const Booking = () => {
  const { id } = useParams()
  const [movies, setMovies] = useState("")
  const [showtimes, setShowtimes] = useState([])
  const [data, setData] = useState([])
  const { nowShowingMovies } = useContext(AppContext)

  useEffect(() => {
    fetch("http://localhost:5000/api/v1/movie/getMovie/" + id)
      .then((res) => res.json())
      .then((data) => setMovies(data))
      .catch((err) => console.error("Error fetching movie: ", err))
  }, [id])

  useEffect(() => {
    fetch("http://localhost:5000/api/v1/movie/getAllMovie")
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((err) => console.error("Error fetching movies: ", err))
  }, [])

  useEffect(() => {
    fetch(`http://localhost:5000/api/v1/showtime/getShowtime/${id}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok " + res.statusText)
        }
        return res.json()
      })
      .then((data) => {
        setShowtimes(Array.isArray(data) ? data : [])
      })
      .catch((err) => console.error("Error fetching showtimes: ", err))
  }, [])

  const today = dayjs()
    .tz("Asia/Ho_Chi_Minh")
    .startOf("day")
    .format("YYYY-MM-DD")

  const releaseDate = new Date(movies.releaseDate)
  const formattedDate = `${releaseDate.getDate()}/${
    releaseDate.getMonth() + 1
  }/${releaseDate.getFullYear()}`

  const uniqueShowtimes = showtimes.filter((showtime) => {
    return dayjs(showtime.startDate).utc().tz("Asia/Ho_Chi_Minh").isAfter(today)
  })

  return (
    <>
      <div className="book__ticket__wrapper">
        <div className="relative bg-black flex justify-center w-full h-full">
          <div className="absolute w-full h-full z-[300] bg-[#0003]"></div>
          <div className="relative h-full">
            <div className="absolute top-0 -left-[0%] z-[100]">
              <img
                alt="Blur Left"
                width={342}
                height={680}
                className="w-full lg:h-[500px] object-cover lg:block hidden"
                src="https://www.galaxycine.vn/_next/static/media/blur-left.7a4f1851.png"
                color="transparent"
              ></img>
            </div>
            <div className="relative">
              <img
                alt="Img Movie"
                width={1440}
                height={440}
                className="w-[860px] h-full md:h-full lg:h-[500px] object-fill object-cover duration-500 ease-in-out group-hover:opacity-100"
                src={movies.movieBanner}
                color="transparent"
              ></img>
              <button className="absolute top-[50%] left-[50%] -translate-x-2/4 -translate-y-2/4 z-[600]">
                <img
                  alt="Play"
                  width={64}
                  height={64}
                  className="w-[40px] h-[40px] lg:w-[64px] lg:h-[64px] object-cover duration-500 ease-in-out group-hover:opacity-100 "
                  src="https://www.galaxycine.vn/_next/static/media/button-play.2f9c0030.png"
                ></img>
              </button>
            </div>
            <div className="absolute top-0 -right-[0%] z-100 lg:block hidden">
              <img
                alt="Blur Right"
                width={342}
                height={680}
                className=" w-full lg:h-[500px] object-cover "
                src="https://www.galaxycine.vn/_next/static/media/blur-right.52fdcf99.png"
                color="transparent"
              ></img>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 screen1200:grid-cols-7 my-0 mx-auto screen1390:max-w-screen-xl xl:max-w-screen-screen1200 md:max-w-4xl lg:max-w-4xl gap-8 py-7 md:px-4 px-4">
          <div className="book__left lg:col-span-5 w-full">
            <div className="book__film flex flex-col">
              <div className="movie__info relative md:grid hidden grid-cols-3 md:gap-5 gap-3 lg:items-end">
                <div className="movie__thumbnail lg:-translate-y-20 md:-translate-y-16 -translate-y-0 col-span-1 drop-shadow-2xl z-[500]">
                  <img
                    alt="{movies.movieName}"
                    className="border-2 rounded border-white lg:w-[320px] lg:h-[400px] w-full h-full object-fill object-cover duration-500 ease-in-out group-hover:opacity-100 "
                    src={movies.movieImg}
                  ></img>
                </div>
                <div className="col-span-2 lg:-translate-y-20 flex flex-col justify-end md:-translate-y-16 -translate-y-0">
                  <div className="item__title flex items-center">
                    <h1 className="capitalize text-[20px] md:text-[24px] lg:text-[28px] font-bold text-[#333333] mr-4">
                      {movies.movieName}
                    </h1>
                    {movies.ageLimit ? (
                      <>
                        <span className="inline-flex items-center justify-center w-[38px] h-7 bg-[#f58020] rounded text-sm text-center text-white font-bold not-italic">
                          {movies.ageLimit}
                        </span>
                      </>
                    ) : null}
                  </div>
                  <div className="flex items-center">
                    <div className="text-sm flex items-center font-semibold not-italic">
                      <i className="fa-regular fa-clock inline-block align-baseline mr-1 text-[#f58020]"></i>
                      <span>{movies?.duration} Phút</span>
                    </div>
                    <div className="text-sm ml-4 flex items-center font-semibold not-italic">
                      <i className="fa-regular fa-calendar inline-block align-baseline mr-1 text-[#f58020]"></i>
                      <span>{formattedDate}</span>
                    </div>
                  </div>
                  <div className="mt-2">
                    <a className="text-[20px] hover:text-[#f58020] transition duration-500 ease-in-out cursor-pointer ">
                      <i className="fa-solid fa-star text-[#f58020]"></i>
                      <span className="inline-block mr-1">
                        {movies.movieRating}
                      </span>
                      <span className="inline-block text-sm text-[#777777] hover:text-[#f58020] transition duration-500 ease-in-out">
                        ({movies?.votes} votes)
                      </span>
                    </a>
                  </div>
                  <div className="flex flex-col gap-1">
                    <div className="flex flex-wrap text-sm">
                      <span className="inline-block h-8 py-[6px] text-[#777777] flex-0 ">
                        Quốc gia:
                      </span>
                      <span className="inline-block h-8 ml-4 py-[6px] capitalize not-italic ">
                        {movies.nation}
                      </span>
                    </div>
                    <div className="flex flex-wrap items-center text-sm">
                      <span className="inline-block h-8 py-[6px] text-[#777777] flex-0 ">
                        Nhà sản xuất:
                      </span>
                      {Array.isArray(movies.producers) &&
                      movies.producers.slice(0, 1) != "" ? (
                        <>
                          <ul className="ml-2 flex flex-warp gap-1 flex-1">
                            {movies.producers
                              .filter(
                                (producer) => producer && producer.trim() !== ""
                              )
                              .map((producer, index) => (
                                <li
                                  key={index}
                                  className="capitalize text-sm cursor-pointer hover:text-[#f58020] transition duration-500 ease-in-out"
                                >
                                  <span className="mr-[1px]">
                                    {producer}
                                    {""}
                                    {index !==
                                      movies.producers.filter(
                                        (producer) => producer
                                      ).length -
                                        1 && ","}
                                  </span>
                                </li>
                              ))}
                          </ul>
                        </>
                      ) : (
                        <span className="inline-block h-8 ml-4 py-[6px] not-italic mr-2 text-[#777777]">
                          Đang cập nhật
                        </span>
                      )}
                    </div>
                    <div className="flex flex-wrap items-center text-sm">
                      <span className="inline-block h-8 py-[6px] w-[70px] text-[#777777] flex-0 ">
                        Thể loại:
                      </span>
                      <ul className="ml-2 flex flex-warp gap-1 flex-1 ">
                        {movies.genres?.map((genre) => (
                          <li key={genre} className="inline-block">
                            <a className="text-black text-sm inline-flex h-8 border border-[#d0d0d0] hover:border-[#F58020] rounded-lg px-4 py-2 capitalize not-italic items-center">
                              {genre}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="flex flex-wrap items-center text-sm">
                      <span className="inline-block h-8 py-[6px] w-[70px] text-[#777777] flex-0 ">
                        Đạo diễn:
                      </span>
                      {movies.directors &&
                      movies.directors.slice(0, 1) != "" ? (
                        <ul className="ml-2 flex flex-warp gap-1 flex-1 ">
                          {movies.directors.map((director, index) => (
                            <li key={index} className="inline-block">
                              <a className="text-black text-sm inline-flex h-8 border border-[#d0d0d0] hover:border-[#F58020] rounded-lg px-4 py-2 capitalize not-italic items-center">
                                {director}
                              </a>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <span className="inline-block h-8 ml-4 py-[6px] not-italic mr-2 text-[#777777]">
                          Đang cập nhật
                        </span>
                      )}
                    </div>
                    <div className="flex flex-wrap items-center text-sm">
                      <span className="inline-block h-8 py-[6px] w-[70px] text-[#777777] flex-0 ">
                        Diễn viên:
                      </span>
                      {movies.casts && movies.casts.slice(0, 1) != "" ? (
                        <ul className="ml-2 flex flex-warp gap-1 flex-1 ">
                          {movies.casts
                            .filter((casts) => casts && casts.trim() !== "")
                            .map((cast) => (
                              <li key={cast} className="inline-block">
                                <a className="text-black text-sm inline-flex h-8 border border-[#d0d0d0] hover:border-[#F58020] rounded-lg px-4 py-2 capitalize not-italic items-center">
                                  {cast}
                                </a>
                              </li>
                            ))}
                        </ul>
                      ) : (
                        <span className="inline-block h-8 ml-4 py-[6px] not-italic mr-2 text-[#777777]">
                          Đang cập nhật
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <MovieContent movies={movies}></MovieContent>
              {uniqueShowtimes ? (
                <MovieShowtime showtimes={showtimes}></MovieShowtime>
              ) : null}
            </div>
          </div>
          <div className="hidden screen1200:block lg:col-span-2 w-full overflow-hidden">
            <div className="mb-4">
              <span className="border-l-4 border-solid border-[#034EA2] mr-2"></span>
              <h1 className="text-xl inline-block uppercase font-semibold">
                Phim đang chiếu
              </h1>
            </div>
            <BookingSide data={nowShowingMovies}></BookingSide>
          </div>
        </div>
      </div>
    </>
  )
}

export default Booking
