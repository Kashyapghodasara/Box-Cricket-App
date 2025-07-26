import React from 'react'
import Avatar from 'react-avatar';
import { RiVisaLine } from "react-icons/ri";
import { FcSimCardChip } from "react-icons/fc";
import { BsCreditCard2Back } from "react-icons/bs";
import DotGrid from '../Animation/DotGrid.jsx';

const Dashboard = () => {
    return (
        <>
            <div className='w-[81%] h-screen mx-4 mt-1 rounded-2xl shadow-lg'>
                <section className='mt-6 flex justify-between'>
                    <div>
                        <h1 className='text-[#d7fff4] text-xl sm:text-3xl md:text-xl font-medium tracking-wide'>
                            Welcome,&nbsp;
                            <span
                                style={{ fontFamily: 'Bruno Ace, sans-serif' }}
                                className='text-2xl sm:text-4xl md:text-3xl font-extrabold text-[#d7fff4] drop-shadow-[0_1.5px_1px_rgba(215,255,244,0.2)]'
                            >
                                Kashyap
                            </span>
                        </h1>
                        <p className='text-[#a3b9b1] text-xs md:text-sm mt-1'>
                            Let’s get productive today. Everything you need is right here.
                        </p>
                    </div>

                    <div className='border border-[#2e2f2f] bg-[#1a1b1b] rounded-xl p-2 shadow-sm cursor-pointer hover:shadow-md hover:bg-[#2e2f2f] transition-all duration-300 w-fit'>
                        <div className='flex items-center gap-2'>
                            <Avatar
                                name='Kashyap'
                                src='../public/batman.png'
                                size='40'
                                round='10px'
                                className='shadow-md'
                            />
                            <div className='flex flex-col justify-center'>
                                <h1 className='text-[#d7fff4] text-md font-medium leading-tight tracking-wide'>
                                    Kashyap
                                </h1>
                                <p className='text-[#9db3ac] text-sm leading-snug font-light tracking-normal'>
                                    kashyappatel816@gmail.com
                                </p>
                            </div>
                        </div>
                    </div>


                </section>
                {/* My Card */}
                <nav className='flex gap-6 mt-3 justify-between'>

                    {/* Card Container */}
                    <div className='relative w-[65%] group overflow-hidden rounded-xl'>

                        {/* Animated Black & White Gradient Background */}
                        <div className="absolute inset-0 z-0 before:content-[''] before:absolute before:inset-[-100px] before:bg-gradient-to-br before:from-[#111] before:via-[#444] before:to-[#eee] before:opacity-70 before:rounded-[inherit] before:blur-2xl before:transition-transform before:duration-700 before:ease-out group-hover:before:scale-125 group-hover:before:translate-x-20 group-hover:before:translate-y-20" />

                        {/* Combined Card + Balance Content */}
                        <section className='relative z-10 border border-[#2e2f2f] bg-black/40 backdrop-blur-lg rounded-xl p-4 shadow-lg hover:shadow-white/20 transition-all duration-500 cursor-pointer'>

                            {/* Title Row */}
                            <div className='flex justify-between items-center mb-4 px-2'>
                                <h1 className='text-white text-2xl font-semibold'>My Card</h1>
                            </div>

                            {/* Card + Balance Info in Row */}
                            <div className='flex gap-4'>

                                {/* Credit Card Section */}
                                <div className='w-[60%] rounded-xl p-4 bg-black/30 backdrop-blur-sm'>
                                    {/* Header */}
                                    <div className='flex justify-between items-center mb-3'>
                                        <div className='flex items-center gap-3'>
                                            <BsCreditCard2Back className='text-2xl text-white' />
                                            <h2 className='text-white' style={{ fontFamily: 'Roboto Mono, monospace' }}>
                                                Credit Card
                                            </h2>
                                        </div>
                                        <RiVisaLine className='text-6xl text-white' />
                                    </div>

                                    {/* Card Number + Chip */}
                                    <div className='flex justify-between items-center mb-6'>
                                        <h3 className='text-white text-xl font-medium tracking-widest' style={{ fontFamily: 'Roboto Mono, monospace' }}>
                                            1234 5678 9101 1121
                                        </h3>
                                        <FcSimCardChip className='text-5xl' />
                                    </div>

                                    {/* Footer */}
                                    <div className='flex justify-between text-white text-sm px-1'>
                                        <span className='font-semibold'>Kashyap Patel</span>
                                        <span className='font-semibold'>07/24</span>
                                    </div>
                                </div>

                                {/* Balance Info (inside same card) */}
                                <div className='w-[40%] p-4 flex flex-col justify-center rounded-xl bg-black/30 backdrop-blur-sm'>
                                    <h2 className='text-white/80 text-lg font-semibold pb-2'>Balance Info</h2>
                                    <p className='text-4xl font-bold tracking-wider text-white' style={{ fontFamily: 'Roboto Mono, monospace' }}>$53,555 /-</p>
                                    <span className='text-sm text-white/60 pt-2'>Available Balance</span>
                                </div>
                            </div>

                        </section>
                    </div>

                    {/* Time & Calendar */}
                    <div className='w-[35%] flex items-center justify-center text-white text-lg font-medium'>
                        <h1>Time and Calendar</h1>
                    </div>
                </nav>



            </div>
        </>
    )
}

export default Dashboard