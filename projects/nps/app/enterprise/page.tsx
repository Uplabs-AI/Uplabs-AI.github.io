"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight, Building2, Check, Upload, Camera, X, Plus } from "lucide-react"
import Link from "next/link"
import { useEnterpriseStore } from "@/lib/stores/enterprise-store"
import { useRouter } from "next/navigation"
import { useState, useRef } from "react"
import Image from "next/image"

// 📷 LOGOS PERSONALIZADOS:
// - Para agregar un logo personalizado, cambia "logo: null" por "logo: 'URL_DE_TU_IMAGEN'"
// - Formatos recomendados: JPG, PNG, WebP (mínimo 100x100px)
// - Si la imagen falla al cargar, automáticamente muestra el icono por defecto
// - Ejemplos: logo: "/images/mi-logo.png" o logo: "https://ejemplo.com/logo.jpg"

const enterprises = [
  {
    id: 1,
    name: "Empresa 1",
    description: "Visualiza métricas clave, análisis de llamadas y\nflujo comercial",
    colorBar: "#a680ff",
    href: "/dashboard/empresa-1",
    logo: null // Icono de edificio por defecto, personalizable con subida de archivo
  },
  {
    id: 2,
    name: "Empresa 2",
    description: "Visualiza métricas clave, análisis de llamadas y\nflujo comercial",
    colorBar: "#ff80ff", 
    href: "/dashboard/empresa-2",
    logo: null // Icono de edificio por defecto, personalizable con subida de archivo
  },
  {
    id: 3,
    name: "Empresa 3",
    description: "Visualiza métricas clave, análisis de llamadas y\nflujo comercial",
    colorBar: "#80ffff",
    href: "/dashboard/empresa-3",
    logo: null // Icono de edificio por defecto, personalizable con subida de archivo
  },
  {
    id: 4,
    name: "Empresa 4",
    description: "Visualiza métricas clave, análisis de llamadas y\nflujo comercial",
    colorBar: "#b380ff",
    href: "/dashboard/empresa-4",
    logo: null // Icono de edificio por defecto, personalizable con subida de archivo
  },
  {
    id: 5,
    name: "Empresa 5",
    description: "Visualiza métricas clave, análisis de llamadas y\nflujo comercial",
    colorBar: "#6600ff",
    href: "/dashboard/empresa-5",
    logo: null // Icono de edificio por defecto, personalizable con subida de archivo
  },
  {
    id: 6,
    name: "Crear Nueva Empresa",
    description: "Agregar una nueva empresa\nal sistema",
    colorBar: "#4d0099",
    href: "/enterprise/create",
    logo: null,
    isCreateCard: true // Marca este card como especial para crear nueva empresa
  }
]

