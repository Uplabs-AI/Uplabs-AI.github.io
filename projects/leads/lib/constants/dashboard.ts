export const CHART_COLORS = {
  callMinutes: "#8280ff",
  callNumber: "#ad82ff",
  expense: "#fd82ff",
  costPerCall: "#82ecff",
  balance: "#d782ff",
  // Sales Flow Colors
  newLeads: "#7b7cff",
  firstMessage: "#b9a5ff",
  followUp1: "#ff7cff",
  followUp2: "#7cffff",
  followUp3: "#d9a5ff",
  inConversion: "#5a2cff",
  noResponse: "#7b7cff",
  notInterested: "#b9a5ff",
  interested: "#ff7cff",
  won: "#7cffff",
  lost: "#d9a5ff",
} as const

// Advanced Dashboard Data
export const ADVANCED_DASHBOARD_DATA = {
  // Opportunity Status data (for progress chart)
  opportunityStatus: {
    value: "99",
    percentageChange: "+100%",
    changeType: "positive" as const,
  },

  // Opportunity Value data (for bar chart)
  opportunityValue: {
    value: "Bs.12,450",
    percentageChange: "+15%",
    changeType: "positive" as const,
    chartData: [
      { name: 'Bs10', value: 1500 },
      { name: 'Bs20', value: 2200 },
      { name: 'Bs60', value: 1800 },
      { name: 'Bs40', value: 2800 },
      { name: 'Bs9', value: 2100 },
      { name: 'Bs15', value: 2450 },
    ]
  },

  // Conversion Rate data (for progress chart)
  conversionRate: {
    value: "0",
    percentageChange: "+0%",
    changeType: "positive" as const,
  },

  // Funnel Chart data
  funnelData: [
    { name: 'Nuevo Leads', value: 0, cumulative: 100.0, nextStepConversion: 100.0, color: '#53B1FD' },
    { name: 'Primer Mensaje Enviado', value: 0, cumulative: 100.0, nextStepConversion: 100.0, color: '#22CCEE' },
    { name: 'Seguimiento 1 (60min)', value: 0, cumulative: 100.0, nextStepConversion: 100.0, color: '#8098F9' },
    { name: '1st Call Made', value: 0, cumulative: 98.98, nextStepConversion: 98.98, color: '#A48AFB' },
    { name: 'Seguimiento 2 (24hrs)', value: 0, cumulative: 92.86, nextStepConversion: 93.81, color: '#528BFF' },
    { name: 'Seguimiento 3 (7dias)', value: 0, cumulative: 57.14, nextStepConversion: 61.54, color: '#67E3F9' },
    { name: 'En conversacion con IA', value: 0, cumulative: 57.14, nextStepConversion: 100.0, color: '#36BFFA' },
    { name: 'Interesados', value: 0, cumulative: 42.86, nextStepConversion: 75.0, color: '#7CD4FD' },
    { name: 'No Interesado', value: 0, cumulative: 21.43, nextStepConversion: 50.0, color: '#84CAFF' },
    { name: 'No respondio', value: 0, cumulative: 1.02, nextStepConversion: 4.76, color: '#84ADFF' },
    { name: 'Won', value: 0, cumulative: 0.0, nextStepConversion: 0.0, color: '#A4BCFD' },
  ],

  // Stage Distribution data
  stageDistribution: [
    { name: 'Nuevos Leads', value: 20, color: '#5E17EB' },
    { name: 'Primer Mensaje Enviado', value: 15, color: '#7B2FEB' },
    { name: 'Seguimiento 1', value: 25, color: '#9845EB' },
    { name: 'Seguimiento 2', value: 10, color: '#B55CEB' },
    { name: 'Seguimiento 3', value: 12, color: '#D273EB' },
    { name: 'En conversación', value: 8, color: '#EF8AEB' },
    { name: 'Interesados', value: 10, color: '#FF9EEB' },
  ],
} as const
