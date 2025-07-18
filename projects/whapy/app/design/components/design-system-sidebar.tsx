"use client"

import { cn } from "@/lib/utils"
import { 
  Palette, 
  Type, 
  Move, 
  Layers, 
  Square, 
  MousePointer, 
  CreditCard, 
  Tag, 
  AlertTriangle, 
  Navigation, 
  Table, 
  MessageSquare, 
  FileText, 
  Layout, 
  BarChart3, 
  LayoutDashboard,
  FormInput,
  Activity,
  TrendingUp,
  Filter,
  Download,
  Calendar,
  Zap,
  Eye,
  AlertCircle,
  Loader,
  Image as ImageIcon,
  Settings
} from "lucide-react"

interface DesignSystemSidebarProps {
  activeSection: string
  onSectionChange: (section: string) => void
}

const navigationItems = [
  {
    title: "Foundation",
    items: [
      { id: "colors", label: "Colors", icon: Palette },
      { id: "typography", label: "Typography", icon: Type },
      { id: "spacing", label: "Spacing", icon: Move },
      { id: "shadows", label: "Shadows", icon: Layers },
      { id: "iconography", label: "Iconography", icon: ImageIcon },
      { id: "animations", label: "Animations", icon: Zap },
    ]
  },
  {
    title: "Basic Components", 
    items: [
      { id: "buttons", label: "Buttons", icon: MousePointer },
      { id: "inputs", label: "Inputs", icon: FormInput },
      { id: "cards", label: "Cards", icon: CreditCard },
      { id: "badges", label: "Badges", icon: Tag },
      { id: "alerts", label: "Alerts", icon: AlertTriangle },
      { id: "tables", label: "Tables", icon: Table },
      { id: "modals", label: "Modals", icon: MessageSquare },
      { id: "navigation", label: "Navigation", icon: Navigation },
    ]
  },
  {
    title: "Dashboard Components",
    items: [
      { id: "metric-cards", label: "Metric Cards", icon: Activity },
      { id: "stats-cards", label: "Stats Cards", icon: TrendingUp },
      { id: "charts", label: "Charts", icon: BarChart3 },
      { id: "filters", label: "Filters", icon: Filter },
      { id: "data-tables", label: "Data Tables", icon: Table },
      { id: "toggles", label: "Toggles", icon: Settings },
    ]
  },
  {
    title: "Utility Components",
    items: [
      { id: "export-buttons", label: "Export Buttons", icon: Download },
      { id: "date-pickers", label: "Date Pickers", icon: Calendar },
      { id: "loading-states", label: "Loading States", icon: Loader },
      { id: "error-states", label: "Error States", icon: AlertCircle },
      { id: "empty-states", label: "Empty States", icon: Eye },
    ]
  },
  {
    title: "Patterns",
    items: [
      { id: "forms", label: "Forms", icon: FileText },
      { id: "layouts", label: "Layouts", icon: Layout },
      { id: "page-headers", label: "Page Headers", icon: Layout },
      { id: "pagination", label: "Pagination", icon: Navigation },
    ]
  },
  {
    title: "Templates",
    items: [
      { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
      { id: "list-pages", label: "List Pages", icon: Table },
      { id: "forms-complete", label: "Complete Forms", icon: FileText },
      { id: "settings-pages", label: "Settings Pages", icon: Settings },
    ]
  }
]

export function DesignSystemSidebar({ activeSection, onSectionChange }: DesignSystemSidebarProps) {
  return (
    <div className="w-80 bg-[#000000] border-r border-border h-screen overflow-y-auto flex-shrink-0">
      <div className="p-6">
        <div className="text-xl font-bold text-white mb-6">Design System</div>
        
        <nav className="space-y-6">
          {navigationItems.map((section) => (
            <div key={section.title}>
              <h3 className="text-sm font-medium text-gray-400 uppercase tracking-wider mb-3">
                {section.title}
              </h3>
              <div className="space-y-1">
                {section.items.map((item) => {
                  const Icon = item.icon
                  return (
                    <button
                      key={item.id}
                      onClick={() => onSectionChange(item.id)}
                      className={cn(
                        "w-full flex items-center px-3 py-2 text-sm rounded-md transition-all duration-200",
                        activeSection === item.id
                          ? "bg-[#5E17EB] text-white shadow-sm"
                          : "text-gray-300 hover:bg-[#1a1a1c] hover:text-white"
                      )}
                    >
                      <Icon className="h-4 w-4 mr-3" />
                      {item.label}
                    </button>
                  )
                })}
              </div>
            </div>
          ))}
        </nav>
      </div>
    </div>
  )
} 