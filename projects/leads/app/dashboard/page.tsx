"use client"

import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { DashboardContent } from "@/components/dashboard/dashboard-content"

export default function DashboardPage() {
  return (
    <DashboardLayout title="Dashboard General">
      <DashboardContent />
    </DashboardLayout>
  )
}
