import * as XLSX from "xlsx"
import type { Call, DashboardMetrics } from "@/lib/types"

interface ExportData {
  metrics: DashboardMetrics
  calls: Call[]
}

export class ExportService {
  exportToExcel(data: ExportData, fileName = "dashboard-data.xlsx"): boolean {
    try {
      const metricsData = [
        ["Dashboard Metrics", ""],
        ["Total Call Minutes", data.metrics.totalCallMinutes],
        ["Number of Calls", data.metrics.numberOfCalls],
        ["Total Expense", `$${data.metrics.totalExpense.toFixed(2)}`],
        ["Average Cost per Call", `$${data.metrics.averageCostPerCall.toFixed(2)}`],
        ["Balance", `$${data.metrics.balance.toFixed(2)}`],
        ["Total Calls", data.metrics.totalCalls],
        ["Transferred Calls", data.metrics.transferredCalls],
        ["Successful Calls", data.metrics.successfulCalls],
        ["Failed Calls", data.metrics.failedCalls],
      ]

      const callsHeaders = [
        "ID",
        "Assistant",
        "Assistant Phone",
        "Client Phone",
        "Finalization Reason",
        "Evaluation",
        "Start Time",
        "Duration",
        "Cost",
        "Status",
      ]

      const callsData = data.calls.map((call) => [
        call.id,
        call.assistant,
        call.assistantPhoneNumber,
        call.clientPhoneNumber,
        call.finalizationReason,
        call.successEvaluation,
        call.startTime,
        call.duration,
        `$${call.cost.toFixed(2)}`,
        call.status === "success" ? "Successful" : "Failed",
      ])

      const wb = XLSX.utils.book_new()
      const metricsSheet = XLSX.utils.aoa_to_sheet(metricsData)
      const callsSheet = XLSX.utils.aoa_to_sheet([callsHeaders, ...callsData])

      XLSX.utils.book_append_sheet(wb, metricsSheet, "Metrics")
      XLSX.utils.book_append_sheet(wb, callsSheet, "Calls")

      const wbout = XLSX.write(wb, { bookType: "xlsx", type: "array" })
      const blob = new Blob([wbout], { type: "application/octet-stream" })

      const url = window.URL.createObjectURL(blob)
      const link = document.createElement("a")
      link.href = url
      link.download = fileName
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      window.URL.revokeObjectURL(url)

      return true
    } catch (error) {
      console.error("Export error:", error)
      return false
    }
  }
}

export const exportService = new ExportService()
