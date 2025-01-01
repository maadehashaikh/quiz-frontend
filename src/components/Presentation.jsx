import React from "react";
import Setting from "./Setting";
import Dashboard_heading_buttons from "./Dashboard_heading_buttons";

const Presentation = () => {
  return (
    <div className="flex h-screen bg-black">
      <div className="w-[17%] h-full bg-white">
        <Setting />
      </div>
      <div className="w-[85%] flex flex-col">
        <div className="h-[14%] bg-black text-white ">
          <Dashboard_heading_buttons
            heading={"Presentations"}
            button1={"My Presentations"}
            button2={"History"}
          />
        </div>
        <div className="h-[74%] rounded-lg bg-black flex items-start justify-between">
          <div className="w-1/3 bg-white p-3 mt-2 ml-2 rounded-sm">
            <h1>Presentation</h1>
            <p className="py-3 text-gray-300">Topic</p>
            <p className="py-3 text-gray-300">Slides : 19</p>
            <div className="flex py-3 items-center justify-evenly">
              <p>03-01-2023</p>
              <p>
                <i class="fa-solid fa-clock mr-3"></i>12:30 AM - 01:40 PM
              </p>
            </div>
            <button className="bg-red-600 w-full py-2 mt-2">
              View Details
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Presentation;
