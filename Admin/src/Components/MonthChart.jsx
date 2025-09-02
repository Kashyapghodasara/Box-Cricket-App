"use client";

import React, { useState, useEffect } from "react";
import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from "recharts";
import axios from "axios";
import toast from "react-hot-toast";
import { ADMIN_BACKEND_URL } from "@/Constant.jsx";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/Components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/Components/ui/chart";
import { useOutletContext } from "react-router-dom";

const initialChartData = [
  { month: "January", count: 0 }, { month: "February", count: 0 },
  { month: "March", count: 0 }, { month: "April", count: 0 },
  { month: "May", count: 0 }, { month: "June", count: 0 },
  { month: "July", count: 0 }, { month: "August", count: 0 },
  { month: "September", count: 0 }, { month: "October", count: 0 },
  { month: "November", count: 0 }, { month: "December", count: 0 },
];

const chartConfig = {
  count: { label: "count", color: "var(--chart-1)" },
};

const MonthChart = () => {
  const [chartData, setChartData] = useState(initialChartData);
  const { isAuthReady } = useOutletContext();

  useEffect(() => {

    // If the 'traffic light' isn't green, do nothing yet.
    if (!isAuthReady) {
      return;
    }

    const token = localStorage.getItem('adminAccessToken');
    if (!token) {
      toast.error("No session found. Please login.");
      return;
    }
    const config = {
      headers: { 'Authorization': `Bearer ${token}` },
      withCredentials: true
    };

    const handleApiCall = async (apiFunc) => {
      try {
        return await apiFunc(config);
      } catch (error) {
        if (error.response && error.response.status === 401) {
          try {
            const res = await axios.post(`${ADMIN_BACKEND_URL}/refresh-token`, {}, { withCredentials: true });
            if (res.data.success) {
              const { accessToken } = res.data;
              localStorage.setItem('adminAccessToken', accessToken);
              const newConfig = {
                ...config, headers: { ...config.headers, 'Authorization': `Bearer ${accessToken}` }
              };
              return await apiFunc(newConfig);
            }
          } catch (refreshError) {
            console.error("Token refresh failed:", refreshError);
            toast.error("Session expired. Please login again.");
            localStorage.removeItem('adminAccessToken');
          }
        } else {
          throw error;
        }
      }
    };

    const monthlyBookingStat = async () => {
      await handleApiCall(async (currentConfig) => {
        const res = await axios.get(`${ADMIN_BACKEND_URL}/monthlyBookingStat`, currentConfig);
        if (res.data.success) {
          const updatedChart = [...initialChartData];
          res.data.monthlyBookings.forEach(item => {
            const idx = updatedChart.findIndex(m => m.month === item.month);
            if (idx !== -1) {
              updatedChart[idx].count = item.count;
            }
          });
          setChartData(updatedChart);
        }
      }).catch((error) => {
        console.error("Could not fetch monthly booking stats:", error);
      });
    };
    monthlyBookingStat();
  }, []);

  if (!chartData || chartData.length === 0) {
    return (
      <Card><CardHeader><CardTitle>Monthly Bookings</CardTitle></CardHeader><CardContent><div>Loading stats...</div></CardContent></Card>
    )
  }
  
  return (
    <Card className="w-full sm:w-full bg-[#0c0c0c] text-white">
      <div><CardHeader><CardTitle>Monthly Bookings</CardTitle><CardDescription>January - December 2025</CardDescription></CardHeader></div>
      <CardContent>
        <div className="w-[89%] mx-auto pl-4 mt-0">
          <ChartContainer config={chartConfig}>
            <BarChart data={chartData} margin={{ top: 15 }} padding={{ top: 20, right: 30, left: 20, bottom: 5 }} width={800} height={500}>
              <CartesianGrid vertical={false} />
              <XAxis dataKey="month" tickLine={false} tickMargin={10} axisLine={false} tickFormatter={(value) => value.slice(0, 3)} stroke="#345679" />
              <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
              <Bar dataKey="count" fill="var(--color-count)" radius={8}>
                <LabelList position="top" offset={10} className="fill-[#e1e0e0] text-md font-semibold tracking-widest" />
              </Bar>
            </BarChart>
          </ChartContainer>
        </div>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="text-muted-foreground leading-none">Total visitors from January to December 2024</div>
      </CardFooter>
    </Card>
  );
};
export default MonthChart;