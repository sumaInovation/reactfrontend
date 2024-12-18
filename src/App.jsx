import React, { useState } from 'react'
import './index.css'
const App = () => {
  const [Isopen,setIsopen]=useState(false)
  return (
    <div className='bg-gray-900 h-screen flex'>
      
      <div className={` hidden   lg:block h-full bg-gray-800 text-gray-100 fixed top-0 left-0 ${Isopen?"w-64":"w-24"}`}>
        <p className='pl-5'><button onClick={()=>setIsopen(!Isopen)}>Press me</button></p>
      </div>
      <div className={`lg:flex-grow  text-gray-100 h-[2000px] ${Isopen?"lg:ml-64":"lg:ml-28"} ml-10`}>
        <p>main </p>
      </div>
    </div>
  )
}

export default App
