'use client'

import { useEffect } from 'react'
import { Loader2 } from 'lucide-react'

export default function DesignPage() {
  useEffect(() => {
    // Redirigir al proyecto design en su puerto específico
    window.location.href = 'http://localhost:3001'
  }, [])

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <Loader2 className="w-8 h-8 animate-spin text-purple-400 mx-auto mb-4" />
        <h2 className="text-xl font-semibold text-white mb-2">
          Redirigiendo a Design System...
        </h2>
        <p className="text-gray-400">
          Si no se redirige automáticamente, haz clic en el enlace
        </p>
        <a 
          href="http://localhost:3001" 
          className="text-purple-400 hover:text-purple-300 underline mt-2 inline-block"
        >
          Ir a Design System
        </a>
      </div>
    </div>
  )
} 