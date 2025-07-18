"use client"

import { useState } from "react"
import { DesignSystemSidebar } from "./components/design-system-sidebar"
import { FoundationSection } from "./components/foundation-section"
import { ComponentsSection } from "./components/components-section"
import { PatternsSection } from "./components/patterns-section"
import { TemplatesSection } from "./components/templates-section"

export default function DesignSystemPage() {
  const [activeSection, setActiveSection] = useState("colors")

  const renderActiveSection = () => {
    switch (activeSection) {
      // Foundation
      case "colors":
        return <FoundationSection section="colors" />
      case "typography":
        return <FoundationSection section="typography" />
      case "spacing":
        return <FoundationSection section="spacing" />
      case "shadows":
        return <FoundationSection section="shadows" />
      case "iconography":
        return <FoundationSection section="iconography" />
      case "animations":
        return <FoundationSection section="animations" />
      
      // Basic Components
      case "buttons":
        return <ComponentsSection section="buttons" />
      case "inputs":
        return <ComponentsSection section="inputs" />
      case "cards":
        return <ComponentsSection section="cards" />
      case "badges":
        return <ComponentsSection section="badges" />
      case "alerts":
        return <ComponentsSection section="alerts" />
      case "tables":
        return <ComponentsSection section="tables" />
      case "modals":
        return <ComponentsSection section="modals" />
      case "navigation":
        return <ComponentsSection section="navigation" />
      
      // Dashboard Components
      case "metric-cards":
        return <ComponentsSection section="metric-cards" />
      case "stats-cards":
        return <ComponentsSection section="stats-cards" />
      case "charts":
        return <ComponentsSection section="charts" />
      case "filters":
        return <ComponentsSection section="filters" />
      case "data-tables":
        return <ComponentsSection section="data-tables" />
      case "toggles":
        return <ComponentsSection section="toggles" />
      
      // Utility Components
      case "export-buttons":
        return <ComponentsSection section="export-buttons" />
      case "date-pickers":
        return <ComponentsSection section="date-pickers" />
      case "loading-states":
        return <ComponentsSection section="loading-states" />
      case "error-states":
        return <ComponentsSection section="error-states" />
      case "empty-states":
        return <ComponentsSection section="empty-states" />
      
      // Patterns
      case "forms":
        return <PatternsSection section="forms" />
      case "layouts":
        return <PatternsSection section="layouts" />
      case "page-headers":
        return <PatternsSection section="page-headers" />
      case "pagination":
        return <PatternsSection section="pagination" />
      
      // Templates
      case "dashboard":
        return <TemplatesSection section="dashboard" />
      case "list-pages":
        return <TemplatesSection section="list-pages" />
      case "forms-complete":
        return <TemplatesSection section="forms-complete" />
      case "settings-pages":
        return <TemplatesSection section="settings-pages" />
      
      default:
        return <FoundationSection section="colors" />
    }
  }

  return (
    <div className="min-h-screen bg-background flex">
      <DesignSystemSidebar 
        activeSection={activeSection} 
        onSectionChange={setActiveSection} 
      />
      <main className="flex-1 overflow-auto">
        <div className="max-w-7xl mx-auto p-8">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-white mb-2">NPS VOX Design System</h1>
            <p className="text-gray-400">
              Complete design system with reusable components and visual patterns
            </p>
          </div>
          {renderActiveSection()}
        </div>
      </main>
    </div>
  )
} 