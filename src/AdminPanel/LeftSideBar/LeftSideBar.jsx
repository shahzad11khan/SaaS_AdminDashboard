import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useSelector } from 'react-redux';

const LeftSideBar = () => {

  const [isOpen, setisOpen] = useState(false);
  const [compDropdownOpen, setcompDropdownOpen] = useState(false);
const currentTheme = useSelector((state=>state.theme.theme))
  
  
  const companiesToggle = () => {
    setcompDropdownOpen(!compDropdownOpen)
  }

  const sideBartoggle = () => {
    setisOpen(!isOpen)
  }



  return (
    <>

      <button
        className="lg:hidden p-2 absolute top-2 left-2 z-50 bg-[#219b53] text-white rounded"
        onClick={sideBartoggle}
      >
        <i className="fas fa-bars"></i>
      </button>


      <div className={`${isOpen ? 'w-full sm:w-full' : 'hidden'} relative lg:block  flex flex-col  
      ${currentTheme=== 'dark' ?'bg-[#404040]':'bg-[#F0FFF8]'} 
      ${currentTheme=== 'dark' ?'text-white':'text-black'} w-full sm:w-full md:w-full lg:w-[250px] min-h-screen  border border-gray-300  z-40 rounded-xl`}>
        <div className='middle ms-5 mt-5'>


          <div className='flex flex-col'>
            <h2 className='text-xl'>Dashboard</h2>
            <ul>
              <li className='py-1 '>
                <div className={`flex justify-between items-center cursor-pointer ${currentTheme === 'dark' ? 'hover:underline hover:text-white hover:bg-[#404052]' : 'hover:underline hover:text-black hover:bg-gray-100'}`}onClick={companiesToggle}>
                  Companies
                  <span className={`text-2xl mr-2 pt-2 transition-transform duration-300 ${compDropdownOpen ? 'rotate-0' : 'rotate-180'} `} > ^ </span>
                </div>
                {compDropdownOpen && (
                  <ul className="pl-4">
              
                      <Link to="/register-companies">
                       <li className={`py-1  cursor-pointer ${currentTheme === 'dark' ? 'hover:underline hover:text-white hover:bg-[#404052]' : 'hover:underline hover:text-black hover:bg-gray-100'}`}>Register Companie </li>
                       </Link>
                     
                    
                      <Link to="/register-user">
                        <li className={`py-1  cursor-pointer ${currentTheme === 'dark' ? 'hover:underline hover:text-white hover:bg-[#404052]' : 'hover:underline hover:text-black hover:bg-gray-100'}`}>Register User  </li>
                        </Link>
                    
                   
                      <Link to='/user-role'>
                      <li className={`py-1  cursor-pointer ${currentTheme === 'dark' ? 'hover:underline hover:text-white hover:bg-[#404052]' : 'hover:underline hover:text-black hover:bg-gray-100'}`}> User Role </li>
                      </Link>
                   
                  </ul>
                )}
              </li>
          

            </ul>
          </div>


          <div className='menu flex flex-col mt-5'>
            <h2 className='text-xl'>Management</h2>
            <ul>
            <Link to="/product">
                <li className={`py-1  cursor-pointer ${currentTheme === 'dark' ? 'hover:underline hover:text-white hover:bg-[#404052]' : 'hover:underline hover:text-black hover:bg-gray-100'}`}>Product</li>
             </Link>

             <Link to="/stock">
                <li className={`py-1  cursor-pointer ${currentTheme === 'dark' ? 'hover:underline hover:text-white hover:bg-[#404052]' : 'hover:underline hover:text-black hover:bg-gray-100'}`}>Stock</li>
             </Link>

             <Link to="/category">
                <li className={`py-1  cursor-pointer ${currentTheme === 'dark' ? 'hover:underline hover:text-white hover:bg-[#404052]' : 'hover:underline hover:text-black hover:bg-gray-100'}`}>Category</li>
             </Link>

             <Link to="/customer">
                <li className={`py-1  cursor-pointer ${currentTheme === 'dark' ? 'hover:underline hover:text-white hover:bg-[#404052]' : 'hover:underline hover:text-black hover:bg-gray-100'}`}>Customer</li>
             </Link>

                <Link to="/warehouse">
                <li className={`py-1  cursor-pointer ${currentTheme === 'dark' ? 'hover:underline hover:text-white hover:bg-[#404052]' : 'hover:underline hover:text-black hover:bg-gray-100'}`}>Warehouse</li>
             </Link>
              
             <Link to="/reports">
                <li className={`py-1  cursor-pointer ${currentTheme === 'dark' ? 'hover:underline hover:text-white hover:bg-[#404052]' : 'hover:underline hover:text-black hover:bg-gray-100'}`}>Reports</li>
             </Link>

             <Link to="/tags">
                <li className={`py-1  cursor-pointer ${currentTheme === 'dark' ? 'hover:underline hover:text-white hover:bg-[#404052]' : 'hover:underline hover:text-black hover:bg-gray-100'}`}>Tag</li>
             </Link>

             <Link to="/order">
                <li className={`py-1  cursor-pointer ${currentTheme === 'dark' ? 'hover:underline hover:text-white hover:bg-[#404052]' : 'hover:underline hover:text-black hover:bg-gray-100'}`}>Order</li>
             </Link>

             <Link to="/delever">
                <li className={`py-1  cursor-pointer ${currentTheme === 'dark' ? 'hover:underline hover:text-white hover:bg-[#404052]' : 'hover:underline hover:text-black hover:bg-gray-100'}`}>Delever</li>
             </Link>
            </ul>
          </div>


          <div className='menu flex flex-col mt-5'>
            <h2 className='text-xl'>Notification</h2>
            <ul>
              <li className={`py-1 ${currentTheme === 'dark' ? 'hover:underline hover:text-white hover:bg-[#404052]' : 'hover:underline hover:text-black hover:bg-gray-100'} cursor-pointer`}>Transaction</li>
              <li className={`py-1 ${currentTheme === 'dark' ? 'hover:underline hover:text-white hover:bg-[#404052]' : 'hover:underline hover:text-black hover:bg-gray-100'} cursor-pointer`}>Message</li>
            </ul>
          </div>
        </div>

        {/* User Profile Section */}
        {/* <div className='below flex items-center justify-start p-2 mt-10 bg-[#219b53] w-full sm:w-full md:w-[180px] lg:w-[190px] rounded'>
          <div className='image h-[30px] w-[30px]'>
            <img className='rounded-full object-cover h-full w-full' src="/images/kashif_pic.jpg" alt="Profile" />
          </div>
          <div className='name ml-3'>
            <h3 className='font-bold text-white'>Kashif Khalil</h3>
            <p className='text-sm text-gray-200'>Software Engineer</p>
          </div>
          <div className="drop-down ml-auto">
            <i className="fas fa-chevron-down text-black"></i>
          </div>
        </div> */}

      </div>
    </>
  );
};

export default LeftSideBar;