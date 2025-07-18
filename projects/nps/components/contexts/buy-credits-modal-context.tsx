"use client"

import React, { createContext, useContext, useState, ReactNode } from 'react'

// Tipos para el contexto
interface BuyCreditsModalContextType {
  // Estados del modal
  showBuyCreditsModal: boolean
  selectedAmount: number
  customAmount: string
  isCustom: boolean
  
  // Funciones para controlar el modal
  openModal: () => void
  closeModal: () => void
  handleAmountSelect: (amount: number) => void
  handleCustomAmount: () => void
  setCustomAmount: (amount: string) => void
  handleConfirmPurchase: () => void
}

// Crear el contexto
const BuyCreditsModalContext = createContext<BuyCreditsModalContextType | undefined>(undefined)

// Hook personalizado para usar el contexto
export const useBuyCreditsModal = () => {
  const context = useContext(BuyCreditsModalContext)
  if (context === undefined) {
    throw new Error('useBuyCreditsModal must be used within a BuyCreditsModalProvider')
  }
  return context
}

// Props del Provider
interface BuyCreditsModalProviderProps {
  children: ReactNode
}

// Provider del contexto
export const BuyCreditsModalProvider: React.FC<BuyCreditsModalProviderProps> = ({ children }) => {
  // Estados del modal
  const [showBuyCreditsModal, setShowBuyCreditsModal] = useState(false)
  const [selectedAmount, setSelectedAmount] = useState(100)
  const [customAmount, setCustomAmount] = useState('')
  const [isCustom, setIsCustom] = useState(false)

  // Funciones para controlar el modal
  const openModal = () => {
    setShowBuyCreditsModal(true)
  }

  const closeModal = () => {
    setShowBuyCreditsModal(false)
    // Reset states when closing
    setSelectedAmount(100)
    setCustomAmount('')
    setIsCustom(false)
  }

  const handleAmountSelect = (amount: number) => {
    setSelectedAmount(amount)
    setIsCustom(false)
    setCustomAmount('')
  }

  const handleCustomAmount = () => {
    setIsCustom(true)
    setSelectedAmount(0)
  }

  const handleConfirmPurchase = () => {
    const finalAmount = isCustom ? parseFloat(customAmount) : selectedAmount
    console.log('Comprando créditos por:', finalAmount)
    // Aquí iría la lógica de compra
    closeModal()
  }

  // Valor del contexto
  const value: BuyCreditsModalContextType = {
    // Estados
    showBuyCreditsModal,
    selectedAmount,
    customAmount,
    isCustom,
    
    // Funciones
    openModal,
    closeModal,
    handleAmountSelect,
    handleCustomAmount,
    setCustomAmount,
    handleConfirmPurchase,
  }

  return (
    <BuyCreditsModalContext.Provider value={value}>
      {children}
    </BuyCreditsModalContext.Provider>
  )
} 