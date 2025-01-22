import React from "react";
import Setting from "../Setting";
import Dashboard_heading_buttons from "../Dashboard_heading_buttons";

const Dashboard = () => {
  return (
    <div className="flex flex-col sm:flex-row h-screen">
      {/* Sidebar (Hidden on Small Screens) */}
      <div className="bg-black flex-shrink-0 w-[250px] lg:w-[300px] xl:w-[350px]  sm:w-[100px]">
        <Setting />
      </div>

      {/* Main Content (Dashboard) - Takes Full Width on Small Screens */}
      <div className="flex-1 min-w-0 flex flex-col w-full sm:w-auto bg-black md:ml-[22%] lg:ml-0">
        {/* Navbar */}
        <div className="h-[14%] bg-black text-white flex justify-between items-start pr-4">
          <Dashboard_heading_buttons
            heading={"My Tasks"}
            button1={"All"}
            button2={"Not Started"}
            button3={"Ongoing"}
            button4={"Completed"}
            button5={"Missed"}
          />
        </div>

        {/* Dashboard Content */}
        <div className="h-[74%] rounded-lg flex flex-wrap items-start justify-start p-4  sm:justify-start">
          <div className="bg-white m-2 p-4 w-full sm:w-[48%] md:w-[45%] lg:w-[30%]  md:items-start rounded-lg sm:ml-0">
            <h1 className="text-xl text-gray-700">Add a Quiz</h1>
            <table className="mt-4">
              <tr className="text-gray-400 flex gap-7 mb-2">
                <td>Assigned</td>
                <td>12:40 PM</td>
                <td>03 Jan 2023</td>
              </tr>
              <tr className="text-gray-400 flex gap-7 mb-2">
                <td>Due</td>
                <td>03:40 PM</td>
                <td>03 Jan 2023</td>
              </tr>
            </table>
            <button className="border-gray-300 text-gray-400 border-2 px-2 py-1 rounded-md">
              Not Started
            </button>
            <br />
            <button className="bg-red-600 text-white mt-4 px-6 py-1 rounded-md font-thin">
              View Details
            </button>
          </div>

          <div className="bg-white m-2 p-4 w-full sm:w-[48%] md:w-[45%] lg:w-[30%] rounded-lg">
            <h1 className="text-xl text-gray-700">Add a Presentation</h1>
            <table className="mt-4">
              <tr className="text-gray-400 flex gap-7 mb-2">
                <td>Assigned</td>
                <td>12:40 PM</td>
                <td>03 Jan 2023</td>
              </tr>
              <tr className="text-gray-400 flex gap-7 mb-2">
                <td>Due</td>
                <td>03:40 PM</td>
                <td>03 Jan 2023</td>
              </tr>
            </table>
            <button className="border-gray-300 text-gray-400 border-2 px-2 py-1 rounded-md">
              Not Started
            </button>
            <br />
            <button className="bg-red-600 text-white mt-4 px-6 py-1 rounded-md font-thin">
              View Details
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
