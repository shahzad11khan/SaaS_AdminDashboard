import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import LeftSideBar from "../../LeftSideBar/LeftSideBar";
import Navbar from "../../Navbar/Navbar";
import GenericTable from "../../Components/Table/GenericTable";
import { fetchCompanies } from "../../Slice/CompanySlice";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { Auth } from "../../../utils/globleAtuhenticate";


const RegisteredCompanies = () => {
    const [rowToShow, setRowsToShow] = useState(5);
    const [searchQuery, setSearchQuery] = useState("");
    const [initialCount, setInitialCount] = useState(0);
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const currentTheme = useSelector((state) => state.theme.theme);
    const dispatch = useDispatch();
    const { data: companiesData } = useSelector((state) => state.companies);
    
   

    useEffect(() => {
        dispatch(fetchCompanies());
    }, [dispatch]);

    const handleRowChange = (e) => {
        setRowsToShow(parseInt(e.target.value, 10));
    };

    const handleSearchQuery = (e) => {
        setSearchQuery(e.target.value.toLowerCase());
    };

    const showNext = () => {
        if (initialCount + rowToShow < filterData.length) {
            setInitialCount(initialCount + rowToShow);
        }
    };

    const showPrevious = () => {
        if (initialCount - rowToShow >= 0) {
            setInitialCount(initialCount - rowToShow);
        }
    };


    const filterData = companiesData.filter((companies) =>{
        const companiesDate = new Date(companies.createdAt.split("T")[0]);
        const start = new Date(startDate);
        const end = new Date(endDate);
        const dateRange = (!startDate || companiesDate >= start) && (!endDate || companiesDate <= end);
      
    const matchSearchQuery =  companies.companyName.toLowerCase().includes(searchQuery) ||
      companies.ownerName.toLowerCase().includes(searchQuery) ||
      companies.address.toLowerCase().includes(searchQuery) ||
      companies.registrationNumber.toLowerCase().includes(searchQuery)

      return dateRange & matchSearchQuery;

});
  const displayData = filterData.slice(initialCount, initialCount + rowToShow);


  const handlePrint = () => {
   

    const doc = new jsPDF();

    doc.text("Company Name", 14, 8);
    doc.text("Registered Companies", 14, 15);

    const tableHeaders = [["SNo", "C.Name", "Email", "Owner Name", "RegNo", "Created At", "Updated At"]];

    const tableData = companiesData.map((company, index) => [
        index + 1,
        company.companyName,
        company.email,
        company.ownerName,
        company.registrationNumber,
        company.createdAt.split("T")[0],
        company.updatedAt.split("T")[0],
    ]);

    doc.autoTable({
        head: tableHeaders,
        body: tableData,
        startY: 20
    });

    doc.save("RegisteredCompanies.pdf");
};


if(!Auth()) return null;
    return (
        <div>
            <Navbar />
            <div className='flex flex-col lg:flex-row'>
                <LeftSideBar />
                <div className='flex flex-col lg:ml-10 w-full lg:w-[1000px] gap-3'>
                    <div className="para">
                        <p className={`underline text-xl ${currentTheme === 'dark' ? 'text-white' : 'text-black'}`}>Company Registration</p>
                    </div>
                    <div className="info flex flex-col lg:flex-row justify-between items-center gap-2 mt-5">
                        <div className='flex flex-col lg:flex-row gap-2 items-center w-full lg:w-[auto]'>
                            <div className={`flex items-center ${currentTheme === 'dark' ? 'text-white' : 'text-black'} gap-2`}>
                                <span>Show:</span>
                                <select
                                    className={`rounded-md px-1 py-1 ${currentTheme === 'dark' ? 'bg-[#404040]' : 'bg-[#F0FFF8]'} border border-gray-300 focus:outline-none focus:ring focus:ring-[#219b53]`}
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
                                    className={`w-44 rounded-md px-1 py-1 ${currentTheme === 'dark' ? 'bg-[#404040]' : 'bg-[#F0FFF8]'} border border-gray-300 focus:outline-none focus:ring focus:ring-[#219b53]`}
                                    onChange={handleSearchQuery}
                                />
                            </div>
                            <div className={`flex items-center ${currentTheme === 'dark' ? 'text-white' : 'text-black'} gap-2`}>
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
                                <button className={`px-2 py-1 ${currentTheme === 'dark' ? 'bg-[#404040]' : 'bg-[#F0FFF8]'} ${currentTheme === 'dark' ? 'text-white' : 'text-black'} rounded border`}>Back</button>
                            </Link>
                          
                                <button onClick={handlePrint} className={`px-2 py-1 ${currentTheme === 'dark' ? 'bg-[#404040]' : 'bg-[#F0FFF8]'} ${currentTheme === 'dark' ? 'text-white' : 'text-black'} rounded border`}>Print</button>
                        
                        </div>
                    </div>
                    <div className="table-container overflow-x-auto">
                       
                        <GenericTable
                            headers={['Sno', 'companyName', 'email', 'ownerName', 'registrationNumber','createdAt','updatedAt']}
                            data={displayData}
                            currentTheme={currentTheme}
                          
                        />
                    </div>
                    <div className="flex justify-center gap-1">
                            <button
                                onClick={showPrevious}
                                className={`px-4 py-2 ${currentTheme === 'dark' ? 'bg-[#404040]' : 'bg-[#F0FFF8]'} ${currentTheme === 'dark' ? 'text-white' : 'text-black'} rounded border`}
                            >
                                Previous
                            </button>
                            <button className={`px-4 py-2 ${currentTheme === 'dark' ? 'bg-[#404040]' : 'bg-[#F0FFF8]'} ${currentTheme === 'dark' ? 'text-white' : 'text-black'} rounded border`}>
                                {Math.ceil((initialCount + rowToShow) / rowToShow)} of {Math.ceil(filterData.length / rowToShow)}
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
    );
};

export default RegisteredCompanies;
