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

	 
		useEffect(() => {
			fetch('htpps://googlesheet-yuetcisb.b4a.run')
			   .then((res) => res.json())
			   .then((data) => {
				  console.log(data);
				
			   })
			   .catch((err) => {
				  console.log("message",err.message);
			   });
		 });

	  
	  

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