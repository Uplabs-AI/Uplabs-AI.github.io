"use client"

import { useState, Suspense, useEffect } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { ArrowLeft, ChevronDown, FileText, Download, Play, MoreHorizontal, DollarSign, Phone, MessageSquare, Bot } from "lucide-react"
import { useContactFlowStore } from "@/lib/stores/contact-flow-store"
import LeadVerticalProgress from "@/components/dashboard/lead-vertical-progress"


function CallRecordingAndTextPageContent() {
  const [isClient, setIsClient] = useState(false);
  useEffect(() => setIsClient(true), []);

  const searchParams = useSearchParams()
  const router = useRouter()
  const id = searchParams.get("id")
  
  const getContactById = useContactFlowStore((state) => state.getContactById)
  const contact = id ? getContactById(id) : undefined

  const [expandedRows, setExpandedRows] = useState<number[]>([])

  const toggleExpanded = (leadId: number) => {
    setExpandedRows(prev => 
      prev.includes(leadId) 
        ? prev.filter(id => id !== leadId)
        : [...prev, leadId]
    )
  }

  if (!isClient) {
    return <div className="text-white">Cargando...</div>;
  }

  if (!contact) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-white">No se encontró el contacto. Por favor, vuelve al dashboard.</p>
        <Button onClick={() => router.push('/dashboard')} className="ml-4">Volver</Button>
      </div>
    )
  }

  const Waveform = () => (
    <div className="flex items-center w-full h-10 bg-[#1a1a1c] rounded-lg">
      <div className="flex-1 h-full flex items-center">
        {[...Array(60)].map((_, i) => (
          <div
            key={i}
            className="w-0.5 rounded-full"
            style={{
              height: `${Math.floor(Math.random() * 80) + 10}%`,
              backgroundColor: i < 25 ? '#a370ff' : '#4b5563',
              marginRight: '2px',
            }}
          />
        ))}
      </div>
    </div>
  )

  return (
    <div className="flex-1 overflow-auto p-6">
      <div className="max-w-7xl mx-auto">
        <Button
          variant="outline"
          className="mb-6 bg-transparent border-none text-white hover:bg-gray-800"
          onClick={() => router.back()}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Volver
        </Button>
        <Card className="bg-[#0a0a0a] border-[#1a1a1c] text-white">
          <CardHeader>
            <div className="flex items-center justify-between w-full">
              <CardTitle className="text-lg font-semibold text-white tracking-tight">Flujo comercial - {contact.contactName}</CardTitle>
              <div className="flex gap-3">
                <Button variant="outline" className="border-[#5e17eb] text-white hover:bg-[#1a1a1c]">Exportar</Button>
                <Button className="bg-[#5e17eb] hover:bg-[#5e17eb]/90 text-white">Ver Resumen</Button>
              </div>
            </div>
            <LeadVerticalProgress phases={contact.phases} />
          </CardHeader>
          <CardContent className="space-y-3">
            {contact.phases.map((lead) => (
              <Collapsible key={lead.id} asChild>
                <div className="rounded-lg hover:bg-[#1f1f1f] transition-colors duration-200">
                  <CollapsibleTrigger asChild 
                    className="w-full cursor-pointer"
                    onClick={() => toggleExpanded(lead.id)}
                  >
                    <div className="flex items-center justify-between p-4 bg-[#1a1a1c] border border-[#4b5563] rounded-lg w-full">
                      <div className="flex items-center gap-4">
                        {/* Número de secuencia */}
                        <div className="w-9 h-9 rounded-full bg-[#2f2f2f] flex items-center justify-center">
                          <span className="text-[#8e8e8e] font-medium text-sm">{lead.id}</span>
                        </div>

                        {/* Badge de estado */}
                        <div
                          className="inline-flex items-center rounded-md border px-2.5 py-0.5 text-sm font-bold"
                          style={{
                            color: lead.statusColor,
                            backgroundColor: lead.statusBgColor,
                            borderColor: lead.statusBorderColor,
                          }}
                        >
                          {lead.status}
                        </div>

                        {/* Etiqueta "Tipo de contacto:" */}
                        <span className="text-white text-sm">Tipo de contacto:</span>

                        {/* Badge de tipo de contacto */}
                        <Badge
                          variant="outline"
                          className={`${
                            lead.contactType === "Llamada"
                              ? "bg-[#22c55e1a] text-[#22c55e] border-[#22c55e33]"
                              : "bg-[#d782ff1a] text-[#d782ff] border-[#d782ff33]"
                          } text-xs font-medium`}
                        >
                          {lead.contactType}
                        </Badge>

                        {/* Chip de estado de progreso */}
                        <Badge
                          variant="outline"
                          className={`text-xs font-medium ${
                            lead.progressStatus === "Realizado"
                              ? "bg-[#1c3c29] text-[#22c55e] border-[#22c55e33]"
                              : "bg-[#261d2a] text-[#d782ff] border-[#d782ff33]"
                          }`}
                        >
                          {lead.progressStatus}
                        </Badge>
                      </div>

                      {/* Icono flecha */}
                      <ChevronDown className={`h-3 w-3 ml-1 transition-transform ${
                        expandedRows.includes(lead.id) ? 'rotate-180' : ''
                      }`} />
                    </div>
                  </CollapsibleTrigger>
                  
                  {/* Contenido expandible */}
                  <CollapsibleContent className="border-t border-[#4b5563]">
                    <div className="p-6 bg-[#0f0f0f]">
                      
                      {/* Lógica condicional para Llamada o Mensaje */}
                      {lead.contactType === "Llamada" ? (
                        <>
                          {/* Sección de Grabación */}
                          <div className="rounded-lg border bg-[#0a0a0a] border-[#1a1a1c] mb-6">
                            <div className="flex items-center justify-between p-6">
                              <div className="text-lg font-semibold text-white">Grabación</div>
                              <div className="flex items-center gap-3">
                                <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-[#1a1a1c]">
                                  <FileText className="h-4 w-4 mr-2" />
                                  Descargar transcripción
                                </Button>
                                <Button className="bg-[#5e17eb] hover:bg-[#7c3aed] text-white">
                                  <Download className="h-4 w-4 mr-2" />
                                  Descargar audio
                                </Button>
                              </div>
                            </div>
                            
                            <div className="px-6 pb-6">
                              {/* Reproductor de audio */}
                              <div className="flex items-center gap-4 mb-4">
                                <Button className="h-12 w-12 rounded-lg bg-[#5e17eb] hover:bg-[#7c3aed] text-white p-0">
                                  <Play className="h-5 w-5" />
                                </Button>
                                <div className="text-lg font-mono text-white">03:17</div>
                                <div className="flex-1 h-16 bg-[#1a1a1c] rounded-lg flex items-center justify-center">
                                  <div className="flex items-center gap-1 h-12">
                                    {/* Waveform simulado */}
                                    {Array.from({length: 80}, (_, i) => (
                                      <div 
                                        key={i}
                                        className="w-1 bg-white rounded-full opacity-30"
                                        style={{height: `${Math.random() * 40 + 10}px`}}
                                      />
                                    ))}
                                  </div>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Button variant="ghost" size="sm" className="text-gray-400 hover:bg-[#1a1a1c]">
                                    <MoreHorizontal className="h-4 w-4 mr-2" />
                                    Audio
                                  </Button>
                                  <Button variant="ghost" size="sm" className="text-gray-400 hover:bg-[#1a1a1c]">
                                    1.0x
                                    <ChevronDown className="h-4 w-4 ml-1" />
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Tabs */}
                          <Tabs defaultValue="registros" className="w-full">
                            <TabsList className="grid w-full grid-cols-3 bg-[#0a0a0a] border border-[#1a1a1c] mb-6">
                              <TabsTrigger value="registros" className="data-[state=active]:bg-[#5e17eb] data-[state=active]:text-white text-gray-400">
                                📋 Registros
                              </TabsTrigger>
                              <TabsTrigger value="transcripciones" className="data-[state=active]:bg-[#5e17eb] data-[state=active]:text-white text-gray-400">
                                <FileText className="h-4 w-4 mr-2" />
                                Transcripciones
                              </TabsTrigger>
                              <TabsTrigger value="costo" className="data-[state=active]:bg-[#5e17eb] data-[state=active]:text-white text-gray-400">
                                <DollarSign className="h-4 w-4 mr-2" />
                                Costo de Llamada
                              </TabsTrigger>
                            </TabsList>
                            
                            <TabsContent value="registros">
                              <Card className="bg-[#0a0a0a] border-[#1a1a1c]">
                                <CardHeader>
                                  <CardTitle className="text-lg font-semibold text-white flex items-center gap-2">
                                    📋 Registros
                                  </CardTitle>
                                </CardHeader>
                                <CardContent>
                                  <div className="space-y-4">
                                    {[
                                      { time: "19:15:11:624", type: "[LOG]", message: "Voz almacenada en caché: Hola?" },
                                      { time: "19:15:11:716", type: "[CHECKPOINT]", message: "Habla del asistente iniciada" },
                                      { time: "19:15:12:399", type: "[CHECKPOINT]", message: "Habla del asistente detenida" },
                                      { time: "19:15:29:018", type: "[CHECKPOINT]", message: "Habla del usuario posiblemente iniciando" },
                                      { time: "19:15:38:817", type: "[CHECKPOINT]", message: "Habla del usuario posiblemente iniciando" },
                                      { time: "19:15:39:489", type: "[LOG]", message: "Tiempo de espera de punto final 100ms (regla: 'heurística')" },
                                      { time: "19:15:39:489", type: "[LOG]", message: "Salida del transcriptor: Hola." },
                                      { time: "19:15:39:589", type: "[CHECKPOINT]", message: "Solicitud de modelo iniciada" },
                                      { time: "19:15:39:592", type: "[LOG]", message: "Solicitud de modelo iniciada (intento #1, gpt-4.1-mini, openai)" },
                                      { time: "19:15:40:346", type: "[CHECKPOINT]", message: "Modelo envió token de inicio" },
                                      { time: "19:15:40:348", type: "[LOG]", message: "Salida del modelo: ." },
                                      { time: "19:15:40:348", type: "[LOG]", message: "Salida del modelo: Hola" }
                                    ].map((log, index) => (
                                      <div key={index} className="flex items-start gap-4 py-2">
                                        <span className="font-mono text-xs text-gray-400 min-w-[100px]">{log.time}</span>
                                        <Badge className="bg-[#3b82f6]/10 text-[#3b82f6] border-[#3b82f6]/20 min-w-[100px] justify-center">
                                          {log.type}
                                        </Badge>
                                        <span className="text-gray-300 text-sm flex-1">{log.message}</span>
                                      </div>
                                    ))}
                                  </div>
                                </CardContent>
                              </Card>
                            </TabsContent>
                            
                            <TabsContent value="transcripciones">
                              <Card className="bg-[#0a0a0a] border-[#1a1a1c]">
                                <CardHeader>
                                  <CardTitle className="text-lg font-semibold text-white">Transcripciones</CardTitle>
                                </CardHeader>
                                <CardContent>
                                  <div className="space-y-4">
                                    <div className="bg-[#1a1a1c] p-4 rounded-lg">
                                      <div className="text-sm text-gray-400 mb-2">Asistente AI</div>
                                      <p className="text-white">Hola, buenos días. Soy María, asistente virtual de AutoKM. ¿Cómo está usted?</p>
                                    </div>
                                    <div className="bg-[#2a2a2c] p-4 rounded-lg">
                                      <div className="text-sm text-gray-400 mb-2">Cliente</div>
                                      <p className="text-white">Hola, bien gracias. ¿De qué se trata?</p>
                                    </div>
                                    <div className="bg-[#1a1a1c] p-4 rounded-lg">
                                      <div className="text-sm text-gray-400 mb-2">Asistente AI</div>
                                      <p className="text-white">Le estoy contactando porque vi que está interesado en servicios automotrices. Tenemos una promoción especial este mes.</p>
                                    </div>
                                  </div>
                                </CardContent>
                              </Card>
                            </TabsContent>
                            
                            <TabsContent value="costo">
                              <Card className="bg-[#0a0a0a] border-[#1a1a1c]">
                                <CardHeader>
                                  <CardTitle className="text-lg font-semibold text-white">Costo de Llamada</CardTitle>
                                </CardHeader>
                                <CardContent>
                                  <div className="space-y-4">
                                    <div className="grid grid-cols-2 gap-4">
                                      <div className="bg-[#1a1a1c] p-4 rounded-lg">
                                        <div className="text-sm text-gray-400">Duración</div>
                                        <div className="text-xl font-semibold text-white">03:17</div>
                                      </div>
                                      <div className="bg-[#1a1a1c] p-4 rounded-lg">
                                        <div className="text-sm text-gray-400">Costo por minuto</div>
                                        <div className="text-xl font-semibold text-white">$0.09</div>
                                      </div>
                                    </div>
                                    <div className="bg-[#5e17eb]/10 border border-[#5e17eb]/20 p-4 rounded-lg">
                                      <div className="text-sm text-[#5e17eb]">Total</div>
                                      <div className="text-2xl font-bold text-[#5e17eb]">$0.29</div>
                                    </div>
                                  </div>
                                </CardContent>
                              </Card>
                            </TabsContent>
                          </Tabs>
                        </>
                      ) : (
                        <>
                          {/* Tab de Conversación */}
                          <div className="rounded-lg border bg-[#1a1a1c] border-[#1a1a1c] mb-6">
                            <div className="p-1">
                              <Tabs defaultValue="conversacion" className="w-full">
                                <TabsList className="bg-transparent p-1.5 space-x-1.5 w-full justify-start">
                                  <TabsTrigger 
                                    value="conversacion"
                                    className="data-[state=active]:bg-[#8280ff] data-[state=active]:text-white text-[#9ca3af] hover:bg-[#333333] hover:text-white flex items-center gap-1.5 px-3.5 py-2 rounded-md text-xs font-medium h-9"
                                  >
                                    <MessageSquare className="w-3.5 h-3.5" />
                                    Conversación
                                  </TabsTrigger>
                                </TabsList>
                              </Tabs>
                            </div>
                          </div>

                          {/* Chat Container */}
                          <div className="rounded-lg border bg-[#0a0a0a] border-[#1a1a1c]">
                            <div className="flex flex-col space-y-1.5 p-6">
                              <div className="flex items-center mb-5">
                                <MessageSquare className="w-4 h-4 mr-2 text-[#9ca3af]" />
                                <h2 className="text-base font-medium text-white">Conversación</h2>
                              </div>
                            </div>
                            <div className="p-6 pt-0">
                              <div className="space-y-0.5 pr-2 max-h-[calc(100vh-420px)] overflow-y-auto">
                                
                                {/* Mensaje del Bot */}
                                <div className="flex flex-col mb-4 items-start">
                                  <div className="flex items-start flex-row">
                                    <div className="relative flex overflow-hidden rounded-full w-7 h-7 shrink-0 order-1 mr-2">
                                      <span className="h-full w-full rounded-full bg-[#2d1e69] text-white text-[10px] font-semibold flex items-center justify-center">
                                        <Bot className="w-3.5 h-3.5" />
                                      </span>
                                    </div>
                                    <div className="max-w-[calc(100%-4rem)] p-3 rounded-lg text-white text-sm shadow order-2 bg-[#1c1c1c] break-words">
                                      ¡Hola! Soy el asistente de Auto x Km. ¿En qué puedo ayudarte hoy?
                                    </div>
                                  </div>
                                  <p className="text-[10px] text-[#6b7280] mt-1 ml-[calc(0.5rem+28px)] text-left">11:05:10</p>
                                </div>

                                {/* Mensaje del Usuario */}
                                <div className="flex flex-col mb-4 items-end">
                                  <div className="flex items-start flex-row-reverse">
                                    <div className="relative flex overflow-hidden rounded-full w-7 h-7 shrink-0 order-2 ml-2">
                                      <span className="h-full w-full rounded-full bg-[#333333] text-white text-[10px] font-semibold flex items-center justify-center">
                                        MG
                                      </span>
                                    </div>
                                    <div className="max-w-[calc(100%-4rem)] p-3 rounded-lg text-white text-sm shadow order-1 bg-[#2d1e69] break-words">
                                      Hola, necesito información sobre seguros
                                    </div>
                                  </div>
                                  <p className="text-[10px] text-[#6b7280] mt-1 mr-[calc(0.5rem+28px)] text-right">11:05:30</p>
                                </div>

                                {/* Mensaje del Bot */}
                                <div className="flex flex-col mb-4 items-start">
                                  <div className="flex items-start flex-row">
                                    <div className="relative flex overflow-hidden rounded-full w-7 h-7 shrink-0 order-1 mr-2">
                                      <span className="h-full w-full rounded-full bg-[#2d1e69] text-white text-[10px] font-semibold flex items-center justify-center">
                                        <Bot className="w-3.5 h-3.5" />
                                      </span>
                                    </div>
                                    <div className="max-w-[calc(100%-4rem)] p-3 rounded-lg text-white text-sm shadow order-2 bg-[#1c1c1c] break-words">
                                      Perfecto, puedo ayudarte con eso. ¿Para qué tipo de vehículo necesitas el seguro?
                                    </div>
                                  </div>
                                  <p className="text-[10px] text-[#6b7280] mt-1 ml-[calc(0.5rem+28px)] text-left">11:05:45</p>
                                </div>

                                {/* Mensaje del Usuario */}
                                <div className="flex flex-col mb-4 items-end">
                                  <div className="flex items-start flex-row-reverse">
                                    <div className="relative flex overflow-hidden rounded-full w-7 h-7 shrink-0 order-2 ml-2">
                                      <span className="h-full w-full rounded-full bg-[#333333] text-white text-[10px] font-semibold flex items-center justify-center">
                                        MG
                                      </span>
                                    </div>
                                    <div className="max-w-[calc(100%-4rem)] p-3 rounded-lg text-white text-sm shadow order-1 bg-[#2d1e69] break-words">
                                      Para una motocicleta Honda
                                    </div>
                                  </div>
                                  <p className="text-[10px] text-[#6b7280] mt-1 mr-[calc(0.5rem+28px)] text-right">11:06:15</p>
                                </div>

                                {/* Mensaje del Bot */}
                                <div className="flex flex-col mb-4 items-start">
                                  <div className="flex items-start flex-row">
                                    <div className="relative flex overflow-hidden rounded-full w-7 h-7 shrink-0 order-1 mr-2">
                                      <span className="h-full w-full rounded-full bg-[#2d1e69] text-white text-[10px] font-semibold flex items-center justify-center">
                                        <Bot className="w-3.5 h-3.5" />
                                      </span>
                                    </div>
                                    <div className="max-w-[calc(100%-4rem)] p-3 rounded-lg text-white text-sm shadow order-2 bg-[#1c1c1c] break-words">
                                      Excelente. Para motocicletas tenemos planes especiales. ¿Qué año es tu Honda?
                                    </div>
                                  </div>
                                  <p className="text-[10px] text-[#6b7280] mt-1 ml-[calc(0.5rem+28px)] text-left">11:06:30</p>
                                </div>

                                {/* Mensaje del Usuario */}
                                <div className="flex flex-col mb-4 items-end">
                                  <div className="flex items-start flex-row-reverse">
                                    <div className="relative flex overflow-hidden rounded-full w-7 h-7 shrink-0 order-2 ml-2">
                                      <span className="h-full w-full rounded-full bg-[#333333] text-white text-[10px] font-semibold flex items-center justify-center">
                                        MG
                                      </span>
                                    </div>
                                    <div className="max-w-[calc(100%-4rem)] p-3 rounded-lg text-white text-sm shadow order-1 bg-[#2d1e69] break-words">
                                      Es modelo 2021
                                    </div>
                                  </div>
                                  <p className="text-[10px] text-[#6b7280] mt-1 mr-[calc(0.5rem+28px)] text-right">11:07:00</p>
                                </div>

                                {/* Mensaje del Bot */}
                                <div className="flex flex-col mb-4 items-start">
                                  <div className="flex items-start flex-row">
                                    <div className="relative flex overflow-hidden rounded-full w-7 h-7 shrink-0 order-1 mr-2">
                                      <span className="h-full w-full rounded-full bg-[#2d1e69] text-white text-[10px] font-semibold flex items-center justify-center">
                                        <Bot className="w-3.5 h-3.5" />
                                      </span>
                                    </div>
                                    <div className="max-w-[calc(100%-4rem)] p-3 rounded-lg text-white text-sm shadow order-2 bg-[#1c1c1c] break-words">
                                      Perfecto. Te puedo ofrecer nuestro plan Moto Segura por $25/mes que incluye responsabilidad civil y robo.
                                    </div>
                                  </div>
                                  <p className="text-[10px] text-[#6b7280] mt-1 ml-[calc(0.5rem+28px)] text-left">11:07:20</p>
                                </div>

                                {/* Mensaje del Usuario */}
                                <div className="flex flex-col mb-4 items-end">
                                  <div className="flex items-start flex-row-reverse">
                                    <div className="relative flex overflow-hidden rounded-full w-7 h-7 shrink-0 order-2 ml-2">
                                      <span className="h-full w-full rounded-full bg-[#333333] text-white text-[10px] font-semibold flex items-center justify-center">
                                        MG
                                      </span>
                                    </div>
                                    <div className="max-w-[calc(100%-4rem)] p-3 rounded-lg text-white text-sm shadow order-1 bg-[#2d1e69] break-words">
                                      Me interesa, ¿cómo procedo?
                                    </div>
                                  </div>
                                  <p className="text-[10px] text-[#6b7280] mt-1 mr-[calc(0.5rem+28px)] text-right">11:07:45</p>
                                </div>

                              </div>
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  </CollapsibleContent>
                </div>
              </Collapsible>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default function CallRecordingAndTextPage() {
  return (
    <DashboardLayout title="Detalles del Flujo Comercial">
      <Suspense fallback={<div className="text-white">Cargando...</div>}>
        <CallRecordingAndTextPageContent />
      </Suspense>
    </DashboardLayout>
  )
} 