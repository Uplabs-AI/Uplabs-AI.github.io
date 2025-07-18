"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Building, ArrowLeft, Save } from "lucide-react"
import { Sidebar } from "@/components/layout/sidebar"
import { useToast } from "@/components/ui/use-toast"
import UserInfoBar from "@/components/layout/user-info-bar"

interface CompanyFormData {
  companyName: string
  industry: string
  companySize: string
  website: string
  address: string
  country: string
  city: string
  zipCode: string
  companyPhone: string
  companyPhoneCode: string
  companyEmail: string
  taxId: string
  description: string
}

const initialFormData: CompanyFormData = {
  companyName: "Mi Empresa SRL",
  industry: "tecnologia",
  companySize: "50-200",
  website: "https://miempresa.com",
  address: "Av. Principal 123, Ciudad",
  country: "bolivia",
  city: "La Paz",
  zipCode: "00000",
  companyPhone: "2 234 5678",
  companyPhoneCode: "+591",
  companyEmail: "contacto@miempresa.com",
  taxId: "1234567890",
  description: "Empresa dedicada a brindar soluciones tecnológicas innovadoras para mejorar la experiencia del cliente."
}

const industries = [
  { value: "tecnologia", label: "Tecnología" },
  { value: "servicios", label: "Servicios" },
  { value: "retail", label: "Retail" },
  { value: "manufactura", label: "Manufactura" },
  { value: "salud", label: "Salud" },
  { value: "educacion", label: "Educación" },
  { value: "finanzas", label: "Finanzas" },
  { value: "turismo", label: "Turismo" },
  { value: "inmobiliaria", label: "Inmobiliaria" },
  { value: "otros", label: "Otros" }
]

const companySizes = [
  { value: "1-10", label: "1-10 empleados" },
  { value: "11-50", label: "11-50 empleados" },
  { value: "50-200", label: "50-200 empleados" },
  { value: "200-1000", label: "200-1000 empleados" },
  { value: "1000+", label: "1000+ empleados" }
]

const countries = [
  { value: "bolivia", label: "🇧🇴 Bolivia", code: "+591" },
  { value: "argentina", label: "🇦🇷 Argentina", code: "+54" },
  { value: "chile", label: "🇨🇱 Chile", code: "+56" },
  { value: "colombia", label: "🇨🇴 Colombia", code: "+57" },
  { value: "peru", label: "🇵🇪 Perú", code: "+51" },
  { value: "uruguay", label: "🇺🇾 Uruguay", code: "+598" },
  { value: "mexico", label: "🇲🇽 México", code: "+52" },
  { value: "espana", label: "🇪🇸 España", code: "+34" }
]

