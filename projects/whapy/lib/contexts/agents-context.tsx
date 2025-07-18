"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

export interface Agent {
  id: string
  name: string
  status: string
  statusColor: string
  description: string
  language: string
  personality: string
  campaign: string
  resolutionRate: string
  avgTime: string
  callsToday: number
  state: string
  active: boolean
  avatar: string
  avatarColor: string
  avatarImage?: string | null
  voiceTone: string
  accent: string
  backgroundSound: string
  hipaaCompliance: boolean
  pciCompliance: boolean
  multilingualSupport: boolean
  createdAt: string
}

interface AgentsContextType {
  agents: Agent[]
  addAgent: (agent: Omit<Agent, "id" | "createdAt">) => void
  updateAgent: (id: string, updates: Partial<Agent>) => void
  deleteAgent: (id: string) => void
  toggleAgent: (id: string) => void
}

const AgentsContext = createContext<AgentsContextType | undefined>(undefined)

const defaultAgents: Agent[] = [
  {
    id: "1",
    name: "Carlos",
    status: "Activo",
    statusColor: "bg-green-500",
    description: "Llama a clientes para recopilar datos del NPS",
    language: "Español - Masculino",
    personality: "Profesional",
    campaign: "Satisfacción Cliente Q1",
    resolutionRate: "80%",
    avgTime: "3:24 min",
    callsToday: 45,
    state: "Activo",
    active: true,
    avatar: "C",
    avatarColor: "bg-blue-600",
    voiceTone: "profesional",
    accent: "es-neutral",
    backgroundSound: "oficina",
    hipaaCompliance: true,
    pciCompliance: true,
    multilingualSupport: false,
    createdAt: "2024-01-15T10:00:00Z",
  },
  {
    id: "2",
    name: "María",
    status: "En llamada",
    statusColor: "bg-blue-500",
    description: "Llama a clientes para recopilar datos del NPS",
    language: "Español - Femenino",
    personality: "Amigable",
    campaign: "Feedback Producto Nuevo",
    resolutionRate: "85%",
    avgTime: "2:58 min",
    callsToday: 30,
    state: "Activo",
    active: true,
    avatar: "M",
    avatarColor: "bg-pink-600",
    voiceTone: "amigable",
    accent: "es-mx",
    backgroundSound: "oficina",
    hipaaCompliance: true,
    pciCompliance: false,
    multilingualSupport: true,
    createdAt: "2024-01-10T14:30:00Z",
  },
  {
    id: "3",
    name: "Ana",
    status: "Activo",
    statusColor: "bg-green-500",
    description: "Llama a clientes para recopilar datos del NPS",
    language: "Español - Femenino",
    personality: "Formal",
    campaign: "Satisfacción Post-Compra",
    resolutionRate: "75%",
    avgTime: "4:05 min",
    callsToday: 50,
    state: "Activo",
    active: true,
    avatar: "A",
    avatarColor: "bg-purple-600",
    voiceTone: "profesional",
    accent: "es-ar",
    backgroundSound: "ninguno",
    hipaaCompliance: true,
    pciCompliance: true,
    multilingualSupport: false,
    createdAt: "2024-01-08T09:15:00Z",
  },
  {
    id: "4",
    name: "Roberto",
    status: "Inactivo",
    statusColor: "bg-red-500",
    description: "Llama a clientes para recopilar datos del NPS",
    language: "Español - Masculino",
    personality: "Profesional",
    campaign: "Sin campaña asignada",
    resolutionRate: "78%",
    avgTime: "3:45 min",
    callsToday: 25,
    state: "Inactivo",
    active: false,
    avatar: "R",
    avatarColor: "bg-red-600",
    voiceTone: "neutral",
    accent: "es-es",
    backgroundSound: "oficina",
    hipaaCompliance: false,
    pciCompliance: true,
    multilingualSupport: false,
    createdAt: "2024-01-05T16:45:00Z",
  },
  {
    id: "5",
    name: "Laura",
    status: "Disponible",
    statusColor: "bg-green-500",
    description: "Llama a clientes para recopilar datos del NPS",
    language: "Español - Femenino",
    personality: "Empática",
    campaign: "Satisfacción Cliente Q1",
    resolutionRate: "82%",
    avgTime: "3:30 min",
    callsToday: 42,
    state: "Activo",
    active: true,
    avatar: "L",
    avatarColor: "bg-green-600",
    voiceTone: "amigable",
    accent: "es-co",
    backgroundSound: "oficina",
    hipaaCompliance: true,
    pciCompliance: true,
    multilingualSupport: true,
    createdAt: "2024-01-03T11:20:00Z",
  },
]

export function AgentsProvider({ children }: { children: React.ReactNode }) {
  const [agents, setAgents] = useState<Agent[]>([])

  // Load agents from localStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedAgents = localStorage.getItem("nps-vox-agents")
      if (savedAgents) {
        setAgents(JSON.parse(savedAgents))
      } else {
        setAgents(defaultAgents)
      }
    }
  }, [])

  // Save agents to localStorage whenever agents change
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem("nps-vox-agents", JSON.stringify(agents))
    }
  }, [agents])

  const addAgent = (agentData: Omit<Agent, "id" | "createdAt">) => {
    const newAgent: Agent = {
      ...agentData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    }
    setAgents((prev) => [newAgent, ...prev])
  }

  const updateAgent = (id: string, updates: Partial<Agent>) => {
    setAgents((prev) => prev.map((agent) => (agent.id === id ? { ...agent, ...updates } : agent)))
  }

  const deleteAgent = (id: string) => {
    setAgents((prev) => prev.filter((agent) => agent.id !== id))
  }

  const toggleAgent = (id: string) => {
    setAgents((prev) =>
      prev.map((agent) => {
        if (agent.id === id) {
          const newActiveState = !agent.active
          const newState = newActiveState ? "Activo" : "Inactivo"
          const newStatus = newActiveState ? "Disponible" : "Inactivo"
          const newStatusColor = newActiveState ? "bg-green-500" : "bg-red-500"

          return {
            ...agent,
            active: newActiveState,
            state: newState,
            status: newStatus,
            statusColor: newStatusColor,
          }
        }
        return agent
      }),
    )
  }

  return (
    <AgentsContext.Provider value={{ agents, addAgent, updateAgent, deleteAgent, toggleAgent }}>
      {children}
    </AgentsContext.Provider>
  )
}

export function useAgents() {
  const context = useContext(AgentsContext)
  if (context === undefined) {
    throw new Error("useAgents must be used within an AgentsProvider")
  }
  return context
}
