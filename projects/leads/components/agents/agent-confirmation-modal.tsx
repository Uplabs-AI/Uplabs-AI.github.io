"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { X } from "lucide-react"

interface AgentConfirmationModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  agentName: string
  action: "activate" | "deactivate"
}

export function AgentConfirmationModal({ isOpen, onClose, onConfirm, agentName, action }: AgentConfirmationModalProps) {
  const [confirmationText, setConfirmationText] = useState("")

  const isActivating = action === "activate"
  const requiredText = isActivating ? "Activar" : "Desactivar"
  const title = isActivating ? "Activar agente" : "Desactivar agente"
  const question = isActivating
    ? `¿Estás seguro de que deseas activar al agente: ${agentName}?`
    : `¿Estás seguro de que deseas desactivar al agente: ${agentName}?`

  const isConfirmationValid = confirmationText === requiredText

  const handleConfirm = () => {
    if (isConfirmationValid) {
      onConfirm()
      setConfirmationText("")
      onClose()
    }
  }

  const handleClose = () => {
    setConfirmationText("")
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="fixed left-[50%] top-[50%] z-50 grid w-full translate-x-[-50%] translate-y-[-50%] gap-4 border p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg bg-[#0A0A0A] border-[#1A1A1C] text-white max-w-md">
        {/* Header */}
        <div className="flex flex-col space-y-1.5 text-center sm:text-left">
          <DialogTitle className="tracking-tight text-xl font-semibold text-white">{title}</DialogTitle>
        </div>

        {/* Content */}
        <div className="space-y-4 pt-4">
          <p className="text-gray-300">{question}</p>

          <div className="space-y-2">
            <label
              htmlFor="confirmation-text"
              className="peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-sm font-medium text-gray-300"
            >
              Escribe "{requiredText}"
            </label>
            <input
              id="confirmation-text"
              type="text"
              value={confirmationText}
              onChange={(e) => setConfirmationText(e.target.value)}
              placeholder={requiredText}
              className="flex h-10 w-full rounded-md border px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 bg-[#1A1A1C] border-[#374151] text-white placeholder-gray-400 focus:border-[#5E17EB] focus:ring-1 focus:ring-[#5E17EB]"
            />
          </div>

          <p className="text-sm text-gray-400">Esta acción es para brindarte mayor control</p>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3 pt-6">
          <button
            onClick={handleClose}
            className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border bg-background h-10 px-4 py-2 border-[#374151] text-gray-400 hover:text-white hover:bg-[#374151]"
          >
            Cancelar
          </button>
          <button
            onClick={handleConfirm}
            disabled={!isConfirmationValid}
            className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 h-10 px-4 py-2 bg-[#5E17EB] hover:bg-[#5E17EB]/90 text-white"
          >
            {requiredText}
          </button>
        </div>

        {/* Close button */}
        <button
          type="button"
          onClick={handleClose}
          className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </button>
      </DialogContent>
    </Dialog>
  )
}
