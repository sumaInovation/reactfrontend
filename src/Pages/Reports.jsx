// import React, { useState } from 'react'
// import Spinner from 'react-bootstrap/Spinner';
// import Button from 'react-bootstrap/Button';
// import Bcard from '../Components/Common/Boostrapcard'

// import Multiselection from '../Components/Common/Multiselection'
// import DateRangePicker from '../Components/Common/DateRangePicker';
// import { jsPDF } from 'jspdf';
// import Loading from '../Asert/loading.png'
// const Reports = () => {
//     const [Result, setResult] = useState([])
//     const options = ["IDLE","RUNNING","SPOOL FILED","SPOOL EMPTHY","TAPE DETECT","COPPER BROKEN","OTHERS"];
//     const [selecteitems, setSelecteditems] = useState(null)
//     const [StartTime, setStartTime] = useState(null);
//     const [EndTime, setEndTime] = useState(null);
//     const [isloading, setIsloading] = useState(false);
//     const [isbutton, setisbutton] = useState(false);
   



//     //read data from Google sheet
//     const groupByBrokenReason = (data) => {
//         return data.reduce((acc, row) => {
//             const reason = row[4]; // Assuming the broken reason is in the 4th column (index 3)
//             if (!acc[reason]) {
//                 acc[reason] = [];
//             }

//             acc[reason].push(row);


//             return acc;
//         }, {});
//     };

//     const groupedData = groupByBrokenReason(Result);

//     // URL of the API you're fetching data from
//     const fetchData = async () => {
//         try {

//             const requestData = {
//                 starttime: StartTime,
//                 endtime: EndTime,
//             };
//             const response = await fetch('https://googlesheet-yuetcisb.b4a.run/', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify(requestData), // Convert the data to a JSON string

//             });

//             if (!response.ok) {
//                 throw new Error('Network response was not ok');
//             }
//             const result = await response.json();
//             setResult(result);
//             setIsloading(true);
//             console.log(result)


//         } catch (error) {
//             console.log(error);
//         } finally {
//             console.log("Loading Fail...")
//         }
//     };
//     const HandleHTTP = () => {
//         if (StartTime != undefined && EndTime != undefined && selecteitems !== null) {
//             setisbutton(true)
//             fetchData();


//         } else {
//             if (selecteitems == null) {
//                 alert("Please slect options")
//             }
//             else
//                 alert("Please Select Valid Time Range")
//         }


//     }

//     // Function to handle the selection change from the child multiselection
//     const handleSelectionChange = (option) => {

//         setSelecteditems(option)

    
//     };
//     // Function to handle the selected date range
//     // Handle the date range change
//     const handleDateRangeChange = (event, type) => {
//         const value = event.target.value;
//         if (type === 'start') {
//             setStartTime(value)
//         } else {
//             setEndTime(value)
//         }
//     };
//     return (
//         <>
//             <div className='h-[100px] absolute mt-0'>
//                 <div className=' text-white mt-[80px] grid grid-cols-1 lg:grid-cols-5'>
//                     <input
//                         type="date"
//                         id="start-date"
//                         value={StartTime}
//                         onChange={(e) => handleDateRangeChange(e, 'start')}
//                         className="rounded-lg bg-green-100 p-3 m-3 text-black"
//                     />
//                     <input
//                         type="date"
//                         id="end-date"
//                         value={EndTime}
//                         onChange={(e) => handleDateRangeChange(e, 'end')}
//                         className="rounded-lg bg-green-100 p-3 m-3 text-black"
//                     />

//                     < Multiselection options={options} onSelectionChange={handleSelectionChange} />
//                     <button className='  rounded-lg bg-blue-800 p-3 m-3' onClick={() => {
//                         HandleHTTP();
//                     }}>Serach</button>
//                     <button className='  rounded-lg bg-green-400 p-3 m-3'>Download</button>
//                 </div>


