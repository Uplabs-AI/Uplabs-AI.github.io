import { create } from "zustand"

// Define types for our state
export interface Call {
  id: string
  assistant: string
  assistantPhoneNumber: string
  clientPhoneNumber: string
  finalizationReason: string
  successEvaluation: string
  startTime: string
  duration: string
  cost: number
  status: "success" | "failed"
}

export interface DashboardMetrics {
  totalCallMinutes: number
  numberOfCalls: number
  totalExpense: number
  averageCostPerCall: number
  balance: number
  totalCalls: number
  transferredCalls: number
  successfulCalls: number
  failedCalls: number
  totalCallsPercentChange: number
  transferredCallsPercentChange: number
  successfulCallsPercentChange: number
  failedCallsPercentChange: number
}

interface DashboardState {
  metrics: DashboardMetrics
  calls: Call[]
  isLoading: boolean
  error: string | null
  fetchDashboardData: () => Promise<void>
}

// Create the store
export const useDashboardStore = create<DashboardState>((set) => ({
  metrics: {
    totalCallMinutes: 378.46,
    numberOfCalls: 365,
    totalExpense: 42.23,
    averageCostPerCall: 0.11,
    balance: 158.77,
    totalCalls: 100,
    transferredCalls: 0,
    successfulCalls: 27,
    failedCalls: 7,
    totalCallsPercentChange: 12,
    transferredCallsPercentChange: 0,
    successfulCallsPercentChange: 15,
    failedCallsPercentChange: -3,
  },
  calls: [
    {
      id: "e83224fc-92e-",
      assistant: "Auto x Km (VERSION DE PRODUCCION)",
      assistantPhoneNumber: "3c8f9b6e-3c96-42b0-b326-891c02020447",
      clientPhoneNumber: "sip:7859284548@44.238.177.138:5060",
      finalizationReason: "Silencio Agotado",
      successEvaluation: "Aprobado",
      startTime: "25 Apr, 2025, 15:15",
      duration: "3m 17s",
      cost: 0.34,
      status: "success",
    },
    {
      id: "ba834c2-2f6-",
      assistant: "Auto x Km (VERSION DE PRODUCCION)",
      assistantPhoneNumber: "3c8f9b6e-3c96-42b0-b326-891c02020447",
      clientPhoneNumber: "sip:7859275508@44.223.228.186:5060",
      finalizationReason: "Silencio Agotado",
      successEvaluation: "Aprobado",
      startTime: "25 Apr, 2025, 11:26",
      duration: "2m 41s",
      cost: 0.27,
      status: "success",
    },
    {
      id: "2ab7b1de-c8e-",
      assistant: "Auto x Km (VERSION DE PRODUCCION)",
      assistantPhoneNumber: "3c8f9b6e-3c96-42b0-b326-891c02020447",
      clientPhoneNumber: "sip:7664558198@44.238.177.138:5060",
      finalizationReason: "Silencio Agotado",
      successEvaluation: "Fallido",
      startTime: "25 Apr, 2025, 11:16",
      duration: "2m 10s",
      cost: 0.18,
      status: "failed",
    },
    {
      id: "c1b7b684-5d3-",
      assistant: "Auto x Km (VERSION DE PRODUCCION)",
      assistantPhoneNumber: "3c8f9b6e-3c96-42b0-b326-891c02020447",
      clientPhoneNumber: "sip:7535672548@44.238.177.138:5060",
      finalizationReason: "Silencio Agotado",
      successEvaluation: "Fallido",
      startTime: "25 Apr, 2025, 11:05",
      duration: "2m 38s",
      cost: 0.21,
      status: "failed",
    },
    {
      id: "87bf4b78-5f5-",
      assistant: "Auto x Km (VERSION DE PRODUCCION)",
      assistantPhoneNumber: "3c8f9b6e-3c96-42b0-b326-891c02020447",
      clientPhoneNumber: "sip:8350986568@44.223.228.186:5060",
      finalizationReason: "Silencio Agotado",
      successEvaluation: "Fallido",
      startTime: "25 Apr, 2025, 10:33",
      duration: "2m 44s",
      cost: 0.25,
      status: "failed",
    },
    {
      id: "e8dbc57a-c81-",
      assistant: "Auto x Km (VERSION DE PRODUCCION)",
      assistantPhoneNumber: "3c8f9b6e-3c96-42b0-b326-891c02020447",
      clientPhoneNumber: "sip:8359595538@44.223.228.186:5060",
      finalizationReason: "Silencio Agotado",
      successEvaluation: "Fallido",
      startTime: "25 Apr, 2025, 09:37",
      duration: "2m 40s",
      cost: 0.23,
      status: "failed",
    },
    {
      id: "1ac3278c-741-",
      assistant: "Auto x Km (VERSION DE PRODUCCION)",
      assistantPhoneNumber: "3c8f9b6e-3c96-42b0-b326-891c02020447",
      clientPhoneNumber: "sip:7103843538@44.223.228.186:5060",
      finalizationReason: "Silencio Agotado",
      successEvaluation: "Aprobado",
      startTime: "25 Apr, 2025, 09:11",
      duration: "2m 35s",
      cost: 0.24,
      status: "success",
    },
    {
      id: "dc8eba5-c32-",
      assistant: "Auto x Km (VERSION DE PRODUCCION)",
      assistantPhoneNumber: "3c8f9b6e-3c96-42b0-b326-891c02020447",
      clientPhoneNumber: "sip:7739691138@44.223.228.186:5060",
      finalizationReason: "Silencio Agotado",
      successEvaluation: "Fallido",
      startTime: "25 Apr, 2025, 08:51",
      duration: "2m 8s",
      cost: 0.18,
      status: "failed",
    },
    {
      id: "11e0fe94-7ef-",
      assistant: "Auto x Km (VERSION DE PRODUCCION)",
      assistantPhoneNumber: "3c8f9b6e-3c96-42b0-b326-891c02020447",
      clientPhoneNumber: "sip:7163480238@44.223.228.186:5060",
      finalizationReason: "Silencio Agotado",
      successEvaluation: "Aprobado",
      startTime: "25 Apr, 2025, 08:31",
      duration: "2m 11s",
      cost: 0.19,
      status: "success",
    },
  ],
  isLoading: false,
  error: null,
  fetchDashboardData: async () => {
    set({ isLoading: true, error: null })
    try {
      // En una aplicación real, esto sería una llamada a la API
      // Por ahora, solo simulamos un retraso
      await new Promise((resolve) => setTimeout(resolve, 500))

      // Los datos ya están establecidos en el estado inicial
      set({ isLoading: false })
    } catch (error) {
      set({
        isLoading: false,
        error: error instanceof Error ? error.message : "An unknown error occurred",
      })
    }
  },
}))
