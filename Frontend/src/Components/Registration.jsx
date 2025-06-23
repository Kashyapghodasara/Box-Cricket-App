import React from 'react'
import { Link } from 'react-router-dom';
import { FaRegUser } from "react-icons/fa";
import { LuUserCheck } from "react-icons/lu";
import { MdAlternateEmail } from "react-icons/md";
import { TbLockPassword } from "react-icons/tb";
import { MdOutlinePassword } from "react-icons/md";


const Registration = () => {

    const [selectedBox, setSelectedBox] = React.useState(null);
    const [isLoggedIn, setIsLoggedIn] = React.useState(false);

    const User = ["Signup", "Login", "Admin"]

    return (
        <>
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

            <div className='w-full min-h-screen'>
                <div className='bg-[#] flex flex-col items-center justify-center '>
                    <div className='m-5 mt-8'>
                        <h1 className='text-4xl font-bold text-[#0C3B2E] cursor-pointer'
                            style={{ fontFamily: 'Gabarito' }}>
                            Registration
                        </h1>
                    </div>

                    <h1 className='text-lg text-zinc-900 font-semibold  mt-8'>Choose Your Option</h1>
                    <div className='grid grid-cols-3 md:grid-cols-3 sm:grid-cols-1 gap-4 m-5'>

                        {User.map((Login, id) => (
                            <div key={id}>
                                <label className="relative cursor-pointer group transition-transform duration-300">
                                    <input
                                        type="checkbox"
                                        className="sr-only peer"
                                        checked={selectedBox === Login}
                                        onChange={(e) => { setSelectedBox(e.target.checked ? Login : null) }}
                                    />

                                    {/* Box Design */}
                                    <span
                                        className="flex flex-col items-center justify-center w-48 min-h-22 rounded-2xl border-2 border-gray-300 
      bg-gradient-to-br from-white via-white to-gray-50 text-gray-800 font-semibold shadow-lg 
      transition-all duration-300 ease-in-out text-2xl 
      peer-checked:border-[#0C3B2E] peer-checked:text-[#0C3B2E]
      peer-checked:shadow-[0_0_15px_4px_rgba(12,59,46,0.4)] 
      hover:border-[#0C3B2E] hover:shadow-[0_0_12px_3px_rgba(12,59,46,0.3)]"
                                    >
                                        {Login}
                                    </span>

                                    {/* Glowing Checkmark */}
                                    <span
                                        className="absolute top-2 left-2 w-6 h-6 rounded-full border-2 border-gray-300 bg-white opacity-0 scale-0 
      peer-checked:scale-100 peer-checked:opacity-100 peer-checked:bg-[#0C3B2E] peer-checked:border-[#0C3B2E] 
      flex items-center justify-center text-white text-sm font-bold
      transition-all duration-300 ease-in-out shadow-[0_0_8px_3px_rgba(12,59,46,0.5)]"
                                    >
                                        ✓
                                    </span>
                                </label>
                            </div>
                        ))}
                    </div>

                    {selectedBox === "Signup" && (
                        <>
                            <form className='relative w-full flex flex-col items-center'>
                                <div className="relative w-full max-w-md m-2 mt-10">
                                    <input
                                        type="text"
                                        placeholder="Enter your Name"
                                        className="peer w-full pl-12 pr-4 py-3 text-lg text-zinc-900 border-2 border-gray-900 rounded-xl outline-none 
                                         transition-all duration-300 focus:border-[#0C3B2E] focus:ring-1 focus:ring-[#0C3B2E] shadow-sm placeholder-gray-800"
                                    />
                                    <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#000000] peer-focus:text-[#0C3B2E] transition-all duration-300">
                                        <FaRegUser className="w-5 h-5" />
                                    </span>
                                </div>

                                <div className="relative w-full max-w-md m-2">
                                    <input
                                        type="text"
                                        placeholder="Enter your Username"
                                     className="peer w-full pl-12 pr-4 py-3 text-lg text-zinc-900 border-2 border-gray-900 rounded-xl outline-none 
                                         transition-all duration-300 focus:border-[#0C3B2E] focus:ring-1 focus:ring-[#0C3B2E] shadow-sm placeholder-gray-800"
                                    />
                                    <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#000000] peer-focus:text-[#0C3B2E] transition-all duration-300">
                                        <LuUserCheck className="w-5 h-5" />
                                    </span>
                                </div>

                                <div className="relative w-full max-w-md m-2">
                                    <input
                                        type="email"
                                        placeholder="Enter your @Email"
                                         className="peer w-full pl-12 pr-4 py-3 text-lg text-zinc-900 border-2 border-gray-900 rounded-xl outline-none 
                                         transition-all duration-300 focus:border-[#0C3B2E] focus:ring-1 focus:ring-[#0C3B2E] shadow-sm placeholder-gray-800"
                                    />
                                    <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#000000] peer-focus:text-[#0C3B2E] transition-all duration-300">
                                        <MdAlternateEmail className="w-5 h-5" />
                                    </span>
                                </div>

                                <div className="relative w-full max-w-md m-2">
                                    <input
                                        type="password"
                                        placeholder="Enter your Password"
                                        className="peer w-full pl-12 pr-4 py-3 text-lg text-zinc-900 border-2 border-gray-900 rounded-xl outline-none 
                                         transition-all duration-300 focus:border-[#0C3B2E] focus:ring-1 focus:ring-[#0C3B2E] shadow-sm placeholder-gray-800"
                                    />
                                    <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#000000] peer-focus:text-[#0C3B2E] transition-all duration-300">
                                        <TbLockPassword className="w-5 h-5" />
                                    </span>
                                </div>

                                <div>
                                    <button
                                        type="submit"
                                        className="w-full px-10 mt-8 py-3 bg-[#0C3B2E] text-white font-semibold text-lg rounded-xl 
               hover:bg-[#0f4c3a] transition-all duration-300 shadow-md cursor-pointer
               hover:shadow-[0_0_12px_2px_rgba(12,59,46,0.5)] focus:outline-none focus:ring-2 focus:ring-[#0C3B2E]"
                                    >
                                        Signup
                                    </button>
                                </div>
                            </form>
                        </>
                    )}

                    {selectedBox === "Login" && (
                        <>
                            <form className='relative w-full flex flex-col items-center'>
                                <div className="relative w-full max-w-md m-2 mt-10">
                                    <input
                                        type="text"
                                        placeholder="Enter your Username"
                                        className="peer w-full pl-12 pr-4 py-3 text-lg text-zinc-900 border-2 border-gray-900 rounded-xl outline-none 
                                         transition-all duration-300 focus:border-[#0C3B2E] focus:ring-1 focus:ring-[#0C3B2E] shadow-sm placeholder-gray-800"
                                    />
                                    <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#000000] peer-focus:text-[#0C3B2E] transition-all duration-300">
                                        <LuUserCheck className="w-5 h-5" />
                                    </span>
                                </div>

                                <div className="relative w-full max-w-md m-2">
                                    <input
                                        type="email"
                                        placeholder="Enter your Email"
                                        className="peer w-full pl-12 pr-4 py-3 text-lg text-zinc-900 border-2 border-gray-900 rounded-xl outline-none 
                                         transition-all duration-300 focus:border-[#0C3B2E] focus:ring-1 focus:ring-[#0C3B2E] shadow-sm placeholder-gray-800"
                                    />
                                    <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#000000] peer-focus:text-[#0C3B2E] transition-all duration-300">
                                        <MdAlternateEmail className="w-5 h-5" />
                                    </span>
                                </div>

                                <div className="relative w-full max-w-md m-2">
                                    <input
                                        type="password"
                                        placeholder="Enter your Password"
                                        className="peer w-full pl-12 pr-4 py-3 text-lg text-zinc-900 border-2 border-gray-900 rounded-xl outline-none 
                                         transition-all duration-300 focus:border-[#0C3B2E] focus:ring-1 focus:ring-[#0C3B2E] shadow-sm placeholder-gray-800"
                                    />
                                    <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#000000] peer-focus:text-[#0C3B2E] transition-all duration-300">
                                        <TbLockPassword className="w-5 h-5" />
                                    </span>
                                </div>

                                <div>
                                    <button
                                        type="submit"
                                        className="w-full px-10 mt-8 py-3 bg-[#0C3B2E] text-white font-semibold text-lg rounded-xl 
               hover:bg-[#0f4c3a] transition-all duration-300 shadow-md cursor-pointer 
               hover:shadow-[0_0_12px_2px_rgba(12,59,46,0.5)] focus:outline-none focus:ring-2 focus:ring-[#0C3B2E]"
                                    >
                                        Login
                                    </button>
                                </div>
                            </form>
                        </>
                    )}

                    {selectedBox === "Admin" && (
                        <>
                            <form className='relative w-full flex flex-col items-center m-3'>
                                <div className="relative w-full max-w-md m-2 mt-10">
                                    <input
                                        type="text"
                                        placeholder="Enter your Name"
                                        className="peer w-full pl-12 pr-4 py-3 text-lg text-zinc-900 border-2 border-gray-900 rounded-xl outline-none 
                                         transition-all duration-300 focus:border-[#0C3B2E] focus:ring-1 focus:ring-[#0C3B2E] shadow-sm placeholder-gray-800"
                                    />
                                    <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#000000] peer-focus:text-[#0C3B2E] transition-all duration-300">
                                        <FaRegUser className="w-5 h-5" />
                                    </span>
                                </div>

                                <div className="relative w-full max-w-md m-2">
                                    <input
                                        type="text"
                                        placeholder="Enter your Username"
                                        className="peer w-full pl-12 pr-4 py-3 text-lg text-zinc-900 border-2 border-gray-900 rounded-xl outline-none 
                                         transition-all duration-300 focus:border-[#0C3B2E] focus:ring-1 focus:ring-[#0C3B2E] shadow-sm placeholder-gray-800"
                                    />
                                    <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#000000] peer-focus:text-[#0C3B2E] transition-all duration-300">
                                        <LuUserCheck className="w-5 h-5" />
                                    </span>
                                </div>

                                <div className="relative w-full max-w-md m-2">
                                    <input
                                        type="email"
                                        placeholder="Enter your Email"
                                       className="peer w-full pl-12 pr-4 py-3 text-lg text-zinc-900 border-2 border-gray-900 rounded-xl outline-none 
                                         transition-all duration-300 focus:border-[#0C3B2E] focus:ring-1 focus:ring-[#0C3B2E] shadow-sm placeholder-gray-800"
                                    />
                                    <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#000000] peer-focus:text-[#0C3B2E] transition-all duration-300">
                                        <MdAlternateEmail className="w-5 h-5" />
                                    </span>
                                </div>

                                <div className="relative w-full max-w-md m-2">
                                    <input
                                        type="password"
                                        placeholder="Enter your Password"
                                         className="peer w-full pl-12 pr-4 py-3 text-lg text-zinc-900 border-2 border-gray-900 rounded-xl outline-none 
                                         transition-all duration-300 focus:border-[#0C3B2E] focus:ring-1 focus:ring-[#0C3B2E] shadow-sm placeholder-gray-800"
                                    />
                                    <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#000000] peer-focus:text-[#0C3B2E] transition-all duration-300">
                                        <TbLockPassword className="w-5 h-5" />
                                    </span>
                                </div>

                                 <div className="relative w-full max-w-md m-2">
                                    <input
                                        type="text"
                                        placeholder="Enter Secret String"
                                         className="peer w-full pl-12 pr-4 py-3 text-lg text-zinc-900 border-2 border-gray-900 rounded-xl outline-none 
                                         transition-all duration-300 focus:border-[#0C3B2E] focus:ring-1 focus:ring-[#0C3B2E] shadow-sm placeholder-gray-800"
                                    />
                                    <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#000000] peer-focus:text-[#0C3B2E] transition-all duration-300">
                                        <MdOutlinePassword className="w-5 h-5" />
                                    </span>
                                </div>

                                <div>
                                    <button
                                        type="submit"
                                        className="w-full px-10 mt-8 py-3 bg-[#ffb804] text-zinc-900 font-semibold text-lg rounded-xl 
                                        hover:bg-[#ff9f04] transition-all duration-300 shadow-md cursor-pointer
                                        hover:shadow-[0_0_12px_2px_rgba(12,59,46,0.5)] focus:outline-none focus:ring-2 focus:ring-[#ff4a4a]"
                                    >
                                        Admin
                                    </button>
                                </div>
                            </form>
                        </>
                    )}
                </div>
            </div>
        </>
    )
}

export default Registration