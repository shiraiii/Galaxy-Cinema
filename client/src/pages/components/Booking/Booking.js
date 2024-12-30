import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import BookingSide from "./bookingSide";
import MovieContent from "./moviecontent";
import MovieShowtime from "./movieshowtime";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import AppContext from "../../../context/AppContext";
import BookingBanner from "./Booking-banner";
import BookingMovieInfo from "./Booking-movieInfo";
import { Modal } from "react-responsive-modal";
import RatingModal from "../Modal/ratingModal";
import TrailerModal from "../Modal/TrailerModal";

dayjs.extend(utc);
dayjs.extend(timezone);

const Booking = () => {
  const { id } = useParams();
  const [movies, setMovies] = useState("");
  const [showtimes, setShowtimes] = useState([]);
  const {
    nowShowingMovies,
    setShowRatingModal,
    showRatingModal,
    showTrailer,
    setShowTrailer,
  } = useContext(AppContext);

  const closeIcon = (
    <span className="inline-flex bg-[#ececec] rounded-full w-[24px] h-[24px] items-center justify-center">
      <img
        src="https://www.galaxycine.vn/_next/static/media/icon-close.7e22f021.svg"
        alt="Close Icon"
        width="30"
        height="30"
        className="w-[12px] h-[12px]"
        style={{ color: "transparent" }}
      ></img>
    </span>
  );

  useEffect(() => {
    fetch("http://localhost:5000/api/v1/movie/getMovie/" + id)
      .then((res) => res.json())
      .then((data) => {
        setMovies(data);
      })
      .catch((err) => console.error("Error fetching movie: ", err));
  }, [id]);

  useEffect(() => {
    fetch(`http://localhost:5000/api/v1/showtime/getShowtime/${id}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok " + res.statusText);
        }
        return res.json();
      })
      .then((data) => {
        setShowtimes(Array.isArray(data) ? data : []);
      })
      .catch((err) => console.error("Error fetching showtimes: ", err));
  }, [id]);

  const updateMovieRating = async (newRating, newVote) => {
    setMovies((prevMovies) => {
      return {
        ...prevMovies,
        movieRating: newRating,
        votes: newVote,
      };
    });
  };

  return (
    <>
      <div className="book__ticket__wrapper">
        <BookingBanner
          showTrailer={showTrailer}
          setShowTrailer={setShowTrailer}
          movies={movies}
        />
        <div className="grid grid-cols-1 screen1200:grid-cols-7 my-0 mx-auto screen1390:max-w-screen-xl xl:max-w-screen-screen1200 md:max-w-4xl lg:max-w-4xl gap-8 py-7 md:px-4 px-4">
          <div className="book__left lg:col-span-5 w-full">
            <div className="book__film flex flex-col">
              <BookingMovieInfo
                setShowRatingModal={setShowRatingModal}
                movies={movies}
              />
              <MovieContent movies={movies} />
              {showtimes.length > 0 &&
              showtimes.every((showtime) =>
                dayjs(showtime.endDate).isAfter(dayjs().format("YYYY-MM-DD"))
              ) ? (
                <MovieShowtime showtimes={showtimes} />
              ) : null}
            </div>
          </div>
          <div className="hidden screen1200:block lg:col-span-2 w-full overflow-hidden">
            <div className="mb-4">
              <span className="border-l-4 border-solid border-[#034EA2] mr-2"></span>
              <h1 className=" text-xl inline-block uppercase font-semibold">
                Phim đang chiếu
              </h1>
            </div>
            <BookingSide data={nowShowingMovies} />
          </div>
        </div>
      </div>
      <Modal
        open={showRatingModal}
        onClose={() => {
          setShowRatingModal(false);
        }}
        closeIcon={closeIcon}
        classNames={{
          modal: "max-w-[375px] modal-375 border-t-8 border-[#f58020] p-0",
        }}
      >
        <RatingModal id={id} updateMovieRating={updateMovieRating} />
      </Modal>
      <Modal
        onClose={() => setShowTrailer(false)}
        open={showTrailer}
        classNames={{
          modal:
            "custom__modal__confirm modal-default p-0 bg-transparent w-[100%] min-w-[400px] max-w-[90vw]",
        }}
        showCloseIcon={false}
      >
        <TrailerModal movies={movies} />
      </Modal>
    </>
  );
};

export default Booking;
