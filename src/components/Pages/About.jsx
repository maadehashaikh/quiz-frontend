import React from "react";

const About = () => {
  return (
    <>{/* About Us Section */}
    <div className="bg-black text-white py-10 px-5 md:px-20 lg:px-40">
      <h2 className="text-3xl md:text-4xl font-bold mb-8 text-red-500">
        About Us
  <div className="h-1 w-20 bg-white  mb-8"></div>
      </h2>
      
      <div className="space-y-10">
        {/* Who We Are Section */}
        <div>
          <h3 className="text-xl md:text-2xl font-semibold mb-4 text-red-500">Who We Are</h3>
          <p className="text-gray-300 leading-relaxed">
            EngageLab is a cutting-edge technology company dedicated to revolutionizing the way people learn, present, and engage with content. We are passionate about creating innovative solutions that enhance interactions, spark creativity, and make learning enjoyable for everyone. Our mission is to simplify and transform the way people connect with knowledge, using state-of-the-art tools that empower users to achieve their goals.
          </p>
        </div>
    
        {/* Our Mission Section */}
        <div>
          <h3 className="text-xl md:text-2xl font-semibold mb-4 text-red-500">Our Mission</h3>
          <p className="text-gray-300 leading-relaxed">
            Our mission is to offer cutting-edge solutions that make learning simple, engaging, and accessible for everyone. We believe in harnessing the power of technology to break down barriers and open doors to endless possibilities. By integrating innovative ideas with user-friendly tools, we aim to create an ecosystem where knowledge is not only attainable but also enjoyable for everyone.
          </p>
        </div>
    
        {/* What We Do Section */}
        <div>
          <h3 className="text-xl md:text-2xl font-semibold mb-4 text-red-500">What We Do</h3>
          <p className="text-gray-300 leading-relaxed">
            At EngageLab, we offer a range of innovative platforms that provide a suite of tools for interactive learning and communication. These include:
          </p>
          <ul className="list-disc list-inside mt-4 space-y-2 text-gray-300">
            <li><span className="font-semibold text-white">AI-Driven Learning Modules:</span> Engage users with dynamic and AI-enhanced learning experiences.</li>
            <li><span className="font-semibold text-white">Presentation Creation Tools:</span> Create impactful, visually appealing, and interactive presentations.</li>
            <li><span className="font-semibold text-white">Personalized Analytics:</span> Deliver insights and performance metrics to maximize results.</li>
          </ul>
        </div>
    
        {/* Our Vision Section */}
        <div>
          <h3 className="text-xl md:text-2xl font-semibold mb-4 text-red-500">Our Vision</h3>
          <p className="text-gray-300 leading-relaxed">
            We envision a future where technology bridges the gap between education and success, making high-quality learning experiences and resources accessible to everyone. Our goal is to empower individuals to reach their full potential while continuously pushing the boundaries of innovation to shape a brighter world for learners.
          </p>
        </div>
    
        {/* Join Us Section */}
        <div>
          <h3 className="text-xl md:text-2xl font-semibold mb-4 text-red-500">Join Us on Our Journey</h3>
          <p className="text-gray-300 leading-relaxed">
            We invite you to join us in transforming the landscape of digital education and presentations. Whether you are a student striving to explore new learning methods, a presenter seeking innovative ways to enhance your audience's experience, or an organization aiming to empower your team, EngageLab is here to help you achieve your goals.
          </p>
        </div>
      </div>
    </div>
    </>
  )
};

export default About;
