"use client"

import { useState, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Header } from "@/components/layout/header"
import { Sidebar } from "@/components/layout/sidebar"
import { useToast } from "@/components/ui/use-toast"
import { Plus, Search, Play, Pause, Headphones, Edit, Trash2, ChevronLeft, ChevronRight, RotateCcw, Calendar } from "lucide-react"
import { useRouter } from "next/navigation"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import { format } from "date-fns"
import Link from "next/link"
import UserInfoBar from "@/components/layout/user-info-bar"

// Campaign data matching Figma exactly
const initialCampaignsData = [
  {
    id: "1",
    name: "Satisfacción Cliente Q1",
    survey: "Auto x Km",
    agent: "245",
    startDate: "01/05/2025",
    endDate: "01/09/2025",
    list: { label: "Campaña NPS", color: "#10b981" },
    status: "completed" as const,
    isActive: false,
  },
  {
    id: "2",
    name: "Feedback Producto Nuevo",
    survey: "Adulto Mayor",
    agent: "189",
    startDate: "01/05/2025",
    endDate: "01/09/2025",
    list: { label: "Proveedor salud", color: "#8b5cf6" },
    status: "active" as const,
    isActive: true,
  },
  {
    id: "3",
    name: "Evaluación Servicio",
    survey: "Automotor",
    agent: "67",
    startDate: "01/05/2025",
    endDate: "01/09/2025",
    list: { label: "Siniestros", color: "#10b981" },
    status: "paused" as const,
    isActive: false,
  },
  {
    id: "4",
    name: "Satisfacción Post-Compra",
    survey: "Vida 360",
    agent: "312",
    startDate: "01/05/2025",
    endDate: "01/09/2025",
    list: { label: "Auto xKm", color: "#ef4444" },
    status: "active" as const,
    isActive: true,
  },
  {
    id: "5",
    name: "Satisfacción Post-Compra",
    survey: "Vida 360",
    agent: "156",
    startDate: "01/05/2025",
    endDate: "01/09/2025",
    list: { label: "Auto xKm", color: "#ef4444" },
    status: "active" as const,
    isActive: true,
  },
]

type CampaignStatus = "all" | "active" | "paused" | "completed"

const tabs = [
  { key: "all" as CampaignStatus, label: "Todas" },
  { key: "active" as CampaignStatus, label: "Activas" },
  { key: "paused" as CampaignStatus, label: "Pausadas" },
  { key: "completed" as CampaignStatus, label: "Completadas" },
]

