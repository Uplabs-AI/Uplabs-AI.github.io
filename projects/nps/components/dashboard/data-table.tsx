"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { ArrowDownIcon, ArrowRightIcon, ArrowUpIcon, ChevronLeft, ChevronRight, Copy, User, XCircle } from "lucide-react"
import { useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import Image from "next/image"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"

interface DataTableProps {
  className?: string
  calls: any[]
}

export function DataTable({ className, calls }: DataTableProps) {
  const router = useRouter()

  const handleCallIdClick = (fullId: string) => {
    router.push(`/dashboard/call-recording?id=${fullId}`)
  }

  return (
    <div className="relative w-full overflow-auto">
      <table className="w-full caption-bottom text-sm">
        <thead className="[&_tr]:border-b bg-[#000000]">
          <tr className="transition-colors data-[state=selected]:bg-muted border-b border-[#1a1a1c] hover:bg-[#1a1a1c]/50">
            <th className="h-12 px-4 text-left align-middle font-medium [&:has([role=checkbox])]:pr-0 w-[40px] text-gray-400"><input className="h-4 w-4" type="checkbox" /></th>
            <th className="h-12 px-4 text-left align-middle font-medium [&:has([role=checkbox])]:pr-0 text-gray-400">ID de Llamada</th>
            <th className="h-12 px-4 text-left align-middle font-medium [&:has([role=checkbox])]:pr-0 text-gray-400">Campaña</th>
            <th className="h-12 px-4 text-left align-middle font-medium [&:has([role=checkbox])]:pr-0 text-gray-400">Número de Teléfono del Cliente</th>
            <th className="h-12 px-4 text-left align-middle font-medium [&:has([role=checkbox])]:pr-0 text-gray-400">Motivo de Finalización</th>
            <th className="h-12 px-4 text-left align-middle font-medium [&:has([role=checkbox])]:pr-0 text-gray-400">Evaluación de Éxito</th>
            <th className="h-12 px-4 text-left align-middle font-medium [&:has([role=checkbox])]:pr-0 text-gray-400">Hora de Inicio</th>
            <th className="h-12 px-4 text-left align-middle font-medium [&:has([role=checkbox])]:pr-0 text-gray-400">Duración</th>
            <th className="h-12 px-4 text-left align-middle font-medium [&:has([role=checkbox])]:pr-0 text-gray-400">Costo</th>
          </tr>
        </thead>
        <tbody className="[&_tr:last-child]:border-0">
          {calls.map((call) => (
            <tr className="data-[state=selected]:bg-muted border-b border-[#1a1a1c] hover:bg-[#1a1a1c]/50 transition-colors duration-200 cursor-pointer" key={call.fullId} onClick={() => handleCallIdClick(call.fullId)}>
              <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0"><input className="h-4 w-4" type="checkbox" onClick={(e) => e.stopPropagation()} /></td>
              <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0"><div className="flex items-center gap-2"><button className="font-mono text-xs text-[#5e17eb] hover:text-[#7c3aed] hover:underline cursor-pointer" onClick={(e) => { e.stopPropagation(); handleCallIdClick(call.fullId); }}>{call.fullId ? call.fullId.substring(0, 10) + '...' : ''}</button><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-copy h-3 w-3 text-gray-500 hover:text-gray-300 cursor-pointer" onClick={(e) => { e.stopPropagation(); if (typeof navigator !== 'undefined' && navigator.clipboard) { navigator.clipboard.writeText(call.fullId); } }}><rect width="14" height="14" x="8" y="8" rx="2" ry="2"></rect><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"></path></svg></div></td>
              <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0"><div className="flex flex-col"><div className="text-sm text-white font-medium">{call.assistant}</div><div className="text-xs text-gray-400 font-mono">{call.assistantSubtext}</div></div></td>
              <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0"><div className="flex flex-col"><span className="font-mono text-xs text-white">{call.clientPhoneNumber}</span><div className="flex items-center mt-1"><span className="h-2 w-2 rounded-full bg-green-500 mr-2"></span><span className="text-xs text-gray-400">Entrante</span></div></div></td>
              <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0"><div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2" style={{backgroundColor: "#d782ff1a", color: "#d782ff", borderColor: "#d782ff33"}}>{call.finalizationReason}</div></td>
              <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0">{call.successType === "approved" ? (<div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2" style={{backgroundColor: "#22c55e1a", color: "#22c55e", borderColor: "#22c55e33"}}>Aprobado</div>) : (<div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2" style={{backgroundColor: "#ef44441a", color: "#ef4444", borderColor: "#ef444433"}}>Fallido</div>)}</td>
              <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0 text-sm text-gray-300">{call.startTime}</td>
              <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0 text-sm text-gray-300">{call.duration}</td>
              <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0 text-sm text-gray-300">{call.cost}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
