"use client"

import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, ChevronDown } from "lucide-react"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { format } from "date-fns"
import { useState, useMemo } from "react"
import { voiceCallsData } from "@/lib/constants/voice-calls-data"
import { VoiceCallsTable } from "@/components/dashboard/voice-calls-table"
import { cn } from '@/lib/utils'

// Data type definition
interface VoiceCall {
  id: string;
  startTime: string;
  endTime: string;
  duration: number;
  cost: string;
  successEvaluation: string;
  finalizationReason: string;
  clientPhone: string;
  metadata: {
    [key: string]: string;
  };
}

export function VoiceCallsTableSection() {
  // State for pagination
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  // State for filters
  const [selectedDate, setSelectedDate] = useState<Date | undefined>()
  const [callId, setCallId] = useState("")
  const [successEvaluation, setSuccessEvaluation] = useState("all")
  const [endedReason, setEndedReason] = useState("all")
  const [customerPhone, setCustomerPhone] = useState("")
  const [minCost, setMinCost] = useState("")
  const [maxCost, setMaxCost] = useState("")

  const successOptions = useMemo(
    () => ["all", ...Array.from(new Set(voiceCallsData.map((call) => call.successEvaluation)))],
    []
  )

  const reasonOptions = useMemo(
    () => ["all", ...Array.from(new Set(voiceCallsData.map((call) => call.finalizationReason)))],
    []
  )

  const filteredCalls = useMemo(() => {
    return voiceCallsData.filter((call) => {
      const dateMatch =
        !selectedDate ||
        format(new Date(call.startTime), "yyyy-MM-dd") ===
          format(selectedDate, "yyyy-MM-dd")
      const callIdMatch =
        !callId || call.id.toLowerCase().includes(callId.toLowerCase())
      const successMatch =
        successEvaluation === "all" || call.successEvaluation === successEvaluation
      const reasonMatch =
        endedReason === "all" || call.finalizationReason === endedReason
      const phoneMatch =
        !customerPhone || call.clientPhone.toLowerCase().includes(customerPhone.toLowerCase())
      
      const costValue = parseFloat(call.cost.replace('$', ''));
      const min = minCost ? parseFloat(minCost) : -Infinity;
      const max = maxCost ? parseFloat(maxCost) : Infinity;
      const costMatch = costValue >= min && costValue <= max;

      return dateMatch && callIdMatch && successMatch && reasonMatch && phoneMatch && costMatch
    })
  }, [selectedDate, callId, successEvaluation, endedReason, customerPhone, minCost, maxCost])

  const totalPages = Math.ceil(filteredCalls.length / itemsPerPage)

  const paginatedCalls = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    return filteredCalls.slice(startIndex, endIndex)
  }, [filteredCalls, currentPage, itemsPerPage])

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1))
  }

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
  }

  const getPaginationButtons = () => {
    const buttons = []
    const maxButtons = 5
    const ellipsis = (
      <Button
        key="ellipsis"
        variant="outline"
        className="h-8 w-8 p-0 border bg-background border-[#1a1a1c] text-gray-400"
        disabled
      >
        ...
      </Button>
    )

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
        )
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
      )

      if (currentPage > 3) {
        buttons.push(ellipsis)
      }

      let start = Math.max(2, currentPage - 1)
      let end = Math.min(totalPages - 1, currentPage + 1)

      if (currentPage <= 2) {
        end = 3
      }
      if (currentPage >= totalPages - 1) {
        start = totalPages - 2
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
        )
      }

      if (currentPage < totalPages - 2) {
        buttons.push(ellipsis)
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
      )
    }

    return buttons
  }

  const otherFilters = [
    "Call Type",
    "Assistant Phone Number",
    "Metadata",
  ]

  return (
    <div>
      {/* Filters */}
      <div className="flex flex-wrap items-center gap-4 py-4">
        {/* Date and Time Filter */}
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className="flex items-center justify-between rounded-md border bg-[#1a1a1c] border-[#374151] px-3 py-2 text-sm text-white ring-offset-background placeholder:text-muted-foreground focus:border-[#5e17eb] focus:outline-none focus:ring-2 focus:ring-[#5e17eb] focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1 w-auto h-10"
            >
              <span className="pointer-events-none">
                {selectedDate ? format(selectedDate, "PPP") : "Date and Time"}
              </span>
              <CalendarIcon className="h-4 w-4 opacity-50 ml-2" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              initialFocus
            />
          </PopoverContent>
        </Popover>

        {/* Call ID Filter */}
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className="flex items-center justify-between rounded-md border bg-[#1a1a1c] border-[#374151] px-3 py-2 text-sm text-white ring-offset-background placeholder:text-muted-foreground focus:border-[#5e17eb] focus:outline-none focus:ring-2 focus:ring-[#5e17eb] focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1 w-auto h-10"
            >
              <span className="pointer-events-none">Call ID</span>
              <ChevronDown className="h-4 w-4 opacity-50 ml-2" />
            </Button>
          </PopoverTrigger>
          <PopoverContent>
            <Input
              placeholder="Search Call ID..."
              value={callId}
              onChange={(e) => setCallId(e.target.value)}
            />
          </PopoverContent>
        </Popover>

        {/* Cost Filter */}
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className="flex items-center justify-between rounded-md border bg-[#1a1a1c] border-[#374151] px-3 py-2 text-sm text-white ring-offset-background placeholder:text-muted-foreground focus:border-[#5e17eb] focus:outline-none focus:ring-2 focus:ring-[#5e17eb] focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1 w-auto h-10"
            >
              <span className="pointer-events-none">Cost</span>
              <ChevronDown className="h-4 w-4 opacity-50 ml-2" />
            </Button>
          </PopoverTrigger>
          <PopoverContent>
            <div className="space-y-2">
              <Input
                placeholder="Min Cost"
                type="number"
                value={minCost}
                onChange={(e) => setMinCost(e.target.value)}
              />
              <Input
                placeholder="Max Cost"
                type="number"
                value={maxCost}
                onChange={(e) => setMaxCost(e.target.value)}
              />
            </div>
          </PopoverContent>
        </Popover>

        {/* Success Evaluation Filter */}
        <Select onValueChange={setSuccessEvaluation} defaultValue="all">
          <SelectTrigger className="flex items-center justify-between rounded-md border bg-[#1a1a1c] border-[#374151] px-3 py-2 text-sm text-white ring-offset-background placeholder:text-muted-foreground focus:border-[#5e17eb] focus:outline-none focus:ring-2 focus:ring-[#5e17eb] focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1 w-auto h-10">
            <SelectValue placeholder="Success Evaluation" />
          </SelectTrigger>
          <SelectContent>
            {successOptions.map((option) => (
              <SelectItem key={option} value={option}>
                {option === "all" ? "All Evaluations" : option}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        
        {/* Ended Reason Filter */}
        <Select onValueChange={setEndedReason} defaultValue="all">
          <SelectTrigger className="flex items-center justify-between rounded-md border bg-[#1a1a1c] border-[#374151] px-3 py-2 text-sm text-white ring-offset-background placeholder:text-muted-foreground focus:border-[#5e17eb] focus:outline-none focus:ring-2 focus:ring-[#5e17eb] focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1 w-auto h-10">
            <SelectValue placeholder="Ended Reason" />
          </SelectTrigger>
          <SelectContent>
            {reasonOptions.map((option) => (
              <SelectItem key={option} value={option}>
                {option === "all" ? "All Reasons" : option}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Customer Phone Number Filter */}
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className="flex items-center justify-between rounded-md border bg-[#1a1a1c] border-[#374151] px-3 py-2 text-sm text-white ring-offset-background placeholder:text-muted-foreground focus:border-[#5e17eb] focus:outline-none focus:ring-2 focus:ring-[#5e17eb] focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1 w-auto h-10"
            >
              <span className="pointer-events-none">Customer Phone</span>
              <ChevronDown className="h-4 w-4 opacity-50 ml-2" />
            </Button>
          </PopoverTrigger>
          <PopoverContent>
            <Input
              placeholder="Search Phone..."
              value={customerPhone}
              onChange={(e) => setCustomerPhone(e.target.value)}
            />
          </PopoverContent>
        </Popover>

        {/* Other non-functional filters */}
        {otherFilters.map((label) => (
          <button
            key={label}
            type="button"
            role="combobox"
            aria-expanded="false"
            aria-autocomplete="none"
            dir="ltr"
            data-state="closed"
            className="flex items-center justify-between rounded-md border bg-[#1a1a1c] border-[#374151] px-3 py-2 text-sm text-white ring-offset-background placeholder:text-muted-foreground focus:border-[#5e17eb] focus:outline-none focus:ring-2 focus:ring-[#5e17eb] focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1 w-auto h-10"
          >
            <span className="pointer-events-none">{label}</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-chevron-down h-4 w-4 opacity-50 ml-2"
              aria-hidden="true"
            >
              <path d="m6 9 6 6 6-6"></path>
            </svg>
          </button>
        ))}
      </div>

      {/* Voice Calls Table */}
      <VoiceCallsTable calls={paginatedCalls} />

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
    </div>
  )
} 