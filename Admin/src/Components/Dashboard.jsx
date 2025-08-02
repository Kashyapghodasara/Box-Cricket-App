import React, { useState, useEffect } from 'react';
import { FcSimCardChip } from "react-icons/fc";
import { SiVisa } from "react-icons/si";
import { BsCreditCard2Back } from "react-icons/bs";
import MonthChart from './MonthChart.jsx';
import BoxStatGraph from './BoxStatGraph.jsx';
import PaymentStatGraph from './PaymentStatGraph.jsx';

import {
  Bookmark,
  BadgeDollarSign,
  CheckCircle2,
} from 'lucide-react';

const GlassIcon = ({ icon: Icon, color }) => (
  <div className={`w-8 h-8 rounded-lg bg-${color}-500/20 backdrop-blur-sm border border-white/10 flex items-center justify-center`}>
    <Icon className={`text-${color}-400`} size={18} />
  </div>
);

const getOrdinalSuffix = (day) => {
  if (day > 3 && day < 21) return 'th';
  switch (day % 10) {
    case 1: return 'st';
    case 2: return 'nd';
    case 3: return 'rd';
    default: return 'th';
  }
};

const Dashboard = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timerId = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timerId);
  }, []);

  const today = new Date();
  const day = today.getDate();
  const month = today.toLocaleString('en-US', { month: 'long' });
  const year = today.getFullYear();
  const weekday = today.toLocaleString('en-US', { weekday: 'long' });

  return (
    <div className='w-full h-full p-4 md:p-6 overflow-y-auto bg-[#0c0c0c]'>
      {/* ====== Header Section ====== */}
      <header className='flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6'>
        {/* User Info */}
        <div className='flex items-center gap-4 p-2 rounded-lg hover:bg-zinc-900 transition-colors duration-200 cursor-pointer'>
          <img
            src="../public/batman.png"
            alt="User Avatar"
            onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/48x48/7e22ce/ffffff?text=K'; }}
            className='w-12 h-12 rounded-full border-2 border-purple-500 object-cover'
          />
          <div>
            <h1 className='text-xl font-bold text-white'>Kashyap Patel</h1>
            <p className='text-sm text-gray-400'>kashyappatel816@gmail.com</p>
          </div>
        </div>

        {/* Date & Time */}
        <div className="text-right">
          <div className="text-lg font-semibold text-white tracking-wide">
            {`${weekday}, ${day}`}<sup className="text-xs font-medium">{getOrdinalSuffix(day)}</sup>{` ${month} ${year}`}
          </div>
          <div className="text-md font-mono text-gray-300 mt-1">
            {time.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true })}
          </div>
        </div>
      </header>

      {/* ====== Main Grid ====== */}
      <main className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* ===== Left Column ===== */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          {/* My Card Section */}
          <section className='relative group overflow-hidden rounded-2xl'>
            <div className="absolute inset-0 z-0 bg-gradient-to-br from-gray-900 via-black to-gray-800" />
            <div className="absolute -inset-full top-0 z-0 block h-full w-1/2 -skew-x-12 transform bg-gradient-to-r from-transparent to-white/20 opacity-40 group-hover:animate-shine" />

            <div className='relative z-10 border border-white/10 bg-black/40 backdrop-blur-lg rounded-2xl p-4 md:p-6 shadow-lg'>
              <div className='flex justify-between items-center mb-4'>
                <h2 className='text-white text-xl font-semibold'>My Card</h2>
              </div>

              <div className='flex flex-col md:flex-row gap-4 md:gap-6'>
                {/* Card Visual */}
                <div className='w-full md:w-3/5 rounded-xl p-4 bg-black/50 backdrop-blur-sm border border-white/10 flex flex-col justify-between bg-gradient-to-br from-purple-900/50 to-indigo-900/50'>
                  <div className='flex justify-between items-center mb-3'>
                    <BsCreditCard2Back className='text-gray-100 h-7 w-7' />
                    <SiVisa className='text-gray-100 h-12 w-12' />
                  </div>
                  <div>
                    <h3 className='text-white text-xl md:text-2xl font-mono tracking-widest mb-4'>
                      1234 5678 9101 1121
                    </h3>
                    <div className='flex justify-between items-center text-white text-sm'>
                      <span className='font-semibold'>Kashyap Patel</span>
                      <div className='flex items-center gap-2'>
                        <span className='font-semibold'>07/28</span>
                        <FcSimCardChip size={34} />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Balance Info */}
                <div className='w-full md:w-2/5 p-4 flex flex-col justify-center'>
                  <h3 className='text-gray-400 text-sm font-semibold pb-1'>Available Balance</h3>
                  <p className='text-4xl font-bold tracking-wider text-white font-mono'>
                    ₹53,555
                  </p>
                  <div className='flex items-center gap-2 mt-2 text-sm text-green-400'>
                    <CheckCircle2 size={16} />
                    <span>Payment Received</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Month Chart */}
          <div className="w-full ">
            <MonthChart />
          </div>
        </div>

        {/* ===== Right Column ===== */}
        <div className='lg:col-span-1 flex flex-col gap-6'>
          {/* Today's Bookings */}
          <div className="relative w-full rounded-2xl p-5 overflow-hidden shadow-md group transition-all duration-500 hover:scale-[1.03] bg-gray-900/60 border border-white/10 backdrop-blur-sm">
            <div className="relative z-10 text-white flex flex-col justify-between h-full">
              <div>
                <div className="flex items-center justify-between">
                  <h3 className="text-md font-semibold text-gray-300">Today's Bookings</h3>
                  <GlassIcon icon={Bookmark} color="purple" />
                </div>
                <h4 className="text-5xl mt-2 font-bold font-mono text-white group-hover:text-purple-300">
                  5
                </h4>
              </div>
              <p className="text-sm font-medium text-gray-500 mt-2">Slots Booked</p>
            </div>
          </div>

          {/* Today's Revenue */}
          <div className="relative w-full rounded-2xl p-5 overflow-hidden shadow-md group transition-all duration-500 hover:scale-[1.03] bg-gray-900/60 border border-white/10 backdrop-blur-sm">
            <div className="relative z-10 text-white flex flex-col justify-between h-full">
              <div>
                <div className="flex items-center justify-between">
                  <h3 className="text-md font-semibold text-gray-300">Today's Revenue</h3>
                  <GlassIcon icon={BadgeDollarSign} color="green" />
                </div>
                <h4 className="text-4xl mt-3 font-bold font-mono text-white group-hover:text-green-300">
                  ₹1,550
                </h4>
              </div>
              <p className="text-sm font-medium text-gray-500 mt-2">Payment Received</p>
            </div>
          </div>

          {/* Box Stat Graph */}
          <div className="relative w-full rounded-2xl px-5 overflow-hidden  group transition-all duration-500 hover:scale-[1.02] ">
            <BoxStatGraph />
          </div>

          {/* Payment Stat Graph */}
          <div className="relative w-full rounded-2xl px-5 overflow-hidden  group transition-all duration-500 hover:scale-[1.02]">
            <PaymentStatGraph />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
