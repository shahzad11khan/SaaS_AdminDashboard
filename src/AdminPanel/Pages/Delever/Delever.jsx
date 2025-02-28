import LeftSideBar from "../../LeftSideBar/LeftSideBar"
import Navbar from "../../Navbar/Navbar"
import { useSelector, useDispatch } from 'react-redux';
import DeleteModal from '../../Components/DeleteModal';
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { baseUri } from "../../Components/api/baseUri";
import { Order_Update_End_Point } from "../../Components/api/endPoint";
import { Order_Middle_Point } from "../../Components/api/middlePoints";
import GenericTable from "../../Components/Table/GenericTable";
// import { fetchDelivery } from "../../Slice/DeliverSlice";
import fetchData from "../../Components/api/axios";
import { toast } from "react-toastify";
import { Auth } from "../../../utils/globleAtuhenticate";
import { fetchOrder } from "../../Slice/OrderSlice";


const Delever = () => {
    const { companyId } = useSelector((state) => state.selectedCompany);
    const { userId } = useSelector((state) => state.authenticate);
    const dispatch = useDispatch();
    const [deleteId, setDeleteId] = useState(null); const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const currentTheme = useSelector((state => state.theme.theme))
    const [rowToShow, setRowsToShow] = useState(5);
    const [searchQuery, setSearchQuery] = useState("");
    const [initialCount, setInitialCount] = useState(0);
    const { data: orderData } = useSelector(
        (state) => state.orders
    );
    console.log(orderData)

    const handleRowChange = (e) => {
        const selectedValue = parseInt(e.target.value, 10);
        setRowsToShow(selectedValue)
    }
    const handleSearchQuery = (e) => {
        setSearchQuery(e.target.value.toLowerCase());
    }

    const handleDelete = (item) => {
        setDeleteId(item._id)
        setIsDeleteModalOpen(true);
    };

    const handleConfirmDelete = async () => {
        const url = baseUri + Order_Middle_Point + Order_Update_End_Point + "/" + deleteId;
        const method = "Delete";
        const response = await fetchData(url, method);
        setIsDeleteModalOpen(false);

        toast.success(response.data.message)
        dispatch(fetchOrder());

    }
    const handleEdit = (item) => {
        routerSystemSettingDetail("edit", item)
    };

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


    const navigate = useNavigate();

    const routerSystemSettingDetail = (state, onlineOrder) => {
        const path = `/online-order-form`;
        const data = { state, onlineOrder }
        navigate(path, { state: data })
    }
    useEffect(() => {
        dispatch(fetchOrder());
    }, [dispatch]);

    // console.log(orderData)

    let companyOnlineOrder = companyId ? orderData?.filter(item => companyId === item.userId?.companyId?._id)
        : userId ? orderData?.filter(item => userId === item.userId?.companyId?._id)
            : orderData;
            // console.log(companyOnlineOrder)
    const filterData = companyOnlineOrder?.filter((order) => {

        return order.orderStatus.toLowerCase().includes(searchQuery) &&
        order.orderStatus.toLowerCase()=="delivered"

    })
    const displayData = filterData?.slice(initialCount, initialCount + rowToShow);


    if (!Auth()) return null;
    return (
        <div>


            <Navbar />
            <div className='flex flex-col lg:flex-row '>
                <LeftSideBar />
                <div className='flex flex-col  lg:ml-10 w-full lg:w-[1000px] gap-3 '>
                    <div className="para ">
                        <p className={`underline text-xl ${currentTheme === 'dark' ? 'text-white' : 'text-black'}`}>Delever Orders Details</p>
                    </div>
                    <div className="info flex flex-col lg:flex-row justify-between  items-center gap-2">
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
                                    placeholder="Search"
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

                            <Link to="/delivery-form">
                                <button className={`px-4 py-2 ${currentTheme === 'dark' ? 'bg-[#404040]' : 'bg-[#F0FFF8]'} ${currentTheme === 'dark' ? 'text-white' : 'text-black'}  rounded  border`}>
                                    Add Delivery
                                </button>
                            </Link>
                        </div>

                    </div>
                    <div className="table-container overflow-x-auto">

                        <GenericTable
                            headers={['Sno', 'createdAt', 'orderStatus', 'paymentMethod', 'shippingAddress', 'totalAmount', 'updatedAt', 'Actions']}
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

export default Delever
