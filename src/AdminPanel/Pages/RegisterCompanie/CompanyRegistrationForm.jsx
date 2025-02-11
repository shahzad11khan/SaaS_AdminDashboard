import { useState ,useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../Navbar/Navbar";
import LeftSideBar from "../../LeftSideBar/LeftSideBar";
import { useSelector } from 'react-redux';
import { useLocation } from "react-router-dom";



const CompanyRegistrationForm = () => {
  const currentTheme = useSelector((state=>state.theme.theme))
const location = useLocation();
  const [formData, setFormData] = useState({
    companyName: "",
    registrationNumber: "",
    email: "",
    address: "",
    password: "",
    confirmPassword: "",
    companyAddress: "",
    phoneNumber: "",
    vatNumber: "",
    ownerName: "",
    owneremail: "",
    ownerphoneNumber: "",
    businessLicense: "",
    taxId: "",
    businessType: "",
    businessAddress: "",
  });
  const [next, setnext] = useState(0)
  const businessTypeOptions = ["Retail", "Service", "Manufacturing", "Wholesale", "Other"];


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    setFormData({
      companyName: "",
      registrationNumber: "",
      email: "",
      address: "",
      password: "",
      companyAddress: "",
      phoneNumber: "",
      confirmPassword: "",
      vatNumber: "",
      ownerName: "",
      owneremail: "",
      ownerphoneNumber: "",
      businessLicense: "",
      taxId: "",
      businessType: "",
      businessAddress: "",
    });
  };
  useEffect(() => {
    if (location?.state?.companies) {
        console.log("Companies Data:", location.state.companies); 
        setFormData({
            companyName: location.state.companies.companyName ,
            companyAddress: location.state.companies.address ,
            email: location.state.companies.email , 
            confirmPassword: location.state.companies.confirmPassword ,
            password: location.state.companies.confirmPassword ,
            registrationNumber: location.state.companies.registrationNumber ,
            phoneNumber: location.state.companies.ownerPhoneNumber,
            vatNumber: location.state.companies.VatNumber ,
        });
    }
}, [location.state]);

  return (
    <>
      <Navbar />
      <div className="flex flex-col lg:flex-row ">
        <LeftSideBar />
        <div className={`flex flex-col  items-center lg:ml-10 w-full lg:w-[1000px] h-screen  ${currentTheme=== 'dark' ?'text-white':'text-gray-600'} `}>
          <form onSubmit={handleSubmit} className={`${currentTheme=== 'dark' ?'bg-[#404040]':'bg-white'}  mt-5 shadow-lg rounded-lg p-6 w-full lg:w-[800px]  border border-gray-300`}>
            <h2 className={`text-2xl font-bold mb-6 text-center ${currentTheme=== 'dark' ?'text-white':'text-gray-700'} `}>Company Registration</h2>
            <div>
              {next === 0 ? (
                <>
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
                        className={`w-full mt-2 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#013D29] ${currentTheme=== 'dark' ?'text-white':'text-black'} ${currentTheme=== 'dark' ?'bg-[#404040]':'white]'}`}
                        placeholder="Enter company name"
                        required
                      />
                    </div>

            
                    <div className="w-full lg:w-[350px]">
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium  "
                      >
                        Email Address <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        id="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={`w-full mt-2 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#013D29] ${currentTheme=== 'dark' ?'text-white':'text-black'} ${currentTheme=== 'dark' ?'bg-[#404040]':'white]'}`}
                        placeholder="Enter email address"
                        required
                      />
                    </div>
                  </div>

                  <div className="flex flex-col lg:flex-row justify-between mt-5">
                    <div className="flex gap-2 w-full lg:w-[350px]">
                  
                      <div className="w-[45%] lg:w-[170px]">
                        <label
                          htmlFor="password"
                          className="block text-sm font-medium  "
                        >
                          Password <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="password"
                          name="password"
                          id="password"
                          value={formData.password}
                          onChange={handleChange}
                          className={`w-full mt-2 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#013D29] ${currentTheme=== 'dark' ?'text-white':'text-black'} ${currentTheme=== 'dark' ?'bg-[#404040]':'white]'}`}
                          placeholder="Enter password"
                          required
                        />
                      </div>

                      <div className="w-[45%] lg:w-[170px]">
                        <label
                          htmlFor="confirmPassword"
                          className="block text-sm font-medium  "
                        >
                          Confirm Password <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="password"
                          name="confirmPassword"
                          id="confirmPassword"
                          value={formData.confirmPassword}
                          onChange={handleChange}
                          className={`w-full mt-2 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#013D29] ${currentTheme=== 'dark' ?'text-white':'text-black'} ${currentTheme=== 'dark' ?'bg-[#404040]':'white]'}`}
                          placeholder="Confirm password"
                          required
                        />
                      </div>
                    </div>

                    <div className="w-full lg:w-[350px]">
                      <label
                        htmlFor="registrationNumber"
                        className="block text-sm font-medium  "
                      >
                        Registration Number
                      </label>
                      <input
                        type="text"
                        name="registrationNumber"
                        id="registrationNumber"
                        value={formData.registrationNumber}
                        onChange={handleChange}
                        className={`w-full mt-2 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#013D29] ${currentTheme=== 'dark' ?'text-white':'text-black'} ${currentTheme=== 'dark' ?'bg-[#404040]':'white]'}`}
                        placeholder="Enter registration number"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col lg:flex-row justify-between mt-5">
                    <div className="w-full lg:w-[350px]">
                      <label
                        htmlFor="companyAddress"
                        className="block text-sm font-medium  "
                      >
                        Company Address
                      </label>
                      <input
                        type="text"
                        name="companyAddress"
                        id="companyAddress"
                        value={formData.companyAddress}
                        onChange={handleChange}
                        className={`w-full mt-2 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#013D29] ${currentTheme=== 'dark' ?'text-white':'text-black'} ${currentTheme=== 'dark' ?'bg-[#404040]':'white]'}`}
                        placeholder="Enter company address"
                      />
                    </div>

                    <div className="w-full lg:w-[350px]">
                      <label
                        htmlFor="phoneNumber"
                        className="block text-sm font-medium  "
                      >
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        name="phoneNumber"
                        id="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleChange}
                        className={`w-full mt-2 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#013D29] ${currentTheme=== 'dark' ?'text-white':'text-black'} ${currentTheme=== 'dark' ?'bg-[#404040]':'white]'}`}
                        placeholder="Enter phone number"
                      />
                    </div>
                  </div>


                  <div className="flex flex-col lg:flex-row justify-between mt-5">
                    <div className="w-full lg:w-[350px]">
                      <label
                        htmlFor="vatNumber"
                        className="block text-sm font-medium  "
                      >
                        VAT Number
                      </label>
                      <input
                        type="text"
                        name="vatNumber"
                        id="vatNumber"
                        value={formData.vatNumber}
                        onChange={handleChange}
                        className={`w-full mt-2 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#013D29] ${currentTheme=== 'dark' ?'text-white':'text-black'} ${currentTheme=== 'dark' ?'bg-[#404040]':'white]'}`}
                        placeholder="Enter VAT number"
                      />
                    </div>

                    <div className="w-full lg:w-[350px] flex justify-center items-center mt-7">
                      <button
                        type="button"
                        className={`w-full px-4 py-2 rounded border ${currentTheme=== 'dark' ?'bg-[#404040]':'bg-[#F0FFF8]'} hover:bg-gray-300`}
                      >
                        Show
                      </button>
                    </div>
                  </div>

                  <div className="w-full flex justify-end gap-5 mt-5">
                    <Link to="/register-companies">
                      <button
                        type="button"
                        className={`px-4 py-2 rounded  ${currentTheme=== 'dark' ?'text-white':'text-black'}  ${currentTheme=== 'dark' ?'bg-[#404040]':'bg-[#F0FFF8]'} border border-gray-300`}>
                        Close
                      </button>
                    </Link>

                    <button
                      type="button"
                      className={`px-4 py-2 rounded  ${currentTheme=== 'dark' ?'text-white':'text-black'}  ${currentTheme=== 'dark' ?'bg-[#404040]':'bg-[#F0FFF8]'} border border-gray-300`}
                      onClick={() => setnext((prevNext) => prevNext + 1)}
                    >
                      Next
                    </button>

                  </div>
                </>
              ) : next === 1 ? (
                <>
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
                        className={`w-full mt-2 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#013D29] ${currentTheme=== 'dark' ?'text-white':'text-black'} ${currentTheme=== 'dark' ?'bg-[#404040]':'white]'}`}
                        placeholder="Enter Owner Name"
                        required
                      />
                    </div>
                    <div className="w-full lg:w-[350px]">
                      <label
                        htmlFor="companyAddress"
                        className="block text-sm font-medium  "
                      >
                        Company Address
                      </label>
                      <input
                        type="text"
                        name="companyAddress"
                        id="companyAddress"
                        value={formData.companyAddress}
                        onChange={handleChange}
                        className={`w-full mt-2 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#013D29] ${currentTheme=== 'dark' ?'text-white':'text-black'} ${currentTheme=== 'dark' ?'bg-[#404040]':'white]'}`}
                        placeholder="Enter Company Address"

                      />
                    </div>
                  </div>

                  <div className="flex flex-col lg:flex-row justify-between mt-5">
                    <div className="w-full lg:w-[350px]">
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium  "
                      >
                        Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        id="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={`w-full mt-2 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#013D29] ${currentTheme=== 'dark' ?'text-white':'text-black'} ${currentTheme=== 'dark' ?'bg-[#404040]':'white]'}`}
                        placeholder="Enter Email"

                      />
                    </div>
                    <div className="w-full lg:w-[350px]">
                      <label
                        htmlFor="phoneNumber"
                        className="block text-sm font-medium  "
                      >
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        name="phoneNumber"
                        id="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleChange}
                        className={`w-full mt-2 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#013D29] ${currentTheme=== 'dark' ?'text-white':'text-black'} ${currentTheme=== 'dark' ?'bg-[#404040]':'white]'}`}
                        placeholder="Enter Phone Number"

                      />
                    </div>
                  </div>

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
                        className={`w-full mt-2 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#013D29] ${currentTheme=== 'dark' ?'text-white':'text-black'} ${currentTheme=== 'dark' ?'bg-[#404040]':'white]'}`}
                        placeholder="Enter Business License"

                      />
                    </div>
                    <div className="w-full lg:w-[350px]">
                      <label
                        htmlFor="taxId"
                        className="block text-sm font-medium  "
                      >
                        Tax ID
                      </label>
                      <input
                        type="text"
                        name="taxId"
                        id="taxId"
                        value={formData.taxId}
                        onChange={handleChange}
                        className={`w-full mt-2 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#013D29] ${currentTheme=== 'dark' ?'text-white':'text-black'} ${currentTheme=== 'dark' ?'bg-[#404040]':'white]'}`}
                        placeholder="Enter Tax ID"

                      />
                    </div>
                  </div>
                  <div className="flex flex-col lg:flex-row justify-between mt-5">
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
                        className={`w-full mt-2 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#013D29] ${currentTheme=== 'dark' ?'text-white':'text-black'} ${currentTheme=== 'dark' ?'bg-[#404040]':'white]'}`}
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

                    <div className="w-full lg:w-[350px] flex items-center mt-6 lg:mt-0">
                      <label className="flex items-center mr-4">
                        <input
                          type="radio"
                          name="status"
                          value="active"
                          checked={formData.status === "active"}
                          onChange={handleChange}
                          className="w-4 h-4 text-blue-500 border-gray-300 rounded focus:ring-blue-500"
                        />
                        <span className="ml-2 text-sm font-medium  ">
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
                        <span className="ml-2 text-sm font-medium  ">
                          InActive
                        </span>
                      </label>
                    </div>
                  </div>


                  <div className="flex flex-col lg:flex-row justify-between mt-5">

                    <div className="w-full lg:w-[350px]">
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
                        className={`w-full mt-2 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#013D29] ${currentTheme=== 'dark' ?'text-white':'text-black'} ${currentTheme=== 'dark' ?'bg-[#404040]':'white]'}`}
                        required
                      />
                    </div>

                  </div>
                  <div className="w-full flex justify-end gap-5 mt-5">
                    <button
                      type="button"
                      className={`px-4 py-2 rounded  ${currentTheme=== 'dark' ?'text-white':'text-black'}  ${currentTheme=== 'dark' ?'bg-[#404040]':'bg-[#F0FFF8]'} border border-gray-300`}
                      onClick={() => setnext((prevNext) => prevNext - 1)}
                    >
                      Back
                    </button>
                    <Link to="/register-companies">
                      <button
                        type="button"
                        className={`px-4 py-2 rounded  ${currentTheme=== 'dark' ?'text-white':'text-black'}  ${currentTheme=== 'dark' ?'bg-[#404040]':'bg-[#F0FFF8]'} border border-gray-300`}
                      >
                        Close
                      </button>
                    </Link>



                    <button
                      type="button"
                      className={`px-4 py-2 rounded  ${currentTheme=== 'dark' ?'text-white':'text-black'}  ${currentTheme=== 'dark' ?'bg-[#404040]':'bg-[#F0FFF8]'} border border-gray-300`}
                    >
                      Submit
                    </button>

                  </div>
                </>
              ) : null}
            </div>






          </form>
        </div>
      </div>
    </>
  );
};

export default CompanyRegistrationForm;
