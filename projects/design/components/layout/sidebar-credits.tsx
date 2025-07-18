import { Button } from "@/components/ui/button"
import { useCreditStore } from "@/lib/stores/credit-store"
import { useBuyCreditsModal } from "../contexts/buy-credits-modal-context"

export default function SidebarCredits() {
  const { credits, addCredits } = useCreditStore()
  const { openModal } = useBuyCreditsModal()
  const isActive = credits > 0

  return (
    <div className="space-y-3">
      {/* Status + credits */}
      <div className="flex items-center justify-between text-sm">
        <div className="flex items-center gap-2">
          <span
            className={`inline-flex w-3 h-3 rounded-full ${isActive ? "bg-[#22c55e]" : "bg-red-500"}`}
          />
          <span className="text-[#9ca3af]">{isActive ? "Activo" : "Inactivo"}</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="text-white font-bold text-base">{credits}</span>
          <span className="text-[#9ca3af]">Créditos</span>
        </div>
      </div>

      {/* Buy credits button */}
      <Button
        size="sm"
        className="w-full bg-[#5e17eb] hover:bg-[#5e17eb]/90 text-white rounded-md h-5"
        onClick={openModal}
      >
        Comprar Créditos
      </Button>
    </div>
  )
} 