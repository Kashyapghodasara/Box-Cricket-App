import React from "react";
import Home from "./Home";
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

const Body = () => {

    const appRouter = createBrowserRouter([
        {
            path: "/",
            element: <Home />
        }
    ])

    return (
       <RouterProvider router={appRouter} />
    );
}

export default Body

