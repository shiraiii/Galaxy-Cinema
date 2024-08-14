import React, { useState, useEffect } from "react"
import Moremovie from "./Moremovie-index"
import Moviecard from "../movie-card/moviecard"
import dayjs from "dayjs"
import utc from "dayjs/plugin/utc"
import timezone from "dayjs/plugin/timezone"

dayjs.extend(utc)
dayjs.extend(timezone)

const Nowshowing = () => {
  const [movies, setMovies] = useState([])

  useEffect(() => {
    fetch("http://localhost:5000/api/v1/movie/getAllMovie")
      .then((res) => res.json())
      .then((data) => setMovies(data))
  }, [])

  const today = dayjs()
    .tz("Asia/Ho_Chi_Minh")
    .startOf("day")
    .format("YYYY-MM-DD")

  const nowShowingMovies = movies.filter((movie) => {
    const releaseDate = dayjs(movie.releaseDate)
      .tz("Asia/Ho_Chi_Minh")
      .startOf("day")
      .format("YYYY-MM-DD")

    const endDate = dayjs(movie.endDate)
      .tz("Asia/Ho_Chi_Minh")
      .startOf("day")
      .format("YYYY-MM-DD")

    return releaseDate <= today && endDate >= today
  })

  return (
    <div className="movies">
      <div className="movies__wrapper py-12 pt-6 my-0 mx-auto screen1390:max-w-screen-xl xl:max-w-screen-screen1200 lg:max-w-4xl md:max-w-4xl md:px-4 sm:px-[45px] px-[16px] ">
        <Moremovie number={0}></Moremovie>
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 xl:grid-cols-4 gap-6 mb-10">
          <Moviecard movies={nowShowingMovies} n={15}></Moviecard>
        </div>
      </div>
    </div>
  )
}

export default Nowshowing
