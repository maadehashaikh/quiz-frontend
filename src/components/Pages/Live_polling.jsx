import React from "react";

const Live_polling = () => {
  return (
    <div className="">
      <div className="flex h-[90svh] bg-black text-white">
        <div className="flex-col w-[75%] ">
          {/* Cards Section */}
          <div className="flex flex-1 gap-10 items-center justify-center ">
            {/* Card 1 */}
            <div className="flex flex-col items-center bg-opacity-10 rounded-lg p-6 bg-gray-900 mr-10 mt-[25%]">
              <div className="text-red-600 text-6xl mb-4 ">
                <i className="fas fa-user"></i>
              </div>
              <span className="text-lg">3 Members</span>
            </div>
            {/* Card 2 */}
            <div className="flex flex-col items-center bg-opacity-10 rounded-lg p-6 bg-gray-900 mb-10">
              <div className="text-blue-600 text-6xl mb-4">
                <i className="fas fa-user"></i>
              </div>
              <span className="text-lg">3 Members</span>
            </div>
            {/* Card 3 */}
            <div className="flex flex-col items-center bg-opacity-10 rounded-lg p-6 bg-gray-900 ml-14 mb-10">
              <div className="text-green-600 text-6xl mb-4">
                <i className="fas fa-user"></i>
              </div>
              <span className="text-lg">3 Members</span>
            </div>
            {/* Card 4 */}
            <div className="flex flex-col items-center bg-opacity-10 rounded-lg p-6 bg-gray-900 ml-10 mt-[25%]">
              <div className="text-purple-600 text-6xl mb-4">
                <i className="fas fa-user"></i>
              </div>
              <span className="text-lg">3 Members</span>
            </div>
          </div>
          {/* Total People */}
          <div className="bg-black text-center text-white font-medium mt-12">
            Total people particiapted :{" "}
            <span className="text-red-400 font-bold">12</span>
          </div>
        </div>

        {/* Sidebar */}
        <div className="flex-shrink-0 w-1/4 p-6 bg-gray-800">
          <div className="mt-28">
            <h2 className="text-red-600 text-xl font-bold mb-4">
              Choose Option
            </h2>
            <ul className="space-y-4">
              <li className="hover:text-red-600 cursor-pointer">Option 1</li>
              <li className="hover:text-red-600 cursor-pointer">Option 2</li>
              <li className="hover:text-red-600 cursor-pointer">Option 3</li>
              <li className="hover:text-red-600 cursor-pointer">Option 4</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Live_polling;
