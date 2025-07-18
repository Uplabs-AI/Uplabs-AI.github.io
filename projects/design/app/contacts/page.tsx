"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Search, Filter, Mail, Phone, Instagram, Link2, Download, Edit, Trash2, Plus, User, Users, CircleAlert } from "lucide-react"
import UserInfoBar from "@/components/layout/user-info-bar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"
import { useContactListStore } from "@/lib/stores/contact-list-store"

export default function ContactsPage() {
  const [activeTab, setActiveTab] = useState("todos")
  const [searchQuery, setSearchQuery] = useState("")
  const router = useRouter()

  const { toast } = useToast()
  const [editingContact, setEditingContact] = useState<any>(null)
  const [editForm, setEditForm] = useState({
    nombres: "",
    apellidos: "",
    celular: "",
    empresa: "",
    edad: "",
    estadoLaboral: "",
    countryCode: "+591",
    existingList: "",
  })

  // Estado para los campos personalizados del modal de edición
  const [editCustomFields, setEditCustomFields] = useState<{ id: number; label: string; value: string }[]>([])

  const [selectedList, setSelectedList] = useState("")
  const [searchTerm, setSearchTerm] = useState("")
  
  // Estados para manejo de selección múltiple
  const [selectedContacts, setSelectedContacts] = useState<number[]>([])
  const [selectAll, setSelectAll] = useState(false)
  
  // Estados para modal de crear lista
  const [isCreateListModalOpen, setIsCreateListModalOpen] = useState(false)
  const [newListName, setNewListName] = useState("")

  // Datos de ejemplo basados en la imagen de Figma
  const contacts = [
    {
      id: 1,
      name: "Fernando García",
      email: "fernando.garcia@empresa.com",
      initials: "FG",
      color: "bg-blue-500",
      phone: "612 345 678",
      company: "Tecnología S.A.",
      industry: "Tecnología",
      age: 34,
      employmentStatus: "Dependiente",
      list: { name: "Campaña NPS", color: "bg-green-600" },
    },
    {
      id: 2,
      name: "María Rodríguez",
      email: "maria.rodriguez@empresa.com",
      initials: "MR",
      color: "bg-purple-500",
      phone: "623 456 789",
      company: "Finanzas Plus",
      industry: "Finanzas",
      age: 42,
      employmentStatus: "Directivo",
      list: { name: "Proveedor salud", color: "bg-purple-600" },
    },
    {
      id: 3,
      name: "Jesús Joffre",
      email: "jesus.joffre@hotmail.com",
      initials: "JJ",
      color: "bg-green-500",
      phone: "700 255 24",
      company: "Retail Innovación",
      industry: "Retail",
      age: 29,
      employmentStatus: "Empleado",
      list: { name: "Siniestros", color: "bg-green-600" },
    },
    {
      id: 4,
      name: "Carlos Eguez",
      email: "carlosex12@gmail.com",
      initials: "CE",
      color: "bg-orange-500",
      phone: "771 690 61",
      company: "Salud Integral",
      industry: "Salud",
      age: 38,
      employmentStatus: "Independiente",
      list: { name: "Auto xKm", color: "bg-red-600" },
    },
    {
      id: 5,
      name: "Lenny Mercado",
      email: "lennycasass@gmail.com",
      initials: "LM",
      color: "bg-red-500",
      phone: "700 152 09",
      company: "Educación Digital",
      industry: "Educación",
      age: 45,
      employmentStatus: "Directivo",
      list: { name: "Salud total", color: "bg-amber-600" },
    },
    {
      id: 6,
      name: "Ana Morales",
      email: "ana.morales@constructora.com",
      initials: "AM",
      color: "bg-cyan-500",
      phone: "765 432 109",
      company: "Constructora Boliviana",
      industry: "Construcción",
      age: 31,
      employmentStatus: "Empleado",
      list: { name: "Campaña NPS", color: "bg-green-600" },
    },
    {
      id: 7,
      name: "Roberto Silva",
      email: "roberto.silva@mineria.bo",
      initials: "RS",
      color: "bg-yellow-500",
      phone: "678 901 234",
      company: "Minería del Sur",
      industry: "Minería",
      age: 48,
      employmentStatus: "Directivo",
      list: { name: "Auto xKm", color: "bg-red-600" },
    },
    {
      id: 8,
      name: "Patricia Vega",
      email: "patricia.vega@gmail.com",
      initials: "PV",
      color: "bg-pink-500",
      phone: "712 345 678",
      company: "Textiles Andinos",
      industry: "Textil",
      age: 27,
      employmentStatus: "Empleado",
      list: { name: "Proveedor salud", color: "bg-purple-600" },
    },
    {
      id: 9,
      name: "Diego Mamani",
      email: "diego.mamani@agro.com",
      initials: "DM",
      color: "bg-lime-500",
      phone: "789 012 345",
      company: "AgroBolivia",
      industry: "Agricultura",
      age: 36,
      employmentStatus: "Independiente",
      list: { name: "Siniestros", color: "bg-green-600" },
    },
    {
      id: 10,
      name: "Claudia Pérez",
      email: "claudia.perez@hotmail.com",
      initials: "CP",
      color: "bg-indigo-500",
      phone: "654 321 987",
      company: "Turismo Aventura",
      industry: "Turismo",
      age: 33,
      employmentStatus: "Directivo",
      list: { name: "Salud total", color: "bg-amber-600" },
    },
    {
      id: 11,
      name: "Andrés Quiroga",
      email: "andres.quiroga@banco.com",
      initials: "AQ",
      color: "bg-teal-500",
      phone: "698 765 432",
      company: "Banco Nacional",
      industry: "Finanzas",
      age: 41,
      employmentStatus: "Empleado",
      list: { name: "Campaña NPS", color: "bg-green-600" },
    },
    {
      id: 12,
      name: "Sofía Choque",
      email: "sofia.choque@universidad.edu",
      initials: "SC",
      color: "bg-rose-500",
      phone: "723 456 789",
      company: "Universidad Mayor",
      industry: "Educación",
      age: 39,
      employmentStatus: "Empleado",
      list: { name: "Proveedor salud", color: "bg-purple-600" },
    },
    {
      id: 13,
      name: "Miguel Condori",
      email: "miguel.condori@transporte.bo",
      initials: "MC",
      color: "bg-violet-500",
      phone: "756 890 123",
      company: "Transporte Expreso",
      industry: "Transporte",
      age: 44,
      employmentStatus: "Independiente",
      list: { name: "Auto xKm", color: "bg-red-600" },
    },
    {
      id: 14,
      name: "Gabriela Quispe",
      email: "gabriela.quispe@comercio.com",
      initials: "GQ",
      color: "bg-emerald-500",
      phone: "734 567 890",
      company: "Comercio Internacional",
      industry: "Comercio",
      age: 30,
      employmentStatus: "Empleado",
      list: { name: "Siniestros", color: "bg-green-600" },
    },
    {
      id: 15,
      name: "Raúl Mendoza",
      email: "raul.mendoza@gmail.com",
      initials: "RM",
      color: "bg-slate-500",
      phone: "687 234 567",
      company: "Consultoría Legal",
      industry: "Legal",
      age: 52,
      employmentStatus: "Directivo",
      list: { name: "Salud total", color: "bg-amber-600" },
    },
    {
      id: 16,
      name: "Valeria Rojas",
      email: "valeria.rojas@medica.com",
      initials: "VR",
      color: "bg-fuchsia-500",
      phone: "712 890 345",
      company: "Clínica San José",
      industry: "Salud",
      age: 35,
      employmentStatus: "Empleado",
      list: { name: "Campaña NPS", color: "bg-green-600" },
    },
    {
      id: 17,
      name: "Javier Torrez",
      email: "javier.torrez@energia.bo",
      initials: "JT",
      color: "bg-amber-500",
      phone: "745 123 678",
      company: "Energía Renovable",
      industry: "Energía",
      age: 28,
      employmentStatus: "Empleado",
      list: { name: "Proveedor salud", color: "bg-purple-600" },
    },
    {
      id: 18,
      name: "Carmen Flores",
      email: "carmen.flores@hotmail.com",
      initials: "CF",
      color: "bg-sky-500",
      phone: "798 456 123",
      company: "Gastronomía Típica",
      industry: "Gastronomía",
      age: 37,
      employmentStatus: "Independiente",
      list: { name: "Auto xKm", color: "bg-red-600" },
    },
    {
      id: 19,
      name: "Eduardo Vargas",
      email: "eduardo.vargas@comunicacion.com",
      initials: "EV",
      color: "bg-orange-600",
      phone: "723 789 012",
      company: "Medios Digitales",
      industry: "Comunicación",
      age: 32,
      employmentStatus: "Empleado",
      list: { name: "Siniestros", color: "bg-green-600" },
    },
    {
      id: 20,
      name: "Lucía Herrera",
      email: "lucia.herrera@artesania.bo",
      initials: "LH",
      color: "bg-red-600",
      phone: "756 345 890",
      company: "Artesanías Bolivianas",
      industry: "Artesanía",
      age: 26,
      employmentStatus: "Independiente",
      list: { name: "Salud total", color: "bg-amber-600" },
    },
  ]

  const handleEditContact = (contact: any) => {
    setEditingContact(contact)
    const [firstName, ...lastNameParts] = contact.name.split(" ")
    
    // Mapear el nombre de la lista actual al valor del select
    const getListValue = (listName: string) => {
      const listMapping: { [key: string]: string } = {
        "Campaña NPS": "campana-nps",
        "Proveedor salud": "proveedor-salud", 
        "Siniestros": "siniestros",
        "Auto xKm": "auto-xkm",
        "Salud total": "salud-total"
      }
      return listMapping[listName] || ""
    }

    setEditForm({
      nombres: firstName || "",
      apellidos: lastNameParts.join(" ") || "",
      celular: contact.phone || "",
      empresa: contact.company || "",
      edad: contact.age?.toString() || "",
      estadoLaboral: contact.employmentStatus || "",
      countryCode: "+591",
      existingList: getListValue(contact.list?.name || ""),
    })
  }

  const handleSaveContact = () => {
    if (!editForm.nombres.trim() || !editForm.apellidos.trim() || !editForm.celular.trim()) {
      toast({
        title: "Error",
        description: "Por favor completa todos los campos obligatorios",
        variant: "destructive",
      })
      return
    }

    toast({
      title: "Contacto actualizado",
      description: "Los datos del contacto se han guardado correctamente",
    })

    setEditingContact(null)
    setEditForm({
      nombres: "",
      apellidos: "",
      celular: "",
      empresa: "",
      edad: "",
      estadoLaboral: "",
      countryCode: "+591",
      existingList: "",
    })
    setEditCustomFields([])
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return (
          <Badge className="bg-[#22c55e] hover:bg-[#22c55e] text-white border-0 px-3 py-1 rounded-full text-xs font-medium">
            Activa
          </Badge>
        )
      case "paused":
        return (
          <Badge className="bg-[#f97316] hover:bg-[#f97316] text-white border-0 px-3 py-1 rounded-full text-xs font-medium">
            Pausada
          </Badge>
        )
      case "template":
        return (
          <Badge className="bg-[#60a5fa] hover:bg-[#60a5fa] text-white border-0 px-3 py-1 rounded-full text-xs font-medium">
            Plantilla
          </Badge>
        )
      case "scheduled":
        return (
          <Badge className="bg-[#9333ea] hover:bg-[#9333ea] text-white border-0 px-3 py-1 rounded-full text-xs font-medium">
            Programada
          </Badge>
        )
      case "draft":
        return (
          <Badge className="bg-[#6b7280] hover:bg-[#6b7280] text-white border-0 px-3 py-1 rounded-full text-xs font-medium">
            Borrador
          </Badge>
        )
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const handleSearchChange = (value: string) => {
    setSearchQuery(value)
  }

  // Funciones para manejo de selección múltiple
  const handleSelectAll = (checked: boolean) => {
    setSelectAll(checked)
    if (checked) {
      setSelectedContacts(contacts.map(contact => contact.id))
    } else {
      setSelectedContacts([])
    }
  }

  const handleSelectContact = (contactId: number, checked: boolean) => {
    if (checked) {
      setSelectedContacts(prev => [...prev, contactId])
    } else {
      setSelectedContacts(prev => prev.filter(id => id !== contactId))
      setSelectAll(false)
    }
  }

  const handleCreateListFromSelected = () => {
    // Abrir modal para pedir nombre de lista
    setIsCreateListModalOpen(true)
  }

  const handleSaveNewList = () => {
    if (!newListName.trim()) {
      toast({
        title: "Error",
        description: "Por favor ingresa un nombre para la lista",
        variant: "destructive",
      })
      return
    }

    // Crear nueva lista con contactos seleccionados
    const selectedContactsData = contacts.filter(contact => 
      selectedContacts.includes(contact.id)
    ).map(contact => ({
      name: contact.name,
      phone: contact.phone,
      apellidos: contact.name.split(' ').slice(1).join(' ') || "",
      empresa: contact.company || "",
      edad: contact.age?.toString() || "",
      estadoLaboral: contact.employmentStatus || "",
    }))

    const newList = {
      id: `list-${Date.now()}`,
      name: newListName.trim(),
      contacts: selectedContactsData,
      lastModified: new Date().toLocaleDateString("es-ES") + ", " + new Date().toLocaleTimeString("es-ES", { hour: '2-digit', minute: '2-digit' }) + " hrs",
      contactCount: selectedContactsData.length,
    }

    // Usar el store de Zustand para agregar la lista
    useContactListStore.getState().addList(newList)

    toast({
      title: "Lista creada",
      description: `Se ha creado la lista "${newListName}" con ${selectedContacts.length} contactos seleccionados`,
    })
    
    // Limpiar estados
    setSelectedContacts([])
    setSelectAll(false)
    setNewListName("")
    setIsCreateListModalOpen(false)
  }

  const handleCancelCreateList = () => {
    setNewListName("")
    setIsCreateListModalOpen(false)
  }

  // Funciones para manejar campos personalizados en el modal de edición
  const handleAddEditField = () => {
    setEditCustomFields([...editCustomFields, { id: Date.now(), label: "", value: "" }])
  }

  const handleRemoveEditField = (id: number) => {
    setEditCustomFields(editCustomFields.filter((field) => field.id !== id))
  }

  const handleEditFieldChange = (id: number, type: "label" | "value", text: string) => {
    setEditCustomFields(
      editCustomFields.map((field) =>
        field.id === id ? { ...field, [type]: text } : field
      )
    )
  }

  return (
    <>
      {/* Header - Independent Container */}
      <header className="flex items-center justify-between p-4 border-b border-border">
        <h1 className="text-xl font-semibold">Contactos</h1>
        <UserInfoBar email="usuario@empresa.com" />
      </header>

      {/* Contact Management Section - Independent Container */}
      <main className="flex-1 overflow-y-auto p-6">
          <div className="space-y-4 pt-4">
            <div className="flex items-center justify-between space-y-2">
              <h2 className="text-3xl font-bold tracking-tight text-white">Contactos</h2>
              <div className="flex items-center justify-end space-x-4">
                <Link href="/contacts/import-csv-step-1" passHref className="hidden">
                  <button className="justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 h-10 bg-[#121212] border border-[#374151] hover:bg-[#1a1a1c] text-white rounded-md px-4 py-2 flex items-center space-x-2">
                    <Users className="w-4 h-4" />
                    <span>Crear Lista</span>
                  </button>
                </Link>
                <Link href="/contacts/create-new" passHref>
                  <button className="bg-primary text-primary-foreground hover:bg-primary/90 inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 h-10 px-4 py-2" style={{backgroundColor: "#121212", color: "#fff", border: "1px solid #4B5563"}}>
                    <Plus className="mr-2 h-4 w-4" />
                    Crear Contacto
                  </button>
                </Link>
                <Link href="/contacts/import-csv-step-1" passHref>
                  <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 h-10 px-4 py-2 bg-[#5E17EB] hover:bg-[#5E17EB]/90 text-white">
                    <Plus className="mr-2 h-4 w-4" />
                    Importar Tabla
                  </button>
                </Link>
              </div>
            </div>

            {/* Contenido principal */}
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
              <TabsContent value="todos" className="p-0 mt-8">
                <div className="flex items-center gap-4 mb-6">
                  {/* Más Filtros */}
                  <Select defaultValue="todos-filtros">
                    <SelectTrigger className="w-48 bg-[#1a1a1c] border-[#374151] text-white focus:border-[#5E17EB] focus:ring-1 focus:ring-[#5E17EB]">
                      <SelectValue placeholder="Más Filtros" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#1a1a1c] border-[#374151]">
                      <SelectItem value="todos-filtros" className="text-white hover:bg-[#374151]">
                        Todos los Filtros
                      </SelectItem>
                      <SelectItem value="por-edad" className="text-white hover:bg-[#374151]">
                        Por Edad
                      </SelectItem>
                      <SelectItem value="por-estado-laboral" className="text-white hover:bg-[#374151]">
                        Por Estado Laboral
                      </SelectItem>
                      <SelectItem value="por-industria" className="text-white hover:bg-[#374151]">
                        Por Industria
                      </SelectItem>
                      <SelectItem value="por-lista" className="text-white hover:bg-[#374151]">
                        Por Lista
                      </SelectItem>
                    </SelectContent>
                  </Select>

                  {/* Lista */}
                  <Select defaultValue="todas-listas">
                    <SelectTrigger className="w-48 bg-[#1a1a1c] border-[#374151] text-white focus:border-[#5E17EB] focus:ring-1 focus:ring-[#5E17EB]">
                      <SelectValue placeholder="Lista" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#1a1a1c] border-[#374151]">
                      <SelectItem value="todas-listas" className="text-white hover:bg-[#374151]">
                        Todas las Listas
                      </SelectItem>
                      <SelectItem value="campana-nps" className="text-white hover:bg-[#374151]">
                        Campaña NPS
                      </SelectItem>
                      <SelectItem value="proveedor-salud" className="text-white hover:bg-[#374151]">
                        Proveedor salud
                      </SelectItem>
                    </SelectContent>
                  </Select>

                  {/* Barra de búsqueda */}
                  <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      type="text"
                      placeholder="Buscar..."
                      value={searchQuery}
                      onChange={(e) => handleSearchChange(e.target.value)}
                      className="pl-10 bg-[#1a1a1c] border-[#374151] text-white placeholder-gray-400 focus:border-[#5E17EB] focus:ring-1 focus:ring-[#5E17EB]"
                    />
                  </div>

                  {/* Exportar */}
                  <Button variant="outline" className="ml-auto text-white border-gray-600 hover:bg-gray-800">
                    <Download className="mr-2 h-4 w-4" />
                    Exportar
                  </Button>


                </div>

                <div className="text-sm text-muted-foreground hidden">Total 2,547 registros | 1 de 128 Páginas</div>

                {/* Alert para selección múltiple */}
                {selectedContacts.length > 1 && (
                  <div role="alert" className="relative w-full rounded-lg border p-4 bg-blue-500/10 border-blue-500/20 mb-4">
                    <div className="flex items-center gap-3">
                      <CircleAlert className="h-4 w-4 text-blue-400 flex-shrink-0" />
                      <div className="flex items-center justify-between w-full">
                        <span className="text-sm text-blue-400">¿Quieres crear una lista de los contactos seleccionados?</span>
                        <Button
                          onClick={handleCreateListFromSelected}
                          className="ml-4 bg-[#5E17EB] hover:bg-[#5E17EB]/90 text-white h-8 px-3 text-xs flex-shrink-0"
                        >
                          Crear Lista
                        </Button>
                      </div>
                    </div>
                  </div>
                )}

                <Card className="bg-[#000000] border-[#1a1a1c]">
                  <CardContent className="p-0">
                    <Table>
                      <TableHeader>
                        <TableRow className="hover:bg-transparent border-[#1a1a1c]">
                          <TableHead className="w-[40px]">
                            <Checkbox 
                              checked={selectAll}
                              onCheckedChange={handleSelectAll}
                            />
                          </TableHead>
                          <TableHead className="text-gray-400 font-medium h-12 px-6">NOMBRE/EMAIL</TableHead>
                          <TableHead className="text-gray-400 font-medium h-12 px-6">CELULAR</TableHead>
                          <TableHead className="text-gray-400 font-medium h-12 px-6">EMPRESA</TableHead>
                          <TableHead className="text-gray-400 font-medium h-12 px-6">RUBRO (INDUSTRIA)</TableHead>
                          <TableHead className="text-gray-400 font-medium h-12 px-6">EDAD</TableHead>
                          <TableHead className="text-gray-400 font-medium h-12 px-6">ESTADO LABORAL</TableHead>
                          <TableHead className="text-gray-400 font-medium h-12 px-6">LISTA</TableHead>
                          <TableHead className="text-gray-400 font-medium h-12 px-6 text-right">ACCIONES</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {contacts.map((contact) => (
                          <TableRow
                            key={contact.id}
                            className="hover:bg-[#1a1a1c]/50 border-[#1a1a1c]"
                          >
                            <TableCell className="py-4">
                              <Checkbox 
                                checked={selectedContacts.includes(contact.id)}
                                onCheckedChange={(checked) => handleSelectContact(contact.id, checked as boolean)}
                              />
                            </TableCell>
                            <TableCell className="py-4 cursor-pointer" onClick={() => handleEditContact(contact)}>
                              <div className="flex items-center gap-3">
                                <div
                                  className={`flex items-center justify-center w-8 h-8 rounded-full ${contact.color} text-white text-sm font-medium`}
                                >
                                  {contact.initials}
                                </div>
                                <div className="flex flex-col">
                                  <span className="font-medium text-white">{contact.name}</span>
                                  <span className="text-sm text-muted-foreground">{contact.email}</span>
                                </div>
                              </div>
                            </TableCell>
                            <TableCell className="text-blue-400 py-4 cursor-pointer" onClick={() => handleEditContact(contact)}>{contact.phone}</TableCell>
                            <TableCell className="py-4 text-white cursor-pointer" onClick={() => handleEditContact(contact)}>{contact.company}</TableCell>
                            <TableCell className="py-4 text-white cursor-pointer" onClick={() => handleEditContact(contact)}>{contact.industry}</TableCell>
                            <TableCell className="py-4 text-white cursor-pointer" onClick={() => handleEditContact(contact)}>{contact.age}</TableCell>
                            <TableCell className="py-4 text-white cursor-pointer" onClick={() => handleEditContact(contact)}>{contact.employmentStatus}</TableCell>
                            <TableCell className="py-4 cursor-pointer" onClick={() => handleEditContact(contact)}>
                              <Badge className={`${contact.list.color} hover:${contact.list.color} text-white`}>
                                {contact.list.name}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-right py-4">
                              <div className="flex justify-end gap-2">
                                <Button 
                                  variant="ghost" 
                                  size="icon" 
                                  className="h-8 w-8 text-white hover:bg-muted"
                                  onClick={() => handleEditContact(contact)}
                                >
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="icon" className="h-8 w-8 text-white hover:bg-muted">
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>

                <div className="text-sm text-muted-foreground">Mostrando 1-20 de 20 contactos</div>

                <div className="flex justify-end">
                  <div className="flex items-center gap-1">
                    <Button variant="outline" size="sm" className="h-8 px-3 border-border text-white hover:bg-muted">
                      Anterior
                    </Button>
                    <Button variant="outline" size="sm" className="h-8 w-8 bg-primary text-primary-foreground">
                      1
                    </Button>
                    <Button variant="outline" size="sm" className="h-8 w-8 border-border text-white hover:bg-muted">
                      2
                    </Button>
                    <Button variant="outline" size="sm" className="h-8 w-8 border-border text-white hover:bg-muted">
                      3
                    </Button>
                    <Button variant="outline" size="sm" className="h-8 px-3 border-border text-white hover:bg-muted">
                      Siguiente
                    </Button>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="listas" className="p-0 mt-4">
                <Card className="bg-[#0A0A0A] border-border">
                  <CardContent className="flex items-center justify-center h-40">
                    <p className="text-muted-foreground">Contenido de listas aquí</p>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

            {/* Modal de Crear Lista */}
            <Dialog open={isCreateListModalOpen} onOpenChange={setIsCreateListModalOpen}>
              <DialogContent className="bg-[#0A0A0A] border-gray-800 text-white max-w-md">
                <DialogHeader>
                  <DialogTitle className="text-xl font-bold">Crear Nueva Lista</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="list-name" className="text-[#D1D5DB] flex items-center">
                      Nombre de la Lista <span className="text-red-500 ml-1">*</span>
                    </Label>
                    <Input
                      id="list-name"
                      value={newListName}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewListName(e.target.value)}
                      className="bg-[#1A1A1C] border-[#4B5563] text-white focus:border-[#5E17EB]"
                      placeholder="Ej. Seguro de vida"
                    />
                  </div>
                  <div className="text-sm text-[#9CA3AF]">
                    Se creará una lista con {selectedContacts.length} contactos seleccionados.
                  </div>
                </div>
                <DialogFooter className="flex gap-3">
                  <Button
                    variant="outline"
                    onClick={handleCancelCreateList}
                    className="border-gray-600 text-gray-300 hover:text-white"
                  >
                    Cancelar
                  </Button>
                  <Button onClick={handleSaveNewList} className="bg-[#5E17EB] hover:bg-[#5E17EB]/90 text-white">
                    Crear Lista
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            {/* Modal de Edición de Contacto */}
            <Dialog open={!!editingContact} onOpenChange={() => {
              setEditingContact(null)
              setEditCustomFields([])
            }}>
              <DialogContent className="bg-[#0A0A0A] border-gray-800 text-white max-w-4xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle className="text-xl font-bold">Editar Contacto</DialogTitle>
                </DialogHeader>
                <div className="space-y-6 py-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="edit-nombres" className="text-[#D1D5DB]">
                        Nombres
                      </Label>
                      <Input
                        id="edit-nombres"
                        value={editForm.nombres}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEditForm((prev) => ({ ...prev, nombres: e.target.value }))}
                        className="bg-[#1A1A1C] border-[#4B5563] text-white focus:border-[#5E17EB]"
                        placeholder="Ej. Julio"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="edit-apellidos" className="text-[#D1D5DB]">
                        Apellidos
                      </Label>
                      <Input
                        id="edit-apellidos"
                        value={editForm.apellidos}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEditForm((prev) => ({ ...prev, apellidos: e.target.value }))}
                        className="bg-[#1A1A1C] border-[#4B5563] text-white focus:border-[#5E17EB]"
                        placeholder="Ej. Perez"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="edit-celular" className="text-[#D1D5DB] flex items-center">
                        Celular <span className="text-red-500 ml-1">*</span>
                      </Label>
                      <div className="flex gap-2">
                        <Select
                          value={editForm.countryCode}
                          onValueChange={(value) => setEditForm((prev) => ({ ...prev, countryCode: value }))}
                        >
                          <SelectTrigger className="w-24 bg-[#1A1A1C] border-[#4B5563] focus:ring-[#5E17EB]">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="bg-[#1A1A1C] border-[#4B5563]">
                            <SelectItem value="+591">+591</SelectItem>
                            <SelectItem value="+1">+1</SelectItem>
                            <SelectItem value="+34">+34</SelectItem>
                            <SelectItem value="+52">+52</SelectItem>
                          </SelectContent>
                        </Select>
                        <Input
                          id="edit-celular"
                          value={editForm.celular}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEditForm((prev) => ({ ...prev, celular: e.target.value }))}
                          className="flex-1 bg-[#1A1A1C] border-[#4B5563] text-white focus:border-[#5E17EB]"
                          placeholder="123 45678"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="edit-empresa" className="text-[#D1D5DB]">
                        Empresa
                      </Label>
                      <Input
                        id="edit-empresa"
                        value={editForm.empresa}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEditForm((prev) => ({ ...prev, empresa: e.target.value }))}
                        className="bg-[#1A1A1C] border-[#4B5563] text-white focus:border-[#5E17EB]"
                        placeholder="ej. Sofia"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="edit-edad" className="text-[#D1D5DB]">
                        Edad
                      </Label>
                      <Input
                        id="edit-edad"
                        value={editForm.edad}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEditForm((prev) => ({ ...prev, edad: e.target.value }))}
                        className="bg-[#1A1A1C] border-[#4B5563] text-white focus:border-[#5E17EB]"
                        placeholder="ej. 40"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="edit-estado-laboral" className="text-[#D1D5DB]">
                        Estado Laboral
                      </Label>
                      <Input
                        id="edit-estado-laboral"
                        value={editForm.estadoLaboral}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEditForm((prev) => ({ ...prev, estadoLaboral: e.target.value }))}
                        className="bg-[#1A1A1C] border-[#4B5563] text-white focus:border-[#5E17EB]"
                        placeholder="ej. dependiente"
                      />
                    </div>
                  </div>

                  {/* Sección de Campos Personalizados */}
                  {editCustomFields.length > 0 && (
                    <div className="space-y-4 pt-4 border-t border-[#374151]">
                      <Label className="text-[#D1D5DB] text-base font-medium">Campos Personalizados</Label>
                      {editCustomFields.map((field) => (
                        <div key={field.id} className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4 items-end">
                          <div className="space-y-2">
                            <Label htmlFor={`edit-custom-label-${field.id}`} className="text-[#D1D5DB]">Nombre del Campo</Label>
                            <Input
                              id={`edit-custom-label-${field.id}`}
                              placeholder="Ej. Hobby"
                              value={field.label}
                              onChange={(e) => handleEditFieldChange(field.id, "label", e.target.value)}
                              className="bg-[#1A1A1C] border-[#4B5563] text-white focus:border-[#5E17EB]"
                            />
                          </div>
                          <div className="flex items-end gap-2">
                            <div className="space-y-2 flex-grow">
                              <Label htmlFor={`edit-custom-value-${field.id}`} className="text-[#D1D5DB]">Valor</Label>
                              <Input
                                id={`edit-custom-value-${field.id}`}
                                placeholder="Ej. Leer"
                                value={field.value}
                                onChange={(e) => handleEditFieldChange(field.id, "value", e.target.value)}
                                className="bg-[#1A1A1C] border-[#4B5563] text-white focus:border-[#5E17EB]"
                              />
                            </div>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleRemoveEditField(field.id)}
                              className="p-2 text-gray-400 hover:text-white hover:bg-accent"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="space-y-4">
                    <Button
                      onClick={handleAddEditField}
                      className="w-full bg-[#5E17EB] hover:bg-[#5E17EB]/90 text-white flex items-center gap-2"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Agregar Campo Personalizado
                    </Button>
                  </div>

                  <div className="space-y-4">
                    <Label className="text-[#D1D5DB] text-base font-medium">Asignar Lista</Label>
                    <div className="space-y-4">
                      <Label className="text-white font-medium">
                        Cambiar de lista <span className="text-red-500">*</span>
                      </Label>
                      <Select
                        value={editForm.existingList}
                        onValueChange={(value) => setEditForm((prev) => ({ ...prev, existingList: value }))}
                      >
                        <SelectTrigger className="bg-[#1A1A1C] border-[#4B5563] focus:ring-[#5E17EB]">
                          <SelectValue placeholder="Seleccionar lista existente" />
                        </SelectTrigger>
                        <SelectContent className="bg-[#1A1A1C] border-[#4B5563]">
                          <SelectItem value="campana-nps">Campaña NPS</SelectItem>
                          <SelectItem value="proveedor-salud">Proveedor salud</SelectItem>
                          <SelectItem value="siniestros">Siniestros</SelectItem>
                          <SelectItem value="auto-xkm">Auto xKm</SelectItem>
                          <SelectItem value="salud-total">Salud total</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
                <DialogFooter className="flex gap-3">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setEditingContact(null)
                      setEditCustomFields([])
                    }}
                    className="border-gray-600 text-gray-300 hover:text-white"
                  >
                    Cancelar
                  </Button>
                  <Button onClick={handleSaveContact} className="bg-[#5E17EB] hover:bg-[#5E17EB]/90 text-white">
                    Guardar
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
        </div>
      </main>
    </>
  )
}
