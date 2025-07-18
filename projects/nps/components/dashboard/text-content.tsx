"use client"

import { MetricCard } from "@/components/dashboard/metric-card"
import { StatsCard } from "@/components/dashboard/stats-card"
import { ExportButton } from "@/components/common/export-button"
import { MessageSquare, Send, Clock, TrendingUp } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import Link from "next/link"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Calendar, CalendarIcon } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import { format } from "date-fns"

// Mock data for text agents
const textMetrics = {
  totalMessages: 2450,
  responseTime: "1.2s",
  successRate: 94.5,
  activeConversations: 128,
}

const chartData = {
  messages: [
    { value: 120, date: "01/04/23" },
    { value: 150, date: "02/04/23" },
    { value: 180, date: "03/04/23" },
    { value: 160, date: "04/04/23" },
    { value: 200, date: "05/04/23" },
    { value: 175, date: "06/04/23" },
    { value: 165, date: "07/04/23" },
  ],
}

// Mock data for text conversations
const mockConversations = [
  {
    id: "1",
    contactName: "Juan Pérez",
    phoneNumber: "+591 78592844",
    firstContact: "21/04/2024 10:23",
    lastContact: "21/04/2025 10:23",
    assistant: "Auto x Km (VP)",
    messages: 12,
    status: "Completada",
    statusColor: "#82ecff"
  },
  {
    id: "2",
    contactName: "María García",
    phoneNumber: "+591 78920755",
    firstContact: "21/04/2024 11:05",
    lastContact: "21/04/2025 11:05",
    assistant: "Auto x Km (VP)",
    messages: 8,
    status: "Completada",
    statusColor: "#82ecff"
  },
  {
    id: "3",
    contactName: "Carlos Rodríguez",
    phoneNumber: "+591 76645561",
    firstContact: "20/04/2024 15:47",
    lastContact: "20/04/2025 15:47",
    assistant: "Auto x Km (VP)",
    messages: 5,
    status: "Abandonada",
    statusColor: "#fd82ff"
  },
  {
    id: "4",
    contactName: "Ana López",
    phoneNumber: "+591 75350724",
    firstContact: "20/04/2024 16:30",
    lastContact: "20/04/2025 16:30",
    assistant: "Auto x Km (VP)",
    messages: 15,
    status: "Completada",
    statusColor: "#82ecff"
  },
  {
    id: "5",
    contactName: "Roberto Martínez",
    phoneNumber: "+591 63509856",
    firstContact: "19/04/2024 09:15",
    lastContact: "19/04/2025 09:15",
    assistant: "Auto x Km (VP)",
    messages: 7,
    status: "Completada",
    statusColor: "#82ecff"
  },
  {
    id: "6",
    contactName: "Laura Sánchez",
    phoneNumber: "+591 63950953",
    firstContact: "19/04/2024 14:22",
    lastContact: "19/04/2025 14:22",
    assistant: "Auto x Km (VP)",
    messages: 3,
    status: "Abandonada",
    statusColor: "#fd82ff"
  },
  {
    id: "7",
    contactName: "Pedro Gómez",
    phoneNumber: "+591 71030433",
    firstContact: "18/04/2024 11:40",
    lastContact: "18/04/2025 11:40",
    assistant: "Auto x Km (VP)",
    messages: 20,
    status: "En progreso",
    statusColor: "#8280ff"
  }
]

