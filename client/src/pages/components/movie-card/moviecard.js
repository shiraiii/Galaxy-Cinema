import React from "react"
import { Link, useNavigate } from "react-router-dom"
import { CCard, CCardBody, CCardImage, CCardTitle } from "@coreui/react"
// import "./moviecard.css"

const Moviecard = ({ movies, n }) => {
  const navigate = useNavigate()
  return (
    <>
      {movies?.slice(0, n).map((movie, index) => {
        return (
          <CCard key={index}>
            <CCardBody className="Card_Card__uVcCy">
              <div className="Card_card__header__Nq4zg ">
                <div className="Card_card__hover__jJf4Q hidden xl:block">
                  <div
                    onClick={() => navigate(`/booking/${movie?._id}`)}
                    className="card__hover__content flex flex-col justify-center items-center w-full h-full gap-3"
                  >
                    <Link
                      to={`/booking/${movie?._id}`}
                      type="button"
                      className="text-white bg-[#f26b38] w-[120px] h-[40px] hover:bg-[#fb9440] rounded text-sm px-5 py-2.5 text-center inline-flex items-center dark:hover:bg-[#fb9440] dark:focus:ring-[#fb9440] "
                    >
                      <img
                        src="https://www.galaxycine.vn/_next/static/media/Vector-1.319a0d2b.svg"
                        className="mr-2"
                      ></img>
                      Mua vé
                    </Link>
                    <button
                      type="button"
                      className="text-white w-[120px] h-[40px] border border-white hover:bg-[#fb9440]/80 hover:border-transparent rounded text-sm px-5 py-2.5 text-center inline-flex items-center dark:hover:bg-[#fb9440] dark:focus:ring-[#fb9440] "
                    >
                      <i className="fa-solid fa-circle-play mr-2"></i>
                      Trailer
                    </button>
                  </div>
                </div>
                <CCardImage
                  alt={movie?.movieName}
                  width={"300px"}
                  height={"500px"}
                  src={movie?.movieImg}
                  color="transparent"
                  className="object-cover duration-500 ease-in-out group-hover:opacity-100"
                ></CCardImage>
                <div className="votes">
                  <p className="absolute right-[5px] bottom-10">
                    <span>
                      <i className="fa-solid fa-star text-yellow-300 mr-5 text-[12px]"></i>
                      <span className="text-[18px] font-bold text-white">
                        {movie?.movieRating}
                      </span>
                    </span>
                  </p>
                </div>
                <div className="age__limit absolute bottom-[6px] right-[6px]">
                  {movie.ageLimit ? (
                    <>
                      <span className=" inline-flex items-center justify-center w-[38px] h-7 bg-[#f26b38] rounded text-sm text-center text-white font-bold not-italic">
                        {movie?.ageLimit}
                      </span>
                    </>
                  ) : null}
                </div>
              </div>
            </CCardBody>
            <CCardTitle>{movie?.movieName}</CCardTitle>
          </CCard>
        )
      })}
    </>
  )
}

export default Moviecard
