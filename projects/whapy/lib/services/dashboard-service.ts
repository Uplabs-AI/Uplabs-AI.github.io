import type { DashboardMetrics, Call } from "@/lib/types"

export class DashboardService {
  async fetchMetrics(): Promise<DashboardMetrics> {
    // Simulate API call - replace with actual API integration
    await new Promise((resolve) => setTimeout(resolve, 500))

    return {
      totalCallMinutes: 378.46,
      numberOfCalls: 365,
      totalExpense: 42.23,
      averageCostPerCall: 0.11,
      balance: 158.77,
      totalCalls: 100,
      transferredCalls: 0,
      successfulCalls: 27,
      failedCalls: 7,
      totalCallsPercentChange: 12,
      transferredCallsPercentChange: 0,
      successfulCallsPercentChange: 15,
      failedCallsPercentChange: -3,
    }
  }

  async fetchCalls(): Promise<Call[]> {
    // Simulate API call - replace with actual API integration
    await new Promise((resolve) => setTimeout(resolve, 300))

    return [
      {
        id: "e83224fc-92e-",
        assistant: "Auto x Km (PRODUCTION VERSION)",
        assistantPhoneNumber: "3c8f9b6e-3c96-42b0-b326-891c02020447",
        clientPhoneNumber: "sip:7859284548@44.238.177.138:5060",
        finalizationReason: "Silence Timeout",
        successEvaluation: "Approved",
        startTime: "25 Apr, 2025, 15:15",
        duration: "3m 17s",
        cost: 0.34,
        status: "success",
      },
      {
        id: "ba834c2-2f6-",
        assistant: "Auto x Km (PRODUCTION VERSION)",
        assistantPhoneNumber: "3c8f9b6e-3c96-42b0-b326-891c02020447",
        clientPhoneNumber: "sip:7859275508@44.223.228.186:5060",
        finalizationReason: "Silence Timeout",
        successEvaluation: "Approved",
        startTime: "25 Apr, 2025, 11:26",
        duration: "2m 41s",
        cost: 0.27,
        status: "success",
      },
      {
        id: "2ab7b1de-c8e-",
        assistant: "Auto x Km (PRODUCTION VERSION)",
        assistantPhoneNumber: "3c8f9b6e-3c96-42b0-b326-891c02020447",
        clientPhoneNumber: "sip:7664558198@44.238.177.138:5060",
        finalizationReason: "Silence Timeout",
        successEvaluation: "Failed",
        startTime: "25 Apr, 2025, 11:16",
        duration: "2m 10s",
        cost: 0.18,
        status: "failed",
      },
      {
        id: "c1b7b684-5d3-",
        assistant: "Auto x Km (PRODUCTION VERSION)",
        assistantPhoneNumber: "3c8f9b6e-3c96-42b0-b326-891c02020447",
        clientPhoneNumber: "sip:7535672548@44.238.177.138:5060",
        finalizationReason: "Silence Timeout",
        successEvaluation: "Failed",
        startTime: "25 Apr, 2025, 11:05",
        duration: "2m 38s",
        cost: 0.21,
        status: "failed",
      },
      {
        id: "87bf4b78-5f5-",
        assistant: "Auto x Km (PRODUCTION VERSION)",
        assistantPhoneNumber: "3c8f9b6e-3c96-42b0-b326-891c02020447",
        clientPhoneNumber: "sip:8350986568@44.223.228.186:5060",
        finalizationReason: "Silence Timeout",
        successEvaluation: "Failed",
        startTime: "25 Apr, 2025, 10:33",
        duration: "2m 44s",
        cost: 0.25,
        status: "failed",
      },
    ]
  }
}

export const dashboardService = new DashboardService()
