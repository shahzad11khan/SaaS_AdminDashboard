import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addNotification } from "../../Slice/NotificationSlice";
import { io } from "socket.io-client";import LeftSideBar from "../../LeftSideBar/LeftSideBar"
import Navbar from "../../Navbar/Navbar"
import { Link } from "react-router-dom";


const Notification = () => {
  const currentTheme = useSelector((state) => state.theme.theme);
  const dispatch = useDispatch();
  const notifications = useSelector((state) => state.notifications);

  useEffect(() => {
    const socket = io("https://saas-serversidescript.vercel.app");

    socket.on("orderNotification", (order) => {
      dispatch(addNotification(order));
    });

    return () => {
      socket.disconnect();    };
  }, [dispatch]);

  return (
    <div>
      <Navbar />
      <div className="flex flex-col lg:flex-row">
        <LeftSideBar />
        <div className="flex flex-col lg:ml-10 w-full lg:w-[1000px] gap-3">
          <div className="para">
            <p className={`underline text-xl ${currentTheme === 'dark' ? 'text-white' : 'text-black'}`}>New Order Notification</p>
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
 
                    {notifications.map((order, index) => (
        <div key={index} className="notification">
           New Order: {order.userId} - {order.totalAmount}
        </div>
      ))}
          {/* <div className="table-container overflow-x-auto">
            <GenericTable
              headers={['SNo', 'Date', 'Order Id', 'Total Amount']}
            /  // data={tableData}
              currentTheme={currentTheme}
            />
          </div> */}
          {/* <div className="pages ">
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
          </div> */}
        </div>
      </div>
    </div>
  )
}

export default Notification
