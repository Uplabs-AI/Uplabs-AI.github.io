"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Calendar, Edit, TestTube, Trash2, Play, Pause } from "lucide-react"
import type { Campaign } from "@/lib/types/campaign"
import Link from "next/link"

interface CampaignTableProps {
  campaigns: Campaign[]
  onToggleStatus: (id: string) => void
  onDelete: (id: string) => void
  className?: string
}

export function CampaignTable({ campaigns, onToggleStatus, onDelete, className }: CampaignTableProps) {
  const getStatusBadge = (status: Campaign["status"]) => {
    switch (status) {
      case "completed":
        return (
          <Badge className="bg-gray-500 hover:bg-gray-500 text-white border-0 px-3 py-1 rounded-full text-xs font-medium">
            Completada
          </Badge>
        )
      case "active":
        return (
          <Badge className="bg-green-500 hover:bg-green-500 text-white border-0 px-3 py-1 rounded-full text-xs font-medium">
            Activo
          </Badge>
        )
      case "paused":
        return (
          <Badge className="bg-orange-500 hover:bg-orange-500 text-white border-0 px-3 py-1 rounded-full text-xs font-medium">
            Pausada
          </Badge>
        )
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const getActionButton = (campaign: Campaign) => {
    if (campaign.status === "active") {
      return (
        <Button
          size="sm"
          className="bg-[#7c3aed] hover:bg-[#7c3aed]/90 text-white px-4 py-1 h-7 text-xs font-medium rounded-md"
          onClick={() => onToggleStatus(campaign.id)}
        >
          <Pause className="h-3 w-3 mr-1" />
          PAUSAR
        </Button>
      )
    }

    return (
      <Button
        size="sm"
        className="bg-[#7c3aed] hover:bg-[#7c3aed]/90 text-white px-4 py-1 h-7 text-xs font-medium rounded-md"
        onClick={() => onToggleStatus(campaign.id)}
      >
        <Play className="h-3 w-3 mr-1" />
        INICIAR
      </Button>
    )
  }

  if (!campaigns || campaigns.length === 0) {
    return (
      <div className="w-full p-8 text-center text-gray-400">
        <p>No hay campañas disponibles</p>
      </div>
    )
  }

  return (
    <div className={`w-full overflow-hidden ${className}`}>
      <div className="w-full border border-[#374151] rounded-lg bg-[#1f2937]">
        <Table>
          <TableHeader>
            <TableRow className="border-b border-[#374151] hover:bg-transparent">
              <TableHead className="text-gray-400 font-normal text-sm h-12 px-4 bg-[#1f2937]">
                Nombre de Campaña
              </TableHead>
              <TableHead className="text-gray-400 font-normal text-sm h-12 px-4 bg-[#1f2937]">Agente</TableHead>
              <TableHead className="text-gray-400 font-normal text-sm h-12 px-4 bg-[#1f2937]">Fecha Inicio</TableHead>
              <TableHead className="text-gray-400 font-normal text-sm h-12 px-4 bg-[#1f2937]">Fecha Final</TableHead>
              <TableHead className="text-gray-400 font-normal text-sm h-12 px-4 bg-[#1f2937]">Listas</TableHead>
              <TableHead className="text-gray-400 font-normal text-sm h-12 px-4 bg-[#1f2937]">Estado</TableHead>
              <TableHead className="text-gray-400 font-normal text-sm h-12 px-4 bg-[#1f2937]">Activar/Pausar</TableHead>
              <TableHead className="text-gray-400 font-normal text-sm h-12 px-4 bg-[#1f2937]">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {campaigns.map((campaign) => (
              <TableRow
                key={campaign.id}
                className="border-b border-[#374151] hover:bg-[#374151]/30 transition-colors duration-200 h-16 bg-[#1f2937]"
              >
                <TableCell className="font-normal px-4 text-sm">
                  <Link href={`/campaigns/edit/${campaign.id}`} className="text-white hover:underline hover:text-[#5E17EB] transition-colors">
                    {campaign.name}
                  </Link>
                </TableCell>
                <TableCell className="text-gray-300 px-4 text-sm">{campaign.agent}</TableCell>
                <TableCell className="text-gray-300 px-4 text-sm">
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-2 text-gray-400" />
                    {campaign.startDate}
                  </div>
                </TableCell>
                <TableCell className="text-gray-300 px-4 text-sm">
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-2 text-gray-400" />
                    {campaign.endDate}
                  </div>
                </TableCell>
                <TableCell className="px-4">
                  <div className="flex flex-wrap gap-1">
                    {campaign.segment.map((seg, index) => (
                      <Badge
                        key={index}
                        style={{ backgroundColor: seg.color }}
                        className="text-white border-0 px-2 py-1 text-xs font-medium rounded-md hover:opacity-90"
                      >
                        {seg.label}
                      </Badge>
                    ))}
                  </div>
                </TableCell>
                <TableCell className="px-4">{getStatusBadge(campaign.status)}</TableCell>
                <TableCell className="px-4">
                  <Switch
                    checked={campaign.isActive}
                    onCheckedChange={() => onToggleStatus(campaign.id)}
                    className="data-[state=checked]:bg-brand-cyan data-[state=unchecked]:bg-brand-gray-dark scale-90"
                  />
                </TableCell>
                <TableCell className="px-4">
                  <div className="flex items-center space-x-2">
                    {getActionButton(campaign)}
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-brand-gray-dark text-gray-400 hover:text-white hover:bg-brand-gray-dark px-3 py-1 h-7 text-xs rounded-md"
                    >
                      <TestTube className="h-3 w-3 mr-1" />
                      Testear
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      asChild
                      className="text-gray-400 hover:text-white hover:bg-brand-gray-dark p-1 h-7 w-7 rounded-md"
                    >
                      <Link href={`/campaigns/edit/${campaign.id}`}>
                        <Edit className="h-3 w-3" />
                      </Link>
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => onDelete(campaign.id)}
                      className="text-gray-400 hover:text-red-400 hover:bg-red-900/20 p-1 h-7 w-7 rounded-md"
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
