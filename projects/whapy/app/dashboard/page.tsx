"use client"

import { Sidebar } from "@/components/layout/sidebar"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import { Bell, Globe, User, PlayCircle, Plus, Search, CheckSquare, Dot, Square, CircleDashed } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu"

const WhatsappIcon = ({ className = "w-4 h-4 mr-2 text-green-500" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2C6.477 2 2 6.037 2 11.05c0 1.949.566 3.77 1.553 5.312L2 22l5.783-1.515A10.07 10.07 0 0 0 12 20.1c5.523 0 10-4.037 10-9.05C22 6.037 17.523 2 12 2Zm0 16.6c-1.56 0-3.08-.41-4.39-1.19l-.31-.18-3.43.9.92-3.34-.2-.32A7.36 7.36 0 0 1 4.05 11.05c0-4.01 3.58-7.25 7.95-7.25s7.95 3.24 7.95 7.25-3.58 7.25-7.95 7.25Zm4.13-5.34c-.23-.12-1.36-.67-1.57-.75-.21-.08-.36-.12-.51.12-.15.23-.58.75-.71.9-.13.15-.26.17-.49.06-.23-.12-.97-.36-1.85-1.13-.68-.6-1.14-1.34-1.28-1.57-.13-.23-.01-.35.1-.46.1-.1.23-.26.34-.39.11-.13.15-.23.23-.38.08-.15.04-.28-.02-.4-.06-.12-.51-1.23-.7-1.68-.18-.44-.37-.38-.51-.39-.13-.01-.28-.01-.43-.01-.15 0-.4.06-.61.28-.21.22-.8.78-.8 1.9 0 1.12.82 2.2.94 2.36.12.16 1.62 2.47 3.93 3.37.55.19.98.3 1.31.38.55.14 1.05.12 1.45.07.44-.07 1.36-.56 1.55-1.1.19-.54.19-1.01.13-1.1-.06-.09-.21-.15-.44-.27Z" />
  </svg>
)

// Chip visual con color por estado
const CHIP_COLORS: Record<string, { bg: string; color: string; border: string }> = {
  STOPPED: {
    bg: "rgba(239,68,68,0.1)",
    color: "rgb(239,68,68)",
    border: "rgba(239,68,68,0.2)",
  },
  AUTHORIZED: {
    bg: "rgba(34,197,94,0.1)",
    color: "rgb(34,197,94)",
    border: "rgba(34,197,94,0.2)",
  },
  SANDBOX: {
    bg: "rgba(59,130,246,0.1)",
    color: "rgb(59,130,246)",
    border: "rgba(59,130,246,0.2)",
  },
  TRIAL: {
    bg: "rgba(250,204,21,0.1)",
    color: "rgb(250,204,21)",
    border: "rgba(250,204,21,0.2)",
  },
  INITIALIZED: {
    bg: "rgba(156,163,175,0.1)",
    color: "rgb(156,163,175)",
    border: "rgba(156,163,175,0.2)",
  },
  INACTIVE: {
    bg: "rgba(107,114,128,0.1)",
    color: "rgb(107,114,128)",
    border: "rgba(107,114,128,0.2)",
  },
  OVERDUE: {
    bg: "rgba(107,114,128,0.1)",
    color: "rgb(107,114,128)",
    border: "rgba(107,114,128,0.2)",
  },
  DEFAULT: {
    bg: "rgba(34,197,94,0.1)",
    color: "rgb(34,197,94)",
    border: "rgba(34,197,94,0.2)",
  },
}

function getChipColor(label: string) {
  if (label.includes("STOPPED")) return CHIP_COLORS.STOPPED
  if (label.includes("AUTHORIZED")) return CHIP_COLORS.AUTHORIZED
  if (label.includes("SANDBOX")) return CHIP_COLORS.SANDBOX
  if (label.includes("TRIAL")) return CHIP_COLORS.TRIAL
  if (label.includes("INITIALIZED")) return CHIP_COLORS.INITIALIZED
  if (label.includes("Inactive") || label.includes("INACTIVE")) return CHIP_COLORS.INACTIVE
  if (label.includes("Overdue")) return CHIP_COLORS.OVERDUE
  return CHIP_COLORS.DEFAULT
}

const Chip = ({ children, label }: { children: React.ReactNode; label: string }) => {
  const color = getChipColor(label)
  return (
    <div
      className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
      style={{
        backgroundColor: color.bg,
        color: color.color,
        borderColor: color.border,
      }}
    >
      {children}
    </div>
  )
}

const channels = [
  {
    id: "channel_2",
    channelName: { icon: <WhatsappIcon />, text: "New channel 2" },
    phone: "-",
    status: <Chip label="STOPPED"><Dot className="w-3 h-3 mr-1" />STOPPED</Chip>,
    workPeriod: <Chip label="Overdue">Overdue since 16.07.2025</Chip>,
  },
  {
    id: "channel_4",
    channelName: { icon: <WhatsappIcon />, text: "New channel 4" },
    phone: "-",
    status: <Chip label="STOPPED"><Dot className="w-3 h-3 mr-1" />STOPPED</Chip>,
    workPeriod: <Chip label="Overdue">Overdue since 16.07.2025</Chip>,
  },
  {
    id: "channel_5",
    channelName: { icon: <WhatsappIcon />, text: "New channel 5" },
    phone: "-",
    status: <Chip label="INACTIVE"><CircleDashed className="w-4 h-4 mr-1 text-muted-foreground" /></Chip>,
    workPeriod: <Chip label="Inactive"><span className="text-muted-foreground">Inactive since [date]</span></Chip>,
  },
  {
    id: "first_channel",
    channelName: {
      icon: <WhatsappIcon />,
      text: "Your First Channel",
      badge: <Chip label="TRIAL">TRIAL</Chip>,
    },
    phone: "-",
    status: <Chip label="INITIALIZED"><Square className="w-3 h-3 mr-1" />INITIALIZED</Chip>,
    workPeriod: <Chip label="TRIAL">Trial period until 22.07.2025</Chip>,
  },
  {
    id: "seguros_sandbox",
    channelName: {
      icon: <WhatsappIcon />,
      text: "Seguros",
      badge: <Chip label="SANDBOX">SANDBOX</Chip>,
    },
    phone: "+591 68802508",
    status: <Chip label="AUTHORIZED"><CheckSquare className="w-3 h-3 mr-1" />AUTHORIZED</Chip>,
    workPeriod: <Chip label="Unlimited">Unlimited</Chip>,
  },
]

export default function DashboardPage() {
  const router = useRouter();
  return (
    <div className="flex min-h-screen bg-[#121212] text-white">
      {/* Sidebar */}
      <div className="w-64 hidden md:block">
        <Sidebar />
      </div>
      {/* Main Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header custom */}
        <header className="flex items-center justify-between p-4 border-b border-border">
          <h1 className="text-xl font-semibold">Dashboard</h1>
              <div className="flex items-center gap-4">
            <div className="flex items-center gap-3 bg-[#121212] border border-[#1d1d20] rounded-md px-4 py-2">
              <div className="w-7 h-7 bg-[#241543] rounded-full flex items-center justify-center">
                <span className="text-[#ad84ff] text-sm font-medium select-none">U</span>
              </div>
              <span className="text-white text-sm font-medium whitespace-nowrap">usuario@empresa.com</span>
            </div>
            <a
              className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border hover:text-accent-foreground h-9 rounded-md px-3 bg-[#121212] border-[#1d1d20] text-white hover:bg-[#1a1a1c]"
              href="/auth/logout"
            >
              Sign Out
            </a>
          </div>
        </header>
        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-8 space-y-8">
          {/* Welcome Banner */}
          <div className="bg-[#05000E] rounded-xl shadow border border-[#23232a] flex justify-between items-center p-6">
            <div className="flex-1 max-w-md">
              <h1 className="text-2xl font-bold mb-2">Bienvenido a UPLABSAI</h1>
              <p className="text-muted-foreground">
                WhatsApp API for a fixed price: automate Groups, Stories, Channels, Bulk WhatsApp number checks, Polls, Goods and much more are available in our API!
              </p>
            </div>
            <div className="hidden md:block min-w-[150px] ml-8">
              <Image src="/illustration.png" alt="API Illustration" width={150} height={120} />
            </div>
          </div>
          {/* Channels Section */}
          <section id="channels-section">
            {/* Header */}
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-semibold">Channels</h2>
                <Button variant="link" className="text-[#5E17EB] flex items-center gap-1"><PlayCircle className="w-4 h-4" />Watch Tutorial</Button>
              </div>
              <div className="flex items-center gap-2">
                <div className="relative w-40">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                    <Search className="w-4 h-4" />
                  </span>
                  <Input placeholder="Search" className="bg-[#1a1a1c] border-[#374151] text-white pl-9" />
                </div>
                <Select defaultValue="all">
                  <SelectTrigger className="w-32 bg-[#1a1a1c] border-[#374151] text-white">
                    <SelectValue placeholder="Filter: All" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#1a1a1c] border-[#374151]">
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                  </SelectContent>
                </Select>
                    <Button
                  className="bg-[#5E17EB] hover:bg-[#5E17EB]/90 text-white"
                  onClick={() => router.push("/dashboard/channel-pay")}
                >
                  <Plus className="w-4 h-4 mr-1" />Add Channel
                    </Button>
              </div>
            </div>
            {/* Table */}
            <div className="bg-[#05000E] rounded-xl shadow border border-[#23232a] overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="border-b border-[#23232a]">
                    <th className="py-3 px-4 text-left font-semibold text-gray-300">CHANNEL NAME</th>
                    <th className="py-3 px-4 text-left font-semibold text-gray-300">PHONE</th>
                    <th className="py-3 px-4 text-left font-semibold text-gray-300">STATUS</th>
                    <th className="py-3 px-4 text-left font-semibold text-gray-300">WORK PERIOD</th>
                  </tr>
                </thead>
                <tbody>
                  {channels.map((row) => (
                    <tr key={row.id} className="border-b border-[#23232a] hover:bg-[#23232a]/40 transition">
                      <td className="py-3 px-4 flex items-center gap-2">
                        {row.channelName.icon}
                        <span>{row.channelName.text}</span>
                        {row.channelName.badge}
                      </td>
                      <td className="py-3 px-4">{row.phone}</td>
                      <td className="py-3 px-4">{row.status}</td>
                      <td className="py-3 px-4">{row.workPeriod}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </main>
      </div>
    </div>
  )
}