//                 {/* Default contents */}
//                 {!isbutton && <div className='lg:flex gap-3 lg:ml-16 '>
//                     <Bcard imglink={"https://media.istockphoto.com/id/1171902434/photo/smart-industry-control-concept.webp?a=1&b=1&s=612x612&w=0&k=20&c=cpvGEK2EhmFar7c7mRBKbs2N_Yfrc1VPiYF1jiavp38="}
//                         title={"Data Analytics"} content={"You can analysis data by cliking bellow link"}
//                         weblink={"./analytics"} />
//                     <Bcard imglink={"https://media.istockphoto.com/id/685848876/photo/3d-electronic-board.webp?a=1&b=1&s=612x612&w=0&k=20&c=A2DZvOgz0u4YbntHMGKa5wqZXQDAhTz3MM6dkL0idig="}
//                         title={"Realtime Data Monitoring"}
//                         content={"Now You can see our Machine real time data please press bellow link"}
//                         weblink={"/"} />

//                     <Bcard title={"Upcomming Events"} content={"Our next production & new new projects"}
//                         imglink={"data:image/jpeg;base64,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"}
//                         weblink={"/"} />
//                 </div>}

//                 {/* Display user request report */}
//                 {!isloading ? (isbutton && <div className='lg:pl-[450px] w-[50px]'>
//                     <Button variant="primary" disabled>
//                         <Spinner
//                             as="span"
//                             animation="grow"
//                             size="sm"
//                             role="status"
//                             aria-hidden="true"
//                         />
//                         Loading...
//                     </Button>
//                 </div>) : (<div className="space-y-8 mt-[80px] text-white h-[1000px] ml-4">
//                     {/* Grid layout for displaying tables */}
//                     <div className="grid grid-cols-1 sm:grid-cols- lg:grid-cols-2 gap-8 ">
//                         {/* Iterate over grouped data */}

//                         {Object.keys(groupedData).map((reason) => (
//                             selecteitems.some(item => item === reason) && <div key={reason} className="table-container p-4 border border-gray-200 rounded-lg shadow-md">
//                                 <h2 className="font-semibold mb-4 text-center">{reason}</h2>
//                                 <table className="min-w-full table-auto border-collapse">
//                                     <thead>
//                                         <tr>
//                                             <th className="border border-gray-300 px-4 py-2">Date</th>
//                                             <th className="border border-gray-300 px-4 py-2">Start</th>
//                                             <th className="border border-gray-300 px-4 py-2">End</th>
//                                             <th className="border border-gray-300 px-4 py-2">Operator</th>
//                                             <th className="border border-gray-300 px-4 py-2">Duration(Min)</th>
//                                         </tr>
//                                     </thead>
//                                     <tbody>
//                                         {/* Loop through the data for this reason */}
//                                         {groupedData[reason].map((item, index) => (
//                                             <tr key={index}>
//                                                 <td className="border border-gray-300 px-4 py-2">{item[0]}</td>
//                                                 <td className="border border-gray-300 px-4 py-2">{item[1]}</td>
//                                                 <td className="border border-gray-300 px-4 py-2">{item[2]}</td>
//                                                 <td className="border border-gray-300 px-4 py-2">Unkwon</td>
//                                                 <td className="border border-gray-300 px-4 py-2">{item[3]}</td>
//                                             </tr>
//                                         ))}

//                                         <tr>
//                                             <td colSpan="4" className="border border-gray-300 px-4 py-2" >Total</td>
//                                             <td colSpan="3" className="border border-gray-300 px-4 py-2" >{
//                                                 groupedData[reason].reduce((total, item) => total + parseInt(item[3], 10), 0)
//                                             }</td>


//                                         </tr>

//                                     </tbody>
//                                 </table>

//                             </div>

//                         ))}

//                     </div>
//                 </div>)
//                 }
//             </div>
//         </>
//     )
// }

// export default Reports



import React ,{useState} from 'react'
import Multiselection from '../Components/Common/Multiselection'


