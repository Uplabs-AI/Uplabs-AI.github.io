"use client"

import { SalesFlowSection } from "@/components/dashboard/sections/sales-flow-section"
import { AdvancedAnalyticsSection } from "@/components/dashboard/sections/advanced-analytics-section"
import { CallsTableSection } from "@/components/dashboard/sections/calls-table-section"

export function DashboardContent() {
  return (
    <>
      {/* Sales Flow Section */}
      <SalesFlowSection />

      {/* Advanced Analytics Section */}
      <AdvancedAnalyticsSection />

      {/* Calls Table Section */}
      <CallsTableSection forceNavigationPath="/dashboard/call-recording-and-text" />
    </>
  )
} 