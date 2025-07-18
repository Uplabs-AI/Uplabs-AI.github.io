"use client"

import { Button } from "@/components/ui/button"
import type { CampaignStatus } from "@/lib/types/campaign"

interface CampaignTabsProps {
  activeTab: CampaignStatus
  onTabChange: (tab: CampaignStatus) => void
  className?: string
}

const tabs: { key: CampaignStatus; label: string }[] = [
  { key: "all", label: "Todas" },
  { key: "active", label: "Activas" },
  { key: "paused", label: "Pausadas" },
  { key: "completed", label: "Completadas" },
]

export function CampaignTabs({ activeTab, onTabChange, className }: CampaignTabsProps) {
  return (
    <div className={`flex space-x-6 border-b border-[#374151] ${className}`}>
      {tabs.map((tab) => (
        <Button
          key={tab.key}
          variant="ghost"
          onClick={() => onTabChange(tab.key)}
          className={`px-0 py-3 text-sm font-medium rounded-none border-b-2 transition-all duration-200 hover:bg-transparent ${
            activeTab === tab.key
              ? "text-white border-b-white"
              : "text-gray-400 border-b-transparent hover:text-gray-300"
          }`}
        >
          {tab.label}
        </Button>
      ))}
    </div>
  )
}