const Reports = () => {
    const [Result, setResult] = useState([])
    const options = ["IDLE","RUNNING","SPOOL FILED","SPOOL EMPTHY","TAPE DETECT","COPPER BROKEN","OTHERS"];
    const [selecteitems, setSelecteditems] = useState(null)
    const [StartTime, setStartTime] = useState(null);
    const [EndTime, setEndTime] = useState(null);
    const [isloading, setIsloading] = useState(false);
    const [isbutton, setisbutton] = useState(false);
    const[Tablehead,setTableHead]=useState([])
    const reasonlists=[];
    

    function parseDate(dateString) {
      const [month, day, year] = dateString.split("/").map(Number);
      return new Date(year, month - 1, day); // JavaScript months are 0-indexed
    }

        const HandleHTTPS = () => {
        if (StartTime != undefined && EndTime != undefined && selecteitems !== null) {
           


        } else {
            if (selecteitems == null) {
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
            setStartTime(new Date(value).toLocaleDateString())
        }else{
            setEndTime(new Date(value).toLocaleDateString())
       
        }
        
        
    };

    const HandleHTTP=async()=>{
      
        try{
           fetch("https://googlesheet-yuetcisb.b4a.run/userdata")
            .then(response => {
              if (!response.ok) {
                throw new Error('Network response was not ok');
              }
              return response.json();  // Read the response body as JSON
            })
            .then(data=>{
              const filterData=data.filter(item=>
                (parseDate(item[0])>=parseDate(StartTime) && parseDate(item[0])<=parseDate(EndTime))
              )
              setResult(filterData);

              filterData.map(item=>{
                if(!reasonlists.includes(item[4]))reasonlists.push(item[4]);
               })
               setTableHead(reasonlists)
           
            })
            .catch(error => {
              console.error('There was111 a problem with the fetch operation:', error);
            });
    
        }catch(error){
            console.error(error);
        }
       
    
    }
    

  return (
    <>
    <div className='mt-[80px] text-white grid grid-cols-2  lg:grid-cols-5 gap-6'>
      <input
                        type="date"
                        id="start-date"
                        value={StartTime}
                        onChange={(e) => handleDateRangeChange(e, 'start')}
                        className="rounded-lg bg-green-100 p-3 m-3 text-black w-[150px] lg:w-[200px]"
                    />
                    <input
                        type="date"
                        id="end-date"
                        value={EndTime}
                        onChange={(e) => handleDateRangeChange(e, 'end')}
                        className="rounded-lg bg-green-100 p-3 m-3 text-black w-[150px] lg:w-[200px]"
                    />

      <button className='m-3 text-white rounded-lg p-3 bg-green-600 w-[150px] lg:w-[200px]' onClick={HandleHTTP}>Search</button>
      <button className='m-3 text-white rounded-lg p-3 bg-green-600 w-[150px] lg:w-[200px]'>Download</button>

      {/* Dropwon */}
      < Multiselection options={options} onSelectionChange={handleSelectionChange} />
      </div>
      
      
      <div className='text-white grid lg:grid-cols-2 grid-cols-1   m-3'>
      {Tablehead.map(item=><div>
       <label className='text-2xl text-green-700 '>
       {item}
        </label>
        
       <table border="1">
        <thead>
          <tr>
           <th style={{ border: '1px solid black', padding: '8px' }}>Date</th>
           <th style={{ border: '1px solid black', padding: '8px' }}>Start</th>
           <th style={{ border: '1px solid black', padding: '8px' }}>End</th>
           <th style={{ border: '1px solid black', padding: '8px' }}>Duration</th>
           
          </tr>
        </thead>
        <tbody>
        {Result.map((name, index) => (
          (item==name[4]) && <tr key={index}>
          <td style={{ border: '1px solid black', padding: '8px' }}>{name[0]}</td>
          <td style={{ border: '1px solid black', padding: '8px' }}>{name[1]}</td>
          <td style={{ border: '1px solid black', padding: '8px' }}>{name[2]}</td>
          <td style={{ border: '1px solid black', padding: '8px' }}>{name[3]}</td>
          
         </tr>
        
        ))}
        </tbody>
      </table>


      </div>)}
      
      </div>
      <div className='h-[200px]'></div>
    </>
  )
}

export default Reports

