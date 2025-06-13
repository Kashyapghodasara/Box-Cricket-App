import React from 'react'
import { useState } from 'react';

const StepBoxDetails = () => {

    const [date, setDate] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [price, setPrice] = useState('');
    const [size, setSize] = useState('');
    const [paymentStatus] = useState('Pending');


    return (
        <div>
            <div>
                {/* Box Selection */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 mt-6">
                    {["BX001", "BX002", "BX003", "BX004", "BX005", "BX006"].map((boxId, index) => (
                        <div key={index} className="flex flex-col items-center space-y-2">
                            <label className="relative cursor-pointer group">
                                <input type="checkbox" className="sr-only peer" />

                                {/* Box Design */}
                                <span className="flex flex-col items-center justify-center w-28 min-h-28 rounded-2xl border-2 border-gray-300 bg-gradient-to-br from-white via-white to-gray-50 text-gray-800 font-semibold shadow-lg transition-all duration-300 ease-in-out 
                        peer-checked:border-blue-600 peer-checked:shadow-blue-400/50 peer-checked:shadow-md 
                        peer-checked:text-blue-700 hover:border-blue-400 hover:shadow-md hover:scale-105">
                                    #{boxId}
                                </span>

                                {/* Checkmark */}
                                <span
                                    className="absolute top-2 left-2 w-6 h-6 rounded-full border-2 border-gray-300 bg-white opacity-0 scale-0 
                    peer-checked:scale-100 peer-checked:opacity-100 peer-checked:bg-blue-600 peer-checked:border-blue-600 
                    flex items-center justify-center text-white text-sm font-bold 
                    transition duration-300 ease-in-out shadow-md"
                                >
                                    ✓
                                </span>


                                {/* Label text (optional) */}
                                <span className="text-sm text-gray-600 peer-checked:text-blue-700 transition">
                                    {boxId}
                                </span>
                            </label>
                        </div>
                    ))}
                </div>

                <div className='relative w-[90%] m-5 mb-5 mt-10'>
                    <input
                        type="date"
                        id="Date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="peer w-full appearance-none border-b-2 border-gray-400 bg-transparent py-2 px-1 text-lg text-gray-800 focus:outline-none focus:border-[#0C3B2E]"
                    />
                    <label
                        htmlFor="Date"
                        className="absolute left-1 text-gray-500 text-md px-1 transition-all duration-200
          top-2 peer-focus:top-[-12px] peer-focus:text-sm peer-focus:text-[#0C3B2E]
          peer-valid:top-[-12px] peer-valid:text-sm peer-valid:text-[#0C3B2E]"
                    >
                        Date
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

                {/* Start Time - End Time */}
                <div className='grid grid-cols-1 md:grid-cols-2'>
                    <div className='relative w-[80%] m-5 mt-10'>
                        <input
                            type="time"
                            id="start_time"
                            value={startTime}
                            onChange={(e) => setStartTime(e.target.value)}
                            className="peer w-full appearance-none border-b-2 border-gray-400 bg-transparent py-2 px-1 text-lg text-gray-800 focus:outline-none focus:border-[#0C3B2E]"
                        />
                        <label
                            htmlFor="start_time"
                            className="absolute left-1 text-gray-500 text-md px-1 transition-all duration-200
            top-2 peer-focus:top-[-12px] peer-focus:text-sm peer-focus:text-[#0C3B2E]
            peer-valid:top-[-12px] peer-valid:text-sm peer-valid:text-[#0C3B2E]"
                        >
                            Start Time
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
                                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                        </svg>
                    </div>

                    <div className='relative w-[80%] m-5 mt-10'>
                        <input
                            type="time"
                            id="end_time"
                            value={endTime}
                            onChange={(e) => setEndTime(e.target.value)}
                            className="peer w-full appearance-none border-b-2 border-gray-400 bg-transparent py-2 px-1 text-lg text-gray-800 focus:outline-none focus:border-[#0C3B2E]"
                        />
                        <label
                            htmlFor="end_time"
                            className="absolute left-1 text-gray-500 text-md px-1 transition-all duration-200
            top-2 peer-focus:top-[-12px] peer-focus:text-sm peer-focus:text-[#0C3B2E]
            peer-valid:top-[-12px] peer-valid:text-sm peer-valid:text-[#0C3B2E]"
                        >
                            End Time
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
                                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                        </svg>
                    </div>
                </div>

                {/* Price - Size */}
                <div className='grid grid-cols-1 md:grid-cols-2'>
                    <div className='relative w-[80%] m-5 mb-5 mt-10'>
                        <input
                            type="text"
                            id="Price"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            className="peer w-full appearance-none border-b-2 border-gray-400 bg-transparent py-2 px-1 text-lg text-gray-800 focus:outline-none focus:border-[#0C3B2E]"
                        />
                        <label
                            htmlFor="Price"
                            className="absolute left-1 text-gray-500 text-md px-1 transition-all duration-200
            top-2 peer-focus:top-[-12px] peer-focus:text-sm peer-focus:text-[#0C3B2E]
            peer-valid:top-[-12px] peer-valid:text-sm peer-valid:text-[#0C3B2E]"
                        >
                            Price
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
                                d="M10 6h6M10 12h4M6 18h9M6 6l3 6-3 6"
                            />
                        </svg>
                    </div>

                    <div className='relative w-[80%] m-5 mb-5 mt-10'>
                        <input
                            type="text"
                            id="Size"
                            value={size}
                            onChange={(e) => setSize(e.target.value)}
                            className="peer w-full appearance-none border-b-2 border-gray-400 bg-transparent py-2 px-1 text-lg text-gray-800 focus:outline-none focus:border-[#0C3B2E]"
                        />
                        <label
                            htmlFor="Size"
                            className="absolute left-1 text-gray-500 text-md px-1 transition-all duration-200
            top-2 peer-focus:top-[-12px] peer-focus:text-sm peer-focus:text-[#0C3B2E]
            peer-valid:top-[-12px] peer-valid:text-sm peer-valid:text-[#0C3B2E]"
                        >
                            Size
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
                                d="M3 7l9 4 9-4m-18 0l9-4 9 4M3 7v10l9 4 9-4V7"
                            />
                        </svg>
                    </div>
                </div>

                {/* Payment Status */}
                <div className='relative w-[90%] m-5 mb-5 mt-10'>
                    <input
                        type="text"
                        id="Status"
                        value={paymentStatus}
                        disabled
                        className="peer cursor-not-allowed w-full appearance-none border-b-2 border-gray-400 bg-transparent py-2 px-1 text-lg text-gray-800 focus:outline-none focus:border-[#0C3B2E]"
                    />
                    <label
                        htmlFor="Status"
                        className="absolute left-1 text-[#0C3B2E] text-sm px-1 transition-all duration-200
          top-[-20px] peer-focus:top-[-12px] peer-focus:text-sm peer-focus:text-[#0C3B2E]
          peer-valid:top-[-12px] peer-valid:text-sm peer-valid:text-[#0C3B2E]"
                    >
                        Payment Status
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
                            d="M4 7h16M4 11h16M4 15h6m6 0h2m2-8a2 2 0 00-2-2H6a2 2 0 
            00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V7z"
                        />
                    </svg>
                </div>
            </div>
        </div>
    )
}

export default StepBoxDetails