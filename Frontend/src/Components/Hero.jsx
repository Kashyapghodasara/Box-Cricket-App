import React from 'react'
import { Link } from 'react-router-dom';
import RotatingText from './Animation/RotatingText'
import useRegistration from '../Store/useRegistration';
import axios from "axios"
import toast from 'react-hot-toast';
import { USER_BACKEND_URL } from '../Constant';
import { useState } from "react";

const Hero = () => {

    const [showPopup, setShowPopup] = useState(false);
    const { isLoggedIn, login, logout, isSignedUp } = useRegistration();

    const SuccessToastStyle = {
        style: {
            background: "#212121",
            color: "#fff",
            fontSize: "17px",
            padding: "12px 20px",
            borderRadius: "10px",
            width: "100%",
            fontWeight: "300",
            textAlign: "center",
        },
        iconTheme: {
            primary: "#39bf04",
            secondary: "#1f2937",
        },
        duration: 4000,
    }

    const ErrorToastStyle = {
        style: {
            background: "#212121",
            color: "#fff",
            fontSize: "17px",
            padding: "12px 20px",
            borderRadius: "10px",
            width: "100%",
            fontWeight: "300",
            textAlign: "center",
        },
        iconTheme: {
            primary: "#eb1410",
            secondary: "#1f2937",
        },
        duration: 4000,
    }

    const logoutHandler = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                `${USER_BACKEND_URL}/logout`,
                {},
                { withCredentials: true }
            );

            if (response.data.success) {
                logout();
                toast.success(response.data.message, SuccessToastStyle);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Logout failed", ErrorToastStyle);
        }
    };

    const scrollToSection = (id) => {
        const section = document.getElementById(id);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <>
            {/* Navbar Section */}
            <section id='Home'>
                <div className='flex justify-center m-2'>
                    <div className='relative w-[95%] md:w-[90%] rounded-full p-2'>
                        <nav className='flex items-center justify-between w-full'>

                            {/* Logo */}
                            <div>
                                <h1
                                    className='text-3xl md:text-4xl font-bold text-[#0C3B2E] cursor-pointer'
                                    style={{ fontFamily: 'Gabarito' }}
                                >
                                    Criksy
                                </h1>
                            </div>

                            {/* Nav Links (Hidden on small screens) */}
                            <div className='hidden md:flex gap-[80px] text-[#0C3B2E] text-lg'>
                                <Link to="/"><button>Home</button></Link>
                                <button onClick={() => scrollToSection('Slote')}>Slote</button>
                                <Link to="/showBookings"><button>Bookings</button></Link>
                                <button onClick={() => scrollToSection('Contact')}>Contact</button>
                            </div>

                            {/* Auth Buttons */}
                            {isLoggedIn && (
                                <button
                                    onClick={logoutHandler}
                                    className='bg-[#f92500] hover:bg-[#ce290c] px-4 md:px-5 py-2 rounded-full'
                                >
                                    Logout
                                </button>
                            )}

                            {!isLoggedIn && isSignedUp && (
                                <Link to="/registration">
                                    <button className="bg-[#ffc53c] hover:bg-[#FFB70F] px-4 md:px-5 py-2 rounded-full">
                                        Login
                                    </button>
                                </Link>
                            )}

                            {!isLoggedIn && !isSignedUp && (
                                <div className="flex gap-2 md:gap-4">
                                    <Link to="/registration">
                                        <button className="bg-[#ffc53c] hover:bg-[#FFB70F] px-4 md:px-5 py-2 rounded-full">
                                            Signup
                                        </button>
                                    </Link>
                                    <Link to="/registration">
                                        <button className="bg-[#ffc53c] hover:bg-[#FFB70F] px-4 md:px-5 py-2 rounded-full">
                                            Login
                                        </button>
                                    </Link>
                                </div>
                            )}
                        </nav>
                    </div>
                </div>

                {/* Image Section */}
                <div className="flex justify-center relative m-2 mt-4">
                    <img
                        src="/Images/Fog.jpeg"
                        alt="Cricket Ground"
                        className="w-[95%] h-[350px] sm:h-[450px] md:h-[630px] rounded-xl object-cover"
                    />

                    <div className="absolute top-1/2 md:top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center w-[90%] md:w-[70%]">
                        <div className="flex flex-wrap justify-center items-center gap-2 sm:gap-4">
                            <h1 className="text-xl sm:text-2xl md:text-5xl font-bold text-[#0C3B2E]">
                                No Jersey, But
                            </h1>

                            <RotatingText
                                texts={['Your Game', 'Your Rule', 'Your Ground']}
                                mainClassName="px-3 bg-cyan-300 text-black py-1 rounded-lg text-lg sm:text-2xl md:text-5xl font-semibold"
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

                        <p className='mt-4 sm:mt-6 md:mt-8 text-[#151111] font-semibold text-sm sm:text-base md:text-lg'>
                            Our app helps you easily book box cricket grounds for your matches.
                            Check available slots, reserve your ground in seconds, and manage
                            your bookings all in one place.
                        </p>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Hero
