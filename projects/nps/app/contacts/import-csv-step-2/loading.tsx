import { Skeleton } from "@/components/ui/skeleton"

export default function ImportCSVStep2Loading() {
  return (
    <div className="flex-1 p-8">
      {/* Header Skeleton */}
      <div className="flex items-center mb-8">
        <Skeleton className="h-4 w-16 bg-[#374151]" />
        <Skeleton className="h-8 w-64 ml-4 bg-[#374151]" />
      </div>

      {/* Progress Steps Skeleton */}
      <div className="flex items-center justify-center mb-12">
        <div className="flex items-center gap-8">
          {[1, 2, 3, 4].map((step, index) => (
            <div key={step} className="flex items-center">
              <div className="flex flex-col items-center">
                <Skeleton className="w-16 h-16 rounded-full bg-[#374151]" />
                <Skeleton className="h-4 w-12 mt-2 bg-[#374151]" />
              </div>
              {index < 3 && <Skeleton className="w-16 h-px mx-4 bg-[#374151]" />}
            </div>
          ))}
        </div>
      </div>

      {/* Main Content Skeleton */}
      <div className="max-w-4xl mx-auto">
        <div className="bg-[#05000E] border border-[#374151] rounded-lg p-8">
          <Skeleton className="h-6 w-48 mb-2 bg-[#374151]" />
          <Skeleton className="h-4 w-80 mb-8 bg-[#374151]" />

          {/* Upload Area Skeleton */}
          <Skeleton className="h-64 w-full rounded-lg bg-[#1f1f22]" />
        </div>

        {/* Action Buttons Skeleton */}
        <div className="flex justify-end gap-4 mt-8">
          <Skeleton className="h-10 w-24 bg-[#374151]" />
          <Skeleton className="h-10 w-24 bg-[#374151]" />
        </div>
      </div>
    </div>
  )
}
