
import React, { useState,useEffect } from 'react'
import { Home, DollarSign, Menu, Settings, ShoppingBag, ShoppingCart, TrendingUp, UserPlus, Search } from "lucide-react";
import './index.css'
import Overviwepage from './Pages/Overviwepage'
import Analytics from './Pages/Analytics'
import Productpage from './Pages/Productpage'
import Reports from './Pages/Reports'

import Sidenav from './Components/Common/Sidenav';
import Smallnav from './Components/Common/Smallnav';
import { AnimatePresence, motion } from "framer-motion";
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import SocialMediaIcons from './Components/Common/SocialMediaIcons';
import Footer from './Components/Common/Footer';

const LayoutWithSidebar = () => {
  const[Mobilenav,setMobilenav]=useState(false)
  const handleChildValue = (value) => {
    setMobilenav(false);
  };
 // Initial sidebar width
  const [sidebarWidth, setSidebarWidth] = useState(256); // Set initial width to 250px
  const [isOpen,setisOpen]=useState(false)
  // State to store the window width
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);
   // Function to update the screenWidth state on window resize
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };
   useEffect(() => {
      // Add resize event listener
      window.addEventListener('resize', handleResize);
  
      // Cleanup the event listener on component unmount
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }, []);
  
    // Dynamic variable that changes based on screen size
    let dynamicValue = 100;
    if (screenWidth < 1000) {
      dynamicValue =0;  // For small screens (mobile)
    } 
 
  return (
    <>
    <BrowserRouter>
    <header className='z-50 fixed top-0 left-0 w-full bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg border-b border-gray-700'>
			<div className='max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between'>
				<h1 className='text-2xl font-semibold text-gray-100 '>PPT Inovation</h1>
        <p className='lg:hidden text-white'><Menu size={24} onClick={()=>setMobilenav(!Mobilenav)}/></p>
       </div>
		</header>
    <div className="flex h-screen">
      {/* Sidebar: Fixed on the left with dynamic width */}
     
      <div
        className="  hidden lg:block bg-gray-800 text-white p-4 fixed top-[60px] left-0 h-full"
        style={{ width: `${sidebarWidth}px` }}
      >
        <div className='pl-3 pb-6'>
        <Menu size={24} onClick={()=>{
          setisOpen(!isOpen)
          if(isOpen){
            setSidebarWidth(80)
          }else{
            setSidebarWidth(256)
          }
        }} />
        </div>
      
      <Sidenav minWidth={sidebarWidth}/>
      </div>
      

      {/* Main Section: Flex-grow to fill remaining space */}
      <div className={` flex-grow `}
       style={{
        // Apply the marginLeft style for larger screens, remove it on smaller screens
        marginLeft: dynamicValue==100 ? `${sidebarWidth}px` : "0px"
      }}  
      
      >  
       {Mobilenav && <p className={` w-1/2 text-white z-20 mt-[80px]  bg-gray-800 p-4 absolute top-0 left-0 right-0 `}
      ><Smallnav sendValueToParent={handleChildValue}/></p>
      }  
          <Routes>
         <Route path="/" element={<Overviwepage/>}/>
         <Route path="/analytics" element={<Analytics/>}/>
         <Route path="/productpage" element={<Productpage/>}/>
         <Route path="reports" element={<Reports/>}/>
         
          </Routes>
          <SocialMediaIcons/>
           </div>

      
    </div>
    
     <footer className=' text-center bg-gray-700 text-xl text-gray-100 fixed bottom-0 w-full'>
      <Footer/>
      </footer> 
    
    </BrowserRouter>
    </>
  );
};

export default LayoutWithSidebar;
