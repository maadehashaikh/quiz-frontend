import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const QuizPreview = () => {
  const { id } = useParams(); // Quiz ID from the URL
  const navigate = useNavigate();
  const [quizDetails, setQuizDetails] = useState(null);
  const [editing, setEditing] = useState(false);
  const [updatedQuiz, setUpdatedQuiz] = useState({});

  const fetchWithAuth = async (url, options = {}) => {
    try {
      const token = localStorage.getItem("access");
      const refreshToken = localStorage.getItem("refresh");
      const response = await fetch(url, {
        ...options,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          ...options.headers,
        },
      });

      if (response.status === 401 && refreshToken) {
        // Refresh the token
        const refreshResponse = await fetch(
          "http://127.0.0.1:8000/api/token/refresh/",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ refresh: refreshToken }),
          }
        );

        if (refreshResponse.ok) {
          const refreshData = await refreshResponse.json();
          localStorage.setItem("access", refreshData.access);

          // Retry the original request with new token
          const retryResponse = await fetch(url, {
            ...options,
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${refreshData.access}`,
              ...options.headers,
            },
          });
          return retryResponse;
        } else {
          console.error("Refresh token invalid or expired");
          navigate("/login"); // Redirect to login if refresh token fails
        }
      } else {
        return response;
      }
    } catch (error) {
      console.error("Error during fetchWithAuth:", error);
      throw error;
    }
  };

  // Fetch quiz details by ID
  useEffect(() => {
    const fetchQuizDetails = async () => {
      try {
        const response = await fetchWithAuth(
          `http://127.0.0.1:8000/api/mcqs/${id}/`,
          { method: "GET" }
        );

        if (response.ok) {
          const data = await response.json();
          setQuizDetails({
            ...data,
            questions: data.questions || [], // Ensure questions is always an array
          });
          setUpdatedQuiz(data);
          console.log(data);
        } else {
          console.error("Failed to fetch quiz details:", response.status);
        }
      } catch (error) {
        console.error("Error fetching quiz details:", error);
      }
    };

    fetchQuizDetails();
  }, [id]);

  const handleInputChange = (e, field) => {
    setUpdatedQuiz((prev) => ({
      ...prev,
      [field]: e.target.value,
    }));
  };

  const handleSave = async () => {
    try {
      const response = await fetchWithAuth(
        `http://127.0.0.1:8000/api/mcqs/editQuiz/${id}/`,
        {
          method: "PUT",
          body: JSON.stringify(updatedQuiz),
        }
      );

      if (response.ok) {
        const data = await response.json();
        setQuizDetails((prev) => ({
          ...prev,
          ...data,
          questions: data.questions || prev.questions, // Preserve questions if not updated
        }));
        setEditing(false);
        console.log("Quiz updated successfully:", data);
        // navigate(`/QuizPreview/${id}`);

      } else {
        console.error("Failed to update quiz:", response.status);
      }
    } catch (error) {
      console.error("Error updating quiz:", error);
    }
  };

  const handleDelete = async (questionId) => {
    try {
      const response = await fetchWithAuth(
        `http://127.0.0.1:8000/api/mcqs/delete/${questionId}/`,
        { method: "DELETE" }
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
      <h2 className="text-xl">
        Title:{" "}
        {editing ? (
            <input
              type="text"
              value={updatedQuiz.title}
              onChange={(e) => handleInputChange(e, "title")}
              className="text-black px-2 py-1 rounded"
            />
          ) : (
            quizDetails.title
          )}
           <button
            className="ml-2 text-yellow-400"
            onClick={() => setEditing((prev) => !prev)}
          >
            ✏️
          </button></h2>
      <h3>Course: {" "}
          {editing ? (
            <input
              type="text"
              value={updatedQuiz.course_name}
              onChange={(e) => handleInputChange(e, "course_name")}
              className="text-black px-2 py-1 rounded"
            />
          ) : (
            quizDetails.course_name
          )}</h3>
      <h3>Subject: {" "}
          {editing ? (
            <input
              type="text"
              value={updatedQuiz.subject}
              onChange={(e) => handleInputChange(e, "subject")}
              className="text-black px-2 py-1 rounded"
            />
          ) : (
            quizDetails.subject
          )}</h3>
          <h3>Description: {" "}
          {editing ? (
            <textarea
              value={updatedQuiz.description}
              onChange={(e) => handleInputChange(e, "description")}
              className="text-black px-2 py-1 rounded w-full"
            />
          ) : (
            quizDetails.description
          )}</h3>
      <h3>QuizeCode: {quizDetails.code}</h3>
      {editing && (
        <button
          className="bg-green-600 px-4 py-2 rounded-sm mt-2"
          onClick={handleSave}
        >
          Save Changes
        </button>
      )}
      <div className="mt-6">
         {quizDetails.questions && quizDetails.questions.length > 0 ? (quizDetails.questions.map((question) => (
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
        ))
      ):(<p>No questions available for this quiz.</p>)}
      </div>
      <button
        className="bg-gray-500 px-4 py-2 mt-4 rounded-sm"
        onClick={() => navigate("/quizzes")}
      >
        Back to Quizzes
      </button>
    </div>
  );
};

export default QuizPreview;



