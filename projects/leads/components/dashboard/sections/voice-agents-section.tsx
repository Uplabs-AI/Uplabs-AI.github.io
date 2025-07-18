"use client"

import { MetricCard } from "@/components/dashboard/metric-card"
import { StatsCard } from "@/components/dashboard/stats-card"
import { ExportButton } from "@/components/common/export-button"
import { useDashboardStore } from "@/lib/stores/dashboard-store"
import { CHART_COLORS } from "@/lib/constants/dashboard"
import { CheckCircle2, User, XCircle, ArrowUpIcon } from "lucide-react"
import { FilterBarSection } from "./filter-bar-section"

// Chart data - in a real app, this would come from the service
const chartData = {
  callMinutes: [
    { value: 30, date: "01/04/23" },
    { value: 45, date: "02/04/23" },
    { value: 80, date: "03/04/23" },
    { value: 60, date: "04/04/23" },
    { value: 90, date: "05/04/23" },
    { value: 75, date: "06/04/23" },
    { value: 65, date: "07/04/23" },
  ],
  callNumber: [
    { value: 40, date: "01/04/23" },
    { value: 35, date: "02/04/23" },
    { value: 45, date: "03/04/23" },
    { value: 55, date: "04/23" },
    { value: 65, date: "05/04/23" },
    { value: 90, date: "06/04/23" },
    { value: 80, date: "07/04/23" },
  ],
  expense: [
    { value: 60, date: "01/04/23" },
    { value: 40, date: "02/04/23" },
    { value: 30, date: "03/04/23" },
    { value: 45, date: "04/04/23" },
    { value: 55, date: "05/04/23" },
    { value: 70, date: "06/04/23" },
    { value: 85, date: "07/04/23" },
  ],
  costPerCall: [
    { value: 70, date: "01/04/23" },
    { value: 80, date: "02/04/23" },
    { value: 50, date: "03/04/23" },
    { value: 40, date: "04/04/23" },
    { value: 45, date: "05/04/23" },
    { value: 60, date: "06/04/23" },
    { value: 85, date: "07/04/23" },
  ],
  balance: [
    { value: 85, date: "01/04/23" },
    { value: 85, date: "02/04/23" },
    { value: 85, date: "03/04/23" },
    { value: 80, date: "04/04/23" },
    { value: 80, date: "05/04/23" },
    { value: 85, date: "06/04/23" },
    { value: 85, date: "07/04/23" },
  ],
}

// Placeholder metrics data, to be replaced by dynamic data from the store
const placeholderMetrics = {
    totalCallMinutes: "1.2K",
    numberOfCalls: "560",
    totalExpense: 120.50,
    averageCostPerCall: 0.21,
    totalCalls: 560,
    totalCallsPercentChange: 15,
    transferredCalls: 30,
    transferredCallsPercentChange: -5,
    successfulCalls: 500,
    successfulCallsPercentChange: 18,
    failedCalls: 30,
    failedCallsPercentChange: -10,
}

export function VoiceAgentsSection() {
  const { isLoadingCampaigns, selectedCampaign } = useDashboardStore()

  // In a real implementation, you would also fetch and use real metric data
  // based on the selected filters. For now, we use placeholder data.
  const isLoading = isLoadingCampaigns;
  const metrics = placeholderMetrics;
  const calls: any[] = []; // Placeholder for calls data
  const error = null; // Placeholder for error state

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Error Cargando Dashboard</h2>
          <p className="text-gray-400">{error}</p>
        </div>
      </div>
    )
  }

  return (
    <>
      {/* Metrics Section */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-4">
            <h2 className="text-2xl font-bold mb-3">Agentes de Voz</h2>
          </div>
          {metrics && <ExportButton metrics={metrics as any} calls={calls} disabled={isLoading} />}
        </div>
        <FilterBarSection />

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-[200px] bg-[#000000] border border-[#1a1a1c] rounded-xl animate-pulse" />
            ))}
          </div>
        ) : metrics ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <MetricCard
              title="Total de Minutos de Llamada"
              value={metrics.totalCallMinutes}
              chartData={chartData.callMinutes}
              chartColor={CHART_COLORS.callMinutes}
            />
            <MetricCard
              title="Total de Campañas"
              value={metrics.numberOfCalls}
              chartData={chartData.callNumber}
              chartColor={CHART_COLORS.callNumber}
            />
            <MetricCard
              title="Gasto Total"
              value={`$${metrics.totalExpense.toFixed(2)}`}
              chartData={chartData.expense}
              chartColor={CHART_COLORS.expense}
            />
            <MetricCard
              title="Costo Promedio por Llamada"
              value={`$${metrics.averageCostPerCall.toFixed(2)}`}
              chartData={chartData.costPerCall}
              chartColor={CHART_COLORS.costPerCall}
            />
          </div>
        ) : null}
      </div>

      {/* Stats Section */}
      <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Llamadas Totales"
          value={metrics?.totalCalls ?? 0}
          icon={<User className="h-4 w-4 text-white" />}
          percentChange={metrics?.totalCallsPercentChange ?? 0}
        />
        <StatsCard
          title="Llamadas Transferidas"
          value={metrics?.transferredCalls ?? 0}
          icon={<ArrowUpIcon className="h-4 w-4 text-white" />}
          percentChange={metrics?.transferredCallsPercentChange ?? 0}
        />
        <StatsCard
          title="Llamadas Exitosas"
          value={metrics?.successfulCalls ?? 0}
          icon={<CheckCircle2 className="h-4 w-4 text-green-500" />}
          percentChange={metrics?.successfulCallsPercentChange ?? 0}
        />
        <StatsCard
          title="Llamadas Fallidas"
          value={metrics?.failedCalls ?? 0}
          icon={<XCircle className="h-4 w-4 text-red-500" />}
          percentChange={metrics?.failedCallsPercentChange ?? 0}
        />
      </div>

      {/* Survey Stats Section */}
      <div className="mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Total Campañas Card */}
          <div className="bg-[#000000] border border-[#1a1a1c] rounded-xl p-6">
            <div className="text-[#8280ff] text-sm font-medium mb-2">Total Campañas</div>
            <div className="text-[#8280ff] text-4xl font-bold mb-3">1.560</div>
            <div className="flex items-center text-xs text-gray-400">
              <ArrowUpIcon className="h-4 w-4 mr-1" />
              <span>+12% vs último mes</span>
            </div>
          </div>
        </div>
      </div>
    </>
  )
} 