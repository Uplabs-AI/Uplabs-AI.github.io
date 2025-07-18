"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { campaignService } from "@/lib/services/campaign-service"
import type { Campaign } from "@/lib/types/campaign"
import { Sidebar } from "@/components/layout/sidebar"
import { Calendar, Plus, Trash2 } from "lucide-react"
import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

export default function EditCampaignPage() {
  const { id } = useParams<{ id: string }>()
  const router = useRouter()
  const [campaign, setCampaign] = useState<Campaign | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const [followUpCalls, setFollowUpCalls] = useState<{ id: string; delay: number; unit: string }[]>([
    { id: "1", delay: 5, unit: "minutos" },
  ])

  // ----- DÍAS Y HORARIO DE LLAMADA -----
  const allDays = ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"]
  const [callDays, setCallDays] = useState<string[]>(["Lun", "Mar", "Mié", "Jue", "Vie"]) // laborales por defecto

  const toggleDay = (day: string) => {
    setCallDays((prev) => (prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]))
  }

  type Schedule = { id: string; start: string; end: string }
  const [callSchedules, setCallSchedules] = useState<Schedule[]>([
    { id: "1", start: "09:00", end: "18:00" },
  ])

  const MAX_SCHEDULES = 4
  const addSchedule = () => {
    if (callSchedules.length >= MAX_SCHEDULES) return
    setCallSchedules((prev) => [...prev, { id: Date.now().toString(), start: "09:00", end: "18:00" }])
  }
  const updateSchedule = (id: string, field: "start" | "end", value: string) => {
    setCallSchedules((prev) => prev.map((s) => (s.id === id ? { ...s, [field]: value } : s)))
  }
  const deleteSchedule = (id: string) => {
    if (callSchedules.length === 1) return // al menos un horario
    setCallSchedules((prev) => prev.filter((s) => s.id !== id))
  }

  // ----- FLUJO DE CONVERSACIÓN -----
  type Message = { id: string; text: string; yes: string; no: string }
  const defaultFlow: Message[] = [
    {
      id: "1",
      text: "Hola, ¿habló con {{nombre_usuario}}?",
      yes: "Continuar con segundo mensaje",
      no: "Termina la conversación...",
    },
    {
      id: "2",
      text: "Mucho gusto, {{nombre_usuario}}. Soy {{nombre_agente}} de {{mi_empresa}}, ¿Tiene unos minutos para una breve encuesta?",
      yes: "Proceder con encuesta...",
      no: "Realiza el manejo de objeción...",
    },
  ]

  const [messages, setMessages] = useState<Message[]>(defaultFlow)

  const addMessage = (index?: number) => {
    const newMsg: Message = {
      id: Date.now().toString(),
      text: "",
      yes: "",
      no: "",
    }
    setMessages((prev) => {
      if (index === undefined) return [...prev, newMsg]
      const copy = [...prev]
      copy.splice(index + 1, 0, newMsg)
      return copy
    })
  }

  const deleteMessage = (id: string) => {
    setMessages((prev) => (prev.length === 1 ? prev : prev.filter((m) => m.id !== id)))
  }

  const updateMessageField = (id: string, field: keyof Message, value: string) => {
    setMessages((prev) => prev.map((m) => (m.id === id ? { ...m, [field]: value } : m)))
  }

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await campaignService.fetchCampaigns()
        const found = data.find((c) => c.id === id)
        setCampaign(found ?? null)
      } catch (error) {
        /* eslint-disable no-console */
        console.error(error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [id])

  if (isLoading) {
    return <div className="min-h-screen bg-[#121212] flex items-center justify-center text-white">Cargando…</div>
  }

  if (!campaign) {
    return (
      <div className="min-h-screen bg-[#121212] flex flex-col items-center justify-center text-white space-y-6">
        <p>No se encontró la campaña solicitada.</p>
        <button
          onClick={() => router.push("/campaigns")}
          className="px-4 py-2 bg-[#5E17EB] hover:bg-[#5E17EB]/90 rounded-md text-sm"
        >
          Volver a campañas
        </button>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#121212] text-white flex">
      {/* Sidebar */}
      <div className="w-64 flex-shrink-0">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto p-6">
        {/* Flecha de navegación */}
        <div className="flex items-center justify-between mb-8">
          <Link href="/campaigns">
            <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hover:bg-accent h-9 rounded-md text-gray-400 hover:text-white p-0">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-left h-4 w-4 mr-2"><path d="m12 19-7-7 7-7"></path><path d="M19 12H5"></path></svg>
              Volver
            </button>
          </Link>

          {/* Barra de acciones duplicada */}
          <div className="flex gap-3">
            <button
              onClick={() => router.push("/campaigns")}
              className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium h-10 px-4 py-2 border border-[#374151] text-gray-400 hover:text-white hover:bg-[#374151] transition-colors"
            >
              Cancelar
            </button>
            <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium h-10 px-4 py-2 bg-[#5E17EB] hover:bg-[#5E17EB]/90 text-white transition-colors">
              Guardar
            </button>
          </div>
        </div>
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Información de la campaña */}
          <div className="rounded-lg border shadow-sm bg-[#05000E] border-[#1a1a1c]">
            <div className="p-6">
              <h3 className="text-lg font-medium text-white mb-6">Información de la Campaña</h3>

              <div className="space-y-6">
                {/* Nombre */}
                <div>
                  <label htmlFor="name" className="text-sm font-medium text-gray-300">
                    Nombre de la Campaña <span className="text-red-400">*</span>
                  </label>
                  <input
                    id="name"
                    defaultValue={campaign.name}
                    placeholder="Ej. Satisfacción Cliente Q2 2023"
                    className="mt-2 flex h-10 w-full rounded-md border px-3 py-2 text-base bg-[#1A1A1C] border-[#1A1A1C] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#5E17EB]"
                  />
                </div>

                {/* Fechas */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Fecha inicio */}
                  <div>
                    <label htmlFor="startDate" className="text-sm font-medium text-gray-300">
                      Fecha de Inicio <span className="text-red-400">*</span>
                    </label>
                    <div className="mt-2 flex items-center h-10 px-4 py-2 w-full rounded-md bg-[#1A1C1C] border border-[#1A1A1C] text-white">
                      <Calendar className="h-4 w-4 mr-2 text-gray-400" />
                      {campaign.startDate}
                    </div>
                  </div>

                  {/* Fecha Fin */}
                  <div>
                    <label htmlFor="endDate" className="text-sm font-medium text-gray-300">
                      Fecha de Finalización
                    </label>
                    <div className="mt-2 flex items-center h-10 px-4 py-2 w-full rounded-md bg-[#1A1C1C] border border-[#1A1A1C] text-white">
                      <Calendar className="h-4 w-4 mr-2 text-gray-400" />
                      {campaign.endDate || "—"}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Asignar lista de contactos */}
          <div className="rounded-lg border shadow-sm bg-[#05000E] border-[#1a1a1c]">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-medium text-white">Asignar Lista de contactos</h3>
                {/* Botón de importar contactos eliminado según solicitud */}
              </div>
              <button
                type="button"
                className="flex h-10 items-center justify-between rounded-md border px-3 py-2 text-sm w-full bg-[#1a1a1c] border-[#374151] text-white"
              >
                <span className="pointer-events-none">Selecciona una lista de contactos</span>
                ▾
              </button>
            </div>
          </div>

          {/* Selección de agente */}
          <div className="rounded-lg border shadow-sm bg-[#05000E] border-[#1a1a1c]">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-medium text-white">Selección de Agente</h3>
                <div className="flex items-center space-x-4">
                  <button className="underline text-[#5E17EB] text-sm">Ver todos los agentes</button>
                  <div className="relative">
                    <input
                      placeholder="Buscar agente..."
                      className="flex h-10 rounded-md border px-3 py-2 text-sm pl-10 bg-[#1A1A1C] border-[#1A1A1C] text-white placeholder-gray-400 w-48"
                    />
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-search absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400"
                    >
                      <circle cx="11" cy="11" r="8" />
                      <path d="m21 21-4.3-4.3" />
                    </svg>
                  </div>
                  {/* Botón 'Crear Nuevo Agente' eliminado según solicitud */}
                </div>
              </div>
              <p className="text-gray-300 text-sm mb-6">Seleccione un agente para esta campaña <span className="text-red-400">*</span></p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                { ["SofíA","MariA","ValeriA","LuciO"].map((name,index)=> {
                    // Convertir a slug sin acentos para coincidir con nombre de archivo
                    const slug = name
                      .normalize("NFD")
                      .replace(/[^\p{Letter}\p{Number}]/gu, "") // elimina diacríticos
                      .toLowerCase()
                    return (
                      <div key={index} className="rounded-lg border shadow-sm cursor-pointer transition-all duration-200 bg-[#1A1C1C] border-[#1A1A1C] hover:border-[#5e17eb]">
                        <div className="p-6 flex flex-col items-center text-center">
                          <div className="w-20 h-20 bg-black rounded-lg flex items-center justify-center border border-[#374151] mb-4">
                            <img src={`/agents/${slug}-icon-new.svg`} alt={name} className="w-16 h-16" />
                          </div>
                          <h4 className="text-lg font-semibold text-white mb-4">{name}</h4>
                          <div className="space-y-1 text-sm w-full text-center text-gray-400">
                            <div>Idioma: <span className="text-white">Español</span></div>
                            <div>Acento: <span className="text-white">Neutral</span></div>
                            <div>Tono: <span className="text-white">Casual</span></div>
                          </div>
                        </div>
                      </div>
                    )
                  }) }
              </div>
            </div>
          </div>

          {/* Flujo de Conversación */}
          <div className="rounded-lg border shadow-sm bg-[#05000E] border-[#1a1a1c]">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-medium text-white">Flujo de Conversación</h3>
                <span className="text-gray-400 text-sm">{messages.length} mensajes</span>
              </div>

              {messages.map((msg, idx) => (
                <div key={msg.id} className="space-y-4 mb-8 last:mb-0">
                  <div className="flex items-center justify-between">
                    <h4 className="text-base font-medium text-white">{`Mensaje ${idx + 1}`}</h4>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => deleteMessage(msg.id)}
                        className="text-gray-400 hover:text-white p-1"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => addMessage(idx)}
                        className="text-gray-400 hover:text-white p-1"
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <Textarea
                    value={msg.text}
                    onChange={(e) => updateMessageField(msg.id, "text", e.target.value)}
                    placeholder="Escribe el mensaje..."
                    className="bg-[#1A1A1C] border-[#4B5563] text-white min-h-[60px]"
                  />

                  {/* Etiquetas dinámicas */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {["Nombre", "Apellido", "Celular", "Empresa", "Rubro", "Nombre agente", "Mi empresa"].map((tag) => (
                      <div
                        key={tag}
                        onClick={() => updateMessageField(msg.id, "text", msg.text + ` {{${tag.toLowerCase().replace(/ /g, "_")}}}`)}
                        className="inline-flex items-center text-xs px-4 py-2 border-2 rounded-full cursor-pointer text-[#C8B4FF] border-[#290B67] hover:bg-[#290B67]/10 transition-colors"
                      >
                        {tag}
                      </div>
                    ))}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-400 mb-2 block">Si responde Sí</label>
                      <input
                        value={msg.yes}
                        onChange={(e) => updateMessageField(msg.id, "yes", e.target.value)}
                        className="flex w-full border px-3 py-2 text-base bg-[#241B2B] border-[#4B5563] text-white h-10 rounded-md focus:outline-none focus:ring-2 focus:ring-[#5E17EB]"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-400 mb-2 block">Si responde No</label>
                      <input
                        value={msg.no}
                        onChange={(e) => updateMessageField(msg.id, "no", e.target.value)}
                        className="flex w-full border px-3 py-2 text-base bg-[#241B2B] border-[#4B5563] text-white h-10 rounded-md focus:outline-none focus:ring-2 focus:ring-[#5E17EB]"
                      />
                    </div>
                  </div>
                </div>
              ))}

              <div className="flex justify-center pt-4">
                <Button
                  variant="outline"
                  onClick={() => addMessage()}
                  className="border-[#374151] text-gray-400 hover:text-white hover:border-gray-300 min-w-[600px]"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Agregar mensaje
                </Button>
              </div>
            </div>
          </div>

          {/* Selección de Encuesta */}
          <div className="rounded-lg border shadow-sm bg-[#05000E] border-[#1a1a1c]">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-medium text-white">Selección de Encuesta</h3>
                <div className="flex items-center space-x-4">
                  <button className="underline text-[#5E17EB] text-sm">Ver todas las encuestas</button>
                  <div className="relative">
                    <input
                      placeholder="Buscar encuesta..."
                      className="flex h-10 rounded-md border px-3 py-2 text-sm pl-10 bg-[#1A1A1C] border-[#4B5563] text-white placeholder-gray-400 w-48"
                    />
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-search absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
                  </div>
                  {/* Botón 'Crear Nueva Encuesta' eliminado según solicitud */}
                </div>
              </div>

              <p className="text-gray-300 text-sm mb-6">Seleccione una encuesta para esta campaña <span className="text-red-400">*</span></p>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                { [
                  { name: "Satisfacción del Cliente", type: "CSAT", questions: 5, color: "#10B981" },
                  { name: "Plantilla NPS Estándar", type: "NPS", questions: 2, color: "#8B5CF6" },
                  { name: "Evaluación Post-Compra", type: "CSAT", questions: 5, color: "#10B981" },
                  { name: "Plantilla NPS Producto", type: "NPS", questions: 2, color: "#8B5CF6" },
                  { name: "Evaluación de Servicio", type: "CES", questions: 5, color: "#10B981" },
                  { name: "Encuesta de Satisfacción", type: "NPS", questions: 10, color: "#8B5CF6" },
                  { name: "Feedback de Clientes", type: "CES", questions: 5, color: "#10B981" },
                  { name: "Encuesta de Lealtad", type: "NPS", questions: 10, color: "#8B5CF6" },
                ].map((survey) => (
                  <div key={survey.name} className="rounded-lg border shadow-sm cursor-pointer transition-all duration-200 bg-[#1A1A1C] border-[#1A1A1C] hover:border-[#5E17EB]/50">
                    <div className="p-4">
                      <h4 className="font-semibold text-white mb-3 text-sm">{survey.name}</h4>
                      <div className="flex items-center justify-between mb-2">
                        <div
                          className="inline-flex items-center rounded-full px-2.5 py-0.5 text-white text-xs font-semibold"
                          style={{ backgroundColor: survey.color }}
                        >
                          {survey.type}
                        </div>
                        <span className="text-xs text-gray-400">{survey.questions} preguntas</span>
                      </div>
                      <button className="text-[#5E17EB] text-xs underline-offset-4 hover:underline">Ver todas las preguntas</button>
                    </div>
                  </div>
                )) }
              </div>
            </div>
          </div>

          {/* Llamadas de seguimiento y Horarios */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Llamadas de seguimiento */}
            <div className="rounded-lg border shadow-sm bg-[#05000E] border-[#1a1a1c]">
              <div className="p-6">
                <h3 className="text-lg font-medium text-white mb-6">Llamadas de seguimiento</h3>

                <div className="space-y-6">
                  {followUpCalls.map((call,index) => (
                    <div key={call.id} className="space-y-4">
                      <h4 className="text-base font-medium text-white">{index === 0 ? "Segunda llamada" : `${index+2}° llamada`}</h4>

                      <div className="flex items-center gap-3">
                        <span className="text-white text-sm">Llamar después de:</span>

                        <div className="relative w-20">
                          <Input
                            type="number"
                            min={1}
                            max={999}
                            value={call.delay}
                            onChange={(e)=>{
                              const val=Math.max(1, parseInt(e.target.value)||1)
                              setFollowUpCalls(prev=>prev.map(c=>c.id===call.id?{...c,delay:val}:c))
                            }}
                            className="bg-[#1A1A1C] border-[#4B5563] text-white text-center h-10"
                          />
                        </div>

                        <Select
                          value={call.unit}
                          onValueChange={(value)=>setFollowUpCalls(prev=>prev.map(c=>c.id===call.id?{...c,unit:value}:c))}
                        >
                          <SelectTrigger className="w-28 bg-[#1A1A1C] border-[#4B5563] text-white h-10 rounded-md">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="bg-[#1A1A1C] border-[#374151] text-white">
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
                            onClick={()=>setFollowUpCalls(prev=>prev.filter(c=>c.id!==call.id))}
                            className="text-gray-400 hover:text-white p-2"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>

                          {followUpCalls.length < 4 && index === followUpCalls.length-1 && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={()=>{
                                const newCall={id:Date.now().toString(), delay:5, unit:"minutos"}
                                setFollowUpCalls(prev=>[...prev,newCall])
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

                  {followUpCalls.length < 4 && (
                    <Button
                      onClick={()=>setFollowUpCalls(prev=>[...prev,{id:Date.now().toString(),delay:5,unit:"minutos"}])}
                      className="w-full bg-[#5E17EB] hover:bg-[#5E17EB]/90 text-white"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Agregar llamada de seguimiento
                    </Button>
                  )}
                </div>
              </div>
            </div>

            {/* Horario */}
            <div className="rounded-lg border shadow-sm bg-[#05000E] border-[#1a1a1c]">
              <div className="p-6">
                <h3 className="text-lg font-medium text-white mb-6">Días y horario de llamada</h3>

                {/* Días */}
                <div className="space-y-6">
                  <div>
                    <h4 className="text-base font-medium text-white mb-3">Días de llamada</h4>
                    <div className="flex flex-wrap gap-2">
                      {allDays.map((d) => {
                        const active = callDays.includes(d)
                        return (
                          <button
                            key={d}
                            type="button"
                            onClick={() => toggleDay(d)}
                            className={`inline-flex items-center justify-center h-9 px-6 py-3 rounded-lg font-medium text-sm transition-colors ${
                              active
                                ? "bg-[#5E17EB] text-white"
                                : "bg-[#1A1A1C] text-gray-400 border border-[#374151] hover:text-white hover:border-gray-300"
                            }`}
                          >
                            {d}
                          </button>
                        )
                      })}
                    </div>
                  </div>

                  {/* Horario */}
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="text-base font-medium text-white">Horario de llamadas</h4>
                    </div>
                    <div className="space-y-4 mb-6">
                      {callSchedules.map((sch, idx) => (
                        <div key={sch.id} className="flex items-center gap-4">
                          <span className="text-white text-sm">Llamar de:</span>
                          <div className="flex items-center gap-2 bg-[#1A1A1C] rounded-lg px-4 py-3 border border-[#4B5563]">
                            <input
                              type="time"
                              value={sch.start}
                              onChange={(e) => updateSchedule(sch.id, "start", e.target.value)}
                              className="bg-transparent border-0 text-white focus:ring-0 p-0 h-auto text-base"
                            />
                          </div>
                          <span className="text-white text-sm">a</span>
                          <div className="flex items-center gap-2 bg-[#1A1A1C] rounded-lg px-4 py-3 border border-[#4B5563]">
                            <input
                              type="time"
                              value={sch.end}
                              onChange={(e) => updateSchedule(sch.id, "end", e.target.value)}
                              className="bg-transparent border-0 text-white focus:ring-0 p-0 h-auto text-base"
                            />
                          </div>
                          <div className="flex items-center gap-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => deleteSchedule(sch.id)}
                              className="text-gray-400 hover:text-white p-2"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                            {callSchedules.length < MAX_SCHEDULES && idx === callSchedules.length - 1 && (
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={addSchedule}
                                className="text-gray-400 hover:text-white p-2"
                              >
                                <Plus className="h-4 w-4" />
                              </Button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>

                    {callSchedules.length < MAX_SCHEDULES && (
                      <Button
                        onClick={addSchedule}
                        className="w-full bg-[#5E17EB] hover:bg-[#5E17EB]/90 text-white"
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Agregar más horarios
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Barra de acciones */}
          <div className="flex justify-end gap-3 pt-8 pb-4">
            {/* Botón cancelar */}
            <button
              onClick={() => router.push("/campaigns")}
              className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium h-10 px-4 py-2 border border-[#374151] text-gray-400 hover:text-white hover:bg-[#374151] transition-colors"
            >
              Cancelar
            </button>
            {/* Botón guardar */}
            <button
              className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium h-10 px-4 py-2 bg-[#5E17EB] hover:bg-[#5E17EB]/90 text-white transition-colors"
            >
              Guardar
            </button>
          </div>
        </div>
      </div>
    </div>
  )
} 