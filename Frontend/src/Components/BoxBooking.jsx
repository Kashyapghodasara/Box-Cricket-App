import React, { useEffect } from 'react'
import { useState } from 'react'

const BoxBooking = () => {

  const PaymentMethode = ["UPI", "Bank Transfer"]

  const [Fullname, setFullname] = useState('');
  const [Email, setEmail] = useState('');
  const [City, setCity] = useState('');
  const [State, setState] = useState('');
  const [Zipcode, setZipcode] = useState('');


  const [selectedPaymentMethode, setSelectedPaymentMethode] = useState(null)
  const [payment, setPayment] = useState('');


  return (
    <>
      <div className='w-[100%]' style={{ overflow: 'hidden' }} >

        {/* Navbar */}
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
                <h1 className="pointer" >Home</h1>
                <h1 className="pointer">About</h1>
                <h1 className="pointer">Review</h1>
                <h1 className="pointer">Contact</h1>
              </div>

              {/* Login Button Positioned Right */}
              <div className='absolute right-2'>
                <button className='bg-[#ffc53c] hover:bg-[#FFB70F] px-5 py-2 rounded-full cursor-pointer'>Login</button>
              </div>
            </nav>
          </div>
        </div>


        <div className='flex justify-center h-auto w-full overflow-x-hidden m-5 pt-5'>
          <div className='border-2 border-[#003828] h-auto m-6 rounded-xl w-full max-w-3xl p-8 shadow-lg bg-[#F4F1E1]'>
            <h1 className='text-4xl text-center font-bold text-[#0C3B2E] mb-10'>Book Your Box</h1>

            <form>

              {/* Fullname */}
              <div className='relative w-[90%] m-5 mb-5 mt-10'>
                <input
                  type="text"
                  id="Fullname"
                  value={Fullname}
                  onChange={(e) => setDate(e.target.value)}
                  className="peer w-full appearance-none border-b-2 border-gray-400 bg-transparent py-2 px-1 text-lg text-gray-800 focus:outline-none focus:border-[#0C3B2E]"
                />
                <label
                  htmlFor="Fullname"
                  className="absolute left-1 text-gray-500 text-md px-1 transition-all duration-200
          top-2 peer-focus:top-[-12px] peer-focus:text-sm peer-focus:text-[#0C3B2E]
          peer-valid:top-[-12px] peer-valid:text-sm peer-valid:text-[#0C3B2E]"
                >
                  Fullname
                </label>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="absolute right-2 top-3 w-5 h-5 text-black pointer-events-none"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 
            00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>

              {/* Email -City */}
              <div className='relative w-[90%] m-5 mb-5 mt-10 grid grid-cols-1 md:grid-cols-2 gap-10'>
                <div className='relative w-full mb-5 mt-10'>
                  <input
                    type="email"
                    id="Email"
                    value={Email}
                    onChange={(e) => setDate(e.target.value)}
                    className="peer w-full appearance-none border-b-2 border-gray-400 bg-transparent py-2 px-1 text-lg text-gray-800 focus:outline-none focus:border-[#0C3B2E]"
                  />
                  <label
                    htmlFor="Email"
                    className="absolute left-1 text-gray-500 text-md px-1 transition-all duration-200
          top-2 peer-focus:top-[-12px] peer-focus:text-sm peer-focus:text-[#0C3B2E]
          peer-valid:top-[-12px] peer-valid:text-sm peer-valid:text-[#0C3B2E]"
                  >
                    Email
                  </label>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="absolute right-2 top-3 w-5 h-5 text-black pointer-events-none"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 
            00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </div>

                <div className='relative w-full mb-5 mt-10'>
                  <input
                    type="text"
                    id="City"
                    value={City}
                    onChange={(e) => setDate(e.target.value)}
                    className="peer w-full appearance-none border-b-2 border-gray-400 bg-transparent py-2 px-1 text-lg text-gray-800 focus:outline-none focus:border-[#0C3B2E]"
                  />
                  <label
                    htmlFor="City"
                    className="absolute left-1 text-gray-500 text-md px-1 transition-all duration-200
          top-2 peer-focus:top-[-12px] peer-focus:text-sm peer-focus:text-[#0C3B2E]
          peer-valid:top-[-12px] peer-valid:text-sm peer-valid:text-[#0C3B2E]"
                  >
                    City
                  </label>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="absolute right-2 top-3 w-5 h-5 text-black pointer-events-none"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 
            00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </div>
              </div>

              {/* State - Zipcode */}
              <div className='relative w-[90%] m-5 mb-5 mt-10 grid grid-cols-1 md:grid-cols-2 gap-10'>
                <div className='relative w-full mb-5'>
                  <input
                    type="text"
                    id="State"
                    value={State}
                    className="peer w-full appearance-none border-b-2 border-gray-400 bg-transparent py-2 px-1 text-lg text-gray-800 focus:outline-none focus:border-[#0C3B2E]"
                  />
                  <label
                    htmlFor="State"
                    className="absolute left-1 text-gray-500 text-md px-1 transition-all duration-200
          top-2 peer-focus:top-[-12px] peer-focus:text-sm peer-focus:text-[#0C3B2E]
          peer-valid:top-[-12px] peer-valid:text-sm peer-valid:text-[#0C3B2E]"
                  >
                    State
                  </label>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="absolute right-2 top-3 w-5 h-5 text-black pointer-events-none"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 
            00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </div>

                <div className='relative w-full mb-5 '>
                  <input
                    type="number"
                    id="Zipcode"
                    value={Zipcode}
                    className="peer w-full appearance-none border-b-2 border-gray-400 bg-transparent py-2 px-1 text-lg text-gray-800 focus:outline-none focus:border-[#0C3B2E]"
                  />
                  <label
                    htmlFor="Zipcode"
                    className="absolute left-1 text-gray-500 text-md px-1 transition-all duration-200
          top-2 peer-focus:top-[-12px] peer-focus:text-sm peer-focus:text-[#0C3B2E]
          peer-valid:top-[-12px] peer-valid:text-sm peer-valid:text-[#0C3B2E]"
                  >
                    Zipcode
                  </label>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="absolute right-2 top-3 w-5 h-5 text-black pointer-events-none"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 
            00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </div>
              </div>

              {/* Box Selection */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 mb-5 gap-4 mt-6 w-full">
                {PaymentMethode.map((payment, index) => (
                  <div key={index} className="w-full">
                    <label className="relative cursor-pointer group block w-full">
                      <input
                        type="checkbox"
                        className="sr-only peer" s
                        value={payment}
                        checked={payment === selectedPaymentMethode}
                        onChange={(e) => { e.target.checked ? setSelectedPaymentMethode(payment) && setPayment(payment) : setSelectedPaymentMethode(null) }}
                      />

                      <span className="flex text-2xl flex-col gap-2 items-center justify-center w-full h-full min-h-28 rounded-2xl border-2 border-gray-300 bg-gradient-to-br from-white via-white to-gray-50 text-gray-800 font-semibold shadow-lg transition-all duration-300 ease-in-out 
          peer-checked:border-blue-600 peer-checked:shadow-blue-400/50 peer-checked:shadow-md 
        peer-checked:text-blue-700 hover:border-blue-500 hover:shadow-md hover:scale-105">
                        {payment}
                      </span>
                      <span className="absolute top-2 left-2 w-6 h-6 rounded-full border-2 border-gray-300 bg-white opacity-0 scale-0 
                      peer-checked:scale-100 peer-checked:opacity-100 peer-checked:bg-blue-600 peer-checked:border-blue-600 
                      flex items-center justify-center text-white text-sm font-bold 
                       transition duration-300 ease-in-out shadow-md">
                        ✓
                      </span>
                    </label>
                  </div>
                ))}
              </div>



              {/* Button Area */}
              <div className="flex justify-end">
                <button className='bg-[#eba604] text-white py-2 px-4 rounded-md hover:bg-[#ffb300]'>
                  Next Page
                </button>
              </div>

            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default BoxBooking

