import { Sidebar } from "@/components/layout/sidebar"

export default function ChannelLoading() {
  return (
    <div className="min-h-screen bg-background text-foreground flex">
      {/* Sidebar */}
      <div className="w-64 hidden md:block">
        <Sidebar />
      </div>
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header superior */}
        <header className="flex items-center justify-between p-4 border-b border-border">
          <div className="h-6 w-32 bg-muted rounded animate-pulse"></div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3 bg-[#121212] border border-[#1d1d20] rounded-md px-4 py-2">
              <div className="w-7 h-7 bg-[#241543] rounded-full flex items-center justify-center">
                <span className="text-[#ad84ff] text-sm font-medium select-none">U</span>
              </div>
              <span className="text-white text-sm font-medium whitespace-nowrap">usuario@empresa.com</span>
            </div>
            <div className="h-9 w-20 bg-[#121212] border border-[#1d1d20] rounded-md animate-pulse"></div>
          </div>
        </header>

        {/* Loading Content */}
        <div className="flex-1 flex flex-col p-6 font-sans">
          <div className="flex items-center justify-center h-full">
            <div className="text-center space-y-4">
              <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
              <h2 className="text-2xl font-semibold">Cargando canal...</h2>
              <p className="text-muted-foreground">Preparando tu asistente de IA</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 