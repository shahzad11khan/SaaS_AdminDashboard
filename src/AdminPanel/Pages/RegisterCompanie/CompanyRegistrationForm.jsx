import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../../Navbar/Navbar";
import LeftSideBar from "../../LeftSideBar/LeftSideBar";
import { useSelector } from 'react-redux';
import { useLocation } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { baseUri } from "../../Components/api/baseUri";
import { Companies_Middle_Point } from "../../Components/api/middlePoints";
import { Company_Update_End_Point, Create_Companie_End_point } from "../../Components/api/endPoint";
import fetchData from "../../Components/api/axios";
import defaultPic from '../../../assets/default user/defaultUser.png';
import { toast, ToastContainer } from "react-toastify";

const CompanyRegistrationForm = () => {
  let navigate = useNavigate()

  let {token} = useSelector(state => state.authenticate);
  useEffect(()=>{
    if(!token) {
      toast.error("Login first")
      setTimeout(navigate('/'),1000) 
    }
  } , [token , navigate])
  
  const currentTheme = useSelector((state=>state.theme.theme))
  const location = useLocation();
  const [viewConfirmPassword , setViewConfirmPassword] = useState(false)
  const [viewPassword , setViewPassword] = useState(false)
  const [formData, setFormData] = useState({
    companyName: "",
    registrationNumber: "",
    email: "",
    address: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
    VatNumber: "",
    ownerEmail: "",
    ownerName: "",
    ownerPhoneNumber: "",
    businessLicense: "",
    businessType: "",
    businessAddress: "",
    isActive: "",
    companyLogo: "",
  });
  const [next, setNext] = useState(0)
  const businessTypeOptions = ["Retail", "Service", "Manufacturing", "Wholesale", "Other"];
  const [previewUrl, setPreviewUrl] = useState(defaultPic)
  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    console.log(name, value, type, files)
    if (type === 'file') {
      // console.log(files[0])
      const file = files[0];
      const reader = new FileReader();

      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };

      if (file) {
        reader.readAsDataURL(file);
      }
      setFormData({ ...formData, [name]: file });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleNext = (e) => {
    e.preventDefault();
    console.log(formData)
    if (formData.password !== formData.confirmPassword) {
      // console.log('password and confirm password does not matched')
      toast.error("password and confirm password does not matched");
      return;
    }
    setNext((prevNext) => prevNext + 1)
  }
  console.log("object keys", Object.keys(formData))

  const handleSubmit = async (e) => {
    e.preventDefault();
    const Data = new FormData();
    console.log("object keys", Object.keys(formData))
    Object.keys(formData).forEach((key) => {
      if (formData[key] !== null) {
        Data.append(key, formData[key]);
      } else { console.log(key) }
    });

    try {
      let response;
      if(location?.state?.mode === 'edit'){
        const url = baseUri + Companies_Middle_Point + Company_Update_End_Point+id;
        const method = "PUT";
        response = await fetchData(url, method , Data );
      }else{
        const url = baseUri + Companies_Middle_Point + Create_Companie_End_point;
        const method = "POST";
        response = await fetchData(url, method , Data );
      }
      console.log(response)      
      if(response.status === 200){
        toast.success(response.data.success)
        navigate(-1)
      }else{
        toast.error(response.data?.message || response.data?.error)
      }
    } catch (error) {
      toast.error(error || "something went worng with regester company")
      console.log(error);
    }


  };
  const [id , setId] = useState(null)
  useEffect(() => {
    // console.log(location.state.companies)
    if (location?.state?.companies) {
      let {companies} =location.state;         
      setFormData({
            companyName: companies.companyName ,
            companyAddress: companies.address ,
            email: companies.email , 
            confirmPassword: companies.confirmPassword ,
            password: companies.confirmPassword ,
            registrationNumber: companies.registrationNumber ,
            phoneNumber: companies.ownerPhoneNumber,
            VatNumber: companies.VatNumber ,
            address:companies.address,
            ownerPhoneNumber: companies.ownerPhoneNumber,
            isActive:companies.isActive,
            companyLogo:companies.companyLogo,
        });
    }
    if (location?.state?.companies?.companyLogo) {
      setPreviewUrl(location.state.companies.companyLogo)
    }
    if(location?.state?.companies?._id){
      setId(location?.state?.companies?._id)
    }
}, [location.state]);
if(!token) return null;
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        closeButton={false}
        limit={3}
        toastStyle={{
          fontSize: '11px',
          fontFamily: 'Arial, sans-serif',
          color: 'white',
          width: '220px',
          minHeight: '40px',
          padding: '8px 12px',
          borderRadius: '4px',
          boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
          transition: 'all 0.8s ease',
        }}
      />
      <Navbar />
      <div className="flex flex-col lg:flex-row ">
        <LeftSideBar />
        <div className={`flex flex-col  items-center lg:ml-10 w-full lg:w-[1000px] h-screen  ${currentTheme === 'dark' ? 'text-white' : 'text-gray-600'} `}>
          <h2 className={`text-2xl font-bold mb-6 text-center ${currentTheme === 'dark' ? 'text-white' : 'text-gray-700'} `}>Company Registration</h2>
          <div>
            {next === 0 ? (
              <>
                <form onSubmit={handleNext} className={`${currentTheme === 'dark' ? 'bg-[#404040]' : 'bg-white'}  mt-5 shadow-lg rounded-lg p-6 w-full lg:w-[800px]  border border-gray-300`}>

                  {/* comppanyName & emailAddress inputs */}
                  <div className="flex flex-col lg:flex-row justify-between">
                    <div className="w-full lg:w-[350px]">
                      <label
                        htmlFor="companyName"
                        className="block text-sm font-medium  "
                      >
                        Company Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="companyName"
                        id="companyName"
                        value={formData.companyName}
                        onChange={handleChange}
                        className={`w-full mt-2 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#013D29] ${currentTheme === 'dark' ? 'text-white' : 'text-black'} ${currentTheme === 'dark' ? 'bg-[#404040]' : 'white]'}`}
                        placeholder="Enter company name"
                        required
                      />
                    </div>

                    <div className="w-full lg:w-[350px]">
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium  "
                      >
                        Company Email  <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        id="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={`w-full mt-2 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#013D29] ${currentTheme === 'dark' ? 'text-white' : 'text-black'} ${currentTheme === 'dark' ? 'bg-[#404040]' : 'white]'}`}
                        placeholder="Enter email address"
                        required
                      />
                    </div>
                  </div>

                  {/* password , confirmPasword inputs */}
                  <div className="flex flex-col lg:flex-row justify-between mt-5">
                    <div className="w-full lg:w-[350px] relative">
                      <label
                        htmlFor="password"
                        className="block text-sm font-medium  "
                      >
                        Password <span className="text-red-500">*</span>
                      </label>
                      <input
                        type={viewPassword ? 'text' : 'password'}
                        name="password"
                        id="password"
                        value={formData.password}
                        onChange={handleChange}
                        className={`w-full mt-2 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#013D29] ${currentTheme === 'dark' ? 'text-white' : 'text-black'} ${currentTheme === 'dark' ? 'bg-[#404040]' : 'white]'}`}
                        placeholder="Enter password"
                        required
                      />
                      <FontAwesomeIcon
                        icon={!viewPassword ? faEyeSlash : faEye}
                        className="absolute right-3 top-10 text-gray-500 cursor-pointer"
                        onClick={() => setViewPassword(!viewPassword)}
                      />
                    </div>

                    <div className="w-full lg:w-[350px] relative">
                      <label
                        htmlFor="confirmPassword"
                        className="block text-sm font-medium  "
                      >
                        Confirm Password <span className="text-red-500">*</span>
                      </label>
                      <input
                        type={viewConfirmPassword ? 'text' : 'password'}
                        name="confirmPassword"
                        id="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        className={`w-full mt-2 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#013D29] ${currentTheme === 'dark' ? 'text-white' : 'text-black'} ${currentTheme === 'dark' ? 'bg-[#404040]' : 'white]'}`}
                        placeholder="Confirm password"
                        required
                      />
                      <FontAwesomeIcon
                        icon={!viewConfirmPassword ? faEyeSlash : faEye}
                        className="absolute right-3 top-10 text-gray-500 cursor-pointer"
                        onClick={() => setViewConfirmPassword(!viewConfirmPassword)}
                      />
                    </div>
                  </div>

                  {/* regestration & comppanyAddress  inputs */}
                  <div className="flex flex-col lg:flex-row justify-between mt-5">
                    <div className="w-full lg:w-[350px]">
                      <label
                        htmlFor="registrationNumber"
                        className="block text-sm font-medium  "
                      >
                        Registration Number
                      </label>
                      <input
                        type="number"
                        name="registrationNumber"
                        id="registrationNumber"
                        value={formData.registrationNumber}
                        onChange={handleChange}
                        className={`w-full mt-2 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#013D29] ${currentTheme === 'dark' ? 'text-white' : 'text-black'} ${currentTheme === 'dark' ? 'bg-[#404040]' : 'white]'}`}
                        placeholder="Enter registration number"
                      />
                    </div>
                    <div className="w-full lg:w-[350px]">
                      <label
                        htmlFor="companyAddress"
                        className="block text-sm font-medium  "
                      >
                        Address
                      </label>
                      <input
                        type="text"
                        name="address"
                        id="companyAddress"
                        value={formData.address}
                        onChange={handleChange}
                        className={`w-full mt-2 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#013D29] ${currentTheme === 'dark' ? 'text-white' : 'text-black'} ${currentTheme === 'dark' ? 'bg-[#404040]' : 'white]'}`}
                        placeholder="Enter company address"
                      />
                    </div>
                  </div>

                  {/* phoneNumber & VATNumber inputs */}
                  <div className="flex flex-col lg:flex-row justify-between mt-5">
                    <div className="w-full lg:w-[350px]">
                      <label
                        htmlFor="phoneNumber"
                        className="block text-sm font-medium  "
                      >
                        Phone Number
                      </label>
                      <input
                        type="number"
                        name="phoneNumber"
                        id="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleChange}
                        className={`w-full mt-2 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#013D29] ${currentTheme === 'dark' ? 'text-white' : 'text-black'} ${currentTheme === 'dark' ? 'bg-[#404040]' : 'white]'}`}
                        placeholder="Enter phone number"
                      />
                    </div>
                    <div className="w-full lg:w-[350px]">
                      <label
                        htmlFor="vatNumber"
                        className="block text-sm font-medium  "
                      >
                        VAT Number
                      </label>
                      <input
                        type="number"
                        name="VatNumber"
                        id="vatNumber"
                        value={formData.VatNumber}
                        onChange={handleChange}
                        className={`w-full mt-2 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#013D29] ${currentTheme === 'dark' ? 'text-white' : 'text-black'} ${currentTheme === 'dark' ? 'bg-[#404040]' : 'white]'}`}
                        placeholder="Enter VAT number"
                      />
                    </div>
                  </div>

                  {/* close and next Buttons  */}
                  <div className="w-full flex justify-end gap-5 mt-5">
                      <button
                      onClick={()=> navigate(-1)}
                        type="button"
                        className={`px-4 py-2 rounded  ${currentTheme=== 'dark' ?'text-white':'text-black'}  ${currentTheme=== 'dark' ?'bg-[#404040]':'bg-[#F0FFF8]'} border border-gray-300`}>
                        Close
                      </button>

                    <button
                      type="submit"
                      className={`px-4 py-2 rounded  ${currentTheme === 'dark' ? 'text-white' : 'text-black'}  ${currentTheme === 'dark' ? 'bg-[#404040]' : 'bg-[#F0FFF8]'} border border-gray-300`}
                    >
                      Next
                    </button>

                  </div>
                </form>
              </>
            ) : next === 1 ? (
              <>
                <form onSubmit={handleSubmit} className={`${currentTheme === 'dark' ? 'bg-[#404040]' : 'bg-white'}  mt-5 shadow-lg rounded-lg p-6 w-full lg:w-[800px]  border border-gray-300`}>
                  {/* ownerName & address */}
                  <div className="flex flex-col lg:flex-row justify-between">
                    <div className="w-full lg:w-[350px]">
                      <label
                        htmlFor="ownerName"
                        className="block text-sm font-medium  "
                      >
                        Owner Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="ownerName"
                        id="ownerName"
                        value={formData.ownerName}
                        onChange={handleChange}
                        className={`w-full mt-2 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#013D29] ${currentTheme === 'dark' ? 'text-white' : 'text-black'} ${currentTheme === 'dark' ? 'bg-[#404040]' : 'white]'}`}
                        placeholder="Enter Owner Name"
                        required
                      />
                    </div>
                    <div className="w-full lg:w-[350px]">
                      <label
                        htmlFor="companyAddress"
                        className="block text-sm font-medium  "
                      >
                        Business Address
                      </label>
                      <input
                        type="text"
                        name="businessAddress"
                        id="companyAddress"
                        value={formData.businessAddress}
                        onChange={handleChange}
                        className={`w-full mt-2 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#013D29] ${currentTheme === 'dark' ? 'text-white' : 'text-black'} ${currentTheme === 'dark' ? 'bg-[#404040]' : 'white]'}`}
                        placeholder="Enter Company Address"

                      />
                    </div>
                  </div>
                  {/* email & ownerPhoneNumber */}
                  <div className="flex flex-col lg:flex-row justify-between mt-5">
                    <div className="w-full lg:w-[350px]">
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium  "
                      >
                        Owner Email
                      </label>
                      <input
                        type="email"
                        name="ownerEmail"
                        id="email"
                        value={formData.ownerEmail}
                        onChange={handleChange}
                        className={`w-full mt-2 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#013D29] ${currentTheme === 'dark' ? 'text-white' : 'text-black'} ${currentTheme === 'dark' ? 'bg-[#404040]' : 'white]'}`}
                        placeholder="Enter Email"

                      />
                    </div>
                    <div className="w-full lg:w-[350px]">
                      <label
                        htmlFor="phoneNumber"
                        className="block text-sm font-medium  "
                      >
                        Owner Phone Number
                      </label>
                      <input
                        type="number"
                        name="ownerPhoneNumber"
                        id="phoneNumber"
                        value={formData.ownerPhoneNumber}
                        onChange={handleChange}
                        className={`w-full mt-2 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#013D29] ${currentTheme === 'dark' ? 'text-white' : 'text-black'} ${currentTheme === 'dark' ? 'bg-[#404040]' : 'white]'}`}
                        placeholder="Enter Phone Number"

                      />
                    </div>
                  </div>
                  {/* businessLicense & businessType */}
                  <div className="flex flex-col lg:flex-row justify-between mt-5">
                    <div className="w-full lg:w-[350px]">
                      <label
                        htmlFor="businessLicense"
                        className="block text-sm font-medium  "
                      >
                        Business License
                      </label>
                      <input
                        type="text"
                        name="businessLicense"
                        id="businessLicense"
                        value={formData.businessLicense}
                        onChange={handleChange}
                        className={`w-full mt-2 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#013D29] ${currentTheme === 'dark' ? 'text-white' : 'text-black'} ${currentTheme === 'dark' ? 'bg-[#404040]' : 'white]'}`}
                        placeholder="Enter Business License"

                      />
                    </div>
                    <div className="w-full lg:w-[350px]">
                      <label
                        htmlFor="businessType"
                        className="block text-sm font-medium  "
                      >
                        Business Type <span className="text-red-500">*</span>
                      </label>
                      <select
                        name="businessType"
                        id="businessType"
                        value={formData.businessType}
                        onChange={handleChange}
                        className={`w-full mt-2 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#013D29] ${currentTheme === 'dark' ? 'text-white' : 'text-black'} ${currentTheme === 'dark' ? 'bg-[#404040]' : 'white]'}`}
                        required
                      >
                        <option value="" disabled>
                          Select Business Type
                        </option>
                        {businessTypeOptions.map((type) => (
                          <option key={type} value={type}>
                            {type}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="flex flex-col lg:flex-row justify-between mt-5">
                    {/* active  */}
                    {/* company Logo */}
                    <div className="w-full lg:w-[350px] flex items-center mt-2 ">
                      <label className="flex items-center mr-4">
                        <input
                          type="radio"
                          name="isActive"
                          value={true}
                          checked={JSON.parse(formData.isActive) == true}
                          onChange={handleChange}
                          className="cursor-pointer w-4 h-4 text-blue-500 border-gray-300 rounded focus:ring-blue-500"
                        />
                        <span className="ml-2 text-sm font-medium  ">
                          Active
                        </span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="isActive"
                          value={false}
                          checked={JSON.parse(formData.isActive) == false}
                          onChange={handleChange}
                          className="cursor-pointer w-4 h-4 text-blue-500 border-gray-300 rounded focus:ring-blue-500"
                        />
                        <span className="ml-2 text-sm font-medium  ">
                          InActive
                        </span>
                      </label>
                    </div>

                    <div className=" flex w-full gap-5 justify-between items-center lg:w-[350px]">
                      <div className="w-[50%]">
                        <label
                          htmlFor="companyLogo"
                          className="block text-sm font-medium  "
                        >
                          Company Logo <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="file"
                          name="companyLogo"
                          id="companyLogo"
                          onChange={handleChange}
                          className={`w-full mt-2 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#013D29] ${currentTheme === 'dark' ? 'text-white' : 'text-black'} ${currentTheme === 'dark' ? 'bg-[#404040]' : 'white]'}`}
                          required
                        />
                      </div>
                      <img className="h-[120px] w-[120px] rounded-full object-cover" src={previewUrl} alt="user" />
                    </div>
                  </div>


                  {/* back , close & submit buttons */}
                  <div className="w-full flex justify-end gap-5 mt-5">
                    <button
                      type="button"
                      className={`px-4 py-2 rounded  ${currentTheme === 'dark' ? 'text-white' : 'text-black'}  ${currentTheme === 'dark' ? 'bg-[#404040]' : 'bg-[#F0FFF8]'} border border-gray-300`}
                      onClick={() => setNext((prevNext) => prevNext - 1)}
                    >
                      Back
                    </button>
                    <Link to="/register-companies">
                      <button
                        type="button"
                        className={`px-4 py-2 rounded  ${currentTheme === 'dark' ? 'text-white' : 'text-black'}  ${currentTheme === 'dark' ? 'bg-[#404040]' : 'bg-[#F0FFF8]'} border border-gray-300`}
                      >
                        Close
                      </button>
                    </Link>



                    <button
                      type="submit"
                      className={`px-4 py-2 rounded  ${currentTheme === 'dark' ? 'text-white' : 'text-black'}  ${currentTheme === 'dark' ? 'bg-[#404040]' : 'bg-[#F0FFF8]'} border border-gray-300`}
                    >
                      Submit
                    </button>
                  </div>
                </form>
              </>
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
};

export default CompanyRegistrationForm;
