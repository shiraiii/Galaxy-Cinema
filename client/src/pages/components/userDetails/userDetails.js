import React, { useContext, useEffect, useState } from "react";
import AppContext from "../../../context/AppContext";
import UserAccount from "./UserAccount";
import UserInfo from "./UserInfo";
import axios from "axios";

const UserDetails = () => {
  const { state, dispatch, data, navigate } = useContext(AppContext);
  const [reservations, setReservations] = useState([]);
  const { user } = state;

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/v1/reservation/getReservationByUserId/${data.id}`
        );
        setReservations(response.data.reservation);
      } catch (err) {
        console.log(err);
      }
    };
    fetchReservations();
  }, [data.id]);

  console.log(reservations);
  useEffect(() => {
    if (!data) {
      navigate("/");
    }
  }, [data]);

  return (
    <div className="bg-[#f9f9f9]">
      <div className="grid-cols-1 md:gird-cols-4 lg:grid-cols-3 my-0 mx-auto screen1390:max-w-screen-xl xl:max-w-screen-screen1200 lg:max-w-5xl md:py-10 py-5 md:gap-[30px] xl:gap-16 px-4 md:px-[45px] xl:px-0 xl:grid">
        <UserInfo data={data} />
        <UserAccount reservations={reservations} />
      </div>
    </div>
  );
};

export default UserDetails;
