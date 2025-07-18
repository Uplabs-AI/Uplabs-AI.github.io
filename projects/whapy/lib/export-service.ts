import * as XLSX from "xlsx"
import type { Call } from "@/lib/store"

interface DashboardData {
  metrics: {
    totalCallMinutes: number
    numberOfCalls: number
    totalExpense: number
    averageCostPerCall: number
    balance: number
    totalCalls: number
    transferredCalls: number
    successfulCalls: number
    failedCalls: number
  }
  calls: Call[]
}

export const exportToExcel = (data: DashboardData, fileName = "dashboard-data.xlsx") => {
  try {
    // Crear una hoja para las métricas
    const metricsData = [
      ["Métricas del Dashboard", ""],
      ["Total Minutos de Llamada", data.metrics.totalCallMinutes],
      ["Número de Llamadas", data.metrics.numberOfCalls],
      ["Gasto Total", `$${data.metrics.totalExpense.toFixed(2)}`],
      ["Costo Promedio por Llamada", `$${data.metrics.averageCostPerCall.toFixed(2)}`],
      ["Saldo", `$${data.metrics.balance.toFixed(2)}`],
      ["Total de Llamadas", data.metrics.totalCalls],
      ["Llamadas Transferidas", data.metrics.transferredCalls],
      ["Llamadas Exitosas", data.metrics.successfulCalls],
      ["Llamadas Fallidas", data.metrics.failedCalls],
    ]

    // Crear una hoja para los datos de llamadas
    const callsHeaders = [
      "ID",
      "Asistente",
      "Número de Teléfono del Asistente",
      "Número de Teléfono del Cliente",
      "Motivo de Finalización",
      "Evaluación",
      "Hora de Inicio",
      "Duración",
      "Costo",
      "Estado",
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
      call.status === "success" ? "Exitosa" : "Fallida",
    ])

    // Crear un libro de trabajo
    const wb = XLSX.utils.book_new()

    // Añadir la hoja de métricas
    const metricsSheet = XLSX.utils.aoa_to_sheet(metricsData)
    XLSX.utils.book_append_sheet(wb, metricsSheet, "Métricas")

    // Añadir la hoja de llamadas
    const callsSheet = XLSX.utils.aoa_to_sheet([callsHeaders, ...callsData])
    XLSX.utils.book_append_sheet(wb, callsSheet, "Llamadas")

    // Generar el archivo como array buffer
    const wbout = XLSX.write(wb, { bookType: "xlsx", type: "array" })

    // Crear un blob y descargar el archivo
    const blob = new Blob([wbout], { type: "application/octet-stream" })

    // Crear un enlace de descarga
    const url = window.URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = fileName

    // Añadir el enlace al DOM, hacer clic y removerlo
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)

    // Limpiar la URL del objeto
    window.URL.revokeObjectURL(url)

    return true
  } catch (error) {
    console.error("Error al exportar a Excel:", error)
    return false
  }
}
