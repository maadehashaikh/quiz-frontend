import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useTheme } from "../TheamContext";

const QuizPreview = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [quizDetails, setQuizDetails] = useState(null);
  const [editing, setEditing] = useState(false);
  const [updatedQuiz, setUpdatedQuiz] = useState({});
  const [showPopup, setShowPopup] = useState(false);
  const [quizToDelete, setQuizToDelete] = useState(null);
  const { theme } = useTheme();

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
          navigate("/login");
        }
      } else {
        return response;
      }
    } catch (error) {
      console.error("Error during fetchWithAuth:", error);
      throw error;
    }
  };

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
            questions: data.questions || [],
          });
          setUpdatedQuiz(data);
        } else {
          console.error("Failed to fetch quiz details:", response.status);
        }
      } catch (error) {
        console.error("Error fetching quiz details:", error);
      }
    };

    fetchQuizDetails();
  }, [id]);

  const handleDeleteConfirmation = (questionId) => {
    setQuizToDelete(questionId);
    setShowPopup(true);
  };

  const handleSave = async () => {
  };
  const handleDelete = async () => {
    try {
      const response = await fetchWithAuth(
        `http://127.0.0.1:8000/api/mcqs/delete/${quizToDelete}/`,
        { method: "DELETE" }
      );

      if (response.ok) {
        setQuizDetails((prev) => ({
          ...prev,
          questions: prev.questions.filter((q) => q.id !== quizToDelete),
        }));
        setShowPopup(false);
        toast.success("Question deleted successfully!");
      } else {
        console.error("Failed to delete question:", response.status);
      }
    } catch (error) {
      console.error("Error deleting question:", error);
    }
  };

  const cancelDelete = () => {
    setShowPopup(false);
  };

  if (!quizDetails) {
    return <p>Loading...</p>;
  }

  return (
    <div className={`min-h-screen p-8 ${theme === "dark" ? "bg-black text-white" : "bg-white text-black"}`}>

    <div className={`p-8  min-h-screen  max-w-3xl`} >
      <h1 className="text-3xl px-6 font-bold mb-4">Quiz Preview</h1>
      <div className="text-xl shadow-lg px-4 rounded-lg items-start">

      <h2 className="">
      Title:{" "}
        {editing ? (
            <input
              type="text"
              value={updatedQuiz.title}
              onChange={(e) => handleInputChange(e, "title")}
              className="text-white bg-black px-2 py-1 rounded"
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
              className="text-white bg-black px-2 py-1 rounded"
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
              className="text-white bg-black px-2 py-1 rounded"
            />
          ) : (
            quizDetails.subject
          )}</h3>
          <h3>Description: {" "}
          {editing ? (
            <textarea
              value={updatedQuiz.description}
              onChange={(e) => handleInputChange(e, "description")}
              className="text-white bg-black px-2 py-1 rounded w-30"
            />
          ) : (
            quizDetails.description
          )}</h3>
      <h3>Quiz Code: {quizDetails.code}</h3>
      </div>
      {editing && (
        <button
          className="bg-green-600 px-4 py-2 rounded-sm mt-2"
          onClick={handleSave}
        >
          Save Changes
        </button>
      )}

      {/* <div className="mt-6" >
        {quizDetails.questions && quizDetails.questions.length > 0 ? (
          quizDetails.questions.map((question) => (
            <div
              key={question.id}
              className="bg-white p-4 rounded-lg mb-4 shadow-lg flex flex-col"
              
            >
              <h4 className="text-lg font-semibold">Q: {question.text}</h4>
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
                onClick={() => handleDeleteConfirmation(question.id)}
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
        ) : (
          <p>No questions available for this quiz.</p>
        )}
      </div> */}

<div className="mt-6">
  {quizDetails.questions && quizDetails.questions.length > 0 ? (
    quizDetails.questions.map((question) => (
      <div
        key={question.id}
        className="bg-white max-w-3xl text-black mx-auto p-4 rounded-lg mb-4 shadow-lg flex flex-col"
      >
        <div className="flex justify-between items-center">
          <h4 className="text-xl font-semibold flex-1">Q: {question.text}</h4>
          <div className="flex space-x-1 mr-4 pe4 text-xl">
            <button
              className="text-red-600 hover:text-red-800 "
              onClick={() => handleDeleteConfirmation(question.id)}
              title="Delete Question"
            >
              <i className="fas fa-trash-alt"></i>
            </button>
            <button
              className="text-yellow-500 hover:text-yellow-700"
              onClick={() => navigate(`/EditQuestion/${question.id}`)}
              title="Edit Question"
            >
              <i className="fas fa-edit"></i>
            </button>
          </div>
        </div>
        <ul className="mt-2 text-base space-y-2">
          {Object.entries(question.options).map(([key, value]) => (
            <li key={key}>
              {key}: {value}
            </li>
          ))}
        </ul>
        <p className="mt-2 text-green-400 text-base space-y-5">
          Correct Option: {question.correct_option}
        </p>
      </div>
    ))
  ) : (
    <p>No questions available for this quiz.</p>
  )}
</div>

      <button
        className="bg-gray-500 px-4 py-2 mt-4 rounded-sm"
        onClick={() => navigate("/quizzes")}
      >
        Back to Quizzes
      </button>

      {/* Popup Modal */}
      {showPopup && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold">Are you sure you want to delete this question?</h3>
            <div className="mt-4 flex justify-between">
              <button
                className="bg-green-500 px-4 py-2 rounded-sm"
                onClick={handleDelete}
              >
                Yes
              </button>
              <button
                className="bg-red-500 px-4 py-2 rounded-sm"
                onClick={cancelDelete}
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
    </div>
  );
};

export default QuizPreview;
