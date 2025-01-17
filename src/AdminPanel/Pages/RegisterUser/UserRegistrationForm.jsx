import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../Navbar/Navbar";
import LeftSideBar from "../../LeftSideBar/LeftSideBar";

const UserRegistrationForm = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    dateOfBirth: "",
    permission: "",
    role: "",
    status: "active",
  });


  const [next, setnext] = useState(0)

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "radio" ? (checked ? value : formData[name]) : value,
    });
  };


  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    console.log("Form Submitted:", formData);
    alert("User registered successfully!");
    setFormData({
      fullName: "",
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      dateOfBirth: "",
      permission: "",
      role: "",
      status: "active",
    });
  };

  return (
    <>
      <Navbar />
      <div className="flex flex-col lg:flex-row">
        <LeftSideBar />
     <div className="flex flex-col items-center lg:ml-10 w-full lg:w-[1000px] h-screen ">
          <form
            onSubmit={handleSubmit}
            className="bg-white mt-5 shadow-lg rounded-lg p-6 w-full lg:w-[800px] border border-gray-300"
          >
            <h2 className="text-2xl font-bold mb-6 text-center text-gray-700">
              User Registration
            </h2>
            <div>

              {next === 0 ? (
                <>
                  <div className="flex flex-col lg:flex-row justify-between">
                    <div className="w-full lg:w-[350px]">
                      <label
                        htmlFor="fullName"
                        className="block text-sm font-medium text-gray-600"
                      >
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="fullName"
                        id="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        className="w-full mt-2 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter your full name"
                        required
                      />
                    </div>
                    <div className="w-full lg:w-[350px]">
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-600"
                      >
                        Email Address <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        id="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full mt-2 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter your email"
                        required
                      />
                    </div>
                  </div>


                  <div className="flex flex-col lg:flex-row justify-between mt-5">
                    <div className="w-full lg:w-[350px]">
                      <label
                        htmlFor="password"
                        className="block text-sm font-medium text-gray-600"
                      >
                        Password <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="password"
                        name="password"
                        id="password"
                        value={formData.password}
                        onChange={handleChange}
                        className="w-full mt-2 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter password"
                        required
                      />
                    </div>
                    <div className="w-full lg:w-[350px]">

                      <label
                        htmlFor="confirmPassword"
                        className="block text-sm font-medium text-gray-600"
                      >
                        Confirm Password <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="password"
                        name="confirmPassword"
                        id="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        className="w-full mt-2 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Confirm password"
                        required
                      />

                    </div>
                  </div>

                  <div className="flex flex-col lg:flex-row justify-between mt-5">

                    <button type="button" className="w-full lg:w-[350px] flex justify-center items-center rounded mt-7 h-[40px] border">
                      Show
                    </button>


                  </div>

                  <div className="w-full flex justify-end gap-5 mt-5">
                    <Link to="/register-user">
                      <button type="button" className="px-4 py-2 rounded  bg-[#F0FFF8] border border-gray-300">
                        Back
                      </button>
                    </Link>


                    <button
                      type="button"
                      className="px-4 py-2 rounded  bg-[#F0FFF8] border border-gray-300"
                      onClick={() => setnext((prevNext) => prevNext + 1)}
                    >
                      Next
                    </button>
                  </div>
                </>

              ) : next === 1 ? (
                <>
                  <div className="flex flex-col lg:flex-row justify-between">
                    <div className="w-full lg:w-[350px]">
                      <label
                        htmlFor="dateOfBirth"
                        className="block text-sm font-medium text-gray-600"
                      >
                        Date of Birth <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="date"
                        name="dateOfBirth"
                        id="dateOfBirth"
                        value={formData.dateOfBirth}
                        onChange={handleChange}
                        className="w-full mt-2 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>
                    <div className="w-full lg:w-[350px]">
                      <label
                        htmlFor="permission"
                        className="block text-sm font-medium text-gray-600"
                      >
                        Permission <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="permission"
                        id="permission"
                        value={formData.permission}
                        onChange={handleChange}
                        className="w-full mt-2 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter permission"
                        required
                      />
                    </div>
                  </div>

                  <div className="flex flex-col lg:flex-row justify-between mt-5">
                    <div className="w-full lg:w-[350px]">
                      <label
                        htmlFor="role"
                        className="block text-sm font-medium text-gray-600"
                      >
                        Role <span className="text-red-500">*</span>
                      </label>
                      <select
                        name="role"
                        id="role"
                        value={formData.role}
                        onChange={handleChange}
                        className="w-full mt-2 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      >
                        <option value="" disabled>
                          Select a role
                        </option>
                        <option value="admin">Admin</option>
                        <option value="manager">Manager</option>
                        <option value="employee">Employee</option>
                      </select>
                    </div>
                    <div className="w-full lg:w-[350px] flex items-center mt-6 lg:mt-0">
                      <label className="flex items-center mr-4">
                        <input
                          type="radio"
                          name="status"
                          value="active"
                          checked={formData.status === "active"}
                          onChange={handleChange}
                          className="w-4 h-4 text-blue-500 border-gray-300 rounded focus:ring-blue-500"
                        />
                        <span className="ml-2 text-sm font-medium text-gray-600">
                          Active
                        </span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="status"
                          value="inactive"
                          checked={formData.status === "inactive"}
                          onChange={handleChange}
                          className="w-4 h-4 text-blue-500 border-gray-300 rounded focus:ring-blue-500"
                        />
                        <span className="ml-2 text-sm font-medium text-gray-600">
                          InActive
                        </span>
                      </label>
                    </div>
                  </div>

                  <div className="w-full flex justify-end gap-5 mt-5">
                    <button
                      type="button"
                      className="px-4 py-2 rounded  bg-[#F0FFF8] border border-gray-300"
                      onClick={() => setnext((prevNext) => prevNext - 1)}
                    >
                      Back
                    </button>

                    <Link to="/user-registration-form">
                      <button
                        type="button"
                        className="px-4 py-2 rounded  bg-[#F0FFF8] border border-gray-300">
                        Save
                      </button>
                    </Link>
                  </div>

                </>

              )



                : null}
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default UserRegistrationForm;
