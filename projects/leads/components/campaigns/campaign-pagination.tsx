"use client"

import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface CampaignPaginationProps {
  currentPage: number
  totalItems: number
  itemsPerPage: number
  onPageChange: (page: number) => void
  className?: string
}

export function CampaignPagination({
  currentPage,
  totalItems,
  itemsPerPage,
  onPageChange,
  className,
}: CampaignPaginationProps) {
  const totalPages = Math.ceil(totalItems / itemsPerPage)
  const startItem = (currentPage - 1) * itemsPerPage + 1
  const endItem = Math.min(currentPage * itemsPerPage, totalItems)

  return (
    <div className={`flex items-center justify-between ${className}`}>
      <div className="text-sm text-gray-400">
        Mostrando {startItem} a {endItem} de {totalItems} campañas
      </div>

      <div className="flex items-center space-x-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="border-[#374151] bg-transparent text-gray-400 hover:text-white hover:bg-[#374151] h-8 w-8 p-0"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>

        <Button size="sm" className="bg-[#7c3aed] hover:bg-[#7c3aed]/90 text-white h-8 w-8 p-0 text-sm">
          {currentPage}
        </Button>

        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="border-[#374151] bg-transparent text-gray-400 hover:text-white hover:bg-[#374151] h-8 w-8 p-0"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
