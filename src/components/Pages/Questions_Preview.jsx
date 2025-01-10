import React, { useState } from "react";

const Questions_Preview = () => {
  // Example questions state
  const [questions, setQuestions] = useState([
    {
      id: 1,
      question:
        "Who was elected as the prime minister of Britain in November 2022?",
      options: ["Rishi Sunak", "Bill Harry", "Prince Charles", "Lady Diana"],
      correctAnswer: "Rishi Sunak",
      image: null,
    },
    {
      id: 2,
      question:
        "Who was elected as the prime minister of Britain in November 2022?",
      options: ["Rishi Sunak", "Bill Harry", "Prince Charles", "Lady Diana"],
      correctAnswer: "Rishi Sunak",
      image: "/path-to-image.jpg",
    },
  ]);

  const handleEdit = (id) => {
    alert(`Edit question ${id}`);
  };

  const handleDelete = (id) => {
    setQuestions(questions.filter((question) => question.id !== id));
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="max-w-4xl mx-auto bg-white shadow-md p-8 rounded-lg">
        <div className=" flex items-center justify-between">
          <h1 className="text-2xl font-semibold mb-6">Add New Questions</h1>
          <button className="bg-red-500 text-white text-sm px-2 py-1 rounded-md">
            Save & Publish
          </button>
        </div>

        <p className="text-sm text-gray-600 mb-4">Tag: Mathematics</p>

        <div className="mb-8">
          <div className="flex justify-around items-center pr-48">
            <i class="fa-solid fa-arrow-left mb-4 border-2 border-gray-400 rounded-xl px-1 py-1 text-gray-400"></i>
            <h2 className="text-xl font-semibold mb-4">Preview Questions</h2>
          </div>

          {questions.map((question, index) => (
            <div
              key={question.id}
              className="mb-6 p-4 bg-gray-50 rounded shadow-sm"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-lg font-medium">
                  Q{index + 1}. {question.question}
                </span>
                <div>
                  <button
                    className="px-3 py-1 text-white bg-blue-500 rounded hover:bg-blue-600 mr-2"
                    onClick={() => handleEdit(question.id)}
                  >
                    Edit
                  </button>
                  <button
                    className="px-3 py-1 text-white bg-red-500 rounded hover:bg-red-600"
                    onClick={() => handleDelete(question.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>

              {question.image && (
                <img
                  src={question.image}
                  alt="Question Illustration"
                  className="w-full max-w-md mb-4"
                />
              )}

              <div className="ml-4 space-y-2">
                {question.options.map((option, i) => (
                  <div
                    key={i}
                    className={`p-2 border rounded ${
                      option === question.correctAnswer
                        ? "border-green-500 bg-green-50"
                        : ""
                    }`}
                  >
                    {String.fromCharCode(97 + i)}. {option}
                    {option === question.correctAnswer && (
                      <span className="ml-2 text-green-600">
                        (<i class="fa-solid fa-check mx-2"></i>
                        Marked as Correct)
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <button className="w-full py-2 text-white bg-red-600 rounded hover:bg-red-700">
          Save & Publish
        </button>
      </div>
    </div>
  );
};

export default Questions_Preview;
