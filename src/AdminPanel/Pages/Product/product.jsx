import { Link, useNavigate } from "react-router-dom";
import LeftSideBar from "../../LeftSideBar/LeftSideBar"
import Navbar from "../../Navbar/Navbar"
import { setLoading } from '../../../AdminPanel/Slice/LoadingSlice'
import DeleteModal from '../../Components/DeleteModal';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import GenericTable from "../../Components/Table/GenericTable";
import { baseUri } from "../../Components/api/baseUri";
import { Product_Middle_Point } from "../../Components/api/middlePoints";
import fetchData from "../../Components/api/axios";

const Product = () => {
    const dispatch = useDispatch();
    const navigate =useNavigate();
    const {companyId} = useSelector((state) => state.selectedCompany);


    const [productData, setProductData] = useState({
        headers: ['SNo', 'createdAt', 'productCategory', 'productDescription', 'productImageUrl', 'productName', 'productPrice', 'productQuantity', 'updatedAt', 'userName','Actions'],
        data: []
    });

    const [showRows, setRowsToShow] = useState(5);
    const [searchQuery , setSearchQuery] = useState('');

    const handleSearchQuery = (e) =>{
        setSearchQuery(e.target.value.toLowerCase());
    }

    const handleShowChange = (e) => {
        const selectedValue = parseInt(e.target.value, 10);
        setRowsToShow(selectedValue)

    }

    const FetchProducts = async () => {
        try {
            const Url = baseUri + Product_Middle_Point;
            const method = "GET";
            const response = await fetchData(Url, method);
            dispatch(setLoading());
            console.log(response)
            if(companyId){
                let  filterdData =  response.filter(item => companyId  === item.userId?.companyId?._id);
                setProductData((prevState) => ({
                 ...prevState,
                 data: filterdData,
             }))
             }else{
                setProductData((prevState) => ({
                    ...prevState,
                    data: response
    
                }))
             }

        }
        catch (error) {
            console.log(error)

        }

    }


    useEffect(() => {
        FetchProducts();
    }, [])

    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const currentTheme = useSelector((state => state.theme.theme))
    
    const handleEdit = (item) => {
        routerSystemSettingDetail("edit",item)
    };
    const routerSystemSettingDetail = (state ,product)=>{
        const path =`/product-registration-form`;
        const data ={state ,product}
        navigate(path ,{state:data})
     
    }

    const handleDelete = () => {
        setIsDeleteModalOpen(true);
    
    };
 
    const filterData = productData.data.filter((product) =>{
        return(
            product.productName.toLowerCase().includes(searchQuery) ||
            product.productCategory.toLowerCase().includes(searchQuery) ||
            product.role.toLowerCase().includes(searchQuery) 

        )
    })

    const displayData = filterData.slice(0, showRows)
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
                                    className={`rounded-md px-4 py-1 ${currentTheme === 'dark' ? 'bg-[#404040]' : 'bg-[#F0FFF8]'} border border-gray-300 focus:outline-none focus:ring focus:ring-[#219b53]`}
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

                            <Link to="/product-registration-form">
                                <button className={`px-4 py-2 ${currentTheme === 'dark' ? 'bg-[#404040]' : 'bg-[#F0FFF8]'} ${currentTheme === 'dark' ? 'text-white' : 'text-black'}  rounded  border`}>
                                    Add Product
                                </button>
                            </Link>
                        </div>
                    </div>
                  
                    <div className="table-container overflow-x-auto">

                        <GenericTable
                            headers={productData.headers}
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

export default Product
