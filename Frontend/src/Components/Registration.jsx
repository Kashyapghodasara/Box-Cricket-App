import React from 'react'

const Registration = () => {

    const [selectedBox, setSelectedBox] = React.useState(null);
    const User = ["Signup", "Login", "Admin"]

    return (
        <div className='bg-[#1c1c1c] w-full min-h-screen'>
            <div className='bg-[#1c1c1c] flex flex-col items-center justify-center'>
                <div className='m-5'>
                    <h1 className='text-4xl font-bold text-[#0C3B2E] cursor-pointer'
                        style={{ fontFamily: 'Gabarito' }}>
                        Registration
                    </h1>
                </div>

                <h1 className='text-lg font-semibold  mt-15'>Choose Your Option</h1>
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
                                    className="w-full pl-12 pr-4 py-3 text-lg text-white bg-[#1c1c1c] border-2 border-gray-600 rounded-xl outline-none 
                                transition-all duration-300 focus:border-[#0C3B2E] focus:ring-1 focus:ring-[#0C3B2E] shadow-sm
                              placeholder-gray-400"
                                />
                                <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#0C3B2E]">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                    </svg>
                                </span>
                            </div>

                            <div className="relative w-full max-w-md m-2">
                                <input
                                    type="text"
                                    placeholder="Enter your Username"
                                    className="w-full pl-12 pr-4 py-3 text-lg text-white bg-[#1c1c1c] border-2 border-gray-600 rounded-xl outline-none 
                                transition-all duration-300 focus:border-[#0C3B2E] focus:ring-1 focus:ring-[#0C3B2E] shadow-sm
                              placeholder-gray-400"
                                />
                                <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#0C3B2E]">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                    </svg>
                                </span>
                            </div>

                            <div className="relative w-full max-w-md m-2">
                                <input
                                    type="email"
                                    placeholder="Enter your @Email"
                                    className="w-full pl-12 pr-4 py-3 text-lg text-white bg-[#1c1c1c] border-2 border-gray-600 rounded-xl outline-none 
               transition-all duration-300 focus:border-[#0C3B2E] focus:ring-1 focus:ring-[#0C3B2E] shadow-sm
               placeholder-gray-400"
                                />
                                <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#0C3B2E]">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                    </svg>
                                </span>
                            </div>

                            <div className="relative w-full max-w-md m-2">
                                <input
                                    type="password"
                                    placeholder="Enter your Password"
                                    className="w-full pl-12 pr-4 py-3 text-lg text-white bg-[#1c1c1c] border-2 border-gray-600 rounded-xl outline-none 
               transition-all duration-300 focus:border-[#0C3B2E] focus:ring-1 focus:ring-[#0C3B2E] shadow-sm
               placeholder-gray-400"
                                />
                                <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#0C3B2E]">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                    </svg>
                                </span>
                            </div>

                            <div>
                                <button
                                    type="submit"
                                    className="w-full px-10 mt-8 py-3 bg-[#0C3B2E] text-white font-semibold text-lg rounded-xl 
               hover:bg-[#0f4c3a] transition-all duration-300 shadow-md 
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
                    </>
                )}

                {selectedBox === "Admin" && (
                    <>
                    </>
                )}
            </div>
        </div>
    )
}

export default Registration