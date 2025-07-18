"use client"

import { useState } from "react"
import { exportService } from "@/lib/services/export-service"
import type { DashboardMetrics, Call } from "@/lib/types"

export const useExport = () => {
  const [isExporting, setIsExporting] = useState(false)

  const exportToExcel = async (metrics: DashboardMetrics, calls: Call[]) => {
    setIsExporting(true)

    try {
      const fileName = `dashboard-data-${new Date().toISOString().split("T")[0]}.xlsx`
      const success = exportService.exportToExcel({ metrics, calls }, fileName)

      return { success, error: success ? null : "Export failed" }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Export failed",
      }
    } finally {
      setIsExporting(false)
    }
  }

  return {
    isExporting,
    exportToExcel,
  }
}
