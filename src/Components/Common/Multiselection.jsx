import React, { useState } from 'react';




const Multiselection = ({options, onSelectionChange}) => {
    const MultiSelect = ({ options }) => {
        const [selectedOptions, setSelectedOptions] = useState([]);
        const [isOpen, setIsOpen] = useState(false);
      
        const toggleOption = (option) => {
          setSelectedOptions((prev) =>
            prev.includes(option)
              ? prev.filter((item) => item !== option)
              : [...prev, option]
          );
        };
      
        return (
          <div className="relative">
            {/* Button to open/close the dropdown */}
            <button 
              onClick={() => {setIsOpen(!isOpen)
                if(isOpen)onSelectionChange(selectedOptions)
              }
              }
              
             className='bg-blue-500  m-3  rounded-lg p-3 w-[150px] lg:w-[200px]'>
              {/* {selectedOptions.length === 0
                ? 'options'
                : `${selectedOptions.length} option(s) selected`} */}
                Options
            </button>
      
            {/* Dropdown Menu */}
            {isOpen && (
              <div className="  z-3  absolute left-0 mt-2 w-full bg-gray-400 border rounded-md shadow-lg">
                <ul className="max-h-60 overflow-y-auto">
                  {options.map((option) => (
                    <li
                      key={option}
                      className="flex items-center px-4 py-2 hover:bg-gray-200 cursor-pointer text-black"
                    >
                      <input
                        type="checkbox"
                        checked={selectedOptions.includes(option)}
                        onChange={() =>{{toggleOption(option)
                           
                        }
                        
                        }}
                  
                      />
                      {option}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        );
      };
      
    

   
  

  return (
    <div className="flex  items-center">
      <div className="w-64">
        <MultiSelect options={options} />
      </div>
    </div>
  );
};

export default Multiselection;
