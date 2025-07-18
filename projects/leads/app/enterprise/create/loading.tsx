import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export default function CreateEnterpriseLoading() {
  return (
    <div className="min-h-screen bg-[#121212]">
      <div className="max-w-4xl mx-auto px-4 py-20">
        {/* Header Skeleton */}
        <div className="mb-8">
          <Skeleton className="h-9 w-32 mb-4 bg-[#1a1a1c]" />
          
          <div className="text-center">
            <Skeleton className="h-9 w-80 mx-auto mb-4 bg-[#1a1a1c]" />
            <Skeleton className="h-5 w-96 mx-auto bg-[#1a1a1c]" />
          </div>
        </div>

        {/* Form Skeleton */}
        <Card className="bg-[#0A0A0A] border-[#262626]">
          <CardHeader className="p-6">
            <div className="flex items-center gap-2">
              <Skeleton className="h-5 w-5 bg-[#1a1a1c]" />
              <Skeleton className="h-6 w-48 bg-[#1a1a1c]" />
            </div>
            <Skeleton className="h-4 w-64 bg-[#1a1a1c]" />
          </CardHeader>

          <CardContent className="p-6 pt-0">
            <div className="space-y-6">
              {/* Two columns row */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Skeleton className="h-4 w-32 bg-[#1a1a1c]" />
                  <Skeleton className="h-10 w-full bg-[#1a1a1c]" />
                </div>
                <div className="space-y-2">
                  <Skeleton className="h-4 w-24 bg-[#1a1a1c]" />
                  <Skeleton className="h-10 w-full bg-[#1a1a1c]" />
                </div>
              </div>

              {/* Two columns row */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Skeleton className="h-4 w-36 bg-[#1a1a1c]" />
                  <Skeleton className="h-10 w-full bg-[#1a1a1c]" />
                </div>
                <div className="space-y-2">
                  <Skeleton className="h-4 w-20 bg-[#1a1a1c]" />
                  <Skeleton className="h-10 w-full bg-[#1a1a1c]" />
                </div>
              </div>

              {/* Full width row */}
              <div className="space-y-2">
                <Skeleton className="h-4 w-20 bg-[#1a1a1c]" />
                <Skeleton className="h-10 w-full bg-[#1a1a1c]" />
              </div>

              {/* Three columns row */}
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Skeleton className="h-4 w-12 bg-[#1a1a1c]" />
                  <Skeleton className="h-10 w-full bg-[#1a1a1c]" />
                </div>
                <div className="space-y-2">
                  <Skeleton className="h-4 w-16 bg-[#1a1a1c]" />
                  <Skeleton className="h-10 w-full bg-[#1a1a1c]" />
                </div>
                <div className="space-y-2">
                  <Skeleton className="h-4 w-28 bg-[#1a1a1c]" />
                  <Skeleton className="h-10 w-full bg-[#1a1a1c]" />
                </div>
              </div>

              {/* Two columns row */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Skeleton className="h-4 w-40 bg-[#1a1a1c]" />
                  <div className="flex">
                    <Skeleton className="h-10 w-24 bg-[#1a1a1c] rounded-r-none" />
                    <Skeleton className="h-10 flex-1 bg-[#1a1a1c] rounded-l-none" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Skeleton className="h-4 w-32 bg-[#1a1a1c]" />
                  <Skeleton className="h-10 w-full bg-[#1a1a1c]" />
                </div>
              </div>

              {/* Full width row */}
              <div className="space-y-2">
                <Skeleton className="h-4 w-36 bg-[#1a1a1c]" />
                <Skeleton className="h-10 w-full bg-[#1a1a1c]" />
              </div>

              {/* Textarea */}
              <div className="space-y-2">
                <Skeleton className="h-4 w-44 bg-[#1a1a1c]" />
                <Skeleton className="h-24 w-full bg-[#1a1a1c]" />
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 pt-6">
                <Skeleton className="h-10 flex-1 bg-[#1a1a1c]" />
                <Skeleton className="h-10 flex-1 bg-[#1a1a1c]" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 