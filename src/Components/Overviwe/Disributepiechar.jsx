import { motion } from "framer-motion";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { useWebSocket } from "../Common/WebSocketContext";
import { useEffect, useState } from "react";


const COLORS = ["#00FF53", "#FF0000", "#EC4899", "#00FF43", "#0000FF", "#9FE2BF"];

const Disributepiechar = () => {

	const { messages } = useWebSocket();
	
	const [userData, setUerData] = useState([
		{ name: 'IDLE', value: 100 },
		{ name: 'RUNNING', value: 100 },
		{ name: 'SPOOL FILED', value: 100 },
		{ name: 'SPOOL EMPTHY', value: 100 },
		{ name: 'COPPER BROKEN', value: 100 },
		{ name: 'OTHERS', value: 100 },

	])

	 // Function to update the value of 'COPPER BROKEN'
	 const updateNewValue = (newValue,itemName) => {
		setUerData((prevData) =>
		  prevData.map((item) =>
			item.name === itemName ? { ...item, value: newValue } : item
		  )
		);
	  };

	 
		useEffect(() => {
			fetch("https://googlesheet-yuetcisb.b4a.run/distributedata")
			  .then(response => {
				if (!response.ok) {
				  throw new Error('Network response was not ok');
				}
				return response.json();  // Read the response body as JSON
			  })
			  .then(data => {
				// Now you can work with your parsed JSON data
				//Processing ncomming data from google sheet
				const idle = data.reduce((total, item) => {
					// Add 1 to total if copperbroken is true, 0 if false
					return total + (item[4]=="IDLE" ? parseInt(item[3],10) : 0);
				  }, 0);

				const totalCopperBroken = data.reduce((total, item) => {
					// Add 1 to total if copperbroken is true, 0 if false
					return total + (item[4]=="COPPER BROKEN" ? parseInt(item[3],10) : 0);
				  }, 0);
				  const taypdetect = data.reduce((total, item) => {
					// Add 1 to total if copperbroken is true, 0 if false
					return total + (item[4]=="TAPE DETECT" ? parseInt(item[3],10) : 0);
				  }, 0);
				  const spoolfull = data.reduce((total, item) => {
					// Add 1 to total if copperbroken is true, 0 if false
					return total + (item[4]=="SPOOL FILED" ? parseInt(item[3],10) : 0);
				  }, 0);
				  const spoolempty = data.reduce((total, item) => {
					// Add 1 to total if copperbroken is true, 0 if false
					return total + (item[4]=="SPOOL EMPTHY" ? parseInt(item[3],10) : 0);
				  }, 0);
				  const others = data.reduce((total, item) => {
					// Add 1 to total if copperbroken is true, 0 if false
					return total + (item[4]=="OTHERS" ? parseInt(item[3],10) : 0);
				  }, 0);
				  const running= data.reduce((total, item) => {
					// Add 1 to total if copperbroken is true, 0 if false
					return total + (item[4]=="RUNNING" ? parseInt(item[3],10) : 0);
				  }, 0);
				
				  // Updates newvalue
				  updateNewValue(running,"RUNNING");
				  updateNewValue(idle,"IDLE");
				  updateNewValue(spoolempty,"SPOOL EMPTHY");
				  updateNewValue(spoolfull,"SPOOL FILED");
				  updateNewValue(totalCopperBroken,"COPPER BROKEN");
				  updateNewValue(taypdetect,"TAPE DETECT");
				  updateNewValue(running,"RUNNING");
				//console.log(totalCopperBroken);
			
			  })
			  .catch(error => {
				console.error('There was a problem with the fetch operation:', error);
			  });
			
		 },[]);

	  
	  

	return (
		<motion.div
			className='bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700'
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ delay: 0.3 }}
		>
			<h2 className='text-lg font-medium mb-4 text-gray-100'>Today Runtime Vs Downtime</h2>
			<div className='h-80'>
				<ResponsiveContainer width={"100%"} height={"100%"}>
					<PieChart>
						<Pie
							data={userData}
							cx={"50%"}
							cy={"50%"}
							labelLine={false}
							outerRadius={80}
							fill='#8884d8'
							dataKey='value'

							label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
						>
							{userData.map((entry, index) => (
								<Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
							))}
						</Pie>
						<Tooltip
							contentStyle={{
								backgroundColor: "rgba(31, 41, 55, 0.8)",
								borderColor: "#4B5563",
							}}
							itemStyle={{ color: "#E5E7EB" }}
						/>
						<Legend />
					</PieChart>
				</ResponsiveContainer>
			</div>
		</motion.div>
	);
};
export default Disributepiechar;