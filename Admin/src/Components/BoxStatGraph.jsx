"use client"

import { TrendingUp } from "lucide-react"
import { Label, PolarRadiusAxis, RadialBar, RadialBarChart } from "recharts"
import React from "react"
import { toast } from "react-hot-toast"
import axios from "axios"
import { useEffect, useState } from "react"
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


const chartData = [{ Small: 1260, Medium: 570, Large: 756 }]

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

const CenterLabel = ({ viewBox }) => {
  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
    return (
      <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle">
        <tspan
          x={viewBox.cx}
          y={(viewBox.cy || 0) - 16}
          className="fill-[#dbfff5] text-2xl font-bold tracking-wider"
        >
          {(
            chartData[0].Small + chartData[0].Medium + chartData[0].Large
          ).toLocaleString()}
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

  useEffect(() => {
    const boxStategraphData = async () => {
      try {
        let accessToken = localStorage.getItem("adminAccessToken");

        let config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`   // ✅ send access token
          },
          withCredentials: true,  // so refresh cookie works if needed
        };

        let res = await axios.get(`${ADMIN_BACKEND_URL}/getBookedBoxStat`, config);

        // ✅ If success
        if (res.data.success === true) {
          chartData[0].Small = res.data.boxCount.Small;
          chartData[0].Medium = res.data.boxCount.Medium;
          chartData[0].Large = res.data.boxCount.Large;
        }
      } catch (error) {
        // ✅ If access token expired
        if (error.response && error.response.status === 401) {
          try {
            // call refresh API (it uses httpOnly cookie automatically)
            const refreshRes = await axios.post(`${ADMIN_BACKEND_URL}/refresh-token`, {}, { withCredentials: true });

            if (refreshRes.data.success === true) {
              // save new access token
              localStorage.setItem("adminAccessToken", refreshRes.data.accessToken);

              // retry original request with new token
              const retryConfig = {
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${refreshRes.data.accessToken}`,
                },
                withCredentials: true,
              };

              const retryRes = await axios.get(`${ADMIN_BACKEND_URL}/getBookedBoxStat`, retryConfig);

              if (retryRes.data.success === true) {
                chartData[0].Small = retryRes.data.boxCount.Small;
                chartData[0].Medium = retryRes.data.boxCount.Medium;
                chartData[0].Large = retryRes.data.boxCount.Large;
              }
            }
          } catch (refreshError) {
            console.error("Refresh token failed:", refreshError);
            toast.error("Session expired, please login again");
            window.location.href = "/admin-login";
          }
        } else {
          console.error("Error fetching box statistics:", error);
          toast.error("Failed to fetch box statistics");
        }
      }
    };


    boxStategraphData();
  }, [])



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
}

export default BoxStatGraph
