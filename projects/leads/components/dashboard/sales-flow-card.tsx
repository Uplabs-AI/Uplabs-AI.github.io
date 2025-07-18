"use client"

import { Line, LineChart, ResponsiveContainer, XAxis } from "recharts"
import { TrendingUp, TrendingDown } from "lucide-react"
import { cn } from "@/lib/utils"
import type { ChartDataPoint } from "@/lib/types"
import { useEffect, useState } from "react"

interface SalesFlowCardProps {
  title: string
  value: number
  percentChange: number
  chartColor: string
  chartData: ChartDataPoint[]
  className?: string
}

export function SalesFlowCard({ 
  title, 
  value, 
  percentChange, 
  chartColor, 
  chartData, 
  className 
}: SalesFlowCardProps) {
  const [isClient, setIsClient] = useState(false)
  const isPositive = percentChange >= 0
  const TrendIcon = isPositive ? TrendingUp : TrendingDown

  useEffect(() => {
    setIsClient(true)
  }, [])

  return (
    <div
      className={cn(
        "shadow-sm border rounded-xl transition-all duration-200 hover:shadow-lg hover:scale-[1.02] bg-[#000000] border-[#1a1a1c]",
        className
      )}
    >
      <div className="p-4">
        <div className="flex items-center justify-between">
          <div className="text-lg font-medium text-gray-400">{title}</div>
        </div>
        
        <div className="text-2xl font-bold mt-2 text-white">
          {value.toLocaleString("en-US")}
        </div>
        
        <div className={cn(
          "flex items-center mt-2 text-xs",
          isPositive ? "text-green-400" : "text-red-400"
        )}>
          <TrendIcon className="h-4 w-4 mr-1" />
          <span>{isPositive ? "+" : ""}{percentChange}% vs last month</span>
        </div>
        
        {isClient && chartData && chartData.length > 0 && (
          <div className="h-[60px] mt-3">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData} margin={{ top: 5, right: 0, left: 0, bottom: 0 }}>
                <XAxis 
                  dataKey="month" 
                  tick={{ fill: "#626262", fontSize: 8 }} 
                  axisLine={false} 
                  tickLine={false} 
                />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke={chartColor}
                  strokeWidth={2}
                  dot={false}
                  activeDot={{ r: 3, fill: chartColor, strokeWidth: 0 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}
        
        {!isClient && (
          <div className="h-[60px] mt-3 bg-gray-800/20 rounded animate-pulse" />
        )}
      </div>
    </div>
  )
} 