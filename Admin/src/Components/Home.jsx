// File: Admin/src/Components/Home.jsx

import React from 'react';
import Sidebar from './Sidebar';
import { Outlet } from 'react-router-dom';

// 1. Receive the signal as a prop
const Home = ({ isAuthReady }) => {
  return (
    <>
      <div className='w-full h-screen flex overflow-hidden bg-[#191a1a]'>
        <Sidebar />
        {/* 2. Pass the signal down to the child component (e.g., Dashboard) */}
        <Outlet context={{ isAuthReady }} />
      </div>
    </>
  );
};

export default Home;