
// import React, { useState, useEffect } from "react";

// const Live_polling = ({ quizId }) => {
//   const [pollData, setPollData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // Set up polling interval (e.g., every 5 seconds)
//   useEffect(() => {
//     const intervalId = setInterval(() => {
//       fetchPollData();
//     }, 5000); // 5000ms = 5 seconds

//     // Cleanup interval on component unmount
//     return () => clearInterval(intervalId);
//   }, [quizId]);

//   const fetchPollData = async () => {
//     try {
//       const token = localStorage.getItem("access");
//       if (!token) throw new Error("No token found");

//       const response = await fetch(`http://127.0.0.1:8000/api/64/live_polling/`, {
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       if (response.ok) {
//         const data = await response.json();
//         setPollData(data);
//       } else {
//         throw new Error(`Failed to fetch poll data: ${response.status}`);
//       }
//     } catch (err) {
//       console.error("Error fetching poll data:", err);
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (loading) return <div className="text-red-500 text-center">Loading polling data...</div>;
//   if (error) return <div className="text-red-500 text-center">{error}</div>;

//   return (
//     <div className="flex h-[90svh] bg-black text-white">
//       <div className="flex-col w-[75%]">
//         {/* Cards Section */}
//         <div className="flex flex-1 gap-10 items-center justify-center">
//           {pollData.results.map((result, index) => (
//             <div
//               key={index}
//               className="flex flex-col items-center bg-opacity-10 rounded-lg p-6 bg-gray-900 mr-10 mt-[25%]"
//             >
//               <div className={`text-${["red", "blue", "green", "purple"][index % 4]}-600 text-6xl mb-4`}>
//                 <i className="fas fa-user"></i>
//               </div>
//               <span className="text-lg">
//                 {result.question}: {Object.values(result.options_count).reduce((a, b) => a + b, 0)} Votes
//               </span>
//             </div>
//           ))}
//         </div>
//         {/* Total People */}
//         <div className="bg-black text-center text-white font-medium mt-12">
//           Total people participated:{" "}
//           <span className="text-red-400 font-bold">{pollData.active_participants_count}</span>
//         </div>
//       </div>

//       {/* Sidebar */}
//       <div className="flex-shrink-0 w-1/4 p-6 bg-gray-800">
//         <div className="mt-28">
//           <h2 className="text-red-600 text-xl font-bold mb-4">Choose Option</h2>
//           <ul className="space-y-4">
//             {pollData.results[0] &&
//               Object.keys(pollData.results[0].options_count).map((option, index) => (
//                 <li key={index} className="hover:text-red-600 cursor-pointer">
//                   {option}
//                 </li>
//               ))}
//           </ul>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Live_polling;
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const Live_polling = ({ quizId }) => {
  const [pollData, setPollData] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [error, setError] = useState(null);
  const { Id } = useParams();
  const [timer, setTimer] = useState(20);

  useEffect(() => {
    // Create a new WebSocket connection
    const socket = new WebSocket(`ws://127.0.0.1:8000/ws/quiz/${Id}/`);

    socket.onopen = () => console.log("Connected to WebSocket");
    socket.onclose = () => console.log("WebSocket closed");
    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setPollData(data); // Update the poll data
    };
    socket.onerror = (error) => {
      console.error("WebSocket Error: ", error);
      setError("Error connecting to the WebSocket");
    };

    // Cleanup on component unmount
    return () => {
      socket.close();
    };
  }, [Id]);

  useEffect(() => {
    // Timer to switch to the next question
    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev === 1) {
          setCurrentQuestionIndex((prevIndex) => {
            if (pollData && prevIndex < pollData.questions.length - 1) {
              return prevIndex + 1; // Go to the next question
            }
            return prevIndex;
          });
          return 20; // Reset timer
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [pollData]);

  if (error) return <div className="text-red-500 text-center">{error}</div>;
  if (!pollData) return <div className="text-white text-center">Loading...</div>;

  const currentQuestion = pollData.questions[currentQuestionIndex];

  return (
    <div className="flex h-[90svh] bg-black text-white">
      <div className="flex-col w-[75%]">
        {/* Current Question */}
        <div className="text-center text-2xl font-bold mt-8">
          {currentQuestion?.question || "No Question"}
        </div>

        {/* Options with Votes */}
        <div className="flex flex-1 gap-10 items-center justify-center mt-6">
          {currentQuestion?.options.map((option, index) => (
            <div key={index} className="flex flex-col items-center bg-opacity-10 rounded-lg p-6 bg-gray-900">
              <div className={`text-${["red", "blue", "green", "purple"][index % 4]}-600 text-6xl mb-4`}>
                <i className="fas fa-user"></i>
              </div>
              <span className="text-lg">
                {option.name}: {option.votes} Votes
              </span>
            </div>
          ))}
        </div>

        {/* Total Participants */}
        <div className="bg-black text-center text-white font-medium mt-12">
          Total people participated: <span className="text-red-400 font-bold">{pollData.totalParticipants}</span>
        </div>

        {/* Timer */}
        <div className="text-center text-xl mt-4">
          Next question in: <span className="text-green-400 font-bold">{timer}s</span>
        </div>
      </div>
    </div>
  );
};

export default Live_polling;
