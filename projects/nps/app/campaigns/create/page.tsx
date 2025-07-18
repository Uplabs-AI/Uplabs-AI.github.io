"use client"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Sidebar } from "@/components/layout/sidebar"
import { useToast } from "@/components/ui/use-toast"
import { ArrowLeft, Plus, Search, Calendar, Check, CircleAlert } from "lucide-react"
import Link from "next/link"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import { format } from "date-fns"
import { es } from "date-fns/locale"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"

// Tipos para los datos
interface Agent {
  id: string
  name: string
  idioma: string
  acento: string
  tono: string
  fondo: string
  selected: boolean
  avatarImage?: string
}

interface FormData {
  name: string
  startDate: Date | undefined
  endDate: Date | undefined
  selectedAgentId: string
  selectedContactList: string
}

// Datos de agentes
const agents: Agent[] = [
  {
    id: "1",
    name: "SofíA",
    idioma: "Español",
    acento: "Mexicano",
    tono: "Casual",
    fondo: "Oficina",
    selected: false,
  },
  {
    id: "2",
    name: "MariA",
    idioma: "Español",
    acento: "Neutral",
    tono: "Amigable",
    fondo: "Oficina",
    selected: false,
  },
  {
    id: "3",
    name: "ValeriA",
    idioma: "Inglés",
    acento: "American",
    tono: "Neutral",
    fondo: "Oficina",
    selected: false,
  },
  {
    id: "4",
    name: "LuciO",
    idioma: "Español",
    acento: "Boliviano",
    tono: "Neutral",
    fondo: "Ninguno",
    selected: false,
  },
]

const contactLists = [
  { id: "1", name: "Clientes Premium" },
  { id: "2", name: "Nuevos Clientes 2023" },
  { id: "3", name: "Clientes Inactivos" },
  { id: "4", name: "Leads Calificados" },
  { id: "5", name: "Clientes Corporativos" },
]

