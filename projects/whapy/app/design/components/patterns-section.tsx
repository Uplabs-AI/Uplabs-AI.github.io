"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { 
  User, 
  Mail, 
  Phone, 
  Calendar, 
  MapPin, 
  Save, 
  X,
  Plus,
  BarChart3,
  TrendingUp,
  Users,
  Activity,
  Eye,
  Download,
  Filter,
  Trash2, ChevronDown, Circle, Plus as PlusIcon, ChevronDown as Chevron
} from "lucide-react"

interface PatternsSectionProps {
  section: "forms" | "layouts" | "page-headers" | "pagination"
}

export function PatternsSection({ section }: PatternsSectionProps) {
  
  const renderFormsSection = () => (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-white mb-4">Form Patterns</h2>
        <p className="text-gray-400 mb-8">
          Common form examples in the NPS VOX application
        </p>
      </div>

      {/* Contact Form Example */}
      <Card className="bg-[#0A0A0A] border-[#1a1a1c]">
        <CardHeader>
          <CardTitle className="flex items-center">
            <User className="h-5 w-5 mr-2" />
            Contact Form
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="first-name">First Name</Label>
              <Input id="first-name" placeholder="John" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="last-name">Last Name</Label>
              <Input id="last-name" placeholder="Doe" />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="john.doe@email.com" />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="phone">Phone</Label>
            <Input id="phone" type="tel" placeholder="+1 234 567 8900" />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="company">Company</Label>
            <Input id="company" placeholder="My Company Inc." />
          </div>
          
          <div className="flex justify-end gap-2 pt-4">
            <Button variant="outline" size="sm">
              <X className="h-4 w-4 mr-2" />
              Cancel
            </Button>
            <Button size="sm">
              <Save className="h-4 w-4 mr-2" />
              Save
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Encuesta Completa Example */}
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Información General */}
        <Card className="rounded-lg border bg-[#05000E] border-[#1a1a1c] text-white">
          <CardHeader>
            <CardTitle className="text-2xl">Información General</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 pt-0">
            <div className="space-y-2">
              <Label className="text-[#D1D5DB] text-sm font-medium">Nombre de la encuesta</Label>
              <Input placeholder="Escribe el nombre de la encuesta" className="bg-[#1A1A1C] border-[#4B5563] placeholder:text-[#6B7280] focus:border-[#5E17EB]" />
            </div>
            <div className="space-y-2">
              <Label className="text-[#D1D5DB] text-sm font-medium">Descripción</Label>
              <Textarea placeholder="Mide, evalúa, analiza..." className="bg-[#1A1A1C] border-[#4B5563] placeholder:text-[#6B7280] focus:border-[#5E17EB] min-h-[120px]" />
            </div>
            <div className="space-y-2">
              <Label className="text-[#D1D5DB] text-sm font-medium">Contexto del Producto o Servicio</Label>
              <Textarea placeholder="El producto o servicio es..." className="bg-[#1A1A1C] border-[#4B5563] placeholder:text-[#6B7280] focus:border-[#5E17EB] min-h-[120px]" />
            </div>
          </CardContent>
        </Card>

        {/* Preguntas */}
        <Card className="rounded-lg border bg-[#0A0A0A] border-[#262626] text-white">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg">Preguntas</CardTitle>
            <span className="text-[#5E17EB] text-sm">4 preguntas</span>
          </CardHeader>
          <CardContent className="space-y-8 pt-0">
            {/* Pregunta Abierta */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-[#5E17EB] font-medium">Pregunta 1</h3>
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm" className="text-[#6B7280] hover:text-[#EF4444]">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" className="text-[#6B7280] hover:text-[#5E17EB]">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium text-[#D1D5DB]">Tipo de pregunta</Label>
                <Button variant="outline" className="w-full justify-between bg-[#1A1A1C] border-[#4B5563] text-white">
                  <span>Abierta</span>
                  <ChevronDown className="h-4 w-4 opacity-50" />
                </Button>
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium text-[#D1D5DB]">Pregunta</Label>
                <Input placeholder="Escribe tu pregunta" className="bg-[#1A1A1C] border-[#4B5563] placeholder:text-[#6B7280] focus:border-[#5E17EB]" />
              </div>
            </div>

            {/* Se pueden agregar más preguntas siguiendo el mismo patrón ... */}

            <div className="flex justify-center">
              <Button variant="outline" className="w-full max-w-md border-[#4B5563] text-[#9CA3AF] hover:bg-[#374151] hover:text-white">
                <Plus className="h-4 w-4 mr-2" />Agregar pregunta
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )

  const renderLayoutsSection = () => (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-white mb-4">Layout Patterns</h2>
        <p className="text-gray-400 mb-8">
          Page structures and content organization
        </p>
      </div>

      <div className="space-y-8">
        {/* Layout de Dashboard */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-4">Dashboard Layout</h3>
          <Card className="bg-[#0A0A0A] border-[#1a1a1c] p-6">
            <div className="space-y-4">
              {/* Header */}
              <div className="flex items-center justify-between p-4 bg-[#1a1a1c] rounded-lg">
                <div>
                  <h3 className="text-lg font-semibold text-white">Dashboard</h3>
                  <p className="text-sm text-gray-400">General overview</p>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline">
                    <Filter className="h-4 w-4 mr-2" />
                    Filters
                  </Button>
                  <Button size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    Export
                  </Button>
                </div>
              </div>
              
              {/* Métricas */}
              <div className="grid grid-cols-4 gap-4">
                {['Calls', 'Contacts', 'Campaigns', 'Agents'].map((metric, i) => (
                  <div key={i} className="p-4 bg-[#1a1a1c] rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-400">{metric}</p>
                        <p className="text-2xl font-bold text-white">{150 + i * 25}</p>
                      </div>
                      <Activity className="h-5 w-5 text-[#5E17EB]" />
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Contenido Principal */}
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-[#1a1a1c] rounded-lg">
                  <h4 className="text-md font-semibold text-white mb-2">Main Chart</h4>
                  <div className="h-32 bg-[#262626] rounded flex items-center justify-center">
                    <BarChart3 className="h-8 w-8 text-gray-500" />
                  </div>
                </div>
                <div className="p-4 bg-[#1a1a1c] rounded-lg">
                  <h4 className="text-md font-semibold text-white mb-2">Recent Activity</h4>
                  <div className="space-y-2">
                    {[1, 2, 3].map((item) => (
                      <div key={item} className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-[#5E17EB] rounded-full" />
                        <p className="text-sm text-gray-400">Activity {item}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Layout de Lista */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-4">List with Filters</h3>
          <Card className="bg-[#0A0A0A] border-[#1a1a1c] p-6">
            <div className="space-y-4">
              {/* Header de Lista */}
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-white">Contact List</h3>
                  <p className="text-sm text-gray-400">245 contacts found</p>
                </div>
                <Button size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  New Contact
                </Button>
              </div>
              
              {/* Filtros */}
              <div className="flex gap-4 p-4 bg-[#1a1a1c] rounded-lg">
                <Input placeholder="Search contacts..." className="max-w-sm" />
                <Select>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline" size="sm">
                  <Filter className="h-4 w-4 mr-2" />
                  Más filtros
                </Button>
              </div>
              
              {/* Lista Items */}
              <div className="space-y-2">
                {[1, 2, 3].map((item) => (
                  <div key={item} className="flex items-center justify-between p-4 bg-[#1a1a1c] rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-[#5E17EB] rounded-full flex items-center justify-center">
                        <User className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <p className="font-medium text-white">Contacto {item}</p>
                        <p className="text-sm text-gray-400">contacto{item}@email.com</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge className="bg-green-500 hover:bg-green-500">Activo</Badge>
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )

  const renderDataDisplaySection = () => (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-white mb-4">Visualización de Datos</h2>
        <p className="text-gray-400 mb-8">
          Patrones para mostrar métricas, estadísticas y datos analíticos
        </p>
      </div>

      <div className="space-y-8">
        {/* KPI Cards */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-4">Tarjetas de KPI</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="bg-gradient-to-br from-brand-royal to-brand-indigo text-white">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white/80 text-sm">Total Llamadas</p>
                    <p className="text-3xl font-bold">2,543</p>
                    <p className="text-white/80 text-xs">+12% vs mes anterior</p>
                  </div>
                  <Phone className="h-8 w-8 text-white/80" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-green-500 to-green-400 text-white">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white/80 text-sm">NPS Promedio</p>
                    <p className="text-3xl font-bold">8.4</p>
                    <p className="text-white/80 text-xs">+0.3 vs mes anterior</p>
                  </div>
                  <TrendingUp className="h-8 w-8 text-white/80" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-brand-cyan to-blue-500 text-white">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white/80 text-sm">Contactos Activos</p>
                    <p className="text-3xl font-bold">1,205</p>
                    <p className="text-white/80 text-xs">+8% vs mes anterior</p>
                  </div>
                  <Users className="h-8 w-8 text-white/80" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-brand-magenta to-pink-500 text-white">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white/80 text-sm">Active Campaigns</p>
                    <p className="text-3xl font-bold">12</p>
                    <p className="text-white/80 text-xs">2 new this week</p>
                  </div>
                  <BarChart3 className="h-8 w-8 text-white/80" />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Tabla de Estadísticas */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-4">Performance Table</h3>
          <Card className="bg-[#0A0A0A] border-[#1a1a1c]">
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-lg font-semibold text-white">Performance by Agent</h4>
                  <Badge variant="outline">Last month</Badge>
                </div>
                
                <div className="space-y-3">
                  {[
                    { name: 'Lucia', calls: 234, nps: 8.9, conversion: 85 },
                    { name: 'Maria', calls: 198, nps: 8.1, conversion: 78 },
                    { name: 'Sofia', calls: 256, nps: 9.2, conversion: 92 },
                    { name: 'Valeria', calls: 178, nps: 7.8, conversion: 72 }
                  ].map((agent, i) => (
                    <div key={i} className="flex items-center justify-between p-4 bg-[#1a1a1c] rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-[#5E17EB] rounded-full flex items-center justify-center">
                          <span className="text-white font-medium text-sm">{agent.name[0]}</span>
                        </div>
                        <div>
                          <p className="font-medium text-white">{agent.name}</p>
                          <p className="text-sm text-gray-400">{agent.calls} calls</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-6">
                        <div className="text-center">
                          <p className="text-sm text-gray-400">NPS</p>
                          <p className="font-semibold text-white">{agent.nps}</p>
                        </div>
                        <div className="text-center">
                          <p className="text-sm text-gray-400">Conversion</p>
                          <p className="font-semibold text-white">{agent.conversion}%</p>
                        </div>
                        <div className="w-16">
                          <div className="w-full bg-[#262626] rounded-full h-2">
                            <div 
                              className="bg-[#5E17EB] h-2 rounded-full" 
                              style={{ width: `${agent.conversion}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )

  const renderPageHeadersSection = () => (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-white mb-4">Page Headers</h2>
        <p className="text-gray-400 mb-8">
          Page header patterns with navigation and actions
        </p>
      </div>

      <div className="space-y-6">
        {/* Header Simple */}
        <Card className="bg-[#0A0A0A] border-[#1a1a1c] p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-bold text-white">Dashboard</h3>
              <p className="text-gray-400">General activity overview</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filtros
              </Button>
              <Button size="sm">
                <Download className="h-4 w-4 mr-2" />
                Exportar
              </Button>
            </div>
          </div>
        </Card>

        {/* Header con Breadcrumbs */}
        <Card className="bg-[#0A0A0A] border-[#1a1a1c] p-6">
          <div className="space-y-4">
            <div className="flex items-center text-sm text-gray-400">
              <span>Campaigns</span>
              <span className="mx-2">/</span>
              <span>Edit</span>
              <span className="mx-2">/</span>
              <span className="text-white">Service Evaluation</span>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-bold text-white">Edit Campaign</h3>
                <p className="text-gray-400">Service Evaluation - Last edited 2 hours ago</p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">Cancel</Button>
                <Button size="sm">Save Changes</Button>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )

  const renderPaginationSection = () => (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-white mb-4">Pagination</h2>
        <p className="text-gray-400 mb-8">
          Navigation components for large data sets
        </p>
      </div>

      <div className="space-y-6">
        {/* Paginación Simple */}
        <Card className="bg-[#0A0A0A] border-[#1a1a1c] p-6">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Simple Pagination</h3>
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-400">
                Showing 1 to 10 of 245 results
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm" disabled>
                  Previous
                </Button>
                <Button size="sm" className="bg-[#5E17EB]">1</Button>
                <Button variant="outline" size="sm">2</Button>
                <Button variant="outline" size="sm">3</Button>
                <Button variant="outline" size="sm">
                  Next
                </Button>
              </div>
            </div>
          </div>
        </Card>

        {/* Paginación con Información */}
        <Card className="bg-[#0A0A0A] border-[#1a1a1c] p-6">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">With Detailed Information</h3>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-400">Items per page:</span>
                <Select defaultValue="10">
                  <SelectTrigger className="w-20">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="10">10</SelectItem>
                    <SelectItem value="25">25</SelectItem>
                    <SelectItem value="50">50</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="text-sm text-gray-400">
                Page 1 of 25 (245 total items)
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )

  switch (section) {
    case "forms":
      return renderFormsSection()
    case "layouts":
      return renderLayoutsSection()
    case "page-headers":
      return renderPageHeadersSection()
    case "pagination":
      return renderPaginationSection()
    default:
      return renderFormsSection()
  }
} 