"use client"

import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { PipelineManager } from "@/components/opportunities/pipeline-manager"

const mockPipelines = [
  "Nuevos Leads",
  "Calificados",
  "Propuesta Presentada",
  "Negociación",
  "Ganada",
  "Perdida",
]

export default function PipelinesPage() {
  return (
    <DashboardLayout title="Pipelines">
      <PipelineManager pipelines={mockPipelines} />
    </DashboardLayout>
  )
} 