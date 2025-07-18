'use client'

import { useEffect } from 'react'
import { Loader2 } from 'lucide-react'

export default function NPSPage() {
  useEffect(() => {
    // Redirigir al proyecto nps en su puerto específico
    window.location.href = 'http://localhost:3003'
  }, [])

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <Loader2 className="w-8 h-8 animate-spin text-green-400 mx-auto mb-4" />
        <h2 className="text-xl font-semibold text-white mb-2">
          Redirigiendo a NPS VOX...
        </h2>
        <p className="text-gray-400">
          Si no se redirige automáticamente, haz clic en el enlace
        </p>
        <a 
          href="http://localhost:3003" 
          className="text-green-400 hover:text-green-300 underline mt-2 inline-block"
        >
          Ir a NPS VOX
        </a>
      </div>
    </div>
  )
} 