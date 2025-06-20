import React from 'react'

const ShowBookings = () => {
  return (
    <>
        <div className='flex flex-col items-center justify-center '>
            <div className='m-5'>
                <h1 className='text-4xl m-5 font-bold text-[#0C3B2E]'>Your Bookings</h1>
            </div>
            <div className='grid grid-cols-1 gap-10 lg:grid-cols-1 mx-5 w-full'>
                <div className='m-10 h-auto'>
                    <h1 className='text-2xl m-5 bg-amber-950'>Booked Box</h1>
                </div>
            </div>
        </div>
    </>
  )
}

export default ShowBookings