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


const RegisteredStock = () => {
    const currentTheme = useSelector((state => state.theme.theme))
    const dispatch = useDispatch();
    const [showRows, setRowsToShow] = useState(5);
    const [searchQuery, setSearchQuery] = useState("");
    const [stockData, setStockData] = useState({
        headers: ['SNo', 'category', 'subcategory', 'quantity', 'price', 'totalPrice', 'warehouseName', 'dateAdded'],
        data: []
    })

    const FetchStock = async () => {
        try {
            dispatch(setLoading());
            const Url = baseUri + Stock_Middle_Point;
            const method = 'GET';
            const response = await fetchData(Url, method);
             console.log(response);
            setStockData((prevStock) => ({
                ...prevStock,
                data: response
            }
            ))
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
    return stock.category.toLowerCase().includes(searchQuery) ||
    stock.warehouseName.toLowerCase().includes(searchQuery)
   })

   const displayData =filterData.slice(0,showRows)
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
                                    className={`rounded-md px-4 py-1 ${currentTheme === 'dark' ? 'bg-[#404040]' : 'bg-[#F0FFF8]'} border border-gray-300 focus:outline-none focus:ring focus:ring-[#219b53]`}
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
                                    className={`rounded-md px-4 py-1 ${currentTheme === 'dark' ? 'bg-[#404040]' : 'bg-[#F0FFF8]'} border border-gray-300 focus:outline-none focus:ring focus:ring-[#219b53]`}
                                    value={searchQuery}
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

                            <Link to="">
                                <button className={`px-4 py-2 ${currentTheme === 'dark' ? 'bg-[#404040]' : 'bg-[#F0FFF8]'} ${currentTheme === 'dark' ? 'text-white' : 'text-black'}  rounded  border`}>
                                    Print

                                </button>
                            </Link>
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
