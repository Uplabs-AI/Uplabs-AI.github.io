"use client"

import { MetricCard } from "@/components/dashboard/metric-card"
import { StatsCard } from "@/components/dashboard/stats-card"
import { DataTable } from "@/components/dashboard/data-table"
import { ExportButton } from "@/components/common/export-button"
import { useDashboard } from "@/lib/hooks/use-dashboard"
import { CHART_COLORS } from "@/lib/constants/dashboard"
import { CheckCircle2, User, XCircle, ArrowUpIcon, CalendarIcon, ChevronLeft, ChevronRight } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { useState, useMemo, useRef } from "react"
import Image from "next/image"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { format } from "date-fns"

// Chart data - in a real app, this would come from the service
const chartData = {
  callMinutes: [
    { value: 30, date: "01/04/23" },
    { value: 45, date: "02/04/23" },
    { value: 80, date: "03/04/23" },
    { value: 60, date: "04/04/23" },
    { value: 90, date: "05/04/23" },
    { value: 75, date: "06/04/23" },
    { value: 65, date: "07/04/23" },
  ],
  callNumber: [
    { value: 40, date: "01/04/23" },
    { value: 35, date: "02/04/23" },
    { value: 45, date: "03/04/23" },
    { value: 55, date: "04/23" },
    { value: 65, date: "05/04/23" },
    { value: 90, date: "06/04/23" },
    { value: 80, date: "07/04/23" },
  ],
  expense: [
    { value: 60, date: "01/04/23" },
    { value: 40, date: "02/04/23" },
    { value: 30, date: "03/04/23" },
    { value: 45, date: "04/04/23" },
    { value: 55, date: "05/04/23" },
    { value: 70, date: "06/04/23" },
    { value: 85, date: "07/04/23" },
  ],
  costPerCall: [
    { value: 70, date: "01/04/23" },
    { value: 80, date: "02/04/23" },
    { value: 50, date: "03/04/23" },
    { value: 40, date: "04/04/23" },
    { value: 45, date: "05/04/23" },
    { value: 60, date: "06/04/23" },
    { value: 85, date: "07/04/23" },
  ],
  balance: [
    { value: 85, date: "01/04/23" },
    { value: 85, date: "02/04/23" },
    { value: 85, date: "03/04/23" },
    { value: 80, date: "04/04/23" },
    { value: 80, date: "05/04/23" },
    { value: 85, date: "06/04/23" },
    { value: 85, date: "07/04/23" },
  ],
}

