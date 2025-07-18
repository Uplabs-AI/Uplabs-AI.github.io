"use client"

import { Sidebar } from "@/components/layout/sidebar"
import { Home, ChevronRight, Plus, MessageSquare, Settings, Bot, Activity, Calendar, Users, BarChart3, Trash2, Edit, Play, Pause } from "lucide-react"
import Link from "next/link"
import { useState, useEffect } from "react"

interface Channel {
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
}

export default function ChannelsPage() {
  const [channels, setChannels] = useState<Channel[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Cargar canales desde localStorage
    const loadChannels = () => {
      const channelKeys = Object.keys(localStorage).filter(key => key.startsWith('channel_'))
      const loadedChannels: Channel[] = []
      
      channelKeys.forEach(key => {
        try {
          const channelData = JSON.parse(localStorage.getItem(key) || '{}')
          if (channelData.id) {
            loadedChannels.push({
              id: channelData.id,
              name: `Canal ${channelData.id.split('_')[1]}`,
              status: 'active',
              type: 'whatsapp',
              createdAt: channelData.createdAt || new Date().toISOString(),
              lastActivity: new Date().toISOString(),
              messagesSent: Math.floor(Math.random() * 1000) + 100,
              messagesReceived: Math.floor(Math.random() * 800) + 50,
              aiStatus: 'online',
              aiName: 'Lucio'
            })
          }
        } catch (error) {
          console.error('Error loading channel:', error)
        }
      })
      
      setChannels(loadedChannels)
      setLoading(false)
    }

    loadChannels()
  }, [])

  const deleteChannel = (channelId: string) => {
    localStorage.removeItem(`channel_${channelId}`)
    setChannels(channels.filter(channel => channel.id !== channelId))
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
          <h1 className="text-xl font-semibold">Mis Canales</h1>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3 bg-[#121212] border border-[#1d1d20] rounded-md px-4 py-2">
              <div className="w-7 h-7 bg-[#241543] rounded-full flex items-center justify-center">
                <span className="text-[#ad84ff] text-sm font-medium select-none">U</span>
              </div>
              <span className="text-white text-sm font-medium whitespace-nowrap">usuario@empresa.com</span>
            </div>
            <a className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border hover:text-accent-foreground h-9 rounded-md px-3 bg-[#121212] border-[#1d1d20] text-white hover:bg-[#1a1a1c]" href="/auth/logout">Sign Out</a>
          </div>
        </header>

        {/* Header de breadcrumbs y título */}
        <div className="flex-1 flex flex-col p-6 font-sans">
          <header className="flex justify-between items-center py-4 border-b border-border mb-8">
            <h1 className="text-2xl font-semibold">Canales de WhatsApp</h1>
            <div className="flex items-center gap-4 text-muted-foreground text-sm">
              <Home className="h-4 w-4" />
              <span>Dashboard</span>
              <ChevronRight className="h-4 w-4" />
              <span>Mis Canales</span>
            </div>
          </header>

          <main className="flex flex-col space-y-8">
            {/* Header con estadísticas y botón crear */}
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-8">
                <div className="text-center">
                  <p className="text-2xl font-bold text-primary">{channels.length}</p>
                  <p className="text-sm text-muted-foreground">Canales Activos</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-green-500">
                    {channels.filter(c => c.status === 'active').length}
                  </p>
                  <p className="text-sm text-muted-foreground">Conectados</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-blue-500">
                    {channels.reduce((total, c) => total + c.messagesSent, 0).toLocaleString()}
                  </p>
                  <p className="text-sm text-muted-foreground">Mensajes Enviados</p>
                </div>
              </div>
              
              <Link 
                href="/dashboard/step-1"
                className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 h-10 px-4 py-2 bg-[#5E17EB] hover:bg-[#5E17EB]/90 text-white"
              >
                <Plus className="h-4 w-4" />
                Crear Nuevo Canal
              </Link>
            </div>

            {/* Lista de canales */}
            {channels.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                  <MessageSquare className="h-12 w-12 text-muted-foreground" />
                </div>
                <h3 className="text-xl font-semibold mb-2">No tienes canales creados</h3>
                <p className="text-muted-foreground mb-6">Crea tu primer canal de WhatsApp para comenzar a usar el asistente de IA</p>
                <Link 
                  href="/dashboard/step-1"
                  className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 h-10 px-4 py-2 bg-[#5E17EB] hover:bg-[#5E17EB]/90 text-white"
                >
                  <Plus className="h-4 w-4" />
                  Crear Primer Canal
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {channels.map((channel) => (
                  <div key={channel.id} className="bg-card p-6 rounded-lg border border-border hover:border-primary/50 transition-colors">
                    {/* Header del canal */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-blue-600 rounded-full flex items-center justify-center">
                          <MessageSquare className="h-5 w-5 text-white" />
                        </div>
                        <div>
                          <h3 className="font-semibold">{channel.name}</h3>
                          <p className="text-sm text-muted-foreground">WhatsApp</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${channel.status === 'active' ? 'bg-green-500' : channel.status === 'connecting' ? 'bg-yellow-500' : 'bg-red-500'}`}></div>
                        <span className="text-xs font-medium capitalize">{channel.status}</span>
                      </div>
                    </div>

                    {/* Estadísticas rápidas */}
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="text-center p-3 bg-[#1a1a1c] rounded-lg">
                        <p className="text-lg font-bold text-blue-500">{channel.messagesSent}</p>
                        <p className="text-xs text-muted-foreground">Enviados</p>
                      </div>
                      <div className="text-center p-3 bg-[#1a1a1c] rounded-lg">
                        <p className="text-lg font-bold text-green-500">{channel.messagesReceived}</p>
                        <p className="text-xs text-muted-foreground">Recibidos</p>
                      </div>
                    </div>

                    {/* Estado de IA */}
                    <div className="flex items-center justify-between mb-4 p-3 bg-[#1a1a1c] rounded-lg">
                      <div className="flex items-center gap-2">
                        <Bot className="h-4 w-4 text-purple-500" />
                        <span className="text-sm font-medium">{channel.aiName}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <div className={`w-2 h-2 rounded-full ${channel.aiStatus === 'online' ? 'bg-green-500' : 'bg-red-500'}`}></div>
                        <span className="text-xs capitalize">{channel.aiStatus}</span>
                      </div>
                    </div>

                    {/* Fecha de creación */}
                    <div className="flex items-center gap-2 mb-4 text-xs text-muted-foreground">
                      <Calendar className="h-3 w-3" />
                      <span>Creado: {new Date(channel.createdAt).toLocaleDateString()}</span>
                    </div>

                    {/* Acciones */}
                    <div className="flex items-center gap-2">
                      <Link
                        href={`/dashboard/channel/${channel.id}`}
                        className="flex-1 inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 h-8 px-3 bg-[#5E17EB] hover:bg-[#5E17EB]/90 text-white"
                      >
                        <Play className="h-3 w-3" />
                        Abrir
                      </Link>
                      
                      <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 h-8 w-8 border border-border hover:bg-accent">
                        <Settings className="h-3 w-3" />
                      </button>
                      
                      <button 
                        onClick={() => deleteChannel(channel.id)}
                        className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 h-8 w-8 border border-border hover:bg-red-500/10 hover:border-red-500/50"
                      >
                        <Trash2 className="h-3 w-3" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  )
} 