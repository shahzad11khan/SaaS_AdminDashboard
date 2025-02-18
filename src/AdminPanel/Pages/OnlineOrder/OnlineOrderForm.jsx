import { useEffect, useState } from "react";
import Navbar from "../../Navbar/Navbar";
import LeftSideBar from "../../LeftSideBar/LeftSideBar";
import { useSelector } from 'react-redux';
import { useLocation } from "react-router-dom";

const OrderForm = () => {
  const currentTheme = useSelector((state => state.theme.theme));

  const [formData, setFormData] = useState({
    orderStatus: "",
    shippingAddress: "",
    paymentMethod: "",

  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Order Submitted:", formData);
    alert("Order submitted successfully!");
    setFormData({
      orderStatus: "",
      shippingAddress: "",
      paymentMethod: "",
    });
  };

  const location = useLocation();

  useEffect(()=>{
if(location?.state?.onlineOrder)
  console.log(location?.state?.onlineOrder)
  setFormData({
    orderStatus:location.state.onlineOrder.orderStatus,
    shippingAddress:location.state.onlineOrder.shippingAddress,
    paymentMethod:location.state.onlineOrder.paymentMethod,
  })
  },[location.state])

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
              Order Form
            </h2>

            <div className="flex flex-col lg:flex-row justify-between">
              <div className="w-full lg:w-[350px]">
                <label htmlFor="orderStatus" className="block text-sm font-medium">
                Order Status <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="orderStatus"
                  id="orderStatus"
                  value={formData.orderStatus}
                  onChange={handleChange}
                  className={`w-full mt-2 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#013D29] ${currentTheme === 'dark' ? 'text-white' : 'text-black'} ${currentTheme === 'dark' ? 'bg-[#404040]' : 'white]'}`}
                  placeholder="Order Status"
                  required
                />
              </div>

              <div className="w-full lg:w-[350px]">
                <label htmlFor="shippingAddress" className="block text-sm font-medium">
                  Shipping Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="shippingAddress"
                  id="shippingAddress"
                  value={formData.shippingAddress}
                  onChange={handleChange}
                  className={`w-full mt-2 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#013D29] ${currentTheme === 'dark' ? 'text-white' : 'text-black'} ${currentTheme === 'dark' ? 'bg-[#404040]' : 'white]'}`}
                  placeholder="Enter shipping address"
                  required
                />
              </div>
            </div>

            <div className="flex flex-col lg:flex-row justify-between mt-5">
              <div className="w-full lg:w-[350px]">
                <label htmlFor="paymentMethod" className="block text-sm font-medium">
                Payment Method  <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="paymentMethod"
                  id="paymentMethod"
                  value={formData.paymentMethod}
                  onChange={handleChange}
                  className={`w-full mt-2 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#013D29] ${currentTheme === 'dark' ? 'text-white' : 'text-black'} ${currentTheme === 'dark' ? 'bg-[#404040]' : 'white]'}`}
                  placeholder="Enter payment method"
                  required
                />
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

export default OrderForm;
