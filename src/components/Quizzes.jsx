
import React, { useState, useEffect } from "react";
import Setting from "./Setting";
import Dashboard_heading_buttons from "./Dashboard_heading_buttons";
import { useNavigate, NavLink } from "react-router-dom";

const Quizzes = () => {
  // State to hold quizzes data
  const [quizzes, setQuizzes] = useState([]);
  
  const navigate = useNavigate();

  // Fetch data from the backend API
  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const token = localStorage.getItem("access");
        const refreshToken = localStorage.getItem("refresh");
        console.log("Token: ",token)
        console.log("Refresh token: ",refreshToken)
        const response = await fetch("http://127.0.0.1:8000/api/mcqs/",{
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
  
            // Retry the original request with the new access token
            const response = await fetch("http://127.0.0.1:8000/api/mcqs/", {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${refreshData.access}`,
              },
            });
          }
        }

        if (response.ok) {
          const data = await response.json();
          setQuizzes(data);
          console.log(data); // Successfully fetched data
        } else {
          console.error("Failed to fetch quizzes:", response.status); // Error like 401
        }
      } catch (error) {
        console.error("Error fetching quizzes:", error);
      }
    };

    fetchQuizzes();
  }, []);

  const handleDelete = async (quizId) => {
    try {
      const token = localStorage.getItem("access");
      const response = await fetch(
        `http://127.0.0.1:8000/api/mcqs/deleteQuiz/${quizId}/`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        setQuizzes((prevQuizzes) => prevQuizzes.filter((quiz) => quiz.id !== quizId));
        console.log("Quiz deleted successfully!");
      } else {
        console.error("Failed to delete question:", response.status);
      }
    } catch (error) {
      console.error("Error deleting question:", error);
    }
  };

  if (!quizzes) {
    return <p>Loading...</p>;
  }

  return (
    <div className="flex h-screen bg-black">
      <div className="w-[17%] h-full bg-white">
        <Setting />
      </div>
      <div className="w-[85%] flex flex-col">
        <div className="h-[14%] bg-black text-white ">
          <Dashboard_heading_buttons
            heading={"Quizzes"}
            button1={"Scheduled Quizzes"}
            button2={"Question Bank"}
            button3={"History"}
          />
        </div>
        <div className="h-[74%] rounded-lg bg-black flex items-start justify-between">
          
          <div className="bg-black ml-9 mt-2 p-2">
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

          <div className="mt-2 p-3 flex flex-col">
            <button className="bg-red-600 text-white py-2 px-5 rounded-sm"
            onClick={() => navigate("/GenrateQuize")}>
              + Create New (AI)
            </button>
            <button className="bg-white text-red-600 py-2 px-4 mt-3 rounded-sm">
              + New From blank (AI)
            </button>
            <button className="bg-white text-red-600 py-2 mt-3 rounded-sm">
              <i className="fa-solid fa-file-import"></i> Import
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Quizzes;
