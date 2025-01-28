import { useState } from "react";
import Navbar from "../../Navbar/Navbar";
import LeftSideBar from "../../LeftSideBar/LeftSideBar";
import { useSelector } from 'react-redux';

const StockRegistrationForm = () => {
  const currentTheme = useSelector((state => state.theme.theme))

  const [formData, setFormData] = useState({
    stockName: "",
    productName: "",
    availableQuantity: "",
    warehouse: "",
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
      stockName: "",
      productName: "",
      availableQuantity: "",
      warehouse: "",
    });
  };

  return (
    <>
      <Navbar />
      <div className="flex flex-col lg:flex-row">
        <LeftSideBar />
        <div className={`flex flex-col  items-center lg:ml-10 w-full lg:w-[1000px] h-screen  ${currentTheme === 'dark' ? 'text-white' : 'text-gray-600'} `}>
          <form
            onSubmit={handleSubmit}
            className={`${currentTheme === 'dark' ? 'bg-[#404040]' : 'bg-white'}  mt-5 shadow-lg rounded-lg p-6 w-full lg:w-[800px]  border border-gray-300`}
          >
            <h2 className={`text-2xl font-bold mb-6 text-center ${currentTheme === 'dark' ? 'text-white' : 'text-gray-700'} `}>
              Stock Registration
            </h2>

            <div className="flex flex-col lg:flex-row justify-between">
              <div className="w-full lg:w-[350px]">
                <label
                  htmlFor="stockName"
                  className="block text-sm font-medium "
                >
                  Stock Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="stockName"
                  id="stockName"
                  value={formData.stockName}
                  onChange={handleChange}
                  className={`w-full mt-2 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#013D29] ${currentTheme === 'dark' ? 'text-white' : 'text-black'} ${currentTheme === 'dark' ? 'bg-[#404040]' : 'white]'}`}
                  placeholder="Enter stock name"
                  required
                />
              </div>
              <div className="w-full lg:w-[350px]">
  <label
    htmlFor="productName"
    className="block text-sm font-medium"
  >
    Product Name <span className="text-red-500">*</span>
  </label>
  <select
    name="productName"
    id="productName"
    value={formData.productName}
    onChange={handleChange}
    className={`w-full mt-2 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#013D29] ${
      currentTheme === "dark" ? "text-white" : "text-black"
    } ${currentTheme === "dark" ? "bg-[#404040]" : "white]"}`}
    required
  >
    <option value="" disabled>
      Select a product
    </option>
    <option value="Product 1">Product 1</option>
    <option value="Product 2">Product 2</option>
    <option value="Product 3">Product 3</option>
    <option value="Product 4">Product 4</option>
  </select>
</div>

            </div>

            <div className="flex flex-col lg:flex-row justify-between mt-5">
              <div className="w-full lg:w-[350px]">
                <label
                  htmlFor="availableQuantity"
                  className="block text-sm font-medium"
                >
                  Available Quantity <span className="text-red-500">*</span>
                </label>
                <select
                  name="availableQuantity"
                  id="availableQuantity"
                  value={formData.availableQuantity}
                  onChange={handleChange}
                  className={`w-full mt-2 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#013D29] ${currentTheme === 'dark' ? 'text-white bg-[#404040]' : 'text-black bg-white'
                    }`}
                  required
                >
                  <option value="" disabled>Select available quantity</option>

                  <option value="10">10</option>
                  <option value="20">20</option>
                  <option value="50">50</option>
                  <option value="100">100</option>
                </select>
              </div>

              <div className="w-full lg:w-[350px]">
                <label
                  htmlFor="warehouse"
                  className="block text-sm font-medium "
                >
                  Warehouse <span className="text-red-500">*</span>
                </label>
                <select
                  name="warehouse"
                  id="warehouse"
                  value={formData.warehouse}
                  onChange={handleChange}
                  className={`w-full mt-2 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#013D29] ${currentTheme === 'dark' ? 'text-white' : 'text-black'} ${currentTheme === 'dark' ? 'bg-[#404040]' : 'white]'}`}
                  required
                >
                  <option value="">Select warehouse</option>
                  <option value="Warehouse A">Warehouse A</option>
                  <option value="Warehouse B">Warehouse B</option>
                </select>
              </div>
            </div>

            <div className="flex justify-end mt-6">
              <button
                type="submit"
                className={`px-4 py-2 rounded  ${currentTheme === 'dark' ? 'text-white' : 'text-black'}  ${currentTheme === 'dark' ? 'bg-[#404040]' : 'bg-[#F0FFF8]'} border border-gray-300`}
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
