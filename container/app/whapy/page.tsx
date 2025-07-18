'use client'

import { useEffect } from 'react'
import { Loader2 } from 'lucide-react'

export default function WhapyPage() {
  useEffect(() => {
    // Redirigir al proyecto whapy en su puerto específico
    window.location.href = 'http://localhost:3004'
  }, [])

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <Loader2 className="w-8 h-8 animate-spin text-orange-400 mx-auto mb-4" />
        <h2 className="text-xl font-semibold text-white mb-2">
          Redirigiendo a Whapy...
        </h2>
        <p className="text-gray-400">
          Si no se redirige automáticamente, haz clic en el enlace
        </p>
        <a 
          href="http://localhost:3004" 
          className="text-orange-400 hover:text-orange-300 underline mt-2 inline-block"
        >
          Ir a Whapy
        </a>
      </div>
    </div>
  )
} 