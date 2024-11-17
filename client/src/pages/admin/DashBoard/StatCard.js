import React from "react";

const StatCard = ({ title, value, bgColor }) => (
  <div
    className={`p-6 rounded-lg shadow-lg ${bgColor} text-white transition-transform transform hover:scale-105`}
  >
    <p className="text-sm font-medium">{title}</p>
    <h2 className="text-3xl font-bold">{value}</h2>
  </div>
);

export default StatCard;
