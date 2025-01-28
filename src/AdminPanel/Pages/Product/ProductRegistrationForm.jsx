import { useState } from "react";
import Navbar from "../../Navbar/Navbar";
import LeftSideBar from "../../LeftSideBar/LeftSideBar";
import { useSelector } from 'react-redux';

const ProductRegistrationForm = () => {
  const [formData, setFormData] = useState({
    productName: "",
    productDescription: "",
    productPrice: "",
    productQuantity: "",
    productCategory: "",
    productImage: "",
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
      productDescription: "",
      productPrice: "",
      productQuantity: "",
      productCategory: "",
      productImage: "",
    });
  };

  const currentTheme = useSelector((state) => state.theme.theme);

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
              Product Registration
            </h2>

            <div className="flex flex-col lg:flex-row justify-between mt-5">
              <div className="w-full lg:w-[350px]">
                <label
                  htmlFor="productName"
                  className="block text-sm font-medium"
                >
                  Product Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="productName"
                  id="productName"
                  value={formData.productName}
                  onChange={handleChange}
                  className={`w-full mt-2 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#013D29] ${currentTheme === 'dark' ? 'text-white' : 'text-black'} ${currentTheme === 'dark' ? 'bg-[#404040]' : 'bg-white'}`}
                  placeholder="Enter product name"
                  required
                />
              </div>
              <div className="w-full lg:w-[350px]">
                <label
                  htmlFor="productDescription"
                  className="block text-sm font-medium"
                >
                  Description 
                </label>
                <input
                  name="productDescription"
                  id="productDescription"
                  value={formData.productDescription}
                  onChange={handleChange}
                  className={`w-full mt-2 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#013D29] ${currentTheme === 'dark' ? 'text-white' : 'text-black'} ${currentTheme === 'dark' ? 'bg-[#404040]' : 'bg-white'}`}
                  placeholder="Enter product description"
                  
                />
              </div>
            </div>

            <div className="flex flex-col lg:flex-row justify-between mt-5">
              <div className="w-full lg:w-[350px]">
                <label
                  htmlFor="productPrice"
                  className="block text-sm font-medium"
                >
                  Price <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  name="productPrice"
                  id="productPrice"
                  value={formData.productPrice}
                  onChange={handleChange}
                  className={`w-full mt-2 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#013D29] ${currentTheme === 'dark' ? 'text-white' : 'text-black'} ${currentTheme === 'dark' ? 'bg-[#404040]' : 'bg-white'}`}
                  placeholder="Enter product price"
                  step="0.01"
                  required
                />
              </div>
              <div className="w-full lg:w-[350px]">
                <label
                  htmlFor="productQuantity"
                  className="block text-sm font-medium"
                >
                  Quantity <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  name="productQuantity"
                  id="productQuantity"
                  value={formData.productQuantity}
                  onChange={handleChange}
                  className={`w-full mt-2 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#013D29] ${currentTheme === 'dark' ? 'text-white' : 'text-black'} ${currentTheme === 'dark' ? 'bg-[#404040]' : 'bg-white'}`}
                  placeholder="Enter product quantity"
                  required
                />
              </div>
            </div>

            <div className="flex flex-col lg:flex-row justify-between mt-5">
              <div className="w-full lg:w-[350px]">
                <label
                  htmlFor="productCategory"
                  className="block text-sm font-medium"
                >
                  Category <span className="text-red-500">*</span>
                </label>
                <select
                  name="productCategory"
                  id="productCategory"
                  value={formData.productCategory}
                  onChange={handleChange}
                  className={`w-full mt-2 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#013D29] ${currentTheme === 'dark' ? 'text-white' : 'text-black'} ${currentTheme === 'dark' ? 'bg-[#404040]' : 'bg-white'}`}
                  required
                >
                  <option value="">Select category</option>
                  <option value="electronics">Electronics</option>
                  <option value="clothing">Clothing</option>
                  <option value="accessories">Accessories</option>
                </select>
              </div>
              <div className="w-full lg:w-[350px]">
                <label
                  htmlFor="productImage"
                  className="block text-sm font-medium"
                >
                  Image <span className="text-red-500">*</span>
                </label>
                <input
                  type="file"
                  name="productImage"
                  id="productImage"
                  onChange={(e) => setFormData({ ...formData, productImage: e.target.files[0] })}
                  className={`w-full mt-2 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#013D29] ${currentTheme === 'dark' ? 'text-white' : 'text-black'} ${currentTheme === 'dark' ? 'bg-[#404040]' : 'bg-white'}`}
                  required
                />
              </div>
            </div>

            <div className="flex justify-end mt-6">
              <button
                type="submit"
                className={`px-4 py-2 rounded ${currentTheme === 'dark' ? 'text-white' : 'text-black'} ${currentTheme === 'dark' ? 'bg-[#404040]' : 'bg-[#F0FFF8]'} border border-gray-300`}
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
