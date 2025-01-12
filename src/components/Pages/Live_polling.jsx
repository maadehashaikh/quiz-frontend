// import React from "react";

// const Live_polling = () => {
//   return (
//     <div className="">
//       <div className="flex h-[90svh] bg-black text-white">
//         <div className="flex-col w-[75%] ">
//           {/* Cards Section */}
//           <div className="flex flex-1 gap-10 items-center justify-center ">
//             {/* Card 1 */}
//             <div className="flex flex-col items-center bg-opacity-10 rounded-lg p-6 bg-gray-900 mr-10 mt-[25%]">
//               <div className="text-red-600 text-6xl mb-4 ">
//                 <i className="fas fa-user"></i>
//               </div>
//               <span className="text-lg">3 Members</span>
//             </div>
//             {/* Card 2 */}
//             <div className="flex flex-col items-center bg-opacity-10 rounded-lg p-6 bg-gray-900 mb-10">
//               <div className="text-blue-600 text-6xl mb-4">
//                 <i className="fas fa-user"></i>
//               </div>
//               <span className="text-lg">3 Members</span>
//             </div>
//             {/* Card 3 */}
//             <div className="flex flex-col items-center bg-opacity-10 rounded-lg p-6 bg-gray-900 ml-14 mb-10">
//               <div className="text-green-600 text-6xl mb-4">
//                 <i className="fas fa-user"></i>
//               </div>
//               <span className="text-lg">3 Members</span>
//             </div>
//             {/* Card 4 */}
//             <div className="flex flex-col items-center bg-opacity-10 rounded-lg p-6 bg-gray-900 ml-10 mt-[25%]">
//               <div className="text-purple-600 text-6xl mb-4">
//                 <i className="fas fa-user"></i>
//               </div>
//               <span className="text-lg">3 Members</span>
//             </div>
//           </div>
//           {/* Total People */}
//           <div className="bg-black text-center text-white font-medium mt-12">
//             Total people particiapted :{" "}
//             <span className="text-red-400 font-bold">12</span>
//           </div>
//         </div>
//         {/* Sidebar */}
//         <div className="flex-shrink-0 w-1/4 p-6 bg-gray-800">
//           <div className="mt-28">
//             <h2 className="text-red-600 text-xl font-bold mb-4">
//               Choose Option
//             </h2>
//             <ul className="space-y-4">
//               <li className="hover:text-red-600 cursor-pointer">Option 1</li>
//               <li className="hover:text-red-600 cursor-pointer">Option 2</li>
//               <li className="hover:text-red-600 cursor-pointer">Option 3</li>
//               <li className="hover:text-red-600 cursor-pointer">Option 4</li>
//             </ul>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };
// export default Live_polling;





import React, { useState, useEffect } from "react";

const Live_polling = ({ quizId }) => {
  const [pollData, setPollData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPollData = async () => {
      try {
        const token = localStorage.getItem("access");
        if (!token) throw new Error("No token found");

        const response = await fetch(`http://127.0.0.1:8000/api/67/results/`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setPollData(data);
        } else {
          throw new Error(`Failed to fetch poll data: ${response.status}`);
        }
      } catch (err) {
        console.error("Error fetching poll data:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPollData();
  }, [quizId]);

  if (loading) return <div className="text-white text-center">Loading polling data...</div>;
  if (error) return <div className="text-red-500 text-center">{error}</div>;

  return (
    <div className="flex h-[90svh] bg-black text-white">
      <div className="flex-col w-[75%]">
        {/* Cards Section */}
        <div className="flex flex-1 gap-10 items-center justify-center">
          {pollData.results.map((result, index) => (
            <div
              key={index}
              className="flex flex-col items-center bg-opacity-10 rounded-lg p-6 bg-gray-900 mr-10 mt-[25%]"
            >
              <div className={`text-${["red", "blue", "green", "purple"][index % 4]}-600 text-6xl mb-4`}>
                <i className="fas fa-user"></i>
              </div>
              <span className="text-lg">
                {result.question}: {Object.values(result.options_count).reduce((a, b) => a + b, 0)} Votes
              </span>
            </div>
          ))}
        </div>
        {/* Total People */}
        <div className="bg-black text-center text-white font-medium mt-12">
          Total people participated:{" "}
          <span className="text-red-400 font-bold">{pollData.active_participants_count}</span>
        </div>
      </div>

      {/* Sidebar */}
      <div className="flex-shrink-0 w-1/4 p-6 bg-gray-800">
        <div className="mt-28">
          <h2 className="text-red-600 text-xl font-bold mb-4">Choose Option</h2>
          <ul className="space-y-4">
            {pollData.results[0] &&
              Object.keys(pollData.results[0].options_count).map((option, index) => (
                <li key={index} className="hover:text-red-600 cursor-pointer">
                  {option}
                </li>
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Live_polling;
