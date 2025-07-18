"use client"

import { DataTable } from "@/components/dashboard/data-table"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { CalendarIcon, ChevronLeft, ChevronRight, ChevronDown } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { format } from "date-fns"
import { useState, useMemo, useEffect } from "react"
import { useContactFlowStore } from "@/lib/stores/contact-flow-store" // Importar el store

interface CallData {
  fullId: string;
  contactName: string;
  assistant: string;
  assistantSubtext: string;
  clientPhoneNumber: string;
  finalizationReason: string;
  statusColor: string;
  statusBgColor: string;
  statusBorderColor: string;
  progressStatus: number;
  commercial_stage: string;
  successType: string;
  lastContactType: string;
  chatId: string | null;
  startTime: string;
  duration: string;
  cost: string;
}

export function CallsTableSection({ forceNavigationPath }: { forceNavigationPath?: string }) {
  const getContactSummary = useContactFlowStore((state) => state.getContactSummary)
  const [calls, setCalls] = useState<CallData[]>([])

  useEffect(() => {
    const contactSummary = getContactSummary()
    const mockTableData = contactSummary.map(summary => ({
        fullId: summary.id,
        contactName: summary.name,
        assistant: "Campaña General", 
        assistantSubtext: "Agente IA",
        clientPhoneNumber: "sip:000000@host", 
        finalizationReason: summary.status,
        statusColor: summary.statusColor,
        statusBgColor: summary.statusBgColor,
        statusBorderColor: summary.statusBorderColor,
        progressStatus: summary.progressStatus,
        commercial_stage: summary.commercial_stage,
        successType: "approved",
        lastContactType: summary.lastContact,
        chatId: null,
        startTime: summary.date,
        duration: "1m 0s",
        cost: "$0.10"
    }));
    setCalls(mockTableData);
  }, [getContactSummary]);


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
  const [itemsPerPage, setItemsPerPage] = useState(10) // Nuevo estado para items por página

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
    return calls.filter((call) => {
      // La lógica de filtro se mantiene
      const matchesAssistant = !assistantFilter || call.assistant.toLowerCase().includes(assistantFilter.toLowerCase())
      const matchesPhone = !phoneFilter || call.clientPhoneNumber.includes(phoneFilter)
      const matchesFinalization = !finalizationFilter || call.finalizationReason.toLowerCase().includes(finalizationFilter.toLowerCase())
      const matchesSuccess = !successFilter || call.successType.toLowerCase().includes(successFilter.toLowerCase())
      
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
  
  const handleItemsPerPageChange = (value: string) => {
    setItemsPerPage(Number(value));
    setCurrentPage(1); // Reset to first page
  };

  const getPaginationButtons = () => {
    const buttons = [];
    const maxButtons = 7; // Max buttons to show
    const half = Math.floor(maxButtons / 2);

    if (totalPages <= maxButtons) {
      for (let i = 1; i <= totalPages; i++) {
        buttons.push(i);
      }
    } else if (currentPage <= half) {
      for (let i = 1; i <= maxButtons - 2; i++) {
        buttons.push(i);
      }
      buttons.push('...', totalPages);
    } else if (currentPage >= totalPages - half) {
      buttons.push(1, '...');
      for (let i = totalPages - (maxButtons - 3); i <= totalPages; i++) {
        buttons.push(i);
      }
    } else {
      buttons.push(1, '...');
      for (let i = currentPage - (half - 2); i <= currentPage + (half - 2); i++) {
        buttons.push(i);
      }
      buttons.push('...', totalPages);
    }
    return buttons;
  };

  return (
    <>
      {/* Enhanced Filters Section */}
      {/* Eliminado el div de filtros superior según instrucción del usuario */}

      {/* New Filter Bar - HTML EXACTO del usuario */}
      <div className="flex flex-wrap items-center gap-4 py-4">
        <button className="gap-2 whitespace-nowrap font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hover:bg-accent hover:text-accent-foreground flex items-center justify-between rounded-md border bg-[#1a1a1c] border-[#374151] px-3 py-2 text-sm text-white ring-offset-background placeholder:text-muted-foreground focus:border-[#5e17eb] focus:outline-none focus:ring-2 focus:ring-[#5e17eb] focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1 w-auto h-10" type="button" aria-haspopup="dialog" aria-expanded="false" aria-controls="radix-«r5k»" data-state="closed"><span className="pointer-events-none">Date and Time</span><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-calendar h-4 w-4 opacity-50 ml-2"><path d="M8 2v4"></path><path d="M16 2v4"></path><rect width="18" height="18" x="3" y="4" rx="2"></rect><path d="M3 10h18"></path></svg></button>
        <button className="gap-2 whitespace-nowrap font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hover:bg-accent hover:text-accent-foreground flex items-center justify-between rounded-md border bg-[#1a1a1c] border-[#374151] px-3 py-2 text-sm text-white ring-offset-background placeholder:text-muted-foreground focus:border-[#5e17eb] focus:outline-none focus:ring-2 focus:ring-[#5e17eb] focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1 w-auto h-10" type="button" aria-haspopup="dialog" aria-expanded="false" aria-controls="radix-«r5l»" data-state="closed"><span className="pointer-events-none">Campaña</span><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-down h-4 w-4 opacity-50 ml-2"><path d="m6 9 6 6 6-6"></path></svg></button>
        <button className="gap-2 whitespace-nowrap font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hover:bg-accent hover:text-accent-foreground flex items-center justify-between rounded-md border bg-[#1a1a1c] border-[#374151] px-3 py-2 text-sm text-white ring-offset-background placeholder:text-muted-foreground focus:border-[#5e17eb] focus:outline-none focus:ring-2 focus:ring-[#5e17eb] focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1 w-auto h-10" type="button" aria-haspopup="dialog" aria-expanded="false" aria-controls="radix-«r5m»" data-state="closed"><span className="pointer-events-none">Cost</span><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-down h-4 w-4 opacity-50 ml-2"><path d="m6 9 6 6 6-6"></path></svg></button>
        <button type="button" role="combobox" aria-controls="radix-«r5n»" aria-expanded="false" aria-autocomplete="none" dir="ltr" data-state="closed" className="flex items-center justify-between rounded-md border bg-[#1a1a1c] border-[#374151] px-3 py-2 text-sm text-white ring-offset-background placeholder:text-muted-foreground focus:border-[#5e17eb] focus:outline-none focus:ring-2 focus:ring-[#5e17eb] focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1 w-auto h-10"><span style={{ pointerEvents: 'none' }}>Teléfono</span><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-down h-4 w-4 opacity-50" aria-hidden="true"><path d="m6 9 6 6 6-6"></path></svg></button>
        <button type="button" role="combobox" aria-expanded="false" aria-autocomplete="none" dir="ltr" data-state="closed" className="flex items-center justify-between rounded-md border bg-[#1a1a1c] border-[#374151] px-3 py-2 text-sm text-white ring-offset-background placeholder:text-muted-foreground focus:border-[#5e17eb] focus:outline-none focus:ring-2 focus:ring-[#5e17eb] focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1 w-auto h-10"><span style={{ pointerEvents: 'none' }}>Estado Comercial</span><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-down h-4 w-4 opacity-50" aria-hidden="true"><path d="m6 9 6 6 6-6"></path></svg></button>
        <button className="gap-2 whitespace-nowrap font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hover:bg-accent hover:text-accent-foreground flex items-center justify-between rounded-md border bg-[#1a1a1c] border-[#374151] px-3 py-2 text-sm text-white ring-offset-background placeholder:text-muted-foreground focus:border-[#5e17eb] focus:outline-none focus:ring-2 focus:ring-[#5e17eb] focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1 w-auto h-10" type="button" aria-haspopup="dialog" aria-expanded="false" aria-controls="radix-«r5p»" data-state="closed"><span className="pointer-events-none">Ultimo Contacto</span><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-down h-4 w-4 opacity-50 ml-2"><path d="m6 9 6 6 6-6"></path></svg></button>
        <button type="button" role="combobox" aria-expanded="false" aria-autocomplete="none" dir="ltr" data-state="closed" className="flex items-center justify-between rounded-md border bg-[#1a1a1c] border-[#374151] px-3 py-2 text-sm text-white ring-offset-background placeholder:text-muted-foreground focus:border-[#5e17eb] focus:outline-none focus:ring-2 focus:ring-[#5e17eb] focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1 w-auto h-10"><span className="pointer-events-none">Estado</span><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-down h-4 w-4 opacity-50 ml-2" aria-hidden="true"><path d="m6 9 6 6 6-6"></path></svg></button>
        <button type="button" role="combobox" aria-expanded="false" aria-autocomplete="none" dir="ltr" data-state="closed" className="flex items-center justify-between rounded-md border bg-[#1a1a1c] border-[#374151] px-3 py-2 text-sm text-white ring-offset-background placeholder:text-muted-foreground focus:border-[#5e17eb] focus:outline-none focus:ring-2 focus:ring-[#5e17eb] focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1 w-auto h-10"><span className="pointer-events-none">Nombre de Contacto</span><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-down h-4 w-4 opacity-50 ml-2" aria-hidden="true"><path d="m6 9 6 6 6-6"></path></svg></button>
        {/* Select de Mostrar Cantidad ahora aquí */}
          <Select onValueChange={handleItemsPerPageChange} defaultValue="10">
            <SelectTrigger className="w-auto min-w-[140px] bg-[#1a1a1c] border-[#374151] text-white focus:border-[#5e17eb] focus:ring-[#5e17eb] h-10">
              <SelectValue placeholder="Mostrar" />
            </SelectTrigger>
            <SelectContent className="bg-[#1a1a1c] border-[#374151]">
              <SelectItem value="10" className="text-white hover:bg-[#374151]">
                Mostrar 10
              </SelectItem>
              <SelectItem value="20" className="text-white hover:bg-[#374151]">
                Mostrar 20
              </SelectItem>
              <SelectItem value="50" className="text-white hover:bg-[#374151]">
                Mostrar 50
              </SelectItem>
              <SelectItem value="100" className="text-white hover:bg-[#374151]">
                Mostrar 100
              </SelectItem>
              <SelectItem value="200" className="text-white hover:bg-[#374151]">
                Mostrar 200
              </SelectItem>
            </SelectContent>
          </Select>
      </div>

      {/* Table Section */}
      <DataTable calls={paginatedCalls} forceNavigationPath={forceNavigationPath} />

      {/* Pagination */}
      <div className="flex items-center justify-between mt-4 text-gray-400 text-sm">
        <span>Mostrando { (currentPage - 1) * itemsPerPage + 1 } a { Math.min(currentPage * itemsPerPage, filteredCalls.length) } de {filteredCalls.length} campañas</span>
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
          
          {getPaginationButtons().map((p, index) => (
            <Button
              key={index}
              size="sm"
              onClick={() => typeof p === 'number' && setCurrentPage(p)}
              disabled={p === '...'}
              className={`inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 rounded-md h-8 w-8 p-0 ${
                p === currentPage 
                ? "bg-[#5E17EB] hover:bg-[#5E17EB]/90 text-white" 
                : "border bg-background border-[#1a1a1c] text-gray-400 hover:text-white hover:bg-[#1a1a1c]"
              }`}
            >
              {p}
            </Button>
          ))}

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