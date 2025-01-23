import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Setting from "./Setting";
import Dashboard_heading_buttons from "./Dashboard_heading_buttons";
import { useTheme } from "./TheamContext";

const Quiz_User_Analysis = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const {theme }= useTheme();
  const bgClass = theme === "dark" ? "bg-black text-white" : "bg-white text-black border-black";

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
   

    <div className={`flex flex-col md:flex-row  ${bgClass}`}>
    {/* Sidebar */}
    <div
      className={`w-full md:w-[20%] h-auto md:h-full ${bgClass} fixed md:relative z-20`}
    >
      <Setting />
    </div>

    {/* Main Content */}
    <div className="w-full md:w-[80%] flex flex-col pl-4 pr-4 md:pl-6 md:pr-6">
      {/* Header Section */}
      <div className="h-auto md:h-[15%]  text-white p-2 rounded-md mb-2">
        <Dashboard_heading_buttons heading="Analysis" />
      </div>

      {/* Content Section */}
      <div
        className={`flex flex-col items-center md:items-stretch rounded-lg ${bgClass} p-4 shadow-md`}
      >
        <div className="mb-6 mt-4 py-4 text-center">
          <h2 className="text-2xl md:text-3xl font-semibold">Quiz Analysis</h2>
          <p className="text-sm md:text-base  mt-2">
            Details of all participants
          </p>
        </div>

        {/* Table Section */}
        <div className="w-full overflow-x-auto">
          <table className="table-auto w-full border-collapse border border-gray-400">
            <thead>
              <tr className="bg-gray-200 text-gray-700">
                <th className="py-2 px-4 text-left">No.</th>
                <th className="py-2 px-4 text-left">Name</th>
                <th className="py-2 px-4 text-left">Email</th>
                <th className="py-2 px-4 text-left">Total Attempts</th>
                <th className="py-2 px-4 text-left">Pass Count</th>
                <th className="py-2 px-4 text-left">Fail Count</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student, index) => (
                <tr key={index} className="border-b last:border-none">
                  <td className="py-2 px-4 text-gray-500">{index + 1}</td>
                  <td className="py-2 px-4">{student.name}</td>
                  <td className="py-2 px-4">{student.email || "N/A"}</td>
                  <td className="py-2 px-4 text-center">
                    {student.total_attempts}
                  </td>
                  <td className="py-2 px-4 text-center text-green-600">
                    {student.pass_count}
                  </td>
                  <td className="py-2 px-4 text-center text-red-600">
                    {student.fail_count}
                  </td>
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
