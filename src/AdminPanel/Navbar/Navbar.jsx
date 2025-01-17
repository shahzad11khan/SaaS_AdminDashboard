import { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [mobileView , setmobileView] =useState(false);
  const [LangisOpen, setLangIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };


  const toggleLanguage = () => {
    setLangIsOpen(!LangisOpen);
  };

  const toggleMobile=()=>{
    setmobileView(!mobileView);
  };
  return (
    <div className='flex justify-between items-center '>
      <nav className='w-full px-5 py-3'>
      <div className="flex justify-between item-center">

    
   <div className="logo ms-10 lg:ms-0">
   
         <Link to='/'>
<div className='flex items-center gap-2'>
         <img src="../../../images/justLogo.svg" alt="Logo" className="w-6 h-6 " /> 
         <span className='text-2xl'>Company Name</span>
         </div>
         </Link>

        </div>
  

   {/* Mobil Menu Toggle  */}
   <div className="lg:hidden">
    <button className="text-gray-300 focus outline-none"
    onClick={toggleMobile}
    >
        <i className="fas fa-bars text-2xl"></i>

    </button>
   </div>





   <div className="hidden lg:block w-[56%]  max-width-[600px]">
   <div className="relative ">
          <input
            type="text"
            placeholder="Search..."
            className="w-full ms-9 pl-5 py-2 rounded-md bg-[#F0FFF8] border border-gray-300 focus:outline-none focus:ring focus:ring-[#219b53]"
          />
          <div className="absolute inset-y-0 right-0 flex items-center text-gray-400">
                <i className="fas fa-search"></i>
              </div>
            </div>
           

      
   </div>
{/* icons */}
        <div className="hidden lg:flex items-center  space-x-4 mr-7">
        
         <button className="w-8 h-8 flex justify-center items-center bg-[#F0FFF8] border border-gray-300 rounded">
            <i className="fas fa-moon text-xl"></i>
          </button>

          <button className="w-8 h-8 flex justify-center items-center bg-[#F0FFF8] border border-gray-300 rounded">
            <i className="fas fa-bell text-xl"></i>
          </button>

           <div className="relative">
           <button
              className="flex items-center bg-[#F0FFF8] border border-gray-300 rounded-full px-2 py-1"
              onClick={toggleLanguage}>
              <i className="fas fa-globe text-[#013D29] text-xl"></i>
            </button>
            {LangisOpen && (
              <ul className='absolute ml-[-15px] w-20 mt-1 text-center bg-[#F0FFF8] border border-gray-300 rounded '>
                <li className="flex  px-2 py-2 text-left  hover:bg-gray-100 cursor-pointer">PK
                  <img
                    src="https://flagcdn.com/w40/pk.png"
                    alt="Pakistan Flag"
                    className="w-8 h-8 pl-0 mx-2 rounded-full"
                  />
                </li>
                <li className="flex  px-2 py-2 text-left  hover:bg-gray-100 cursor-pointer">US
                  <img
                    src="https://flagcdn.com/w40/us.png"
                    alt="USA Flag"
                    className="w-8 h-8 pl-0 mx-2 rounded-full"
                  />

                </li>
                <li className="flex px-2 py-2 text-left  hover:bg-gray-100 cursor-pointer">ES
                  <img
                    src="https://flagcdn.com/w40/es.png"
                    alt="Spain Flag"
                    className="w-8 h-8 pl-0 mx-2 rounded-full"
                  />

                </li>
              </ul>
            )

            }
           </div>

       

          <div className="relative">

            <button
              id="profile-logout"
              onClick={toggleDropdown}
               className="flex justify-center items-center w-10 h-10 bg-[#F0FFF8] border border-gray-300 rounded-full hover:bg-gray-100"
            >
              <img src="../../../images/justLogo.svg" alt="Logo" className="w-6 h-6 " />

            </button>


            {isOpen && (
              <ul className="absolute mt-1 ml-[-25px] bg-[#F0FFF8] border border-gray-300 rounded shadow-lg">
                <Link to="/Profile">
                <li className="px-2 py-1 hover:bg-gray-100 cursor-pointer">Profiles</li>
                </Link>
                <li className="px-2 py-1 hover:bg-gray-100 cursor-pointer flex items-center">
                  <i className="fas fa-sign-out-alt "></i>
                  Logout
                </li>
              </ul>
            )}
            {/* mobile view */}
            
            </div>
          </div>
        </div>

            {mobileView &&(

            
            <div className='lg:hidden mt-3 space-y-2'>
            <div className="relative">
          <input
            type="text"
            placeholder="Search..."
            className="w-full pl-5 py-2 rounded-md bg-[#F0FFF8] border border-gray-300 focus:outline-none focus:ring focus:ring-[#219b53]"
          />
               <div className='absolute inset-y-0 right-1 flex items-center text-gray-400'>
            <i className="fas fa-search text-gray-400"></i>

          </div>
            </div>
     
          <div className="flex items-center space-x-4">
        
        <button className="w-8 h-8 flex justify-center items-center bg-[#F0FFF8] border border-gray-300 rounded">
           <i className="fas fa-moon text-xl"></i>
         </button>

         <button className="w-8 h-8 flex justify-center items-center bg-[#F0FFF8] border border-gray-300 rounded">
           <i className="fas fa-bell text-xl"></i>
         </button>

          <div className="relative">
          <button
             className="flex items-center bg-[#F0FFF8] border border-gray-300 rounded-full px-2 py-1"
             onClick={toggleLanguage}>
             <i className="fas fa-globe text-[#013D29] text-xl"></i>
           </button>
           {LangisOpen && (
             <ul className='absolute ml-[-15px] w-20 mt-1 text-center bg-[#F0FFF8] border border-gray-300 rounded '>
               <li className="flex  px-2 py-2 text-left  hover:bg-gray-100 cursor-pointer">PK
                 <img
                   src="https://flagcdn.com/w40/pk.png"
                   alt="Pakistan Flag"
                   className="w-8 h-8 pl-0 mx-2 rounded-full"
                 />
               </li>
               <li className="flex  px-2 py-2 text-left  hover:bg-gray-100 cursor-pointer">US
                 <img
                   src="https://flagcdn.com/w40/us.png"
                   alt="USA Flag"
                   className="w-8 h-8 pl-0 mx-2 rounded-full"
                 />

               </li>
               <li className="flex px-2 py-2 text-left  hover:bg-gray-100 cursor-pointer">ES
                 <img
                   src="https://flagcdn.com/w40/es.png"
                   alt="Spain Flag"
                   className="w-8 h-8 pl-0 mx-2 rounded-full"
                 />

               </li>
             </ul>
           )

           }
          </div>

      

         <div className="relative">

           <button
             id="profile-logout"
             onClick={toggleDropdown}
              className="flex justify-center items-center w-10 h-10 bg-[#F0FFF8] border border-gray-300 rounded-full hover:bg-gray-100"
           >
             <img src="../../../images/justLogo.svg" alt="Logo" className="w-6 h-6 " />

           </button>


           {isOpen && (
             <ul className="absolute mt-1 ml-[-25px] bg-[#F0FFF8] border border-gray-300 rounded shadow-lg">
               <li className="px-2 py-1 hover:bg-gray-100 cursor-pointer">Profiles</li>
               <li className="px-2 py-1 hover:bg-gray-100 cursor-pointer flex items-center">
                 <i className="fas fa-sign-out-alt "></i>
                 Logout
               </li>
             </ul>
          )}
                 
            </div>
          </div>
          </div>
        )}
      </nav>
    </div>
  );
};

export default Navbar;