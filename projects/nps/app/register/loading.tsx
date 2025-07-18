export default function Loading() {
  return (
    <div className="min-h-screen bg-[#121212] flex items-center justify-center">
      <div className="w-full max-w-md space-y-8 animate-pulse">
        <div className="text-center">
          <div className="h-10 bg-gray-700 rounded w-20 mx-auto mb-8"></div>
          <div className="h-8 bg-gray-700 rounded w-48 mx-auto mb-8"></div>
        </div>
        <div className="space-y-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="space-y-2">
              <div className="h-4 bg-gray-700 rounded w-32"></div>
              <div className="h-12 bg-gray-700 rounded"></div>
            </div>
          ))}
          <div className="h-12 bg-gray-700 rounded"></div>
        </div>
      </div>
    </div>
  )
}
