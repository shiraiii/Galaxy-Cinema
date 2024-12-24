import React, { useContext } from "react";
import Success from "../VerifyPage/Success";
import BookingSeatProgress from "../BookingSeats/bookingseats-progress";
import AppContext from "../../../context/AppContext";

const BookingSuccess = () => {
  const { activeTab, setActiveTab } = useContext(AppContext);
  return (
    <div>
      <BookingSeatProgress activeTab={3}></BookingSeatProgress>
      <Success></Success>
    </div>
  );
};

export default BookingSuccess;
