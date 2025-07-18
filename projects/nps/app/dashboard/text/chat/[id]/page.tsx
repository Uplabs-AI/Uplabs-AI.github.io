"use client"

import { useState, Suspense } from "react"
import { useParams, useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Sidebar } from "@/components/layout/sidebar"
import { ArrowLeft, Download, MessageSquare, Phone, Bot } from "lucide-react"
import { downloadTextFile } from "@/lib/utils/download"

// Mock data for conversation details
const conversationData = {
  "1": {
    contactName: "Juan Pérez",
    phoneNumber: "+591 78592844",
    firstContact: "21/04/2024 10:23",
    lastContact: "21/04/2025 10:23",
    platform: "WhatsApp",
    messages: [
      {
        id: 1,
        sender: "bot",
        content: "¡Hola! Soy el asistente de Auto x Km. ¿En qué puedo ayudarte hoy?",
        timestamp: "10:23:15",
        isBot: true
      },
      {
        id: 2,
        sender: "user",
        content: "Hola, quiero cotizar un seguro para mi auto",
        timestamp: "10:23:45",
        isBot: false
      },
      {
        id: 3,
        sender: "bot",
        content: "Claro, puedo ayudarte con eso. ¿Podrías proporcionarme la marca, modelo y año de tu vehículo?",
        timestamp: "10:24:02",
        isBot: true
      },
      {
        id: 4,
        sender: "user",
        content: "Es un Toyota Corolla 2022",
        timestamp: "10:24:30",
        isBot: false
      },
      {
        id: 5,
        sender: "bot",
        content: "Gracias por la información. ¿Cuántos kilómetros recorres aproximadamente al mes?",
        timestamp: "10:24:45",
        isBot: true
      },
      {
        id: 6,
        sender: "user",
        content: "Alrededor de 1000 km al mes",
        timestamp: "10:25:10",
        isBot: false
      },
      {
        id: 7,
        sender: "bot",
        content: "Perfecto. Basado en esa información, puedo ofrecerte nuestro plan Auto x Km Básico por $45/mes o el plan Premium por $65/mes. El plan Premium incluye asistencia en ruta y cobertura por daños naturales.",
        timestamp: "10:25:40",
        isBot: true
      },
      {
        id: 8,
        sender: "user",
        content: "¿Qué incluye exactamente el plan Básico?",
        timestamp: "10:26:15",
        isBot: false
      },
      {
        id: 9,
        sender: "bot",
        content: "El plan Básico incluye: responsabilidad civil, robo total, daños materiales y gastos médicos para ocupantes. No incluye asistencia en ruta ni cobertura por daños naturales.",
        timestamp: "10:26:45",
        isBot: true
      },
      {
        id: 10,
        sender: "user",
        content: "Me interesa el plan Premium. ¿Cómo puedo contratarlo?",
        timestamp: "10:27:20",
        isBot: false
      },
      {
        id: 11,
        sender: "bot",
        content: "Excelente elección. Para contratar el plan Premium, necesitaré algunos datos adicionales. ¿Prefieres que un asesor te contacte por teléfono o deseas continuar el proceso por este medio?",
        timestamp: "10:27:50",
        isBot: true
      },
      {
        id: 12,
        sender: "user",
        content: "Prefiero que me contacte un asesor por teléfono",
        timestamp: "10:28:15",
        isBot: false
             }
     ]
   },
   "2": {
     contactName: "María García",
     phoneNumber: "+591 78920755",
     firstContact: "21/04/2024 11:05",
     lastContact: "21/04/2025 11:05",
     platform: "WhatsApp",
     messages: [
       {
         id: 1,
         sender: "bot",
         content: "¡Hola! Soy el asistente de Auto x Km. ¿En qué puedo ayudarte hoy?",
         timestamp: "11:05:10",
         isBot: true
       },
       {
         id: 2,
         sender: "user",
         content: "Hola, necesito información sobre seguros",
         timestamp: "11:05:30",
         isBot: false
       },
       {
         id: 3,
         sender: "bot",
         content: "Perfecto, puedo ayudarte con eso. ¿Para qué tipo de vehículo necesitas el seguro?",
         timestamp: "11:05:45",
         isBot: true
       },
       {
         id: 4,
         sender: "user",
         content: "Para una motocicleta Honda",
         timestamp: "11:06:15",
         isBot: false
       },
       {
         id: 5,
         sender: "bot",
         content: "Excelente. Para motocicletas tenemos planes especiales. ¿Qué año es tu Honda?",
         timestamp: "11:06:30",
         isBot: true
       },
       {
         id: 6,
         sender: "user",
         content: "Es modelo 2021",
         timestamp: "11:07:00",
         isBot: false
       },
       {
         id: 7,
         sender: "bot",
         content: "Perfecto. Te puedo ofrecer nuestro plan Moto Segura por $25/mes que incluye responsabilidad civil y robo.",
         timestamp: "11:07:20",
         isBot: true
       },
       {
         id: 8,
         sender: "user",
         content: "Me interesa, ¿cómo procedo?",
         timestamp: "11:07:45",
         isBot: false
       }
     ]
   },
   "3": {
     contactName: "Carlos Rodríguez",
     phoneNumber: "+591 76645561",
     firstContact: "20/04/2024 15:47",
     lastContact: "20/04/2025 15:47",
     platform: "Telegram",
     messages: [
       {
         id: 1,
         sender: "bot",
         content: "¡Hola! Soy el asistente de Auto x Km. ¿En qué puedo ayudarte hoy?",
         timestamp: "15:47:10",
         isBot: true
       },
       {
         id: 2,
         sender: "user",
         content: "Quiero cancelar mi póliza",
         timestamp: "15:47:30",
         isBot: false
       },
       {
         id: 3,
         sender: "bot",
         content: "Lamento escuchar eso. ¿Podrías decirme el motivo de la cancelación para ayudarte mejor?",
         timestamp: "15:47:45",
         isBot: true
       },
       {
         id: 4,
         sender: "user",
         content: "Vendí el auto",
         timestamp: "15:48:00",
         isBot: false
       },
       {
         id: 5,
         sender: "bot",
         content: "Entiendo. Te voy a transferir con un asesor para procesar la cancelación.",
         timestamp: "15:48:15",
         isBot: true
       }
     ]
   },
   "4": {
     contactName: "Ana López",
     phoneNumber: "+591 75350724",
     firstContact: "20/04/2024 16:30",
     lastContact: "20/04/2025 16:30",
     platform: "WhatsApp",
     messages: [
       {
         id: 1,
         sender: "bot",
         content: "¡Hola! Soy el asistente de Auto x Km. ¿En qué puedo ayudarte hoy?",
         timestamp: "16:30:10",
         isBot: true
       },
       {
         id: 2,
         sender: "user",
         content: "Tengo una emergencia, necesito asistencia en ruta",
         timestamp: "16:30:25",
         isBot: false
       },
       {
         id: 3,
         sender: "bot",
         content: "Por supuesto, te ayudo inmediatamente. ¿Cuál es tu ubicación actual?",
         timestamp: "16:30:35",
         isBot: true
       },
       {
         id: 4,
         sender: "user",
         content: "Estoy en la Av. Ballivián cerca del puente",
         timestamp: "16:30:50",
         isBot: false
       },
       {
         id: 5,
         sender: "bot",
         content: "Perfecto. Ya activé el servicio de grúa. Llegará en aproximadamente 20 minutos.",
         timestamp: "16:31:10",
         isBot: true
       }
     ]
   },
   "5": {
     contactName: "Roberto Martínez",
     phoneNumber: "+591 63509856",
     firstContact: "19/04/2024 09:15",
     lastContact: "19/04/2025 09:15",
     platform: "WhatsApp",
     messages: [
       {
         id: 1,
         sender: "bot",
         content: "¡Hola! Soy el asistente de Auto x Km. ¿En qué puedo ayudarte hoy?",
         timestamp: "09:15:10",
         isBot: true
       },
       {
         id: 2,
         sender: "user",
         content: "Quiero hacer un reclamo por un accidente",
         timestamp: "09:15:30",
         isBot: false
       },
       {
         id: 3,
         sender: "bot",
         content: "Lamento escuchar sobre el accidente. ¿Estás bien? Te ayudo con el reclamo.",
         timestamp: "09:15:45",
         isBot: true
       },
       {
         id: 4,
         sender: "user",
         content: "Sí, estoy bien. Fue un choque menor",
         timestamp: "09:16:00",
         isBot: false
       },
       {
         id: 5,
         sender: "bot",
         content: "Me alegra saber que estás bien. Necesito algunos datos para procesar el reclamo.",
         timestamp: "09:16:15",
         isBot: true
       }
     ]
   },
   "6": {
     contactName: "Laura Sánchez",
     phoneNumber: "+591 63950953",
     firstContact: "19/04/2024 14:22",
     lastContact: "19/04/2025 14:22",
     platform: "Web Chat",
     messages: [
       {
         id: 1,
         sender: "bot",
         content: "¡Hola! Soy el asistente de Auto x Km. ¿En qué puedo ayudarte hoy?",
         timestamp: "14:22:10",
         isBot: true
       },
       {
         id: 2,
         sender: "user",
         content: "Hola, quiero información sobre descuentos",
         timestamp: "14:22:30",
         isBot: false
       },
       {
         id: 3,
         sender: "bot",
         content: "¡Excelente! Tenemos varios descuentos disponibles. ¿Eres cliente nuevo o ya tienes una póliza con nosotros?",
         timestamp: "14:22:45",
         isBot: true
       }
     ]
   },
   "7": {
     contactName: "Pedro Gómez",
     phoneNumber: "+591 71030433",
     firstContact: "18/04/2024 11:40",
     lastContact: "18/04/2025 11:40",
     platform: "WhatsApp",
     messages: [
       {
         id: 1,
         sender: "bot",
         content: "¡Hola! Soy el asistente de Auto x Km. ¿En qué puedo ayudarte hoy?",
         timestamp: "11:40:10",
         isBot: true
       },
       {
         id: 2,
         sender: "user",
         content: "Necesito renovar mi póliza",
         timestamp: "11:40:30",
         isBot: false
       },
       {
         id: 3,
         sender: "bot",
         content: "Perfecto, te ayudo con la renovación. ¿Tienes a mano tu número de póliza?",
         timestamp: "11:40:45",
         isBot: true
       },
       {
         id: 4,
         sender: "user",
         content: "Sí, es POL-2024-001234",
         timestamp: "11:41:00",
         isBot: false
       },
       {
         id: 5,
         sender: "bot",
         content: "Excelente. Veo que tu póliza vence el próximo mes. ¿Quieres mantener la misma cobertura?",
         timestamp: "11:41:15",
         isBot: true
       },
       {
         id: 6,
         sender: "user",
         content: "Sí, la misma cobertura está bien",
         timestamp: "11:41:30",
         isBot: false
       },
       {
         id: 7,
         sender: "bot",
         content: "Perfecto. Tu renovación será por $65/mes. ¿Confirmas el proceso?",
         timestamp: "11:41:45",
         isBot: true
       },
       {
         id: 8,
         sender: "user",
         content: "Sí, confirmo",
         timestamp: "11:42:00",
         isBot: false
       },
       {
         id: 9,
         sender: "bot",
         content: "Excelente. He procesado tu renovación. Recibirás un email con la confirmación en los próximos minutos.",
         timestamp: "11:42:15",
         isBot: true
       }
     ]
   }
}

