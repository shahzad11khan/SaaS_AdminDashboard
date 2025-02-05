import { useEffect, useState } from "react";
import Navbar from "../../Navbar/Navbar";
import LeftSideBar from "../../LeftSideBar/LeftSideBar";
import { useSelector } from 'react-redux';
import { useLocation } from "react-router-dom";

const StockRegistrationForm = () => {
  const currentTheme = useSelector((state => state.theme.theme))
 const location= useLocation();
  const [formData, setFormData] = useState({
  
    productName: "",
    quantity: "",
    productCategory: "",
    productSubCategory: "",
    productPrice: "",
    productTotalPrice: "",
    productAddedDate: "",
    warehouse:"",
    status: "active"
  });

  const handleChange = (e) => {
    const { name, value ,type, checked } = e.target;
    setFormData(
      {
      ...formData,
      [name]: type === "radio" ? (checked ? value : formData[name]) : value,
    
    });  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Stock Submitted:", formData);
    alert("Stock registered successfully!");
    setFormData({
      productName: "",
      quantity: "",
      productCategory: "",
      productSubCategory: "",
      productPrice: "",
      productTotalPrice: "",
      productAddedDate: "",
      warehouse:"",
      status: "active"
    });
  };

  useEffect(()=>{
if(location?.state?.stock){
  console.log(location?.state?.stock)
  setFormData({
    productName: location.state.stock.productName,
    quantity:location.state.stock.quantity,
    productCategory:location.state.stock.category,
    productSubCategory:location.state.stock.subcategory,
    productPrice:location.state.stock.price,
    productTotalPrice:location.state.stock.totalPrice,
    productAddedDate:location.state.stock.dateAdded,
    warehouse:location.state.stock.warehouseName,
    status:location.state.stock.isActive,

  });
}
  },[location.state])

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
              {location?.state?.state==="edit"? "Update" : "Add"} Stock
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

            <div className="flex flex-col lg:flex-row justify-between mt-2">
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
                  htmlFor="productTotalPrice"
                  className="block text-sm font-medium"
                >
                   Product Total Price <span className="text-red-500">*</span>
                </label>
                <input
                type="number"
                  name="productTotalPrice"
                  id="productTotalPrice"
                  placeholder="Enter Product Total Price"
                  min="0"
                  value={formData.productTotalPrice}
                  onChange={handleChange}
                  className={`w-full mt-2 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#013D29] ${currentTheme === 'dark' ? 'text-white bg-[#404040]' : 'text-black bg-white'
                    }`}
                  required
                >
    
                </input>
              </div>

            </div>


            <div className="flex flex-col lg:flex-row justify-between mt-2">
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
                  value={formData.productSubCategory}
                  placeholder="Enter product Sub Category"
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
                <label
                  htmlFor="productAddedDate"
                  className="block text-sm font-medium"
                >
                  Added Date <span className="text-red-500">*</span>
                </label>
                <input
                type="date"
                  name="productAddedDate"
                  id="productAddedDate"
                  value={formData.productAddedDate}
                  onChange={handleChange}
                  className={`w-full mt-2 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#013D29] ${currentTheme === "dark" ? "text-white" : "text-black"
                    } ${currentTheme === "dark" ? "bg-[#404040]" : "white]"}`}
                  required
                >

                </input>
              </div>
         
                      <div className="w-full lg:w-[350px]">
                <label htmlFor="warehouse" className="block text-sm font-medium">
                Warehouse<span className="text-red-500">*</span>
                </label>
                <select
                  name="warehouse"
                  id="warehouse"
                  placeholder="Enter Warehouse"
                  value={formData.warehouse}
                  onChange={handleChange}
                  className={`w-full mt-2 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#013D29] ${currentTheme === 'dark' ? 'text-white' : 'text-black'} ${currentTheme === 'dark' ? 'bg-[#404040]' : 'bg-white'}`}
                  required
                >
                  <option value="">Select Warehouse</option>
                  <option value="electronics">Warehouse A</option>
                  <option value="clothing">Warehouse B</option>
                  <option value="accessories">Warehouse C</option>
                </select>
              </div>

            </div>

            <div className="flex flex-col lg:flex-row justify-between mt-3">
            <div className="w-full lg:w-[350px] flex items-center mt-6 lg:mt-5">
                      <label className="flex items-center mr-4">
                        <input
                          type="radio"
                          name="status"
                          value="active"
                          checked={formData.status === "active"}
                          onChange={handleChange}
                          className="w-4 h-4 text-blue-500 border-gray-300 rounded focus:ring-blue-500"
                        />
                        <span className="ml-2 text-sm font-medium ">
                          Active
                        </span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="status"
                          value="inactive"
                          checked={formData.status === "inactive"}
                          onChange={handleChange}
                          className="w-4 h-4 text-blue-500 border-gray-300 rounded focus:ring-blue-500"
                        />
                        <span className="ml-2 text-sm font-medium ">
                          InActive
                        </span>
                      </label>
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
