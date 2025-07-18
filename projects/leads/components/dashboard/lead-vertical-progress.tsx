import React from "react"
import { Badge } from "@/components/ui/badge"

interface Phase {
  id: number
  status: string
  contactType: "Llamada" | "Mensaje"
}

const LEAD_STEPS = [
  {
    label: "Nuevos Lead",
    description: "Registro inicial de un potencial cliente.",
    color: "#897FD2",
  },
  {
    label: "Primer Mensaje Enviado",
    description: "Inicio de la comunicación con el lead.",
    color: "#AA89FA",
  },
  {
    label: "Seguimiento 1 (60 min)",
    description: "Primer recordatorio o información adicional.",
    color: "#FF89ED",
  },
  {
    label: "Seguimiento 2 (24 hrs)",
    description: "Segundo contacto para mantener el interés.",
    color: "#89FAB7",
  },
  {
    label: "Seguimiento 3 (7 días)",
    description: "Último intento de contacto antes de cambiar el estado.",
    color: "#A370FF",
  },
  {
    label: "En Conversión",
    description: "El lead está activamente en proceso de negociación o cierre.",
    color: "#6AB7FF",
  },
  {
    label: "No Respondió",
    description: "El lead no ha respondido a los intentos de contacto.",
    color: "#9CA3AF",
  },
  {
    label: "No Interesados",
    description: "El lead ha indicado que no tiene interés en la oferta.",
    color: "#9CA3AF",
  },
  {
    label: "Interesados",
    description: "El lead ha mostrado un claro interés en la propuesta.",
    color: "#7E22CE",
  },
  {
    label: "Ganada",
    description: "¡Felicidades! El lead se ha convertido en cliente.",
    color: "#A370FF",
  },
  {
    label: "Perdida",
    description: "El lead no se convirtió en cliente.",
    color: "#9CA3AF",
  },
]

export function LeadVerticalProgress({ phases }: { phases: Phase[] }) {
  return (
    <div className="relative max-w-xl mx-auto py-8">
      {/* Línea vertical */}
      <div className="absolute left-4 top-0 bottom-0 w-1 bg-[#ad82ff] rounded-full" style={{zIndex:0}} />
      <div className="space-y-8 relative z-10">
        {LEAD_STEPS.map((step, idx) => {
          // Buscar el tipo de contacto real para esta etapa si existe en phases
          const phase = phases?.find(p => p.id === idx + 1)
          return (
            <div key={step.label} className="relative pl-12">
              <div
                className={"absolute left-0 top-0 mt-1 w-8 h-8 rounded-full flex items-center justify-center font-bold shadow-md text-white"}
                style={{ backgroundColor: step.color }}
              >
                {idx+1}
              </div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl">{step.label}</h3>
                {phase && (
                  <Badge
                    variant="outline"
                    className={
                      phase.contactType === "Llamada"
                        ? "bg-[#22c55e1a] text-[#22c55e] border-[#22c55e33] text-xs font-medium"
                        : "bg-[#d782ff1a] text-[#d782ff] border-[#d782ff33] text-xs font-medium"
                    }
                  >
                    {phase.contactType}
                  </Badge>
                )}
              </div>
              <p className="text-gray-400 text-sm">{step.description}</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default LeadVerticalProgress 