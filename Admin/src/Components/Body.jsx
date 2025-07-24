import React from "react";
import Home from "./Home";
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Dashboard from "./Dashboard";

const Body = () => {

    const appRouter = createBrowserRouter([
        {
            path: "/",
            element: <Home />,
            children: [{
                path: "/",
                element: <Dashboard />
            }]
        }
    ])

    return (
       <RouterProvider router={appRouter} />
    );
}

export default Body

