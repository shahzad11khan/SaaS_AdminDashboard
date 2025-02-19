import { useEffect, useState } from "react";
import Navbar from "../../Navbar/Navbar";
import LeftSideBar from "../../LeftSideBar/LeftSideBar";
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from "react-router-dom";
import { baseUri } from "../../Components/api/baseUri";
import { Category_Middle_Point } from "../../Components/api/middlePoints";
import { Category_End_Point } from "../../Components/api/endPoint";
import fetchData from "../../Components/api/axios";
import { toast } from "react-toastify/unstyled";

const CategoryRegistrationForm = () => {
  let navigate = useNavigate()
  let {token} = useSelector(state => state.authenticate);
      useEffect(()=>{
        if(!token) {
          toast.error("Login first")
          setTimeout(navigate('/'),1000) 
        }
      } , [token , navigate])
      
  const currentTheme = useSelector((state => state.theme.theme))
  const location = useLocation();
  const [categoryId, setCategoryId] = useState(null)
  const [formData, setFormData] = useState({
    mainCategory: "",
    subCategory: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {

      const isEdit = !!categoryId;
      const data = { ...formData };
      const URL = baseUri + Category_Middle_Point + Category_End_Point + (isEdit ? "/" +categoryId :"") 
      const method = isEdit ? "PUT" : "POST";
      const response =await fetchData(URL,method,data)
      if (response.status === 200 || response.status === 201) {
        toast.success(response.data?.message || "Categoty ")
        navigate(-1);
      }
      else {
        console.log(response.data?.message)
        toast.error(response.data?.message || "Failed to Register Stock")
      }
    }
    catch (error) {
      console.log(error)
    }

  };

  useEffect(() => {
    if (location?.state?.category) {
      console.log(location?.state?.category)
      setFormData({
        mainCategory: location.state.category.mainCategory,
        subCategory: location.state.category.subCategory,
      })
    }
    if (location.state?.category._id) {
      console.log("Categoty id", location.state?.category._id);
      setCategoryId(location.state.category._id)
    }
  }, [location.state])

  if(!token) return null;
  return (
    <>
      <Navbar />
      <div className="flex flex-col lg:flex-row">
        <LeftSideBar />
        <div className={`flex flex-col items-center lg:ml-10 w-full lg:w-[1000px] h-screen ${currentTheme === 'dark' ? 'text-white' : 'text-gray-600'} `}>
          <form
            onSubmit={handleSubmit}
            className={`${currentTheme === 'dark' ? 'bg-[#404040]' : 'bg-white'} mt-5 shadow-lg rounded-lg p-6 w-full lg:w-[800px] border border-gray-300`}
          >
            <h2 className={`text-2xl font-bold mb-6 text-center ${currentTheme === 'dark' ? 'text-white' : 'text-gray-700'} `}>
              Category Registration
            </h2>

            <div className="flex flex-col lg:flex-row justify-between">
              <div className="w-full lg:w-[350px]">
                <label
                  htmlFor="mainCategory"
                  className="block text-sm font-medium "
                >
                  Main Category <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="mainCategory"
                  id="mainCategory"
                  value={formData.mainCategory}
                  onChange={handleChange}
                  className={`w-full mt-2 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#013D29] ${currentTheme === 'dark' ? 'text-white' : 'text-black'} ${currentTheme === 'dark' ? 'bg-[#404040]' : 'white]'}`}
                  placeholder="Enter main category"
                  required
                />
              </div>
              <div className="w-full lg:w-[350px]">
                <label
                  htmlFor="subCategory"
                  className="block text-sm font-medium "
                >
                  Sub Category <span className="text-red-500">*</span>
                </label>
                <input
                  name="subCategory"
                  id="subCategory"
                  value={formData.subCategory}
                  onChange={handleChange}
                  className={`w-full mt-2 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#013D29] ${currentTheme === 'dark' ? 'text-white' : 'text-black'} ${currentTheme === 'dark' ? 'bg-[#404040]' : 'white]'}`}
                  placeholder="Enter sub category"
                  required
                />
              </div>
            </div>

            <div className="flex justify-end mt-6">
              <button
                type="submit"
                className={`px-4 py-2 rounded ${currentTheme === 'dark' ? 'text-white' : 'text-black'} ${currentTheme === 'dark' ? 'bg-[#404040]' : 'bg-[#F0FFF8]'} border border-gray-300`}
              >
                Register Category
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default CategoryRegistrationForm;
