"use client";

import React from "react";
import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

/* export const description = "A bar chart with monthly labels"; */

const chartData = [
  { month: "January", desktop: 186 },
  { month: "February", desktop: 305 },
  { month: "March", desktop: 237 },
  { month: "April", desktop: 73 },
  { month: "May", desktop: 209 },
  { month: "June", desktop: 214 },
  { month: "July", desktop: 289 },
  { month: "August", desktop: 331 },
  { month: "September", desktop: 178 },
  { month: "October", desktop: 250 },
  { month: "November", desktop: 192 },
  { month: "December", desktop: 310 },
];

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "var(--chart-1)",
  },
};

const MonthChart = () => {
  return (
    <Card className="w-full sm:w-full   bg-[#0c0c0c] text-white">
      <div className="">
        <CardHeader>
          <CardTitle>Monthly Bookings</CardTitle>
          <CardDescription>January - December 2024</CardDescription>
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
              <Bar dataKey="desktop" fill="var(--color-desktop)" radius={8}>
                <LabelList
                  position="top"
                  offset={10}
                  className="fill-[#ffffff] text-md font-semibold"
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
