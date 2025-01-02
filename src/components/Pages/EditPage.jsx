import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const EditMCQ = () => {
  const { id } = useParams(); // MCQ ID from the URL
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    text: "",
    options: { A: "", B: "", C: "", D: "" },
    correct_option: "",
  });

  // Fetch the current MCQ details
  useEffect(() => {
    const fetchMCQ = async () => {
      try {
        const token = localStorage.getItem("access");
        const response = await fetch(`http://127.0.0.1:8000/api/mcqs/edit/${id}/`, {
          method: "GET", // Use GET to fetch details
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setFormData({
            text: data.text,
            options: data.options, // Ensure options are structured as expected
            correct_option: data.correct_option,
          });
        } else {
          console.error("Failed to fetch MCQ details");
        }
      } catch (error) {
        console.error("Error fetching MCQ:", error);
      }
    };

    fetchMCQ();
  }, [id]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.startsWith("option")) {
      const key = name.split("_")[1]; // Example: "A", "B"
      setFormData((prev) => ({
        ...prev,
        options: { ...prev.options, [key]: value },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  // Submit the form
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("access");
      const response = await fetch(`http://127.0.0.1:8000/api/mcqs/edit/${id}/`, {
        method: "PUT", // Use PUT to update details
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("MCQ updated successfully!");
        navigate(`/QuizPreview/${id}`); // Navigate to quiz preview page
      } else {
        console.error("Failed to update MCQ");
      }
    } catch (error) {
      console.error("Error updating MCQ:", error);
    }
  };

  return (
    <div className="p-6 bg-black text-white min-h-screen">
      <h1 className="text-3xl font-bold mb-4">Edit MCQ</h1>
      <form onSubmit={handleSubmit} className="bg-gray-800 p-4 rounded-lg">
        <div className="mb-4">
          <label className="block font-semibold mb-2">Question Text</label>
          <textarea
            name="text"
            value={formData.text}
            onChange={handleChange}
            className="w-full p-2 bg-gray-900 text-white rounded"
            rows="3"
          />
        </div>
        {["A", "B", "C", "D"].map((key) => (
          <div className="mb-4" key={key}>
            <label className="block font-semibold mb-2">
              Option {key}
            </label>
            <input
              type="text"
              name={`option_${key}`}
              value={formData.options[key]}
              onChange={handleChange}
              className="w-full p-2 bg-gray-900 text-white rounded"
            />
          </div>
        ))}
        <div className="mb-4">
          <label className="block font-semibold mb-2">Correct Option</label>
          <select
            name="correct_option"
            value={formData.correct_option}
            onChange={handleChange}
            className="w-full p-2 bg-gray-900 text-white rounded"
          >
            {["A", "B", "C", "D"].map((key) => (
              <option key={key} value={key}>
                {key}
              </option>
            ))}
          </select>
        </div>
        <button
          type="submit"
          className="bg-blue-600 px-4 py-2 rounded font-bold"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default EditMCQ;
