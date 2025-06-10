import React from 'react'
import Hero from './Hero'
import { Outlet } from 'react-router-dom'
import InfoCards from './InfoCards'
import CountValues from './CountValues'
import Ticket from './Ticket'
import Footer from './Footer'

const Home = () => {
  return (
    <>
        <Hero />
        <Outlet />
        <InfoCards />
        <CountValues />
        <Ticket />
        <Footer />
    </>
  )
}

export default Home