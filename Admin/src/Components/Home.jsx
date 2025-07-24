import React from 'react'
import Sidebar from './Sidebar'
import { Outlet } from 'react-router-dom'

const Home = () => {
  return (
    <>
    <div className='w-full h-screen flex overflow-hidden bg-[#191a1a]'>
      <Sidebar />
      <Outlet />
    </div>
    </>
  )
}

export default Home
