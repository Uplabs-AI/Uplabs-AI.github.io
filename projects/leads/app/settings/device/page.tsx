"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import { Card, CardContent } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

import { Monitor, ArrowLeft, Save, Trash2, Plus, Smartphone, QrCode, CheckCircle } from "lucide-react"
import { Sidebar } from "@/components/layout/sidebar"
import { useToast } from "@/components/ui/use-toast"

interface MobileDevice {
  id: string
  name: string
  phone: string
  status: 'active' | 'inactive'
}

interface DeviceSettings {
  mobileDevices: MobileDevice[]
}

const initialSettings: DeviceSettings = {
  mobileDevices: [
    {
      id: '1',
      name: 'Dispositivo 1',
      phone: '+54 9 11 12345678',
      status: 'active'
    }
  ]
}







export default function DeviceSettingsPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [settings, setSettings] = useState<DeviceSettings>(initialSettings)
  const [isLoading, setIsLoading] = useState(false)
  
  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1)
  const [newDeviceName, setNewDeviceName] = useState('')
  const [simulatedPhone, setSimulatedPhone] = useState('')
  const [nameError, setNameError] = useState('')

  const handleSettingChange = (key: keyof DeviceSettings, value: any) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }))
  }

  const handleSaveSettings = async () => {
    setIsLoading(true)
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      toast({
        title: "¡Configuración guardada!",
        description: "Los ajustes de dispositivo se han actualizado exitosamente.",
      })
      
      console.log("Guardando configuración de dispositivos:", settings)
    } catch (error) {
      toast({
        title: "Error al guardar",
        description: "Ha ocurrido un error. Por favor intente nuevamente.",
        variant: "destructive"
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleGoBack = () => {
    router.push("/settings")
  }

  // Modal functions
  const openModal = () => {
    setIsModalOpen(true)
    setCurrentStep(1)
    setNewDeviceName('')
    setNameError('')
    setSimulatedPhone('') // Clear previous phone
  }

  const proceedToQR = () => {
    if (validateDeviceName(newDeviceName)) {
      setCurrentStep(2)
    }
  }

  const proceedToConfirmation = () => {
    if (!simulatedPhone) {
      // Si no se ha generado el teléfono aún, generarlo ahora
      const randomPhone = `+54 9 11 ${Math.floor(10000000 + Math.random() * 90000000)}`
      setSimulatedPhone(randomPhone)
    }
    setCurrentStep(3)
    
    // Timer de 3 segundos para agregar dispositivo automáticamente
    setTimeout(() => {
      handleAddDevice()
    }, 3000)
  }

  const createWithoutNumber = () => {
    setSimulatedPhone('Sin número')
    setCurrentStep(3)
    
    // Timer de 3 segundos para agregar dispositivo automáticamente
    setTimeout(() => {
      handleAddDevice()
    }, 3000)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setCurrentStep(1)
    setNewDeviceName('')
    setSimulatedPhone('')
    setNameError('')
  }

  const handleAddDevice = () => {
    const newDevice: MobileDevice = {
      id: Date.now().toString(),
      name: newDeviceName.trim(),
      phone: simulatedPhone,
      status: 'active'
    }

    setSettings(prev => ({
      ...prev,
      mobileDevices: [...prev.mobileDevices, newDevice]
    }))

    closeModal()
    toast({
      title: "¡Dispositivo agregado!",
      description: `${newDeviceName} se ha conectado exitosamente.`,
    })
  }

  const handleRemoveDevice = (deviceId: string) => {
    setSettings(prev => ({
      ...prev,
      mobileDevices: prev.mobileDevices.filter(device => device.id !== deviceId)
    }))
    
    toast({
      title: "Dispositivo eliminado",
      description: "El dispositivo se ha desconectado correctamente.",
    })
  }

  // Validación de nombres únicos
  const validateDeviceName = (name: string) => {
    if (!name.trim()) {
      setNameError('El nombre es requerido')
      return false
    }
    
    const nameExists = settings.mobileDevices.some(
      device => device.name.toLowerCase() === name.trim().toLowerCase()
    )
    
    if (nameExists) {
      setNameError('Este nombre ya está en uso')
      return false
    }
    
    setNameError('')
    return true
  }

  return (
    <div className="flex h-screen bg-[#121212]">
      <Sidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="flex items-center justify-between p-6 border-b border-[#262626] bg-[#121212]">
          <div className="flex items-center gap-4">
            <div>
              <h1 className="text-xl font-bold text-white">Configuración</h1>
              <p className="text-sm text-[#9CA3AF] mt-1">Personalice su plataforma NPS y gestione sus preferencias</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3 bg-[#121212] border border-[#1d1d20] rounded-md px-4 py-2">
                <div className="w-7 h-7 bg-[#241543] rounded-full flex items-center justify-center">
                  <span className="text-[#ad84ff] text-sm font-medium select-none">U</span>
                </div>
                <span className="text-white text-sm font-medium whitespace-nowrap">usuario@empresa.com</span>
              </div>
              <a 
                className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border hover:text-accent-foreground h-9 rounded-md px-3 bg-[#121212] border-[#1d1d20] text-white hover:bg-[#1a1a1c]" 
                href="/auth/logout"
              >
                Sign Out
              </a>
            </div>
          </div>
        </header>

        {/* Title and Actions Section */}
        <div className="flex items-center justify-between mb-8 p-6 pb-0">
          <div className="flex items-center gap-6 flex-1">
            <h2 className="text-3xl font-bold tracking-tight text-white whitespace-nowrap">Configuración de Dispositivos</h2>
          </div>
          <div className="flex items-center gap-3">
            <button 
              className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 h-10 px-4 py-2 bg-[#5E17EB] hover:bg-[#5E17EB]/90 text-white transition-all duration-200 hover:scale-105"
              onClick={handleSaveSettings}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                  Guardando...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4 mr-2" />
                  Guardar Cambios
                </>
              )}
            </button>
          </div>
        </div>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto px-6 pb-6">
          <div className="max-w-4xl mx-auto space-y-6">



            {/* Mobile Device Management */}
            <Card className="bg-[#05000E] border-[#1a1a1c]">
              <CardContent className="p-6">
                <h3 className="text-lg font-medium text-white mb-6 flex items-center gap-2">
                  <Smartphone className="w-5 h-5 text-[#5E17EB]" />
                  Gestión de Dispositivos Móviles
                </h3>
                <div className="space-y-6">
                  {/* Device List */}
                  {settings.mobileDevices.map((device, index) => (
                    <div key={device.id} className="space-y-4">
                      <h4 className="text-base font-medium text-white">{device.name}</h4>
                      <div className="flex items-center gap-3">
                        <span className="text-white text-sm">Número de celular:</span>
                        <div className="bg-[#1A1A1C] border border-[#4B5563] px-3 py-2 rounded-md text-white">
                          {device.phone}
                        </div>

                        <div className="flex items-center gap-2">
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="text-gray-400 hover:text-red-400 p-2"
                            onClick={() => handleRemoveDevice(device.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  {/* Add Device Button */}
                  <Button 
                    className="w-full bg-[#5E17EB] hover:bg-[#5E17EB]/90 text-white"
                    onClick={openModal}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Agregar dispositivo
                  </Button>
                </div>
              </CardContent>
            </Card>

          </div>
        </main>
      </div>

      {/* Connect Device Modal */}
      <Dialog open={isModalOpen} onOpenChange={closeModal}>
        <DialogContent className="sm:max-w-md bg-[#0A0A0A] border-[#262626] text-white">
          {currentStep === 1 && (
            <>
              <DialogHeader className="text-center">
                <DialogTitle className="text-2xl font-bold text-white mb-2">
                  Nombrar Dispositivo
                </DialogTitle>
                <p className="text-[#9CA3AF]">Ingresa un nombre para identificar tu dispositivo</p>
              </DialogHeader>
              
              <div className="py-6">
                <div className="space-y-4">
                  <Label className="text-[#D1D5DB]">Nombre del dispositivo</Label>
                  <Input
                    type="text"
                    value={newDeviceName}
                    onChange={(e) => {
                      setNewDeviceName(e.target.value)
                      validateDeviceName(e.target.value) // Validación en tiempo real
                    }}
                    className={`bg-[#1A1A1C] border-[#4B5563] text-white ${
                      nameError ? 'border-red-500 focus:border-red-500' : 'focus:border-[#5E17EB]'
                    }`}
                    placeholder="Ej: Mi iPhone Personal"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        proceedToQR()
                      }
                    }}
                  />
                  {nameError && (
                    <p className="text-red-400 text-xs mt-1">{nameError}</p>
                  )}
                </div>
                
                <div className="flex gap-3 mt-6">
                  <Button 
                    variant="outline" 
                    onClick={closeModal}
                    className="flex-1 border-[#4B5563] text-[#9CA3AF] hover:bg-[#1A1A1C]"
                  >
                    Cancelar
                  </Button>
                  <Button 
                    onClick={proceedToQR}
                    className="flex-1 bg-[#5E17EB] hover:bg-[#5E17EB]/90 text-white"
                    disabled={!newDeviceName.trim() || !!nameError}
                  >
                    Continuar
                  </Button>
                </div>
              </div>
            </>
          )}

          {currentStep === 2 && (
            <>
              <DialogHeader className="text-center">
                <DialogTitle className="text-2xl font-bold text-white mb-2">
                  Conexión con el dispositivo
                </DialogTitle>
                <p className="text-[#9CA3AF]">
                  Conectando: <span className="text-[#5E17EB] font-medium">{newDeviceName}</span>
                </p>
              </DialogHeader>
              
              <div className="flex flex-col items-center py-8">
                <div className="w-80 h-96 bg-[#1A1A1C] rounded-lg border-2 border-[#2A2A2A] flex flex-col">
                  <div className="px-4 py-3 bg-[#111111] rounded-t-lg">
                    <div className="text-[#9CA3AF] text-sm">QR...</div>
                  </div>
                  
                  <div className="flex-1 flex items-center justify-center p-8">
                    <div className="bg-white rounded-lg p-8 flex flex-col items-center">
                      <div className="w-24 h-24 bg-[#2A2A2A] rounded-lg flex items-center justify-center mb-4">
                        <QrCode className="w-16 h-16 text-[#666]" />
                      </div>
                      <h3 className="text-lg font-medium text-[#2A2A2A] mb-2">
                        Aquí se genera el QR
                      </h3>
                      <p className="text-sm text-[#666] text-center">
                        Escanea para conectar
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-4 flex items-center text-[#9CA3AF]">
                  <div className="w-2 h-2 bg-[#5E17EB] rounded-full animate-pulse mr-2"></div>
                  Esperando conexión...
                </div>
                
                <div className="flex gap-3 mt-6 w-full max-w-md">
                  <Button 
                    variant="outline" 
                    onClick={createWithoutNumber}
                    className="flex-1 border-[#4B5563] text-[#9CA3AF] hover:bg-[#1A1A1C]"
                  >
                    Crear sin usar QR
                  </Button>
                  <Button 
                    onClick={proceedToConfirmation}
                    className="flex-1 bg-[#5E17EB] hover:bg-[#5E17EB]/90 text-white"
                  >
                    Siguiente
                  </Button>
                </div>
              </div>
            </>
          )}

          {currentStep === 3 && (
            <>
              <DialogHeader className="text-center">
                <DialogTitle className="text-2xl font-bold text-white mb-2">
                  Confirmar Dispositivo
                </DialogTitle>
                <p className="text-[#9CA3AF]">
                  Dispositivo detectado: <span className="text-[#5E17EB] font-medium">{simulatedPhone}</span>
                </p>
              </DialogHeader>
              
              <div className="flex flex-col items-center py-8">
                <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mb-4">
                  <CheckCircle className="w-8 h-8 text-green-400" />
                </div>
                <h3 className="text-lg font-medium text-white mb-2">
                  {newDeviceName}
                </h3>
                <p className="text-[#9CA3AF] text-center">
                  Dispositivo listo para conectar<br />
                  <span className="text-[#5E17EB]">{simulatedPhone}</span>
                </p>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
} 