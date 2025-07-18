"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Users, Save, Trash2, ChevronDown } from "lucide-react"
import { Sidebar } from "@/components/layout/sidebar"
import { useToast } from "@/components/ui/use-toast"



// Define role types and user structure
interface TeamMember {
  id: string
  email: string
  name: string
  role: 'owner' | 'admin' | 'member' | 'viewer'
  status: 'active' | 'pending' | 'expired'
  invitedBy: string
  invitedAt: string
  isCurrentUser?: boolean
}

type PermissionId = "dashboard-voice" | "dashboard-text" | "campaigns" | "create-campaign" | "agents" | "create-agent" | "surveys" | "create-survey" | "contacts" | "import-table" | "lists" | "create-list" | "config" | "roles" | "payments"

const ROLE_DEFINITIONS = {
  owner: {
    name: 'Propietario',
    icon: '👑',
    description: 'Control total sobre la organización y todos sus recursos',
    permissions: 'all' as const, // Special case - always has all permissions
    color: 'text-yellow-400'
  },
  admin: {
    name: 'Administrador', 
    icon: '🛡️',
    description: 'Gestión completa excepto configuración de propietarios',
    permissions: ["dashboard-voice", "dashboard-text", "campaigns", "create-campaign", "agents", "create-agent", "surveys", "create-survey", "contacts", "import-table", "lists", "create-list", "config", "payments"] as PermissionId[],
    color: 'text-red-400'
  },
  member: {
    name: 'Miembro',
    icon: '👤', 
    description: 'Acceso estándar para uso diario del sistema',
    permissions: ["dashboard-voice", "campaigns", "agents", "contacts", "lists"] as PermissionId[],
    color: 'text-blue-400'
  },
  viewer: {
    name: 'Solo Lectura',
    icon: '👁️',
    description: 'Acceso de solo lectura para supervisión',
    permissions: ["dashboard-voice"] as PermissionId[],
    color: 'text-gray-400'
  }
} as const

