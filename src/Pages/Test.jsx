import React, { useState } from 'react';
import Multiselection from '../Components/Common/Multiselection';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState([]);

  // Function to toggle the menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  

  const handleSelectionChange = (event) => {
    const options = Array.from(event.target.selectedOptions, (option) => option.value);
    setSelectedOptions(options);
  };

  return (
    <div className="relative mt-[80px]">
      {/* Hamburger Icon */}
      <div className="p-5 text-white">
        <button onClick={toggleMenu} className="text-1xl rounded-lg bg-green-500 p-3">
          Analysis
        </button>
      </div>

      {/* Menu */}
      <div
        className={`fixed top-0 left-0 w-full bg-gray-900 bg-opacity-90 transition-all ease-in-out duration-300 ${
          isMenuOpen ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        <ul className="space-y-6 text-white text-2xl text-center py-10 mt-[80px]">
          <li><input type='date' className="text-white bg-gray-700 rounded-md p-3"/></li>
          <li><input type='date' className="text-white bg-gray-700 rounded-md p-3"/></li>
          <li><Multiselection/></li>
          
          <li><button className="hover:text-gray-400 bg-blue-400 rounded-lg p-3" onClick={()=>setIsMenuOpen(false)}>Get Report</button></li>
        </ul>
      </div>
    </div>
  );
}

export default App;
