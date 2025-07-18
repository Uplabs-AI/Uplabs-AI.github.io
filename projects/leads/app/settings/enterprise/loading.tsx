import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Building } from "lucide-react"
import { Sidebar } from "@/components/layout/sidebar"
import UserInfoBar from "@/components/layout/user-info-bar"

export default function EnterpriseSettingsLoading() {
  return (
    <div className="flex h-screen bg-[#121212]">
      <Sidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <UserInfoBar email="usuario@empresa.com" />
        
        {/* Header Skeleton */}
        <header className="bg-[#0A0A0A] border-b border-[#262626] px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Skeleton className="h-8 w-8 bg-[#1A1A1C]" />
              <div className="flex items-center space-x-2">
                <Skeleton className="h-4 w-20 bg-[#1A1A1C]" />
                <span className="text-[#9ca3af]">/</span>
                <Skeleton className="h-4 w-16 bg-[#1A1A1C]" />
              </div>
            </div>
            <Skeleton className="h-10 w-32 bg-[#1A1A1C]" />
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-4xl mx-auto">
            {/* Title Section */}
            <div className="mb-8">
              <Skeleton className="h-8 w-80 mb-4 bg-[#1A1A1C]" />
              <Skeleton className="h-4 w-96 bg-[#1A1A1C]" />
            </div>

            {/* Main Card */}
            <Card className="bg-[#0A0A0A] border-[#262626]">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Building className="w-5 h-5 text-[#5E17EB]" />
                  <Skeleton className="h-6 w-48 bg-[#1A1A1C]" />
                </div>
                <Skeleton className="h-4 w-64 bg-[#1A1A1C]" />
              </CardHeader>
              
              <CardContent className="space-y-6">
                {/* Company Name & Industry Row */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-32 bg-[#1A1A1C]" />
                    <Skeleton className="h-10 w-full bg-[#1A1A1C]" />
                  </div>
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-24 bg-[#1A1A1C]" />
                    <Skeleton className="h-10 w-full bg-[#1A1A1C]" />
                  </div>
                </div>

                {/* Company Size & Website Row */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-36 bg-[#1A1A1C]" />
                    <Skeleton className="h-10 w-full bg-[#1A1A1C]" />
                  </div>
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-20 bg-[#1A1A1C]" />
                    <Skeleton className="h-10 w-full bg-[#1A1A1C]" />
                  </div>
                </div>

                {/* Address */}
                <div className="space-y-2">
                  <Skeleton className="h-4 w-24 bg-[#1A1A1C]" />
                  <Skeleton className="h-10 w-full bg-[#1A1A1C]" />
                </div>

                {/* Country, City, Zip Row */}
                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-12 bg-[#1A1A1C]" />
                    <Skeleton className="h-10 w-full bg-[#1A1A1C]" />
                  </div>
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-16 bg-[#1A1A1C]" />
                    <Skeleton className="h-10 w-full bg-[#1A1A1C]" />
                  </div>
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-24 bg-[#1A1A1C]" />
                    <Skeleton className="h-10 w-full bg-[#1A1A1C]" />
                  </div>
                </div>

                {/* Phone & Email Row */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-40 bg-[#1A1A1C]" />
                    <div className="flex">
                      <Skeleton className="h-10 w-24 bg-[#1A1A1C] rounded-r-none" />
                      <Skeleton className="h-10 flex-1 bg-[#1A1A1C] rounded-l-none" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-32 bg-[#1A1A1C]" />
                    <Skeleton className="h-10 w-full bg-[#1A1A1C]" />
                  </div>
                </div>

                {/* Tax ID */}
                <div className="space-y-2">
                  <Skeleton className="h-4 w-32 bg-[#1A1A1C]" />
                  <Skeleton className="h-10 w-full bg-[#1A1A1C]" />
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <Skeleton className="h-4 w-40 bg-[#1A1A1C]" />
                  <Skeleton className="h-24 w-full bg-[#1A1A1C]" />
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
} 