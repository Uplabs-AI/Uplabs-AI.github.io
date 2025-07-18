"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowLeft, Check, AlertCircle, RefreshCw, ChevronDown, FileText, Trash2, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"

interface FieldMapping {
  id: string
  columnHeader: string
  previewData: string
  status: "Mapeado" | "Pendiente" | "Error"
  object: string
  field: string
  isRequired: boolean
  dataType: string
  sampleValues: string[]
}

interface CSVData {
  headers: string[]
  rows: string[][]
  fileName: string
  fileSize: string
}

export default function ImportCSVStep3Page() {
  const router = useRouter()
  const [fieldMappings, setFieldMappings] = useState<FieldMapping[]>([])
  const [csvData, setCsvData] = useState<CSVData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [validationErrors, setValidationErrors] = useState<string[]>([])
  const [autoMappingApplied, setAutoMappingApplied] = useState(false)
  const [listName, setListName] = useState<string>("")
  const [customFields, setCustomFields] = useState<{ [key: string]: string }>({})
  const [isCustomField, setIsCustomField] = useState<{ [key: string]: boolean }>({})

  const steps = [
    { number: 1, label: "Inicio", active: false, completed: true },
    { number: 2, label: "Subir", active: false, completed: true },
    { number: 3, label: "Mapeo", active: true, completed: false },
    { number: 4, label: "Verificar", active: false, completed: false },
  ]

  const fieldOptions = [
    { value: "email", label: "Correo Electrónico", required: false, dataType: "email" },
    { value: "firstName", label: "Nombre", required: false, dataType: "text" },
    { value: "lastName", label: "Apellidos", required: false, dataType: "text" },
    { value: "phone", label: "Celular", required: true, dataType: "phone" },
    { value: "company", label: "Empresa", required: false, dataType: "text" },
    { value: "industry", label: "Rubro (industria)", required: false, dataType: "text" },
    { value: "age", label: "Edad", required: false, dataType: "number" },
    { value: "jobStatus", label: "Estado Laboral", required: false, dataType: "text" },
    { value: "custom", label: "Personalizado", required: false, dataType: "text" },
  ]

  const requiredFields = fieldOptions.filter((field) => field.required)

  // Cargar datos del CSV desde localStorage
  useEffect(() => {
    const loadCSVData = () => {
      try {
        const step2Data = localStorage.getItem("csvImportStep2")
        const step1Data = localStorage.getItem("csvImportStep1")

        if (step2Data && step1Data) {
          const csvInfo = JSON.parse(step2Data)
          const listInfo = JSON.parse(step1Data)

          // Cargar el nombre de la lista del step-1
          setListName(listInfo.listName || listInfo.newListName || "LISTA")

          // Simular datos CSV (en una implementación real, esto vendría del archivo subido)
          const mockCSVData: CSVData = {
            headers: ["email", "nombre", "apellido", "telefono", "empresa", "industria", "edad", "estado_trabajo"],
            rows: [
              ["juan@email.com", "Juan", "Pérez", "+1234567890", "Tech Corp", "Tecnología", "30", "Empleado"],
              ["maria@email.com", "María", "García", "+1234567891", "Design Co", "Diseño", "28", "Freelancer"],
              ["carlos@email.com", "Carlos", "López", "+1234567892", "Marketing Inc", "Marketing", "35", "Gerente"],
            ],
            fileName: csvInfo.fileName || "archivo.csv",
            fileSize: csvInfo.fileSize || "1mb",
          }

          setCsvData(mockCSVData)
          initializeFieldMappings(mockCSVData)
        } else {
          router.push("/contacts/import-csv-step-1")
        }
      } catch (error) {
        console.error("Error loading CSV data:", error)
        router.push("/contacts/import-csv-step-1")
      } finally {
        setIsLoading(false)
      }
    }

    loadCSVData()
  }, [router])

  // Inicializar mapeos de campos
  const initializeFieldMappings = (data: CSVData) => {
    const mappings: FieldMapping[] = data.headers.map((header, index) => {
      const sampleValues = data.rows.slice(0, 3).map((row) => row[index] || "")

      return {
        id: `field-${index}`,
        columnHeader: header,
        previewData: sampleValues.join(", ") || "Sin datos",
        status: "Pendiente",
        object: "Contacto",
        field: "",
        isRequired: false,
        dataType: "text",
        sampleValues,
      }
    })

    setFieldMappings(mappings)

    // Aplicar auto-mapeo
    setTimeout(() => {
      applyAutoMapping(mappings)
    }, 500)
  }

  // Auto-mapeo inteligente basado en nombres de columnas
  const applyAutoMapping = (mappings: FieldMapping[]) => {
    const autoMappedFields = mappings.map((mapping) => {
      const headerLower = mapping.columnHeader.toLowerCase()
      let suggestedField = ""

      // Mapeo automático basado en patrones comunes
      if (headerLower.includes("email") || headerLower.includes("correo")) {
        suggestedField = "email"
      } else if (headerLower.includes("nombre") || headerLower.includes("name") || headerLower.includes("first")) {
        suggestedField = "firstName"
      } else if (headerLower.includes("apellido") || headerLower.includes("last") || headerLower.includes("surname")) {
        suggestedField = "lastName"
      } else if (headerLower.includes("telefono") || headerLower.includes("phone") || headerLower.includes("celular")) {
        suggestedField = "phone"
      } else if (headerLower.includes("empresa") || headerLower.includes("company")) {
        suggestedField = "company"
      } else if (
        headerLower.includes("industria") ||
        headerLower.includes("industry") ||
        headerLower.includes("rubro")
      ) {
        suggestedField = "industry"
      } else if (headerLower.includes("edad") || headerLower.includes("age")) {
        suggestedField = "age"
      } else if (headerLower.includes("trabajo") || headerLower.includes("job") || headerLower.includes("estado")) {
        suggestedField = "jobStatus"
      }

      if (suggestedField) {
        const fieldOption = fieldOptions.find((opt) => opt.value === suggestedField)
        return {
          ...mapping,
          field: suggestedField,
          status: "Mapeado" as const,
          isRequired: fieldOption?.required || false,
          dataType: fieldOption?.dataType || "text",
        }
      }

      return mapping
    })

    setFieldMappings(autoMappedFields)
    setAutoMappingApplied(true)
    validateMappings(autoMappedFields)
  }

  // Validar mapeos
  const validateMappings = (mappings: FieldMapping[]) => {
    const errors: string[] = []
    const mappedFields = mappings.filter((m) => m.field && m.field !== "custom").map((m) => m.field)

    // Verificar campos requeridos
    requiredFields.forEach((requiredField) => {
      if (!mappedFields.includes(requiredField.value)) {
        errors.push(`El campo requerido "${requiredField.label}" no está mapeado`)
      }
    })

    // Verificar duplicados (excluyendo campos personalizados)
    const duplicates = mappedFields.filter((field, index) => mappedFields.indexOf(field) !== index)

    if (duplicates.length > 0) {
      errors.push(`Campos duplicados detectados: ${duplicates.join(", ")}`)
    }

    // Validar tipos de datos
    mappings.forEach((mapping) => {
      if (mapping.field && mapping.dataType && mapping.field !== "custom") {
        const isValid = validateDataType(mapping.sampleValues, mapping.dataType)
        if (!isValid) {
          errors.push(`Los datos en "${mapping.columnHeader}" no coinciden con el tipo "${mapping.dataType}"`)
        }
      }
    })

    setValidationErrors(errors)
  }

  // Validar tipo de datos
  const validateDataType = (sampleValues: string[], dataType: string): boolean => {
    if (sampleValues.length === 0) return true

    switch (dataType) {
      case "email":
        return sampleValues.some((value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
      case "phone":
        return sampleValues.some((value) => /^[+]?[1-9][\d]{0,15}$/.test(value.replace(/[\s\-$$$$]/g, "")))
      case "number":
        return sampleValues.some((value) => !isNaN(Number(value)) && value.trim() !== "")
      default:
        return true
    }
  }

  // Función para eliminar una fila
  const handleDeleteRow = (id: string) => {
    setFieldMappings(prev => prev.filter(mapping => mapping.id !== id))
  }

  // Función para agregar una nueva fila
  const handleAddRow = () => {
    const newId = `field-${Date.now()}`
    const newMapping: FieldMapping = {
      id: newId,
      columnHeader: `nueva_columna_${fieldMappings.length + 1}`,
      previewData: "Datos de ejemplo...",
      status: "Pendiente",
      object: "Contacto",
      field: "",
      isRequired: false,
      dataType: "text",
      sampleValues: ["Ejemplo 1", "Ejemplo 2", "Ejemplo 3"],
    }
    setFieldMappings(prev => [...prev, newMapping])
  }

  // Manejar cambio de campo
  const handleFieldChange = (id: string, newField: string | undefined) => {
    if (newField === "custom") {
      setIsCustomField(prev => ({ ...prev, [id]: true }))
      setCustomFields(prev => ({ ...prev, [id]: "" }))
    } else {
      setIsCustomField(prev => ({ ...prev, [id]: false }))
      setCustomFields(prev => {
        const newCustomFields = { ...prev }
        delete newCustomFields[id]
        return newCustomFields
      })
    }

    const updatedMappings = fieldMappings.map((mapping) => {
      if (mapping.id === id) {
        const fieldOption = fieldOptions.find((opt) => opt.value === newField)
        return {
          ...mapping,
          field: newField || "",
          status: newField ? ("Mapeado" as const) : ("Pendiente" as const),
          isRequired: fieldOption?.required || false,
          dataType: fieldOption?.dataType || "text",
        }
      }
      return mapping
    })

    setFieldMappings(updatedMappings)
    validateMappings(updatedMappings)
  }

  const handleCustomFieldChange = (id: string, value: string) => {
    setCustomFields(prev => ({ ...prev, [id]: value }))
  }

  // Limpiar mapeo
  const clearMapping = (id: string) => {
    setIsCustomField(prev => ({ ...prev, [id]: false }))
    setCustomFields(prev => {
      const newCustomFields = { ...prev }
      delete newCustomFields[id]
      return newCustomFields
    })
    handleFieldChange(id, "")
  }

  // Resetear todos los mapeos
  const resetAllMappings = () => {
    const resetMappings = fieldMappings.map((mapping) => ({
      ...mapping,
      field: "",
      status: "Pendiente" as const,
      isRequired: false,
      dataType: "text",
    }))

    setFieldMappings(resetMappings)
    setValidationErrors([])
    setAutoMappingApplied(false)
    setCustomFields({})
    setIsCustomField({})
  }

  // Continuar al siguiente paso
  const handleNext = () => {
    if (validationErrors.length > 0) {
      return
    }

    const mappingData = {
      fieldMappings,
      csvData,
      validationErrors,
      customFields,
      isCustomField,
      timestamp: new Date().toISOString(),
    }

    localStorage.setItem("csvImportStep3", JSON.stringify(mappingData))
    router.push("/contacts/import-csv-step-4")
  }

  const handleCancel = () => {
    // Verificar el origen antes de cancelar
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

    // Limpiar datos temporales
    localStorage.removeItem("csvImportStep1")
    localStorage.removeItem("csvImportStep2")
    localStorage.removeItem("csvImportStep3")
    localStorage.removeItem("importOrigin")

    // Redirigir según el origen
    if (origin === "campaigns-create") {
      router.push("/campaigns/create")
    } else {
      router.push("/contacts")
    }
  }

  const allRequiredFieldsMapped = fieldMappings.some(
    (mapping) => mapping.field === "phone" && mapping.status === "Mapeado",
  )

  const canProceed = allRequiredFieldsMapped && validationErrors.length === 0

  if (isLoading) {
    return (
      <div className="flex-1 p-8">
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-gray-700 rounded w-1/3"></div>
          <div className="h-16 bg-gray-700 rounded"></div>
          <div className="h-64 bg-gray-700 rounded"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex-1 p-8 bg-[#121212]">
      {/* Header */}
      <div className="flex items-center mb-8">
        <Link href="/contacts/import-csv-step-2" className="text-gray-400 hover:text-white flex items-center gap-2">
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
        {/* Auto-mapping notification */}
        {autoMappingApplied && (
          <Alert className="bg-blue-500/10 border-blue-500/20">
            <AlertCircle className="h-4 w-4 text-blue-400" />
            <AlertDescription className="text-blue-400">
              Se ha aplicado mapeo automático basado en los nombres de las columnas. Revisa y ajusta según sea
              necesario.
            </AlertDescription>
          </Alert>
        )}

        {/* Validation Errors */}
        {validationErrors.length > 0 && (
          <Alert className="bg-red-500/10 border-red-500/20">
            <AlertCircle className="h-4 w-4 text-red-400" />
            <AlertDescription className="text-red-400">
              <div className="space-y-1">
                <p className="font-medium">Errores de validación:</p>
                <ul className="list-disc list-inside space-y-1">
                  {validationErrors.map((error, index) => (
                    <li key={index} className="text-sm">
                      {error}
                    </li>
                  ))}
                </ul>
              </div>
            </AlertDescription>
          </Alert>
        )}

        {/* Lista Information Card */}
        <Card className="bg-[#0A0A0A] border-double border-2 border-[#374151]">
          <CardContent className="p-6">
                          <div className="flex items-center gap-3">
                <FileText className="h-5 w-5" style={{ color: '#82ECFF' }} />
              <div>
                <h3 className="text-lg font-medium text-white">
                  Nombre de la Lista: <span className="font-bold">"{listName.toUpperCase()}"</span>
                </h3>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Mapping Guide */}
        <Card className="bg-[#0A0A0A] border-[#374151]">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-medium text-white">Guía de mapeo del CSV</h2>
              <div className="flex gap-2">
                <Button
                  onClick={() => applyAutoMapping(fieldMappings)}
                  variant="outline"
                  size="sm"
                  className="border-[#374151] text-gray-400 hover:text-white hover:bg-[#1f1f22] bg-transparent"
                >
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Auto-mapear
                </Button>
                <Button
                  onClick={resetAllMappings}
                  variant="outline"
                  size="sm"
                  className="border-[#374151] text-gray-400 hover:text-white hover:bg-[#1f1f22] bg-transparent"
                >
                  Resetear
                </Button>
              </div>
            </div>

            <p className="text-gray-400 mb-6">
              Asegúrate de que todos los campos requeridos estén correctamente mapeados para un proceso de importación
              sin problemas. Valida y finaliza tus datos antes de completar la importación.
            </p>

            <div className="mb-4">
              <h3 className="text-base font-medium text-white mb-4">
                Campos requeridos: <span className="text-red-400">*</span>
              </h3>
              <div className="flex flex-wrap gap-6">
                {/* Campo Celular */}
                <div className="flex items-center gap-2">
                  <div
                    className={`w-5 h-5 rounded-full flex items-center justify-center ${
                      fieldMappings.some((mapping) => mapping.field === "phone" && mapping.status === "Mapeado")
                        ? "bg-green-500"
                        : "bg-gray-500"
                    }`}
                  >
                    <Check className="h-3 w-3 text-white" />
                  </div>
                  <span className="text-white text-sm font-medium">CELULAR</span>
                </div>
              </div>
            </div>

            {/* CSV Info */}
            {csvData && (
              <div className="bg-[#0A0A0A] rounded-lg p-4">
                <h4 className="text-white font-medium mb-2">Información del archivo</h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-400">Archivo:</span>
                    <span className="text-white ml-2">{csvData.fileName}</span>
                  </div>
                  <div>
                    <span className="text-gray-400">Tamaño:</span>
                    <span className="text-white ml-2">{csvData.fileSize}</span>
                  </div>
                  <div>
                    <span className="text-gray-400">Columnas:</span>
                    <span className="text-white ml-2">{csvData.headers.length}</span>
                  </div>
                  <div>
                    <span className="text-gray-400">Filas:</span>
                    <span className="text-white ml-2">{csvData.rows.length}</span>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Content Mapping */}
        <Card className="bg-[#0A0A0A] border-[#374151]">
          <CardContent className="p-6">
            <h2 className="text-xl font-medium text-white mb-6">Contenido mapeado</h2>

            {/* Table Header */}
            <div className="grid grid-cols-6 gap-4 mb-4 pb-3 border-b border-[#374151]">
              <div className="text-gray-400 text-sm font-medium">Columna CSV</div>
              <div className="text-gray-400 text-sm font-medium">Vista previa</div>
              <div className="text-gray-400 text-sm font-medium">Estado</div>
              <div className="text-gray-400 text-sm font-medium">Tipo</div>
              <div className="text-gray-400 text-sm font-medium">Campo destino</div>
              <div className="text-gray-400 text-sm font-medium">Acciones</div>
            </div>

            {/* Table Rows */}
            <div className="space-y-3">
              {fieldMappings.map((mapping) => {
                const fieldOption = fieldOptions.find((opt) => opt.value === mapping.field)
                return (
                  <div
                    key={mapping.id}
                    className="grid grid-cols-6 gap-4 items-center py-3 hover:bg-[#0A0A0A] rounded-lg px-2"
                  >
                    <div className="text-white text-sm font-medium">{mapping.columnHeader}</div>
                    <div className="text-gray-400 text-sm truncate" title={mapping.previewData}>
                      {mapping.previewData}
                    </div>
                    <div>
                      <Badge
                        variant={mapping.status === "Mapeado" ? "default" : "secondary"}
                        className={
                          mapping.status === "Mapeado"
                            ? "bg-green-500/20 text-green-400 hover:bg-green-500/30"
                            : "bg-gray-500/20 text-gray-400"
                        }
                      >
                        {mapping.status}
                      </Badge>
                    </div>
                    <div className="text-gray-400 text-sm">
                      {fieldOption?.dataType || "text"}
                      {mapping.isRequired && <span className="text-red-400 ml-1">*</span>}
                    </div>
                    <div>
                      {isCustomField[mapping.id] ? (
                        <div className="relative">
                          <Input
                            value={customFields[mapping.id] || ""}
                            onChange={(e) => handleCustomFieldChange(mapping.id, e.target.value)}
                            placeholder="Escribe el nombre del campo personalizado"
                            className="bg-[#0A0A0A] border-[#374151] text-white placeholder-gray-400 pr-10"
                          />
                          <button
                            onClick={() => handleFieldChange(mapping.id, "")}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                            type="button"
                          >
                            <ChevronDown className="h-4 w-4" />
                          </button>
                        </div>
                      ) : (
                        <Select value={mapping.field} onValueChange={(value) => handleFieldChange(mapping.id, value)}>
                          <SelectTrigger className="bg-[#0A0A0A] border-[#374151] text-white">
                            <SelectValue placeholder="Seleccionar campo" />
                          </SelectTrigger>
                          <SelectContent className="bg-[#0A0A0A] border-[#374151]">
                            {fieldOptions.map((option) => (
                              <SelectItem
                                key={option.value}
                                value={option.value}
                                className="text-white hover:bg-[#374151]"
                              >
                                {option.label}
                                {option.required && <span className="text-red-400 ml-1">*</span>}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      )}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <button 
                          onClick={() => handleDeleteRow(mapping.id)}
                          className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hover:bg-accent h-9 rounded-md text-gray-400 hover:text-white p-2"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                        <button 
                          onClick={handleAddRow}
                          className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hover:bg-accent h-9 rounded-md text-gray-400 hover:text-white p-2"
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                )
              })}
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
          <Button onClick={handleNext} className="bg-[#5E17EB] hover:bg-[#4c12c0] text-white" disabled={!canProceed}>
            Siguiente
            {!canProceed && (
              <span className="ml-2 text-xs">
                ({requiredFields.length - fieldMappings.filter((m) => m.isRequired && m.status === "Mapeado").length}{" "}
                requeridos)
              </span>
            )}
          </Button>
        </div>
      </div>
    </div>
  )
}
