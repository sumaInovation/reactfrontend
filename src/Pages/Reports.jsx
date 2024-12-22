import React, { useState } from 'react'
import Multiselection from '../Components/Common/Multiselection'
import DateRangePicker from '../Components/Common/DateRangePicker';
import { jsPDF } from 'jspdf';
import Loading from '../Asert/loading.png'
const Reports = () => {
    const [Result, setResult] = useState([])
    const options = ["Running Time",'Spool Empthy', 'Spool Full', 'Copper Broken', 'Taype Detect', 'Other', 'Machine Off'];
    const [selecteitems, setSelecteditems] = useState(null)
    const [StartTime, setStartTime] = useState(null);
    const [EndTime, setEndTime] = useState(null);
    const [isloading,setIsloading]=useState(false);
    const[isbutton,setisbutton]=useState(false)




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

            const requestData = {
                starttime: StartTime,
                endtime: EndTime,
            };
            const response = await fetch('https://googlesheet-yuetcisb.b4a.run/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestData), // Convert the data to a JSON string

            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const result = await response.json();
            setResult(result);
            setIsloading(true)
           

        } catch (error) {
            console.log(error);
        } finally {
            console.log("Loading Fail...")
        }
    };
    const HandleHTTP = () => {
        if (StartTime != undefined && EndTime != undefined && selecteitems!==null) {
            setisbutton(true)
            fetchData();


        } else {
            if(selecteitems==null){
                alert("Please slect options")
            }
            else
            alert("Please Select Valid Time Range")
        }


    }

    // Function to handle the selection change from the child multiselection
    const handleSelectionChange = (option) => {

        setSelecteditems(option)
    };
    // Function to handle the selected date range
    // Handle the date range change
    const handleDateRangeChange = (event, type) => {
        const value = event.target.value;
        if (type === 'start') {
            setStartTime(value)
        } else {
            setEndTime(value)
        }
    };
    return (
        <>

            <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mt-[80px]">
                {/* Start Date Input */}
                <div className="flex justify-center items-center">
                    <input
                        type="date"
                        id="start-date"
                        value={StartTime}
                        onChange={(e) => handleDateRangeChange(e, 'start')}
                        className="rounded-lg h-12 p-3 w-[200px] bg-gray-600"
                    />
                </div>

                {/* End Date Input */}
                <div className="flex justify-center items-center">
                    <input
                        type="date"
                        id="end-date"
                        value={EndTime}
                        onChange={(e) => handleDateRangeChange(e, 'end')}
                        className="rounded-lg h-12 p-3 w-[200px] bg-gray-600"
                    />
                </div>

                {/* Multiselection Dropdown */}
                <div className="flex justify-center items-center">
                    <Multiselection options={options} onSelectionChange={handleSelectionChange} />
                </div>

                {/* Search Button */}
                <div className="flex justify-center items-center">
                    <button
                        className="m-5 text-gray-100 bg-gray-600 rounded-lg p-3 w-[200px]"
                        onClick={() => {
                            HandleHTTP();
                            
                        }}
                    >
                        Search
                    </button>
                </div>

                {/* Download Button */}
                <div className="flex justify-center items-center">
                    <button
                        className="m-5 text-gray-100 bg-gray-600 rounded-lg p-3 w-[200px]"
                        onClick={() => {
                            // generatePDF();
                        }}
                    >
                        Download
                    </button>
                </div>
            </div>
         

            {/* Print Dtat */}
            {  !isloading?(   isbutton && <div className="loading-container flex  justify-center">
          
          <img src={Loading} alt="Loading..." style={{width:"200px", height:"200px"}}/> {/* Loading Spinner or Image */}
        </div>)  :(<div className="space-y-8 mt-[80px] text-white h-[1000px] ml-4">
                {/* Grid layout for displaying tables */}
                <div className="grid grid-cols-1 sm:grid-cols- lg:grid-cols-2 gap-8 ">
                    {/* Iterate over grouped data */}

                    {Object.keys(groupedData).map((reason) => (
                        selecteitems.some(item => item === reason) && <div key={reason} className="table-container p-4 border border-gray-200 rounded-lg shadow-md">
                            <h2 className="font-semibold mb-4 text-center">{reason}</h2>
                            <table className="min-w-full table-auto border-collapse">
                                <thead>
                                    <tr>
                                        <th className="border border-gray-300 px-4 py-2">Date</th>
                                        <th className="border border-gray-300 px-4 py-2">Start</th>
                                        <th className="border border-gray-300 px-4 py-2">End</th>
                                        <th className="border border-gray-300 px-4 py-2">Operator</th>
                                        <th className="border border-gray-300 px-4 py-2">Duration(Min)</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {/* Loop through the data for this reason */}
                                    {groupedData[reason].map((item, index) => (
                                        <tr key={index}>
                                            <td className="border border-gray-300 px-4 py-2">{item[0]}</td>
                                            <td className="border border-gray-300 px-4 py-2">{item[1]}</td>
                                            <td className="border border-gray-300 px-4 py-2">{item[2]}</td>
                                           <td className="border border-gray-300 px-4 py-2">Unkwon</td>
                                           <td className="border border-gray-300 px-4 py-2">{item[3]}</td>
                                        </tr>
                                    ))}

                                    <tr>
                                        <td colSpan="4" className="border border-gray-300 px-4 py-2" >Total</td>
                                        <td colSpan="3" className="border border-gray-300 px-4 py-2" >{
                                            groupedData[reason].reduce((total, item) => total + parseInt(item[3], 10), 0)
                                        }</td>


                                    </tr>

                                </tbody>
                            </table>

                        </div>

                    ))}

                </div>
            </div>)
           }
        </>
    )
}

export default Reports