export function TextContent() {
  const router = useRouter()
  
  // Filters for charts/metrics
  const [chartCampaignFilter, setChartCampaignFilter] = useState("")
  const [chartSurveyFilter, setChartSurveyFilter] = useState("")
  const [chartAssistantFilter, setChartAssistantFilter] = useState("")
  const [chartDateFilterFrom, setChartDateFilterFrom] = useState("")
  const [chartDateFilterTo, setChartDateFilterTo] = useState("")
  
  // Filters for table
  const [campaignFilter, setCampaignFilter] = useState("")
  const [surveyFilter, setSurveyFilter] = useState("")
  const [assistantFilter, setAssistantFilter] = useState("")
  const [dateFilterFrom, setDateFilterFrom] = useState("")
  const [dateFilterTo, setDateFilterTo] = useState("")

  return (
    <>
      {/* Header Section */}
      <div className="mb-8">
        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-3">Agentes de Texto</h2>
        </div>

        {/* Chart Filters */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-4">
            <Select value={chartCampaignFilter} onValueChange={setChartCampaignFilter}>
              <SelectTrigger className="w-auto min-w-[180px] bg-[#1a1a1c] border-[#374151] text-white focus:border-[#5e17eb] focus:ring-[#5e17eb] h-10">
                <SelectValue placeholder="Todas las Campañas" />
              </SelectTrigger>
              <SelectContent className="bg-[#1a1a1c] border-[#374151]">
                <SelectItem value="todas" className="text-white hover:bg-[#374151]">
                  Todas las Campañas
                </SelectItem>
                <SelectItem value="campaña1" className="text-white hover:bg-[#374151]">
                  Campaña 1
                </SelectItem>
                <SelectItem value="campaña2" className="text-white hover:bg-[#374151]">
                  Campaña 2
                </SelectItem>
              </SelectContent>
            </Select>

            <Select value={chartSurveyFilter} onValueChange={setChartSurveyFilter}>
              <SelectTrigger className="w-auto min-w-[120px] bg-[#1a1a1c] border-[#374151] text-white focus:border-[#5e17eb] focus:ring-[#5e17eb] h-10">
                <SelectValue placeholder="Encuestas" />
              </SelectTrigger>
              <SelectContent className="bg-[#1a1a1c] border-[#374151]">
                <SelectItem value="todas" className="text-white hover:bg-[#374151]">
                  Todas
                </SelectItem>
                <SelectItem value="activas" className="text-white hover:bg-[#374151]">
                  Activas
                </SelectItem>
                <SelectItem value="inactivas" className="text-white hover:bg-[#374151]">
                  Inactivas
                </SelectItem>
              </SelectContent>
            </Select>

            <Select value={chartAssistantFilter} onValueChange={setChartAssistantFilter}>
              <SelectTrigger className="w-auto min-w-[120px] bg-[#1a1a1c] border-[#374151] text-white focus:border-[#5e17eb] focus:ring-[#5e17eb] h-10">
                <SelectValue placeholder="Asistente" />
              </SelectTrigger>
              <SelectContent className="bg-[#1a1a1c] border-[#374151]">
                <SelectItem value="todos" className="text-white hover:bg-[#374151]">
                  Todos
                </SelectItem>
                <SelectItem value="maria" className="text-white hover:bg-[#374151]">
                  María
                </SelectItem>
                <SelectItem value="sofia" className="text-white hover:bg-[#374151]">
                  Sofía
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center gap-4">
            {/* Fecha Desde para Charts */}
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-40 justify-start text-left font-normal bg-[#1A1A1C] border-[#374151] text-white hover:bg-[#2a2a2c] focus:border-[#5E17EB] focus:ring-1 focus:ring-[#5E17EB]"
                >
                  <CalendarIcon className="mr-2 h-4 w-4 text-gray-400" />
                  {chartDateFilterFrom ? format(new Date(chartDateFilterFrom), "dd/MM/yyyy") : "Fecha Desde"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0 bg-[#1a1a1c] border-[#374151]" align="center" side="bottom" sideOffset={8}>
                <CalendarComponent
                  mode="single"
                  selected={chartDateFilterFrom ? new Date(chartDateFilterFrom) : undefined}
                  onSelect={(date: Date | undefined) => setChartDateFilterFrom(date ? format(date, "yyyy-MM-dd") : "")}
                  initialFocus
                  className="text-white"
                />
              </PopoverContent>
            </Popover>

            <span className="text-gray-400 text-sm">al</span>

            {/* Fecha Hasta para Charts */}
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-40 justify-start text-left font-normal bg-[#1A1A1C] border-[#374151] text-white hover:bg-[#2a2a2c] focus:border-[#5E17EB] focus:ring-1 focus:ring-[#5E17EB]"
                >
                  <CalendarIcon className="mr-2 h-4 w-4 text-gray-400" />
                  {chartDateFilterTo ? format(new Date(chartDateFilterTo), "dd/MM/yyyy") : "Fecha Hasta"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0 bg-[#1a1a1c] border-[#374151]" align="center" side="bottom" sideOffset={8}>
                <CalendarComponent
                  mode="single"
                  selected={chartDateFilterTo ? new Date(chartDateFilterTo) : undefined}
                  onSelect={(date: Date | undefined) => setChartDateFilterTo(date ? format(date, "yyyy-MM-dd") : "")}
                  initialFocus
                  className="text-white"
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>

        {/* Text Agent Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <MetricCard
            title="Respuestas Completadas"
            value="1,847"
            chartData={chartData.messages}
            chartColor="#ad82ff"
          />
          <MetricCard
            title="Tasa de Respuesta"
            value="73.2%"
            chartData={chartData.messages}
            chartColor="#ad82ff"
          />
          <MetricCard
            title="Tasa No Contestadas"
            value="8.4"
            chartData={chartData.messages}
            chartColor="#ad82ff"
          />
          <MetricCard
            title="Tiempo de Respuesta"
            value="2.3 min"
            chartData={chartData.messages}
            chartColor="#ad82ff"
          />
        </div>

        {/* Additional NPS Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          {/* Total Campañas Card */}
          <div className="bg-[#000000] border border-[#1a1a1c] rounded-xl p-6">
            <div className="text-[#8280ff] text-sm font-medium mb-2">Total Campañas</div>
            <div className="text-[#8280ff] text-4xl font-bold mb-3">1.560</div>
            <div className="flex items-center text-xs text-gray-400">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 mr-1">
                <path d="m5 12 7-7 7 7"></path>
                <path d="M12 19V5"></path>
              </svg>
              <span>+12% vs último mes</span>
            </div>
          </div>

          {/* NPS score Card */}
          <div className="bg-[#000000] border border-[#1a1a1c] rounded-xl p-6">
            <div className="text-[#82ecff] text-sm font-medium mb-2">NPS score</div>
            <div className="text-[#82ecff] text-4xl font-bold mb-4">41</div>
            <div className="flex justify-between items-center text-sm">
              <div className="flex items-center text-gray-300">
                <img alt="Detractor" loading="lazy" width="32" height="32" decoding="async" className="mr-3" src="/icons/detractor.svg" style={{color: 'transparent'}} />
                <span className="font-medium">Detractores (16.6%)</span>
              </div>
              <div className="flex items-center text-gray-300">
                <img alt="Pasivo" loading="lazy" width="32" height="32" decoding="async" className="mr-3" src="/icons/pasivo.svg" style={{color: 'transparent'}} />
                <span className="font-medium">Pasivos (16.6%)</span>
              </div>
              <div className="flex items-center text-gray-300">
                <img alt="Promotor" loading="lazy" width="32" height="32" decoding="async" className="mr-3" src="/icons/promotor.svg" style={{color: 'transparent'}} />
                <span className="font-medium">Promotores (57.6%)</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Table Filters */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-4">
          <Select value={campaignFilter} onValueChange={setCampaignFilter}>
            <SelectTrigger className="w-auto min-w-[180px] bg-[#1a1a1c] border-[#374151] text-white focus:border-[#5e17eb] focus:ring-[#5e17eb] h-10">
              <SelectValue placeholder="Todas las Campañas" />
            </SelectTrigger>
            <SelectContent className="bg-[#1a1a1c] border-[#374151]">
              <SelectItem value="todas" className="text-white hover:bg-[#374151]">
                Todas las Campañas
              </SelectItem>
              <SelectItem value="campaña1" className="text-white hover:bg-[#374151]">
                Campaña 1
              </SelectItem>
              <SelectItem value="campaña2" className="text-white hover:bg-[#374151]">
                Campaña 2
              </SelectItem>
            </SelectContent>
          </Select>

          <Select value={surveyFilter} onValueChange={setSurveyFilter}>
            <SelectTrigger className="w-auto min-w-[120px] bg-[#1a1a1c] border-[#374151] text-white focus:border-[#5e17eb] focus:ring-[#5e17eb] h-10">
              <SelectValue placeholder="Encuestas" />
            </SelectTrigger>
            <SelectContent className="bg-[#1a1a1c] border-[#374151]">
              <SelectItem value="todas" className="text-white hover:bg-[#374151]">
                Todas
              </SelectItem>
              <SelectItem value="activas" className="text-white hover:bg-[#374151]">
                Activas
              </SelectItem>
              <SelectItem value="inactivas" className="text-white hover:bg-[#374151]">
                Inactivas
              </SelectItem>
            </SelectContent>
          </Select>

          <Select value={assistantFilter} onValueChange={setAssistantFilter}>
            <SelectTrigger className="w-auto min-w-[120px] bg-[#1a1a1c] border-[#374151] text-white focus:border-[#5e17eb] focus:ring-[#5e17eb] h-10">
              <SelectValue placeholder="Asistente" />
            </SelectTrigger>
            <SelectContent className="bg-[#1a1a1c] border-[#374151]">
              <SelectItem value="todos" className="text-white hover:bg-[#374151]">
                Todos
              </SelectItem>
              <SelectItem value="maria" className="text-white hover:bg-[#374151]">
                María
              </SelectItem>
              <SelectItem value="sofia" className="text-white hover:bg-[#374151]">
                Sofía
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center gap-4">
          {/* Fecha Desde */}
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-40 justify-start text-left font-normal bg-[#1A1A1C] border-[#374151] text-white hover:bg-[#2a2a2c] focus:border-[#5E17EB] focus:ring-1 focus:ring-[#5E17EB]"
              >
                <CalendarIcon className="mr-2 h-4 w-4 text-gray-400" />
                {dateFilterFrom ? format(new Date(dateFilterFrom), "dd/MM/yyyy") : "Fecha Desde"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0 bg-[#1a1a1c] border-[#374151]" align="center" side="bottom" sideOffset={8}>
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

          {/* Fecha Hasta */}
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-40 justify-start text-left font-normal bg-[#1A1A1C] border-[#374151] text-white hover:bg-[#2a2a2c] focus:border-[#5E17EB] focus:ring-1 focus:ring-[#5E17EB]"
              >
                <CalendarIcon className="mr-2 h-4 w-4 text-gray-400" />
                {dateFilterTo ? format(new Date(dateFilterTo), "dd/MM/yyyy") : "Fecha Hasta"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0 bg-[#1a1a1c] border-[#374151]" align="center" side="bottom" sideOffset={8}>
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

      {/* Conversations Table */}
      <div className="space-y-6">
        <Table className="w-full caption-bottom text-sm">
          <TableHeader className="[&_tr]:border-b bg-[#000000]">
            <TableRow className="transition-colors data-[state=selected]:bg-muted border-b border-[#1a1a1c] hover:bg-[#1a1a1c]/50">
              <TableHead className="h-12 px-4 text-left align-middle font-medium [&:has([role=checkbox])]:pr-0 text-gray-400">Contacto</TableHead>
              <TableHead className="h-12 px-4 text-left align-middle font-medium [&:has([role=checkbox])]:pr-0 text-gray-400">Celular</TableHead>
              <TableHead className="h-12 px-4 text-left align-middle font-medium [&:has([role=checkbox])]:pr-0 text-gray-400">Primer contacto</TableHead>
              <TableHead className="h-12 px-4 text-left align-middle font-medium [&:has([role=checkbox])]:pr-0 text-gray-400">Último contacto</TableHead>
              <TableHead className="h-12 px-4 text-left align-middle font-medium [&:has([role=checkbox])]:pr-0 text-gray-400">Asistente</TableHead>
              <TableHead className="h-12 px-4 text-left align-middle font-medium [&:has([role=checkbox])]:pr-0 text-gray-400">Mensajes</TableHead>
              <TableHead className="h-12 px-4 text-left align-middle font-medium [&:has([role=checkbox])]:pr-0 text-gray-400">Estado</TableHead>
              <TableHead className="h-12 px-4 text-left align-middle font-medium [&:has([role=checkbox])]:pr-0 text-gray-400">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="[&_tr:last-child]:border-0">
            {mockConversations.map((conversation) => (
              <TableRow
                key={conversation.id}
                className="data-[state=selected]:bg-muted border-b border-[#1a1a1c] hover:bg-[#1a1a1c]/50 transition-colors duration-200 cursor-pointer"
                onClick={() => router.push(`/dashboard/text/chat/${conversation.id}`)}
              >
                <TableCell className="p-4 align-middle [&:has([role=checkbox])]:pr-0 text-white font-medium">
                  {conversation.contactName}
                </TableCell>
                <TableCell className="p-4 align-middle [&:has([role=checkbox])]:pr-0 text-white">
                  {conversation.phoneNumber}
                </TableCell>
                <TableCell className="p-4 align-middle [&:has([role=checkbox])]:pr-0 text-white">
                  {conversation.firstContact}
                </TableCell>
                <TableCell className="p-4 align-middle [&:has([role=checkbox])]:pr-0 text-white">
                  {conversation.lastContact}
                </TableCell>
                <TableCell className="p-4 align-middle [&:has([role=checkbox])]:pr-0 text-white">
                  {conversation.assistant}
                </TableCell>
                <TableCell className="p-4 align-middle [&:has([role=checkbox])]:pr-0 text-white">
                  {conversation.messages}
                </TableCell>
                <TableCell className="p-4 align-middle [&:has([role=checkbox])]:pr-0">
                  <span 
                    className="text-sm font-medium" 
                    style={{ color: conversation.statusColor }}
                  >
                    {conversation.status}
                  </span>
                </TableCell>
                <TableCell className="p-4 align-middle [&:has([role=checkbox])]:pr-0">
                  <button 
                    className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 underline-offset-4 text-[#9ca3af] hover:text-[#8280ff] p-0 h-auto font-medium text-sm hover:no-underline"
                    onClick={(e) => {
                      e.stopPropagation()
                      router.push(`/dashboard/text/chat/${conversation.id}`)
                    }}
                  >
                    Ver chat
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

    </>
  )
} 