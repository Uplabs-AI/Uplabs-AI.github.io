"use client"

import { useEffect, useState } from "react"

interface FunnelData {
  name: string
  value: number
  cumulative: number
  nextStepConversion: number
  color?: string
}

interface FunnelChartProps {
  title: string
  subtitle?: string
  value: string
  percentageChange: string
  changeType: 'positive' | 'negative'
  data: FunnelData[]
  className?: string
}

export function FunnelChart({ 
  title, 
  subtitle,
  value, 
  percentageChange, 
  changeType,
  data,
  className 
}: FunnelChartProps) {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) return <div className="h-96 bg-gray-800/20 rounded-xl animate-pulse" />

  return (
    <div className={`bg-[#0A0A0A] border border-[#1a1a1c] rounded-xl p-4 text-xs ${className || ''}`}>
      <style>{`
        .funnel-row { display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #1a1a1c; padding-bottom: 8px; }
        .funnel-badge { background: #e5e7eb; color: #111827; padding: 2px 4px; border-radius: 4px; }
        .funnel-bar { background: rgb(107 114 128 / 0.2); height: 6px; border-radius: 3px; flex: 1; }
      `}</style>
      
      <h3 className="text-sm text-gray-400 font-medium">{title}</h3>
      {subtitle && <p className="text-gray-500">{subtitle}</p>}
      
      <div className="text-2xl font-bold text-white mt-3">{value}</div>
      <p className={`mb-4 ${changeType === 'positive' ? 'text-green-400' : 'text-red-400'}`}>
        {percentageChange} vs Last 31 Days
      </p>
      
      <div className="space-y-2">
        {data.map((item, i) => (
          <div key={i} className="funnel-row">
            <span className="text-gray-300 truncate w-32">{item.name}</span>
            <div className="flex items-center gap-2 flex-1 mx-3">
              <div 
                className="funnel-bar" 
                style={{ 
                  background: `linear-gradient(to right, ${item.color} ${item.cumulative}%, rgb(107 114 128 / 0.2) ${item.cumulative}%)` 
                }}
              />
              <span className="text-gray-400">{Math.round(item.cumulative)}%</span>
            </div>
            <span className="funnel-badge">{item.nextStepConversion.toFixed(0)}%</span>
          </div>
        ))}
      </div>
    </div>
  )
} 