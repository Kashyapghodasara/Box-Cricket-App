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

// ✅ Renamed to use as the initial state
const initialChartData = [
  { Method: "UPI", count: 0, fill: "var(--color-UPI)" },
  { Method: "Bank Transfer", count: 0, fill: "var(--color-BankTransfer)" },
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

// ✅ The CenterLabel now reads from the 'data' prop
const CenterLabel = ({ viewBox, data }) => {
  const total = data.reduce((acc, curr) => acc + curr.count, 0)

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
  // ✅ Initialize the chart data as a state variable
  const [chartData, setChartData] = React.useState(initialChartData);

  React.useEffect(() => {
    const token = localStorage.getItem('adminAccessToken');

    if (!token) {
      toast.error("No session found. Please login.");
      return;
    }

    const config = {
      headers: {
        'Authorization': `Bearer ${token}`
      },
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
                ...config,
                headers: {
                  ...config.headers,
                  'Authorization': `Bearer ${accessToken}`
                }
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

    const fetchPaymentMethodStat = async () => {
      await handleApiCall(async (currentConfig) => {
        const res = await axios.get(`${ADMIN_BACKEND_URL}/getPaymentMethodStat`, currentConfig);

        if (res.data.success) {
          // ✅ Correctly update the state
          const newChartData = [...initialChartData];
          newChartData[0].count = res.data.paymentMethodCount.UPI || 0;
          newChartData[1].count = res.data.paymentMethodCount.BankTransfer || 0;
          setChartData(newChartData); // Use the state setter
        }
      }).catch((error) => {
        console.error("Error in PaymentStatGraph:", error);
      });
    };

    fetchPaymentMethodStat();
  }, []);

  // ... YOUR RETURN JSX GOES HERE ...
  // Remember to pass the chartData state to the CenterLabel like this:
  // <Label content={<CenterLabel data={chartData} />} />
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
