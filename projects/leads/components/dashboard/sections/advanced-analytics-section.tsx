"use client"

import { AdvancedMetricCard } from "@/components/dashboard/advanced-metric-card"
import { FunnelChart } from "@/components/dashboard/funnel-chart"
import { StageDistributionChart } from "@/components/dashboard/stage-distribution-chart"
import { ADVANCED_DASHBOARD_DATA } from "@/lib/constants/dashboard"

export function AdvancedAnalyticsSection() {
  return (
    <div className="mb-8">
      <h2 className="mb-6 text-xl font-semibold text-white">Análisis Avanzado de Oportunidades</h2>
      
      {/* Advanced Metric Cards - Top Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        <AdvancedMetricCard
          title="Opportunity Status"
          value={ADVANCED_DASHBOARD_DATA.opportunityStatus.value}
          percentageChange={ADVANCED_DASHBOARD_DATA.opportunityStatus.percentageChange}
          changeType={ADVANCED_DASHBOARD_DATA.opportunityStatus.changeType}
          chartType="progress"
        />
        
        <AdvancedMetricCard
          title="Opportunity Value"
          value={ADVANCED_DASHBOARD_DATA.opportunityValue.value}
          percentageChange={ADVANCED_DASHBOARD_DATA.opportunityValue.percentageChange}
          changeType={ADVANCED_DASHBOARD_DATA.opportunityValue.changeType}
          chartType="bar"
          chartData={[...ADVANCED_DASHBOARD_DATA.opportunityValue.chartData]}
          chartColor="#5E17EB"
        />
        
        <AdvancedMetricCard
          title="Conversion Rate"
          value={`${ADVANCED_DASHBOARD_DATA.conversionRate.value}%`}
          percentageChange={ADVANCED_DASHBOARD_DATA.conversionRate.percentageChange}
          changeType={ADVANCED_DASHBOARD_DATA.conversionRate.changeType}
          chartType="progress"
        />
      </div>
      
      {/* Funnel and Stage Distribution - Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <FunnelChart
          title="Funnel"
          subtitle="AUTO X KM (MAIN)"
          value="Bs.0"
          percentageChange="+0%"
          changeType="positive"
          data={[...ADVANCED_DASHBOARD_DATA.funnelData]}
        />
        
        <StageDistributionChart
          title="Stage Distribution"
          subtitle="AUTO X KM (MAIN)"
          totalValue="98"
          percentageChange="+100%"
          changeType="positive"
          data={[...ADVANCED_DASHBOARD_DATA.stageDistribution]}
        />
      </div>
    </div>
  )
} 