"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

export interface Knowledge {
  id: string
  title: string
  description: string
  category: string
  tags: string[]
  createdAt: string
  updatedAt: string
  active: boolean
  contentType: 'document' | 'text'
}

interface KnowledgebaseContextType {
  knowledgebase: Knowledge[]
  addKnowledge: (knowledge: Omit<Knowledge, "id" | "createdAt" | "updatedAt">) => void
  updateKnowledge: (id: string, updates: Partial<Knowledge>) => void
  deleteKnowledge: (id: string) => void
  toggleKnowledge: (id: string) => void
  resetToDefaults: () => void
  clearLocalStorage: () => void
}

const KnowledgebaseContext = createContext<KnowledgebaseContextType | undefined>(undefined)

const defaultKnowledgebase: Knowledge[] = [
  {
    id: "1",
    title: "Venta de Seguros",
    description: "Estrategias y scripts para vender seguros a clientes potenciales, incluyendo objeciones frecuentes y respuestas efectivas.",
    category: "Ventas",
    tags: ["seguros", "ventas", "scripts"],
    createdAt: "2024-07-15T10:00:00Z",
    updatedAt: "2024-07-15T10:00:00Z",
    active: true,
    contentType: "text",
  },
  {
    id: "2",
    title: "Generación de Leads Inmobiliarios",
    description: "Guía y respuestas frecuentes para captar leads interesados en propiedades inmobiliarias. Incluye ejemplos de mensajes iniciales y seguimiento.",
    category: "Leads",
    tags: ["inmobiliaria", "leads", "captación"],
    createdAt: "2024-07-15T11:00:00Z",
    updatedAt: "2024-07-15T11:00:00Z",
    active: true,
    contentType: "document",
  },
  {
    id: "3",
    title: "Seguimiento de Prospectos",
    description: "Proceso y mensajes recomendados para convertir prospectos en clientes, con ejemplos de secuencias de WhatsApp y llamadas.",
    category: "Ventas",
    tags: ["seguimiento", "prospectos", "conversion"],
    createdAt: "2024-07-15T12:00:00Z",
    updatedAt: "2024-07-15T12:00:00Z",
    active: true,
    contentType: "text",
  },
]

export function KnowledgebaseProvider({ children }: { children: React.ReactNode }) {
  const [knowledgebase, setKnowledgebase] = useState<Knowledge[]>([])
  const [isInitialized, setIsInitialized] = useState(false)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem("nps-vox-knowledgebase")
      if (saved) {
        try {
          const parsed = JSON.parse(saved)
          if (Array.isArray(parsed) && parsed.length > 0) {
            setKnowledgebase(parsed)
          } else {
            setKnowledgebase(defaultKnowledgebase)
            localStorage.setItem("nps-vox-knowledgebase", JSON.stringify(defaultKnowledgebase))
          }
        } catch {
          setKnowledgebase(defaultKnowledgebase)
          localStorage.setItem("nps-vox-knowledgebase", JSON.stringify(defaultKnowledgebase))
        }
      } else {
        setKnowledgebase(defaultKnowledgebase)
        localStorage.setItem("nps-vox-knowledgebase", JSON.stringify(defaultKnowledgebase))
      }
      setIsInitialized(true)
    }
  }, [])

  useEffect(() => {
    if (isInitialized && typeof window !== 'undefined') {
      localStorage.setItem("nps-vox-knowledgebase", JSON.stringify(knowledgebase))
    }
  }, [knowledgebase, isInitialized])

  const addKnowledge = (data: Omit<Knowledge, "id" | "createdAt" | "updatedAt">) => {
    const now = new Date().toISOString()
    const newKnowledge: Knowledge = {
      ...data,
      id: Date.now().toString(),
      createdAt: now,
      updatedAt: now,
    }
    setKnowledgebase((prev) => [newKnowledge, ...prev])
  }

  const updateKnowledge = (id: string, updates: Partial<Knowledge>) => {
    setKnowledgebase((prev) => prev.map((k) => (k.id === id ? { ...k, ...updates, updatedAt: new Date().toISOString() } : k)))
  }

  const deleteKnowledge = (id: string) => {
    setKnowledgebase((prev) => prev.filter((k) => k.id !== id))
  }

  const toggleKnowledge = (id: string) => {
    setKnowledgebase((prev) =>
      prev.map((k) =>
        k.id === id ? { ...k, active: !k.active, updatedAt: new Date().toISOString() } : k
      )
    )
  }

  const resetToDefaults = () => {
    setKnowledgebase(defaultKnowledgebase)
    if (typeof window !== 'undefined') {
      localStorage.setItem("nps-vox-knowledgebase", JSON.stringify(defaultKnowledgebase))
    }
  }

  const clearLocalStorage = () => {
    setKnowledgebase([])
    if (typeof window !== 'undefined') {
      localStorage.removeItem("nps-vox-knowledgebase")
    }
  }

  return (
    <KnowledgebaseContext.Provider
      value={{ knowledgebase, addKnowledge, updateKnowledge, deleteKnowledge, toggleKnowledge, resetToDefaults, clearLocalStorage }}
    >
      {children}
    </KnowledgebaseContext.Provider>
  )
}

export function useKnowledgebase() {
  const ctx = useContext(KnowledgebaseContext)
  if (!ctx) throw new Error("useKnowledgebase debe usarse dentro de KnowledgebaseProvider")
  return ctx
} 