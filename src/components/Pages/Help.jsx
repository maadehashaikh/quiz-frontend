

import React from "react";
import { useTheme } from "../TheamContext";

const Help = () =>{
  const { theme } = useTheme();
  const bgClass = theme === "dark" ? "bg-black text-white" : "bg-white text-black";
  const bgLine = theme === "dark" ?"bg-white text-black": "bg-black text-white"  ;
  return (
    <div className={`${bgClass}  font-sans`}>
      {/* Navbar */}
      

      {/* FAQ Section */}
      <section className="text-center py-10">
        <h1 className="mt-4 text-lg font-bold ">FAQs</h1>
        <h1 className="text-4xl font-bold text-red-500">ASK US ANYTHING</h1>
        <p className="mt-4 text-lg">Have any questions? We're here to assist you.</p>

        <div className="mt-6 border border-gray-600 rounded-md mx-auto w-4/5 md:w-1/2">
          <input
            type="text"
            placeholder="Search here"
            className="w-full px-4 py-2 rounded-md text-black"
          />
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4">
          {Array(6)
            .fill("How do I change my account email?")
            .map((faq, index) => (
              <div
                key={index}
                className="p-4 border border-gray-600 rounded-md text-left"
              >
                <h3 className="font-semibold">{faq}</h3>
                <p className="text-sm mt-2">
                  You can go to your account and change it from there. Navigate
                  to the settings page, then to the general tab to change your
                  email.
                </p>
              </div>
            ))}
        </div>

        <div className="mt-10">
          <p>Still have questions?</p>
          <button className="mt-4 px-6 py-2 bg-red-600 text-white rounded-md hover:bg-red-700">
            Get in Touch
          </button>
        </div>
      </section>

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

    </div>
  );
};

export default Help;
