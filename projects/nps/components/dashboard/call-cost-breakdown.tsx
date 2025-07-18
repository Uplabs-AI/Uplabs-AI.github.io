import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DollarSign } from "lucide-react"

export function CallCostBreakdown() {
  return (
    <Card className="bg-[#0a0a0a] border-[#1a1a1c]">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-white flex items-center gap-2">
          <DollarSign className="h-4 w-4" />
          Costo de llamada
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="space-y-2 text-gray-300">
          <p className="text-sm">Información de costo de llamada...</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Costo total: 0.4 USD</li>
            <li>Costo por minuto: 0.3 USD</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  )
}
