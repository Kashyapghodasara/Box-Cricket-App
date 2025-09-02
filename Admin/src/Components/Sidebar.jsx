import React from 'react';
import axios from 'axios';
import { ADMIN_BACKEND_URL } from '@/Constant';
import toast from 'react-hot-toast';
import {
    LayoutDashboard,
    BarChart3,
    ScanText,
    BadgeDollarSign,
    LogOut,
    ChevronRight
} from 'lucide-react';

// The Sidebar Component, re-themed to match the dashboard
const Sidebar = () => {
    const menuItems = [
        { icon: LayoutDashboard, label: 'Overview' },
        { icon: BadgeDollarSign, label: 'Revenue' },
        { icon: ScanText, label: 'Transaction' },
        /* { icon: BarChart3, label: 'Statistics' }, */
    ];

    const SuccessToastStyle = {
        style: {
            background: "#212121", // dark mode black background
            color: "#fff",
            fontSize: "17px",     // white text
            padding: "12px 20px",
            borderRadius: "10px",
            width: "100%",
            fontWeight: "300",
            textAlign: "center",
        },
        iconTheme: {
            primary: "#39bf04", // red-400 (error icon color)
            secondary: "#1f2937", // gray-800
        },
        duration: 2000, // Optional: auto-close duration
    }
    const ErrorToastStyle = {
        style: {
            background: "#212121", // dark mode black background
            color: "#fff",
            fontSize: "17px",     // white text
            padding: "12px 20px",
            borderRadius: "10px",
            width: "100%",
            fontWeight: "300",
            textAlign: "center",
        },
        iconTheme: {
            primary: "#eb1410", // red-400 (error icon color)
            secondary: "#1f2937", // gray-800
        },
        duration: 2000, // Optional: auto-close duration
    }

    const logoutHandler = async () => {
        try {
            // 1. Get the token to authorize the logout request
            const token = localStorage.getItem('adminAccessToken');

            const config = {
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                withCredentials: true // Needed to clear the refresh token cookie
            };

            // 2. Tell the backend to log out and clear the refresh token cookie
            // We use a try/catch here but proceed with logout even if it fails
            try {
                await axios.get(`${ADMIN_BACKEND_URL}/adminLogout`, config);
            } catch (error) {
                console.warn("Backend logout call failed, but proceeding with client-side logout.", error);
            }

        } finally {
            // 3. ALWAYS clear the token from the browser and redirect
            // This 'finally' block runs whether the 'try' succeeded or failed,
            // ensuring the user is always logged out on the frontend.
            toast.success("You have been logged out.", SuccessToastStyle);

            localStorage.removeItem('adminAccessToken');

            // Redirect to the login/registration page
            window.location.href = "https://box- cricket-app.vercel.app/registration";
        }
    };


    return (
        <aside className='w-64 h-screen bg-[#0c0c0c] backdrop-blur-lg border-r border-white/10 p-6 flex-col justify-between hidden lg:flex'>
            {/* Top Section: Title + Menu */}
            <div>
                <div className='flex items-center gap-3 mb-12'>
                    <LayoutDashboard className='text-purple-400' size={32} />
                    <h1 className='text-2xl font-bold text-white'>Admin</h1>
                </div>

                <nav>
                    <ul className='space-y-3'>
                        {menuItems.map((item, index) => (
                            <li key={index}>
                                <a href={`${item.label}`} className='flex items-center gap-4 text-gray-300 hover:text-white hover:bg-white/5 p-3 rounded-lg cursor-pointer transition-all duration-300 group'>
                                    <item.icon size={22} className="group-hover:scale-110 transition-transform" />
                                    <span className='font-medium'>{item.label}</span>
                                    {item.label === 'Overview' && <ChevronRight size={16} className='ml-auto' />}
                                </a>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>

            {/* Bottom Section: Logout */}
            <div>
                <button
                    onClick={logoutHandler}
                    className="w-full cursor-pointer flex items-center justify-center gap-3 py-3 rounded-lg text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-all duration-300 group">
                    <LogOut size={22} className="group-hover:scale-110 transition-transform" />
                    <span className="font-semibold">Logout</span>
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;
