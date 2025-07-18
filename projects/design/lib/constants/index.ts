export const COLORS = {
  primary: "#9933ff",
  secondary: "#b299ff",
  success: "#82ff90",
  info: "#99ffff",
  warning: "#ff99ff",
  error: "#cc99ff",
  background: "#121212",
  card: "#000000",
  border: "#1a1a1a",
} as const

export const CHART_COLORS = {
  callMinutes: "#9999ff",
  callNumber: "#b299ff",
  expense: "#ff99ff",
  costPerCall: "#99ffff",
  balance: "#cc99ff",
} as const

export interface FilterOptions {
  dateRange: string[]
  cost: string[]
  callType: string[]
  assistant: string[]
}

export const FILTER_OPTIONS: FilterOptions = {
  dateRange: ["Today", "Yesterday", "Last 7 days", "Last 30 days", "Custom"],
  cost: ["All", "< $0.10", "$0.10 - $0.25", "$0.25 - $0.50", "> $0.50"],
  callType: ["All", "Inbound", "Outbound", "Missed"],
  assistant: ["All", "Auto x Km", "Customer Service", "Technical Support"],
}

export const NAVIGATION_ITEMS = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: "LayoutDashboard",
    subItems: [
      {
        name: "Agentes de Voz",
        href: "/dashboard",
      },
      {
        name: "Agentes de Texto",
        href: "/dashboard/text",
      },
    ],
  },
  {
    name: "Campañas",
    href: "/campaigns",
    icon: "BarChart3",
  },
  {
    name: "Agentes",
    href: "/agents",
    icon: "Users",
  },
  {
    name: "Encuestas",
    href: "/surveys",
    icon: "ClipboardList",
  },
  {
    name: "Contactos",
    href: "/contacts",
    icon: "Contact",
    subItems: [
      {
        name: "Listas",
        href: "/contacts/list",
      },
    ],
  },
  {
    name: "Configuración",
    href: "/settings",
    icon: "Settings",
  },
  {
    name: "Pagos",
    href: "/billing",
    icon: "CreditCard",
  },
  {
    name: "Design System",
    href: "/design",
    icon: "Palette",
  },
]
