import React from "react";
import Home from "./Home";
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Dashboard from "./Dashboard";
import RevenuePage from "./Revenue/RevenuePage";
import TransDetails from "./Transaction/TransDetails";
import Sidebar from "./Sidebar.jsx";

const Body = () => {

    const appRouter = createBrowserRouter([
        {
            path: "/Overview",
            element: <Home />,
            children: [{
                path: "/Overview",
                element: <Dashboard />
            }]
        },
        {
            path: '/Revenue',
            element: <RevenuePage />
        }, 
        {
            path: '/Transaction',
            element: <TransDetails />,
        }
    ])

    return (
        <RouterProvider router={appRouter} />
    );
}

export default Body

