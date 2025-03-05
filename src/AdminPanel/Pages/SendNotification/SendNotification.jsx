import { useEffect, useState } from "react";
import LeftSideBar from "../../LeftSideBar/LeftSideBar";
import Navbar from "../../Navbar/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../../Slice/UsersSlice";
import { fetchCompanies } from "../../Slice/CompanySlice";import { allNotification_Middle_Point, Notification_Middle_Point } from "../../Components/api/middlePoints";
import { allCompanies_Notification_End_Point, allUsers_Notification_End_Point, Notification_End_Point } from "../../Components/api/endPoint";
import fetchData from "../../Components/api/axios";
import { toast } from "react-toastify";
import { notificationBaseUrl } from "../../Components/api/baseUri";

const SendNotification = () => {
  const dispatch = useDispatch();
  const currentTheme = useSelector((state) => state.theme.theme);
  const { data: userData } = useSelector((state) => state.users)
  const {data : companyData} = useSelector((state)=>state.companies)
  const [targetType,setTargetType]= useState(null);
  const [allUserAndCompany, setAllUserAndCompany] = useState(false);
  const [selectUserAndCompany, setSelectedUserAndCompany] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    body: "",
    fcmToken:"",
  });

  const [selectedForm, setSelectedForm] = useState({
    userType: "users",
    selectedUser: ""
  })

  useEffect(() => {
    dispatch(fetchUsers())
    dispatch(fetchCompanies())
  }, [dispatch])

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSelectedFormChange = (e) => {
    const { name, value } = e.target;
    setSelectedForm({
      ...selectedForm,
      [name]: value,
    });
    let selectedItem ;
    if(name==="selectedField"){
      selectedItem  = selectedForm.userType === "users" ?userData.find((user)=>user.fcmToken===value) :
      companyData.find((company)=>company.fcmToken===value)
    }
    if(selectedItem){
      setFormData((prev)=>({
        ...prev,
        fcmToken :selectedItem.fcmToken,
      }))
    }

    
  }

  const handleSubmit = async(e) => {
    e.preventDefault();
    console.log("Form Data of all user or companies submit:", formData);
    const url = notificationBaseUrl + allNotification_Middle_Point + (targetType === "Users" ? allUsers_Notification_End_Point : allCompanies_Notification_End_Point);
    const method ="POST";
  const response = await fetchData(url,method,formData)
  console.log(response.status)

  if (response?.status ===200 || response?.status ===201){
    console.log("Response of all",response)
    toast.success("Message Send Successfully")
    
  }  
  else{
    toast.error("Failed to send notification")
  }
};

  const handleSingleSubmit =async (e) =>{
    console.log("Sending Notification:", formData);

    e.preventDefault();
    const url = notificationBaseUrl + Notification_Middle_Point + Notification_End_Point;
    const method = "POST";
    if(!formData.fcmToken){
      toast.error("Selected a user or company with valid fcmToken")
    }
    const response = await fetchData(url,method,formData)
    if (response?.status === 200 || response?.status === 201) {
      console.log(response)
      toast.success("Message Send Successfully")
    }
    else{
    toast.error("Failed to send notification")
    }
  }

  const filterUser =userData?.filter(el=> el.fcmToken !== null);
  const filterCompany = companyData?.filter(el=> el.fcmToken !== null);

  return (
    <div>
      <Navbar />
      <div className="flex flex-col lg:flex-row">
        <LeftSideBar />
        <div className="flex flex-col lg:ml-10 w-full lg:w-[1000px] gap-3">
          <div className="para">
            <p className={`underline text-xl ${currentTheme === "dark" ? "text-white" : "text-black"}`}>
              Show Notification
            </p>
          </div>
          <div className="flex w-full ">
            <div className="flex w-full">
              <ul className="flex w-full justify-evenly">
                <li className="w-1/2 mr-2">
                  <div
                    className={`w-full flex justify-center rounded-lg ${currentTheme === "dark" ? "text-white" : "text-black"} border-2 items-center gap-3 p-2 cursor-pointer`}
                    onClick={() => setAllUserAndCompany(!allUserAndCompany)}>
                    <p>All registered users and companies</p>

                    <span
                      className={`text-2xl transition-transform duration-300 ${allUserAndCompany ? "rotate-180" : "rotate-0"
                        }`}
                    >
                      ^
                    </span>
                  </div>
                  {allUserAndCompany &&
                    <div className={`w-full mt-5 ${currentTheme === "dark" ? "bg-[#404040] text-white" : "bg-white"} border p-6 shadow-lg rounded-lg `}>
                      <h2 className="font-bold text-center">All Users & Companies</h2>
                      <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                          <label className="block  font-medium">Title</label>
                          <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            placeholder="Enter title"
                            className={`w-full mt-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#013D29] ${currentTheme === "dark" ? "text-white bg-[#404040]" : "text-black bg:white"}`}
                            required
                          />
                        </div>

                        <div>
                          <label className="block  font-medium">Body</label>
                          <input
                            name="body"
                            value={formData.body}
                            onChange={handleChange}
                            placeholder="Enter body text"
                            className={`w-full mt-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#013D29] ${currentTheme === "dark" ? "text-white bg-[#404040]" : "text-black bg:white"}`}
                            rows="4"
                            required
                          ></input>
                        </div>

                       <div className="flex gap-5 ">
                       <button
                          type="submit"
                          onClick={()=>{setTargetType("Users")}}
                          className={` px-4 py-2 rounded  ${currentTheme === 'dark' ? 'text-white bg-[#404040]' : 'text-black bg-[#F0FFF8]'} border border-gray-300`}
                        >
                           Send to Users
                        </button>
                        <button
                          type="submit"
                          className={` px-4 py-2 rounded  ${currentTheme === 'dark' ? 'text-white bg-[#404040]' : 'text-black bg-[#F0FFF8]'} border border-gray-300`}
                          onClick={()=>{setTargetType("Companies")}}
                       >
                          Send to Companies
                          </button>
                       </div>
                      </form>
                    </div>
                  }
                </li>


                <li className="w-1/2 mr-2">
                  <div
                    className={`w-full flex justify-center rounded-lg ${currentTheme === "dark" ? "text-white" : "text-black"} border-2 items-center gap-3 p-2 cursor-pointer`}
                    onClick={() => setSelectedUserAndCompany(!selectUserAndCompany)}
                  >
                    <p>Selected registered users and companies</p>
                    <span
                      className={`text-2xl transition-transform duration-300 ${selectUserAndCompany ? "rotate-180" : "rotate-0"
                        }`}
                    >
                      ^
                    </span>
                  </div>

                  {selectUserAndCompany && (
                    <div className={`w-full mt-5 ${currentTheme === "dark" ? "bg-[#404040] text-white" : "bg-white"} border p-6 shadow-lg rounded-lg `}>
                      <h2 className="font-bold text-center">
                        Selected {selectedForm.userType === "users" ? "Users" : "Companies"}
                      </h2>

                      <div className="w-full flex items-center mt-6 lg:mt-5">
                        <label className="flex items-center mr-4">
                          <input
                            type="radio"
                            name="userType"
                            value="users"
                            checked={selectedForm.userType === "users"}
                            onChange={handleSelectedFormChange}
                            className="w-4 h-4 text-blue-500 border-gray-300 rounded focus:ring-blue-500"
                          />
                          <span className="ml-2 text-sm font-medium">Users</span>
                        </label>

                        <label className="flex items-center">
                          <input
                            type="radio"
                            name="userType"
                            value="companies"
                            checked={selectedForm.userType === "companies"}
                            onChange={handleSelectedFormChange}
                            className="w-4 h-4 text-blue-500 border-gray-300 rounded focus:ring-blue-500"
                          />
                          <span className="ml-2 text-sm font-medium">Companies</span>
                        </label>
                      </div>

                      <div className="w-full mt-4">
                        <label className="block text-sm font-medium mb-2">
                          Selected {selectedForm.userType === "users" ? "Users" : "Companies"}
                        </label>
                        {selectedForm.userType === "users" ? (
                          <select
                            name="selectedField"
                            value={selectedForm.selectedUser}
                            onChange={handleSelectedFormChange}
                            className={`w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#013D29] ${currentTheme === "dark" ? "bg-[#404040] text-white" : "bg-white"}`}
                          >
                            {filterUser?.map((user) => (
                              <option key={user._id} value={user.fcmToken}>
                                {user.username}
                              </option>
                            ))}
                          </select>
                        ) : (
                          <select
                            className={`w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#013D29] ${currentTheme === "dark" ? "bg-[#404040] text-white" : "bg-white"}`}
                            name="selectedField"
                            value={selectedForm.selectedCompany}
                            onChange={handleSelectedFormChange}
                          >
                            {filterCompany?.map((company)=>(
                              <option key={company._id} value={company.fcmToken}>
                                {company.companyName}
                                </option>
                            ))
                          }
                          </select>
                        )}
                      </div>

                      <div className={`w-full mt-2 ${currentTheme === "dark" ? "bg-[#404040] text-white" : "bg-white"} p-2`}>
                        <form onSubmit={handleSingleSubmit} className="space-y-4">
                          <div>
                            <label className="block font-medium">Title</label>
                            <input
                              type="text"
                              name="title"
                              value={formData.title}
                              onChange={handleChange}
                              placeholder="Enter title"
                              className={`w-full mt-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#013D29] ${currentTheme === "dark" ? "text-white bg-[#404040]" : "text-black bg:white"}`}
                              required
                            />
                          </div>

                          <div>
                            <label className="block font-medium">Body</label>
                            <input
                              name="body"
                              value={formData.body}
                              onChange={handleChange}
                              placeholder="Enter body text"
                              className={`w-full mt-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#013D29] ${currentTheme === "dark" ? "text-white bg-[#404040]" : "text-black bg:white"}`}
                              rows="4"
                              required
                            ></input>
                          </div>

                          <button
                            type="submit"
                            className={`w-full px-4 py-2 rounded  ${currentTheme === 'dark' ? 'text-white bg-[#404040]' : 'text-black bg-[#F0FFF8]'} border border-gray-300`}
                          >
                            Send Notification
                          </button>
                        </form>
                      </div>
                    </div>
                  )}




                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default SendNotification;
