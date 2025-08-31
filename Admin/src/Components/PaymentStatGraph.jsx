"use client"

import * as React from "react"
import { TrendingUp } from "lucide-react"
import { Label, Pie, PieChart } from "recharts"
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
import { hex } from "motion"

const chartData = [
  { Method: "UPI", count: 0, fill: "var(--color-UPI)" },
  { Method: "Bank Transfer", count: 0, fill: "var(--color-BankTransfer)" },
  /*  { browser: "firefox", visitors: 287, fill: "var(--color-firefox)" },
   { browser: "edge", visitors: 173, fill: "var(--color-edge)" },
   { browser: "other", visitors: 190, fill: "var(--color-other)" }, */
]

const chartConfig = {
  count: {
    label: "Visitors",
  },
  UPI: {
    label: "UPI",
    color: "var(--chart-1)",
  },
  BankTransfer: {
    label: "Bank Transfer",
    color: "var(--chart-2)",
  }
}

const CenterLabel = ({ viewBox }) => {
  const total = chartData.reduce((acc, curr) => acc + curr.count, 0)

  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
    return (
      <text
        x={viewBox.cx}
        y={viewBox.cy}
        textAnchor="middle"
        dominantBaseline="middle"
      >
        <tspan
          x={viewBox.cx}
          y={viewBox.cy}
          className="fill-[#dbfff5] text-3xl font-bold"
        >
          {total.toLocaleString()}
        </tspan>
        <tspan
          x={viewBox.cx}
          y={(viewBox.cy || 0) + 25}
          className="fill-muted-foreground"
        >
          Payment Method
        </tspan>
      </text>
    )
  }
  return null
}

const PaymentStatGraph = () => {

  React.useEffect(() => {
    const handleApiCall = async (apiFunc) => {
      try {
        return await apiFunc();
      } catch (error) {
        if (error.response && error.response.status === 401) {
          try {
            // Refresh token
            await axios.post(`${ADMIN_BACKEND_URL}/refresh-token`, {}, { withCredentials: true });
            // Retry the original call
            return await apiFunc();
          } catch (refreshError) {
            console.error("Token refresh failed:", refreshError);
            toast.error("Session expired. Please login again.");
          }
        } else {
          throw error;
        }
      }
    };

    const fetchPaymentMethodStat = async () => {
      await handleApiCall(async () => {
        const config = {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        };

        const res = await axios.get(`${ADMIN_BACKEND_URL}/getPaymentMethodStat`, config);

        if (res.data.success) {
          // ✅ create a copy instead of mutating
          const updatedChart = [...chartData];
          updatedChart[0].count = res.data.paymentMethodCount.UPI || 0;
          updatedChart[1].count = res.data.paymentMethodCount.BankTransfer || 0;

          setChartData(updatedChart);
        }
      }).catch((error) => {
        console.error("Error in PaymentStatGraph:", error);
        toast.error("Failed to load payment statistics");
      });
    };

    fetchPaymentMethodStat();
  }, []);


  return (
    <Card className="flex flex-col bg-transparent">
      <CardHeader className="items-center pb-0 text-md">
        {/* <CardTitle>Pie Chart - Donut with Text</CardTitle> */}
        <CardDescription>January - June 2024</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent hideLabel className="text-[#151515] font-extrabold" />
              }
            />

            <Pie
              data={chartData}
              dataKey="count"
              nameKey="Method"
              innerRadius={65}
              strokeWidth={4}
            >
              <Label content={<CenterLabel />} />
            </Pie>
          </PieChart>
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

export default PaymentStatGraph
