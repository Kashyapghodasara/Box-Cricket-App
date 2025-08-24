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
            try {
                const config = { headers: { 'Content-Type': 'application/json' }, withCredentials: true };

                const res = await axios.get(`${ADMIN_BACKEND_URL}/fetchTransactionDetails`, config)
                console.log(res.data)
                if (res.data.success) {
                    setTranInfo(res.data.transactions)
                }

            } catch (error) {
                toast.error(error.response.data.message)
                console.log("Error fetching transaction details:", error);
            }
        }

        fetchTransactionsDetails();
    }, [])

    /*  console.log("Transaction Details:", tranInfo); */

    return (
        <div className="flex h-screen bg-[#0c0c0c] text-white">

            {/* Sidebar */}
            <aside className="w-60 h-full border-r border-zinc-800 bg-[#111]">
                <Sidebar />
            </aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col overflow-hidden">

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
                                        <TableRow className="text-[14.5px]">
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
                </section>
            </main>
        </div>
    )
}

export default TransDetails
