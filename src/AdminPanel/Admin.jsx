import LeftSideBar from './LeftSideBar/LeftSideBar'
import Navbar from './Navbar/Navbar'
import Hero from './HeroSection/Hero'
import { useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { toast } from 'react-toastify'

const Admin = () => {
  let location = useLocation()
  useEffect(
    ()=>{
      if(location?.state?.message){
        toast.success(location?.state?.message)
      }
    },[location.state]
  )
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
