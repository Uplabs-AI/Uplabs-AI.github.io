"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

import { Play, Trash2, Edit, Plus } from "lucide-react"
import { Sidebar } from "@/components/layout/sidebar"
import { useRouter } from "next/navigation"
import { useKnowledgebase } from "@/lib/contexts/knowledgebase-context"
import Image from "next/image"
import { AgentConfirmationModal } from "@/components/agents/agent-confirmation-modal"
import Link from "next/link"
import UserInfoBar from "@/components/layout/user-info-bar"

export default function KnowledgebasePage() {
  const [selectedTab, setSelectedTab] = useState("todos")
  const { knowledgebase, deleteKnowledge, toggleKnowledge } = useKnowledgebase();
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
    const agent = knowledgebase.find((a) => a.id === agentId)
    if (!agent) return

    setConfirmationModal({
      isOpen: true,
      agentId,
      agentName: agent.title,
      action: agent.active ? "deactivate" : "activate",
    })
  }

  const handleConfirmToggle = () => {
    toggleKnowledge(confirmationModal.agentId)
    setConfirmationModal((prev) => ({ ...prev, isOpen: false }))
  }

  const handleCloseModal = () => {
    setConfirmationModal((prev) => ({ ...prev, isOpen: false }))
  }

  const filteredAgents = knowledgebase.filter((kb) => {
    switch (selectedTab) {
      case "activos":
        return kb.active
      case "inactivos":
        return !kb.active
      case "en-llamada":
        return false // No status field in knowledgebase
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
          <h1 className="text-xl font-semibold">Base de Conocimientos</h1>
          <UserInfoBar email="usuario@empresa.com" />
        </header>

        {/* Agent Management Section - Independent Container */}
        <div className="flex-1 p-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-xl font-semibold">Gestión de Base de Conocimientos</h2>
              <p className="text-gray-400 text-sm">Administra tu base de conocimientos para agentes IA</p>
            </div>
            <div className="flex gap-3">
              {/* Removed resetToDefaults and clearLocalStorage */}
              <Button
                className="bg-[#5e17eb] hover:bg-[#4c12c4] text-white"
                onClick={() => router.push("/knowledgebase/create")}
              >
                <Plus className="w-4 h-4 mr-2" />
                Crear Base de Conocimientos
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

          {/* Knowledgebase Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Create New Knowledge Card */}
            <Card className="bg-[#0A0A0A] border-gray-700 border-dashed">
              <CardContent className="p-6 flex flex-col items-center justify-center h-full min-h-[400px]">
                <div className="w-16 h-16 bg-[#5e17eb] rounded-full flex items-center justify-center mb-4">
                  <Plus className="w-8 h-8 text-white" />
                </div>
                <Button
                  className="bg-[#5e17eb] hover:bg-[#4c12c4] text-white"
                  onClick={() => router.push("/knowledgebase/create")}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Crear Base de Conocimientos
                </Button>
              </CardContent>
            </Card>

            {/* Knowledgebase Cards */}
            {knowledgebase.map((kb) => (
              <Card key={kb.id} className="bg-[#0A0A0A] border-gray-700">
                <CardContent className="p-6 flex flex-col h-full">
                  {/* Título grande */}
                  <h3 className="font-bold text-2xl text-white mb-1 truncate">{kb.title}</h3>
                  {/* Chips en dos filas */}
                  <div className="flex flex-col gap-2 mb-2">
                    <div className="flex flex-wrap gap-2">
                      <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30 px-6 py-2 text-lg font-semibold min-h-[2.5rem] flex items-center rounded-full">{kb.category}</Badge>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <Badge className={kb.contentType === 'document' ? 'bg-green-500/20 text-green-400 border-green-500/30 px-4 py-1 text-base font-semibold min-h-[2.25rem] flex items-center' : 'bg-purple-500/20 text-purple-400 border-purple-500/30 px-4 py-1 text-base font-semibold min-h-[2.25rem] flex items-center'}>
                        {kb.contentType === 'document' ? 'Documento Adjunto' : 'Texto Pegado'}
                      </Badge>
                    </div>
                  </div>
                  {/* Descripción en recuadro */}
                  <div className="bg-[#18102a] border border-[#232136] rounded-md px-4 py-3 text-gray-300 text-sm leading-relaxed mb-2">
                    {kb.description}
                  </div>
                  {/* Acciones y switch siempre abajo */}
                  <div className="flex gap-2 pt-4 border-t border-gray-700 mt-auto">
                    <button
                      className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border bg-background hover:text-accent-foreground h-9 rounded-md px-3 border-gray-600 text-gray-300 hover:bg-gray-800"
                      onClick={() => router.push(`/knowledgebase/create?id=${kb.id}`)}
                    >
                      <Edit className="w-3 h-3 mr-1" />
                      Editar
                    </button>
                    <button
                      className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border bg-background hover:text-accent-foreground h-9 rounded-md px-3 border-gray-600 text-gray-300 hover:bg-gray-800"
                      onClick={() => deleteKnowledge(kb.id)}
                    >
                      <Trash2 className="w-3 h-3 mr-1" />
                      Eliminar
                    </button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
      <AgentConfirmationModal
        isOpen={confirmationModal.isOpen}
        onClose={handleCloseModal}
        onConfirm={handleConfirmToggle}
        agentName={confirmationModal.agentName}
        action={confirmationModal.action}
      />
    </div>
  )
} 