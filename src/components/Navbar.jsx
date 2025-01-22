// import React, { useState } from "react";
// import { NavLink, useLocation, useNavigate } from "react-router-dom";
// import "../App.css";
// import logo from "../Images/logo.png";
// import whiteLogo from "../Images/whiteLogo.png"
// import { useTheme } from "./TheamContext";

// const Navbar = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const {theme , toggleTheme}  =useTheme();
//   const isAuthPage =
//     location.pathname === "/login" ||
//     location.pathname === "/signup" ||
//     location.pathname === "/forgotPassword";

//   const isLoggedIn = !!localStorage.getItem("access");

//   const handleLogout = () => {
//     localStorage.removeItem("access");
//     localStorage.removeItem("refresh");
//     navigate("/login");
//   };

//   const [isMenuOpen, setIsMenuOpen] = useState(false);

//   return (
//     <div className={`navbar ${theme === "dark" ? "bg-black text-white" : "bg-white text-black"}`}>

//     <div >
//       <div className="flex items-center justify-between px-4 py-4">
//         {/* Logo */}
//         <div>
          
//           <img src={theme == "dark" ?  logo : whiteLogo} alt="Logo" className="w-[120px]" />
//         </div>
         

//         {/* Toggle Button for Mobile */}
//         <div className="flex items-center gap-5">

//         <button
//           className="lg:hidden text-2xl"
//           onClick={() => setIsMenuOpen(!isMenuOpen)}
//         >
//           <i className="fas fa-bars"></i>
//         </button>
//         </div>

//         {/* Desktop Navbar */}
//         <nav
//           className={`lg:flex gap-12 text-lg font-medium ${
//             isMenuOpen ? "flex" : "hidden"
//           } lg:block`}
//         >
//           <NavLink
//             to="/"
//             className={({ isActive }) =>
//               isActive ? "text-red-600" : " "
//             }
//           >
//             Home
//           </NavLink>
//           <NavLink
//             to="/about"
//             className={({ isActive }) =>
//               isActive ? "text-red-600" : " "
//             }
//           >
//             About Us
//           </NavLink>
//           <NavLink
//             to="/help"
//             className={({ isActive }) =>
//               isActive ? "text-red-600" : " "
//             }
//           >
//             Help
//           </NavLink>
//           {!isLoggedIn && (
//             <NavLink
//               to="/login"
//               className={isAuthPage ? "text-red-600" : " "}
//             >
//               Login/Sign Up
//             </NavLink>
//           )}
//         </nav>
       

//         {/* Right Side - Logout and Icons */}
//         <div className="flex items-center gap-5">
//           {isLoggedIn && (
//             <>
//               <div className="flex gap-5">
//                 <div className="bg-red-600 px-2 py-1 rounded-3xl">
//                   <i className="fa-solid fa-bell text-black"></i>
//                 </div>
//                 <NavLink to={"/dashboard"}>
//                   <div className="bg-red-600 px-2 py-1 rounded-3xl">
//                     <i className="fa-solid fa-user  "></i>
//                   </div>
//                 </NavLink>
//               </div>
//               <button
//                 onClick={handleLogout}
                
//               >
//                 Logout
//               </button>
//             </>
//           )}
//            {/* Theme Toggle */}
//          <button onClick={toggleTheme} className="p-2 rounded">
//           {theme === "light" ? (
//               <i className="fas fa-moon"></i>
//             ) : (
//               <i className="fas fa-sun text-yellow-400"></i>
//             )}
//         </button>
//         </div>
        
//       </div>
//     </div>
//     </div>
//   );
// };

// export default Navbar;



