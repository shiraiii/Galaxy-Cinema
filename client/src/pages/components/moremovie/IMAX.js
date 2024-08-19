import React, { useContext } from "react"
import Moremovie from "./Moremovie-index"
import MovieCardIMAX from "../movie-card/moviecard-imax"
import AppContext from "../../../context/AppContext"

const IMAX = () => {
  const { nowShowingMovies } = useContext(AppContext)
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
