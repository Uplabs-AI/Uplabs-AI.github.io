"use client"
import { useState, useRef, useEffect } from "react"
import {
  AlertDialog,
  AlertDialogContent as AlertDialogContentComponent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction as AlertDialogActionComponent,
  AlertDialogCancel as AlertDialogCancelComponent,
} from "@/components/ui/alert-dialog"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Sidebar } from "@/components/layout/sidebar"
import { useToast } from "@/components/ui/use-toast"
import { ArrowLeft, Plus, Search, Trash2, Clock } from "lucide-react"
import Link from "next/link"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

// Tipos para los datos
interface Survey {
  id: string
  name: string
  type: "CSAT" | "NPS" | "CES"
  questions: number
  color: string
}

interface Message {
  id: string
  content: string
  yesResponse: string
  noResponse: string
}

interface FormData {
  selectedSurveyId: string
  messages: Message[]
  objectionHandling: string
  conversationEnd: string
  followUpCalls: { id: string; delay: number; unit: string }[]
  selectedDays: string[]
  selectedTimeSlots: string[]
}

// Datos de encuestas iniciales
const initialSurveys: Survey[] = [
  { id: "1", name: "Satisfacción del Cliente", type: "CSAT", questions: 5, color: "#10b981" },
  { id: "2", name: "Plantilla NPS Estándar", type: "NPS", questions: 2, color: "#8b5cf6" },
  { id: "3", name: "Evaluación Post-Compra", type: "CSAT", questions: 5, color: "#10b981" },
  { id: "4", name: "Plantilla NPS Producto", type: "NPS", questions: 2, color: "#8b5cf6" },
  { id: "5", name: "Evaluación de Servicio", type: "CES", questions: 5, color: "#10b981" },
  { id: "6", name: "Encuesta de Satisfacción", type: "NPS", questions: 10, color: "#8b5cf6" },
  { id: "7", name: "Feedback de Clientes", type: "CES", questions: 5, color: "#10b981" },
  { id: "8", name: "Encuesta de Lealtad", type: "NPS", questions: 10, color: "#8b5cf6" },
]

const weekDays = ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"]
const timeSlots = ["9 a 12 hrs", "12 a 15 hrs", "15 a 18 hrs", "9 a 21 hrs"]

