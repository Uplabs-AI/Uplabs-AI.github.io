import { Sidebar } from "@/components/layout/sidebar"

export default function Loading() {
  return (
    <div className="flex h-screen bg-[#121212]">
      <Sidebar />
      <div className="flex-1 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#5e17eb]"></div>
      </div>
    </div>
  )
}
