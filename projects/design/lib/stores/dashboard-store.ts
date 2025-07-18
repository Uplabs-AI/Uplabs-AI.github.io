import { create } from "zustand"
import type { DashboardMetrics, Call } from "@/lib/types"
import { dashboardService } from "@/lib/services/dashboard-service"

interface DashboardState {
  metrics: DashboardMetrics | null
  calls: Call[]
  isLoading: boolean
  error: string | null
  fetchDashboardData: () => Promise<void>
  setMetrics: (metrics: DashboardMetrics) => void
  setCalls: (calls: Call[]) => void
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void
}

export const useDashboardStore = create<DashboardState>((set, get) => ({
  metrics: null,
  calls: [],
  isLoading: false,
  error: null,

  fetchDashboardData: async () => {
    const { setLoading, setError, setMetrics, setCalls } = get()

    setLoading(true)
    setError(null)

    try {
      const [metrics, calls] = await Promise.all([dashboardService.fetchMetrics(), dashboardService.fetchCalls()])

      setMetrics(metrics)
      setCalls(calls)
    } catch (error) {
      setError(error instanceof Error ? error.message : "An unknown error occurred")
    } finally {
      setLoading(false)
    }
  },

  setMetrics: (metrics) => set({ metrics }),
  setCalls: (calls) => set({ calls }),
  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),
}))
