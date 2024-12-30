import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FiHome, FiUser, FiSettings, FiMenu, FiFilm } from "react-icons/fi";
import { MdTheaters } from "react-icons/md";
import { IoTicketOutline } from "react-icons/io5";
import { SlCalender } from "react-icons/sl";

const SideBar = () => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div
      className={`bg-white text-black h-full ${
        isOpen ? "w-64" : "w-20"
      } transition-all duration-300 shadow-md`}
    >
      <button
        className="p-4 focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        <FiMenu size={24} />
      </button>
      <h2 className={`text-2xl font-bold mb-8 ${isOpen ? "block" : "hidden"}`}>
        Quản Trị
      </h2>
      <nav>
        <Link
          to="/admin"
          className="flex items-center py-2 px-4 hover:bg-gray-200"
        >
          <FiHome size={20} />
          <span className={`${isOpen ? "ml-4" : "hidden"}`}>
            Bảng Điều Khiển
          </span>
        </Link>
        <Link
          to="/admin/user"
          className="flex items-center py-2 px-4 hover:bg-gray-200"
        >
          <FiUser size={20} />
          <span className={`${isOpen ? "ml-4" : "hidden"}`}>Người Dùng</span>
        </Link>
        <Link
          to="/admin/movie"
          className="flex items-center py-2 px-4 hover:bg-gray-200"
        >
          <FiFilm size={20} />
          <span className={`${isOpen ? "ml-4" : "hidden"}`}>Phim</span>
        </Link>

        <Link
          to="/admin/cinema"
          className="flex items-center py-2 px-4 hover:bg-gray-200"
        >
          <MdTheaters size={20} />
          <span className={`${isOpen ? "ml-4" : "hidden"}`}>Rạp</span>
        </Link>

        <Link
          to="/admin/showtime"
          className="flex items-center py-2 px-4 hover:bg-gray-200"
        >
          <SlCalender size={20} />
          <span className={`${isOpen ? "ml-4" : "hidden"}`}>Lịch Chiếu</span>
        </Link>

        <Link
          to="/admin/reservation"
          className="flex items-center py-2 px-4 hover:bg-gray-200"
        >
          <IoTicketOutline size={20} />
          <span className={`${isOpen ? "ml-4" : "hidden"}`}>Đặt Vé</span>
        </Link>
        <Link
          to="/settings"
          className="flex items-center py-2 px-4 hover:bg-gray-200"
        >
          <FiSettings size={20} />
          <span className={`${isOpen ? "ml-4" : "hidden"}`}>Cài Đặt</span>
        </Link>
      </nav>
    </div>
  );
};

export default SideBar;
