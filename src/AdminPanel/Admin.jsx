// import React from 'react'
import LeftSideBar from './LeftSideBar/LeftSideBar'
import Navbar from './Navbar/Navbar'
import Hero from './HeroSection/Hero'


const Admin = () => {
  return (
    <>
     <Navbar/>
     <div className='flex flex-col lg:flex-row '>
      <LeftSideBar/>
      <Hero/>
     </div>
     
    
    </>

  )
}

export default Admin
