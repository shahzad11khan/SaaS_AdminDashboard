

import { EditForm } from "./EditForm"
import { FileUpload } from "./FileUpload"
import Navbar from "../../Navbar/Navbar"



 const Profile = () => {

  return (
    <>
    <Navbar/>
    <div className="   flex justify-center  pt-[35px]  bg-[#8bfabb] h-[570px]">
      <div className=" bg-white relative w-[450px] h-[500px] flex flex-col justify-between pb-5  rounded-lg  overflow-hidden ">
      <div>
      <div className="px-5 flex justify-between items-end  outfit ">
          <h1 className="text-[40px] ">Profile</h1>
          <div className="flex gap-10">
          <p className="cursor-pointer text-[#219653] font-bold h-[40px]">LogOut</p>
          </div>
        </div>
        <div className="flex justify-center pt-5">  
          <FileUpload className  />
        </div>
      </div>

        <EditForm  /> 
      </div>
    </div>  
    </>
  )
}

export default Profile