import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

// Now Slote display design is ready - 25-6-25
// When use clicks on the date button then this button send the date to backend through API
// And get the data from backend
// When time comes to complete backend then we have to fethced data when page loads
// So we can use customHooks + useEffect
// And Dynamic logic to display each data to particular slote
// like map + filter to itrate each data and filter particular slote data

//OR 

// We might fethced data from the start when page load 
// Like we already fetched data of today, tomorrow and overmoro date
// when use clicks on the date button then specific customHooks feature call and we get data
// And then we can use map + filter to display each data to particular slote
// I think this could be the task


const Availability = () => {

  const [isLoggedIn, setIsLoggedIn] = React.useState(false);

  const [today, setToday] = useState('')
  const [todayDate, setTodayDate] = useState('')
  const [todayDay, setTodayDay] = useState('')
  const [todayMonth, setTodayMonth] = useState('')

  const [tomorrowDate, setTomorrowDate] = useState('')
  const [tomorrowDay, setTomorrowDay] = useState('')

  const [overmoroDate, setOvermoroDate] = useState('')
  const [overmoroDay, setOvermoroDay] = useState('')


  useEffect(() => {

    const Days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
    const Months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
    const Today = new Date()

    setToday(Today)

    // If we directly use getDate/Month then it will display the number of Day-Month like 2(Tuesday) - 6(June)
    setTodayDate(Today.getDate())
    setTodayDay(Days[Today.getDay()])
    setTodayMonth(Months[Today.getMonth()])

    setTomorrowDate(Today.getDate() + 1)
    setTomorrowDay(Days[Today.getDay() + 1])

    setOvermoroDate(Today.getDate() + 2)
    setOvermoroDay(Days[Today.getDay() + 2])

  }, [])

  return (
    <>
      {/* Navbar Section*/}
      <section id='Home'>
        <div className='flex justify-center m-2'>
          <div className='relative w-[90%] rounded-full p-2'>
            <nav className='flex items-center justify-center w-full'>
              {/* Website Name */}

              <div className='absolute left-2'>
                <h1 className='text-4xl font-bold text-[#0C3B2E] cursor-pointer'
                  style={{ fontFamily: 'Gabarito' }}>
                  Criksy
                </h1>
              </div>

              {/* Nav Links Centered */}
              <div className='flex flex-row gap-[80px] text-[#0C3B2E] text-lg'>
                <Link to="/">
                  <button className="pointer">Home</button>
                </Link>
                <button
                  onClick={() => scrollToSection('Slote')}
                  className="pointer">
                  Slote
                </button>
                <Link to="/showBookings">
                  <button className="pointer">Bookings</button>
                </Link>
                <button
                  onClick={() => scrollToSection('Contact')}
                  className="pointer">
                  Contact
                </button>
              </div>

              {isLoggedIn ? (
                <>
                  <div className='absolute right-2'>
                    <button
                      className='bg-[#ce290c] hover:bg-[#f88585] px-5 py-2 rounded-full cursor-pointer'
                    >Logout
                    </button>
                  </div>
                </>)
                : (
                  <>
                    <div className="absolute right-2 flex items-center gap-4">
                      <Link to="/registration">
                        <button className="bg-[#ffc53c] hover:bg-[#FFB70F] px-5 py-2 rounded-full cursor-pointer transition">
                          Signup
                        </button>
                        <button className="bg-[#ffc53c] hover:bg-[#FFB70F] px-5 py-2 ml-2 rounded-full cursor-pointer transition">
                          Login
                        </button>
                      </Link>
                    </div>


                  </>
                )}

            </nav>
          </div>
        </div>
      </section>


      <div className='flex justify-center mt-8 mb-0'>
        <h1 className='text-4xl font-bold text-[#0C3B2E]'>Available Slots</h1>
      </div>

      <div className="flex flex-row items-start justify-start gap-10 p-8 w-full h-screen">

        {/* Left Side - Date Buttons */}
        <div className="flex flex-col gap-6 mt-6 ml-4">
          {/* Today */}
          <button className="border-2 border-[#1e1f1f] hover:bg-[#f9f9f9] cursor-pointer rounded-xl shadow-sm transition-all duration-300 hover:shadow-md px-4 py-2">
            <h2 className="text-sm font-semibold text-[#173b1c] text-center">{todayDay}</h2>
            <h1 className="text-4xl font-semibold text-[#0d2a11] text-center drop-shadow-[0_0_2px_#0d2a11]">{todayDate}</h1>
            <h2 className="text-md font-semibold text-[#173b1c] text-center">{todayMonth}</h2>
          </button>

          {/* Tomorrow */}
          <button className="border-2 border-[#1e1f1f] hover:bg-[#f9f9f9] cursor-pointer rounded-xl shadow-sm transition-all duration-300 hover:shadow-md px-4 py-2">
            <h2 className="text-sm font-semibold text-[#173b1c] text-center">{tomorrowDay}</h2>
            <h1 className="text-4xl font-semibold text-[#0d2a11] text-center drop-shadow-[0_0_2px_#0d2a11]">{tomorrowDate}</h1>
            <h2 className="text-md font-semibold text-[#173b1c] text-center">{todayMonth}</h2>
          </button>

          {/* Overmorrow */}
          <button className="border-2 border-[#1e1f1f] hover:bg-[#f9f9f9] cursor-pointer rounded-xl shadow-sm transition-all duration-300 hover:shadow-md px-4 py-2">
            <h2 className="text-sm font-semibold text-[#173b1c] text-center">{overmoroDay}</h2>
            <h1 className="text-4xl font-semibold text-[#0d2a11] text-center drop-shadow-[0_0_2px_#0d2a11]">{overmoroDate}</h1>
            <h2 className="text-md font-semibold text-[#173b1c] text-center">{todayMonth}</h2>
          </button>
        </div>

        <div className="grid grid-cols-3 gap-6 mt-6 w-full">

          {/* Small Box */}
          <div className="border-2 border-[#1e1f1f] hover:bg-[#f1f1f1] cursor-pointer rounded-xl shadow-md transition-all duration-300 hover:shadow-lg p-4">
            <h1 className="text-[#0C3B2E] font-bold text-2xl mb-3">Small Box</h1>

            {/* Booked Slots for Small */}
            <div className="flex flex-col gap-2">
              <div className="flex flex-row items-center justify-between bg-[#f0fdf4] px-4 py-2 rounded-lg shadow-sm hover:bg-[#dcfce7] transition">
                <span className="text-[#14532d] font-medium">9:00 AM - 11:00 AM</span>
                <span className="text-gray-500 text-sm">#BX001</span>
              </div>

              <div className="flex flex-row items-center justify-between bg-[#f0fdf4] px-4 py-2 rounded-lg shadow-sm hover:bg-[#dcfce7] transition">
                <span className="text-[#14532d] font-medium">1:00 PM - 3:00 PM</span>
                <span className="text-gray-500 text-sm">#BX002</span>
              </div>


              <div className="flex flex-row items-center justify-between bg-[#f0fdf4] px-4 py-2 rounded-lg shadow-sm hover:bg-[#dcfce7] transition">
                <span className="text-[#14532d] font-medium">1:00 PM - 3:00 PM</span>
                <span className="text-gray-500 text-sm">#BX002</span>
              </div>
            </div>
          </div>

          {/* Medium Box */}
          <div className="border-2 border-[#1e1f1f] hover:bg-[#f1f1f1] cursor-pointer rounded-xl shadow-md transition-all duration-300 hover:shadow-lg p-4">
            <h1 className="text-[#0C3B2E] font-bold text-2xl mb-3">Medium Box</h1>

            {/* Booked Slots for Medium */}
            <div className="flex flex-col gap-2">
              <div className="flex flex-row items-center justify-between bg-[#fefce8] px-4 py-2 rounded-lg shadow-sm hover:bg-[#fef9c3] transition">
                <span className="text-[#713f12] font-medium">11:00 AM - 1:00 PM</span>
                <span className="text-gray-500 text-sm">#BX003</span>
              </div>

              <div className="flex flex-row items-center justify-between bg-[#fefce8] px-4 py-2 rounded-lg shadow-sm hover:bg-[#fef9c3] transition">
                <span className="text-[#713f12] font-medium">3:00 PM - 5:00 PM</span>
                <span className="text-gray-500 text-sm">#BX004</span>
              </div>
            </div>
          </div>

          {/* Large Box */}
          <div className="border-2 border-[#1e1f1f] hover:bg-[#f1f1f1] cursor-pointer rounded-xl shadow-md transition-all duration-300 hover:shadow-lg p-4">
            <h1 className="text-[#0C3B2E] font-bold text-2xl mb-3">Large Box</h1>

            {/* Booked Slots for Large */}
            <div className="flex flex-col gap-2">
              <div className="flex flex-row items-center justify-between bg-[#fef2f2] px-4 py-2 rounded-lg shadow-sm hover:bg-[#fee2e2] transition">
                <span className="text-[#991b1b] font-medium">5:00 PM - 7:00 PM</span>
                <span className="text-gray-500 text-sm">#BX005</span>
              </div>
              <div className="flex flex-row items-center justify-between bg-[#fef2f2] px-4 py-2 rounded-lg shadow-sm hover:bg-[#fee2e2] transition">
                <span className="text-[#991b1b] font-medium">7:00 PM - 9:00 PM</span>
                <span className="text-gray-500 text-sm">#BX006</span>
              </div>
              <div className="flex flex-row items-center justify-between bg-[#fef2f2] px-4 py-2 rounded-lg shadow-sm hover:bg-[#fee2e2] transition">
                <span className="text-[#991b1b] font-medium">7:00 PM - 9:00 PM</span>
                <span className="text-gray-500 text-sm">#BX006</span>
              </div>
              <div className="flex flex-row items-center justify-between bg-[#fef2f2] px-4 py-2 rounded-lg shadow-sm hover:bg-[#fee2e2] transition">
                <span className="text-[#991b1b] font-medium">7:00 PM - 9:00 PM</span>
                <span className="text-gray-500 text-sm">#BX006</span>
              </div>
            </div>
          </div>

        </div>


      </div>



    </>
  )
}

export default Availability