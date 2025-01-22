

import React, { useState, useEffect } from "react";
import Setting from "./Setting";
import Dashboard_heading_buttons from "./Dashboard_heading_buttons";
import { toast } from "react-toastify";
import { useTheme } from "./TheamContext";

const User_dashboard = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    gender: "",
    country: "",
    language: "",
  });
  const {theme} = useTheme();
  const bgClass = theme === "dark" ? "bg-black text-white" : "bg-white text-black";

  // Fetch user data when the component loads
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("access");
        const response = await fetch("http://127.0.0.1:8000/api/update-user/", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`, // JWT token
          },
        });
        const data = await response.json();
        if (response.ok) {
          setFormData({
            name: data.name,
            email: data.email,
            gender: data.gender,
            country: data.country,
            language: data.language,
          });
        } else {
          toast.error("Error fetching user data: " );
          console.log("Error fetching user data: " + JSON.stringify(data))
        }
      } catch (error) {
        console.error("Error:", error);
        toast.error("An error occurred while fetching user data.");
      }
    };

    fetchData();
  }, []);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Toggle edit mode
  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  // Submit updated data
  const submitData = async () => {
    try {
      const token = localStorage.getItem("access");
      const response = await fetch("http://127.0.0.1:8000/api/update-user/", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (response.ok) {
        toast.success("User data updated successfully!");
        setIsEditing(false); // Exit edit mode
      } else {
        toast.error("Error updating user data: " + JSON.stringify(data));
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred while updating user data.");
    }
  };

  return (
    
  <div className={`flex h-screen ${bgClass}`}>
    {/* Sidebar */}
    <div className={` w-[17%] h-full ${bgClass} shadow-md`}>
      <Setting />
    </div>
     {/* <Setting /> */}

    {/* Main Content */}
    <div className="w-[85%] flex flex-col">
      {/* Header */}
      <div className="h-[14%] bg-black text-white flex items-center px-8">
        <Dashboard_heading_buttons
          heading={"My Settings"}
          button1={"Profile Settings"}
        />
      </div>

      {/* Main Body */}
      <div className="h-[74%] rounded-lg bg-white mx-8 mt-4 p-6 shadow-lg border border-gray-300 ">
        <div className="flex items-center justify-between border-b pb-4">
          <div className="flex gap-5">
            <i className="fa-solid fa-user text-red-500 text-3xl bg-red-100 px-6 py-4 rounded-full"></i>
            <div>
              <h1 className="text-xl font-semibold">{formData.name}</h1>
              <p className="text-gray-500">{formData.email}</p>
            </div>
          </div>
          <button
            className="bg-red-500 text-white rounded-md px-6 py-2 font-medium shadow hover:bg-red-600 transition"
            onClick={isEditing ? submitData : toggleEdit}
          >
            {isEditing ? "Save" : "Edit"}
          </button>
        </div>

        {/* Non-editable Fields */}
        {!isEditing && (
          <div className="mt-6">
            <div className="grid grid-cols-2 gap-8">
              <div>
                <label className="block text-gray-600 font-medium">Full Name</label>
                <p className="mt-1 text-gray-800">{formData.name}</p>
              </div>
              <div>
                <label className="block text-gray-600 font-medium">Email</label>
                <p className="mt-1 text-gray-800">{formData.email}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-8 mt-6">
              <div>
                <label className="block text-gray-600 font-medium">Gender</label>
                <p className="mt-1 text-gray-800">{formData.gender}</p>
              </div>
              <div>
                <label className="block text-gray-600 font-medium">Country</label>
                <p className="mt-1 text-gray-800">{formData.country}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-8 mt-6">
              <div>
                <label className="block text-gray-600 font-medium">Language</label>
                <p className="mt-1 text-gray-800">{formData.language}</p>
              </div>
            </div>
          </div>
        )}

        {/* Editable Fields */}
        {isEditing && (
          <form className="mt-6">
            <div className="grid grid-cols-2 gap-8">
              <div>
                <label className="block text-gray-600 font-medium">Full Name</label>
                <input
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  type="text"
                  className="w-full bg-gray-50 border border-gray-300 rounded-lg px-4 py-2 mt-2"
                />
              </div>
              <div>
                <label className="block text-gray-600 font-medium">Email</label>
                <input
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  type="email"
                  className="w-full bg-gray-50 border border-gray-300 rounded-lg px-4 py-2 mt-2"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-8 mt-6">
              <div>
                <label className="block text-gray-600 font-medium">Gender</label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                  className="w-full bg-gray-50 border border-gray-300 rounded-lg px-4 py-2 mt-2"
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-600 font-medium">Country</label>
                <select
                  name="country"
                  value={formData.country}
                  onChange={handleInputChange}
                  className="w-full bg-gray-50 border border-gray-300 rounded-lg px-4 py-2 mt-2"
                >
                  <option value="pakistan">Pakistan</option>
                  <option value="india">India</option>
                  <option value="bangladesh">Bangladesh</option>
                </select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-8 mt-6">
              <div>
                <label className="block text-gray-600 font-medium">Language</label>
                <select
                  name="language"
                  value={formData.language}
                  onChange={handleInputChange}
                  className="w-full bg-gray-50 border border-gray-300 rounded-lg px-4 py-2 mt-2"
                >
                  <option value="english">English</option>
                  <option value="urdu">Urdu</option>
                  <option value="sindhi">Sindhi</option>
                </select>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
</div>


//  <div className="flex h-screen">
//   {/* Sidebar */}
//   <div className="fixed top-20 left-0 h-full w-[16%] bg-white shadow-md">
//     <Setting />
//   </div>

//   {/* Main Content */}
//   <div className="flex flex-col ml-[16%] w-[84%]">
 
//        {/* Header */}
//        <div className="h-[14%] bg-black text-white flex items-center px-8">
//          <Dashboard_heading_buttons
//           heading={"My Settings"}
//           button1={"Profile Settings"}
//         />
//       </div>

//     {/* Main Body */}
//     <div className="flex-grow bg-gray-50 p-6 overflow-y-auto">
//       <div className="h-full rounded-lg bg-white shadow-lg border border-gray-300 p-6">
//         <div className="flex items-center justify-between border-b pb-4">
//           <div className="flex gap-5">
//             <i className="fa-solid fa-user text-red-500 text-3xl bg-red-100 px-6 py-4 rounded-full"></i>
//             <div>
//               <h1 className="text-xl font-semibold">{formData.name}</h1>
//               <p className="text-gray-500">{formData.email}</p>
//             </div>
//           </div>
//           <button
//             className="bg-red-500 text-white rounded-md px-6 py-2 font-medium shadow hover:bg-red-600 transition"
//             onClick={isEditing ? submitData : toggleEdit}
//           >
//             {isEditing ? "Save" : "Edit"}
//           </button>
//         </div>

//         {/* Non-editable Fields */}
//         {!isEditing && (
//           <div className="mt-6">
//             <div className="grid grid-cols-2 gap-8">
//               <div>
//                 <label className="block text-gray-600 font-medium">Full Name</label>
//                 <p className="mt-1 text-gray-800">{formData.name}</p>
//               </div>
//               <div>
//                 <label className="block text-gray-600 font-medium">Email</label>
//                 <p className="mt-1 text-gray-800">{formData.email}</p>
//               </div>
//             </div>
//             <div className="grid grid-cols-2 gap-8 mt-6">
//               <div>
//                 <label className="block text-gray-600 font-medium">Gender</label>
//                 <p className="mt-1 text-gray-800">{formData.gender}</p>
//               </div>
//               <div>
//                 <label className="block text-gray-600 font-medium">Country</label>
//                 <p className="mt-1 text-gray-800">{formData.country}</p>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Editable Fields */}
//         {isEditing && (
//           <form className="mt-6">
//             <div className="grid grid-cols-2 gap-8">
//               <div>
//                 <label className="block text-gray-600 font-medium">Full Name</label>
//                 <input
//                   name="name"
//                   value={formData.name}
//                   onChange={handleInputChange}
//                   type="text"
//                   className="w-full bg-gray-50 border border-gray-300 rounded-lg px-4 py-2 mt-2"
//                 />
//               </div>
//               <div>
//                 <label className="block text-gray-600 font-medium">Email</label>
//                 <input
//                   name="email"
//                   value={formData.email}
//                   onChange={handleInputChange}
//                   type="email"
//                   className="w-full bg-gray-50 border border-gray-300 rounded-lg px-4 py-2 mt-2"
//                 />
//               </div>
//             </div>
//           </form>
//         )}
//       </div>
//     </div>
//   </div>
// </div> 

  );
};

export default User_dashboard;
