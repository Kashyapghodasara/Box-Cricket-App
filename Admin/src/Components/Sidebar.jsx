import React from 'react'
import { LuLayoutDashboard } from "react-icons/lu"
import { RiMoneyRupeeCircleLine, RiBankLine } from "react-icons/ri"
import { GoGraph } from "react-icons/go"

const Sidebar = () => {
  return (
    <div className='w-full h-screen bg-[#161616] flex'>
      {/* Sidebar */}
      <aside className='w-[19%] h-screen bg-[#f1e8df] rounded-r-4xl flex flex-col items-center py-6'>

        {/* Top: Admin + Menu */}
        <div className='flex flex-col gap-6 items-center text-xl text-[#191a1a] font-semibold '>
          <h1 className='text-4xl text-center font-bold text-[#191a1a] mb-8'>
            Admin
          </h1>

          <button className="my-button w-44 flex items-center justify-center gap-3 py-2 rounded-full">
            <LuLayoutDashboard className="text-2xl" />
            <span>Overview</span>
          </button>

          <button className="my-button w-44 flex items-center justify-center gap-3 py-2 rounded-full">
            <RiMoneyRupeeCircleLine className="text-2xl" />
            <span>Revenue</span>
          </button>

          <button className="my-button w-44 flex items-center justify-center gap-3 py-2 rounded-full">
            <RiBankLine className="text-2xl" />
            <span>Transaction</span>
          </button>

          <button className="my-button w-44 flex items-center justify-center gap-3 py-2 rounded-full">
            <GoGraph className="text-2xl" />
            <span>Statistics</span>
          </button>
        </div>

        {/* Bottom: Logout */}
        <div className="mt-auto">
          <button className="my-button w-40 py-2 text-xl font-semibold text-center text-[#241818] rounded-full">
            Logout
          </button>
        </div>

      </aside>
    </div>
  )
}

export default Sidebar
