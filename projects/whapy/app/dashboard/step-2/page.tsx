"use client"

import { Sidebar } from "@/components/layout/sidebar"
import { Home, ChevronRight, Rocket, QrCode, UserCheck, ThumbsUp, Loader2 } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogClose } from "@/components/ui/dialog"
import Image from "next/image"
import React from "react"
import { DialogFooter } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select"
import { useRouter } from "next/navigation"

export default function Step2Page() {
  const router = useRouter();
  const [open, setOpen] = React.useState(false);
  const [countryCode, setCountryCode] = React.useState("591");
  const [phone, setPhone] = React.useState("");
  // Solo números, 8 dígitos para Bolivia, 10 para otros países
  const phoneRegex = countryCode === "591" ? /^\d{8}$/ : /^\d{8,10}$/;
  const isValid = phoneRegex.test(phone.trim());
  const countryOptions = [
    { code: "591", name: "Bolivia" },
    { code: "54", name: "Argentina" },
    { code: "55", name: "Brasil" },
    { code: "56", name: "Chile" },
    { code: "57", name: "Colombia" },
    { code: "506", name: "Costa Rica" },
    { code: "53", name: "Cuba" },
    { code: "593", name: "Ecuador" },
    { code: "503", name: "El Salvador" },
    { code: "502", name: "Guatemala" },
    { code: "504", name: "Honduras" },
    { code: "52", name: "México" },
    { code: "505", name: "Nicaragua" },
    { code: "507", name: "Panamá" },
    { code: "595", name: "Paraguay" },
    { code: "51", name: "Perú" },
    { code: "598", name: "Uruguay" },
    { code: "58", name: "Venezuela" },
    // Puedes agregar más países latinos si lo deseas
  ];
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
              <span>Channel Connection</span>
            </div>
          </header>
          <main className="flex flex-col items-center flex-grow w-full">
            {/* Steps visual */}
            <div className="flex flex-row justify-center items-stretch w-full max-w-5xl gap-8 mb-12 px-2 lg:px-0">
              {/* Step 1 */}
              <div className="flex flex-col items-center flex-1 min-w-[120px] text-muted-foreground">
                <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center mb-2">
                  <Rocket className="h-10 w-10 text-primary-foreground" />
                </div>
                <span className="text-base font-medium">Start channel</span>
              </div>
              {/* Line + Arrow */}
              <div className="hidden lg:flex flex-1 items-center justify-center">
                <div className="w-full flex items-center">
                  <div className="flex-1 border-t-2 border-dashed border-border" />
                  <ChevronRight className="mx-2 text-muted-foreground w-8 h-8" />
                  <div className="flex-1 border-t-2 border-dashed border-border" />
                </div>
              </div>
              {/* Step 2 (active) */}
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
            {/* Subtítulo y descripción */}
            <h2 className="text-xl font-semibold mb-2 self-start max-w-5xl w-full px-2 lg:px-0">2. Channel Connection</h2>
            <p className="text-muted-foreground mb-8 self-start max-w-5xl w-full px-2 lg:px-0">
              You are connecting to the channel "New channel 3" with ID: "GROOTT-R385Z"
            </p>
            {/* QR y pasos */}
            <div className="flex flex-row items-start justify-center gap-12 w-full max-w-4xl">
              <div className="flex flex-col items-center">
                <p className="text-sm text-muted-foreground mb-4">QR code will reload in 0:19</p>
                <div className="p-4 bg-card border border-border rounded-lg">
                  <Image src="/qr-code.png" alt="QR Code" width={256} height={256} className="w-64 h-64" />
                </div>
                <button
                  className="text-primary hover:underline mt-4 text-sm"
                  onClick={() => setOpen(true)}
                  type="button"
                >
                  Link with phone number
                </button>
                <Dialog open={open} onOpenChange={setOpen}>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Vincular con número de teléfono</DialogTitle>
                      <DialogDescription>
                        Ingresa el número de celular para vincular el canal.
                      </DialogDescription>
                    </DialogHeader>
                    <form
                      className="flex flex-col items-center justify-center w-full mt-4 gap-4"
                      onSubmit={e => {
                        e.preventDefault();
                        if (isValid) router.push("/dashboard/step-3");
                      }}
                    >
                      <div className="flex w-full items-center bg-[#1a1a1c] border border-[#374151] rounded-md overflow-hidden">
                        <Select value={countryCode} onValueChange={setCountryCode}>
                          <SelectTrigger className="w-[110px] h-10 bg-[#241543] border-r border-[#374151] text-[#ad84ff] text-lg rounded-none rounded-l-md focus:ring-0 focus:outline-none">
                            <SelectValue placeholder="Código" />
                          </SelectTrigger>
                          <SelectContent className="bg-[#1a1a1c] border-[#374151] text-white">
                            {countryOptions.map(opt => (
                              <SelectItem key={opt.code} value={opt.code} className="text-white">{`+${opt.code} (${opt.name})`}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <Input
                          id="phone"
                          aria-label="phone-number"
                          className="flex-1 bg-transparent border-0 focus:ring-0 text-white placeholder:text-[#6B7280] rounded-none rounded-r-md"
                          type="text"
                          placeholder={countryCode === "591" ? "68802508" : "Número"}
                          value={phone}
                          onChange={e => setPhone(e.target.value.replace(/\D/g, ""))}
                          maxLength={countryCode === "591" ? 8 : 10}
                        />
                      </div>
                      <button
                        type="submit"
                        className="w-full bg-[#5E17EB] hover:bg-[#4b13c2] text-white rounded-md px-4 py-2 font-medium mt-2 disabled:opacity-60"
                        disabled={!isValid}
                      >
                        Submit
                      </button>
                    </form>
                    <DialogFooter>
                      <DialogClose asChild>
                        <button className="mt-4 w-full bg-[#5E17EB] hover:bg-[#4b13c2] text-white rounded-md px-4 py-2 font-medium">Cerrar</button>
                      </DialogClose>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
              <div className="flex flex-col items-start pt-8">
                <h3 className="text-lg font-medium mb-4">Please scan the QR code</h3>
                <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
                  <li>Open WhatsApp on your phone</li>
                  <li>Click Menu or Settings and select Linked devices</li>
                  <li>Click Bind Device</li>
                  <li>Point your phone at this screen to read the QR code</li>
                </ol>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  )
} 