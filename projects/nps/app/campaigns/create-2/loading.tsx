export default function Loading() {
  return (
    <div className="flex h-screen bg-[#121212] text-white">
      <div className="w-64 hidden md:block bg-[#000000] border-r border-border">
        <div className="p-4">
          <div className="h-8 bg-gray-700 rounded animate-pulse"></div>
        </div>
      </div>

      <div className="flex-1 flex flex-col">
        <div className="h-16 bg-[#05000E] border-b border-[#1a1a1c] flex items-center px-6">
          <div className="h-6 w-32 bg-gray-700 rounded animate-pulse"></div>
        </div>

        <div className="flex-1 p-6">
          <div className="max-w-6xl mx-auto space-y-8">
            <div className="h-8 w-48 bg-gray-700 rounded animate-pulse"></div>
            <div className="h-64 bg-[#05000E] rounded-lg animate-pulse"></div>
            <div className="h-64 bg-[#05000E] rounded-lg animate-pulse"></div>
            <div className="h-64 bg-[#05000E] rounded-lg animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  )
}
