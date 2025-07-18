"use client"

import { useEnterpriseStore } from "@/lib/stores/enterprise-store"
import { Building2 } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export function EnterpriseIndicator() {
  const { selectedEnterprise } = useEnterpriseStore()

  if (!selectedEnterprise) {
    return null
  }

  return (
    <div className="flex items-center gap-2 px-3 py-2 bg-[#05000e] border border-[#333333] rounded-lg">
      <div 
        className="w-3 h-3 rounded-full" 
        style={{ backgroundColor: selectedEnterprise.colorBar }}
      />
      <Building2 className="w-4 h-4 text-[#9ca3af]" />
      <span className="text-sm font-medium text-white">
        {selectedEnterprise.name}
      </span>
      <Badge variant="secondary" className="ml-auto bg-[#1a1a1c] text-[#9ca3af] border-[#333333]">
        Activa
      </Badge>
    </div>
  )
} 