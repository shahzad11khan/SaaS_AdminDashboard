import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../Navbar/Navbar";
import LeftSideBar from "../../LeftSideBar/LeftSideBar";

const CompanyRegistrationForm = () => {
  const [formData, setFormData] = useState({
    companyName: "",
    registrationNumber: "",
    email: "",
    address: "",
    password: "",
    confirmPassword: "",
    companyAddress:"",
    phoneNumber:"",
    VatNumber: "",
  });
  const [next,setnext]=useState(0)
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
    // console.log("Form Submitted:", formData);
    // alert("Company registered successfully!");
    setFormData({
      companyName: "",
      registrationNumber: "",
      officalemail: "",
      address: "",
      password: "",
      companyAddress:"",
      phoneNumber:"",
      confirmPassword: "",
      VatNumber: "",
      ownerName: "",
      owneremail: "",
      ownerphoneNumber: "",
      businessLicense: "",
      taxId: "",
      businessType: "",
      businessAddress: "",
    });
  };

  return (
    <>
      <Navbar />
      <div className="flex flex-col lg:flex-row">
        <LeftSideBar />
        <div className="flex flex-col  items-center lg:ml-10 w-full lg:w-[1000px] h-screen bg-gray-100">
          <form onSubmit={handleSubmit} className="bg-white mt-5 shadow-lg rounded-lg p-6 w-full lg:w-[800px]">
            <h2 className="text-2xl font-bold mb-6 text-center text-gray-700">Company Registration</h2>
            <div>
      {next === 0 ? (
        <>
          <div className="flex flex-col lg:flex-row justify-between">
            {/* Company Name */}
            <div className="w-full lg:w-[350px]">
              <label
                htmlFor="companyName"
                className="block text-sm font-medium text-gray-600"
              >
                Company Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="companyName"
                id="companyName"
                value={formData.companyName}
                onChange={handleChange}
                className="w-full mt-2 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Enter company name"
                required
              />
            </div>

            {/* Email Address */}
            <div className="w-full lg:w-[350px]">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-600"
              >
                Email Address <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                name="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full mt-2 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Enter email address"
                required
              />
            </div>
          </div>

          {/* Password and Registration Number */}
          <div className="flex flex-col lg:flex-row justify-between mt-5">
            <div className="flex gap-2 w-full lg:w-[350px]">
              {/* Password */}
              <div className="w-[45%] lg:w-[170px]">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-600"
                >
                  Password <span className="text-red-500">*</span>
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full mt-2 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Enter password"
                  required
                />
              </div>

              {/* Confirm Password */}
              <div className="w-[45%] lg:w-[170px]">
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium text-gray-600"
                >
                  Confirm Password <span className="text-red-500">*</span>
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  id="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full mt-2 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Confirm password"
                  required
                />
              </div>
            </div>

            {/* Registration Number */}
            <div className="w-full lg:w-[350px]">
              <label
                htmlFor="registrationNumber"
                className="block text-sm font-medium text-gray-600"
              >
                Registration Number
              </label>
              <input
                type="text"
                name="registrationNumber"
                id="registrationNumber"
                value={formData.registrationNumber}
                onChange={handleChange}
                className="w-full mt-2 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Enter registration number"
              />
            </div>
          </div>

          {/* Company Address and Phone Number */}
          <div className="flex flex-col lg:flex-row justify-between mt-5">
            <div className="w-full lg:w-[350px]">
              <label
                htmlFor="companyAddress"
                className="block text-sm font-medium text-gray-600"
              >
                Company Address
              </label>
              <input
                type="text"
                name="companyAddress"
                id="companyAddress"
                value={formData.companyAddress}
                onChange={handleChange}
                className="w-full mt-2 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Enter company address"
              />
            </div>

            <div className="w-full lg:w-[350px]">
              <label
                htmlFor="phoneNumber"
                className="block text-sm font-medium text-gray-600"
              >
                Phone Number
              </label>
              <input
                type="tel"
                name="phoneNumber"
                id="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                className="w-full mt-2 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Enter phone number"
              />
            </div>
          </div>

          {/* VAT Number and Buttons */}
          <div className="flex flex-col lg:flex-row justify-between mt-5">
            <div className="w-full lg:w-[350px]">
              <label
                htmlFor="vatNumber"
                className="block text-sm font-medium text-gray-600"
              >
                VAT Number
              </label>
              <input
                type="text"
                name="vatNumber"
                id="vatNumber"
                value={formData.vatNumber}
                onChange={handleChange}
                className="w-full mt-2 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Enter VAT number"
              />
            </div>

            <div className="w-full lg:w-[350px] flex justify-center items-center mt-7">
              <button
                type="button"
                className="w-full px-4 py-2 rounded border bg-gray-200 hover:bg-gray-300"
              >
                Show
              </button>
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="w-full flex justify-end gap-5 mt-5">
            <Link to="/register-companies">
              <button
                type="button"
                className="px-4 py-2 rounded bg-gray-700 text-white"
              >
                Close
              </button>
            </Link>

            {/* <Link to="/company-owner-contact-form"> */}
            <button
  type="button"
  className="px-4 py-2 rounded bg-green-700 text-white"
  onClick={() => setnext((prevNext) => prevNext + 1)}
>
  Next
</button>

            {/* </Link> */}
          </div>
        </>
      ) : next === 1 ? (
        <>
            <div className="flex flex-col lg:flex-row justify-between">
                <div className="w-full lg:w-[350px]">
                  <label
                    htmlFor="ownerName"
                    className="block text-sm font-medium text-gray-600"
                  >
                    Owner Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="ownerName"
                    id="ownerName"
                    value={formData.ownerName}
                    onChange={handleChange}
                    className="w-full mt-2 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="Enter Owner Name"
                    required
                  />
                </div>
                <div className="w-full lg:w-[350px]">
                  <label
                    htmlFor="companyAddress"
                    className="block text-sm font-medium text-gray-600"
                  >
                    Company Address 
                  </label>
                  <input
                    type="text"
                    name="companyAddress"
                    id="companyAddress"
                    value={formData.companyAddress}
                    onChange={handleChange}
                    className="w-full mt-2 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="Enter Company Address"
              
                  />
                </div>
              </div>

              <div className="flex flex-col lg:flex-row justify-between mt-5">
                <div className="w-full lg:w-[350px]">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-600"
                  >
                    Email 
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full mt-2 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="Enter Email"
                
                  />
                </div>
                <div className="w-full lg:w-[350px]">
                  <label
                    htmlFor="phoneNumber"
                    className="block text-sm font-medium text-gray-600"
                  >
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phoneNumber"
                    id="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    className="w-full mt-2 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="Enter Phone Number"
                 
                  />
                </div>
              </div>

              <div className="flex flex-col lg:flex-row justify-between mt-5">
                <div className="w-full lg:w-[350px]">
                  <label
                    htmlFor="businessLicense"
                    className="block text-sm font-medium text-gray-600"
                  >
                    Business License 
                  </label>
                  <input
                    type="text"
                    name="businessLicense"
                    id="businessLicense"
                    value={formData.businessLicense}
                    onChange={handleChange}
                    className="w-full mt-2 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="Enter Business License"
                    
                  />
                </div>
                <div className="w-full lg:w-[350px]">
                  <label
                    htmlFor="taxId"
                    className="block text-sm font-medium text-gray-600"
                  >
                    Tax ID 
                  </label>
                  <input
                    type="text"
                    name="taxId"
                    id="taxId"
                    value={formData.taxId}
                    onChange={handleChange}
                    className="w-full mt-2 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="Enter Tax ID"
                
                  />
                </div>
              </div>
              <div className="flex flex-col lg:flex-row justify-between mt-5">
              <div className="w-full lg:w-[350px]">
                <label
                  htmlFor="businessType"
                  className="block text-sm font-medium text-gray-600"
                >
                  Business Type <span className="text-red-500">*</span>
                </label>
                <select
                  name="businessType"
                  id="businessType"
                  value={formData.businessType}
                  onChange={handleChange}
                  className="w-full mt-2 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
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

              <div className="w-full lg:w-[350px]">
                <label
                  htmlFor="businessAddress"
                  className="block text-sm font-medium text-gray-600"
                >
                  Business Address 
                </label>
                <input
                  type="text"
                  name="businessAddress"
                  id="businessAddress"
                  value={formData.businessAddress}
                  onChange={handleChange}
                  className="w-full mt-2 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Enter Business Address"
                 
                />
              </div>
              </div>

              <div className="w-full flex justify-end gap-5 mt-5">
              <button
  type="button"
  className="px-4 py-2 rounded bg-green-700 text-white"
  onClick={() => setnext((prevNext) => prevNext - 1)}
>
  Back
</button>
            <Link to="/register-companies">
              <button
                type="button"
                className="px-4 py-2 rounded bg-gray-700 text-white"
              >
                Close
              </button>
            </Link>
      

            {/* <Link to="/company-owner-contact-form"> */}
            <button
  type="button"
  className="px-4 py-2 rounded bg-green-700 text-white"
>
  Submit
</button>

            {/* </Link> */}
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
