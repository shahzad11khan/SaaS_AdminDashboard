import { Link } from "react-router-dom";
import LeftSideBar from "../../LeftSideBar/LeftSideBar"
import Navbar from "../../Navbar/Navbar"
import DeleteModal from '../../Components/DeleteModal';
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { fetchWarehouse } from "../../Slice/WarehouseSlice";
import GenericTable from "../../Components/Table/GenericTable";


const Warehouse = () => {
    const dispatch = useDispatch();
    const { data: warehouseData, loading, error } = useSelector((state) => state.warehouse)
    const currentTheme = useSelector((state => state.theme.theme))
    const [rowToShow, setRowsToShow] = useState(5);
    const [searchQuery, setSearchQuery] = useState("");
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    const handleRowChange = (e) => {
        setRowsToShow(parseInt(e.target.value, 10))
    }
    const handleSearchQuery = (e) => {
        setSearchQuery(e.target.value.toLowerCase());

    }

    const handleEdit = () =>{
        console.log("edit function executed")
    }

    const handleDelete = () =>{
        setIsDeleteModalOpen(true);

    }

    useEffect(() => {
        dispatch(fetchWarehouse());
    }, [dispatch])

    const filterData = warehouseData.filter((warehouse) => {
        return warehouse.warehouse.toLowerCase().includes(searchQuery) ||
            warehouse.location.toLowerCase().includes(searchQuery)
    })

    const displayData = filterData.slice(0, rowToShow)


    return (
        <div>


            <Navbar />
            <div className='flex flex-col lg:flex-row '>
                <LeftSideBar />
                <div className='flex flex-col lg:ml-10 w-full lg:w-[1000px] gap-3 '>
                    <div className="para ">
                        <p className={`underline text-xl ${currentTheme === 'dark' ? 'text-white' : 'text-black'}`}>Warehouse Detail</p>
                    </div>
                    <div className="info flex flex-col lg:flex-row justify-between items-center gap-2">
                        <div className='flex flex-col lg:flex-row gap-2 items-center w-full lg:w-[auto]'>
                            <div className={`flex items-center ${currentTheme === 'dark' ? 'text-white' : 'text-black'} gap-2`}>
                                <span>Show:</span>
                                <select
                                    className={`rounded-md px-4 py-1 ${currentTheme === 'dark' ? 'bg-[#404040]' : 'bg-[#F0FFF8]'} border border-gray-300 focus:outline-none focus:ring focus:ring-[#219b53]`}
                                    onChange={handleRowChange}
                                    value={rowToShow}
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
                                    placeholder="Search by Warehouse name & Location"
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

                            <Link to="/warehouse-registration-form">
                                <button className={`px-4 py-2 ${currentTheme === 'dark' ? 'bg-[#404040]' : 'bg-[#F0FFF8]'} ${currentTheme === 'dark' ? 'text-white' : 'text-black'}  rounded  border`}>
                                    Add Warehouse
                                </button>
                            </Link>
                        </div>
                    </div>
                    <div className="table-container overflow-x-auto">
                    {loading && <p>Loading...</p>}
                    {error && <p>Error: {error}</p>}
                        <GenericTable
                        headers={['SNo' ,'warehouse' ,'location' , 'manager' , 'createdAt', 'updatedAt']}
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

export default Warehouse
