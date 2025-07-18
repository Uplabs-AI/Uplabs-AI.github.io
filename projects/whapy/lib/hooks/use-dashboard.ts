"use client"

import { useEffect } from "react"
import { useDashboardStore } from "@/lib/stores/dashboard-store"

export const useDashboard = () => {
  const { metrics, calls, isLoading, error, fetchDashboardData } = useDashboardStore()

  useEffect(() => {
    if (!metrics) {
      fetchDashboardData()
    }
  }, [metrics, fetchDashboardData])

  return {
    metrics,
    calls,
    isLoading,
    error,
    refetch: fetchDashboardData,
  }
}
