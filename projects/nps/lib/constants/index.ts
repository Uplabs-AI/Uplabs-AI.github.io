export const COLORS = {
  primary: "#7b7cff",
  secondary: "#ad82ff",
  success: "#82ff90",
  info: "#82ecff",
  warning: "#fd82ff",
  error: "#d782ff",
  background: "#121212",
  card: "#000000",
  border: "#1a1a1c",
} as const

export const CHART_COLORS = {
  callMinutes: "#8280ff",
  callNumber: "#ad82ff",
  expense: "#fd82ff",
  costPerCall: "#82ecff",
  balance: "#d782ff",
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
    subItems: [
      {
        name: "Perfil",
        href: "/settings",
      },
      {
        name: "Empresa",
        href: "/settings/enterprise",
      },
      {
        name: "Dispositivo",
        href: "/settings/device",
      },
      {
        name: "Roles",
        href: "/settings/roles",
      },
    ],
  },
  {
    name: "Pagos",
    href: "/billing",
    icon: "CreditCard",
  },
]
