import React, { useState } from 'react';
import Multiselection from '../Components/Common/Multiselection';

function GetParameterForReport({onDataChange}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [selectedStartDate, setSelectedStartDate] = useState();
  const [selectedEndDate, setSelectedEndDate] = useState();

  const handleStartDateChange = (event) => {
    // Update the selected date state
    setSelectedStartDate(event.target.value);
  };
  const handleEndtDateChange = (event) => {
    // Update the selected date state
    setSelectedEndDate(event.target.value);
  };
  
  // Function to toggle the menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  

 
   const handleValueFromChild=(value)=>{
     setSelectedOptions(value);
    
   }
  return (
    <div className="relative">
      {/* Hamburger Icon */}
      <div className=" text-white ">
        <button onClick={toggleMenu} className="text-1xl rounded-lg bg-green-500 p-3">
         Filter
        </button>
      </div>

      {/* Menu */}
      <div
        className={`fixed top-0 left-0 w-full bg-gray-900 bg-opacity-90 transition-all ease-in-out duration-300 ${
          isMenuOpen ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        <ul className="space-y-6 text-white text-2xl text-center py-10 mt-[80px]">
          <li>Start Date</li>
          <li><input type='date' className="text-white bg-gray-700 rounded-md p-3"
               value={selectedStartDate}  // This binds the input value to the state
               onChange={handleStartDateChange}  // Updates the state when the user selects a date
          /></li>
          <li>End Date</li>
          <li><input type='date' className="text-white bg-gray-700 rounded-md p-3"
               value={selectedEndDate}  // This binds the input value to the state
               onChange={handleEndtDateChange}  // Updates the state when the user selects a date
          /></li>
          <li>Select your Option</li>
          <li><Multiselection onValueChange={handleValueFromChild}/></li>
          
          <li><button className="hover:text-gray-400 bg-blue-400 rounded-lg p-3" 
          onClick={()=>{
              setIsMenuOpen(false);
              onDataChange(selectedStartDate,selectedEndDate,selectedOptions)
            }}>Comfrim</button></li>
        </ul>
      </div>
    </div>
  );
}

export default GetParameterForReport;
