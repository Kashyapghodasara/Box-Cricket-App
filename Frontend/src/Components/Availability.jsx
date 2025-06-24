import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';


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

     <div className='grid grid-rows-3 items-baseline justify-items-start h-screen mt-12 ml-10'>

        <button className='border-2 border-[#1e1f1f] cursor-pointer hover:bg-[#eaeaea] rounded-md flex flex-col items-center justify-center'>
          <h2 className='text-sm font-semibold text-[#173b1c] mx-5 mt-1 rounded-md'>{todayDay}</h2>
          <h1 className='text-4xl font-semibold text-[#0d2a11] mx-5 rounded-md drop-shadow-[0_0_1.5px_#0d2a11]'>
            {todayDate}
          </h1>
          <h2 className='text-md font-semibold text-[#173b1c] mx-5 mb-1 rounded-md'>{todayMonth}</h2>
        </button>

        <button className='border-2 border-[#1e1f1f] hover:bg-[#eaeaea] cursor-pointer rounded-md flex flex-col items-center justify-center'>
          <h2 className='text-sm font-semibold text-[#173b1c] mx-5 mt-1 rounded-md'>{tomorrowDay}</h2>
          <h1 className='text-4xl font-semibold text-[#0d2a11] mx-5 rounded-md drop-shadow-[0_0_1.5px_#0d2a11]'>
            {tomorrowDate}
          </h1>
          <h2 className='text-md font-semibold text-[#173b1c] mx-5 mb-1 rounded-md'>{todayMonth}</h2>
        </button>

        <button className='border-2 border-[#1e1f1f] hover:bg-[#eaeaea] cursor-pointer rounded-md flex flex-col items-center justify-center'>
          <h2 className='text-sm font-semibold text-[#173b1c] mx-5 mt-1 rounded-md'>{overmoroDay}</h2>
          <h1 className='text-4xl font-semibold text-[#0d2a11] mx-5 rounded-md drop-shadow-[0_0_1.5px_#0d2a11]'>
            {overmoroDate}
          </h1>
          <h2 className='text-md font-semibold text-[#173b1c] mx-5 mb-1 rounded-md'>{todayMonth}</h2>
        </button>

      </div>
    </>
  )
}

export default Availability