"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer
} from "recharts"
import { useEffect, useState } from "react"

interface StageData {
  name: string
  value: number
  color: string
}

interface StageDistributionChartProps {
  title: string
  subtitle?: string
  totalValue: string
  percentageChange: string
  changeType: 'positive' | 'negative'
  data: StageData[]
  className?: string
}

export function StageDistributionChart({ 
  title, 
  subtitle,
  totalValue, 
  percentageChange, 
  changeType,
  data,
  className 
}: StageDistributionChartProps) {
  const [isClient, setIsClient] = useState(false)

  // Prevent hydration mismatch by only rendering charts on client
  useEffect(() => {
    setIsClient(true)
  }, [])

  const defaultColors = [
    '#5E17EB', '#7B2FEB', '#9845EB', '#B55CEB', 
    '#D273EB', '#EF8AEB', '#FF9EEB', '#FFB5EB'
  ]

  const enhancedData = data.map((item, index) => ({
    ...item,
    color: item.color || defaultColors[index % defaultColors.length]
  }))

  return (
    <Card className={`bg-[#000000] border border-[#1a1a1c] rounded-xl shadow-md transition-all duration-200 hover:shadow-lg ${className}`}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 pt-4 px-4">
        <div>
          <CardTitle className="text-sm font-medium text-gray-400">{title}</CardTitle>
          {subtitle && (
            <p className="text-xs text-gray-500 mt-1">{subtitle}</p>
          )}
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <div className="text-2xl font-bold text-white mb-1">{totalValue}</div>
        <p className={`text-xs mb-4 ${changeType === 'positive' ? 'text-green-400' : 'text-red-400'}`}>
          {percentageChange} vs Last 31 Days
        </p>
        
        {/* Chart and legend container */}
        <div className="flex flex-col lg:flex-row items-center justify-center gap-4">
          {/* Donut Chart */}
          <div className="relative">
            {isClient && enhancedData.length > 0 && (
              <ResponsiveContainer width={200} height={200}>
                <PieChart>
                  <Pie
                    data={enhancedData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {enhancedData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1a1a1c', 
                      border: '1px solid #374151',
                      borderRadius: '6px',
                      color: 'white'
                    }}
                    formatter={(value: any, name: any) => [`${value}`, name]}
                  />
                </PieChart>
              </ResponsiveContainer>
            )}
            
            {/* Center value */}
            {isClient && (
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-2xl font-bold text-white">{totalValue}</span>
              </div>
            )}
            
            {/* Placeholder while chart loads */}
            {!isClient && (
              <div className="w-[200px] h-[200px] bg-gray-800/20 rounded-full animate-pulse relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 bg-gray-700/20 rounded-full animate-pulse" />
                </div>
              </div>
            )}
          </div>
          
          {/* Legend */}
          <div className="w-full lg:w-auto mt-4 lg:mt-0 lg:ml-4">
            <div className="grid grid-cols-2 lg:grid-cols-1 gap-2">
              {enhancedData.map((entry, index) => (
                <div key={index} className="flex items-center text-sm py-1">
                  <div
                    className="w-3 h-3 rounded-full mr-3 flex-shrink-0"
                    style={{ backgroundColor: entry.color }}
                  />
                  <div className="flex-1 min-w-0">
                    <span className="text-gray-300 text-xs truncate block">
                      {entry.name}
                    </span>
                    <span className="text-gray-400 text-xs">
                      {entry.value} ({((entry.value / enhancedData.reduce((sum, item) => sum + item.value, 0)) * 100).toFixed(1)}%)
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
} 