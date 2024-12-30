import dayjs from "dayjs";
import React from "react";

const ReservationDetail = ({ qrCode, reservationDetail, dayOfTheWeek }) => {
  return (
    <div className="generic__modal-wrapper">
      <div className="text-center">
        <div className="pb-5">
          <img
            alt={reservationDetail.movieName}
            src={reservationDetail.movieImg}
            width={80}
            height={120}
            className="inline-block rounded-lg object-cover duration-500 ease-in-out gorup-hover:opacity-100"
          ></img>
          <p className="text-lg font-bold not-italic mt-3">
            {reservationDetail.movieName}
          </p>
          <p className="text-sm font-semibold not-italic mt-2">2D Lồng Tiếng</p>
          {reservationDetail.ageLimit ? (
            <span className="ml-4 inline-block w-7 h-5 bg-[#f58020] rounded text-[14px] font-bold leading-5.5 text-center text-white">
              {reservationDetail.ageLimit}
            </span>
          ) : null}
        </div>

        <div className="pt-4 pb-4 border-y border-dashed border-black">
          <p className="text-sm font-bold not-italic text-left">
            {reservationDetail.cinemaName}
            <span className="text-sm font-bold not-italic text-left">
              {"- "} Rạp 2
            </span>
          </p>
          <p className="text-sm font-bold not-italic text-left">
            <label className="font-normal">Suất:</label>{" "}
            {reservationDetail.startAt} {" -"}
            <span className="font-light capitalize">
              {dayOfTheWeek(dayjs(reservationDetail.date).format("DD/MM/YYYY"))}
            </span>
            {", "} {dayjs(reservationDetail.date).format("DD/MM/YYYY")}
          </p>
          <img
            alt={reservationDetail._id}
            src={reservationDetail.qrCode}
            className="inline-block object-cover duration-500 ease-in-out group-hover:opactiy-100"
          ></img>
        </div>

        <div className="modal__seats py-4 text-left border-b border-dashed border-black">
          <p className="text-sm font-light not-italic">
            Ghế
            <span className="text-sm font-bold not-italic">
              {"- "}{" "}
              {(reservationDetail?.seats || [])
                .map((seat) => `${seat.rowLetter}${seat.seatNumber}`)
                .join(", ")}
            </span>
          </p>
        </div>
        <div className="modal__detail flex justify-between items-center py-4 relative">
          <div className="flex-auto text-left">
            <label className="text-sm not-italic text-[#333333]">Mã vé</label>
            <p className="text-base not-italic font-bold text-[#333333]">
              {reservationDetail._id}
            </p>
          </div>
          <div className="flex-auto text-right ml-2">
            <label className="text-sm not-italic text-[#333333]">Giá</label>
            <p className="text-base not-italic text-[#333333] font-bold">
              {reservationDetail.total} &nbsp;₫
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReservationDetail;
