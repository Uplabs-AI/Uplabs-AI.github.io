"use client"

import React, { useState } from 'react'
import { X, Check, Plus } from "lucide-react"
import { useBuyCreditsModal } from '../contexts/buy-credits-modal-context'

export default function BuyCreditsModal() {
  const {
    showBuyCreditsModal,
    selectedAmount,
    customAmount,
    isCustom,
    closeModal,
    handleAmountSelect,
    handleCustomAmount,
    setCustomAmount,
    handleConfirmPurchase,
  } = useBuyCreditsModal()

  // Estado local para mostrar el formulario de nueva tarjeta
  const [showNewCardForm, setShowNewCardForm] = useState(false)

  if (!showBuyCreditsModal) return null

  return (
    <>
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-black/50 z-40"
        onClick={closeModal}
      ></div>
      
      {/* Modal */}
      <div 
        role="dialog" 
        data-state="open"
        className="fixed left-[50%] top-[50%] z-50 grid w-full translate-x-[-50%] translate-y-[-50%] gap-4 border p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg bg-[#0A0A0A] border-[#1A1A1C] text-white max-w-md"
        tabIndex={-1}
      >
        {/* Header */}
        <div className="flex flex-col space-y-1.5 text-center sm:text-left">
          <h2 className="tracking-tight text-xl font-semibold text-white">Comprar más créditos</h2>
        </div>

        {/* Content */}
        <div className="space-y-6 pt-4">
          {/* Description */}
          <p className="text-gray-300 text-sm">
            Agregar créditos adicionales te permite pagar por uso de la plataforma más allá de tu límite de crédito mensual.{" "}
            <span className="font-medium">Los créditos adicionales expiran 1 año después de la compra.</span>
          </p>

          {/* Price Display */}
          <div className="text-center">
            <div className="text-4xl font-bold text-white mb-4">
              ${isCustom && customAmount ? customAmount : selectedAmount}.00
            </div>
          </div>

          {/* Amount Selection Buttons */}
          <div className="grid grid-cols-3 gap-3">
            {[30, 60, 100, 250, 500].map((amount) => (
              <button
                key={amount}
                onClick={() => handleAmountSelect(amount)}
                className={`px-4 py-2 rounded-md border text-sm font-medium transition-all ${
                  selectedAmount === amount && !isCustom
                    ? 'border-[#5E17EB] bg-[#5E17EB]/20 text-white'
                    : 'border-[#374151] text-gray-400 hover:text-white hover:border-[#5E17EB]/50'
                }`}
              >
                ${amount}
              </button>
            ))}
            <button
              onClick={handleCustomAmount}
              className={`px-4 py-2 rounded-md border text-sm font-medium transition-all ${
                isCustom
                  ? 'border-[#5E17EB] bg-[#5E17EB]/20 text-white'
                  : 'border-[#374151] text-gray-400 hover:text-white hover:border-[#5E17EB]/50'
              }`}
            >
              Custom
            </button>
          </div>

          {/* Custom Amount Input */}
          {isCustom && (
            <div className="space-y-2">
              <input
                type="number"
                placeholder="Ingresa el monto"
                value={customAmount}
                onChange={(e) => setCustomAmount(e.target.value)}
                className="flex h-10 w-full rounded-md border px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm bg-[#1A1A1C] border-[#374151] text-white placeholder-gray-400 focus:border-[#5E17EB] focus:ring-1 focus:ring-[#5E17EB]"
                min="1"
              />
            </div>
          )}

          {/* Payment Method */}
          <div className="space-y-3">
            {/* Tarjeta predeterminada */}
            {!showNewCardForm && (
              <>
                <div className="flex items-center justify-between p-3 bg-[#1A1A1C] border border-[#374151] rounded-md">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-6 bg-gradient-to-r from-blue-600 to-blue-800 rounded flex items-center justify-center">
                      <span className="text-white text-xs font-bold">••••</span>
                    </div>
                    <span className="text-white text-sm">•••• 5739</span>
                  </div>
                  <div className="w-5 h-5 bg-[#5E17EB] rounded-full flex items-center justify-center">
                    <Check className="w-3 h-3 text-white" />
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setShowNewCardForm(true)}
                  className="flex items-center gap-1 text-[#82ECFF] text-sm hover:text-[#82ECFF]/80 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  Usar otra tarjeta
                </button>
              </>
            )}

            {/* Formulario de nueva tarjeta */}
            {showNewCardForm && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="text"
                    placeholder="Número de tarjeta"
                    className="col-span-2 flex h-10 w-full rounded-md border px-3 py-2 text-sm bg-[#1A1A1C] border-[#374151] text-white placeholder-gray-400 focus:border-[#5E17EB] focus:ring-1 focus:ring-[#5E17EB]"
                    maxLength={19}
                  />
                  <input
                    type="text"
                    placeholder="MM/AA"
                    className="flex h-10 w-full rounded-md border px-3 py-2 text-sm bg-[#1A1A1C] border-[#374151] text-white placeholder-gray-400 focus:border-[#5E17EB] focus:ring-1 focus:ring-[#5E17EB]"
                    maxLength={5}
                  />
                  <input
                    type="text"
                    placeholder="CVC"
                    className="flex h-10 w-full rounded-md border px-3 py-2 text-sm bg-[#1A1A1C] border-[#374151] text-white placeholder-gray-400 focus:border-[#5E17EB] focus:ring-1 focus:ring-[#5E17EB]"
                    maxLength={4}
                  />
                </div>
                <div className="flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setShowNewCardForm(false)}
                    className="text-gray-400 hover:text-white text-sm transition-colors"
                  >
                    Cancelar
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowNewCardForm(false)}
                    className="bg-[#5E17EB] hover:bg-[#5E17EB]/90 text-white text-sm rounded-md px-4 py-2"
                  >
                    Guardar tarjeta
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3 pt-6">
          <button 
            onClick={closeModal}
            className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border bg-background h-10 px-4 py-2 border-[#374151] text-gray-400 hover:text-white hover:bg-[#374151]"
          >
            Cancelar
          </button>
          <button 
            onClick={handleConfirmPurchase}
            disabled={isCustom && (!customAmount || parseFloat(customAmount) <= 0)}
            className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 h-10 px-4 py-2 bg-[#5E17EB] hover:bg-[#5E17EB]/90 text-white disabled:bg-gray-600 disabled:text-gray-400"
          >
            Confirmar y Pagar
          </button>
        </div>

        {/* Close Button */}
        <button 
          type="button" 
          onClick={closeModal}
          className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </button>
      </div>
    </>
  )
} 