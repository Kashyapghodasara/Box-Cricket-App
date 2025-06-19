import React from 'react'
import { useState, useEffect } from 'react';
import useBoxDetailStore from '../Store/useBoxDetailStore.jsx';

const StepBoxDetails = ({ onNext }) => {

    const [date, setDate] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [price, setPrice] = useState('');
    const [size, setSize] = useState('');
    const [paymentStatus, setPaymentStatus] = useState('Pending');
    const [duration, setDuration] = useState('')

    const [selectedBox, setSelectedBox] = useState(null)
    const BoxIds = ["BX001", "BX002", "BX003", "BX004", "BX005", "BX006"]

    const { setBoxDetails, boxDetails } = useBoxDetailStore();

    const setValueBoxDetails = (e) => {
        e.preventDefault();
        console.log("Form is going to submit");

        setBoxDetails({
            Boxid: selectedBox,
            Date: date,
            Start_time: startTime,
            End_time: endTime,
            Price: price,
            Size: size,
            Duration: duration,
            Payment_status: paymentStatus,
        });

        console.log("Form Submitted");
        console.log(boxDetails);

        onNext(); // ✅ This line is required to proceed to next step
    };

    const handleStartTimeChange = (e) => {
        const value = e.target.value;
        const [hour, minute] = value.split(':').map(Number);
        if (minute !== 0) {
            // Round down to nearest full hour
            const newTime = `${String(hour).padStart(2, '0')}:00`;
            setStartTime(newTime);
        } else {
            setStartTime(value);
        }
        handleDuration();
    };

    const handleEndTimeChange = (e) => {
        const value = e.target.value;
        const [hour, minute] = value.split(':').map(Number);
        if (minute !== 0) {
            // Round down to nearest full hour
            const newTime = `${String(hour).padStart(2, '0')}:00`;
            setEndTime(newTime);
        } else {
            setEndTime(value);
        }
        handleDuration();
    }

    const handleDuration = () => {
        const start = document.getElementById('start_time').value;
        const end = document.getElementById('end_time').value;

        if (!start || !end) {
            setDuration("")
            return
        }

        const [startHour] = start.split(':').map(Number);
        const [endHour] = end.split(':').map(Number);

        let diff;
        if (startHour > endHour) {
            // Crosses midnight
            diff = (24 - startHour) + endHour;
        } else {
            diff = endHour - startHour;
        }
        if (diff > 0) {
            setDuration(`${diff} hour${diff > 1 ? 's' : ''}`);
        } else {
            setDuration("Invalid range");
        }

    }

    const handleDateChange = (e) => {
        const selectedDate = e.target.value;
        const todayDate = new Date().getDate();
        const today = new Date();
        const currentMonth = new Date().getMonth();

        const selected = new Date(selectedDate).getDate();
        const selectedMonth = new Date(selectedDate).getMonth();

        const maxDate = new Date(today);
        maxDate.setDate(today.getDate() + 3);

      // When comparing two Date objects in JavaScript, 
      // you're not just comparing the date (like 2025-06-19), you're also comparing the
      //  time (like 14:25:30.123).
      // When we set time to 0000 then now you will comparing the Date only
        const selectedFullDate = new Date(selectedDate);
        selectedFullDate.setHours(0, 0, 0, 0);
        today.setHours(0, 0, 0, 0);
        maxDate.setHours(0, 0, 0, 0);

        // ✅ Add check: If selected date > max allowed (today + 5)
        if (selectedFullDate > maxDate) {
            alert("You can only select a date within the next 3 days.");
            setDate('');
            return;
        }

        if ((selected > todayDate || selected === todayDate)) {
            setDate(selectedDate);
        }
        else if (selected < todayDate) {
            if (currentMonth < selectedMonth) {
                setDate(selectedDate);
            } else {
                alert("Cannot select past date");
            }
        }
        else {
            alert("Cannot select past date");
            setDate('');
            return;
        }
    };


    useEffect(() => {
        const durationValue = document.getElementById('Duration').value;

        if (!durationValue) {
            setPrice("");
            return;
        }

        const [hour] = durationValue.split(' ');
        const hours = parseInt(hour);

        if (isNaN(hours) || hours <= 0) {
            setPrice("");
            return;
        }

        let pricePerHour;

        if (selectedBox === "BX001" || selectedBox === "BX002") {
            pricePerHour = 600;
        } else if (selectedBox === "BX003" || selectedBox === "BX004") {
            pricePerHour = 1100;
        } else if (selectedBox === "BX005" || selectedBox === "BX006") {
            pricePerHour = 1700;
        } else {
            setPrice(""); // unknown box
            return;
        }

        const finalPrice = pricePerHour * hours;
        setPrice(finalPrice);
    }, [duration, selectedBox])


    useEffect(() => {
        if (selectedBox === "BX001" || selectedBox === "BX002") {
            setSize("Small");
        } else if (selectedBox === "BX003" || selectedBox === "BX004") {
            setSize("Medium");
        } else if (selectedBox === "BX005" || selectedBox === "BX006") {
            setSize("Large");
        } else {
            setSize('');
        }
    }, [selectedBox]);


    return (
        <>
            <div className='w-[100%]' style={{ overflow: 'hidden' }} >

                {/* Form Section */}
                <div className='flex justify-center h-auto w-full overflow-x-hidden m-5 pt-5'>
                    <div className='border-2 border-[#003828] h-auto m-6 rounded-xl w-full max-w-3xl p-8 shadow-lg bg-[#F4F1E1]'>
                        <h1 className='text-4xl text-center font-bold text-[#0C3B2E] mb-10'>Book Your Box</h1>

                        {/* Input Field */}

                        <form onSubmit={setValueBoxDetails}>
                            {/* Box Selection */}
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 mt-6">
                                {BoxIds.map((boxId, index) => (
                                    <div key={index} className="flex flex-col items-center space-y-2">
                                        <label className="relative cursor-pointer group">
                                            <input
                                                type="checkbox"
                                                className="sr-only peer"
                                                name="boxID"
                                                checked={boxId === selectedBox}
                                                onChange={(e) => { e.target.checked ? setSelectedBox(boxId) : setSelectedBox(null) }}
                                            />

                                            {/* Box Design */}
                                            <span className="flex flex-col items-center justify-center w-28 min-h-28 rounded-2xl border-2 border-gray-300 bg-gradient-to-br from-white via-white to-gray-50 text-gray-800 font-semibold shadow-lg transition-all duration-300 ease-in-out 
                        peer-checked:border-blue-600 peer-checked:shadow-blue-400/50 peer-checked:shadow-md 
                        peer-checked:text-blue-700 hover:border-blue-500 hover:shadow-md hover:scale-105">
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
                                            {/*  <span className="text-sm  text-gray-600 peer-checked:text-blue-700 transition">
                        {boxId}
                      </span> */}
                                        </label>
                                    </div>
                                ))}
                            </div>

                            {/* Date */}
                            <div className='relative w-[90%] m-5 mb-5 mt-10'>
                                <input
                                    type="date"
                                    id="Date"
                                    name='date'
                                    value={date}
                                    onChange={handleDateChange}
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
                                        name='starttime'
                                        value={startTime}
                                        onChange={handleStartTimeChange}
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
                                        name='endtime'
                                        value={endTime}
                                        onChange={handleEndTimeChange}
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
                                <div className='relative w-[90%] m-5 mb-5 mt-10'>
                                    <label
                                        htmlFor="Price"
                                        className="absolute left-1 -top-3 text-sm text-[#0C3B2E] px-1 z-10"
                                    >
                                        Price
                                    </label>
                                    <input
                                        type="number"
                                        id="Price"
                                        readOnly
                                        value={price}
                                        className="w-full appearance-none border-b-2 border-gray-400 bg-transparent py-2 px-1 text-lg text-gray-800 focus:outline-none focus:border-[#0C3B2E]"
                                    />
                                </div>
                                <div className='relative w-[80%] m-5 mb-5 mt-10'>
                                    <input
                                        type="text"
                                        id="Size"
                                        name='size'
                                        value={size}  //onChange not work because we use useEffect for this
                                        readOnly
                                        className="peer cursor-not-allowed w-full appearance-none border-b-2 border-gray-400 bg-transparent py-2 px-1 text-lg text-gray-800 focus:outline-none focus:border-[#0C3B2E]"
                                    />
                                    <label
                                        htmlFor="Size"
                                        className="absolute left-1 text-[#0C3B2E] text-sm px-1 transition-all duration-200
            top-[-20px] peer-focus:top-[-12px] peer-focus:text-sm peer-focus:text-[#0C3B2E]
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

                            {/* Payment Status - Duration*/}
                            <div className='grid grid-cols-1 md:grid-cols-2'>
                                <div className='relative w-[80%] m-5 mb-5 mt-10'>
                                    <input
                                        type="text"
                                        id="Duration"
                                        name='Duration'
                                        value={duration}
                                        disabled
                                        className="peer cursor-not-allowed w-full appearance-none border-b-2 border-gray-400 bg-transparent py-2 px-1 text-lg text-gray-800 focus:outline-none focus:border-[#0C3B2E]"
                                    />
                                    <label
                                        htmlFor="Duration"
                                        className="absolute left-1 text-[#0C3B2E] text-sm px-1 transition-all duration-200
          top-[-20px] peer-focus:top-[-12px] peer-focus:text-sm peer-focus:text-[#0C3B2E]
          peer-valid:top-[-12px] peer-valid:text-sm peer-valid:text-[#0C3B2E]"
                                    >
                                        Duration
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
                                <div className='relative w-[80%] m-5 mb-5 mt-10'>
                                    <input
                                        type="text"
                                        id="Status"
                                        name='status'
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

                            <div className="flex justify-end">
                                <button
                                    type='submit'
                                    className='bg-[#eba604] cursor-pointer text-white py-2 px-4 rounded-md hover:bg-[#ffb300]'>
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

export default StepBoxDetails