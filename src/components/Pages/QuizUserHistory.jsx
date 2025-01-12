import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const Quiz_User_History = () => {
   const { id } = useParams(); 
  const [quizName, setQuizName] = useState("");
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchQuizResults = async () => {
    try {
      const token = localStorage.getItem("access");

      if (!token) {
        throw new Error("Authentication token not found.");
      }

      const response = await fetch(`http://127.0.0.1:8000/api/${id}/result/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 401) {
        const refreshToken = localStorage.getItem("refresh");

        if (refreshToken) {
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
            return fetchQuizResults();
          } else {
            throw new Error("Failed to refresh token.");
          }
        } else {
          throw new Error("Authentication failed. Please log in again.");
        }
      }

      if (!response.ok) {
        throw new Error(`Failed to fetch data: ${response.status}`);
      }

      const data = await response.json();
      setQuizName(data.quiz_name);
      setStudents(data.results);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuizResults();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow rounded-lg">
      {/* Header Section */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold">Quiz History</h2>
        <p className="text-gray-600">Quiz Name: {quizName}</p>
      </div>

      {/* Table Section */}
      <div>
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr>
              <th className="py-2 px-4 text-left font-medium text-gray-600">Name</th>
              <th className="py-2 px-4 font-medium text-gray-600">Marks</th>
              <th className="py-2 px-4 font-medium text-gray-600">Status</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student, index) => (
              <tr key={index} className="border-b last:border-none">
                <td className="py-2 px-4">{student.name}</td>
                <td className="py-2 px-4">{student.marks}</td>
                <td
                  className={`py-2 px-4 ${
                    student.status === "Pass" ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {student.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Quiz_User_History;
