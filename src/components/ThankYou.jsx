import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useTheme } from "./TheamContext";

const ThankYouPage = () => {
  const navigate = useNavigate();
  const { participantId } = useParams(); // Assuming participantId is passed as a route param
  const [result, setResult] = useState(null);
  const {theme} = useTheme();
  const bgClass = theme === "dark" ? "bg-black text-white" : "bg-white text-black";

  useEffect(() => {
    fetch(`http://127.0.0.1:8000//api/participant/${participantId}/result/`)
      .then((response) => response.json())
      .then((data) => setResult(data))
      .catch((error) => console.error("Error fetching results:", error));
  }, [participantId]);

  return (
    <div className={`w-full h-screen ${bgClass} flex flex-col justify-center items-center`}>
      <h1 className="text-4xl font-bold mb-4">Thank You! 🙏</h1>
      <p className="text-xl mb-8">You have successfully attempted the quiz. </p>
      {result ? (
        <div className="text-2xl mb-8">
          <p><b>Name:</b> {result.name}</p>
          <p><b>Total Questions:</b> {result.total_questions}</p>
          <p><b>Correct Answers: </b>{result.correct_answers}</p>
          <p><b>Wrong Answers: </b>{result.wrong_answers}</p>
          <p>
            <b>Status:</b>{" "}
            {result.passed == "Pass" ? (
              <span className="text-green-500">Pass</span>
            ) : (
              <span className="text-red-500">Fail</span>
            )}
          </p>
        </div>
      ) : (
        <p className="text-xl mb-8">Please Wait for results...</p>
      )}
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
