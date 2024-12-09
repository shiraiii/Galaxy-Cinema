import React, { useEffect, useState, useContext } from "react";
import ReactStars from "react-rating-stars-component";
import AppContext from "../../../context/AppContext";

const RatingModal = ({ id }) => {
  const ratingStars = {
    color: "#a0a3a7",
    count: 10,
    activeColor: "#ffad0d",
    size: 20,
    emptyIcon: <i className="fa-regular fa-star"></i>,
    filledIcon: <i className="fa-regular fa-star"></i>,
  };

  const { setShowRatingModal } = useContext(AppContext);

  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:5000/api/v1/movie/getMovie/${id}`)
      .then((res) => res.json())
      .then((data) => setMovies(data))
      .catch((err) => console.error("Error fetching movie: ", err));
  }, [id]);

  return (
    <>
      <div className="generic__modal-wrapper">
        <div>
          <img
            width={220}
            height={280}
            src={movies.movieBanner}
            className="w-full h-full object-full block object-cover duration-500 ease-in-out group-hover:opacity-100"
          ></img>
          <h1 className="text-center text-lg mt-2 font-bold"></h1>
          <p className="text-center text-base mt-2 font-bold text-[#ff0000]"></p>
        </div>
      </div>
      <div className="mx-auto w-[113px] h-[113px] rounded-full border border-[#034ea2] flex justify-center flex-col col-span-1 mt-5 ">
        <div className="text-[20px] text-center">
          <span className="inline-block mr-1">
            <i className="fa-solid fa-star text-[16px] mr-1 text-[#ffad0d]"></i>
            {movies.movieRating}
          </span>
          <span className="inline-block text-[12px] text-[#777777]">
            {`(${movies.votes} đánh giá)`}
          </span>
        </div>
      </div>
      <div className="mx-auto flex justify-center">
        <div className="star-rating transition-all duration-300 ease-in-out block ">
          <div className="star-container">
            <ReactStars {...ratingStars} />
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
        <button className="block text-sm px-[14px] py-[7px] border-[#f58020] bg-[#f58020] text-white capitalize cursor-pointer transition duration-500 ease-in-out flex-1">
          <i class="fa-regular fa-pen-to-square mr-1"></i>
          xác nhận
        </button>
      </div>
    </>
  );
};

export default RatingModal;
