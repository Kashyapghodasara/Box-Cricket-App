import React from 'react'
import RotatingText from './Animation/RotatingText'

const Hero = () => {
    return (
        <>
            {/* Navbar Section*/}
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

        </>
    )
}

export default Hero