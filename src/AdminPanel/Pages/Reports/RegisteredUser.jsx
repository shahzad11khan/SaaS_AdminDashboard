import { Link } from 'react-router-dom';
import Navbar from '../../Navbar/Navbar';
import LeftSideBar from '../../LeftSideBar/LeftSideBar';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { baseUri } from '../../Components/api/baseUri'
import { User_Middle_Point } from '../../Components/api/middlePoints'
import { User_End_Point } from '../../Components/api/endPoint'
import fetchData from '../../Components/api/axios'
import GenericTable from '../../Components/Table/GenericTable';
import { setLoading } from '../../../AdminPanel/Slice/LoadingSlice';
import jsPDF from "jspdf";
import "jspdf-autotable";





const RegisteredUser = () => {
    const dispatch = useDispatch();
    const currentTheme = useSelector((state => state.theme.theme))
    const [showRows, setRowsToShow] = useState(5);
    const [initialCount, setInitialCount] = useState(0);
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    const [userData, setUserData] = useState({
        headers: ['SNo', 'username', 'email', 'confirmPassword', 'dateOfBirth', 'role', 'userLogoUrl', 'status',],
        data: []
    });
    const [searchQuery, setSearchQuery] = useState('');

    const fetchUsers = async () => {
        try {
            const url = baseUri + User_Middle_Point + User_End_Point;
            const method = "GET";
            const response = await fetchData(url, method);
            console.log(response)
            dispatch(setLoading());
            setUserData((prevState) => ({
                ...prevState,
                data: response.users,
            }));
        } catch (error) {
            console.log(error)
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleSearchQuery = (e) => {
        setSearchQuery(e.target.value.toLowerCase());
    }

    const handleShowChange = (e) => {
        const selectedValue = parseInt(e.target.value, 10)
        setRowsToShow(selectedValue);
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

    const filterData = userData.data.filter((user) => {
        const userDate = new Date(user.createdAt.split("T")[0]);
        const start = new Date(startDate);
        const end = new Date(endDate);
        const dateRange = (!startDate || userDate >= start) && (!endDate || userDate <= end);
        
        const matchSearchQuery = user.username.toLowerCase().includes(searchQuery)
            || user.email.toLowerCase().includes(searchQuery)
            || user.role.toLowerCase().includes(searchQuery)
        return dateRange & matchSearchQuery;
    })

    const displayData = filterData.slice(initialCount, initialCount + showRows);


    const pdfHeaders = ["SNo", "Username", "Email", "Date of Birth", "Role", "Status"]

    const handlePrint = () => {
        const doc = new jsPDF();

        doc.text("Company Name", 14, 8);
        doc.text("Registered Users", 14, 15);

        const tableHeaders = pdfHeaders.map(header => header.toUpperCase());

        const tableData = displayData.map((user, index) => [
            index + 1,
            user.username,
            user.email,
            user.dateOfBirth.split("T")[0],
            user.role,
            user.status
        ]);

        doc.autoTable({
            head: [tableHeaders],
            body: tableData,
            startY: 20
        });


        doc.save("RegisteredUsers.pdf");
    };


    return (
        <div>


            <Navbar />
            <div className='flex flex-col lg:flex-row '>
                <LeftSideBar />
                <div className='flex flex-col  lg:ml-10 w-full lg:w-[1000px] gap-3'>
                    <div className="para">
                        <p className={`underline text-xl ${currentTheme === 'dark' ? 'text-white' : 'text-black'}`}>User Registration</p>

                    </div>

                    <div className="info flex flex-col lg:flex-row justify-between  items-center gap-2">
                        <div className='flex flex-col lg:flex-row gap-2 items-center w-full lg:w-[auto]'>
                            <div className={`flex items-center ${currentTheme === 'dark' ? 'text-white' : 'text-black'} gap-2`}>
                                <span>Show:</span>
                                <select
                                    className={` rounded-md px-1 py-1 ${currentTheme === 'dark' ? 'bg-[#404040]' : 'bg-[#F0FFF8]'} border border-gray-300 focus:outline-none focus:ring focus:ring-[#219b53]`}
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
                                    placeholder="Search by Username ,email and role"
                                    className={`w-36 rounded-md px-1 py-1 ${currentTheme === 'dark' ? 'bg-[#404040]' : 'bg-[#F0FFF8]'} border border-gray-300 focus:outline-none focus:ring focus:ring-[#219b53]`}
                                    value={searchQuery}
                                    onChange={handleSearchQuery}
                                />

                            </div>

                            <div className="flex flex-row items-center gap-2">
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
                            headers={userData.headers}
                            data={displayData}
                            currentTheme={currentTheme}

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


            </div>


        </div>
    )
}

export default RegisteredUser

