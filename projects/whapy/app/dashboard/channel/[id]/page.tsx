"use client"

import { Sidebar } from "@/components/layout/sidebar"
import { Home, ChevronRight, MessageSquare, Settings, User, Activity, Phone, Mail, Calendar, Clock, Zap, Shield, Globe, Users, BarChart3, Bot, LogOut, ExternalLink, MessageCircle, Code2, Info, AlertTriangle, Mail as MailIcon, MessagesSquare, ArrowLeftRight, Copy, Pencil, QrCode, ArrowRight, X, Plus, ChevronDown, ChevronUp, Lock, Unlock } from "lucide-react"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"

interface ChannelData {
  id: string
  name: string
  status: 'active' | 'inactive' | 'connecting'
  type: 'whatsapp' | 'telegram' | 'messenger'
  createdAt: string
  lastActivity: string
  messagesSent: number
  messagesReceived: number
  aiStatus: 'online' | 'offline' | 'training'
  aiName: string
  aiPersonality: string
}

// Componente para estadísticas de uso
const UsageStat = ({ icon: Icon, label, value, limit }: { icon: any, label: string, value: string | number, limit: string | number }) => (
  <div className="text-center">
    <div className="flex justify-center mb-2">
      <Icon className="h-6 w-6 text-muted-foreground" />
    </div>
    <div className="text-2xl font-bold">{value}</div>
    <div className="text-sm text-muted-foreground">{label}</div>
    <div className="text-xs text-muted-foreground">/ {limit}</div>
  </div>
)

// Componente para input con botón de copiar
const InputWithCopy = ({ label, value, isMasked = false, copyIcon: CopyIcon }: { label: string, value: string, isMasked?: boolean, copyIcon: any }) => (
  <div className="space-y-2">
    <label className="text-sm font-medium">{label}</label>
    <div className="flex gap-2">
      <Input 
        value={isMasked ? "•".repeat(value.length) : value} 
        readOnly 
        className="flex-1"
      />
      <Button variant="outline" size="icon">
        <CopyIcon className="h-4 w-4" />
      </Button>
    </div>
  </div>
)

// Componente para tarjeta de información
const InfoCard = ({ id, title, description, button, className = "" }: { id: string, title: string, description: string, button: { text: string, icon: any, className?: string }, className?: string }) => (
  <Card className={className}>
    <CardContent className="p-6">
      <h3 className="font-semibold mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground mb-4">{description}</p>
      <Button variant="outline" size="sm" className={button.className}>
        {button.text}
        <button.icon className="h-4 w-4 ml-2" />
      </Button>
    </CardContent>
  </Card>
)

