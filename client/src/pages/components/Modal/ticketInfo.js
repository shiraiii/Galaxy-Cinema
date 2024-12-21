import React, { useState } from "react";
import Checkbox from "@mui/material/Checkbox";

const TicketInfo = ({
  cinemas,
  movies,
  time,
  formattedDate,
  dayOfWeek,
  selectedSeats,
  formattedTotal,
  handleSubmit,
  setShowTicketInfo,
  setShowReservationDetail,
}) => {
  const [isChecked, setIsChecked] = useState(false);
  const [error, setError] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
    setError(false);
  };

  const handlePaymentClick = () => {
    if (!isChecked) {
      setError(true);
    } else {
      setError(false);
      handleSubmit();
    }
  };

  return (
    <div className="py-5 px-6 modal-radius-10 bg-white">
      <h1 className="uppercase text-[16px] font-bold text-center mb-5">
        Thông tin đặt vé
      </h1>
      <div>
        <div className="flex gap-x-4 items-start">
          <p className="text-[14px] font-bold flex-none w-[30px] py-4">Phim</p>
          <div className="border border-[#DCD8D8] flex-1 text-left p-4">
            <p className="text-[16px] font-bold text-[#1353B4] capitalize">
              {movies.movieName}
            </p>
            <p className="text-[14px]">
              <span>2D lồng tiếng</span>
              <span className="ml-2"></span>
            </p>
          </div>
        </div>
        <div className="flex gap-x-4 my-3 items-start">
          <p className="text-[14px] font-bold flex-none w-[30px] py-4">Rạp</p>
          <div className="border border-[#DCD8D8] flex-1 text-left p-4">
            <p className="text-[16px] font-bold text-[#1353B4]">
              {cinemas.name}
            </p>
            <p className="text-[14px] font-bold capitalize">
              {time} - {dayOfWeek},<strong>{formattedDate}</strong>
            </p>
          </div>
        </div>
        <div className="flex gap-x-4 my-3 items-start">
          <p className="text-[14px] font-bold flex-none w-[30px] py-4"></p>
          <div className="border border-[#DCD8D8] flex-1 text-left p-4">
            <p className="text-[14px]">RAP 2</p>
            <div className="flex justify-between text-[14px]">
              <div>
                <span>Nguoi Lon - Member </span>
                <strong>
                  {selectedSeats
                    .map((seat) => `${seat.rowLetter}${seat.seatNumber}`)
                    .join(", ")}
                </strong>
              </div>
            </div>
          </div>
        </div>
        <div className="flex gap-x-4 my-5 items-start">
          <p className="text-[14px] font-bold flex-none w-[30px]">Tổng</p>
          <div className="flex-1 text-left px-4 py-2 bg-[#1353B4] text-white font-bold">
            <p>{formattedTotal} VND</p>
          </div>
        </div>
        <div className="relative modal-ticket">
          <img
            className="w-full h-full"
            alt="Icon line"
            src="https://www.galaxycine.vn/_next/static/media/Line.c026ce35.png"
          ></img>
        </div>
        <div className="flex items-center mt-5">
          <img
            className="w-[36px] h-[40px] flex-none"
            src="https://www.galaxycine.vn/_next/static/media/icon-success.c42e4e43.png"
            alt="icon show"
          ></img>
          <p className="min-[412px]:text-[14px] text-[12px] flex-auto ml-1">
            <i>Tôi xác nhận các thông tin đặt vé đã chính xác</i>
          </p>
          <div className="flex-none w-[20px]">
            <Checkbox checked={isChecked} onChange={handleCheckboxChange} />
          </div>
        </div>
        {error && (
          <p className="text-red-500 text-center text-[14px] mt-2">
            Vui lòng xác nhận thông tin đặt vé!
          </p>
        )}
        <div className="text-center mt-2">
          <button
            onClick={handlePaymentClick}
            className="w-1/2 py-2 bg-[#f58020] text-white border rounded-md hover:bg-[#ff953f] mx-auto font-bold"
          >
            Thanh toán
          </button>
        </div>
      </div>
    </div>
  );
};

export default TicketInfo;
