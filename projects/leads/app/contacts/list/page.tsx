"use client"

import { useState, useEffect } from "react"
import { ChevronRight, ChevronDown, ArrowLeft, Users, Phone, Edit, Trash2, X, Save, Search, ChevronLeft, Download } from "lucide-react"
import UserInfoBar from "@/components/layout/user-info-bar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import Link from "next/link"
import { useToast } from "@/components/ui/use-toast"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useContactListStore, type Contact, type ContactList } from "@/lib/stores/contact-list-store"

// Datos iniciales para evitar errores de hidratación. Deben coincidir con los del store.
const defaultContactLists: ContactList[] = [
  { id: "accidentes-personales", name: "Accidentes Personales", contacts: [], lastModified: "01/05/2025, 09:44 hrs", contactCount: 100 },
  { id: "talleres", name: "Talleres", contacts: [], lastModified: "01/05/2025, 09:44 hrs", contactCount: 100 },
  { id: "salud-360", name: "Salud 360", contacts: [], lastModified: "01/05/2025, 09:44 hrs", contactCount: 100 },
  { id: "vida", name: "Vida", contacts: [], lastModified: "01/05/2025, 09:44 hrs", contactCount: 100 },
  { id: "auto-xkm", name: "Auto xKm", contacts: [], lastModified: "01/05/2025, 09:44 hrs", contactCount: 100 },
]

