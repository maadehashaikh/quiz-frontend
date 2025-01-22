import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; 
import { useTheme } from "../TheamContext";
const GenerateQuiz = () => {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState(null);
  const [examplePrompts, setExamplePrompts] = useState([]);
  const navigate = useNavigate();
  const {theme} = useTheme();
  const bgClass = theme === "dark" ? "bg-black text-white" : "bg-white text-black";

  // Fetch example prompts from the API
  useEffect(() => {
    const fetchExamplePrompts = async () => {
      try {
      const token = localStorage.getItem("access");
      const refreshToken = localStorage.getItem("refresh");
      console.log("Token: ", token);
      console.log("Refresh token: ", refreshToken);
        const response = await fetch("http://127.0.0.1:8000/api/suggestion-quize/",
         { method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },

      }
        );
        
        if (response.ok) {
          const data = await response.json();
          setExamplePrompts(data.suggestions);
        } else {
          console.error("Failed to fetch example prompts:", response.status);
        }
      } catch (err) {
        console.error("Error fetching example prompts:", err);
      }
    };

    fetchExamplePrompts();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("access");
      const refreshToken = localStorage.getItem("refresh");
      console.log("Token: ", token);
      console.log("Refresh token: ", refreshToken);

      let response = await fetch("http://127.0.0.1:8000/api/quiz-suggestions/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ prompt }),
      });

      if (response.status === 401 && refreshToken) {
        const refreshResponse = await fetch("http://127.0.0.1:8000/api/token/refresh/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ refresh: refreshToken }),
        });

        if (refreshResponse.ok) {
          const refreshData = await refreshResponse.json();
          localStorage.setItem("access", refreshData.access);

          // Retry the original request with the new access token
          response = await fetch("http://127.0.0.1:8000/api/quiz-suggestions/", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${refreshData.access}`,
            },
            body: JSON.stringify({ prompt }),
          });
        }
      }

      if (response.ok) {
        const data = await response.json();
        setResponse(data);
        console.log(data);

        if (data.quiz_id) {
          navigate(`/QuizPreview/${data.quiz_id}`);
        }
      } 
    else {
        console.error("Failed to fetch quizzes:", response.status);
      }
    } catch (err) {
      console.error("Error:", err);
    }
  };

  const handleExamplePromptClick = (example) => {
    setPrompt(example);
  };

  return (
    <div className={`"w-full h-screen ${bgClass} flex flex-col items-center justify-center"`}>
      <h1 className="text-4xl font-bold mb-4">Generate Quiz</h1>
      <form onSubmit={handleSubmit} className="flex flex-col items-center">
        <textarea
          className="text-black p-4 border border-black  w-96 h-20 rounded-lg mb-4"
          placeholder="Describe your prompt for the Quiz"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          required
        />
        <button
          type="submit"
          className="bg-red-600 px-6 py-2 rounded-lg text-white font-bold"

        >
          Generate
        </button>
      </form>
      <div className="mt-8 w-3/4">
        <h2 className="text-2xl font-semibold mb-4">Example Prompts:</h2>
        <div className="grid grid-cols-2 gap-4">
          {examplePrompts.map((example, idx) => (
            <button
              key={idx}
              className="bg-gray-800 text-white p-4 rounded-lg hover:bg-gray-700"
              onClick={() => handleExamplePromptClick(example)}
            >
              {example}
            </button>
          ))}
        </div>
      </div>
      
    </div>
  );
};

export default GenerateQuiz;

// import React, { useState, useEffect } from "react";

// const GenerateQuiz = () => {
//   const [prompt, setPrompt] = useState("");
//   const [response, setResponse] = useState(null);
//   const [examplePrompts, setExamplePrompts] = useState([]); // State to store example prompts

//   // Fetch example prompts from the backend when the component loads
//   useEffect(() => {
//     const fetchSuggestions = async () => {
//       try {
//         const token = localStorage.getItem("access");
//         const quizResponse = await fetch("http://127.0.0.1:8000/api/quiz-suggestions/", {
//           method: "GET", // Adjust to the appropriate method if it's not GET
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//         });

//         if (quizResponse.ok) {
//           const data = await quizResponse.json();
//           setExamplePrompts(data.suggestions); // Set the suggestions dynamically
//         } else {
//           console.error("Failed to fetch suggestions");
//         }
//       } catch (error) {
//         console.error("Error fetching suggestions:", error);
//       }
//     };

//     fetchSuggestions();
//   }, []);

//   const handleExampleClick = (example) => {
//     setPrompt(example); // Set the clicked example as the current prompt
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const token = localStorage.getItem("access");
//       const refreshToken = localStorage.getItem("refresh");
//       console.log("Token: ", token);
//       console.log("Refresh token: ", refreshToken);
//       let quizResponse = await fetch("http://127.0.0.1:8000/api/quiz-suggestions/", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify({ prompt }),
//       });

//       if (quizResponse.status === 401 && refreshToken) {
//         const refreshResponse = await fetch("http://127.0.0.1:8000/api/token/refresh/", {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({ refresh: refreshToken }),
//         });
//         if (refreshResponse.ok) {
//           const refreshData = await refreshResponse.json();
//           localStorage.setItem("access", refreshData.access);

//           // Retry the original request with the new access token
//           quizResponse = await fetch("http://127.0.0.1:8000/api/quiz-suggestions/", {
//             method: "POST",
//             headers: {
//               "Content-Type": "application/json",
//               Authorization: `Bearer ${refreshData.access}`,
//             },
//             body: JSON.stringify({ prompt }),
//           });
//         }
//       }

//       if (quizResponse.ok) {
//         const data = await quizResponse.json();
//         setResponse(data);
//         console.log(data); // Successfully fetched data
//       } else {
//         console.error("Failed to fetch quizzes:", quizResponse.status); // Error like 401
//       }
//     } catch (err) {
//       console.error("Error:", err);
//     }
//   };

//   return (
//     <div className="w-full h-screen bg-black text-white flex flex-col items-center justify-center">
//       <h1 className="text-4xl font-bold mb-4">Generate Quiz</h1>
//       <form onSubmit={handleSubmit} className="flex flex-col items-center">
//         <textarea
//           className="text-black p-4 w-96 h-40 rounded-lg mb-4"
//           placeholder="Describe your prompt for the Quiz"
//           value={prompt}
//           onChange={(e) => setPrompt(e.target.value)}
//           required
//         />
//         <button
//           type="submit"
//           className="bg-red-600 px-6 py-2 rounded-lg text-white font-bold"
//         >
//           Generate
//         </button>
//       </form>
//       {/* Displaying example prompts */}
//       <div className="mt-6 w-3/4">
//         <h2 className="text-2xl font-semibold mb-4">Example Prompts:</h2>
//         <div className="grid grid-cols-2 gap-4">
//           {examplePrompts.map((example, idx) => (
//             <button
//               key={idx}
//               onClick={() => handleExampleClick(example)}
//               className="bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-700"
//             >
//               {example}
//             </button>
//           ))}
//         </div>
//       </div>
//       {response && (
//         <div className="mt-8 w-3/4">
//           <h2 className="text-2xl font-semibold">Generated Questions:</h2>
//           <ul className="mt-4">
//             {response.quiz_questions.map((question, idx) => (
//               <li key={idx} className="my-2">
//                 {idx + 1}. {question}
//               </li>
//             ))}
//           </ul>
//         </div>
//       )}
//     </div>
//   );
// };

// export default GenerateQuiz;
