"use client"

import { useState, useMemo, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Sidebar } from "@/components/layout/sidebar"
import { useToast } from "@/components/ui/use-toast"
import { Search, Edit, Trash2, ChevronLeft, ChevronRight, Plus } from "lucide-react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import UserInfoBar from "@/components/layout/user-info-bar"

// Survey data with consistent structure
const initialSurveysData = [
  {
    id: "1",
    name: "Cotización Seguro Automotor",
    type: "AUTO" as const,
    description: "Estimación de precio para seguro automotor básico",
    questions: 3,
    createdDate: "01/01/2023",
    status: "active" as const,
  },
  {
    id: "2",
    name: "Cotización Seguro de Vida",
    type: "VIDA" as const,
    description: "Propuesta de seguro de vida personalizada para nuevos clientes",
    questions: 5,
    createdDate: "15/04/2023",
    status: "active" as const,
  },
  {
    id: "3",
    name: "Cotización Crédito Hipotecario",
    type: "HIPOTECA" as const,
    description: "Simulación de cuotas y tasas para crédito de vivienda",
    questions: 4,
    createdDate: "01/06/2023",
    status: "paused" as const,
  },
  {
    id: "4",
    name: "Cotización Plan de Salud Familiar",
    type: "SALUD" as const,
    description: "Oferta de plan médico integral para familias",
    questions: 3,
    createdDate: "10/03/2023",
    status: "template" as const,
  },
  {
    id: "5",
    name: "Cotización Internet Empresarial",
    type: "SERVICIO" as const,
    description: "Paquete de internet de alta velocidad para pymes",
    questions: 6,
    createdDate: "01/07/2023",
    status: "scheduled" as const,
  },
]

// Update the SurveyStatus type
type SurveyStatus = "all" | "active" | "paused" | "template" | "scheduled" | "draft"

// Update the tabs to include "draft" status
const tabs = [
  { key: "all" as SurveyStatus, label: "Todas" },
  { key: "active" as SurveyStatus, label: "Activas" },
  { key: "draft" as SurveyStatus, label: "Borradores" },
  { key: "template" as SurveyStatus, label: "Plantillas" },
  { key: "paused" as SurveyStatus, label: "Archivadas" },
]

