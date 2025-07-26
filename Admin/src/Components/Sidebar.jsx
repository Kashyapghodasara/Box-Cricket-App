"use client";
import React from 'react'
import { RiMoneyRupeeCircleLine, RiBankLine } from "react-icons/ri"
import { ChartNoAxes } from '../Animation/ChartNoAxes'
import { LayoutGrid } from '../Animation/LayoutGrid'
import { BadgeDollarSign } from "../Animation/BadgeDollarSign";
import { ScanText } from '../Animation/ScanText';
import { useState } from 'react'

const Sidebar = () => {

  const [isHovered, setIsHovered] = useState(false);
  const [isHoveredOverview, setIsHoveredOverview] = useState(false);
  const [isHoveredRevenue, setIsHoveredRevenue] = useState(false);
  const [isHoveredTransactions, setIsHoveredTransactions] = useState(false);



  return (
    <>
      {/* Sidebar */}
      <aside className='w-[17%] h-screen bg-[#f1e8df] rounded-r-[30px] shadow-lg border-r-2 flex flex-col justify-between items-center py-6'>
        {/* Top: Admin + Menu */}
        <div className='flex flex-col gap-6 items-center text-xl text-[#191a1a] font-semibold'>
          <h1 className='text-4xl text-center font-extrabold text-[#191a1a] mb-8 mt-2 tracking-wider'>
            Admin
          </h1>

          {/* Menu Buttons */}
          <button
            className="w-44 my-button group flex items-center justify-center gap-3 py-2.5 rounded-full cursor-pointer"
            onMouseEnter={() => setIsHoveredOverview(true)}
            onMouseLeave={() => setIsHoveredOverview(false)}
          >
            <LayoutGrid hovered={isHoveredOverview} className="text-lg" />
            <span className="text-[#191a1a] group-hover:text-white transition-colors duration-300">
              Overview
            </span>
          </button>

          <button
            className="w-44 my-button group flex items-center justify-center gap-3 py-2.5 rounded-full cursor-pointer"
            onMouseEnter={() => setIsHoveredRevenue(true)}
            onMouseLeave={() => setIsHoveredRevenue(false)}
          >
            <BadgeDollarSign hovered={isHoveredRevenue} className="text-xl" />
            <span className="text-[#191a1a] group-hover:text-white transition-colors duration-300">
              Revenue
            </span>
          </button>

          <button
            className="w-44 my-button group flex items-center justify-center gap-3 py-3 rounded-full cursor-pointer"
            onMouseEnter={() => setIsHoveredTransactions(true)}
            onMouseLeave={() => setIsHoveredTransactions(false)}
          >
            <ScanText hovered={isHoveredTransactions} />
            <span className="text-[#191a1a] group-hover:text-white transition-colors duration-300">
              Transaction
            </span>
          </button>

          <button
            className="w-44 my-button group flex items-center justify-center gap-3 py-2.5 rounded-full cursor-pointer"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <ChartNoAxes hovered={isHovered} />
            <span className="text-[#191a1a] group-hover:text-white transition-colors duration-300">
              Statistics
            </span>
          </button>
        </div>

        {/* Bottom: Logout */}
        <div className="mb-4 ">
          <button className="my-button w-40 py-2 cursor-pointer text-xl font-semibold text-center text-[#241818] rounded-full">
            Logout
          </button>
        </div>
      </aside>

    </>
  )
}

export default Sidebar
