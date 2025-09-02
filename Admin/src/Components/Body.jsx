// File: Admin/src/Components/Body.jsx

import React from "react";
import Home from "./Home";
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import Dashboard from "./Dashboard";
import RevenuePage from "./Revenue/RevenuePage";
import TransDetails from "./Transaction/TransDetails";

// 1. Receive the signal as a prop
const Body = ({ isAuthReady }) => {
  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: <Navigate to="/Overview" replace />,
    },
    {
      path: "/Overview",
      // 2. Pass the signal into the Home component
      element: <Home isAuthReady={isAuthReady} />,
      children: [
        {
          index: true,
          // 3. And also pass it into the Dashboard component
          element: <Dashboard isAuthReady={isAuthReady} />,
        },
      ],
    },
    {
      path: "/Revenue",
      element: <RevenuePage isAuthReady={isAuthReady} />, // Pass it to other pages too
    },
    {
      path: "/Transaction",
      element: <TransDetails isAuthReady={isAuthReady} />, // Pass it to other pages too
    },
  ]);

  return <RouterProvider router={appRouter} />;
};

export default Body;