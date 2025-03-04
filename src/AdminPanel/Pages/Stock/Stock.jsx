import { Link, useNavigate } from "react-router-dom";
import LeftSideBar from "../../LeftSideBar/LeftSideBar"
import Navbar from "../../Navbar/Navbar"
import DeleteModal from '../../Components/DeleteModal';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { baseUri } from "../../Components/api/baseUri";
import { Stock_Middle_Point } from "../../Components/api/middlePoints";
import fetchData from "../../Components/api/axios";
import { setLoading } from "../../Slice/LoadingSlice";
import GenericTable from "../../Components/Table/GenericTable";
import { toast } from "react-toastify";


const Stock = () => {
    const navigate = useNavigate();

    let {token , userId} = useSelector(state => state.authenticate);
    useEffect(()=>{
      if(!token) {
        toast.error("Login first")
        setTimeout(navigate('/'),1000) 
      }
    } , [token , navigate])
    
    const currentTheme = useSelector((state => state.theme.theme))
    const dispatch = useDispatch();
    const {companyId} = useSelector((state) => state.selectedCompany);
    const [showRows, setRowsToShow] = useState(5);
    const [deleteId,setDeleteId]=useState(null);
    const [initialCount, setInitialCount] = useState(0);
    const [searchQuery, setSearchQuery] = useState("");

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
    const [stockData, setStockData] = useState({
        headers: ['SNo','productName', 'category', 'subcategory', 'quantity', 'price', 'totalPrice', 'warehouseName', 'dateAdded','Actions'],
        data: []
    })

    const FetchStock = async () => {
        try {
            dispatch(setLoading());
            const Url = baseUri + Stock_Middle_Point;
            const method = 'GET';
            const response = await fetchData(Url, method);
             if(companyId){
                let  filterdData =  response.data.filter(item => companyId  === item.userId?.companyId?._id);
                setStockData((prevStock) => ({
                 ...prevStock,
                 data: filterdData,
             }))
             }
             else if(userId){
                let  filterdData =  response.data.filter(item => userId  === item.userId?.companyId?._id);
                setStockData((prevStock) => ({
                 ...prevStock,
                 data: filterdData,
             }))
             }
             else{
                setStockData((prevStock) => ({
                    ...prevStock,
                    data: response.data
                }
                ))
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

    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    const handleShowRows = (e) => {
        const selectedValue = parseInt(e.target.value, 10);
        setRowsToShow(selectedValue)

    }

    const handleSearchQuery =(e)=>{
        setSearchQuery(e.target.value.toLowerCase());

    }

    const handleEdit = (item) => {
        routerSystemSettingDetail("edit",item)
    };

const routerSystemSettingDetail = (state,stock)=>{
    const path =`/stock-registration-form`;
    const data ={state,stock}
    navigate(path ,{state:data})

}
    const  handleDelete = (item) => {
        setDeleteId(item._id)
        setIsDeleteModalOpen(true);
    };

    const handleConfirmDelete = async() =>{
       const url = baseUri + Stock_Middle_Point + "/" + deleteId;
       const method ="Delete";
       const response = await fetchData(url ,method);
       setIsDeleteModalOpen(false);
       toast.success(response.data.message)
       console.log(response.data.message)
       if(response.status===200){
        console.log(response)
        setStockData((prevState)=>({
            ...prevState,
            data:stockData.data.filter(el => el._id !=deleteId)
        }))}
    else {
        toast.error(response.data.message)
    }


    }

   const filterData =stockData.data.filter((stock)=>{
    return stock.category.toLowerCase().includes(searchQuery) ||
    stock.warehouseName.toLowerCase().includes(searchQuery)
   })

   const displayData = filterData.slice(initialCount, initialCount + showRows);
   if(!token) return null;
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

                            <Link to="/stock-registration-form">
                                <button className={`px-4 py-2 ${currentTheme === 'dark' ? 'bg-[#404040]' : 'bg-[#F0FFF8]'} ${currentTheme === 'dark' ? 'text-white' : 'text-black'}  rounded  border`}>
                                    Add Stock

                                </button>
                            </Link>
                        </div>
                    </div>
                    <div className="table-container overflow-x-auto">

                        <GenericTable
                            headers={stockData.headers}
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
                                {Math.ceil((initialCount + showRows) / showRows)} of {Math.ceil(filterData?.length / showRows)}
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

export default Stock
