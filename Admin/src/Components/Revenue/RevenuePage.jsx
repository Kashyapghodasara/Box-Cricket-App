import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import Sidebar from "@/Components/Sidebar.jsx";
import { ADMIN_BACKEND_URL } from "@/Constant.jsx";

import { Bookmark, BadgeDollarSign } from "lucide-react";

// Glass Icon Wrapper
const GlassIcon = ({ icon: Icon, color }) => (
    <div
        className={`w-8 h-8 rounded-lg bg-${color}-500/20 backdrop-blur-sm border border-white/10 flex items-center justify-center`}
    >
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

// Reusable Stat Box
const StatBox = ({ title, value, subtitle, icon, color, prefix = "" }) => {
    return (
        <div className="relative w-full rounded-2xl p-5 overflow-hidden shadow-md group transition-all duration-500 hover:scale-[1.03] bg-gray-900/60 border border-white/10 backdrop-blur-sm">
            <div className="relative z-10 text-white flex flex-col justify-between h-full">
                <div>
                    <div className="flex items-center justify-between">
                        <h3 className="text-[18px] font-semibold text-gray-300">{title}</h3>
                        <GlassIcon icon={icon} color={color} />
                    </div>
                    <h4
                        className={`${prefix === "₹" ? "text-3xl" : "text-4xl"
                            } mt-2 font-bold font-poppins text-white group-hover:text-${color}-300 tracking-wider`}
                    >
                        {prefix}
                        {value}
                    </h4>
                </div>
                <p className="text-sm font-medium text-gray-500 mt-2">{subtitle}</p>
            </div>
        </div>
    );
};

const RevenuePage = () => {
    const [stats, setStats] = useState({
        today: { bookings: 0, revenue: 0 },
        yesterday: { bookings: 0, revenue: 0 },
        lastWeek: { bookings: 0, revenue: 0 },
        lastMonth: { bookings: 0, revenue: 0 },
        last6Months: { bookings: 0, revenue: 0 },
        lastYear: { bookings: 0, revenue: 0 },
    });

    const [time, setTime] = useState(new Date());
    /* const [totalBalance, setTotalBalance] = useState(0);
    const [bookedSlots, setBookedSlots] = useState(0);
    const [todayRevenue, setTodayRevenue] = useState(0); */

    const today = new Date();
    const day = today.getDate();
    const month = today.toLocaleString('en-US', { month: 'long' });
    const year = today.getFullYear();
    const weekday = today.toLocaleString('en-US', { weekday: 'long' });

    useEffect(() => {
        const timerId = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(timerId);
    }, []);

    useEffect(() => {

        const todayBookedSlots = async () => {
            try {
                const config = {
                    headers: { "Content-Type": "application/json" },
                    withCredentials: true   // for cookies
                }
                const res = await axios.get(`${ADMIN_BACKEND_URL}/bookedSlotNumber`, config)

                if (res.data.success === true) {
                    setStats(prevstate => ({
                        ...prevstate,
                        today: {
                            ...prevstate.today,   // keep existing today values
                            bookings: res.data.bookedSlotes  // update only bookings
                        }
                    }));
                }
            } catch (error) {
                console.error("Error fetching today's booked slots:", error);
                toast.error("Failed to fetch today's booked slots");
            }
        }

        const todayRevenue = async () => {
            try {
                const config = {
                    headers: { "Content-Type": "application/json" },
                    withCredentials: true   // for cookies
                }

                const res = await axios.get(`${ADMIN_BACKEND_URL}/todayRevenue`, config);
                if (res.data.success === true) {
                    setStats(prevstate => ({
                        ...prevstate,
                        today: {
                            ...prevstate.today,   // keep existing today values
                            revenue: res.data.todayRevenue  // update only revenue
                        }
                    }));

                }
            } catch (error) {
                console.error("Error fetching today's revenue:", error);
                toast.error("Failed to fetch today's revenue");
            }
        }

        const yesterdayBookingDetails = async () => { 
            try {
                const config = {
                    headers: { "Content-Type": "application/json" },
                    withCredentials: true   // for cookies
                }
                const res = await axios.get(`${ADMIN_BACKEND_URL}/yesterdayBookingDetails`, config);
                console.log(res.data);
                if(res.data.success === true) {
                    setStats(prev => ({
                        ...prev,
                        yesterday: {
                            ...prev.yesterday,
                            bookings: res.data.yesterDayBookings,
                            revenue: res.data.yesterDayRevenue
                        }
                    }))
                }
            } catch (error) {
                console.error("Error fetching yesterday's booking details:", error);
                toast.error("Failed to fetch yesterday's booking details");
            }
        }

        const lastWeekBookingDetails = async () => {
            try {   
                const config = { headers: { "Content-Type": "application/json" },
                    withCredentials: true   // for cookies
                }

                const res = await axios.get(`${ADMIN_BACKEND_URL}/lastWeekBookingDetails`, config);

                if(res.data.success === true) {
                    setStats(prev => ({
                        ...prev,
                        lastWeek: {
                            ...prev.lastWeek,
                            bookings: res.data.lastWeekBookings,
                            revenue: res.data.lastWeekRevenue
                        }
                    }))
                }
            } catch (error) {
                console.error("Error fetching last week's booking details:", error);
                toast.error("Failed to fetch last week's booking details");
            }
        }

        const lastMonthBookingDetails = async () => {
            try {
                const config = { headers: { "Content-Type": "application/json" },
                    withCredentials: true   // for cookies
                }

                const res = await axios.get(`${ADMIN_BACKEND_URL}/lastMonthBookingDetails`, config);
                if(res.data.success === true) {
                    setStats(prev => ({
                        ...prev,
                        lastMonth: {
                            ...prev.lastMonth,
                            bookings: res.data.lastMonthBookings,
                            revenue: res.data.lastMonthRevenue
                        }
                    }))
                }
            } catch (error) {
                console.error("Error fetching last month's booking details:", error);
                toast.error("Failed to fetch last month's booking details");
            }
        }

        const lastYearBookingDetails = async () => {
            try {
                const config = { headers: { "Content-Type": "application/json" },
                    withCredentials: true   // for cookies
                }

                const res = await axios.get(`${ADMIN_BACKEND_URL}/lastYearBookingDetails`, config);
                if(res.data.success === true) {
                    setStats(prev => ({
                        ...prev,
                        lastYear: {
                            ...prev.lastYear,
                            bookings: res.data.lastYearBookings,
                            revenue: res.data.lastYearRevenue
                        }
                    }))
                }
            } catch (error) {
                console.error("Error fetching last year's booking details:", error);
                toast.error("Failed to fetch last year's booking details");
            }
        }

        todayBookedSlots();
        todayRevenue();
        yesterdayBookingDetails();
        lastWeekBookingDetails();
        lastMonthBookingDetails();
        lastYearBookingDetails();
    }, [])


    return (
        <div className="flex h-screen">
            {/* Sidebar */}
            <div className="h-full w-64">
                <Sidebar />
            </div>

            {/* Main Content */}
            <div className="w-full h-full p-4 md:p-6 overflow-y-auto bg-[#0c0c0c]">

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

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-6">
                    {/* Today */}
                    <StatBox
                        title="Today's Bookings"
                        value={stats.today.bookings}
                        subtitle="Slots Booked"
                        icon={Bookmark}
                        color="purple"
                    />
                    <StatBox
                        title="Today's Revenue"
                        value={stats.today.revenue}
                        subtitle="Payment Received"
                        icon={BadgeDollarSign}
                        color="green"
                        prefix="₹"
                    />

                    {/* Yesterday */}
                    <StatBox
                        title="Yesterday's Bookings"
                        value={stats.yesterday.bookings}
                        subtitle="Slots Booked"
                        icon={Bookmark}
                        color="purple"
                    />
                    <StatBox
                        title="Yesterday's Revenue"
                        value={stats.yesterday.revenue}
                        subtitle="Payment Received"
                        icon={BadgeDollarSign}
                        color="green"
                        prefix="₹"
                    />

                    {/* Last Week */}
                    <StatBox
                        title="Last Week Bookings"
                        value={stats.lastWeek.bookings}
                        subtitle="Slots Booked"
                        icon={Bookmark}
                        color="purple"
                    />
                    <StatBox
                        title="Last Week Revenue"
                        value={stats.lastWeek.revenue}
                        subtitle="Payment Received"
                        icon={BadgeDollarSign}
                        color="green"
                        prefix="₹"
                    />

                    {/* Last Month */}
                    <StatBox
                        title="Last Month Bookings"
                        value={stats.lastMonth.bookings}
                        subtitle="Slots Booked"
                        icon={Bookmark}
                        color="purple"
                    />
                    <StatBox
                        title="Last Month Revenue"
                        value={stats.lastMonth.revenue}
                        subtitle="Payment Received"
                        icon={BadgeDollarSign}
                        color="green"
                        prefix="₹"
                    />

                    {/* Last 6 Months */}
                    <StatBox
                        title="Last 6 Months Bookings"
                        value={stats.last6Months.bookings}
                        subtitle="Slots Booked"
                        icon={Bookmark}
                        color="purple"
                    />
                    <StatBox
                        title="Last 6 Months Revenue"
                        value={stats.last6Months.revenue}
                        subtitle="Payment Received"
                        icon={BadgeDollarSign}
                        color="green"
                        prefix="₹"
                    />

                    {/* Last Year */}
                    <StatBox
                        title="Last Year Bookings"
                        value={stats.lastYear.bookings}
                        subtitle="Slots Booked"
                        icon={Bookmark}
                        color="purple"
                    />
                    <StatBox
                        title="Last Year Revenue"
                        value={stats.lastYear.revenue}
                        subtitle="Payment Received"
                        icon={BadgeDollarSign}
                        color="green"
                        prefix="₹"
                    />
                </div>
            </div>
        </div>
    );
};

export default RevenuePage;
