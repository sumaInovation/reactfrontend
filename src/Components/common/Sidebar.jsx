import { Menu } from 'lucide-react'
import React, { useState } from 'react'

const Sidebar = () => {
  const[isSelected,setIsSelected]=useState(false)
  return (
    <div className={`fixed top-16 h-full ${isSelected?"w-20":"w-64"} bg-gray-800 z-0 p-5`}>
      <Menu onClick={()=>setIsSelected(!isSelected)}/>
      <p className='text-lg text-center pt-4'>Menu</p>
    </div>
  )
}

export default Sidebar
