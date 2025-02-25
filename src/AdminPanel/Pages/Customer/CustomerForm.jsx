import { useState } from "react";
import Navbar from "../../Navbar/Navbar";
import LeftSideBar from "../../LeftSideBar/LeftSideBar";
import { useSelector } from 'react-redux';

const CustomerRegistrationForm = () => {
  const currentTheme = useSelector((state => state.theme.theme));

  const [formData, setFormData] = useState({
    productName: "",
    quantity: "1",
    productPrice: "",
    customerTotalPrice: "",
    username: "",
    userAddress: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Customer Registered:", formData);
    alert("Customer registered successfully!");
    setFormData({
      productName: "",
      quantity: "1",
      productPrice: "",
      customerTotalPrice: "",
      username: "",
      userAddress: "",
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
              Customer Registration
            </h2>

            <div className="flex flex-col lg:flex-row justify-between">
            <div className="w-full lg:w-[350px]">
                <label
                  htmlFor="productName"
                  className="block text-sm font-medium"
                >
                  Product Name <span className="text-red-500">*</span>
                </label>
                <input
                  name="productName"
                  id="productName"
                  placeholder="Enter Product Name"
                  value={formData.productName}
                  onChange={handleChange}
                  className={`w-full mt-2 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#013D29] ${currentTheme === "dark" ? "text-white" : "text-black"
                    } ${currentTheme === "dark" ? "bg-[#404040]" : "white]"}`}
                  required
                >

                </input>
              </div>
             
                 <div className="w-full lg:w-[350px]">
                <label
                  htmlFor="quantity"
                  className="block text-sm font-medium"
                >
                   Quantity <span className="text-red-500">*</span>
                </label>
                <input
                type="number"
                  name="quantity"
                  placeholder="Enter Product Quantity"
                  min="0"
                  id="quantity"
                  value={formData.quantity}
                  onChange={handleChange}
                  className={`w-full mt-2 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#013D29] ${currentTheme === 'dark' ? 'text-white bg-[#404040]' : 'text-black bg-white'
                    }`}
                  required
                >
    
                </input>
              </div>
            </div>

            <div className="flex flex-col lg:flex-row justify-between mt-5">
            <div className="w-full lg:w-[350px]">
                <label
                  htmlFor="productPrice"
                  className="block text-sm font-medium"
                >
                Product Price <span className="text-red-500">*</span>
                </label>
                <input
                type="number"
                  name="productPrice"
                  id="productPrice"
                  placeholder="Enter Product Price"
                  min="0"
                  value={formData.productPrice}
                  onChange={handleChange}
                  className={`w-full mt-2 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#013D29] ${currentTheme === "dark" ? "text-white" : "text-black"
                    } ${currentTheme === "dark" ? "bg-[#404040]" : "white]"}`}
                  required
                >

                </input>
              </div> 

              <div className="w-full lg:w-[350px]">
                <label
                  htmlFor="customerTotalPrice"
                  className="block text-sm font-medium"
                >
                   Total Price <span className="text-red-500">*</span>
                </label>
                <input
                type="number"
                  name="customerTotalPrice"
                  id="customerTotalPrice"
                  placeholder="Customer Total Price"
                  min="0"
                  value={formData.customerTotalPrice}
                  onChange={handleChange}
                  className={`w-full mt-2 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#013D29] ${currentTheme === 'dark' ? 'text-white bg-[#404040]' : 'text-black bg-white'
                    }`}
                  required
                >
    
                </input>
              </div> 
            </div>

            <div className="flex flex-col lg:flex-row justify-between mt-5">
              <div className="w-full lg:w-[350px]">
                <label htmlFor="username" className="block text-sm font-medium">
                  User Name
                </label>
                <input
                  type="text"
                  name="username"
                  id="username"
                  value={formData.username}
                  onChange={handleChange}
                  className={`w-full mt-2 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#013D29] ${currentTheme === 'dark' ? 'text-white' : 'text-black'} ${currentTheme === 'dark' ? 'bg-[#404040]' : 'white]'}`}
                  placeholder="User name"
                />
              </div>

              <div className="w-full lg:w-[350px]">
                <label htmlFor="userAddress" className="block text-sm font-medium">
                  User Address
                </label>
                <input
                  type="text"
                  name="userAddress"
                  id="userAddress"
                  value={formData.userAddress}
                  onChange={handleChange}
                  className={`w-full mt-2 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#013D29] ${currentTheme === 'dark' ? 'text-white' : 'text-black'} ${currentTheme === 'dark' ? 'bg-[#404040]' : 'white]'}`}
                  placeholder="User Address"
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

export default CustomerRegistrationForm;
