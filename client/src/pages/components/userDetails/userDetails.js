import React, { useContext, useEffect, useState } from "react";
import AppContext from "../../../context/AppContext";
import UserAccount from "./UserAccount";
import UserInfo from "./UserInfo";
import axios from "axios";
import Modal from "react-responsive-modal";
import ReservationDetail from "../Modal/reservationDetail";

const UserDetails = () => {
  const {
    state,
    dispatch,
    data,
    navigate,
    showReservationDetail,
    setShowReservationDetail,
    dayOfTheWeek,
    token,
  } = useContext(AppContext);
  const [reservations, setReservations] = useState([]);
  const [qrCode, setQrCode] = useState(null);
  const [selectedReservation, setSelectedReservation] = useState(null);
  const { user } = state;

  useEffect(() => {
    if (!data) {
      navigate("/");
    }
  }, [data]);

  const handleDetailClick = (reservation) => {
    setSelectedReservation(reservation);
    setShowReservationDetail(true);
  };

  useEffect(() => {
    const fetchReservations = async () => {
      if (!data || !data.id) {
        return;
      }
      try {
        const response = await axios.get(
          `http://localhost:5000/api/v1/reservation/getReservationByUserId/${data.id}`
        );
        setReservations(response.data.reservation);
        setQrCode(response.data.qrCode);
        console.log(reservations);
      } catch (err) {
        console.log(err);
      }
    };
    fetchReservations();
  }, [data]);
  const closeIcon = (
    <span className="inline-flex bg-[#ececec] rounded-full w-[24px] h-[24px] items-center justify-center">
      <img
        src="https://www.galaxycine.vn/_next/static/media/icon-close.7e22f021.svg"
        width="30"
        height="30"
        className="w-[12px] h-[12px]"
        style={{ color: "transparent" }}
      ></img>
    </span>
  );
  useEffect(() => {
    if (!data) {
      navigate("/");
    }
  }, [data]);

  return (
    <div className="bg-[#f9f9f9]">
      <div className="grid-cols-1 md:gird-cols-4 lg:grid-cols-3 my-0 mx-auto screen1390:max-w-screen-xl xl:max-w-screen-screen1200 lg:max-w-5xl md:py-10 py-5 md:gap-[30px] xl:gap-16 px-4 md:px-[45px] xl:px-0 xl:grid">
        <UserInfo data={data} />
        <UserAccount
          reservations={reservations}
          qrCode={qrCode}
          handleDetailClick={handleDetailClick}
        />
      </div>

      <Modal
        open={showReservationDetail}
        onClose={() => setShowReservationDetail(false)}
        closeIcon={closeIcon}
        classNames={{
          modal: "modal-375 modal-315 border-t-8 border-[#f58020] p-6",
        }}
      >
        <ReservationDetail
          dayOfTheWeek={dayOfTheWeek}
          qrCode={qrCode}
          reservationDetail={selectedReservation}
        />
      </Modal>
    </div>
  );
};

export default UserDetails;
