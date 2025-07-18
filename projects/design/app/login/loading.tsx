export default function LoginLoading() {
  return (
    <div className="min-h-screen bg-[#121212] flex items-center justify-center">
      <div className="w-full max-w-md space-y-8 animate-pulse">
        {/* Logo/Title Skeleton */}
        <div className="text-center space-y-4">
          <div className="h-10 bg-[#1a1a1c] rounded mx-auto w-20"></div>
          <div className="h-8 bg-[#1a1a1c] rounded mx-auto w-40"></div>
        </div>

        {/* Form Skeleton */}
        <div className="space-y-6">
          <div className="space-y-2">
            <div className="h-4 bg-[#1a1a1c] rounded w-32"></div>
            <div className="h-12 bg-[#1a1a1c] rounded"></div>
          </div>
          <div className="space-y-2">
            <div className="h-4 bg-[#1a1a1c] rounded w-24"></div>
            <div className="h-12 bg-[#1a1a1c] rounded"></div>
          </div>
          <div className="h-12 bg-[#1a1a1c] rounded"></div>
        </div>

        {/* Register Link Skeleton */}
        <div className="text-center">
          <div className="h-4 bg-[#1a1a1c] rounded mx-auto w-48"></div>
        </div>
      </div>
    </div>
  )
}
