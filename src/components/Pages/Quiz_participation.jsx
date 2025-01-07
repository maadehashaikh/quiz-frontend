// import React from "react";

// const Quiz_participation = () => {
//   return (
//     <>
//       <div className="pt-16 bg-black h-screen">
//         <div className="bg-gray-700 rounded-lg w-fit px-28 py-7 text-white m-auto mb-10">
//           <h1 className="mb-4 text-3xl ml-3">Enter The Code </h1>
//           <button className="bg-red-100 text-red-500 px-20 py-2 rounded-lg block mb-4">
//             CODE
//           </button>
//           <button className="text-red-100 bg-red-500 px-[73px] py-2 rounded-lg">
//             SUBMIT
//           </button>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Quiz_participation;


import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const QuizParticipation = () => {
  const [code, setCode] = useState("");
  const [name, setName] = useState("");
  const [response, setResponse] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("access"); 
      const res = await fetch("http://127.0.0.1:8000/api/join-quiz/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ code, name }),
      });

      const data = await res.json();
      if (res.ok) {
        setResponse(data); // API se aayi response data save karo
        console.log(data)
        alert("Quiz joined successfully!");
        navigate(`/quiz/${data.quiz_id}/${data.participant_id}`);
      } else {
        alert(data.detail || "Something went wrong!");
      }
    } catch (error) {
      console.error("Error joining quiz:", error);
    }
  };

  return (
    <div className="pt-16 bg-black h-screen">
      <div className="bg-gray-700 rounded-lg w-fit px-28 py-7 text-white m-auto mb-10">
        <h1 className="mb-4 text-3xl ml-3">Enter The Code</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Enter Quiz Code"
            className="bg-red-100 text-red-500 px-20 py-2 rounded-lg block mb-4"
          />
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter Your Name"
            className="bg-red-100 text-red-500 px-20 py-2 rounded-lg block mb-4"
          />
          <button
            type="submit"
            className="text-red-100 bg-red-500 px-[73px] py-2 rounded-lg"
          >
            SUBMIT
          </button>
        </form>
        {response && (
          <div className="mt-4 text-green-400">
            <p>Participant ID: {response.participant_id}</p>
            <p>Quiz ID: {response.quiz_id}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuizParticipation;
