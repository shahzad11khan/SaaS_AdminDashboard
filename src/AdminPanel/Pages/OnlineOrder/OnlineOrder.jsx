import { Link, useNavigate } from "react-router-dom";
import LeftSideBar from "../../LeftSideBar/LeftSideBar"
import Navbar from "../../Navbar/Navbar"
import { useSelector, useDispatch } from 'react-redux';
import GenericTable from "../../Components/Table/GenericTable";
import { fetchOrder } from "../../Slice/OrderSlice";
import DeleteModal from '../../Components/DeleteModal';
import { useState, useEffect } from "react";
import { baseUri } from "../../Components/api/baseUri";
import { Order_Update_End_Point } from "../../Components/api/endPoint";
import { Order_Middle_Point } from "../../Components/api/middlePoints";
import fetchData from "../../Components/api/axios";
import { toast } from "react-toastify";
// import jsPDF from "jspdf";
// import "jspdf-autotable";
import { Auth } from "../../../utils/globleAtuhenticate";


const Order = () => {
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [rowToShow, setRowsToShow] = useState(5);
    const [searchQuery, setSearchQuery] = useState("");
    const [initialCount, setInitialCount] = useState(0);
    const currentTheme = useSelector((state => state.theme.theme))
    const { userId } = useSelector((state => state.authenticate))
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [deleteId, setDeleteId] = useState(null);
    const { data: orderData } = useSelector((state) => state.orders)
    const { companyId } = useSelector((state) => state.selectedCompany);

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

    // const handlePrint = (item) =>{
    //     console.log("item data :",item)
    //     const pdfHeaders = ["sNo","Order Status","Payment Method","Shipping Address","Total Amount","createdAt","updatedAt"]

    //     const doc = new jsPDF();
    //     doc.setFontSize(8);

    //             doc.text("User Name ",14,10);
    //             doc.text("Product Name",14,14);
    //             doc.text("Tell : ",14,18);
    //             doc.text("Email",14,22);

    //             doc.text("Invoice",150,10);
    //             doc.text("Printed At: " + new Date().toLocaleDateString(), 150, 14);
    //             doc.text("Printed by",150,18)

        
    //             const tableHeader =pdfHeaders.map((header)=>header);
    //             const tableData = [
    //                 [
    //                     1,
    //                     item.orderStatus || "N/A",
    //                     item.paymentMethod || "N/A",
    //                     item.shippingAddress || "N/A",
    //                     item.totalAmount || "N/A",
    //                     item.createdAt ? item.createdAt.split("T")[0] : "N/A",
    //                     item.updatedAt ? item.updatedAt.split("T")[0] : "N/A",
    //                 ]
    //             ];
        
    //             doc.autoTable({
    //                 head:[tableHeader],
    //                 body:tableData,
    //                 startY:30,
                 
    //             });
        
    //             doc.save("OrderDetail.pdf")


    // }
    const handlePrint=(item)=>{
        goToInvoicePage(item)

    }
    const goToInvoicePage = (item) => {
        const path = `/print-order-data`;
        console.log(item)
        navigate(path, { state: { item } }); 
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

    const routerSystemSettingDetail = (state, onlineOrder) => {
        const path = `/online-order-form`;
        const data = { state, onlineOrder }
        navigate(path, { state: data })
    }
    useEffect(() => {
        dispatch(fetchOrder());
    }, [dispatch]);

    let companyOnlineOrder = companyId ? orderData?.filter(item => companyId === item.userId?.companyId?._id)
        : userId ? orderData?.filter(item => userId === item.userId?.companyId?._id)
            : orderData;
    const filterData = companyOnlineOrder?.filter((order) => {

        return order.orderStatus.toLowerCase().includes(searchQuery) &&
        order.orderStatus.toLowerCase()!=="delivered"

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
                        <p className={`underline text-xl ${currentTheme === 'dark' ? 'text-white' : 'text-black'}`}>Online Order Details</p>
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
                                    <option value={1}>01</option>
                                    <option value={2}>02</option>
                                    <option value={3}>03</option>
                                    <option value={4}>04</option>
                                    <option value={5}>05</option>
                                    <option value={6}>06</option>
                                    <option value={7}>07</option>
                                    <option value={8}>08</option>
                                    <option value={9}>09</option>
                                    <option value={10}>10</option>
                                </select>
                            </div>
                            <div className={`flex items-center ${currentTheme === 'dark' ? 'text-white' : 'text-black'} gap-2`}>

                                <span >Entries :</span>
                                <input
                                    type="text"
                                    placeholder="Search by Order Status"
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
                        </div>

                    </div>
                    <div className="table-container overflow-x-auto">



                        <GenericTable
                            headers={['Sno', 'createdAt', 'orderStatus', 'paymentMethod', 'shippingAddress', 'totalAmount', 'updatedAt', 'Action']}
                            data={displayData}
                            currentTheme={currentTheme}
                            onEdit={handleEdit}
                            onDelete={handleDelete}
                            onPrint={handlePrint}

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

export default Order