export function VoiceContent() {
  const { metrics, calls, isLoading, error } = useDashboard()

  // Filter states
  const [assistantFilter, setAssistantFilter] = useState("")
  const [phoneFilter, setPhoneFilter] = useState("")
  const [finalizationFilter, setFinalizationFilter] = useState("")
  const [successFilter, setSuccessFilter] = useState("")
  const [durationFilter, setDurationFilter] = useState("")
  const [costFilter, setCostFilter] = useState("")

  // Separate states for 'dateFrom' and 'dateTo' filters
  const [dateFilterFrom, setDateFilterFrom] = useState("")
  const [dateFilterTo, setDateFilterTo] = useState("")

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10 // Puedes ajustar esto según sea necesario

  // NPS data - in a real app, this would come from the service
  const npsData = {
    detractores: 16.6,
    pasivos: 16.6,
    promotores: 57.6,
  }

  // Calculate NPS Score automatically
  const calculateNPSScore = (detractores: number, pasivos: number, promotores: number) => {
    return Math.round(promotores - detractores)
  }

  const npsScore = calculateNPSScore(npsData.detractores, npsData.pasivos, npsData.promotores)

  // Helper function to parse duration in seconds
  const parseDuration = (duration: string): number => {
    const parts = duration.replace("m ", ":").replace("s", "").split(":")
    const minutes = Number.parseInt(parts[0]) || 0
    const seconds = Number.parseInt(parts[1]) || 0
    return minutes * 60 + seconds
  }

  // Helper function to parse cost
  const parseCost = (cost: string): number => {
    return Number.parseFloat(cost.replace("$", "")) || 0
  }

  // Enhanced filtering logic with real-time search
  const filteredCalls = useMemo(() => {
    // Mock data for demonstration
    const mockTableData = [
      {
        fullId: "e03224fc-92e9-4215-b219-f9e0d89ccd16",
        assistant: "Auto x Km (VERSIÓN DE PRODUCCIÓN)",
        assistantSubtext: "80bb1622-5f43-4951-8...",
        assistantPhone: "3c8f9b6e-3c96-42b0-b326-891c0020c447",
        clientPhoneNumber: "sip:78592844@44.238.177.138:5060",
        finalizationReason: "No contestadas",
        success: "Aprobado",
        successType: "approved",
        startTime: "25 Abr, 2025, 15:15",
        duration: "3m 17s",
        cost: "$0.34",
      },
      {
        fullId: "ba634ce2-2fd6-4c8f-80bb-f622-5f43-4951-b",
        assistant: "Auto x Km (VERSIÓN DE PRODUCCIÓN)",
        assistantSubtext: "80bb1622-5f43-4951-8...",
        assistantPhone: "3c8f9b6e-3c96-42b0-b326-891c0020c447",
        clientPhoneNumber: "sip:78920755@44.229.228.186:5060",
        finalizationReason: "Colgada por el usuario",
        success: "Aprobado",
        successType: "approved",
        startTime: "25 Abr, 2025, 11:26",
        duration: "2m 41s",
        cost: "$0.27",
      },
      {
        fullId: "2ab7e1de-cdc4-4a8f-80bb-f622-5f43-4951-b",
        assistant: "Auto x Km (VERSIÓN DE PRODUCCIÓN)",
        assistantSubtext: "80bb1622-5f43-4951-8...",
        assistantPhone: "3c8f9b6e-3c96-42b0-b326-891c0020c447",
        clientPhoneNumber: "sip:76645561@44.238.177.138:5060",
        finalizationReason: "Fallidas",
        success: "Fallido",
        successType: "failed",
        startTime: "25 Abr, 2025, 11:16",
        duration: "2m 10s",
        cost: "$0.18",
      },
      {
        fullId: "c1b37604-5a3c-4d8f-80bb-f622-5f43-4951-b",
        assistant: "Auto x Km (VERSIÓN DE PRODUCCIÓN)",
        assistantSubtext: "80bb1622-5f43-4951-8...",
        assistantPhone: "3c8f9b6e-3c96-42b0-b326-891c0020c447",
        clientPhoneNumber: "sip:75350724@44.238.177.138:5060",
        finalizationReason: "No contestadas",
        success: "Fallido",
        successType: "failed",
        startTime: "25 Abr, 2025, 11:05",
        duration: "2m 38s",
        cost: "$0.21",
      },
      {
        fullId: "87bf4070-5f5c-4e8f-80bb-f622-5f43-4951-b",
        assistant: "Auto x Km (VERSIÓN DE PRODUCCIÓN)",
        assistantSubtext: "80bb1622-5f43-4951-8...",
        assistantPhone: "3c8f9b6e-3c96-42b0-b326-891c0020c447",
        clientPhoneNumber: "sip:63509856@44.229.228.186:5060",
        finalizationReason: "Colgada por el usuario",
        success: "Fallido",
        successType: "failed",
        startTime: "25 Abr, 2025, 10:33",
        duration: "2m 44s",
        cost: "$0.25",
      },
      {
        fullId: "eddbe57a-c81c-4f8f-80bb-f622-5f43-4951-b",
        assistant: "Auto x Km (VERSIÓN DE PRODUCCIÓN)",
        assistantSubtext: "80bb1622-5f43-4951-8...",
        assistantPhone: "3c8f9b6e-3c96-42b0-b326-891c0020c447",
        clientPhoneNumber: "sip:63950953@44.229.228.186:5060",
        finalizationReason: "Silencio Agotado",
        success: "Fallido",
        successType: "failed",
        startTime: "25 Abr, 2025, 09:37",
        duration: "2m 40s",
        cost: "$0.23",
      },
      {
        fullId: "f2c8a1b3-7d4e-4f8f-80bb-f622-5f43-4951-b",
        assistant: "Auto x Km (VERSIÓN DE PRODUCCIÓN)",
        assistantSubtext: "80bb1622-5f43-4951-8...",
        assistantPhone: "3c8f9b6e-3c96-42b0-b326-891c0020c447",
        clientPhoneNumber: "sip:62847391@44.238.177.138:5060",
        finalizationReason: "Completada",
        success: "Aprobado",
        successType: "approved",
        startTime: "25 Abr, 2025, 08:45",
        duration: "4m 12s",
        cost: "$0.42",
      },
      {
        fullId: "d9e5b2c1-6a3f-4e8f-80bb-f622-5f43-4951-b",
        assistant: "Auto x Km (VERSIÓN DE PRODUCCIÓN)",
        assistantSubtext: "80bb1622-5f43-4951-8...",
        assistantPhone: "3c8f9b6e-3c96-42b0-b326-891c0020c447",
        clientPhoneNumber: "sip:61729483@44.229.228.186:5060",
        finalizationReason: "Transferida",
        success: "Aprobado",
        successType: "approved",
        startTime: "25 Abr, 2025, 07:22",
        duration: "1m 55s",
        cost: "$0.19",
      },
      {
        fullId: "a7b8c3d4-5e6f-4g8h-80bb-f622-5f43-4951-b",
        assistant: "Auto x Km (VERSIÓN DE PRODUCCIÓN)",
        assistantSubtext: "80bb1622-5f43-4951-8...",
        assistantPhone: "3c8f9b6e-3c96-42b0-b326-891c0020c447",
        clientPhoneNumber: "sip:60584729@44.238.177.138:5060",
        finalizationReason: "No contestadas",
        success: "Fallido",
        successType: "failed",
        startTime: "25 Abr, 2025, 06:18",
        duration: "0m 45s",
        cost: "$0.08",
      },
      {
        fullId: "b9c2d5e8-7f1a-4h3i-80bb-f622-5f43-4951-b",
        assistant: "Auto x Km (VERSIÓN DE PRODUCCIÓN)",
        assistantSubtext: "80bb1622-5f43-4951-8...",
        assistantPhone: "3c8f9b6e-3c96-42b0-b326-891c0020c447",
        clientPhoneNumber: "sip:59472816@44.229.228.186:5060",
        finalizationReason: "Completada",
        success: "Aprobado",
        successType: "approved",
        startTime: "24 Abr, 2025, 23:45",
        duration: "5m 33s",
        cost: "$0.55",
      },
      {
        fullId: "c4d7e1f2-8g5h-4i9j-80bb-f622-5f43-4951-b",
        assistant: "Auto x Km (VERSIÓN DE PRODUCCIÓN)",
        assistantSubtext: "80bb1622-5f43-4951-8...",
        assistantPhone: "3c8f9b6e-3c96-42b0-b326-891c0020c447",
        clientPhoneNumber: "sip:58361947@44.238.177.138:5060",
        finalizationReason: "Colgada por el usuario",
        success: "Fallido",
        successType: "failed",
        startTime: "24 Abr, 2025, 22:30",
        duration: "3m 28s",
        cost: "$0.35",
      },
      {
        fullId: "e6f9g2h5-9i3j-4k7l-80bb-f622-5f43-4951-b",
        assistant: "Auto x Km (VERSIÓN DE PRODUCCIÓN)",
        assistantSubtext: "80bb1622-5f43-4951-8...",
        assistantPhone: "3c8f9b6e-3c96-42b0-b326-891c0020c447",
        clientPhoneNumber: "sip:57249183@44.229.228.186:5060",
        finalizationReason: "Silencio Agotado",
        success: "Fallido",
        successType: "failed",
        startTime: "24 Abr, 2025, 21:15",
        duration: "2m 03s",
        cost: "$0.20",
      },
      {
        fullId: "f8g1h4i7-0j6k-4l2m-80bb-f622-5f43-4951-b",
        assistant: "Auto x Km (VERSIÓN DE PRODUCCIÓN)",
        assistantSubtext: "80bb1622-5f43-4951-8...",
        assistantPhone: "3c8f9b6e-3c96-42b0-b326-891c0020c447",
        clientPhoneNumber: "sip:56138294@44.238.177.138:5060",
        finalizationReason: "Transferida",
        success: "Aprobado",
        successType: "approved",
        startTime: "24 Abr, 2025, 20:08",
        duration: "6m 15s",
        cost: "$0.62",
      },
      {
        fullId: "h2i5j8k1-3l9m-4n6o-80bb-f622-5f43-4951-b",
        assistant: "Auto x Km (VERSIÓN DE PRODUCCIÓN)",
        assistantSubtext: "80bb1622-5f43-4951-8...",
        assistantPhone: "3c8f9b6e-3c96-42b0-b326-891c0020c447",
        clientPhoneNumber: "sip:55027385@44.229.228.186:5060",
        finalizationReason: "Completada",
        success: "Aprobado",
        successType: "approved",
        startTime: "24 Abr, 2025, 19:42",
        duration: "4m 07s",
        cost: "$0.41",
      },
      {
        fullId: "i4j7k0l3-6m2n-4o8p-80bb-f622-5f43-4951-b",
        assistant: "Auto x Km (VERSIÓN DE PRODUCCIÓN)",
        assistantSubtext: "80bb1622-5f43-4951-8...",
        assistantPhone: "3c8f9b6e-3c96-42b0-b326-891c0020c447",
        clientPhoneNumber: "sip:53916472@44.238.177.138:5060",
        finalizationReason: "No contestadas",
        success: "Fallido",
        successType: "failed",
        startTime: "24 Abr, 2025, 18:25",
        duration: "1m 12s",
        cost: "$0.12",
      }
    ]

    return mockTableData.filter((call) => {
      const matchesAssistant = !assistantFilter || call.assistant.toLowerCase().includes(assistantFilter.toLowerCase())
      const matchesPhone = !phoneFilter || call.clientPhoneNumber.includes(phoneFilter)
      const matchesFinalization = !finalizationFilter || call.finalizationReason.toLowerCase().includes(finalizationFilter.toLowerCase())
      const matchesSuccess = !successFilter || call.success.toLowerCase().includes(successFilter.toLowerCase())
      
      const callDurationInSeconds = parseDuration(call.duration)
      const matchesDuration = !durationFilter || 
        (durationFilter === "short" && callDurationInSeconds < 120) ||
        (durationFilter === "medium" && callDurationInSeconds >= 120 && callDurationInSeconds < 300) ||
        (durationFilter === "long" && callDurationInSeconds >= 300)
      
      const callCost = parseCost(call.cost)
      const matchesCost = !costFilter ||
        (costFilter === "menor-0.25" && callCost < 0.25) ||
        (costFilter === "0.25-0.50" && callCost >= 0.25 && callCost <= 0.50) ||
        (costFilter === "mayor-0.50" && callCost > 0.50)

      return matchesAssistant && matchesPhone && matchesFinalization && matchesSuccess && matchesDuration && matchesCost
    })
  }, [calls, assistantFilter, phoneFilter, finalizationFilter, successFilter, durationFilter, costFilter])

  // Calculate total pages
  const totalPages = Math.ceil(filteredCalls.length / itemsPerPage)

  // Get current page data
  const paginatedCalls = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    return filteredCalls.slice(startIndex, endIndex)
  }, [filteredCalls, currentPage, itemsPerPage])

  const handlePrevPage = () => {
    setCurrentPage(prev => Math.max(prev - 1, 1))
  }

  const handleNextPage = () => {
    setCurrentPage(prev => Math.min(prev + 1, totalPages))
  }

  const clearFilters = () => {
    setAssistantFilter("")
    setPhoneFilter("")
    setFinalizationFilter("")
    setSuccessFilter("")
    setDurationFilter("")
    setCostFilter("")
    setDateFilterFrom("")
    setDateFilterTo("")
  }

  const applyFilters = () => {
    // Filtering logic is handled by useMemo, so this function is primarily for
    // re-triggering useMemo if other side effects were needed on apply.
    // In this case, it simply ensures filters are set.
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Error Cargando Dashboard</h2>
          <p className="text-gray-400">{error}</p>
        </div>
      </div>
    )
  }

  return (
    <>
      {/* Metrics Section */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-4">
            <h2 className="text-2xl font-bold mb-3">Agentes de Voz</h2>
          </div>
          {metrics && <ExportButton metrics={metrics} calls={calls} disabled={isLoading} />}
        </div>

        {/* Nueva barra de filtros debajo de Resultados */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-4">
            {/* Todas las Campañas */}
            <Select value={assistantFilter} onValueChange={setAssistantFilter}>
              <SelectTrigger className="w-auto min-w-[180px] bg-[#1a1a1c] border-[#374151] text-white focus:border-[#5e17eb] focus:ring-[#5e17eb] h-10">
                <SelectValue placeholder="Todas las Campañas" />
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
              </SelectContent>
            </Select>

            {/* Encuestas */}
            <Select value={finalizationFilter} onValueChange={setFinalizationFilter}>
              <SelectTrigger className="w-auto min-w-[120px] bg-[#1a1a1c] border-[#374151] text-white focus:border-[#5e17eb] focus:ring-[#5e17eb] h-10">
                <SelectValue placeholder="Encuestas" />
              </SelectTrigger>
              <SelectContent className="bg-[#1a1a1c] border-[#374151]">
                <SelectItem value="todas" className="text-white hover:bg-[#374151]">
                  Todas
                </SelectItem>
                <SelectItem value="nps" className="text-white hover:bg-[#374151]">
                  NPS
                </SelectItem>
                <SelectItem value="satisfaccion" className="text-white hover:bg-[#374151]">
                  Satisfacción
                </SelectItem>
              </SelectContent>
            </Select>

            {/* Asistente */}
            <Select value={successFilter} onValueChange={setSuccessFilter}>
              <SelectTrigger className="w-auto min-w-[120px] bg-[#1a1a1c] border-[#374151] text-white focus:border-[#5e17eb] focus:ring-[#5e17eb] h-10">
                <SelectValue placeholder="Asistente" />
              </SelectTrigger>
              <SelectContent className="bg-[#1a1a1c] border-[#374151]">
                <SelectItem value="todos" className="text-white hover:bg-[#374151]">
                  Todos
                </SelectItem>
                <SelectItem value="sofia" className="text-white hover:bg-[#374151]">
                  Sofia
                </SelectItem>
                <SelectItem value="maria" className="text-white hover:bg-[#374151]">
                  María
                </SelectItem>
                <SelectItem value="valeria" className="text-white hover:bg-[#374151]">
                  Valeria
                </SelectItem>
                <SelectItem value="lucio" className="text-white hover:bg-[#374151]">
                  Lucio
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Fechas alineadas a la derecha */}
          <div className="flex items-center gap-4">
            {/* Fecha Desde */}
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="inline-flex items-center gap-2 whitespace-nowrap rounded-md text-sm ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border h-10 px-4 py-2 w-40 justify-start text-left font-normal bg-[#1A1A1C] border-[#374151] text-white hover:bg-[#2a2a2c] focus:border-[#5E17EB] focus:ring-1 focus:ring-[#5E17EB] pr-10"
                >
                  <CalendarIcon className="mr-2 h-4 w-4 text-gray-400" />
                  {dateFilterFrom ? format(new Date(dateFilterFrom), "dd/MM/yyyy") : "Fecha Desde"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0 bg-[#1a1a1c] border-[#374151]" align="center" side="bottom" sideOffset={8}>
                <Calendar
                  mode="single"
                  selected={dateFilterFrom ? new Date(dateFilterFrom) : undefined}
                  onSelect={(date: Date | undefined) => setDateFilterFrom(date ? format(date, "yyyy-MM-dd") : "")}
                  initialFocus
                  className="text-white"
                />
              </PopoverContent>
            </Popover>

            {/* Texto "al" */}
            <span className="text-gray-400 text-sm">al</span>

            {/* Fecha Hasta */}
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="inline-flex items-center gap-2 whitespace-nowrap rounded-md text-sm ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border h-10 px-4 py-2 w-40 justify-start text-left font-normal bg-[#1A1A1C] border-[#374151] text-white hover:bg-[#2a2a2c] focus:border-[#5E17EB] focus:ring-1 focus:ring-[#5E17EB] pr-10"
                >
                  <CalendarIcon className="mr-2 h-4 w-4 text-gray-400" />
                  {dateFilterTo ? format(new Date(dateFilterTo), "dd/MM/yyyy") : "Fecha Hasta"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0 bg-[#1a1a1c] border-[#374151]" align="center" side="bottom" sideOffset={8}>
                <Calendar
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

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-[200px] bg-[#000000] border border-[#1a1a1c] rounded-xl animate-pulse" />
            ))}
          </div>
        ) : metrics ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <MetricCard
              title="Total de Minutos de Llamada"
              value={metrics.totalCallMinutes}
              chartData={chartData.callMinutes}
              chartColor={CHART_COLORS.callMinutes}
            />
            <MetricCard
              title="Total de Campañas"
              value={metrics.numberOfCalls}
              chartData={chartData.callNumber}
              chartColor={CHART_COLORS.callNumber}
            />
            <MetricCard
              title="Gasto Total"
              value={`$${metrics.totalExpense.toFixed(2)}`}
              chartData={chartData.expense}
              chartColor={CHART_COLORS.expense}
            />
            <MetricCard
              title="Costo Promedio por Llamada"
              value={`$${metrics.averageCostPerCall.toFixed(2)}`}
              chartData={chartData.costPerCall}
              chartColor={CHART_COLORS.costPerCall}
            />
          </div>
        ) : null}
      </div>

      {/* Stats Section */}
      <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Llamadas Totales"
          value={metrics?.totalCalls ?? 0}
          icon={<User className="h-4 w-4 text-white" />}
          percentChange={metrics?.totalCallsPercentChange ?? 0}
        />
        <StatsCard
          title="Llamadas Transferidas"
          value={metrics?.transferredCalls ?? 0}
          icon={<ArrowUpIcon className="h-4 w-4 text-white" />}
          percentChange={metrics?.transferredCallsPercentChange ?? 0}
        />
        <StatsCard
          title="Llamadas Exitosas"
          value={metrics?.successfulCalls ?? 0}
          icon={<CheckCircle2 className="h-4 w-4 text-green-500" />}
          percentChange={metrics?.successfulCallsPercentChange ?? 0}
        />
        <StatsCard
          title="Llamadas Fallidas"
          value={metrics?.failedCalls ?? 0}
          icon={<XCircle className="h-4 w-4 text-red-500" />}
          percentChange={metrics?.failedCallsPercentChange ?? 0}
        />
      </div>

      {/* Survey Stats Section */}
      <div className="mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Total Campañas Card */}
        <div className="bg-[#000000] border border-[#1a1a1c] rounded-xl p-6">
          <div className="text-[#8280ff] text-sm font-medium mb-2">Total Campañas</div>
            <div className="text-[#8280ff] text-4xl font-bold mb-3">1.560</div>
            <div className="flex items-center text-xs text-gray-400">
              <ArrowUpIcon className="h-4 w-4 mr-1" />
              <span>+12% vs último mes</span>
            </div>
          </div>

          {/* NPS Score Card */}
          <div className="bg-[#000000] border border-[#1a1a1c] rounded-xl p-6">
            <div className="text-[#82ecff] text-sm font-medium mb-2">NPS score</div>
            <div className="text-[#82ecff] text-4xl font-bold mb-4">{npsScore}</div>
            <div className="flex justify-between items-center text-sm">
              <div className="flex items-center text-gray-300">
                <Image src="/icons/detractor.svg" alt="Detractor" width={32} height={32} className="mr-3" />
                <span className="font-medium">Detractores ({npsData.detractores}%)</span>
              </div>
              <div className="flex items-center text-gray-300">
                <Image src="/icons/pasivo.svg" alt="Pasivo" width={32} height={32} className="mr-3" />
                <span className="font-medium">Pasivos ({npsData.pasivos}%)</span>
              </div>
              <div className="flex items-center text-gray-300">
                <Image src="/icons/promotor.svg" alt="Promotor" width={32} height={32} className="mr-3" />
                <span className="font-medium">Promotores ({npsData.promotores}%)</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Filters Section */}
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-4">
          {/* Todas las Campañas */}
          <Select value={assistantFilter} onValueChange={setAssistantFilter}>
            <SelectTrigger className="w-auto min-w-[180px] bg-[#1a1a1c] border-[#374151] text-white focus:border-[#5e17eb] focus:ring-[#5e17eb] h-10">
              <SelectValue placeholder="Todas las Campañas" />
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
            </SelectContent>
          </Select>

          {/* Encuestas */}
          <Select value={finalizationFilter} onValueChange={setFinalizationFilter}>
            <SelectTrigger className="w-auto min-w-[120px] bg-[#1a1a1c] border-[#374151] text-white focus:border-[#5e17eb] focus:ring-[#5e17eb] h-10">
              <SelectValue placeholder="Encuestas" />
            </SelectTrigger>
            <SelectContent className="bg-[#1a1a1c] border-[#374151]">
              <SelectItem value="todas" className="text-white hover:bg-[#374151]">
                Todas
              </SelectItem>
              <SelectItem value="nps" className="text-white hover:bg-[#374151]">
                NPS
              </SelectItem>
              <SelectItem value="satisfaccion" className="text-white hover:bg-[#374151]">
                Satisfacción
              </SelectItem>
            </SelectContent>
          </Select>

          {/* Asistente */}
          <Select value={successFilter} onValueChange={setSuccessFilter}>
            <SelectTrigger className="w-auto min-w-[120px] bg-[#1a1a1c] border-[#374151] text-white focus:border-[#5e17eb] focus:ring-[#5e17eb] h-10">
              <SelectValue placeholder="Asistente" />
            </SelectTrigger>
            <SelectContent className="bg-[#1a1a1c] border-[#374151]">
              <SelectItem value="todos" className="text-white hover:bg-[#374151]">
                Todos
              </SelectItem>
              <SelectItem value="sofia" className="text-white hover:bg-[#374151]">
                Sofia
              </SelectItem>
              <SelectItem value="maria" className="text-white hover:bg-[#374151]">
                María
              </SelectItem>
              <SelectItem value="valeria" className="text-white hover:bg-[#374151]">
                Valeria
              </SelectItem>
              <SelectItem value="lucio" className="text-white hover:bg-[#374151]">
                Lucio
              </SelectItem>
            </SelectContent>
          </Select>

          {/* Costo */}
          <Select value={costFilter} onValueChange={setCostFilter}>
            <SelectTrigger className="w-auto min-w-[100px] bg-[#1a1a1c] border-[#374151] text-white focus:border-[#5e17eb] focus:ring-[#5e17eb] h-10">
              <SelectValue placeholder="Costo" />
            </SelectTrigger>
            <SelectContent className="bg-[#1a1a1c] border-[#374151]">
              <SelectItem value="todos" className="text-white hover:bg-[#374151]">
                Todos
              </SelectItem>
              <SelectItem value="menor-0.25" className="text-white hover:bg-[#374151]">
                Menos de $0.25
              </SelectItem>
              <SelectItem value="0.25-0.50" className="text-white hover:bg-[#374151]">
                $0.25 - $0.50
              </SelectItem>
              <SelectItem value="mayor-0.50" className="text-white hover:bg-[#374151]">
                Más de $0.50
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Fechas alineadas a la derecha */}
        <div className="flex items-center gap-4">
          {/* Fecha Desde */}
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="inline-flex items-center gap-2 whitespace-nowrap rounded-md text-sm ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border h-10 px-4 py-2 w-40 justify-start text-left font-normal bg-[#1A1A1C] border-[#374151] text-white hover:bg-[#2a2a2c] focus:border-[#5E17EB] focus:ring-1 focus:ring-[#5E17EB] pr-10"
              >
                <CalendarIcon className="mr-2 h-4 w-4 text-gray-400" />
                {dateFilterFrom ? format(new Date(dateFilterFrom), "dd/MM/yyyy") : "Fecha Desde"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0 bg-[#1a1a1c] border-[#374151]" align="center" side="bottom" sideOffset={8}>
              <Calendar
                mode="single"
                selected={dateFilterFrom ? new Date(dateFilterFrom) : undefined}
                onSelect={(date: Date | undefined) => setDateFilterFrom(date ? format(date, "yyyy-MM-dd") : "")}
                initialFocus
                className="text-white"
              />
            </PopoverContent>
          </Popover>

          {/* Texto "al" */}
          <span className="text-gray-400 text-sm">al</span>

          {/* Fecha Hasta */}
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="inline-flex items-center gap-2 whitespace-nowrap rounded-md text-sm ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border h-10 px-4 py-2 w-40 justify-start text-left font-normal bg-[#1A1A1C] border-[#374151] text-white hover:bg-[#2a2a2c] focus:border-[#5E17EB] focus:ring-1 focus:ring-[#5E17EB] pr-10"
              >
                <CalendarIcon className="mr-2 h-4 w-4 text-gray-400" />
                {dateFilterTo ? format(new Date(dateFilterTo), "dd/MM/yyyy") : "Fecha Hasta"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0 bg-[#1a1a1c] border-[#374151]" align="center" side="bottom" sideOffset={8}>
              <Calendar
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

      {/* Table Section */}
      <DataTable calls={paginatedCalls} />

      {/* Pagination */}
      <div className="flex items-center justify-between mt-4 text-gray-400 text-sm">
        <div>Mostrando { (currentPage - 1) * itemsPerPage + 1 } a { Math.min(currentPage * itemsPerPage, filteredCalls.length) } de {filteredCalls.length} campañas</div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border bg-background rounded-md border-[#1a1a1c] text-gray-400 hover:text-white hover:bg-[#1a1a1c] h-8 w-8 p-0"
            onClick={handlePrevPage}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            size="sm"
            className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 rounded-md bg-[#5E17EB] hover:bg-[#5E17EB]/90 text-white h-8 w-8 p-0"
          >
            {currentPage}
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border bg-background rounded-md border-[#1a1a1c] text-gray-400 hover:text-white hover:bg-[#1a1a1c] h-8 w-8 p-0"
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </>
  )
} 