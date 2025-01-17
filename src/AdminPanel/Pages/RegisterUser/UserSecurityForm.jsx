import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../Navbar/Navbar";
import LeftSideBar from "../../LeftSideBar/LeftSideBar";

const UserSecurityForm = () => {
  const [formData, setFormData] = useState({
    dateOfBirth: "",
    permission: "",
    role: "",
    status: "active", // Default to 'active'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted:", formData);
    alert("User security details saved successfully!");
    setFormData({
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
              User Security Details
            </h2>

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
              <Link to="/user-registration-form">
                <button
                  type="button"
                  className="px-4 py-2 rounded bg-[#F0FFF8] border border-gray-300  border"
                >
                  Back
                </button>
              </Link>

              <Link to="/user-registration-form">
                <button
                  type="button"
                  className="px-4 py-2 rounded bg-[#F0FFF8] border border-gray-300  border"
                >
                  Save
                </button>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default UserSecurityForm;
