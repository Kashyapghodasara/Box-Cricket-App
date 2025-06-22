import MutliStepFormWrapper from './MutliStepFormWrapper';
import { Link } from 'react-router-dom';
import React from 'react';

const BoxBooking = () => {

  const [isLoggedIn, setIsLoggedIn] = React.useState(false);


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
                      <button className="bg-[#ffc53c] hover:bg-[#FFB70F] px-5 py-2 rounded-full cursor-pointer transition">
                        Signup
                      </button>
                      <button className="bg-[#ffc53c] hover:bg-[#FFB70F] px-5 py-2 rounded-full cursor-pointer transition">
                        Login
                      </button>
                    </div>
                  </>
                )}
            </nav>
          </div>
        </div>

      </section>

      <MutliStepFormWrapper />
    </>
  )
}

export default BoxBooking

