import { useState } from "react";
import Navbar from "../../Navbar/Navbar";
import LeftSideBar from "../../LeftSideBar/LeftSideBar";

const WarehouseRegistrationForm = () => {
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
        <div className="flex flex-col items-center lg:ml-10 w-full lg:w-[1000px] h-screen ">
          <form
            onSubmit={handleSubmit}
            className="bg-white mt-5 shadow-lg rounded-lg p-6 w-full lg:w-[800px] border border-gray-300"
          >
            <h2 className="text-2xl font-bold mb-6 text-center text-gray-700">
              Warehouse Registration
            </h2>

            <div className="flex flex-col lg:flex-row justify-between">
              <div className="w-full lg:w-[350px]">
                <label
                  htmlFor="warehouseName"
                  className="block text-sm font-medium text-gray-600"
                >
                  Warehouse Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="warehouseName"
                  id="warehouseName"
                  value={formData.warehouseName}
                  onChange={handleChange}
                  className="w-full mt-2 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter warehouse name"
                  required
                />
              </div>
              <div className="w-full lg:w-[350px]">
                <label
                  htmlFor="location"
                  className="block text-sm font-medium text-gray-600"
                >
                  Location <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="location"
                  id="location"
                  value={formData.location}
                  onChange={handleChange}
                  className="w-full mt-2 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter location"
                  required
                />
              </div>
            </div>

            <div className="flex flex-col lg:flex-row justify-between mt-5">
              <div className="w-full lg:w-[350px]">
                <label
                  htmlFor="managerName"
                  className="block text-sm font-medium text-gray-600"
                >
                  Manager Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="managerName"
                  id="managerName"
                  value={formData.managerName}
                  onChange={handleChange}
                  className="w-full mt-2 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter manager's name"
                  required
                />
              </div>
              <div className="w-full lg:w-[350px]">
                <label
                  htmlFor="contactNumber"
                  className="block text-sm font-medium text-gray-600"
                >
                  Contact Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  name="contactNumber"
                  id="contactNumber"
                  value={formData.contactNumber}
                  onChange={handleChange}
                  className="w-full mt-2 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter contact number"
                  required
                />
              </div>
            </div>

            <div className="flex flex-col lg:flex-row justify-between mt-5">
              <div className="w-full lg:w-[350px]">
                <label
                  htmlFor="capacity"
                  className="block text-sm font-medium text-gray-600"
                >
                  Capacity (in cubic meters) <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  name="capacity"
                  id="capacity"
                  value={formData.capacity}
                  onChange={handleChange}
                  className="w-full mt-2 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter capacity"
                  required
                />
              </div>
              <div className="w-full lg:w-[350px]">
                <label
                  htmlFor="operatingHours"
                  className="block text-sm font-medium text-gray-600"
                >
                  Operating Hours <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="operatingHours"
                  id="operatingHours"
                  value={formData.operatingHours}
                  onChange={handleChange}
                  className="w-full mt-2 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter operating hours"
                  required
                />
              </div>
            </div>

            <div className="flex justify-end mt-6">
              <button
                type="submit"
                className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-200"
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
