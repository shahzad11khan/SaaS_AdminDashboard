import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import LeftSideBar from "../../LeftSideBar/LeftSideBar";
import Navbar from "../../Navbar/Navbar";
import { Link } from "react-router-dom";
import GenericTable from "../../Components/Table/GenericTable";

const DailyTask = () => {
    const currentTheme = useSelector((state) => state.theme.theme);
    const [tableData, setTableData] = useState([]);

    const initialTableData = () => {
        const currentDate = new Date();
        const initialData = [{
            date: currentDate.toLocaleDateString(),
            days: 30
        }];
        return initialData;
    };

    const updateTableData = () => {
        setTableData(prevData => {
            const lastEntry = prevData[prevData.length - 1];
            const newDate = new Date(lastEntry.date);
            newDate.setDate(newDate.getDate() + 1);

            const newEntry = {
                date: newDate.toLocaleDateString(),
                days: lastEntry.days + 1
            };
            const updatedData =[newEntry, ...prevData];
            localStorage.setItem("dailyTaskData",JSON.stringify(updatedData));
            return updatedData
        });
    };

    useEffect(() => {
        const storedData =localStorage.getItem("dailyTaskData");
        if(storedData){
             setTableData(JSON.parse(storedData))
        }
        else{
            const initialData =initialTableData();
             setTableData(initialData);

             localStorage.setItem("dailyTaskData",JSON.stringify(initialData))
        }
    }, []);

    useEffect(() => {
        const interval = setInterval(updateTableData, 24 * 60 * 60 * 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div>
            <Navbar />
            <div className="flex flex-col lg:flex-row">
                <LeftSideBar />
                <div className="flex flex-col lg:ml-10 w-full lg:w-[1000px] gap-3">
                    <div className="para">
                        <p className={`underline text-xl ${currentTheme === 'dark' ? 'text-white' : 'text-black'}`}>Daily Task Details</p>
                    </div>
                    <div className="info flex flex-col lg:flex-row justify-between items-center gap-2">
                        <div className="flex flex-col mt-5 lg:flex-row gap-2 items-center w-full lg:w-auto">
                            <div className={`flex items-center ${currentTheme === 'dark' ? 'text-white' : 'text-black'} gap-2`}>
                                <span>Show:</span>
                                <select
                                    className={`rounded-md px-2 py-1 ${currentTheme === 'dark' ? 'bg-[#404040]' : 'bg-[#F0FFF8]'} border border-gray-300`}
                                >
                                    {[...Array(10).keys()].map(num => (
                                        <option key={num + 1} value={num + 1}>{num + 1}</option>
                                    ))}
                                </select>
                            </div>
                            <div className={`flex items-center ${currentTheme === 'dark' ? 'text-white' : 'text-black'} gap-2`}>
                                <span>Entries:</span>
                                <input
                                    type="text"
                                    placeholder="Search by Date "
                                    className={`rounded-md px-2 py-1 ${currentTheme === 'dark' ? 'bg-[#404040]' : 'bg-[#F0FFF8]'}  border border-gray-300`}
                                />
                            </div>
                        </div>
                        <div className="flex">
                            <Link to="/admin">
                                <button className={`px-4 py-1 ${currentTheme === 'dark' ? 'bg-[#404040]' : 'bg-[#F0FFF8]'}  ${currentTheme === 'dark' ? 'text-white' : 'text-black'} rounded border`}>Back</button>
                            </Link>
                        </div>
                    </div>
                    <div className="table-container overflow-x-auto">
                        <GenericTable
                            headers={['SNo', 'Date', 'Days']}
                            data={tableData}
                            currentTheme={currentTheme}
                        />
                    </div>
                    <div className="pages ">
                        <div className="flex justify-center gap-1">
                            <button
                                className={`px-4 py-2 ${currentTheme === 'dark' ? 'bg-[#404040]' : 'bg-[#F0FFF8]'} ${currentTheme === 'dark' ? 'text-white' : 'text-black'} rounded border`}
                            >
                                Previous
                            </button>
                            <button className={`px-4 py-2 ${currentTheme === 'dark' ? 'bg-[#404040]' : 'bg-[#F0FFF8]'} ${currentTheme === 'dark' ? 'text-white' : 'text-black'} rounded border`}>
                                1 of 1
                            </button>
                            <button
                                className={`px-4 py-2 ${currentTheme === 'dark' ? 'bg-[#404040]' : 'bg-[#F0FFF8]'} ${currentTheme === 'dark' ? 'text-white' : 'text-black'} rounded border`}
                            >
                                Next
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DailyTask;