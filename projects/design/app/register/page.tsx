"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Building2, Eye, EyeOff } from "lucide-react"
import Link from "next/link"

export default function RegisterPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    email: "",
    company: "",
    countryCode: "+52",
    phone: "",
    password: "",
    confirmPassword: "",
    acceptTerms: false,
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (formData.password !== formData.confirmPassword) {
      alert("Las contraseñas no coinciden")
      return
    }

    if (!formData.acceptTerms) {
      alert("Debes aceptar los términos y condiciones")
      return
    }

    setIsLoading(true)

    // Simulate registration process
    setTimeout(() => {
      setIsLoading(false)
      // Redirect to dashboard after successful registration
      router.push("/dashboard")
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-[#121212] flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        {/* Logo/Title */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-8">NPS</h1>
          <h2 className="text-2xl font-semibold text-white mb-8">Crear una cuenta</h2>
        </div>

        {/* Registration Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email Field */}
          <div className="space-y-2">
            <Label htmlFor="email" className="text-white text-sm font-medium">
              Correo electrónico
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="tu@correo.com"
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              required
              className="bg-[#1a1a1c] border-[#374151] text-white placeholder-gray-400 focus:border-[#5e17eb] focus:ring-[#5e17eb] h-12"
            />
          </div>

          {/* Company Field */}
          <div className="space-y-2">
            <Label htmlFor="company" className="text-white text-sm font-medium">
              Empresa
            </Label>
            <div className="relative">
              <Building2 className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                id="company"
                type="text"
                placeholder="Nombre de tu empresa"
                value={formData.company}
                onChange={(e) => handleInputChange("company", e.target.value)}
                required
                className="bg-[#1a1a1c] border-[#374151] text-white placeholder-gray-400 focus:border-[#5e17eb] focus:ring-[#5e17eb] h-12 pl-10"
              />
            </div>
          </div>

          {/* Phone Field */}
          <div className="space-y-2">
            <Label htmlFor="phone" className="text-white text-sm font-medium">
              Número de teléfono
            </Label>
            <div className="flex space-x-2">
              <Select value={formData.countryCode} onValueChange={(value) => handleInputChange("countryCode", value)}>
                <SelectTrigger className="w-24 bg-[#1a1a1c] border-[#374151] text-white focus:border-[#5e17eb] focus:ring-[#5e17eb] h-12">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-[#1a1a1c] border-[#374151]">
                  <SelectItem value="+52" className="text-white hover:bg-[#374151]">
                    +52 MX
                  </SelectItem>
                  <SelectItem value="+1" className="text-white hover:bg-[#374151]">
                    +1 US
                  </SelectItem>
                  <SelectItem value="+34" className="text-white hover:bg-[#374151]">
                    +34 ES
                  </SelectItem>
                  <SelectItem value="+57" className="text-white hover:bg-[#374151]">
                    +57 CO
                  </SelectItem>
                  <SelectItem value="+591" className="text-white hover:bg-[#374151]">
                    +591 BO
                  </SelectItem>
                </SelectContent>
              </Select>
              <Input
                id="phone"
                type="tel"
                placeholder="123 456 7890"
                value={formData.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
                required
                className="flex-1 bg-[#1a1a1c] border-[#374151] text-white placeholder-gray-400 focus:border-[#5e17eb] focus:ring-[#5e17eb] h-12"
              />
            </div>
          </div>

          {/* Password Field */}
          <div className="space-y-2">
            <Label htmlFor="password" className="text-white text-sm font-medium">
              Contraseña
            </Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => handleInputChange("password", e.target.value)}
                required
                className="bg-[#1a1a1c] border-[#374151] text-white placeholder-gray-400 focus:border-[#5e17eb] focus:ring-[#5e17eb] h-12 pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          {/* Confirm Password Field */}
          <div className="space-y-2">
            <Label htmlFor="confirmPassword" className="text-white text-sm font-medium">
              Confirmar contraseña
            </Label>
            <div className="relative">
              <Input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="••••••••"
                value={formData.confirmPassword}
                onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                required
                className="bg-[#1a1a1c] border-[#374151] text-white placeholder-gray-400 focus:border-[#5e17eb] focus:ring-[#5e17eb] h-12 pr-10"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
              >
                {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          {/* Terms Checkbox */}
          <div className="flex items-center space-x-2">
            <Checkbox
              id="terms"
              checked={formData.acceptTerms}
              onCheckedChange={(checked) => handleInputChange("acceptTerms", checked as boolean)}
              className="border-[#374151] data-[state=checked]:bg-[#5e17eb] data-[state=checked]:border-[#5e17eb]"
            />
            <Label htmlFor="terms" className="text-white text-sm">
              Acepto los términos y condiciones
            </Label>
          </div>

          {/* Register Button */}
          <Button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#5e17eb] hover:bg-[#4c13c7] text-white font-medium h-12 text-base transition-colors"
          >
            {isLoading ? "Registrando..." : "Registrarse"}
          </Button>
        </form>

        {/* Login Link */}
        <div className="text-center">
          <p className="text-gray-400 text-sm">
            ¿Ya tienes una cuenta?{" "}
            <Link href="/login" className="text-[#5e17eb] hover:text-[#4c13c7] transition-colors font-medium">
              Iniciar sesión
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
