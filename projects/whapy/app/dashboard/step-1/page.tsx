"use client"

import { Sidebar } from "@/components/layout/sidebar"
import { Home, ChevronRight, Rocket, Columns, UserCheck, ThumbsUp, Loader2, ArrowRight } from "lucide-react"
import Image from "next/image"
import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function Step1Page() {
  const router = useRouter();
  useEffect(() => {
    const timeout = setTimeout(() => {
      router.push("/dashboard/step-2");
    }, 5000);
    return () => clearTimeout(timeout);
  }, [router]);
  return (
    <div className="min-h-screen bg-background text-foreground flex">
      {/* Sidebar */}
      <div className="w-64 hidden md:block">
        <Sidebar />
      </div>
      {/* Header Campañas arriba de todo */}
      <div className="flex-1 flex flex-col">
        <header className="flex items-center justify-between p-4 border-b border-border">
          <h1 className="text-xl font-semibold">Channel</h1>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3 bg-[#121212] border border-[#1d1d20] rounded-md px-4 py-2">
              <div className="w-7 h-7 bg-[#241543] rounded-full flex items-center justify-center">
                <span className="text-[#ad84ff] text-sm font-medium select-none">U</span>
              </div>
              <span className="text-white text-sm font-medium whitespace-nowrap">usuario@empresa.com</span>
            </div>
            <a className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border hover:text-accent-foreground h-9 rounded-md px-3 bg-[#121212] border-[#1d1d20] text-white hover:bg-[#1a1a1c]" href="/auth/logout">Sign Out</a>
          </div>
        </header>
        {/* Main Content */}
        <div className="flex-1 flex flex-col p-6 font-sans">
          {/* Header */}
          <header className="flex justify-between items-center py-4 border-b border-border mb-8">
            <h1 className="text-2xl font-semibold">Channel Connection</h1>
            <div className="flex items-center gap-4 text-muted-foreground">
              <Home className="h-5 w-5" />
              <span>Dashboard</span>
              <ChevronRight className="h-4 w-4" />
              <span>Start channel</span>
            </div>
          </header>
          <main className="flex flex-col items-center flex-grow w-full">
            {/* Steps visual */}
            <div className="flex flex-row justify-center items-stretch w-full max-w-5xl gap-8 mb-12 px-2 lg:px-0">
              {/* Step 1 */}
              <div className="flex flex-col items-center flex-1 min-w-[120px]">
                <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center mb-2">
                  <Rocket className="h-10 w-10 text-primary-foreground" />
                </div>
                <span className="text-base text-primary font-medium">Start channel</span>
              </div>
              {/* Line + Arrow */}
              <div className="hidden lg:flex flex-1 items-center justify-center">
                <div className="w-full flex items-center">
                  <div className="flex-1 border-t-2 border-dashed border-border" />
                  <ArrowRight className="mx-2 text-muted-foreground w-8 h-8" />
                  <div className="flex-1 border-t-2 border-dashed border-border" />
                </div>
              </div>
              {/* Step 2 */}
              <div className="flex flex-col items-center flex-1 min-w-[120px] text-muted-foreground">
                <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-2">
                  <Columns className="h-10 w-10 text-muted-foreground" />
                </div>
                <span className="text-base font-medium">Channel Connection</span>
              </div>
              {/* Line + Arrow */}
              <div className="hidden lg:flex flex-1 items-center justify-center">
                <div className="w-full flex items-center">
                  <div className="flex-1 border-t-2 border-dashed border-border" />
                  <ArrowRight className="mx-2 text-muted-foreground w-8 h-8" />
                  <div className="flex-1 border-t-2 border-dashed border-border" />
                </div>
              </div>
              {/* Step 3 */}
              <div className="flex flex-col items-center flex-1 min-w-[120px] text-muted-foreground">
                <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-2">
                  <UserCheck className="h-10 w-10 text-muted-foreground" />
                </div>
                <span className="text-base font-medium">Confirm Detail</span>
              </div>
              {/* Line + Arrow */}
              <div className="hidden lg:flex flex-1 items-center justify-center">
                <div className="w-full flex items-center">
                  <div className="flex-1 border-t-2 border-dashed border-border" />
                  <ArrowRight className="mx-2 text-muted-foreground w-8 h-8" />
                  <div className="flex-1 border-t-2 border-dashed border-border" />
                </div>
              </div>
              {/* Step 4 */}
              <div className="flex flex-col items-center flex-1 min-w-[120px] text-muted-foreground">
                <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-2">
                  <ThumbsUp className="h-10 w-10 text-muted-foreground" />
                </div>
                <span className="text-base font-medium">Finish Settings (optionally)</span>
              </div>
            </div>
            {/* Subtítulo */}
            <h2 className="text-xl font-semibold mb-8 self-start max-w-5xl w-full px-2 lg:px-0">1. Start Channel</h2>
            {/* Contenido principal */}
            <div className="flex flex-col items-center justify-center flex-grow max-w-xl w-full mx-auto">
              <Image src="/cohete.png" alt="Rocket" width={128} height={128} className="w-32 h-32 mb-8" />
              <p className="text-lg text-muted-foreground mb-8 text-center">Setting up your channel. Please wait</p>
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          </main>
        </div>
      </div>
    </div>
  )
} 