"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowLeft, Check, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface FieldMapping {
  id: string
  columnHeader: string
  previewData: string
  status: "Mapeado" | "Pendiente"
  object: string
  field: string
}

export default function ImportCSVStep4Page() {
  const router = useRouter()
  const [listName, setListName] = useState("LISTA 1")
  const [addToCampaign, setAddToCampaign] = useState(false)
  const [selectedCampaign, setSelectedCampaign] = useState("")
  const [fieldMappings, setFieldMappings] = useState<FieldMapping[]>([])
  const [fileName, setFileName] = useState("clientes prospectos")
  const [fileSize, setFileSize] = useState("1 mb")

  useEffect(() => {
    // Cargar datos de los pasos anteriores
    const step1Data = localStorage.getItem("csvImportStep1")
    const step3Data = localStorage.getItem("csvImportStep3")
    const fileData = localStorage.getItem("csvImportStep2")

    if (step1Data) {
      const data = JSON.parse(step1Data)
      // Determinar el nombre de la lista basado en la opción seleccionada
      let listNameFromStep1 = ""
      if (data.listOption === "create" && data.newListName) {
        listNameFromStep1 = data.newListName
      } else if (data.listOption === "existing" && data.selectedList) {
        listNameFromStep1 = data.selectedList
      }

      if (listNameFromStep1) {
        setListName(listNameFromStep1.toUpperCase())
      }
    }

    if (fileData) {
      const data = JSON.parse(fileData)
      if (data.fileName) {
        setFileName(data.fileName)
      }
      if (data.fileSize) {
        setFileSize(data.fileSize)
      }
    }

    if (step3Data) {
      try {
        const mappings = JSON.parse(step3Data)
        // Ensure mappings is an array
        if (Array.isArray(mappings)) {
          setFieldMappings(mappings)
        } else {
          // If it's not an array, create default mappings
          setFieldMappings([
            {
              id: "1",
              columnHeader: "Campo 1",
              previewData: "Descripción...",
              status: "Mapeado" as const,
              object: "Objeto 1",
              field: "Correo Electrónico",
            },
            {
              id: "2",
              columnHeader: "Campo 1",
              previewData: "Descripción...",
              status: "Mapeado" as const,
              object: "Objeto 1",
              field: "Nombre",
            },
            {
              id: "3",
              columnHeader: "Campo 1",
              previewData: "Descripción...",
              status: "Mapeado" as const,
              object: "Objeto 1",
              field: "Apellidos",
            },
            {
              id: "4",
              columnHeader: "Campo 1",
              previewData: "Descripción...",
              status: "Mapeado" as const,
              object: "Objeto 1",
              field: "Celular",
            },
            {
              id: "5",
              columnHeader: "Campo 1",
              previewData: "Descripción...",
              status: "Mapeado" as const,
              object: "Objeto 1",
              field: "Empresa",
            },
            {
              id: "6",
              columnHeader: "Campo 1",
              previewData: "Descripción...",
              status: "Mapeado" as const,
              object: "Objeto 1",
              field: "Rubro (industria)",
            },
            {
              id: "7",
              columnHeader: "Campo 1",
              previewData: "Descripción...",
              status: "Mapeado" as const,
              object: "Objeto 1",
              field: "Edad",
            },
            {
              id: "8",
              columnHeader: "Campo 1",
              previewData: "Descripción...",
              status: "Pendiente" as const,
              object: "Objeto 1",
              field: "Estado Laboral",
            },
          ])
        }
      } catch (error) {
        console.error("Error parsing step3 data:", error)
        // Set default mappings if parsing fails
        setFieldMappings([])
      }
    } else {
      // Set default mappings if no step3 data exists
      setFieldMappings([
        {
          id: "1",
          columnHeader: "Campo 1",
          previewData: "Descripción...",
          status: "Mapeado" as const,
          object: "Objeto 1",
          field: "Correo Electrónico",
        },
        {
          id: "2",
          columnHeader: "Campo 1",
          previewData: "Descripción...",
          status: "Mapeado" as const,
          object: "Objeto 1",
          field: "Nombre",
        },
        {
          id: "3",
          columnHeader: "Campo 1",
          previewData: "Descripción...",
          status: "Mapeado" as const,
          object: "Objeto 1",
          field: "Apellidos",
        },
        {
          id: "4",
          columnHeader: "Campo 1",
          previewData: "Descripción...",
          status: "Mapeado" as const,
          object: "Objeto 1",
          field: "Celular",
        },
        {
          id: "5",
          columnHeader: "Campo 1",
          previewData: "Descripción...",
          status: "Mapeado" as const,
          object: "Objeto 1",
          field: "Empresa",
        },
        {
          id: "6",
          columnHeader: "Campo 1",
          previewData: "Descripción...",
          status: "Mapeado" as const,
          object: "Objeto 1",
          field: "Rubro (industria)",
        },
        {
          id: "7",
          columnHeader: "Campo 1",
          previewData: "Descripción...",
          status: "Mapeado" as const,
          object: "Objeto 1",
          field: "Edad",
        },
        {
          id: "8",
          columnHeader: "Campo 1",
          previewData: "Descripción...",
          status: "Pendiente" as const,
          object: "Objeto 1",
          field: "Estado Laboral",
        },
      ])
    }
  }, [])

  const steps = [
    { number: 1, label: "Inicio", active: false, completed: true },
    { number: 2, label: "Subir", active: false, completed: true },
    { number: 3, label: "Mapeo", active: false, completed: true },
    { number: 4, label: "Verificar", active: true, completed: false },
  ]

  const campaigns = ["Campaña de Seguros", "Campaña de Salud", "Campaña de Inversiones", "Campaña de Educación"]

  const handleSave = async () => {
    // Simular proceso de importación
    const importData = {
      listName,
      addToCampaign,
      selectedCampaign,
      fieldMappings,
      fileName,
      fileSize,
      importedAt: new Date().toISOString(),
    }

    // Guardar datos finales
    localStorage.setItem("csvImportFinal", JSON.stringify(importData))

    // Simular delay de procesamiento
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Verificar el origen de la importación
    const step1Data = localStorage.getItem("csvImportStep1")
    let origin = "contacts"

    if (step1Data) {
      try {
        const data = JSON.parse(step1Data)
        origin = data.origin || "contacts"
      } catch (error) {
        console.error("Error parsing step1 data:", error)
      }
    }

    // Guardar información de éxito para la página de origen
    if (origin === "campaigns-create") {
      localStorage.setItem("csvImportSuccess", "true")
      localStorage.setItem(
        "csvImportNewList",
        JSON.stringify({
          listName: listName,
          importedAt: new Date().toISOString(),
        }),
      )
    }

    // Limpiar datos temporales
    localStorage.removeItem("csvImportStep1")
    localStorage.removeItem("csvImportStep2")
    localStorage.removeItem("csvImportStep3")
    localStorage.removeItem("importOrigin")

    // Redirigir según el origen
    if (origin === "campaigns-create") {
      router.push("/campaigns/create")
    } else {
      router.push("/contacts?import=success")
    }
  }

  const handleCancel = () => {
    // Limpiar datos temporales
    localStorage.removeItem("csvImportStep1")
    localStorage.removeItem("csvImportStep2")
    localStorage.removeItem("csvImportStep3")
    router.push("/contacts")
  }

  return (
    <div className="flex-1 p-8 bg-[#121212] min-h-screen">
      {/* Header */}
      <div className="flex items-center mb-8">
        <Link href="/contacts/import-csv-step-3" className="text-gray-400 hover:text-white flex items-center gap-2">
          <ArrowLeft className="h-4 w-4" />
          <span>Volver</span>
        </Link>
        <h1 className="text-2xl font-medium text-white ml-4">Nueva Lista de Contactos</h1>
      </div>

      {/* Progress Steps */}
      <div className="flex items-center justify-center mb-12">
        <div className="flex items-center gap-8">
          {steps.map((step, index) => (
            <div key={step.number} className="flex items-center">
              <div className="flex flex-col items-center">
                <div
                  className={`w-16 h-16 rounded-full flex items-center justify-center text-xl font-medium ${
                    step.active || step.completed ? "bg-[#5E17EB] text-white" : "bg-[#6B7280] text-white"
                  }`}
                >
                  {step.number}
                </div>
                <span className={`mt-2 text-sm ${step.active ? "text-white" : "text-gray-400"}`}>{step.label}</span>
              </div>
              {index < steps.length - 1 && <div className="w-16 h-px bg-[#374151] mx-4" />}
            </div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Lista Information Card */}
        <Card className="bg-[#0A0A0A] border-double border-2 border-[#374151]">
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <FileText className="h-5 w-5" style={{ color: '#82ECFF' }} />
                <div>
                  <h3 className="text-lg font-medium text-white">
                    Nombre de la Lista: <span className="font-bold">"{listName.toUpperCase()}"</span>
                  </h3>
                </div>
              </div>
              
              {/* Add to Campaign - Card dentro del card */}
              <div className="bg-[#1A1A1C] border border-[#374151] rounded-lg p-4">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="add-to-campaign"
                      checked={addToCampaign}
                      onCheckedChange={(checked) => setAddToCampaign(checked as boolean)}
                      className="border-[#374151] data-[state=checked]:bg-[#5E17EB] data-[state=checked]:border-[#5E17EB]"
                    />
                    <label htmlFor="add-to-campaign" className="text-white text-sm font-medium">
                      Añadir a campaña existente:
                    </label>
                  </div>
                  {addToCampaign && (
                    <div className="flex-1 max-w-xs">
                      <Select value={selectedCampaign} onValueChange={setSelectedCampaign}>
                        <SelectTrigger className="bg-[#0A0A0A] border-[#374151] text-white">
                          <SelectValue placeholder="Selecciona una lista" />
                        </SelectTrigger>
                        <SelectContent className="bg-[#0A0A0A] border-[#374151]">
                          {campaigns.map((campaign) => (
                            <SelectItem key={campaign} value={campaign} className="text-white hover:bg-[#374151]">
                              {campaign}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Preferences */}
        <Card className="bg-[#0A0A0A] border-[#374151]">
          <CardContent className="p-6">
            <h2 className="text-xl font-medium text-white mb-2">Preferencias</h2>
            <p className="text-gray-400 mb-6">Revisa que los datos del mapeo estén correctos</p>

            <div className="space-y-6">
              {/* Document */}
              <div>
                <h3 className="text-base font-medium text-white mb-3">Documento</h3>
                <div className="inline-flex items-center gap-3 bg-[#1A1A1C] border border-[#374151] rounded-lg px-4 py-3">
                  <FileText className="h-6 w-6 text-gray-400" />
                  <div>
                    <div className="text-white text-sm font-medium">{fileName}</div>
                    <div className="text-gray-400 text-xs">{fileSize}</div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Content Mapping Review */}
        <Card className="bg-[#0A0A0A] border-[#374151]">
          <CardContent className="p-6">
            <h2 className="text-xl font-medium text-white mb-6">Contenido mapeado</h2>

            {/* Table Header */}
            <div className="grid grid-cols-5 gap-4 mb-4 pb-3 border-b border-[#374151]">
              <div className="text-gray-400 text-sm font-medium">Encabezado de columna</div>
              <div className="text-gray-400 text-sm font-medium">Información de vista previa</div>
              <div className="text-gray-400 text-sm font-medium">Estado</div>
              <div className="text-gray-400 text-sm font-medium">Objeto</div>
              <div className="text-gray-400 text-sm font-medium">Campos</div>
            </div>

            {/* Table Rows */}
            <div className="space-y-3">
              {fieldMappings.map((mapping) => (
                <div key={mapping.id} className="grid grid-cols-5 gap-4 items-center py-3">
                  <div className="text-white text-sm">{mapping.columnHeader}</div>
                  <div className="text-gray-400 text-sm">{mapping.previewData}</div>
                  <div>
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-500/20 text-green-400">
                      Mapeado
                    </span>
                  </div>
                  <div className="text-white text-sm">{mapping.object}</div>
                  <div className="bg-[#0A0A0A] border border-[#374151] rounded-md px-3 py-2">
                    <span className="text-white text-sm">{mapping.field}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex justify-end gap-4 mt-8">
          <Button
            onClick={handleCancel}
            variant="outline"
            className="border-[#374151] text-gray-400 hover:text-white hover:bg-[#1f1f22] bg-transparent"
          >
            Cancelar
          </Button>
          <Button onClick={handleSave} className="bg-[#5E17EB] hover:bg-[#4c12c0] text-white">
            Guardar
          </Button>
        </div>
      </div>
    </div>
  )
}
