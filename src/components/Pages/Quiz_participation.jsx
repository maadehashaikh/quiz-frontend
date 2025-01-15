import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const QuizParticipation = () => {
  const [code, setCode] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [response, setResponse] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://127.0.0.1:8000/api/join-quiz/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ code, name, email }),
      });

      const data = await res.json();
      if (res.ok) {
        setResponse(data);
        toast.success("Quiz joined successfully! 🎉");
        navigate(`/quiz/${data.quiz_id}/${data.participant_id}`);
      } else {
        toast.error(data.error || "Something went wrong! 😟");
      }
    } catch (error) {
      console.error("Error joining quiz:", error);
      toast.error("An error occurred. Please try again later. 😢");
    }
  };

  return (
    <div className="pt-16 bg-black min-h-screen">
    <div className="bg-gray-700 rounded-lg w-full sm:w-fit px-8 sm:px-28 py-7 text-white m-auto mb-10">
      <h1 className="mb-4 text-3xl sm:ml-3 text-center sm:text-left">Enter The Code</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Enter Quiz Code"
          className="bg-red-100 text-red-500 px-4 sm:px-20 py-2 rounded-lg block mb-4 w-full"
        />
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter Your Name"
          className="bg-red-100 text-red-500 px-4 sm:px-20 py-2 rounded-lg block mb-4 w-full"
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter Your Email"
          className="bg-red-100 text-red-500 px-4 sm:px-20 py-2 rounded-lg block mb-4 w-full"
        />
        <button
          type="submit"
          className="text-red-100 bg-red-500 px-10 py-2 rounded-lg w-full sm:w-fit mx-auto block"
        >
          SUBMIT
        </button>
      </form>
      {response && (
        <div className="mt-4 text-green-400">
          <p>Participant ID: {response.participant_id}</p>
          <p>Quiz ID: {response.quiz_id}</p>
        </div>
      )}
    </div>
    <ToastContainer />
  </div>
  
  );
};

export default QuizParticipation;
