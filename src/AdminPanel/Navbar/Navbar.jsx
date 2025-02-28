import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toggleTheme } from '../Slice/ThemeSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { removedToken } from '../Slice/TokenSlice';
import { googleLogout } from '@react-oauth/google';
import io from "socket.io-client";

const Navbar = () => {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const currentTheme = useSelector((state) => state.theme.theme);
  const [isOpen, setIsOpen] = useState(false);
  const [mobileView, setMobileView] = useState(false);
  const [LangIsOpen, setLangIsOpen] = useState(false);
  const { userId, loginCompanyName, companyLogo } = useSelector(state => state.authenticate)
  // const socket = io("http://localhost:5000"); for local
  // const socket = io("https://saas-serversidescript.vercel.app"); // for live
  const socket = io("https://saasserversidescript-production-162a.up.railway.app");
  const [notificationCount, setNotificationCount] = useState(0);

  useEffect(() => {
    socket.on("newOrder", () => {
      setNotificationCount((prev) => prev + 1);
    });

    return () => {
      socket.off("newOrder");
    };
  }, []);
  const Navigate = useNavigate();

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };


  const toggleLanguage = () => {
    setLangIsOpen(!LangIsOpen);
  };

  const toggleMobile = () => {
    setMobileView(!mobileView);
  };

  const toggleMode = () => {
    dispatch(toggleTheme());
  };
  const handleChange = (lang) => {
    i18n.changeLanguage(lang)
  }

  const handleLogout = () => {
    dispatch(removedToken())
    googleLogout();
    Navigate('/');

  }

  const { companyName, companyId, companyImg } = useSelector((state) => state.selectedCompany);

  return (
    <div className='flex justify-between items-center '>
      <nav className='w-full px-5 py-3'>
        <div className="flex justify-between item-center">

          <div className="logo ms-10 lg:ms-0">
            <Link to='/admin'>
              {companyId ?
                <div className='flex items-center gap-2'>
                  <img src={companyImg} alt="Logo" className="rounded-full w-9 h-9 " />
                  <span className={`text-2xl ${currentTheme === 'dark' ? 'text-white' : 'text-black'} `}>{companyName}</span>
                </div>
                : userId ?
                  <div className='flex items-center gap-2'>
                    <img src={companyLogo} alt="Logo" className="rounded-full w-9 h-9 " />
                    <span className={`text-2xl ${currentTheme === 'dark' ? 'text-white' : 'text-black'} `}>{loginCompanyName}</span>
                  </div>
                  :
                  <div className='flex items-center gap-2'>
                    <img src="../../../images/justLogo.svg" alt="Logo" className="w-6 h-6 " />
                    <span className={`text-2xl ${currentTheme === 'dark' ? 'text-white' : 'text-black'} `}>{t('navbar.left.cName')}</span>
                  </div>
              }
            </Link>
          </div>



          <div className="lg:hidden">
            <button className="text-gray-300 focus outline-none"
              onClick={toggleMobile}>
              <i className="fas fa-bars text-2xl"></i>
            </button>
          </div>

          <div className="hidden lg:block  w-[715px]  lg:ml-[-85px]">
            <div className="relative ">
              <input
                type="text"
                placeholder={t('navbar.center.search')}
                className={`w-full pl-5 py-2 rounded-md  ${currentTheme === 'dark' ? 'bg-[#404040]' : 'bg-[#F0FFF8]'} ${currentTheme === 'dark' ? 'text-white' : 'text-black'}  border border-gray-300 focus:outline-none focus:ring focus:ring-[#219b53]`} />
              <div className="absolute inset-y-0 right-5 flex items-center text-gray-400">
                <i className="fas fa-search"></i>
              </div>
            </div>
          </div>


          <div className="hidden lg:flex items-center  space-x-4 mr-7">
            <button className={`w-10 h-10 flex justify-center items-center ${currentTheme === 'dark' ? 'bg-[#404040] text-white' : 'bg-[#F0FFF8] text-black'} border border-gray-300 rounded-full`} onClick={toggleMode}>
              <i className={`fas ${currentTheme === 'dark' ? 'fa-sun' : 'fa-moon'} text-xl`}></i>
            </button>

            <button className={`relative flex justify-center items-center w-10 h-10 rounded-full transition-colors duration-200 border border-gray-300  ${currentTheme === 'dark' ? 'bg-[#404040]' : 'bg-[#F0FFF8]'}`}>
              <i className={`fas fa-bell text-xl ${currentTheme === 'dark' ? 'text-gray-200' : 'text-gray-700'}`}></i>

              {notificationCount > 0 && (
                <span className="absolute flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-red-500 rounded-full -top-1 -right-1">
                  {notificationCount}
                </span>
              )}
            </button>

            <div className="relative">
              <button
                className={`w-10 h-10 flex items-center border border-gray-300 rounded-full px-2 py-1 ${currentTheme === 'dark' ? 'bg-[#404040]' : 'bg-[#F0FFF8]'} ${currentTheme === 'dark' ? 'text-white' : 'text-black'}`}
                onClick={toggleLanguage}>
                <i className={`fas fa-globe text-xl ${currentTheme === 'dark' ? 'text-white' : 'text-[#013D29]'}`}></i>
              </button>   
              {LangIsOpen && (
                <ul className={`absolute z-10 ml-[-15px] w-20 mt-1 text-center  ${currentTheme === 'dark' ? 'bg-[#404040]' : 'bg-[#F0FFF8]'} ${currentTheme === 'dark' ? 'text-white' : 'text-black'}  border border-gray-300 rounded `}>
                  <li onClick={() => handleChange("ur")} className="flex  px-2 py-2 text-left  hover:bg-gray-100 cursor-pointer">PK
                    <img
                      src="https://flagcdn.com/w40/pk.png"
                      alt="Pakistan Flag"
                      className="w-8 h-8 pl-0 mx-2 rounded-full"
                    />
                  </li>
                  <li onClick={() => handleChange("en")} className="flex  px-2 py-2 text-left  hover:bg-gray-100 cursor-pointer">US
                    <img
                      src="https://flagcdn.com/w40/us.png"
                      alt="USA Flag"
                      className="w-8 h-8 pl-0 mx-2 rounded-full" />
                  </li>
                  <li onClick={() => handleChange("sp")} className="flex px-2 py-2 text-left  hover:bg-gray-100 cursor-pointer">ES
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
                className={`flex justify-center items-center w-10 h-10  ${currentTheme === 'dark' ? 'bg-[#404040]' : 'bg-[#F0FFF8]'} border border-gray-300 rounded-full hover:bg-gray-100`}
              >
                {companyId ?
                  <img src={companyImg} alt="Logo" className="rounded-full w-10 h-10 " />
                  : userId ?
                    <img src={companyLogo} alt="Logo" className="rounded-full w-10 h-10 " />
                    :
                    <img src="../../../images/justLogo.svg" alt="Logo" className="w-6 h-6 " />

                }
              </button>
              {isOpen && (
                <ul className={`z-10 absolute mt-1 ml-[-25px] ${currentTheme === 'dark' ? 'bg-[#404040]' : 'bg-[#F0FFF8]'} ${currentTheme === 'dark' ? 'text-white' : 'text-black'} border border-gray-300 rounded shadow-lg`}>
                  <Link to="/profile">
                    <li className="px-2 py-1 hover:bg-gray-100 cursor-pointer">{t("navbar.right.profile")}</li>
                  </Link>


                  <li onClick={() => handleLogout()} className="px-2 py-1 hover:bg-gray-100 cursor-pointer flex items-center">
                    <i className="fas fa-sign-out-alt "></i>
                    {t("navbar.right.logout")}
                  </li>

                </ul>
              )}

            </div>
          </div>
        </div>

        {mobileView && (
          <div className='lg:hidden mt-3 space-y-2'>
            <div className="relative">
              <input
                type="text"
                placeholder={t('navbar.center.search')}
                className={`w-full pl-5 py-2 rounded-md  ${currentTheme === 'dark' ? 'text-white' : 'text-black'} ${currentTheme === 'dark' ? 'bg-[#404040]' : 'bg-[#F0FFF8]'} border border-gray-300 focus:outline-none focus:ring focus:ring-[#219b53]`}
              />
              <div className='absolute inset-y-0 right-1 flex items-center text-gray-400'>
                <i className="fas fa-search text-gray-400"></i>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <button className={`w-10 h-10 flex justify-center items-center ${currentTheme === 'dark' ? 'bg-[#404040]' : 'bg-[#F0FFF8]'} ${currentTheme === 'dark' ? 'text-white' : 'text-black'} border border-gray-300 rounded-full`} onClick={toggleMode}>
                <i className={`fas ${currentTheme === 'dark' ? 'fa-sun' : 'fa-moon'} text-xl`}></i>
              </button>

              <button className={`relative w-10 h-10 flex justify-center items-center ${currentTheme === 'dark' ? 'bg-[#404040]' : 'bg-[#F0FFF8]'} ${currentTheme === 'dark' ? 'text-white' : 'text-black'} border border-gray-300 rounded-full`}>
              <i className={`fas fa-bell text-xl `}></i>

              {notificationCount > 0 && (
                <span className="absolute flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-red-500 rounded-full -top-1 -right-1">
                  {notificationCount}
                </span>
              )}
              </button>

              <div className="relative">
                
              <button className={`w-10 h-10 flex justify-center items-center ${currentTheme === 'dark' ? 'bg-[#404040]' : 'bg-[#F0FFF8]'} ${currentTheme === 'dark' ? 'text-white' : 'text-black'} border border-gray-300 rounded-full`}
                  onClick={toggleLanguage}>
                  <i className={`fas fa-globe text-xl ${currentTheme === 'dark' ? 'text-white' : 'text-[#013D29]'}`}></i>
                </button>
                {LangIsOpen && (
                  <ul className={`absolute ml-[-15px] w-20 mt-1 text-center  ${currentTheme === 'dark' ? 'bg-[#404040]' : 'bg-[#F0FFF8]'} ${currentTheme === 'dark' ? 'text-white' : 'text-black'}  border border-gray-300 rounded `}>
                    <li onClick={() => handleChange("ur")} className="flex  px-2 py-2 text-left  hover:bg-gray-100 cursor-pointer">PK
                      <img
                        src="https://flagcdn.com/w40/pk.png"
                        alt="Pakistan Flag"
                        className="w-8 h-8 pl-0 mx-2 rounded-full"
                      />
                    </li>
                    <li onClick={() => handleChange("us")} className="flex  px-2 py-2 text-left  hover:bg-gray-100 cursor-pointer">US
                      <img
                        src="https://flagcdn.com/w40/us.png"
                        alt="USA Flag"
                        className="w-8 h-8 pl-0 mx-2 rounded-full"
                      />

                    </li>
                    <li onClick={() => handleChange("sp")} className="flex px-2 py-2 text-left  hover:bg-gray-100 cursor-pointer">ES
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
                  className={`flex justify-center items-center w-10 h-10  ${currentTheme === 'dark' ? 'bg-[#404040]' : 'bg-[#F0FFF8]'} border border-gray-300 rounded-full hover:bg-gray-100`}>
                  {companyId ?
                    <img src={companyImg} alt="Logo" className="rounded-full w-10 h-10 " />

                    : <img src="../../../images/justLogo.svg" alt="Logo" className="w-6 h-6 " />
                  }
                </button>

                {isOpen && (
                  <ul className={`absolute mt-1 ml-[-25px] ${currentTheme === 'dark' ? 'bg-[#404040]' : 'bg-[#F0FFF8]'} ${currentTheme === 'dark' ? 'text-white' : 'text-black'} border border-gray-300 rounded shadow-lg`}>
                    <Link to="/profile">
                      <li className="px-2 py-1 hover:bg-gray-100 cursor-pointer">{t("navbar.right.profile")}</li>
                    </Link>


                    <li onClick={() => handleLogout()} className="px-2 py-1 hover:bg-gray-100 cursor-pointer flex items-center">
                      <i className="fas fa-sign-out-alt "></i>
                      {t("navbar.right.logout")}
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