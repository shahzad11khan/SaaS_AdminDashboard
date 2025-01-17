import { useState } from "react";
import Navbar from "../../Navbar/Navbar";
import LeftSideBar from "../../LeftSideBar/LeftSideBar";

const TagRegistrationForm = () => {
  const [formData, setFormData] = useState({
    tagName: "",
    description: "",
    createdBy: "",
    createdDate: "",
    status: "",
    category: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Tag Registered:", formData);
    alert("Tag registered successfully!");
    setFormData({
      tagName: "",
      description: "",
      createdBy: "",
      createdDate: "",
      status: "",
      category: "",
    });
  };

  return (
    <>
      <Navbar />
      <div className="flex flex-col lg:flex-row">
        <LeftSideBar />
        <div className="flex flex-col items-center w-full lg:w-full h-screen">
          <form
            onSubmit={handleSubmit}
            className="bg-white mt-5 shadow-lg rounded-lg p-6 w-full lg:w-[800px] border border-gray-300"
          >
            <h2 className="text-2xl font-bold mb-6 text-center text-gray-700">
              Tag Registration
            </h2>

            <div className="flex flex-col lg:flex-row justify-between">
              <div className="w-full lg:w-[350px]">
                <label
                  htmlFor="tagName"
                  className="block text-sm font-medium text-gray-600"
                >
                  Tag Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="tagName"
                  id="tagName"
                  value={formData.tagName}
                  onChange={handleChange}
                  className="w-full mt-2 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter tag name"
                  required
                />
              </div>
              <div className="w-full lg:w-[350px]">
                <label
                  htmlFor="category"
                  className="block text-sm font-medium text-gray-600"
                >
                  Category <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="category"
                  id="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full mt-2 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter category"
                  required
                />
              </div>
            </div>

            <div className="flex flex-col lg:flex-row justify-between mt-5">
              <div className="w-full lg:w-[350px]">
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-gray-600"
                >
                  Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="description"
                  id="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="w-full mt-2 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter description"
                  required
                />
              </div>
              <div className="w-full lg:w-[350px]">
                <label
                  htmlFor="createdBy"
                  className="block text-sm font-medium text-gray-600"
                >
                  Created By <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="createdBy"
                  id="createdBy"
                  value={formData.createdBy}
                  onChange={handleChange}
                  className="w-full mt-2 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter creator's name"
                  required
                />
              </div>
            </div>

            <div className="flex flex-col lg:flex-row justify-between mt-5">
              <div className="w-full lg:w-[350px]">
                <label
                  htmlFor="createdDate"
                  className="block text-sm font-medium text-gray-600"
                >
                  Created Date <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  name="createdDate"
                  id="createdDate"
                  value={formData.createdDate}
                  onChange={handleChange}
                  className="w-full mt-2 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div className="w-full lg:w-[350px]">
                <label
                  htmlFor="status"
                  className="block text-sm font-medium text-gray-600"
                >
                  Status <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="status"
                  id="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="w-full mt-2 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter tag status"
                  required
                />
              </div>
            </div>

            <div className="flex justify-end mt-6">
              <button
                type="submit"
                className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-200"
              >
                Register Tag
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default TagRegistrationForm;
