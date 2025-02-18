import { Link } from "react-router-dom";
import LeftSideBar from "../../LeftSideBar/LeftSideBar"
import Navbar from "../../Navbar/Navbar"
import { useSelector, useDispatch } from 'react-redux';
import GenericTable from "../../Components/Table/GenericTable";
import { fetchOrder } from "../../Slice/OrderSlice";
import { useState, useEffect } from "react";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { Auth } from "../../../utils/globleAtuhenticate";


const RegisteredOnlineOrder = () => {
    const [rowToShow, setRowsToShow] = useState(5);
    const [searchQuery, setSearchQuery] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");


    const currentTheme = useSelector((state => state.theme.theme))
    const dispatch = useDispatch();
    const { data: orderData, loading, error } = useSelector((state) => state.orders)


    const handleRowChange = (e) => {
        const selectedValue = parseInt(e.target.value, 10);
        setRowsToShow(selectedValue)
    }
    const handleSearchQuery = (e) => {
        setSearchQuery(e.target.value.toLowerCase());
    }



    useEffect(() => {
        dispatch(fetchOrder());

    }, [dispatch]);

    const pdfHeaders = ["SNo", "Created At", "Order Status", "Payment Method", "Shipping Address", "Total Amount"]

    const handlePrint = () => {
        const doc = new jsPDF();

        doc.text("Company Name", 14, 8);
        doc.text("Online Orders", 14, 15);

        const tableHeaders = pdfHeaders.map(header => header.toUpperCase());

        const tableData = displayData.map((order, index) => [
            index + 1,
            order.createdAt.split("T")[0],
            order.orderStatus,
            order.paymentMethod,
            order.shippingAddress,
            order.totalAmount
        ]);

        doc.autoTable({
            head: [tableHeaders],
            body: tableData,
            startY: 20
        });


        doc.save("OnlineOrders.pdf");
    };



    const filterData = orderData?.data?.filter((order) => {
        const orderDate = new Date(order.createdAt.split("T")[0]);
        const start = new Date(startDate);
        const end = new Date(endDate);
        const dateRange = (!startDate || orderDate >= start) && (!endDate || orderDate <= end);

        const matchSearchQuery = order.orderStatus.toLowerCase().includes(searchQuery)
        return dateRange & matchSearchQuery;

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
                        <p className={`underline text-xl ${currentTheme === 'dark' ? 'text-white' : 'text-black'}`}>Online Order Details</p>
                    </div>
                    <div className="info flex flex-col lg:flex-row justify-between  items-center gap-2">
                        <div className='flex flex-col lg:flex-row gap-2 items-center w-full lg:w-[auto]'>
                            <div className={`flex items-center ${currentTheme === 'dark' ? 'text-white' : 'text-black'} gap-2`}>
                                <span>Show:</span>
                                <select
                                    className={`rounded-md px-1 py-1 ${currentTheme === 'dark' ? 'bg-[#404040]' : 'bg-[#F0FFF8]'} border border-gray-300 focus:outline-none focus:ring focus:ring-[#219b53]`}
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
                                    className={`w-44 rounded-md px-1 py-1 ${currentTheme === 'dark' ? 'bg-[#404040]' : 'bg-[#F0FFF8]'} border border-gray-300 focus:outline-none focus:ring focus:ring-[#219b53]`}
                                    onChange={handleSearchQuery}
                                />
                            </div>
                            <div className={`flex items-center ${currentTheme === 'dark' ? 'text-white' : 'text-black'} gap-2`}>
                                <label htmlFor="startDate">S.Date:</label>
                                <input
                                    name='startDate'
                                    type="date"
                                    placeholder="Start Date"
                                    className={`w-8 lg:w-32 rounded-md px-1 py-1 ${currentTheme === 'dark' ? 'bg-[#404040]' : 'bg-[#F0FFF8]'} border border-gray-300 focus:outline-none focus:ring focus:ring-[#219b53]`}
                                    value={startDate}
                                    onChange={(e) => setStartDate(e.target.value)}
                                />
                                <label htmlFor="endDate">E.Date:</label>
                                <input
                                    name='endDate'
                                    type="date"
                                    placeholder="End Date"
                                    className={`w-8 lg:w-32 rounded-md px-1 py-1 ${currentTheme === 'dark' ? 'bg-[#404040]' : 'bg-[#F0FFF8]'} border border-gray-300 focus:outline-none focus:ring focus:ring-[#219b53]`}
                                    value={endDate}
                                    onChange={(e) => setEndDate(e.target.value)}
                                />

                                <button
                                    onClick={() => {
                                        setStartDate('');
                                        setEndDate('');
                                    }}
                                    className={`px-1 py-1 ${currentTheme === 'dark' ? 'bg-[#404040]' : 'bg-[#F0FFF8]'} ${currentTheme === 'dark' ? 'text-white' : 'text-black'} rounded border`}
                                >
                                    Reset
                                </button>
                            </div>
                        </div>
                        <div className='flex gap-2'>
                            <Link to="/admin">
                                <button className={`px-2 py-1 ${currentTheme === 'dark' ? 'bg-[#404040]' : 'bg-[#F0FFF8]'} ${currentTheme === 'dark' ? 'text-white' : 'text-black'}  rounded  border`}>
                                    Back
                                </button>
                            </Link>


                            <button
                                onClick={handlePrint}
                                className={`px-2 py-1 ${currentTheme === 'dark' ? 'bg-[#404040]' : 'bg-[#F0FFF8]'} ${currentTheme === 'dark' ? 'text-white' : 'text-black'}  rounded  border`}>
                                Print
                            </button>

                        </div>

                    </div>
                    <div className="table-container overflow-x-auto">


                        {loading && <p>Loading...</p>}
                        {error && <p>Error: {error}</p>}
                        <GenericTable
                            headers={['Sno', 'createdAt', 'orderStatus', 'paymentMethod', 'shippingAddress', 'totalAmount', 'updatedAt']}
                            data={displayData}
                            currentTheme={currentTheme}


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


            </div>

        </div>
    )
}

export default RegisteredOnlineOrder
