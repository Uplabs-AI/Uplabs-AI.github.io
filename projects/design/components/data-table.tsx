"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import type { Call } from "@/lib/store"
import { Badge } from "@/components/ui/badge"
import { CheckCircle2, XCircle } from "lucide-react"

interface DataTableProps {
  calls: Call[]
}

export function DataTable({ calls }: DataTableProps) {
  return (
    <div className="rounded-md border border-[#1a1a1c] bg-[#000000]">
      <Table>
        <TableHeader className="bg-[#000000]">
          <TableRow className="border-b border-[#1a1a1c] hover:bg-[#1a1a1c]/50">
            <TableHead className="w-[40px] text-gray-400">
              <input type="checkbox" className="h-4 w-4" />
            </TableHead>
            <TableHead className="text-gray-400">ID de Llamada</TableHead>
            <TableHead className="text-gray-400">Asistente</TableHead>
            <TableHead className="text-gray-400">Número de Teléfono del Asistente</TableHead>
            <TableHead className="text-gray-400">Número de Teléfono del Cliente</TableHead>
            <TableHead className="text-gray-400">Motivo de Finalización</TableHead>
            <TableHead className="text-gray-400">Evaluación de Éxito</TableHead>
            <TableHead className="text-gray-400">Hora de Inicio</TableHead>
            <TableHead className="text-gray-400">Duración</TableHead>
            <TableHead className="text-gray-400">Costo</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {calls.map((call) => (
            <TableRow key={call.id} className="border-b border-[#1a1a1c] hover:bg-[#1a1a1c]/50">
              <TableCell>
                <input type="checkbox" className="h-4 w-4" />
              </TableCell>
              <TableCell className="font-mono text-xs">{call.id}</TableCell>
              <TableCell>{call.assistant}</TableCell>
              <TableCell className="font-mono text-xs">{call.assistantPhoneNumber}</TableCell>
              <TableCell>
                <div className="flex flex-col">
                  <span className="font-mono text-xs text-white">{call.clientPhoneNumber}</span>
                  <div className="flex items-center mt-1">
                    <span className="h-2 w-2 rounded-full bg-green-500 mr-2"></span>
                    <span className="text-xs text-gray-400">Entrante</span>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <Badge variant="outline" className="bg-[#d782ff]/10 text-[#d782ff] border-[#d782ff]/20">
                  {call.finalizationReason}
                </Badge>
              </TableCell>
              <TableCell>
                {call.status === "success" ? (
                  <Badge variant="outline" className="bg-[#82ff90]/10 text-[#82ff90] border-[#82ff90]/20">
                    <CheckCircle2 className="h-3 w-3 mr-1" />
                    {call.successEvaluation}
                  </Badge>
                ) : (
                  <Badge variant="outline" className="bg-[#d782ff]/10 text-[#d782ff] border-[#d782ff]/20">
                    <XCircle className="h-3 w-3 mr-1" />
                    {call.successEvaluation}
                  </Badge>
                )}
              </TableCell>
              <TableCell>{call.startTime}</TableCell>
              <TableCell>{call.duration}</TableCell>
              <TableCell>${call.cost.toFixed(2)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
