import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Admin from './AdminPanel/Admin'
import './App.css'
import './i18'
import Registeruser from './AdminPanel/Pages/RegisterUser/Registeruser';
import UserRegistrationForm from './AdminPanel/Pages/RegisterUser/UserRegistrationForm';
import Registercompanies from './AdminPanel/Pages/RegisterCompanie/Companies';
import UserRole from  './AdminPanel/Pages/UserRole/Userrole';
import Product from './AdminPanel/Pages/Product/product';
import ProductRegistrationForm from './AdminPanel/Pages/Product/ProductRegistrationForm';
import Stock from './AdminPanel/Pages/Stock/Stock';
import StockRegistrationForm from './AdminPanel/Pages/Stock/StockRegistrationForm';
import Warehouse from './AdminPanel/Pages/Warehouse/Warehouse';
import WarehouseRegistrationForm from './AdminPanel/Pages/Warehouse/WarehouseRegistrationForm';
import Reports from './AdminPanel/Pages/Reports/Reports';
import ReportRegistrationForm from './AdminPanel/Pages/Reports/ReportRegistrationForm';
import Tags from './AdminPanel/Pages/Tags/Tags';
import CompanyRegistrationForm from './AdminPanel/Pages/RegisterCompanie/CompanyRegistrationForm';
import ByHandOrder from './AdminPanel/Pages/ByHandOrder/ByHandOrder'
import ByHandOrderForm from './AdminPanel/Pages/ByHandOrder/ByHandOrderForm'
import UserRoleRegistrationForm from './AdminPanel/Pages/UserRole/UserRoleRegistrationForm';
import TagRegistrationForm from './AdminPanel/Pages/Tags/TagRegistrationForm';
import Category from './AdminPanel/Pages/Category/Category';
import CategoryRegistrationForm from './AdminPanel/Pages/Category/CategoryRegistrationForm';
import SignIn from './AdminPanel/Pages/SignIn/Signin';
import Profile from './AdminPanel/Pages/Profile/Profile';
import OnlineOrder from './AdminPanel/Pages/OnlineOrder/OnlineOrder';
import OnlineOrderForm from './AdminPanel/Pages/OnlineOrder/OnlineOrderForm';
import Delever from './AdminPanel/Pages/Delever/Delever';
import DeliveryForm from './AdminPanel/Pages/Delever/DeliveryForm';
import RegisteredCompanies from './AdminPanel/Pages/Reports/RegisteredCompanies';
import RegisteredProduct from './AdminPanel/Pages/Reports/RegisteredProducts';
import RegisteredStock from './AdminPanel/Pages/Reports/RegisterStock';
import RegisteredUser from './AdminPanel/Pages/Reports/RegisteredUser';
import RegisteredByHandOrder from './AdminPanel/Pages/Reports/RegisteredByHandOrders';
import RegisteredOnlineOrder from './AdminPanel/Pages/Reports/RegisterOnlineOrders';
import CompaniesData from './AdminPanel/Pages/RegisterCompanie/CompaniesData';
import DeliveredData from './AdminPanel/Pages/Reports/DeliveredData';
import { useSelector } from 'react-redux';


function App() {
  const currentTheme = useSelector((state) => state.theme.theme);
  
  return (
    <div className={`${currentTheme ==='dark' ? 'bg-[#404040]' : 'bg-white'}`}>
    
    <Router>
      <Routes>
      <Route path="/" element={<SignIn/>}/>
        <Route path="/admin" element={<Admin/>}/>
        <Route path="/register-user" element={<Registeruser/>}/>
        <Route path="/user-registration-form" element={<UserRegistrationForm/>}/>   
        <Route path="/register-companies" element={<Registercompanies/>}/>
        <Route path="/register-form" element={<CompanyRegistrationForm/>}/>
        <Route path="/user-role" element={<UserRole/>}/>
        <Route path="/user-role-registration-form" element={<UserRoleRegistrationForm/>}/>
        <Route path="/product" element={<Product/>}/>
        <Route path="/product-registration-form" element={<ProductRegistrationForm/>}/>
        <Route path="/stock" element={<Stock/>}/>
        <Route path="/stock-registration-form" element={<StockRegistrationForm/>}/>
        <Route path="/category" element={<Category/>}/>
        <Route path="/category-registration-form" element={<CategoryRegistrationForm/>}/>       
        <Route path="/byHand-order" element={<ByHandOrder/>}/>
        <Route path="/byHand-order-form" element={<ByHandOrderForm/>}/>
        <Route path="/warehouse" element={<Warehouse/>}/>
        <Route path="/warehouse-registration-form" element={<WarehouseRegistrationForm/>}/>
        <Route path="/reports" element={<Reports/>}/>
        <Route path="/report-registration-form" element={<ReportRegistrationForm/>}/>
        <Route path="/tags" element={<Tags/>}/>
        <Route path="/tag-registration-form" element={<TagRegistrationForm/>}/>
        <Route path="/online-order" element={<OnlineOrder/>}/>
        <Route path="/online-order-form" element={<OnlineOrderForm/>}/>
        <Route path="/delever" element={<Delever/>}/>
        <Route path="/delivery-form" element={<DeliveryForm/>}/>
        <Route path="/profile" element={<Profile/>}/>
        <Route path="/registered-companies" element={<RegisteredCompanies/>}/>
        <Route path="/registered-product" element={<RegisteredProduct/>}/>
        <Route path="/registered-stock" element={<RegisteredStock/>}/>
        <Route path="/registered-user" element={<RegisteredUser/>}/>
        <Route path="/registered-online-order" element={<RegisteredOnlineOrder/>}/>
        <Route path="/registered-byHand-order" element={<RegisteredByHandOrder/>}/> 
        <Route path="/companies-data" element={<CompaniesData/>}/> 
        <Route path="/delivered-data" element={<DeliveredData/>}/> 



         

      </Routes>
    </Router>
    
  
    </div>
  )
}

export default App
