import React from "react";
import { useNavigate } from "react-router-dom";
import darkImage from "../../Images/darkImage.png";
import lightImage from "../../Images/lightImage.png";
import logo from "../../Images/logo.png";
import { useTheme } from "../TheamContext";

const Home = () => {
  const navigate = useNavigate();
  const { theme } = useTheme(); 

  
  const handleJoinQuiz = () => {
    navigate("/quiz_participation");
  };
  const GenrateQuiz = () => {
    navigate("/GenrateQuize");
  };
  const LivePolling = () => {
    navigate("/live_polling");
  };
  const AnalysisQUiz = () => {
    navigate("/quiz_user_analysis");
  };

  // Dynamic classes based on the theme
  const bgClass = theme === "dark" ? "bg-black text-white" : "bg-white text-black";
  const bgLine = theme === "dark" ?"bg-white text-black": "bg-black text-white"  ;
  const cardClass = theme === "dark" ? "bg-white text-black" : "bg-gray-200 text-black";
  const buttonClass = theme === "dark" ? "bg-red-500 text-white" : "bg-red-600 text-black";



  return (
    <>
      <div className="flex flex-col md:flex-row  rounded-lg shadow-lg">
        {/* Left Section */}
        <div className={`md:w-1/2 w-full ${bgClass} pt-10 px-5 md:pt-20 md:px-8`}>
          <h2 className="text-4xl md:text-6xl text-start">
            Welcome to <img src={logo} alt="Logo" className="w-40 md:w-60 mt-2" />
          </h2>
          <p className="mt-6 md:mt-10 text-sm md:text-base pb-8 md:pb-24">
            Welcome to DangalUp – your all-in-one platform for interactive
            learning and presentation creation. With DangalUp, you can create
            quizzes, design presentations, and generate content with the help of
            AI. Engage your audience with live polls, surveys, and discussions,
            and gain insights with powerful analytics. Whether you're an
            educator, presenter, or learner, DangalUp makes it easy to connect,
            collaborate, and succeed.
          </p>
        </div>

        {/* Right Section */}
        <div className={`md:w-1/2 w-full ${bgClass} flex items-center justify-center`}>
          <div className={`w-64 h-64 md:w-96 md:h-96 rounded-lg shadow-lg`}>
            <img src={theme == "dark" ?  darkImage : lightImage} className="w-full h-full object-cover" />
          </div>
        </div>
      </div>
      <div className={`${bgClass} py-10 px-4  text-center`}>

          <button
            onClick={handleJoinQuiz}
            className={`text-4xl bg-red-500 hover:bg-red-600 ${buttonClass}  py-2 px-6 rounded mt-4`}
          >
            Join Quiz
          </button>
      </div>

     {/* Services Section */}
<div className={`${bgClass}  py-10`}>
  <h3 className="text-2xl md:text-4xl font-bold text-center text-red-500 mb-8">
    SERVICES
    <div className={`h-1 w-20 ${bgLine} mx-auto mb-8`}></div>
  </h3>
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-5 md:px-16">
    <div className={` ${cardClass} py-6 rounded-lg flex flex-col items-center text-center shadow-lg `}>
      <button onClick={GenrateQuiz}>

      <i className="fas fa-robot text-red-500 text-8xl mb-4"></i>
      <p className="font-semibold">AI-Driven Content Creation</p>
      </button>
    </div>
    <div className={` ${cardClass} py-6 rounded-lg flex flex-col items-center text-center shadow-lg `}>
      <i className="fas fa-question-circle text-red-500 text-8xl mb-4"></i>
      <p className="font-semibold">Quiz Creation</p>
    </div>
    <div className={` ${cardClass} py-6 rounded-lg flex flex-col items-center text-center shadow-lg `}>
      <i className="fas fa-chalkboard text-red-500 text-8xl mb-4"></i>
      <p className="font-semibold">Presentation Creation</p>
    </div>
    <div className={` ${cardClass} py-6 rounded-lg flex flex-col items-center text-center shadow-lg `}>
      <button onClick={LivePolling}>

      <i className="fas fa-poll text-red-500 text-8xl mb-4"></i>
      <p className="font-semibold">Live Polling</p>
      </button>
    </div>
    <div className={` ${cardClass} py-6 rounded-lg flex flex-col items-center text-center shadow-lg `}>
      <button onClick={AnalysisQUiz}>

      <i className="fas fa-chart-line text-red-500 text-8xl mb-4"></i>
      <p className="font-semibold">Analytics & Insights</p>
      </button>
    </div>
    <div className={` ${cardClass} py-6 rounded-lg flex flex-col items-center text-center shadow-lg `}>
      <i className="fas fa-life-ring text-red-500 text-8xl mb-4"></i>
      <p className="font-semibold">Help & Support</p>
    </div>
  </div>
</div>

            {/* Contact Section */}
<section className="bg-pink-100 text-black py-10">
  <h2 className="text-center text-red-500 text-3xl font-bold">
    CONTACT US
    <div className="h-1 w-20 bg-black mx-auto mb-8"></div>
  </h2>
  <div className="mt-8 flex flex-col md:flex-row justify-around items-center px-4 md:px-20">
    {/* Left Side - Form */}
    <div className="space-y-4 w-full md:w-1/2 lg:w-1/3">
      <input
        type="text"
        placeholder="Name"
        className="w-full px-4 py-3 rounded-full bg-red-500 text-white placeholder-white"
      />
      <input
        type="email"
        placeholder="Email"
        className="w-full px-4 py-3 rounded-full bg-red-500 text-white placeholder-white"
      />
      <textarea
        placeholder="Message"
        className="w-full px-4 py-3 rounded-full bg-red-500 text-white placeholder-white h-30 resize-none"
      ></textarea>
      <div className="items-center px-20 mx-20 justify-center">

      <button className="px-10 py-3 bg-transparent text-red-600 border-2 border-red-600 rounded-full hover:bg-red-600 hover:text-white transition duration-300">
        Submit
      </button>
      </div>
    </div>
    {/* Right Side - Contact Details */}
    <div className="mt-8 md:mt-0 flex flex-col items-start space-y-10">
  <p className="flex items-center space-x-2">
    <span className="text-xl">📧</span>
    <span>test@gmail.com</span>
  </p>
  <p className="flex items-center space-x-2">
    <span className="text-xl">📞</span>
    <span>(303) 555-0105</span>
  </p>
  <p className="flex items-center space-x-2">
    <span className="text-xl">📍</span>
    <span>2715 Ash Dr. San Jose, South Dakota 83475</span>
  </p>
</div>

  </div>
</section>
    </>
  );
};

