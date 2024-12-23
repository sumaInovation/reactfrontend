import React from 'react'

import Targetproduction from '../Components/Analytics/Targetproduction'
import Barchart from '../Components/Analytics/Barchart'

const Analytics = () => {
  return (
    <div className='flex-1 overflow-y-auto  p-4  mt-5 w-auto'>
      <main className='max-w-7xl mx-auto py-6 px-4 lg:px-8'>
        <Targetproduction />
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8'>
          <Barchart />
          <Barchart />
          <Barchart />
          <Barchart />

        </div>
      </main>
    </div>
  )
}

export default Analytics
