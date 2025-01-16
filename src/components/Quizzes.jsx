import React, { useState, useEffect } from "react";
import Setting from "./Setting";
import Dashboard_heading_buttons from "./Dashboard_heading_buttons";
import { useNavigate, NavLink } from "react-router-dom";
import { toast } from 'react-toastify';

const Quizzes = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [quizToDelete, setQuizToDelete] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const token = localStorage.getItem("access");
        const refreshToken = localStorage.getItem("refresh");
        const response = await fetch("http://127.0.0.1:8000/api/mcqs/", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.status === 401 && refreshToken) {
          const refreshResponse = await fetch("http://127.0.0.1:8000/api/token/refresh/", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ refresh: refreshToken }),
          });
          if (refreshResponse.ok) {
            const refreshData = await refreshResponse.json();
            localStorage.setItem("access", refreshData.access);
            const retryResponse = await fetch("http://127.0.0.1:8000/api/mcqs/", {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${refreshData.access}`,
              },
            });
            if (retryResponse.ok) {
              const data = await retryResponse.json();
              setQuizzes(data);
            }
          }
        }

        if (response.ok) {
          const data = await response.json();
          setQuizzes(data);
        } else {
          console.error("Failed to fetch quizzes:", response.status);
        }
      } catch (error) {
        console.error("Error fetching quizzes:", error);
      }
    };

    fetchQuizzes();
  }, []);

  const handleDelete = (quizId) => {
    setQuizToDelete(quizId);
    setShowPopup(true);
  };

  const confirmDelete = async () => {
    try {
      const token = localStorage.getItem("access");
      const response = await fetch(
        `http://127.0.0.1:8000/api/mcqs/deleteQuiz/${quizToDelete}/`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        setQuizzes((prevQuizzes) =>
          prevQuizzes.filter((quiz) => quiz.id !== quizToDelete)
        );
        setShowPopup(false);
        
        toast.success("Quiz deleted successfully!");
      } else {
        toast.error("Failed to delete quiz");
        console.error("Failed to delete quiz:", response.status);
      }
    } catch (error) {
      console.error("Error deleting quiz:", error);
    }
  };

  const cancelDelete = () => {
    setShowPopup(false);
  };

  if (!quizzes) {
    return <p>Loading...</p>;
  }

  return (
    <div className="flex flex-col md:flex-row h-screen bg-black">
      <div className="w-full md:w-[17%] h-full bg-white">
        <Setting />
      </div>
      <div className="w-full md:w-[85%] flex flex-col">
        <div className="h-[14%] bg-black text-white">
          <Dashboard_heading_buttons
            heading={"Quizzes"}
            button1={"Scheduled Quizzes"}
            button2={"Question Bank"}
            button3={"History"}
          />
        </div>
        <div className="flex flex-col md:flex-row-reverse justify-between items-start md:items-stretch rounded-lg bg-black">
          <div className="mt-2 p-3 flex flex-col md:w-auto md:w-1/4 md:mt-0 gap-4">
            <button className="bg-red-600 text-white py-2 px-5 rounded-sm"
              onClick={() => navigate("/GenrateQuize")}
            >
              + Create New (AI)
            </button>
            <button className="bg-white text-red-600 py-2 px-4 mt-3 rounded-sm">
              + New From blank (AI)
            </button>
            <button className="bg-white text-red-600 py-2 mt-3 rounded-sm">
              <i className="fa-solid fa-file-import"></i> Import
            </button>
          </div>

          <div className="bg-black ml-0 md:ml-9 mt-2 p-2 flex-grow">
            {quizzes.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {quizzes.map((quiz) => (
                  <div key={quiz.id} className="bg-gray-100 rounded-lg shadow-md p-4">
                    <div className="text-black text-xl font-semibold">{quiz.title}</div>
                    <h3 className="text-gray-500 mt-2">Course: {quiz.course_name}</h3>
                    <h3 className="text-gray-500 mb-2">Subject: {quiz.subject}</h3>
                    <div className="flex py-2 items-center justify-between text-gray-600">
                      <p>{new Date(quiz.scheduled_date_time).toLocaleDateString()}</p>
                      <p>
                        <i className="fa-solid fa-clock mr-2"></i>
                        {new Date(quiz.scheduled_date_time).toLocaleTimeString()}
                      </p>
                    </div>
                    <p className="text-gray-500">Total Questions: {quiz.questions.length}</p>
                    <div className="flex items-center justify-between mt-2">
                      <p>Passing Percentage:</p>
                      <p className="text-blue-500 font-bold">{quiz.passing_percentage}%</p>
                    </div>
                    <button
                      className="bg-blue-600 hover:bg-blue-700 text-white w-full py-2 mt-4 rounded"
                      onClick={() => navigate(`/QuizPreview/${quiz.id}`)}
                    >
                      View Details
                    </button>
                    <button
                      className="bg-blue-600 hover:bg-blue-700 text-white w-full py-2 mt-4 rounded"
                      onClick={() => navigate(`/quiz_user_history/${quiz.id}`)}
                    >
                      Quiz history
                    </button>

                    <button
                      className="bg-red-600 hover:bg-red-700 text-white w-full py-2 mt-2 rounded"
                      onClick={() => handleDelete(quiz.id)}
                    >
                      Delete Question
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-400 text-center">No quizzes available</p>
            )}
          </div>
        </div>
      </div>

      {showPopup && (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-500 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-5 rounded-lg shadow-md max-w-sm w-full">
            <h3 className="text-lg font-semibold text-center mb-4">
              Are you sure you want to delete this quiz?
            </h3>
            <div className="flex justify-between">
              <button
                className="bg-red-600 text-white py-2 px-4 rounded"
                onClick={confirmDelete}
              >
                Yes
              </button>
              <button
                className="bg-gray-600 text-white py-2 px-4 rounded"
                onClick={cancelDelete}
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Quizzes;



<div className="mt-2 p-3 flex flex-col md:w-1/4 md:mt-0 gap-4">
<button
  className="bg-red-600 text-white py-2 px-5 rounded"
  onClick={() => navigate("/GenrateQuize")}
>
  + Create New (AI)
</button>
<button className="bg-white text-red-600 py-2 px-4 rounded">
  + New From blank (AI)
</button>
<button className="bg-white text-red-600 py-2 px-4 mt-3 rounded-sm">
  <i className="fa-solid fa-file-import"></i> Import
</button>
</div>