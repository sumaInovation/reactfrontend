import React, { useState, useRef, useEffect } from 'react';

function App({onValueChange}) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const dropdownRef = useRef(null);

  const options = ["IDLE", "RUNNING", "SPOOL FILED", "SPOOL EMPTHY", "TAPE DETECT", "COPPER BROKEN", "OTHERS"];

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionChange = (option) => {
    setSelectedOptions((prevSelected) => {
      if (prevSelected.includes(option)) {
        return prevSelected.filter((item) => item !== option);
      } else {
        return [...prevSelected, option];
      }
    });
    
   return 0;
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    onValueChange(selectedOptions);//update parent user selectedoptions
    const handleClickOutside = (event) => {
      
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false); // Close the dropdown if click is outside
      
      }
    };

    // Attach event listener
    document.addEventListener('mousedown', handleClickOutside);

    // Cleanup the event listener on component unmount
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [selectedOptions,onValueChange]);

  return (
    <div className="relative">
      {/* Button to toggle the dropdown */}
      <button
        onClick={toggleDropdown}
        className="px-4 py-2 bg-green-500 text-white rounded-md"
      >
        Select Options
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div
          ref={dropdownRef} // Attach ref here
          className="absolute mt-2 w-48 bg-gray-700 border border-gray-300 rounded-md shadow-lg z-10"
        >
          <ul className="max-h-80 overflow-y-auto text-sm text-black">
            {options.map((option) => (
              <li key={option} className="p-2">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={selectedOptions.includes(option)}
                    onChange={() => handleOptionChange(option)}
                    className="mr-2"
                  />
                  {option}
                </label>
              </li>
            ))}
          </ul>
        </div>
      )}

       
    </div>
  );
}

export default App;
