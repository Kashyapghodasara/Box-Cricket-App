// File: Admin/src/Components/Body.jsx

import React from "react";
import Home from "./Home";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Dashboard from "./Dashboard";
import RevenuePage from "./Revenue/RevenuePage";
import TransDetails from "./Transaction/TransDetails";

const Body = ({ isAuthReady }) => {
    const appRouter = createBrowserRouter([
        {
            path: "/",
            element: <Home isAuthReady={isAuthReady} />,
            // 👇 All pages that share the Home layout go in this children array
            children: [
                {
                    index: true, // path: "/"
                    element: <Dashboard isAuthReady={isAuthReady} />,
                },
                {
                    path: "Revenue", // Note: no leading "/"
                    element: <RevenuePage isAuthReady={isAuthReady} />,
                },
                {
                    path: "Transaction", // Note: no leading "/"
                    element: <TransDetails isAuthReady={isAuthReady} />,
                },
                // Add any other dashboard pages here
            ],
        },
        // You can add other top-level routes here if needed, like a login page
        // that does NOT have the sidebar.
    ]);
 
    return <RouterProvider router={appRouter} />;
};

export default Body;