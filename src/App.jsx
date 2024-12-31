import React from "react";
import { Routes, Route } from "react-router-dom";
import SignUp from "./components/Pages/SignUp";
import Navbar from "./components/Navbar";
import Home from "./components/Pages/Home";
import About from "./components/Pages/About";
import Help from "./components/Pages/Help";
import Login from "./components/Pages/Login";
import ForgotPassword from "./components/Pages/ForgotPassword";
import ResetPassword from "./components/Pages/ResetPassword";
// import SettingPage from "./components/Pages/SettingPage";
import Quizzes from "./components/Quizzes";
import Dashboard from "./components/Pages/Dashboard";
import Setting from "./components/Setting";

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/help" element={<Help />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/forgotPassword" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/dashboard" element={<Setting />} />
        <Route path="/dashboard/quizzes" element={<Quizzes />} />
        <Route path="/dashboard/dashboard" element={<Dashboard />} />
      </Routes>
    </>
  );
};

export default App;
