import { useState } from "react";
import Navbar from "../../Navbar/Navbar";
import LeftSideBar from "../../LeftSideBar/LeftSideBar";
import { useSelector } from 'react-redux';

const OrderForm = () => {
  const currentTheme = useSelector((state => state.theme.theme));

  const [formData, setFormData] = useState({
    orderId: "",
    customerId: "",
    productId: "",
    orderQuantity: "",
    totalPrice: "",
    orderStatus: "pending",
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
      orderId: "",
      customerId: "",
      productId: "",
      orderQuantity: "",
      totalPrice: "",
      orderStatus: "pending",
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
              Order Form
            </h2>

            <div className="flex flex-col lg:flex-row justify-between">
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

              <div className="w-full lg:w-[350px]">
                <label htmlFor="customerId" className="block text-sm font-medium">
                  Customer ID <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="customerId"
                  id="customerId"
                  value={formData.customerId}
                  onChange={handleChange}
                  className={`w-full mt-2 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#013D29] ${currentTheme === 'dark' ? 'text-white' : 'text-black'} ${currentTheme === 'dark' ? 'bg-[#404040]' : 'white]'}`}
                  placeholder="Enter customer ID"
                  required
                />
              </div>
            </div>

            <div className="flex flex-col lg:flex-row justify-between mt-5">
              <div className="w-full lg:w-[350px]">
                <label htmlFor="productId" className="block text-sm font-medium">
                  Product ID <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="productId"
                  id="productId"
                  value={formData.productId}
                  onChange={handleChange}
                  className={`w-full mt-2 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#013D29] ${currentTheme === 'dark' ? 'text-white' : 'text-black'} ${currentTheme === 'dark' ? 'bg-[#404040]' : 'white]'}`}
                  placeholder="Enter product ID"
                  required
                />
              </div>

              <div className="w-full lg:w-[350px]">
                <label htmlFor="orderQuantity" className="block text-sm font-medium">
                  Quantity <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  name="orderQuantity"
                  id="orderQuantity"
                  value={formData.orderQuantity}
                  onChange={handleChange}
                  className={`w-full mt-2 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#013D29] ${currentTheme === 'dark' ? 'text-white' : 'text-black'} ${currentTheme === 'dark' ? 'bg-[#404040]' : 'white]'}`}
                  placeholder="Enter quantity"
                  required
                />
              </div>
            </div>

            <div className="flex flex-col lg:flex-row justify-between mt-5">
              <div className="w-full lg:w-[350px]">
                <label htmlFor="totalPrice" className="block text-sm font-medium">
                  Total Price <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  name="totalPrice"
                  id="totalPrice"
                  value={formData.totalPrice}
                  onChange={handleChange}
                  step="0.01"
                  className={`w-full mt-2 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#013D29] ${currentTheme === 'dark' ? 'text-white' : 'text-black'} ${currentTheme === 'dark' ? 'bg-[#404040]' : 'white]'}`}
                  placeholder="Enter total price"
                  required
                />
              </div>

              <div className="w-full lg:w-[350px]">
                <label htmlFor="orderStatus" className="block text-sm font-medium">
                  Status <span className="text-red-500">*</span>
                </label>
                <select
                  name="orderStatus"
                  id="orderStatus"
                  value={formData.orderStatus}
                  onChange={handleChange}
                  className={`w-full mt-2 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#013D29] ${currentTheme === 'dark' ? 'text-white' : 'text-black'} ${currentTheme === 'dark' ? 'bg-[#404040]' : 'white]'}`}
                  required
                >
                  <option value="pending">Pending</option>
                  <option value="shipped">Shipped</option>
                  <option value="delivered">Delivered</option>
                  <option value="cancelled">Cancelled</option>
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

export default OrderForm;
