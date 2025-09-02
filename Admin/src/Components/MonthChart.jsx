"use client";

import React from "react";
import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from "recharts";
import axios from "axios";
import toast from "react-hot-toast";
import { ADMIN_BACKEND_URL } from "@/Constant.jsx";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/Components/ui/card";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/Components/ui/chart";

/* export const description = "A bar chart with monthly labels"; */

const chartData = [
  { month: "January", count: 0 },
  { month: "February", count: 0 },
  { month: "March", count: 0 },
  { month: "April", count: 0 },
  { month: "May", count: 0 },
  { month: "June", count: 0 },
  { month: "July", count: 0 },
  { month: "August", count: 0 },
  { month: "September", count: 0 },
  { month: "October", count: 0 },
  { month: "November", count: 0 },
  { month: "December", count: 0 },
];

const chartConfig = {
  count: {
    label: "count",
    color: "var(--chart-1)",
  },
};

const MonthChart = () => {

  React.useEffect(() => {
    // Get the token from local storage once at the beginning
    const token = localStorage.getItem('adminAccessToken');

    // If there's no token, stop here to avoid errors
    if (!token) {
      toast.error("No session found. Please login.");
      return;
    }

    // Create a reusable config object with the Authorization header
    const config = {
      headers: {
        'Authorization': `Bearer ${token}`
      },
      withCredentials: true // Still needed for the refresh token cookie
    };

    // Helper function to handle 401 errors and token refresh
    const handleApiCall = async (apiFunc) => {
      try {
        // Pass the initial config to the function
        return await apiFunc(config);
      } catch (error) {
        if (error.response && error.response.status === 401) {
          try {
            // Refresh the access token
            const res = await axios.post(`${ADMIN_BACKEND_URL}/refresh-token`, {}, { withCredentials: true });

            if (res.data.success) {
              // Get the new token and update localStorage
              const { accessToken } = res.data;
              localStorage.setItem('adminAccessToken', accessToken);

              // Create a new config object with the NEW token for the retry
              const newConfig = {
                ...config,
                headers: {
                  ...config.headers,
                  'Authorization': `Bearer ${accessToken}`
                }
              };
              // Retry the original API call with the new token
              return await apiFunc(newConfig);
            }
          } catch (refreshError) {
            console.error("Token refresh failed:", refreshError);
            toast.error("Session expired. Please login again.");
            localStorage.removeItem('adminAccessToken'); // Clean up the invalid token
          }
        } else {
          // For other errors, just throw them
          throw error;
        }
      }
    };

    // Function to fetch the monthly booking data
    const monthlyBookingStat = async () => {
      await handleApiCall(async (currentConfig) => {
        // This function now receives the config (either the original or the new one after a refresh)
        const res = await axios.get(`${ADMIN_BACKEND_URL}/monthlyBookingStat`, currentConfig);

        if (res.data.success) {
          const updatedChart = [...chartData];
          res.data.monthlyBookings.forEach(item => {
            const idx = updatedChart.findIndex(m => m.month === item.month);
            if (idx !== -1) {
              updatedChart[idx].count = item.count;
            }
          });
          chartData(updatedChart);
        }
      }).catch((error) => {
        // Errors are already handled in handleApiCall, but you can log them here if you want
        console.error("Could not fetch monthly booking stats:", error);
      });
    };

    // Call the function to fetch data
    monthlyBookingStat();
  }, []); // Adjust dependencies if chartData or other state is needed


  return (
    <Card className="w-full sm:w-full   bg-[#0c0c0c] text-white">
      <div className="">
        <CardHeader>
          <CardTitle>Monthly Bookings</CardTitle>
          <CardDescription>January - December 2025</CardDescription>
        </CardHeader>
      </div>
      <CardContent>
        <div className="w-[89%] mx-auto pl-4 mt-0">
          <ChartContainer config={chartConfig}>
            <BarChart
              data={chartData}
              margin={{ top: 15 }}
              padding={{ top: 20, right: 30, left: 20, bottom: 5 }}
              width={800}
              height={500} // Reduced height
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="month"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tickFormatter={(value) => value.slice(0, 3)}
                stroke="#345679"
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Bar dataKey="count" fill="var(--color-count)" radius={8}>
                <LabelList
                  position="top"
                  offset={10}
                  className="fill-[#e1e0e0] text-md font-semibold tracking-widest"
                />
              </Bar>
            </BarChart>
          </ChartContainer>
        </div>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        {/* <div className="flex gap-2 leading-none font-medium">
          Trending up by 12.4% this year <TrendingUp className="h-4 w-4" />
        </div> */}
        <div className="text-muted-foreground leading-none">
          Total visitors from January to December 2024
        </div>
      </CardFooter>
    </Card>
  );
};

export default MonthChart;
