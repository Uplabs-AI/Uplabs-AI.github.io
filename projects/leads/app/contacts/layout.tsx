import type { ReactNode } from "react"
import { Sidebar } from "@/components/layout/sidebar"

export default function ContactsLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-screen bg-[#121212] text-white">
      <div className="w-64 flex-shrink-0">
        <Sidebar />
      </div>
      <div className="flex-1 flex flex-col overflow-auto">{children}</div>
    </div>
  )
} 