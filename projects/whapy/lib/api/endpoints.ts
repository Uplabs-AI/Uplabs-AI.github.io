export const ENDPOINTS = {
  dashboard: {
    metrics: "/dashboard/metrics",
    calls: "/dashboard/calls",
  },
  calls: {
    list: "/calls",
    detail: (id: string) => `/calls/${id}`,
    export: "/calls/export",
  },
  metrics: {
    overview: "/metrics/overview",
    charts: "/metrics/charts",
  },
} as const
