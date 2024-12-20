import React, { useState } from 'react';

const App = () => {
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const handleOptionChange = (e) => {
    const { options } = e.target;
    const values = Array.from(options).filter(option => option.selected).map(option => option.value);
    setSelectedOptions(values);
  };

  const handleDownload = () => {
    alert('Download button clicked');
    // Add logic for downloading the data
  };

  const handleSearch = () => {
    alert('Search button clicked');
    // Add logic for searching with the selected date range and options
  };

  return (
    <div className="max-w-4xl mx-auto p-6 mt-[80px]">
      {/* Buttons Section */}
      <div className="flex justify-between mb-4">
        <button
          onClick={handleDownload}
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Download
        </button>
        <button
          onClick={handleSearch}
          className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
        >
          Search
        </button>
      </div>

      {/* Date Range Section */}
      <div className="flex space-x-4 mb-4">
        <div>
          <label htmlFor="start-date" className="block text-gray-700">Start Date</label>
          <input
            type="date"
            id="start-date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg"
          />
        </div>
        <div>
          <label htmlFor="end-date" className="block text-gray-700">End Date</label>
          <input
            type="date"
            id="end-date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg"
          />
        </div>
      </div>

      {/* Multi-Select Options Section */}
      <div className="mb-4">
        <label htmlFor="options" className="block text-gray-700">Select Options</label>
        <select
          id="options"
          multiple
          value={selectedOptions}
          onChange={handleOptionChange}
          className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg"
        >
          <option value="option1">Option 1</option>
          <option value="option2">Option 2</option>
          <option value="option3">Option 3</option>
          <option value="option4">Option 4</option>
        </select>
      </div>
    </div>
  );
};

export default App;
