"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { 
  LayoutDashboard, 
  BarChart3, 
  Users, 
  Phone,
  Activity,
  TrendingUp,
  Calendar,
  Filter,
  Download,
  Plus,
  FileText,
  Save,
  X,
  Eye,
  Edit,
  Trash2
} from "lucide-react"

interface TemplatesSectionProps {
  section: "dashboard" | "forms-complete" | "list-pages" | "settings-pages"
}

export function TemplatesSection({ section }: TemplatesSectionProps) {
  
  const renderDashboardSection = () => (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-white mb-4">Dashboard Template</h2>
        <p className="text-gray-400 mb-8">
          Complete example of a dashboard page with metrics, charts and tables
        </p>
      </div>

      {/* Simulación completa de Dashboard */}
      <div className="space-y-6">
        {/* Header del Dashboard */}
        <Card className="bg-[#0A0A0A] border-[#1a1a1c]">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-white">Dashboard NPS VOX</h1>
                <p className="text-gray-400">Executive summary of calls and campaigns</p>
              </div>
              <div className="flex gap-3">
                <Button variant="outline" size="sm">
                  <Filter className="h-4 w-4 mr-2" />
                  Filtros
                </Button>
                <Button variant="outline" size="sm">
                  <Calendar className="h-4 w-4 mr-2" />
                  Date range
                </Button>
                <Button size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Exportar
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* KPIs Principales */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="bg-gradient-to-br from-[#5E17EB] to-[#8280FF] text-white border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white/80 text-sm font-medium">Total Calls</p>
                  <p className="text-3xl font-bold">2,543</p>
                  <div className="flex items-center mt-2">
                    <TrendingUp className="h-4 w-4 mr-1" />
                    <span className="text-xs">+12% vs previous month</span>
                  </div>
                </div>
                <Phone className="h-10 w-10 text-white/60" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-[#82FF90] to-[#5ED65E] text-white border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white/80 text-sm font-medium">Average NPS</p>
                  <p className="text-3xl font-bold">8.4</p>
                  <div className="flex items-center mt-2">
                    <TrendingUp className="h-4 w-4 mr-1" />
                    <span className="text-xs">+0.3 vs previous month</span>
                  </div>
                </div>
                <BarChart3 className="h-10 w-10 text-white/60" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-[#82ECFF] to-[#3B82F6] text-white border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white/80 text-sm font-medium">Active Contacts</p>
                  <p className="text-3xl font-bold">1,205</p>
                  <div className="flex items-center mt-2">
                    <TrendingUp className="h-4 w-4 mr-1" />
                    <span className="text-xs">+8% vs previous month</span>
                  </div>
                </div>
                <Users className="h-10 w-10 text-white/60" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-[#FD82FF] to-[#EC4899] text-white border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white/80 text-sm font-medium">Active Campaigns</p>
                  <p className="text-3xl font-bold">12</p>
                  <div className="flex items-center mt-2">
                    <Activity className="h-4 w-4 mr-1" />
                    <span className="text-xs">2 new this week</span>
                  </div>
                </div>
                <LayoutDashboard className="h-10 w-10 text-white/60" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Gráficos y Tablas */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Gráfico de Rendimiento */}
          <Card className="bg-[#0A0A0A] border-[#1a1a1c]">
            <CardHeader>
              <CardTitle className="flex items-center">
                <BarChart3 className="h-5 w-5 mr-2" />
                Weekly Performance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 bg-gradient-to-br from-[#5E17EB]/10 to-[#8280FF]/10 rounded-lg flex items-center justify-center border border-[#5E17EB]/20">
                <div className="text-center">
                  <BarChart3 className="h-12 w-12 text-[#5E17EB] mx-auto mb-2" />
                  <p className="text-gray-400 text-sm">Interactive chart</p>
                  <p className="text-gray-500 text-xs">Real chart would be displayed here</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Actividad Reciente */}
          <Card className="bg-[#0A0A0A] border-[#1a1a1c]">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Activity className="h-5 w-5 mr-2" />
                Recent Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { action: 'New campaign created', time: '2 min', status: 'success' },
                  { action: 'Call completed', time: '5 min', status: 'info' },
                  { action: 'Contact added', time: '12 min', status: 'success' },
                  { action: 'Campaign paused', time: '25 min', status: 'warning' },
                  { action: 'Report generated', time: '1 hour', status: 'info' }
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between p-3 bg-[#1a1a1c] rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className={`w-3 h-3 rounded-full ${
                        item.status === 'success' ? 'bg-green-500' :
                        item.status === 'warning' ? 'bg-orange-500' : 'bg-blue-500'
                      }`} />
                      <span className="text-white text-sm">{item.action}</span>
                    </div>
                    <span className="text-gray-400 text-xs">{item.time}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabla de Campañas */}
        <Card className="bg-[#0A0A0A] border-[#1a1a1c]">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center">
                <FileText className="h-5 w-5 mr-2" />
                Recent Campaigns
              </CardTitle>
              <Button size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Nueva Campaña
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { name: 'Evaluación Servicio Q4', agent: 'Lucía', status: 'active', calls: 234 },
                { name: 'NPS Producto 2024', agent: 'María', status: 'paused', calls: 189 },
                { name: 'Satisfacción Cliente', agent: 'Sofia', status: 'completed', calls: 456 },
                { name: 'Feedback Post-Venta', agent: 'Valeria', status: 'active', calls: 123 }
              ].map((campaign, i) => (
                <div key={i} className="flex items-center justify-between p-4 bg-[#1a1a1c] rounded-lg hover:bg-[#262626] transition-colors">
                  <div className="flex items-center space-x-4">
                    <div>
                      <h4 className="font-medium text-white">{campaign.name}</h4>
                      <p className="text-sm text-gray-400">{campaign.agent} • {campaign.calls} llamadas</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Badge className={
                      campaign.status === 'active' ? 'bg-green-500 hover:bg-green-500' :
                      campaign.status === 'paused' ? 'bg-orange-500 hover:bg-orange-500' :
                      'bg-gray-500 hover:bg-gray-500'
                    }>
                      {campaign.status === 'active' ? 'Activo' :
                       campaign.status === 'paused' ? 'Pausado' : 'Completado'}
                    </Badge>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )

  const renderFormsCompleteSection = () => (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-white mb-4">Template de Formulario Completo</h2>
        <p className="text-gray-400 mb-8">
          Ejemplo de formulario complejo con múltiples secciones y validaciones
        </p>
      </div>

      <div className="max-w-4xl">
        <Card className="bg-[#0A0A0A] border-[#1a1a1c]">
          <CardHeader>
            <CardTitle className="flex items-center">
              <FileText className="h-5 w-5 mr-2" />
              Crear Nueva Campaña NPS
            </CardTitle>
            <p className="text-gray-400 text-sm">
              Complete la información para configurar su nueva campaña de evaluación
            </p>
          </CardHeader>
          <CardContent className="space-y-8">
            {/* Sección 1: Información General */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 bg-[#5E17EB] rounded-full flex items-center justify-center text-white text-xs font-bold">1</div>
                <h3 className="text-lg font-semibold text-white">Información General</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pl-8">
                <div className="space-y-2">
                  <Label htmlFor="campaign-name">Nombre de la Campaña *</Label>
                  <Input id="campaign-name" placeholder="Ej: Evaluación NPS Q1 2024" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="campaign-type">Tipo de Campaña</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="nps">NPS Survey</SelectItem>
                      <SelectItem value="satisfaction">Satisfacción</SelectItem>
                      <SelectItem value="feedback">Feedback General</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="description">Descripción</Label>
                  <Textarea id="description" placeholder="Describe el objetivo de esta campaña..." />
                </div>
              </div>
            </div>

            <Separator />

            {/* Sección 2: Configuración de Agente */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 bg-[#5E17EB] rounded-full flex items-center justify-center text-white text-xs font-bold">2</div>
                <h3 className="text-lg font-semibold text-white">Agente de Voz</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pl-8">
                <div className="space-y-2">
                  <Label htmlFor="agent">Seleccionar Agente *</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Elegir agente" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="lucia">Lucía - Voz Femenina Joven</SelectItem>
                      <SelectItem value="maria">María - Voz Femenina Madura</SelectItem>
                      <SelectItem value="sofia">Sofia - Voz Femenina Formal</SelectItem>
                      <SelectItem value="valeria">Valeria - Voz Femenina Cálida</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="tone">Tono de Conversación</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar tono" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="friendly">Amigable</SelectItem>
                      <SelectItem value="professional">Profesional</SelectItem>
                      <SelectItem value="casual">Casual</SelectItem>
                      <SelectItem value="formal">Formal</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <Separator />

            {/* Sección 3: Programación */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 bg-[#5E17EB] rounded-full flex items-center justify-center text-white text-xs font-bold">3</div>
                <h3 className="text-lg font-semibold text-white">Programación</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pl-8">
                <div className="space-y-2">
                  <Label htmlFor="start-date">Fecha de Inicio *</Label>
                  <Input id="start-date" type="date" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="end-date">Fecha de Finalización</Label>
                  <Input id="end-date" type="date" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="max-calls">Máximo de Llamadas</Label>
                  <Input id="max-calls" type="number" placeholder="1000" />
                </div>
              </div>
            </div>

            <Separator />

            {/* Botones de Acción */}
            <div className="flex justify-between pt-6">
              <Button variant="outline">
                <X className="h-4 w-4 mr-2" />
                Cancelar
              </Button>
              <div className="flex gap-3">
                <Button variant="outline">
                  <Save className="h-4 w-4 mr-2" />
                  Guardar Borrador
                </Button>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Crear Campaña
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )

  switch (section) {
    case "dashboard":
      return renderDashboardSection()
    case "forms-complete":
      return renderFormsCompleteSection()
    case "list-pages":
      return <div className="text-white">Páginas de Lista - En desarrollo</div>
    case "settings-pages":
      return <div className="text-white">Páginas de Configuración - En desarrollo</div>
    default:
      return renderDashboardSection()
  }
} 