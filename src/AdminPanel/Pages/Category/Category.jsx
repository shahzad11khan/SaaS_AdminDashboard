import { Link, useNavigate } from "react-router-dom";
import LeftSideBar from "../../LeftSideBar/LeftSideBar";
import Navbar from "../../Navbar/Navbar";
import { useSelector, useDispatch } from "react-redux";
import GenericTable from "../../Components/Table/GenericTable";
import { fetchCategories } from "../../Slice/CategorySlice";
import DeleteModal from "../../Components/DeleteModal";
import { useState, useEffect } from "react";
import { baseUri } from "../../Components/api/baseUri";
import { Category_Middle_Point } from "../../Components/api/middlePoints";
import { Category_End_Point } from "../../Components/api/endPoint";
import fetchData from "../../Components/api/axios";
import { toast } from "react-toastify";

const Category = () => {
  const navigate = useNavigate();

    let {token , userId} = useSelector(state => state.authenticate);
    useEffect(() => {
      if (!token) {
        toast.error("Login first");
        setTimeout(() => navigate('/'), 1000);
      }
    }, [token, navigate]);
    
      
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [rowToShow, setRowsToShow] = useState(5);
  const [searchQuery, setSearchQuery] = useState("");
  const [initialCount, setInitialCount] = useState(0);
  const [deleteId,setDeleteId]=useState(null);


  const currentTheme = useSelector((state) => state.theme.theme);
  const dispatch = useDispatch();
  const { data: categoryData} = useSelector(
    (state) => state.categories
  );
  const {companyId} = useSelector((state) => state.selectedCompany);

  const showNext = () => {
    if (initialCount + rowToShow < filteredData.length) {
        setInitialCount(initialCount + rowToShow);
    }
};

const showPrevious = () => {
    if (initialCount - rowToShow >= 0) {
        setInitialCount(initialCount - rowToShow);
    }
};

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);
  

  const handleRowChange = (e) => {
    setRowsToShow(parseInt(e.target.value, 10));
  };

  const handleSearchQuery = (e) => {
    setSearchQuery(e.target.value.toLowerCase());
  };

  const handleDelete = (item) => {
    setDeleteId(item._id)
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async() =>{
    const url = baseUri + Category_Middle_Point + Category_End_Point + "/" + deleteId;
    const method ="Delete";
    const response = await fetchData(url ,method);
    setIsDeleteModalOpen(false);

     toast.success(response.data.message)
     dispatch(fetchCategories());

 }

  const handleEdit = (item) => {
    routerSystemSettingDetail("edit",item)
  };
   const routerSystemSettingDetail = (state , category)=>{
    const path = `/category-registration-form`;
    const data = {state,category}
    navigate(path ,{state:data})
   }
   console.log(categoryData)
   console.log("Type of categoryData:", typeof categoryData);
   let companyCategory = companyId ?
    categoryData?.filter(item => companyId  === item.userId?.companyId?._id ) 
    : userId?
    categoryData?.filter(item => userId  === item.userId?.companyId?._id ) 
    :
    categoryData ;
  const filteredData = companyCategory?.filter((category) =>
     category.mainCategory.toLowerCase().includes(searchQuery) || category.subCategory.toLowerCase().includes(searchQuery)
  );
  const displayData = filteredData?.slice(initialCount,initialCount+ rowToShow);
  if(!token) return null;
  return (
    <div>
      {/* navbar */}
      <Navbar />
      <div className="flex flex-col lg:flex-row">
        {/* leftSidebar */}
        <LeftSideBar />
        <div className="flex flex-col lg:ml-10 w-full lg:w-[1000px] gap-3">
          {/* heading */}
          <div className="para">
            <p className={`underline text-xl ${currentTheme === 'dark' ? 'text-white' : 'text-black'}`}>Category Details</p>
          </div>

          <div className="info flex flex-col lg:flex-row justify-between items-center gap-2">
            {/* filter option */}
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
            {/* back and & Category button */}
            <div className="flex gap-2">
              <Link to="/admin">
                <button className={`px-4 py-2 ${currentTheme === 'dark' ? 'bg-[#404040]' : 'bg-[#F0FFF8]'} ${currentTheme === 'dark' ? 'text-white' : 'text-black'} rounded border`}>Back</button>
              </Link>
              <Link to="/category-registration-form">
                <button className={`px-4 py-2 ${currentTheme === 'dark' ? 'bg-[#404040]' : 'bg-[#F0FFF8]'} ${currentTheme === 'dark' ? 'text-white' : 'text-black'} rounded border`}>Add Category</button>
              </Link>
            </div>
          </div>
          {/* table Content */}
          <div className="table-container overflow-x-auto">
            {/* {loading && <Spinner/>} */}
            {/* {error && <p>Error: {error}</p>} */}
            <GenericTable
              headers={['Sno', 'mainCategory' ,'subCategory', 'createdAt', 'updatedAt', 'Actions']}
              data={displayData}
              currentTheme={currentTheme}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          </div>
          <div className="pages ">
                        <div className="flex justify-center gap-1">
                            <button
                                onClick={showPrevious}
                                className={`px-4 py-2 ${currentTheme === 'dark' ? 'bg-[#404040]' : 'bg-[#F0FFF8]'} ${currentTheme === 'dark' ? 'text-white' : 'text-black'} rounded border`}
                            >
                                Previous
                            </button>
                            <button className={`px-4 py-2 ${currentTheme === 'dark' ? 'bg-[#404040]' : 'bg-[#F0FFF8]'} ${currentTheme === 'dark' ? 'text-white' : 'text-black'} rounded border`}>
                                {Math.ceil((initialCount + rowToShow) / rowToShow)} of {Math.ceil(filteredData?.length / rowToShow)}
                            </button>
                            <button
                                onClick={showNext}
                                className={`px-4 py-2 ${currentTheme === 'dark' ? 'bg-[#404040]' : 'bg-[#F0FFF8]'} ${currentTheme === 'dark' ? 'text-white' : 'text-black'} rounded border`}
                            >
                                Next
                            </button>
                        </div>
                    </div>
        </div>
        <DeleteModal 
        isOpen={isDeleteModalOpen} 
        onClose={() => setIsDeleteModalOpen(false)}
        confirmDelete={handleConfirmDelete}

        
        />
      </div>
    </div>
  );
};

export default Category;
