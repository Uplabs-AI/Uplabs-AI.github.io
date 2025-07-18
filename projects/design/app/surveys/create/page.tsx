"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, Plus, Trash2 } from "lucide-react"
import { Sidebar } from "@/components/layout/sidebar"
import { cn } from "@/lib/utils"
import { useToast } from "@/components/ui/use-toast"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

export default function CreateSurveyPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [surveyName, setSurveyName] = useState("")
  const [description, setDescription] = useState("")
  const [businessContact, setBusinessContact] = useState("")
  const [isFromCampaigns, setIsFromCampaigns] = useState(false)
  const [showCancelDialog, setShowCancelDialog] = useState(false)

  // Check if coming from campaigns
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const origin = localStorage.getItem("surveyCreateOrigin")
      setIsFromCampaigns(origin === "campaigns-create-2")
    }
  }, [])

  // Preguntas dinámicas
  const [questions, setQuestions] = useState([
    {
      id: 1,
      type: "abierta",
      text: "",
      conditional: "",
      yesResponse: "",
      noResponse: "",
      scale: 5,
    },
    {
      id: 2,
      type: "si-no",
      text: "",
      conditional: "",
      yesResponse: "",
      noResponse: "",
      scale: 5,
    },
    {
      id: 3,
      type: "escala-0-10",
      text: "",
      conditional: "",
      yesResponse: "",
      noResponse: "",
      scale: 5,
    },
    {
      id: 4,
      type: "escala-0-5",
      text: "",
      conditional: "",
      yesResponse: "",
      noResponse: "",
      scale: 3,
    },
  ])

  // Funciones para preguntas
  const addQuestion = () => {
    const newQuestion = {
      id: Date.now(),
      type: "abierta",
      text: "",
      conditional: "",
      yesResponse: "",
      noResponse: "",
      scale: 5,
    }
    setQuestions([...questions, newQuestion])
  }

  const addQuestionAfter = (afterId: number) => {
    const afterIndex = questions.findIndex((q) => q.id === afterId)
    const newQuestion = {
      id: Date.now(),
      type: "abierta",
      text: "",
      conditional: "",
      yesResponse: "",
      noResponse: "",
      scale: 5,
    }
    const newQuestions = [...questions]
    newQuestions.splice(afterIndex + 1, 0, newQuestion)
    setQuestions(newQuestions)
  }

  const removeQuestion = (id: number) => {
    if (questions.length > 1) {
      setQuestions(questions.filter((q) => q.id !== id))
    }
  }

  const updateQuestion = (id: number, field: string, value: any) => {
    setQuestions(questions.map((q) => (q.id === id ? { ...q, [field]: value } : q)))
  }

  const handleSaveSurvey = async () => {
    if (typeof window === 'undefined') return

    try {
      const newSurvey = {
        id: `survey-${Date.now()}`,
        name: surveyName,
        description,
        businessContact,
        type: "NPS" as const,
        status: "draft" as const,
        createdDate: new Date().toLocaleDateString("es-ES"),
        questions: questions.filter((q) => q.text.trim()).length,
      }

      console.log("Saving new survey:", newSurvey) // Debug log

      // Obtener encuestas existentes de localStorage
      const existingSurveys = JSON.parse(localStorage.getItem("surveys") || "[]")
      console.log("Existing surveys:", existingSurveys) // Debug log

      const updatedSurveys = [...existingSurveys, newSurvey]
      console.log("Updated surveys to save:", updatedSurveys) // Debug log

      // Guardar en localStorage
      localStorage.setItem("surveys", JSON.stringify(updatedSurveys))

      // Verificar que se guardó correctamente
      const verifyData = JSON.parse(localStorage.getItem("surveys") || "[]")
      console.log("Verified saved data:", verifyData) // Debug log

      // If coming from campaigns, save the survey data for campaigns page to pick up
      if (isFromCampaigns) {
        localStorage.setItem("newSurveyFromCreate", JSON.stringify(newSurvey))
        localStorage.removeItem("surveyCreateOrigin")
      }

      toast({
        title: "Encuesta Creada",
        description: "La encuesta se ha guardado exitosamente.",
      })

      // Navigate based on origin
      if (isFromCampaigns) {
        router.push("/campaigns/create-2")
      } else {
        // Custom event to notify other tabs
        if (typeof window !== 'undefined') {
          const event = new CustomEvent("surveyCreated", {
            detail: newSurvey,
          })
          window.dispatchEvent(event)

          // Storage event
          window.dispatchEvent(
            new StorageEvent("storage", {
              key: "surveys",
              newValue: JSON.stringify(updatedSurveys),
              storageArea: localStorage,
            }),
          )
        }

        router.push("/surveys")
      }
    } catch (error) {
      console.error("Error al guardar la encuesta:", error)
      toast({
        title: "Error",
        description: "Hubo un problema al guardar la encuesta. Inténtalo de nuevo.",
        variant: "destructive",
      })
    }
  }

  const handleCancel = () => {
    if (surveyName || description || businessContact || questions.some((q) => q.text)) {
      setShowCancelDialog(true)
    } else {
      // Limpiar datos temporales
      if (typeof window !== 'undefined') {
        localStorage.removeItem("surveyCreateOrigin")
      }

      if (isFromCampaigns) {
        router.push("/campaigns/create-2")
      } else {
        router.push("/surveys")
      }
    }
  }

  const confirmCancel = () => {
    setShowCancelDialog(false)
    // Limpiar datos temporales
    if (typeof window !== 'undefined') {
      localStorage.removeItem("surveyCreateOrigin")
    }

    if (isFromCampaigns) {
      router.push("/campaigns/create-2")
    } else {
      router.push("/surveys")
    }
  }

  const getBackUrl = () => {
    return isFromCampaigns ? "/campaigns/create-2" : "/surveys"
  }

  return (
    <div className="min-h-screen bg-[#121212] text-white flex">
      {/* Sidebar */}
      <div className="w-64 flex-shrink-0">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        <main className="flex-1 overflow-y-auto p-6">
          <div className="flex items-center justify-between mb-8">
            <Link href={getBackUrl()} passHref>
              <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white p-0">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Regresar
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
              <Button className="bg-[#5E17EB] hover:bg-[#5E17EB]/90 text-white" onClick={handleSaveSurvey}>
                Guardar Encuesta
              </Button>
            </div>
          </div>

          <div className="max-w-6xl mx-auto space-y-8">
            <Card className="bg-[#05000E] border-[#1a1a1c]">
              <CardHeader>
                <CardTitle className="text-white">Información General</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-[#D1D5DB]">Nombre de la encuesta</Label>
                  <Input
                    placeholder="Escribe el nombre de la encuesta"
                    value={surveyName}
                    onChange={(e) => setSurveyName(e.target.value)}
                    className="bg-[#1A1A1C] border-[#4B5563] text-white placeholder:text-[#6B7280] focus:border-[#5E17EB]"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-[#D1D5DB]">Descripción</Label>
                  <Textarea
                    placeholder="Mide, evalúa, analiza..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="bg-[#1A1A1C] border-[#4B5563] text-white placeholder:text-[#6B7280] focus:border-[#5E17EB] min-h-[120px]"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-[#D1D5DB]">Contexto del Producto o Servicio</Label>
                  <Textarea
                    placeholder="El producto o servicio es..."
                    value={businessContact}
                    onChange={(e) => setBusinessContact(e.target.value)}
                    className="bg-[#1A1A1C] border-[#4B5563] text-white placeholder:text-[#6B7280] focus:border-[#5E17EB] min-h-[120px]"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Preguntas */}
            <Card className="bg-[#0A0A0A] border-[#262626]">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-white text-lg">Preguntas</CardTitle>
                <span className="text-[#5E17EB] text-sm">{questions.length} preguntas</span>
              </CardHeader>
              <CardContent className="space-y-8">
                {questions.map((question, index) => (
                  <div key={question.id} className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-[#5E17EB] font-medium">Pregunta {index + 1}</h3>
                      <div className="flex gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-[#6B7280] hover:text-[#EF4444]"
                          onClick={() => removeQuestion(question.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-[#6B7280] hover:text-[#5E17EB]"
                          onClick={() => addQuestionAfter(question.id)}
                        >
                          <Plus className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-[#D1D5DB]">Tipo de pregunta</Label>
                      <Select
                        defaultValue={question.type}
                        onValueChange={(value) => updateQuestion(question.id, "type", value)}
                      >
                        <SelectTrigger className="bg-[#1A1A1C] border-[#4B5563] text-white">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-[#1A1A1C] border-[#4B5563]">
                          <SelectItem value="abierta" className="text-white">
                            Abierta
                          </SelectItem>
                          <SelectItem value="si-no" className="text-white">
                            Sí / No
                          </SelectItem>
                          <SelectItem value="escala-0-10" className="text-white">
                            Escala del 0-10
                          </SelectItem>
                          <SelectItem value="escala-0-5" className="text-white">
                            Escala del 0-5
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-[#D1D5DB]">Pregunta</Label>
                      <Input
                        placeholder="Escribe tu pregunta"
                        value={question.text}
                        onChange={(e) => updateQuestion(question.id, "text", e.target.value)}
                        className="bg-[#1A1A1C] border-[#4B5563] text-white placeholder:text-[#6B7280] focus:border-[#5E17EB]"
                      />
                    </div>

                    {question.type === "abierta" && (
                      <div className="space-y-2">
                        <Label className="text-[#C8B4FF]">Condicional:</Label>
                        <Input
                          placeholder="Si el cliente..."
                          value={question.conditional}
                          onChange={(e) => updateQuestion(question.id, "conditional", e.target.value)}
                          className="bg-[#241B2B] border-[#4B5563] text-white placeholder:text-[#6B7280] focus:border-[#C8B4FF]"
                        />
                      </div>
                    )}

                    {question.type === "si-no" && (
                      <>
                        <div className="space-y-3">
                          <Label className="text-[#D1D5DB]">Opciones de respuesta</Label>
                          <RadioGroup
                            value={question.yesResponse || "Si"}
                            onValueChange={(value) => updateQuestion(question.id, "yesResponse", value)}
                            className="flex gap-6"
                          >
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="Si" className="border-[#4B5563] text-[#5E17EB]" />
                              <Label className="text-[#D1D5DB]">Sí</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="No" className="border-[#4B5563] text-[#5E17EB]" />
                              <Label className="text-[#D1D5DB]">No</Label>
                            </div>
                          </RadioGroup>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label className="text-[#D1D5DB]">Si responde Sí</Label>
                            <Input
                              placeholder="Gracias, eso significa mucho..."
                              value={question.yesResponse}
                              onChange={(e) => updateQuestion(question.id, "yesResponse", e.target.value)}
                              className="bg-[#241B2B] border-[#4B5563] text-white placeholder:text-[#6B7280] focus:border-[#5E17EB]"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label className="text-[#D1D5DB]">Si responde No</Label>
                            <Input
                              placeholder="¿Qué podríamos mejorar?"
                              value={question.noResponse}
                              onChange={(e) => updateQuestion(question.id, "noResponse", e.target.value)}
                              className="bg-[#241B2B] border-[#4B5563] text-white placeholder:text-[#6B7280] focus:border-[#5E17EB]"
                            />
                          </div>
                        </div>
                      </>
                    )}

                    {question.type === "escala-0-10" && (
                      <>
                        <div className="space-y-3">
                          <Label className="text-[#D1D5DB]">Escala de valoración</Label>
                          <div className="flex justify-between items-center">
                            {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((value) => (
                              <button
                                key={value}
                                type="button"
                                className={cn(
                                  "w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium transition-all",
                                  question.scale === value
                                    ? "bg-[#5E17EB] text-white shadow-lg scale-110"
                                    : "border border-[#4B5563] text-[#9CA3AF] hover:border-[#6B7280] hover:text-[#D1D5DB]",
                                )}
                                onClick={() => updateQuestion(question.id, "scale", value)}
                              >
                                {value}
                              </button>
                            ))}
                          </div>
                          <div className="h-2 bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 rounded-full"></div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label className="text-[#D1D5DB]">Si la respuesta está en el rango del 0 al 6</Label>
                            <Input
                              placeholder="Puede comentarme su experiencia..."
                              value={question.yesResponse}
                              onChange={(e) => updateQuestion(question.id, "yesResponse", e.target.value)}
                              className="bg-[#241B2B] border-[#4B5563] text-white placeholder:text-[#6B7280] focus:border-[#5E17EB]"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label className="text-[#D1D5DB]">Si la respuesta está en el rango del 7 al 10</Label>
                            <Input
                              placeholder="Excelente, comentame que te gustó...."
                              value={question.noResponse}
                              onChange={(e) => updateQuestion(question.id, "noResponse", e.target.value)}
                              className="bg-[#241B2B] border-[#4B5563] text-white placeholder:text-[#6B7280] focus:border-[#5E17EB]"
                            />
                          </div>
                        </div>
                      </>
                    )}

                    {question.type === "escala-0-5" && (
                      <>
                        <div className="space-y-3">
                          <Label className="text-[#D1D5DB]">Escala de valoración</Label>
                          <div className="flex justify-center gap-8">
                            {[1, 2, 3, 4, 5].map((value) => {
                              const emojis = {
                                1: "👎",
                                2: "👎",
                                3: "👍",
                                4: "👍",
                                5: "👍",
                              }

                              const colors = {
                                1: "text-red-500",
                                2: "text-orange-500",
                                3: "text-yellow-500",
                                4: "text-green-400",
                                5: "text-green-500",
                              }

                              return (
                                <button
                                  key={value}
                                  type="button"
                                  className={cn(
                                    "w-12 h-12 rounded-full flex items-center justify-center transition-all",
                                    question.scale === value
                                      ? "bg-[#5E17EB]/20 scale-110 shadow-lg"
                                      : "hover:bg-[#374151]/50",
                                    colors[value as keyof typeof colors],
                                  )}
                                  onClick={() => updateQuestion(question.id, "scale", value)}
                                >
                                  <span className="text-2xl">{emojis[value as keyof typeof emojis]}</span>
                                </button>
                              )
                            })}
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label className="text-[#D1D5DB]">Si la respuesta esta en el rango de 0 al 3</Label>
                            <Input
                              placeholder="Puede comentarme su experiencia..."
                              value={question.yesResponse}
                              onChange={(e) => updateQuestion(question.id, "yesResponse", e.target.value)}
                              className="bg-[#241B2B] border-[#4B5563] text-white placeholder:text-[#6B7280] focus:border-[#5E17EB]"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label className="text-[#D1D5DB]">Si la respuesta esta en el rango de 4 al 5</Label>
                            <Input
                              placeholder="Excelente, comentame que te gustó...."
                              value={question.noResponse}
                              onChange={(e) => updateQuestion(question.id, "noResponse", e.target.value)}
                              className="bg-[#241B2B] border-[#4B5563] text-white placeholder:text-[#6B7280] focus:border-[#5E17EB]"
                            />
                          </div>
                        </div>
                      </>
                    )}

                    <Separator className="bg-[#262626]" />
                  </div>
                ))}

                <div className="flex justify-center">
                  <Button
                    onClick={addQuestion}
                    variant="outline"
                    className="border-[#4B5563] text-[#9CA3AF] hover:bg-[#374151] hover:text-white w-full max-w-md"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Agregar pregunta
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Barra de acciones inferior */}
          <div className="flex justify-end space-x-3 mt-8">
            <Button
              variant="outline"
              onClick={handleCancel}
              className="border-gray-600 text-gray-400 hover:text-white"
            >
              Cancelar
            </Button>
            <Button
              className="bg-[#5E17EB] hover:bg-[#5E17EB]/90 text-white"
              onClick={handleSaveSurvey}
            >
              Guardar Encuesta
            </Button>
          </div>

        </main>
      </div>
      <AlertDialog open={showCancelDialog} onOpenChange={setShowCancelDialog}>
        <AlertDialogContent className="bg-[#1A1A1C] border-[#374151] text-white">
          <AlertDialogHeader>
            <AlertDialogTitle>¿Estás seguro de que quieres cancelar?</AlertDialogTitle>
            <AlertDialogDescription className="text-gray-400">
              Se perderán todos los cambios no guardados. Esta acción no se puede deshacer.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="border-[#374151] text-gray-400 hover:text-white">
              Continuar editando
            </AlertDialogCancel>
            <AlertDialogAction onClick={confirmCancel} className="bg-red-600 hover:bg-red-700 text-white">
              Sí, cancelar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
