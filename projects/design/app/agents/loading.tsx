import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

export default function AgentsLoading() {
  return (
    <div className="min-h-screen bg-[#05000e] text-white">
      <div className="flex">
        <div className="flex-1 p-6">
          {/* Header Skeleton */}
          <div className="flex justify-between items-center mb-8">
            <Skeleton className="h-8 w-32 bg-gray-800" />
            <div className="flex gap-4">
              <Skeleton className="h-10 w-24 bg-gray-800" />
              <Skeleton className="h-10 w-32 bg-gray-800" />
            </div>
          </div>

          {/* Performance Section Skeleton */}
          <div className="mb-8">
            <Skeleton className="h-6 w-64 mb-4 bg-gray-800" />

            {/* Filters Skeleton */}
            <div className="flex justify-between items-center mb-6">
              <div className="flex gap-4">
                <Skeleton className="h-10 w-48 bg-gray-800" />
                <Skeleton className="h-10 w-48 bg-gray-800" />
              </div>
              <div className="flex gap-2">
                <Skeleton className="h-8 w-20 bg-gray-800" />
                <Skeleton className="h-8 w-32 bg-gray-800" />
                <Skeleton className="h-8 w-28 bg-gray-800" />
                <Skeleton className="h-8 w-20 bg-gray-800" />
              </div>
            </div>

            {/* Tabs Skeleton */}
            <Skeleton className="h-10 w-full mb-6 bg-gray-800" />

            {/* Dashboard Cards Skeleton */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {[...Array(4)].map((_, i) => (
                <Card key={i} className="bg-[#1a1a1c] border-gray-700">
                  <CardHeader className="pb-3">
                    <Skeleton className="h-4 w-32 bg-gray-800" />
                  </CardHeader>
                  <CardContent>
                    <Skeleton className="h-24 w-full bg-gray-800" />
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Agent Management Skeleton */}
          <div>
            <div className="flex justify-between items-center mb-6">
              <div>
                <Skeleton className="h-6 w-48 mb-2 bg-gray-800" />
                <Skeleton className="h-4 w-64 bg-gray-800" />
              </div>
              <Skeleton className="h-10 w-48 bg-gray-800" />
            </div>

            {/* Agent Tabs Skeleton */}
            <Skeleton className="h-10 w-full mb-6 bg-gray-800" />

            {/* Agent Cards Skeleton */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <Card key={i} className="bg-[#1a1a1c] border-gray-700">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <Skeleton className="w-10 h-10 rounded-full bg-gray-800" />
                        <div>
                          <Skeleton className="h-4 w-16 mb-2 bg-gray-800" />
                          <Skeleton className="h-6 w-20 bg-gray-800" />
                        </div>
                      </div>
                    </div>
                    <Skeleton className="h-4 w-full mb-4 bg-gray-800" />
                    <div className="space-y-2 mb-4">
                      <Skeleton className="h-4 w-32 bg-gray-800" />
                      <Skeleton className="h-4 w-40 bg-gray-800" />
                      <Skeleton className="h-4 w-36 bg-gray-800" />
                    </div>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      {[...Array(4)].map((_, j) => (
                        <div key={j}>
                          <Skeleton className="h-3 w-16 mb-1 bg-gray-800" />
                          <Skeleton className="h-4 w-12 bg-gray-800" />
                        </div>
                      ))}
                    </div>
                    <div className="flex items-center justify-between pt-4 border-t border-gray-700">
                      <div className="flex gap-2">
                        <Skeleton className="h-8 w-16 bg-gray-800" />
                        <Skeleton className="h-8 w-20 bg-gray-800" />
                        <Skeleton className="h-8 w-16 bg-gray-800" />
                      </div>
                      <Skeleton className="h-6 w-10 bg-gray-800" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
