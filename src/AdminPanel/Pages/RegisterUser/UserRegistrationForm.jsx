import { useState,useEffect } from "react";
import { Link,useLocation } from "react-router-dom";
import Navbar from "../../Navbar/Navbar";
import LeftSideBar from "../../LeftSideBar/LeftSideBar";
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";



const UserRegistrationForm = () => {
  const currentTheme = useSelector((state=>state.theme.theme))
  const [formData, setFormData] = useState({
    fullName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    dateOfBirth: "",
    permission: "",
    role: "user",
    status: "inactive",
    userLogo :null
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordErrorMessage,setPasswordErrorMessage]=useState("");

  const confirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword)
  }

  const passwordVisibility = () => {
    setShowPassword(!showPassword);
  }
  

  const location = useLocation();

  const handleChange = (e) => {
    const { name, value, type, checked ,files } = e.target;
    if(type==='file'){
      setFormData(
        {
          ...formData,
          [name]:files[0]
        }
      )
    }
    setFormData(
      {
      ...formData,
      [name]: type === "radio" ? (checked ? value : formData[name]) : value,
    
    });

    if(name === "password"){
      setFormData({
        ...formData,
        [name]: value,
      });
      if (formData.password && formData.confirmPassword && formData.password !== formData.confirmPassword) {
        setPasswordErrorMessage("Passwords do not match!");
        console.log("password not match ")
      }
    }


  }
  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    console.log("Form Submitted:", formData);
    alert("User registered successfully!");
    setFormData({
      fullName: "",
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      dateOfBirth: "",
      permission: "",
      role: "user",
      status: "inactive",
      userLogo:null
    });
  };

  useEffect(() => {
    console.log(location?.state?.user)
    if (location?.state?.user) {
      setFormData({
        fullName:location.state.user.fullName,
        username: location.state.user.username,
        email: location.state.user.email,
        // password: location.state.user.password,
        // confirmPassword: location.state.user.confirmPassword,
        dateOfBirth: location.state.user.dateOfBirth,
        permission: location.state.user.permission,
        role: location.state.user.role,
        // status: location.state.user.state,
        userLogo:location.state.user.userLogo
      })
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
            className={`${currentTheme=== 'dark' ?'bg-[#404040]':'bg-white'}  mt-5 shadow-lg rounded-lg p-6 w-full lg:w-[800px]  border border-gray-300`}>          
            <h2 className={`text-2xl font-bold mb-6 text-center ${currentTheme=== 'dark' ?'text-white':'text-gray-700'} `}>
            {location?.state?.state === "edit" ? "Update" : "Add"} User 
            </h2>
            <div>

             
             
                  <div className="flex flex-col lg:flex-row justify-between">
                    <div className="w-full lg:w-[350px]">
                      <label
                        htmlFor="fullName"
                        className="block text-sm font-medium "
                      >
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="fullName"
                        id="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        className={`w-full mt-2 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#013D29] ${currentTheme === 'dark' ? 'text-white' : 'text-black'} ${currentTheme === 'dark' ? 'bg-[#404040]' : 'white]'}`}
                        placeholder="Enter your full name"
                        required
                      />
                    </div>

                    <div className="w-full lg:w-[350px]">
                      <label
                        htmlFor="username"
                        className="block text-sm font-medium "
                      >
                        User Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="username"
                        id="username"
                        value={formData.username}
                        onChange={handleChange}
                        className={`w-full mt-2 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#013D29] ${currentTheme === 'dark' ? 'text-white' : 'text-black'} ${currentTheme === 'dark' ? 'bg-[#404040]' : 'white]'}`}
                        placeholder="Enter user name"
                        required
                      />
                    </div>
                  </div>


                  <div className="flex flex-col lg:flex-row justify-between mt-3">

                    <div className="w-full lg:w-[350px]">
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium "
                      >
                        Email Address <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        id="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={`w-full mt-2 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#013D29] ${currentTheme === 'dark' ? 'text-white' : 'text-black'} ${currentTheme === 'dark' ? 'bg-[#404040]' : 'white]'}`}
                        placeholder="Enter your email"
                        required
                      />
                    </div>

                    <div className="w-full lg:w-[350px] ">
                      <label
                        htmlFor="dateOfBirth"
                        className="block text-sm font-medium "
                      >
                        Date of Birth 
                      </label>
                      <input
                        type="date"
                        name="dateOfBirth"
                        id="dateOfBirth"
                        value={formData.dateOfBirth}
                        onChange={handleChange}
                        className={`w-full mt-2 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#013D29] ${currentTheme === 'dark' ? 'text-white' : 'text-black'} ${currentTheme === 'dark' ? 'bg-[#404040]' : 'white]'}`}
                      />
                    </div>
                  </div>

                  <div className="flex flex-col lg:flex-row justify-between mt-3">
                    <div className="relative w-full lg:w-[350px] ">
                      <label
                        htmlFor="password"
                        className="block text-sm font-medium "
                      >
                        Password <span className="text-red-500">*</span>
                      </label>
                      <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        id="password"
                        value={formData.password}
                        onChange={handleChange}
                        className={`w-full mt-2 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#013D29] ${currentTheme === 'dark' ? 'text-white' : 'text-black'} ${currentTheme === 'dark' ? 'bg-[#404040]' : 'white]'}`}
                        placeholder="Enter password"
                        required
                      />
                      <FontAwesomeIcon
                        icon={showPassword ? faEyeSlash : faEye}
                        className="absolute right-3 top-10 text-gray-500 cursor-pointer"
                        onClick={passwordVisibility}
                      />
                    </div>

                    <div className="relative w-full lg:w-[350px]">

                      <label
                        htmlFor="confirmPassword"
                        className="block text-sm font-medium "
                      >
                        Confirm Password <span className="text-red-500">*</span>
                      </label>
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        name="confirmPassword"
                        id="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        className={`w-full mt-2 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#013D29] ${currentTheme === 'dark' ? 'text-white' : 'text-black'} ${currentTheme === 'dark' ? 'bg-[#404040]' : 'white]'}`}
                        placeholder="Confirm password"
                        required
                      />
                      <FontAwesomeIcon
                        icon={showConfirmPassword ? faEyeSlash : faEye}
                        className="absolute right-3 top-10 text-gray-500 cursor-pointer"
                        onClick={confirmPasswordVisibility}
                      />
                   
                        <p className="text-red-700 text-sm">{passwordErrorMessage}</p>
                   

                    </div>
                  </div>



           
                  <div className="flex flex-col lg:flex-row justify-between mt-3">
                  <div className="w-full lg:w-[350px]">
                      <label
                        htmlFor="role"
                        className="block text-sm font-medium "
                      >
                        Role 
                      </label>
                      <select
                        name="role"
                        id="role"
                        value={formData.role}
                        onChange={handleChange}
                        className={`w-full mt-2 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#013D29] ${currentTheme === 'dark' ? 'text-white' : 'text-black'} ${currentTheme === 'dark' ? 'bg-[#404040]' : 'white]'} `}
                        required
                      >
                        <option value="" disabled>
                          Select a role
                        </option>
                        <option value="superAdmin">Super Admin</option>
                        <option value="admin">Admin</option>
                        <option value="manager">Manager</option>
                        <option value="user">User</option>

                      </select>
                    </div>
                    <div className="w-full lg:w-[350px]">
                      <label
                        htmlFor="permission"
                        className="block text-sm font-medium "
                      >
                        Permission 
                      </label>
                      <input
                        type="text"
                        name="permission"
                        id="permission"
                        value={formData.permission}
                        onChange={handleChange}
                        className={`w-full mt-2 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#013D29] ${currentTheme === 'dark' ? 'text-white' : 'text-black'} ${currentTheme === 'dark' ? 'bg-[#404040]' : 'white]'}`}
                        placeholder="Enter permission"
                      
                      />
                    </div>
                  </div>

                  <div className="flex flex-col lg:flex-row justify-between mt-3">
                    <div className="w-full lg:w-[350px]">
                      <label
                        htmlFor="image"
                        className="block text-sm font-medium "
                      >
                        Image 
                      </label>
                      <div className="mt-2">
                      <label htmlFor="userLogo"
                      className={`cursor-pointer inline-block px-4 py-2 rounded-md border ${currentTheme === 'dark' ? 'bg-[#404040] text-white' : 'bg-[#F0FFF8] text-black'} focus:outline-none`}

                      >
                      Choose Image
                      </label>
                      <input
                        type="file"
                        name="userLogo"
                        id="userLogo"
                        value={formData.userLogo}
                        onChange={handleChange}
                       className="hidden"
                
                      />
                       </div>
                
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

                  

                  <div className="w-full flex justify-end gap-5 mt-2">
                  <Link to="/register-user">
                  <button
                      type="button"
                      className={`px-4 py-2 rounded  ${currentTheme === 'dark' ? 'bg-[#404040]' : 'bg-[#F0FFF8]'} border border-gray-300`}
                    
                    >
                      Back
                    </button>
                   
                   </Link>

                      <button
                        type="submit"
                        className={`px-4 py-2 rounded  ${currentTheme === 'dark' ? 'bg-[#404040]' : 'bg-[#F0FFF8]'} border border-gray-300`}>
                        Save
                      </button>
                  </div>

          
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default UserRegistrationForm;
