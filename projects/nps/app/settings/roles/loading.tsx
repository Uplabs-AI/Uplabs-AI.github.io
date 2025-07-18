import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Users } from "lucide-react"
import { Sidebar } from "@/components/layout/sidebar"
import UserInfoBar from "@/components/layout/user-info-bar"

export default function RolesSettingsLoading() {
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
                <Skeleton className="h-4 w-12 bg-[#1A1A1C]" />
              </div>
            </div>
            <Skeleton className="h-10 w-32 bg-[#1A1A1C]" />
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-6xl mx-auto space-y-6">
            {/* Title Section */}
            <div className="mb-8">
              <Skeleton className="h-8 w-80 mb-4 bg-[#1A1A1C]" />
              <Skeleton className="h-4 w-[520px] bg-[#1A1A1C]" />
            </div>

            {/* Three Column Layout */}
            <div className="grid grid-cols-3 gap-6">
              {/* Roles Column */}
              <div className="space-y-4">
                <Card className="bg-[#0A0A0A] border-[#262626]">
                  <CardHeader>
                    <div className="flex items-center gap-2">
                      <Users className="w-5 h-5 text-[#5E17EB]" />
                      <Skeleton className="h-6 w-32 bg-[#1A1A1C]" />
                    </div>
                    <Skeleton className="h-4 w-48 bg-[#1A1A1C]" />
                  </CardHeader>
                  
                  <CardContent className="space-y-3">
                    {/* Role Cards */}
                    {[1, 2, 3].map((index) => (
                      <div key={index} className="p-3 rounded-lg bg-[#1A1A1C] border border-[#4B5563]">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <Skeleton className="w-3 h-3 rounded-full bg-[#2A2A2C]" />
                            <Skeleton className="h-4 w-20 bg-[#2A2A2C]" />
                            <Skeleton className="w-4 h-4 bg-[#2A2A2C]" />
                          </div>
                          <Skeleton className="h-3 w-16 bg-[#2A2A2C]" />
                        </div>
                        <Skeleton className="h-3 w-full mb-2 bg-[#2A2A2C]" />
                        <Skeleton className="h-3 w-32 bg-[#2A2A2C]" />
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>

              {/* Permissions Column */}
              <div className="space-y-4">
                <Card className="bg-[#0A0A0A] border-[#262626]">
                  <CardHeader>
                    <div className="flex items-center gap-2">
                      <Users className="w-5 h-5 text-[#5E17EB]" />
                      <Skeleton className="h-6 w-40 bg-[#1A1A1C]" />
                    </div>
                    <Skeleton className="h-4 w-56 bg-[#1A1A1C]" />
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    {/* Permission Categories */}
                    {[1, 2, 3, 4].map((index) => (
                      <div key={index}>
                        <Skeleton className="h-5 w-24 mb-2 bg-[#1A1A1C]" />
                        <div className="space-y-2 pl-4">
                          {[1, 2, 3].map((permIndex) => (
                            <div key={permIndex} className="space-y-2">
                              <Skeleton className="h-4 w-32 bg-[#1A1A1C]" />
                              <div className="flex gap-2">
                                {[1, 2, 3].map((switchIndex) => (
                                  <div key={switchIndex} className="flex items-center gap-1">
                                    <Skeleton className="h-4 w-8 bg-[#1A1A1C]" />
                                    <Skeleton className="w-2 h-2 rounded-full bg-[#1A1A1C]" />
                                  </div>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>

              {/* Users Column */}
              <div className="space-y-4">
                <Card className="bg-[#0A0A0A] border-[#262626]">
                  <CardHeader>
                    <div className="flex items-center gap-2">
                      <Users className="w-5 h-5 text-[#5E17EB]" />
                      <Skeleton className="h-6 w-32 bg-[#1A1A1C]" />
                    </div>
                    <Skeleton className="h-4 w-40 bg-[#1A1A1C]" />
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    {/* Add User Form */}
                    <div className="space-y-3 p-3 rounded-lg bg-[#1A1A1C] border border-[#4B5563]">
                      <Skeleton className="h-4 w-24 bg-[#2A2A2C]" />
                      <Skeleton className="h-10 w-full bg-[#2A2A2C]" />
                      <Skeleton className="h-10 w-full bg-[#2A2A2C]" />
                      <Skeleton className="h-9 w-full bg-[#2A2A2C]" />
                    </div>

                    {/* Users List */}
                    <div className="space-y-2">
                      {[1, 2, 3].map((index) => (
                        <div key={index} className="p-3 rounded-lg bg-[#1A1A1C] border border-[#4B5563]">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <Skeleton className="w-8 h-8 rounded-full bg-[#2A2A2C]" />
                              <div>
                                <Skeleton className="h-4 w-20 mb-1 bg-[#2A2A2C]" />
                                <Skeleton className="h-3 w-32 bg-[#2A2A2C]" />
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <Skeleton className="w-24 h-6 bg-[#2A2A2C]" />
                              <Skeleton className="w-6 h-6 bg-[#2A2A2C]" />
                            </div>
                          </div>
                          <div className="flex items-center justify-between">
                            <Skeleton className="h-5 w-16 bg-[#2A2A2C]" />
                            <Skeleton className="h-3 w-20 bg-[#2A2A2C]" />
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
} 