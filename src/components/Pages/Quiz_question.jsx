import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";


const QuizQuestion = () => {
  const { quizId, participantId } = useParams();
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [responses, setResponses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [timer, setTimer] = useState(20);
  const [quizFinished, setQuizFinished] = useState(false);

  // Fetch Questions
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch(
          `http://127.0.0.1:8000/api/${quizId}/question-particepent/?participant_id=${participantId}`
        );

        if (response.ok) {
          const data = await response.json();
          if (data.message) {
            toast.error("You have already joined the quiz. Thank you!");
            navigate("/quiz_participation");
            return;
          } else if (!data.questions || data.questions.length === 0) {
            toast.error("No questions available for this quiz.");
            navigate("/quiz_participation");
            return;
          }
          setQuestions(data.questions);
        } else {
          if (response.status === 403) {
            toast.error("You are not authorized for this quiz.");
            navigate("/quiz_participation");
          } else {
            throw new Error(`Failed to fetch questions: ${response.status}`);
          }
        }
      } catch (err) {
        console.error("Error fetching questions:", err);
        toast.error(err.message || "Error fetching questions.");
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, [quizId, participantId, navigate]);

  // Timer Logic
  useEffect(() => {
    if (timer === 0) {
      if (currentQuestionIndex < questions.length - 1) {
        goToNextQuestion();
      } else {
        finishQuiz();
      }
    }
    const interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
    return () => clearInterval(interval);
  }, [timer, currentQuestionIndex, questions]);

  // Go to Next Question
  const goToNextQuestion = () => {
    setTimer(20);
    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
  };

  // Finish Quiz
  const finishQuiz = () => {
    setQuizFinished(true);
    submitResponses(responses)
    navigate("/thank-you");
  };

  // Handle Option Selection
  const handleOptionSelect = async (questionId, option) => {
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

    try {
      const token = localStorage.getItem("access");
          await fetch(`http://127.0.0.1:8000/api/${quizId}/live_polling/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          participant_id: participantId,
          question_id: questionId,
          selected_option: option,
        }),
      });
    } catch (error) {
      console.error("Error sending live update:", error);
    }
  
    if (currentQuestionIndex < questions.length - 1) {
      goToNextQuestion();
    } else {
      finishQuiz();
    }
  };

    // Submit Responses
    const submitResponses = async (responses) => {
      try {
        const response = await fetch(
          `http://127.0.0.1:8000/api/${quizId}/submit-responce/`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ participant_id: participantId, responses }),
          }
        );
  
        if (response.ok) {
          toast.success("Quiz submitted successfully!");
          navigate("/thank-you");
        } else {
          throw new Error(`Failed to submit responses: ${response.status}`);
        }
      } catch (err) {
        console.error("Error submitting responses:", err);
        toast.error(err.message || "Error submitting responses.");
      }
    };
  

  if (loading) return <div className="text-white text-center">Loading questions...</div>;
  if (questions.length === 0) return <div className="text-white text-center">No questions available</div>;

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="w-full h-screen bg-black text-white">
      <ToastContainer />
      <div className="pt-8">
        {/* Timer Display */}
        <div className="text-center text-3xl font-bold mb-6">Time Left: {timer}s</div>

        {/* Question Box */}
        <div
          className="w-11/12 md:w-2/3 lg:w-1/2 bg-gray-800 rounded-lg w-fit px-28 py-7 m-auto mb-10 slide-animation transition-transform duration-500 ease-in-out transform"
          key={currentQuestionIndex} // Key to trigger animation
        >
          <h1 className="text-2xl mb-4">Question No. {currentQuestionIndex + 1}</h1>
          <h2 className="text-base">{currentQuestion.text}</h2>
        </div>

        {/* Options */}
        <div className="options flex px-10 flex-wrap gap-10 transition duration-300">
          {Object.entries(currentQuestion.options).map(([key, value], index) => (
            <button
              key={index}
              className={`option-button bg-blue-500 text-white py-3 px-6 rounded-lg transition-all ${{
                0: "bg-red-500",
                1: "bg-green-500",
                2: "bg-blue-500",
                3: "bg-purple-500",
              }[index]}`}
              onClick={() => handleOptionSelect(currentQuestion.id, key)}
            >
              {key}. {value}
            </button>
          ))}
        </div>
      </div>
      
    </div>
  );
};

export default QuizQuestion;
