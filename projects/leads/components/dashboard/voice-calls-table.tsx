"use client"

import { useRouter } from "next/navigation"
import { Copy } from "lucide-react"
import StatusChip from '@/components/dashboard/status-chip'

interface VoiceCall {
  id: string
  campaign: string
  campaignId: string
  clientPhone: string
  finalizationReason: string
  successEvaluation: string
  startTime: string
  duration: string
  cost: string
  commercial_stage: string
  status: string
}

interface VoiceCallsTableProps {
  calls: VoiceCall[]
}

const getStatusClass = (status: string) => {
  switch (status) {
    case "Aprobado":
      return "bg-[#22c55e1a] text-[#22c55e] border-[#22c55e33]"
    case "Fallido":
      return "bg-[#ef44441a] text-[#ef4444] border-[#ef444433]"
    default:
      return "bg-[#d782ff1a] text-[#d782ff] border-[#d782ff33]"
  }
}

export function VoiceCallsTable({ calls }: VoiceCallsTableProps) {
  const router = useRouter()

  const handleRowClick = (callId: string) => {
    router.push(`/dashboard/call-recording?id=${callId}`)
  }

  const handleCopyToClipboard = (text: string, e: React.MouseEvent) => {
    e.stopPropagation()
    navigator.clipboard.writeText(text)
    // Add toast notification here
  }

  return (
    <div className="relative w-full overflow-auto">
      <table className="w-full caption-bottom text-sm">
        <thead className="[&_tr]:border-b bg-[#000000]">
          <tr className="transition-colors data-[state=selected]:bg-muted border-b border-[#1a1a1c] hover:bg-[#1a1a1c]/50">
            <th className="h-12 px-4 text-left align-middle font-medium text-gray-400 w-[40px]">
              <input className="h-4 w-4" type="checkbox" />
            </th>
            <th className="h-12 px-4 text-left align-middle font-medium text-gray-400">ID de Llamada</th>
            <th className="h-12 px-4 text-left align-middle font-medium text-gray-400">Campaña</th>
            <th className="h-12 px-4 text-left align-middle font-medium text-gray-400">Número de Teléfono del Cliente</th>
            <th className="h-12 px-4 text-left align-middle font-medium text-gray-400">Motivo de Finalización</th>
            <th className="h-12 px-4 text-left align-middle font-medium text-gray-400">Evaluación de Éxito</th>
            <th className="h-12 px-4 text-left align-middle font-medium text-gray-400">Flujo Comercial</th>
            <th className="h-12 px-4 text-left align-middle font-medium text-gray-400">Hora de Inicio</th>
            <th className="h-12 px-4 text-left align-middle font-medium text-gray-400">Duración</th>
            <th className="h-12 px-4 text-left align-middle font-medium text-gray-400">Costo</th>
          </tr>
        </thead>
        <tbody className="[&_tr:last-child]:border-0">
          {calls.map((call) => (
            <tr
              key={call.id}
              className="data-[state=selected]:bg-muted border-b border-[#1a1a1c] hover:bg-[#1a1a1c]/50 transition-colors duration-200 cursor-pointer"
              onClick={() => handleRowClick(call.id)}
            >
              <td className="p-4 align-middle">
                <input className="h-4 w-4" type="checkbox" onClick={(e) => e.stopPropagation()} />
              </td>
              <td className="p-4 align-middle">
                <div className="flex items-center gap-2">
                  <button
                    className="font-mono text-xs text-[#5e17eb] hover:text-[#7c3aed] hover:underline cursor-pointer"
                    onClick={(e) => handleCopyToClipboard(call.id, e)}
                  >
                    {call.id}
                  </button>
                  <Copy
                    className="h-3 w-3 text-gray-500 hover:text-gray-300 cursor-pointer"
                    onClick={(e) => handleCopyToClipboard(call.id, e)}
                  />
                </div>
              </td>
              <td className="p-4 align-middle">
                <div className="flex flex-col">
                  <div className="text-sm text-white font-medium">{call.campaign}</div>
                  <div className="text-xs text-gray-400 font-mono">{call.campaignId}</div>
                </div>
              </td>
              <td className="p-4 align-middle">
                <div className="flex flex-col">
                  <span className="font-mono text-xs text-white">{call.clientPhone}</span>
                  <div className="flex items-center mt-1">
                    <span className="h-2 w-2 rounded-full bg-green-500 mr-2"></span>
                    <span className="text-xs text-gray-400">Entrante</span>
                  </div>
                </div>
              </td>
              <td className="p-4 align-middle">
                <div className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold ${getStatusClass(call.finalizationReason)}`}>
                  {call.finalizationReason}
                </div>
              </td>
              <td className="p-4 align-middle">
                <div className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold ${getStatusClass(call.successEvaluation)}`}>
                  {call.successEvaluation}
                </div>
              </td>
              <td className="p-4 align-middle">
                <StatusChip text={call.commercial_stage} />
              </td>
              <td className="p-4 align-middle text-sm text-gray-300">{call.startTime}</td>
              <td className="p-4 align-middle text-sm text-gray-300">{call.duration}</td>
              <td className="p-4 align-middle text-sm text-gray-300">{call.cost}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
} 