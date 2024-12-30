import React, { useEffect, useState, useContext } from "react";
import ReactStars from "react-rating-stars-component";
import AppContext from "../../../context/AppContext";

const RatingModal = ({ id, updateMovieRating }) => {
  const ratingStars = {
    color: "#a0a3a7",
    count: 10,
    activeColor: "#ffad0d",
    size: 20,
    emptyIcon: <i className="fa-regular fa-star"></i>,
    filledIcon: <i className="fa-regular fa-star"></i>,
  };

  const { setShowRatingModal, token } = useContext(AppContext);

  const [movie, setMovie] = useState({
    movieBanner: "",
    movieRating: 0,
    votes: 0,
  });
  const [userRating, setUserRating] = useState(0);

  useEffect(() => {
    fetch(`http://localhost:5000/api/v1/movie/getMovie/${id}`)
      .then((res) => res.json())
      .then((data) => setMovie(data))
      .catch((err) => console.error("Error fetching movie: ", err));
  }, [id]);

  const handleRatingChange = (newRating) => {
    setUserRating(newRating);
  };

  const handleRatingSubmit = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/v1/movie/updateMovieRating",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            movieId: id,
            rating: userRating,
          }),
        }
      );
      const data = await response.json();
      if (response.ok) {
        updateMovieRating(data.movie.movieRating, data.movie.votes);
        setShowRatingModal(false);
      } else {
        console.error("Failed to submit rating", data.error);
      }
    } catch (err) {
      console.error("Error submitting rating:", err);
    }
  };

  return (
    <>
      <div className="generic__modal-wrapper">
        <div>
          <img
            width={220}
            height={280}
            src={movie.movieBanner}
            className="w-full h-full object-full block object-cover duration-500 ease-in-out group-hover:opacity-100"
          />
          <h1 className="text-center text-lg mt-2 font-bold">{movie.title}</h1>
          <p className="text-center text-base mt-2 font-bold text-[#ff0000]">
            {movie.genre}
          </p>
        </div>
      </div>
      <div className="mx-auto w-[113px] h-[113px] rounded-full border border-[#034ea2] flex justify-center flex-col col-span-1 mt-5 ">
        <div className="text-[20px] text-center">
          <span className="inline-block mr-1">
            <i className="fa-solid fa-star text-[16px] mr-1 text-[#ffad0d]"></i>
            {movie.movieRating}
          </span>
          <span className="inline-block text-[12px] text-[#777777]">
            {`(${movie.votes} đánh giá)`}
          </span>
        </div>
      </div>
      <div className="mx-auto flex justify-center">
        <div className="star-rating transition-all duration-300 ease-in-out block ">
          <div className="star-container">
            <ReactStars
              {...ratingStars}
              value={userRating} // Set the rating value based on user selection
              onChange={handleRatingChange} // Handle rating change
            />
          </div>
        </div>
      </div>
      <div className="mt-5 pt-5 flex">
        <button
          onClick={() => setShowRatingModal(false)}
          className="block text-sm px-[14px] py-[7px] border-[#f58020] bg-gray-100 text-[#333333] capitalize cursor-pointer transition duration-500 ease-in-out flex-1 "
        >
          Đóng
        </button>
        <button
          disabled={token === null || userRating === 0}
          onClick={handleRatingSubmit} // Call the submit function
          className="block text-sm px-[14px] py-[7px] border-[#f58020] bg-[#f58020] text-white capitalize cursor-pointer transition duration-500 ease-in-out flex-1"
        >
          <i className="fa-regular fa-pen-to-square mr-1"></i>
          Xác nhận
        </button>
      </div>
    </>
  );
};

export default RatingModal;
