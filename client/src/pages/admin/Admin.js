import React, { useState } from "react";
import { Link } from "react-router-dom";
import Users from "./UsersAdmin";
import Movies from "./MovieAdmin";
const Admin = () => {
  const [showUser, setShowUser] = useState(false);
  const [showMovie, setShowMovie] = useState(false);
  const [showCinema, setShowCinema] = useState(false);
  const [showShowtime, setShowShowtime] = useState(false);
  return (
    <div>
      <div className="border-spacing-0 border-yellow-400 border-b-4">
        <div className="flex mt-5 flex-1 justify-start items-center max-w-auto space-x-5 ">
          <h1 className=" bg-yellow-400 w-[100px] text-center font-bold leading-normal text-[18px] ">
            Admin Page
          </h1>
          <div className="flex border rounded space-x-1 ">
            <button
              onClick={() => setShowUser(true)}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              User
            </button>
            <button
              onClick={() => setShowMovie(true)}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Movie
            </button>
            <button
              to={"/admin/cinema/"}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Cinema
            </button>
            <button
              to={"/admin/showtime/"}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Show Time
            </button>
          </div>
        </div>
      </div>
      {showUser && <Users></Users>}
      {showMovie && <Movies></Movies>}
    </div>
  );
};

export default Admin;
