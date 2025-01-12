import React, { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

// Register the required components
ChartJS.register(ArcElement, Tooltip, Legend);

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

        // Retry the original request with the new token
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
        window.location.href = "/login";
      }
    } else {
      return response;
    }
  } catch (error) {
    console.error("Error during fetchWithAuth:", error);
    throw error;
  }
};

const QuizAnalysis = () => {
  const [data, setData] = useState({
    total_questions: 0,
    unique_questions: 0,
    repeated_questions: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchWithAuth(
          "http://127.0.0.1:8000/api/question-report/",
          { method: "GET" }
        );
        if (response.ok) {
          const result = await response.json();
          setData(result);
        } else {
          console.error("Failed to fetch quiz analysis:", response.status);
        }
      } catch (error) {
        console.error("Error fetching quiz analysis:", error);
      }
    };

    fetchData();
  }, []);

  const chartData = {
    labels: ["Unique Questions", "Repeated Questions"],
    datasets: [
      {
        data: [data.unique_questions, data.repeated_questions],
        backgroundColor: ["#ED1C24", "#FF8E09"],
        hoverBackgroundColor: ["#ED1C24", "#FF8E09"],
      },
    ],
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">Report Generated</h1>
      <div className="w-1/3 mb-6">
        <Doughnut data={chartData} />
      </div>
      <p className="text-2xl font-bold mb-4">
        Total Questions Uploaded: {data.total_questions}
      </p>
      <div className="text-center text-lg space-y-2">
        <p>
          <span className="text-red-600 font-semibold">Unique Questions:</span>{" "}
          {data.unique_questions}
        </p>
        <p>
          <span className="text-orange-500 font-semibold">
            Repeated Questions:
          </span>{" "}
          {data.repeated_questions}
        </p>
      </div>
      <div className="mt-6">
        <button className="bg-red-600 text-white px-6 py-2 rounded-lg">
          + Preview Questions
        </button>
      </div>
    </div>
  );
};

export default QuizAnalysis;
