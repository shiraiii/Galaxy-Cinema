import React, { useEffect, useState } from "react";
import SideBar from "./SideBar";
import Navbar from "./Navbar";
import Chart from "./Chart";
import StatCard from "./StatCard";
import AppContext from "../../../context/AppContext";

const Dashboard = () => {
  const { movies = [] } = React.useContext(AppContext);
  const [users, setUsers] = useState([]);
  const [reservationsData, setReservationsData] = useState([]);
  const [totalRevenue, setTotalRevenue] = useState(0);

  useEffect(() => {
    fetch("http://localhost:5000/api/v1/user/getAllUser")
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }, []);

  useEffect(() => {
    fetch("http://localhost:5000/api/v1/reservation/getAllReservation")
      .then((res) => res.json())
      .then((data) => {
        setReservationsData(data);
        const total = data.reduce((sum, reservation) => {
          const ticketPrice = reservation.ticketPrice || 0;
          const seatsCount = reservation.seats?.length;
          return sum + ticketPrice * seatsCount;
        }, 0);
        setTotalRevenue(total);
      });
  }, []);

  return (
    <div className="flex min-h-screen">
      <SideBar /> {/* Sidebar stays fixed on the left */}
      <div className="flex-1 p-6 bg-grey-500">
        <Navbar /> {/* Navbar stays at the top of the content area */}
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Tổng Người Dùng"
            value={users.length}
            bgColor="bg-blue-500"
          />
          <StatCard title="Phim" value={movies.length} bgColor="bg-green-500" />
          <StatCard
            title="Đặt Vé"
            value={reservationsData.length}
            bgColor="bg-yellow-500"
          />
          <StatCard
            title="Tổng Thu"
            value={`${totalRevenue.toLocaleString()} VNĐ`}
            bgColor="bg-red-500"
          />
        </div>
        <div className="mt-8 p-6 bg-white rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            Doanh Thu Theo Thời Gian
          </h2>
          <Chart />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
