import React from "react";

const BookingMovieInfo = ({ movies, setShowRatingModal }) => {
  const handleShowRatingModal = () => {
    setShowRatingModal(true);
  };

  const releaseDate = new Date(movies.releaseDate);
  const formattedDate = `${releaseDate.getDate()}/${
    releaseDate.getMonth() + 1
  }/${releaseDate.getFullYear()}`;
  return (
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
          <a
            onClick={() => handleShowRatingModal()}
            className="text-[20px] hover:text-[#f58020] transition duration-500 ease-in-out cursor-pointer "
          >
            <i className="fa-solid fa-star text-[#f58020]"></i>
            <span className="inline-block mr-1">{movies.movieRating}</span>
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
            {movies.producers && movies.producers[0]?.trim() !== "" ? (
              <>
                <ul className="ml-2 flex flex-warp gap-1 flex-1">
                  {movies.producers
                    .filter((producer) => producer && producer.trim() !== "")
                    .map((producer, index) => (
                      <li
                        key={index}
                        className="capitalize text-sm cursor-pointer hover:text-[#f58020] transition duration-500 ease-in-out"
                      >
                        <span className="mr-[1px]">
                          {producer}
                          {""}
                          {index !==
                            movies.producers.filter((producer) => producer)
                              .length -
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
            {movies.directors && movies.directors[0].trim() !== "" ? (
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
            {movies.casts && movies.casts[0].trim() !== "" ? (
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
  );
};

export default BookingMovieInfo;
