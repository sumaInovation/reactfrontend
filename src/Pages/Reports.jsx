import React, { useState } from 'react'
import Multiselection from '../Components/Common/Multiselection'
import DateRangePicker from '../Components/Common/DateRangePicker';
const Reports = () => {
    const [Result, setResult] = useState([])
    const options = ['Spool Empthy', 'Spool Full', 'Copper Broken', 'Taype Detect', 'Other', 'Machine Off'];
    const [selecteitems, setSelecteditems] = useState([options])
    const [selectedRange, setSelectedRange] = useState({ start: null, end: null });

    //read data from Google sheet
    const groupByBrokenReason = (data) => {
        return data.reduce((acc, row) => {
            const reason = row[4]; // Assuming the broken reason is in the 4th column (index 3)
            if (!acc[reason]) {
                acc[reason] = [];
            }

            acc[reason].push(row);


            return acc;
        }, {});
    };

    const groupedData = groupByBrokenReason(Result);

    // URL of the API you're fetching data from
    const fetchData = async () => {
        try {
            const response = await fetch('https://googlesheet-yuetcisb.b4a.run/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },

            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const result = await response.json();
            console.log(result)
            setResult(result);
        } catch (error) {
            console.log(error);
        } finally {
            console.log("Loading Fail...")
        }
    };
    const HandleHTTP = () => {
        fetchData();
    }

    // Function to handle the selection change from the child multiselection
    const handleSelectionChange = (option) => {
        setSelecteditems(option)
    };
    // Function to handle the selected date range
    const handleDateRangeChange = (startDate, endDate) => {
        setSelectedRange({ start: startDate, end: endDate });
    };
    return (
        <>
            <div className='ml-3 mt-[80px]  flex gap-[40px]'>
                <Multiselection options={options} onSelectionChange={handleSelectionChange} />
                <p className='text-gray-100 p-3'>Select Date</p>
                <DateRangePicker onDateRangeChange={handleDateRangeChange} />

            </div>
            <div className='text-gray-100 h-[1000px]'>
                <button className='text-gray-100' onClick={() => {
                    HandleHTTP();
                }}>Download</button>
                {/* Loop through each broken reason and render a table */}
                {Object.keys(groupedData).map((reason) => (

                     <div key={reason}>
                      {selecteitems.some(item => item === reason) && 
                      <div>
                        <h1>{reason}</h1>
                      <table className="table-auto border-collapse border border-gray-200 mb-4">
                      <thead>
                          <tr>
                              <th className="border border-gray-300 px-4 py-2">Date</th>
                              <th className="border border-gray-300 px-4 py-2">Running Time</th>
                              <th className="border border-gray-300 px-4 py-2">Breaking Time</th>
                              <th className="border border-gray-300 px-4 py-2">Durarion</th>

                          </tr>
                      </thead>
                      <tbody>
                          {groupedData[reason].map((row, index) => (
                              <tr key={index}>
                                  <td className="border border-gray-300 px-4 py-2">{row[0]}</td> {/* Date */}
                                  <td className="border border-gray-300 px-4 py-2">{row[1]}</td> {/* Running Time */}
                                  <td className="border border-gray-300 px-4 py-2">{row[2]}</td> {/* Breaking Time */}
                                  <td className="border border-gray-300 px-4 py-2">{row[3]}</td> {/* Duration */}

                              </tr>
                          ))}
                      </tbody>
                  </table>
                  </div>
                      }
                      
                      </div>

                ))}

            </div>


        </>
    )
}

export default Reports