export default function EnterprisePage() {
  const router = useRouter()
  const { 
    selectedEnterprise, 
    setSelectedEnterprise, 
    uploadedLogos, 
    setUploadedLogo, 
    removeUploadedLogo 
  } = useEnterpriseStore()
  const [isLoading, setIsLoading] = useState(false)
  const fileInputRefs = useRef<Record<number, HTMLInputElement | null>>({})

  const handleEnterpriseSelect = async (enterprise: typeof enterprises[0] & { isCreateCard?: boolean }) => {
    setIsLoading(true)
    setSelectedEnterprise(enterprise)
    
    // Simulate processing time
    setTimeout(() => {
      setIsLoading(false)
      router.push("/dashboard")
    }, 800)
  }

  const handleLogoUpload = (enterpriseId: number, file: File) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      const base64String = e.target?.result as string
      setUploadedLogo(enterpriseId, base64String)
      
      // Mostrar confirmación visual (opcional)
      console.log(`✅ Logo subido exitosamente para empresa ${enterpriseId}`)
    }
    reader.readAsDataURL(file)
  }

  const handleLogoClick = (enterpriseId: number) => {
    const fileInput = fileInputRefs.current[enterpriseId]
    if (fileInput) {
      fileInput.click()
    }
  }

  const handleFileChange = (enterpriseId: number, event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      // Validar tipo de archivo
      const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
      if (!validTypes.includes(file.type)) {
        alert('Por favor selecciona una imagen válida (JPG, PNG, WebP)')
        return
      }
      
      // Validar tamaño de archivo (máximo 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('La imagen debe ser menor a 5MB')
        return
      }

      handleLogoUpload(enterpriseId, file)
    }
  }

  const getEnterpriseLogoSrc = (enterprise: typeof enterprises[0] & { isCreateCard?: boolean }) => {
    // Prioridad: 1. Logo subido 2. Logo predefinido 3. null
    return uploadedLogos[enterprise.id] || enterprise.logo || null
  }

  const handleRemoveLogo = (enterpriseId: number, event: React.MouseEvent) => {
    event.stopPropagation() // Evitar que se active el click del contenedor
    removeUploadedLogo(enterpriseId)
  }

  return (
    <div className="min-h-screen bg-[#121212]">
      {/* Main Container */}
      <div className="max-w-[1136px] mx-auto px-4 py-20">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-[30px] font-bold text-white mb-4 tracking-tight">
            Empresa
          </h1>
          <p className="text-base text-[#9ca3af] max-w-[672px] mx-auto">
            Selecciona una sección para acceder
          </p>
        </div>

        {/* Enterprise Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {enterprises.map((enterprise) => {
            const isSelected = selectedEnterprise?.id === enterprise.id
            
            // Card especial para crear nueva empresa
            if (enterprise.isCreateCard) {
              return (
                <div key={enterprise.id} className="relative">
                  <Card className="h-[290px] rounded-lg overflow-hidden transition-all duration-200 bg-[#0A0A0A] border-gray-700 border-dashed hover:border-[#5e17eb]">
                    <div className="p-6 flex flex-col items-center justify-center h-full">
                      <div className="w-16 h-16 bg-[#5e17eb] rounded-full flex items-center justify-center mb-4">
                        <Plus className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-xl font-semibold text-white tracking-tight mb-3">
                        Crear Nueva Empresa
                      </h3>
                      <p className="text-sm text-[#9ca3af] leading-5 text-center mb-6">
                        Agregar una nueva empresa al sistema
                      </p>
                      <Button 
                        onClick={() => router.push("/enterprise/create")}
                        className="bg-[#5e17eb] hover:bg-[#4c12c4] text-white"
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        Crear Nueva Empresa
                      </Button>
                    </div>
                  </Card>
                </div>
              )
            }
            
            return (
              <div key={enterprise.id} className="relative">
                <Card className={`h-[290px] rounded-lg overflow-hidden transition-all duration-200 ${
                  isSelected 
                    ? 'bg-[#05000e] border-[#5e17eb] ring-2 ring-[#5e17eb]/20' 
                    : 'bg-[#05000e] border-[#333333] hover:border-[#4a4a4c]'
                }`}>
                  {/* Color Bar */}
                  <div 
                    className="h-1 w-full"
                    style={{ backgroundColor: enterprise.colorBar }}
                  />
                  
                  {/* Selected Indicator */}
                  {isSelected && (
                    <div className="absolute top-4 right-4 w-6 h-6 bg-[#5e17eb] rounded-full flex items-center justify-center">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                  )}
                  
                  {/* Card Content */}
                  <div className="px-6 pt-6 pb-10 flex flex-col" style={{ height: 'calc(100% - 4px)' }}>
                    {/* Icon Section */}
                    <div className="flex justify-center mb-6">
                      <div className="relative group">
                        {/* Hidden file input */}
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          ref={(el) => {
                            fileInputRefs.current[enterprise.id] = el
                          }}
                          onChange={(e) => handleFileChange(enterprise.id, e)}
                        />
                        
                        {/* Logo container */}
                        <div 
                          className={`w-14 h-14 rounded-full flex items-center justify-center transition-all duration-200 overflow-hidden cursor-pointer relative ${
                            isSelected ? 'bg-[#5e17eb]' : 'bg-[#2d1e69]'
                          } hover:brightness-110 hover:scale-105`}
                          onClick={() => handleLogoClick(enterprise.id)}
                        >
                          {getEnterpriseLogoSrc(enterprise) ? (
                            <div className="relative w-full h-full">
                              <Image
                                src={getEnterpriseLogoSrc(enterprise)!}
                                alt={`Logo de ${enterprise.name}`}
                                width={56}
                                height={56}
                                className="w-full h-full object-cover rounded-full"
                                onError={(e) => {
                                  // Hide image and show fallback icon
                                  const target = e.target as HTMLImageElement
                                  target.style.display = 'none'
                                  const fallbackIcon = target.nextElementSibling as HTMLElement
                                  if (fallbackIcon) {
                                    fallbackIcon.style.display = 'flex'
                                  }
                                }}
                              />
                              <div className="absolute inset-0 hidden items-center justify-center">
                                <Building2 className="w-8 h-8 text-white" />
                              </div>
                            </div>
                          ) : (
                            <Building2 className="w-8 h-8 text-white" />
                          )}
                          
                          {/* Upload overlay */}
                          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-full flex items-center justify-center">
                            <div className="text-center">
                              <Camera className="w-5 h-5 text-white mx-auto mb-1" />
                              <span className="text-xs text-white font-medium">Subir</span>
                            </div>
                          </div>
                        </div>
                        
                        {/* Upload indicator y remove button */}
                        {uploadedLogos[enterprise.id] && (
                          <>
                            <div className="absolute -top-1 -right-1 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                              <Check className="w-3 h-3 text-white" />
                            </div>
                            <div 
                              className="absolute -top-2 -left-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center cursor-pointer hover:bg-red-600 transition-colors opacity-0 group-hover:opacity-100"
                              onClick={(e) => handleRemoveLogo(enterprise.id, e)}
                              title="Eliminar imagen personalizada"
                            >
                              <X className="w-3 h-3 text-white" />
                            </div>
                          </>
                        )}
                      </div>
                    </div>

                    {/* Title */}
                    <div className="text-center mb-3">
                      <h3 className="text-xl font-semibold text-white tracking-tight">
                        {enterprise.name}
                      </h3>
                    </div>

                    {/* Description */}
                    <div className="text-center flex-1 flex items-center justify-center">
                      <p className="text-sm text-[#9ca3af] leading-5 whitespace-pre-line">
                        {enterprise.description}
                      </p>
                    </div>

                    {/* Button */}
                    <div className="mt-6">
                      <Button 
                        onClick={() => handleEnterpriseSelect(enterprise)}
                        disabled={isLoading}
                        variant="outline"
                        className={`w-full h-10 font-medium transition-colors duration-200 ${
                          isSelected 
                            ? 'bg-[#5e17eb] border-[#5e17eb] text-white hover:bg-[#4c13c7] hover:border-[#4c13c7]'
                            : 'bg-[#1a1a1c] border-[#333333] text-white hover:bg-[#2a2a2c] hover:border-[#4a4a4c]'
                        }`}
                      >
                        <span className="text-sm font-medium">
                          {isLoading ? "Accediendo..." : "Ir al Sistema"}
                        </span>
                        {!isLoading && <ArrowRight className="w-4 h-4 ml-2" />}
                      </Button>
                    </div>
                  </div>
                </Card>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
} 