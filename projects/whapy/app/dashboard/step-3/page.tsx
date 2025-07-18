"use client"

import { Sidebar } from "@/components/layout/sidebar"
import { Home, ChevronRight, Rocket, QrCode, UserCheck, ThumbsUp, Loader2, CheckCircle } from "lucide-react"
import Image from "next/image"
import { Input } from "@/components/ui/input"
import { Alert, AlertDescription } from "@/components/ui/alert"
import Link from "next/link"
import React from "react"
import { useRouter } from "next/navigation"

export default function Step3Page() {
  const [channelName, setChannelName] = React.useState("");
  const [showAlert, setShowAlert] = React.useState(false);
  const router = useRouter();

  function handleNext(e: React.FormEvent) {
    e.preventDefault();
    if (!channelName.trim()) {
      setShowAlert(true);
      return;
    }
    router.push("/dashboard/step-4");
  }

  return (
    <div className="min-h-screen bg-background text-foreground flex">
      {/* Sidebar */}
      <div className="w-64 hidden md:block">
        <Sidebar />
      </div>
      {/* Header superior */}
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
        {/* Header de breadcrumbs y título */}
        <div className="flex-1 flex flex-col p-6 font-sans">
          <header className="flex justify-between items-center py-4 border-b border-border mb-8">
            <h1 className="text-2xl font-semibold">Channel Connection</h1>
            <div className="flex items-center gap-4 text-muted-foreground text-sm">
              <Home className="h-4 w-4" />
              <span>Dashboard</span>
              <ChevronRight className="h-4 w-4" />
              <span>Confirm Detail</span>
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
                  <ChevronRight className="mx-2 text-muted-foreground w-8 h-8" />
                  <div className="flex-1 border-t-2 border-dashed border-border" />
                </div>
              </div>
              {/* Step 2 */}
              <div className="flex flex-col items-center flex-1 min-w-[120px]">
                <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center mb-2">
                  <QrCode className="h-10 w-10 text-primary-foreground" />
                </div>
                <span className="text-base text-primary font-medium">Channel Connection</span>
              </div>
              {/* Line + Arrow */}
              <div className="hidden lg:flex flex-1 items-center justify-center">
                <div className="w-full flex items-center">
                  <div className="flex-1 border-t-2 border-dashed border-border" />
                  <ChevronRight className="mx-2 text-muted-foreground w-8 h-8" />
                  <div className="flex-1 border-t-2 border-dashed border-border" />
                </div>
              </div>
              {/* Step 3 (active) */}
              <div className="flex flex-col items-center flex-1 min-w-[120px]">
                <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center mb-2">
                  <UserCheck className="h-10 w-10 text-primary-foreground" />
                </div>
                <span className="text-base text-primary font-medium">Confirm Detail</span>
              </div>
              {/* Line + Arrow */}
              <div className="hidden lg:flex flex-1 items-center justify-center">
                <div className="w-full flex items-center">
                  <div className="flex-1 border-t-2 border-dashed border-border" />
                  <ChevronRight className="mx-2 text-muted-foreground w-8 h-8" />
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
            {/* Card principal */}
            <div className="w-full max-w-4xl bg-card border border-border rounded-lg shadow-none p-0">
              <div className="border-b border-border p-6 pb-2">
                <h4 className="text-xl font-semibold">3. Confirm Detail</h4>
              </div>
              <div className="p-6">
                <div className="flex flex-col lg:flex-row gap-8">
                  {/* User info */}
                  <div className="flex flex-col items-center gap-4 lg:w-2/5">
                    <div className="flex items-center gap-4 mb-4">
                      <span className="relative">
                        <span className="w-20 h-20 rounded-full bg-muted flex items-center justify-center">
                          <UserCheck className="w-10 h-10 text-primary-foreground" />
                        </span>
                        <span className="absolute bottom-1 right-1 bg-green-500 rounded-full p-1 border-2 border-background">
                          <CheckCircle className="w-4 h-4 text-green-400" />
                        </span>
                      </span>
                      <div className="ml-4">
                        <h5 className="text-lg font-semibold">~</h5>
                        <p className="text-base text-muted-foreground mt-1 mb-0">+591 68802508</p>
                      </div>
                    </div>
                  </div>
                  {/* Alert */}
                  <div className="flex-1">
                    <Alert variant="default" className="flex items-start gap-4 bg-yellow-500/10 border-yellow-500/20">
                      <Image src="/img/whapi/confirm_usual.svg" alt="warning" width={32} height={32} className="me-2 mt-1" />
                      <div>
                        <AlertDescription>
                          <p className="text-sm text-yellow-400">The connected account is not a WhatsApp Business. Some features will not be available on it, such as Catalog, Labels, Business Information</p>
                          <Link href="https://business.whatsapp.com/products/business-app" target="_blank" className="text-yellow-400 font-semibold underline">Download WhatsApp Business</Link>
                        </AlertDescription>
                      </div>
                    </Alert>
                  </div>
                </div>
                {/* Formulario para editar nombre del canal */}
                <div className="mt-8">
                  <form onSubmit={handleNext}>
                    {showAlert && (
                      <div role="alert" className="relative w-full rounded-lg border p-4 [&>svg~*]:pl-7 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground text-foreground bg-yellow-500/10 border-yellow-500/20 mb-4">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-triangle-alert h-4 w-4 text-yellow-400"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"></path><path d="M12 9v4"></path><path d="M12 17h.01"></path></svg>
                        <div className="text-sm [&_p]:leading-relaxed text-yellow-400">Es necesario el Nombre del Canal</div>
                      </div>
                    )}
                    <div className="mb-3">
                      <label className="block text-sm font-medium mb-1" htmlFor="channel_name">Channel Name</label>
                      <Input id="channel_name" className="form-control bg-[#1a1a1c] border-[#374151] text-white" type="text" name="channel_name" placeholder="Channel Name" value={channelName} onChange={e => { setChannelName(e.target.value); setShowAlert(false); }} />
                    </div>
                    <div className="flex justify-end space-x-3 mt-8 w-full">
                      <button type="button" className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border bg-background hover:bg-accent h-10 px-4 py-2 border-gray-600 text-gray-400 hover:text-white">Atrás</button>
                      <button type="submit" className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 h-10 px-4 py-2 bg-[#5E17EB] hover:bg-[#5E17EB]/90 text-white">Siguiente</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  )
} 