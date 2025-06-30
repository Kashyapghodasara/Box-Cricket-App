import MutliStepFormWrapper from './MutliStepFormWrapper';
import { Link } from 'react-router-dom';
import React from 'react';
import useRegistration from '../Store/useRegistration';
import axios from "axios"
import toast from 'react-hot-toast';
import { USER_BACKEND_URL } from '../Constant';


const BoxBooking = () => {

  const { isLoggedIn, login, logout, isSignedUp } = useRegistration();

  const SuccessToastStyle = {
    style: {
      background: "#212121", // dark mode black background
      color: "#fff",
      fontSize: "17px",     // white text
      padding: "12px 20px",
      borderRadius: "10px",
      width: "100%",
      fontWeight: "300",
      textAlign: "center",
    },
    iconTheme: {
      primary: "#39bf04", // red-400 (error icon color)
      secondary: "#1f2937", // gray-800
    },
    duration: 4000, // Optional: auto-close duration
  }
  const ErrorToastStyle = {
    style: {
      background: "#212121", // dark mode black background
      color: "#fff",
      fontSize: "17px",     // white text
      padding: "12px 20px",
      borderRadius: "10px",
      width: "100%",
      fontWeight: "300",
      textAlign: "center",
    },
    iconTheme: {
      primary: "#eb1410", // red-400 (error icon color)
      secondary: "#1f2937", // gray-800
    },
    duration: 4000, // Optional: auto-close duration
  }

  const logoutHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${USER_BACKEND_URL}/logout`);
      if (response.data.success) {
        logout()
        toast.success(response.data.message, SuccessToastStyle);
      }
    } catch (error) {
      toast.error(error.response.data.message, ErrorToastStyle);
    }

  }

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

              {isLoggedIn === true && (
                <>
                  <div className='absolute right-2'>
                    <button
                      onClick={logoutHandler}
                      className='bg-[#f92500] hover:bg-[#ce290c] px-5 py-2 rounded-full cursor-pointer'
                    >
                      Logout
                    </button>
                  </div>
                </>
              )}

              {isLoggedIn === false && isSignedUp === true && (
                <>
                  <div className="absolute right-2 flex items-center gap-4">
                    <Link to="/registration">
                      <button className="bg-[#ffc53c] hover:bg-[#FFB70F] px-5 py-2 rounded-full cursor-pointer transition">
                        Login
                      </button>
                    </Link>
                  </div>
                </>
              )}

              {isLoggedIn === false && isSignedUp === false && (
                <>
                  <div className="absolute right-2 flex items-center gap-4">
                    <Link to="/registration">
                      <button className="bg-[#ffc53c] hover:bg-[#FFB70F] px-5 py-2 rounded-full cursor-pointer transition">
                        Signup
                      </button>
                      <button className="bg-[#ffc53c] ml-4 hover:bg-[#FFB70F] px-5 py-2 rounded-full cursor-pointer transition">
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

      <MutliStepFormWrapper />
    </>
  )
}

export default BoxBooking

