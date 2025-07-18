export default function Loading() {
  return (
    <div className="flex-1 space-y-6 p-6 pt-4 bg-[#121212] min-h-screen">
      <div className="flex flex-col space-y-2">
        <div className="h-8 w-64 bg-[#0A0A0A] rounded animate-pulse" />
        <div className="h-5 w-96 bg-[#0A0A0A] rounded animate-pulse" />
      </div>

      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="space-y-2">
            <div className="h-6 w-48 bg-[#0A0A0A] rounded animate-pulse" />
          </div>
        ))}
      </div>
    </div>
  )
}
