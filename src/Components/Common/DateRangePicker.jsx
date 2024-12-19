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
      onDateRangeChange(format(date, 'MM/dd/yyyy'), format(endDate, 'MM/dd/yyyy'));
    }
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
    // If there's already a start date, pass both start and end to the parent
    if (startDate) {
      onDateRangeChange(format(startDate, 'MM/dd/yyyy'), format(date, 'MM/dd/yyyy'));
    }
  };

  return (
    <div className="flex gap-4 items-center">
    
      <label className='text-gray-100'>From</label>
      {/* Start Date Picker */}
      <DatePicker
        selected={startDate}
        onChange={handleStartDateChange}
        selectsStart
        startDate={startDate}
        endDate={endDate}
        className="p-3 border border-gray-300 rounded-md "
        placeholderText="Start Date"
        dateFormat="MM/dd/yyyy"
      />
     <label className='text-gray-100'>To </label>
      {/* End Date Picker */}
      <DatePicker
        selected={endDate}
        onChange={handleEndDateChange}
        selectsEnd
        startDate={startDate}
        endDate={endDate}
        minDate={startDate} // Ensure end date can't be before start date
        className="p-3 border border-gray-300 rounded-md"
        placeholderText="End Date"
        dateFormat="MM/dd/yyyy"
      />
    </div>
  );
};

export default DateRangePicker;
