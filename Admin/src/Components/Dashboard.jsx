import React from 'react';
import Avatar from 'react-avatar';
import { RiVisaLine } from "react-icons/ri";
import { FcSimCardChip } from "react-icons/fc";
import { BsCreditCard2Back } from "react-icons/bs";
import { FaRegCircleCheck } from "react-icons/fa6";

const Dashboard = () => {
    return (
        <div className='w-[81%] h-screen mx-4 mt-1 rounded-2xl shadow-lg'>

            {/* Header Section: Avatar + Card Section */}
            <section className='mt-6 flex justify-between gap-8'>

                {/* Card Section */}
                <div className='relative w-[75%] group overflow-hidden rounded-xl'>

                    {/* Animated Gradient Background */}
                    <div className="absolute inset-0 z-0 before:content-[''] before:absolute before:inset-[-100px] before:bg-gradient-to-br before:from-[#111] before:via-[#444] before:to-[#eee] before:opacity-70 before:rounded-[inherit] before:blur-2xl before:transition-transform before:duration-700 before:ease-out group-hover:before:scale-125 group-hover:before:translate-x-20 group-hover:before:translate-y-20" />

                    {/* Card & Balance Section */}
                    <section className='relative z-10 border border-[#2e2f2f] bg-black/40 backdrop-blur-lg rounded-xl p-4 shadow-lg hover:shadow-white/20 transition-all duration-500 cursor-pointer'>

                        {/* Title */}
                        <div className='flex justify-between items-center mb-4 px-2'>
                            <h1 className='text-white text-2xl font-semibold'>My Card</h1>
                        </div>

                        {/* Card Body */}
                        <div className='flex gap-4'>

                            {/* Credit Card */}
                            <div className='w-[60%] rounded-xl p-4 bg-black/30 backdrop-blur-sm'>
                                <div className='flex justify-between items-center mb-3'>
                                    <div className='flex items-center gap-3'>
                                        <BsCreditCard2Back className='text-2xl text-white' />
                                        <h2 className='text-white font-mono'>Credit Card</h2>
                                    </div>
                                    <RiVisaLine className='text-6xl text-white' />
                                </div>
                                <div className='flex justify-between items-center mb-6'>
                                    <h3 className='text-white text-xl font-medium tracking-widest font-[DuneRiseFont]'>
                                        1234 5678 9101 1121
                                    </h3>
                                    <FcSimCardChip className='text-5xl' />
                                </div>
                                <div className='flex justify-between text-white text-sm px-1'>
                                    <span className='font-semibold'>Kashyap Patel</span>
                                    <span className='font-semibold'>07/24</span>
                                </div>
                            </div>

                            {/* Balance Info */}
                            <div className='w-[40%] p-4 pr-0 flex flex-col justify-center rounded-xl'>
                                <h2 className='text-white/80 text-md font-semibold pb-2'>Balance Info</h2>
                                <p className='text-4xl font-bold tracking-wider text-white font-mono'>
                                    ₹53,555 /-
                                </p>
                                <span className='text-sm text-white/60 pt-2'>Available Balance</span>
                            </div>

                            <div className='w-[18%] p-4 flex flex-col justify-between items-center bg-black/30 backdrop-blur-sm rounded-xl relative'>
                                {/* Top Heading */}
                                <h2 className="relative text-white/80 text-md font-semibold after:absolute after:left-1/2 after:bottom-0 after:w-0 after:h-[2px] after:bg-white after:transition-all after:duration-300 hover:after:w-full hover:after:left-0">
                                    Received
                                </h2>


                                {/* Bottom Icon */}
                                <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2">
                                    <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
                                        <FaRegCircleCheck className="text-black text-lg" />
                                    </div>
                                </div>

                            </div>

                        </div>
                    </section>
                </div>

                {/* Avatar + DateTime (Right side) */}
                <div className='flex flex-col items-end gap-3'>

                    {/* Avatar Block */}
                    <div className='border border-[#2e2f2f] bg-[#1a1b1b] rounded-xl p-3 shadow-sm cursor-pointer hover:shadow-md hover:bg-[#2e2f2f] transition-all duration-300 w-fit'>
                        <div className='flex items-center gap-3'>
                            <Avatar
                                name='Kashyap'
                                src='../public/batman.png'
                                size='40'
                                round='10px'
                                className='shadow-md'
                            />
                            <div className='flex flex-col justify-center'>
                                <h1 className='text-[#d7fff4] text-md font-medium tracking-wide'>Kashyap</h1>
                                <p className='text-[#9db3ac] text-sm font-light'>kashyappatel816@gmail.com</p>
                            </div>
                        </div>
                    </div>

                    {/* Date & Time Widget */}
                    <div className="w-fit h-fit px-4 py-2 text-white text-right">
                        <div className="uppercase text-sm text-gray-400 tracking-wider mb-1">
                            Today &ndash; {new Date().toLocaleString('en-US', { weekday: 'long' })}
                        </div>
                        <div className="text-2xl sm:text-3xl font-bold tracking-wide leading-snug">
                            {new Date().getDate()}<sup className="text-base font-medium">th</sup> &nbsp;
                            {new Date().toLocaleDateString('en-US', { month: 'long' })}&nbsp;
                            {new Date().getFullYear()}
                        </div>
                        <div className="text-xl sm:text-2xl font-semibold tracking-widest mt-1 text-gray-300">
                            {new Date().toLocaleTimeString('en-US', {
                                hour: '2-digit',
                                minute: '2-digit',
                                hour12: true,
                            }).replace(':', ' : ')}
                        </div>
                    </div>

                </div>

            </section>
        </div>
    );
};

export default Dashboard;
