import React from "react";
import Setting from "./Setting";
import Dashboard_heading_buttons from "./Dashboard_heading_buttons";

const Quizzes = () => {
  return (
    <div className="flex h-screen bg-black">
      <div className="w-[17%] h-full bg-white">
        <Setting />
      </div>
      <div className="w-[85%] flex flex-col">
        <div className="h-[14%] bg-black text-white ">
          <Dashboard_heading_buttons
            heading={"Quizzes"}
            button1={"Scheduled Quizzes"}
            button2={"Question Bank"}
            button3={"History"}
          />
        </div>
        <div className="h-[74%] rounded-lg bg-black flex items-start justify-between">
          <div className="w-1/3 bg-white p-3 mt-2 ml-2 rounded-sm">
            <div className="text-black text-xl">
              Articulate structure of C++ and Java in Semester 1
            </div>
            <h3 className="text-gray-400 pt-2">
              Course: B.Tech Specialization in Health Informatics
            </h3>
            <h3 className="text-gray-400 py-2">Subject:Network Engineering</h3>
            <div className="flex py-3 items-center justify-evenly">
              <p>03-01-2023</p>
              <p>
                <i class="fa-solid fa-clock mr-3"></i>12:30 AM - 01:40 PM
              </p>
            </div>
            <p className="text-gray-400">Question : 50</p>
            <div className="flex items-center justify-between mt-2">
              <p>Passing percentage</p>
              <p className="text-blue-300">70%</p>
            </div>
            <button className="bg-red-600 w-full py-2 mt-2">
              View Details
            </button>
          </div>
          <div className="mt-2 p-3 flex flex-col">
            <button className="bg-red-600 text-white py-2 px-5 rounded-sm">
              + Create New (AI)
            </button>
            <button className="bg-white text-red-600 py-2 px-4 mt-3 rounded-sm">
              + New From blank (AI)
            </button>
            <button className="bg-white text-red-600 py-2 mt-3 rounded-sm">
              <i class="fa-solid fa-file-import"></i> Import
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Quizzes;
