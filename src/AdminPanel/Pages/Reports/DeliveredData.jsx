import LeftSideBar from "../../LeftSideBar/LeftSideBar"
import Navbar from "../../Navbar/Navbar"
import { useSelector ,useDispatch } from 'react-redux';
import DeleteModal from '../../Components/DeleteModal';
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchOrder } from "../../Slice/OrderSlice";
import GenericTable from "../../Components/Table/GenericTable";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { Auth } from "../../../utils/globleAtuhenticate";



const Delever = () => {
    const dispatch =useDispatch();
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const currentTheme = useSelector((state => state.theme.theme))
    const [rowToShow, setRowsToShow] = useState(5);
    const [searchQuery, setSearchQuery] = useState("")
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [initialCount, setInitialCount] = useState(0);


    const { data: deliverData, loading, error } = useSelector(
        (state) => state.deliver
      );
    const handleRowChange = (e) => {
        setRowsToShow(parseInt(e.target.value, 10))
    }

    const handleSearchQuery = (e) => {
        setSearchQuery(e.target.value.toLoweCase())
    }

    const handleEdit = ()=>{
        console.log("edit function executed")
    }

    const handleDelete = () =>{
     setIsDeleteModalOpen(true)
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


   useEffect(()=>{
    dispatch(fetchOrder())
    // console.log(fetchOrder)
   },[dispatch])

    
   const filterData =deliverData?.filter((deliver)=>{
    const deliverDate = new Date(deliver.createdAt.split("T")[0]);
    const start = new Date(startDate);
    const end = new Date(endDate);
    const dateRange = (!startDate || deliverDate >= start) && (!endDate || deliverDate <= end);
   
   const matchSearchQuery= deliver.deliverStatus.toLoweCase().includes(searchQuery)
   return dateRange & matchSearchQuery;

   })

   const displayData = filterData?.slice(0,rowToShow)

  const handlePrint = () => {
   

    const doc = new jsPDF();

    doc.text("Company Name", 14, 8);
    doc.text("Delivered Order", 14, 15);

    const tableHeaders = [["SNo"]];

    const tableData = deliverData.map((company, index) => [
        index + 1,
      
    ]);

    doc.autoTable({
        head: tableHeaders,
        body: tableData,
        startY: 20
    });

    doc.save("DeliveredOrders.pdf");
};

    if(!Auth()) return null;
    return (
        <div>


            <Navbar />
            <div className='flex flex-col lg:flex-row '>
                <LeftSideBar />
                <div className='flex flex-col  lg:ml-10 w-full lg:w-[1000px] gap-3 '>
                    <div className="para ">
                        <p className={`underline text-xl ${currentTheme === 'dark' ? 'text-white' : 'text-black'}`}>Deliver Orders Details</p>
                    </div>
                    <div className="info flex flex-col lg:flex-row justify-between  items-center gap-2 mt-5">
                        <div className='flex flex-col lg:flex-row gap-2 items-center w-full lg:w-[auto]'>
                            <div className={`flex items-center ${currentTheme === 'dark' ? 'text-white' : 'text-black'} gap-2`}>
                                <span>Show:</span>
                                <select
                                    className={`rounded-md px-1 py-1 ${currentTheme === 'dark' ? 'bg-[#404040]' : 'bg-[#F0FFF8]'} border border-gray-300 focus:outline-none focus:ring focus:ring-[#219b53]`}
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
                                    placeholder="Search by Shipping Address"
                                    className={`w-40 rounded-md px-1 py-1 ${currentTheme === 'dark' ? 'bg-[#404040]' : 'bg-[#F0FFF8]'} border border-gray-300 focus:outline-none focus:ring focus:ring-[#219b53]`}
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
                                <button className={`px-1 py-1 ${currentTheme === 'dark' ? 'bg-[#404040]' : 'bg-[#F0FFF8]'} ${currentTheme === 'dark' ? 'text-white' : 'text-black'}  rounded  border`}>
                                    Back
                                </button>
                            </Link>
                            <button onClick={handlePrint} className={`px-1 py-1 ${currentTheme === 'dark' ? 'bg-[#404040]' : 'bg-[#F0FFF8]'} ${currentTheme === 'dark' ? 'text-white' : 'text-black'} rounded border`}>Print</button>

                           
                        </div>

                    </div>
                    <div className="table-container overflow-x-auto">
                               {loading && <p>Loading...</p>}
                               {error && <p>Error: {error}</p>}
                               <GenericTable
                                 headers={['SNo',  'createdAt', 'updatedAt', 'Actions']}
                                 data={displayData}
                                 currentTheme={currentTheme}
                                 onEdit={handleEdit}
                                 onDelete={handleDelete}
                               />
                             </div>
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

                <DeleteModal
                    isOpen={isDeleteModalOpen}
                    onClose={() => setIsDeleteModalOpen(false)}
                />
            </div>

        </div>
    )
}

export default Delever