// Componente para endpoint de API
const ApiEndpoint = ({ 
  method, 
  path, 
  description, 
  isExpanded = false 
}: { 
  method: 'GET' | 'POST' | 'PATCH' | 'DELETE', 
  path: string, 
  description: string,
  isExpanded?: boolean
}) => {
  const [expanded, setExpanded] = useState(isExpanded)
  const [activeTab, setActiveTab] = useState<'example' | 'schema'>('example')
  const [tryItOut, setTryItOut] = useState(false)
  
  const getMethodColor = (method: string) => {
    switch (method) {
      case 'GET': return 'bg-green-500'
      case 'POST': return 'bg-blue-500'
      case 'PATCH': return 'bg-orange-500'
      case 'DELETE': return 'bg-red-500'
      default: return 'bg-gray-500'
    }
  }

  // Datos específicos para GET /health
  const healthData = {
    description: "Allows you to track and get feedback on the operational status of the whapi channel (instance). An instance is a connection with a phone number that has a WhatsApp account, which will be responsible for sending and receiving messages",
    parameters: [
      {
        name: "wakeup",
        type: "boolean",
        in: "query",
        description: "If set to false, the channel will not launch",
        default: "true",
        enum: ["true", "false"]
      },
      {
        name: "platform",
        type: "string",
        in: "query",
        description: "Browser name, OS name, OS version separated by commas. Example: 'Safari,Windows,10.0.19044' or 'Desktop,Mac OS,11.6.3'",
        default: "Chrome,Whapi,1.6.0"
      },
      {
        name: "channel_type",
        type: "string",
        in: "query",
        description: "Channel type. Web - for linking existing WA account via WA Web, Mobile - for creating new WA account",
        default: "web",
        enum: ["web", "mobile"]
      }
    ],
    responses: {
      200: {
        description: "OK",
        example: {
          channel_id: "string",
          start_at: 0,
          uptime: 0,
          version: "string",
          device_id: 0,
          ip: "198.51.100.42",
          status: {
            code: 0,
            text: "NOT_INIT"
          },
          user: {
            id: "string",
            name: "string",
            pushname: "string",
            is_business: true,
            profile_pic: "string",
            profile_pic_full: "string",
            status: "string"
          }
        }
      },
      500: {
        description: "Internal Error",
        example: {
          error: {
            code: 0,
            message: "string",
            details: "string",
            href: "string",
            support: "string"
          }
        }
      }
    }
  }

  return (
    <div className="border border-border rounded-lg overflow-hidden">
      <Collapsible open={expanded} onOpenChange={setExpanded}>
        <CollapsibleTrigger asChild>
          <button className="w-full flex items-center justify-between p-4 hover:bg-accent/50 transition-colors">
            <div className="flex items-center gap-3">
              <Badge className={`${getMethodColor(method)} text-white font-mono text-xs`}>
                {method}
              </Badge>
              <span className="font-mono text-sm text-foreground">{path}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">{description}</span>
              <div className="flex items-center justify-center h-6 w-6">
                {expanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              </div>
            </div>
          </button>
        </CollapsibleTrigger>
        <CollapsibleContent className="border-t border-border">
          <div className="p-6 space-y-6">
            {/* Descripción */}
            <div className="opblock-description">
              <div className="renderedMarkdown">
                <p className="text-sm text-muted-foreground">{healthData.description}</p>
              </div>
            </div>

            {/* Sección de Parámetros */}
            <div className="opblock-section">
              <div className="opblock-section-header flex items-center justify-between mb-4">
                <div className="tab-header">
                  <div className="tab-item active">
                    <h4 className="opblock-title text-lg font-semibold">Parameters</h4>
                  </div>
                </div>
                <div className="try-out">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setTryItOut(!tryItOut)}
                  >
                    {tryItOut ? 'Cancel' : 'Try it out'}
                  </Button>
                </div>
              </div>
              
              {tryItOut && (
                <div className="parameters-container mb-4">
                  <div className="table-container">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-border">
                          <th className="text-left p-3 font-medium">Name</th>
                          <th className="text-left p-3 font-medium">Description</th>
                        </tr>
                      </thead>
                      <tbody>
                        {healthData.parameters.map((param, index) => (
                          <tr key={index} className="border-b border-border/50">
                            <td className="p-3">
                              <div className="parameter__name font-mono text-sm">{param.name}</div>
                              <div className="parameter__type text-xs text-muted-foreground">{param.type}</div>
                              <div className="parameter__in text-xs text-blue-500">({param.in})</div>
                            </td>
                            <td className="p-3">
                              <div className="parameter__description text-sm mb-2">{param.description}</div>
                              {param.default && (
                                <div className="parameter__default text-xs text-muted-foreground mb-2">
                                  <i>Default value</i>: {param.default}
                                </div>
                              )}
                              {param.enum ? (
                                <select className="w-full p-2 bg-background border border-border rounded text-sm">
                                  <option value="">--</option>
                                  {param.enum.map((option, i) => (
                                    <option key={i} value={option}>{option}</option>
                                  ))}
                                </select>
                              ) : (
                                <input 
                                  type="text" 
                                  className="w-full p-2 bg-background border border-border rounded text-sm"
                                  placeholder={param.name}
                                  defaultValue={param.default}
                                />
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>

            {/* Sección de Respuestas */}
            <div className="responses-wrapper">
              <div className="opblock-section-header mb-4">
                <h4 className="text-lg font-semibold">Responses</h4>
              </div>
              <div className="responses-inner">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left p-3 font-medium">Code</th>
                      <th className="text-left p-3 font-medium">Description</th>
                      <th className="text-left p-3 font-medium">Links</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.entries(healthData.responses).map(([code, response]) => (
                      <tr key={code} className="border-b border-border/50">
                        <td className="p-3">
                          <Badge variant={code === '200' ? 'default' : 'destructive'}>
                            {code}
                          </Badge>
                        </td>
                        <td className="p-3">
                          <div className="response-col_description__inner">
                            <div className="renderedMarkdown">
                              <p className="text-sm">{response.description}</p>
                            </div>
                          </div>
                          <section className="response-controls mt-2">
                            <div className="response-control-media-type">
                              <small className="text-xs text-muted-foreground">Media type</small>
                              <div className="content-type-wrapper">
                                <select className="mt-1 p-1 bg-background border border-border rounded text-xs">
                                  <option value="application/json">application/json</option>
                                </select>
                              </div>
                            </div>
                          </section>
                          
                          {/* Tabs para Example/Schema */}
                          <div className="model-example mt-4">
                            <div className="flex border-b border-border">
                              <button
                                className={`px-4 py-2 text-sm ${activeTab === 'example' ? 'border-b-2 border-primary text-primary' : 'text-muted-foreground'}`}
                                onClick={() => setActiveTab('example')}
                              >
                                Example Value
                              </button>
                              <button
                                className={`px-4 py-2 text-sm ${activeTab === 'schema' ? 'border-b-2 border-primary text-primary' : 'text-muted-foreground'}`}
                                onClick={() => setActiveTab('schema')}
                              >
                                Schema
                              </button>
                            </div>
                            
                            <div className="mt-4">
                              {activeTab === 'example' && (
                                <div className="highlight-code">
                                  <pre className="example bg-[#333] text-white p-4 rounded text-sm overflow-x-auto">
                                    <code className="language-json">
                                      {JSON.stringify(response.example, null, 2)}
                                    </code>
                                  </pre>
                                </div>
                              )}
                              {activeTab === 'schema' && (
                                <div className="highlight-code">
                                  <pre className="schema bg-[#333] text-white p-4 rounded text-sm overflow-x-auto">
                                    <code className="language-json">
                                      {JSON.stringify({
                                        type: "object",
                                        properties: {
                                          channel_id: { type: "string" },
                                          start_at: { type: "number" },
                                          uptime: { type: "number" },
                                          version: { type: "string" },
                                          device_id: { type: "number" },
                                          ip: { type: "string" },
                                          status: {
                                            type: "object",
                                            properties: {
                                              code: { type: "number" },
                                              text: { type: "string" }
                                            }
                                          },
                                          user: {
                                            type: "object",
                                            properties: {
                                              id: { type: "string" },
                                              name: { type: "string" },
                                              pushname: { type: "string" },
                                              is_business: { type: "boolean" },
                                              profile_pic: { type: "string" },
                                              profile_pic_full: { type: "string" },
                                              status: { type: "string" }
                                            }
                                          }
                                        }
                                      }, null, 2)}
                                    </code>
                                  </pre>
                                </div>
                              )}
                            </div>
                          </div>
                        </td>
                        <td className="p-3 text-sm text-muted-foreground">
                          <i>No links</i>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  )
}

export default function ChannelPage() {
  const params = useParams()
  const router = useRouter()
  const channelId = params.id as string
  
  const [channelData, setChannelData] = useState<ChannelData | null>(null)
  const [loading, setLoading] = useState(true)
  
  // Estados para la funcionalidad de edición y QR
  const [isEditing, setIsEditing] = useState(false)
  const [whatsappMessage, setWhatsappMessage] = useState("Start")
  const [showQRModal, setShowQRModal] = useState(false)

  useEffect(() => {
    // Simular carga de datos del canal
    const mockChannelData: ChannelData = {
      id: channelId,
      name: `Canal ${channelId}`,
      status: 'active',
      type: 'whatsapp',
      createdAt: new Date().toISOString(),
      lastActivity: new Date().toISOString(),
      messagesSent: 1247,
      messagesReceived: 892,
      aiStatus: 'online',
      aiName: 'Lucio',
      aiPersonality: 'Asistente comercial amigable y profesional'
    }
    
    setTimeout(() => {
      setChannelData(mockChannelData)
      setLoading(false)
    }, 1000)
  }, [channelId])

  // Función para generar el enlace de WhatsApp
  const getWhatsAppLink = () => {
    return `https://wa.me/59168802508?text=${encodeURIComponent(whatsappMessage)}`
  }

  // Función para manejar la edición
  const handleEdit = () => {
    setIsEditing(true)
  }

  // Función para guardar cambios
  const handleSave = () => {
    setIsEditing(false)
  }

  // Función para cancelar edición
  const handleCancel = () => {
    setWhatsappMessage("Start")
    setIsEditing(false)
  }

  // Función para copiar al portapapeles
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(getWhatsAppLink())
      // Aquí podrías mostrar un toast de confirmación
    } catch (err) {
      console.error('Error al copiar:', err)
    }
  }

  // Función para manejar la configuración
  const handleConfigure = () => {
    router.push('/dashboard/step-4')
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background text-foreground flex">
        <div className="w-64 hidden md:block">
          <Sidebar />
        </div>
        <div className="flex-1 flex flex-col">
          <div className="flex items-center justify-center h-full">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
          </div>
        </div>
      </div>
    )
  }

  if (!channelData) {
    return (
      <div className="min-h-screen bg-background text-foreground flex">
        <div className="w-64 hidden md:block">
          <Sidebar />
        </div>
        <div className="flex-1 flex flex-col">
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <h2 className="text-2xl font-semibold mb-2">Canal no encontrado</h2>
              <p className="text-muted-foreground">El canal con ID {channelId} no existe.</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background text-foreground flex">
      {/* Sidebar */}
      <div className="w-64 hidden md:block">
        <Sidebar />
      </div>
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header superior */}
        <header className="flex items-center justify-between p-4 border-b border-border">
          <h1 className="text-xl font-semibold">Canal {channelData.name}</h1>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3 bg-[#121212] border border-[#1d1d20] rounded-md px-4 py-2">
              <div className="w-7 h-7 bg-[#241543] rounded-full flex items-center justify-center">
                <span className="text-[#ad84ff] text-sm font-medium select-none">U</span>
              </div>
              <span className="text-white text-sm font-medium whitespace-nowrap">usuario@empresa.com</span>
            </div>
            <a className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border hover:text-accent-foreground h-9 rounded-md px-3 bg-[#121212] border-[#1d1d20] text-white hover:bg-[#1a1a1c]" href="/auth/logout">Cerrar Sesión</a>
          </div>
        </header>

        {/* Header de breadcrumbs y título */}
        <div className="flex-1 flex flex-col p-6 font-sans">
          <header className="flex justify-between items-center py-4 border-b border-border mb-8">
            <div className="flex flex-col gap-2">
              <h1 className="text-2xl font-semibold">Canal de WhatsApp</h1>
              <div className="flex items-center gap-4 text-muted-foreground text-sm">
                <Home className="h-4 w-4" />
                <span>Dashboard</span>
                <ChevronRight className="h-4 w-4" />
                <span>Canal {channelData.name}</span>
              </div>
            </div>
            <Button 
              onClick={handleConfigure}
              className="bg-[#5E17EB] hover:bg-[#5E17EB]/90 text-white transition-all duration-200 hover:scale-105"
            >
              <Plus className="h-4 w-4 mr-2" />
              Configurar
            </Button>
          </header>

          {/* Contenido JSON implementado */}
          <div className="grid grid-cols-1 xl:grid-cols-3 lg:grid-cols-2 gap-6">
            {/* Columna Izquierda - Perfil del Canal */}
            <div className="space-y-6">
              <Card className="relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-28 bg-muted/20"></div>
                <CardContent className="relative z-10 p-6 flex flex-col items-center">
                  <Button variant="outline" className="absolute top-4 right-4">
                    <LogOut className="h-4 w-4 mr-2" />
                    Cerrar Sesión
                  </Button>
                  
                  <div className="relative">
                    <Avatar className="w-24 h-24 border-4 border-background">
                      <AvatarImage src="/placeholder-user.jpg" />
                      <AvatarFallback>UX</AvatarFallback>
                    </Avatar>
                    <div className="absolute bottom-1 right-1 bg-green-500 rounded-full p-1 border-2 border-background">
                      <MessageCircle className="h-3 w-3 text-white" />
                    </div>
                  </div>
                  
                  <h2 className="mt-4 text-xl font-semibold flex items-center gap-2">
                    Nuevo canal 2
                    <ExternalLink className="h-4 w-4" />
                  </h2>
                  <p className="text-muted-foreground">+591 68802508</p>
                </CardContent>
                
                <Separator className="my-4" />
                
                <div className="p-6 pt-0 space-y-4">
                  <h3 className="font-semibold text-center">API de WhatsApp autorizada</h3>
                  <p className="text-sm text-muted-foreground text-center">
                    La API funciona incluso si tu teléfono está desconectado, pero para mantener la sesión activa, abre la aplicación móvil de WhatsApp al menos una vez cada 14 días.
                  </p>
                  <Alert className="bg-orange-500/10 border-orange-500/50 text-orange-400">
                    <AlertTriangle className="h-4 w-4" />
                    <AlertDescription>
                      <strong>Problema de Sincronización Detectado</strong><br />
                      Tu canal está experimentando un problema con la sincronización de WhatsApp que afecta la recepción de chats y mensajes. Por favor, cierra sesión y autoriza nuevamente para solucionar el problema.
                    </AlertDescription>
                  </Alert>
                </div>
              </Card>
            </div>

            {/* Columna Central - Sandbox */}
            <div className="space-y-6">
              <Card className="p-6">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4 mb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <Code2 className="h-8 w-8" />
                    </div>
                    <div>
                      <h3 className="font-bold flex items-center gap-2">
                        Entorno de Pruebas
                        <Badge variant="default">DES</Badge>
                      </h3>
                      <p className="text-sm text-muted-foreground">Sin expiración / acceso limitado</p>
                    </div>
                  </div>
                  <Button variant="outline" className="w-full sm:w-auto">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Eliminar Límites
                  </Button>
                </div>
                
                <Alert className="mt-4">
                  <Info className="h-4 w-4" />
                  <AlertDescription>
                    Estás usando el plan gratuito de desarrollador. Tiene restricciones que puedes eliminar pagando por el canal
                  </AlertDescription>
                </Alert>
                
                <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
                  <UsageStat icon={MailIcon} label="Mensajes" value={0} limit={150} />
                  <UsageStat icon={MessagesSquare} label="Chats" value={0} limit={5} />
                  <UsageStat icon={ArrowLeftRight} label="Solicitudes" value="4K" limit="1K" />
                </div>
                
                <Separator className="my-6" />
                
                <div className="space-y-4">
                  <InputWithCopy 
                    label="URL de la API:" 
                    value="https://gate.whapi.cloud/" 
                    copyIcon={Copy} 
                  />
                  <InputWithCopy 
                    label="Token:" 
                    value="G6q4NmPdsLLqkOAEUhX2KZgGjHjyjW" 
                    isMasked={true} 
                    copyIcon={Copy} 
                  />
                </div>
              </Card>
            </div>

            {/* Columna Derecha - Enlaces y Herramientas */}
            <div className="space-y-6 xl:col-span-1 lg:col-span-2 xl:col-span-1">
              <Card className="p-6">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-4">
                  <h3 className="font-semibold">Enlace de inicio de chat de WhatsApp</h3>
                  <div className="flex gap-2">
                    <Button 
                      variant="secondary" 
                      size="sm" 
                      onClick={handleEdit}
                      disabled={isEditing}
                      className="bg-[#8280FF] text-white hover:bg-[#8280FF]/80 border-[#8280FF]"
                    >
                      <Pencil className="h-4 w-4 mr-2" />
                      Editar
                    </Button>
                    <Button 
                      variant="secondary" 
                      size="sm"
                      onClick={() => setShowQRModal(true)}
                      className="bg-[#8280FF] text-white hover:bg-[#8280FF]/80 border-[#8280FF]"
                    >
                      <QrCode className="h-4 w-4 mr-2" />
                      Código QR
                    </Button>
                  </div>
                </div>
                
                {isEditing ? (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Mensaje personalizado:</label>
                      <Input 
                        value={whatsappMessage}
                        onChange={(e) => setWhatsappMessage(e.target.value)}
                        placeholder="Escribe tu mensaje personalizado..."
                        className="flex-1"
                      />
                    </div>
                    <div className="flex gap-2">
                      <Button onClick={handleSave} className="flex-1">
                        Guardar
                      </Button>
                      <Button variant="outline" onClick={handleCancel} className="flex-1">
                        Cancelar
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="mt-4 p-2 bg-muted rounded-md flex justify-between items-center">
                    <p className="text-sm text-green-400 truncate">{getWhatsAppLink()}</p>
                    <Button variant="ghost" size="icon" onClick={handleCopy}>
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </Card>
              
              <InfoCard 
                id="knowledge-base"
                title="Base de Conocimientos"
                description="El Centro de Ayuda cubre todo sobre Whapi.Cloud y la API"
                button={{ text: "Encuentra todas las guías aquí", icon: ArrowRight }}
              />
              
              <InfoCard 
                id="webhook-debugger"
                className="bg-blue-900/40 border-blue-500/30"
                title="Depurador de Solicitudes Webhook"
                description="Obtén una URL temporal para ver y depurar las devoluciones de llamada entrantes durante el desarrollo."
                button={{ 
                  text: "Inspeccionar Datos de Webhook Entrantes", 
                  icon: ArrowRight, 
                  className: "bg-blue-500 hover:bg-blue-600" 
                }}
              />
            </div>
          </div>

          {/* Modal del Código QR */}
          <Dialog open={showQRModal} onOpenChange={setShowQRModal}>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <QrCode className="h-5 w-5" />
                  Código QR de WhatsApp
                </DialogTitle>
              </DialogHeader>
              <div className="flex flex-col items-center space-y-4 py-6">
                <div className="bg-white p-4 rounded-lg">
                  {/* Aquí iría el código QR real generado */}
                  <div className="w-48 h-48 bg-gray-200 rounded-lg flex items-center justify-center">
                    <div className="text-center text-gray-500">
                      <QrCode className="h-16 w-16 mx-auto mb-2" />
                      <p className="text-sm">Código QR</p>
                      <p className="text-xs">+591 68802508</p>
                    </div>
                  </div>
                </div>
                <div className="text-center space-y-2">
                  <p className="text-sm text-muted-foreground">
                    Escanea este código QR con tu aplicación de WhatsApp
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Enlace: {getWhatsAppLink()}
                  </p>
                </div>
                <Button 
                  variant="outline" 
                  onClick={() => setShowQRModal(false)}
                  className="w-full"
                >
                  Cerrar
                </Button>
              </div>
            </DialogContent>
          </Dialog>

          <main className="flex flex-col space-y-8 mt-8">
            {/* Documentación de API */}
            <div className="bg-card p-6 rounded-lg border border-border">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Code2 className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold">Channel</h2>
                    <p className="text-sm text-muted-foreground">El canal es la entidad principal de la API. Representa la sesión de WhatsApp del usuario.</p>
                  </div>
                </div>
                <Button variant="outline" size="icon">
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="space-y-3">
                <ApiEndpoint 
                  method="GET" 
                  path="/health" 
                  description="Check health & launch channel" 
                />
                <ApiEndpoint 
                  method="GET" 
                  path="/settings" 
                  description="Get channel settings" 
                />
                <ApiEndpoint 
                  method="DELETE" 
                  path="/settings" 
                  description="Reset channel settings" 
                />
                <ApiEndpoint 
                  method="PATCH" 
                  path="/settings" 
                  description="Update channel settings" 
                />
                <ApiEndpoint 
                  method="GET" 
                  path="/settings/events" 
                  description="Get allowed events" 
                />
                <ApiEndpoint 
                  method="POST" 
                  path="/settings/webhook_test" 
                  description="Test webhook" 
                />
                <ApiEndpoint 
                  method="GET" 
                  path="/limits" 
                  description="Get limits" 
                />
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  )
} 