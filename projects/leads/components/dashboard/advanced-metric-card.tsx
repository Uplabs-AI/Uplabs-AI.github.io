"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from "recharts"
import { useEffect, useState } from "react"

interface AdvancedMetricCardProps {
  title: string
  value: string
  percentageChange: string
  changeType: 'positive' | 'negative'
  chartType: 'progress' | 'bar' | 'pie'
  chartData?: any[]
  chartColor?: string
  className?: string
}

export function AdvancedMetricCard({ 
  title, 
  value, 
  percentageChange, 
  changeType, 
  chartType,
  chartData = [],
  chartColor = "#5E17EB",
  className 
}: AdvancedMetricCardProps) {
  const [isClient, setIsClient] = useState(false)

  // Prevent hydration mismatch by only rendering charts on client
  useEffect(() => {
    setIsClient(true)
  }, [])

  const progressValue = chartType === 'progress' ? parseInt(value) : 0

  return (
    <Card className={`bg-[#000000] border border-[#1a1a1c] rounded-xl shadow-md transition-all duration-200 hover:shadow-lg hover:scale-[1.02] ${className}`}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 pt-4 px-4">
        <CardTitle className="text-sm font-medium text-gray-400">{title}</CardTitle>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <div className="text-2xl font-bold text-white mb-1">{value}</div>
        <p className={`text-xs mb-4 ${changeType === 'positive' ? 'text-green-400' : 'text-red-400'}`}>
          {percentageChange} vs Last 31 Days
        </p>
        
        {/* Chart container */}
        <div className="h-24 flex items-center justify-center">
          {isClient && chartType === 'progress' && (
            <div className="flex items-center justify-center">
              <span className="text-4xl font-bold text-white">{progressValue}</span>
            </div>
          )}
          
          {isClient && chartType === 'bar' && chartData.length > 0 && (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 10, right: 10, left: 10, bottom: 10 }}>
                <defs>
                  <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#A855F7" stopOpacity={0.9} />
                    <stop offset="100%" stopColor="#5E17EB" stopOpacity={0.7} />
                  </linearGradient>
                </defs>
                <XAxis 
                  dataKey="name" 
                  tick={{ fill: "#9CA3AF", fontSize: 10 }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis hide />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1a1a1c', 
                    border: '1px solid #374151',
                    borderRadius: '6px',
                    color: 'white'
                  }}
                />
                <Bar 
                  dataKey="value" 
                  fill="url(#barGradient)"
                  radius={[6, 6, 2, 2]}
                  stroke="#8B5CF6"
                  strokeWidth={1}
                />
              </BarChart>
            </ResponsiveContainer>
          )}
          
          {isClient && chartType === 'pie' && chartData.length > 0 && (
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={25}
                  outerRadius={35}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color || chartColor} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1a1a1c', 
                    border: '1px solid #374151',
                    borderRadius: '6px',
                    color: 'white'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          )}
          
          {/* Placeholder while chart loads */}
          {!isClient && chartType === 'progress' && (
            <div className="h-10 w-16 bg-gray-800/20 rounded animate-pulse" />
          )}
          {!isClient && chartType !== 'progress' && (
            <div className="h-20 w-20 bg-gray-800/20 rounded-full animate-pulse" />
          )}
        </div>
      </CardContent>
    </Card>
  )
} 