export default function CreateCampaign2Page() {
  const [surveys, setSurveys] = useState<Survey[]>(initialSurveys)
  const [formData, setFormData] = useState<FormData>({
    selectedSurveyId: "",
    messages: [
      {
        id: "1",
        content: "Hola, ¿habló con {{nombre_usuario}}?",
        yesResponse: "Continuar con segundo mensaje",
        noResponse: "Termina la conversación...",
      },
      {
        id: "2",
        content:
          "Mucho gusto, {{nombre_usuario}}. Soy {{nombre_agente}} de {{mi_empresa}}, ¿Tiene unos minutos para una breve encuesta?",
        yesResponse: "Proceder con encuesta...",
        noResponse: "Realiza el manejo de objeción...",
      },
    ],
    objectionHandling: "Realiza el manejo de objeción...",
    conversationEnd: "Muchas gracias por tu tiempo. Que tengas un excelente día",
    followUpCalls: [{ id: "1", delay: 5, unit: "minutos" }],
    selectedDays: ["Lun", "Mar", "Mié", "Jue", "Vie"],
    selectedTimeSlots: ["9 a 12 hrs"],
  })

  const [showCustomTimeModal, setShowCustomTimeModal] = useState(false)
  const [customTimeRange, setCustomTimeRange] = useState({ start: "", end: "" })
  const [showCancelDialog, setShowCancelDialog] = useState(false)
  const [timeSlots, setTimeSlots] = useState([{ id: "1", startTime: "00:00", endTime: "00:00" }])

  const textareaRefs = useRef<{ [key: string]: HTMLTextAreaElement }>({})

  const { toast } = useToast()
  const router = useRouter()

  // Detectar nueva encuesta creada al regresar
  useEffect(() => {
    const newSurveyData = localStorage.getItem("newSurveyFromCreate")
    if (newSurveyData) {
      try {
        const newSurvey = JSON.parse(newSurveyData)

        // Crear objeto de encuesta para la lista
        const surveyForList: Survey = {
          id: newSurvey.id,
          name: newSurvey.name,
          type: newSurvey.type || "NPS",
          questions: newSurvey.questions || 1,
          color: newSurvey.type === "CSAT" ? "#10b981" : newSurvey.type === "CES" ? "#f59e0b" : "#8b5cf6",
        }

        // Agregar a la lista de encuestas si no existe
        setSurveys((prev) => {
          const exists = prev.find((s) => s.id === surveyForList.id)
          if (!exists) {
            return [...prev, surveyForList]
          }
          return prev
        })

        // Seleccionar automáticamente la nueva encuesta
        setFormData((prev) => ({
          ...prev,
          selectedSurveyId: newSurvey.id,
        }))

        // Mostrar notificación de éxito
        toast({
          title: "¡Encuesta creada exitosamente!",
          description: `La encuesta "${newSurvey.name}" ha sido creada y seleccionada.`,
        })

        // Limpiar datos temporales
        localStorage.removeItem("newSurveyFromCreate")
      } catch (error) {
        console.error("Error al procesar nueva encuesta:", error)
      }
    }
  }, [toast])

  const handleInputChange = (field: keyof FormData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleMessageChange = (messageId: string, field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      messages: prev.messages.map((msg) => (msg.id === messageId ? { ...msg, [field]: value } : msg)),
    }))
  }

  const addMessage = () => {
    const newMessage: Message = {
      id: Date.now().toString(),
      content: "",
      yesResponse: "",
      noResponse: "",
    }
    setFormData((prev) => ({
      ...prev,
      messages: [...prev.messages, newMessage],
    }))
  }

  const removeMessage = (messageId: string) => {
    setFormData((prev) => ({
      ...prev,
      messages: prev.messages.filter((msg) => msg.id !== messageId),
    }))
  }

  const toggleDay = (day: string) => {
    setFormData((prev) => ({
      ...prev,
      selectedDays: prev.selectedDays.includes(day)
        ? prev.selectedDays.filter((d) => d !== day)
        : [...prev.selectedDays, day],
    }))
  }

  const toggleTimeSlot = (slot: string) => {
    setFormData((prev) => ({
      ...prev,
      selectedTimeSlots: prev.selectedTimeSlots.includes(slot)
        ? prev.selectedTimeSlots.filter((s) => s !== slot)
        : [...prev.selectedTimeSlots, slot],
    }))
  }

  const handleCustomTime = () => {
    if (customTimeRange.start && customTimeRange.end) {
      const customSlot = `${customTimeRange.start} a ${customTimeRange.end}`
      setFormData((prev) => ({
        ...prev,
        selectedTimeSlots: [...prev.selectedTimeSlots, customSlot],
      }))
      setCustomTimeRange({ start: "", end: "" })
      setShowCustomTimeModal(false)
      toast({
        title: "Horario personalizado agregado",
        description: `Se agregó el horario ${customSlot}`,
      })
    }
  }

  const handleSaveDraft = () => {
    toast({
      title: "Borrador Guardado",
      description: "La campaña ha sido guardada como borrador.",
    })
  }

  const handleSaveCampaign = () => {
    if (timeSlots.length === 0) {
      toast({
        title: "Error de validación",
        description: "Agrega el horario de la llamada.",
        variant: "destructive",
      })
      return
    }
    toast({
      title: "Campaña Creada",
      description: "La campaña ha sido creada exitosamente.",
    })
    router.push("/campaigns")
  }

  const handleCancel = () => {
    setShowCancelDialog(true)
  }

  const confirmCancel = () => {
    setShowCancelDialog(false)
    router.push("/campaigns")
  }

  const handleCreateNewSurvey = () => {
    // Guardar contexto de origen
    localStorage.setItem("surveyCreateOrigin", "campaigns-create-2")

    // Redirigir a crear encuesta
    router.push("/surveys/create")
  }

  const insertVariable = (messageId: string, variableKey: string) => {
    const variableName = `{{${variableKey}}}`
    const textarea = textareaRefs.current[messageId]
    if (textarea) {
      const start = textarea.selectionStart
      const end = textarea.selectionEnd
      const currentValue = textarea.value
      const newValue = currentValue.substring(0, start) + variableName + currentValue.substring(end)

      setFormData((prev) => ({
        ...prev,
        messages: prev.messages.map((msg) => (msg.id === messageId ? { ...msg, content: newValue } : msg)),
      }))

      // Restaurar la posición del cursor
      setTimeout(() => {
        textarea.focus()
        textarea.setSelectionRange(start + variableName.length, start + variableName.length)
      }, 0)
    }
  }

  const addTimeSlot = () => {
    if (timeSlots.length < 4) {
      const newSlot = {
        id: Date.now().toString(),
        startTime: "00:00",
        endTime: "00:00",
      }
      setTimeSlots((prev) => [...prev, newSlot])
    }
  }

  const removeTimeSlot = (slotId: string) => {
    // Allow removing all time slots
    setTimeSlots((prev) => prev.filter((slot) => slot.id !== slotId))
  }

  const updateTimeSlot = (slotId: string, field: "startTime" | "endTime", value: string) => {
    setTimeSlots((prev) => prev.map((slot) => (slot.id === slotId ? { ...slot, [field]: value } : slot)))
  }

  return (
    <div className="min-h-screen bg-[#121212] text-white flex">
      {/* Sidebar */}
      <div className="w-64 flex-shrink-0">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        {/* Header */}
        <header className="flex items-center justify-between p-4 border-b border-border">
          <h1 className="text-xl font-semibold">Encuestas</h1>
          <div className="flex items-center space-x-2">
            <Link href="/dashboard" passHref>
              <Button variant="outline" className="border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 transition-all duration-200 hover:scale-105">
                Dashboard
              </Button>
            </Link>
            <Link href="/auth/logout" passHref>
              <Button variant="outline" className="border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 transition-all duration-200 hover:scale-105">
                Sign Out
              </Button>
            </Link>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-6">
          <div className="flex items-center justify-between mb-8">
            <Link href="/campaigns/create">
              <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white p-0">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Volver a Paso 1
              </Button>
            </Link>
            <div className="flex space-x-3">
              <Button
                variant="outline"
                onClick={handleCancel}
                className="border-gray-600 text-gray-400 hover:text-white"
              >
                Cancelar
              </Button>
              <Button className="bg-[#5E17EB] hover:bg-[#5E17EB]/90 text-white" onClick={handleSaveCampaign}>
                Guardar y Crear Campaña
              </Button>
            </div>
          </div>

          <div className="flex items-center justify-center mb-8">
            <div className="flex items-center space-x-8">
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 bg-gray-600 rounded-full flex items-center justify-center text-white font-semibold text-lg mb-2">
                  1
                </div>
                <span className="text-gray-400 font-medium">Campaña</span>
              </div>

              <div className="w-16 h-0.5 bg-gray-600"></div>

              <div className="flex flex-col items-center">
                <div className="w-12 h-12 bg-[#5E17EB] rounded-full flex items-center justify-center text-white font-semibold text-lg mb-2">
                  2
                </div>
                <span className="text-white font-medium">Encuesta</span>
              </div>
            </div>
          </div>

          <div className="max-w-6xl mx-auto space-y-8">
            <Card className="bg-[#05000E] border-[#1a1a1c]">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-medium text-white">Flujo de Conversación</h3>
                  <span className="text-gray-400 text-sm">{formData.messages.length} mensajes</span>
                </div>

                <div className="space-y-8">
                  {formData.messages.map((message, index) => (
                    <div key={message.id} className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h4 className="text-base font-medium text-white">
                          {index === 0 ? "Primer Mensaje" : `${index === 1 ? "Segundo" : `${index + 1}°`} Mensaje`}
                        </h4>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeMessage(message.id)}
                            className="text-gray-400 hover:text-white p-1"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={addMessage}
                            className="text-gray-400 hover:text-white p-1"
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>

                      <Textarea
                        ref={(el) => {
                          if (el) {
                            textareaRefs.current[message.id] = el
                          }
                        }}
                        placeholder={
                          index === 0
                            ? "Hola, ¿habló con {{nombre_usuario}}?"
                            : "Mucho gusto, {{nombre_usuario}}. Soy {{nombre_agente}} de {{mi_empresa}}, ¿Tiene unos minutos para una breve encuesta?"
                        }
                        value={message.content}
                        onChange={(e) => handleMessageChange(message.id, "content", e.target.value)}
                        className="bg-[#1A1A1C] border-[#4B5563] text-white placeholder-gray-400 min-h-[60px] rounded-md"
                      />

                      <div className="flex flex-wrap gap-2 mb-6">
                        {[
                          { key: "nombre_usuario", label: "Nombre" },
                          { key: "apellido", label: "Apellido" },
                          { key: "celular", label: "Celular" },
                          { key: "empresa", label: "Empresa" },
                          { key: "rubro", label: "Rubro" },
                          { key: "nombre_agente", label: "Nombre agente" },
                          { key: "mi_empresa", label: "Mi empresa" },
                        ].map((variable) => (
                          <Badge
                            key={variable.key}
                            variant="outline"
                            onClick={() => insertVariable(message.id, variable.key)}
                            className="px-4 py-2 bg-transparent text-[#C8B4FF] border-[#290B67] hover:bg-[#290B67]/10 transition-colors cursor-pointer font-medium rounded-full border-2"
                          >
                            {variable.label}
                          </Badge>
                        ))}
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label className="text-sm font-medium text-gray-400 mb-2 block">Si responde Sí</Label>
                          <Input
                            placeholder={index === 0 ? "Continuar con segundo mensaje" : "Proceder con encuesta..."}
                            value={message.yesResponse}
                            onChange={(e) => handleMessageChange(message.id, "yesResponse", e.target.value)}
                            className="bg-[#241B2B] border-[#4B5563] text-white placeholder-gray-400 h-10 rounded-md"
                          />
                        </div>
                        <div>
                          <Label className="text-sm font-medium text-gray-400 mb-2 block">Si responde No</Label>
                          <Input
                            placeholder="Termina la conversación..."
                            value={message.noResponse}
                            onChange={(e) => handleMessageChange(message.id, "noResponse", e.target.value)}
                            className="bg-[#241B2B] border-[#4B5563] text-white placeholder-gray-400 h-10 rounded-md"
                          />
                        </div>
                      </div>
                    </div>
                  ))}

                  <div className="flex justify-center pt-4">
                    <Button
                      onClick={addMessage}
                      variant="outline"
                      className="border-[#374151] text-gray-400 hover:text-white hover:border-gray-300 bg-transparent px-8 py-2 min-w-[600px]"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Agregar mensaje
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-[#05000E] border-[#1a1a1c]">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-medium text-white">Selección de Encuesta</h3>
                  <div className="flex items-center space-x-4">
                    <Button variant="link" className="text-[#5E17EB] p-0 hover:text-[#5E17EB]/80">
                      Ver todas las encuestas
                    </Button>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        placeholder="Buscar encuesta..."
                        className="pl-10 bg-[#1A1A1C] border-[#4B5563] text-white placeholder-gray-400 w-48 h-10 rounded-md"
                      />
                    </div>
                    <Button className="bg-[#5E17EB] hover:bg-[#5E17EB]/90 text-white" onClick={handleCreateNewSurvey}>
                      <Plus className="h-4 w-4 mr-2" />
                      Crear una Cotización
                    </Button>
                  </div>
                </div>

                <p className="text-gray-300 text-sm mb-6">
                  Seleccione una encuesta para esta campaña <span className="text-red-400">*</span>
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {surveys.map((survey) => (
                    <Card
                      key={survey.id}
                      className={`cursor-pointer transition-all duration-200 ${
                        formData.selectedSurveyId === survey.id
                          ? "bg-[#5E17EB]/20 border-[#5E17EB]"
                          : "bg-[#1A1A1C] border-[#1A1A1C] hover:border-[#5E17EB]/50"
                      }`}
                      onClick={() => handleInputChange("selectedSurveyId", survey.id)}
                    >
                      <CardContent className="p-4">
                        <h4 className="font-semibold text-white mb-3 text-sm">{survey.name}</h4>
                        <div className="flex items-center justify-between mb-2">
                          <Badge style={{ backgroundColor: survey.color }} className="text-white text-xs">
                            {survey.type}
                          </Badge>
                          <span className="text-xs text-gray-400">{survey.questions} preguntas</span>
                        </div>
                        <Button variant="link" className="text-[#5E17EB] p-0 text-xs h-auto">
                          Ver todas las preguntas
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-[#05000E] border-[#1a1a1c]">
              <CardContent className="p-6">
                <h3 className="text-lg font-medium text-white mb-6">Finalización</h3>

                <div className="space-y-6">
                  <div>
                    <Label className="text-sm font-medium text-gray-300 mb-2 block">
                      Finalización de la conversación
                    </Label>
                    <Textarea
                      placeholder="Muchas gracias por tu tiempo. Que tengas un excelente día"
                      value={formData.conversationEnd}
                      onChange={(e) => handleInputChange("conversationEnd", e.target.value)}
                      className="bg-[#1A1A1C] border-[#4B5563] text-white placeholder-gray-400 min-h-[80px] rounded-md"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-[#05000E] border-[#1a1a1c]">
                <CardContent className="p-6">
                  <h3 className="text-lg font-medium text-white mb-6">Llamadas de seguimiento</h3>

                  <div className="space-y-6">
                    {formData.followUpCalls.map((call, index) => (
                      <div key={call.id} className="space-y-4">
                        <h4 className="text-base font-medium text-white">
                          {index === 0 ? "Segunda llamada" : `${index + 2}° llamada`}
                        </h4>

                        <div className="flex items-center gap-3">
                          <span className="text-white text-sm">Llamar después de:</span>
                          <div className="relative w-20">
                            <Input
                              type="number"
                              value={call.delay}
                              onChange={(e) => {
                                const value = Math.max(1, Number.parseInt(e.target.value) || 1)
                                setFormData((prev) => ({
                                  ...prev,
                                  followUpCalls: prev.followUpCalls.map((c) =>
                                    c.id === call.id ? { ...c, delay: value } : c,
                                  ),
                                }))
                              }}
                              className="bg-[#1A1A1C] border-[#4B5563] text-white text-center pr-8 h-10 rounded-md [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                              min="1"
                              max="999"
                            />
                            <div className="absolute right-1 top-1/2 -translate-y-1/2 flex flex-col">
                              <button
                                type="button"
                                onClick={() => {
                                  setFormData((prev) => ({
                                    ...prev,
                                    followUpCalls: prev.followUpCalls.map((c) =>
                                      c.id === call.id ? { ...c, delay: Math.min(999, c.delay + 1) } : c,
                                    ),
                                  }))
                                }}
                                className="text-gray-400 hover:text-white text-xs leading-none h-3 flex items-center justify-center"
                              >
                                ▲
                              </button>
                              <button
                                type="button"
                                onClick={() => {
                                  setFormData((prev) => ({
                                    ...prev,
                                    followUpCalls: prev.followUpCalls.map((c) =>
                                      c.id === call.id ? { ...c, delay: Math.max(1, c.delay - 1) } : c,
                                    ),
                                  }))
                                }}
                                className="text-gray-400 hover:text-white text-xs leading-none h-3 flex items-center justify-center"
                              >
                                ▼
                              </button>
                            </div>
                          </div>
                          <Select
                            value={call.unit}
                            onValueChange={(value) => {
                              setFormData((prev) => ({
                                ...prev,
                                followUpCalls: prev.followUpCalls.map((c) =>
                                  c.id === call.id ? { ...c, unit: value } : c,
                                ),
                              }))
                            }}
                          >
                            <SelectTrigger className="w-28 bg-[#1A1A1C] border-[#4B5563] text-white h-10 rounded-md">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent className="bg-[#1A1A1C] border-[#374151]">
                              <SelectItem value="segundos">segundos</SelectItem>
                              <SelectItem value="minutos">minutos</SelectItem>
                              <SelectItem value="horas">horas</SelectItem>
                              <SelectItem value="días">días</SelectItem>
                            </SelectContent>
                          </Select>
                          <div className="flex items-center gap-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => {
                                setFormData((prev) => ({
                                  ...prev,
                                  followUpCalls: prev.followUpCalls.filter((c) => c.id !== call.id),
                                }))
                              }}
                              className="text-gray-400 hover:text-white p-2"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>

                            {formData.followUpCalls.length < 4 && (
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => {
                                  const newCall = { id: Date.now().toString(), delay: 5, unit: "minutos" }
                                  setFormData((prev) => ({
                                    ...prev,
                                    followUpCalls: [...prev.followUpCalls, newCall],
                                  }))
                                }}
                                className="text-gray-400 hover:text-white p-2"
                              >
                                <Plus className="h-4 w-4" />
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}

                    {formData.followUpCalls.length < 4 && (
                      <Button
                        onClick={() => {
                          const newCall = { id: Date.now().toString(), delay: 5, unit: "minutos" }
                          setFormData((prev) => ({
                            ...prev,
                            followUpCalls: [...prev.followUpCalls, newCall],
                          }))
                        }}
                        className="w-full bg-[#5E17EB] hover:bg-[#5E17EB]/90 text-white"
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Agregar llamada de seguimiento
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-[#05000E] border-[#1a1a1c]">
                <CardContent className="p-6">
                  <h3 className="text-lg font-medium text-white mb-6">Días y horario de llamada</h3>

                  <div className="space-y-6">
                    <div>
                      <h4 className="text-base font-medium text-white mb-3">Días de llamada</h4>
                      <div className="flex flex-wrap gap-2">
                        {weekDays.map((day) => (
                          <Button
                            key={day}
                            variant={formData.selectedDays.includes(day) ? "default" : "outline"}
                            size="sm"
                            onClick={() => toggleDay(day)}
                            className={
                              formData.selectedDays.includes(day)
                                ? "bg-[#5E17EB] hover:bg-[#5E17EB]/90 text-white border-0 px-6 py-3 rounded-lg font-medium"
                                : "border-[#374151] text-gray-400 hover:text-white hover:border-gray-300 bg-[#1A1A1C] px-6 py-3 rounded-lg font-medium"
                            }
                          >
                            {day}
                          </Button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="text-base font-medium text-white">Horario de llamadas</h4>
                      </div>

                      <div className="space-y-4 mb-6">
                        {timeSlots.map((slot, index) => (
                          <div key={slot.id} className="flex items-center gap-4">
                            <span className="text-white text-sm">Llamar de:</span>
                            <div className="flex items-center gap-2 bg-[#1A1A1C] rounded-lg px-4 py-3 border border-[#4B5563]">
                              <Input
                                type="time"
                                value={slot.startTime}
                                onChange={(e) => updateTimeSlot(slot.id, "startTime", e.target.value)}
                                className="bg-transparent border-0 text-white p-0 h-auto focus-visible:ring-0 focus-visible:ring-offset-0"
                              />
                            </div>
                            <span className="text-white text-sm">a</span>
                            <div className="flex items-center gap-2 bg-[#1A1A1C] rounded-lg px-4 py-3 border border-[#4B5563]">
                              <Clock className="h-4 w-4 text-gray-400" />
                              <Input
                                type="time"
                                value={slot.endTime}
                                onChange={(e) => updateTimeSlot(slot.id, "endTime", e.target.value)}
                                className="bg-transparent border-0 text-white p-0 h-auto focus-visible:ring-0 focus-visible:ring-offset-0"
                              />
                            </div>
                            <div className="flex items-center gap-2">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => removeTimeSlot(slot.id)}
                                className="text-gray-400 hover:text-white p-2"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                              {timeSlots.length < 4 && (
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={addTimeSlot}
                                  className="text-gray-400 hover:text-white p-2"
                                >
                                  <Plus className="h-4 w-4" />
                                </Button>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>

                      {timeSlots.length < 4 && (
                        <Button
                          onClick={addTimeSlot}
                          className="w-full bg-[#5E17EB] hover:bg-[#5E17EB]/90 text-white py-3 rounded-lg font-medium"
                        >
                          <Plus className="h-4 w-4 mr-2" />
                          Agregar más horarios
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          <Dialog open={showCustomTimeModal} onOpenChange={setShowCustomTimeModal}>
            <DialogContent className="bg-[#1A1A1C] border-[#374151] text-white">
              <DialogHeader>
                <DialogTitle>Horario Personalizado</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label className="text-sm font-medium text-gray-300 mb-2 block">Hora de inicio</Label>
                  <Input
                    type="time"
                    value={customTimeRange.start}
                    onChange={(e) => setCustomTimeRange((prev) => ({ ...prev, start: e.target.value }))}
                    className="bg-[#1A1A1C] border-[#4B5563] text-white h-10 rounded-md"
                  />
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-300 mb-2 block">Hora de fin</Label>
                  <Input
                    type="time"
                    value={customTimeRange.end}
                    onChange={(e) => setCustomTimeRange((prev) => ({ ...prev, end: e.target.value }))}
                    className="bg-[#1A1A1C] border-[#4B5563] text-white h-10 rounded-md"
                  />
                </div>
              </div>
              <div className="flex justify-end gap-3 mt-6">
                <Button
                  variant="outline"
                  onClick={() => {
                    setShowCustomTimeModal(false)
                    setCustomTimeRange({ start: "", end: "" })
                  }}
                  className="border-[#374151] text-gray-400 hover:text-white"
                >
                  Cancelar
                </Button>
                <Button
                  onClick={handleCustomTime}
                  disabled={!customTimeRange.start || !customTimeRange.end}
                  className="bg-[#5E17EB] hover:bg-[#5E17EB]/90 text-white"
                >
                  Agregar
                </Button>
              </div>
            </DialogContent>
          </Dialog>

          <div className="flex justify-between items-center pt-8 pb-8 max-w-6xl mx-auto">
            <Button
              variant="outline"
              onClick={handleSaveDraft}
              className="border-gray-600 text-gray-400 hover:text-white"
            >
              Guardar borrador
            </Button>
            <Button className="bg-[#5E17EB] hover:bg-[#5E17EB]/90 text-white" onClick={handleSaveCampaign}>
              Guardar y Crear Campaña
            </Button>
          </div>
        </main>
      </div>
      {/* Cancel Confirmation Dialog */}
      <AlertDialog open={showCancelDialog} onOpenChange={setShowCancelDialog}>
        <AlertDialogContentComponent className="bg-[#1A1A1C] border-[#374151] text-white">
          <AlertDialogHeader>
            <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
            <AlertDialogDescription className="text-gray-400">
              Se perderán todos los cambios no guardados. Esta acción no se puede deshacer.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancelComponent className="border-[#374151] text-gray-400 hover:text-white">
              Continuar editando
            </AlertDialogCancelComponent>
            <AlertDialogActionComponent onClick={confirmCancel} className="bg-red-600 hover:bg-red-700 text-white">
              Sí, cancelar
            </AlertDialogActionComponent>
          </AlertDialogFooter>
        </AlertDialogContentComponent>
      </AlertDialog>
    </div>
  )
}
