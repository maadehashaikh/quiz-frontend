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
import GenerateQuiz from "./components/Pages/GenrateQuiz";
import QuizPreview from "./components/Pages/QuizePreview";
import EditQuestion from "./components/Pages/EditPage";
import Quiz_User_History from "./components/Pages/QuizUserHistory";
import QuizAnalysis from "./components/Pages/QUestion_report";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Quiz_User_Analysis from "./components/Quiz_User_analyis";
import ThankYouPage from "./components/ThankYou";



const App = () => {
  return (
    <>
    <ToastContainer />
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
        <Route path="/quiz/:quizId/:participantId" element={<Quiz_question />} />
        <Route path="/live_polling/:Id" element={<Live_polling />} /> 
        <Route path="/GenrateQuize" element={<GenerateQuiz />} />
        <Route path="/QuizPreview/:id" element={<QuizPreview />} />
        <Route path="/EditQuestion/:id" element={<EditQuestion />} />
        <Route path="/quiz_user_history/:id" element={<Quiz_User_History />} />
        <Route path="/quiz_report" element={<QuizAnalysis />} />
        <Route path="/quiz_user_analysis" element={<Quiz_User_Analysis />} />
        <Route path="/thank-you" element={<ThankYouPage />} />
      </Routes>
    </>
  );
};

export default App;