export default function ContactsListPage() {
  const { toast } = useToast()
  
  // Paso 1: Obtener los datos y acciones del store.
  const allLists = useContactListStore((state) => state.contactLists)
  const { updateListName, deleteList } = useContactListStore()

  // Paso 2: Crear un estado para manejar la hidratación.
  const [isMounted, setIsMounted] = useState(false)

  // Paso 3: Marcar el componente como montado SOLO en el cliente.
  useEffect(() => {
    setIsMounted(true)
  }, [])
  
  // Paso 4: Usar las listas del store SOLO si el componente está montado.
  // De lo contrario, usar las listas por defecto para el renderizado inicial y de servidor.
  const contactLists = isMounted ? allLists : defaultContactLists;

  const [expandedLists, setExpandedLists] = useState<{ [key: string]: boolean }>({
    "salud-total": true,
  })

  // Estados para edición y eliminación de contactos (lógica local)
  const [editingContact, setEditingContact] = useState<{
    listId: string
    contactIndex: number
    contact: Contact
  } | null>(null)
  const [deletingContact, setDeletingContact] = useState<{
    listId: string
    contactIndex: number
    contact: Contact
  } | null>(null)
  const [editForm, setEditForm] = useState({
    name: "",
    phone: "",
    apellidos: "",
    empresa: "",
    edad: "",
    estadoLaboral: "",
    countryCode: "+591",
  })

  // Estado para el modal de edición de nombre de lista
  const [editingList, setEditingList] = useState<{
    listId: string
    listName: string
  } | null>(null)
  const [editListForm, setEditListForm] = useState({ name: "" })

  const toggleList = (listId: string) => {
    setExpandedLists((prev) => ({
      ...prev,
      [listId]: !prev[listId],
    }))
  }
  
  // La lógica de manejo de contactos dentro de una lista sigue siendo local por ahora
  const handleEditContact = (listId: string, contactIndex: number, contact: Contact) => {
    setEditingContact({ listId, contactIndex, contact })
    setEditForm({
      name: contact.name,
      phone: contact.phone,
      apellidos: contact.apellidos || "",
      empresa: contact.empresa || "",
      edad: contact.edad || "",
      estadoLaboral: contact.estadoLaboral || "",
      countryCode: "+591",
    })
  }

  const handleSaveEdit = () => {
    if (!editingContact) return

    if (!editForm.name.trim() || !editForm.phone.trim()) {
      toast({
        title: "Error",
        description: "Por favor completa todos los campos",
        variant: "destructive",
      })
      return
    }

    // ... (sin cambios, necesitaría una acción en el store para persistir)

    toast({
      title: "Contacto actualizado",
      description: "Los datos del contacto se han guardado correctamente",
    })

    setEditingContact(null)
    setEditForm({ name: "", phone: "", apellidos: "", empresa: "", edad: "", estadoLaboral: "", countryCode: "+591" })
  }

  const handleDeleteContact = (listId: string, contactIndex: number, contact: Contact) => {
    setDeletingContact({ listId, contactIndex, contact })
  }

  const confirmDelete = () => {
    if (!deletingContact) return

    // ... (sin cambios, necesitaría una acción en el store para persistir)

    toast({
      title: "Contacto eliminado",
      description: "El contacto ha sido eliminado de la lista",
    })

    setDeletingContact(null)
  }

  // Manejo de edición de nombre de lista usando el store
  const handleEditList = (listId: string, listName: string) => {
    setEditingList({ listId, listName })
    setEditListForm({ name: listName })
  }

  const handleSaveListEdit = () => {
    if (!editingList || !editListForm.name.trim()) {
      toast({
        title: "Error",
        description: "El nombre de la lista no puede estar vacío.",
        variant: "destructive",
      })
      return
    }

    updateListName(editingList.listId, editListForm.name.trim())

    toast({
      title: "Lista actualizada",
      description: "El nombre de la lista se ha guardado correctamente.",
    })

    setEditingList(null)
    setEditListForm({ name: "" })
  }

  const totalContacts = contactLists.reduce((total, list) => total + list.contactCount, 0)
  const totalLists = contactLists.length

  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5
  const totalPages = Math.ceil(contactLists.length / itemsPerPage)

  const currentLists = contactLists.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  return (
    <div className="flex-1 space-y-6 p-6 pt-4 bg-[#121212] min-h-screen">
      <header className="flex items-center justify-between p-4 border-b border-border">
        <h1 className="text-xl font-semibold">Detalles de listas</h1>
        <UserInfoBar email="usuario@empresa.com" />
      </header>

      {/* Header and Create List Button */}
      <div className="flex justify-between items-center p-4 rounded-lg">
        <div className="flex flex-col items-start gap-2">
          <Link href="/contacts" className="text-gray-400 hover:text-white flex items-center">
            <ArrowLeft className="w-5 h-5 mr-1" />
            Volver
          </Link>
          <h1 className="text-2xl font-bold text-white mt-2">Listas</h1>
          <p className="text-gray-400 max-w-2xl text-sm">Organiza a tus contactos en listas para enviar campañas personalizadas. Estas listas te aparecerán automáticamente al momento de configurar tus campañas.</p>
        </div>
        <Link href="/contacts/import-csv-step-1">
          <button className="justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 h-10 bg-[#5e17eb] hover:bg-[#7c3aed] text-white rounded-md px-4 py-2 flex items-center space-x-2">
            <Users className="w-4 h-4" />
            <span>Crear Lista</span>
          </button>
        </Link>
      </div>

      {/* Search and Stats Section */}
      <div className="flex justify-between items-center mb-6">
        <div className="relative w-full max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Buscar..."
            className="w-full bg-[#1a1a1c] border-[#374151] text-white pl-9"
          />
        </div>
        <div className="flex items-center space-x-6">
          <div className="text-right">
            <div className="text-2xl font-bold text-[#5e17eb]">{totalLists}</div>
            <div className="text-sm text-gray-400">Total Listas</div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-[#82ecff]">{totalContacts}</div>
            <div className="text-sm text-gray-400">Total Contactos</div>
          </div>
        </div>
      </div>

      {/* Table Section */}
      <div className="rounded-xl border border-[#1a1a1c] bg-[#000000] p-5">
        <div className="relative w-full overflow-auto">
          <Table className="w-full caption-bottom text-sm">
            <TableHeader className="[&_tr]:border-b bg-[#000000]">
              <TableRow className="transition-colors data-[state=selected]:bg-muted border-b border-[#1a1a1c] hover:bg-[#1a1a1c]/50">
                <TableHead className="h-12 px-4 text-left align-middle font-medium [&:has([role=checkbox])]:pr-0 text-gray-400 w-1/4">Lista</TableHead>
                <TableHead className="h-12 px-4 text-left align-middle font-medium [&:has([role=checkbox])]:pr-0 text-gray-400 w-1/4">Contactos</TableHead>
                <TableHead className="h-12 px-4 text-left align-middle font-medium [&:has([role=checkbox])]:pr-0 text-gray-400 w-1/4">Fecha de modificación</TableHead>
                <TableHead className="h-12 px-4 text-left align-middle font-medium [&:has([role=checkbox])]:pr-0 text-gray-400 w-1/4">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="[&_tr:last-child]:border-0">
              {currentLists.map((list) => (
                <TableRow key={list.id} className="data-[state=selected]:bg-muted border-b border-[#1a1a1c] hover:bg-[#1a1a1c]/50 transition-colors duration-200 cursor-pointer">
                  <TableCell className="p-4 align-middle font-normal text-[#00ccff] w-1/4">
                    <Link href={`/contacts/list/${list.id}`} className="hover:underline">
                      {list.name}
                    </Link>
                  </TableCell>
                  <TableCell className="p-4 align-middle font-normal text-gray-300 w-1/4">{list.contactCount}</TableCell>
                  <TableCell className="p-4 align-middle font-normal text-gray-300 w-1/4">{list.lastModified}</TableCell>
                  <TableCell className="p-4 align-middle font-normal w-1/4">
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-[#4b5563] text-gray-400 hover:text-white hover:bg-[#1a1a1c] h-8"
                        onClick={(e) => {
                          e.stopPropagation()
                          handleEditList(list.id, list.name)
                        }}
                      >
                        <Edit className="h-4 w-4 mr-2" />
                        Editar nombre
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-[#4b5563] text-gray-400 hover:text-white hover:bg-[#1a1a1c] h-8 w-8 p-0"
                        onClick={(e) => {
                          e.stopPropagation()
                          // Implement delete list functionality
                        }}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between mt-4 text-gray-400 text-sm">
        <div>Mostrando {(currentPage - 1) * itemsPerPage + 1} a {Math.min(currentPage * itemsPerPage, contactLists.length)} de {contactLists.length} campañas</div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            className="border-[#1a1a1c] text-gray-400 hover:text-white hover:bg-[#1a1a1c] h-8 w-8 p-0"
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button size="sm" className="bg-[#5E17EB] hover:bg-[#5E17EB]/90 text-white h-8 w-8 p-0">
            {currentPage}
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="border-[#1a1a1c] text-gray-400 hover:text-white hover:bg-[#1a1a1c] h-8 w-8 p-0"
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Edit List Dialog */}
      <Dialog open={!!editingList} onOpenChange={() => setEditingList(null)}>
        <DialogContent className="bg-[#121212] text-white border-[#1a1a1c]">
          <DialogHeader>
            <DialogTitle className="text-white">Editar Nombre de la Lista</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="listName" className="text-right text-gray-400">
                Nombre
              </Label>
              <Input
                id="listName"
                value={editListForm.name}
                onChange={(e) => setEditListForm({ name: e.target.value })}
                className="col-span-3 bg-[#1a1a1c] border-[#374151] text-white"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              className="border-[#374151] text-gray-400 hover:text-white hover:bg-[#1a1a1c]"
              onClick={() => setEditingList(null)}
            >
              Cancelar
            </Button>
            <Button className="bg-[#5e17eb] hover:bg-[#7c3aed] text-white" onClick={handleSaveListEdit}>
              Guardar cambios
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Contact Dialog */}
      <Dialog open={!!editingContact} onOpenChange={() => setEditingContact(null)}>
        <DialogContent className="bg-[#121212] text-white border-[#1a1a1c]">
          <DialogHeader>
            <DialogTitle className="text-white">Editar Contacto</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right text-gray-400">
                Nombre
              </Label>
              <Input
                id="name"
                value={editForm.name}
                onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                className="col-span-3 bg-[#1a1a1c] border-[#374151] text-white"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="phone" className="text-right text-gray-400">
                Teléfono
              </Label>
              <div className="col-span-3 flex">
                <Select
                  value={editForm.countryCode}
                  onValueChange={(value) => setEditForm({ ...editForm, countryCode: value })}
                >
                  <SelectTrigger className="w-[100px] bg-[#1a1a1c] border-[#374151] text-white rounded-r-none focus:ring-0 focus:ring-offset-0">
                    <SelectValue placeholder="+591" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#1a1a1c] border-[#374151]">
                    <SelectItem value="+591">+591</SelectItem>
                    <SelectItem value="+1">+1</SelectItem>
                    <SelectItem value="+52">+52</SelectItem>
                    <SelectItem value="+54">+54</SelectItem>
                  </SelectContent>
                </Select>
                <Input
                  id="phone"
                  value={editForm.phone}
                  onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                  className="flex-1 bg-[#1a1a1c] border-[#374151] text-white rounded-l-none focus:ring-0 focus:ring-offset-0"
                />
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="apellidos" className="text-right text-gray-400">
                Apellidos
              </Label>
              <Input
                id="apellidos"
                value={editForm.apellidos}
                onChange={(e) => setEditForm({ ...editForm, apellidos: e.target.value })}
                className="col-span-3 bg-[#1a1a1c] border-[#374151] text-white"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="empresa" className="text-right text-gray-400">
                Empresa
              </Label>
              <Input
                id="empresa"
                value={editForm.empresa}
                onChange={(e) => setEditForm({ ...editForm, empresa: e.target.value })}
                className="col-span-3 bg-[#1a1a1c] border-[#374151] text-white"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edad" className="text-right text-gray-400">
                Edad
              </Label>
              <Input
                id="edad"
                value={editForm.edad}
                onChange={(e) => setEditForm({ ...editForm, edad: e.target.value })}
                className="col-span-3 bg-[#1a1a1c] border-[#374151] text-white"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="estadoLaboral" className="text-right text-gray-400">
                Estado Laboral
              </Label>
              <Input
                id="estadoLaboral"
                value={editForm.estadoLaboral}
                onChange={(e) => setEditForm({ ...editForm, estadoLaboral: e.target.value })}
                className="col-span-3 bg-[#1a1a1c] border-[#374151] text-white"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              className="border-[#374151] text-gray-400 hover:text-white hover:bg-[#1a1a1c]"
              onClick={() => setEditingContact(null)}
            >
              Cancelar
            </Button>
            <Button className="bg-[#5e17eb] hover:bg-[#7c3aed] text-white" onClick={handleSaveEdit}>
              Guardar cambios
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Contact Alert Dialog */}
      <AlertDialog open={!!deletingContact} onOpenChange={() => setDeletingContact(null)}>
        <AlertDialogContent className="bg-[#121212] text-white border-[#1a1a1c]">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-white">
              ¿Estás seguro de que quieres eliminar este contacto?
            </AlertDialogTitle>
            <AlertDialogDescription className="text-gray-400">
              Esta acción no se puede deshacer. Esto eliminará permanentemente el contacto de tu lista.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="border-[#374151] text-gray-400 hover:text-white hover:bg-[#1a1a1c]">
              Cancelar
            </AlertDialogCancel>
            <AlertDialogAction className="bg-red-500 hover:bg-red-600 text-white" onClick={confirmDelete}>
              Eliminar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
