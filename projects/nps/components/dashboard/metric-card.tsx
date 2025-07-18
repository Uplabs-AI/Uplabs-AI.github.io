"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Area, AreaChart, ResponsiveContainer, XAxis } from "recharts"
import type { ChartDataPoint } from "@/lib/types"

interface MetricCardProps {
  title: string
  value: string | number
  chartData: ChartDataPoint[]
  chartColor?: string
  className?: string
}

export function MetricCard({ title, value, chartData, chartColor = "#8280ff", className }: MetricCardProps) {
  return (
    <Card
      className={`bg-[#000000] border border-[#1a1a1c] rounded-xl overflow-hidden transition-all duration-200 hover:shadow-lg hover:scale-[1.02] ${className}`}
    >
      <CardHeader className="pb-2 pt-4 px-4">
        <CardTitle className="text-sm font-medium text-gray-400">{title}</CardTitle>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <div className="text-3xl font-bold text-white mb-4">{value}</div>
        {chartData && (
          <div className="h-[80px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 5, right: 0, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id={`color-${title}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={chartColor} stopOpacity={0.8} />
                    <stop offset="100%" stopColor={chartColor} stopOpacity={0.2} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="date" tick={{ fill: "#626262", fontSize: 8 }} axisLine={false} tickLine={false} />
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke={chartColor}
                  strokeWidth={2}
                  fillOpacity={1}
                  fill={`url(#color-${title})`}
                  dot={{ r: 2, fill: chartColor, strokeWidth: 0 }}
                  activeDot={{ r: 3, fill: "#fff", strokeWidth: 0 }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
