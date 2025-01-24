import { useState } from "react";
import Navbar from "../../Navbar/Navbar";
import LeftSideBar from "../../LeftSideBar/LeftSideBar";
import { useSelector } from 'react-redux';


const StockRegistrationForm = () => {
  const currentTheme = useSelector((state=>state.theme.theme))

  const [formData, setFormData] = useState({
    productName: "",
    companyName: "",
    category: "",
    stockQuantity: "",
    warehouseLocation: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Stock Submitted:", formData);
    alert("Stock registered successfully!");
    setFormData({
      productName: "",
      companyName: "",
      category: "",
      stockQuantity: "",
      warehouseLocation: "",
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
              Stock Registration
            </h2>

            <div className="flex flex-col lg:flex-row justify-between">
              <div className="w-full lg:w-[350px]">
                <label
                  htmlFor="productName"
                  className="block text-sm font-medium "
                >
                  Product Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="productName"
                  id="productName"
                  value={formData.productName}
                  onChange={handleChange}
                  className={`w-full mt-2 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#013D29] ${currentTheme=== 'dark' ?'text-white':'text-black'} ${currentTheme=== 'dark' ?'bg-[#404040]':'white]'}`}
                  placeholder="Enter product name"
                  required
                />
              </div>
              <div className="w-full lg:w-[350px]">
                <label
                  htmlFor="companyName"
                  className="block text-sm font-medium "
                >
                  Company Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="companyName"
                  id="companyName"
                  value={formData.companyName}
                  onChange={handleChange}
                  className={`w-full mt-2 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#013D29] ${currentTheme=== 'dark' ?'text-white':'text-black'} ${currentTheme=== 'dark' ?'bg-[#404040]':'white]'}`}
                  placeholder="Enter company name"
                  required
                />
              </div>
            </div>

            <div className="flex flex-col lg:flex-row justify-between mt-5">
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
              <div className="w-full lg:w-[350px]">
                <label
                  htmlFor="stockQuantity"
                  className="block text-sm font-medium "
                >
                  Stock Quantity <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  name="stockQuantity"
                  id="stockQuantity"
                  value={formData.stockQuantity}
                  onChange={handleChange}
                  className={`w-full mt-2 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#013D29] ${currentTheme=== 'dark' ?'text-white':'text-black'} ${currentTheme=== 'dark' ?'bg-[#404040]':'white]'}`}
                  placeholder="Enter stock quantity"
                  required
                />
              </div>
            </div>

            <div className="flex flex-col justify-between mt-5">
            <div className="w-full lg:w-[350px]">
                <label
                  htmlFor="warehouseLocation"
                  className="block text-sm font-medium "
                >
                  Warehouse Location <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="warehouseLocation"
                  id="warehouseLocation"
                  value={formData.warehouseLocation}
                  onChange={handleChange}
                  className={`w-full mt-2 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#013D29] ${currentTheme=== 'dark' ?'text-white':'text-black'} ${currentTheme=== 'dark' ?'bg-[#404040]':'white]'}`}
                  placeholder="Enter warehouse location"
                  required
                />
              </div>
            </div>

            <div className="flex justify-end mt-6">
              <button
                type="submit"
                className={`px-4 py-2 rounded  ${currentTheme=== 'dark' ?'text-white':'text-black'}  ${currentTheme=== 'dark' ?'bg-[#404040]':'bg-[#F0FFF8]'} border border-gray-300`}
              >
                Register Stock
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default StockRegistrationForm;