import React, { useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useTheme } from "./TheamContext";
import logo from "../Images/logo.png";
import whiteLogo from "../Images/whiteLogo.png"
import {
  FaBell,
  FaUser,
  FaMoon,
  FaSun,
  FaBars,
  FaTimes,
  FaHome,
  FaInfoCircle,
  FaQuestionCircle,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";
import { Drawer, Button } from "antd";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);

  const isAuthPage =
    location.pathname === "/login" ||
    location.pathname === "/signup" ||
    location.pathname === "/forgotPassword";

  // const isLoggedIn = true;
  const isLoggedIn = !!localStorage.getItem("access");



  const handleLogout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    navigate("/login");
  };

  const drawerContent = (
    <div
      className={`p-4 space-y-6 h-full ${
        theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"
      }`}
    >
      <div className="space-y-5">
        <NavLink
          to="/"
          onClick={() => setIsDrawerVisible(false)}
          className={({ isActive }) =>
            isActive
              ? "flex items-center space-x-2 text-red-600 font-semibold"
              : "flex items-center space-x-2 hover:text-red-600"
          }
        >
          <FaHome size={20} />
          <span className="font-semibold text-base">Home</span>
        </NavLink>
        <NavLink
          to="/about"
          onClick={() => setIsDrawerVisible(false)}
          className={({ isActive }) =>
            isActive
              ? "flex items-center space-x-2 text-red-600 font-semibold"
              : "flex items-center space-x-2 hover:text-red-600"
          }
        >
          <FaInfoCircle size={20} />
          <span className="font-semibold text-base">About Us</span>
        </NavLink>
        <NavLink
          to="/help"
          onClick={() => setIsDrawerVisible(false)}
          className={({ isActive }) =>
            isActive
              ? "flex items-center space-x-2 text-red-600 font-semibold"
              : "flex items-center space-x-2 hover:text-red-600"
          }
        >
          <FaQuestionCircle size={20} />
          <span className="font-semibold text-base">Help</span>
        </NavLink>
        {!isLoggedIn && (
          <NavLink
            to="/login"
            onClick={() => setIsDrawerVisible(false)}
            className={
              isAuthPage
                ? "flex items-center space-x-2 text-red-600 font-semibold"
                : "flex items-center space-x-2 hover:text-red-600"
            }
          >
            <span className="font-semibold text-base">Login/Sign Up</span>
          </NavLink>
        )}
      </div>
      {isLoggedIn && (
        <div className="space-y-4 border-t pt-4">
          <div className="flex items-center gap-4">
            <div className="flex flex-col items-center">
              <div
                className={`p-3 rounded-full shadow-md ${
                  theme === "dark" ? "bg-gray-800" : "bg-white"
                }`}
              >
                <FaBell className="text-red-600" size={20} />
              </div>
              <span className="text-base font-semibold mt-1">Alerts</span>
            </div>
            <NavLink
              to="/dashboard"
              onClick={() => setIsDrawerVisible(false)}
              className="flex flex-col items-center"
            >
              <div
                className={`p-3 rounded-full shadow-md ${
                  theme === "dark" ? "bg-gray-800" : "bg-white"
                }`}
              >
                <FaUser className="text-red-600" size={20} />
              </div>
              <span className="mt-1 text-base font-semibold">Profile</span>
            </NavLink>
            <div className="flex flex-col items-center">
              <div
                className={`p-3 rounded-full shadow-md ${
                  theme === "dark" ? "bg-gray-800" : "bg-white"
                }`}
              >
                <FaCog className="text-red-600" size={20} />
              </div>
              <span className=" mt-1 text-base font-semibold">Settings</span>
            </div>
          </div>
          <button
            onClick={() => {
              handleLogout();
              setIsDrawerVisible(false);
            }}
            className="w-full flex items-center gap-2 justify-center bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-full py-2 transition-colors"
          >
            <FaSignOutAlt size={18} />
            <span>Logout</span>
          </button>
        </div>
      )}

      <div className="pt-4 border-t">
        <button
          onClick={() => {
            toggleTheme();
            setIsDrawerVisible(false);
          }}
          className="flex items-center gap-2 p-2 w-full rounded-full bg-gray-400 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
        >
          {theme === "light" ? (
            <>
              <FaMoon size={18} className="text-white" />
              <span className="text-sm font-semibold text-white">
                Dark Mode
              </span>
            </>
          ) : (
            <>
              <FaSun size={18} className="text-yellow-400" />
              <span className="text-sm font-semibold">Light Mode</span>
            </>
          )}
        </button>
      </div>
    </div>
  );

  return (
    <div
      className={`navbar ${
        theme === "dark" ? "bg-black text-white" : "bg-white text-black"
      }`}
    >
      <div className="flex items-center justify-between px-4 py-4">
        <div>
          
          <img src={theme == "dark" ?  logo : whiteLogo} alt="Logo" className="w-[120px]" />
        </div>

        <nav className="hidden lg:flex gap-12 text-lg font-medium">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "text-red-600 font-semibold" : "hover:text-red-600"
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              isActive ? "text-red-600 font-semibold" : "hover:text-red-600"
            }
          >
            About Us
          </NavLink>
          <NavLink
            to="/help"
            className={({ isActive }) =>
              isActive ? "text-red-600 font-semibold" : "hover:text-red-600"
            }
          >
            Help
          </NavLink>
          {!isLoggedIn && (
            <NavLink
              to="/login"
              className={
                isAuthPage ? "text-red-600 font-semibold" : "hover:text-red-600"
              }
            >
              Login/Sign Up
            </NavLink>
          )}
        </nav>

        <div className="hidden lg:flex items-center gap-5">
          {isLoggedIn && (
            <>
              <div className="flex gap-5">
                <div className="bg-red-600 px-2 py-2 rounded-3xl">
                  <FaBell className="text-black" size={20} />
                </div>
                <NavLink to="/dashboard">
                  <div className="bg-red-600 px-2 py-2 rounded-3xl">
                    <FaUser className="text-black" size={20} />
                  </div>
                </NavLink>
              </div>
              <button
                onClick={handleLogout}
                className="hover:text-red-600 font-medium transition-colors"
              >
                Logout
              </button>
            </>
          )}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full hover:text-red-600 transition-colors"
          >
            {theme === "light" ? (
              <FaMoon size={20} />
            ) : (
              <FaSun className="text-yellow-400" size={20} />
            )}
          </button>
        </div>

        <div className="lg:hidden">
          <Button
            type="text"
            onClick={() => setIsDrawerVisible(true)}
            icon={<FaBars className="w-5 h-5 text-white" />}
            className={`navbar ${
              theme === "dark"
                ? "!bg-white text-black hover:!bg-white hover:!text-black"
                : "bg-black text-white hover:!bg-black hover:!text-white"
            }`}
          />
        </div>
      </div>
      <div className="bg-black">

      <Drawer
        placement="right"
        closable
        onClose={() => setIsDrawerVisible(false)}
        visible={isDrawerVisible}
        closeIcon={<FaTimes className="text-black" />}
        bodyStyle={{
          padding: 0,
          background: theme === "dark" ? "#1f2937" : "#f9fafb",
        }}
      >
        {drawerContent}
      </Drawer>
      </div>

    </div>
  );
};

export default Navbar;