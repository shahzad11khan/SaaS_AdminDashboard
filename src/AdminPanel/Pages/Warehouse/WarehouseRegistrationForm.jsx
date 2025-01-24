import { useState } from "react";
import Navbar from "../../Navbar/Navbar";
import LeftSideBar from "../../LeftSideBar/LeftSideBar";
import { useSelector } from 'react-redux';


const WarehouseRegistrationForm = () => {
  const currentTheme = useSelector((state=>state.theme.theme))

  const [formData, setFormData] = useState({
    warehouseName: "",
    location: "",
    managerName: "",
    contactNumber: "",
    capacity: "",
    operatingHours: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Warehouse Registered:", formData);
    alert("Warehouse registered successfully!");
    setFormData({
      warehouseName: "",
      location: "",
      managerName: "",
      contactNumber: "",
      capacity: "",
      operatingHours: "",
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
              Warehouse Registration
            </h2>

            <div className="flex flex-col lg:flex-row justify-between">
              <div className="w-full lg:w-[350px]">
                <label
                  htmlFor="warehouseName"
                  className="block text-sm font-medium "
                >
                  Warehouse Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="warehouseName"
                  id="warehouseName"
                  value={formData.warehouseName}
                  onChange={handleChange}
                  className={`w-full mt-2 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#013D29] ${currentTheme=== 'dark' ?'text-white':'text-black'} ${currentTheme=== 'dark' ?'bg-[#404040]':'white]'}`}
                  placeholder="Enter warehouse name"
                  required
                />
              </div>
              <div className="w-full lg:w-[350px]">
                <label
                  htmlFor="location"
                  className="block text-sm font-medium "
                >
                  Location <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="location"
                  id="location"
                  value={formData.location}
                  onChange={handleChange}
                  className={`w-full mt-2 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#013D29] ${currentTheme=== 'dark' ?'text-white':'text-black'} ${currentTheme=== 'dark' ?'bg-[#404040]':'white]'}`}
                  placeholder="Enter location"
                  required
                />
              </div>
            </div>

            <div className="flex flex-col lg:flex-row justify-between mt-5">
              <div className="w-full lg:w-[350px]">
                <label
                  htmlFor="managerName"
                  className="block text-sm font-medium "
                >
                  Manager Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="managerName"
                  id="managerName"
                  value={formData.managerName}
                  onChange={handleChange}
                  className={`w-full mt-2 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#013D29] ${currentTheme=== 'dark' ?'text-white':'text-black'} ${currentTheme=== 'dark' ?'bg-[#404040]':'white]'}`}
                  placeholder="Enter manager's name"
                  required
                />
              </div>
              <div className="w-full lg:w-[350px]">
                <label
                  htmlFor="contactNumber"
                  className="block text-sm font-medium "
                >
                  Contact Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  name="contactNumber"
                  id="contactNumber"
                  value={formData.contactNumber}
                  onChange={handleChange}
                  className={`w-full mt-2 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#013D29] ${currentTheme=== 'dark' ?'text-white':'text-black'} ${currentTheme=== 'dark' ?'bg-[#404040]':'white]'}`}
                  placeholder="Enter contact number"
                  required
                />
              </div>
            </div>

            <div className="flex flex-col lg:flex-row justify-between mt-5">
              <div className="w-full lg:w-[350px]">
                <label
                  htmlFor="capacity"
                  className="block text-sm font-medium "
                >
                  Capacity (in cubic meters) <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  name="capacity"
                  id="capacity"
                  value={formData.capacity}
                  onChange={handleChange}
                  className={`w-full mt-2 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#013D29] ${currentTheme=== 'dark' ?'text-white':'text-black'} ${currentTheme=== 'dark' ?'bg-[#404040]':'white]'}`}
                  placeholder="Enter capacity"
                  required
                />
              </div>
              <div className="w-full lg:w-[350px]">
                <label
                  htmlFor="operatingHours"
                  className="block text-sm font-medium "
                >
                  Operating Hours <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="operatingHours"
                  id="operatingHours"
                  value={formData.operatingHours}
                  onChange={handleChange}
                  className={`w-full mt-2 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#013D29] ${currentTheme=== 'dark' ?'text-white':'text-black'} ${currentTheme=== 'dark' ?'bg-[#404040]':'white]'}`}
                  placeholder="Enter operating hours"
                  required
                />
              </div>
            </div>

            <div className="flex justify-end mt-6">
              <button
                type="submit"
                className={`px-4 py-2 rounded  ${currentTheme=== 'dark' ?'text-white':'text-black'}  ${currentTheme=== 'dark' ?'bg-[#404040]':'bg-[#F0FFF8]'} border border-gray-300`}
              >
                Register Warehouse
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default WarehouseRegistrationForm;
