import React from "react";

const Create_New_Quiz = () => {
  return (
    <div className="bg-red-50 w-full h-screen">
      {/* Added 'mt-12' for gap between the red background and white container */}
      <div className="p-6 bg-white rounded-lg shadow-md w-1/2 mx-auto">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Quiz History</h1>
        <div className="mt-6">
          <p className="text-gray-700 font-medium mb-4 text-xl">
            Select Question Composition
          </p>
          {[
            { name: "Current Affairs", color: "bg-blue-500" },
            { name: "Logical Reasoning", color: "bg-purple-400" },
            { name: "Basic Computers", color: "bg-red-500" },
            { name: "Basic Science", color: "bg-orange-500" },
          ].map((tag, index) => (
            <div key={index} className="mb-6">
              {/* Tag Label */}
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-800 font-medium">{tag.name}</span>
                <span className="text-gray-500 text-sm">25%</span>
              </div>

              {/* Input Range with Background and Overlay */}
              <div className="relative w-full h-2 rounded-full bg-gray-200">
                {/* Colored Progress Overlay */}
                <div
                  className={`absolute top-0 left-0 h-2 rounded-full ${tag.color}`}
                  style={{
                    width: "25%", // Adjust dynamically if needed
                  }}
                ></div>

                {/* Hidden Input for Slider Structure */}
                <input
                  type="range"
                  min="0"
                  max="100"
                  value="25"
                  className="absolute inset-0 w-full h-2 opacity-0 cursor-default"
                  readOnly
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Create_New_Quiz;
