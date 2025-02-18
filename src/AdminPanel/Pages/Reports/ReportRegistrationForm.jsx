import { useState } from "react";
import Navbar from "../../Navbar/Navbar";
import LeftSideBar from "../../LeftSideBar/LeftSideBar";
import { useSelector } from 'react-redux';
import { Auth } from "../../../utils/globleAtuhenticate";

const ReportRegistrationForm = () => {
  
  const currentTheme = useSelector((state => state.theme.theme));

  const [formData, setFormData] = useState({
    reportTitle: "",
    startDate: "",
    endDate: "",
    reportType: "sales", // default value
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Report Registered:", formData);
    alert("Report registered successfully!");
    setFormData({
      reportTitle: "",
      startDate: "",
      endDate: "",
      reportType: "sales", // reset to default
    });
  };

  if(!Auth()) return null;
  return (
    <>
      <Navbar />
      <div className="flex flex-col lg:flex-row">
        <LeftSideBar />
        <div className={`flex flex-col items-center lg:ml-10 w-full lg:w-[1000px] h-screen ${currentTheme === 'dark' ? 'text-white' : 'text-gray-600'}`}>
          <form
            onSubmit={handleSubmit}
            className={`${currentTheme === 'dark' ? 'bg-[#404040]' : 'bg-white'} mt-5 shadow-lg rounded-lg p-6 w-full lg:w-[800px] border border-gray-300`}
          >
            <h2 className={`text-2xl font-bold mb-6 text-center ${currentTheme === 'dark' ? 'text-white' : 'text-gray-700'}`}>
              Report Registration
            </h2>

            <div className="flex flex-col lg:flex-row justify-between">
              <div className="w-full lg:w-[350px]">
                <label htmlFor="reportTitle" className="block text-sm font-medium">
                  Report Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="reportTitle"
                  id="reportTitle"
                  value={formData.reportTitle}
                  onChange={handleChange}
                  className={`w-full mt-2 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#013D29] ${currentTheme === 'dark' ? 'text-white' : 'text-black'} ${currentTheme === 'dark' ? 'bg-[#404040]' : 'white'}`}
                  placeholder="Enter report title"
                  required
                />
              </div>

              <div className="w-full lg:w-[350px]">
                <label htmlFor="startDate" className="block text-sm font-medium">
                  Start Date <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  name="startDate"
                  id="startDate"
                  value={formData.startDate}
                  onChange={handleChange}
                  className={`w-full mt-2 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#013D29] ${currentTheme === 'dark' ? 'text-white' : 'text-black'} ${currentTheme === 'dark' ? 'bg-[#404040]' : 'white'}`}
                  required
                />
              </div>
            </div>

            <div className="flex flex-col lg:flex-row justify-between mt-5">
              <div className="w-full lg:w-[350px]">
                <label htmlFor="endDate" className="block text-sm font-medium">
                  End Date <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  name="endDate"
                  id="endDate"
                  value={formData.endDate}
                  onChange={handleChange}
                  className={`w-full mt-2 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#013D29] ${currentTheme === 'dark' ? 'text-white' : 'text-black'} ${currentTheme === 'dark' ? 'bg-[#404040]' : 'white'}`}
                  required
                />
              </div>

              <div className="w-full lg:w-[350px]">
                <label htmlFor="reportType" className="block text-sm font-medium">
                  Report Type <span className="text-red-500">*</span>
                </label>
                <select
                  name="reportType"
                  id="reportType"
                  value={formData.reportType}
                  onChange={handleChange}
                  className={`w-full mt-2 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#013D29] ${currentTheme === 'dark' ? 'text-white' : 'text-black'} ${currentTheme === 'dark' ? 'bg-[#404040]' : 'white'}`}
                  required
                >
                  <option value="sales">Sales</option>
                  <option value="inventory">Inventory</option>
                  <option value="customer">Customer</option>
                </select>
              </div>
            </div>

            <div className="flex justify-end mt-6">
              <button
                type="submit"
                className={`px-4 py-2 rounded ${currentTheme === 'dark' ? 'text-white' : 'text-black'} ${currentTheme === 'dark' ? 'bg-[#404040]' : 'bg-[#F0FFF8]'} border border-gray-300`}
              >
                Register Report
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default ReportRegistrationForm;
