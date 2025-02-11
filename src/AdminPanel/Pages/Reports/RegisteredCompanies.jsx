import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import LeftSideBar from "../../LeftSideBar/LeftSideBar";
import Navbar from "../../Navbar/Navbar";
import GenericTable from "../../Components/Table/GenericTable";
import { fetchCompanies } from "../../Slice/CompanySlice";

const RegisteredCompanies = () => {
    const [rowToShow, setRowsToShow] = useState(5);
    const [searchQuery, setSearchQuery] = useState("");

    const currentTheme = useSelector((state) => state.theme.theme);
    const dispatch = useDispatch();
    const { data: companiesData, loading, error } = useSelector((state) => state.companies);
    
   

    useEffect(() => {
        dispatch(fetchCompanies());
    }, [dispatch]);

    const handleRowChange = (e) => {
        setRowsToShow(parseInt(e.target.value, 10));
    };

    const handleSearchQuery = (e) => {
        setSearchQuery(e.target.value.toLowerCase());
    };



    const filterData = companiesData.filter((companies) =>
      companies.companyName.toLowerCase().includes(searchQuery) ||
      companies.ownerName.toLowerCase().includes(searchQuery) ||
      companies.address.toLowerCase().includes(searchQuery) ||
      companies.registrationNumber.toLowerCase().includes(searchQuery)
  );
    
    const displayData = filterData.slice(0, rowToShow);

    return (
        <div>
            <Navbar />
            <div className='flex flex-col lg:flex-row'>
                <LeftSideBar />
                <div className='flex flex-col lg:ml-10 w-full lg:w-[1000px] gap-3'>
                    <div className="para">
                        <p className={`underline text-xl ${currentTheme === 'dark' ? 'text-white' : 'text-black'}`}>Company Registration</p>
                    </div>
                    <div className="info flex flex-col lg:flex-row justify-between items-center gap-2">
                        <div className='flex flex-col lg:flex-row gap-2 items-center w-full lg:w-[auto]'>
                            <div className={`flex items-center ${currentTheme === 'dark' ? 'text-white' : 'text-black'} gap-2`}>
                                <span>Show:</span>
                                <select
                                    className={`rounded-md px-4 py-1 ${currentTheme === 'dark' ? 'bg-[#404040]' : 'bg-[#F0FFF8]'} border border-gray-300 focus:outline-none focus:ring focus:ring-[#219b53]`}
                                    value={rowToShow}
                                    onChange={handleRowChange}
                                >
                                    {[...Array(10)].map((_, i) => (
                                        <option key={i + 1} value={i + 1}>{i + 1}</option>
                                    ))}
                                </select>
                            </div>
                            <div className={`flex items-center ${currentTheme === 'dark' ? 'text-white' : 'text-black'} gap-2`}>
                                <span>Entries:</span>
                                <input
                                    type="text"
                                    placeholder="Search by Company Name"
                                    className={`rounded-md px-4 py-1 ${currentTheme === 'dark' ? 'bg-[#404040]' : 'bg-[#F0FFF8]'} border border-gray-300 focus:outline-none focus:ring focus:ring-[#219b53]`}
                                    onChange={handleSearchQuery}
                                />
                            </div>
                        </div>
                        <div className='flex gap-2'>
                            <Link to="/admin">
                                <button className={`px-4 py-2 ${currentTheme === 'dark' ? 'bg-[#404040]' : 'bg-[#F0FFF8]'} ${currentTheme === 'dark' ? 'text-white' : 'text-black'} rounded border`}>Back</button>
                            </Link>
                            <Link to="">
                                <button className={`px-4 py-2 ${currentTheme === 'dark' ? 'bg-[#404040]' : 'bg-[#F0FFF8]'} ${currentTheme === 'dark' ? 'text-white' : 'text-black'} rounded border`}>Print</button>
                            </Link>
                        </div>
                    </div>
                    <div className="table-container overflow-x-auto">
                        {loading && <p>Loading...</p>}
                        {error && <p>Error: {error}</p>}
                        <GenericTable
                            headers={['Sno', 'companyName', 'email', 'ownerName', 'registrationNumber','createdAt','updatedAt']}
                            data={displayData}
                            currentTheme={currentTheme}
                          
                        />
                    </div>
                    <div className="pages flex justify-center gap-1 mt-4">
                        <button className={`px-4 py-2 ${currentTheme === 'dark' ? 'bg-[#404040]' : 'bg-[#F0FFF8]'} ${currentTheme === 'dark' ? 'text-white' : 'text-black'} rounded border`}>Previous</button>
                        <button className={`px-4 py-2 ${currentTheme === 'dark' ? 'bg-[#404040]' : 'bg-[#F0FFF8]'} ${currentTheme === 'dark' ? 'text-white' : 'text-black'} rounded border`}>1 of 1</button>
                        <button className={`px-4 py-2 ${currentTheme === 'dark' ? 'bg-[#404040]' : 'bg-[#F0FFF8]'} ${currentTheme === 'dark' ? 'text-white' : 'text-black'} rounded border`}>Next</button>
                    </div>
                </div>
              
            </div>
        </div>
    );
};

export default RegisteredCompanies;
