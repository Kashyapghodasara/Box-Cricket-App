import React from "react";
import Home from "./Home";
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import Dashboard from "./Dashboard";
import RevenuePage from "./Revenue/RevenuePage";
import TransDetails from "./Transaction/TransDetails";

const Body = () => {
  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: <Navigate to="/Overview" replace />,
    },
    {
      path: "/Overview",
      element: <Home />,
      children: [
        {
          index: true,
          element: <Dashboard />,
        },
      ],
    },
    {
      path: "/Revenue",
      element: <RevenuePage />,
    },
    {
      path: "/Transaction",
      element: <TransDetails />,
    },
  ]);

  return <RouterProvider router={appRouter} />;
};

export default Body;
