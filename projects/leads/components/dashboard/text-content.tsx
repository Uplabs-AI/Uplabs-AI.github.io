"use client"

import { MetricCard } from "@/components/dashboard/metric-card"
import { StatsCard } from "@/components/dashboard/stats-card"
import { ExportButton } from "@/components/common/export-button"
import { MessageSquare, Send, Clock, TrendingUp, ChevronLeft, ChevronRight } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import Link from "next/link"
import { useState, useMemo } from "react"
import { useRouter } from "next/navigation"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Calendar, CalendarIcon } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import { format } from "date-fns"
import StatusChip from "@/components/dashboard/status-chip"

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

const commercialStages = [ "Nuevos Lead", "Primer Mensaje Enviado", "Seguimiento 1 (60 min)", "Seguimiento 2 (24 hrs)", "Seguimiento 3 (7 días)", "En Conversión", "No Respondió", "No Interesados", "Interesados", "Ganada", "Perdida" ];

// Mock data for text conversations
const mockConversations = commercialStages.map((stage, index) => ({
    id: `${index + 1}`,
    contactName: `Contacto de Prueba ${index + 1}`,
    phoneNumber: "sip:000000@host",
    campaign: "Campaña de Texto",
    assistant: "Agente Texto IA",
    last_contact_type: index % 2 === 0 ? "Mensaje" : "Llamada",
    startDate: "10/7/2025",
    status: index % 2 === 0 ? "Realizado" : "Pendiente",
    cost: `$0.${10 + index}`,
    commercial_stage: stage,
    direction: index % 2 === 0 ? "Entrante" : "Saliente"
}));

// Mock para DashboardMetrics (estructura obligatoria)
const mockMetrics = {
  totalCallMinutes: 120,
  numberOfCalls: 50,
  totalExpense: 100,
  averageCostPerCall: 2,
  balance: 500,
  totalCalls: 50,
  transferredCalls: 10,
  successfulCalls: 35,
  failedCalls: 5,
  totalCallsPercentChange: 10,
  transferredCallsPercentChange: 5,
  successfulCallsPercentChange: 8,
  failedCallsPercentChange: -2,
}

