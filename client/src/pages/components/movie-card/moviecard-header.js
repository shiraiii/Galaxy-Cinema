import React from "react"
import { Link, useNavigate } from "react-router-dom"

const MovieCardHeader = ({ movies }) => {
  const navigate = useNavigate()
  return (
    <>
      {movies?.slice(0, 4).map((movie, movieKey) => {
        return (
          <li
            key={movieKey}
            className="text-sm text-black py-2 transition-all duration-300"
          >
            <div className="inline-block whitespace-nowrap relative max-w-full w-[140px] h-[200px]">
              <div className="inline-block cursor-pointer rounded overflow-hidden card__movies max-w-full">
                <div className="object-cover rounded relative card__img max-w-full">
                  <div className="absolute hidden md:block w-full h-full z-10 cursor-pointer bg-[#00000080] transition-all duration-300 ease-in-out opacity-0 hover:opacity-100">
                    <div
                      onClick={() => navigate(`/booking/${movie?._id}`)}
                      className="card__hover__content flex flex-col justify-center items-center w-full h-full z-10"
                    >
                      <Link
                        to={`/booking/${movie?._id}`}
                        type="button"
                        className="text-white bg-[#f26b38] w-[120px] h-[40px] hover:bg-[#fb9440] rounded text-sm px-5 py-2.5 text-center inline-flex items-center dark:hover:bg-[#fb9440] dark:focus:ring-[#fb9440]"
                      >
                        <img
                          alt="Mua vé"
                          src="https://www.galaxycine.vn/_next/static/media/Vector-1.319a0d2b.svg"
                          className="mr-2"
                          style={{
                            color: "transparent",
                          }}
                        ></img>
                        Mua vé
                      </Link>
                    </div>
                  </div>
                  <Link>
                    <img
                      className="undefined object-cover duration-500 ease-in-out group-hover:opacity-100 relative"
                      alt={movie.name}
                      src={movie.movieImg}
                    ></img>
                  </Link>
                  <div className="votes">
                    <p className="absolute right-[5px] bottom-10">
                      <span>
                        <i className="fa-solid fa-star text-yellow-300 mr-5 text-[12px]"></i>
                      </span>
                      <span className="text-[18px] font-bold text-white">
                        {movie.movieRating}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
              <div
                className="Card_card__title__kFoFc mt-2"
                style={{ width: "128px" }}
              >
                <a
                  type="button"
                  className="text-sm font-semibold not-italic w-[140px]"
                >
                  {movie.name}
                </a>
              </div>
            </div>
          </li>
        )
      })}
    </>
  )
}

export default MovieCardHeader
