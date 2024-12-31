
import React, { useState } from 'react'
import Multiselection from '../Components/Common/Multiselection'
import Spinner from 'react-bootstrap/Spinner';
import Bcard from '../Components/Common/Boostrapcard'
import DownloadInvoice from '../Pages/DownloadInvoice'
import html2pdf from 'html2pdf.js';

const Reports = () => {
  const [Result, setResult] = useState([])
  const options = ["IDLE", "RUNNING", "SPOOL FILED", "SPOOL EMPTHY", "TAPE DETECT", "COPPER BROKEN", "OTHERS"];
  const [selecteitems, setSelecteditems] = useState([])
  const [StartTime, setStartTime] = useState(null);
  const [EndTime, setEndTime] = useState(null);
  const [isloading, setIsloading] = useState(false);
  const [piedatas, setPiedatas] = useState([]);
  const [linedatas, setlinedatas] = useState([0]);
  const [lineLbel, setLinelable] = useState([]);
  const [serchbit, setSerchbit] = useState(false);
  const [userSearch, setSearch] = useState(false);//check user request or not
  const [isAnalys, setisAnalys] = useState(false);//togle Analys to rawdata

  const printRef = React.useRef(); // Reference for the part you want to export

  const handleExport = () => {
    const element = printRef.current;

          // Define PDF options
    const options = {
      filename: 'exported-content.pdf', // The name of the file
      image: { type: 'jpeg', quality: 0.98 }, // Image quality and type
      html2canvas: {
        scale: 5, 
        backgroundColor: "#f0f0f0",  // Ensures background color is applied
      },
      jsPDF: { unit: 'mm', 
        format: 'a4', 
        orientation: 'portrait',
        margin: { top: 5 },  // Top margin for the PDF 
         
      },
    };


    // Using html2pdf to convert the HTML part into a PDF
    html2pdf()
      .from(element) // The HTML element you want to convert
      .set(options)  // Set the options (file name, image quality, etc.)
      .save();       // Save the PDF file
  };
     

  function generateDateRange(startDate, endDate) {
    const dateArray = [];

    // Convert startDate and endDate to Date objects
    let currentDate = new Date(startDate);
    const end = new Date(endDate);

    // Loop to push each day to the dateArray
    while (currentDate <= end) {
      dateArray.push(new Date(currentDate)); // Push a copy of the current date
      currentDate.setDate(currentDate.getDate() + 1); // Increment by 1 day
    }

    return dateArray.map(i => i.toLocaleDateString());
  }

  function parseDate(dateString) {
    const [month, day, year] = dateString.split("/").map(Number);
    return new Date(year, month - 1, day); // JavaScript months are 0-indexed
  }


  const HandleDownload = () => {
    if(userSearch){//if user pressed serch after only you can togle elese not efect
    setisAnalys(!isAnalys);//Togle analysis report to raw data
    setPiedatas([]);
    selecteitems.forEach((i, index) => {
      const R = Result
        .filter(j => j[4] === i) // Filter where id is 1
        .reduce((sum, j) => sum + parseInt(j[3], 10), 0) // Sum the values
      setPiedatas(prev => [...prev, R]);
    })
    //Linechart calculation
    setlinedatas([]);//initially reset
    generateDateRange(StartTime, EndTime).forEach(i => {
      const total = Result.filter(j => (j[0] == i && j[4] == "RUNNING"))
        .reduce((accumulator, currentValue) => accumulator + parseInt(currentValue[3], 10), 0);
      setlinedatas(prev => [...prev, total])//Updates

    })
  }else{
    alert("Please Search First!")
  }

  }
  // Function to handle the selection change from the child multiselection
  const handleSelectionChange = (option) => {

    setSelecteditems(option)
    setResult([]);
    setSearch(false);
    if(StartTime!=null && EndTime!=null){
      setSerchbit(true);
    }else{setSerchbit(false)}
  



  };
  // Function to handle the selected date range
  // Handle the date range change
  const handleDateRangeChange = (event, type) => {
    const value = event.target.value;
    if (type === 'start') {
      setStartTime(new Date(value).toLocaleDateString())
      if(EndTime!=null && selecteitems.length>0){setSerchbit(true)}else{setSerchbit(false)}
    } else {
      setEndTime(new Date(value).toLocaleDateString())
      if(StartTime!=null && selecteitems.length>0){setSerchbit(true)}else{setSerchbit(false)}

    }
      setSearch(false); 
      

  };

  const HandleHTTP = async () => {
    if (StartTime != null && EndTime != null && selecteitems.length>0) {
      try {
        setSearch(true)
        setIsloading(false);
        fetch("https://googlesheet-yuetcisb.b4a.run/userdata")
          .then(response => {
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            return response.json();  // Read the response body as JSON
          })
          .then(data => {
            const filterData = data.filter(item =>
              (parseDate(item[0]) >= parseDate(StartTime) && parseDate(item[0]) <= parseDate(EndTime))
            )
            setResult(filterData);
            setIsloading(true);
            setLinelable(generateDateRange(StartTime, EndTime))
          })
          .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
          });

      } catch (error) {
        console.error(error);
      }
    } else {
      alert("Please set start and end date correctly \u{1F60A}");
    }


  }

  const Totalsum = (item) => {
    return Result
      .filter(j => j[4] === item) // Filter where id is 1
      .reduce((sum, j) => sum + parseInt(j[3], 10), 0) // Sum the values
  }



  return (
    <>
      <div className='mt-[80px] text-white grid grid-cols-1  lg:grid-cols-5 gap-6'>
        <div className='flex'>
          <label htmlFor="start-date" className="block text-white m-3">
            Start Date:
          </label>
          <input
            type="date"
            id="start-date"

            onChange={(e) => handleDateRangeChange(e, 'start')}
            className="rounded-lg bg-green-100 p-3 m-3 text-black w-[150px] lg:w-[200px]"
          />
        </div>
        <div className='flex'>
          <label htmlFor="end-date" className="block text-white m-3 ">
            End Date:
          </label>
          <input
            type="date"
            id="end-date"
            onChange={(e) => handleDateRangeChange(e, 'end')}
            className="rounded-lg bg-green-100 p-3 m-3 text-black w-[150px] lg:w-[200px]"
          />

        </div>
        {/* Dropwon */}
        < Multiselection options={options} onSelectionChange={handleSelectionChange}  />
        <button className={`m-3 text-white rounded-lg p-3 bg-green-600 w-[150px] lg:w-[200px]
          `}
          onClick={HandleHTTP}
          
        >Search</button>
        <button className={`m-3 text-white rounded-lg p-3 bg-green-600 w-[150px] lg:w-[200px]
          `}
          onClick={HandleDownload}
          //disabled={!downloadbit} // Button is disabled if no value is entered
        >{!isAnalys ? "Analys" : "Row Data"}</button>
      </div>
      {/* Switch page parts */}
      {!userSearch ?
        <div>
          {/* Here Normal Conditoin code */}
          <div className='grid lg:grid-cols-3 grid-cols-1 text-white'>
            <Bcard imglink={"data:image/jpeg;base64,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"} weblink={"https://www.sumaautomation.lk"} title={"About Us"}
              content={"For More Imfomation Please Click Me"} />

            <Bcard imglink={"data:image/jpeg;base64,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"} weblink={"https://www.sumaautomation.lk"} title={"About Us"}
              content={"For More Imfomation Please Click Me"} />
            <Bcard imglink={"data:image/jpeg;base64,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"} weblink={"https://www.sumaautomation.lk"} title={"About Us"}
              content={"For More Imfomation Please Click Me"} />

            {/*End  of Normal Conditoin code */}

          </div>
        </div>
        : !isloading ?
          <div>
            <div className="flex items-center justify-center mt-[100px] text-white">
              <Spinner className='w-20 h-20' />
              <h1>Loading.....</h1>
            </div>
          </div>
          : isAnalys ?
            <div>
              <div ref={printRef}>
                {/* Part1 */}
                <DownloadInvoice lbl={lineLbel} Items={selecteitems} piedata={piedatas} ldata={linedatas} data={Result.filter(item=>item[4]=="RUNNING")  }/>
                {/* Part1 end */}
              </div>
            </div>
            :
            <div>
              {/* Display Row Data */}
              <div className='text-white grid lg:grid-cols-3 grid-cols-1   m-3'>
                {selecteitems.map(item => <div>

                  {/* Create The Table Title */}
                  <label className='text-2xl text-green-700 '>
                    {Result.some(i => i[4] === item) && item}
                  </label>
                  {/* Create Table  */}

                  {Result.some(i => i[4] === item) &&
                    (<table border="1">
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
                          (item == name[4]) && <tr key={index}>
                            <td style={{ border: '1px solid black', padding: '8px' }}>{name[0]}</td>
                            <td style={{ border: '1px solid black', padding: '8px' }}>{name[1]}</td>
                            <td style={{ border: '1px solid black', padding: '8px' }}>{name[2]}</td>
                            <td style={{ border: '1px solid black', padding: '8px' }}>{name[3]}</td>


                          </tr>


                        ))}
                        <tr>
                          <td style={{ border: '1px solid black', padding: '8px' }} colSpan="3">Totlal</td>
                          <td style={{ border: '1px solid black', padding: '8px' }} >{Totalsum(item)}</td>
                        </tr>
                      </tbody>
                    </table>)}
                </div>)}
              </div>

            </div>



      }
      <div className='h-[200px] text-white'>
      <button onClick={handleExport} style={{ marginTop: '20px' }}>
          Export to PDF
        </button>

      </div>

    </>
  )
}

export default Reports