// Mock para Call[] (estructura obligatoria)
const mockCalls = [
  {
    id: "1",
    fullId: "CALL-1",
    assistant: "Lucio (Texto)",
    assistantSubtext: "Texto",
    assistantPhone: "+59170000001",
    clientPhoneNumber: "+59160000001",
    finalizationReason: "Finalizado",
    successEvaluation: "Aprobado",
    startTime: "2024-06-01T10:00:00Z",
    duration: "60",
    cost: 2,
    status: "success",
    successType: "approved",
  } as const,
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

  // State for pagination
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10; // Or any other number you prefer

  const filteredConversations = useMemo(() => {
    // This is a placeholder for actual filtering logic if you add it later
    // For now, it just returns all conversations
    return mockConversations;
  }, [mockConversations]);


  const totalPages = Math.ceil(filteredConversations.length / itemsPerPage);

  const paginatedConversations = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredConversations.slice(startIndex, startIndex + itemsPerPage);
  }, [currentPage, itemsPerPage, filteredConversations]);

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const getPaginationButtons = () => {
    const buttons = [];
    const maxButtons = 5;
    const ellipsis = (
      <Button
        key="ellipsis"
        variant="outline"
        className="h-8 w-8 p-0 border bg-background border-[#1a1a1c] text-gray-400"
        disabled
      >
        ...
      </Button>
    );

    if (totalPages <= maxButtons + 2) {
      for (let i = 1; i <= totalPages; i++) {
        buttons.push(
          <Button
            key={i}
            onClick={() => setCurrentPage(i)}
            variant={currentPage === i ? "default" : "outline"}
            className={`h-8 w-8 p-0 ${
              currentPage === i
                ? "bg-[#5E17EB] hover:bg-[#5E17EB]/90 text-white"
                : "border bg-background border-[#1a1a1c] text-gray-400 hover:text-white hover:bg-[#1a1a1c]"
            }`}
          >
            {i}
          </Button>
        );
      }
    } else {
      buttons.push(
        <Button
          key={1}
          onClick={() => setCurrentPage(1)}
          variant={currentPage === 1 ? "default" : "outline"}
          className={`h-8 w-8 p-0 ${
            currentPage === 1
              ? "bg-[#5E17EB] hover:bg-[#5E17EB]/90 text-white"
              : "border bg-background border-[#1a1a1c] text-gray-400 hover:text-white hover:bg-[#1a1a1c]"
          }`}
        >
          1
        </Button>
      );

      if (currentPage > 3) {
        buttons.push(ellipsis);
      }

      let start = Math.max(2, currentPage - 1);
      let end = Math.min(totalPages - 1, currentPage + 1);

      if (currentPage <= 2) {
        end = 3;
      }
      if (currentPage >= totalPages - 1) {
        start = totalPages - 2;
      }

      for (let i = start; i <= end; i++) {
        buttons.push(
          <Button
            key={i}
            onClick={() => setCurrentPage(i)}
            variant={currentPage === i ? "default" : "outline"}
            className={`h-8 w-8 p-0 ${
              currentPage === i
                ? "bg-[#5E17EB] hover:bg-[#5E17EB]/90 text-white"
                : "border bg-background border-[#1a1a1c] text-gray-400 hover:text-white hover:bg-[#1a1a1c]"
            }`}
          >
            {i}
          </Button>
        );
      }

      if (currentPage < totalPages - 2) {
        buttons.push(ellipsis);
      }

      buttons.push(
        <Button
          key={totalPages}
          onClick={() => setCurrentPage(totalPages)}
          variant={currentPage === totalPages ? "default" : "outline"}
          className={`h-8 w-8 p-0 ${
            currentPage === totalPages
              ? "bg-[#5E17EB] hover:bg-[#5E17EB]/90 text-white"
              : "border bg-background border-[#1a1a1c] text-gray-400 hover:text-white hover:bg-[#1a1a1c]"
          }`}
        >
          {totalPages}
        </Button>
      );
    }
    return buttons;
  };


  return (
    <>
      {/* Header Section */}
      <div className="mb-8">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold mb-3">Agentes de Texto</h2>
          <ExportButton metrics={mockMetrics} calls={mockCalls} className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 h-10 px-4 py-2 bg-[#5E17EB] hover:bg-[#5E17EB]/90 text-white transition-all duration-200 hover:scale-105" />
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
            title="Total de Mensajes Enviados"
            value={textMetrics.totalMessages}
            chartData={chartData.messages}
            chartColor="#82ecff"
          />
          <MetricCard
            title="Tiempo Medio de Respuesta"
            value={textMetrics.responseTime}
            chartData={chartData.messages}
            chartColor="#8280ff"
          />
          <MetricCard
            title="Tasa de Éxito de Conversión"
            value={`${textMetrics.successRate}%`}
            chartData={chartData.messages}
            chartColor="#ad82ff"
          />
          <MetricCard
            title="Conversaciones Activas"
            value={textMetrics.activeConversations}
            chartData={chartData.messages}
            chartColor="#d782ff"
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
        </div>
      </div>

      {/* Table Filters */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-4">
          {/* Filtro: Nombre de Contacto */}
          <Select value={campaignFilter} onValueChange={setCampaignFilter}>
            <SelectTrigger className="w-auto min-w-[180px] bg-[#1a1a1c] border-[#374151] text-white focus:border-[#5e17eb] focus:ring-[#5e17eb] h-10">
              <SelectValue placeholder="Nombre de Contacto" />
            </SelectTrigger>
            <SelectContent className="bg-[#1a1a1c] border-[#374151]">
              <SelectItem value="todos" className="text-white hover:bg-[#374151]">Todos</SelectItem>
              {/* Aquí puedes mapear dinámicamente los nombres de contacto si lo deseas */}
            </SelectContent>
          </Select>
          {/* Filtro: Campaña */}
          <Select value={surveyFilter} onValueChange={setSurveyFilter}>
            <SelectTrigger className="w-auto min-w-[120px] bg-[#1a1a1c] border-[#374151] text-white focus:border-[#5e17eb] focus:ring-[#5e17eb] h-10">
              <SelectValue placeholder="Campaña" />
            </SelectTrigger>
            <SelectContent className="bg-[#1a1a1c] border-[#374151]">
              <SelectItem value="todas" className="text-white hover:bg-[#374151]">Todas</SelectItem>
              {/* Aquí puedes mapear dinámicamente las campañas si lo deseas */}
            </SelectContent>
          </Select>
          {/* Filtro: Número de Teléfono del Cliente */}
          <Select value={assistantFilter} onValueChange={setAssistantFilter}>
            <SelectTrigger className="w-auto min-w-[180px] bg-[#1a1a1c] border-[#374151] text-white focus:border-[#5e17eb] focus:ring-[#5e17eb] h-10">
              <SelectValue placeholder="Número de Teléfono del Cliente" />
            </SelectTrigger>
            <SelectContent className="bg-[#1a1a1c] border-[#374151]">
              <SelectItem value="todos" className="text-white hover:bg-[#374151]">Todos</SelectItem>
              {/* Aquí puedes mapear dinámicamente los teléfonos si lo deseas */}
            </SelectContent>
          </Select>
          {/* Filtro: Flujo Comercial */}
          <Select value={chartCampaignFilter} onValueChange={setChartCampaignFilter}>
            <SelectTrigger className="w-auto min-w-[150px] bg-[#1a1a1c] border-[#374151] text-white focus:border-[#5e17eb] focus:ring-[#5e17eb] h-10">
              <SelectValue placeholder="Flujo Comercial" />
            </SelectTrigger>
            <SelectContent className="bg-[#1a1a1c] border-[#374151]">
              <SelectItem value="todos" className="text-white hover:bg-[#374151]">Todos</SelectItem>
              {/* Aquí puedes mapear dinámicamente los flujos si lo deseas */}
            </SelectContent>
          </Select>
          {/* Filtro: Último Contacto */}
          <Select value={chartSurveyFilter} onValueChange={setChartSurveyFilter}>
            <SelectTrigger className="w-auto min-w-[150px] bg-[#1a1a1c] border-[#374151] text-white focus:border-[#5e17eb] focus:ring-[#5e17eb] h-10">
              <SelectValue placeholder="Último Contacto" />
            </SelectTrigger>
            <SelectContent className="bg-[#1a1a1c] border-[#374151]">
              <SelectItem value="todos" className="text-white hover:bg-[#374151]">Todos</SelectItem>
              {/* Aquí puedes mapear dinámicamente los tipos de contacto si lo deseas */}
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
      <div className="relative w-full overflow-auto">
      <Table className="w-full caption-bottom text-sm">
        <TableHeader className="[&_tr]:border-b bg-[#000000]">
          <TableRow className="transition-colors data-[state=selected]:bg-muted border-b border-[#1a1a1c] hover:bg-[#1a1a1c]/50">
            <TableHead className="h-12 px-4 text-left align-middle font-medium [&:has([role=checkbox])]:pr-0 w-[40px] text-gray-400">
              <input type="checkbox" className="h-4 w-4" />
            </TableHead>
            <TableHead className="h-12 px-4 text-left align-middle font-medium [&:has([role=checkbox])]:pr-0 text-gray-400">Nombre de Contacto</TableHead>
            <TableHead className="h-12 px-4 text-left align-middle font-medium [&:has([role=checkbox])]:pr-0 text-gray-400">Campaña</TableHead>
            <TableHead className="h-12 px-4 text-left align-middle font-medium [&:has([role=checkbox])]:pr-0 text-gray-400">Número de Teléfono del Cliente</TableHead>
            <TableHead className="h-12 px-4 text-left align-middle font-medium [&:has([role=checkbox])]:pr-0 text-gray-400">Flujo Comercial</TableHead>
            <TableHead className="h-12 px-4 text-left align-middle font-medium [&:has([role=checkbox])]:pr-0 text-gray-400">Último Contacto</TableHead>
            <TableHead className="h-12 px-4 text-left align-middle font-medium [&:has([role=checkbox])]:pr-0 text-gray-400">Fecha de Inicio</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="[&_tr:last-child]:border-0">
           {paginatedConversations.map((convo) => (
             <TableRow 
               key={convo.id} 
               className="data-[state=selected]:bg-muted border-b border-[#1a1a1c] hover:bg-[#1a1a1c]/50 transition-colors duration-200 cursor-pointer"
               onClick={() => router.push(`/dashboard/text/chat/${convo.id}`)}
             >
                <TableCell className="p-4 align-middle [&:has([role=checkbox])]:pr-0">
                  <input type="checkbox" className="h-4 w-4" onClick={(e) => e.stopPropagation()} />
                </TableCell>
                <TableCell className="p-4 align-middle [&:has([role=checkbox])]:pr-0">
                  <div className="flex items-center gap-2">
                   <span className="text-white">{convo.contactName}</span>
                  </div>
                </TableCell>
                <TableCell className="p-4 align-middle [&:has([role=checkbox])]:pr-0">
                  <div className="flex flex-col">
                   <div className="text-sm text-white font-medium">{convo.campaign}</div>
                   <div className="text-xs text-gray-400 font-mono">{convo.assistant}</div>
                  </div>
                </TableCell>
                <TableCell className="p-4 align-middle [&:has([role=checkbox])]:pr-0">
                  <div className="flex flex-col">
                   <span className="font-mono text-xs text-white">{convo.phoneNumber}</span>
                    <div className="flex items-center mt-1">
                     <span className={`h-2 w-2 rounded-full ${convo.direction === 'Entrante' ? 'bg-green-500' : 'bg-blue-500'} mr-2`}></span>
                     <span className="text-xs text-gray-400">{convo.direction}</span>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="p-4 align-middle [&:has([role=checkbox])]:pr-0">
                 <StatusChip text={convo.commercial_stage} />
                </TableCell>
                <TableCell className="p-4 align-middle [&:has([role=checkbox])]:pr-0">
                   <div 
                        className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                        style={{
                         backgroundColor: convo.last_contact_type === "Llamada" ? "#22c55e1a" : "#d782ff1a",
                         color: convo.last_contact_type === "Llamada" ? "#22c55e" : "#d782ff",
                         borderColor: convo.last_contact_type === "Llamada" ? "#22c55e33" : "#d782ff33"
                        }}
                      >
                       {convo.last_contact_type}
                      </div>
                </TableCell>
                <TableCell className="p-4 align-middle [&:has([role=checkbox])]:pr-0 text-sm text-gray-300">
                 {convo.startDate}
                </TableCell>
            </TableRow>
            ))}
        </TableBody>
      </Table>
      </div>
       {/* Pagination */}
       <div className="flex items-center justify-between py-4">
        <span className="text-sm text-gray-400">
          Page {currentPage} of {totalPages}
        </span>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            className="h-8 w-8 p-0 border bg-background rounded-md border-[#1a1a1c] text-gray-400 hover:text-white hover:bg-[#1a1a1c]"
            onClick={handlePrevPage}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          {getPaginationButtons()}
          <Button
            variant="outline"
            className="h-8 w-8 p-0 border bg-background rounded-md border-[#1a1a1c] text-gray-400 hover:text-white hover:bg-[#1a1a1c]"
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