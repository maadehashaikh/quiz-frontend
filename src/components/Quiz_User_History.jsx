import React from "react";

const Quiz_User_History = () => {
  const students = [
    { name: "Hassam Naz", marks: "52/100", status: "Fail" },
    { name: "Hassam Naz", marks: "85/100", status: "Pass" },
  ];

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow rounded-lg">
      {/* Header Section */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold">Quiz History</h2>
        <p className="text-gray-600">Quiz Name: Networking for Beginners</p>
      </div>

      {/* Tab Buttons */}
      <div className="flex space-x-4 mb-4">
        <button className="px-4 py-2 border rounded-md text-gray-600">
          Details
        </button>
        <button className="px-4 py-2 border rounded-md bg-red-500 text-white">
          Result
        </button>
      </div>

      {/* Table Section */}
      <div>
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr>
              <th className="py-2 px-4 text-left font-medium text-gray-600">
                Name
              </th>
              <th className="py-2 px-4 font-medium text-gray-600">Sort</th>
              <th className="py-2 px-4 font-medium text-gray-600">Marks</th>
              <th className="py-2 px-4 font-medium text-gray-600">Status</th>
              <th className="py-2 px-4 font-medium text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student, index) => (
              <tr key={index} className="border-b last:border-none">
                <td className="py-2 px-4">{student.name}</td>
                <td className="py-2 px-4">
                  <i className="fa-solid fa-filter"></i>
                </td>
                <td className="py-2 px-4">{student.marks}</td>
                <td
                  className={`py-2 px-4 ${
                    student.status === "Pass"
                      ? "text-green-500"
                      : "text-red-500"
                  }`}
                >
                  {student.status}
                </td>
                <td className="py-2 px-4 text-blue-600 cursor-pointer hover:underline">
                  <i className="fa-solid fa-eye mr-2"></i>Complete Result
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Quiz_User_History;
