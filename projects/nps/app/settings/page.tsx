"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { User, Lock, Globe } from "lucide-react"
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
          </div>
        </header>

        {/* Title and Actions Section */}
        <div className="flex items-center justify-between mb-8 p-6 pb-0">
          <div className="flex items-center gap-6 flex-1">
            <h2 className="text-3xl font-bold tracking-tight text-white whitespace-nowrap">Configuración</h2>
          </div>
          <div className="flex items-center gap-3">
            <button 
              className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 h-10 px-4 py-2 bg-[#5E17EB] hover:bg-[#5E17EB]/90 text-white transition-all duration-200 hover:scale-105"
              onClick={handleSaveProfile}
            >
              Guardar Cambios
            </button>
          </div>
        </div>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto px-6 pb-6">
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="space-y-6">
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
            </div>

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
                Guardar Cambios
              </Button>
            </div>

            
          </div>
        </main>
      </div>
    </div>
  )
}
