import React from "react";
import Setting from "../Setting";
import Dashboard_heading_buttons from "../Dashboard_heading_buttons";

const Dashboard = () => {
  return (
    <div className="flex h-screen bg-black">
      <div className="w-[17%] h-full bg-white">
        <Setting />
      </div>
      <div className="w-[85%] flex flex-col">
        <div className="h-[14%] bg-black text-white ">
          <Dashboard_heading_buttons
            heading={"My Tasks"}
            button1={"All"}
            button2={"Not Started"}
            button3={"Ongoing"}
            button4={"Completed"}
            button5={"Missed"}
          />
        </div>
        <div className="h-[74%] rounded-lg bg-black flex items-start justify-normal">
          <div className="bg-white ml-9 mt-2 p-2">
            <h1 className="text-xl text-gray-700">Add a Quiz</h1>
            <div>
              <table className="mt-4">
                <tr className="text-gray-400 pr-4 flex gap-7 mb-2">
                  <td>Assigned</td>
                  <td>12:40 PM</td>
                  <td>03 Jan 2023</td>
                </tr>
                <tr className="text-gray-400 pr-4 flex gap-7 mb-2">
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

          <div className="bg-white ml-9 mt-2 p-2">
            <h1 className="text-xl text-gray-700">Add a Presentation</h1>
            <div>
              <table className="mt-4">
                <tr className="text-gray-400 pr-4 flex gap-7 mb-2">
                  <td>Assigned</td>
                  <td>12:40 PM</td>
                  <td>03 Jan 2023</td>
                </tr>
                <tr className="text-gray-400 pr-4 flex gap-7 mb-2">
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
    </div>
  );
};

export default Dashboard;
