import React, { useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { toast } from 'react-toastify';


const Login = () => {
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const { email, password } = loginData;
  const onChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const submitData = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data_user = {
      email: formData.get("email"), // Ensure this matches the backend
      password: formData.get("password"),
    };
    try {
      const response = await fetch("http://127.0.0.1:8000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data_user),
      });
      const data = await response.json();
      console.log("Login Success:", data);
      // Handle response data (e.g., save token, redirect user, etc.)
      if (data.access){
        localStorage.setItem("access",data.access)
        localStorage.setItem("refresh",data.refresh)
        localStorage.setItem("name", data.name); 
        localStorage.setItem("email", data.email); 
        // alert("sucess full login")
        toast.success("Congrats You're login successfully");
        navigate("/dashboard")
      }
      else{
        // alert("Invalid Login Credeentials.")
        toast.error("Invalid Login Credeentials");
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };
  return (
    <div>
      <div className="w-full h-[88.5vh] bg-black">
        <div className=" flex flex-col w-fit items-center justify-center m-auto px-5 text-white bg-black pt-2 ">
          <h1 className="text-3xl font-medium mb-3">LOGIN</h1>
          <p className="text-lg font-base font-sans mb-4">
            Welcome back <span className="text-red-500 font-bold">!</span>{" "}
            Please login to access your account.
          </p>
          <form onSubmit={submitData}>
            <div
              style={{ backgroundColor: "#CCBEBE" }}
              className="text-black text-center py-2 rounded-lg mb-3"
            >
              <i className="fa-regular fa-user ml-2"></i>
              <input
                name="email"
                value={email}
                onChange={onChange}
                type="email"
                placeholder="email"
                className=" text-black pr-40 pl-2 py-1 font-sans text-sm focus:outline-none focus:border-none  placeholder:text-black"
                style={{ backgroundColor: "#CCBEBE" }}
              />
            </div>

            <div
              style={{ backgroundColor: "#CCBEBE" }}
              className="text-black text-center py-2 rounded-lg mb-3"
            >
              <i class="fa-solid fa-lock ml-2"></i>
              <input
                name="password"
                value={password}
                onChange={onChange}
                type="password"
                placeholder="Password"
                className=" text-black pr-40 pl-2 py-1  font-sans text-sm focus:outline-none focus:border-none placeholder:text-black"
                style={{ backgroundColor: "#CCBEBE" }}
              />
            </div>
            <div className="flex items-center justify-between">
              <NavLink to="/forgotPassword">
                <p className=" font-sans text-end mb-2 text-red-600">
                  Forgot Password ?
                </p>
              </NavLink>
              <NavLink to="/signup">
                <p className=" font-sans text-end mb-2 text-red-600">
                  Create an account
                </p>
              </NavLink>
            </div>

            <button
              className="flex text-white px-12 py-3 rounded-lg m-auto text-lg font-semibold"
              style={{ backgroundColor: "#CD181F" }}
            >
              Login Now
            </button>

            {/* Login with others */}
            <div class="flex items-center my-5">
              <div class="flex-grow border-t-2 border-gray-300"></div>
              <span class="mx-4 text-md font-medium text-gray-500 font-sans">
                <span className="text-white font-base mr-1 text-lg font-sans">
                  Login
                </span>
                with Others
              </span>
              <div class="flex-grow border-t-2 border-gray-300"></div>
            </div>
            {/*Login with Google Button*/}
            <div className="flex justify-center items-center border-2 border-slate-400 rounded-lg mb-2">
              <img
                src="http://pngimg.com/uploads/google/google_PNG19635.png"
                width={"50px"}
                height={"50px"}
              />
              <button className="font-sans text-sm">
                Login with <span className="font-semibold">Google</span>
              </button>
            </div>

            {/*Login with FB Button*/}
            <div className="flex justify-center items-center border-2 border-slate-400 rounded-lg py-1">
              <img
                src="http://clipart-library.com/new_gallery/377-3776210_facebook-logo-vector-logovectornet-logo-facebook-2019-png.png"
                width={"50px"}
                height={"45px"}
                className="mr-2"
              />
              <button className="font-sans text-sm">
                Login with <span className="font-semibold">Facebook</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
