"use client"

import type React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { ArrowDownIcon, ArrowRightIcon, ArrowUpIcon } from "lucide-react"

interface StatsCardProps {
  title: string
  value: number
  percentChange: number
  icon?: React.ReactNode
  variant?: "default" | "success" | "error" | "warning" | "info"
  className?: string
}

export function StatsCard({ title, value, percentChange, icon, variant = "default", className }: StatsCardProps) {
  const isPositive = percentChange > 0
  const isNeutral = percentChange === 0

  const getVariantStyles = () => {
    switch (variant) {
      case "success":
        return "bg-[#000000] text-[#82ff90] border-[#82ff90]/20"
      case "error":
        return "bg-[#000000] text-[#d782ff] border-[#d782ff]/20"
      case "warning":
        return "bg-[#000000] text-[#fd82ff] border-[#fd82ff]/20"
      case "info":
        return "bg-[#000000] text-[#82ecff] border-[#82ecff]/20"
      default:
        return "bg-[#000000] text-[#8280ff] border-[#8280ff]/20"
    }
  }

  return (
    <Card
      className={cn(
        "border border-[#1a1a1c] rounded-xl transition-all duration-200 hover:shadow-lg hover:scale-[1.02]",
        getVariantStyles(),
        className,
      )}
    >
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="text-sm font-medium">{title}</div>
          {icon}
        </div>
        <div className="text-2xl font-bold mt-2">{value}</div>
        <div className="flex items-center mt-2 text-xs text-gray-400">
          {isNeutral ? (
            <ArrowRightIcon className="h-4 w-4 mr-1" />
          ) : isPositive ? (
            <ArrowUpIcon className="h-4 w-4 mr-1" />
          ) : (
            <ArrowDownIcon className="h-4 w-4 mr-1" />
          )}
          <span>
            {isPositive ? "+" : ""}
            {percentChange}% vs last month
          </span>
        </div>
      </CardContent>
    </Card>
  )
}
