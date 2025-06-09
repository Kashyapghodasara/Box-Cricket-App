import React from 'react'

const Ticket = () => {
    return (
        <>
            <div className="flex flex-col items-center">
                <h1 className="text-4xl font-bold text-[#0C3B2E] mb-6">Your Ticket</h1>

                <div
                    className="w-[60%] h-[300px]  m-5 shadow-lg relative"
                    style={{
                        clipPath: 'polygon(20px 0, calc(100% - 20px) 0, 100% 20px, 100% calc(100% - 20px), calc(100% - 20px) 100%, 20px 100%, 0 calc(100% - 20px), 0 20px)',
                        backgroundImage: 'url("/Images/Blue2.jpeg")',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat',
                    }}

                >
                    <div>
                        <div class="line"></div>
                        <div className="relative w-full h-full">
                            <img src="/Images/Logo-R.png" alt="Logo" className="image" />
                            <div>
                                
                            </div>
                        </div>
                        <div className='absolute flex justify-center text-center top-1/5 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
                            <div>
                                <h1 className='text-3xl font-bold text-[#ffffff]'>Time</h1>
                                <h2 className='text-lg'>2:00 pm - 4:00 pm</h2>
                            </div>
                        </div>
                        <div className='absolute flex justify-center text-center top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
                            <div>
                                <h1 className='text-3xl font-bold text-[#ffffff]'>Date</h1>
                                <h2 className='text-lg'>17 - 06 - 2025  &nbsp; &nbsp; -  &nbsp; &nbsp; Monday</h2>
                            </div>
                        </div>
                        <div className='absolute flex justify-center text-center top-10/12 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
                            <div>
                                <h1 className='text-3xl font-bold text-[#ffffff]'>Box</h1>
                                <h2 className='text-lg'>#BX002 &nbsp; &nbsp; -  &nbsp; &nbsp; Small</h2>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Ticket
