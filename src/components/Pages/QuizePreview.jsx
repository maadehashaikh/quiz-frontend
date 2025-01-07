import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const QuizPreview = () => {
  const { id } = useParams(); // Quiz ID from the URL
  const navigate = useNavigate();
  const [quizDetails, setQuizDetails] = useState(null);

  // Fetch quiz details by ID
  useEffect(() => {
    const fetchQuizDetails = async () => {
      try {
        const token = localStorage.getItem("access");
        const response = await fetch(`http://127.0.0.1:8000/api/mcqs/${id}/`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setQuizDetails(data);
          console.log(data)
        } else {
          console.error("Failed to fetch quiz details:", response.status);
        }
      } catch (error) {
        console.error("Error fetching quiz details:", error);
      }
    };

    fetchQuizDetails();
  }, [id]);

  const handleDelete = async (questionId) => {
    try {
      const token = localStorage.getItem("access");
      const response = await fetch(
        `http://127.0.0.1:8000/api/mcqs/delete/${questionId}/`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        setQuizDetails((prev) => ({
          ...prev,
          questions: prev.questions.filter((q) => q.id !== questionId),
        }));
      } else {
        console.error("Failed to delete question:", response.status);
      }
    } catch (error) {
      console.error("Error deleting question:", error);
    }
  };

  if (!quizDetails) {
    return <p>Loading...</p>;
  }

  return (
    <div className="p-6 bg-black text-white min-h-screen">
      <h1 className="text-3xl font-bold mb-4">Quiz Preview</h1>
      <h2 className="text-xl">Title: {quizDetails.title}</h2>
      <h3>Course: {quizDetails.course_name}</h3>
      <h3>Subject: {quizDetails.subject}</h3>
      <h3>QuizeCode: {quizDetails.code}</h3>
      <div className="mt-6">
        {quizDetails.questions.map((question) => (
          <div
            key={question.id}
            className="bg-gray-800 p-4 rounded-lg mb-4 shadow-lg"
          >
            <h4 className="text-lg font-semibold">
              Q: {question.text}
            </h4>
            <ul className="mt-2">
              {Object.entries(question.options).map(([key, value]) => (
                <li key={key}>
                  {key}: {value}
                </li>
              ))}
            </ul>
            <p className="mt-2 text-green-400">
              Correct Option: {question.correct_option}
            </p>
            <button
              className="bg-red-600 px-4 py-2 rounded-sm mt-2"
              onClick={() => handleDelete(question.id)}
            >
              Delete Question
            </button>

            <button
  className="bg-yellow-500 px-4 py-2 rounded-sm mt-2"
  onClick={() => navigate(`/EditQuestion/${question.id}`)}
>
  Edit Question
</button>
          </div>
        ))}
      </div>
      <button
        className="bg-gray-500 px-4 py-2 mt-4 rounded-sm"
        onClick={() => navigate("/dashboard/quizzes")}
      >
        Back to Quizzes
      </button>
    </div>
  );
};

export default QuizPreview;



