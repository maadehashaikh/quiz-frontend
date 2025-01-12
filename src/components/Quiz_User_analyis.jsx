import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Setting from "./Setting";
import Dashboard_heading_buttons from "./Dashboard_heading_buttons";

const Quiz_User_Analysis = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const fetchQuizAnalysis = async () => {
    try {
      const token = localStorage.getItem("access");

      if (!token) {
        throw new Error("Authentication token not found.");
      }

      const response = await fetch("http://127.0.0.1:8000/api/quizzes/analysis/", {
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
            return fetchQuizAnalysis();
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
      setStudents(data); // API returns an array of participant analysis
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuizAnalysis();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  return (
    <div className="flex h-screen bg-black">
      <div className="w-[17%] h-full bg-white">
        <Setting />
      </div>
      <div className="w-[85%] flex flex-col">
        <div className="h-[14%] bg-black text-white ">
          <Dashboard_heading_buttons
            heading={"Analysis"}
            
          />
        </div>

    <div className="max-w-3xl mx-auto p-6 bg-white shadow rounded-lg">
       
      {/* Header Section */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold">Quiz Analysis</h2>
        <p className="text-gray-600">Details of all participants</p>
      </div>

      {/* Table Section */}
      <div>
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr>
              <th className="py-2 px-4 text-left font-medium text-gray-600">Name</th>
              <th className="py-2 px-4 font-medium text-gray-600">Email</th>
              <th className="py-2 px-4 font-medium text-gray-600">Total Attempts</th>
              <th className="py-2 px-4 font-medium text-gray-600">Pass Count</th>
              <th className="py-2 px-4 font-medium text-gray-600">Fail Count</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student, index) => (
              <tr key={index} className="border-b last:border-none">
                <td className="py-2 px-4">{student.name}</td>
                <td className="py-2 px-4">{student.email || "N/A"}</td>
                <td className="py-2 px-4">{student.total_attempts}</td>
                <td className="py-2 px-4 text-green-500">{student.pass_count}</td>
                <td className="py-2 px-4 text-red-500">{student.fail_count}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    </div>
    </div>
  );
};

export default Quiz_User_Analysis;
