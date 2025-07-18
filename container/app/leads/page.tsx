'use client'

import { useEffect } from 'react'
import { Loader2 } from 'lucide-react'

export default function LeadsPage() {
  useEffect(() => {
    // Redirigir al proyecto leads en su puerto específico
    window.location.href = 'http://localhost:3002'
  }, [])

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <Loader2 className="w-8 h-8 animate-spin text-blue-400 mx-auto mb-4" />
        <h2 className="text-xl font-semibold text-white mb-2">
          Redirigiendo a Lead Generation...
        </h2>
        <p className="text-gray-400">
          Si no se redirige automáticamente, haz clic en el enlace
        </p>
        <a 
          href="http://localhost:3002" 
          className="text-blue-400 hover:text-blue-300 underline mt-2 inline-block"
        >
          Ir a Lead Generation
        </a>
      </div>
    </div>
  )
} 