import React, { useState } from 'react';
import { format } from 'date-fns';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'; // Import the Datepicker CSS

const DateRangePicker = ({ onDateRangeChange }) => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const handleStartDateChange = (date) => {
    setStartDate(date);
    // If there's already an end date, pass both start and end to the parent
    if (endDate) {
      onDateRangeChange(format(date, 'yyyy/MM/dd'), format(endDate, 'yyyy/MM/dd'));
    }
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
    // If there's already a start date, pass both start and end to the parent
    if (startDate) {
      onDateRangeChange(format(startDate, 'yyyy/MM/dd'), format(date, 'yyyy/MM/dd'));
    }
  };    

  return (
    <>
    
    
      {/* Start Date Picker */}
      <DatePicker
        selected={startDate}
        onChange={handleStartDateChange}
        selectsStart
        startDate={startDate}
        endDate={endDate}
        className="m-5 text-black bg-gray-300 rounded-lg p-3 w-28"
        placeholderText="Start Date"
        dateFormat="MM/dd/yyyy"
      />
     
      {/* End Date Picker */}
      <DatePicker
        selected={endDate}
        onChange={handleEndDateChange}
        selectsEnd
        startDate={startDate}
        endDate={endDate}
        minDate={startDate} // Ensure end date can't be before start date
        className="m-5 text-black bg-gray-300 rounded-lg p-3 w-28"
        placeholderText="End Date"
        dateFormat="MM/dd/yyyy"
       
      />
   
    </>
  );
};

export default DateRangePicker;