export default function SurveysPage() {
  const [surveys, setSurveys] = useState(initialSurveysData)
  const [activeTab, setActiveTab] = useState<SurveyStatus>("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5
  const { toast } = useToast()
  const router = useRouter()

  // Load surveys from localStorage on component mount and when returning from other pages
  useEffect(() => {
    const loadSurveys = () => {
      try {
        // Verificar que estamos en el cliente
        if (typeof window === 'undefined') {
          setSurveys(initialSurveysData)
          return
        }

        const savedSurveys = JSON.parse(localStorage.getItem("surveys") || "[]")
        console.log("Loaded surveys from localStorage:", savedSurveys) // Debug log

        if (savedSurveys.length > 0) {
          // Combine initial surveys with saved surveys, avoiding duplicates
          const combinedSurveys = [...initialSurveysData]

          savedSurveys.forEach((savedSurvey: any) => {
            // Only add if not already in initial data
            if (!combinedSurveys.find((survey) => survey.id === savedSurvey.id)) {
              combinedSurveys.push(savedSurvey)
            }
          })

          console.log("Combined surveys:", combinedSurveys) // Debug log
          setSurveys(combinedSurveys)
        } else {
          setSurveys(initialSurveysData)
        }
      } catch (error) {
        console.error("Error loading surveys:", error)
        setSurveys(initialSurveysData)
      }
    }

    loadSurveys()

    // Solo agregar listeners si estamos en el cliente
    if (typeof window !== 'undefined') {
      // Listen for storage changes (when surveys are saved from other tabs/windows)
      const handleStorageChange = (e: StorageEvent) => {
        if (e.key === "surveys") {
          console.log("Storage changed, reloading surveys") // Debug log
          loadSurveys()
        }
      }

      // Listen for visibility change to reload when returning to the page
      const handleVisibilityChange = () => {
        if (typeof window !== 'undefined' && !document.hidden) {
          console.log("Page became visible, reloading surveys") // Debug log
          loadSurveys()
        }
      }

      if (typeof window !== 'undefined') {
        window.addEventListener("storage", handleStorageChange)
        document.addEventListener("visibilitychange", handleVisibilityChange)

        return () => {
          window.removeEventListener("storage", handleStorageChange)
          document.removeEventListener("visibilitychange", handleVisibilityChange)
        }
      }
    }
  }, [])

  // Add a manual refresh function for testing
  const handleRefreshSurveys = () => {
    if (typeof window === 'undefined') return

    const savedSurveys = JSON.parse(localStorage.getItem("surveys") || "[]")
    console.log("Manual refresh - saved surveys:", savedSurveys)

    if (savedSurveys.length > 0) {
      const combinedSurveys = [...initialSurveysData]

      savedSurveys.forEach((savedSurvey: any) => {
        if (!combinedSurveys.find((survey) => survey.id === savedSurvey.id)) {
          combinedSurveys.push(savedSurvey)
        }
      })

      setSurveys(combinedSurveys)
      toast({
        title: "Encuestas Actualizadas",
        description: `Se cargaron ${combinedSurveys.length} encuestas en total.`,
      })
    }
  }

  // Filter surveys based on tab and search
  const filteredSurveys = useMemo(() => {
    let filtered = surveys

    // Filter by status tab
    if (activeTab !== "all") {
      if (activeTab === "paused") {
        // "Archivadas" tab shows paused surveys
        filtered = filtered.filter((survey) => survey.status === "paused")
      } else {
        filtered = filtered.filter((survey) => survey.status === activeTab)
      }
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(
        (survey) => survey.name.toLowerCase().includes(query) || survey.description.toLowerCase().includes(query),
      )
    }

    return filtered
  }, [surveys, activeTab, searchQuery])

  // Pagination
  const totalPages = Math.ceil(filteredSurveys.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedSurveys = filteredSurveys.slice(startIndex, startIndex + itemsPerPage)

  // Handle tab change
  const handleTabChange = (tab: SurveyStatus) => {
    setActiveTab(tab)
    setCurrentPage(1)
  }

  // Handle search
  const handleSearchChange = (value: string) => {
    setSearchQuery(value)
    setCurrentPage(1)
  }

  // Handle actions
  const handleEdit = (surveyId: string) => {
    const survey = surveys.find((s) => s.id === surveyId)
    toast({
      title: "Editar Encuesta",
      description: `Abriendo editor para ${survey?.name}...`,
    })
  }

  const handleDelete = (surveyId: string) => {
    const survey = surveys.find((s) => s.id === surveyId)
    if (confirm(`¿Estás seguro de que quieres eliminar "${survey?.name}"?`)) {
      // Remove from state
      const updatedSurveys = surveys.filter((s) => s.id !== surveyId)
      setSurveys(updatedSurveys)

      // Update localStorage (only save custom surveys, not initial ones)
      if (typeof window !== 'undefined') {
        const customSurveys = updatedSurveys.filter((s) => !initialSurveysData.find((initial) => initial.id === s.id))
        localStorage.setItem("surveys", JSON.stringify(customSurveys))
      }

      toast({
        title: "Encuesta Eliminada",
        description: `${survey?.name} ha sido eliminada exitosamente.`,
        variant: "destructive",
      })
    }
  }

  const handleCreateSurvey = () => {
    router.push("/surveys/create")
  }

  // Pagination handlers
  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1)
    }
  }

  // Get badge colors
  const getTypeBadge = (type: string) => {
    switch (type) {
      case "NPS":
        return (
          <Badge className="bg-[#2563eb] hover:bg-[#2563eb] text-white border-0 px-3 py-1 rounded-md text-xs font-medium">
            {type}
          </Badge>
        )
      case "CSAT":
        return (
          <Badge className="bg-[#16a34a] hover:bg-[#16a34a] text-white border-0 px-3 py-1 rounded-md text-xs font-medium">
            {type}
          </Badge>
        )
      case "CES":
        return (
          <Badge className="bg-[#9333ea] hover:bg-[#9333ea] text-white border-0 px-3 py-1 rounded-md text-xs font-medium">
            {type}
          </Badge>
        )
      default:
        return <Badge variant="outline">{type}</Badge>
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return (
          <Badge className="bg-[#10b981] hover:bg-[#10b981] text-white border-0 px-3 py-1 rounded-full text-xs font-medium">
            Activa
          </Badge>
        )
      case "paused":
        return (
          <Badge className="bg-[#f97316] hover:bg-[#f97316] text-white border-0 px-3 py-1 rounded-full text-xs font-medium">
            Pausada
          </Badge>
        )
      case "template":
        return (
          <Badge className="bg-[#2563eb] hover:bg-[#2563eb] text-white border-0 px-3 py-1 rounded-full text-xs font-medium">
            Plantilla
          </Badge>
        )
      case "scheduled":
        return (
          <Badge className="bg-[#9333ea] hover:bg-[#9333ea] text-white border-0 px-3 py-1 rounded-full text-xs font-medium">
            Programada
          </Badge>
        )
      case "draft":
        return (
          <Badge className="bg-[#6b7280] hover:bg-[#6b7280] text-white border-0 px-3 py-1 rounded-full text-xs font-medium">
            Borrador
          </Badge>
        )
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

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
          <h1 className="text-xl font-semibold">Encuestas</h1>
          <UserInfoBar email="usuario@empresa.com" />
        </header>

        {/* Survey Management Section - Independent Container */}
        <main className="flex-1 overflow-y-auto p-6">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-6 flex-1">
              <h2 className="text-3xl font-bold tracking-tight text-white whitespace-nowrap">Mis cotizaciones</h2>
              {/* Campo de búsqueda movido a la barra de tabs */}
            </div>
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                onClick={handleRefreshSurveys}
                className="border-[#4B5563] text-[#9CA3AF] hover:bg-[#374151] hover:text-white hover:border-[#6B7280] transition-all hidden"
              >
                Actualizar
              </Button>
              <Button
                className="bg-[#5E17EB] hover:bg-[#5E17EB]/90 text-white transition-all duration-200 hover:scale-105"
                onClick={handleCreateSurvey}
              >
                <Plus className="h-4 w-4 mr-2" />
                Crear una Cotización
              </Button>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex items-center mb-8 border-b border-[#374151]">
            <div className="flex space-x-8">
              {tabs.map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => handleTabChange(tab.key)}
                  className={`pb-3 text-sm font-medium border-b-2 transition-all duration-200 ${
                    activeTab === tab.key
                      ? "text-white border-white"
                      : "text-gray-400 border-transparent hover:text-gray-300"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Buscador alineado a la derecha */}
            <div className="relative ml-auto max-w-sm w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                type="text"
                placeholder="Buscar encuestas..."
                value={searchQuery}
                onChange={(e) => handleSearchChange(e.target.value)}
                className="pl-10 bg-[#1A1A1C] border-[#1A1A1C] text-white placeholder-gray-400 h-10 rounded-md w-full"
              />
            </div>
          </div>

          {/* Table */}
          <div className="rounded-md border border-[#1a1a1c] bg-[#000000] overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="border-b border-[#1a1a1c] hover:bg-transparent">
                  <TableHead className="text-gray-400 font-medium h-12 px-6">Nombre de Encuesta</TableHead>
                  <TableHead className="text-gray-400 font-medium h-12 px-6">Descripción</TableHead>
                  <TableHead className="text-gray-400 font-medium h-12 px-6 text-center">Preguntas</TableHead>
                  <TableHead className="text-gray-400 font-medium h-12 px-6 text-center">Fecha de Creación</TableHead>
                  <TableHead className="text-gray-400 font-medium h-12 px-6 text-center">Estado</TableHead>
                  <TableHead className="text-gray-400 font-medium h-12 px-6 text-center">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedSurveys.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8 text-gray-400">
                      {searchQuery
                        ? "No se encontraron encuestas que coincidan con la búsqueda"
                        : "No hay encuestas disponibles"}
                    </TableCell>
                  </TableRow>
                ) : (
                  paginatedSurveys.map((survey) => (
                    <TableRow
                      key={survey.id}
                      className="border-b border-[#1a1a1c] hover:bg-[#1a1a1c]/50 transition-colors duration-200 h-16 cursor-pointer"
                      onClick={() => router.push(`/surveys/edit/${survey.id}`)}
                    >
                      <TableCell className="px-6">
                        <div>
                          <div className="font-medium text-white text-lg leading-tight">{survey.name}</div>
                          <div className="mt-1">{getTypeBadge(survey.type)}</div>
                        </div>
                      </TableCell>
                      <TableCell className="text-gray-300 px-6 max-w-xs">
                        <div className="text-sm leading-relaxed line-clamp-2">{survey.description}</div>
                      </TableCell>
                      <TableCell className="px-6 text-center">
                        <div>
                          <div className="text-white font-semibold text-lg leading-tight">{survey.questions}</div>
                          <div className="text-gray-400 text-xs">preguntas</div>
                        </div>
                      </TableCell>
                      <TableCell className="text-gray-300 px-6 text-center text-sm">{survey.createdDate}</TableCell>
                      <TableCell className="px-6 text-center">{getStatusBadge(survey.status)}</TableCell>
                      <TableCell className="px-6">
                        <div className="flex items-center justify-center space-x-2">
                          <Button
                            size="sm"
                            variant="ghost"
                            className="text-gray-400 hover:text-white hover:bg-gray-700 p-1 h-8 w-8 rounded-md"
                            onClick={(e) => {
                              e.stopPropagation()
                              router.push(`/surveys/edit/${survey.id}`)
                            }}
                          >
                            <Edit className="h-3 w-3" />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="text-gray-400 hover:text-red-400 hover:bg-red-900/20 p-1 h-8 w-8 rounded-md"
                            onClick={(e) => {
                              e.stopPropagation()
                              handleDelete(survey.id)
                            }}
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between mt-6">
            <div className="text-sm text-gray-400">
              Mostrando {startIndex + 1} a {Math.min(startIndex + itemsPerPage, filteredSurveys.length)} de{" "}
              {filteredSurveys.length} encuestas
            </div>

            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                className="border-[#1a1a1c] text-gray-400 hover:text-white hover:bg-[#1a1a1c] h-8 w-8 p-0"
                onClick={handlePreviousPage}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>

              <Button size="sm" className="bg-[#5E17EB] hover:bg-[#5E17EB]/90 text-white h-8 w-8 p-0">
                {currentPage}
              </Button>

              <Button
                variant="outline"
                size="sm"
                className="border-[#1a1a1c] text-gray-400 hover:text-white hover:bg-[#1a1a1c] h-8 w-8 p-0"
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
