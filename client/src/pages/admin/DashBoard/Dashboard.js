import React, { useEffect, useState } from "react";
import SideBar from "./SideBar";
import Navbar from "./Navbar";
import Chart from "./Chart";
import StatCard from "./StatCard";
import AppContext from "../../../context/AppContext";

const Dashboard = () => {
  const { movies = [] } = React.useContext(AppContext);
  const [users, setUsers] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5000/api/v1/user/getAllUser")
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }, []);

  console.log(users);
  return (
    <div className="flex dark:bg-gray-900 min-h-screen">
      {/* Sidebar Component */}
      <SideBar />

      {/* Main Content */}
      <div className="flex-1 p-6">
        {/* Navbar Component */}
        <Navbar />

        {/* Statistics Cards */}
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
          <StatCard title="Revenue" value="$12,000" bgColor="bg-yellow-500" />
          <StatCard title="Active Sessions" value="650" bgColor="bg-red-500" />
        </div>

        {/* Chart Section */}
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
