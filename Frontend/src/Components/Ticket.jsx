import React from 'react'

const Ticket = () => {
    return (
        <>
            <div className="flex flex-col items-center">
                <h1 className="text-4xl font-bold text-[#0C3B2E] mb-6">Your Ticket</h1>


                {/* Ticket 1*/}
                <div
                    className="w-[60%] h-[300px]  m-5 shadow-lg relative"
                    style={{
                        clipPath: 'polygon(20px 0, calc(100% - 20px) 0, 100% 20px, 100% calc(100% - 20px), calc(100% - 20px) 100%, 20px 100%, 0 calc(100% - 20px), 0 20px)',
                        backgroundImage: 'url("/Images/Blue2.jpeg")',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat',
                        zIndex: 1
                    }}

                >
                    <div>
                        <div className="line"></div>

                        <div className='flex flex-col gap-2 text-center top-[39%] right-0 absolute rotate-270'>
                            <h2 className='text-md font-semibold'
                                style={{ fontFamily: 'Roboto Mono, monospace' }}
                            >Ticket ID</h2>
                            <h1 className='text-2xl font-semibold font-mono tracking-widest text-[#ffffff]'
                                style={{ fontFamily: 'Roboto Mono, monospace' }}
                            >
                                536348974239
                            </h1>
                        </div>


                        <div className="relative w-full h-full">
                            <img src="/Images/Logo-R.png" alt="Logo" className="image" />
                            <div>

                            </div>
                        </div>
                        <div className='absolute flex justify-center text-center top-1/5 left-4/12 transform -translate-x-1/2 -translate-y-1/2'>
                            <div>
                                <h1 className='text-3xl font-bold text-[#ffffff]'>Time</h1>
                                <h2 className='text-lg'>2:00 pm - 4:00 pm</h2>
                            </div>
                        </div>
                        <div className='absolute flex justify-center text-center top-1/5 left-5/8 transform -translate-x-1/2 -translate-y-1/2'>
                            <div>
                                <h1 className='text-3xl font-bold text-[#ffffff]'>Date</h1>
                                <h2 className='text-lg'>17 - 06 - 2025  &nbsp; &nbsp; -  &nbsp; &nbsp; Monday</h2>
                            </div>
                        </div>
                        <div className='absolute flex justify-center text-center top-1/2 left-1/3 transform -translate-x-1/2 -translate-y-1/2'>
                            <div>
                                <h1 className='text-3xl font-bold text-[#ffffff]'>Box</h1>
                                <h2 className='text-lg'>#BX002 &nbsp; &nbsp; -  &nbsp; &nbsp; Small</h2>
                            </div>
                        </div>
                        <div className='absolute flex justify-center text-center top-1/2 left-5/8 transform -translate-x-1/2 -translate-y-1/2'>
                            <div className="bg-white/10 backdrop-blur-sm px-12 py-2 rounded-xl shadow-md border border-white/20">
                                <h1 className='text-2xl font-bold text-[#ffffff]'>Price</h1>
                                <h2 className='text-xl font-semibold text-[#FFD700] tracking-widest glow'>
                                    ₹ 500
                                </h2>
                            </div>
                        </div>


                        {/* Address */}
                        <div className='absolute flex justify-center text-start top-[88%]  left-4/11 transform -translate-x-1/2 -translate-y-1/2'>
                            <div>
                                <p className='font-mono text-[13px] text-[#ffffff]'
                                    style={{ fontFamily: 'Roboto Mono, monospace' }}
                                >
                                    14th Street, Criksy Box Cricket, Near Pilson Intersection,
                                    South Prickle Pine, Las Venturas, San Andreas - 1524207
                                </p>
                                <h3 className='m-1 ml-0 text-sm text-[#ffffff]'>Ph - 123 456 7890</h3>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Ticket 2 */}
                <div
                    className="w-[60%] h-[300px]  m-5 shadow-lg relative rotate-15"
                    style={{
                        clipPath: 'polygon(20px 0, calc(100% - 20px) 0, 100% 20px, 100% calc(100% - 20px), calc(100% - 20px) 100%, 20px 100%, 0 calc(100% - 20px), 0 20px)',
                        backgroundImage: 'url("/Images/Green4.jpeg")',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat',
                        position: 'relative',
                        transform: 'translateX(-5%) translateY(-25%)',
                        zIndex: -5,
                    }}

                >
                    <div>
                        <div class="line"></div>

                        <div className='flex flex-col gap-2 text-center top-[39%] right-0 absolute rotate-270'>
                            <h2 className='text-md font-semibold'
                                style={{ fontFamily: 'Roboto Mono, monospace' }}
                            >Ticket ID</h2>
                            <h1 className='text-2xl font-semibold font-mono tracking-widest text-[#ffffff]'
                                style={{ fontFamily: 'Roboto Mono, monospace' }}
                            >
                                684612645587
                            </h1>
                        </div>


                        <div className="relative w-full h-full">
                            <img src="/Images/Logo-R.png" alt="Logo" className="image" />
                            <div>

                            </div>
                        </div>
                        <div className='absolute flex justify-center text-center top-1/5 left-4/12 transform -translate-x-1/2 -translate-y-1/2'>
                            <div>
                                <h1 className='text-3xl font-bold text-[#ffffff]'>Time</h1>
                                <h2 className='text-lg'>9:00 pm - 11:00 pm</h2>
                            </div>
                        </div>
                        <div className='absolute flex justify-center text-center top-1/5 left-5/8 transform -translate-x-1/2 -translate-y-1/2'>
                            <div>
                                <h1 className='text-3xl font-bold text-[#ffffff]'>Date</h1>
                                <h2 className='text-lg'>10 - 06 - 2025  &nbsp; &nbsp; -  &nbsp; &nbsp; Tuesday</h2>
                            </div>
                        </div>
                        <div className='absolute flex justify-center text-center top-1/2 left-1/3 transform -translate-x-1/2 -translate-y-1/2'>
                            <div>
                                <h1 className='text-3xl font-bold text-[#ffffff]'>Box</h1>
                                <h2 className='text-lg'>#BX002 &nbsp; &nbsp; -  &nbsp; &nbsp; Small</h2>
                            </div>
                        </div>
                        <div className='absolute flex justify-center text-center top-1/2 left-5/8 transform -translate-x-1/2 -translate-y-1/2'>
                            <div className="bg-white/10 backdrop-blur-sm px-12 py-2 rounded-xl shadow-md border border-white/20">
                                <h1 className='text-2xl font-bold text-[#ffffff]'>Price</h1>
                                <h2 className='text-xl font-semibold text-[#FFD700] tracking-widest glow'>
                                    ₹ 1000
                                </h2>
                            </div>
                        </div>


                        {/* Address */}
                        <div className='absolute flex justify-center text-start top-[88%]  left-4/11 transform -translate-x-1/2 -translate-y-1/2'>
                            <div>
                                <p className='font-mono text-[13px] text-[#ffffff]'
                                    style={{ fontFamily: 'Roboto Mono, monospace' }}
                                >
                                    14th Street, Criksy Box Cricket, Near Pilson Intersection,
                                    South Prickle Pine, Las Venturas, San Andreas - 1524207
                                </p>
                                <h3 className='m-1 ml-0 text-sm text-[#ffffff]'>Ph - 123 456 7890</h3>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Ticket
