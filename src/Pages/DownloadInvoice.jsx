import React from 'react';
import { Line, Pie } from 'react-chartjs-2';
import html2pdf from 'html2pdf.js';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement);

const Invoice = () => {
  // Data for the Line Chart (Daily Production)
  const lineData = {
    labels: ['2023-12-01', '2023-12-02', '2023-12-03', '2023-12-04', '2023-12-05'],
    datasets: [
      {
        label: 'Daily Production',
        data: [100, 120, 80, 150, 130],  // Example data
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
      }
    ]
  };

  // Data for the Pie Chart (Downtime vs Running Time)
  const pieData = {
    labels: ['Running Time', 'Machine Fault', 'Unloading', 'Loading'],
    datasets: [
      {
        data: [50, 20, 10, 20],  // Example data: % distribution of time
        backgroundColor: ['#36A2EB', '#FF6384', '#FFCE56', '#4BC0C0'],
        hoverOffset: 4
      }
    ]
  };

  // Table Data (Daily Downtime, Total Downtime, Runtime)
  const tableData = [
    { date: '2023-12-01', downtime: 2, runtime: 22, totalDowntime: 2 },
    { date: '2023-12-02', downtime: 1.5, runtime: 23.5, totalDowntime: 3.5 },
    { date: '2023-12-03', downtime: 3, runtime: 21, totalDowntime: 6.5 },
    { date: '2023-12-04', downtime: 1, runtime: 24, totalDowntime: 7.5 },
    { date: '2023-12-05', downtime: 2, runtime: 22, totalDowntime: 9.5 }
  ];


  const downloadInvoice = () => {
    const element = document.getElementById('Invoice');
    html2pdf().from(element).save('Invoice.pdf');
  };
  return (
    <>
    <div className="container mx-auto p-8 text-white mt-[80px]">
      <h1 className="text-3xl font-bold text-center mb-8">Production Invoice</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        {/* Line Chart */}
        <div className="flex flex-col items-center">
          <h3 className="text-xl font-semibold mb-4">Daily Production</h3>
          <div className="w-full max-w-[500px]">
            <Line data={lineData} />
          </div>
        </div>

        {/* Pie Chart */}
        <div className="flex flex-col items-center">
          <h3 className="text-xl font-semibold mb-4">Running Time vs Downtime</h3>
          <div className="w-full max-w-[500px]">
            <Pie data={pieData} />
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <h3 className="text-xl font-semibold mb-4">Production Summary</h3>
        <table className="min-w-full table-auto border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 text-left border border-gray-300">Date</th>
              <th className="px-4 py-2 text-left border border-gray-300">Downtime (hrs)</th>
              <th className="px-4 py-2 text-left border border-gray-300">Runtime (hrs)</th>
              <th className="px-4 py-2 text-left border border-gray-300">Total Downtime (hrs)</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((row, index) => (
              <tr key={index} className="border-b hover:bg-gray-50">
                <td className="px-4 py-2 border border-gray-300">{row.date}</td>
                <td className="px-4 py-2 border border-gray-300">{row.downtime}</td>
                <td className="px-4 py-2 border border-gray-300">{row.runtime}</td>
                <td className="px-4 py-2 border border-gray-300">{row.totalDowntime}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
     <div className='h-[300px]'>
     <div id="invoice" className="container mx-auto p-8">
    {/* Your content */}
    <button onClick={downloadInvoice} className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-md">
      Download Invoice as PDF
    </button>
  </div>
     </div>
    </>
  );
};

export default Invoice;
