import React, { useState, useEffect } from "react";
import { FiSearch, FiBell, FiUser } from "react-icons/fi";

const Navbar = () => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <div className="flex items-center justify-between px-4 py-3 bg-white dark:bg-gray-800 rounded-lg shadow mb-6">
      <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
        Dashboard
      </h1>
      <div className="flex space-x-4">
        <FiSearch className="text-gray-500 dark:text-gray-300 cursor-pointer" />
        <FiBell className="text-gray-500 dark:text-gray-300 cursor-pointer" />
        <FiUser className="text-gray-500 dark:text-gray-300 cursor-pointer" />
      </div>
      <button
        onClick={() => setDarkMode(!darkMode)}
        className="p-2 bg-gray-200 dark:bg-gray-600 rounded-full"
      >
        {darkMode ? "🌞" : "🌜"}
      </button>
    </div>
  );
};

export default Navbar;
