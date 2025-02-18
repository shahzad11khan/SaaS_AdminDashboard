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
    category: "",
    subcategory: "",
    price: "",
    totalPrice: "",
    productAddedDate: "",
    warehouseName:"",
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
      category: "",
      subcategory: "",
      price: "",
      totalPrice: "",
      productAddedDate: "",
      warehouseName:"",
      status: "active"
    });
  };

  useEffect(() => {
    if (location?.state?.stock) {  
      setFormData({
        productName: location.state.stock.productName,
        quantity: location.state.stock.quantity,
        category: location.state.stock.category,
        subcategory: location.state.stock.subcategory,
        price: location.state.stock.price,
        totalPrice: location.state.stock.totalPrice,
        productAddedDate: location.state.stock.dateAdded
          ? new Date(location.state.stock.dateAdded).toISOString().split('T')[0]
          : "",
        warehouseName: location.state.stock.warehouseNameName,
        status: location.state.stock.isActive ? "active" : "inactive",
      });
    }
  }, [location.state]);
  

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
                  htmlFor="price"
                  className="block text-sm font-medium"
                >
                  Price <span className="text-red-500">*</span>
                </label>
                <input
                type="number"
                  name="price"
                  id="price"
                  placeholder="Enter Product Price"
                  min="0"
                  value={formData.price}
                  onChange={handleChange}
                  className={`w-full mt-2 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#013D29] ${currentTheme === "dark" ? "text-white" : "text-black"
                    } ${currentTheme === "dark" ? "bg-[#404040]" : "white]"}`}
                  required
                >

                </input>
              </div>
              <div className="w-full lg:w-[350px]">
                <label
                  htmlFor="totalPrice"
                  className="block text-sm font-medium"
                >
                   Product Total Price <span className="text-red-500">*</span>
                </label>
                <input
                type="number"
                  name="totalPrice"
                  id="totalPrice"
                  placeholder="Enter Product Total Price"
                  min="0"
                  value={formData.totalPrice}
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
                <label htmlFor="category" className="block text-sm font-medium">
                  Category <span className="text-red-500">*</span>
                </label>
                <select
                  name="category"
                  id="category"
                  placeholder="Enter product Category"

                  value={formData.category}
                  onChange={handleChange}
                  className={`w-full mt-2 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#013D29] ${currentTheme === 'dark' ? 'text-white' : 'text-black'} ${currentTheme === 'dark' ? 'bg-[#404040]' : 'bg-white'}`}
                  required
                >
                  <option value="">Select category</option>
                  <option value="Electronics">Electronics</option>
                  <option value="Clothing">Clothing</option>
                  <option value="Accessories">Accessories</option>
                </select>
              </div>
            
               <div className="w-full lg:w-[350px]">
                <label htmlFor="subcategory" className="block text-sm font-medium">
                Sub Category <span className="text-red-500">*</span>
                </label>
                <select
                  name="subcategory"
                  id="subcategory"
                  value={formData.subcategory}
                  placeholder="Enter product Sub Category"
                  onChange={handleChange}
                  className={`w-full mt-2 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#013D29] ${currentTheme === 'dark' ? 'text-white' : 'text-black'} ${currentTheme === 'dark' ? 'bg-[#404040]' : 'bg-white'}`}
                  required
                >
                  <option value="">Select Sub Category</option>
                  <option value="Electronics">Electronics</option>
                  <option value="Mobile Phones">Mobile Phones</option>
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
                <label htmlFor="warehouseName" className="block text-sm font-medium">
                warehouseName<span className="text-red-500">*</span>
                </label>
                <select
                  name="warehouseName"
                  id="warehouseName"
                  placeholder="Enter warehouseName"
                  value={formData.warehouseName}
                  onChange={handleChange}
                  className={`w-full mt-2 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#013D29] ${currentTheme === 'dark' ? 'text-white' : 'text-black'} ${currentTheme === 'dark' ? 'bg-[#404040]' : 'bg-white'}`}
                  required
                >
                  <option value="">Select warehouseName</option>
                  <option value="warehouseName A">warehouseName A</option>
                  <option value="warehouseName B">warehouseName B</option>
                  <option value="warehouseName C">warehouseName C</option>
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
