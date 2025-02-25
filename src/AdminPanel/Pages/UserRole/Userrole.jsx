
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../../Navbar/Navbar';
import LeftSideBar from '../../LeftSideBar/LeftSideBar';
// import userrole from '../../../../public/userrole.json';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import DeleteModal from '../../Components/DeleteModal';
import { useState , useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { baseUri } from '../../Components/api/baseUri';
// import { Permission_Middle_Point } from '../../Components/api/middlePoints';
// import fetchData from '../../Components/api/axios';
// import { setLoading } from '../../../AdminPanel/Slice/LoadingSlice'
import GenericTable from '../../Components/Table/GenericTable';
import { getPermissions } from '../../Slice/PermissionSlice';
import { baseUri } from '../../Components/api/baseUri';
import { Permission_Middle_Point } from '../../Components/api/middlePoints';
import fetchData from '../../Components/api/axios';
import { toast } from 'react-toastify';

const Userrole = () => {
    let navigate = useNavigate()

    let {token} = useSelector(state => state.authenticate);
    useEffect(()=>{
      if(!token) {
        toast.error("Login first")
        setTimeout(navigate('/'),1000) 
      }
    } , [token , navigate])
    let dispatch = useDispatch()
    const currentTheme = useSelector((state=>state.theme.theme))
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [initialCount, setInitialCount] = useState(0);
    const {permissions} = useSelector(state => state.permission) ;
    const [id , setId] = useState(null)
    // const isopendeletemodal = () => {
    //     setIsDeleteModalOpen(true);
    // }

    const [userPermission, setUserPermission] = useState({
        headers: ["sno", "userName", "parentPermission",'permissions','Actions'],
        headers2:[],
        headers3:['read' , 'edit' , 'update' , 'delete'],
        data: [],
    });
    const [searchQuery, setSearchQuery] = useState('');
    const [showRows, setRowsToShow] = useState(5);
    const { companyId} = useSelector((state) => state.selectedCompany );
    const { userId} = useSelector((state) => state.authenticate );

    const processPermissions = () => {
        if (!permissions) return; 
    
        let arr = permissions?.flatMap(el => Object.keys(el.permissions || {})) || [];
        let uniqueArr = [...new Set(arr)];
    
        console.log("Extracted Permissions:", uniqueArr); 
    
        if (companyId) {
            let filteredData = permissions?.filter(item => companyId === item.companyId?._id );
            if (filteredData.length > 0) {
                setUserPermission((prevState) => ({
                    ...prevState,
                    headers2: uniqueArr, 
                    data: filteredData, 
                }));
            }
        }
        else if (userId){
            let filteredData = permissions?.filter(item => companyId === item.companyId?._id );
            setUserPermission((prevState) => ({
                ...prevState,
                headers2: uniqueArr, 
                data: filteredData, 
            }));
        }
        else {
            setUserPermission((prevState) => ({
                ...prevState,
                headers2: uniqueArr, 
                data: permissions, 
            }));
        }
    };
    
    useEffect(() => {
        dispatch(getPermissions())
        // fetchUsers();
    }, []); 

    useEffect(() => {
        processPermissions();
    }, [permissions, companyId]);

    const handleSearchQuery = (e) => {
        setSearchQuery(e.target.value.toLowerCase());
    };
    const handleShowChange = (e) => {
        const selectedValue = parseInt(e.target.value, 10);
        setRowsToShow(selectedValue);
        setInitialCount(0); 
    };
    const filterData = userPermission?.data.filter((user) => 
            searchQuery>1?
            user.username?.toLowerCase().includes(searchQuery)
            : user
    );
    const displayData = filterData.slice(initialCount, initialCount + showRows);
    const handleEdit = (item) => {
        routerSystemSettingDetail("edit", item);
    };

    const handleDelete = (item) => {
        setIsDeleteModalOpen(true);
        setId(item._id)
        setIsDeleteModalOpen(true);
    };
    const routerSystemSettingDetail = (state, role) => {
        const path = `/user-role-registration-form`;
        const data = { state, role };
        navigate(path, { state: data });
    };
    const handleConfirmDelete = async()=>{
        const URL = baseUri + Permission_Middle_Point +"/"+ id;
        const method = 'Delete';
        const response = fetchData(URL , method );
        setIsDeleteModalOpen(false)
        toast.success(response.data.message)
        setUserPermission((prevState) => ({
            ...prevState, 
            data: prevState.data .filter(el => el._id !== id)
        }));
     }
     if(!token) return null;

    return (
        <div>
            {/* header */}
            <Navbar />
            <div className='flex flex-col lg:flex-row '>
                {/* leftside bara */}
                <LeftSideBar />
                <div className='flex flex-col  lg:ml-10 w-full lg:w-[1000px] gap-3 '>
                    {/* title of page */}
                    <div className="para ">
                        <p className={`underline text-xl ${currentTheme=== 'dark' ?'text-white':'text-black'}`}>User Role</p>
                    </div>

                    <div className="info flex flex-col lg:flex-row justify-between items-center gap-2">
                        {/* filter option */}
                        <div className='flex flex-col lg:flex-row gap-2 items-center w-full lg:w-[auto]'>
                            <div className={`flex items-center ${currentTheme=== 'dark' ?'text-white':'text-black'} gap-2`}>
                                <span>Show:</span>
                                <select
                                onChange={handleShowChange}
                                   className={`rounded-md px-4 py-1 ${currentTheme=== 'dark' ?'bg-[#404040]':'bg-[#F0FFF8]'} border border-gray-300 focus:outline-none focus:ring focus:ring-[#219b53]`}
                                >
                                    <option value="one">01</option>
                                    <option value="two">02</option>
                                    <option value="three">03</option>
                                    <option value="four">04</option>
                                    <option value="five">05</option>
                                </select>
                            </div>
                            <div className="flex items-center  gap-2 ">
                                <span >Entries :</span>
                                <input
                                    type="text"
                                    placeholder="Search by Role Name"
                                   className={`rounded-md px-4 py-1 ${currentTheme=== 'dark' ?'bg-[#404040]':'bg-[#F0FFF8]'} border border-gray-300 focus:outline-none focus:ring focus:ring-[#219b53]`}
                                   onChange={handleSearchQuery}

                                />
                            </div>
                        </div>
                        {/* naigation butttons to index route & form component */}
                        <div className='flex gap-2'>
                            <Link to="/admin">
                                 <button className= {`px-4 py-2 ${currentTheme=== 'dark' ?'bg-[#404040]':'bg-[#F0FFF8]'} ${currentTheme=== 'dark' ?'text-white':'text-black'}  rounded  border`}>
                                    Back
                                </button>
                            </Link>


                            <Link to="/user-role-registration-form">
                                 <button className= {`px-4 py-2 ${currentTheme=== 'dark' ?'bg-[#404040]':'bg-[#F0FFF8]'} ${currentTheme=== 'dark' ?'text-white':'text-black'}  rounded  border`}>
                                    Add Role
                                </button>
                            </Link>
                        </div>
                    </div>
                    {/* table */}
                            <div className="table-container overflow-x-auto">
                                         <GenericTable
                                             headers={userPermission.headers}
                                             data={displayData}
                                             currentTheme={currentTheme}
                                             onEdit={handleEdit}
                                             onDelete={handleDelete}
                                             headers2={userPermission.headers2}
                                             headers3={userPermission.headers3}
                                         />
                                     </div>
                    {/* pagination buttons */}
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
                    confirmDelete = {handleConfirmDelete}
                    onClose={() => setIsDeleteModalOpen(false)}
                />

            </div>


        </div>
    )
}

export default Userrole
