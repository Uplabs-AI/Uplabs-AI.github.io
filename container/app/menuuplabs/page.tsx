'use client'

import { useState } from 'react'
import { 
  Palette, 
  Users, 
  BarChart3, 
  MessageSquare, 
  ArrowRight,
  BrainCircuit,
  Workflow,
  Settings,
  Plus,
  LayoutDashboard,
  Phone
} from 'lucide-react'

interface ProjectCard {
  id: string
  title: string
  description_1: string
  description_2: string
  icon: React.ReactNode
  buttonText: string
  accentColorHex: string
  shadowColorRgba: string
  iconBgColorClass: string
  iconColorClass: string
  redirectUrl?: string // Nueva propiedad para URL de redirección específica
}

const projects: ProjectCard[] = [
  {
    id: 'design',
    title: 'Design System',
    description_1: 'Sistema de diseño y componentes UI para crear interfaces consistentes y atractivas.',
    description_2: 'Accede a la biblioteca de componentes, guías de estilo y herramientas de diseño.',
    icon: <Palette className="h-8 w-8" />,
    buttonText: 'Ir a Design System',
    accentColorHex: '#8280ff',
    shadowColorRgba: '123,124,255',
    iconBgColorClass: 'bg-[#2d1e69]',
    iconColorClass: 'text-[#8280ff]',
    redirectUrl: 'http://localhost:3001/design', // URL específica para Design
  },
  {
    id: 'leads',
    title: 'Lead Generation',
    description_1: 'Plataforma completa para generación y gestión de leads con agentes de IA.',
    description_2: 'Revisa campañas activas, métricas de conversión y análisis de rendimiento.',
    icon: <Users className="h-8 w-8" />,
    buttonText: 'Ver Lead Generation',
    accentColorHex: '#ad82ff',
    shadowColorRgba: '173,130,255',
    iconBgColorClass: 'bg-[#2d1e69]',
    iconColorClass: 'text-[#ad82ff]',
  },
  {
    id: 'nps',
    title: 'NPS VOX',
    description_1: 'Sistema de medición de satisfacción del cliente y análisis de sentimientos.',
    description_2: 'Accede a encuestas, reportes de satisfacción y métricas de experiencia del cliente.',
    icon: <BarChart3 className="h-8 w-8" />,
    buttonText: 'Ir a NPS VOX',
    accentColorHex: '#fd82ff',
    shadowColorRgba: '253,130,255',
    iconBgColorClass: 'bg-[#2d1e69]',
    iconColorClass: 'text-[#fd82ff]',
  },
  {
    id: 'whapy',
    title: 'Whapy',
    description_1: 'Plataforma de mensajería y comunicación omnicanal.',
    description_2: 'Gestiona conversaciones, chatbots y notificaciones en múltiples canales.',
    icon: <MessageSquare className="h-8 w-8" />,
    buttonText: 'Ir a Whapy',
    accentColorHex: '#8280ff',
    shadowColorRgba: '123,124,255',
    iconBgColorClass: 'bg-[#2d1e69]',
    iconColorClass: 'text-[#8280ff]',
  }
]

export default function MenuUPLabs() {
  const handleProjectClick = (project: ProjectCard) => {
    if (project.redirectUrl) {
      window.open(project.redirectUrl, '_blank');
    } else {
      window.open(`/${project.id}`, '_blank');
    }
  }

  return (
    <div className="dark bg-black text-white min-h-screen flex flex-col justify-center items-center p-8">
      <div className="w-full max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">
            Panel de Control
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Selecciona una de las siguientes opciones para acceder a las diferentes secciones de la plataforma Auto x Km.
          </p>
        </div>

        {/* Menu Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {projects.map((project) => (
            <div
              key={project.id}
              className={`rounded-lg border shadow-sm bg-[#05000e] border-[#333333] text-white overflow-hidden relative group hover:border-[${project.accentColorHex}] transition-all duration-300 hover:shadow-lg hover:shadow-[rgba(${project.shadowColorRgba},0.1)]`}
              onClick={() => handleProjectClick(project)}
            >
              {/* Accent Bar */}
              <div className={`absolute top-0 left-0 right-0 h-1 bg-[${project.accentColorHex}]`} />

              {/* Shimmer Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-5 -translate-x-full group-hover:translate-x-full transition-all duration-1000" />

              <div className="flex flex-col space-y-1.5 p-6 pb-2">
                {/* Icon */}
                <div className="flex items-center justify-center mb-4">
                  <div className={`p-3 rounded-full ${project.iconBgColorClass}`}>
                    <div className={`${project.iconColorClass}`}>
                      {project.icon}
                    </div>
                  </div>
                </div>

                {/* Title */}
                <div className="font-semibold tracking-tight text-xl text-center">
                  {project.title}
                </div>

                {/* Sub-description */}
                <div className="text-sm text-gray-400 text-center">
                  {project.description_1}
                </div>
              </div>

              <div className="p-6 pt-0 text-center">
                {/* Main Description */}
                <p className="text-sm text-gray-400">
                  {project.description_2}
                </p>
              </div>

              {/* Button */}
              <div className="flex items-center p-6 pt-0">
                <a className="w-full" href={project.redirectUrl || `/${project.id}`}>
                  <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border h-10 px-4 py-2 w-full border-[#333333] bg-[#1a1a1c] text-white hover:bg-[#2d1e69] hover:text-white group">
                    <span>{project.buttonText}</span>
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </button>
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Add New Project Card */}
        <div className="mt-12 flex justify-center">
          <div className="group cursor-pointer transition-all duration-300">
            <div className="bg-neutral-900/30 border-2 border-dashed border-neutral-700/50 hover:border-purple-500/30 hover:bg-[#05000e] rounded-lg p-8 text-center transition-all duration-300 hover:shadow-[0_0_20px_rgba(168,85,247,0.1)]">
              <div className="mx-auto mb-4 p-4 bg-[#2d1e69] rounded-full w-16 h-16 flex items-center justify-center">
                <Plus className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-300 mb-2">
                Agregar Nuevo Proyecto
              </h3>
              <p className="text-gray-500">
                Próximamente podrás agregar más productos
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="max-w-7xl mx-auto mt-16 text-center">
          <div className="flex items-center justify-center space-x-6 text-gray-400">
            <button className="flex items-center space-x-2 hover:text-white transition-colors">
              <Settings className="w-4 h-4" />
              <span>Configuración</span>
            </button>
            <span>•</span>
            <span>Versión 1.0.0</span>
            <span>•</span>
            <span>© 2024 UPLabs</span>
          </div>
        </div>
      </div>
    </div>
  )
} 