import React, { useState } from "react";
import { NavLink } from "react-router-dom";

const Setting = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const userName = localStorage.getItem("name") || "User";

  return (
    <div className="relative">
      {/* Hamburger Button for Mobile and Tablet */}
      <button
        className="absolute top-4 left-4 md:hidden bg-gray-800 text-white p-2 rounded-md z-20"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        <i className="fa-solid fa-bars"></i>
      </button>

      {/* Sidebar Menu */}
      <div
        className={`fixed w-[20%] h-full bg-gray-100 shadow-lg transition-transform duration-300 z-20 w-3/4 md:w-1/4 lg:w-[16%] ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0`}
      >
        <h2 className="text-2xl font-bold text-start pl-5 mt-10">
          Hi, {userName}
        </h2>
        <div className="flex flex-col font-thin gap-4 px-4 mt-4">
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              `text-gray-400 flex items-center py-2 ${
                isActive
                  ? "text-red-600 bg-red-100 rounded-md"
                  : "hover:text-red-600"
              }`
            }
          >
            <i className="fa-solid fa-house mr-3"></i> Dashboard
          </NavLink>
          <NavLink
            to="/quizzes"
            className={({ isActive }) =>
              `text-gray-400 flex items-center py-2 ${
                isActive
                  ? "text-red-600 bg-red-100 rounded-md"
                  : "hover:text-red-600"
              }`
            }
          >
            <i className="fa-solid fa-question mr-3"></i> Quizzes
          </NavLink>
          <NavLink
            to="/presentation"
            className={({ isActive }) =>
              `text-gray-400 flex items-center py-2 ${
                isActive
                  ? "text-red-600 bg-red-100 rounded-md"
                  : "hover:text-red-600"
              }`
            }
          >
            <i className="fa-solid fa-person-chalkboard mr-3"></i> Presentation
          </NavLink>
          <NavLink
            to="/quiz_user_analysis"
            className={({ isActive }) =>
              `text-gray-400 flex items-center py-2 ${
                isActive
                  ? "text-red-600 bg-red-100 rounded-md"
                  : "hover:text-red-600"
              }`
            }
          >
            <i className="fa-solid fa-chart-line mr-3"></i> Analytics
          </NavLink>
          <div className="text-gray-400 flex items-center gap-3 py-2 hover:text-red-600">
            <i className="fa-solid fa-bell"></i> Notification
          </div>
          <NavLink
            to="/settings"
            className={({ isActive }) =>
              `text-gray-400 flex items-center py-2 ${
                isActive
                  ? "text-red-600 bg-red-100 rounded-md"
                  : "hover:text-red-600"
              }`
            }
          >
            <i className="fa-solid fa-gear mr-3"></i> Settings
          </NavLink>
        </div>
      </div>

      {/* Overlay for Mobile Menu */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-10"
          onClick={() => setIsMenuOpen(false)}
        ></div>
      )}
    </div>
  );
};

export default Setting;
