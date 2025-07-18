"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { BarChart3, Users, ClipboardList, Settings, Contact, LayoutDashboard, LogOut, ExternalLink, ChevronDown, CreditCard, Palette } from "lucide-react"
import { cn } from "@/lib/utils"
import { NAVIGATION_ITEMS } from "@/lib/constants"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import SidebarCredits from "./sidebar-credits"

const iconMap = {
  LayoutDashboard,
  BarChart3,
  Users,
  ClipboardList,
  Contact,
  Settings,
  CreditCard,
  Palette,
}

export function Sidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const initialAccordion: string | undefined = pathname.startsWith("/contacts")
    ? "Contactos"
    : pathname.startsWith("/dashboard")
    ? "Dashboard"
    : undefined
  const [openAccordion, setOpenAccordion] = useState<string | undefined>(initialAccordion)

  return (
    <div className="flex flex-col h-full w-64 flex-shrink-0 bg-[#000000] border-r border-border transition-all duration-200">
      <div className="p-4">
        <div className="text-2xl font-bold text-white">NPS</div>
      </div>

      <nav className="flex-1 px-2 py-4 space-y-1">
        {NAVIGATION_ITEMS.map((item) => {
          const isActive = pathname === item.href || (item.subItems && item.subItems.some(subItem => pathname.startsWith(subItem.href)))
          const Icon = iconMap[item.icon as keyof typeof iconMap]

          if (item.subItems) {
            return (
              <Accordion 
                type="single" 
                collapsible 
                className="w-full" 
                key={item.name}
                value={openAccordion}
                onValueChange={setOpenAccordion}
              >
                <AccordionItem value={item.name} className="border-b-0">
                  <div className="flex items-center">
                    <button
                      onClick={() => {
                        // Navegar a la página del item
                        router.push(item.href)
                        // Abrir el accordion
                        setOpenAccordion(item.name)
                      }}
                      className={cn(
                        "flex items-center px-4 py-3 text-sm font-medium rounded-md transition-all duration-200 hover:scale-[1.02] w-full text-left",
                        isActive ? "bg-primary/10 text-primary shadow-sm" : "text-foreground/70 hover:bg-muted hover:text-foreground",
                      )}
                    >
                      <Icon className="mr-3 h-5 w-5" />
                      {item.name}
                    </button>
                  </div>
                  <AccordionContent className="pb-1 pl-10">
                    <div className="flex flex-col space-y-1">
                      {item.subItems.map((subItem) => (
                        <Link
                          key={subItem.name}
                          href={subItem.href}
                          className={cn(
                            "flex items-center px-4 py-3 text-sm font-medium rounded-md transition-colors",
                            pathname.startsWith(subItem.href) ? "bg-primary/10 text-primary" : "text-foreground/70 hover:bg-muted hover:text-foreground",
                          )}
                        >
                          {subItem.name}
                        </Link>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            )
          }

          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center px-4 py-3 text-sm font-medium rounded-md transition-all duration-200 hover:scale-[1.02]",
                isActive
                  ? "bg-primary/10 text-primary shadow-sm"
                  : "text-foreground/70 hover:bg-muted hover:text-foreground",
              )}
            >
              <Icon className="mr-3 h-5 w-5" />
              {item.name}
            </Link>
          )
        })}
      </nav>

      <div className="p-4 mt-auto space-y-4">
        <SidebarCredits />
        <Link
          href="/landing"
          className="flex items-center px-4 py-2 text-sm font-medium text-foreground/70 hover:text-foreground transition-colors duration-200"
        >
          <ExternalLink className="mr-3 h-5 w-5" />
          Go to Landing Page
        </Link>
        <Link
          href="/auth/logout"
          className="flex items-center px-4 py-2 text-sm font-medium text-foreground/70 hover:text-foreground transition-colors duration-200"
        >
          <LogOut className="mr-3 h-5 w-5" />
          Sign out
        </Link>
      </div>
    </div>
  )
}
