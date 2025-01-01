import React, { useState } from 'react'
import Parameternav from './GetParameterForReport'
import DownloadInvoice from './DownloadInvoice'
import Spinner from 'react-bootstrap/Spinner';
import { Button } from 'bootstrap';
const Reports = () => {
  const [sectiontogle, setSectiontogle] = useState(0);
  const [Result, setResult] = useState([]);
  const [linedata, setLinedata] = useState({});
  const [piedata, setPiedata] = useState({});
  const [selectedItem, setSelectedItems] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndtDate] = useState(null);
  const options = ["IDLE", "RUNNING", "SPOOL FILED", "SPOOL EMPTHY", "TAPE DETECT", "COPPER BROKEN", "OTHERS"];
  const handleParameterFromChild = async (startDate, endDate, selectedOptions) => {
    setStartDate(new Date(startDate).toLocaleDateString());
    setEndtDate(new Date(endDate).toLocaleDateString());
    setSelectedItems(selectedOptions);
  }
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


  const handleHTTPRequest = async () => {

    if (startDate != null && endDate != null && selectedItem.length > 0) {
      setSectiontogle(3)
      try {

        fetch("https://googlesheet-yuetcisb.b4a.run/userdata")
          .then(response => {
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            return response.json();  // Read the response body as JSON
          })
          .then(data => {
            const filterData = data.filter(item =>
              (parseDate(item[0]) >= parseDate(startDate) && parseDate(item[0]) <= parseDate(endDate))
            )
            setResult(filterData);
            setSectiontogle(1)
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
  const value = Result.reduce((acc, current) => {
    if (!acc.some(i => i[0] == current[0])) {
      acc.push([current[0], 0, 0])
    }

    acc.forEach((j, index) => {
      if (j[0] == current[0]) {
        if (current[4] == "RUNNING") {
          acc[index][1] += parseInt(current[3], 10)
        } else {
          acc[index][2] += parseInt(current[3], 10)
        }
      }
    })
    return acc
  }, []);

  const UpdatePiechart = () => {
    const myvalue = selectedItem.reduce((acc, item) => {
      if (acc[item] == null) acc[item] = 0;
      acc[item] = Result.reduce((prev, current) => {
        if (current[4] == item) prev += parseInt(current[3], 10);
        return prev;
      }, 0)
      return acc;

    }, {})
    setPiedata(myvalue);
  }
  const UpdateLinechart = () => {
    const grouped = Result.reduce((acc, item) => {
      const key = item[0];
      if (acc[key] == null) acc[key] = 0;
      if (item[4] == "RUNNING")
        acc[key] += parseInt(item[3], 10);
      return acc
    }, {})

    setLinedata(grouped);
  }

  return (
    <>
      {/*Secondary Navbar */}
      <div className='  flex  justify-around  mt-[80px] p-5'>
        <div>
          <Parameternav onDataChange={handleParameterFromChild} />


        </div>
        <div >
          <button onClick={() => {
            handleHTTPRequest();

          }}
            className="text-1xl rounded-lg bg-green-500 p-3 text-white">GET REPORT</button>
        </div>
        <div >
          <button onClick={() => {
            UpdateLinechart();
            UpdatePiechart();
            if (sectiontogle == 1) { setSectiontogle(2) }
            else if (sectiontogle == 2) {
              setSectiontogle(1)

            }

          }}

            className="text-1xl rounded-lg bg-green-500 p-3 text-white">{sectiontogle == 1 ? "Graphycal" : "Row Data"}</button>
        </div>
      </div>

      {/* Main Section */}

      {sectiontogle == 0 ? <div>
        {/* sectiontogle=0 */}

      </div>
        : sectiontogle == 1 ? <div>
          {/* sectiontogle=1 */}
          <div>
            {/* Display Row Data */}
            <h1 className='text-white text-center text-3xl'>Row Data</h1>
            <div className='text-white grid lg:grid-cols-3 grid-cols-1   m-3'>
              {selectedItem.map(item => <div>

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
                        <td style={{ border: '1px solid black', padding: '8px' }} >{
                          Result
                            .filter(j => j[4] === item)
                            .reduce((sum, j) => sum + parseInt(j[3], 10), 0)

                        }</td>
                      </tr>
                    </tbody>
                  </table>)}
              </div>)}
            </div>

          </div>


        </div>
          : sectiontogle == 2 ? <div>
            {/* sectiontogle=2*/}
            <DownloadInvoice Tabledata={value}Linedata={linedata} Piedata={piedata} />
          </div>
            : sectiontogle == 3 ?
              <div>
                {/* sectiontogle==2 */}
                <div>
                  <div className="flex items-center justify-center mt-[100px] text-white">
                    <Spinner className='w-20 h-20' />
                    <h1>Loading.....</h1>
                  </div>
                </div>


              </div>
              : <div>

              </div>

      }

    </>



  )
}

export default Reports
