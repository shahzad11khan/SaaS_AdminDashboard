import { Link } from 'react-router-dom';
import Navbar from '../../Navbar/Navbar';
import LeftSideBar from '../../LeftSideBar/LeftSideBar';
import userdata from '../../../../public/companyUser.json';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash  } from '@fortawesome/free-solid-svg-icons';
import DeleteModal from '../../Components/DeleteModal';
import { useState } from 'react';
import { useSelector } from 'react-redux';


const Registeruser = () => {

    const currentTheme = useSelector((state=>state.theme.theme))
    const [isDeleteModalOpen,setIsDeleteModalOpen]= useState(false);

    const isopendeletemodal = ()=>{
        setIsDeleteModalOpen(true);
    }
    return (
        <div>


            <Navbar />
            <div className='flex flex-col lg:flex-row '>
                <LeftSideBar />
                <div className='flex flex-col  lg:ml-10 w-full lg:w-[1000px] gap-3'>
                    <div className="para">
                    <p className={`underline text-xl ${currentTheme=== 'dark' ?'text-white':'text-black'}`}>User Registration</p>

                    </div>

                    <div className="info flex flex-col lg:flex-row justify-between  items-center gap-2">
                        <div className='flex flex-col lg:flex-row gap-2 items-center w-full lg:w-[auto]'>
                        <div className={`flex items-center ${currentTheme=== 'dark' ?'text-white':'text-black'} gap-2`}>
                        <span>Show:</span>
                                <select
                                    className={`rounded-md px-4 py-1 ${currentTheme=== 'dark' ?'bg-[#404040]':'bg-[#F0FFF8]'} border border-gray-300 focus:outline-none focus:ring focus:ring-[#219b53]`}
                                >
                                    <option value="one">01</option>
                                    <option value="two">02</option>
                                    <option value="three">03</option>
                                    <option value="four">04</option>
                                    <option value="five">05</option>
                                </select>
                            </div>
                            <div className={`flex items-center ${currentTheme=== 'dark' ?'text-white':'text-black'} gap-2`}>
                                <span >Entries :</span>
                                <input
                                    type="text"
                                    placeholder="Search by Username"
                                    className={`rounded-md px-4 py-1 ${currentTheme=== 'dark' ?'bg-[#404040]':'bg-[#F0FFF8]'} border border-gray-300 focus:outline-none focus:ring focus:ring-[#219b53]`}
                                />
                            </div>
                        </div>
                        <div className='flex gap-2'>
                        <Link to="/admin">
                           <button className= {`px-4 py-2 ${currentTheme=== 'dark' ?'bg-[#404040]':'bg-[#F0FFF8]'} ${currentTheme=== 'dark' ?'text-white':'text-black'}  rounded  border`}>
                                Back
                            </button>
                           </Link>

                            <Link to="/user-registration-form">
                         <button className= {`px-4 py-2 ${currentTheme=== 'dark' ?'bg-[#404040]':'bg-[#F0FFF8]'} ${currentTheme=== 'dark' ?'text-white':'text-black'}  rounded  border`}>
                                Add User
                            </button>
                         </Link>
                        </div>
                    </div>
                    <div className="table-container overflow-x-auto">


                        <table className="border-collapse border border-gray-300 w-full ">
                            <thead>
                                <tr>
                                    {userdata.headers.map((item, index) => (
                                        <th key={index} className={`${currentTheme=== 'dark' ?'bg-[#404040]':'bg-[#F0FFF8]'}  ${currentTheme=== 'dark' ?'text-white':'text-black'} border-b px-4 py-2`}>{item}</th>
                                    ))}
                                </tr>
                            </thead>

                            <tbody>
                                {userdata.data.map((item) => (
                                    <tr key={item.sNo} className={`hover:bg-gray-100 ${currentTheme === 'dark' ? 'hover:bg-[#404052]' : ''  }`}>
                                        <td className={`px-4 py-2 ${currentTheme=== 'dark' ?'text-white':'text-black'} text-center`}>{item.sno}</td>
                                        <td className={`px-4 py-2 ${currentTheme=== 'dark' ?'text-white':'text-black'} text-center`}>{item.username}</td>
                                        <td className={`px-4 py-2 ${currentTheme=== 'dark' ?'text-white':'text-black'} text-center`}>{item.email}</td>
                                        <td className={`px-4 py-2 ${currentTheme=== 'dark' ?'text-white':'text-black'} text-center`}>{item.password}</td>
                                        <td className={`px-4 py-2 ${currentTheme=== 'dark' ?'text-white':'text-black'} text-center`}>{item.occupation}</td>
                                        <td className={`px-4 py-2 ${currentTheme=== 'dark' ?'text-white':'text-black'} text-center`}>{item.status}</td>
                                        <td className="px-4 py-2 text-center">
                                        <FontAwesomeIcon icon={faEdit} className="text-green-500 mr-2 cursor-pointer " />
                                        <FontAwesomeIcon icon={faTrash } className="text-red-500 cursor-pointer " onClick={()=>isopendeletemodal()} />
                                            </td>
                                       
                                   
                                   
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                    </div>

                    <div className="pages ">
                        <div className="flex justify-center gap-1">
                            <button className= {`px-4 py-2 ${currentTheme=== 'dark' ?'bg-[#404040]':'bg-[#F0FFF8]'} ${currentTheme=== 'dark' ?'text-white':'text-black'}  rounded  border`}>
                                Previous
                            </button>
                            <button className= {`px-4 py-2 ${currentTheme=== 'dark' ?'bg-[#404040]':'bg-[#F0FFF8]'} ${currentTheme=== 'dark' ?'text-white':'text-black'}  rounded  border`}>
                                1 of 1
                            </button>
                            <button className= {`px-4 py-2 ${currentTheme=== 'dark' ?'bg-[#404040]':'bg-[#F0FFF8]'} ${currentTheme=== 'dark' ?'text-white':'text-black'}  rounded  border`}>
                                Next
                            </button>
                        </div>
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

export default Registeruser

