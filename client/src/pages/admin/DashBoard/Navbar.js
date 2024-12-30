import React, { useState, useEffect } from "react";
import { FiSearch, FiBell, FiUser } from "react-icons/fi";

const Navbar = () => {
  return (
    <div className="flex items-center justify-between px-4 py-3 bg-white rounded-lg shadow mb-6">
      <h1 className="text-2xl font-bold text-gray-800">Bảng điều khiển</h1>
      <div className="flex space-x-4">
        <FiSearch
          className="text-gray-500 cursor-pointer"
          aria-label="Search"
        />
        <FiBell
          className="text-gray-500 cursor-pointer"
          aria-label="Notifications"
        />
        <FiUser
          className="text-gray-500 cursor-pointer"
          aria-label="User Profile"
        />
      </div>
      <button
        className="p-2 bg-gray-200 rounded-full"
        aria-label="Toggle Dark Mode"
      >
        🌜
      </button>
    </div>
  );
};

export default Navbar;
