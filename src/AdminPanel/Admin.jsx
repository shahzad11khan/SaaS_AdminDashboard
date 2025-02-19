import LeftSideBar from './LeftSideBar/LeftSideBar'
import Navbar from './Navbar/Navbar'
import Hero from './HeroSection/Hero'
import { toast } from 'react-toastify'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

const Admin = () => {
  const navigate = useNavigate()
  let {token} = useSelector(state => state.authenticate);
useEffect(()=>{
  if(!token) {
    toast.error("Login first")
    setTimeout(navigate('/'),1000) 
  }
} , [token , navigate])

if (!token) return null;
  return (
    <>
    
     <Navbar/>
     <div className='flex flex-col lg:flex-row'>
      <LeftSideBar/>
      <Hero/>
     </div>
     
    
    </>

  )
}

export default Admin
