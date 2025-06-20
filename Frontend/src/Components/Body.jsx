import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './Home'
import Availability from './Availability.jsx'
import BoxBooking from './BoxBooking.jsx'
import ShowBookings from './ShowBookings.jsx'

const Body = () => {

    const appRouter = createBrowserRouter([
        {
            path: "/",
            element: <Home />,
           
        },
        {
            path: "availabel",
            element: <Availability />
        },
        {
            path: "booking",
            element: <BoxBooking />
        }, 
        {
            path: "showBookings",
            element: <ShowBookings />
        }

    ])
    return (
        <div>
            <RouterProvider router={appRouter} />
        </div>
    )
}

export default Body