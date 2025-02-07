import { useState } from "react";
import Navbar from "../../Navbar/Navbar";
import LeftSideBar from "../../LeftSideBar/LeftSideBar";
import { useSelector } from 'react-redux';

const ByHandRegistrationForm = () => {
  const currentTheme = useSelector((state) => state.theme.theme);

  const [productRows, setProductRows] = useState([
    { id: 1, productName: "", quantity: "1", productPrice: "" },
  ]);

  const [formData, setFormData] = useState({
    customerTotalPrice: "",
    username: "",
    userAddress: "",
  });

  const handleProductChange = (id, e) => {
    const { name, value } = e.target;
    const updatedRows = productRows.map((row) =>
      row.id === id ? { ...row, [name]: value } : row
    );
    setProductRows(updatedRows);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };


  const addProductRow = () => {
    if (productRows.length < 3) {
      const newRow = {
        id: productRows.length + 1, 
        productName: "",
        quantity: "1",
        productPrice: "",
      };
      setProductRows([...productRows, newRow]);
    } 
  };


  const removeProductRow = (id) => {
    const updatedRows = productRows.filter((row) => row.id !== id);
    setProductRows(updatedRows);
  };

 
  const handleSubmit = (e) => {
    e.preventDefault();

    const orderData = {
      products: productRows,
      customerTotalPrice: formData.customerTotalPrice,
      username: formData.username,
      userAddress: formData.userAddress,
    };

    console.log("Order Submitted:", orderData);
    alert("Order registered successfully!");

    setProductRows([{ id: 1, productName: "", quantity: "1", productPrice: "" }]);
    setFormData({
      customerTotalPrice: "",
      username: "",
      userAddress: "",
    });
  };

  return (
    <>
      <Navbar />
      <div className="flex flex-col lg:flex-row">
        <LeftSideBar />
        <div className={`flex flex-col items-center lg:ml-10 w-full lg:w-[1000px] h-screen ${currentTheme === 'dark' ? 'text-white' : 'text-gray-600'}`}>
          <form
            onSubmit={handleSubmit}
            className={`${currentTheme === 'dark' ? 'bg-[#404040]' : 'bg-white'} mt-5 shadow-lg rounded-lg p-6 w-full lg:w-[800px] border border-gray-300`}
          >
            <h2 className={`text-2xl font-bold mb-6 text-center ${currentTheme === 'dark' ? 'text-white' : 'text-gray-700'}`}>
              Order Registration
            </h2>

            <div className="flex justify-end lg:mb-[10px]">
              <button
                type="button"
                onClick={addProductRow}
                className={`px-2 py-1 rounded ${currentTheme === 'dark' ? 'text-white' : 'text-black'} ${currentTheme === 'dark' ? 'bg-[#404040]' : 'bg-[#F0FFF8]'} border border-gray-300`}
                disabled={productRows.length === 3} 
              >
                Add Order
              </button>
            </div>

            {productRows.map((row, index) => (
              <div key={row.id} className="flex flex-col lg:flex-row justify-between mt-5">
                <div className="w-full lg:w-[220px]">
                  <label htmlFor={`productName-${row.id}`} className="block text-sm font-medium">
                    Product Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    name="productName"
                    id={`productName-${row.id}`}
                    placeholder="Enter Product Name"
                    value={row.productName}
                    onChange={(e) => handleProductChange(row.id, e)}
                    className={`w-full mt-2 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#013D29] ${currentTheme === "dark" ? "text-white" : "text-black"
                      } ${currentTheme === "dark" ? "bg-[#404040]" : "white]"}`}
                    required
                  />
                </div>

                <div className="w-full lg:w-[220px] lg:px-1">
                  <label htmlFor={`quantity-${row.id}`} className="block text-sm font-medium">
                    Quantity <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    name="quantity"
                    placeholder="Enter Product Quantity"
                    min="1"
                    id={`quantity-${row.id}`}
                    value={row.quantity}
                    onChange={(e) => handleProductChange(row.id, e)}
                    className={`w-full mt-2 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#013D29] ${currentTheme === 'dark' ? 'text-white bg-[#404040]' : 'text-black bg-white'
                      }`}
                    required
                  />
                </div>

                <div className="w-full lg:w-[220px]">
                  <label htmlFor={`productPrice-${row.id}`} className="block text-sm font-medium">
                    Product Price <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    name="productPrice"
                    id={`productPrice-${row.id}`}
                    placeholder="Enter Product Price"
                    min="0"
                    value={row.productPrice}
                    onChange={(e) => handleProductChange(row.id, e)}
                    className={`w-full mt-2 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#013D29] ${currentTheme === "dark" ? "text-white" : "text-black"
                      } ${currentTheme === "dark" ? "bg-[#404040]" : "white]"}`}
                    required
                  />
                </div>

                {index > 0 && ( 
                  <div className="flex items-center mt-7">
                    <button
                      type="button"
                      onClick={() => removeProductRow(row.id)}
                      className={`ms-2 px-2 py-1 rounded ${currentTheme === 'dark' ? 'text-white' : 'text-black'} ${currentTheme === 'dark' ? 'bg-[#404040]' : 'bg-[#F0FFF8]'} border border-gray-300`}
                    >
                      Remove
                    </button>
                  </div>
                )}
              </div>
            ))}

            <div className="flex flex-col lg:flex-row justify-between mt-5">
              <div className="w-full lg:w-[250px]">
                <label htmlFor="customerTotalPrice" className="block text-sm font-medium">
                  Total Price <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  name="customerTotalPrice"
                  id="customerTotalPrice"
                  placeholder="Customer Total Price"
                  min="0" 
                  value={formData.customerTotalPrice}
                  onChange={handleChange}
                  className={`w-full mt-2 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#013D29] ${currentTheme === 'dark' ? 'text-white bg-[#404040]' : 'text-black bg-white'
                    }`}
                  required
                />
              </div>

              <div className="w-full lg:w-[250px] lg:px-2">
                <label htmlFor="username" className="block text-sm font-medium">
                  User Name
                </label>
                <input
                  type="text"
                  name="username"
                  id="username"
                  value={formData.username}
                  onChange={handleChange}
                  className={`w-full mt-2 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#013D29] ${currentTheme === 'dark' ? 'text-white' : 'text-black'} ${currentTheme === 'dark' ? 'bg-[#404040]' : 'white]'}`}
                  placeholder="User name"
                />
              </div>

              <div className="w-full lg:w-[250px]">
                <label htmlFor="userAddress" className="block text-sm font-medium">
                  User Address
                </label>
                <input
                  type="text"
                  name="userAddress"
                  id="userAddress"
                  value={formData.userAddress}
                  onChange={handleChange}
                  className={`w-full mt-2 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#013D29] ${currentTheme === 'dark' ? 'text-white' : 'text-black'} ${currentTheme === 'dark' ? 'bg-[#404040]' : 'white]'}`}
                  placeholder="User Address"
                />
              </div>
            </div>

            <div className="flex justify-end mt-6">
              <button
                type="submit"
                className={`px-4 py-2 rounded ${currentTheme === 'dark' ? 'text-white' : 'text-black'} ${currentTheme === 'dark' ? 'bg-[#404040]' : 'bg-[#F0FFF8]'} border border-gray-300`}
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

export default ByHandRegistrationForm;