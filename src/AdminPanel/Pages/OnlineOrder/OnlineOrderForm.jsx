import { useEffect, useState } from "react";
import Navbar from "../../Navbar/Navbar";
import LeftSideBar from "../../LeftSideBar/LeftSideBar";
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from "react-router-dom";
import { baseUri } from "../../Components/api/baseUri";
import { Order_Middle_Point } from "../../Components/api/middlePoints";
import fetchData from "../../Components/api/axios";
import { toast } from "react-toastify";
import { Order_Update_End_Point } from "../../Components/api/endPoint";

const OrderForm = () => {
  const currentTheme = useSelector((state => state.theme.theme));
  const [onlineOrderId ,setOnlineOrderId] = useState(null);
const navigate = useNavigate();
  const [formData, setFormData] = useState({
    orderStatus: "",
    shippingAddress: "",
    paymentMethod: "",
    products:"",
    totalAmount:"",

  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {

      const data = { ...formData };
      const URL = baseUri + Order_Middle_Point + Order_Update_End_Point + "/" + onlineOrderId ;
      console.log("Update API URL:", URL);

      const method = "PUT";
      const response =await fetchData(URL,method,data)
      console.log(response);
      if (response.status === 200 || response.status === 201) {
        toast.success(response.data?.message )
        navigate(-1);
      }
      else {
        console.log(response.data?.message)
        toast.error(response.data?.message )
      }
    }
    catch (error) {
      console.log(error)
    }

  };
  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   try {

  //     const isEdit = !!onlineOrderId;
  //     const data = { ...formData };
  //     const URL = baseUri + Order_Middle_Point + Order_End_Point + (isEdit ? "/" +onlineOrderId :"") 
  //     const method = isEdit ? "PUT" : "POST";
  //     const response =await fetchData(URL,method,data)
  //     if (response.status === 200 || response.status === 201) {
  //       toast.success(response.data?.message )
  //       navigate(-1);
  //     }
  //     else {
  //       console.log(response.data?.message)
  //       toast.error(response.data?.message )
  //     }
  //   }
  //   catch (error) {
  //     console.log(error)
  //   }

  // };

  const location = useLocation();

  useEffect(()=>{
if(location.state?.onlineOrder)
  console.log(location.state?.onlineOrder)
// console.log(location.state.onlineOrder.products.map(el => el.quantity))
  setFormData({
    orderStatus:location.state.onlineOrder.orderStatus,
    shippingAddress:location.state.onlineOrder.shippingAddress,
    paymentMethod:location.state.onlineOrder.paymentMethod,
    // products:location.state.onlineOrder.products.products.quantity,
    totalAmount:location.state.onlineOrder.totalAmount,
    barcode:location.state.onlineOrder.barcode,

  })
  console.log(location.state?.onlineOrder._id)
  if(location.state?.onlineOrder._id){
    setOnlineOrderId(location.state?.onlineOrder._id)
  }

  },[location.state])

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
                <label htmlFor="products" className="block text-sm font-medium">
                Product 
                </label>
                <input
                  type="text"
                  name="products"
                  id="products"
                  value={formData.products}
                  onChange={handleChange}
                  className={`w-full mt-2 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#013D29] ${currentTheme === 'dark' ? 'text-white' : 'text-black'} ${currentTheme === 'dark' ? 'bg-[#404040]' : 'white]'}`}
                  placeholder="Products"
                />
              </div>

              <div className="w-full lg:w-[350px]">
                <label htmlFor="totalAmount" className="block text-sm font-medium">
                  Total Amount <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="totalAmount"
                  id="totalAmount"
                  value={formData.totalAmount}
                  className={`w-full mt-2 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#013D29] ${currentTheme === 'dark' ? 'text-white' : 'text-black'} ${currentTheme === 'dark' ? 'bg-[#404040]' : 'white]'}`}
                  placeholder="Enter total amount"
                  disabled
                />
              </div>
            </div>

            <div className="flex flex-col lg:flex-row justify-between mt-5">
            <div className="w-full lg:w-[350px]">
                <label htmlFor="shippingAddress" className="block text-sm font-medium">
                  Shipping Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="shippingAddress"
                  id="shippingAddress"
                  value={formData.shippingAddress}
                  className={`w-full mt-2 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#013D29] ${currentTheme === 'dark' ? 'text-white' : 'text-black'} ${currentTheme === 'dark' ? 'bg-[#404040]' : 'white]'}`}
                  placeholder="Enter shipping address"
                  disabled
                />
              </div>
                <div className="w-full lg:w-[350px]">
                <label htmlFor="orderStatus" className="block text-sm font-medium">
                Order Status <span className="text-red-500">*</span>
                </label>
                <select
                  name="orderStatus"
                  id="orderStatus"
                  placeholder="Enter Order Status"

                  value={formData.orderStatus}
                  onChange={handleChange}
                  className={`w-full mt-2 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#013D29] ${currentTheme === 'dark' ? 'text-white' : 'text-black'} ${currentTheme === 'dark' ? 'bg-[#404040]' : 'bg-white'}`}
                  required
                >
                  <option value="">Select category</option>
                  <option value="pending">Pending</option>
                  <option value="dispatch">Dispatch</option>
                  <option value="delivered">Delivered</option>
                </select>
              </div>

            </div>

            <div className="flex flex-col lg:flex-row justify-between mt-5">

              <div className="w-full lg:w-[350px]">
                <label htmlFor="barcode" className="block text-sm font-medium">
                Barcode 
                </label>
                <input
                  type="text"
                  name="barcode"
                  id="barcode"
                  value={formData.barcode}
                  className={`w-full mt-2 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#013D29] ${currentTheme === 'dark' ? 'text-white' : 'text-black'} ${currentTheme === 'dark' ? 'bg-[#404040]' : 'white]'}`}
                  placeholder="Barcode"
                  disabled
                />
              </div>

              <div className="w-full lg:w-[350px]">
                <label htmlFor="paymentMethod" className="block text-sm font-medium">
                Payment Method 
                </label>
                <input
                type="text"
                  name="paymentMethod"
                  id="paymentMethod"
                  placeholder="Enter Payment Method"
                  value={formData.paymentMethod}
                 className={`w-full mt-2 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#013D29] ${currentTheme === 'dark' ? 'text-white' : 'text-black'} ${currentTheme === 'dark' ? 'bg-[#404040]' : 'bg-white'}`}
                  disabled
                
              
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

export default OrderForm;
