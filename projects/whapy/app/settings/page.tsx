"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { User, Lock, Globe, Building, Key } from "lucide-react"
import { useRouter } from "next/navigation"
import { Sidebar } from "@/components/layout/sidebar"
import { useToast } from "@/components/ui/use-toast"
import { Textarea } from "@/components/ui/textarea"
import UserInfoBar from "@/components/layout/user-info-bar"

export default function SettingsPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    firstName: "Juan",
    lastName: "Pérez",
    email: "juan.perez@empresa.com",
    phone: "+34 612 345",
    position: "Director de Experiencia de Cliente",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
    language: "spanish",
    timezone: "madrid",
    dateFormat: "dd-mm-yyyy",
    // Company fields
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
    description:
      "Empresa dedicada a brindar soluciones tecnológicas innovadoras para mejorar la experiencia del cliente.",
  })

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSaveProfile = () => {
    toast({
      title: "¡Perfil guardado!",
      description: "Los cambios se han guardado exitosamente.",
    })
    console.log("Guardando perfil:", formData)
  }

  const handleUpdatePassword = () => {
    if (!formData.currentPassword || !formData.newPassword || !formData.confirmPassword) {
      toast({
        title: "Error",
        description: "Por favor, complete todos los campos de contraseña.",
        variant: "destructive",
      })
      return
    }

    if (formData.newPassword !== formData.confirmPassword) {
      toast({
        title: "Error",
        description: "Las contraseñas no coinciden.",
        variant: "destructive",
      })
      return
    }

    toast({
      title: "¡Contraseña actualizada!",
      description: "Su contraseña se ha actualizado exitosamente.",
    })

    // Limpiar campos de contraseña
    setFormData((prev) => ({
      ...prev,
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    }))
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
            <UserInfoBar email="usuario@empresa.com" />
            <Button
              className="bg-[#5E17EB] hover:bg-[#5E17EB]/90 text-white transition-colors"
              onClick={handleSaveProfile}
            >
              Guardar Cambios
            </Button>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-4xl mx-auto space-y-6">
            <Tabs defaultValue="perfil" className="w-full">
              <TabsList className="grid w-full grid-cols-3 bg-[#0A0A0A] border border-[#262626]">
                <TabsTrigger
                  value="perfil"
                  className="data-[state=active]:bg-[#5E17EB] data-[state=active]:text-white text-[#9CA3AF] transition-all"
                >
                  <User className="w-4 h-4 mr-2" />
                  Perfil
                </TabsTrigger>
                <TabsTrigger
                  value="empresa"
                  className="data-[state=active]:bg-[#5E17EB] data-[state=active]:text-white text-[#9CA3AF] transition-all"
                >
                  <Building className="w-4 h-4 mr-2" />
                  Empresa
                </TabsTrigger>
                <TabsTrigger
                  value="api"
                  className="data-[state=active]:bg-[#5E17EB] data-[state=active]:text-white text-[#9CA3AF] transition-all"
                >
                  <Key className="w-4 h-4 mr-2" />
                  API
                </TabsTrigger>
              </TabsList>

              <TabsContent value="perfil" className="space-y-6 mt-6">
                {/* Información Personal */}
                <Card className="bg-[#0A0A0A] border-[#262626]">
                  <CardHeader>
                    <CardTitle className="text-white text-lg flex items-center gap-2">
                      <User className="w-5 h-5 text-[#5E17EB]" />
                      Información Personal
                    </CardTitle>
                    <CardDescription className="text-[#9CA3AF]">
                      Actualice su información personal y de contacto
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName" className="text-[#D1D5DB]">
                          Nombre
                        </Label>
                        <Input
                          id="firstName"
                          value={formData.firstName}
                          onChange={(e) => handleInputChange("firstName", e.target.value)}
                          className="bg-[#1A1A1C] border-[#4B5563] text-white placeholder:text-[#6B7280] focus:border-[#5E17EB]"
                          placeholder="Ingrese su nombre"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName" className="text-[#D1D5DB]">
                          Apellido
                        </Label>
                        <Input
                          id="lastName"
                          value={formData.lastName}
                          onChange={(e) => handleInputChange("lastName", e.target.value)}
                          className="bg-[#1A1A1C] border-[#4B5563] text-white placeholder:text-[#6B7280] focus:border-[#5E17EB]"
                          placeholder="Ingrese su apellido"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-[#D1D5DB]">
                        Correo Electrónico
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        className="bg-[#1A1A1C] border-[#4B5563] text-white placeholder:text-[#6B7280] focus:border-[#5E17EB]"
                        placeholder="correo@empresa.com"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="phone" className="text-[#D1D5DB]">
                          Teléfono
                        </Label>
                        <Input
                          id="phone"
                          value={formData.phone}
                          onChange={(e) => handleInputChange("phone", e.target.value)}
                          className="bg-[#1A1A1C] border-[#4B5563] text-white placeholder:text-[#6B7280] focus:border-[#5E17EB]"
                          placeholder="+34 612 345 678"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="position" className="text-[#D1D5DB]">
                          Cargo
                        </Label>
                        <Input
                          id="position"
                          value={formData.position}
                          onChange={(e) => handleInputChange("position", e.target.value)}
                          className="bg-[#1A1A1C] border-[#4B5563] text-white placeholder:text-[#6B7280] focus:border-[#5E17EB]"
                          placeholder="Su cargo en la empresa"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Cambiar Contraseña */}
                <Card className="bg-[#0A0A0A] border-[#262626]">
                  <CardHeader>
                    <CardTitle className="text-white text-lg flex items-center gap-2">
                      <Lock className="w-5 h-5 text-[#5E17EB]" />
                      Seguridad
                    </CardTitle>
                    <CardDescription className="text-[#9CA3AF]">
                      Actualice su contraseña para mantener su cuenta segura
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="currentPassword" className="text-[#D1D5DB]">
                        Contraseña Actual
                      </Label>
                      <Input
                        id="currentPassword"
                        type="password"
                        value={formData.currentPassword}
                        onChange={(e) => handleInputChange("currentPassword", e.target.value)}
                        className="bg-[#1A1A1C] border-[#4B5563] text-white placeholder:text-[#6B7280] focus:border-[#5E17EB]"
                        placeholder="Ingrese su contraseña actual"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="newPassword" className="text-[#D1D5DB]">
                          Nueva Contraseña
                        </Label>
                        <Input
                          id="newPassword"
                          type="password"
                          value={formData.newPassword}
                          onChange={(e) => handleInputChange("newPassword", e.target.value)}
                          className="bg-[#1A1A1C] border-[#4B5563] text-white placeholder:text-[#6B7280] focus:border-[#5E17EB]"
                          placeholder="Nueva contraseña"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="confirmPassword" className="text-[#D1D5DB]">
                          Confirmar Nueva Contraseña
                        </Label>
                        <Input
                          id="confirmPassword"
                          type="password"
                          value={formData.confirmPassword}
                          onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                          className="bg-[#1A1A1C] border-[#4B5563] text-white placeholder:text-[#6B7280] focus:border-[#5E17EB]"
                          placeholder="Confirme la nueva contraseña"
                        />
                      </div>
                    </div>

                    <div className="flex justify-end">
                      <Button
                        onClick={handleUpdatePassword}
                        variant="outline"
                        className="border-[#4B5563] text-[#9CA3AF] hover:bg-[#374151] hover:text-white hover:border-[#6B7280] transition-all"
                      >
                        Actualizar Contraseña
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Preferencias */}
                <Card className="bg-[#0A0A0A] border-[#262626]">
                  <CardHeader>
                    <CardTitle className="text-white text-lg flex items-center gap-2">
                      <Globe className="w-5 h-5 text-[#5E17EB]" />
                      Preferencias
                    </CardTitle>
                    <CardDescription className="text-[#9CA3AF]">
                      Configure su idioma, zona horaria y formato de fecha
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label className="text-[#D1D5DB]">Idioma</Label>
                        <Select
                          value={formData.language}
                          onValueChange={(value) => handleInputChange("language", value)}
                        >
                          <SelectTrigger className="bg-[#1A1A1C] border-[#4B5563] text-white">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="bg-[#1A1A1C] border-[#4B5563]">
                            <SelectItem value="spanish" className="text-white hover:bg-[#374151]">
                              🇪🇸 Español
                            </SelectItem>
                            <SelectItem value="english" className="text-white hover:bg-[#374151]">
                              🇺🇸 English
                            </SelectItem>
                            <SelectItem value="french" className="text-white hover:bg-[#374151]">
                              🇫🇷 Français
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label className="text-[#D1D5DB]">Zona Horaria</Label>
                        <Select
                          value={formData.timezone}
                          onValueChange={(value) => handleInputChange("timezone", value)}
                        >
                          <SelectTrigger className="bg-[#1A1A1C] border-[#4B5563] text-white">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="bg-[#1A1A1C] border-[#4B5563]">
                            <SelectItem value="madrid" className="text-white hover:bg-[#374151]">
                              (GMT+01:00) Madrid
                            </SelectItem>
                            <SelectItem value="london" className="text-white hover:bg-[#374151]">
                              (GMT+00:00) London
                            </SelectItem>
                            <SelectItem value="paris" className="text-white hover:bg-[#374151]">
                              (GMT+01:00) Paris
                            </SelectItem>
                            <SelectItem value="newyork" className="text-white hover:bg-[#374151]">
                              (GMT-05:00) New York
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label className="text-[#D1D5DB]">Formato de Fecha</Label>
                        <Select
                          value={formData.dateFormat}
                          onValueChange={(value) => handleInputChange("dateFormat", value)}
                        >
                          <SelectTrigger className="bg-[#1A1A1C] border-[#4B5563] text-white">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="bg-[#1A1A1C] border-[#4B5563]">
                            <SelectItem value="dd-mm-yyyy" className="text-white hover:bg-[#374151]">
                              DD/MM/YYYY
                            </SelectItem>
                            <SelectItem value="mm-dd-yyyy" className="text-white hover:bg-[#374151]">
                              MM/DD/YYYY
                            </SelectItem>
                            <SelectItem value="yyyy-mm-dd" className="text-white hover:bg-[#374151]">
                              YYYY/MM/DD
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="empresa" className="space-y-6 mt-6">
                <Card className="bg-[#0A0A0A] border-[#262626]">
                  <CardHeader>
                    <CardTitle className="text-white text-lg flex items-center gap-2">
                      <Building className="w-5 h-5 text-[#5E17EB]" />
                      Configuración de Empresa
                    </CardTitle>
                    <CardDescription className="text-[#9CA3AF]">
                      Gestione la configuración de su organización
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
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
                            <SelectItem value="tecnologia" className="text-white hover:bg-[#374151]">
                              Tecnología
                            </SelectItem>
                            <SelectItem value="servicios" className="text-white hover:bg-[#374151]">
                              Servicios
                            </SelectItem>
                            <SelectItem value="retail" className="text-white hover:bg-[#374151]">
                              Retail
                            </SelectItem>
                            <SelectItem value="manufactura" className="text-white hover:bg-[#374151]">
                              Manufactura
                            </SelectItem>
                            <SelectItem value="salud" className="text-white hover:bg-[#374151]">
                              Salud
                            </SelectItem>
                            <SelectItem value="educacion" className="text-white hover:bg-[#374151]">
                              Educación
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

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
                            <SelectItem value="1-10" className="text-white hover:bg-[#374151]">
                              1-10 empleados
                            </SelectItem>
                            <SelectItem value="11-50" className="text-white hover:bg-[#374151]">
                              11-50 empleados
                            </SelectItem>
                            <SelectItem value="50-200" className="text-white hover:bg-[#374151]">
                              50-200 empleados
                            </SelectItem>
                            <SelectItem value="200-1000" className="text-white hover:bg-[#374151]">
                              200-1000 empleados
                            </SelectItem>
                            <SelectItem value="1000+" className="text-white hover:bg-[#374151]">
                              1000+ empleados
                            </SelectItem>
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

                    <div className="grid grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="country" className="text-[#D1D5DB]">
                          País *
                        </Label>
                        <Select value={formData.country} onValueChange={(value) => handleInputChange("country", value)}>
                          <SelectTrigger className="bg-[#1A1A1C] border-[#4B5563] text-white">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="bg-[#1A1A1C] border-[#4B5563]">
                            <SelectItem value="bolivia" className="text-white hover:bg-[#374151]">
                              🇧🇴 Bolivia
                            </SelectItem>
                            <SelectItem value="argentina" className="text-white hover:bg-[#374151]">
                              🇦🇷 Argentina
                            </SelectItem>
                            <SelectItem value="chile" className="text-white hover:bg-[#374151]">
                              🇨🇱 Chile
                            </SelectItem>
                            <SelectItem value="colombia" className="text-white hover:bg-[#374151]">
                              🇨🇴 Colombia
                            </SelectItem>
                            <SelectItem value="peru" className="text-white hover:bg-[#374151]">
                              🇵🇪 Perú
                            </SelectItem>
                            <SelectItem value="mexico" className="text-white hover:bg-[#374151]">
                              🇲🇽 México
                            </SelectItem>
                            <SelectItem value="espana" className="text-white hover:bg-[#374151]">
                              🇪🇸 España
                            </SelectItem>
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
                              <SelectItem value="+591" className="text-white hover:bg-[#374151]">
                                +591
                              </SelectItem>
                              <SelectItem value="+54" className="text-white hover:bg-[#374151]">
                                +54
                              </SelectItem>
                              <SelectItem value="+56" className="text-white hover:bg-[#374151]">
                                +56
                              </SelectItem>
                              <SelectItem value="+57" className="text-white hover:bg-[#374151]">
                                +57
                              </SelectItem>
                              <SelectItem value="+51" className="text-white hover:bg-[#374151]">
                                +51
                              </SelectItem>
                              <SelectItem value="+52" className="text-white hover:bg-[#374151]">
                                +52
                              </SelectItem>
                              <SelectItem value="+34" className="text-white hover:bg-[#374151]">
                                +34
                              </SelectItem>
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

                    <div className="space-y-2">
                      <Label htmlFor="description" className="text-[#D1D5DB]">
                        Descripción de la Empresa
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
              </TabsContent>

              <TabsContent value="api" className="space-y-6 mt-6">
                <Card className="bg-[#0A0A0A] border-[#262626]">
                  <CardHeader>
                    <CardTitle className="text-white text-lg flex items-center gap-2">
                      <Key className="w-5 h-5 text-[#5E17EB]" />
                      Configuración de API
                    </CardTitle>
                    <CardDescription className="text-[#9CA3AF]">
                      Gestione sus claves de API y configuraciones de integración
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="py-12">
                    <div className="text-center space-y-4">
                      <div className="w-16 h-16 bg-[#5E17EB]/20 rounded-full flex items-center justify-center mx-auto">
                        <Key className="w-8 h-8 text-[#5E17EB]" />
                      </div>
                      <div>
                        <h3 className="text-white font-medium">Próximamente disponible</h3>
                        <p className="text-[#9CA3AF] text-sm mt-1">
                          Esta funcionalidad estará disponible en una próxima actualización
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

            {/* Footer Actions */}
            <div className="flex items-center justify-end gap-4 py-6 border-t border-[#262626]">
              <Button
                variant="outline"
                className="border-[#4B5563] text-[#9CA3AF] hover:bg-[#374151] hover:text-white hover:border-[#6B7280] transition-all px-8"
                onClick={() => router.back()}
              >
                Cancelar
              </Button>
              <Button
                className="bg-[#5E17EB] hover:bg-[#5E17EB]/90 text-white transition-colors px-8"
                onClick={handleSaveProfile}
              >
                Guardar Configuración
              </Button>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
