import React from 'react'
import { Link } from 'react-router-dom';
import RotatingText from './Animation/RotatingText'
import useRegistration from '../Store/useRegistration';
import axios from "axios"
import toast from 'react-hot-toast';
import { USER_BACKEND_URL } from '../Constant';
import { useEffect, useRef, useState } from "react";

const Hero = () => {

    const [showPopup, setShowPopup] = useState(false);

    const openPopup = () => {
        setShowPopup(true);
        setTimeout(() => setShowPopup(false), 5000); // hide after 5s
    };

    const { isLoggedIn, login, logout, isSignedUp } = useRegistration();
    const modalRef = useRef();

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

    const scrollToSection = (id) => {
        const section = document.getElementById(id);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const openModal = () => {
        const modal = modalRef.current;
        if (modal) {
            modal.showModal();

            // Disable closing on outside click and ESC
            modal.addEventListener("cancel", (e) => e.preventDefault());
            modal.addEventListener("click", (e) => e.stopPropagation());

            // Auto close after 3s
            setTimeout(() => {
                modal.close();
            }, 5000);
        }
    };

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

                            <button
                                onClick={openPopup}
                                className="px-6 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white text-lg font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition"
                            >
                                Proceed to Pay
                            </button>

                            {/* Popup */}
                            {showPopup && (
                                <div className="fixed inset-0 flex justify-center items-center bg-black/30 z-50">
                                    <div
                                        className="bg-white rounded-3xl p-6 md:p-8 shadow-2xl max-w-sm w-full transform scale-90 opacity-0 animate-popup"
                                        onClick={(e) => e.stopPropagation()}
                                    >
                                        <div className="text-center">
                                            <div className="text-4xl mb-3 animate-spin-slow">
                                                💳
                                            </div>
                                            <h3 className="text-xl font-bold text-gray-800">
                                                Processing Payment…
                                            </h3>
                                            <p className="text-gray-600 mt-2">
                                                Please wait while we process your payment.
                                            </p>

                                            <div className="mt-4 space-y-2">
                                                <div className="h-3 bg-gray-200 rounded-full w-full animate-pulse"></div>
                                                <div className="h-3 bg-gray-200 rounded-full w-3/4 animate-pulse"></div>
                                                <div className="h-3 bg-gray-200 rounded-full w-1/2 animate-pulse"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                            {/* Animations */}
                            <style>{`
                                .animate-popup {
                                 animation: popup-in 0.4s ease forwards;
                                }
                                @keyframes popup-in {
                                0% { transform: scale(0.8); opacity: 0; }
                                100% { transform: scale(1); opacity: 1; }
                                        }
                                .animate-spin-slow {
                                animation: spin 2s linear infinite;
                               }
                            `}</style>
                        </nav>
                    </div>
                </div>

                {/* Image Section */}
                <div className="flex justify-center relative m-2 mt-4">
                    <img
                        src="/Images/Fog.jpeg"
                        alt="Cricket Ground Image"
                        className="w-[95%] h-[630px] rounded-xl"
                    />
                    <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
                        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4">
                            <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold text-[#0C3B2E]">
                                No Jersey, But
                            </h1>
                            <RotatingText
                                texts={['Your Game', 'Your Rule', 'Your Ground']}
                                mainClassName="px-3 bg-cyan-300 text-black overflow-hidden py-1 rounded-lg text-xl sm:text-3xl md:text-5xl font-semibold inline-flex"
                                staggerFrom="last"
                                initial={{ y: "100%" }}
                                animate={{ y: 0 }}
                                exit={{ y: "-120%" }}
                                staggerDuration={0.025}
                                splitLevelClassName="overflow-hidden pb-1"
                                transition={{ type: "spring", damping: 30, stiffness: 400 }}
                                rotationInterval={3000}
                            />
                        </div>
                        <p className='mt-8 text-[#151111] font-semibold text-lg'>Our app helps you easily book box cricket grounds for your matches. Check available slots, reserve your ground in seconds, and manage your bookings all in one place. Perfect for players and organizers who want hassle-free cricket game planning.</p>
                    </div>

                </div>
            </section>
        </>
    )
}

export default Hero