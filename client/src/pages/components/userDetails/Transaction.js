import React, { useContext } from "react";
import dayjs from "dayjs";
import AppContext from "../../../context/AppContext";

const Transaction = ({ reservations, handleDetailClick }) => {
  const { dayOfTheWeek } = useContext(AppContext);

  // Ensure valid reservations and sort them by date (newest to oldest)
  const validReservations = Array.isArray(reservations)
    ? reservations
        .slice()
        .sort((a, b) => new Date(b.createAt) - new Date(a.createAt))
        .reverse()
    : [];

  return (
    <div className="card__content mt-4 gap-x-[48px] gap-y-[24px]">
      <h3 className="text-center text-sm font-normal not-italic text-[#777]">
        Lưu ý: chỉ hiển thị 20 giao dịch gần nhất
      </h3>
      {validReservations.length === 0 ? (
        <h3 className="text-center text-sm font-normal not-italic text-[#777] mt-6 mb-3">
          Không có giao dịch nào.
        </h3>
      ) : (
        validReservations.slice(0, 20).map((reservation, index) =>
          reservation ? (
            <div
              key={index}
              className="card__item__ticket pl-[24px] pr-[18px] lg:pr-[38px] py-[14px] lg:h-[92px] h-[110px] flex items-center gap-2 lg:gap-6 relative cursor-pointer bg-white mb-4 shadow-[0_0.125rem_0.25rem_rgba(0,0,0,0.075)] transition-all duration-300 ease-in-out hover:scale-105"
            >
              <div className="max-w-[65px] max-h-[70px] w-[65px] h-[70px] rounded">
                <img
                  src={reservation?.movieImg || "default-img.jpg"}
                  alt={reservation?.movieName || "Movie Poster"}
                  className="inline rounded-lg w-full h-full object-fill object-cover duration-500 ease-in-out group-hover:opacity-100"
                />
              </div>
              <div className="item__detail lg:flex justify-between items-center w-full">
                <div className="w-full lg:w-[55%] title__content">
                  <h5 className="text-base font-semibold not-italic">
                    {reservation?.movieName || "Tên phim"}
                  </h5>
                  <p className="item__title text-sm font-normal text-[#333333] not-italic">
                    2D Lồng Tiếng
                  </p>
                </div>
                <div className="w-0 hidden lg:block lg:w-[35px] flex-1">
                  <p className="text-sm font-light not-italic">
                    {reservation?.cinemaName || "Tên rạp không xác định"}{" "}
                    <span className="text-sm font-bold not-italic">
                      - Rạp 2
                    </span>{" "}
                  </p>
                  <p className="text-sm font-bold not-italic">
                    {reservation?.startAt} -{" "}
                    <span className="font-light capitalize">
                      {dayOfTheWeek(
                        dayjs(reservation?.date).format("DD/MM/YYYY")
                      )}
                      ,{" "}
                    </span>
                    {dayjs(reservation?.date).format("DD/MM/YYYY")}
                  </p>
                </div>
                <span
                  onClick={() => handleDetailClick(reservation)}
                  className="hidden lg:block text-sm font-bold not-italic text-[#f58020] border-b border-dotted"
                >
                  Chi tiết
                </span>
              </div>
            </div>
          ) : null
        )
      )}
    </div>
  );
};

export default Transaction;
