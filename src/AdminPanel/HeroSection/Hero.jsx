import Data from '../../../public/data.json';
import Card from '../Components/Card';
import { useDispatch, useSelector } from "react-redux";
import { baseUri } from '../Components/api/baseUri'
import { Product_Middle_Point, User_Middle_Point } from '../Components/api/middlePoints'
import { Stock_Middle_Point } from '../Components/api/middlePoints';
import { User_End_Point } from '../Components/api/endPoint'
import fetchData from '../Components/api/axios'
import SalesGraph from '../Components/Graph';
import { useState, useEffect } from 'react';
import { setLoading } from '../Slice/LoadingSlice';
import { fetchOrder } from '../Slice/OrderSlice';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCommentDots } from "@fortawesome/free-solid-svg-icons";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import ChatBot from '../Components/ChatBot/ChatBot';

const Hero = () => {
    const dispatch = useDispatch();
    const onlineOrders = useSelector((state) => state.orders.data.length);
    const currentTheme = useSelector((state) => state.theme.theme);
    const [totalUsers, setTotalUsers] = useState(0);
    const [totalStock, setTotalStock] = useState(0);
    const [totalProduct, setTotalProduct] = useState(0);
    const [isChatBotOpen, setIsChatBotOpen] = useState(null);
    const { companyId } = useSelector((state) => state.selectedCompany);



    const fetchUsers = async () => {
        try {
            const url = baseUri + User_Middle_Point + User_End_Point;
            const method = "GET";
            const response = await fetchData(url, method);
            console.log(response.data)
            dispatch(setLoading());
            if (companyId) {
                let filterdData = response.data.users.filter(item => companyId === item.companyId?._id);
                setTotalUsers(filterdData.length)
            } else if (response.data.users && Array.isArray(response.data.users)) {
                console.log(response)
                setTotalUsers(response.data.users.length);
            }
        } catch (error) {
            console.log(error)
        }
    };

    const fetchStock = async () => {
        try {
            const url = baseUri + Stock_Middle_Point;
            const method = "GET";
            const response = await fetchData(url, method);
            dispatch(setLoading());
            if (companyId) {
                let filterdData = response.filter(item => companyId === item.userId?.companyId?._id);
                setTotalStock(filterdData.length)
            } else if (Array.isArray(response)) {
                setTotalStock(response.length);
            }
        } catch (error) {
            console.log(error)
        }
    }


    const fetchProduct = async () => {
        try {
            const url = baseUri + Product_Middle_Point;
            const method = "GET";
            const { data } = await fetchData(url, method);
            console.log(data)
            if (data) {
                let filteredData = [];

                if (companyId) {
                    filteredData = data.filter(item => companyId === item.userId?.companyId?._id);
                } else if (Array.isArray(data)) {
                    filteredData = data;
                }

                setTotalProduct(filteredData.length);
            }
        }
        catch (error) {
            console.log(error)
        }
        dispatch(setLoading());

    }

    useEffect(() => {
        fetchUsers();
        fetchStock();
        fetchProduct();
        dispatch(fetchOrder());

    }, []);

    const balanceDetails = [
        {
            "id": 1,
            "icon": "fas fas fa-arrow-up",
            "iconColor": "text-green-500",
            "decs": "Incomes",
            "price": "$ 120"

        },
        {
            "id": 2,
            "icon": "fas fa-arrow-down",
            "iconColor": "text-red-500",
            "decs": "Expensive",
            "price": "$-160"

        },
        {
            "id": 3,
            "icon": "fas fa-arrow-down",
            "iconColor": "text-red-500",
            "decs": "Taxis",
            "price": "$-220"

        }
    ]
    const upcommingBalance = [
        {
            "id": 1,
            "icon": "fas fas fa-arrow-up",
            "iconColor": "text-green-500",
            "decs": "EsayPay Way",
            "price": "$ 120000"

        },
        {
            "id": 2,
            "icon": "fas fa-arrow-down",
            "iconColor": "text-red-500",
            "decs": "Payoneer",
            "price": "$ 160000"

        },
        {
            "id": 3,
            "icon": "fas fa-arrow-down",
            "iconColor": "text-red-500",
            "decs": "Fast Spring",
            "price": "$ 220000"

        }
    ]
    console.log


    return (
        <div className="main mx-2 lg:w-full flex justify-between flex-col lg:flex-row px-2 ">
            <div className='middle flex flex-col w-full lg:w-[800px] mt-2 mx-auto '>

                <div className="cards flex justify-start mx-2 flex-wrap gap-1 md:gap-10 lg:gap-8 ">
                    {Data.map((element) => (
                        <div className="w-[48%] md:w-[15%]" key={element.id}>
                            <Card
                                id={element.id}
                                icon={element.icon}
                                iconBgColor={element.iconBgColor}
                                title={element.title}
                                total={
                                    element.title.includes("Users")
                                        ? totalUsers
                                        : element.title.includes("Stock")
                                            ? totalStock
                                            : element.title.includes("Product")
                                                ? totalProduct
                                                : element.title.includes("O.Orders")
                                                    ? onlineOrders
                                                    : null
                                }


                            />
                        </div>

                    ))}


                </div>

                <div className="graph mt-3 h-[200px] sm:h-[200px] md:h-[300px] lg:h-[400px] lg:w-[735px]">
                    <SalesGraph />
                </div>
            </div>


            <div className={`rightSidebar flex flex-col relative  w-full md:w-full lg:w-[240px] min-h-screen mt-2  ${currentTheme === 'dark' ? 'bg-[#404040]' : 'bg-[#F0FFF8]'}   gap-4  p-4 rounded-md border border-gray-300`}>

                <div className={`top ${currentTheme === 'dark' ? 'bg-[#404040]' : 'bg-orange-400 '} border border-gray-300 rounded-lg w-full p-5 text-white `}>
                    <div className="balance">
                        <h3 className="font-bold text-2xl">$ 44.40</h3>
                        <p className="text-sm">Active balance</p>
                    </div>
                    <div className="b-details mt-3">
                        {balanceDetails.map((el) => (
                            <div className="flex items-center mt-2 pt-2" key={el.id}>
                                <div
                                    className={`${el.icon} ${el.iconColor} bg-white rounded p-2 text-xs flex items-center justify-center`}
                                ></div>
                                <div className="ps-2 text-sm">{el.decs}</div>
                                <div className="ml-auto text-sm font-medium">{el.price}</div>
                            </div>
                        ))}
                    </div>
                    <button
                        type="button"
                        className="mt-5 bg-white text-gray-800 hover:bg-gray-200 border border-gray-300 rounded px-4 py-2  text-sm"
                    >
                        Add Vertical Card
                    </button>
                </div>


                <div className={`  ${currentTheme === 'dark' ? 'bg-[#404040]' : 'bg-[#F0FFF8]'} ${currentTheme === 'dark' ? 'text-white' : 'text-black'}  border-gray-300 border-2 rounded-lg p-5   `}>
                    <div className="balance">
                        <h3 className="text-lg font-medium">Upcoming Payment</h3>
                    </div>
                    <div className="b-details mt-3">
                        {upcommingBalance.map((el) => (
                            <div className="flex items-center mt-2 pt-2" key={el.id}>
                                <div
                                    className={`${el.icon} ${el.iconColor} bg-white rounded p-2 text-xs flex items-center justify-center`}
                                ></div>
                                <div className="ps-2 text-sm">{el.decs}</div>
                                <div className="ml-auto text-xs text-red-700 bg-red-300 rounded px-2 py-1">
                                    {el.price}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                
                <div className={`flex fixed bottom-14 right-10 cursor-pointer `}>
                    <FontAwesomeIcon className={`w-12 h-12 rounded-full`} icon={faWhatsapp}  style={{ color: "#25D366" }} />
                </div> 
                
                <div className={`fixed bottom-2 right-10 cursor-pointer `}
                    onClick={() => setIsChatBotOpen(!isChatBotOpen)}
                >
                    <FontAwesomeIcon  icon={faCommentDots} size='3x' />
                </div>
                {isChatBotOpen && <ChatBot />}

               
            </div>

        </div>
    )
}

export default Hero
