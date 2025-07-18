"use client"

import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

interface CampaignSearchProps {
  value: string
  onChange: (value: string) => void
  className?: string
}

export function CampaignSearch({ value, onChange, className }: CampaignSearchProps) {
  return (
    <div className={`relative w-80 ${className}`}>
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
      <Input
        type="text"
        placeholder="Buscar campaña..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="pl-10 pr-4 py-2 bg-[#374151] border-[#374151] text-white placeholder-gray-400 focus:border-[#7c3aed] focus:ring-1 focus:ring-[#7c3aed] rounded-lg"
      />
    </div>
  )
}
