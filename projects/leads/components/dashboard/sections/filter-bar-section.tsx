"use client"

import { useEffect, useState } from "react"
import { useDashboardStore } from "@/lib/stores/dashboard-store"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import { Check, ChevronsUpDown, Calendar as CalendarIcon } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import { format } from "date-fns"
import { cn } from "@/lib/utils"

export const FilterBarSection = () => {
  const {
    // State
    campaigns,
    surveys,
    assistants,
    selectedCampaign,
    selectedSurvey,
    selectedAssistant,
    isLoadingCampaigns,
    isLoadingSurveys,
    isLoadingAssistants,
    // Actions
    fetchCampaigns,
    setSelectedCampaign,
    setSelectedSurvey,
    setSelectedAssistant,
  } = useDashboardStore()

  // Local state for date range
  const [dateFrom, setDateFrom] = useState<Date | undefined>()
  const [dateTo, setDateTo] = useState<Date | undefined>()

  useEffect(() => {
    fetchCampaigns()
  }, [fetchCampaigns])

  const selectedCampaignName = campaigns.find(c => c.id === selectedCampaign)?.name || "Todas las Campañas"
  const selectedSurveyName = surveys.find(s => s.id === selectedSurvey)?.name || "Flujo Comercial"
  const selectedAssistantName = assistants.find(a => a.id === selectedAssistant)?.name || "Asistente"

  return (
    <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
      <div className="flex flex-wrap items-center gap-4">
        {/* Campaigns Filter */}
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              className="w-auto min-w-[180px] justify-between bg-[#1a1a1c] border-[#374151] hover:bg-[#1a1a1c]/80 h-10"
            >
              {selectedCampaignName}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[200px] p-0 bg-[#1a1a1c] border-[#374151] text-white">
            <Command>
              <CommandInput placeholder="Buscar campaña..." />
              <CommandList>
                {isLoadingCampaigns ? (
                  <div className="p-2 text-sm text-center text-gray-400">Cargando campañas...</div>
                ) : (
                  <>
                    <CommandEmpty>No se encontraron campañas.</CommandEmpty>
                    <CommandGroup>
                      <CommandItem
                        onSelect={() => setSelectedCampaign(null)}
                        className="cursor-pointer"
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            !selectedCampaign ? "opacity-100" : "opacity-0"
                          )}
                        />
                        Todas las Campañas
                      </CommandItem>
                      {campaigns.map((campaign) => (
                        <CommandItem
                          key={campaign.id}
                          value={campaign.name}
                          onSelect={() => setSelectedCampaign(campaign.id)}
                          className="cursor-pointer"
                        >
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              selectedCampaign === campaign.id ? "opacity-100" : "opacity-0"
                            )}
                          />
                          {campaign.name}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </>
                )}
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </div>

      {/* Date Range Buttons with Calendar Popovers */}
      <div className="flex items-center gap-4">
        {/* Fecha Desde */}
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="inline-flex items-center gap-2 whitespace-nowrap rounded-md text-sm ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border h-10 px-4 py-2 w-40 justify-start text-left font-normal bg-[#1A1A1C] border-[#374151] text-white hover:bg-[#2a2a2c] focus:border-[#5E17EB] focus:ring-1 focus:ring-[#5E17EB] pr-10"
            >
              <CalendarIcon className="mr-2 h-4 w-4 text-gray-400" />
              {dateFrom ? format(dateFrom, "dd/MM/yyyy") : "Fecha Desde"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0 bg-[#1a1a1c] border-[#374151]" align="start" side="bottom" sideOffset={8}>
            <Calendar
              mode="single"
              selected={dateFrom}
              onSelect={(date) => setDateFrom(date)}
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
              className="inline-flex items-center gap-2 whitespace-nowrap rounded-md text-sm ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border h-10 px-4 py-2 w-40 justify-start text-left font-normal bg-[#1A1A1C] border-[#374151] text-white hover:bg-[#2a2a2c] focus:border-[#5E17EB] focus:ring-1 focus:ring-[#5E17EB] pr-10"
            >
              <CalendarIcon className="mr-2 h-4 w-4 text-gray-400" />
              {dateTo ? format(dateTo, "dd/MM/yyyy") : "Fecha Hasta"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0 bg-[#1a1a1c] border-[#374151]" align="start" side="bottom" sideOffset={8}>
            <Calendar
              mode="single"
              selected={dateTo}
              onSelect={(date) => setDateTo(date)}
              initialFocus
              className="text-white"
            />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  )
} 