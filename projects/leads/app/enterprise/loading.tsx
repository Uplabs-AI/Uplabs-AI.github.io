import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="min-h-screen bg-[#121212]">
      {/* Main Container */}
      <div className="max-w-[1136px] mx-auto px-4 py-20">
        {/* Header Section Skeleton */}
        <div className="text-center mb-12">
          <Skeleton className="h-9 w-32 mx-auto mb-4 bg-[#1a1a1c]" />
          <Skeleton className="h-6 w-72 mx-auto bg-[#1a1a1c]" />
        </div>

        {/* Enterprise Cards Grid Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="relative">
              <div className="h-[290px] bg-[#05000e] border border-[#333333] rounded-lg overflow-hidden">
                {/* Color Bar Skeleton */}
                <Skeleton className="h-1 w-full bg-[#2d1e69]" />
                
                {/* Card Content Skeleton */}
                <div className="px-6 pt-6 pb-10 flex flex-col" style={{ height: 'calc(100% - 4px)' }}>
                  {/* Icon Skeleton */}
                  <div className="flex justify-center mb-6">
                    <Skeleton className="w-14 h-14 rounded-full bg-[#2d1e69]" />
                  </div>

                  {/* Title Skeleton */}
                  <div className="text-center mb-3">
                    <Skeleton className="h-7 w-24 mx-auto bg-[#1a1a1c]" />
                  </div>

                  {/* Description Skeleton */}
                  <div className="text-center flex-1 flex flex-col items-center justify-center gap-2">
                    <Skeleton className="h-4 w-full bg-[#1a1a1c]" />
                    <Skeleton className="h-4 w-3/4 bg-[#1a1a1c]" />
                  </div>

                  {/* Button Skeleton */}
                  <div className="mt-6">
                    <Skeleton className="h-10 w-full rounded-md bg-[#1a1a1c]" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
} 