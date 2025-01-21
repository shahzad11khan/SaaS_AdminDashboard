import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../Navbar/Navbar";
import LeftSideBar from "../../LeftSideBar/LeftSideBar";

const UserRoleRegistrationForm = () => {
  const [role, setRole] = useState("");
  const [permissions, setPermissions] = useState({
    productManager: {},
    stockManager: {},
    customerManager: {},
    warehouseManager: {},
    repairManager: {},
    tagManager: {},
  });

  const handleRoleChange = (e) => {
    setRole(e.target.value);
  };

  const handlePermissionChange = (manager, permission) => {
    setPermissions((prevPermissions) => ({
      ...prevPermissions,
      [manager]: {
        ...prevPermissions[manager],
        [permission]: !prevPermissions[manager][permission],
      },
    }));
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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted Permissions:", permissions);
    alert("Permissions updated successfully!");
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

  return (
    <>
      <Navbar />
      <div className="flex flex-col lg:flex-row">
        <LeftSideBar />
        <div className="flex flex-col items-center lg:ml-10 w-full lg:w-[1000px]">
          <form
            onSubmit={handleSubmit}
            className="bg-white mt-5 shadow-lg rounded-lg p-6 w-full lg:w-[800px] border border-gray-300"
          >
         <div className="flex justify-between">
      <h2 className="text-2xl font-bold mb-6 text-gray-700">
        User Permissions
      </h2>
      <div className="text-xl mb-6">
        <label htmlFor="role" className="text-lg font-medium text-gray-600">
          Role:
        </label>
        <input
          type="text"
          id="role"
          value={role}
          onChange={handleRoleChange}
          placeholder="Enter role"
          className=" bg-[#F0FFF8] border border-gray-300 focus:outline-none focus:ring focus:ring-[#219b53] mx-2 px-2 py-1 rounded-md "
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
                  className="px-4 py-2 rounded  bg-[#F0FFF8] border border-gray-300"
                >
                  Back
                </button>
              </Link>
              <button
                type="submit"
                className="px-4 py-2 rounded  bg-[#F0FFF8] border border-gray-300"
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