export default Home;




// import React, { useContext } from "react";
// import { useNavigate } from "react-router-dom";
// import logo from "../../Images/logo.png";
// import { useTheme } from "../TheamContext"; // Assuming a Theme Context is available

// const Home = () => {
//   const navigate = useNavigate();
//   const { theme, toggleTheme } = useTheme(); // Using the theme context

//   const handleJoinQuiz = () => {
//     navigate("/quiz_participation");
//   };
//   const GenrateQuiz = () => {
//     navigate("/GenrateQuize");
//   };
//   const LivePolling = () => {
//     navigate("/live_polling");
//   };
//   const AnalysisQUiz = () => {
//     navigate("/quiz_user_analysis");
//   };

//   // Dynamic classes based on the theme
//   const bgClass = theme === "dark" ? "bg-black text-white" : "bg-white text-black";
//   const cardClass = theme === "dark" ? "bg-gray-800 text-white" : "bg-gray-100 text-black";
//   const buttonClass = theme === "dark" ? "bg-red-500 text-white" : "bg-red-600 text-black";

//   return (
//     <div className={`${bgClass} min-h-screen`}>
//       {/* Toggle Theme Button */}
//       <button
//         onClick={toggleTheme}
//         className="absolute top-4 right-4 py-2 px-4 rounded bg-blue-500 text-white hover:bg-blue-600 transition"
//       >
//         Toggle Theme
//       </button>

//       <div className="flex flex-col md:flex-row">
//         {/* Left Section */}
//         <div className={`md:w-1/2 w-full ${bgClass} pt-10 px-5 md:pt-20 md:px-8`}>
//           <h2 className="text-4xl md:text-6xl text-start">
//             Welcome to <img src={logo} alt="Logo" className="w-40 md:w-60 mt-2" />
//           </h2>
//           <p className="mt-6 md:mt-10 text-sm md:text-base pb-8 md:pb-24">
//             Welcome to DangalUp – your all-in-one platform for interactive
//             learning and presentation creation. With DangalUp, you can create
//             quizzes, design presentations, and generate content with the help of
//             AI. Engage your audience with live polls, surveys, and discussions,
//             and gain insights with powerful analytics. Whether you're an
//             educator, presenter, or learner, DangalUp makes it easy to connect,
//             collaborate, and succeed.
//           </p>
//         </div>

//         {/* Right Section */}
//         <div className={`md:w-1/2 w-full ${bgClass} flex items-center justify-center`}>
//           <div className={`w-64 h-64 md:w-96 md:h-96 ${cardClass} rounded-lg shadow-lg`}></div>
//         </div>
//       </div>

//       <div className={`${bgClass} py-10 px-4 text-center`}>
//         <button
//           onClick={handleJoinQuiz}
//           className={`text-4xl ${buttonClass} py-2 px-6 rounded mt-4`}
//         >
//           Join Quiz
//         </button>
//       </div>

//       {/* Services Section */}
//       <div className={`${bgClass} py-10`}>
//         <h3 className="text-2xl md:text-4xl font-bold text-center text-red-500 mb-8">
//           SERVICES
//           <div className="h-1 w-20 bg-white mx-auto mb-8"></div>
//         </h3>
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-5 md:px-16">
//           <div className={`${cardClass} py-6 rounded-lg flex flex-col items-center text-center shadow-lg`}>
//             <button onClick={GenrateQuiz}>
//               <i className="fas fa-robot text-red-500 text-8xl mb-4"></i>
//               <p className="font-semibold">AI-Driven Content Creation</p>
//             </button>
//           </div>
//           {/* Add other service cards here, similar to the first */}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Home;
