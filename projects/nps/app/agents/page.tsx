"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"

import { Play, Trash2, Edit, Plus } from "lucide-react"
import { Sidebar } from "@/components/layout/sidebar"
import { useRouter } from "next/navigation"
import { useAgents } from "@/lib/contexts/agents-context"
import Image from "next/image"
import { AgentConfirmationModal } from "@/components/agents/agent-confirmation-modal"
import Link from "next/link"
import UserInfoBar from "@/components/layout/user-info-bar"

export default function AgentsPage() {
  const [selectedTab, setSelectedTab] = useState("todos")
  const { agents, toggleAgent, resetToDefaults, clearLocalStorage } = useAgents()
  const router = useRouter()

  const [confirmationModal, setConfirmationModal] = useState<{
    isOpen: boolean
    agentId: string
    agentName: string
    action: "activate" | "deactivate"
  }>({
    isOpen: false,
    agentId: "",
    agentName: "",
    action: "activate",
  })

  const getStatusBadge = (status: string, statusColor: string) => {
    const colorMap: { [key: string]: string } = {
      "bg-green-500": "bg-green-500/20 text-green-400 border-green-500/30",
      "bg-blue-500": "bg-blue-500/20 text-blue-400 border-blue-500/30",
      "bg-red-500": "bg-red-500/20 text-red-400 border-red-500/30",
    }

    return (
      <Badge className={colorMap[statusColor] || "bg-gray-500/20 text-gray-400 border-gray-500/30"}>{status}</Badge>
    )
  }

  const handleAgentToggle = (agentId: string) => {
    const agent = agents.find((a) => a.id === agentId)
    if (!agent) return

    setConfirmationModal({
      isOpen: true,
      agentId,
      agentName: agent.name,
      action: agent.active ? "deactivate" : "activate",
    })
  }

  const handleConfirmToggle = () => {
    toggleAgent(confirmationModal.agentId)
    setConfirmationModal((prev) => ({ ...prev, isOpen: false }))
  }

  const handleCloseModal = () => {
    setConfirmationModal((prev) => ({ ...prev, isOpen: false }))
  }

  const filteredAgents = agents.filter((agent) => {
    switch (selectedTab) {
      case "activos":
        return agent.state === "Activo"
      case "inactivos":
        return agent.state === "Inactivo"
      case "en-llamada":
        return agent.status === "En llamada"
      case "eliminados":
        return false
      default:
        return true
    }
  })

  return (
    <div className="min-h-screen bg-[#121212] text-white flex">
      {/* Sidebar */}
      <div className="w-64 flex-shrink-0">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header - Independent Container */}
        <header className="flex items-center justify-between p-4 border-b border-border">
          <h1 className="text-xl font-semibold">Agentes</h1>
          <UserInfoBar email="usuario@empresa.com" />
        </header>

        {/* Agent Management Section - Independent Container */}
        <div className="flex-1 p-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-xl font-semibold">Gestión de Agentes</h2>
              <p className="text-gray-400 text-sm">Administra tus agentes de voz IA para campañas NPS</p>
            </div>
            <div className="flex gap-3">
              {agents.length === 0 && (
                <>
                  <Button
                    variant="outline"
                    className="bg-[#1a1a1c] border-[#333333] text-white hover:bg-[#2a2a2c] hover:border-[#4a4a4c]"
                    onClick={resetToDefaults}
                  >
                    Restaurar Ejemplos
                  </Button>
                  <Button
                    variant="outline"
                    className="bg-red-900/20 border-red-500/30 text-red-400 hover:bg-red-900/30 hover:border-red-500/50"
                    onClick={clearLocalStorage}
                  >
                    🧹 Limpiar Cache
                  </Button>
                </>
              )}
              <Button
                className="bg-[#5e17eb] hover:bg-[#4c12c4] text-white"
                onClick={() => router.push("/agents/create")}
              >
                <Plus className="w-4 h-4 mr-2" />
                Crear Nuevo Agente
              </Button>
            </div>
          </div>

          {/* Agent Tabs */}
          <div className="flex space-x-8 mb-8 border-b border-[#374151]">
            <button
              onClick={() => setSelectedTab("todos")}
              className={`pb-3 text-sm font-medium border-b-2 transition-all duration-200 ${
                selectedTab === "todos"
                  ? "text-white border-white"
                  : "text-gray-400 border-transparent hover:text-gray-300"
              }`}
            >
              Todos
            </button>
            <button
              onClick={() => setSelectedTab("activos")}
              className={`pb-3 text-sm font-medium border-b-2 transition-all duration-200 ${
                selectedTab === "activos"
                  ? "text-white border-white"
                  : "text-gray-400 border-transparent hover:text-gray-300"
              }`}
            >
              Activos
            </button>
            <button
              onClick={() => setSelectedTab("inactivos")}
              className={`pb-3 text-sm font-medium border-b-2 transition-all duration-200 ${
                selectedTab === "inactivos"
                  ? "text-white border-white"
                  : "text-gray-400 border-transparent hover:text-gray-300"
              }`}
            >
              Inactivos
            </button>
            <button
              onClick={() => setSelectedTab("en-llamada")}
              className={`pb-3 text-sm font-medium border-b-2 transition-all duration-200 ${
                selectedTab === "en-llamada"
                  ? "text-white border-white"
                  : "text-gray-400 border-transparent hover:text-gray-300"
              }`}
            >
              En llamada
            </button>
            <button
              onClick={() => setSelectedTab("eliminados")}
              className={`pb-3 text-sm font-medium border-b-2 transition-all duration-200 ${
                selectedTab === "eliminados"
                  ? "text-white border-white"
                  : "text-gray-400 border-transparent hover:text-gray-300"
              }`}
            >
              Eliminados
            </button>
          </div>

          {/* Agent Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Create New Agent Card */}
            <Card className="bg-[#0A0A0A] border-gray-700 border-dashed">
              <CardContent className="p-6 flex flex-col items-center justify-center h-full min-h-[400px]">
                <div className="w-16 h-16 bg-[#5e17eb] rounded-full flex items-center justify-center mb-4">
                  <Plus className="w-8 h-8 text-white" />
                </div>
                <Button
                  className="bg-[#5e17eb] hover:bg-[#4c12c4] text-white"
                  onClick={() => router.push("/agents/create")}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Crear Nuevo Agente
                </Button>
              </CardContent>
            </Card>

            {/* Agent Cards */}
            {filteredAgents.map((agent) => (
              <Card key={agent.id} className="bg-[#0A0A0A] border-gray-700">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full flex items-center justify-center overflow-hidden">
                        {agent.avatarImage ? (
                          <Image
                            src={agent.avatarImage || "/placeholder.svg"}
                            alt={agent.name}
                            width={40}
                            height={40}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div
                            className={`w-full h-full ${agent.avatarColor} flex items-center justify-center text-white font-semibold`}
                          >
                            {agent.avatar}
                          </div>
                        )}
                      </div>
                      <div>
                        <h3 className="font-semibold text-white">{agent.name}</h3>
                        {getStatusBadge(agent.status, agent.statusColor)}
                      </div>
                    </div>
                  </div>

                  <p className="text-gray-400 text-sm mb-4">{agent.description}</p>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-sm">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span className="text-gray-300">{agent.language}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                      <span className="text-gray-300">Personalidad: {agent.personality}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
                      <span className="text-gray-300">Campaña: {agent.campaign}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <div className="text-xs text-gray-500">Tasa de resolución</div>
                      <div className="font-semibold text-white">{agent.resolutionRate}</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500">Tiempo promedio</div>
                      <div className="font-semibold text-white">{agent.avgTime}</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500">Llamadas hoy</div>
                      <div className="font-semibold text-white">{agent.callsToday}</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500">Estado</div>
                      <div className="font-semibold text-white">{agent.state}</div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-700">
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-800">
                        <Play className="w-3 h-3 mr-1" />
                        Test
                      </Button>
                      <Button size="sm" variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-800">
                        <Trash2 className="w-3 h-3 mr-1" />
                        Borrar
                      </Button>
                      <Button size="sm" variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-800">
                        <Edit className="w-3 h-3 mr-1" />
                        Edit
                      </Button>
                    </div>
                    <Switch
                      checked={agent.active}
                      onCheckedChange={() => handleAgentToggle(agent.id)}
                      className="data-[state=checked]:bg-[#82ECFF] data-[state=unchecked]:bg-gray-600"
                    />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Confirmation Modal */}
          <AgentConfirmationModal
            isOpen={confirmationModal.isOpen}
            onClose={handleCloseModal}
            onConfirm={handleConfirmToggle}
            agentName={confirmationModal.agentName}
            action={confirmationModal.action}
          />
        </div>
      </div>
    </div>
  )
}
