import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Admin from './AdminPanel/Admin'
import './App.css'
import Registeruser from './AdminPanel/Pages/RegisterUser/Registeruser';
import UserRegistrationForm from './AdminPanel/Pages/RegisterUser/UserRegistrationForm';
import UserSecurityForm from './AdminPanel/Pages/RegisterUser/UserSecurityForm';
import Registercompanies from './AdminPanel/Pages/RegisterCompanie/Companies';
import UserRole from  './AdminPanel/Pages/UserRole/Userrole';
// import {Profile} from './AdminPanel/Pages/Profile/profile';
import Profile from './AdminPanel/Pages/Profile/profile';
import Product from './AdminPanel/Pages/Product/product';
import ProductRegistrationForm from './AdminPanel/Pages/Product/ProductRegistrationForm';
import Stock from './AdminPanel/Pages/Stock/Stock';
import StockRegistrationForm from './AdminPanel/Pages/Stock/StockRegistrationForm';
import Quantity from './AdminPanel/Pages/Quantity/Quantity';
import QuantityRegistrationForm from './AdminPanel/Pages/Quantity/QuantityRegistrationForm';
import Customer from './AdminPanel/Pages/Customer/Customer';
import Warehouse from './AdminPanel/Pages/Warehouse/Warehouse';
import WarehouseRegistrationForm from './AdminPanel/Pages/Warehouse/WarehouseRegistrationForm';
import Reports from './AdminPanel/Pages/Reports/Reports';
import ReportRegistrationForm from './AdminPanel/Pages/Reports/ReportRegistrationForm';
import Tags from './AdminPanel/Pages/Tags/Tags';
import CompanyRegistrationForm from './AdminPanel/Pages/RegisterCompanie/CompanyRegistrationForm';
import Customerform from './AdminPanel/Pages/Customer/CustomerForm';
import UserRoleRegistrationForm from './AdminPanel/Pages/UserRole/UserRoleRegistrationForm';
// import CompanyOwnerContactForm from './AdminPanel/Pages/RegisterCompanie/CompanyOwnerContactForm';
// import CompanyRegistrationBillingForm from './AdminPanel/Pages/RegisterCompanie/CompanyRegistrationBillingForm';
import TagRegistrationForm from './AdminPanel/Pages/Tags/TagRegistrationForm';

function App() {


  return (
    <>
    
    <Router>
      <Routes>
        <Route path="/" element={<Admin/>}/>
        <Route path="/register-user" element={<Registeruser/>}/>
        <Route path="/user-registration-form" element={<UserRegistrationForm/>}/>
        <Route path="/user-security-form" element={<UserSecurityForm/>}/>
        <Route path="/register-companies" element={<Registercompanies/>}/>
        <Route path="/register-form" element={<CompanyRegistrationForm/>}/>
        {/* <Route path="/company-owner-contact-form" element={<CompanyOwnerContactForm/>}/> */}
        {/* <Route path="/company-registration-billing-form" element={<CompanyRegistrationBillingForm/>}/> */}
        <Route path="/user-role" element={<UserRole/>}/>
        <Route path="/user-role-registration-form" element={<UserRoleRegistrationForm/>}/>
        <Route path="/profile" element={<Profile/>}/>
        <Route path="/product" element={<Product/>}/>
        <Route path="/product-registration-form" element={<ProductRegistrationForm/>}/>
        <Route path="/stock" element={<Stock/>}/>
        <Route path="/stock-registration-form" element={<StockRegistrationForm/>}/>  
        <Route path="/quantity" element={<Quantity/>}/>
        <Route path="/quantity-registration-form" element={<QuantityRegistrationForm/>}/>       
        <Route path="/customer" element={<Customer/>}/>
        <Route path="/customer-form" element={<Customerform/>}/>
        <Route path="/warehouse" element={<Warehouse/>}/>
        <Route path="/warehouse-registration-form" element={<WarehouseRegistrationForm/>}/>
        <Route path="/reports" element={<Reports/>}/>
        <Route path="/report-registration-form" element={<ReportRegistrationForm/>}/>
        <Route path="/tags" element={<Tags/>}/>
        <Route path="/tag-registration-form" element={<TagRegistrationForm/>}/>
        
      </Routes>
    </Router>
    
  
    </>
  )
}

export default App
