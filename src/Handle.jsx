import React, { useEffect, useState } from 'react';

const DataFetcher = () => {
  const [data, setData] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  async function getData() {

 
  }
   




  return (
    <div className='text-white'>
      <h2>{data.message}</h2>
      <button onClick={getData}>Pressed</button>
    </div>
  );
};   

export default DataFetcher;