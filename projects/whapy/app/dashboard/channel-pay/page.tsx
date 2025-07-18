"use client"

import { Sidebar } from "@/components/layout/sidebar"
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select"
import { Info, Bitcoin, ArrowLeftRight } from "lucide-react"
import { useRouter } from "next/navigation"

export default function ChannelPayPage() {
  const router = useRouter();
  return (
    <div className="flex min-h-screen bg-background text-foreground">
      {/* Sidebar */}
      <div className="w-64 hidden md:block">
        <Sidebar />
      </div>
      {/* Header Custom fuera del main content */}
      <div className="flex-1 flex flex-col">
        <header className="flex items-center justify-between p-4 border-b border-border mb-8">
          <h1 className="text-xl font-semibold">Pago de Canal</h1>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3 bg-[#121212] border border-[#1d1d20] rounded-md px-4 py-2">
              <div className="w-7 h-7 bg-[#241543] rounded-full flex items-center justify-center">
                <span className="text-[#ad84ff] text-sm font-medium select-none">U</span>
              </div>
              <span className="text-white text-sm font-medium whitespace-nowrap">usuario@empresa.com</span>
            </div>
            <a className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border hover:text-accent-foreground h-9 rounded-md px-3 bg-[#121212] border-[#1d1d20] text-white hover:bg-[#1a1a1c]" href="/auth/logout">Sign Out</a>
          </div>
        </header>
        {/* Main Content */}
        <div className="flex-1 overflow-hidden p-8">
          <div className="max-w-4xl mx-auto space-y-4">
            <h1 className="text-4xl font-bold text-center">Channel GAMORA-QXBA3 require payment</h1>
            <Alert className="bg-muted/50 flex items-start gap-4">
              <Info className="w-5 h-5 mt-1 text-blue-400" />
              <div>
                <AlertTitle>We can only provide one trial channel per account.</AlertTitle>
                <AlertDescription>
                  To use the new channel, payment required or you can contact support to extend the trial access.
                </AlertDescription>
              </div>
            </Alert>
          </div>
          <Card className="max-w-md mx-auto mt-8 p-8 bg-[#05000E] border-[#23232a]">
            {/* Price Section */}
            <div className="text-center space-y-2 mb-8">
              <p className="text-muted-foreground">Your Price</p>
              <p className="text-5xl font-bold">
                <span>$35</span>
                <span className="text-xl font-normal text-muted-foreground"> /per month</span>
              </p>
            </div>
            {/* Payment Form */}
            <div className="space-y-6">
              {/* Payment Method Tabs */}
              <Tabs defaultValue="stripe" className="w-full">
                <TabsList className="w-full grid grid-cols-2 mb-2">
                  <TabsTrigger value="stripe" className="w-full">Stripe</TabsTrigger>
                  <TabsTrigger value="crypto" className="w-full flex items-center gap-2">
                    <Bitcoin className="w-4 h-4" />CRYPTO
                  </TabsTrigger>
                </TabsList>
              </Tabs>
              {/* Period Selector */}
              <div>
                <label className="block text-sm font-medium mb-1 text-muted-foreground">Period</label>
                <Select defaultValue="monthly">
                  <SelectTrigger className="w-full bg-[#1a1a1c] border-[#374151] text-white">
                    <SelectValue placeholder="Select period" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#1a1a1c] border-[#374151]">
                    <SelectItem value="monthly">Payment per month</SelectItem>
                    <SelectItem value="yearly">Payment per year</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              {/* Total Section */}
              <div className="flex justify-between items-baseline pt-4">
                <p className="text-xl font-medium">Total:</p>
                <p className="text-3xl font-bold">35$</p>
              </div>
              {/* Continue Payment Button */}
              <Button className="w-full bg-[#5E17EB] hover:bg-[#4b13c2] text-white">Continue Payment</Button>
              {/* Sandbox Switch Button */}
              <Button
                variant="link"
                className="text-muted-foreground mx-auto flex items-center gap-2"
                onClick={() => router.push("/dashboard/step-1")}
              >
                <ArrowLeftRight className="w-4 h-4" />
                Switch to Sandbox mode with limits
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
} 