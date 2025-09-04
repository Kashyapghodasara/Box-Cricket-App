import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { ADMIN_BACKEND_URL } from '@/Constant.jsx'
import { toast } from 'react-hot-toast'
import Sidebar from '@/Components/Sidebar.jsx'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/Components/ui/table.jsx"

const TransDetails = () => {

    const getOrdinalSuffix = (day) => {
        if (day > 3 && day < 21) return 'th';
        switch (day % 10) {
            case 1: return 'st';
            case 2: return 'nd';
            case 3: return 'rd';
            default: return 'th';
        }
    };

    const [time, setTime] = useState(new Date());
    const [tranInfo, setTranInfo] = useState();
    const [isPopUp, setIsPopUp] = useState(false);
    const [user, setUser] = useState({});

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
        const fetchTransactionsDetails = async () => {
            // Get the token from local storage at the start
            const token = localStorage.getItem('adminAccessToken');

            // If no token exists, show an error and stop
            if (!token) {
                toast.error("No session found. Please login.", ErrorToastStyle);
                return;
            }

            // Create the initial config object with the Authorization header
            const config = {
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                withCredentials: true, // For the refresh token cookie
            };

            const handleApiCall = async (apiFunc) => {
                try {
                    // First attempt uses the initial config
                    return await apiFunc(config);
                } catch (error) {
                    if (error.response && error.response.status === 401) {
                        try {
                            // Refresh the token
                            const refreshRes = await axios.post(`${ADMIN_BACKEND_URL}/refresh-token`, {}, { withCredentials: true });

                            if (refreshRes.data.success) {
                                const newAccessToken = refreshRes.data.accessToken;
                                localStorage.setItem('adminAccessToken', newAccessToken);

                                // Create a new config for the retry with the new token
                                const newConfig = {
                                    ...config,
                                    headers: {
                                        ...config.headers,
                                        'Authorization': `Bearer ${newAccessToken}`
                                    }
                                };
                                // Retry the original API call with the new config
                                return await apiFunc(newConfig);
                            }
                        } catch (refreshError) {
                            console.error("Token refresh failed while fetching transactions:", refreshError);
                            toast.error("Session expired. Please login again.", ErrorToastStyle);
                            localStorage.removeItem('adminAccessToken'); // Clean up
                            /* window.location.href = "https://box-cricket-app.vercel.app/registration"; */
                        }
                    } else {
                        // For non-401 errors, just throw them
                        throw error;
                    }
                }
            };

            try {
                // The function passed to handleApiCall now receives the config to use
                const res = await handleApiCall((currentConfig) =>
                    axios.get(`${ADMIN_BACKEND_URL}/fetchTransactionDetails`, currentConfig)
                );

                if (res?.data?.success) {
                    setTranInfo(res.data.transactions);
                }
            } catch (error) {
                console.error("Error fetching transaction details:", error);
                // The session expiry error is already handled in handleApiCall
                if (error?.response?.status !== 401) {
                    toast.error(
                        error?.response?.data?.message || "Failed to load transactions",
                        ErrorToastStyle
                    );
                }
            }
        };

        fetchTransactionsDetails();
    }, []);


    return (
        <div className="h-full w-full bg-[#0c0c0c] text-white">

            {/* Main Content */}
            <main className="flex-1 flex flex-col overflow-y-auto">

                {/* Header */}
                <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 p-6 border-b border-zinc-800">

                    {/* User Info */}
                    <div className="flex items-center gap-4 p-2 rounded-lg hover:bg-zinc-900 transition-colors cursor-pointer">
                        <img
                            src="../public/batman.png"
                            alt="User Avatar"
                            onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/48x48/7e22ce/ffffff?text=K'; }}
                            className="w-12 h-12 rounded-full border-2 border-purple-500 object-cover"
                        />
                        <div>
                            <h1 className="text-xl font-bold">Kashyap Patel</h1>
                            <p className="text-sm text-gray-400">kashyappatel816@gmail.com</p>
                        </div>
                    </div>

                    {/* Date & Time */}
                    <div className="text-right">
                        <div className="text-lg font-semibold tracking-wide">
                            {`${weekday}, ${day}`}<sup className="text-xs font-medium">{getOrdinalSuffix(day)}</sup>{` ${month} ${year}`}
                        </div>
                        <div className="text-md font-mono text-gray-400 mt-1">
                            {time.toLocaleTimeString('en-US', {
                                hour: '2-digit',
                                minute: '2-digit',
                                second: '2-digit',
                                hour12: true
                            })}
                        </div>
                    </div>
                </header>


                {/* Content */}
                <section className="flex-1 overflow-y-auto p-6">
                    <Table>
                        <TableCaption>A list of your recent invoices.</TableCaption>
                        <TableHeader className="">
                            <TableRow>
                                <TableHead>Sr. No</TableHead>
                                <TableHead className="w-[18%]">Name</TableHead>
                                <TableHead className="w-[20%]">Email</TableHead>
                                <TableHead>Payment Method</TableHead>
                                <TableHead>Transaction</TableHead>
                                <TableHead className="w-[20%]">Ticket-No</TableHead>
                            </TableRow>
                        </TableHeader>

                        {tranInfo && tranInfo.length > 0 ? (
                            <>
                                {/* Used (... ) instead of { ... } inside .map() → ensures the JSX is returned. */}
                                {tranInfo?.map((item, index) => (
                                    <TableBody key={item._id}>
                                        <TableRow className="text-[14.5px]" onClick={() => { setIsPopUp(true); setUser(item) }}>
                                            <TableCell className="text-center tracking-wide font-medium" >{index + 1}</TableCell>
                                            <TableCell className="text-center tracking-wide">{item.fullname}</TableCell>
                                            <TableCell className="text-center tracking-wide">{item.email}</TableCell>
                                            <TableCell className="text-center tracking-wide">{item.paymentMethode}</TableCell>
                                            <TableCell className="text-center tracking-wide">₹{item.amount}</TableCell>
                                            <TableCell className="text-center tracking-wider">{item?.bookedBoxInfo[0]?.ticket_no}</TableCell>
                                        </TableRow>
                                    </TableBody>
                                ))}
                            </>) : (

                            <>
                                <TableBody>
                                    <TableRow className="text-[14.5px]">
                                        <TableCell className="text-center tracking-wide font-medium" colSpan={6}>No transaction data available</TableCell>
                                    </TableRow>
                                </TableBody>
                            </>)}
                    </Table>

                    {isPopUp && (
                        <>
                            <div>
                                <div className="fixed inset-0 flex items-center justify-center bg-black/70 backdrop-blur-sm z-50">
                                    <div className="bg-zinc-900 p-8 rounded-2xl shadow-2xl w-[820px] h-[580px] relative text-gray-200 overflow-y-auto 
                                    ">

                                        {/* Title */}
                                        <h2 className="text-3xl font-bold mb-8 text-center text-white tracking-wide">
                                            User Details
                                        </h2>

                                        {/* Details Grid */}
                                        <div className="grid grid-cols-2 gap-6 font-sans text-[15px]">

                                            {/* Personal Info */}
                                            <div className="bg-zinc-800 p-4 rounded-xl shadow-sm border border-gray-700">
                                                <h3 className="text-base font-semibold text-blue-400 border-b border-gray-700 pb-2 mb-4 flex items-center gap-2">
                                                    👤 Personal Info
                                                </h3>
                                                <div className="space-y-3">
                                                    <div className="flex justify-between items-center hover:bg-zinc-700/40 px-2 py-1 rounded-lg">
                                                        <span className="font-medium">Name</span>
                                                        <span className="text-gray-300">{user.fullname}</span>
                                                    </div>
                                                    <div className="flex justify-between items-center hover:bg-zinc-700/40 px-2 py-1 rounded-lg">
                                                        <span className="font-medium">Email</span>
                                                        <span className="text-gray-300">{user.email}</span>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Payment Info */}
                                            <div className="bg-zinc-800 p-4 rounded-xl shadow-sm border border-gray-700">
                                                <h3 className="text-base font-semibold text-purple-400 border-b border-gray-700 pb-2 mb-4 flex items-center gap-2">
                                                    💳 Payment Info
                                                </h3>
                                                <div className="space-y-3">
                                                    <div className="flex justify-between hover:bg-zinc-700/40 px-2 py-1 rounded-lg">
                                                        <span className="font-medium">Amount</span>
                                                        <span className="text-gray-300">₹{user.amount}</span>
                                                    </div>
                                                    <div className="flex justify-between hover:bg-zinc-700/40 px-2 py-1 rounded-lg">
                                                        <span className="font-medium">Method</span>
                                                        <span className="text-gray-300">{user.paymentMethode}</span>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Booking Info */}
                                            <div className="col-span-2 bg-zinc-800 p-4 rounded-xl shadow-sm border border-gray-700">
                                                <h3 className="text-base font-semibold text-green-400 border-b border-gray-700 pb-2 mb-4 flex items-center gap-2">
                                                    🎟️ Booking Info
                                                </h3>
                                                <div className="grid grid-cols-2 gap-4">
                                                    <div className="flex justify-between hover:bg-zinc-700/40 px-2 py-1 rounded-lg">
                                                        <span className="font-medium">Box ID</span>
                                                        <span className="text-gray-300">{user?.bookedBoxInfo[0]?.box_id}</span>
                                                    </div>
                                                    <div className="flex justify-between hover:bg-zinc-700/40 px-2 py-1 rounded-lg">
                                                        <span className="font-medium">Size</span>
                                                        <span className="text-gray-300">{user?.bookedBoxInfo[0]?.size}</span>
                                                    </div>
                                                    <div className="flex justify-between hover:bg-zinc-700/40 px-2 py-1 rounded-lg">
                                                        <span className="font-medium">Date</span>
                                                        <span className="text-gray-300">{user?.bookedBoxInfo[0]?.date}</span>
                                                    </div>
                                                    <div className="flex justify-between hover:bg-zinc-700/40 px-2 py-1 rounded-lg">
                                                        <span className="font-medium">Duration</span>
                                                        <span className="text-gray-300">{user?.bookedBoxInfo[0]?.duration}</span>
                                                    </div>
                                                    <div className="flex justify-between hover:bg-zinc-700/40 px-2 py-1 rounded-lg">
                                                        <span className="font-medium">Start</span>
                                                        <span className="text-gray-300">{user?.bookedBoxInfo[0]?.start_time}</span>
                                                    </div>
                                                    <div className="flex justify-between hover:bg-zinc-700/40 px-2 py-1 rounded-lg">
                                                        <span className="font-medium">End</span>
                                                        <span className="text-gray-300">{user?.bookedBoxInfo[0]?.end_time}</span>
                                                    </div>
                                                    <div className="flex justify-between col-span-2 hover:bg-zinc-700/40 px-2 py-1 rounded-lg">
                                                        <span className="font-medium">Ticket No</span>
                                                        <span className="text-gray-300">{user?.bookedBoxInfo[0]?.ticket_no}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Close Button */}
                                        <div className="mt-8 flex justify-center">
                                            <button
                                                onClick={() => setIsPopUp(false)}
                                                className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 
                         text-white px-8 py-2.5 rounded-lg shadow-lg transition-all duration-200 hover:scale-105"
                                            >
                                                Close
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>
                    )}


                </section>
            </main>
        </div>
    )
}

export default TransDetails
