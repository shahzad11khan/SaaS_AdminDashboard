import { Link, useNavigate } from "react-router-dom";
import LeftSideBar from "../../LeftSideBar/LeftSideBar";
import Navbar from "../../Navbar/Navbar";
import DeleteModal from "../../Components/DeleteModal";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { fetchTag } from "../../Slice/TagSlice";
import GenericTable from "../../Components/Table/GenericTable";


const Tags = () => {

    const dispatch = useDispatch();
    const currentTheme = useSelector((state => state.theme.theme))
    const { data: tagData, error, loading } = useSelector((state) => state.tags)

    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [rowToShow, setRowsToShow] = useState(5);
    const [searchQuery, setSearchQuery] = useState("");
    const { companyId } = useSelector((state) => state.selectedCompany);

    const handleRowChange = (e) => {
        setRowsToShow(parseInt(e.target.value, 10));
    }

    const handleSearchQuery = (e) => {
        setSearchQuery(e.target.value.toLowerCase());
    }




    const handleEdit = (item) => {
        routerSystemSettingDetail("edit", item)
    };
    const navigate = useNavigate();
    const routerSystemSettingDetail = (state, tag) => {
        const path = `/tag-registration-form`;
        const data = { state, tag }
        navigate(path, { state: data })

    }
    const handleDelete = () => {
        setIsDeleteModalOpen(true);
    }

    useEffect(() => {
        dispatch(fetchTag());
    }, [dispatch]);
    let companyTags = companyId ? tagData.filter(item => companyId === item.userId?.companyId?._id) : tagData;
    const filterData = companyTags.filter((tag) => {
        return tag.description.toLowerCase().includes(searchQuery) ||
            tag.tagNumber.toLowerCase().includes(searchQuery)
    })
    const displayData = filterData?.slice(0, rowToShow)

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

                    <div className="pages flex justify-center gap-1 mt-4">


                        <button className={`px-4 py-2 ${currentTheme === 'dark' ? 'bg-[#404040]' : 'bg-[#F0FFF8]'} ${currentTheme === 'dark' ? 'text-white' : 'text-black'}  rounded  border`}>
                            Previous
                        </button>
                        <button className={`px-4 py-2 ${currentTheme === 'dark' ? 'bg-[#404040]' : 'bg-[#F0FFF8]'} ${currentTheme === 'dark' ? 'text-white' : 'text-black'}  rounded  border`}>
                            1 of 1
                        </button>
                        <button className={`px-4 py-2 ${currentTheme === 'dark' ? 'bg-[#404040]' : 'bg-[#F0FFF8]'} ${currentTheme === 'dark' ? 'text-white' : 'text-black'}  rounded  border`}>
                            Next
                        </button>

                    </div>
                </div>
                <DeleteModal
                    isOpen={isDeleteModalOpen}
                    onClose={() => setIsDeleteModalOpen(false)}
                />

            </div>

        </div>
    )
}

export default Tags
