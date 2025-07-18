"use client"

import { useState, useEffect, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { CreditCard, TrendingUp, Calendar as CalendarIcon, Info, X, Check } from "lucide-react"
import { Sidebar } from "@/components/layout/sidebar"
import UserInfoBar from "@/components/layout/user-info-bar"
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { format } from "date-fns"
import { useBuyCreditsModal } from "@/components/contexts/buy-credits-modal-context"

// Datos de ejemplo para el gráfico - Hoy
const usageDataToday = [
  { date: '00:00', minutes: 5 },
  { date: '02:00', minutes: 12 },
  { date: '04:00', minutes: 18 },
  { date: '06:00', minutes: 15 },
  { date: '08:00', minutes: 28 },
  { date: '10:00', minutes: 35 },
  { date: '12:00', minutes: 42 },
  { date: '14:00', minutes: 38 },
  { date: '16:00', minutes: 55 },
  { date: '18:00', minutes: 45 },
  { date: '20:00', minutes: 32 },
  { date: '22:00', minutes: 25 },
]

// Datos de ejemplo para el gráfico - Semana
const usageDataWeek = [
  { date: 'Lun', minutes: 45 },
  { date: 'Mar', minutes: 52 },
  { date: 'Mié', minutes: 38 },
  { date: 'Jue', minutes: 67 },
  { date: 'Vie', minutes: 85 },
  { date: 'Sáb', minutes: 32 },
  { date: 'Dom', minutes: 28 },
]

function BillingPageContent() {
  const searchParams = useSearchParams()
  const { openModal } = useBuyCreditsModal()
  
  // Estados para la interactividad
  const [timeRange, setTimeRange] = useState<'today' | 'week'>('today')
  const [startDate, setStartDate] = useState<Date | undefined>(new Date())
  const [endDate, setEndDate] = useState<Date | undefined>(new Date())
  
  // Estados para Add-ons
  const [hipaaEnabled, setHipaaEnabled] = useState(false)
  const [recipientName, setRecipientName] = useState('')
  const [recipientOrg, setRecipientOrg] = useState('')
  const [concurrency, setConcurrency] = useState(0)
  
  // Estados para Payment Method
  const [billingEmail, setBillingEmail] = useState('sergio.herrera@uplabsai.com')
  const [cardNumber, setCardNumber] = useState('')
  const [expiry, setExpiry] = useState('')
  const [cvc, setCvc] = useState('')
  const [autoReload, setAutoReload] = useState(false)
  const [reloadAmount, setReloadAmount] = useState(10)
  const [threshold, setThreshold] = useState('')

  // Estados para el modal de comprar créditos - COMENTADO: Ahora se usa Context API
  // const [showBuyCreditsModal, setShowBuyCreditsModal] = useState(false)
  // const [selectedAmount, setSelectedAmount] = useState(100)
  // const [customAmount, setCustomAmount] = useState('')
  // const [isCustom, setIsCustom] = useState(false)

  // Efecto para abrir el modal si viene desde el sidebar - ACTUALIZADO para usar Context
  useEffect(() => {
    const openModalParam = searchParams.get('openModal')
    if (openModalParam === 'true') {
      openModal()
      // Limpiar el parámetro de la URL sin recargar la página
      if (typeof window !== 'undefined') {
        window.history.replaceState({}, '', '/billing')
      }
    }
  }, [searchParams, openModal])

  // Función para obtener los datos según el rango seleccionado
  const getCurrentData = () => {
    return timeRange === 'today' ? usageDataToday : usageDataWeek
  }

  // Función para obtener el total de minutos
  const getTotalMinutes = () => {
    const data = getCurrentData()
    return data.reduce((total, item) => total + item.minutes, 0)
  }

  // Funciones para el modal de comprar créditos - COMENTADO: Ahora se usa Context API
  // const handleAmountSelect = (amount: number) => {
  //   setSelectedAmount(amount)
  //   setIsCustom(false)
  //   setCustomAmount('')
  // }

  // const handleCustomAmount = () => {
  //   setIsCustom(true)
  //   setSelectedAmount(0)
  // }

  // const handleConfirmPurchase = () => {
  //   const finalAmount = isCustom ? parseFloat(customAmount) : selectedAmount
  //   console.log('Comprando créditos por:', finalAmount)
  //   // Aquí iría la lógica de compra
  //   setShowBuyCreditsModal(false)
  // }

  return (
    <div className="min-h-screen bg-[#121212] text-white flex">
      {/* Sidebar */}
      <div className="w-64 flex-shrink-0">
        <Sidebar />
      </div>

      {/* Main */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="border-b border-[#1d1d20] p-6">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-semibold text-white">Pagos</h1>
            <UserInfoBar email="usuario@empresa.com" />
          </div>
        </div>

        {/* Main content */}
        <div className="p-6">
          {/* Saldo section header - improved based on Figma */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-6">
              {/* Saldo title */}
              <h2 className="text-2xl font-bold text-white">Saldo</h2>
              
              {/* Amount with styled container */}
              <div className="bg-[#100030] border border-[#5e17eb] rounded-lg px-3 py-1.5">
                <span className="text-[#d9c6ff] text-2xl font-bold">$ 299</span>
              </div>
              
              {/* Status indicator */}
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 bg-[#22c55e] rounded-full"></div>
                <span className="text-[#9ca3af] text-sm">Activo</span>
              </div>
            </div>
            
            {/* Buy credits button */}
            <Button 
              onClick={openModal}
              className="bg-[#5e17eb] hover:bg-[#5e17eb]/90 text-white"
            >
              <CreditCard className="w-4 h-4 mr-2" />
              Comprar Créditos
            </Button>
          </div>

          {/* Usage Chart Section - Based on Figma */}
          <div className="rounded-lg border text-card-foreground shadow-sm bg-[#000000] border-[#1a1a1c] rounded-xl mb-8">
            <div className="p-6">
              {/* Chart Header */}
              <div className="flex items-center justify-between mb-6">
                {/* Left: Minutes Used - Now Dynamic */}
                <div>
                  <p className="text-[#cacaca] text-[22px] font-medium mb-2">Minutos Usados</p>
                  <p className="text-white text-4xl font-bold">{getTotalMinutes()}</p>
                </div>

                {/* Center: Time Toggle - Now Interactive */}
                <div className="bg-[#100030] border border-[#5e17eb] rounded-full p-1">
                  <div className="flex">
                    <button 
                      onClick={() => setTimeRange('today')}
                      className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${
                        timeRange === 'today' 
                          ? 'bg-[#5e17eb] text-white' 
                          : 'text-[#5e17eb] hover:text-white hover:bg-[#5e17eb]/20'
                      }`}
                    >
                      Hoy
                    </button>
                    <button 
                      onClick={() => setTimeRange('week')}
                      className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${
                        timeRange === 'week' 
                          ? 'bg-[#5e17eb] text-white' 
                          : 'text-[#5e17eb] hover:text-white hover:bg-[#5e17eb]/20'
                      }`}
                    >
                      Semana
                    </button>
                  </div>
                </div>

                {/* Right: Date Range - Now Functional Calendars */}
                <div className="flex items-center gap-2">
                  {/* Fecha Desde */}
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="inline-flex items-center gap-2 whitespace-nowrap rounded-md text-sm ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border h-10 px-4 py-2 w-40 justify-start text-left font-normal bg-[#1a1a1c] border-[#1a1a1c] text-white hover:bg-[#2a2a2c] focus:border-[#5e17eb] focus:ring-1 focus:ring-[#5e17eb] pr-10"
                      >
                        <CalendarIcon className="mr-2 h-4 w-4 text-gray-400" />
                        {startDate ? format(startDate, "dd/MM/yyyy") : "Fecha Desde"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0 bg-[#1a1a1c] border-[#374151]" align="center" side="bottom" sideOffset={8}>
                      <Calendar
                        mode="single"
                        selected={startDate}
                        onSelect={(date: Date | undefined) => setStartDate(date)}
                        initialFocus
                        className="text-white"
                      />
                    </PopoverContent>
                  </Popover>

                  <span className="text-[#a1a1aa] text-sm">al</span>

                  {/* Fecha Hasta */}
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="inline-flex items-center gap-2 whitespace-nowrap rounded-md text-sm ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border h-10 px-4 py-2 w-40 justify-start text-left font-normal bg-[#1a1a1c] border-[#1a1a1c] text-white hover:bg-[#2a2a2c] focus:border-[#5e17eb] focus:ring-1 focus:ring-[#5e17eb] pr-10"
                      >
                        <CalendarIcon className="mr-2 h-4 w-4 text-gray-400" />
                        {endDate ? format(endDate, "dd/MM/yyyy") : "Fecha Hasta"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0 bg-[#1a1a1c] border-[#374151]" align="center" side="bottom" sideOffset={8}>
                      <Calendar
                        mode="single"
                        selected={endDate}
                        onSelect={(date: Date | undefined) => setEndDate(date)}
                        initialFocus
                        className="text-white"
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>

              {/* Chart Area - Recharts Implementation with Dynamic Data */}
              <div className="h-60 mb-4">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart 
                    data={getCurrentData()} 
                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                    width={700}
                    height={240}
                  >
                    <defs>
                      <linearGradient id="colorMinutes" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#5e17eb" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#5e17eb" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1a1a1c" />
                    <XAxis 
                      dataKey="date" 
                      stroke="#9ca3af"
                      fontSize={12}
                      tickLine={false}
                      axisLine={false}
                      tick={{ fill: '#9ca3af' }}
                    />
                    <YAxis 
                      stroke="#9ca3af"
                      fontSize={12}
                      tickLine={false}
                      axisLine={false}
                      tick={{ fill: '#9ca3af' }}
                    />
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: '#1a1a1c',
                        border: '1px solid #374151',
                        borderRadius: '8px',
                        color: '#fff'
                      }}
                      labelStyle={{ color: '#9ca3af' }}
                      formatter={(value: any, name: string) => [
                        `${value} minutos`,
                        timeRange === 'today' ? 'Minutos por hora' : 'Minutos por día'
                      ]}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="minutes" 
                      stroke="#5e17eb" 
                      strokeWidth={2}
                      fillOpacity={1} 
                      fill="url(#colorMinutes)"
                      connectNulls={false}
                      dot={false}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Plans Section */}
          <div className="space-y-6">
            <div>
              <h2 className="text-[#cacaca] text-[22px] font-medium mb-4">Planes</h2>
              <p className="text-[#d1d5db] text-sm leading-5 mb-8">
                Selecciona un plan para tu organización. Los minutos incluidos en el paquete incluyen el costo de cada proveedor utilizado durante una llamada (LLM, TTS, STT, etc.). El costo por exceso de uso se aplica cuando excedes tus minutos mensuales incluidos en el paquete.
              </p>
            </div>

            {/* Plans Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Plan 1 - Current */}
              <div className="rounded-lg border text-card-foreground shadow-sm bg-[#000000] border-[#1a1a1c] rounded-2xl hover:border-[#374151] hover:shadow-lg transition-all duration-300 cursor-pointer">
                <div className="p-6">
                  <div className="flex flex-col h-full">
                    <div className="flex-grow space-y-4">
                      <h3 className="text-[#cacaca] text-[22px] font-bold">Básico</h3>
                      <p className="text-[#cacaca] text-[22px] font-medium">Paga según uses</p>
                      <div className="space-y-2 text-[#cacaca] text-sm">
                        <p>Minutos incluidos: -</p>
                        <p>Costo por exceso de minutos: -</p>
                        <p>Concurrencia incluida: 10</p>
                      </div>
                    </div>
                    <div className="w-full text-center mt-8 py-2">
                      <span className="text-[#d9c6ff] font-bold text-lg">Plan Actual</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Plan 2 */}
              <div className="rounded-lg border text-card-foreground shadow-sm bg-[#000000] border-[#1a1a1c] rounded-2xl hover:border-[#374151] hover:shadow-lg transition-all duration-300 cursor-pointer">
                <div className="p-6">
                  <div className="flex flex-col h-full">
                    <div className="flex-grow space-y-4">
                      <h3 className="text-[#cacaca] text-[22px] font-bold">Agencia</h3>
                      <p className="text-[#cacaca] text-[28px] font-bold text-center">$500</p>
                      <div className="space-y-2 text-[#cacaca] text-sm">
                        <p>Minutos incluidos: 3,000</p>
                        <p>Costo por exceso de minutos: $0.18/min</p>
                        <p>Concurrencia incluida: 50</p>
                      </div>
                    </div>
                    <Button className="w-full bg-[#5e17eb] hover:bg-[#5e17eb]/90 text-white mt-4">
                      Comprar
                    </Button>
                  </div>
                </div>
              </div>

              {/* Plan 3 */}
              <div className="rounded-lg border text-card-foreground shadow-sm bg-[#000000] border-[#1a1a1c] rounded-2xl hover:border-[#374151] hover:shadow-lg transition-all duration-300 cursor-pointer">
                <div className="p-6">
                  <div className="flex flex-col h-full">
                    <div className="flex-grow space-y-4">
                      <h3 className="text-[#cacaca] text-[22px] font-bold">Startup</h3>
                      <p className="text-[#cacaca] text-[28px] font-bold text-center">$1,000</p>
                      <div className="space-y-2 text-[#cacaca] text-sm">
                        <p>Minutos incluidos: 7,500</p>
                        <p>Costo por exceso de minutos: $0.16/min</p>
                        <p>Concurrencia incluida: 100</p>
                      </div>
                    </div>
                    <Button className="w-full bg-[#5e17eb] hover:bg-[#5e17eb]/90 text-white mt-4">
                      Comprar
                    </Button>
                  </div>
                </div>
              </div>

              {/* Plan 4 */}
              <div className="rounded-lg border text-card-foreground shadow-sm bg-[#000000] border-[#1a1a1c] rounded-2xl hover:border-[#374151] hover:shadow-lg transition-all duration-300 cursor-pointer">
                <div className="p-6">
                  <div className="flex flex-col h-full">
                    <div className="flex-grow space-y-4">
                      <h3 className="text-[#cacaca] text-[22px] font-bold">Crecimiento</h3>
                      <p className="text-[#cacaca] text-[28px] font-bold text-center">$5,000</p>
                      <div className="space-y-2 text-[#cacaca] text-sm">
                        <p>Minutos incluidos: 40,000</p>
                        <p>Costo por exceso de minutos: $0.14/min</p>
                        <p>Concurrencia incluida: 500</p>
                      </div>
                    </div>
                    <Button className="w-full bg-[#5e17eb] hover:bg-[#5e17eb]/90 text-white mt-4">
                      Comprar
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Add-ons and Payment Method Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
            {/* Add-ons Section */}
            <div className="rounded-lg border text-card-foreground shadow-sm bg-[#05000E] border-[#1a1a1c]">
              <div className="p-6">
                <h3 className="text-lg font-medium text-white mb-6">Complementos</h3>
                <p className="text-[#9ca3af] text-sm mb-6">Configura complementos y potencia tu experiencia</p>
                
                <div className="space-y-6">
                  {/* HIPAA Compliance */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-white font-medium">Habilitar Cumplimiento HIPAA</span>
                        <Info className="w-4 h-4 text-[#9ca3af]" />
                      </div>
                      <div className="flex items-center gap-3">
                        <button 
                          type="button" 
                          role="switch" 
                          aria-checked={hipaaEnabled}
                          data-state={hipaaEnabled ? "checked" : "unchecked"}
                          onClick={() => setHipaaEnabled(!hipaaEnabled)}
                          className="peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-[#82ECFF] data-[state=unchecked]:bg-gray-600"
                        >
                          <span 
                            data-state={hipaaEnabled ? "checked" : "unchecked"}
                            className="pointer-events-none block h-5 w-5 rounded-full bg-background shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0"
                          ></span>
                        </button>
                        <span className="text-[#9ca3af] text-sm">+ $1000/mo</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2 text-sm">
                      <div className="w-2 h-2 bg-[#22c55e] rounded-full"></div>
                      <span className="text-[#9ca3af]">Facturación mensual</span>
                    </div>

                    {hipaaEnabled && (
                      <div className="space-y-4 mt-4">
                        <input 
                          className="flex w-full border px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm bg-[#1A1A1C] border-[#4B5563] text-white placeholder:text-[#6B7280] focus:border-[#5E17EB] h-10 rounded-md"
                          placeholder="Nombre del Destinatario"
                          value={recipientName}
                          onChange={(e) => setRecipientName(e.target.value)}
                        />
                        <input 
                          className="flex w-full border px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm bg-[#1A1A1C] border-[#4B5563] text-white placeholder:text-[#6B7280] focus:border-[#5E17EB] h-10 rounded-md"
                          placeholder="Organización del Destinatario"
                          value={recipientOrg}
                          onChange={(e) => setRecipientOrg(e.target.value)}
                        />
                      </div>
                    )}
                  </div>

                  {/* Reserved Concurrency */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-white font-medium">Concurrencia Reservada (Líneas de Llamada)</span>
                        <Info className="w-4 h-4 text-[#9ca3af]" />
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="relative w-20">
                          <input 
                            className="flex w-full border px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm bg-[#1A1A1C] border-[#4B5563] text-white text-center pr-8 h-10 rounded-md [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                            type="number"
                            value={concurrency}
                            onChange={(e) => setConcurrency(Number(e.target.value))}
                            min="0"
                            max="999"
                          />
                          <div className="absolute right-1 top-1/2 -translate-y-1/2 flex flex-col">
                            <button 
                              type="button" 
                              className="text-gray-400 hover:text-white text-xs leading-none h-3 flex items-center justify-center"
                              onClick={() => setConcurrency(Math.min(999, concurrency + 1))}
                            >
                              ▲
                            </button>
                            <button 
                              type="button" 
                              className="text-gray-400 hover:text-white text-xs leading-none h-3 flex items-center justify-center"
                              onClick={() => setConcurrency(Math.max(0, concurrency - 1))}
                            >
                              ▼
                            </button>
                          </div>
                        </div>
                        <span className="text-[#9ca3af] text-sm">+ $10/mo each</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2 text-sm">
                      <div className="w-2 h-2 bg-[#22c55e] rounded-full"></div>
                      <span className="text-[#9ca3af]">Facturación mensual</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Method Section */}
            <div className="rounded-lg border text-card-foreground shadow-sm bg-[#05000E] border-[#1a1a1c]">
              <div className="p-6">
                <h3 className="text-lg font-medium text-white mb-6">Método de Pago</h3>
                <p className="text-[#9ca3af] text-sm mb-6">Ingresa los detalles de tu tarjeta</p>
                
                <div className="space-y-6">
                  {/* Billing Email */}
                  <div className="space-y-2">
                    <h4 className="text-base font-medium text-white">Email de Facturación</h4>
                    <div className="relative">
                      <input 
                        className="flex w-full border px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm bg-[#1A1A1C] border-[#4B5563] text-white focus:border-[#5E17EB] h-10 rounded-md pr-10"
                        value={billingEmail}
                        onChange={(e) => setBillingEmail(e.target.value)}
                      />
                      <button className="absolute right-3 top-1/2 -translate-y-1/2">
                        <svg className="w-4 h-4 text-[#9ca3af]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                        </svg>
                      </button>
                    </div>
                  </div>

                  {/* Payment Method */}
                  <div className="space-y-4">
                    <h4 className="text-base font-medium text-white">Método de Pago</h4>
                    <div className="grid grid-cols-3 gap-3">
                      <input 
                        className="flex w-full border px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm bg-[#1A1A1C] border-[#4B5563] text-white placeholder:text-[#6B7280] focus:border-[#5E17EB] h-10 rounded-md col-span-2"
                        placeholder="Número de tarjeta"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                      />
                      <div className="grid grid-cols-2 gap-2">
                        <input 
                          className="flex w-full border px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm bg-[#1A1A1C] border-[#4B5563] text-white placeholder:text-[#6B7280] focus:border-[#5E17EB] h-10 rounded-md text-center text-sm"
                          placeholder="MM / YY"
                          value={expiry}
                          onChange={(e) => setExpiry(e.target.value)}
                        />
                        <input 
                          className="flex w-full border px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm bg-[#1A1A1C] border-[#4B5563] text-white placeholder:text-[#6B7280] focus:border-[#5E17EB] h-10 rounded-md text-center text-sm"
                          placeholder="CVC"
                          value={cvc}
                          onChange={(e) => setCvc(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Auto Reload */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-white font-medium">Habilitar Recarga Automática</span>
                      <button 
                        type="button" 
                        role="switch" 
                        aria-checked={autoReload}
                        data-state={autoReload ? "checked" : "unchecked"}
                        onClick={() => setAutoReload(!autoReload)}
                        className="peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-[#82ECFF] data-[state=unchecked]:bg-gray-600"
                      >
                        <span 
                          data-state={autoReload ? "checked" : "unchecked"}
                          className="pointer-events-none block h-5 w-5 rounded-full bg-background shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0"
                        ></span>
                      </button>
                    </div>

                    {autoReload && (
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <span className="text-[#9ca3af] text-sm">Cantidad a recargar</span>
                          <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9ca3af]">$</span>
                            <input 
                              className="flex w-full border px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm bg-[#1A1A1C] border-[#4B5563] text-white focus:border-[#5E17EB] h-10 rounded-md pl-8"
                              type="number"
                              value={reloadAmount}
                              onChange={(e) => setReloadAmount(Number(e.target.value))}
                              min="1"
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <span className="text-[#9ca3af] text-sm">Cuando el saldo llegue a</span>
                          <input 
                            className="flex w-full border px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm bg-[#1A1A1C] border-[#4B5563] text-white placeholder:text-[#6B7280] focus:border-[#5E17EB] h-10 rounded-md"
                            placeholder="Ingresa el monto límite"
                            value={threshold}
                            onChange={(e) => setThreshold(e.target.value)}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Payment History Section */}
          <div className="mt-8">
            <div className="rounded-lg border text-card-foreground shadow-sm bg-[#05000E] border-[#1a1a1c]">
              <div className="p-6">
                <h3 className="text-lg font-medium text-white mb-6">Historial de Pagos</h3>
                
                <div className="space-y-4">
                  {/* Payment Item 1 */}
                  <div className="flex items-center justify-between p-4 bg-[#1A1A1C] border border-[#4B5563] rounded-md">
                    <div className="flex-1">
                      <div className="flex items-center gap-4">
                        <div>
                          <p className="text-white font-medium">15 Dic 2024</p>
                          <p className="text-[#9ca3af] text-sm">14:30</p>
                        </div>
                        <div>
                          <p className="text-white font-medium">$500.00</p>
                          <p className="text-[#9ca3af] text-sm">Plan Agencia</p>
                        </div>
                        <div>
                          <p className="text-white text-sm">Visa •••• 4242</p>
                          <p className="text-[#9ca3af] text-sm">Tarjeta de crédito</p>
                        </div>
                        <div>
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-[#22c55e]/20 text-[#22c55e]">
                            Exitoso
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Payment Item 2 */}
                  <div className="flex items-center justify-between p-4 bg-[#1A1A1C] border border-[#4B5563] rounded-md">
                    <div className="flex-1">
                      <div className="flex items-center gap-4">
                        <div>
                          <p className="text-white font-medium">28 Nov 2024</p>
                          <p className="text-[#9ca3af] text-sm">09:15</p>
                        </div>
                        <div>
                          <p className="text-white font-medium">$150.00</p>
                          <p className="text-[#9ca3af] text-sm">Recarga de créditos</p>
                        </div>
                        <div>
                          <p className="text-white text-sm">PayPal</p>
                          <p className="text-[#9ca3af] text-sm">sergio.h***@gmail.com</p>
                        </div>
                        <div>
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-[#22c55e]/20 text-[#22c55e]">
                            Exitoso
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Payment Item 3 */}
                  <div className="flex items-center justify-between p-4 bg-[#1A1A1C] border border-[#4B5563] rounded-md">
                    <div className="flex-1">
                      <div className="flex items-center gap-4">
                        <div>
                          <p className="text-white font-medium">12 Nov 2024</p>
                          <p className="text-[#9ca3af] text-sm">16:45</p>
                        </div>
                        <div>
                          <p className="text-white font-medium">$75.00</p>
                          <p className="text-[#9ca3af] text-sm">Complemento HIPAA</p>
                        </div>
                        <div>
                          <p className="text-white text-sm">Mastercard •••• 8901</p>
                          <p className="text-[#9ca3af] text-sm">Tarjeta de débito</p>
                        </div>
                        <div>
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-[#f59e0b]/20 text-[#f59e0b]">
                            Pendiente
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Payment Item 4 */}
                  <div className="flex items-center justify-between p-4 bg-[#1A1A1C] border border-[#4B5563] rounded-md">
                    <div className="flex-1">
                      <div className="flex items-center gap-4">
                        <div>
                          <p className="text-white font-medium">03 Nov 2024</p>
                          <p className="text-[#9ca3af] text-sm">11:20</p>
                        </div>
                        <div>
                          <p className="text-white font-medium">$25.00</p>
                          <p className="text-[#9ca3af] text-sm">Líneas adicionales</p>
                        </div>
                        <div>
                          <p className="text-white text-sm">Visa •••• 4242</p>
                          <p className="text-[#9ca3af] text-sm">Tarjeta de crédito</p>
                        </div>
                        <div>
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-[#ef4444]/20 text-[#ef4444]">
                            Fallido
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal de Comprar Créditos - COMENTADO: Ahora se renderiza desde el Layout con Context API */}
      {/* {showBuyCreditsModal && (
        <>
          <div 
            className="fixed inset-0 bg-black/50 z-40"
            onClick={() => setShowBuyCreditsModal(false)}
          ></div>
          
          <div 
            role="dialog" 
            data-state="open"
            className="fixed left-[50%] top-[50%] z-50 grid w-full translate-x-[-50%] translate-y-[-50%] gap-4 border p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg bg-[#0A0A0A] border-[#1A1A1C] text-white max-w-md"
            tabIndex={-1}
          >
            // ... modal content comentado
          </div>
        </>
      )} */}
    </div>
  )
}

export default function BillingPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BillingPageContent />
    </Suspense>
  )
} 