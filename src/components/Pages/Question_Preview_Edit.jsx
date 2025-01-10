import React from "react";

const Question_Preview_Edit = () => {
  const question = {
    text: "Who was elected as the prime minister of Britain in November 2022?",
    options: ["Rishi Sunak", "Bill Harry", "Prince Charles", "Lady Diana"],
    correctAnswer: "Rishi Sunak",
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      {/* Button */}

      {/* Main Container */}
      <div className="bg-white shadow-md rounded-lg p-6 max-w-2xl mx-auto">
        <div className="text-red-500 border-2 border-red-500 w-fit px-4 py-0 rounded-md absolute ml-[40%] bg-red-50">
          <button>Save</button>
        </div>
        {/* Header */}
        <h1 className="text-2xl font-bold text-gray-800 mb-4 mt-10">Q1</h1>

        <div className="mb-8">
          <p className="mb-4">{question.text}</p>

          {/* Add Image Section */}
          <div className="bg-red-50 w-40 text-gray-400 text-center ml-24 mt-4">
            <i className="fa-solid fa-image mr-3"></i>
            <button>Add Image</button>
          </div>

          {/* Options Section */}
          <div className="space-y-2 mt-4">
            {question.options.map((option, index) => (
              <div
                key={index}
                className="flex items-center justify-between px-4 py-2 border rounded-lg"
              >
                <label
                  htmlFor={`option-${index}`}
                  className="flex items-center space-x-2"
                >
                  <input
                    type="radio"
                    name="answer"
                    id={`option-${index}`}
                    className="form-radio text-blue-500"
                  />
                  <span className="capitalize">
                    {String.fromCharCode(97 + index)}. {option}
                  </span>
                </label>

                {/* Conditional Marked as Correct Label */}
                {option === question.correctAnswer && (
                  <span className="text-green-600 bg-red-50 px-2 py-1 text-sm rounded">
                    Marked as Correct
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Question_Preview_Edit;
