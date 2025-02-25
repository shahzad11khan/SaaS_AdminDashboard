import { Link } from "react-router-dom";
import LeftSideBar from "../../LeftSideBar/LeftSideBar"
import Navbar from "../../Navbar/Navbar"
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { baseUri } from "../../Components/api/baseUri";
import { Stock_Middle_Point } from "../../Components/api/middlePoints";
import fetchData from "../../Components/api/axios";
import { setLoading } from "../../Slice/LoadingSlice";
import GenericTable from "../../Components/Table/GenericTable";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { Auth } from "../../../utils/globleAtuhenticate";


const RegisteredStock = () => {
    
    const currentTheme = useSelector((state => state.theme.theme))
    const dispatch = useDispatch();
    const [showRows, setRowsToShow] = useState(5);
    const [searchQuery, setSearchQuery] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [stockData, setStockData] = useState({
        headers: ['SNo', 'category', 'subcategory', 'quantity', 'price', 'totalPrice', 'warehouseName', 'dateAdded'],
        data: []
    })
    const { companyId} = useSelector((state) => state.selectedCompany );
    const {userId} = useSelector(state => state.authenticate)

    const FetchStock = async () => {
        try {
            dispatch(setLoading());
            const Url = baseUri + Stock_Middle_Point;
            const method = 'GET';
            const response = await fetchData(Url, method);
             console.log(response);
             if(companyId){
                let  filterdData =  response?.data?.filter(item => companyId  === item.companyId?._id);
                setStockData((prevState) => ({
                 ...prevState,
                 data: filterdData,
             }))
             }
             else if (userId){
                 let  filterdData =  response?.data?.filter(item => userId  === item.companyId?._id);
                 setStockData((prevState) => ({
                  ...prevState,
                  data: filterdData,
                 }))
             }
             else{
                setStockData((prevState) => ({
                     ...prevState,
                     data: response.data,
                 }));
             }
            dispatch(setLoading());
        }
        catch (error) {
            console.log("error fetching stock ", error)
        }

    }

    useEffect(() => {
        FetchStock();
    }, [])


    const handleShowRows = (e) => {
        const selectedValue = parseInt(e.target.value, 10);
        setRowsToShow(selectedValue)

    }

    const handleSearchQuery =(e)=>{
        setSearchQuery(e.target.value.toLowerCase());

    }


   const filterData =stockData.data.filter((stock)=>{

    const stockDate = new Date(stock.dateAdded.split("T")[0]);
    const start = new Date(startDate);
    const end = new Date(endDate);
    const dateRange = (!startDate || stockDate >= start) && (!endDate || stockDate <= end);
    
    
    const matchSearchQuery = stock.category.toLowerCase().includes(searchQuery) ||
    stock.warehouseName.toLowerCase().includes(searchQuery)

    return dateRange & matchSearchQuery;

   })

   const displayData =filterData.slice(0,showRows)

   const pdfHeaders = ["Sno","Product Name","Category","Price","Quantity","Warehouse Name","Added Date"]
      const handlePrint = () => {
           const doc = new jsPDF();
   
           doc.text("Company Name", 14, 8);
           doc.text("Registered Stock", 14, 15);
   
           const tableHeaders = pdfHeaders.map(header => header.toUpperCase());
   
           const tableData = displayData.map((stock, index) => [
               index + 1,
               stock.productName,
               stock.category,
               stock.price,
               stock.quantity,
               stock.warehouseName,
               stock.dateAdded.split("T")[0]
           ]);
   
           doc.autoTable({
               head: [tableHeaders],
               body: tableData,
               startY: 20
           });
   
   
           doc.save("RegisteredStock.pdf");
       };

       if(!Auth()) return null;
    return (
        <div>


            <Navbar />
            <div className='flex flex-col lg:flex-row '>
                <LeftSideBar />
                <div className='flex flex-col  lg:ml-10 w-full lg:w-[1000px] gap-3 '>
                    <div className="para ">
                        <p className={`underline text-xl ${currentTheme === 'dark' ? 'text-white' : 'text-black'}`}>Stock Detail</p>
                    </div>
                    <div className="info flex flex-col lg:flex-row justify-between items-center gap-2">
                        <div className='flex flex-col lg:flex-row gap-2 items-center w-full lg:w-[auto]'>
                            <div className={`flex items-center ${currentTheme === 'dark' ? 'text-white' : 'text-black'} gap-2`}>
                                <span>Show:</span>
                                <select
                                    className={`rounded-md px-1 py-1 ${currentTheme === 'dark' ? 'bg-[#404040]' : 'bg-[#F0FFF8]'} border border-gray-300 focus:outline-none focus:ring focus:ring-[#219b53]`}
                                    value={showRows}
                                    onChange={handleShowRows}
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
                                    placeholder="Search Category & Warehouse name"
                                    className={`w-40 rounded-md px-1 py-1 ${currentTheme === 'dark' ? 'bg-[#404040]' : 'bg-[#F0FFF8]'} border border-gray-300 focus:outline-none focus:ring focus:ring-[#219b53]`}
                                    value={searchQuery}
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
                                <button className={`px-2 py-2 ${currentTheme === 'dark' ? 'bg-[#404040]' : 'bg-[#F0FFF8]'} ${currentTheme === 'dark' ? 'text-white' : 'text-black'}  rounded  border`}>
                                    Back
                                </button>
                            </Link>

                            
                                <button onClick={handlePrint} className={`px-2 py-2 ${currentTheme === 'dark' ? 'bg-[#404040]' : 'bg-[#F0FFF8]'} ${currentTheme === 'dark' ? 'text-white' : 'text-black'}  rounded  border`}>
                                    Print

                                </button>
                        </div>
                    </div>
                    <div className="table-container overflow-x-auto">

                        <GenericTable
                            headers={stockData.headers}
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

export default RegisteredStock
