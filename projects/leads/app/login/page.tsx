"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate login process
    setTimeout(() => {
      setIsLoading(false)
      // Redirect to enterprise selection
      router.push("/enterprise")
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-[#121212] flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        {/* Logo/Title */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-8">LEAD</h1>
          <h2 className="text-2xl font-semibold text-white mb-8">Iniciar sesión</h2>
        </div>

        {/* Login Form */}
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="bg-[#1a1a1c] border-[#374151] text-white placeholder-gray-400 focus:border-[#5e17eb] focus:ring-[#5e17eb] h-12"
            />
          </div>

          {/* Password Field */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label htmlFor="password" className="text-white text-sm font-medium">
                Contraseña
              </Label>
              <Link href="/forgot-password" className="text-[#5e17eb] text-sm hover:text-[#4c13c7] transition-colors">
                ¿Olvidaste tu contraseña?
              </Link>
            </div>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="bg-[#1a1a1c] border-[#374151] text-white placeholder-gray-400 focus:border-[#5e17eb] focus:ring-[#5e17eb] h-12"
            />
          </div>

          {/* Login Button */}
          <Button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#5e17eb] hover:bg-[#4c13c7] text-white font-medium h-12 text-base transition-colors"
          >
            {isLoading ? "Iniciando sesión..." : "Iniciar sesión"}
          </Button>
        </form>

        {/* Register Link */}
        <div className="text-center">
          <p className="text-gray-400 text-sm">
            ¿No tienes una cuenta?{" "}
            <Link href="/register" className="text-[#5e17eb] hover:text-[#4c13c7] transition-colors font-medium">
              Regístrate
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
