import React from "react";
import UserFunction from "./UserFunction";

const UserAccount = ({ reservations, qrCode, handleDetailClick }) => {
  return (
    <div className="md:col-span-2 lg:col-span-2 col-span-2">
      <UserFunction
        reservations={reservations}
        qrCode={qrCode}
        handleDetailClick={handleDetailClick}
      ></UserFunction>
    </div>
  );
};

export default UserAccount;
