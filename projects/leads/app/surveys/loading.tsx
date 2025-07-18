import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent } from "@/components/ui/card"
import { Sidebar } from "@/components/layout/sidebar"

export default function SurveysLoading() {
  return (
    <div className="flex h-screen bg-[#1A1A1C]">
      <Sidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-7xl mx-auto space-y-6">
            {/* Header Skeleton */}
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <Skeleton className="h-8 w-48 bg-gray-700" />
                <Skeleton className="h-4 w-80 bg-gray-700" />
              </div>
              <Skeleton className="h-10 w-48 bg-gray-700" />
            </div>

            {/* Tabs Skeleton */}
            <div className="space-y-4">
              <Skeleton className="h-10 w-full bg-gray-700" />

              {/* Search and Filter Skeleton */}
              <div className="flex items-center gap-4">
                <Skeleton className="h-10 flex-1 max-w-md bg-gray-700" />
                <Skeleton className="h-10 w-24 bg-gray-700" />
              </div>

              {/* Table Skeleton */}
              <Card className="bg-[#05000E] border-gray-700">
                <CardContent className="p-0">
                  <div className="space-y-4 p-6">
                    {/* Table Header */}
                    <div className="grid grid-cols-7 gap-4">
                      {Array.from({ length: 7 }).map((_, i) => (
                        <Skeleton key={i} className="h-4 w-full bg-gray-700" />
                      ))}
                    </div>

                    {/* Table Rows */}
                    {Array.from({ length: 5 }).map((_, i) => (
                      <div key={i} className="grid grid-cols-7 gap-4">
                        {Array.from({ length: 7 }).map((_, j) => (
                          <Skeleton key={j} className="h-8 w-full bg-gray-700" />
                        ))}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Pagination Skeleton */}
              <div className="flex items-center justify-between">
                <Skeleton className="h-4 w-48 bg-gray-700" />
                <div className="flex items-center gap-2">
                  <Skeleton className="h-8 w-20 bg-gray-700" />
                  <Skeleton className="h-8 w-8 bg-gray-700" />
                  <Skeleton className="h-8 w-20 bg-gray-700" />
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
