import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FiHome, FiUser, FiSettings, FiMenu } from "react-icons/fi";

const SideBar = () => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div
      className={`bg-gray-800 text-white h-screen  rounded-lg  ${
        isOpen ? "w-64" : "w-20"
      } transition-width duration-300`}
    >
      <button
        className="p-4 focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        <FiMenu size={24} />
      </button>
      <h2 className={`text-2xl font-bold mb-8 ${isOpen ? "block" : "hidden"}`}>
        Admin
      </h2>
      <nav>
        <Link
          to="/admin"
          className="flex items-center py-2 px-4 hover:bg-gray-700"
        >
          <FiHome size={20} />
          <span className={`${isOpen ? "ml-4" : "hidden"}`}>Dashboard</span>
        </Link>
        <Link
          to="/admin/user"
          className="flex items-center py-2 px-4 hover:bg-gray-700"
        >
          <FiUser size={20} />
          <span className={`${isOpen ? "ml-4" : "hidden"}`}>Users</span>
        </Link>
        <Link
          to="/settings"
          className="flex items-center py-2 px-4 hover:bg-gray-700"
        >
          <FiSettings size={20} />
          <span className={`${isOpen ? "ml-4" : "hidden"}`}>Settings</span>
        </Link>
      </nav>
    </div>
  );
};

export default SideBar;