export default function RolesSettingsPage() {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [newUserEmail, setNewUserEmail] = useState("")
  const [newUserRole, setNewUserRole] = useState<'admin' | 'member' | 'viewer'>("member")
  const [expandedPermissions, setExpandedPermissions] = useState<string | null>(null)
  
  // Team members with proper role structure
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([
    {
      id: "1",
      email: "juan.perez@empresa.com",
      name: "Juan Pérez",
      role: "owner",
      status: "active",
      invitedBy: "Fundador",
      invitedAt: "2024-01-01",
      isCurrentUser: true
    },
    {
      id: "2", 
      email: "maria.garcia@empresa.com",
      name: "María García",
      role: "admin",
      status: "active",
      invitedBy: "Juan Pérez",
      invitedAt: "2024-01-15"
    },
    {
      id: "3",
      email: "carlos.lopez@empresa.com",
      name: "Carlos López", 
      role: "member",
      status: "pending",
      invitedBy: "Juan Pérez",
      invitedAt: "2024-01-20"
    }
  ])

  const availablePermissions: { id: PermissionId; label: string }[] = [
    { id: "dashboard-voice", label: "Dashboard Agentes de Voz" },
    { id: "dashboard-text", label: "Dashboard Agentes de Texto" },
    { id: "campaigns", label: "Campañas" },
    { id: "create-campaign", label: "Crear Nueva Campaña" },
    { id: "agents", label: "Agentes" },
    { id: "create-agent", label: "Crear Nuevo Agente" },
    { id: "surveys", label: "Encuestas" },
    { id: "create-survey", label: "Crear nueva Encuesta" },
    { id: "contacts", label: "Contactos" },
    { id: "import-table", label: "Importar Tabla" },
    { id: "lists", label: "Listas" },
    { id: "create-list", label: "Crear Lista" },
    { id: "config", label: "Configuración" },
    { id: "roles", label: "Roles" },
    { id: "payments", label: "Pagos" }
  ]

  const handleSaveSettings = async () => {
    setIsLoading(true)
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      toast({
        title: "¡Configuración guardada!",
        description: "La gestión del equipo se ha actualizado exitosamente.",
      })
      
      console.log("Guardando configuración del equipo")
    } catch (error) {
      toast({
        title: "Error al guardar",
        description: "Ha ocurrido un error. Por favor intente nuevamente.",
        variant: "destructive"
      })
    } finally {
      setIsLoading(false)
    }
  }

  const addUser = () => {
    if (!newUserEmail.trim()) {
      toast({
        title: "Error",
        description: "Por favor ingrese un email válido",
        variant: "destructive"
      })
      return
    }

    const newMember: TeamMember = {
      id: Date.now().toString(),
      email: newUserEmail,
      name: newUserEmail.split('@')[0],
      role: newUserRole,
      status: "pending",
      invitedBy: "Juan Pérez",
      invitedAt: new Date().toISOString().split('T')[0]
    }

    setTeamMembers(prev => [...prev, newMember])
    setNewUserEmail("")
    
    toast({
      title: "Invitación enviada",
      description: `Se ha enviado una invitación a ${newUserEmail}`,
    })
  }

  const toggleUserPermissions = (memberId: string) => {
    setExpandedPermissions(expandedPermissions === memberId ? null : memberId)
  }

  const updateMemberRole = (memberId: string, newRole: 'admin' | 'member' | 'viewer') => {
    const member = teamMembers.find(m => m.id === memberId)
    if (member?.role === 'owner') {
      toast({
        title: "Acción no permitida",
        description: "No se puede cambiar el rol del propietario",
        variant: "destructive"
      })
      return
    }

    setTeamMembers(prev => 
      prev.map(member => 
        member.id === memberId ? { ...member, role: newRole } : member
      )
    )

    toast({
      title: "Rol actualizado",
      description: `Rol cambiado a ${ROLE_DEFINITIONS[newRole].name}`,
    })
  }

  const removeMember = (memberId: string) => {
    const member = teamMembers.find(m => m.id === memberId)
    if (member?.role === 'owner') {
      toast({
        title: "Acción no permitida", 
        description: "No se puede eliminar al propietario",
        variant: "destructive"
      })
      return
    }

    setTeamMembers(prev => prev.filter(member => member.id !== memberId))
    
    toast({
      title: "Miembro eliminado",
      description: "El miembro ha sido removido del equipo",
    })
  }

  const toggleMemberPermission = (memberId: string, permissionId: PermissionId) => {
    // Por ahora solo mostramos los permisos basados en rol, no permisos individuales
    // En una implementación real, aquí manejarías permisos granulares por usuario
    console.log(`Toggle permission ${permissionId} for member ${memberId}`)
  }

  const getMemberPermissions = (role: TeamMember['role']): PermissionId[] => {
    const roleDefinition = ROLE_DEFINITIONS[role]
    return roleDefinition.permissions === 'all' 
      ? availablePermissions.map(p => p.id)
      : [...roleDefinition.permissions]
  }

  const getStatusIcon = (status: TeamMember['status']) => {
    switch (status) {
      case 'active':
        return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-green-400"><path d="M21.801 10A10 10 0 1 1 17 3.335"></path><path d="m9 11 3 3L22 4"></path></svg>
      case 'pending':
        return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-yellow-400"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
      case 'expired':
        return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-red-400"><circle cx="12" cy="12" r="10"></circle><path d="m15 9-6 6"></path><path d="m9 9 6 6"></path></svg>
    }
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
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3 bg-[#121212] border border-[#1d1d20] rounded-md px-4 py-2">
                <div className="w-7 h-7 bg-[#241543] rounded-full flex items-center justify-center">
                  <span className="text-[#ad84ff] text-sm font-medium select-none">U</span>
                </div>
                <span className="text-white text-sm font-medium whitespace-nowrap">usuario@empresa.com</span>
              </div>
              <a 
                className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border hover:text-accent-foreground h-9 rounded-md px-3 bg-[#121212] border-[#1d1d20] text-white hover:bg-[#1a1a1c]" 
                href="/auth/logout"
              >
                Sign Out
              </a>
            </div>
          </div>
        </header>

        {/* Title Section */}
        <div className="border-b border-[#262626] bg-[#0A0A0A] px-6 py-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-white">Gestión de Equipo</h2>
            <Button
              onClick={handleSaveSettings}
              disabled={isLoading}
              className="bg-[#5e17eb] hover:bg-[#4c13c7] text-white"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                  Guardando...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4 mr-2" />
                  Guardar Cambios
                </>
              )}
            </Button>
          </div>
        </div>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-4xl mx-auto">
            {/* Team Management Card */}
            <div className="rounded-lg border text-card-foreground shadow-sm bg-[#0A0A0A] border-[#262626]">
              <div className="flex flex-col space-y-1.5 p-6">
                <div className="font-semibold tracking-tight text-white text-lg flex items-center gap-2">
                  <Users className="w-5 h-5 text-[#5E17EB]" />
                  Gestión de Equipo
                </div>
                <div className="text-sm text-[#9CA3AF]">
                  Invita colegas y gestiona el acceso de tu equipo al sistema
                </div>
              </div>
              
              <div className="p-6 pt-0 space-y-6">
                {/* Invite New Member Section */}
                <div className="space-y-4 p-4 bg-[#121212] rounded-lg border border-[#1A1A1C]">
                  <div className="flex items-center gap-2 mb-3">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-[#5E17EB]">
                      <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                    </svg>
                    <h3 className="text-white font-medium">Invitar nuevo miembro</h3>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="inviteEmail" className="font-medium text-[#D1D5DB] text-sm">
                        Email del invitado *
                      </Label>
                      <Input
                        id="inviteEmail"
                        type="email"
                        placeholder="correo@empresa.com"
                        value={newUserEmail}
                        onChange={(e) => setNewUserEmail(e.target.value)}
                        className="bg-[#1A1A1C] border-[#4B5563] text-white placeholder:text-[#6B7280] focus:border-[#5E17EB]"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="inviteRole" className="font-medium text-[#D1D5DB] text-sm">
                        Rol
                      </Label>
                      <Select value={newUserRole} onValueChange={(value: 'admin' | 'member' | 'viewer') => setNewUserRole(value)}>
                        <SelectTrigger className="bg-[#1A1A1C] border-[#4B5563] text-white">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-[#1A1A1C] border-[#4B5563]">
                          <SelectItem value="admin" className="text-white hover:bg-[#374151]">🛡️ Administrador</SelectItem>
                          <SelectItem value="member" className="text-white hover:bg-[#374151]">👤 Miembro</SelectItem>
                          <SelectItem value="viewer" className="text-white hover:bg-[#374151]">👁️ Solo Lectura</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="flex items-end">
                      <Button 
                        onClick={addUser}
                        className="bg-[#5E17EB] hover:bg-[#5E17EB]/90 text-white w-full"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 mr-2">
                          <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                          <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                        </svg>
                        Enviar Invitación
                      </Button>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="inviteMessage" className="font-medium text-[#D1D5DB] text-sm">
                      Mensaje personalizado (opcional)
                    </Label>
                    <textarea
                      id="inviteMessage"
                      rows={2}
                      placeholder="Hola, te invito a unirte a nuestro equipo en..."
                      className="flex min-h-[80px] w-full rounded-md border px-3 py-2 text-base ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm bg-[#1A1A1C] border-[#4B5563] text-white placeholder:text-[#6B7280] focus:border-[#5E17EB]"
                    />
                  </div>
                </div>

                {/* Team Members Section */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-white font-medium">Miembros del equipo</h3>
                    <span className="text-[#9CA3AF] text-sm">{teamMembers.length} miembros</span>
                  </div>
                  
                  <div className="space-y-2">
                    {teamMembers.map((member) => {
                      const roleDefinition = ROLE_DEFINITIONS[member.role]
                      const memberPermissions = getMemberPermissions(member.role)
                      const isOwner = member.role === 'owner'
                      const isCurrentUser = member.isCurrentUser
                      
                      return (
                        <div key={member.id} className="bg-[#121212] rounded-lg border border-[#1A1A1C] hover:border-[#374151] transition-colors">
                          <div className="flex items-center justify-between p-3">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 bg-[#5E17EB]/20 rounded-full flex items-center justify-center">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-[#5E17EB]">
                                  <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                                  <circle cx="12" cy="7" r="4"></circle>
                                </svg>
                              </div>
                              <div>
                                <div className="flex items-center gap-2">
                                  <span className="text-white text-sm font-medium">{member.email}</span>
                                  {isCurrentUser && <span className="text-xs bg-[#5E17EB]/20 text-[#5E17EB] px-2 py-1 rounded">Tú</span>}
                                  {getStatusIcon(member.status)}
                                </div>
                                <div className="flex items-center gap-2 text-xs text-[#9CA3AF]">
                                  <span className={roleDefinition.color}>{roleDefinition.icon} {roleDefinition.name}</span>
                                  <span>•</span>
                                  <span className="capitalize">{member.status === 'active' ? 'Activo' : member.status === 'pending' ? 'Pendiente' : 'Expirada'}</span>
                                  <span>•</span>
                                  <span>Invitado por {member.invitedBy}</span>
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                onClick={() => toggleUserPermissions(member.id)}
                                className={`text-[#5E17EB] hover:text-[#5E17EB]/80 h-8 px-3 text-xs ${isOwner ? 'hidden' : ''}`}
                              >
                                Permisos
                                <ChevronDown className="w-3 h-3 ml-1" />
                              </Button>
                              
                              {!isOwner && (
                                <>
                                  <Select 
                                    value={member.role} 
                                    onValueChange={(value: 'admin' | 'member' | 'viewer') => updateMemberRole(member.id, value)}
                                  >
                                    <SelectTrigger className="w-32 h-8 text-xs bg-[#1A1A1C] border-[#4B5563] text-white">
                                      <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent className="bg-[#1A1A1C] border-[#4B5563]">
                                      <SelectItem value="admin" className="text-white hover:bg-[#374151]">🛡️ Admin</SelectItem>
                                      <SelectItem value="member" className="text-white hover:bg-[#374151]">👤 Miembro</SelectItem>
                                      <SelectItem value="viewer" className="text-white hover:bg-[#374151]">👁️ Lectura</SelectItem>
                                    </SelectContent>
                                  </Select>
                                  
                                  <Button 
                                    variant="ghost" 
                                    size="sm" 
                                    onClick={() => removeMember(member.id)}
                                    className="text-[#9CA3AF] hover:text-red-400 h-8 w-8 p-0"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </Button>
                                </>
                              )}
                              
                              {isOwner && (
                                <div className="text-xs text-[#9CA3AF] px-3">
                                  No editable
                                </div>
                              )}
                            </div>
                          </div>
                          
                          {/* Permissions Section */}
                          {expandedPermissions === member.id && (
                            <div className="border-t border-[#1A1A1C] p-3">
                              <h4 className="text-white text-sm font-medium mb-3">
                                Permisos de {roleDefinition.name} 
                                {isOwner && <span className="text-yellow-400 ml-2">(Control Total)</span>}
                              </h4>
                              <p className="text-[#9CA3AF] text-xs mb-3">{roleDefinition.description}</p>
                              
                              <div className="grid grid-cols-2 gap-2">
                                {availablePermissions.map((permission) => {
                                  const hasPermission = memberPermissions.includes(permission.id)
                                  
                                  return (
                                    <label key={permission.id} className="flex items-center gap-2 p-2 rounded transition-colors">
                                      <input
                                        type="checkbox"
                                        checked={hasPermission}
                                        onChange={() => !isOwner && toggleMemberPermission(member.id, permission.id)}
                                        disabled={isOwner} // Owner always has all permissions
                                        className="w-4 h-4 rounded border-[#FD82FF] bg-[#1A1A1C] text-[#FD82FF] focus:ring-[#FD82FF] focus:ring-2 checked:bg-[#FD82FF] checked:border-[#FD82FF] accent-[#FD82FF] disabled:opacity-50"
                                      />
                                      <span className={`text-xs ${hasPermission ? 'text-[#D1D5DB]' : 'text-[#6B7280]'}`}>
                                        {permission.label}
                                      </span>
                                    </label>
                                  )
                                })}
                              </div>
                              
                              {isOwner && (
                                <div className="mt-3 p-2 bg-yellow-400/10 border border-yellow-400/20 rounded text-xs text-yellow-400">
                                  ⚠️ El propietario siempre tiene acceso completo y no puede ser modificado.
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      )
                    })}
                  </div>
                </div>

                {/* Info Section */}
                <div className="p-4 bg-[#5E17EB]/10 border border-[#5E17EB]/20 rounded-lg">
                  <div className="flex items-start gap-3">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-[#5E17EB] mt-0.5 flex-shrink-0">
                      <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                    </svg>
                    <div className="space-y-1">
                      <p className="text-white text-sm font-medium">¿Cómo funcionan las invitaciones?</p>
                      <ul className="text-[#D1D5DB] text-sm space-y-1 list-disc list-inside">
                        <li>Se envía un email con un enlace de invitación único</li>
                        <li>El enlace expira en 7 días por seguridad</li>
                        <li>Los invitados crean su cuenta al aceptar la invitación</li>
                        <li>Los administradores pueden gestionar todos los miembros</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer Button */}
            <div className="mt-12 pt-6 border-t border-[#262626]">
              <div className="flex justify-end">
                <Button
                  onClick={handleSaveSettings}
                  disabled={isLoading}
                  className="bg-[#5e17eb] hover:bg-[#4c13c7] text-white min-w-[160px]"
                >
                  {isLoading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                      Guardando...
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4 mr-2" />
                      Guardar Cambios
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
} 