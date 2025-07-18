"use client"

import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"
import { useExport } from "@/lib/hooks/use-export"
import { useToast } from "@/components/ui/use-toast"
import type { DashboardMetrics, Call } from "@/lib/types"

interface ExportButtonProps {
  metrics: DashboardMetrics
  calls: Call[]
  disabled?: boolean
  className?: string
}

export function ExportButton({ metrics, calls, disabled = false, className }: ExportButtonProps) {
  const { isExporting, exportToExcel } = useExport()
  const { toast } = useToast()

  const handleExport = async () => {
    const { success, error } = await exportToExcel(metrics, calls)

    if (success) {
      toast({
        title: "Export Successful",
        description: "Excel file has been downloaded successfully.",
      })
    } else {
      toast({
        title: "Export Failed",
        description: error || "Could not generate Excel file. Please try again.",
        variant: "destructive",
      })
    }
  }

  return (
    <Button
      className={`bg-[#5E17EB] hover:bg-[#5E17EB]/90 text-white transition-all duration-200 hover:scale-105 ${className}`}
      onClick={handleExport}
      disabled={disabled || isExporting}
    >
      <Download className="h-4 w-4 mr-2" />
      {isExporting ? "Exporting..." : "Export"}
    </Button>
  )
}
