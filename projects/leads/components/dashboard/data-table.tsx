"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { ArrowDownIcon, ArrowRightIcon, ArrowUpIcon, ChevronLeft, ChevronRight, Copy, User, XCircle } from "lucide-react"
import { useRouter, usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import Image from "next/image"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { format } from "date-fns"
import StatusChip from "./status-chip"

interface DataTableProps {
  className?: string
  calls: any[]
  forceNavigationPath?: string // Añadir la propiedad opcional
}

export function DataTable({ className, calls, forceNavigationPath }: DataTableProps) {
  const router = useRouter()
  const pathname = usePathname()

  // Función de navegación unificada
  const handleContactClick = (call: any) => {
    let basePath: string;

    // 1. Si se fuerza una ruta, se usa esa. Es la máxima prioridad.
    if (forceNavigationPath) {
      basePath = forceNavigationPath;
    } 
    // 2. Si no, se usa la lógica anterior basada en el tipo de contacto.
    else {
      basePath = call.lastContactType === "Llamada" ? "/dashboard/call-recording" : "/dashboard/call-recording-and-text"
    }
    
    router.push(`${basePath}?id=${call.fullId}`)
  }

  return (
    <div className="relative w-full overflow-auto">
      <table className="w-full caption-bottom text-sm">
        <thead className="[&_tr]:border-b bg-[#000000]">
          <tr className="transition-colors data-[state=selected]:bg-muted border-b border-[#1a1a1c] hover:bg-[#1a1a1c]/50">
            <th className="h-12 px-4 text-left align-middle font-medium [&:has([role=checkbox])]:pr-0 w-[40px] text-gray-400"><input className="h-4 w-4" type="checkbox" /></th>
            <th className="h-12 px-4 text-left align-middle font-medium [&:has([role=checkbox])]:pr-0 text-gray-400">Nombre de Contacto</th>
            <th className="h-12 px-4 text-left align-middle font-medium [&:has([role=checkbox])]:pr-0 text-gray-400">Campaña</th>
            <th className="h-12 px-4 text-left align-middle font-medium [&:has([role=checkbox])]:pr-0 text-gray-400">Número de Teléfono del Cliente</th>
            <th className="h-12 px-4 text-left align-middle font-medium [&:has([role=checkbox])]:pr-0 text-gray-400">Estado Comercial</th>
            <th className="h-12 px-4 text-left align-middle font-medium [&:has([role=checkbox])]:pr-0 text-gray-400">Último Contacto</th>
            <th className="h-12 px-4 text-left align-middle font-medium [&:has([role=checkbox])]:pr-0 text-gray-400">Fecha de Inicio</th>
            <th className="h-12 px-4 text-left align-middle font-medium [&:has([role=checkbox])]:pr-0 text-gray-400">Estado</th>
            <th className="h-12 px-4 text-left align-middle font-medium [&:has([role=checkbox])]:pr-0 text-gray-400">Costo</th>
          </tr>
        </thead>
        <tbody className="[&_tr:last-child]:border-0">
          {calls.map((call) => (
            <tr className="data-[state=selected]:bg-muted border-b border-[#1a1a1c] hover:bg-[#1a1a1c]/50 transition-colors duration-200 cursor-pointer" key={call.fullId} onClick={() => handleContactClick(call)}>
              <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0"><input className="h-4 w-4" type="checkbox" onClick={(e) => e.stopPropagation()} /></td>
              <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0">
                <div className="flex items-center gap-2">
                  <span className="text-white">{call.contactName}</span>
                </div>
              </td>
              <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0"><div className="flex flex-col"><div className="text-sm text-white font-medium">{call.assistant}</div><div className="text-xs text-gray-400 font-mono">{call.assistantSubtext}</div></div></td>
              <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0"><div className="flex flex-col"><span className="font-mono text-xs text-white">{call.clientPhoneNumber}</span><div className="flex items-center mt-1"><span className="h-2 w-2 rounded-full bg-green-500 mr-2"></span><span className="text-xs text-gray-400">Entrante</span></div></div></td>
              <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0">
                <StatusChip text={call.commercial_stage} />
              </td>
              <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0">
                <div 
                  className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                  style={{
                    backgroundColor: call.lastContactType === "Llamada" ? "#22c55e1a" : "#d782ff1a",
                    color: call.lastContactType === "Llamada" ? "#22c55e" : "#d782ff",
                    borderColor: call.lastContactType === "Llamada" ? "#22c55e33" : "#d782ff33"
                  }}
                >
                  {call.lastContactType}
                </div>
              </td>
              <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0 text-sm text-gray-300">{call.startTime}</td>
              <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0">
                <Badge
                  variant="outline"
                  className={`text-xs font-medium ${
                    call.progressStatus === "Realizado"
                      ? "bg-[#1c3c29] text-[#22c55e] border-[#22c55e33]"
                      : "bg-[#261d2a] text-[#d782ff] border-[#d782ff33]"
                  }`}
                >
                  {call.progressStatus}
                </Badge>
              </td>
              <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0 text-sm text-gray-300">{call.cost}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
