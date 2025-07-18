import React from "react"
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import {
  LayoutGrid,
  List,
  Import,
  Plus,
  MoreVertical,
} from "lucide-react"
import Link from "next/link"

interface PipelineRibbonProps {
  pipelines: string[]
  selectedPipeline: string
  onPipelineChange?: (value: string) => void
  opportunityCount: number
  view: "kanban" | "list"
  onViewChange?: (view: "kanban" | "list") => void
  onImport?: () => void
}

export const PipelineRibbon: React.FC<PipelineRibbonProps> = ({
  pipelines,
  selectedPipeline,
  onPipelineChange,
  opportunityCount,
  view,
  onViewChange,
  onImport,
}) => {
  return (
    <div className="flex items-center justify-between p-4 border-b border-border bg-transparent">
      {/* Left */}
      <div className="flex items-center gap-4">
        <div className="w-64 max-w-[300px]">
          <Select value={selectedPipeline} onValueChange={onPipelineChange}>
            <SelectTrigger className="h-8 bg-background text-sm">
              <SelectValue placeholder="Select pipeline" />
            </SelectTrigger>
            <SelectContent className="bg-[#0A0A0A] text-white border border-[#1a1a1c]">
              {pipelines.map((p) => (
                <SelectItem key={p} value={p} className="cursor-pointer text-sm">
                  {p}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="text-sm text-gray-400">
          {opportunityCount.toLocaleString("en-US")} opportunities
        </div>
      </div>

      {/* Right */}
      <div className="flex items-center gap-2">
        {/* View toggles */}
        <Button
          size="icon"
          variant="ghost"
          className={view === "kanban" ? "text-primary" : "text-gray-400 hover:text-white"}
          onClick={() => onViewChange?.("kanban")}
        >
          <LayoutGrid className="h-4 w-4" />
        </Button>
        <Button
          size="icon"
          variant="ghost"
          className={view === "list" ? "text-primary" : "text-gray-400 hover:text-white"}
          onClick={() => onViewChange?.("list")}
        >
          <List className="h-4 w-4" />
        </Button>

        {/* Import button */}
        <Button
          variant="secondary"
          size="sm"
          className="h-8 gap-1 bg-[#1a1a1c] border-[#374151] text-white ml-2"
          onClick={onImport}
        >
          <Import className="h-4 w-4 mr-1" /> Import
        </Button>

        {/* Add Opportunity */}
        <Link href="/opportunities/new" passHref>
          <Button className="bg-[#5E17EB] hover:bg-[#5E17EB]/90 text-white h-8 px-3 ml-2">
            <Plus className="h-4 w-4 mr-1" /> Add opportunity
          </Button>
        </Link>

        {/* More button */}
        <Button size="icon" variant="ghost" className="text-gray-400 hover:text-white ml-2">
          <MoreVertical className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
} 