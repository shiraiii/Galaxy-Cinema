import axios from "axios";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import Modal from "react-responsive-modal";
import TicketInfo from "../Modal/ticketInfo";
import ReservationDetail from "../Modal/reservationDetail";
import AppContext from "../../../context/AppContext";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

const BookingSeatSummary = ({
  movies,
  cinemas,
  time,
  date,
  total,
  selectedSeats,
  setShowEmptySeatModal,
  setActiveTab,
  activeTab,
  setShowTicketInfo,
  showTicketInfo,
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

  const [reservationDetail, setReservationDetail] = useState(null);
  const [qrCode, setQrCode] = useState(null);
  const [showReservationDetail, setShowReservationDetail] = useState(false);

  const { method, data, navigate, dayOfTheWeek } = React.useContext(AppContext);

  const closeIcon = (
    <span className="w-[25px]  h-[25px] rounded-full outline-none absolute">
      <img
        alt="Icon close"
        className="w-[25px] h-[25px]"
        src="https://www.galaxycine.vn/_next/static/media/IconClose.41d08d13.png"
      ></img>
    </span>
  );

  useEffect(() => {
    if (data) {
      const updatedUserInput = {
        seats: selectedSeats,
        date: date,
        startAt: time || "N/A",
        total: total,
        username: data.userName,
        phone: data.phone,
        movieId: movies._id,
        cinemaId: cinemas._id,
        userId: data.id,
        ticketPrice: cinemas.ticketPrice,
      };

      setUserInput(updatedUserInput);
    }
  }, [date, time, total, selectedSeats, cinemas, movies]);

  const formattedDate = dayjs(date).format("DD/MM/YYYY");
  const formattedTotal = new Intl.NumberFormat("vi-VN").format(total);
  const dayOfWeek = dayOfTheWeek(formattedDate);

  const handleSubmit = async (e) => {
    try {
      switch (method) {
        case "HSBC":
          const option = {
            method: "POST",
            url: "http://localhost:5000/api/v1/reservation/createReservation",
            data: userInput,
          };
          const response = await axios(option);
          const { reservation, qrCode } = response.data;
          setReservationDetail(reservation);
          setQrCode(qrCode);
          setShowTicketInfo(false);
          setShowReservationDetail(true);
          break;

        case "stripe":
          const optionStripe = {
            method: "POST",
            url: "http://localhost:5000/api/v1/reservation/createReservationStripe",
            data: userInput,
          };
          const responseStripe = await axios(optionStripe);
          console.log(responseStripe);
          if (responseStripe.data.success) {
            const { session_url } = responseStripe.data;
            window.location.replace(session_url);
          } else {
            console.error(responseStripe.data.message);
          }
          break;

        default:
          throw new Error("Invalid payment method");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handlePaymentButtonClick = () => {
    setActiveTab(2);
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
          {method === "paypal" ? (
            <PayPalScriptProvider>
              <PayPalButtons />
            </PayPalScriptProvider>
          ) : null}
          <button
            onClick={() => {
              if (selectedSeats.length <= 0) {
                setShowEmptySeatModal(true);
              } else {
                if (activeTab === 1) {
                  handlePaymentButtonClick();
                } else if (activeTab === 2) {
                  setShowTicketInfo(true);
                }
              }
            }}
            className="w-1/2 mr-2 py-2 text-white bg-[#f58020] border rounded-md hover:bg-[#ff953f]"
          >
            <span>{activeTab === 1 ? "Tiếp tục" : "Thanh toán"}</span>
          </button>
        </div>
      </div>

      <Modal
        open={showTicketInfo}
        onClose={() => setShowTicketInfo(false)}
        closeOnOverlayClick={false}
        closeIcon={closeIcon}
        closeIconId="custom__btn__icon-close-confirm"
        classNames={{
          modal: "modal-sx m-0 bg-transparent shadow-none modal-confirm-order",
        }}
      >
        <TicketInfo
          cinemas={cinemas}
          movies={movies}
          time={time}
          formattedDate={formattedDate}
          dayOfWeek={dayOfWeek}
          selectedSeats={selectedSeats}
          formattedTotal={formattedTotal}
          handleSubmit={handleSubmit}
          setShowTicketInfo={setShowTicketInfo}
          setShowReservationDetail={setShowReservationDetail}
        ></TicketInfo>
      </Modal>

      <Modal
        open={showReservationDetail}
        onClose={() => {
          navigate("/");
          setShowReservationDetail(false);
        }}
        closeOnOverlayClick={false}
        closeIcon={closeIcon}
        closeIconId="custom__btn__icon-close-confirm"
        classNames={{
          modal: "modal-sx m-0 bg-transparent shadow-none modal-confirm-order",
        }}
      >
        <ReservationDetail
          qrCode={qrCode}
          reservationDetail={reservationDetail}
        ></ReservationDetail>
      </Modal>
    </div>
  );
};

export default BookingSeatSummary;
