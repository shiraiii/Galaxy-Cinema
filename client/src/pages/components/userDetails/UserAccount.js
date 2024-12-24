import React from "react";
import UserFunction from "./UserFunction";

const UserAccount = ({ reservations }) => {
  return (
    <div className="md:col-span-2 lg:col-span-2 col-span-2">
      <UserFunction reservations={reservations}></UserFunction>
    </div>
  );
};

export default UserAccount;
