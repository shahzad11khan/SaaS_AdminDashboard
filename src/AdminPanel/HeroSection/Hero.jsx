// import React from 'react';
import Data from '../../../public/data.json';
import Card from '../Components/Card';
import { useSelector } from 'react-redux';

import SalesGraph from '../Components/Graph';




const Hero = () => {
    const currentTheme = useSelector((state) => state.theme.theme);
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



    return (
        <div className="main mx-2 lg:w-full flex justify-between flex-col lg:flex-row px-2 ">


           
            <div className='middle flex flex-col w-full lg:w-[800px] mt-2 mx-auto '>

                {/* cards */}
                <div className="cards flex justify-start mx-2 flex-wrap gap-1 md:gap-10 lg:gap-8 ">
                    {Data.map((element) => (
                        <div className="w-[48%] md:w-[15%]" key={element.id}>
                            <Card


                                id={element.id}
                                icon={element.icon}
                                iconBgColor={element.iconBgColor}
                                title={element.title}
                                description={element.description}
                                price={element.price}
                            />
                        </div>

                    ))}


                </div>

                <div className="graph mt-3 h-[200px] sm:h-[200px] md:h-[300px] lg:h-[400px] lg:w-[735px]">
                    <SalesGraph />
                </div>
            </div>
                           
                
            <div className={`rightSidebar min-h-screen mt-2  ${currentTheme=== 'dark' ?'bg-[#404040]]':'bg-[#F0FFF8]'}  flex flex-col  w-full md:w-full lg:w-[240px] gap-4  p-4 rounded-md border border-gray-300`}>

                <div className={`top ${currentTheme ==='dark' ? 'bg-[#404040]' : 'bg-orange-400 '} border border-gray-300 rounded-lg w-full p-5 text-white `}>
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


                <div className={`  ${currentTheme=== 'dark' ?'bg-[#404040]':'bg-[#F0FFF8]'} ${currentTheme=== 'dark' ?'text-white':'text-black' }  border border-gray-300 rounded rounded-lg p-5  border-2 `}>
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
            </div>

        </div>
    )
}

export default Hero
