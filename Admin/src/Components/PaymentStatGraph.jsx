"use client"

import * as React from "react"
import { Label, Pie, PieChart } from "recharts"
import { toast } from "react-hot-toast"
import axios from "axios"
import { ADMIN_BACKEND_URL } from "@/Constant.jsx"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/Components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/Components/ui/chart"
import { useOutletContext } from "react-router-dom";


const initialChartData = [
  { Method: "UPI", count: 0, fill: "var(--color-UPI)" },
  { Method: "Bank Transfer", count: 0, fill: "var(--color-BankTransfer)" },
]

const chartConfig = {
  count: { label: "Visitors" },
  UPI: { label: "UPI", color: "var(--chart-1)" },
  BankTransfer: { label: "Bank Transfer", color: "var(--chart-2)" }
}

const CenterLabel = ({ viewBox, data }) => {
  if (!data || data.length === 0) return null; // Defensive check
  const total = data.reduce((acc, curr) => acc + curr.count, 0)

  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
    return (
      <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle" dominantBaseline="middle">
        <tspan x={viewBox.cx} y={viewBox.cy} className="fill-[#dbfff5] text-3xl font-bold">{total.toLocaleString()}</tspan>
        <tspan x={viewBox.cx} y={(viewBox.cy || 0) + 25} className="fill-muted-foreground">Payment Method</tspan>
      </text>
    )
  }
  return null
}

const PaymentStatGraph = () => {
  const [chartData, setChartData] = React.useState(initialChartData);
  const { isAuthReady } = useOutletContext();


  React.useEffect(() => {

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

    const fetchPaymentMethodStat = async () => {
      await handleApiCall(async (currentConfig) => {
        const res = await axios.get(`${ADMIN_BACKEND_URL}/getPaymentMethodStat`, currentConfig);
        if (res.data.success) {
          const newChartData = [...initialChartData];
          newChartData[0].count = res.data.paymentMethodCount.UPI || 0;
          newChartData[1].count = res.data.paymentMethodCount.BankTransfer || 0;
          setChartData(newChartData);
        }
      }).catch((error) => {
        console.error("Error in PaymentStatGraph:", error);
      });
    };

    fetchPaymentMethodStat();
  }, []);

  if (!chartData || chartData.length === 0) {
    return (
      <Card><CardHeader><CardTitle>Payment Methods</CardTitle></CardHeader><CardContent><div>Loading stats...</div></CardContent></Card>
    )
  }

  return (
    <Card className="flex flex-col bg-transparent">
      <CardHeader className="items-center pb-0 text-md"><CardDescription>January - June 2024</CardDescription></CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer config={chartConfig} className="mx-auto aspect-square max-h-[250px]">
          <PieChart>
            <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel className="text-[#151515] font-extrabold" />} />
            <Pie data={chartData} dataKey="count" nameKey="Method" innerRadius={65} strokeWidth={4}>
              {/* ✅ THE FIX IS HERE - Passing the data prop */}
              <Label content={<CenterLabel data={chartData} />} />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
export default PaymentStatGraph;