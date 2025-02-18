import { Link} from "react-router-dom";
import LeftSideBar from "../../LeftSideBar/LeftSideBar"
import Navbar from "../../Navbar/Navbar"
import { setLoading } from '../../../AdminPanel/Slice/LoadingSlice'
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import GenericTable from "../../Components/Table/GenericTable";
import { baseUri } from "../../Components/api/baseUri";
import { Product_Middle_Point } from "../../Components/api/middlePoints";
import fetchData from "../../Components/api/axios";
import jsPDF from "jspdf";
import "jspdf-autotable";

const RegisteredProduct = () => {
    const dispatch = useDispatch();

    const [productData, setProductData] = useState({
        headers: ['SNo', 'createdAt', 'productCategory', 'productDescription', 'productImageUrl', 'productName', 'productPrice', 'productQuantity', 'updatedAt', 'userName'],
        data: []
    });

    const [showRows, setRowsToShow] = useState(5);
    const [initialCount, setInitialCount] = useState(0);
    const [searchQuery , setSearchQuery] = useState('');
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    const handleSearchQuery = (e) =>{
        setSearchQuery(e.target.value.toLowerCase());
    }

    const handleShowChange = (e) => {
        const selectedValue = parseInt(e.target.value, 10);
        setRowsToShow(selectedValue)

    }

    const showNext = () => {
        if (initialCount + showRows < filterData.length) {
            setInitialCount(initialCount + showRows);
        }
    };

    const showPrevious = () => {
        if (initialCount - showRows >= 0) {
            setInitialCount(initialCount - showRows);
        }
    };


    const FetchProducts = async () => {
        try {
            const Url = baseUri + Product_Middle_Point;
            const method = "GET";
            const response = await fetchData(Url, method);
            dispatch(setLoading());
            console.log(response)
            setProductData((prevState) => ({
                ...prevState,
                data: response.data

            }))
        }
        catch (error) {
            console.log(error)

        }

    }

    useEffect(() => {
        FetchProducts();
    }, [])

    const currentTheme = useSelector((state => state.theme.theme))

    const filterData = productData.data.filter((product) =>{
        const productDate = new Date(product.createdAt.split("T")[0]);
        const start = new Date(startDate);
        const end = new Date(endDate);
       
        const  dateRange = (!startDate || productDate >= start) && (!endDate || productDate <= end);
        const  matchSearchQuery =  product.productName.toLowerCase().includes(searchQuery) ||
            product.productCategory.toLowerCase().includes(searchQuery) ||
            product.role.toLowerCase().includes(searchQuery) 

            return dateRange & matchSearchQuery;

        })

    const displayData = filterData.slice(0, showRows)

    const pdfHeaders = ["SNo" , "Created Date", "Product Category ","Product Name" ,"Product Price","Product Quantity"]

    const handlePrint = () =>{
        const doc = new jsPDF();

        doc.text("Company Name ",14,8);
        doc.text("Registered Products",14,15);

        const tableHeader =pdfHeaders.map((header)=>header.toUpperCase());
        const tableData = displayData.map((product ,index)=>[
            index +1,
            product.createdAt.split("T")[0],
            product.productCategory,
            product.productName,
            product.productPrice,
            product.productQuantity   
        ]);

        doc.autoTable({
            head:[tableHeader],
            body:tableData,
            startY:20
        });

        doc.save("RegisteredProduct.pdf")
        
    }
    return (
        <div>


            <Navbar />
            <div className='flex flex-col lg:flex-row '>
                <LeftSideBar />
                <div className='flex flex-col  lg:ml-10 w-full lg:w-[1000px] gap-3 '>
                    <div className="para ">
                        <p className={`underline text-xl ${currentTheme === 'dark' ? 'text-white' : 'text-black'}`}>Product Detail</p>
                    </div>
                    <div className="info flex flex-col lg:flex-row justify-between items-center gap-2">
                        <div className='flex flex-col lg:flex-row gap-2 items-center w-full lg:w-[auto]'>
                            <div className={`flex items-center ${currentTheme === 'dark' ? 'text-white' : 'text-black'} gap-2`}>
                                <span>Show:</span>
                                <select
                                    className={`rounded-md px-1 py-1 ${currentTheme === 'dark' ? 'bg-[#404040]' : 'bg-[#F0FFF8]'} border border-gray-300 focus:outline-none focus:ring focus:ring-[#219b53]`}
                                    onChange={handleShowChange}
                                    value={showRows}
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
                                placeholder="Search by ProductName,category and role"
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
                                <button className={`px-2 py-1 ${currentTheme === 'dark' ? 'bg-[#404040]' : 'bg-[#F0FFF8]'} ${currentTheme === 'dark' ? 'text-white' : 'text-black'}  rounded  border`}>
                                    Back
                                </button>
                            </Link>

                                <button onClick={handlePrint} className={`px-2 py-1 ${currentTheme === 'dark' ? 'bg-[#404040]' : 'bg-[#F0FFF8]'} ${currentTheme === 'dark' ? 'text-white' : 'text-black'}  rounded  border`}>
                                    Print
                                </button>
                       
                        </div>
                    </div>
                  
                    <div className="table-container overflow-x-auto">

                        <GenericTable
                            headers={productData.headers}
                            data={displayData}
                            currentTheme={currentTheme}
                         
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
                                {Math.ceil((initialCount + showRows) / showRows)} of {Math.ceil(filterData.length / showRows)}
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

        </div>
    )
}

export default RegisteredProduct
