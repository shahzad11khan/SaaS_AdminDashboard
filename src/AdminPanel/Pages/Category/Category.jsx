import { Link } from "react-router-dom";
import LeftSideBar from "../../LeftSideBar/LeftSideBar";
import Navbar from "../../Navbar/Navbar";
import { useSelector, useDispatch } from "react-redux";
import GenericTable from "../../Components/Table/GenericTable";
import { fetchCategories } from "../../Slice/CategorySlice";
import DeleteModal from "../../Components/DeleteModal";
import { useState, useEffect } from "react";

const Category = () => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [rowToShow, setRowsToShow] = useState(5);
  const [searchQuery, setSearchQuery] = useState("");

  const currentTheme = useSelector((state) => state.theme.theme);
  const dispatch = useDispatch();
  const { data: categoryData, loading, error } = useSelector(
    (state) => state.categories
  );

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);
  

  const handleRowChange = (e) => {
    setRowsToShow(parseInt(e.target.value, 10));
  };

  const handleSearchQuery = (e) => {
    setSearchQuery(e.target.value.toLowerCase());
  };

  const handleDelete = () => {
    setIsDeleteModalOpen(true);
  };

  const handleEdit = () => {
    console.log("Edit Function Clicked");
  };

  const filteredData = categoryData.filter((category) =>{
    console.log(categoryData)
    return category.mainCategory.toLowerCase().includes(searchQuery) ||
    category.subCategory.toLowerCase().includes(searchQuery)
    
  }
  );
  const displayData = filteredData.slice(0, rowToShow);

  return (
    <div>
      <Navbar />
      <div className="flex flex-col lg:flex-row">
        <LeftSideBar />
        <div className="flex flex-col lg:ml-10 w-full lg:w-[1000px] gap-3">
          <div className="para">
            <p className={`underline text-xl ${currentTheme === 'dark' ? 'text-white' : 'text-black'}`}>Category Details</p>
          </div>
          <div className="info flex flex-col lg:flex-row justify-between items-center gap-2">
            <div className="flex flex-col lg:flex-row gap-2 items-center w-full lg:w-auto">
              <div className={`flex items-center ${currentTheme === 'dark' ? 'text-white' : 'text-black'} gap-2`}>
                <span>Show:</span>
                <select
                  className={`rounded-md px-4 py-1 ${currentTheme === 'dark' ? 'bg-[#404040]' : 'bg-[#F0FFF8]'} border border-gray-300`}
                  value={rowToShow}
                  onChange={handleRowChange}
                >
                  {[...Array(10).keys()].map(num => (
                    <option key={num + 1} value={num + 1}>{num + 1}</option>
                  ))}
                </select>
              </div>
              <div className={`flex items-center ${currentTheme === 'dark' ? 'text-white' : 'text-black'} gap-2`}>
                <span>Entries:</span>
                <input
                  type="text"
                  placeholder="Search by Main Category & Sub-Category"
                  className={`rounded-md px-4 py-1 ${currentTheme === 'dark' ? 'bg-[#404040]' : 'bg-[#F0FFF8]'} border border-gray-300`}
                  onChange={handleSearchQuery}
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Link to="/admin">
                <button className={`px-4 py-2 ${currentTheme === 'dark' ? 'bg-[#404040]' : 'bg-[#F0FFF8]'} text-black rounded border`}>Back</button>
              </Link>
              <Link to="/category-registration-form">
                <button className={`px-4 py-2 ${currentTheme === 'dark' ? 'bg-[#404040]' : 'bg-[#F0FFF8]'} text-black rounded border`}>Add Category</button>
              </Link>
            </div>
          </div>
          <div className="table-container overflow-x-auto">
            {loading && <p>Loading...</p>}
            {error && <p>Error: {error}</p>}
            <GenericTable
              headers={['Sno', 'mainCategory' ,'subCategory', 'createdAt', 'updatedAt', 'Actions']}
              data={displayData}
              currentTheme={currentTheme}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          </div>
          <div className="pages flex justify-center gap-1 mt-4">
            <button className="px-4 py-2 bg-[#F0FFF8] text-black rounded border">Previous</button>
            <button className="px-4 py-2 bg-[#F0FFF8] text-black rounded border">1 of 1</button>
            <button className="px-4 py-2 bg-[#F0FFF8] text-black rounded border">Next</button>
          </div>
        </div>
        <DeleteModal isOpen={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)} />
      </div>
    </div>
  );
};

export default Category;
