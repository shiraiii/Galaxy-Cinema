import axios from "axios";
import dayjs from "dayjs";
import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AppContext from "../../../context/AppContext";

const BookingSeatSummary = ({
  movies,
  cinemas,
  time,
  date,
  total,
  selectedSeats,
}) => {
  const [userInput, setUserInput] = useState({
    seats: [],
    checkin: Boolean,
    date: dayjs(),
    startAt: "",
    ticketPrice: "",
    total: 0,
    movieId: "",
    cinemaId: "",
    userId: "",
    username: "",
    phone: "",
  });

  useEffect(() => {
    const dataString = sessionStorage.getItem("userInfo");
    const data = JSON.parse(dataString);
    if (data) {
      setUserInput(() => ({
        seats: selectedSeats,
        date: date,
        startAt: time,
        total: total,
        username: data.userName,
        phone: data.phone,
        movieId: movies._id,
        cinemaId: cinemas._id,
        userId: data.id,
        ticketPrice: cinemas.ticketPrice,
      }));
    }
  }, [date, time, total, selectedSeats, cinemas, movies]);
  const dayOfTheWeek = (dateString) => {
    const [day, month, year] = dateString.split("/");

    const date = new Date(year, month - 1, day);

    const daysOfWeek = [
      "Chủ Nhật",
      "Thứ Hai",
      "Thứ Ba",
      "Thứ Tư",
      "Thứ Năm",
      "Thứ Sáu",
      "Thứ Bảy",
    ];

    const dayOfWeekNumber = date.getDay();

    return daysOfWeek[dayOfWeekNumber];
  };

  const formattedDate = dayjs(date).format("DD/MM/YYYY");
  const formattedTotal = new Intl.NumberFormat("vi-VN").format(total);
  const dayOfWeek = dayOfTheWeek(formattedDate);

  const handleSubmit = async (e) => {
    try {
      const option = {
        method: "POST",
        url: "http://localhost:5000/api/v1/reservation/createReservation",
        data: userInput,
      };
      const response = await axios(option);
      console.log(response.data);
    } catch (err) {
      console.error(err);
    }
  };

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
            <span> - </span>
            {movies.ageLimit ? (
              <div className="xl:mt-2 ml-2 xl:ml-0 inline-block">
                <span className="inline-flex items-center justify-center w-[38px] h-7 bg-[#f58020] rounded text-sm text-center text-white font-bold not-italic">
                  {movies.ageLimit}
                </span>
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
                <strong>{time}</strong>
                <span> - </span>
                <span className="capitalize text-sm">{dayOfWeek}</span>
                <span> - </span>
                <span className="capitalize text-sm">
                  <strong>{formattedDate}</strong>
                </span>
              </div>
            </div>
            {selectedSeats.length > 0 ? (
              <>
                <div className="my-4 border-t border-[#999999] border-dashed xl:block hidden"></div>
                <div className="xl:block hidden">
                  <div className="flex justify-between text-sm mt-2">
                    <div>
                      <strong>{selectedSeats.length}x</strong>
                      <span> Ghế đơn</span>
                      <div>
                        <span>Ghế: </span>
                        <strong>
                          {selectedSeats
                            .map(
                              (seat) => `${seat.rowLetter}${seat.seatNumber}`
                            )
                            .join(", ")}
                        </strong>
                      </div>
                    </div>
                    <span className="inline-block font-bold">
                      {formattedTotal} đ
                    </span>
                  </div>
                </div>
              </>
            ) : null}
            <div className="xl:block hidden"></div>
            <div className="my-4 border-t border-[#999999] border-dashed xl:block hidden"></div>
          </div>
          <div className="xl:flex hidden justify-between col-span-3">
            <strong className="text-base">Tổng cộng</strong>
            <span className="inline-block font-bold text-[#f58020]">
              {formattedTotal} đ
            </span>
          </div>
        </div>
        <div className="mt-8 xl:flex hidden">
          <button className="w-1/2 mr-2 py-2 text-[#f58020]">
            <span>Quay lại</span>
          </button>
          <button
            onClick={() => handleSubmit()}
            className="w-1/2 mr-2 py-2 text-white bg-[#f58020] border rounded-md hover:bg-[#ff953f]"
          >
            <span>Tiếp tục</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingSeatSummary;
