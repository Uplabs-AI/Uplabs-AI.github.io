import { Sidebar } from "@/components/layout/sidebar"

export default function Loading() {
  return (
    <div className="flex h-screen bg-[#121212]">
      <Sidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header Skeleton */}
        <div className="bg-[#0a0a0a] border-b border-[#1a1a1c] p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="h-8 w-20 bg-[#1a1a1c] rounded animate-pulse" />
              <div className="h-6 w-48 bg-[#1a1a1c] rounded animate-pulse" />
            </div>
            <div className="h-9 w-24 bg-[#1a1a1c] rounded animate-pulse" />
          </div>
        </div>

        {/* Main Content Skeleton */}
        <div className="flex-1 overflow-auto p-6">
          {/* Contact Info Skeleton */}
          <div className="bg-[#1a1a1c] border border-[#1a1a1c] rounded-xl p-5 mb-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-16 h-16 mr-5 bg-[#2d1e69] rounded-full animate-pulse" />
                <div>
                  <div className="h-8 w-32 bg-[#2d1e69] rounded mb-2 animate-pulse" />
                  <div className="h-3 w-40 bg-[#2d1e69] rounded mb-1 animate-pulse" />
                  <div className="h-3 w-40 bg-[#2d1e69] rounded animate-pulse" />
                </div>
              </div>
              <div className="text-right">
                <div className="h-4 w-32 bg-[#2d1e69] rounded mb-2 animate-pulse" />
                <div className="h-5 w-20 bg-[#2d1e69] rounded animate-pulse" />
              </div>
            </div>
          </div>

          {/* Tabs Skeleton */}
          <div className="bg-[#1a1a1c] border border-[#1a1a1c] rounded-xl p-1 mb-6">
            <div className="h-10 w-32 bg-[#8280ff] rounded animate-pulse" />
          </div>

          {/* Chat Skeleton */}
          <div className="bg-[#0a0a0a] border border-[#1a1a1c] rounded-xl">
            <div className="p-6 border-b border-[#1a1a1c]">
              <div className="h-6 w-32 bg-[#1a1a1c] rounded animate-pulse" />
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {/* Message Skeletons */}
                {Array.from({ length: 8 }).map((_, i) => (
                  <div key={i} className={`flex ${i % 2 === 0 ? 'justify-start' : 'justify-end'}`}>
                    <div className={`flex items-start gap-2 max-w-[70%] ${i % 2 === 0 ? '' : 'flex-row-reverse'}`}>
                      <div className="w-7 h-7 bg-[#2d1e69] rounded-full animate-pulse" />
                      <div className={`p-3 rounded-lg ${i % 2 === 0 ? 'bg-[#1c1c1c]' : 'bg-[#2d1e69]'} animate-pulse`}>
                        <div className="h-4 w-48 bg-gray-600 rounded mb-2" />
                        <div className="h-4 w-32 bg-gray-600 rounded" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 