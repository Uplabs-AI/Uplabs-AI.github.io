import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Toaster } from "@/components/ui/toaster"
import { AgentsProvider } from "@/lib/contexts/agents-context"
import { BuyCreditsModalProvider } from "@/components/contexts/buy-credits-modal-context"
import BuyCreditsModal from "@/components/modals/buy-credits-modal"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "NPS VOX - AI Voice Agents",
  description: "Manage your AI voice agents for NPS campaigns",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AgentsProvider>
          <BuyCreditsModalProvider>
            {children}
            <Toaster />
            <BuyCreditsModal />
          </BuyCreditsModalProvider>
        </AgentsProvider>
      </body>
    </html>
  )
}
