import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './Home'
import BX01 from './BoxCards/BX01.jsx'
import BX02 from './BoxCards/BX02.jsx'
import BX03 from './BoxCards/BX03.jsx'
import BX04 from './BoxCards/BX04.jsx'
import BX05 from './BoxCards/BX05.jsx'
import BX06 from './BoxCards/BX06.jsx'

const Body = () => {

    const appRouter = createBrowserRouter([
        {
            path: "/",
            element: <Home />,
        },
        {
            path: 'box01',
            element: <BX01 />
        },
        {
            path: 'box02',
            element: <BX02 />
        },
        {
            path: 'box03',
            element: <BX03 />
        },
        {
            path: 'box04',
            element: <BX04 />
        },
        {
            path: 'box05',
            element: <BX05 />
        },
        {
            path: 'box06',
            element: <BX06 />
        }


    ])
    return (
        <div>
            <RouterProvider router={appRouter} />
        </div>
    )
}

export default Body