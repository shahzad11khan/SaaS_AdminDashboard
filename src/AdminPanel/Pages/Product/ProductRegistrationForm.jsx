import { useState } from "react";
import Navbar from "../../Navbar/Navbar";
import LeftSideBar from "../../LeftSideBar/LeftSideBar";

const ProductRegistrationForm = () => {
  const [formData, setFormData] = useState({
    productName: "",
    category: "",
    stockQuantity: "",
    quality: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Product Submitted:", formData);
    alert("Product registered successfully!");
    setFormData({
      productName: "",
      category: "",
      stockQuantity: "",
      quality: "",
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
              Product Registration
            </h2>

            <div className="flex flex-col lg:flex-row justify-between mt-5">
              <div className="w-full lg:w-[350px]">
                <label
                  htmlFor="productName"
                  className="block text-sm font-medium text-gray-600"
                >
                  Product Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="productName"
                  id="productName"
                  value={formData.productName}
                  onChange={handleChange}
                  className="w-full mt-2 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter product name"
                  required
                />
              </div>
              <div className="w-full lg:w-[350px]">
                <label
                  htmlFor="category"
                  className="block text-sm font-medium text-gray-600"
                >
                  Category <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="category"
                  id="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full mt-2 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter category"
                  required
                />
              </div>
            </div>

            <div className="flex flex-col lg:flex-row justify-between mt-5">
              <div className="w-full lg:w-[350px]">
                <label
                  htmlFor="stockQuantity"
                  className="block text-sm font-medium text-gray-600"
                >
                  Stock Quantity <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  name="stockQuantity"
                  id="stockQuantity"
                  value={formData.stockQuantity}
                  onChange={handleChange}
                  className="w-full mt-2 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter stock quantity"
                  required
                />
              </div>
              <div className="w-full lg:w-[350px]">
                <label
                  htmlFor="quality"
                  className="block text-sm font-medium text-gray-600"
                >
                  Quality <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="quality"
                  id="quality"
                  value={formData.quality}
                  onChange={handleChange}
                  className="w-full mt-2 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter quality"
                  required
                />
              </div>
            </div>

            <div className="flex justify-end mt-6">
              <button
                type="submit"
                className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-200"
              >
                Register Product
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default ProductRegistrationForm;
