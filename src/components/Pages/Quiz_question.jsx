import React from "react";

const Quiz_question = () => {
  return (
    <div className="w-full h-screen bg-black">
      <div className="pt-8">
        <div className="bg-gray-800 rounded-lg w-fit px-28 py-7 text-white m-auto mb-10">
          <h1 className="text-2xl mb-4">Question No. 1 </h1>
          <h2 className="text-base">Who is the Prime Minister of Pakistan?</h2>
        </div>
        <div className="options flex px-10 flex-wrap gap-10">
          <p className="bg-red-500 text-white pr-[35%] py-2 rounded-lg">
            <i class="fa-solid fa-a text-red-500 bg-white px-2 py-2 rounded-2xl m-2"></i>
            Option A
          </p>
          <p className="bg-blue-500 text-white pr-[35%] py-2 rounded-lg ml-10">
            <i class="fa-solid fa-b text-blue-500 bg-white px-2 py-2 rounded-2xl m-2"></i>
            Option B
          </p>
          <p className="bg-green-400 text-white pr-[35%] py-2 rounded-lg mt-8">
            <i class="fa-solid fa-c text-green-400 bg-white px-2 py-2 rounded-2xl m-2"></i>
            Option C
          </p>
          <p className="bg-fuchsia-500 text-white pr-[35%] py-2 rounded-lg mt-8 ml-10">
            <i class="fa-solid fa-d text-fuchsia-500 bg-white px-2 py-2 rounded-2xl m-2"></i>
            Option D
          </p>
        </div>
      </div>
    </div>
  );
};

export default Quiz_question;
