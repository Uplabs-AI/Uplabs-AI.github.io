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

export const exportToCSV = (data: DashboardData, fileName = "dashboard-data.csv") => {
  try {
    // Crear el contenido CSV
    let csvContent = "data:text/csv;charset=utf-8,"

    // Añadir métricas
    csvContent += "MÉTRICAS DEL DASHBOARD\n"
    csvContent += "Métrica,Valor\n"
    csvContent += `Total Minutos de Llamada,${data.metrics.totalCallMinutes}\n`
    csvContent += `Número de Llamadas,${data.metrics.numberOfCalls}\n`
    csvContent += `Gasto Total,$${data.metrics.totalExpense.toFixed(2)}\n`
    csvContent += `Costo Promedio por Llamada,$${data.metrics.averageCostPerCall.toFixed(2)}\n`
    csvContent += `Saldo,$${data.metrics.balance.toFixed(2)}\n`
    csvContent += `Total de Llamadas,${data.metrics.totalCalls}\n`
    csvContent += `Llamadas Transferidas,${data.metrics.transferredCalls}\n`
    csvContent += `Llamadas Exitosas,${data.metrics.successfulCalls}\n`
    csvContent += `Llamadas Fallidas,${data.metrics.failedCalls}\n`
    csvContent += "\n"

    // Añadir datos de llamadas
    csvContent += "DATOS DE LLAMADAS\n"
    csvContent +=
      "ID,Asistente,Número de Teléfono del Asistente,Número de Teléfono del Cliente,Motivo de Finalización,Evaluación,Hora de Inicio,Duración,Costo,Estado\n"

    data.calls.forEach((call) => {
      csvContent += `"${call.id}","${call.assistant}","${call.assistantPhoneNumber}","${call.clientPhoneNumber}","${call.finalizationReason}","${call.successEvaluation}","${call.startTime}","${call.duration}","$${call.cost.toFixed(2)}","${call.status === "success" ? "Exitosa" : "Fallida"}"\n`
    })

    // Crear y descargar el archivo
    const encodedUri = encodeURI(csvContent)
    const link = document.createElement("a")
    link.setAttribute("href", encodedUri)
    link.setAttribute("download", fileName)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)

    return true
  } catch (error) {
    console.error("Error al exportar a CSV:", error)
    return false
  }
}
