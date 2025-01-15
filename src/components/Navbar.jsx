import React, { useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import "../App.css";
import logo from "../Images/logo.png";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isAuthPage =
    location.pathname === "/login" ||
    location.pathname === "/signup" ||
    location.pathname === "/forgotPassword";

  const isLoggedIn = !!localStorage.getItem("access");

  const handleLogout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    navigate("/login");
  };

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="bg-black text-white">
      <div className="flex items-center justify-between px-4 py-4">
        {/* Logo */}
        <div>
          <img src={logo} alt="Logo" className="w-[120px]" />
        </div>

        {/* Toggle Button for Mobile */}
        <div className="flex items-center gap-5">

        <button
          className="lg:hidden text-white text-2xl"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <i className="fas fa-bars"></i>
        </button>
        </div>

        {/* Desktop Navbar */}
        <nav
          className={`lg:flex gap-12 text-lg font-medium ${
            isMenuOpen ? "flex" : "hidden"
          } lg:block`}
        >
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "text-red-600" : "text-white"
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              isActive ? "text-red-600" : "text-white"
            }
          >
            About Us
          </NavLink>
          <NavLink
            to="/help"
            className={({ isActive }) =>
              isActive ? "text-red-600" : "text-white"
            }
          >
            Help
          </NavLink>
          {!isLoggedIn && (
            <NavLink
              to="/login"
              className={isAuthPage ? "text-red-600" : "text-white"}
            >
              Login/Sign Up
            </NavLink>
          )}
        </nav>

        {/* Right Side - Logout and Icons */}
        <div className="flex items-center gap-5">
          {isLoggedIn && (
            <>
              <div className="flex gap-5">
                <div className="bg-red-600 px-2 py-1 rounded-3xl">
                  <i className="fa-solid fa-bell text-black"></i>
                </div>
                <NavLink to={"/dashboard"}>
                  <div className="bg-red-600 px-2 py-1 rounded-3xl">
                    <i className="fa-solid fa-user text-white"></i>
                  </div>
                </NavLink>
              </div>
              <button
                onClick={handleLogout}
                className="text-white"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
