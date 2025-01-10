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
import Quizzes from "./components/Quizzes";
import Dashboard from "./components/Pages/Dashboard";
import User_dashboard from "./components/User_dashboard";
import Presentation from "./components/Presentation";
import Quiz_participation from "./components/Pages/Quiz_participation";
import Quiz_question from "./components/Pages/Quiz_question";
import Live_polling from "./components/Pages/Live_polling";
import Quiz_history from "./components/Pages/Quiz_history";
import Create_New_Quiz from "./components/Pages/Create_New_Quiz";
import Quiz_details from "./components/Pages/Quiz_details";
import Question_Preview_Edit from "./components/Pages/Question_Preview_Edit";
import Questions_Preview from "./components/Pages/Questions_Preview";
import Quiz_User_History from "./components/Quiz_User_History";

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
        <Route path="/quizzes" element={<Quizzes />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/settings" element={<User_dashboard />} />
        <Route path="/presentation" element={<Presentation />} />
        <Route path="/quiz_participation" element={<Quiz_participation />} />
        <Route path="/quiz_question" element={<Quiz_question />} />
        <Route path="/live_polling" element={<Live_polling />} />
        <Route path="/quiz_history" element={<Quiz_history />} />
        <Route path="/create_new_quiz" element={<Create_New_Quiz />} />
        <Route path="/quiz_details" element={<Quiz_details />} />
        <Route path="/preview_Edit" element={<Question_Preview_Edit />} />
        <Route path="/question_preview" element={<Questions_Preview />} />
        <Route path="/quiz_user_history" element={<Quiz_User_History />} />
      </Routes>
    </>
  );
};

export default App;
