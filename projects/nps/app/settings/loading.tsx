import { Skeleton } from "@/components/ui/skeleton"
import { Sidebar } from "@/components/layout/sidebar"

export default function SettingsLoading() {
  return (
    <div className="flex h-screen bg-[#121212]">
      <Sidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header Skeleton */}
        <header className="bg-[#121212] border-b border-border px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <Skeleton className="h-8 w-48 bg-gray-800" />
              <Skeleton className="h-4 w-96 bg-gray-800" />
            </div>
            <div className="flex items-center gap-4">
              <Skeleton className="h-10 w-24 bg-gray-800" />
              <Skeleton className="h-10 w-32 bg-gray-800" />
            </div>
          </div>
        </header>

        {/* Main Content Skeleton */}
        <main className="flex-1 overflow-auto p-6">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-between mb-6">
              <Skeleton className="h-6 w-32 bg-gray-800" />
              <Skeleton className="h-10 w-32 bg-gray-800" />
            </div>

            {/* Tabs Skeleton */}
            <div className="space-y-6">
              <Skeleton className="h-12 w-full bg-gray-800" />

              {/* Cards Skeleton */}
              <div className="space-y-6">
                <Skeleton className="h-64 w-full bg-gray-800" />
                <Skeleton className="h-48 w-full bg-gray-800" />
                <Skeleton className="h-32 w-full bg-gray-800" />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
