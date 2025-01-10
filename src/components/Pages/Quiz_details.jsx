import React from "react";

const Quiz_details = () => {
  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      {/* Button */}

      {/* Main Container */}
      <div className="bg-white shadow-md rounded-lg p-6 max-w-2xl mx-auto">
        <div className="text-red-500 border-2 border-red-500 w-fit px-4 py-0 rounded-md absolute ml-[40%] bg-red-50">
          <i class="fa-solid fa-trash-can mr-2 mt-1"></i>
          <button>Delete</button>
        </div>
        {/* Header */}
        <h1 className="text-2xl font-bold text-gray-800 mb-4 mt-10">
          Quiz Details
        </h1>
        <p className="text-lg text-gray-600">
          Quiz Name : Networking for Beginners
        </p>

        {/* Quiz Details */}
        <div className="mt-10">
          <div className="mb-10">
            <p className="text-gray-700 text-xl">Number of Questions : 50</p>
          </div>
          <div className="mb-4">
            <p className="text-gray-700 mb-4">Passing Percentage :</p>
            <div className="flex items-center gap-2">
              <input
                type="range"
                min="0"
                max="100"
                value="70"
                className="w-full"
                readOnly
              />
              <span className="text-blue-600 font-medium">70%</span>
            </div>
          </div>

          {/* Quiz Schedule */}
          <div className="mb-4">
            <p className="text-gray-700">Quiz Schedule :</p>
            <div className="flex items-center gap-4 mt-2">
              <div className="bg-gray-200 py-2 px-4 rounded-md">
                <i class="fa-solid fa-calendar mr-3"></i>12-01-2023
              </div>
              <div className="bg-gray-200 py-2 px-4 rounded-md">
                <i class="fa-regular fa-clock mr-3"></i>12-01-2023
              </div>
            </div>
          </div>

          {/* Tags Composition */}
          <div className="mt-6">
            <p className="text-gray-700 font-medium mb-4 text-xl">
              Tags Composition
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
                      width: "25%", // Adjust based on the percentage dynamically
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
    </div>
  );
};

export default Quiz_details;
