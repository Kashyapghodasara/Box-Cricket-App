import React from 'react'

const BX01 = () => {
    return (
        <>
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
            <div className="flex justify-center relative m-2 mt-4">
                <img
                    src="/Images/Green4.jpeg"
                    alt="Cricket Ground Image"
                    className="w-[95%] h-[630px] rounded-xl object-cover"
                />
            </div>
        </>
    )
}

export default BX01