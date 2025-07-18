"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Building, Check } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

interface FormData {
  companyName: string
  industry: string
  companySize: string
  website: string
  address: string
  country: string
  city: string
  zipCode: string
  phoneCode: string
  phoneNumber: string
  email: string
  taxId: string
  description: string
}

const initialFormData: FormData = {
  companyName: "",
  industry: "",
  companySize: "",
  website: "",
  address: "",
  country: "",
  city: "",
  zipCode: "",
  phoneCode: "+591",
  phoneNumber: "",
  email: "",
  taxId: "",
  description: ""
}

const industries = [
  "Tecnología",
  "Salud",
  "Educación", 
  "Finanzas",
  "Retail/Comercio",
  "Manufactura",
  "Servicios",
  "Turismo",
  "Inmobiliaria",
  "Otros"
]

const companySizes = [
  "1-10 empleados",
  "11-50 empleados", 
  "51-200 empleados",
  "201-500 empleados",
  "500+ empleados"
]

const countries = [
  { code: "+591", name: "🇧🇴 Bolivia", flag: "🇧🇴" },
  { code: "+54", name: "🇦🇷 Argentina", flag: "🇦🇷" },
  { code: "+56", name: "🇨🇱 Chile", flag: "🇨🇱" },
  { code: "+57", name: "🇨🇴 Colombia", flag: "🇨🇴" },
  { code: "+51", name: "🇵🇪 Perú", flag: "🇵🇪" },
  { code: "+598", name: "🇺🇾 Uruguay", flag: "🇺🇾" },
  { code: "+34", name: "🇪🇸 España", flag: "🇪🇸" },
  { code: "+52", name: "🇲🇽 México", flag: "🇲🇽" }
]

