import { useState } from "react";
import Navbar from "../../Navbar/Navbar";
import LeftSideBar from "../../LeftSideBar/LeftSideBar";
import { useSelector } from 'react-redux';

const DeliveryForm = () => {
  const currentTheme = useSelector((state => state.theme.theme));

  const [formData, setFormData] = useState({
    deliveryId: "",
    orderId: "",
    deliveryDate: "",
    courierName: "",
    deliveryStatus: "pending",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Delivery Information Submitted:", formData);
    alert("Delivery information submitted successfully!");
    setFormData({
      deliveryId: "",
      orderId: "",
      deliveryDate: "",
      courierName: "",
      deliveryStatus: "pending",
    });
  };

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
              Delivery Form
            </h2>

            <div className="flex flex-col lg:flex-row justify-between">
              <div className="w-full lg:w-[350px]">
                <label htmlFor="deliveryId" className="block text-sm font-medium">
                  Delivery ID <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="deliveryId"
                  id="deliveryId"
                  value={formData.deliveryId}
                  onChange={handleChange}
                  className={`w-full mt-2 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#013D29] ${currentTheme === 'dark' ? 'text-white' : 'text-black'} ${currentTheme === 'dark' ? 'bg-[#404040]' : 'white]'}`}
                  placeholder="Enter delivery ID"
                  required
                />
              </div>

              <div className="w-full lg:w-[350px]">
                <label htmlFor="orderId" className="block text-sm font-medium">
                  Order ID <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="orderId"
                  id="orderId"
                  value={formData.orderId}
                  onChange={handleChange}
                  className={`w-full mt-2 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#013D29] ${currentTheme === 'dark' ? 'text-white' : 'text-black'} ${currentTheme === 'dark' ? 'bg-[#404040]' : 'white]'}`}
                  placeholder="Enter order ID"
                  required
                />
              </div>
            </div>

            <div className="flex flex-col lg:flex-row justify-between mt-5">
              <div className="w-full lg:w-[350px]">
                <label htmlFor="deliveryDate" className="block text-sm font-medium">
                  Delivery Date <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  name="deliveryDate"
                  id="deliveryDate"
                  value={formData.deliveryDate}
                  onChange={handleChange}
                  className={`w-full mt-2 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#013D29] ${currentTheme === 'dark' ? 'text-white' : 'text-black'} ${currentTheme === 'dark' ? 'bg-[#404040]' : 'white]'}`}
                  required
                />
              </div>

              <div className="w-full lg:w-[350px]">
                <label htmlFor="courierName" className="block text-sm font-medium">
                  Courier <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="courierName"
                  id="courierName"
                  value={formData.courierName}
                  onChange={handleChange}
                  className={`w-full mt-2 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#013D29] ${currentTheme === 'dark' ? 'text-white' : 'text-black'} ${currentTheme === 'dark' ? 'bg-[#404040]' : 'white]'}`}
                  placeholder="Enter courier name"
                  required
                />
              </div>
            </div>

            <div className="flex flex-col lg:flex-row justify-between mt-5">
              <div className="w-full lg:w-[350px]">
                <label htmlFor="deliveryStatus" className="block text-sm font-medium">
                  Status <span className="text-red-500">*</span>
                </label>
                <select
                  name="deliveryStatus"
                  id="deliveryStatus"
                  value={formData.deliveryStatus}
                  onChange={handleChange}
                  className={`w-full mt-2 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#013D29] ${currentTheme === 'dark' ? 'text-white' : 'text-black'} ${currentTheme === 'dark' ? 'bg-[#404040]' : 'white]'}`}
                  required
                >
                  <option value="pending">Pending</option>
                  <option value="inTransit">In Transit</option>
                  <option value="delivered">Delivered</option>
                </select>
              </div>
            </div>

            <div className="flex justify-end mt-6">
              <button
                type="submit"
                className={`px-4 py-2 rounded ${currentTheme === 'dark' ? 'text-white' : 'text-black'} ${currentTheme === 'dark' ? 'bg-[#404040]' : 'bg-[#F0FFF8]'} border border-gray-300`}
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default DeliveryForm;
