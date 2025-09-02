"use client"

import { TrendingUp } from "lucide-react"
import { Label, PolarRadiusAxis, RadialBar, RadialBarChart } from "recharts"
import React, { useEffect, useState } from "react" // ✅ 1. Imports are correct
import { toast } from "react-hot-toast"
import axios from "axios"
import { ADMIN_BACKEND_URL } from "@/Constant.jsx"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/Components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/Components/ui/chart"

const initialChartData = [{ Small: 0, Medium: 0, Large: 0 }]

const chartConfig = {
  Small: {
    label: "Small",
    color: "var(--chart-1)",
  },
  Medium: {
    label: "Medium",
    color: "var(--chart-2)",
  },
  Large: {
    label: "Large",
    color: "#9876FF",
  },
}

// ✅ 2. The CenterLabel now accepts the current chart data as a prop
const CenterLabel = ({ viewBox, data }) => {
  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
    // Calculate total from the 'data' prop, not the old constant
    const total = data[0].Small + data[0].Medium + data[0].Large;
    return (
      <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle">
        <tspan
          x={viewBox.cx}
          y={(viewBox.cy || 0) - 16}
          className="fill-[#dbfff5] text-2xl font-bold tracking-wider"
        >
          {total.toLocaleString()}
        </tspan>
        <tspan
          x={viewBox.cx}
          y={(viewBox.cy || 0) + 4}
          className="fill-muted-foreground"
        >
          Box Booked
        </tspan>
      </text>
    )
  }
  return null
}

const BoxStatGraph = () => {
  // ✅ 3. Initialize chartData as a state variable
  const [chartData, setChartData] = useState(initialChartData);

  useEffect(() => {
    const updateChartState = (boxCount) => {
      const newChartData = [{
        Small: boxCount.Small || 0,
        Medium: boxCount.Medium || 0,
        Large: boxCount.Large || 0,
      }];
      // ✅ 4. Use the state setter function to trigger a re-render
      setChartData(newChartData);
    };

    const boxStategraphData = async () => {
      try {
        let accessToken = localStorage.getItem("adminAccessToken");

        if (!accessToken) {
          toast.error("No session found. Please login.");
          return;
        }

        let config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`
          },
          withCredentials: true,
        };

        let res = await axios.get(`${ADMIN_BACKEND_URL}/getBookedBoxStat`, config);

        if (res.data.success === true) {
          updateChartState(res.data.boxCount);
        }
      } catch (error) {
        if (error.response && error.response.status === 401) {
          try {
            const refreshRes = await axios.post(`${ADMIN_BACKEND_URL}/refresh-token`, {}, { withCredentials: true });

            if (refreshRes.data.success === true) {
              const newAccessToken = refreshRes.data.accessToken;
              localStorage.setItem("adminAccessToken", newAccessToken);

              const retryConfig = {
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${newAccessToken}`,
                },
                withCredentials: true,
              };

              const retryRes = await axios.get(`${ADMIN_BACKEND_URL}/getBookedBoxStat`, retryConfig);

              if (retryRes.data.success === true) {
                updateChartState(retryRes.data.boxCount);
              }
            }
          } catch (refreshError) {
            console.error("Refresh token failed:", refreshError);
            localStorage.removeItem("adminAccessToken");
            toast.error("Session expired, please login again");
          }
        } else {
          console.error("Error fetching box statistics:", error);
          toast.error("Failed to fetch box statistics");
        }
      }
    };

    boxStategraphData();
  }, []); // Empty dependency array is correct here


  return (
    <Card className="flex flex-col bg-transparent">
      <CardHeader className="items-center pb-0">
        {/* <CardTitle>Radial Chart - Stacked</CardTitle> */}
        <CardDescription>January - June 2024</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-1 items-center pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square w-full max-w-[250px]"
        >
          <RadialBarChart
            data={chartData}
            endAngle={180}
            innerRadius={80}
            outerRadius={200}
          >
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
              <Label content={<CenterLabel />} />
            </PolarRadiusAxis>
            <RadialBar
              dataKey="Small"
              stackId="a"
              cornerRadius={5}
              fill="var(--color-Small)"
              className="stroke-transparent stroke-2"
            />
            <RadialBar
              dataKey="Medium"
              fill="var(--color-Medium)"
              stackId="b"
              cornerRadius={5}
              className="stroke-transparent stroke-2"
            />
            <RadialBar
              dataKey="Large"
              fill="var(--color-Large)"
              stackId="c"
              cornerRadius={5}
              className="stroke-transparent stroke-2"
            />
          </RadialBarChart>
        </ChartContainer>
      </CardContent>
      {/*  <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 leading-none font-medium">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="text-muted-foreground leading-none">
          Showing total visitors for the last 6 months
        </div>
      </CardFooter> */}
    </Card>
  )
};
  export default BoxStatGraph;
