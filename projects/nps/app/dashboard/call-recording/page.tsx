"use client"

import { useState, Suspense } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Sidebar } from "@/components/layout/sidebar"
import { Play, Pause, MoreHorizontal, ChevronDown, ArrowLeft, Download, FileText, DollarSign } from "lucide-react"
import { ChatTranscript } from "@/components/dashboard/chat-transcript"
import { CallCostBreakdown } from "@/components/dashboard/call-cost-breakdown"
import { downloadTextFile, downloadAudioFile } from "@/lib/utils/download"

function CallRecordingPageContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const callId = searchParams.get("id") || "e03224fc-92e9-4215-b219-f9e0d89ccd16"
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const duration = 197 // 3:17 in seconds

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  const logEntries = [
    { time: "19:15:11:624", type: "LOG", message: "Voz almacenada en caché: Hola?" },
    { time: "19:15:11:716", type: "CHECKPOINT", message: "Habla del asistente iniciada" },
    { time: "19:15:12:399", type: "CHECKPOINT", message: "Habla del asistente detenida" },
    { time: "19:15:29:018", type: "CHECKPOINT", message: "Habla del usuario posiblemente iniciando" },
    { time: "19:15:38:817", type: "CHECKPOINT", message: "Habla del usuario posiblemente iniciando" },
    { time: "19:15:39:489", type: "LOG", message: "Tiempo de espera de punto final 100ms (regla: 'heurística')" },
    { time: "19:15:39:489", type: "LOG", message: "Salida del transcriptor: Hola." },
    { time: "19:15:39:589", type: "CHECKPOINT", message: "Solicitud de modelo iniciada" },
    { time: "19:15:39:592", type: "LOG", message: "Solicitud de modelo iniciada (intento #1, gpt-4.1-mini, openai)" },
    { time: "19:15:40:346", type: "CHECKPOINT", message: "Modelo envió token de inicio" },
    { time: "19:15:40:348", type: "LOG", message: "Salida del modelo: ." },
    { time: "19:15:40:348", type: "LOG", message: "Salida del modelo: Hola" },
  ]

  const handleDownloadTranscript = () => {
    const transcriptContent = logEntries.map((entry) => `${entry.time} [${entry.type}] ${entry.message}`).join("\n")
    downloadTextFile(`transcript-${callId}.txt`, transcriptContent)
  }

  const handleDownloadAudio = () => {
    downloadAudioFile(`audio-${callId}.mp3`, "/audio/call-recording.mp3")
  }

  return (
    <div className="flex h-screen bg-[#121212]">
      <Sidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="bg-[#0a0a0a] border-b border-[#1a1a1c] p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => router.back()}
                className="text-gray-400 hover:text-white hover:bg-[#1a1a1c] p-2"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Volver
              </Button>
              <h1 className="text-xl font-semibold text-white">Grabación de la llamada</h1>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-auto p-6">
          {/* Audio Player Section */}
          <Card className="bg-[#0a0a0a] border-[#1a1a1c] mb-6">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-semibold text-white">Grabación</CardTitle>
                <div className="flex items-center gap-3">
                  <Button
                    variant="outline"
                    className="border-gray-600 text-gray-300 hover:bg-[#1a1a1c]"
                    onClick={handleDownloadTranscript}
                  >
                    <FileText className="h-4 w-4 mr-2" />
                    Descargar transcripción
                  </Button>
                  <Button className="bg-[#5e17eb] hover:bg-[#7c3aed] text-white" onClick={handleDownloadAudio}>
                    <Download className="h-4 w-4 mr-2" />
                    Descargar audio
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4 mb-4">
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-12 w-12 rounded-lg bg-[#5e17eb] hover:bg-[#7c3aed] text-white"
                  onClick={() => setIsPlaying(!isPlaying)}
                >
                  {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
                </Button>
                <div className="text-lg font-mono text-white">{formatTime(duration)}</div>
                <div className="flex-1 h-16 bg-[#1a1a1c] rounded-lg flex items-center justify-center">
                  {/* Audio Waveform Visualization */}
                  <div className="flex items-center gap-1 h-12">
                    {Array.from({ length: 80 }).map((_, i) => (
                      <div
                        key={i}
                        className="w-1 bg-white rounded-full"
                        style={{
                          height: `${Math.random() * 40 + 10}px`,
                          opacity: i < (currentTime / duration) * 80 ? 1 : 0.3,
                        }}
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
            </CardContent>
          </Card>

          {/* Tabs Section */}
          <Tabs defaultValue="registros" className="w-full">
            <TabsList className="grid w-full grid-cols-3 bg-[#0a0a0a] border border-[#1a1a1c] mb-6">
              <TabsTrigger
                value="registros"
                className="data-[state=active]:bg-[#5e17eb] data-[state=active]:text-white text-gray-400 flex items-center gap-2"
              >
                📋 Registros
              </TabsTrigger>
              <TabsTrigger
                value="transcripciones"
                className="data-[state=active]:bg-[#5e17eb] data-[state=active]:text-white text-gray-400 flex items-center gap-2"
              >
                <FileText className="h-4 w-4" />
                Transcripciones
              </TabsTrigger>
              <TabsTrigger
                value="costo"
                className="data-[state=active]:bg-[#5e17eb] data-[state=active]:text-white text-gray-400 flex items-center gap-2"
              >
                <DollarSign className="h-4 w-4" />
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
                    {logEntries.map((entry, index) => (
                      <div key={index} className="flex items-start gap-4 py-2">
                        <span className="font-mono text-xs text-gray-400 min-w-[100px]">{entry.time}</span>
                        <Badge
                          variant="outline"
                          className="bg-[#3b82f6]/10 text-[#3b82f6] border-[#3b82f6]/20 min-w-[100px] justify-center"
                        >
                          [{entry.type}]
                        </Badge>
                        <span className="text-gray-300 text-sm flex-1">{entry.message}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="transcripciones">
              <Card className="bg-[#0a0a0a] border-[#1a1a1c]">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold text-white flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    Transcripción
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <ChatTranscript />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="costo">
              <CallCostBreakdown />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

export default function CallRecordingPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CallRecordingPageContent />
    </Suspense>
  )
}