export default function CampaignsPage() {
  const [campaigns, setCampaigns] = useState(initialCampaignsData)
  const [activeTab, setActiveTab] = useState<CampaignStatus>("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5
  const { toast } = useToast()
  const router = useRouter()

  // Separate states for 'dateFrom' and 'dateTo' filters
  const [dateFilterFrom, setDateFilterFrom] = useState("")
  const [dateFilterTo, setDateFilterTo] = useState("")

  // Test modal state
  const [isTestModalOpen, setIsTestModalOpen] = useState(false)
  const [selectedCampaignId, setSelectedCampaignId] = useState<string>("")
  const [testPhoneNumber, setTestPhoneNumber] = useState("")
  const [testCountryCode, setTestCountryCode] = useState("+591")

  // Confirmation modal state
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false)
  const [confirmAction, setConfirmAction] = useState<"start" | "pause" | "restart">("start")
  const [selectedCampaignForAction, setSelectedCampaignForAction] = useState<any>(null)
  const [confirmationText, setConfirmationText] = useState("")

  // Filter campaigns based on tab and search
  const filteredCampaigns = useMemo(() => {
    let filtered = campaigns

    // Filter by status tab
    if (activeTab !== "all") {
      filtered = filtered.filter((campaign) => campaign.status === activeTab)
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(
        (campaign) => campaign.name.toLowerCase().includes(query) || campaign.agent.toLowerCase().includes(query),
      )
    }

    // Filter by date range
    if (dateFilterFrom && dateFilterTo) {
      filtered = filtered.filter((campaign) => {
        const startDate = new Date(campaign.startDate).getTime()
        const endDate = new Date(campaign.endDate).getTime()
        const filterStartDate = new Date(dateFilterFrom).getTime()
        const filterEndDate = new Date(dateFilterTo).getTime()
        return startDate >= filterStartDate && endDate <= filterEndDate
      })
    }

    return filtered
  }, [campaigns, activeTab, searchQuery, dateFilterFrom, dateFilterTo])

  // Pagination
  const totalPages = Math.ceil(filteredCampaigns.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedCampaigns = filteredCampaigns.slice(startIndex, startIndex + itemsPerPage)

  // Handle tab change
  const handleTabChange = (tab: CampaignStatus) => {
    setActiveTab(tab)
    setCurrentPage(1)
  }

  // Handle search
  const handleSearchChange = (value: string) => {
    setSearchQuery(value)
    setCurrentPage(1)
  }

  // Toggle campaign active status
  const handleToggleStatus = (campaignId: string) => {
    setCampaigns((prev) =>
      prev.map((campaign) => {
        if (campaign.id === campaignId) {
          const newIsActive = !campaign.isActive
          const newStatus = newIsActive ? "active" : "paused"

          toast({
            title: newIsActive ? "Campaña Activada" : "Campaña Pausada",
            description: `${campaign.name} ha sido ${newIsActive ? "activada" : "pausada"} exitosamente.`,
          })

          return {
            ...campaign,
            isActive: newIsActive,
            status: newStatus as any,
          }
        }
        return campaign
      }),
    )
  }

  const handleStartPause = (campaignId: string) => {
    const campaign = campaigns.find((c) => c.id === campaignId)
    if (!campaign) return

    setSelectedCampaignForAction(campaign)
    setConfirmAction(campaign.isActive ? "pause" : "start")
    setIsConfirmModalOpen(true)
  }

  const handleRestart = (campaignId: string) => {
    const campaign = campaigns.find((c) => c.id === campaignId)
    if (!campaign) return

    setSelectedCampaignForAction(campaign)
    setConfirmAction("restart")
    setIsConfirmModalOpen(true)
  }

  const handleConfirmAction = () => {
    const requiredText = confirmAction === "start" ? "Iniciar" : confirmAction === "pause" ? "Pausar" : "Reiniciar"

    if (confirmationText !== requiredText) {
      toast({
        title: "Error",
        description: `Debes escribir exactamente "${requiredText}" para continuar`,
        variant: "destructive",
      })
      return
    }

    if (!selectedCampaignForAction) return

    if (confirmAction === "restart") {
      toast({
        title: "Campaña Reiniciada",
        description: `${selectedCampaignForAction.name} ha sido reiniciada exitosamente.`,
      })
    } else {
      setCampaigns((prev) =>
        prev.map((c) => {
          if (c.id === selectedCampaignForAction.id) {
            const newIsActive = confirmAction === "start"
            const newStatus = newIsActive ? "active" : "paused"

            toast({
              title: confirmAction === "start" ? "Campaña Iniciada" : "Campaña Pausada",
              description: `${c.name} ha sido ${confirmAction === "start" ? "iniciada" : "pausada"} exitosamente.`,
            })

            return { ...c, isActive: newIsActive, status: newStatus as any }
          }
          return c
        }),
      )
    }

    // Close modal and reset
    setIsConfirmModalOpen(false)
    setConfirmationText("")
    setSelectedCampaignForAction(null)
  }

  const handleCancelConfirmation = () => {
    setIsConfirmModalOpen(false)
    setConfirmationText("")
    setSelectedCampaignForAction(null)
  }

  const handleTest = (campaignId: string) => {
    setSelectedCampaignId(campaignId)
    setIsTestModalOpen(true)
  }

  const handleTestSubmit = () => {
    if (!testPhoneNumber.trim()) {
      toast({
        title: "Error",
        description: "Por favor ingresa un número de teléfono",
        variant: "destructive",
      })
      return
    }

    const campaign = campaigns.find((c) => c.id === selectedCampaignId)
    const fullPhoneNumber = `${testCountryCode} ${testPhoneNumber}`

    toast({
      title: "Test Iniciado",
      description: `Ejecutando prueba para "${campaign?.name}" al número ${fullPhoneNumber}`,
    })

    // Close modal and reset form
    setIsTestModalOpen(false)
    setTestPhoneNumber("")
    setTestCountryCode("+591")
    setSelectedCampaignId("")
  }

  const handleTestCancel = () => {
    setIsTestModalOpen(false)
    setTestPhoneNumber("")
    setTestCountryCode("+591")
    setSelectedCampaignId("")
  }

  const handleEdit = (campaignId: string) => {
    router.push(`/campaigns/edit/${campaignId}`)
  }

  const handleDelete = (campaignId: string) => {
    const campaign = campaigns.find((c) => c.id === campaignId)
    if (confirm(`¿Estás seguro de que quieres eliminar "${campaign?.name}"?`)) {
      setCampaigns((prev) => prev.filter((c) => c.id !== campaignId))
      toast({
        title: "Campaña Eliminada",
        description: `${campaign?.name} ha sido eliminada exitosamente.`,
        variant: "destructive",
      })
    }
  }

  const handleCreateCampaign = () => {
    router.push("/campaigns/create")
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

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return (
          <Badge className="bg-[#6b7280] hover:bg-[#6b7280] text-white border-0 px-3 py-1 rounded-full text-xs font-medium">
            Completada
          </Badge>
        )
      case "active":
        return (
          <Badge className="bg-[#10b981] hover:bg-[#10b981] text-white border-0 px-3 py-1 rounded-full text-xs font-medium">
            Activo
          </Badge>
        )
      case "paused":
        return (
          <Badge className="bg-[#f97316] hover:bg-[#f97316] text-white border-0 px-3 py-1 rounded-full text-xs font-medium">
            Pausada
          </Badge>
        )
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const getActionButton = (campaign: any) => {
    if (campaign.status === "completed") {
      return (
        <Button
          size="sm"
          className="bg-[#2C0077] hover:bg-[#2C0077]/90 text-white px-4 py-1 h-8 text-xs font-medium rounded-md"
          onClick={() => handleRestart(campaign.id)}
        >
          <RotateCcw className="h-3 w-3 mr-1" />
          Reiniciar
        </Button>
      )
    }

    if (campaign.isActive) {
      return (
        <Button
          size="sm"
          className="bg-[#2C0077] hover:bg-[#2C0077]/90 text-white px-4 py-1 h-8 text-xs font-medium rounded-md"
          onClick={() => handleStartPause(campaign.id)}
        >
          <Pause className="h-3 w-3 mr-1" />
          PAUSAR
        </Button>
      )
    }

    return (
      <Button
        size="sm"
        className="bg-[#5E17EB] hover:bg-[#5E17EB]/90 text-white px-4 py-1 h-8 text-xs font-medium rounded-md"
        onClick={() => handleStartPause(campaign.id)}
      >
        <Play className="h-3 w-3 mr-1" />
        INICIAR
      </Button>
    )
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
          <h1 className="text-xl font-semibold">Campañas</h1>
          <UserInfoBar email="usuario@empresa.com" />
        </header>

        {/* Campaign Management Section - Independent Container */}
        <div className="flex-1 p-6">
          <div>
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-xl font-semibold">Gestión de Campañas</h2>
            </div>
            <Button
              className="bg-[#5E17EB] hover:bg-[#5E17EB]/90 text-white transition-all duration-200 hover:scale-105"
              onClick={handleCreateCampaign}
            >
              <Plus className="h-4 w-4 mr-2" />
              Crear Nueva Campaña
            </Button>
          </div>

          {/* Tabs */}
          <div className="flex space-x-8 mb-8 border-b border-[#374151]">
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

          {/* Filter Bar */}
          <div className="flex items-center gap-4 mb-6">
            {/* Campañas Dropdown */}
            <Select defaultValue="todas">
              <SelectTrigger className="w-48 bg-[#1a1a1c] border-[#374151] text-white focus:border-[#5E17EB] focus:ring-1 focus:ring-[#5E17EB]">
                <SelectValue placeholder="Campañas" />
              </SelectTrigger>
              <SelectContent className="bg-[#1a1a1c] border-[#374151]">
                <SelectItem value="todas" className="text-white hover:bg-[#374151]">
                  Todas las Campañas
                </SelectItem>
                <SelectItem value="activas" className="text-white hover:bg-[#374151]">
                  Campañas Activas
                </SelectItem>
                <SelectItem value="pausadas" className="text-white hover:bg-[#374151]">
                  Campañas Pausadas
                </SelectItem>
                <SelectItem value="completadas" className="text-white hover:bg-[#374151]">
                  Campañas Completadas
                </SelectItem>
              </SelectContent>
            </Select>

            {/* Encuestas Dropdown */}
            <Select defaultValue="todas-encuestas">
              <SelectTrigger className="w-48 bg-[#1a1a1c] border-[#374151] text-white focus:border-[#5E17EB] focus:ring-1 focus:ring-[#5E17EB]">
                <SelectValue placeholder="Encuestas" />
              </SelectTrigger>
              <SelectContent className="bg-[#1a1a1c] border-[#374151]">
                <SelectItem value="todas-encuestas" className="text-white hover:bg-[#374151]">
                  Todas las Encuestas
                </SelectItem>
                <SelectItem value="auto-km" className="text-white hover:bg-[#374151]">
                  Auto x Km
                </SelectItem>
                <SelectItem value="adulto-mayor" className="text-white hover:bg-[#374151]">
                  Adulto Mayor
                </SelectItem>
                <SelectItem value="automotor" className="text-white hover:bg-[#374151]">
                  Automotor
                </SelectItem>
                <SelectItem value="vida-360" className="text-white hover:bg-[#374151]">
                  Vida 360
                </SelectItem>
              </SelectContent>
            </Select>

            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                type="text"
                placeholder="Buscar..."
                value={searchQuery}
                onChange={(e) => handleSearchChange(e.target.value)}
                className="pl-10 bg-[#1a1a1c] border-[#374151] text-white placeholder-gray-400 focus:border-[#5E17EB] focus:ring-1 focus:ring-[#5E17EB]"
              />
            </div>

            {/* Date Range */}
            <div className="flex items-center gap-4 ml-auto">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="inline-flex items-center gap-2 whitespace-nowrap rounded-md text-sm ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border h-10 px-4 py-2 w-40 justify-start text-left font-normal bg-[#1A1A1C] border-[#374151] text-white hover:bg-[#2a2a2c] focus:border-[#5E17EB] focus:ring-1 focus:ring-[#5E17EB] pr-10"
                  >
                    <Calendar className="mr-2 h-4 w-4 text-gray-400" />
                    {dateFilterFrom ? format(new Date(dateFilterFrom), "dd/MM/yyyy") : "Fecha Desde"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 bg-[#1a1a1c] border-[#374151]" align="center">
                  <CalendarComponent
                    mode="single"
                    selected={dateFilterFrom ? new Date(dateFilterFrom) : undefined}
                    onSelect={(date: Date | undefined) => setDateFilterFrom(date ? format(date, "yyyy-MM-dd") : "")}
                    initialFocus
                    className="text-white"
                  />
                </PopoverContent>
              </Popover>
              <span className="text-gray-400 text-sm">al</span>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="inline-flex items-center gap-2 whitespace-nowrap rounded-md text-sm ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border h-10 px-4 py-2 w-40 justify-start text-left font-normal bg-[#1A1A1C] border-[#374151] text-white hover:bg-[#2a2a2c] focus:border-[#5E17EB] focus:ring-1 focus:ring-[#5E17EB] pr-10"
                  >
                    <Calendar className="mr-2 h-4 w-4 text-gray-400" />
                    {dateFilterTo ? format(new Date(dateFilterTo), "dd/MM/yyyy") : "Fecha Hasta"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 bg-[#1a1a1c] border-[#374151]" align="center">
                  <CalendarComponent
                    mode="single"
                    selected={dateFilterTo ? new Date(dateFilterTo) : undefined}
                    onSelect={(date: Date | undefined) => setDateFilterTo(date ? format(date, "yyyy-MM-dd") : "")}
                    initialFocus
                    className="text-white"
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          {/* Table */}
          <div className="rounded-md border border-[#1a1a1c] bg-[#000000] overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="border-b border-[#1a1a1c] hover:bg-transparent">
                  <TableHead className="text-gray-400 font-medium h-12 px-6">Nombre de Campaña</TableHead>
                  <TableHead className="text-gray-400 font-medium h-12 px-6">Encuesta</TableHead>
                  <TableHead className="text-gray-400 font-medium h-12 px-6">Respuestas</TableHead>
                  <TableHead className="text-gray-400 font-medium h-12 px-6">Fecha</TableHead>
                  <TableHead className="text-gray-400 font-medium h-12 px-6">Listas</TableHead>
                  <TableHead className="text-gray-400 font-medium h-12 px-6">Estado</TableHead>
                  <TableHead className="text-gray-400 font-medium h-12 px-6">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedCampaigns.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8 text-gray-400">
                      {searchQuery
                        ? "No se encontraron campañas que coincidan con la búsqueda"
                        : "No hay campañas disponibles"}
                    </TableCell>
                  </TableRow>
                ) : (
                  paginatedCampaigns.map((campaign) => (
                    <TableRow
                      key={campaign.id}
                      className="border-b border-[#1a1a1c] hover:bg-[#1a1a1c]/50 transition-colors duration-200 h-16"
                    >
                      <TableCell className="font-medium px-6">
                        <Link href={`/campaigns/edit/${campaign.id}`} className="text-white hover:underline hover:text-[#5E17EB] transition-colors">
                          {campaign.name}
                        </Link>
                      </TableCell>
                      <TableCell className="text-gray-300 px-6">{campaign.survey}</TableCell>
                      <TableCell className="text-gray-300 px-6">{campaign.agent}</TableCell>
                      <TableCell className="text-gray-300 px-6">
                        <div className="text-sm">
                          <div>Inicio: {campaign.startDate}</div>
                          <div>Final: {campaign.endDate}</div>
                        </div>
                      </TableCell>
                      <TableCell className="px-6">
                        <Badge
                          style={{ backgroundColor: campaign.list.color }}
                          className="text-white border-0 px-3 py-1 text-xs font-medium rounded-md hover:opacity-90"
                        >
                          {campaign.list.label}
                        </Badge>
                      </TableCell>
                      <TableCell className="px-6">
                        <div className="flex items-center gap-3">
                          {getStatusBadge(campaign.status)}
                          <Switch
                            checked={campaign.isActive}
                            onCheckedChange={() => {
                              setSelectedCampaignForAction(campaign)
                              setConfirmAction(campaign.isActive ? "pause" : "start")
                              setIsConfirmModalOpen(true)
                            }}
                            className="data-[state=checked]:bg-[#82ECFF] data-[state=unchecked]:bg-gray-600 scale-90"
                          />
                        </div>
                      </TableCell>
                      <TableCell className="px-6">
                        <div className="flex items-center space-x-2">
                          {getActionButton(campaign)}
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-gray-600 text-gray-400 hover:text-white hover:bg-gray-700 px-3 py-1 h-8 text-xs rounded-md"
                            onClick={() => handleTest(campaign.id)}
                          >
                            <Headphones className="h-3 w-3 mr-1" />
                            Test
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="text-gray-400 hover:text-white hover:bg-gray-700 p-1 h-8 w-8 rounded-md"
                            onClick={() => handleEdit(campaign.id)}
                          >
                            <Edit className="h-3 w-3" />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="text-gray-400 hover:text-red-400 hover:bg-red-900/20 p-1 h-8 w-8 rounded-md"
                            onClick={() => handleDelete(campaign.id)}
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
              Mostrando {startIndex + 1} a {Math.min(startIndex + itemsPerPage, filteredCampaigns.length)} de{" "}
              {filteredCampaigns.length} campañas
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

          {/* Test Modal */}
          <Dialog open={isTestModalOpen} onOpenChange={setIsTestModalOpen}>
            <DialogContent className="bg-[#0A0A0A] border-[#1A1A1C] text-white max-w-md">
              <DialogHeader>
                <DialogTitle className="text-xl font-semibold text-white">
                  Introduce el número para hacer el test
                </DialogTitle>
              </DialogHeader>

              <div className="space-y-4 pt-4">
                <div className="space-y-2">
                  <Label htmlFor="country-code" className="text-sm font-medium text-gray-300">
                    Código de País
                  </Label>
                  <Select value={testCountryCode} onValueChange={setTestCountryCode}>
                    <SelectTrigger className="bg-[#1A1A1C] border-[#374151] text-white focus:border-[#5E17EB] focus:ring-1 focus:ring-[#5E17EB]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-[#1A1A1C] border-[#374151]">
                      <SelectItem value="+591" className="text-white hover:bg-[#374151]">
                        +591 (Bolivia)
                      </SelectItem>
                      <SelectItem value="+1" className="text-white hover:bg-[#374151]">
                        +1 (USA/Canadá)
                      </SelectItem>
                      <SelectItem value="+34" className="text-white hover:bg-[#374151]">
                        +34 (España)
                      </SelectItem>
                      <SelectItem value="+52" className="text-white hover:bg-[#374151]">
                        +52 (México)
                      </SelectItem>
                      <SelectItem value="+57" className="text-white hover:bg-[#374151]">
                        +57 (Colombia)
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone-number" className="text-sm font-medium text-gray-300">
                    Número de Celular
                  </Label>
                  <Input
                    id="phone-number"
                    type="tel"
                    placeholder="Ej. 70123456"
                    value={testPhoneNumber}
                    onChange={(e) => setTestPhoneNumber(e.target.value)}
                    className="bg-[#1A1A1C] border-[#374151] text-white placeholder-gray-400 focus:border-[#5E17EB] focus:ring-1 focus:ring-[#5E17EB]"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-6">
                <Button
                  variant="outline"
                  onClick={handleTestCancel}
                  className="border-[#374151] text-gray-400 hover:text-white hover:bg-[#374151]"
                >
                  Cancelar
                </Button>
                <Button onClick={handleTestSubmit} className="bg-[#5E17EB] hover:bg-[#5E17EB]/90 text-white">
                  Iniciar Test
                </Button>
              </div>
            </DialogContent>
          </Dialog>

          {/* Confirmation Modal */}
          <Dialog open={isConfirmModalOpen} onOpenChange={setIsConfirmModalOpen}>
            <DialogContent className="bg-[#0A0A0A] border-[#1A1A1C] text-white max-w-md">
              <DialogHeader>
                <DialogTitle className="text-xl font-semibold text-white">
                  {confirmAction === "start"
                    ? "Iniciar campaña"
                    : confirmAction === "pause"
                      ? "Pausar campaña"
                      : "Reiniciar campaña"}
                </DialogTitle>
              </DialogHeader>

              <div className="space-y-4 pt-4">
                <p className="text-gray-300">
                  ¿Estás seguro de que deseas{" "}
                  {confirmAction === "start" ? "iniciar" : confirmAction === "pause" ? "pausar" : "reiniciar"} la
                  campaña: <span className="font-medium">{selectedCampaignForAction?.name}</span>?
                </p>

                <div className="space-y-2">
                  <Label htmlFor="confirmation-text" className="text-sm font-medium text-gray-300">
                    Escribe "
                    {confirmAction === "start" ? "Iniciar" : confirmAction === "pause" ? "Pausar" : "Reiniciar"}"
                  </Label>
                  <Input
                    id="confirmation-text"
                    type="text"
                    placeholder={
                      confirmAction === "start" ? "Iniciar" : confirmAction === "pause" ? "Pausar" : "Reiniciar"
                    }
                    value={confirmationText}
                    onChange={(e) => setConfirmationText(e.target.value)}
                    className="bg-[#1A1A1C] border-[#374151] text-white placeholder-gray-400 focus:border-[#5E17EB] focus:ring-1 focus:ring-[#5E17EB]"
                  />
                </div>

                <p className="text-sm text-gray-400">Esta acción es para brindarte mayor control</p>
              </div>

              <div className="flex justify-end gap-3 pt-6">
                <Button
                  variant="outline"
                  onClick={handleCancelConfirmation}
                  className="border-[#374151] text-gray-400 hover:text-white hover:bg-[#374151]"
                >
                  Cancelar
                </Button>
                <Button onClick={handleConfirmAction} className="bg-[#5E17EB] hover:bg-[#5E17EB]/90 text-white">
                  {confirmAction === "start"
                    ? "Iniciar campaña"
                    : confirmAction === "pause"
                      ? "Pausar campaña"
                      : "Reiniciar campaña"}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
          </div>
        </div>
      </div>
    </div>
  )
}
