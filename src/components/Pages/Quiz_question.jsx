// import React from "react";

// const Quiz_question = () => {
//   return (
//     <div className="w-full h-screen bg-black">
//       <div className="pt-8">
//         <div className="bg-gray-800 rounded-lg w-fit px-28 py-7 text-white m-auto mb-10">
//           <h1 className="text-2xl mb-4">Question No. 1 </h1>
//           <h2 className="text-base">Who is the Prime Minister of Pakistan?</h2>
//         </div>
//         <div className="options flex px-10 flex-wrap gap-10">
//           <p className="bg-red-500 text-white pr-[35%] py-2 rounded-lg">
//             <i class="fa-solid fa-a text-red-500 bg-white px-2 py-2 rounded-2xl m-2"></i>
//             Option A
//           </p>
//           <p className="bg-blue-500 text-white pr-[35%] py-2 rounded-lg ml-10">
//             <i class="fa-solid fa-b text-blue-500 bg-white px-2 py-2 rounded-2xl m-2"></i>
//             Option B
//           </p>
//           <p className="bg-green-400 text-white pr-[35%] py-2 rounded-lg mt-8">
//             <i class="fa-solid fa-c text-green-400 bg-white px-2 py-2 rounded-2xl m-2"></i>
//             Option C
//           </p>
//           <p className="bg-fuchsia-500 text-white pr-[35%] py-2 rounded-lg mt-8 ml-10">
//             <i class="fa-solid fa-d text-fuchsia-500 bg-white px-2 py-2 rounded-2xl m-2"></i>
//             Option D
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Quiz_question;


import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const QuizQuestion = () => {
  const { quizId, participantId } = useParams(); 
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [responses, setResponses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quizFinished, setQuizFinished] = useState(false); // New state

  // const {quizId} = useParams();; // Replace with actual quiz ID
  // const participantId = 11; // Replace with actual participant ID

  // Fetch Questions
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const token = localStorage.getItem("access");
        if (!token) throw new Error("No token found");

        const response = await fetch(
          `http://127.0.0.1:8000/api/${quizId}/question-particepent/`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          console.log(data)
          setQuestions(data.questions);
        } else {
          throw new Error(`Failed to fetch questions: ${response.status}`);
        }
      } catch (err) {
        console.error("Error fetching questions:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, [quizId]);

  // Handle Option Selection
  const handleOptionSelect = (questionId, option) => {
    const updatedResponses = [...responses];
    const existingResponse = updatedResponses.find(
      (response) => response.question_id === questionId
    );

    if (existingResponse) {
      existingResponse.select_option = option;
    } else {
      updatedResponses.push({ question_id: questionId, select_option: option });
    }

    setResponses(updatedResponses);

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setQuizFinished(true);
    }
  };

  // Submit Responses
  const submitResponses = async (responses) => {
    try {
      const token = localStorage.getItem("access");
      if (!token) throw new Error("No token found");

      const response = await fetch(
        `http://127.0.0.1:8000/api/${participantId}/submit-responce/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ participant_id: participantId, responses }),
        }
      );
      console.log("Submitting Responses:", { participant_id: participantId, responses });
      if (response.ok) {
        const data = await response.json();
        alert("Quiz submitted successfully!");
        console.log("Submission Response:", data);
      } else {
        throw new Error(`Failed to submit responses: ${response.status}`);
      }
    } catch (err) {
      console.error("Error submitting responses:", err);
      setError(err.message);
    }
  };

  if (loading) return <div className="text-white text-center">Loading questions...</div>;
  if (error) return <div className="text-red-500 text-center">{error}</div>;
  if (questions.length === 0) return <div className="text-white text-center">No questions available</div>;

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="w-full h-screen bg-black text-white">
      <div className="pt-8">
        <div className="bg-gray-800 rounded-lg w-fit px-28 py-7 m-auto mb-10">
          <h1 className="text-2xl mb-4">
            Question No. {currentQuestionIndex + 1}
          </h1>
          <h2 className="text-base">{currentQuestion.text}</h2>
        </div>
        <div className="options flex px-10 flex-wrap gap-10">
          {Object.entries(currentQuestion.options).map(([key, value], index) => (
       <button
            key={index}
            className={`bg-blue-500 text-white pr-[35%] py-2 rounded-lg ${
              index > 1 ? "mt-8" : ""
            }`}
            onClick={() => handleOptionSelect(currentQuestion.id, key)}
          >
            {key}. {value}
          </button>
        ))}
        </div>
      </div>

      {quizFinished && ( // Only show the button if quizFinished is true
        <div className="text-center mt-8"> {/* Center the button */}
          <button
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => submitResponses(responses)}
          >
            Submit Quiz
          </button>
        </div>
      )}
    </div>
  );
};

export default QuizQuestion;
