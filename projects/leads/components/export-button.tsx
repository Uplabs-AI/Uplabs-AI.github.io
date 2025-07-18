"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"
import { exportToExcel } from "@/lib/export-service"
import type { DashboardMetrics, Call } from "@/lib/store"
import { useToast } from "@/components/ui/use-toast"

interface ExportButtonProps {
  metrics: DashboardMetrics
  calls: Call[]
  isLoading?: boolean
}

export function ExportButton({ metrics, calls, isLoading = false }: ExportButtonProps) {
  const [isExporting, setIsExporting] = useState(false)
  const { toast } = useToast()

  const handleExport = async () => {
    setIsExporting(true)

    try {
      const success = exportToExcel({ metrics, calls }, `dashboard-data-${new Date().toISOString().split("T")[0]}.xlsx`)

      if (success) {
        toast({
          title: "Exportación exitosa",
          description: "El archivo Excel se ha descargado correctamente.",
        })
      } else {
        throw new Error("Error al generar el archivo")
      }
    } catch (error) {
      console.error("Error durante la exportación:", error)
      toast({
        title: "Error en la exportación",
        description: "No se pudo generar el archivo Excel. Inténtalo de nuevo.",
        variant: "destructive",
      })
    } finally {
      setIsExporting(false)
    }
  }

  return (
    <Button
      className="bg-[#5E17EB] hover:bg-[#5E17EB]/90 text-white"
      onClick={handleExport}
      disabled={isLoading || isExporting}
    >
      <Download className="h-4 w-4 mr-2" />
      {isExporting ? "Exportando..." : "Exportar"}
    </Button>
  )
}
