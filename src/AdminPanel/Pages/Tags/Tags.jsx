import { Link, useNavigate } from "react-router-dom";
import LeftSideBar from "../../LeftSideBar/LeftSideBar";
import Navbar from "../../Navbar/Navbar";
import DeleteModal from "../../Components/DeleteModal";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { fetchTag } from "../../Slice/TagSlice";
import GenericTable from "../../Components/Table/GenericTable";
import { baseUri } from "../../Components/api/baseUri";
import { Tag_Middle_Point } from "../../Components/api/middlePoints";
import { Tag_End_Point } from "../../Components/api/endPoint";
import fetchData from "../../Components/api/axios";
import { toast } from "react-toastify";
import { Auth } from "../../../utils/globleAtuhenticate";


const Tags = () => {
    

    const dispatch = useDispatch();
    const currentTheme = useSelector((state => state.theme.theme))
    const { data: tagData, error, loading } = useSelector((state) => state.tags)
    const [deleteId,setDeleteId]=useState(null);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [rowToShow, setRowsToShow] = useState(5);
    const [searchQuery, setSearchQuery] = useState("");
    const [initialCount, setInitialCount] = useState(0);

    const { companyId } = useSelector((state) => state.selectedCompany);

    const handleRowChange = (e) => {
        setRowsToShow(parseInt(e.target.value, 10));
    }

    const handleSearchQuery = (e) => {
        setSearchQuery(e.target.value.toLowerCase());
    }

    const showNext = () => {
        if (initialCount + rowToShow < filterData.length) {
            setInitialCount(initialCount + rowToShow);
        }
    };
    
    const showPrevious = () => {
        if (initialCount - rowToShow >= 0) {
            setInitialCount(initialCount - rowToShow);
        }
    };


    const handleEdit = (item) => {
        routerSystemSettingDetail("edit", item)
    };
    const navigate = useNavigate();

    const routerSystemSettingDetail = (state, tag) => {
        const path = `/tag-registration-form`;
        const data = { state, tag }
        navigate(path, { state: data })
    }
    const handleDelete = (item) => {
        setIsDeleteModalOpen(true);
        setDeleteId(item._id)        
    }

    const handleConfirmDelete = async() =>{
        const url = baseUri + Tag_Middle_Point + Tag_End_Point + "/" + deleteId;
        const method ="Delete";
        const response = await fetchData(url ,method);
        setIsDeleteModalOpen(false);
    
         toast.success(response.data.message)
         dispatch(fetchTag());
    
     }

    useEffect(() => {
        dispatch(fetchTag());
    }, [dispatch]);
    console.log(tagData)
    let companyTags = companyId ? tagData?.data.filter(item => companyId === item.userId?.companyId?._id) : tagData.data;
    console.log(companyTags)
    const filterData = companyTags?.filter((tag) => {
        return tag.description.toLowerCase().includes(searchQuery) ||
            tag.tagNumber.toLowerCase().includes(searchQuery)
    })
    const displayData = filterData?.slice(0, rowToShow)

    if(!Auth()) return null;
    return (

        <div>
            <Navbar />
            <div className='flex flex-col lg:flex-row '>
                <LeftSideBar />
                <div className='flex flex-col  lg:ml-10 w-full lg:w-[1000px] gap-3 '>
                    <div className="para ">
                        <p className={`underline text-xl ${currentTheme === 'dark' ? 'text-white' : 'text-black'}`}>Tag</p>
                    </div>
                    <div className="info flex flex-col lg:flex-row justify-between  items-center gap-2">
                        <div className='flex flex-col lg:flex-row gap-2 items-center w-full lg:w-[auto]'>
                            <div className={`flex items-center ${currentTheme === 'dark' ? 'text-white' : 'text-black'} gap-2`}>
                                <span>Show:</span>
                                <select
                                    className={`rounded-md px-4 py-1 ${currentTheme === 'dark' ? 'bg-[#404040]' : 'bg-[#F0FFF8]'} border border-gray-300 focus:outline-none focus:ring focus:ring-[#219b53]`}
                                    value={rowToShow}
                                    onChange={handleRowChange}
                                >
                                    {[...Array(10).keys()].map(num => (
                                        <option key={num + 1} value={num + 1}>{num + 1}</option>
                                    ))}
                                </select>
                            </div>
                            <div className={`flex items-center ${currentTheme === 'dark' ? 'text-white' : 'text-black'} gap-2`}>

                                <span >Entries :</span>
                                <input
                                    type="text"
                                    placeholder="Search by Tag Name & Description"
                                    className={`rounded-md px-4 py-1 ${currentTheme === 'dark' ? 'bg-[#404040]' : 'bg-[#F0FFF8]'} border border-gray-300 focus:outline-none focus:ring focus:ring-[#219b53]`}
                                    onChange={handleSearchQuery}
                                />
                            </div>
                        </div>
                        <div className='flex gap-2'>
                            <Link to="/admin">
                                <button className={`px-4 py-2 ${currentTheme === 'dark' ? 'bg-[#404040]' : 'bg-[#F0FFF8]'} ${currentTheme === 'dark' ? 'text-white' : 'text-black'}  rounded  border`}>
                                    Back
                                </button>
                            </Link>

                            <Link to="/tag-registration-form">
                                <button className={`px-4 py-2 ${currentTheme === 'dark' ? 'bg-[#404040]' : 'bg-[#F0FFF8]'} ${currentTheme === 'dark' ? 'text-white' : 'text-black'}  rounded  border`}>
                                    Add Tag
                                </button>
                            </Link>
                        </div>
                    </div>
                    <div className="table-container overflow-x-auto">
                        {loading && <p>Loading...</p>}
                        {error && <p>Error: {error}</p>}
                        <GenericTable
                            headers={['Sno', 'tagNumber', 'description', 'createdAt', 'updatedAt', 'Actions']}
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
                                {Math.ceil((initialCount + rowToShow) / rowToShow)} of {Math.ceil(filterData?.length / rowToShow)}
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
    )
}

export default Tags