export default function CreateEnterprisePage() {
  const router = useRouter()
  const { toast } = useToast()
  const [formData, setFormData] = useState<FormData>(initialFormData)
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState<Partial<FormData>>({})

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ""
      }))
    }
  }

  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {}

    // Required fields validation - Solo 3 campos obligatorios
    if (!formData.companyName.trim()) newErrors.companyName = "Nombre de empresa es requerido"
    if (!formData.country) newErrors.country = "País es requerido"
    if (!formData.description.trim()) newErrors.description = "Descripción es requerida"

    // Email validation
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Email no válido"
    }

    // Website validation (if provided)
    if (formData.website && !/^https?:\/\/.+\..+/.test(formData.website)) {
      newErrors.website = "URL no válida (debe incluir http:// o https://)"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      toast({
        title: "Errores de validación",
        description: "Por favor corrija los errores en el formulario",
        variant: "destructive"
      })
      return
    }

    setIsLoading(true)

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      toast({
        title: "¡Empresa creada exitosamente!",
        description: `${formData.companyName} ha sido registrada en el sistema`,
      })

      // Redirect back to enterprise page
      router.push("/enterprise")
    } catch (error) {
      toast({
        title: "Error al crear empresa",
        description: "Ha ocurrido un error. Por favor intente nuevamente.",
        variant: "destructive"
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleCancel = () => {
    router.push("/enterprise")
  }

  return (
    <div className="min-h-screen bg-[#121212]">
      <div className="max-w-4xl mx-auto px-4 py-20">
        {/* Header */}
        <div className="mb-8">
          <Button
            variant="ghost"
            onClick={handleCancel}
            className="text-[#9ca3af] hover:text-white mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Volver a Empresas
          </Button>
          
          <div className="text-center">
            <h1 className="text-[30px] font-bold text-white mb-4 tracking-tight">
              Crear Nueva Empresa
            </h1>
            <p className="text-base text-[#9ca3af] max-w-[672px] mx-auto">
              Complete la información para registrar su empresa en el sistema
            </p>
          </div>
        </div>

        {/* Form */}
        <Card className="bg-[#0A0A0A] border-[#262626]">
          <CardHeader className="p-6">
            <CardTitle className="text-white text-lg flex items-center gap-2">
              <Building className="w-5 h-5 text-[#5E17EB]" />
              Configuración de Empresa
            </CardTitle>
            <CardDescription className="text-sm text-[#9CA3AF]">
              Gestione la configuración de su organización
            </CardDescription>
          </CardHeader>

          <CardContent className="p-6 pt-0">
            <form onSubmit={handleSubmit} className="space-y-6">
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
                    placeholder="Ingrese el nombre de la empresa"
                    className="bg-[#1A1A1C] border-[#4B5563] text-white placeholder:text-[#6B7280] focus:border-[#5E17EB]"
                  />
                  {errors.companyName && (
                    <p className="text-red-400 text-sm">{errors.companyName}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="industry" className="text-[#D1D5DB]">
                    Industria
                  </Label>
                  <Select value={formData.industry} onValueChange={(value) => handleInputChange("industry", value)}>
                    <SelectTrigger className="bg-[#1A1A1C] border-[#4B5563] text-white">
                      <SelectValue placeholder="Seleccione una industria" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#1A1A1C] border-[#4B5563]">
                      {industries.map((industry) => (
                        <SelectItem key={industry} value={industry} className="text-white hover:bg-[#2A2A2C]">
                          {industry}
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
                    Tamaño de la Empresa
                  </Label>
                  <Select value={formData.companySize} onValueChange={(value) => handleInputChange("companySize", value)}>
                    <SelectTrigger className="bg-[#1A1A1C] border-[#4B5563] text-white">
                      <SelectValue placeholder="Seleccione el tamaño" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#1A1A1C] border-[#4B5563]">
                      {companySizes.map((size) => (
                        <SelectItem key={size} value={size} className="text-white hover:bg-[#2A2A2C]">
                          {size}
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
                    placeholder="https://ejemplo.com"
                    className="bg-[#1A1A1C] border-[#4B5563] text-white placeholder:text-[#6B7280] focus:border-[#5E17EB]"
                  />
                  {errors.website && (
                    <p className="text-red-400 text-sm">{errors.website}</p>
                  )}
                </div>
              </div>

              {/* Address */}
              <div className="space-y-2">
                <Label htmlFor="address" className="text-[#D1D5DB]">
                  Dirección
                </Label>
                <Input
                  id="address"
                  value={formData.address}
                  onChange={(e) => handleInputChange("address", e.target.value)}
                  placeholder="Ingrese la dirección completa"
                  className="bg-[#1A1A1C] border-[#4B5563] text-white placeholder:text-[#6B7280] focus:border-[#5E17EB]"
                />
              </div>

              {/* Country, City, Zip Code */}
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="country" className="text-[#D1D5DB]">
                    País *
                  </Label>
                  <Select value={formData.country} onValueChange={(value) => handleInputChange("country", value)}>
                    <SelectTrigger className="bg-[#1A1A1C] border-[#4B5563] text-white">
                      <SelectValue placeholder="Seleccione país" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#1A1A1C] border-[#4B5563]">
                      {countries.map((country) => (
                        <SelectItem key={country.code} value={country.name} className="text-white hover:bg-[#2A2A2C]">
                          {country.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.country && (
                    <p className="text-red-400 text-sm">{errors.country}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="city" className="text-[#D1D5DB]">
                    Ciudad
                  </Label>
                  <Input
                    id="city"
                    value={formData.city}
                    onChange={(e) => handleInputChange("city", e.target.value)}
                    placeholder="Ciudad"
                    className="bg-[#1A1A1C] border-[#4B5563] text-white placeholder:text-[#6B7280] focus:border-[#5E17EB]"
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
                    placeholder="00000"
                    className="bg-[#1A1A1C] border-[#4B5563] text-white placeholder:text-[#6B7280] focus:border-[#5E17EB]"
                  />
                </div>
              </div>

              {/* Phone & Email */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-[#D1D5DB]">
                    Teléfono de la Empresa
                  </Label>
                  <div className="flex">
                    <Select value={formData.phoneCode} onValueChange={(value) => handleInputChange("phoneCode", value)}>
                      <SelectTrigger className="w-24 bg-[#1A1A1C] border-[#4B5563] text-white rounded-r-none border-r-0">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-[#1A1A1C] border-[#4B5563]">
                        {countries.map((country) => (
                          <SelectItem key={country.code} value={country.code} className="text-white hover:bg-[#2A2A2C]">
                            {country.code}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Input
                      value={formData.phoneNumber}
                      onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
                      placeholder="Número de teléfono"
                      className="bg-[#1A1A1C] border-[#4B5563] text-white placeholder:text-[#6B7280] focus:border-[#5E17EB] rounded-l-none flex-1"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-[#D1D5DB]">
                    Email Corporativo
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    placeholder="contacto@empresa.com"
                    className="bg-[#1A1A1C] border-[#4B5563] text-white placeholder:text-[#6B7280] focus:border-[#5E17EB]"
                  />
                </div>
              </div>

              {/* Tax ID */}
              <div className="space-y-2">
                <Label htmlFor="taxId" className="text-[#D1D5DB]">
                  NIT / RUC / Tax ID
                </Label>
                <Input
                  id="taxId"
                  value={formData.taxId}
                  onChange={(e) => handleInputChange("taxId", e.target.value)}
                  placeholder="Número de identificación fiscal"
                  className="bg-[#1A1A1C] border-[#4B5563] text-white placeholder:text-[#6B7280] focus:border-[#5E17EB]"
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
                  placeholder="Breve descripción de la empresa y sus servicios..."
                  className="bg-[#1A1A1C] border-[#4B5563] text-white placeholder:text-[#6B7280] focus:border-[#5E17EB]"
                />
                {errors.description && (
                  <p className="text-red-400 text-sm">{errors.description}</p>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 pt-6">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleCancel}
                  className="flex-1 bg-[#1a1a1c] border-[#333333] text-white hover:bg-[#2a2a2c] hover:border-[#4a4a4c]"
                  disabled={isLoading}
                >
                  Cancelar
                </Button>
                <Button
                  type="submit"
                  className="flex-1 bg-[#5e17eb] hover:bg-[#4c13c7] text-white"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                      Creando...
                    </>
                  ) : (
                    <>
                      <Check className="w-4 h-4 mr-2" />
                      Crear Empresa
                    </>
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 