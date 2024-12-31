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
import SettingPage from "./components/Pages/SettingPage";
import Quizzes from "./components/Quizzes";
import GenerateQuiz from "./components/Pages/GenrateQuiz";
import QuizPreview from "./components/Pages/QuizePreview";
import EditQuestion from "./components/Pages/EditPage";

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
        <Route path="/dashboard" element={<SettingPage />} />
        <Route path="/dashboard/quizzes" element={<Quizzes />} />
        <Route path="/GenrateQuize" element={<GenerateQuiz />} />
        <Route path="/QuizPreview/:id" element={<QuizPreview />} />
        <Route path="/EditQuestion/:id" element={<EditQuestion />} />
      </Routes>
    </>
  );
};

export default App;
