"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { BarChart3, Users, ClipboardList, Settings, Contact, LayoutDashboard, LogOut, ExternalLink, ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const navItems = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Campañas",
    href: "/campaigns",
    icon: BarChart3,
  },
  {
    name: "Agentes",
    href: "/agents",
    icon: Users,
  },
  {
    name: "Encuestas",
    href: "/surveys",
    icon: ClipboardList,
  },
  {
    name: "Contactos",
    href: "/contacts",
    icon: Contact,
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
    icon: Settings,
  },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="flex flex-col h-full bg-[#000000] border-r border-border">
      <div className="p-4">
        <div className="text-2xl font-bold text-white">NPS</div>
      </div>
      <nav className="flex-1 px-2 py-4 space-y-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href || (item.subItems && item.subItems.some(subItem => pathname.startsWith(subItem.href)))

          if (item.subItems) {
            return (
              <DropdownMenu key={item.name}>
                <DropdownMenuTrigger
                  className={cn(
                    "flex items-center justify-between w-full px-4 py-3 text-sm font-medium rounded-md transition-colors",
                    isActive ? "bg-primary/10 text-primary" : "text-foreground/70 hover:bg-muted hover:text-foreground",
                  )}
                >
                  <div className="flex items-center">
                    <item.icon className="mr-3 h-5 w-5" />
                    {item.name}
                  </div>
                  <ChevronDown className="h-4 w-4 transition-transform duration-200 data-[state=open]:rotate-180" />
                </DropdownMenuTrigger>
                <DropdownMenuContent side="right" align="start" className="bg-[#0A0A0A] border-border ml-2">
                  {item.subItems.map((subItem) => (
                    <DropdownMenuItem key={subItem.name} asChild>
                      <Link
                        href={subItem.href}
                        className={cn(
                          "flex items-center px-4 py-3 text-sm font-medium rounded-md transition-colors",
                          pathname.startsWith(subItem.href) ? "bg-primary/10 text-primary" : "text-foreground/70 hover:bg-muted hover:text-foreground",
                        )}
                      >
                        {subItem.name}
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            )
          }

          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center px-4 py-3 text-sm font-medium rounded-md transition-colors",
                isActive ? "bg-primary/10 text-primary" : "text-foreground/70 hover:bg-muted hover:text-foreground",
              )}
            >
              <item.icon className="mr-3 h-5 w-5" />
              {item.name}
            </Link>
          )
        })}
      </nav>
      <div className="p-4 mt-auto space-y-2">
        <Link
          href="/landing"
          className="flex items-center px-4 py-2 text-sm font-medium text-foreground/70 hover:text-foreground transition-colors"
        >
          <ExternalLink className="mr-3 h-5 w-5" />
          Go to Landing Page
        </Link>
        <Link
          href="/auth/logout"
          className="flex items-center px-4 py-2 text-sm font-medium text-foreground/70 hover:text-foreground transition-colors"
        >
          <LogOut className="mr-3 h-5 w-5" />
          Sign out
        </Link>
      </div>
    </div>
  )
}
