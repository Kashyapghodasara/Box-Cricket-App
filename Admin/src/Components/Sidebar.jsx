import React from 'react';
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
        { icon: ScanText, label: 'Transactions' },
        { icon: BarChart3, label: 'Statistics' },
    ];

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
                                <a href="#" className='flex items-center gap-4 text-gray-300 hover:text-white hover:bg-white/5 p-3 rounded-lg cursor-pointer transition-all duration-300 group'>
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
                <button className="w-full flex items-center justify-center gap-3 py-3 rounded-lg text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-all duration-300 group">
                    <LogOut size={22} className="group-hover:scale-110 transition-transform" />
                    <span className="font-semibold">Logout</span>
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;
