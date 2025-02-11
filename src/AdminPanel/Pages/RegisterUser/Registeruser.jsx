import { Link ,useNavigate} from 'react-router-dom';
import Navbar from '../../Navbar/Navbar';
import LeftSideBar from '../../LeftSideBar/LeftSideBar';
import DeleteModal from '../../Components/DeleteModal';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { baseUri } from '../../Components/api/baseUri'
import { User_Middle_Point } from '../../Components/api/middlePoints'
import { User_End_Point } from '../../Components/api/endPoint'
import fetchData from '../../Components/api/axios'
import GenericTable from '../../Components/Table/GenericTable';
import { setLoading } from '../../../AdminPanel/Slice/LoadingSlice'




const Registeruser = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const currentTheme = useSelector((state) => state.theme.theme);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [showRows, setRowsToShow] = useState(5);
    const [initialCount, setInitialCount] = useState(0);
    const [userData, setUserData] = useState({
        headers: ['SNo', 'username', 'email', 'confirmPassword', 'dateOfBirth', 'role', 'userLogoUrl', 'status', 'Actions'],
        data: [],
    });
    const [searchQuery, setSearchQuery] = useState('');

    const fetchUsers = async () => {
        try {
            const url = baseUri + User_Middle_Point + User_End_Point;
            const method = "GET";
            const response = await fetchData(url, method);
            dispatch(setLoading());
            setUserData((prevState) => ({
                ...prevState,
                data: response.users,
            }));
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleSearchQuery = (e) => {
        setSearchQuery(e.target.value.toLowerCase());
    };

    const handleShowChange = (e) => {
        const selectedValue = parseInt(e.target.value, 10);
        setRowsToShow(selectedValue);
        setInitialCount(0); 
    };

    const handleEdit = (item) => {
        routerSystemSettingDetail("edit", item);
    };

    const handleDelete = () => {
        setIsDeleteModalOpen(true);
    };

    const filterData = userData.data.filter((user) => {
        return (
            user.username.toLowerCase().includes(searchQuery) ||
            user.email.toLowerCase().includes(searchQuery) ||
            user.role.toLowerCase().includes(searchQuery)
        );
    });

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

    const displayData = filterData.slice(initialCount, initialCount + showRows);

    const routerSystemSettingDetail = (state, user) => {
        const path = `/user-registration-form`;
        const data = { state, user };
        navigate(path, { state: data });
    };

    return (
        <div>
            <Navbar />
            <div className="flex flex-col lg:flex-row ">
                <LeftSideBar />
                <div className="flex flex-col lg:ml-10 w-full lg:w-[1000px] gap-3">
                    <div className="para">
                        <p className={`underline text-xl ${currentTheme === 'dark' ? 'text-white' : 'text-black'}`}>User Registration</p>
                    </div>

                    <div className="info flex flex-col lg:flex-row justify-between items-center gap-2">
                        <div className="flex flex-col lg:flex-row gap-2 items-center w-full lg:w-[auto]">
                            <div className={`flex items-center ${currentTheme === 'dark' ? 'text-white' : 'text-black'} gap-2`}>
                                <span>Show:</span>
                                <select
                                    className={`rounded-md px-4 py-1 ${currentTheme === 'dark' ? 'bg-[#404040]' : 'bg-[#F0FFF8]'} border border-gray-300 focus:outline-none focus:ring focus:ring-[#219b53]`}
                                    onChange={handleShowChange}
                                    value={showRows}
                                >
                                    {[...Array(10).keys()].map((i) => (
                                        <option key={i + 1} value={i + 1}>
                                            {i + 1}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className={`flex items-center ${currentTheme === 'dark' ? 'text-white' : 'text-black'} gap-2`}>
                                <span>Entries :</span>
                                <input
                                    type="text"
                                    placeholder="Search by Username, Email, and Role"
                                    className={`rounded-md px-4 py-1 ${currentTheme === 'dark' ? 'bg-[#404040]' : 'bg-[#F0FFF8]'} border border-gray-300 focus:outline-none focus:ring focus:ring-[#219b53]`}
                                    value={searchQuery}
                                    onChange={handleSearchQuery}
                                />
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <Link to="/admin">
                                <button className={`px-4 py-2 ${currentTheme === 'dark' ? 'bg-[#404040]' : 'bg-[#F0FFF8]'} ${currentTheme === 'dark' ? 'text-white' : 'text-black'} rounded border`}>
                                    Back
                                </button>
                            </Link>
                            <Link to="/user-registration-form">
                                <button className={`px-4 py-2 ${currentTheme === 'dark' ? 'bg-[#404040]' : 'bg-[#F0FFF8]'} ${currentTheme === 'dark' ? 'text-white' : 'text-black'} rounded border`}>
                                    Add User
                                </button>
                            </Link>
                        </div>
                    </div>
                    <div className="table-container overflow-x-auto">
                        <GenericTable
                            headers={userData.headers}
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
                <DeleteModal
                    isOpen={isDeleteModalOpen}
                    onClose={() => setIsDeleteModalOpen(false)}
                />
            </div>
        </div>
    );
};

export default Registeruser;



