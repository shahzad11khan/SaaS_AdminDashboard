import { useEffect, useState } from "react";
import Navbar from "../../Navbar/Navbar";
import LeftSideBar from "../../LeftSideBar/LeftSideBar";
import { useSelector } from 'react-redux';
import { useLocation } from "react-router-dom";

const ProductRegistrationForm = () => {

  const location = useLocation();

  const [formData, setFormData] = useState({
    productName: "",
    productDescription: "",
    productPrice: "",
    productQuantity: "",
    productCategory: "",
    productSubCategory: "",
    productImage: "",
    productTag: "", 
    productRating:""
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
      productSubCategory: "",
      productImage: "",
      productTag: "",
    });

  };
  useEffect(()=>{
    console.log(location?.state?.product)
    if(location?.state?.product){
      setFormData({
        productName:location.state.product.productName,
        productDescription:location.state.product.productDescription,
        productPrice:location.state.product.productPrice,
        productQuantity:location.state.product.productQuantity,
        productCategory:location.state.product.productCategory,
        productSubCategory:location.state.product.productSubCategory,
        productImage:location.state.product.productImage,
        productTag:location.state.product.productTag,

      })
    }

  },[location.state])

  const currentTheme = useSelector((state) => state.theme.theme);

  return (
    <>
      <Navbar />
      <div className="flex flex-col lg:flex-row">
        <LeftSideBar />
        <div className={`flex flex-col items-center lg:ml-10 w-full lg:w-[1000px] h-screen ${currentTheme === 'dark' ? 'text-white' : 'text-gray-600'}`}>
          <form
            onSubmit={handleSubmit}
            className={`${currentTheme === 'dark' ? 'bg-[#404040]' : 'bg-white'} mt-4 shadow-lg rounded-lg p-6 w-full lg:w-[800px] border border-gray-300`}
          >
            <h2 className={`text-2xl font-bold mb-6 text-center ${currentTheme === 'dark' ? 'text-white' : 'text-gray-700'}`}>
               {location?.state?.state ==="edit" ? "Update" : "Add"} Product
            </h2>

            <div className="flex flex-col lg:flex-row justify-between mt-3">
              <div className="w-full lg:w-[350px]">
                <label htmlFor="productName" className="block text-sm font-medium">
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
                <label htmlFor="productDescription" className="block text-sm font-medium">
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

            <div className="flex flex-col lg:flex-row justify-between mt-3">
              <div className="w-full lg:w-[350px]">
                <label htmlFor="productPrice" className="block text-sm font-medium">
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
                  step="1"
                  required
                />
              </div>
              <div className="w-full lg:w-[350px]">
                <label htmlFor="productQuantity" className="block text-sm font-medium">
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

            <div className="flex flex-col lg:flex-row justify-between mt-3">
              <div className="w-full lg:w-[350px]">
                <label htmlFor="productCategory" className="block text-sm font-medium">
                  Category <span className="text-red-500">*</span>
                </label>
                <select
                  name="productCategory"
                  id="productCategory"
                  placeholder="Enter product Category"
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
                <label htmlFor="productSubCategory" className="block text-sm font-medium">
                Sub Category <span className="text-red-500">*</span>
                </label>
                <select
                  name="productSubCategory"
                  id="productSubCategory"
                  placeholder="Enter product Sub Category"
                  value={formData.productSubCategory}
                  onChange={handleChange}
                  className={`w-full mt-2 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#013D29] ${currentTheme === 'dark' ? 'text-white' : 'text-black'} ${currentTheme === 'dark' ? 'bg-[#404040]' : 'bg-white'}`}
                  required
                >
                  <option value="">Select Sub Category</option>
                  <option value="electronics">Electronics</option>
                  <option value="clothing">Clothing</option>
                  <option value="accessories">Accessories</option>
                </select>
              </div>
            </div>

            <div className="flex flex-col lg:flex-row justify-between mt-3">
              <div className="w-full lg:w-[350px]">
                <label htmlFor="productTag" className="block text-sm font-medium">
                  Product Tag 
                </label>
                <input
                  type="string"
                  name="productTag"
                  id="productTag"
                  value={formData.productTag}
                  onChange={handleChange}
                  className={`w-full mt-2 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#013D29] ${currentTheme === 'dark' ? 'text-white' : 'text-black'} ${currentTheme === 'dark' ? 'bg-[#404040]' : 'bg-white'}`}
                  placeholder="Enter product tag"
                  
                />
              </div>
              <div className="w-full lg:w-[350px]">
                <label htmlFor="productRating" className="block text-sm font-medium">
                  Rating <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  name="productRating"
                  id="productRating"
                  value={formData.productRating}
                  onChange={handleChange}
                  className={`w-full mt-2 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#013D29] ${currentTheme === 'dark' ? 'text-white' : 'text-black'} ${currentTheme === 'dark' ? 'bg-[#404040]' : 'bg-white'}`}
                  placeholder="Enter product rating"
                  required
                />
              </div>
            </div>

            <div className="flex flex-col lg:flex-row justify-between mt-3">
              <div className="w-full lg:w-[350px]">
                <label htmlFor="productImage" className="block text-sm font-medium">
                  Image <span className="text-red-500">*</span>
                </label>
                <div className="mt-2">
                  <label
                    htmlFor="productImage"
                    className={`cursor-pointer inline-block px-4 py-2 rounded-md border ${currentTheme === 'dark' ? 'bg-[#404040] text-white' : 'bg-[#F0FFF8] text-black'} focus:outline-none`}
                  >
                    Choose Image
                  </label>
                  <input
                    type="file"
                    name="productImage"
                    id="productImage"
                    onChange={(e) => setFormData({ ...formData, productImage: e.target.files[0] })}
                    className="hidden"
                    required
                  />
                </div>
              </div>
            </div>


            <div className="flex justify-end mt-1">
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
