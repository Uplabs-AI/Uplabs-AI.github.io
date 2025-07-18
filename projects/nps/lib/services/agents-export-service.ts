import jsPDF from "jspdf"
import html2canvas from "html2canvas"

interface AgentData {
  id: number
  name: string
  status: string
  description: string
  language: string
  gender: string
  personality: string
  campaign: string
  resolutionRate: string
  avgTime: string
  callsToday: number
  state: string
  active: boolean
}

interface MetricsData {
  totalAgents: number
  activeAgents: number
  inactiveAgents: number
  averageResolutionRate: string
  totalCallsToday: number
  averageResponseTime: string
}

export class AgentsExportService {
  async exportToPDF(agents: AgentData[], metrics: MetricsData, activeTab: string): Promise<boolean> {
    try {
      const pdf = new jsPDF("p", "mm", "a4")
      const pageWidth = pdf.internal.pageSize.getWidth()
      const pageHeight = pdf.internal.pageSize.getHeight()
      let yPosition = 20

      // Header
      pdf.setFontSize(20)
      pdf.setFont("helvetica", "bold")
      pdf.text("Reporte de Agentes - NPSVOX", pageWidth / 2, yPosition, { align: "center" })
      yPosition += 15

      // Date
      pdf.setFontSize(10)
      pdf.setFont("helvetica", "normal")
      const currentDate = new Date().toLocaleDateString("es-ES", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
      pdf.text(`Generado el: ${currentDate}`, pageWidth / 2, yPosition, { align: "center" })
      yPosition += 20

      // Metrics Summary
      pdf.setFontSize(14)
      pdf.setFont("helvetica", "bold")
      pdf.text("Resumen de Métricas", 20, yPosition)
      yPosition += 10

      pdf.setFontSize(10)
      pdf.setFont("helvetica", "normal")

      const metricsText = [
        `Total de Agentes: ${metrics.totalAgents}`,
        `Agentes Activos: ${metrics.activeAgents}`,
        `Agentes Inactivos: ${metrics.inactiveAgents}`,
        `Tasa de Resolución Promedio: ${metrics.averageResolutionRate}`,
        `Total de Llamadas Hoy: ${metrics.totalCallsToday}`,
        `Tiempo de Respuesta Promedio: ${metrics.averageResponseTime}`,
      ]

      metricsText.forEach((text) => {
        pdf.text(text, 20, yPosition)
        yPosition += 6
      })

      yPosition += 15

      // Active Tab Information
      pdf.setFontSize(12)
      pdf.setFont("helvetica", "bold")
      const tabNames: { [key: string]: string } = {
        general: "Rendimiento General",
        conversacion: "Métricas de Conversación",
        calidad: "Calidad y Satisfacción",
        eficiencia: "Eficiencia Operativa",
      }
      pdf.text(`Vista Activa: ${tabNames[activeTab] || "Rendimiento General"}`, 20, yPosition)
      yPosition += 15

      // Agents Table Header
      pdf.setFontSize(14)
      pdf.setFont("helvetica", "bold")
      pdf.text("Lista de Agentes", 20, yPosition)
      yPosition += 10

      // Table headers
      pdf.setFontSize(8)
      pdf.setFont("helvetica", "bold")
      const headers = ["Nombre", "Estado", "Campaña", "Resolución", "Tiempo Prom.", "Llamadas Hoy", "Activo"]
      const colWidths = [25, 20, 45, 20, 20, 20, 15]
      let xPosition = 20

      headers.forEach((header, index) => {
        pdf.text(header, xPosition, yPosition)
        xPosition += colWidths[index]
      })
      yPosition += 8

      // Table data
      pdf.setFont("helvetica", "normal")
      agents.forEach((agent) => {
        // Check if we need a new page
        if (yPosition > pageHeight - 30) {
          pdf.addPage()
          yPosition = 20
        }

        xPosition = 20
        const rowData = [
          agent.name,
          agent.status,
          agent.campaign.length > 20 ? agent.campaign.substring(0, 20) + "..." : agent.campaign,
          agent.resolutionRate,
          agent.avgTime,
          agent.callsToday.toString(),
          agent.active ? "Sí" : "No",
        ]

        rowData.forEach((data, index) => {
          pdf.text(data, xPosition, yPosition)
          xPosition += colWidths[index]
        })
        yPosition += 6
      })

      // Add detailed metrics based on active tab
      if (yPosition > pageHeight - 60) {
        pdf.addPage()
        yPosition = 20
      } else {
        yPosition += 20
      }

      pdf.setFontSize(14)
      pdf.setFont("helvetica", "bold")
      pdf.text("Métricas Detalladas", 20, yPosition)
      yPosition += 15

      pdf.setFontSize(10)
      pdf.setFont("helvetica", "normal")

      switch (activeTab) {
        case "conversacion":
          const conversationMetrics = [
            "Duración Promedio de Llamadas: 3:24 minutos (↗ 12% vs. período anterior)",
            "Tasa de Resolución en Primera Llamada: 78% (↗ 5% vs. período anterior)",
            "Flujo de Conversación: Contacto → Saludo → Respuesta → Resolución",
            "Tiempo de Respuesta Promedio por Agente: 11.8 segundos",
          ]
          conversationMetrics.forEach((metric) => {
            pdf.text(metric, 20, yPosition)
            yPosition += 8
          })
          break

        case "calidad":
          const qualityMetrics = [
            "Puntuación NPS: 42 (↗ 8% vs. período anterior)",
            "Satisfacción Promedio (CSAT): 8.1/10",
            "Análisis de Sentimiento: 85% Positivo, 12% Neutral, 3% Negativo",
            "Habilidades Promedio: Comprensión 92%, Empatía 88%, Comunicación 95%",
          ]
          qualityMetrics.forEach((metric) => {
            pdf.text(metric, 20, yPosition)
            yPosition += 8
          })
          break

        case "eficiencia":
          const efficiencyMetrics = [
            "Tasa de Transferencia a Humanos: 12% (↗ 3% vs. período anterior)",
            "Tasa de Resolución Promedio: 82.75%",
            "Costo por Llamada: $0.42 (↗ $0.08 vs. período anterior)",
            "Precisión de Reconocimiento: Intención 94%, Entidades 88%, Sentimiento 82%",
          ]
          efficiencyMetrics.forEach((metric) => {
            pdf.text(metric, 20, yPosition)
            yPosition += 8
          })
          break

        default:
          const generalMetrics = [
            "Estado Actual: 40% Disponibles, 30% En llamada, 30% Inactivos",
            "Actividad 24h: 210 llamadas totales",
            "Distribución de Llamadas: Juan 45, Carlos 42, Ana 38, María 35, Roberto 28",
            "Tiempo de Respuesta Promedio: 42 segundos",
          ]
          generalMetrics.forEach((metric) => {
            pdf.text(metric, 20, yPosition)
            yPosition += 8
          })
      }

      // Footer
      const totalPages = pdf.internal.pages.length - 1
      for (let i = 1; i <= totalPages; i++) {
        pdf.setPage(i)
        pdf.setFontSize(8)
        pdf.setFont("helvetica", "normal")
        pdf.text(`Página ${i} de ${totalPages} - Reporte generado por NPSVOX`, pageWidth / 2, pageHeight - 10, {
          align: "center",
        })
      }

      // Save the PDF
      const fileName = `reporte-agentes-${new Date().toISOString().split("T")[0]}.pdf`
      pdf.save(fileName)

      return true
    } catch (error) {
      console.error("Error al exportar PDF:", error)
      return false
    }
  }

  async exportDashboardToPDF(): Promise<boolean> {
    try {
      // Capture the dashboard area
      const dashboardElement = document.querySelector("[data-dashboard-area]") as HTMLElement
      if (!dashboardElement) {
        console.error("Dashboard area not found")
        return false
      }

      const canvas = await html2canvas(dashboardElement, {
        backgroundColor: "#1a1a1c",
        scale: 2,
        logging: false,
        useCORS: true,
      })

      const pdf = new jsPDF("l", "mm", "a4") // Landscape for dashboard
      const pageWidth = pdf.internal.pageSize.getWidth()
      const pageHeight = pdf.internal.pageSize.getHeight()

      // Calculate dimensions to fit the page
      const imgWidth = pageWidth - 20
      const imgHeight = (canvas.height * imgWidth) / canvas.width

      // Add header
      pdf.setFontSize(16)
      pdf.setFont("helvetica", "bold")
      pdf.text("Dashboard de Agentes - NPSVOX", pageWidth / 2, 15, { align: "center" })

      // Add date
      pdf.setFontSize(10)
      pdf.setFont("helvetica", "normal")
      const currentDate = new Date().toLocaleDateString("es-ES")
      pdf.text(`Generado el: ${currentDate}`, pageWidth / 2, 25, { align: "center" })

      // Add the dashboard image
      const imgData = canvas.toDataURL("image/png")

      if (imgHeight > pageHeight - 40) {
        // If image is too tall, split it across pages
        const ratio = (pageHeight - 40) / imgHeight
        const adjustedWidth = imgWidth * ratio
        const adjustedHeight = pageHeight - 40

        pdf.addImage(imgData, "PNG", (pageWidth - adjustedWidth) / 2, 35, adjustedWidth, adjustedHeight)
      } else {
        pdf.addImage(imgData, "PNG", 10, 35, imgWidth, imgHeight)
      }

      // Save the PDF
      const fileName = `dashboard-agentes-${new Date().toISOString().split("T")[0]}.pdf`
      pdf.save(fileName)

      return true
    } catch (error) {
      console.error("Error al exportar dashboard PDF:", error)
      return false
    }
  }
}

export const agentsExportService = new AgentsExportService()
