import React, { useEffect, useState } from "react";
import SideBar from "./SideBar";
import Navbar from "./Navbar";
import Chart from "./Chart";
import StatCard from "./StatCard";
import AppContext from "../../../context/AppContext";

const Dashboard = () => {
  const {
    movies = [],
    showtimes = [],
    reservations = [],
  } = React.useContext(AppContext);
  const [users, setUsers] = useState([]);
  const [reservationsData, setReservationsData] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5000/api/v1/user/getAllUser")
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }, []);

  useEffect(() => {
    fetch("http://localhost:5000/api/v1/reservation/getAllReservation")
      .then((res) => res.json())
      .then((data) => setReservationsData(data));
  }, []);

  return (
    <div className="flex dark:bg-gray-900 min-h-screen">
      <SideBar />

      <div className="flex-1 p-6">
        <Navbar />

        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Total Users"
            value={users.length}
            bgColor="bg-blue-500"
          />
          <StatCard
            title="Movies"
            value={movies.length}
            bgColor="bg-green-500"
          />
          <StatCard
            title="Reservation"
            value={reservationsData.length}
            bgColor="bg-yellow-500"
          />
          <StatCard title="Active Sessions" value="650" bgColor="bg-red-500" />
        </div>

        <div className="mt-8 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-200 mb-4">
            Revenue Over Time
          </h2>
          <Chart />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
