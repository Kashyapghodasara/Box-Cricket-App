import React from 'react'
import Hero from './Hero'
import { Outlet } from 'react-router-dom'
import InfoCards from './InfoCards'
import CountValues from './CountValues'
import Ticket from './Ticket'

const Home = () => {
  return (
    <>
        <Hero />
        <Outlet />
        <InfoCards />
        <CountValues />
        <Ticket />
    </>
  )
}

export default Home