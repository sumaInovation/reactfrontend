  import React from 'react'
  
  const Test = () => {
    return (
      <div className='mt-[80px] text-white grid lg:grid-cols-5 grid-cols-2'>
        <input
            type="date"
            id="start-date"

            className="rounded-lg bg-green-100 p-3 m-3 text-black w-[150px] lg:w-[200px]"
          />
        <input
            type="date"
            id="start-date"

            
            className="rounded-lg bg-green-100 p-3 m-3 text-black w-[150px] lg:w-[200px]"
          />
        <button>BUTTON1</button>
        <button>BUTTON2</button>
        <button>BUTTON3</button>
        
      </div>
    )
  }
  
  export default Test
  