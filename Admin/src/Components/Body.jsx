// File: Admin/src/Components/Body.jsx

import React from "react";
import Home from "./Home";
import { createBrowserRouter, RouterProvider } from "react-router-dom"; // Removed Navigate
import Dashboard from "./Dashboard";
import RevenuePage from "./Revenue/RevenuePage";
import TransDetails from "./Transaction/TransDetails";

const Body = ({ isAuthReady }) => {
  const appRouter = createBrowserRouter([
    // ✅ THE REDIRECT RULE HAS BEEN REMOVED
    {
      path: "/", // The root path now directly loads the main layout
      element: <Home isAuthReady={isAuthReady} />,
      children: [
        {
          index: true, // The index route will render the Dashboard
          element: <Dashboard isAuthReady={isAuthReady} />,
        },
      ],
    },
    // The path "/Overview" is now handled by the root path's index route
    // You can remove the separate "/Overview" route if you want, or keep it as an alias
    {
      path: "/Revenue",
      element: <RevenuePage isAuthReady={isAuthReady} />,
    },
    {
      path: "/Transaction",
      element: <TransDetails isAuthReady={isAuthReady} />,
    },
  ]);

  return <RouterProvider router={appRouter} />;
};

export default Body;