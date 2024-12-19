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
              className="px-4 py-2 bg-gray-400 text-white rounded-md focus:outline-none w-full"
            >
              {selectedOptions.length === 0
                ? 'Select options'
                : `${selectedOptions.length} option(s) selected`}
            </button>
      
            {/* Dropdown Menu */}
            {isOpen && (
              <div className="absolute left-0 mt-2 w-full bg-gray-400 border rounded-md shadow-lg">
                <ul className="max-h-60 overflow-y-auto">
                  {options.map((option) => (
                    <li
                      key={option}
                      className="flex items-center px-4 py-2 hover:bg-gray-200 cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={selectedOptions.includes(option)}
                        onChange={() =>{{toggleOption(option)
                           
                        }
                        
                        }}
                        className="mr-2"
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
