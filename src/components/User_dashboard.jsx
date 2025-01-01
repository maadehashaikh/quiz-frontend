import React from "react";
import Setting from "./Setting";
import Dashboard_heading_buttons from "./Dashboard_heading_buttons";

const User_dashboard = () => {
  // const userName = localStorage.getItem("name") || "User";
  // const userEmail = localStorage.getItem("email") || "user@example.com";
  return (
    <>
      <div className="flex h-screen">
        <div className="w-[17%] h-full bg-white">
          <Setting />
        </div>
        <div className="w-[85%] flex flex-col">
          <div className="h-[14%] bg-black text-white ">
            <Dashboard_heading_buttons
              heading={"My Settings"}
              button1={"Profile Settings"}
              button2={"Account Settings"}
              button3={"Prefrences"}
            />
          </div>
          <div className="h-[74%] rounded-lg bg-white ">
            <div className="flex items-center justify-between">
              <div className="flex gap-5 ml-8 mt-4">
                <i class="fa-solid fa-user text-red-500 text-xl bg-red-100 px-[20px] py-[14px] rounded-3xl"></i>
                <div className="">
                  <h1 className="text-xl">
                    {/* {userName} */}
                    UserName
                  </h1>
                  <p className="text-base text-gray-400">
                    {/* {userEmail} */}
                    useremail@gmail.com
                  </p>
                </div>
              </div>
              <div>
                <button
                  className="bg-red-500 text-white rounded-md px-5 py-1 mr-12"
                  // onClick={submitData}
                >
                  Edit
                </button>
              </div>
            </div>
            {/* Form div */}
            <div className=" mt-3">
              <form>
                <div className="flex items-center gap-20 ml-5">
                  <div>
                    <label className="ml-1">Full Name</label>
                    <br />
                    <input
                      name="name"
                      value={name}
                      // onChange={onChange}
                      type="text"
                      placeholder="Your First Name"
                      className="bg-red-100 pr-52 py-1 pl-2 mt-2 rounded"
                    />
                  </div>
                  <div>
                    <label className="ml-1">Last Name</label>
                    <br />
                    <input
                      name="lastname"
                      // value={lastname}
                      // onChange={onChange}
                      type="text"
                      placeholder="Your Last Name"
                      className="bg-red-100 pr-60 py-1 pl-2 mt-2 rounded"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-20 ml-5 mt-5">
                  <div>
                    <label className="ml-1">Gender</label>
                    <br />
                    <select
                      name="gender"
                      // value={gender}
                      // onChange={onChange}
                      className="bg-red-100 pr-80 py-1 pl-2 mt-2 rounded"
                    >
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                    </select>
                  </div>
                  <div>
                    <label className="ml-1">Country</label>
                    <br />
                    <select
                      name="country"
                      // value={country}
                      // onChange={onChange}
                      className="bg-red-100 pr-80 py-1 pl-2 mt-2 rounded"
                    >
                      <option value="pakistan">Pakistan</option>
                      <option value="india">India</option>
                      <option value="bangladesh">Bangladesh</option>
                    </select>
                  </div>
                </div>

                <div className="flex items-center gap-20 ml-5 mt-5">
                  <div>
                    <label className="ml-1">Language</label>
                    <br />
                    <select
                      name="language"
                      // value={language}
                      // onChange={onChange}
                      className="bg-red-100 pr-80 py-1 pl-2 mt-2 rounded placeholder:text-gray-400"
                    >
                      <option
                        value="english"
                        className="placeholder:text-gray-400"
                      >
                        English
                      </option>
                      <option value="urdu">Urdu</option>
                      <option value="sindhi">Sindhi</option>
                    </select>
                  </div>
                  <div>
                    <label className="ml-1">Time zone</label>
                    <br />
                    <select
                      name="timezone"
                      // value={timezone}
                      // onChange={onChange}
                      className="bg-red-100 pr-80 py-1 pl-2 mt-2 rounded"
                    >
                      <option value="pakistan">GMT 5:00</option>
                      <option value="india">GMT 5:00</option>
                      <option value="bangladesh">GMT 5:00</option>
                    </select>
                  </div>
                </div>

                <div className="ml-5 mt-3">
                  <h2 className="text-lg">My email Address</h2>
                  <i class="fa-solid fa-envelope text-red-500 mr-3 bg-red-100 px-3 py-2 rounded-2xl"></i>
                  {/* {userEmail} */}
                  <span>
                    username@gmail.com
                    <br />
                    <h3 className="text-gray-400 ml-[50px]">1 month ago</h3>
                  </span>

                  <button className="text-red-500 mt-2 bg-red-100 py-1 px-3 rounded-md">
                    +Add Email Address
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default User_dashboard;
