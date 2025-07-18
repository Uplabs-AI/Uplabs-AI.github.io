"use client"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import {
  Bot,
  CircleCheck,
  Clock,
  MessageSquare,
  Paperclip,
  Send,
  StickyNote,
  Video,
} from "lucide-react"
import { useState } from "react"

// Define types based on expected props
type Contact = {
  id: number | string
  name: string
  phone: string
}

type Activity = {
  id: number | string;
  type: 'note' | 'task' | 'conversation';
  author: string;
  timestamp: string;
  content: string | { speaker: string, text: string, time: string }[];
  taskStatus?: 'completed' | 'pending';
};

const getInitials = (name: string) => {
  return name
    .split(" ")
    .map(n => n[0])
    .join("")
    .toUpperCase()
}

export function ActivityFeedAndComposer({
  contact,
  activities,
}: {
  contact: Contact
  activities: Activity[]
}) {
  const [agentPaused, setAgentPaused] = useState(false)

  return (
    <div className="flex flex-col h-full">
      {/* Activity Feed */}
        <div className="flex-grow rounded-lg border text-card-foreground shadow-sm bg-[#0a0a0a] border-[#1a1a1c]">
            <div className="flex flex-col space-y-1.5 p-6">
                <div className="flex items-center">
                    <MessageSquare className="w-4 h-4 mr-2 text-[#9ca3af]"/>
                    <h2 className="text-base font-medium text-white">Conversación</h2>
                </div>
            </div>
            <div className="p-6 pt-0">
                <div className="space-y-0.5 pr-2 max-h-[calc(100vh-420px)] overflow-y-auto custom-scrollbar">
                    <div className="flex flex-col mb-4 items-start">
                        <div className="flex items-start flex-row">
                            <span className="relative flex overflow-hidden rounded-full w-7 h-7 shrink-0 order-1 mr-2">
                                <span className="h-full w-full rounded-full bg-[#2d1e69] text-white text-[10px] font-semibold flex items-center justify-center">
                                    <Bot className="w-3.5 h-3.5"/>
                                </span>
                            </span>
                            <div className="max-w-[calc(100%-4rem)] p-3 rounded-lg text-white text-sm shadow order-2 bg-[#1c1c1c] break-words">¡Hola! Soy el asistente de Auto x Km. ¿En qué puedo ayudarte hoy?</div>
                        </div>
                        <p className="text-[10px] text-[#6b7280] mt-1 ml-[calc(0.5rem+28px)] text-left">15:47:10</p>
                    </div>
                    <div className="flex flex-col mb-4 items-end">
                        <div className="flex items-start flex-row-reverse">
                            <span className="relative flex overflow-hidden rounded-full w-7 h-7 shrink-0 order-2 ml-2">
                                <span className="h-full w-full rounded-full bg-[#333333] text-white text-[10px] font-semibold flex items-center justify-center">CR</span>
                            </span>
                            <div className="max-w-[calc(100%-4rem)] p-3 rounded-lg text-white text-sm shadow order-1 bg-[#2d1e69] break-words">Quiero cancelar mi póliza</div>
                        </div>
                        <p className="text-[10px] text-[#6b7280] mt-1 mr-[calc(0.5rem+28px)] text-right">15:47:30</p>
                    </div>
                    <div className="flex flex-col mb-4 items-start">
                        <div className="flex items-start flex-row">
                            <span className="relative flex overflow-hidden rounded-full w-7 h-7 shrink-0 order-1 mr-2">
                                <span className="h-full w-full rounded-full bg-[#2d1e69] text-white text-[10px] font-semibold flex items-center justify-center">
                                    <Bot className="w-3.5 h-3.5"/>
                                </span>
                            </span>
                            <div className="max-w-[calc(100%-4rem)] p-3 rounded-lg text-white text-sm shadow order-2 bg-[#1c1c1c] break-words">Lamento escuchar eso. ¿Podrías decirme el motivo de la cancelación para ayudarte mejor?</div>
                        </div>
                        <p className="text-[10px] text-[#6b7280] mt-1 ml-[calc(0.5rem+28px)] text-left">15:47:45</p>
                    </div>
                    <div className="flex flex-col mb-4 items-end">
                        <div className="flex items-start flex-row-reverse">
                            <span className="relative flex overflow-hidden rounded-full w-7 h-7 shrink-0 order-2 ml-2">
                                <span className="h-full w-full rounded-full bg-[#333333] text-white text-[10px] font-semibold flex items-center justify-center">CR</span>
                            </span>
                            <div className="max-w-[calc(100%-4rem)] p-3 rounded-lg text-white text-sm shadow order-1 bg-[#2d1e69] break-words">Vendí el auto</div>
                        </div>
                        <p className="text-[10px] text-[#6b7280] mt-1 mr-[calc(0.5rem+28px)] text-right">15:48:00</p>
                    </div>
                    <div className="flex flex-col mb-4 items-start">
                        <div className="flex items-start flex-row">
                            <span className="relative flex overflow-hidden rounded-full w-7 h-7 shrink-0 order-1 mr-2">
                                <span className="h-full w-full rounded-full bg-[#2d1e69] text-white text-[10px] font-semibold flex items-center justify-center">
                                    <Bot className="w-3.5 h-3.5"/>
                                </span>
                            </span>
                            <div className="max-w-[calc(100%-4rem)] p-3 rounded-lg text-white text-sm shadow order-2 bg-[#1c1c1c] break-words">Entiendo. Te voy a transferir con un asesor para procesar la cancelación.</div>
                        </div>
                        <p className="text-[10px] text-[#6b7280] mt-1 ml-[calc(0.5rem+28px)] text-left">15:48:15</p>
                    </div>
                </div>
            </div>
        </div>

      <div className="flex items-center space-x-2 mt-4 mb-2 px-1">
        <Switch
          id="chat-toggle"
          checked={agentPaused}
          onCheckedChange={setAgentPaused}
          className="data-[state=checked]:bg-[#82ECFF] data-[state=unchecked]:bg-gray-600"
        />
        <Label htmlFor="chat-toggle" className="text-sm text-white">
          Pausar Agente para Intervenir
        </Label>
      </div>

      {agentPaused && (
        <div className="text-center text-xs text-yellow-300 p-2 rounded-md bg-yellow-900/40 border border-yellow-800 mb-2">
          El agente IA está en pausa. Puedes intervenir manualmente.
        </div>
      )}

      {/* Origin and Destination Info */}
      <div className="flex justify-between items-center text-xs text-gray-400 mb-2 px-1">
        <span>
          <strong>Número de Origen:</strong> +1 (555) 123-4567
        </span>
        <span>
          <strong>Número de Destino:</strong> {contact.phone}
        </span>
      </div>

      {/* Composer */}
      <div className="mt-0">
        <Card className="bg-[#0A0A0A] border-[#1A1A1C]">
          <CardContent className="p-4">
            <Textarea
              placeholder="Escribe una nota o @ para mencionar..."
              className="bg-transparent border-0 focus:ring-0 focus:outline-none text-white resize-none"
              disabled={!agentPaused}
            />
            <div className="flex items-center justify-between mt-2">
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-gray-400 hover:text-white hover:bg-[#1A1A1C]"
                  disabled={!agentPaused}
                >
                  <StickyNote className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-gray-400 hover:text-white hover:bg-[#1A1A1C]"
                  disabled={!agentPaused}
                >
                  <CircleCheck className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-gray-400 hover:text-white hover:bg-[#1A1A1C]"
                  disabled={!agentPaused}
                >
                  <Video className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-gray-400 hover:text-white hover:bg-[#1A1A1C]"
                  disabled={!agentPaused}
                >
                  <Paperclip className="h-4 w-4" />
                </Button>
              </div>
              <Button
                className="bg-[#5E17EB] hover:bg-[#5E17EB]/90 h-9 px-4"
                disabled={!agentPaused}
              >
                <Send className="h-4 w-4 mr-2" />
                Enviar
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 