export default function CreateCampaignPage() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    startDate: new Date(),
    endDate: undefined,
    selectedAgentId: "",
    selectedContactList: "",
  })

  const [showDatePicker, setShowDatePicker] = useState<"start" | "end" | null>(null)
  const [showRequiredFieldsAlert, setShowRequiredFieldsAlert] = useState(false)
  const [open, setOpen] = useState(false)
  const { toast } = useToast()
  const router = useRouter()

  const handleInputChange = (field: keyof FormData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleAgentSelect = (agentId: string) => {
    handleInputChange("selectedAgentId", agentId)
  }

  const handleNext = () => {
    if (!formData.name || !formData.selectedAgentId || !formData.selectedContactList) {
      setShowRequiredFieldsAlert(true)
      return
    }
    setShowRequiredFieldsAlert(false)
    router.push("/campaigns/create-2")
  }

  const handleCancel = () => {
    router.push("/campaigns")
  }

  useEffect(() => {
    // Verificar si hay una nueva lista importada
    const importSuccess = localStorage.getItem("csvImportSuccess")
    const newListData = localStorage.getItem("csvImportNewList")

    if (importSuccess && newListData) {
      try {
        const listInfo = JSON.parse(newListData)
        // Añadir la nueva lista a las opciones disponibles
        const newList = {
          id: `imported-${Date.now()}`,
          name: listInfo.listName || "Lista Importada",
        }

        // Actualizar las listas disponibles
        contactLists.push(newList)

        // Seleccionar automáticamente la nueva lista
        handleInputChange("selectedContactList", newList.id)

        // Mostrar notificación de éxito
        toast({
          title: "Lista importada exitosamente",
          description: `La lista "${newList.name}" ha sido creada y seleccionada.`,
          variant: "default",
        })

        // Limpiar el localStorage
        localStorage.removeItem("csvImportSuccess")
        localStorage.removeItem("csvImportNewList")
      } catch (error) {
        console.error("Error processing imported list:", error)
      }
    }

    // Verificar si hay un nuevo agente creado
    const agentCreationSuccess = localStorage.getItem("agentCreationSuccess")
    const newAgentData = localStorage.getItem("newAgentData")

    if (agentCreationSuccess && newAgentData) {
      try {
        const agentInfo = JSON.parse(newAgentData)
        // Añadir el nuevo agente a las opciones disponibles
        const newAgent = {
          id: `agent-${Date.now()}`,
          name: agentInfo.name,
          idioma: agentInfo.language || "Español",
          acento: agentInfo.accent || "Neutral",
          tono: agentInfo.voiceTone || "Profesional",
          fondo: agentInfo.backgroundSound || "Oficina",
          selected: false,
          avatarImage: agentInfo.avatarImage, // Añadir esta línea
        }

        // Actualizar la lista de agentes
        agents.push(newAgent)

        // Seleccionar automáticamente el nuevo agente
        handleInputChange("selectedAgentId", newAgent.id)

        // Mostrar notificación de éxito
        toast({
          title: "Agente creado exitosamente",
          description: `El agente "${newAgent.name}" ha sido creado y seleccionado.`,
          variant: "default",
        })

        // Limpiar el localStorage
        localStorage.removeItem("agentCreationSuccess")
        localStorage.removeItem("newAgentData")
      } catch (error) {
        console.error("Error processing new agent:", error)
      }
    }
  }, [])

  return (
    <div className="min-h-screen bg-[#121212] text-white flex">
      {/* Sidebar */}
      <div className="w-64 flex-shrink-0">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-y-auto p-6">
          <div className="flex items-center mb-8">
            <a href="/campaigns">
              <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hover:bg-accent h-9 rounded-md text-gray-400 hover:text-white p-0">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-arrow-left h-4 w-4 mr-2"
                >
                  <path d="m12 19-7-7 7-7"></path>
                  <path d="M19 12H5"></path>
                </svg>
                Crear Nueva Campaña
              </button>
            </a>
          </div>
          <div className="flex items-center justify-center mb-8">
            <div className="flex items-center space-x-8">
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 bg-[#5E17EB] rounded-full flex items-center justify-center text-white font-semibold text-lg mb-2">1</div>
                <span className="text-white font-medium">Campaña</span>
              </div>
              <div className="w-16 h-0.5 bg-gray-600"></div>
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 bg-gray-600 rounded-full flex items-center justify-center text-gray-400 font-semibold text-lg mb-2">2</div>
                <span className="text-gray-400 font-medium">Encuesta</span>
              </div>
            </div>
          </div>
          <div className="max-w-6xl mx-auto space-y-8">
            <div className="rounded-lg border text-card-foreground shadow-sm bg-[#05000E] border-[#1a1a1c]">
              <div className="p-6">
                <h3 className="text-lg font-medium text-white mb-6">Información de la Campaña</h3>
                <div className="space-y-6">
                  <div>
                    <label className="peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-sm font-medium text-gray-300" htmlFor="name">Nombre de la Campaña <span className="text-red-400">*</span></label>
                    <input
                      className="flex h-10 w-full rounded-md border px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm mt-2 bg-[#1A1A1C] border-[#1A1A1C] text-white placeholder-gray-400"
                      id="name"
                      placeholder="Ej. Satisfacción Cliente Q2 2023"
                      value={formData.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-sm font-medium text-gray-300" htmlFor="startDate">Fecha de Inicio <span className="text-red-400">*</span></label>
                      <button
                        className="inline-flex items-center gap-2 whitespace-nowrap rounded-md text-sm ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border h-10 px-4 py-2 w-full mt-2 justify-start text-left font-normal bg-[#1A1C1C] border-[#1A1A1C] text-white hover:bg-[#1A1A1C] hover:text-white"
                        type="button"
                        aria-haspopup="dialog"
                        aria-expanded="false"
                        aria-controls="radix-«r1c»"
                        data-state="closed"
                        onClick={() => setShowDatePicker(showDatePicker === "start" ? null : "start")}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-calendar mr-2 h-4 w-4"><path d="M8 2v4"></path><path d="M16 2v4"></path><rect width="18" height="18" x="3" y="4" rx="2"></rect><path d="M3 10h18"></path></svg>
                        {formData.startDate ? format(formData.startDate, "PPP", { locale: es }) : <span>Selecciona una fecha</span>}
                      </button>
                      {showDatePicker === "start" && (
                        <div className="mt-2">
                          <CalendarComponent
                            mode="single"
                            selected={formData.startDate}
                            onSelect={(date) => handleInputChange("startDate", date)}
                            initialFocus
                            locale={es}
                          />
                        </div>
                      )}
                    </div>
                    <div>
                      <label className="peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-sm font-medium text-gray-300" htmlFor="endDate">Fecha de Finalización</label>
                      <button
                        className="inline-flex items-center gap-2 whitespace-nowrap rounded-md text-sm ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border h-10 px-4 py-2 w-full mt-2 justify-start text-left font-normal bg-[#1A1C1C] border-[#1A1A1C] text-white hover:bg-[#1A1A1C] hover:text-white"
                        type="button"
                        aria-haspopup="dialog"
                        aria-expanded="false"
                        aria-controls="radix-«r1d»"
                        data-state="closed"
                        onClick={() => setShowDatePicker(showDatePicker === "end" ? null : "end")}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-calendar mr-2 h-4 w-4"><path d="M8 2v4"></path><path d="M16 2v4"></path><rect width="18" height="18" x="3" y="4" rx="2"></rect><path d="M3 10h18"></path></svg>
                        {formData.endDate ? format(formData.endDate, "PPP", { locale: es }) : <span>Selecciona una fecha</span>}
                      </button>
                      {showDatePicker === "end" && (
                        <div className="mt-2">
                          <CalendarComponent
                            mode="single"
                            selected={formData.endDate}
                            onSelect={(date) => handleInputChange("endDate", date)}
                            initialFocus
                            locale={es}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-lg border text-card-foreground shadow-sm bg-[#05000E] border-[#1a1a1c]">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-medium text-white">Asignar Lista de contactos</h3>
                  <a href="/contacts/import-csv-step-1">
                    <button
                      className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border h-10 px-4 py-2"
                      style={{ backgroundColor: "#5E17EB", color: "#fff", borderColor: "#5E17EB" }}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-plus w-4 h-4 mr-2"><path d="M5 12h14"></path><path d="M12 5v14"></path></svg>
                      Importar Contactos
                    </button>
                  </a>
                </div>
                <Select
                  value={formData.selectedContactList}
                  onValueChange={(value) => handleInputChange("selectedContactList", value)}
                >
                  <SelectTrigger className="w-full bg-[#1a1a1c] border-[#374151] text-white">
                    <SelectValue placeholder="Selecciona una lista de contactos" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#1a1a1c] border-[#374151] text-white">
                    {contactLists.map((list) => (
                      <SelectItem key={list.id} value={list.id}>
                        {list.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="rounded-lg border text-card-foreground shadow-sm bg-[#05000E] border-[#1a1a1c]">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-medium text-white">Selección de Agente</h3>
                  <div className="flex items-center space-x-4">
                    <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 underline-offset-4 hover:underline h-10 text-[#5E17EB] p-0 hover:text-[#5E17EB]/80">
                      Ver todos los agentes
                    </button>
                    <div className="relative">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-search absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400"><circle cx="11" cy="11" r="8"></circle><path d="m21 21-4.3-4.3"></path></svg>
                      <input className="flex h-10 rounded-md border px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm pl-10 bg-[#1A1A1C] border-[#1A1A1C] text-white placeholder-gray-400 w-48" placeholder="Buscar agente..."/>
                    </div>
                    <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 h-10 px-4 py-2 bg-[#5E17EB] hover:bg-[#5E17EB]/90 text-white">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-plus h-4 w-4 mr-2"><path d="M5 12h14"></path><path d="M12 5v14"></path></svg>
                      Crear Nuevo Agente
                    </button>
                  </div>
                </div>
                <p className="text-gray-300 text-sm mb-6">
                  Seleccione un agente para esta campaña <span className="text-red-400">*</span>
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {agents.map((agent) => (
                    <div
                      key={agent.id}
                      className={`rounded-lg border text-card-foreground shadow-sm cursor-pointer transition-all duration-200 bg-[#1A1C1C] border-[#1A1A1C] ${formData.selectedAgentId === agent.id ? "border-[#5e17eb]" : "border-gray-700"} hover:border-[#5e17eb]`}
                      onClick={() => handleAgentSelect(agent.id)}
                    >
                      <div className="p-6">
                        <div className="flex flex-col items-center text-center">
                          <div className="relative mb-4">
                            <div className="w-20 h-20 bg-black rounded-lg flex items-center justify-center border border-[#374151]">
                              {agent.avatarImage ? (
                                <img src={agent.avatarImage} alt={agent.name} className="w-full h-full object-cover" />
                              ) : (
                                // Mostrar icono según el nombre del agente
                                <>
                                  {agent.name === "SofíA" && (
                                    <img src="/agents/sofia-icon-new.svg" alt="SofíA" className="w-16 h-16" />
                                  )}
                                  {agent.name === "MariA" && (
                                    <img src="/agents/maria-icon-new.svg" alt="MariA" className="w-16 h-16" />
                                  )}
                                  {agent.name === "ValeriA" && (
                                    <img src="/agents/valeria-icon-new.svg" alt="ValeriA" className="w-16 h-16" />
                                  )}
                                  {agent.name === "LuciO" && (
                                    <img src="/agents/lucio-icon-new.svg" alt="LuciO" className="w-16 h-16" />
                                  )}
                                  {/* Si no es ninguno de los anteriores, mostrar inicial */}
                                  {!(["SofíA", "MariA", "ValeriA", "LuciO"].includes(agent.name)) && (
                                    <div className="w-full h-full bg-gray-600 flex items-center justify-center text-white font-semibold">
                                      {agent.name.charAt(0).toUpperCase()}
                                    </div>
                                  )}
                                </>
                              )}
                            </div>
                          </div>
                          <h4 className="text-lg font-semibold text-white mb-4">{agent.name}</h4>
                          <div className="space-y-1 text-sm w-full">
                            <div className="text-center"><span className="text-gray-400">Idioma: </span><span className="text-white">{agent.idioma}</span></div>
                            <div className="text-center"><span className="text-gray-400">Acento: </span><span className="text-white">{agent.acento}</span></div>
                            <div className="text-center"><span className="text-gray-400">Tono: </span><span className="text-white">{agent.tono}</span></div>
                            <div className="text-center"><span className="text-gray-400">Fondo: </span><span className="text-white">{agent.fondo}</span></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          {showRequiredFieldsAlert && (
            <div className="max-w-6xl mx-auto">
              <div role="alert" className="relative w-full rounded-lg border p-4 [&>svg~*]:pl-7 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground text-foreground bg-red-500/10 border-red-500/20 mb-4">
                <CircleAlert className="h-4 w-4 text-red-400" />
                <div className="text-sm [&_p]:leading-relaxed text-red-400">
                  <div className="space-y-1">
                    <p className="font-medium">Errores de validación:</p>
                    <ul className="list-disc list-inside space-y-1">
                      <li className="text-sm">Es necesario que llenes todos los campos</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}
          <div className="flex justify-between items-center pt-8 pb-8 max-w-6xl mx-auto">
            <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border bg-background hover:bg-accent h-10 px-4 py-2 border-gray-600 text-gray-400 hover:text-white" onClick={handleCancel}>
              Cancelar
            </button>
            <button
              className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 h-10 px-4 py-2 bg-[#5E17EB] hover:bg-[#5E17EB]/90 text-white"
              onClick={handleNext}
            >
              Siguiente
            </button>
          </div>
        </main>
      </div>

      {/* Dialog for creating new campaign */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogTitle>Crear Nueva Campaña</DialogTitle>
          {/* ...el resto del contenido del diálogo... */}
        </DialogContent>
      </Dialog>
    </div>
  )
}
