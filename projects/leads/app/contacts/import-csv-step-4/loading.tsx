import { Skeleton } from "@/components/ui/skeleton"

export default function ImportCSVStep4Loading() {
  return (
    <div className="flex-1 p-8">
      {/* Header */}
      <div className="flex items-center mb-8">
        <Skeleton className="h-4 w-16 bg-[#374151]" />
        <Skeleton className="h-8 w-64 ml-4 bg-[#374151]" />
      </div>

      {/* Progress Steps */}
      <div className="flex items-center justify-center mb-12">
        <div className="flex items-center gap-8">
          {[1, 2, 3, 4].map((step, index) => (
            <div key={step} className="flex items-center">
              <div className="flex flex-col items-center">
                <Skeleton className="w-16 h-16 rounded-full bg-[#374151]" />
                <Skeleton className="h-4 w-12 mt-2 bg-[#374151]" />
              </div>
              {index < 3 && <Skeleton className="w-16 h-px bg-[#374151] mx-4" />}
            </div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Preferences Card */}
        <div className="bg-[#05000E] border border-[#374151] rounded-lg p-6">
          <Skeleton className="h-6 w-32 mb-2 bg-[#374151]" />
          <Skeleton className="h-4 w-96 mb-6 bg-[#374151]" />

          <div className="space-y-6">
            <div>
              <Skeleton className="h-5 w-40 mb-3 bg-[#374151]" />
              <Skeleton className="h-6 w-24 bg-[#374151]" />
            </div>

            <div className="flex items-center space-x-4">
              <Skeleton className="h-4 w-4 bg-[#374151]" />
              <Skeleton className="h-4 w-48 bg-[#374151]" />
              <Skeleton className="h-10 w-48 bg-[#374151]" />
            </div>

            <div>
              <Skeleton className="h-5 w-24 mb-3 bg-[#374151]" />
              <Skeleton className="h-16 w-48 bg-[#374151]" />
            </div>
          </div>
        </div>

        {/* Content Mapping Card */}
        <div className="bg-[#05000E] border border-[#374151] rounded-lg p-6">
          <Skeleton className="h-6 w-40 mb-6 bg-[#374151]" />

          {/* Table Header */}
          <div className="grid grid-cols-5 gap-4 mb-4 pb-3 border-b border-[#374151]">
            {[1, 2, 3, 4, 5].map((col) => (
              <Skeleton key={col} className="h-4 w-24 bg-[#374151]" />
            ))}
          </div>

          {/* Table Rows */}
          <div className="space-y-3">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((row) => (
              <div key={row} className="grid grid-cols-5 gap-4 items-center py-3">
                <Skeleton className="h-4 w-16 bg-[#374151]" />
                <Skeleton className="h-4 w-24 bg-[#374151]" />
                <Skeleton className="h-6 w-20 bg-[#374151]" />
                <Skeleton className="h-4 w-16 bg-[#374151]" />
                <Skeleton className="h-8 w-32 bg-[#374151]" />
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-4 mt-8">
          <Skeleton className="h-10 w-24 bg-[#374151]" />
          <Skeleton className="h-10 w-24 bg-[#374151]" />
        </div>
      </div>
    </div>
  )
}
