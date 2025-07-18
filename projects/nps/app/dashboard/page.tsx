"use client"

import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { VoiceContent } from "@/components/dashboard/voice-content"

export default function DashboardPage() {
  return (
    <DashboardLayout title="Dashboard">
      <VoiceContent />
    </DashboardLayout>
  )
}
