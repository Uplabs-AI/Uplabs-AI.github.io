"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter, useParams } from "next/navigation"
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

export default function EditSurveyPage() {
  const router = useRouter()
  const params = useParams()
  const surveyId = params.id as string

  const [surveyName, setSurveyName] = useState("")
  const [description, setDescription] = useState("")
  const [businessContact, setBusinessContact] = useState("")
  const [loading, setLoading] = useState(true)

  // Variables de usuario disponibles
  const [userVariables] = useState([
    { id: 1, name: "Nombre", variable: "{{nombre_usuario}}" },
    { id: 2, name: "Apellido", variable: "{{apellido_usuario}}" },
    { id: 3, name: "Celular", variable: "{{celular_usuario}}" },
    { id: 4, name: "Usuario de..", variable: "{{usuario_de}}" },
    { id: 5, name: "Empresa", variable: "{{empresa}}" },
    { id: 6, name: "Nombre del agente", variable: "{{nombre_agente}}" },
  ])

  // Flujo de Conversación dinámico
  const [messages, setMessages] = useState([
    {
      id: 1,
      title: "Primer Mensaje",
      text: "",
      yesResponse: "",
      noResponse: "",
      isTextarea: false,
    },
    {
      id: 2,
      title: "Segundo Mensaje",
      text: "",
      yesResponse: "",
      noResponse: "",
      isTextarea: true,
    },
  ])

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

  // Manejo de Objeción
  const [objectionHandling, setObjectionHandling] = useState("")
  const [conversationEnd, setConversationEnd] = useState("")

  // Load survey data on component mount
  useEffect(() => {
    const loadSurvey = () => {
      try {
        // Get surveys from localStorage
        const savedSurveys = JSON.parse(localStorage.getItem("surveys") || "[]")

        // Initial surveys data for fallback
        const initialSurveysData = [
          {
            id: "1",
            name: "Satisfacción Cliente Q1",
            type: "NPS" as const,
            description: "Mide la lealtad y satisfacción general de clientes en el primer trimestre",
            questions: 3,
            createdDate: "01/01/2023",
            status: "active" as const,
          },
          {
            id: "2",
            name: "Feedback Producto Nuevo",
            type: "CSAT" as const,
            description: "Evalúa la satisfacción con el lanzamiento del nuevo producto",
            questions: 5,
            createdDate: "15/04/2023",
            status: "active" as const,
          },
          {
            id: "3",
            name: "Evaluación de Servicio",
            type: "CES" as const,
            description: "Analiza la facilidad de uso y experiencia del servicio al cliente",
            questions: 4,
            createdDate: "01/06/2023",
            status: "paused" as const,
          },
          {
            id: "4",
            name: "Plantilla NPS Estándar",
            type: "NPS" as const,
            description: "Plantilla base para encuestas de Net Promoter Score estándar",
            questions: 3,
            createdDate: "10/03/2023",
            status: "template" as const,
          },
          {
            id: "5",
            name: "Satisfacción Post-Compra",
            type: "CSAT" as const,
            description: "Mide la satisfacción del cliente después de completar una compra",
            questions: 6,
            createdDate: "01/07/2023",
            status: "scheduled" as const,
          },
        ]

        // Combine all surveys
        const allSurveys = [...initialSurveysData, ...savedSurveys]

        // Find the survey by ID
        const survey = allSurveys.find((s: any) => s.id === surveyId)

        if (survey) {
          setSurveyName(survey.name)
          setDescription(survey.description)

          // Load survey data if it exists
          if (survey.data) {
            setBusinessContact(survey.data.businessContact || "")
            if (survey.data.messages && survey.data.messages.length > 0) {
              setMessages(survey.data.messages)
            }
            if (survey.data.questions && survey.data.questions.length > 0) {
              setQuestions(survey.data.questions)
            }
            setObjectionHandling(survey.data.objectionHandling || "")
            setConversationEnd(survey.data.conversationEnd || "")
          }
        } else {
          // Survey not found, redirect back
          alert("Encuesta no encontrada")
          router.push("/surveys")
        }
      } catch (error) {
        console.error("Error loading survey:", error)
        alert("Error al cargar la encuesta")
        router.push("/surveys")
      } finally {
        setLoading(false)
      }
    }

    if (surveyId) {
      loadSurvey()
    }
  }, [surveyId, router])

  // Funciones para mensajes
  const addMessage = () => {
    const newMessage = {
      id: Date.now(),
      title: `Mensaje ${messages.length + 1}`,
      text: "",
      yesResponse: "",
      noResponse: "",
      isTextarea: false,
    }
    setMessages([...messages, newMessage])
  }

  const addMessageAfter = (afterId: number) => {
    const afterIndex = messages.findIndex((m) => m.id === afterId)
    const newMessage = {
      id: Date.now(),
      title: `Mensaje ${messages.length + 1}`,
      text: "",
      yesResponse: "",
      noResponse: "",
      isTextarea: false,
    }
    const newMessages = [...messages]
    newMessages.splice(afterIndex + 1, 0, newMessage)
    setMessages(newMessages)
  }

  const removeMessage = (id: number) => {
    if (messages.length > 1) {
      setMessages(messages.filter((m) => m.id !== id))
    }
  }

  const updateMessage = (id: number, field: string, value: any) => {
    setMessages(messages.map((m) => (m.id === id ? { ...m, [field]: value } : m)))
  }

  const insertVariable = (messageId: number, variable: string) => {
    const message = messages.find((m) => m.id === messageId)
    if (message) {
      const newText = message.text + variable
      updateMessage(messageId, "text", newText)
    }
  }

  const insertVariableToTextarea = (messageId: number, variable: string) => {
    const message = messages.find((m) => m.id === messageId)
    if (message) {
      const newText = message.text + variable
      updateMessage(messageId, "text", newText)
    }
  }

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

  const handleUpdate = () => {
    if (!surveyName.trim()) {
      alert("Por favor, ingrese un nombre para la encuesta")
      return
    }

    try {
      // Get existing surveys
      const existingSurveys = JSON.parse(localStorage.getItem("surveys") || "[]")

      // Check if this is a saved survey (exists in localStorage) or an initial survey
      const existingSurveyIndex = existingSurveys.findIndex((survey: any) => survey.id === surveyId)

      const updatedSurvey = {
        id: surveyId,
        name: surveyName,
        type: "NPS" as const,
        description: description || "Encuesta personalizada",
        questions: questions.length,
        createdDate: new Date().toLocaleDateString("es-ES"),
        status: "active" as const,
        data: {
          businessContact,
          messages: messages,
          questions: questions,
          objectionHandling,
          conversationEnd,
        },
      }

      let updatedSurveys
      if (existingSurveyIndex >= 0) {
        // Update existing survey
        updatedSurveys = [...existingSurveys]
        updatedSurveys[existingSurveyIndex] = updatedSurvey
      } else {
        // Add as new survey (was an initial survey, now being saved)
        updatedSurveys = [...existingSurveys, updatedSurvey]
      }

      // Save updated surveys
      localStorage.setItem("surveys", JSON.stringify(updatedSurveys))

      alert(`Encuesta "${surveyName}" actualizada exitosamente`)
      router.push("/surveys")
    } catch (error) {
      console.error("Error updating survey:", error)
      alert("Error al actualizar la encuesta")
    }
  }

  const handleDelete = () => {
    if (confirm(`¿Estás seguro de que quieres eliminar la encuesta "${surveyName}"?`)) {
      try {
        const existingSurveys = JSON.parse(localStorage.getItem("surveys") || "[]")
        const updatedSurveys = existingSurveys.filter((survey: any) => survey.id !== surveyId)
        localStorage.setItem("surveys", JSON.stringify(updatedSurveys))

        alert("Encuesta eliminada exitosamente")
        router.push("/surveys")
      } catch (error) {
        console.error("Error deleting survey:", error)
        alert("Error al eliminar la encuesta")
      }
    }
  }

  if (loading) {
    return (
      <div className="flex h-screen bg-[#121212]">
        <Sidebar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-white">Cargando encuesta...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex h-screen bg-[#121212]">
      <Sidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="flex items-center justify-between p-6 border-b border-[#262626] bg-[#121212]">
          <div className="flex items-center gap-4">
            <Link href="/surveys">
              <Button
                variant="ghost"
                size="sm"
                className="text-[#9CA3AF] hover:text-white hover:bg-[#374151]/50 transition-colors"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Volver
              </Button>
            </Link>
            <div>
              <h1 className="text-xl font-bold text-white">Editar encuesta</h1>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              className="border-red-600 text-red-400 hover:bg-red-600 hover:text-white transition-all"
              onClick={handleDelete}
            >
              Eliminar
            </Button>
            <Button
              variant="outline"
              className="border-[#4B5563] text-[#9CA3AF] hover:bg-[#374151] hover:text-white hover:border-[#6B7280] transition-all"
              onClick={() => router.push("/surveys")}
            >
              Cancelar
            </Button>
            <Button className="bg-[#5E17EB] hover:bg-[#5E17EB]/90 text-white transition-colors" onClick={handleUpdate}>
              Actualizar encuesta
            </Button>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-4xl mx-auto space-y-6">
            {/* Información básica */}
            <Card className="bg-[#0A0A0A] border-[#262626]">
              <CardHeader>
                <CardTitle className="text-white text-lg">Información básica</CardTitle>
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

            {/* Flujo de Conversación */}
            <Card className="bg-[#0A0A0A] border-[#262626]">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-white text-lg">Flujo de Conversación</CardTitle>
                <span className="text-[#5E17EB] text-sm">{messages.length} mensajes</span>
              </CardHeader>
              <CardContent className="space-y-6">
                {messages.map((message, index) => (
                  <div key={message.id} className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Label className="text-[#D1D5DB]">{message.title}</Label>
                      <div className="flex gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-[#6B7280] hover:text-[#EF4444]"
                          onClick={() => removeMessage(message.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-[#6B7280] hover:text-[#5E17EB]"
                          onClick={() => addMessageAfter(message.id)}
                        >
                          <Plus className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>

                    {message.isTextarea ? (
                      <Textarea
                        placeholder={
                          index === 1
                            ? "Mucho gusto, (nombre_usuario). Soy (nombre_agente) de (empresa). ¿Tiene unos minutos para una breve encuesta?"
                            : "Escribe tu mensaje..."
                        }
                        value={message.text}
                        onChange={(e) => updateMessage(message.id, "text", e.target.value)}
                        className="bg-[#1A1A1C] border-[#4B5563] text-white placeholder:text-[#6B7280] focus:border-[#5E17EB] min-h-[60px]"
                      />
                    ) : (
                      <>
                        <Input
                          placeholder={index === 0 ? "Hola, ¿hablo con {{nombre_usuario}}?" : "Escribe tu mensaje..."}
                          value={message.text}
                          onChange={(e) => updateMessage(message.id, "text", e.target.value)}
                          className="bg-[#1A1A1C] border-[#4B5563] text-white placeholder:text-[#6B7280] focus:border-[#5E17EB]"
                        />

                        {/* Variables disponibles */}
                        <div className="flex flex-wrap gap-2 mt-2">
                          {userVariables.map((variable) => (
                            <button
                              key={variable.id}
                              type="button"
                              onClick={() => insertVariable(message.id, variable.variable)}
                              className="px-3 py-1 text-xs bg-[#5E17EB]/20 text-[#C8B4FF] border border-[#5E17EB]/30 rounded-full hover:bg-[#5E17EB]/30 transition-colors"
                            >
                              {variable.name}
                            </button>
                          ))}
                        </div>
                      </>
                    )}

                    {message.isTextarea && (
                      /* Variables disponibles para textarea */
                      <div className="flex flex-wrap gap-2 mt-2">
                        {userVariables.map((variable) => (
                          <button
                            key={variable.id}
                            type="button"
                            onClick={() => insertVariableToTextarea(message.id, variable.variable)}
                            className="px-3 py-1 text-xs bg-[#5E17EB]/20 text-[#C8B4FF] border border-[#5E17EB]/30 rounded-full hover:bg-[#5E17EB]/30 transition-colors"
                          >
                            {variable.name}
                          </button>
                        ))}
                      </div>
                    )}

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label className="text-[#D1D5DB]">Si responde Sí</Label>
                        <Input
                          placeholder={
                            index === 0
                              ? "Continuar con segundo mensaje"
                              : index === 1
                                ? "Proceder con encuesta..."
                                : "Respuesta positiva..."
                          }
                          value={message.yesResponse}
                          onChange={(e) => updateMessage(message.id, "yesResponse", e.target.value)}
                          className="bg-[#241B2B] border-[#4B5563] text-white placeholder:text-[#6B7280] focus:border-[#5E17EB]"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-[#D1D5DB]">Si responde No</Label>
                        <Input
                          placeholder={
                            index === 0
                              ? "Realiza el manejo de objeción..."
                              : index === 1
                                ? "Obtener seguimiento..."
                                : "Respuesta negativa..."
                          }
                          value={message.noResponse}
                          onChange={(e) => updateMessage(message.id, "noResponse", e.target.value)}
                          className="bg-[#241B2B] border-[#4B5563] text-white placeholder:text-[#6B7280] focus:border-[#5E17EB]"
                        />
                      </div>
                    </div>

                    {index < messages.length - 1 && <Separator className="bg-[#262626]" />}
                  </div>
                ))}

                <div className="flex justify-center">
                  <Button
                    onClick={addMessage}
                    variant="outline"
                    className="border-[#4B5563] text-[#9CA3AF] hover:bg-[#374151] hover:text-white w-full max-w-md"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Agregar mensaje
                  </Button>
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
                        value={question.type}
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
                            <Label className="text-[#D1D5DB]">Si la respuesta esta en el rango del 0 al 6</Label>
                            <Input
                              placeholder="Puede comentarme su experiencia..."
                              value={question.yesResponse}
                              onChange={(e) => updateQuestion(question.id, "yesResponse", e.target.value)}
                              className="bg-[#241B2B] border-[#4B5563] text-white placeholder:text-[#6B7280] focus:border-[#5E17EB]"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label className="text-[#D1D5DB]">Si la respuesta esta en el rango del 7 al 10</Label>
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

            {/* Manejo de Objeción y Finalización */}
            <Card className="bg-[#0A0A0A] border-[#262626]">
              <CardHeader>
                <CardTitle className="text-white text-lg">Manejo de Objeción y Finalización</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-[#D1D5DB]">Cuando el usuario no está interesado</Label>
                  <Textarea
                    placeholder="Realiza el manejo de objeción..."
                    value={objectionHandling}
                    onChange={(e) => setObjectionHandling(e.target.value)}
                    className="bg-[#1A1A1C] border-[#4B5563] text-white placeholder:text-[#6B7280] focus:border-[#5E17EB] min-h-[60px]"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-[#D1D5DB]">Finalización de la conversación</Label>
                  <Textarea
                    placeholder="Muchas gracias por tu tiempo. Qué tengas un excelente día"
                    value={conversationEnd}
                    onChange={(e) => setConversationEnd(e.target.value)}
                    className="bg-[#1A1A1C] border-[#4B5563] text-white placeholder:text-[#6B7280] focus:border-[#5E17EB] min-h-[60px]"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Botones de acción finales */}
            <div className="flex items-center justify-end gap-4 py-6">
              <Button
                variant="outline"
                onClick={() => router.push("/surveys")}
                className="border-[#4B5563] text-[#9CA3AF] hover:bg-[#374151] hover:text-white hover:border-[#6B7280] transition-all px-8"
              >
                Cancelar
              </Button>
              <Button
                onClick={handleUpdate}
                className="bg-[#5E17EB] hover:bg-[#5E17EB]/90 text-white transition-colors px-8"
              >
                Actualizar Encuesta
              </Button>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
