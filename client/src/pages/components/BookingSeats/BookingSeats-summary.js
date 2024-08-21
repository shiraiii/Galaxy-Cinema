import React from "react"

const BookingSeatSummary = ({ movies, cinemas, time, date, total }) => {
  return (
    <div className="col-span-1 xl:pl-4 xl:order-none order-first py-4">
      <div className="booking__summary md:mb-4">
        <div className="h-[6px] bg-[#f58020] rounded-t-lg"></div>
        <div className="bg-white p-4 grid grid-cols-3 xl:gap-2 items-center">
          <div className="row-span-2 md:row-span-1 xl:row-span-2 block md:hidden xl:block">
            <img
              width={100}
              height={150}
              alt="movies.movieName"
              className="xl:w-full xl:h-full md:w-[80px] md:h-[120px] w-[90px] h-[110px] rounded object-cover duration-500 ease-in-out group-hover:opacity-100"
              src={movies.movieImg}
            ></img>
          </div>
          <div className="row-span-2 md:row-span-1 xl:row-span-2 hidden md:block xl:hidden">
            <img
              width={100}
              height={150}
              alt="movies.movieName"
              className="w-[220px] h-[150px] rounded object-cover duration-500 ease-in-out group-hover:opacity-100"
              src={movies.movieImg}
            ></img>
          </div>
          <div className="flex-1 col-span-2 md:col-span-1 row-span-1 xl:col-span-2">
            <h3 className="text-sm xl:text-base font-bold xl:mb-2">
              {movies.movieName}
            </h3>
            <p className="text-sm inline-block">2D Phụ Đề</p>
            <span>-</span>
            {movies.ageLimit ? (
              <div className="xl:mt-2 ml-2 xl:ml-0 inline-block">
                <span className="inline-flex items-center justify-center w-[38px] h-7 bg-[#f58020] rounded text-sm text-center text-white font-bold not-italic"></span>
              </div>
            ) : null}
          </div>
          <div className="col-span-2 md:col-span-1 xl:col-span-3">
            <div>
              <div className="xl:mt-4 text-sm xl:text-base">
                <strong>{cinemas.name}</strong>
                <span> - </span>
                <span className="text-sm xl:text-base">RẠP 2</span>
              </div>
              <div className="xl:mt-2 text-sm xl:text-base">
                <span>Suất: </span>
                <span>{time}</span>
                <span> - </span>
                <span></span>
                <span> - </span>
                <span className="capitalize text-sm">
                  <strong>{date}</strong>
                </span>
              </div>
            </div>
            <div className="xl:block hidden"></div>
            <div className="my-4 border-t border-[#999999] border-dashed xl:block hidden"></div>
          </div>
          <div className="xl:flex hidden justify-between col-span-3">
            <strong className="text-base">Tổng cộng</strong>
            <span className="inline-block font-bold text-[#f58020]">
              {total} đ
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BookingSeatSummary
