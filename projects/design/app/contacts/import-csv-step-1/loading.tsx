import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent } from "@/components/ui/card"

export default function Loading() {
  return (
    <div className="flex-1 p-8">
      {/* Header Skeleton */}
      <div className="flex items-center mb-8">
        <Skeleton className="h-4 w-16" />
        <Skeleton className="h-8 w-64 ml-4" />
      </div>

      {/* Progress Steps Skeleton */}
      <div className="flex items-center justify-center mb-12">
        <div className="flex items-center gap-8">
          {[1, 2, 3, 4].map((step, index) => (
            <div key={step} className="flex items-center">
              <div className="flex flex-col items-center">
                <Skeleton className="w-16 h-16 rounded-full" />
                <Skeleton className="h-4 w-12 mt-2" />
              </div>
              {index < 3 && <Skeleton className="w-16 h-px mx-4" />}
            </div>
          ))}
        </div>
      </div>

      {/* Main Content Skeleton */}
      <div className="max-w-4xl mx-auto">
        <Card>
          <CardContent className="p-8">
            <Skeleton className="h-6 w-32 mb-6" />

            <div className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Skeleton className="w-4 h-4 rounded-full" />
                  <Skeleton className="h-5 w-40" />
                </div>
                <div className="ml-7">
                  <Skeleton className="h-10 w-80" />
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Skeleton className="w-4 h-4 rounded-full" />
                  <Skeleton className="h-5 w-48" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons Skeleton */}
        <div className="flex justify-end gap-4 mt-8">
          <Skeleton className="h-10 w-24" />
          <Skeleton className="h-10 w-24" />
        </div>
      </div>
    </div>
  )
}
