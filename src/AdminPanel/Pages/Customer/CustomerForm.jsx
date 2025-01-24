import { useState } from "react";
import Navbar from "../../Navbar/Navbar";
import LeftSideBar from "../../LeftSideBar/LeftSideBar";
import { useSelector } from 'react-redux';


const CustomerRegistrationForm = () => {
      const currentTheme = useSelector((state=>state.theme.theme))

  const [formData, setFormData] = useState({
    fullName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    contactNumber: "",
    address: "",
    preferredPaymentMethod: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Custom validation for passwords
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    console.log("Customer Registered:", formData);
    alert("Customer registered successfully!");
    setFormData({
      fullName: "",
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      contactNumber: "",
      address: "",
      preferredPaymentMethod: "",
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
              Customer Registration
            </h2>

            {/* Full Name & Username */}
            <div className="flex flex-col lg:flex-row justify-between">
            <div className="w-full lg:w-[350px]">
                <label
                  htmlFor="username"
                  className="block text-sm font-medium "
                >
                  Username <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="username"
                  id="username"
                  value={formData.username}
                  onChange={handleChange}
                  className={`w-full mt-2 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#013D29] ${currentTheme=== 'dark' ?'text-white':'text-black'} ${currentTheme=== 'dark' ?'bg-[#404040]':'white]'}`}
                  placeholder="Enter your username"
                  required
                />
              </div>
              <div className="w-full lg:w-[350px]">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium "
                >
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full mt-2 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#013D29] ${currentTheme=== 'dark' ?'text-white':'text-black'} ${currentTheme=== 'dark' ?'bg-[#404040]':'white]'}`}
                  placeholder="Enter your email"
                  required
                />
              </div>
            </div>

            {/* Email & Password */}
            <div className="flex flex-col lg:flex-row justify-between mt-2">
            <div className="w-full lg:w-[350px] ">
              <label
                  htmlFor="contactNumber"
                  className="block text-sm font-medium "
                >
                  Contact Number 
                </label>
                <input
                  type="tel"
                  name="contactNumber"
                  id="contactNumber"
                  value={formData.contactNumber}
                  onChange={handleChange}
                  className={`w-full mt-2 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#013D29] ${currentTheme=== 'dark' ?'text-white':'text-black'} ${currentTheme=== 'dark' ?'bg-[#404040]':'white]'}`}
                  placeholder="Enter your contact number"
                
                />
                
               
              
              </div>
              <div className="w-full lg:w-[350px] ">
                <label
                  htmlFor="address"
                  className="block text-sm font-medium "
                >
                  Address 
                </label>
                <input
                  name="address"
                  id="address"
                  value={formData.address}
                  onChange={handleChange}
                  className={`w-full mt-2 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#013D29] ${currentTheme=== 'dark' ?'text-white':'text-black'} ${currentTheme=== 'dark' ?'bg-[#404040]':'white]'}`}
                  placeholder="Enter your address"
                  required
                />
              </div>
            </div>

            {/* Confirm Password & Contact Number */}
            <div className="flex flex-col lg:flex-row justify-between mt-2">
              <div className="w-full lg:w-[350px] ">
              <label
                  htmlFor="password"
                  className="block text-sm font-medium "
                >
                  Password <span className="text-red-500">*</span>
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`w-full mt-2 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#013D29] ${currentTheme=== 'dark' ?'text-white':'text-black'} ${currentTheme=== 'dark' ?'bg-[#404040]':'white]'}`}
                  placeholder="Enter your password"
                  required
                  />
              </div>
              <div className="w-full lg:w-[350px] ">
            
                   <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium "
                >
                  Confirm Password <span className="text-red-500">*</span>
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  id="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className={`w-full mt-2 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#013D29] ${currentTheme=== 'dark' ?'text-white':'text-black'} ${currentTheme=== 'dark' ?'bg-[#404040]':'white]'}`}
                  placeholder="Re-enter your password"
                  required
                />
              </div>
            </div>

            {/* Address & Preferred Payment Method */}
            <div className="flex flex-col lg:flex-row justify-between ">
            
              <button type="button" className="w-full lg:w-[350px] flex justify-center items-center rounded mt-7 h-[40px] border">
     Show
   </button>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end mt-6">
              <button
                type="submit"
                className={`px-4 py-2 rounded  ${currentTheme=== 'dark' ?'text-white':'text-black'}  ${currentTheme=== 'dark' ?'bg-[#404040]':'bg-[#F0FFF8]'} border border-gray-300`}
              >
                Register Customer
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default CustomerRegistrationForm;