export default function EnterpriseSettingsPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [formData, setFormData] = useState<CompanyFormData>(initialFormData)
  const [isLoading, setIsLoading] = useState(false)

  const handleInputChange = (field: keyof CompanyFormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleSaveCompany = async () => {
    setIsLoading(true)
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      toast({
        title: "¡Configuración guardada!",
        description: "Los datos de la empresa se han actualizado exitosamente.",
      })
      
      console.log("Guardando datos de empresa:", formData)
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
            <h2 className="text-3xl font-bold tracking-tight text-white whitespace-nowrap">Configuración de Empresa</h2>
          </div>
          <div className="flex items-center gap-3">
            <button 
              className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 h-10 px-4 py-2 bg-[#5E17EB] hover:bg-[#5E17EB]/90 text-white transition-all duration-200 hover:scale-105"
              onClick={handleSaveCompany}
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
          <div className="max-w-4xl mx-auto">

            <Card className="bg-[#0A0A0A] border-[#262626]">
              <CardHeader>
                <CardTitle className="text-white text-lg flex items-center gap-2">
                  <Building className="w-5 h-5 text-[#5E17EB]" />
                  Información de la Empresa
                </CardTitle>
                <CardDescription className="text-[#9CA3AF]">
                  Configure los datos principales de su empresa
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-6">
                {/* Company Name & Industry */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="companyName" className="text-[#D1D5DB]">
                      Nombre de la Empresa *
                    </Label>
                    <Input
                      id="companyName"
                      value={formData.companyName}
                      onChange={(e) => handleInputChange("companyName", e.target.value)}
                      className="bg-[#1A1A1C] border-[#4B5563] text-white placeholder:text-[#6B7280] focus:border-[#5E17EB]"
                      placeholder="Ingrese el nombre de la empresa"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="industry" className="text-[#D1D5DB]">
                      Industria *
                    </Label>
                    <Select
                      value={formData.industry}
                      onValueChange={(value) => handleInputChange("industry", value)}
                    >
                      <SelectTrigger className="bg-[#1A1A1C] border-[#4B5563] text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-[#1A1A1C] border-[#4B5563]">
                        {industries.map((industry) => (
                          <SelectItem 
                            key={industry.value} 
                            value={industry.value} 
                            className="text-white hover:bg-[#374151]"
                          >
                            {industry.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Company Size & Website */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="companySize" className="text-[#D1D5DB]">
                      Tamaño de la Empresa *
                    </Label>
                    <Select
                      value={formData.companySize}
                      onValueChange={(value) => handleInputChange("companySize", value)}
                    >
                      <SelectTrigger className="bg-[#1A1A1C] border-[#4B5563] text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-[#1A1A1C] border-[#4B5563]">
                        {companySizes.map((size) => (
                          <SelectItem 
                            key={size.value} 
                            value={size.value} 
                            className="text-white hover:bg-[#374151]"
                          >
                            {size.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="website" className="text-[#D1D5DB]">
                      Sitio Web
                    </Label>
                    <Input
                      id="website"
                      type="url"
                      value={formData.website}
                      onChange={(e) => handleInputChange("website", e.target.value)}
                      className="bg-[#1A1A1C] border-[#4B5563] text-white placeholder:text-[#6B7280] focus:border-[#5E17EB]"
                      placeholder="https://ejemplo.com"
                    />
                  </div>
                </div>

                {/* Address */}
                <div className="space-y-2">
                  <Label htmlFor="address" className="text-[#D1D5DB]">
                    Dirección *
                  </Label>
                  <Input
                    id="address"
                    value={formData.address}
                    onChange={(e) => handleInputChange("address", e.target.value)}
                    className="bg-[#1A1A1C] border-[#4B5563] text-white placeholder:text-[#6B7280] focus:border-[#5E17EB]"
                    placeholder="Ingrese la dirección completa"
                  />
                </div>

                {/* Country, City, Zip Code */}
                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="country" className="text-[#D1D5DB]">
                      País *
                    </Label>
                    <Select 
                      value={formData.country} 
                      onValueChange={(value) => handleInputChange("country", value)}
                    >
                      <SelectTrigger className="bg-[#1A1A1C] border-[#4B5563] text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-[#1A1A1C] border-[#4B5563]">
                        {countries.map((country) => (
                          <SelectItem 
                            key={country.value} 
                            value={country.value} 
                            className="text-white hover:bg-[#374151]"
                          >
                            {country.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="city" className="text-[#D1D5DB]">
                      Ciudad *
                    </Label>
                    <Input
                      id="city"
                      value={formData.city}
                      onChange={(e) => handleInputChange("city", e.target.value)}
                      className="bg-[#1A1A1C] border-[#4B5563] text-white placeholder:text-[#6B7280] focus:border-[#5E17EB]"
                      placeholder="Ciudad"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="zipCode" className="text-[#D1D5DB]">
                      Código Postal
                    </Label>
                    <Input
                      id="zipCode"
                      value={formData.zipCode}
                      onChange={(e) => handleInputChange("zipCode", e.target.value)}
                      className="bg-[#1A1A1C] border-[#4B5563] text-white placeholder:text-[#6B7280] focus:border-[#5E17EB]"
                      placeholder="00000"
                    />
                  </div>
                </div>

                {/* Phone & Email */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="companyPhone" className="text-[#D1D5DB]">
                      Teléfono de la Empresa *
                    </Label>
                    <div className="flex">
                      <Select
                        value={formData.companyPhoneCode}
                        onValueChange={(value) => handleInputChange("companyPhoneCode", value)}
                      >
                        <SelectTrigger className="w-24 bg-[#1A1A1C] border-[#4B5563] text-white rounded-r-none border-r-0">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-[#1A1A1C] border-[#4B5563]">
                          {countries.map((country) => (
                            <SelectItem 
                              key={country.code} 
                              value={country.code} 
                              className="text-white hover:bg-[#374151]"
                            >
                              {country.code}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <Input
                        value={formData.companyPhone}
                        onChange={(e) => handleInputChange("companyPhone", e.target.value)}
                        className="bg-[#1A1A1C] border-[#4B5563] text-white placeholder:text-[#6B7280] focus:border-[#5E17EB] rounded-l-none flex-1"
                        placeholder="Número de teléfono"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="companyEmail" className="text-[#D1D5DB]">
                      Email Corporativo *
                    </Label>
                    <Input
                      id="companyEmail"
                      type="email"
                      value={formData.companyEmail}
                      onChange={(e) => handleInputChange("companyEmail", e.target.value)}
                      className="bg-[#1A1A1C] border-[#4B5563] text-white placeholder:text-[#6B7280] focus:border-[#5E17EB]"
                      placeholder="contacto@empresa.com"
                    />
                  </div>
                </div>

                {/* Tax ID */}
                <div className="space-y-2">
                  <Label htmlFor="taxId" className="text-[#D1D5DB]">
                    NIT / RUC / Tax ID *
                  </Label>
                  <Input
                    id="taxId"
                    value={formData.taxId}
                    onChange={(e) => handleInputChange("taxId", e.target.value)}
                    className="bg-[#1A1A1C] border-[#4B5563] text-white placeholder:text-[#6B7280] focus:border-[#5E17EB]"
                    placeholder="Número de identificación fiscal"
                  />
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <Label htmlFor="description" className="text-[#D1D5DB]">
                    Descripción de la Empresa *
                  </Label>
                  <Textarea
                    id="description"
                    rows={4}
                    value={formData.description}
                    onChange={(e) => handleInputChange("description", e.target.value)}
                    className="bg-[#1A1A1C] border-[#4B5563] text-white placeholder:text-[#6B7280] focus:border-[#5E17EB]"
                    placeholder="Breve descripción de la empresa y sus servicios..."
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
} 