function ChatPageContent() {
  const params = useParams()
  const router = useRouter()
  const chatId = params.id as string
  const conversation = conversationData[chatId as keyof typeof conversationData]

  if (!conversation) {
    return <div className="text-white">Conversación no encontrada</div>
  }

  const handleDownloadChat = () => {
    const chatContent = conversation.messages
      .map((msg) => `[${msg.timestamp}] ${msg.isBot ? 'Bot' : conversation.contactName}: ${msg.content}`)
      .join("\n")
    downloadTextFile(`chat-${conversation.contactName}-${chatId}.txt`, chatContent)
  }

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase()
  }

  return (
    <div className="flex h-screen bg-[#121212]">
      <Sidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="bg-transparent p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => router.push('/dashboard/text')}
                className="text-gray-400 hover:text-white hover:bg-[#1a1a1c] p-2"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Volver
              </Button>
              <h1 className="text-xl font-semibold text-white">Chat de Conversación</h1>
            </div>
            <Button 
              className="bg-[#5e17eb] hover:bg-[#7c3aed] text-white"
              onClick={handleDownloadChat}
            >
              <Download className="h-4 w-4 mr-2" />
              Exportar
            </Button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-auto p-6">
          {/* Contact Info Section */}
          <Card className="bg-[#1a1a1c] border-[#1a1a1c] mb-6">
            <CardContent className="p-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Avatar className="w-16 h-16 mr-5">
                    <AvatarFallback className="bg-[#2d1e69] text-white text-2xl font-semibold">
                      {getInitials(conversation.contactName)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h1 className="text-2xl font-bold text-white mb-0.5">{conversation.contactName}</h1>
                    <p className="text-xs text-[#9ca3af]">Primer contacto: {conversation.firstContact}</p>
                    <p className="text-xs text-[#9ca3af]">Último contacto: {conversation.lastContact}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center justify-end text-white text-sm mb-1">
                    <Phone className="w-4 h-4 mr-1.5 text-[#9ca3af]" />
                    <span>{conversation.phoneNumber}</span>
                  </div>
                  <Badge className="bg-[#14532d] text-[#82ecff] border-0 text-[10px] font-medium px-2 py-0.5">
                    {conversation.platform}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Tabs Section */}
          <Card className="bg-[#1a1a1c] border-[#1a1a1c] mb-6">
            <CardContent className="p-1">
              <Tabs defaultValue="conversacion" className="w-full">
                <TabsList className="inline-flex h-10 items-center rounded-md text-muted-foreground bg-transparent p-1.5 space-x-1.5 w-full justify-start">
                  <TabsTrigger
                    value="conversacion"
                    className="justify-center whitespace-nowrap ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:shadow-sm flex items-center gap-1.5 px-3.5 py-2 rounded-md text-xs font-medium transition-colors h-9 data-[state=active]:bg-[#8280ff] data-[state=active]:text-white text-[#9ca3af] hover:bg-[#333333] hover:text-white"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    Conversación
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </CardContent>
          </Card>

          {/* Chat Section */}
          <Card className="bg-[#0a0a0a] border-[#1a1a1c]">
            <CardHeader>
              <div className="flex items-center mb-5">
                <MessageSquare className="w-4 h-4 mr-2 text-[#9ca3af]" />
                <h2 className="text-base font-medium text-white">Conversación</h2>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-0.5 pr-2 max-h-[calc(100vh-420px)] overflow-y-auto custom-scrollbar">
                {conversation.messages.map((message) => (
                  <div key={message.id} className={`flex flex-col mb-4 ${message.isBot ? 'items-start' : 'items-end'}`}>
                    <div className={`flex items-start ${message.isBot ? 'flex-row' : 'flex-row-reverse'}`}>
                      <Avatar className={`w-7 h-7 shrink-0 ${message.isBot ? 'order-1 mr-2' : 'order-2 ml-2'}`}>
                        <AvatarFallback className={`${message.isBot ? 'bg-[#2d1e69]' : 'bg-[#333333]'} text-white text-[10px] font-semibold flex items-center justify-center`}>
                          {message.isBot ? (
                            <Bot className="w-3.5 h-3.5" />
                          ) : (
                            getInitials(conversation.contactName)
                          )}
                        </AvatarFallback>
                      </Avatar>
                      <div className={`max-w-[calc(100%-4rem)] p-3 rounded-lg text-white text-sm shadow ${message.isBot ? 'order-2 bg-[#1c1c1c]' : 'order-1 bg-[#2d1e69]'} break-words`}>
                        {message.content}
                      </div>
                    </div>
                    <p className={`text-[10px] text-[#6b7280] mt-1 ${message.isBot ? 'ml-[calc(0.5rem+28px)] text-left' : 'mr-[calc(0.5rem+28px)] text-right'}`}>
                      {message.timestamp}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default function ChatPage() {
  return (
    <Suspense fallback={<div className="text-white">Loading...</div>}>
      <ChatPageContent />
    </Suspense>
  )
} 