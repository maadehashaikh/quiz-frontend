import React from "react";
import { useNavigate } from "react-router-dom";

const ThankYouPage = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full h-screen bg-black text-white flex flex-col justify-center items-center">
      <h1 className="text-4xl font-bold mb-4">Thank You! 🙏</h1>
      <p className="text-xl mb-8">You have successfully attempted the quiz. Please wait for the results.</p>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={() => navigate("/quiz_participation")}
      >
        Back to Quiz Participation
      </button>
    </div>
  );
};

export default ThankYouPage;
