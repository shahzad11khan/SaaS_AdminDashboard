import { useEffect, useState } from "react";
import Navbar from "../../Navbar/Navbar";
import LeftSideBar from "../../LeftSideBar/LeftSideBar";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { baseUri } from "../../Components/api/baseUri";
import { Tag_Middle_Point } from "../../Components/api/middlePoints";
import { Tag_End_Point } from "../../Components/api/endPoint";
import fetchData from "../../Components/api/axios";

const TagRegistrationForm = () => {
  const currentTheme = useSelector((state) => state.theme.theme);
const [tagId ,setTagId] = useState(null);
const navigate = useNavigate()
  const [formData, setFormData] = useState({
    tagNumber: "",
    description: "",
    textColor: "", 
    backgroundColor: "", 
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {

      const isEdit = !!tagId;
      const data = { ...formData };
      const URL = baseUri + Tag_Middle_Point + Tag_End_Point + (isEdit ? "/" +tagId :"") 
      const method = isEdit ? "PUT" : "POST";
      const response =await fetchData(URL,method,data)
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

  const location = useLocation()
    useEffect(()=>{
  if(location?.state?.tag){
    console.log(location?.state?.tag)
    setFormData({
      tagNumber:location?.state?.tag.tagNumber,
      description:location?.state?.tag.description, 
    });
  }
  if(location.state?.tag._id){
    setTagId(location.state?.tag._id)
  }
    },[location.state])
  return (
    <>
      <Navbar />
      <div className="flex flex-col lg:flex-row">
        <LeftSideBar />
        <div
          className={`flex flex-col items-center lg:ml-10 w-full lg:w-[1000px] h-screen ${
            currentTheme === "dark" ? "text-white" : "text-gray-600"
          }`}
        >
          <form
            onSubmit={handleSubmit}
            className={`${
              currentTheme === "dark" ? "bg-[#404040]" : "bg-white"
            } mt-5 shadow-lg rounded-lg p-6 w-full lg:w-[800px] border border-gray-300`}
          >
            <h2
              className={`text-2xl font-bold mb-6 text-center ${
                currentTheme === "dark" ? "text-white" : "text-gray-700"
              }`}
            >
              Tag Registration
            </h2>

            <div className="flex flex-col lg:flex-row justify-between">
              <div className="w-full lg:w-[350px]">
                <label htmlFor="tagNumber" className="block text-sm font-medium">
                  Tag Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="tagNumber"
                  id="tagNumber"
                  value={formData.tagNumber}
                  onChange={handleChange}
                  className={`w-full mt-2 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#013D29] ${
                    currentTheme === "dark" ? "text-white" : "text-black"
                  } ${currentTheme === "dark" ? "bg-[#404040]" : "white]"}`}
                  placeholder="Enter tag number"
                  required
                />
              </div>
              <div className="w-full lg:w-[350px]">
                <label
                  htmlFor="description"
                  className="block text-sm font-medium"
                >
                  Description <span className="text-red-500">*</span>
                </label>
                <input
             
                  name="description"
                  id="description"
                  value={formData.description}
                  onChange={handleChange}
                  className={`w-full mt-2 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#013D29] ${
                    currentTheme === "dark" ? "text-white" : "text-black"
                  } ${currentTheme === "dark" ? "bg-[#404040]" : "white]"}`}
                  placeholder="Enter description"
                  required
                />
              </div>
            </div>

       

            <div className="flex justify-end mt-6">
              <button
                type="submit"
                className={`px-4 py-2 rounded ${
                  currentTheme === "dark" ? "text-white" : "text-black"
                }  ${
                  currentTheme === "dark" ? "bg-[#404040]" : "bg-[#F0FFF8]"
                } border border-gray-300`}
              >
                Register Tag
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default TagRegistrationForm;
