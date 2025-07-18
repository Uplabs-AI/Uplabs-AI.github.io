"use client"

import { SalesFlowCard } from "@/components/dashboard/sales-flow-card"
import { CHART_COLORS } from "@/lib/constants/dashboard"
import { FilterBarSection } from './filter-bar-section'
import { ExportButton } from "@/components/common/export-button"

const salesFlowData = [
  {
    title: 'Nuevos Lead',
    value: 1245,
    percentChange: 12,
    chartData: [ { date: 'Jan', value: 400 }, { date: 'Feb', value: 300 }, { date: 'Mar', value: 500 }, { date: 'Apr', value: 450 }, { date: 'May', value: 600 }, { date: 'Jun', value: 700 } ]
  },
  {
    title: 'Primer Mensaje Enviado',
    value: 1120,
    percentChange: 8,
    chartData: [ { date: 'Jan', value: 380 }, { date: 'Feb', value: 280 }, { date: 'Mar', value: 480 }, { date: 'Apr', value: 430 }, { date: 'May', value: 580 }, { date: 'Jun', value: 680 } ]
  },
  {
    title: 'Seguimiento 1 (60 min)',
    value: 980,
    percentChange: -3,
    chartData: [ { date: 'Jan', value: 350 }, { date: 'Feb', value: 250 }, { date: 'Mar', value: 450 }, { date: 'Apr', value: 400 }, { date: 'May', value: 550 }, { date: 'Jun', value: 650 } ]
  },
  {
    title: 'Seguimiento 2 (24 hrs)',
    value: 845,
    percentChange: 5,
    chartData: [ { date: 'Jan', value: 320 }, { date: 'Feb', value: 220 }, { date: 'Mar', value: 420 }, { date: 'Apr', value: 370 }, { date: 'May', value: 520 }, { date: 'Jun', value: 620 } ]
  },
  {
    title: 'Seguimiento 3 (7 días)',
    value: 750,
    percentChange: 2,
    chartData: [ { date: 'Jan', value: 300 }, { date: 'Feb', value: 200 }, { date: 'Mar', value: 400 }, { date: 'Apr', value: 350 }, { date: 'May', value: 500 }, { date: 'Jun', value: 600 } ]
  },
  {
    title: 'En Conversión',
    value: 680,
    percentChange: 10,
    chartData: [ { date: 'Jan', value: 280 }, { date: 'Feb', value: 180 }, { date: 'Mar', value: 380 }, { date: 'Apr', value: 330 }, { date: 'May', value: 480 }, { date: 'Jun', value: 580 } ]
  },
  {
    title: 'No Respondió',
    value: 320,
    percentChange: -7,
    chartData: [ { date: 'Jan', value: 120 }, { date: 'Feb', value: 100 }, { date: 'Mar', value: 180 }, { date: 'Apr', value: 150 }, { date: 'May', value: 220 }, { date: 'Jun', value: 320 } ]
  },
  {
    title: 'No Interesados',
    value: 230,
    percentChange: -5,
    chartData: [ { date: 'Jan', value: 100 }, { date: 'Feb', value: 80 }, { date: 'Mar', value: 150 }, { date: 'Apr', value: 120 }, { date: 'May', value: 200 }, { date: 'Jun', value: 230 } ]
  },
  {
    title: 'Interesados',
    value: 450,
    percentChange: 15,
    chartData: [ { date: 'Jan', value: 200 }, { date: 'Feb', value: 150 }, { date: 'Mar', value: 300 }, { date: 'Apr', value: 250 }, { date: 'May', value: 350 }, { date: 'Jun', value: 450 } ]
  },
  {
    title: 'Ganada',
    value: 150,
    percentChange: 20,
    chartData: [ { date: 'Jan', value: 50 }, { date: 'Feb', value: 40 }, { date: 'Mar', value: 80 }, { date: 'Apr', value: 70 }, { date: 'May', value: 120 }, { date: 'Jun', value: 150 } ]
  },
  {
    title: 'Perdida',
    value: 80,
    percentChange: -8,
    chartData: [ { date: 'Jan', value: 50 }, { date: 'Feb', value: 40 }, { date: 'Mar', value: 70 }, { date: 'Apr', value: 50 }, { date: 'May', value: 80 }, { date: 'Jun', value: 80 } ]
  }
]

export function SalesFlowSection() {
  // Mock data para exportación
  const mockMetrics = {
    totalCallMinutes: 120,
    numberOfCalls: 50,
    totalExpense: 100,
    averageCostPerCall: 2,
    balance: 500,
    totalCalls: 50,
    transferredCalls: 10,
    successfulCalls: 35,
    failedCalls: 5,
    totalCallsPercentChange: 10,
    transferredCallsPercentChange: 5,
    successfulCallsPercentChange: 8,
    failedCallsPercentChange: -2,
  }
  const mockCalls = [
    {
      id: "1",
      fullId: "CALL-1",
      assistant: "Lucio (Voz)",
      assistantSubtext: "Voz",
      assistantPhone: "+59170000001",
      clientPhoneNumber: "+59160000001",
      finalizationReason: "Finalizado",
      successEvaluation: "Aprobado",
      startTime: "2024-06-01T10:00:00Z",
      duration: "60",
      cost: 2,
      status: "success",
      successType: "approved",
    } as const,
  ]
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-white">Estado Comercial</h2>
        <ExportButton metrics={mockMetrics} calls={mockCalls} />
      </div>
      <FilterBarSection />
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {salesFlowData.map((data, index) => (
          <SalesFlowCard
            key={index}
            title={data.title}
            value={data.value}
            percentChange={data.percentChange}
            chartData={data.chartData}
            chartColor={
              Object.values(CHART_COLORS)[
                index % Object.values(CHART_COLORS).length
              ]
            }
          />
        ))}
      </div>
    </div>
  )
} 