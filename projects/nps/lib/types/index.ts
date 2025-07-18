export interface Call {
  id: string
  fullId: string
  assistant: string
  assistantSubtext: string
  assistantPhone: string
  clientPhoneNumber: string
  finalizationReason: string
  successEvaluation: string
  startTime: string
  duration: string
  cost: number
  status: "success" | "failed"
  successType: "approved" | "failed"
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

export interface ChartDataPoint {
  value: number
  date: string
}

export interface FilterOptions {
  dateRange: string[]
  cost: string[]
  callType: string[]
  assistant: string[]
}
