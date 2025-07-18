import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Monitor } from "lucide-react"
import { Sidebar } from "@/components/layout/sidebar"
import UserInfoBar from "@/components/layout/user-info-bar"

export default function DeviceSettingsLoading() {
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
                <Skeleton className="h-4 w-20 bg-[#1A1A1C]" />
              </div>
            </div>
            <Skeleton className="h-10 w-32 bg-[#1A1A1C]" />
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-4xl mx-auto space-y-6">
            {/* Title Section */}
            <div className="mb-8">
              <Skeleton className="h-8 w-96 mb-4 bg-[#1A1A1C]" />
              <Skeleton className="h-4 w-[500px] bg-[#1A1A1C]" />
            </div>

            {/* Audio Settings Card */}
            <Card className="bg-[#0A0A0A] border-[#262626]">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Monitor className="w-5 h-5 text-[#5E17EB]" />
                  <Skeleton className="h-6 w-48 bg-[#1A1A1C]" />
                </div>
                <Skeleton className="h-4 w-80 bg-[#1A1A1C]" />
              </CardHeader>
              
              <CardContent className="space-y-6">
                {/* Device Selectors */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-32 bg-[#1A1A1C]" />
                    <Skeleton className="h-10 w-full bg-[#1A1A1C]" />
                  </div>
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-32 bg-[#1A1A1C]" />
                    <Skeleton className="h-10 w-full bg-[#1A1A1C]" />
                  </div>
                </div>

                {/* Volume Sliders */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <Skeleton className="h-4 w-40 bg-[#1A1A1C]" />
                    <Skeleton className="h-6 w-full bg-[#1A1A1C]" />
                  </div>
                  <div className="space-y-3">
                    <Skeleton className="h-4 w-40 bg-[#1A1A1C]" />
                    <Skeleton className="h-6 w-full bg-[#1A1A1C]" />
                  </div>
                </div>

                {/* Switches */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center justify-between">
                    <Skeleton className="h-4 w-32 bg-[#1A1A1C]" />
                    <Skeleton className="h-6 w-10 bg-[#1A1A1C]" />
                  </div>
                  <div className="flex items-center justify-between">
                    <Skeleton className="h-4 w-32 bg-[#1A1A1C]" />
                    <Skeleton className="h-6 w-10 bg-[#1A1A1C]" />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Network Settings Card */}
            <Card className="bg-[#0A0A0A] border-[#262626]">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Monitor className="w-5 h-5 text-[#5E17EB]" />
                  <Skeleton className="h-6 w-40 bg-[#1A1A1C]" />
                </div>
                <Skeleton className="h-4 w-72 bg-[#1A1A1C]" />
              </CardHeader>
              
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-24 bg-[#1A1A1C]" />
                    <Skeleton className="h-10 w-full bg-[#1A1A1C]" />
                  </div>
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-40 bg-[#1A1A1C]" />
                    <Skeleton className="h-10 w-full bg-[#1A1A1C]" />
                  </div>
                </div>

                <div className="space-y-3">
                  <Skeleton className="h-4 w-48 bg-[#1A1A1C]" />
                  <Skeleton className="h-6 w-full bg-[#1A1A1C]" />
                </div>

                <div className="flex items-center justify-between">
                  <Skeleton className="h-4 w-36 bg-[#1A1A1C]" />
                  <Skeleton className="h-6 w-10 bg-[#1A1A1C]" />
                </div>
              </CardContent>
            </Card>

            {/* Recording & Call Quality Cards */}
            <div className="grid grid-cols-2 gap-6">
              <Card className="bg-[#0A0A0A] border-[#262626]">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Monitor className="w-5 h-5 text-[#5E17EB]" />
                    <Skeleton className="h-6 w-24 bg-[#1A1A1C]" />
                  </div>
                  <Skeleton className="h-4 w-48 bg-[#1A1A1C]" />
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Skeleton className="h-4 w-32 bg-[#1A1A1C]" />
                    <Skeleton className="h-6 w-10 bg-[#1A1A1C]" />
                  </div>
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-36 bg-[#1A1A1C]" />
                    <Skeleton className="h-10 w-full bg-[#1A1A1C]" />
                  </div>
                  <div className="flex items-center justify-between">
                    <Skeleton className="h-4 w-32 bg-[#1A1A1C]" />
                    <Skeleton className="h-6 w-10 bg-[#1A1A1C]" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-[#0A0A0A] border-[#262626]">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Monitor className="w-5 h-5 text-[#5E17EB]" />
                    <Skeleton className="h-6 w-32 bg-[#1A1A1C]" />
                  </div>
                  <Skeleton className="h-4 w-56 bg-[#1A1A1C]" />
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-28 bg-[#1A1A1C]" />
                    <Skeleton className="h-10 w-full bg-[#1A1A1C]" />
                  </div>
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-16 bg-[#1A1A1C]" />
                    <Skeleton className="h-10 w-full bg-[#1A1A1C]" />
                  </div>
                  <div className="flex items-center justify-between">
                    <Skeleton className="h-4 w-40 bg-[#1A1A1C]" />
                    <Skeleton className="h-6 w-10 bg-[#1A1A1C]" />
                  </div>
                  <div className="flex items-center justify-between">
                    <Skeleton className="h-4 w-32 bg-[#1A1A1C]" />
                    <Skeleton className="h-6 w-10 bg-[#1A1A1C]" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
} 