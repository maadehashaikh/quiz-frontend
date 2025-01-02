import React from "react";
import { NavLink } from "react-router-dom";

const Setting = () => {
  const userName = localStorage.getItem("name") || "User";

  return (
    <div className="w-[20%] h-full absolute bg-slate-00">
      <h2 className="text-4xl text-start pl-5 mt-10">Hi, {userName}</h2>
      <div className="flex flex-col font-thin gap-4 px-4 mt-4">
        <div className="text-gray-400 flex">
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              isActive
                ? "text-red-600 bg-red-100 pr-7 rounded-md py-1"
                : "text-gray-400"
            }
          >
            <i class="fa-solid fa-house mr-3"></i>
            Dashboard
          </NavLink>
        </div>
        <div className="text-gray-400 flex gap-12 ">
          <NavLink
            to="/quizzes"
            className={({ isActive }) =>
              isActive
                ? "text-red-600 bg-red-100 pr-7 rounded-md py-1"
                : "text-gray-400"
            }
          >
            <i class="fa-solid fa-question mr-4"></i>
            Quizzes
          </NavLink>
        </div>

        <div className="text-gray-400 flex gap-12 ">
          <NavLink
            to="/presentation"
            className={({ isActive }) =>
              isActive
                ? "text-red-600 bg-red-100 pr-7 rounded-md py-1"
                : "text-gray-400"
            }
          >
            <i class="fa-solid fa-person-chalkboard mr-4"></i>
            Presentation
          </NavLink>
        </div>
        <div className="text-gray-400 flex gap-3">
          <i className="fa-solid fa-chart-line"></i>
          Analytics
        </div>
        <div className="text-gray-400 flex gap-3">
          <i className="fa-solid fa-bell"></i>
          Notification
        </div>
        <div className="text-gray-400 flex gap-12">
          <NavLink
            to="/settings"
            className={({ isActive }) =>
              isActive
                ? "text-red-600 bg-red-100 pr-7 rounded-md py-1"
                : "text-gray-400"
            }
          >
            <i class="fa-solid fa-gear mr-3"></i>
            Settings
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Setting;
