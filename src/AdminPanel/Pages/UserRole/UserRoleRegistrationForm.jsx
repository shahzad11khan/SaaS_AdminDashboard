import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Navbar from "../../Navbar/Navbar";
import LeftSideBar from "../../LeftSideBar/LeftSideBar";
import { useSelector } from 'react-redux';
import { baseUri } from "../../Components/api/baseUri";
import { Permission_Middle_Point } from "../../Components/api/middlePoints";
import fetchData from "../../Components/api/axios";
import { toast, ToastContainer } from "react-toastify";

const UserRoleRegistrationForm = () => {
  const navigate = useNavigate()

  let {token} = useSelector(state => state.authenticate);
  useEffect(()=>{
    if(!token) {
      toast.error("Login first")
      setTimeout(navigate('/'),1000) 
    }
  } , [token , navigate])
  const location = useLocation()
  const currentTheme = useSelector((state=>state.theme.theme))

  const [permissions, setPermissions] = useState({
    productManager: { all: false, add: false, read: false, edit: false, delete: false },
    stockManager: { all: false, add: false, read: false, edit: false, delete: false },
    customerManager: { all: false, add: false, read: false, edit: false, delete: false },
    warehouseManager: { all: false, add: false, read: false, edit: false, delete: false },
    repairManager: { all: false, add: false, read: false, edit: false, delete: false },
    tagManager: { all: false, add: false, read: false, edit: false, delete: false },
  });
  const [role ,setRole]= useState("");
  const [id , setId] = useState(null)
  const handleRoleChange = (e) => {
    const selectedRole = e.target.value;
    setRole(selectedRole);

  };

  const handlePermissionChange = (manager, permission) => {
    setPermissions((prevPermissions) => {
      const updatedManagerPermissions = {
        ...prevPermissions[manager], 
        [permission]: !prevPermissions[manager][permission],
      };

      if ((permission === "edit" || permission === "delete") && updatedManagerPermissions[permission]) {
        updatedManagerPermissions.read = true; 
      }

      const allPermissions = ["add", "read", "edit", "delete"];
      const allEnabled = allPermissions.every((perm) => updatedManagerPermissions[perm]);
      updatedManagerPermissions.all = allEnabled;

      return {
        ...prevPermissions,
        [manager]: updatedManagerPermissions,
      };
    });
  };

  const handleAllPermissions = (manager) => {
    const allSelected = permissions[manager]?.all;

    setPermissions((prevPermissions) => ({
      ...prevPermissions,
      [manager]: {
        all: !allSelected,
        add: !allSelected,
        read: !allSelected,
        edit: !allSelected,
        delete: !allSelected,
      },
    }));
  };
  const handleSubmit = async(e) => {
    e.preventDefault();
    if (!role) return toast.error('please enter role')
    const URL = baseUri + Permission_Middle_Point+ (location?.state?.state === 'edit' ? `/${id}` : '');
  console.log(URL)
    const method =  location?.state?.state === 'edit'  ? 'PUT' : 'POST';
    const output = {
      parentPermission: role,
      permissions: permissions,
    };
    const response = await fetchData(URL , method , output)
    if(response.status === 200){
      toast.success(response.data.message)
      navigate(-1)
    }else{
      toast.error(response.data.message || response.data.error)
    }
  };

  const roles = [
    "productManager",
    "stockManager",
    "customerManager",
    "warehouseManager",
    "repairManager",
    "tagManager",
  ];

  const roleLabels = {
    productManager: "Product Manager",
    stockManager: "Stock Manager",
    customerManager: "Customer Manager",
    warehouseManager: "Warehouse Manager",
    repairManager: "Repair Manager",
    tagManager: "Tag Manager",
  };

  useEffect(()=>{
    if(location?.state?.role){
      setPermissions(location?.state?.role?.permissions)
      setRole(location.state.role.role)
      setId(location.state.role._id)
    }
  } ,[])
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
      <div className="flex flex-col lg:flex-row">
        <LeftSideBar />
        <div className="flex flex-col items-center lg:ml-10 w-full lg:w-[1000px]">
          <form
            onSubmit={handleSubmit}
            className={`${currentTheme=== 'dark' ?'bg-[#404040]':'bg-white'}  mt-5 shadow-lg rounded-lg p-6 w-full lg:w-[800px]  border border-gray-300`}
          >
            <div className="flex justify-between flex-wrap">
              <h2 className="text-2xl font-bold mb-6 text-gray-700 w-full lg:w-auto">
                User Permissions
              </h2>
              <div className="text-xl mb-6 w-full lg:w-auto">
                <label htmlFor="role" className="text-lg font-medium text-gray-600">
                  Role:
                </label>
                <input
                  name="role"
                  type="text"
                  id="role"
                  value={role}
                  onChange={handleRoleChange}
                  placeholder="Enter role"
                  className="bg-[#F0FFF8] border border-gray-300 focus:outline-none focus:ring focus:ring-[#219b53] mx-2 px-2 py-1 rounded-md w-full sm:w-auto"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              {roles.map((role) => (
                <div
                  key={role}
                  className="bg-[#F0FFF8] p-4 rounded-lg border shadow-md"
                >
                  <h3 className="text-lg font-bold text-gray-700 mb-4">
                    {roleLabels[role]}
                  </h3>
                  <div className="flex flex-wrap gap-4">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={permissions[role]?.all || false}
                        onChange={() => handleAllPermissions(role)}
                        className="mr-2"
                      />
                      All
                    </label>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={permissions[role]?.add || false}
                        onChange={() => handlePermissionChange(role, "add")}
                        className="mr-2"
                      />
                      Add
                    </label>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={permissions[role]?.read || false}
                        onChange={() => handlePermissionChange(role, "read")}
                        className="mr-2"
                      />
                      Read
                    </label>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={permissions[role]?.edit || false}
                        onChange={() => handlePermissionChange(role, "edit")}
                        className="mr-2"
                      />
                      Edit
                    </label>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={permissions[role]?.delete || false}
                        onChange={() => handlePermissionChange(role, "delete")}
                        className="mr-2"
                      />
                      Delete
                    </label>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-end mt-6 gap-4">
              <Link to="/user-role">
                <button
                  type="button"
                  className="px-4 py-2 rounded bg-[#F0FFF8] border border-gray-300"
                >
                  Back
                </button>
              </Link>
              <button
                type="submit"
                className="px-4 py-2 rounded bg-[#F0FFF8] border border-gray-300"
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

export default UserRoleRegistrationForm;
