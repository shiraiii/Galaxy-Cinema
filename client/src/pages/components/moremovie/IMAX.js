import React, { useState, useEffect } from "react"
import Moremovie from "./Moremovie-index"
import MovieCardIMAX from "../movie-card/moviecard-imax"

const IMAX = () => {
  const [movies, setMovies] = useState([])

  useEffect(() => {
    fetch("http://localhost:5000/api/v1/movie/getAllMovie")
      .then((res) => res.json())
      .then((data) => setMovies(data))
  }, [])

  const today = new Date().toISOString().split("T")[0]

  const nowShowingMovies = movies.filter(
    (movie) => movie.releaseDate <= today && movie.endDate >= today
  )
  return (
    <div className="movies">
      <div className="movies__wrapper py-12 pt-6 my-0 mx-auto screen1390:max-w-screen-xl xl:max-w-screen-screen1200 lg:max-w-4xl md:max-w-4xl md:px-4 sm:px-[45px] px-[16px] ">
        <Moremovie number={2}></Moremovie>
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 xl:grid-cols-4 gap-6 mb-10">
          <MovieCardIMAX movies={nowShowingMovies} n={15}></MovieCardIMAX>
        </div>
      </div>
    </div>
  )
}

export default IMAX
