import React, { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import "../movie-card/moviecard.css"

const MovieContent = ({ data }) => {
  const navigate = useNavigate()
  return (
    <div className="movie__content">
      <ul className="flex flex-col justify-between">
        {data?.slice(0, 3).map((movie, index) => {
          return (
            <li
              key={index}
              className="text-sm text-black-black py-1 transition-all duration-300"
            >
              <div className="inline-block whitespace-nowrap relative max-w-full w-[400px] h-[250px]">
                <div className="inline-block cursor-pointer rounded overflow-hidden card__movies max-w-full false">
                  <div className="object-cover rounded relative card__img max-w-full">
                    <div className="absolute hidden md:block w-full h-full z-10 cursor-pointer bg-[#00000080] transition-all duration-300 ease-in-out opacity-0 hover:opacity-100 ">
                      <div
                        onClick={() => navigate(`/booking/${movie?._id}`)}
                        className="card__hover__content flex flex-col justify-center items-center w-full h-full"
                      >
                        <Link
                          to={`/booking/${movie?._id}`}
                          type="button"
                          className="text-white bg-[#f26b38] w-[120px] h-[40px] hover:bg-[#fb9440] rounded text-sm px-5 py-2.5 text-center inline-flex items-center dark:hover:bg-[#fb9440] dark:focus:ring-[#fb9440] "
                        >
                          <img
                            alt="img"
                            src="https://www.galaxycine.vn/_next/static/media/Vector-1.319a0d2b.svg"
                            className="mr-2"
                          ></img>
                          Mua vé
                        </Link>
                      </div>
                    </div>
                    <Link to={`/booking/${movie._id}`}>
                      <img
                        src={movie?.movieBanner}
                        width={"400"}
                        alt={movie?.movieName}
                        height={"250"}
                        className="undefined object-cover duration-500 ease-in-out group-hover:opacity-100"
                        color="transparent"
                      ></img>
                    </Link>
                    <div className="votes">
                      <p className="absolute right-[5px] bottom-10">
                        <span>
                          <i className="fa-solid fa-star text-yellow-300 mr-5 text-[12px] "></i>
                        </span>
                        <span className="text-[18px] font-bold text-white">
                          {movie?.movieRating}
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
                <div className="Card_card__title__kFoFc mt-2 w-[400px]">
                  <Link
                    to={`/booking/${movie?._id}`}
                    className="capitalize text-sm font-semibold not-italic w-[400px]"
                  >
                    {movie?.movieName}
                  </Link>
                </div>
              </div>
            </li>
          )
        })}
      </ul>
      <div className="text-end">
        <Link
          to={`/phim-dang-chieu`}
          type="button"
          className="text-[#f26b38] hover:text-white w-40 border border-[#f26b38] hover:bg-[#fb9440] rounded text-sm px-5 py-2.5 text-center inline-flex items-center dark:hover:bg-[#fb9440] dark:focus:ring-[#fb9440] transition-all duration-300 focus:ring-1 focus:outline-none focus:ring-[#fb9440] justify-center mr-2 mb-2  "
        >
          Xem thêm
          <i className="fa-solid fa-angle-right ml-2"></i>
        </Link>
      </div>
    </div>
  )
}

export default MovieContent
