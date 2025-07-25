import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom';
import useRegistration from '../Store/useRegistration';
import usePaymentIdStore from '../Store/usePaymentIdStore';
import useUserIdStore from '../Store/useUserIdStore';
import axios from "axios"
import toast from 'react-hot-toast';
import { USER_BACKEND_URL } from '../Constant';
import { useEffect } from 'react';

const ShowBookings = () => {

    const { isLoggedIn, login, logout, isSignedUp } = useRegistration();
    const paymentId = usePaymentIdStore((state) => state.paymentId);
    const { loggedInUserId } = useUserIdStore()
    const [resData, setResData] = React.useState([])


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
        duration: 2000, // Optional: auto-close duration
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
        duration: 2000, // Optional: auto-close duration
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

    const scrollToSection = (id) => {
        const section = document.getElementById(id);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const getAllBookingDetails = async () => {
        try {
            const config = { headers: { "Content-Type": "application/json", }, withCredentials: true }

            const res = await axios.get(`${USER_BACKEND_URL}/getBookingsDetails/${loggedInUserId}`, config)
            console.log(res)
            setResData(res.data.bookingData)
            if (res.data.success === true) {
                toast.success(res.data.message, SuccessToastStyle);
            }

        } catch (error) {
            console.log("Error ocuured in getting all booking details", error.message);
        }
    }

    useEffect(() => {
        getAllBookingDetails()
    }, [])

    const to12HourFormat = (time24) => {
        const [hourStr, minute] = time24.split(':');
        let hour = parseInt(hourStr, 10);
        const ampm = hour >= 12 ? 'PM' : 'AM';
        hour = hour % 12 || 12; // convert 0 -> 12
        return `${hour}:${minute} ${ampm}`;
    };

    return (
        <>
            <section className='bg-gradient-to-br from-[#106851] via-[#1f8e6f] to-[#5db79e]'>
                <div className='flex justify-center py-2'>
                    <div className='relative w-[90%] rounded-full p-2'>
                        <nav className='flex items-center justify-center w-full'>
                            {/* Website Name */}

                            <div className='absolute left-2'>
                                <h1 className='text-4xl font-bold text-emerald-50 cursor-pointer'
                                    style={{ fontFamily: 'Gabarito' }}>
                                    Criksy
                                </h1>
                            </div>

                            {/* Nav Links Centered */}
                            <div className='flex flex-row gap-[80px] text-emerald-50 text-lg'>
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


                <div className="flex flex-col items-center justify-start pt-4 px-2 min-h-screen">
                    <motion.h1
                        initial={{ opacity: 0, y: -30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        className="text-4xl font-extrabold text-[#0C3B2E] mb-5 text-center drop-shadow-lg"
                    >
                        Your Bookings
                    </motion.h1>

                    {/* Use optional chain operator */}
                    {
                        resData?.bookings?.length > 0 ? (
                            <>
                                {resData?.bookings?.map((item, index) => {
                                    const payment = resData?.payments?.[index];

                                    return (
                                        <div key={item._id}>
                                            <motion.div
                                                initial={{ opacity: 0, scale: 0.95 }}
                                                whileInView={{ opacity: 1, scale: 1 }}
                                                viewport={{ once: true }}
                                                transition={{ duration: 0.5, ease: "easeOut" }}
                                                className="w-full min-w-7xl md:min-w-2xl sm:min-w-lg bg-white/10 border mb-3 border-emerald-100 rounded-xl backdrop-blur-xl shadow-[0_8px_32px_0_rgba(16,185,129,0.5)] p-4"
                                            >
                                                <div className="flex flex-col lg:flex-row justify-between gap-4 min-w-full">
                                                    {/* Left Section */}
                                                    <section className="flex flex-col gap-2 text-white">
                                                        <div className="flex gap-2 text-xl">
                                                            <span className="font-semibold">📅 Date:</span>
                                                            <span className="text-emerald-100">
                                                                {new Date(item?.date).toLocaleDateString()}
                                                            </span>
                                                        </div>
                                                        <div className="flex gap-2 text-lg">
                                                            <span>Size:</span>
                                                            <span className="text-emerald-100">{item?.size}</span>
                                                        </div>
                                                        <div className="flex gap-2 text-lg">
                                                            <span>Duration:</span>
                                                            <span className="text-emerald-100">{item?.duration}</span>
                                                        </div>
                                                        <div className="flex gap-2 text-lg">
                                                            <span>Start Time:</span>
                                                            <span className="text-emerald-100">{to12HourFormat(item?.start_time)}</span>
                                                        </div>
                                                        <div className="flex gap-2 text-lg">
                                                            <span>End Time:</span>
                                                            <span className="text-emerald-100">{to12HourFormat(item?.end_time)}</span>
                                                        </div>
                                                    </section>

                                                    {/* Right Section */}
                                                    <section className="flex flex-col gap-2 text-white text-right lg:items-end">
                                                        <div className="flex gap-2 text-2xl font-semibold">
                                                            <span>🎟️ Ticket No:</span>
                                                            <span className="text-emerald-100">{item?.ticket_no}</span>
                                                        </div>
                                                        <div className="flex gap-2 text-lg">
                                                            <span>Price:</span>
                                                            <span className="text-emerald-100">{item?.price}</span>
                                                        </div>
                                                        <div className="flex gap-2 text-lg">
                                                            <span>Payment:</span>
                                                            <span className="text-emerald-100">{payment?.paymentMethode}</span>
                                                        </div>
                                                    </section>
                                                </div>
                                            </motion.div>
                                        </div>
                                    )
                                })}
                            </>
                        ) : (
                            <p>No bookings found</p>
                        )
                    }





                    {/* Booking Details - 2 */}
                    {/* <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                        className="w-full max-w-5xl bg-white/10 border border-emerald-100 rounded-xl backdrop-blur-xl shadow-[0_8px_32px_0_rgba(16,185,129,0.5)] p-4"
                    >
                        <div className="flex flex-col lg:flex-row justify-between gap-4">
                            {/* Left Section 
                            <section className="flex flex-col gap-2 text-white">
                                <div className="flex gap-2 text-xl">
                                    <span className="font-semibold">📅 Date:</span>
                                    <span className="text-emerald-100">20-06-2025</span>
                                </div>
                                <div className="flex gap-2 text-lg">
                                    <span>Size:</span>
                                    <span className="text-emerald-100">Large</span>
                                </div>
                                <div className="flex gap-2 text-lg">
                                    <span>Duration:</span>
                                    <span className="text-emerald-100">2 Hours</span>
                                </div>
                                <div className="flex gap-2 text-lg">
                                    <span>Start Time:</span>
                                    <span className="text-emerald-100">10:00 AM</span>
                                </div>
                                <div className="flex gap-2 text-lg">
                                    <span>End Time:</span>
                                    <span className="text-emerald-100">12:00 PM</span>
                                </div>
                            </section>

                            {/* Right Section 
                            <section className="flex flex-col gap-2 text-white text-right lg:items-end">
                                <div className="flex gap-2 text-2xl font-semibold">
                                    <span>🎟️ Ticket No:</span>
                                    <span className="text-emerald-100">123456789123</span>
                                </div>
                                <div className="flex gap-2 text-lg">
                                    <span>Price:</span>
                                    <span className="text-emerald-100">Rs. 900</span>
                                </div>
                                <div className="flex gap-2 text-lg">
                                    <span>Payment:</span>
                                    <span className="text-emerald-100">UPI</span>
                                </div>
                            </section>
                        </div>
                    </motion.div> */}

                </div>
            </section>
        </>
    )
}

export default ShowBookings