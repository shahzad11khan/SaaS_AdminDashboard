import { useState } from "react";
import Navbar from "../../Navbar/Navbar";
import LeftSideBar from "../../LeftSideBar/LeftSideBar";
import { useSelector } from 'react-redux';


const TagRegistrationForm = () => {
  const currentTheme = useSelector((state=>state.theme.theme))

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
        <div className={`flex flex-col  items-center lg:ml-10 w-full lg:w-[1000px] h-screen  ${currentTheme=== 'dark' ?'text-white':'text-gray-600'} `}>

          <form
            onSubmit={handleSubmit}
            className={`${currentTheme=== 'dark' ?'bg-[#404040]':'bg-white'}  mt-5 shadow-lg rounded-lg p-6 w-full lg:w-[800px]  border border-gray-300`}
          >
            <h2 className={`text-2xl font-bold mb-6 text-center ${currentTheme=== 'dark' ?'text-white':'text-gray-700'} `}>
              Tag Registration
            </h2>

            <div className="flex flex-col lg:flex-row justify-between">
              <div className="w-full lg:w-[350px]">
                <label
                  htmlFor="tagName"
                  className="block text-sm font-medium "
                >
                  Tag Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="tagName"
                  id="tagName"
                  value={formData.tagName}
                  onChange={handleChange}
                  className={`w-full mt-2 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#013D29] ${currentTheme=== 'dark' ?'text-white':'text-black'} ${currentTheme=== 'dark' ?'bg-[#404040]':'white]'}`}
                  placeholder="Enter tag name"
                  required
                />
              </div>
              <div className="w-full lg:w-[350px]">
                <label
                  htmlFor="category"
                  className="block text-sm font-medium "
                >
                  Category <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="category"
                  id="category"
                  value={formData.category}
                  onChange={handleChange}
                  className={`w-full mt-2 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#013D29] ${currentTheme=== 'dark' ?'text-white':'text-black'} ${currentTheme=== 'dark' ?'bg-[#404040]':'white]'}`}
                  placeholder="Enter category"
                  required
                />
              </div>
            </div>

            <div className="flex flex-col lg:flex-row justify-between mt-5">
              <div className="w-full lg:w-[350px]">
                <label
                  htmlFor="description"
                  className="block text-sm font-medium "
                >
                  Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="description"
                  id="description"
                  value={formData.description}
                  onChange={handleChange}
                  className={`w-full mt-2 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#013D29] ${currentTheme=== 'dark' ?'text-white':'text-black'} ${currentTheme=== 'dark' ?'bg-[#404040]':'white]'}`}
                  placeholder="Enter description"
                  required
                />
              </div>
              <div className="w-full lg:w-[350px]">
                <label
                  htmlFor="createdBy"
                  className="block text-sm font-medium "
                >
                  Created By <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="createdBy"
                  id="createdBy"
                  value={formData.createdBy}
                  onChange={handleChange}
                  className={`w-full mt-2 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#013D29] ${currentTheme=== 'dark' ?'text-white':'text-black'} ${currentTheme=== 'dark' ?'bg-[#404040]':'white]'}`}
                  placeholder="Enter creator's name"
                  required
                />
              </div>
            </div>

            <div className="flex flex-col lg:flex-row justify-between mt-5">
              <div className="w-full lg:w-[350px]">
                <label
                  htmlFor="createdDate"
                  className="block text-sm font-medium "
                >
                  Created Date <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  name="createdDate"
                  id="createdDate"
                  value={formData.createdDate}
                  onChange={handleChange}
                  className={`w-full mt-2 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#013D29] ${currentTheme=== 'dark' ?'text-white':'text-black'} ${currentTheme=== 'dark' ?'bg-[#404040]':'white]'}`}
                  required
                />
              </div>
              <div className="w-full lg:w-[350px]">
                <label
                  htmlFor="status"
                  className="block text-sm font-medium "
                >
                  Status <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="status"
                  id="status"
                  value={formData.status}
                  onChange={handleChange}
                  className={`w-full mt-2 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#013D29] ${currentTheme=== 'dark' ?'text-white':'text-black'} ${currentTheme=== 'dark' ?'bg-[#404040]':'white]'}`}
                  placeholder="Enter tag status"
                  required
                />
              </div>
            </div>

            <div className="flex justify-end mt-6">
              <button
                type="submit"
                className={`px-4 py-2 rounded  ${currentTheme=== 'dark' ?'text-white':'text-black'}  ${currentTheme=== 'dark' ?'bg-[#404040]':'bg-[#F0FFF8]'} border border-gray-300`}
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
