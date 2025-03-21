import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { removeSelectedCompany } from '../Slice/SelectedCompanySlice';
const LeftSideBar = () => {
  const dispatch =  useDispatch()
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [compDropdownOpen, setcompDropdownOpen] = useState(false);
  const [reportDropdownOpen, setReportDropdownOpen] = useState(false);

  const currentTheme = useSelector((state => state.theme.theme))


  const companiesToggle = () => {
    setcompDropdownOpen(!compDropdownOpen)
  }
  const reportToggle = () => {
    setReportDropdownOpen(!reportDropdownOpen)
  }

  const sideBarToggle = () => {
    setIsOpen(!isOpen)
  }

  const {companyId} = useSelector((state) => state.selectedCompany );


  return (
    <>

      <button
        className="lg:hidden p-2 absolute top-2 left-2 z-50 bg-[#219b53] text-white rounded"
        onClick={sideBarToggle}
      >
        <i className="fas fa-bars"></i>
      </button>


      <div className={`${isOpen ? 'w-full sm:w-full' : 'hidden'} relative lg:block  flex flex-col  
      ${currentTheme === 'dark' ? 'bg-[#404040]' : 'bg-[#F0FFF8]'} 
      ${currentTheme === 'dark' ? 'text-white' : 'text-black'} w-full sm:w-full md:w-full lg:w-[250px] min-h-screen  border border-gray-300  z-40 rounded-xl`}>
       
        <div className='middle ms-5 mt-5'>
          <div className='flex flex-col'>
            <h2 className='text-xl'>{t('leftSidebar.sections.dashboard.title')}</h2>
            <ul>
              <li className='py-1 '>
                <div className={`flex justify-between items-center cursor-pointer ${currentTheme === 'dark' ? 'hover:underline hover:text-white hover:bg-[#404052]' : 'hover:underline hover:text-black hover:bg-gray-100'}`} onClick={companiesToggle}>
                  {t('leftSidebar.sections.dashboard.companies.title')}
                  <span className={`text-2xl mr-2 pt-2 transition-transform duration-300 ${compDropdownOpen ? 'rotate-0' : 'rotate-180'} `} > ^ </span>
                </div>
                {compDropdownOpen && (
                  <ul className="pl-4">
                    {companyId?
                    <p onClick={()=> dispatch(removeSelectedCompany()) } className={`py-1  cursor-pointer ${currentTheme === 'dark' ? 'hover:underline hover:text-white hover:bg-[#404052]' : 'hover:underline hover:text-black hover:bg-gray-100'}`}>Go Back </p>
                    :
                    <Link to="/register-companies">
                      <li className={`py-1  cursor-pointer ${currentTheme === 'dark' ? 'hover:underline hover:text-white hover:bg-[#404052]' : 'hover:underline hover:text-black hover:bg-gray-100'}`}>
                        {t('leftSidebar.sections.dashboard.companies.registerCompanies')}
                      </li>
                    </Link>
                    }

                    <Link to="/register-user">
                      <li className={`py-1  cursor-pointer ${currentTheme === 'dark' ? 'hover:underline hover:text-white hover:bg-[#404052]' : 'hover:underline hover:text-black hover:bg-gray-100'}`}>
                        {t('leftSidebar.sections.dashboard.companies.registerUser')}
                      </li>
                    </Link>


                    <Link to='/user-role'>
                      <li className={`py-1  cursor-pointer ${currentTheme === 'dark' ? 'hover:underline hover:text-white hover:bg-[#404052]' : 'hover:underline hover:text-black hover:bg-gray-100'}`}>
                        {t('leftSidebar.sections.dashboard.companies.userRole')}
                      </li>
                    </Link>

                    <Link to="/send-notification">
                      <li className={`py-1  cursor-pointer ${currentTheme === 'dark' ? 'hover:underline hover:text-white hover:bg-[#404052]' : 'hover:underline hover:text-black hover:bg-gray-100'}`}>
                        {/* {t('leftSidebar.sections.dashboard.companies.registerUser')} */}
                    Send Notification
                      </li>
                    </Link>

                 

                  </ul>
                )}
              </li>


            </ul>
            
          </div>


          <div className='menu flex flex-col mt-5'>
            <h2 className='text-xl'>
              {t('leftSidebar.sections.management.title')}
            </h2>
            <ul>
              <Link to="/product">
                <li className={`py-1  cursor-pointer ${currentTheme === 'dark' ? 'hover:underline hover:text-white hover:bg-[#404052]' : 'hover:underline hover:text-black hover:bg-gray-100'}`}>
                  {t('leftSidebar.sections.management.items.product')}
                </li>
              </Link>

              <Link to="/stock">
                <li className={`py-1  cursor-pointer ${currentTheme === 'dark' ? 'hover:underline hover:text-white hover:bg-[#404052]' : 'hover:underline hover:text-black hover:bg-gray-100'}`}>
                  {t('leftSidebar.sections.management.items.stock')}
                </li>
              </Link>

              <Link to="/category">
                <li className={`py-1  cursor-pointer ${currentTheme === 'dark' ? 'hover:underline hover:text-white hover:bg-[#404052]' : 'hover:underline hover:text-black hover:bg-gray-100'}`}>
                  {t('leftSidebar.sections.management.items.category')}
                </li>
              </Link>

              <Link to="/byHand-order">
                <li className={`py-1  cursor-pointer ${currentTheme === 'dark' ? 'hover:underline hover:text-white hover:bg-[#404052]' : 'hover:underline hover:text-black hover:bg-gray-100'}`}>
                  {t('leftSidebar.sections.management.items.byHandOrder')}
                </li>
              </Link>

              <Link to="/warehouse">
                <li className={`py-1  cursor-pointer ${currentTheme === 'dark' ? 'hover:underline hover:text-white hover:bg-[#404052]' : 'hover:underline hover:text-black hover:bg-gray-100'}`}>
                  {t('leftSidebar.sections.management.items.warehouse')}
                </li>
              </Link>

              <Link to="/tags">
                <li className={`py-1  cursor-pointer ${currentTheme === 'dark' ? 'hover:underline hover:text-white hover:bg-[#404052]' : 'hover:underline hover:text-black hover:bg-gray-100'}`}>
                  {t('leftSidebar.sections.management.items.tag')}
                </li>
              </Link>

              <Link to="/online-order">
                <li className={`py-1  cursor-pointer ${currentTheme === 'dark' ? 'hover:underline hover:text-white hover:bg-[#404052]' : 'hover:underline hover:text-black hover:bg-gray-100'}`}>
                  {t('leftSidebar.sections.management.items.onlineOrder')}
                </li>
              </Link>

              <Link to="/deliver">
                <li className={`py-1  cursor-pointer ${currentTheme === 'dark' ? 'hover:underline hover:text-white hover:bg-[#404052]' : 'hover:underline hover:text-black hover:bg-gray-100'}`}>
                  {t('leftSidebar.sections.management.items.deliver')}
                </li>
              </Link>

              <Link to="/daily-task">
                <li className={`py-1  cursor-pointer ${currentTheme === 'dark' ? 'hover:underline hover:text-white hover:bg-[#404052]' : 'hover:underline hover:text-black hover:bg-gray-100'}`}>
                {t('leftSidebar.sections.management.items.dailyTask')}                </li>
              </Link>

              <li className='py-1 '>
                <div className={`flex justify-between items-center cursor-pointer ${currentTheme === 'dark' ? 'hover:underline hover:text-white hover:bg-[#404052]' : 'hover:underline hover:text-black hover:bg-gray-100'}`} onClick={reportToggle}>
                  {t('leftSidebar.sections.management.items.reports')}
                  <span className={`text-2xl mr-2 pt-2 transition-transform duration-300 ${reportDropdownOpen ? 'rotate-0' : 'rotate-180'} `} > ^ </span>
                </div>
                {reportDropdownOpen && (
                  <ul className="pl-4">
                    <Link to="/registered-companies">
                      <li className={`py-1  cursor-pointer ${currentTheme === 'dark' ? 'hover:underline hover:text-white hover:bg-[#404052]' : 'hover:underline hover:text-black hover:bg-gray-100'}`}>
                      {t('leftSidebar.sections.management.items.registeredCompanies')}
                      </li>
                    </Link>

                    <Link to="/registered-user">
                      <li className={`py-1  cursor-pointer ${currentTheme === 'dark' ? 'hover:underline hover:text-white hover:bg-[#404052]' : 'hover:underline hover:text-black hover:bg-gray-100'}`}>
                      {t('leftSidebar.sections.management.items.registeredUser')}
                      </li>
                    </Link>

                    <Link to="/registered-product">
                      <li className={`py-1  cursor-pointer ${currentTheme === 'dark' ? 'hover:underline hover:text-white hover:bg-[#404052]' : 'hover:underline hover:text-black hover:bg-gray-100'}`}>
                      {t('leftSidebar.sections.management.items.registeredProduct')}
                      </li>
                    </Link>


                    <Link to="/registered-stock">
                      <li className={`py-1  cursor-pointer ${currentTheme === 'dark' ? 'hover:underline hover:text-white hover:bg-[#404052]' : 'hover:underline hover:text-black hover:bg-gray-100'}`}>
                      {t('leftSidebar.sections.management.items.registeredStock')}
                      </li>
                    </Link>

                    <Link to="/registered-online-order">
                <li className={`py-1  cursor-pointer ${currentTheme === 'dark' ? 'hover:underline hover:text-white hover:bg-[#404052]' : 'hover:underline hover:text-black hover:bg-gray-100'}`}>
                  {t('leftSidebar.sections.management.items.onlineOrder')}
                </li>
              </Link>

              <Link to="/delivered-data">
                <li className={`py-1  cursor-pointer ${currentTheme === 'dark' ? 'hover:underline hover:text-white hover:bg-[#404052]' : 'hover:underline hover:text-black hover:bg-gray-100'}`}>
                Delivered
                  {/* {t('leftSidebar.sections.management.items.onlineOrder')} */}
                </li>
              </Link>

                

                  </ul>
                )}
              </li>
            </ul>
          </div>


          <div className='menu flex flex-col mt-5'>
            <h2 className='text-xl'>
              {t('leftSidebar.sections.notification.title')}
            </h2>
            <ul>
              <Link to={'/notification'}>
              <li className={`py-1 ${currentTheme === 'dark' ? 'hover:underline hover:text-white hover:bg-[#404052]' : 'hover:underline hover:text-black hover:bg-gray-100'} cursor-pointer`}>
                Notification
              </li>
              </Link>
              <li className={`py-1 ${currentTheme === 'dark' ? 'hover:underline hover:text-white hover:bg-[#404052]' : 'hover:underline hover:text-black hover:bg-gray-100'} cursor-pointer`}>
                {t('leftSidebar.sections.notification.items.message')}
              </li>
            </ul>
          </div>
        </div>


      </div>
    </>
  );
};

export default LeftSideBar;