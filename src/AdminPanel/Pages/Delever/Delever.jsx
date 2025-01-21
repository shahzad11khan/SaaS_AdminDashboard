import LeftSideBar from "../../LeftSideBar/LeftSideBar"
import Navbar from "../../Navbar/Navbar"

import DeleverData from "../../../../public/Delever.json"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash  } from '@fortawesome/free-solid-svg-icons';
import DeleteModal from '../../Components/DeleteModal';
import { useState } from "react";

const Delever = () => {
    const [isDeleteModalOpen,setIsDeleteModalOpen]= useState(false);

    const isopendeletemodal = ()=>{
        setIsDeleteModalOpen(true);
    }
  return (
    <div>
      

    <Navbar/>
    <div className='flex flex-col lg:flex-row '>
        <LeftSideBar/>
        <div className='flex flex-col  lg:ml-10 w-full lg:w-[1000px] gap-3 '>
        <div className="para ">
                        <p className='underline text-xl '>Delever Orders Details</p>
                    </div>
                    <div className="info flex flex-col lg:flex-row justify-between  items-center gap-2">
                        <div className='flex flex-col lg:flex-row gap-2 items-center w-full lg:w-[auto]'>
                        <div className="flex items-center gap-2">
                                <span>Show:</span>
                                <select
                                    className="rounded-md px-4 py-1 bg-[#F0FFF8] border border-gray-300 focus:outline-none focus:ring focus:ring-[#219b53]"
                                >
                                    <option value="one">01</option>
                                    <option value="two">02</option>
                                    <option value="three">03</option>
                                    <option value="four">04</option>
                                    <option value="five">05</option>
                                </select>
                            </div>
                            <div className="flex items-center gap-2 ">

                            
                            <span >Entries :</span>
                            <input
                                type="text"
                                placeholder="Search by customer name"
                                className="rounded-md  px-4 py-1 bg-[#F0FFF8] border border-gray-300 focus:outline-none focus:ring focus:ring-[#219b53]"
                            />
                             </div>
                        </div>
                        
                    </div>
                    <div className="table-container overflow-x-auto">

                    <table className="border-collapse border border-gray-300 w-full table-auto">

                    <thead>
                        <tr>
                            {DeleverData.headers.map((item, index) => (
                                <th key={index} className="bg-[#F0FFF8]  px-4 py-2">{item}</th>
                            ))}
                        </tr>
                    </thead>

                    <tbody>
                        {DeleverData.data.map((item) => (
                            <tr key={item.sNo} className="hover:bg-gray-100">
                                <td className="text-center px-4 py-2">{item.serial_no}</td>
                                <td className="text-center px-4 py-2">{item.customer_name}</td>
                                <td className="text-center px-4 py-2">{item.product_name}</td>
                                <td className="text-center px-4 py-2">{item.quantity}</td>
                                <td className="text-center px-4 py-2">{item.delivery_date}</td>
                                <td className="text-center px-4 py-2">{item.delivery_status}</td>
                                <td className="text-center px-4 py-2">{item.total_price}</td>
                            
                                <td className="text-center px-4 py-2">
                                <FontAwesomeIcon icon={faEdit} className='text-green-500 mr-2 cursor-pointer'></FontAwesomeIcon>
                                <FontAwesomeIcon icon={faTrash} className='text-red-500 cursor-pointer'onClick={()=>isopendeletemodal()}></FontAwesomeIcon>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

            </div>

            <div className="pages flex justify-center gap-1 mt-4">

              
                    <button className="px-4 py-2  rounded bg-[#F0FFF8] border">
                        Previous
                    </button>
                    <button className="px-4 py-2  rounded bg-[#F0FFF8] border">
                        1 of 1
                    </button>
                    <button className="px-4 py-2  rounded bg-[#F0FFF8] border">
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
