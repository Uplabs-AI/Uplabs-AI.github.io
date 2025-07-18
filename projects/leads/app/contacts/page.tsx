"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Search, Filter, Mail, Phone, Instagram, Link2, Download, Plus, User, Users, Trash2 } from "lucide-react"
import UserInfoBar from "@/components/layout/user-info-bar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"
import { useContactListStore } from "@/lib/stores/contact-list-store"
import { ContactTable } from "@/components/contacts/contact-table"
import { Badge } from "@/components/ui/badge"
import { allContactsData } from "@/lib/data/contacts" // Import the centralized data

// Definición de la interfaz para un contacto
interface Contact {
  id: number;
  name: string;
  email: string;
  initials: string;
  color: string;
  phone: string;
  company: string;
  industry: string;
  age: number;
  employmentStatus: string;
  list: {
    name: string;
    color: string;
  };
}

export default function ContactsPage() {
  const [activeTab, setActiveTab] = useState("todos")
  const [searchQuery, setSearchQuery] = useState("")
  const router = useRouter()

  const { toast } = useToast()
  const [editingContact, setEditingContact] = useState<Contact | null>(null)
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
  const contacts: Contact[] = allContactsData.map(contact => ({
    ...contact,
    list: contact.lists[0] || { name: 'Sin lista', color: 'bg-gray-500' } // Adapt lists to fit the old structure
  }))


  const handleEditContact = (contact: Contact) => {
    setEditingContact(contact)
    const [firstName, ...lastNameParts] = contact.name.split(" ")
    setEditForm({
      nombres: firstName,
      apellidos: lastNameParts.join(" "),
      celular: contact.phone.replace("+591 ", ""),
      empresa: contact.company,
      edad: contact.age.toString(),
      estadoLaboral: contact.employmentStatus,
      countryCode: "+591",
      existingList: contact.list.name,
    })
    setEditCustomFields([])
  }

  const handleSaveContact = () => {
    console.log("Saving contact:", { ...editForm, customFields: editCustomFields })
    setEditingContact(null)
    toast({
      title: "Contacto actualizado",
      description: "La información del contacto ha sido guardada.",
      variant: "default",
    })
  }

  const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case "dependiente":
        return <Badge variant="secondary">Dependiente</Badge>
      case "independiente":
        return <Badge variant="outline">Independiente</Badge>
      case "directivo":
        return <Badge className="bg-blue-600 text-white">Directivo</Badge>
      default:
        return <Badge variant="default">{status}</Badge>
    }
  }

  const handleSearchChange = (value: string) => {
    setSearchQuery(value)
  }

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedContacts(contacts.map((c) => c.id))
    } else {
      setSelectedContacts([])
    }
    setSelectAll(checked)
  }

  const handleSelectContact = (contactId: number, checked: boolean) => {
    if (checked) {
      setSelectedContacts((prev) => [...prev, contactId])
    } else {
      setSelectedContacts((prev) => prev.filter((id) => id !== contactId))
    }
  }

  const handleCreateListFromSelected = () => {
    if (selectedContacts.length > 0) {
      setIsCreateListModalOpen(true)
    } else {
      toast({
        title: "Ningún contacto seleccionado",
        description: "Por favor, selecciona al menos un contacto para crear una lista.",
        variant: "destructive",
      })
    }
  }

  const handleSaveNewList = () => {
    if (newListName.trim() === "") {
      toast({
        title: "Nombre de lista vacío",
        description: "Por favor, ingresa un nombre para la nueva lista.",
        variant: "destructive",
      })
      return
    }
    console.log(`Creando lista "${newListName}" con ${selectedContacts.length} contactos.`)
    setIsCreateListModalOpen(false)
    setNewListName("")
    setSelectedContacts([])
    setSelectAll(false)
    toast({
      title: "Lista creada",
      description: `La lista "${newListName}" ha sido creada con éxito.`,
    })
  }

  const handleCancelCreateList = () => {
    setIsCreateListModalOpen(false)
    setNewListName("")
  }

  const handleAddEditField = () => {
    setEditCustomFields([...editCustomFields, { id: Date.now(), label: "", value: "" }])
  }

  const handleRemoveEditField = (id: number) => {
    setEditCustomFields(editCustomFields.filter((field) => field.id !== id))
  }

  const handleEditFieldChange = (id: number, type: "label" | "value", text: string) => {
    setEditCustomFields(
      editCustomFields.map((field) => (field.id === id ? { ...field, [type]: text } : field))
    )
  }
  
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6 bg-[#0a0a0a] text-white">
      <UserInfoBar email="usuario@empresa.com" />
      <main className="flex-1 space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Contactos</h1>
          <div className="flex items-center gap-4">
            <Button className="bg-[#121212] border border-[#374151] hover:bg-[#1a1a1c] text-white">
              <Download className="mr-2 h-4 w-4" />
              Exportar
            </Button>
            <Link href="/contacts/import-csv-step-1">
              <Button className="bg-purple-600 hover:bg-purple-700 text-white">
                <Plus className="mr-2 h-4 w-4" />
                Importar CSV
              </Button>
            </Link>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <div className="flex items-center justify-between">
            <TabsList className="bg-[#121212] border border-[#374151] text-white">
              <TabsTrigger value="todos">Todos los contactos</TabsTrigger>
              <TabsTrigger value="listas">Listas</TabsTrigger>
            </TabsList>
            <div className="flex items-center gap-2 w-full max-w-sm">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Buscar contacto..."
                  className="w-full bg-[#121212] border border-[#374151] pl-10 text-white"
                  value={searchQuery}
                  onChange={(e) => handleSearchChange(e.target.value)}
                />
              </div>
              <Button variant="outline" className="bg-[#121212] border border-[#374151] hover:bg-[#1a1a1c] text-white">
                <Filter className="mr-2 h-4 w-4" />
                Filtros
              </Button>
            </div>
          </div>
          <TabsContent value="todos" className="mt-6">
            <Card className="bg-[#121212] border-[#1a1a1c]">
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <ContactTable
                    contacts={contacts}
                    activeTab={activeTab}
                    searchQuery={searchQuery}
                    selectedContacts={selectedContacts}
                    handleSelectContact={handleSelectContact}
                    handleEditContact={handleEditContact}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="listas" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[
                { name: "Campaña NPS", count: 3, color: "bg-green-600" },
                { name: "Proveedor salud", count: 3, color: "bg-purple-600" },
                { name: "Siniestros", count: 3, color: "bg-green-600" },
                { name: "Auto xKm", count: 3, color: "bg-red-600" },
                { name: "Salud total", count: 3, color: "bg-amber-600" },
              ].map((list) => (
                <Card key={list.name} className="bg-[#1a1a1c] border-[#374151] hover:border-purple-600 transition-colors">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-white">{list.name}</CardTitle>
                    <Users className="h-4 w-4 text-gray-400" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-white">{list.count}</div>
                    <p className="text-xs text-gray-400">contactos en esta lista</p>
                  </CardContent>
                </Card>
              ))}
              <Card
                className="bg-[#1a1a1c] border-dashed border-2 border-[#374151] flex items-center justify-center hover:border-purple-600 hover:text-purple-600 transition-colors cursor-pointer"
                onClick={() => setIsCreateListModalOpen(true)}
              >
                <div className="text-center">
                  <Plus className="mx-auto h-8 w-8 text-gray-400" />
                  <p className="mt-2 text-sm font-medium text-white">Crear nueva lista</p>
                </div>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {selectedContacts.length > 0 && (
          <div className="fixed bottom-4 left-1/2 -translate-x-1/2 w-auto bg-[#1a1a1c] border border-[#374151] rounded-lg shadow-lg p-4 flex items-center gap-4 z-50 animate-in fade-in-0 slide-in-from-bottom-5">
            <p className="text-sm font-medium text-white">{selectedContacts.length} contactos seleccionados</p>
            <div className="flex gap-2">
              <Button variant="outline" className="border-[#374151] text-white hover:bg-[#374151]">
                <Mail className="mr-2 h-4 w-4" /> Enviar correo
              </Button>
              <Button variant="outline" className="border-[#374151] text-white hover:bg-[#374151]">
                <Phone className="mr-2 h-4 w-4" /> Enviar SMS
              </Button>
              <Button
                variant="outline"
                className="border-purple-600 text-purple-400 hover:bg-purple-600/20 hover:text-purple-400"
                onClick={handleCreateListFromSelected}
              >
                <Users className="mr-2 h-4 w-4" /> Crear lista
              </Button>
            </div>
          </div>
        )}
      </main>

      {editingContact && (
        <Dialog open={!!editingContact} onOpenChange={() => setEditingContact(null)}>
          <DialogContent className="sm:max-w-[600px] bg-[#0a0a0a] border-[#1a1a1c] text-white">
            <DialogHeader>
              <DialogTitle>Editar Contacto</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="nombres">Nombres</Label>
                  <Input id="nombres" value={editForm.nombres} onChange={(e) => setEditForm({...editForm, nombres: e.target.value})} className="bg-[#1a1a1c] border-[#374151]"/>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="apellidos">Apellidos</Label>
                  <Input id="apellidos" value={editForm.apellidos} onChange={(e) => setEditForm({...editForm, apellidos: e.target.value})} className="bg-[#1a1a1c] border-[#374151]"/>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Número de Celular</Label>
                <div className="flex gap-2">
                  <Select
                    value={editForm.countryCode}
                    onValueChange={(value) => setEditForm({ ...editForm, countryCode: value })}
                  >
                    <SelectTrigger className="w-[80px] bg-[#1a1a1c] border-[#374151]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-[#1a1a1c] text-white border-[#374151]">
                      <SelectItem value="+591">🇧🇴 +591</SelectItem>
                      <SelectItem value="+1">🇺🇸 +1</SelectItem>
                      <SelectItem value="+54">🇦🇷 +54</SelectItem>
                    </SelectContent>
                  </Select>
                  <Input id="celular" value={editForm.celular} onChange={(e) => setEditForm({...editForm, celular: e.target.value})} className="flex-1 bg-[#1a1a1c] border-[#374151]"/>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="empresa">Empresa</Label>
                  <Input id="empresa" value={editForm.empresa} onChange={(e) => setEditForm({...editForm, empresa: e.target.value})} className="bg-[#1a1a1c] border-[#374151]"/>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edad">Edad</Label>
                  <Input id="edad" type="number" value={editForm.edad} onChange={(e) => setEditForm({...editForm, edad: e.target.value})} className="bg-[#1a1a1c] border-[#374151]"/>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Estado Laboral</Label>
                <RadioGroup
                  value={editForm.estadoLaboral}
                  onValueChange={(value) => setEditForm({ ...editForm, estadoLaboral: value })}
                  className="flex gap-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Dependiente" id="dependiente" />
                    <Label htmlFor="dependiente">Dependiente</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Independiente" id="independiente" />
                    <Label htmlFor="independiente">Independiente</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Directivo" id="directivo" />
                    <Label htmlFor="directivo">Directivo</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-2">
                <Label>Añadir a lista (Opcional)</Label>
                <Select
                  value={editForm.existingList}
                  onValueChange={(value) => setEditForm({ ...editForm, existingList: value })}
                >
                  <SelectTrigger className="w-full bg-[#1a1a1c] border-[#374151]">
                    <SelectValue placeholder="Seleccionar lista existente" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#1a1a1c] text-white border-[#374151]">
                    <SelectItem value="Campaña NPS">Campaña NPS</SelectItem>
                    <SelectItem value="Proveedor salud">Proveedor salud</SelectItem>
                    <SelectItem value="Siniestros">Siniestros</SelectItem>
                    <SelectItem value="Auto xKm">Auto xKm</SelectItem>
                    <SelectItem value="Salud total">Salud total</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-4">
                <Label>Campos Personalizados</Label>
                {editCustomFields.map((field, index) => (
                  <div key={field.id} className="flex items-center gap-2">
                    <Input
                      placeholder="Etiqueta (ej. Ciudad)"
                      value={field.label}
                      onChange={(e) => handleEditFieldChange(field.id, "label", e.target.value)}
                      className="bg-[#1a1a1c] border-[#374151]"
                    />
                    <Input
                      placeholder="Valor (ej. Santa Cruz)"
                      value={field.value}
                      onChange={(e) => handleEditFieldChange(field.id, "value", e.target.value)}
                      className="bg-[#1a1a1c] border-[#374151]"
                    />
                    <Button variant="ghost" size="icon" onClick={() => handleRemoveEditField(field.id)}>
                      <Trash2 className="h-4 w-4 text-red-500"/>
                    </Button>
                  </div>
                ))}
                <Button variant="outline" onClick={handleAddEditField} className="w-full border-dashed">
                  <Plus className="mr-2 h-4 w-4" /> Añadir campo personalizado
                </Button>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setEditingContact(null)}>Cancelar</Button>
              <Button onClick={handleSaveContact} className="bg-purple-600 hover:bg-purple-700">Guardar Cambios</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      <Dialog open={isCreateListModalOpen} onOpenChange={setIsCreateListModalOpen}>
        <DialogContent className="sm:max-w-[425px] bg-[#0a0a0a] border-[#1a1a1c] text-white">
          <DialogHeader>
            <DialogTitle>Crear Nueva Lista</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="list-name">Nombre de la lista</Label>
              <Input
                id="list-name"
                value={newListName}
                onChange={(e) => setNewListName(e.target.value)}
                placeholder="Ej. Clientes potenciales"
                className="bg-[#1a1a1c] border-[#374151]"
              />
            </div>
            <p className="text-sm text-gray-400">
              Se creará una nueva lista con los {selectedContacts.length} contactos seleccionados.
            </p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={handleCancelCreateList}>Cancelar</Button>
            <Button onClick={handleSaveNewList} className="bg-purple-600 hover:bg-purple-700">Crear Lista</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
