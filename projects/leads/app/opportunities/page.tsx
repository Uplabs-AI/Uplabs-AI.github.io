"use client"

import { Sidebar } from "@/components/layout/sidebar"
import UserInfoBar from "@/components/layout/user-info-bar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  Pencil,
  Eye,
  Paperclip,
  Calendar,
  MessageCircle,
  Plus,
  Filter,
  SortAsc,
  Users,
  Search,
  Download,
  LayoutGrid,
  List,
  Settings,
  Phone,
  Tag,
  FileText,
  CheckSquare,
  CalendarPlus,
  User,
} from "lucide-react"
import Link from "next/link"
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog"
import { useState } from "react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
  closestCorners,
  DragOverEvent,
  useDroppable,
} from "@dnd-kit/core"
import {
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
  arrayMove,
} from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { PipelineRibbon } from "@/components/opportunities/pipeline-ribbon"
import { PipelineManager } from "@/components/opportunities/pipeline-manager"

interface Opportunity {
  id: string
  contactId: number
  name: string
  value: number
  source: string
  initials: string
  columnId: string
}

interface ColumnData {
  id: string
  title: string
  count: number
  total: number
  items: Opportunity[]
}

// Colores para cada estado comercial usando la paleta personalizada
const stateColors = {
  "nuevos-lead": {
    header: "bg-[#897FD2]",
    badge: "bg-[#897FD2]/20 text-[#897FD2] border-[#897FD2]/30",
    glow: "shadow-[#897FD2]/10"
  },
  "primer-mensaje-enviado": {
    header: "bg-[#AA89FA]",
    badge: "bg-[#AA89FA]/20 text-[#AA89FA] border-[#AA89FA]/30",
    glow: "shadow-[#AA89FA]/10"
  },
  "seguimiento-1-60min": {
    header: "bg-[#FF89ED]",
    badge: "bg-[#FF89ED]/20 text-[#FF89ED] border-[#FF89ED]/30",
    glow: "shadow-[#FF89ED]/10"
  },
  "seguimiento-2-24hrs": {
    header: "bg-[#89FAB7]",
    badge: "bg-[#89FAB7]/20 text-[#89FAB7] border-[#89FAB7]/30",
    glow: "shadow-[#89FAB7]/10"
  },
  "seguimiento-3-7dias": {
    header: "bg-[#A370FF]",
    badge: "bg-[#A370FF]/20 text-[#A370FF] border-[#A370FF]/30",
    glow: "shadow-[#A370FF]/10"
  },
  "en-conversion": {
    header: "bg-[#6AB7FF]",
    badge: "bg-[#6AB7FF]/20 text-[#6AB7FF] border-[#6AB7FF]/30",
    glow: "shadow-[#6AB7FF]/10"
  },
  "no-respondio": {
    header: "bg-[#9CA3AF]",
    badge: "bg-[#9CA3AF]/20 text-[#9CA3AF] border-[#9CA3AF]/30",
    glow: "shadow-[#9CA3AF]/10"
  },
  "no-interesados": {
    header: "bg-[#9CA3AF]",
    badge: "bg-[#9CA3AF]/20 text-[#9CA3AF] border-[#9CA3AF]/30",
    glow: "shadow-[#9CA3AF]/10"
  },
  "interesados": {
    header: "bg-[#7E22CE]",
    badge: "bg-[#7E22CE]/20 text-[#7E22CE] border-[#7E22CE]/30",
    glow: "shadow-[#7E22CE]/10"
  },
  "ganada": {
    header: "bg-[#A370FF]",
    badge: "bg-[#A370FF]/20 text-[#A370FF] border-[#A370FF]/30",
    glow: "shadow-[#A370FF]/10"
  },
  "perdida": {
    header: "bg-[#9CA3AF]",
    badge: "bg-[#9CA3AF]/20 text-[#9CA3AF] border-[#9CA3AF]/30",
    glow: "shadow-[#9CA3AF]/10"
  }
}

const mockColumns: ColumnData[] = [
  {
    id: "nuevos-lead",
    title: "Nuevos Lead",
    count: 14,
    total: 15000,
    items: [
      {
        id: "opp-1",
        contactId: 1,
        name: "Luis Samuel Flores Yujra",
        value: 0,
        source: "Formulario Meta",
        initials: "LF",
        columnId: "nuevos-lead",
      },
      {
        id: "opp-2",
        contactId: 2,
        name: "Cargill Inc",
        value: 5000,
        source: "Formulario Meta",
        initials: "CI",
        columnId: "nuevos-lead",
      },
    ],
  },
  {
    id: "primer-mensaje-enviado",
    title: "Primer Mensaje Enviado",
    count: 12,
    total: 18000,
    items: [
      {
        id: "opp-3",
        contactId: 3,
        name: "Unit Line Drive",
        value: 10000,
        source: "Formulario Meta",
        initials: "UL",
        columnId: "primer-mensaje-enviado",
      },
      {
        id: "opp-4",
        contactId: 4,
        name: "Rojo Reynolds Group",
        value: 8000,
        source: "Formulario Meta",
        initials: "RR",
        columnId: "primer-mensaje-enviado",
      },
    ],
  },
  {
    id: "seguimiento-1-60min",
    title: "Seguimiento 1 (60 min)",
    count: 10,
    total: 22000,
    items: [
      {
        id: "opp-5",
        contactId: 5,
        name: "Juliana Fernandez Gomez",
        value: 12000,
        source: "Formulario Meta",
        initials: "JF",
        columnId: "seguimiento-1-60min",
      },
      {
        id: "opp-6",
        contactId: 6,
        name: "Patricia Alonso Carvajal",
        value: 10000,
        source: "Formulario Meta",
        initials: "PA",
        columnId: "seguimiento-1-60min",
      },
    ],
  },
  {
    id: "seguimiento-2-24hrs",
    title: "Seguimiento 2 (24 hrs)",
    count: 8,
    total: 16000,
    items: [
      {
        id: "opp-7",
        contactId: 7,
        name: "Alberto Torres",
        value: 8000,
        source: "Formulario Meta",
        initials: "AT",
        columnId: "seguimiento-2-24hrs",
      },
      {
        id: "opp-8",
        contactId: 8,
        name: "Daniela Barrios",
        value: 8000,
        source: "Formulario Meta",
        initials: "DB",
        columnId: "seguimiento-2-24hrs",
      },
    ],
  },
  {
    id: "seguimiento-3-7dias",
    title: "Seguimiento 3 (7 días)",
    count: 6,
    total: 14000,
    items: [
      {
        id: "opp-9",
        contactId: 9,
        name: "Ruben Gomez",
        value: 7000,
        source: "Formulario Meta",
        initials: "RG",
        columnId: "seguimiento-3-7dias",
      },
      {
        id: "opp-10",
        contactId: 10,
        name: "Maria Europa",
        value: 7000,
        source: "Formulario Meta",
        initials: "ME",
        columnId: "seguimiento-3-7dias",
      },
    ],
  },
  {
    id: "en-conversion",
    title: "En Conversión",
    count: 8,
    total: 20000,
    items: [
      {
        id: "opp-11",
        contactId: 11,
        name: "Fernando Cuenca",
        value: 10000,
        source: "Formulario Meta",
        initials: "FC",
        columnId: "en-conversion",
      },
      {
        id: "opp-12",
        contactId: 12,
        name: "Alejandro Vera",
        value: 10000,
        source: "Formulario Meta",
        initials: "AV",
        columnId: "en-conversion",
      },
    ],
  },
  {
    id: "no-respondio",
    title: "No Respondió",
    count: 4,
    total: 6000,
    items: [
      {
        id: "opp-13",
        contactId: 13,
        name: "Gerardo Santos",
        value: 3000,
        source: "Formulario Meta",
        initials: "GS",
        columnId: "no-respondio",
      },
      {
        id: "opp-14",
        contactId: 14,
        name: "Pedro Garcia",
        value: 3000,
        source: "Formulario Meta",
        initials: "PG",
        columnId: "no-respondio",
      },
    ],
  },
  {
    id: "no-interesados",
    title: "No Interesados",
    count: 3,
    total: 4500,
    items: [
      {
        id: "opp-15",
        contactId: 15,
        name: "Jorge Perez",
        value: 2500,
        source: "Formulario Meta",
        initials: "JP",
        columnId: "no-interesados",
      },
      {
        id: "opp-16",
        contactId: 16,
        name: "Juan Amor",
        value: 2000,
        source: "Formulario Meta",
        initials: "JA",
        columnId: "no-interesados",
      },
    ],
  },
  {
    id: "interesados",
    title: "Interesados",
    count: 6,
    total: 24000,
    items: [
      {
        id: "opp-17",
        contactId: 17,
        name: "Carlos Camargo",
        value: 12000,
        source: "Formulario Meta",
        initials: "CC",
        columnId: "interesados",
      },
      {
        id: "opp-18",
        contactId: 18,
        name: "Maria Del Carmen",
        value: 12000,
        source: "Formulario Meta",
        initials: "MD",
        columnId: "interesados",
      },
    ],
  },
  {
    id: "ganada",
    title: "Ganada",
    count: 5,
    total: 25000,
    items: [
      {
        id: "opp-19",
        contactId: 19,
        name: "Ana Rodriguez",
        value: 15000,
        source: "Formulario Meta",
        initials: "AR",
        columnId: "ganada",
      },
      {
        id: "opp-20",
        contactId: 20,
        name: "Roberto Silva",
        value: 10000,
        source: "Formulario Meta",
        initials: "RS",
        columnId: "ganada",
      },
    ],
  },
  {
    id: "perdida",
    title: "Perdida",
    count: 2,
    total: 3000,
    items: [
      {
        id: "opp-21",
        contactId: 21,
        name: "Erica Ramos",
        value: 1500,
        source: "Formulario Meta",
        initials: "ER",
        columnId: "perdida",
      },
      {
        id: "opp-22",
        contactId: 22,
        name: "Juan Carlos",
        value: 1500,
        source: "Formulario Meta",
        initials: "JC",
        columnId: "perdida",
      },
    ],
  },
]

// Componente para card arrastrable
function DraggableOpportunityCard({ opportunity, onClick }: { opportunity: Opportunity; onClick: () => void }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: opportunity.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="rounded-lg border shadow-sm bg-[#000000] border-[#1a1a1c] p-4 text-white cursor-pointer hover:border-primary"
      onClick={onClick}
    >
      <div className="space-y-2">
        <Link href={`/contacts/${opportunity.contactId}/activity`}>
          <p className="font-medium text-sm truncate hover:underline" title={opportunity.name}>
            {opportunity.name}
          </p>
        </Link>
        <p className="text-xs">
          <span className="font-semibold text-gray-400">Opportunity Source:</span>{" "}
          <span className="text-gray-500">{opportunity.source}</span>
        </p>
        <p className="text-xs">
          <span className="font-semibold text-gray-400">Opportunity Value:</span>{" "}
          <span className="text-gray-500">
            Bs.{opportunity.value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </span>
        </p>
      </div>
      <div className="flex items-center justify-between mt-4 text-gray-400">
        <div className="flex gap-4 text-gray-400 [&_svg]:h-4 [&_svg]:w-4 [&_svg]:cursor-pointer hover:[&_svg]:text-primary relative">
          <Phone />
          <MessageCircle />
          <div className="relative">
            <Tag />
            <span className="absolute -top-2 -right-2 bg-blue-600 text-[10px] rounded-full h-4 w-4 flex items-center justify-center">
              1
            </span>
          </div>
          <FileText />
          <CheckSquare />
          <CalendarPlus />
        </div>
        <span className="relative flex shrink-0 overflow-hidden rounded-full h-6 w-6">
          <span className="flex h-full w-full items-center justify-center rounded-full text-[10px] bg-primary/10 text-primary">
            <User className="h-3 w-3" />
          </span>
        </span>
      </div>
    </div>
  )
}

function ColumnHeader({ title, opportunities }: { title: string; opportunities: number }) {
  return (
    <div className="flex items-center justify-between">
      <h3 className="font-semibold text-white text-sm truncate mr-2">
        {title}
      </h3>
      <Badge variant="secondary" className="bg-[#374151] text-white border-0">
        {opportunities}
      </Badge>
    </div>
  )
}

function DroppableColumn({ 
  col, 
  onSelect 
}: { 
  col: ColumnData; 
  onSelect: (o: Opportunity) => void 
}) {
  const { setNodeRef, isOver } = useDroppable({
    id: col.id,
  })

  const colors = stateColors[col.id as keyof typeof stateColors] || stateColors["perdida"]

  return (
    <div className="w-72 flex-shrink-0 space-y-3">
      {/* Card con encabezado y total */}
      <div className={`bg-[#0A0A0A] border border-[#1a1a1c] rounded-lg overflow-hidden shadow-lg ${colors.glow} hover:scale-[1.02] transition-all duration-200`}>
        {/* Header colorido */}
        <div className={`h-2 ${colors.header}`} />
        
        {/* Contenido */}
        <div className="p-4 space-y-1">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-white text-base truncate mr-2 flex items-center gap-2">
              <div className={`w-2 h-2 ${colors.header} rounded-full animate-pulse`} />
              {col.title}
            </h3>
            <div className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border ${colors.badge}`}>
              {col.count}
            </div>
          </div>
          <p className="text-xs text-gray-400">Opportunities: ${col.total.toLocaleString('en-US')}</p>
        </div>
      </div>

      {/* Zona de drop para las tarjetas */}
      <div
        ref={setNodeRef}
        className={`space-y-3 min-h-[200px] p-2 rounded-lg border-2 border-dashed transition-colors ${
          isOver 
            ? 'border-primary bg-primary/5' 
            : 'border-transparent'
        }`}
      >
        <SortableContext items={col.items.map(item => item.id)} strategy={verticalListSortingStrategy}>
          {col.items.length > 0 ? (
            col.items.map((opportunity) => (
              <DraggableOpportunityCard
                key={opportunity.id}
                opportunity={opportunity}
                onClick={() => onSelect(opportunity)}
              />
            ))
          ) : (
            <div className="flex items-center justify-center h-32 text-gray-500 text-sm">
              <div className="text-center">
                <p>Arrastra y suelta</p>
              </div>
            </div>
          )}
        </SortableContext>
      </div>
    </div>
  )
}

export default function OpportunitiesPage() {
  const [selected, setSelected] = useState<Opportunity | null>(null)
  const [open, setOpen] = useState(false)
  const [columns, setColumns] = useState<ColumnData[]>(mockColumns)
  const [activeOpportunity, setActiveOpportunity] = useState<Opportunity | null>(null)
  const [selectedPipeline, setSelectedPipeline] = useState<string>("AUTO X KM (MAIN)")
  const [view, setView] = useState<"kanban" | "list">("kanban")
  const [statusFilter, setStatusFilter] = useState<string>("Opportunities")

  const opportunityCount = columns.reduce((acc, col) => acc + col.items.length, 0)

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  )

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event
    const opportunity = columns
      .flatMap(col => col.items)
      .find(item => item.id === active.id)
    
    if (opportunity) {
      setActiveOpportunity(opportunity)
    }
  }

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event
    if (!over) return

    const activeId = active.id
    const overId = over.id

    // Encontrar la columna activa
    const activeColumn = columns.find(col => 
      col.items.some(item => item.id === activeId)
    )
    
    // Encontrar la columna destino
    let overColumn = columns.find(col => col.id === overId) // Si se suelta directamente sobre una columna
    if (!overColumn) {
      // Si se suelta sobre un elemento, encontrar su columna
      overColumn = columns.find(col => 
        col.items.some(item => item.id === overId)
      )
    }

    if (!activeColumn || !overColumn) return
    if (activeColumn.id === overColumn.id) return

    setColumns(prev => {
      const activeItems = [...activeColumn.items]
      const overItems = [...overColumn.items]

      // Encontrar el índice del elemento activo
      const activeIndex = activeItems.findIndex(item => item.id === activeId)
      const activeItem = activeItems[activeIndex]

      if (!activeItem) return prev

      // Actualizar el columnId del elemento
      const updatedActiveItem = { ...activeItem, columnId: overColumn.id }

      // Remover el elemento de la columna activa
      const newActiveItems = activeItems.filter(item => item.id !== activeId)

      // Agregar el elemento a la columna destino
      const newOverItems = [...overItems, updatedActiveItem]

      return prev.map(col => {
        if (col.id === activeColumn.id) {
          return { ...col, items: newActiveItems, count: newActiveItems.length }
        }
        if (col.id === overColumn.id) {
          return { ...col, items: newOverItems, count: newOverItems.length }
        }
        return col
      })
    })
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    setActiveOpportunity(null)

    if (!over) return

    const activeId = active.id
    const overId = over.id

    // Encontrar la columna que contiene el elemento activo
    const activeColumn = columns.find(col => 
      col.items.some(item => item.id === activeId)
    )

    if (!activeColumn) return

    // Si estamos reordenando dentro de la misma columna
    if (activeColumn.items.some(item => item.id === overId)) {
      const oldIndex = activeColumn.items.findIndex(item => item.id === activeId)
      const newIndex = activeColumn.items.findIndex(item => item.id === overId)

      if (oldIndex !== newIndex) {
        setColumns(prev => prev.map(col => {
          if (col.id === activeColumn.id) {
            return {
              ...col,
              items: arrayMove(col.items, oldIndex, newIndex)
            }
          }
          return col
        }))
      }
    }
  }

  // Función para obtener el contenedor de drop
  const getDroppableId = (id: string) => {
    // Si es una columna, devolver su id
    const column = columns.find(col => col.id === id)
    if (column) return id

    // Si es un elemento, devolver el id de su columna
    const itemColumn = columns.find(col => col.items.some(item => item.id === id))
    return itemColumn?.id || id
  }

  return (
    <div className="min-h-screen bg-[#121212] text-white flex">
      {/* Sidebar */}
      <div className="w-64 flex-shrink-0">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Header */}
        <header className="flex items-center justify-between p-4 border-b border-border">
          <h1 className="text-xl font-semibold">Oportunidades</h1>
          <UserInfoBar email="usuario@empresa.com" />
        </header>

        {/* Status Tabs */}
        <div className="flex space-x-8 mb-4 border-b border-[#374151] px-6">
          {["Opportunities", "Pipelines"].map((label) => (
            label === "Pipelines" ? (
              <Link key={label} href="/opportunities/pipelines">
                <button
                  className={
                    `pb-3 text-sm font-medium border-b-2 transition-all duration-200 ` +
                    (statusFilter === label
                      ? "text-white border-white"
                      : "text-gray-400 border-transparent hover:text-gray-300")
                  }
                >
                  {label}
                </button>
              </Link>
            ) : (
            <button
              key={label}
              className={
                `pb-3 text-sm font-medium border-b-2 transition-all duration-200 ` +
                (statusFilter === label
                  ? "text-white border-white"
                  : "text-gray-400 border-transparent hover:text-gray-300")
              }
              onClick={() => setStatusFilter(label)}
            >
              {label}
            </button>
            )
          ))}
        </div>

        {/* Pipeline Ribbon */}
        <PipelineRibbon
          pipelines={["AUTO X KM (MAIN)"]}
          selectedPipeline={selectedPipeline}
          onPipelineChange={setSelectedPipeline}
          opportunityCount={opportunityCount}
          view={view}
          onViewChange={setView}
        />

        {/* Filter Bar */}
        <div className="border-b border-[#1a1a1c] bg-transparent p-4 flex items-center justify-between text-xs">
          <div className="flex gap-3">
            <Button variant="secondary" className="h-8 gap-1 bg-[#1a1a1c] border-[#374151] text-white">
              <Filter className="h-3 w-3" />
              Advanced Filters <Badge className="ml-1 bg-primary/20 text-primary border-0">2</Badge>
            </Button>
            <Button variant="secondary" className="h-8 gap-1 bg-[#1a1a1c] border-[#374151] text-white">
              <SortAsc className="h-3 w-3" /> Sort By
            </Button>
            <Button variant="secondary" className="h-8 gap-1 bg-[#1a1a1c] border-[#374151] text-white">
              <Users className="h-3 w-3" /> Assigned To
            </Button>
          </div>
          <div className="flex gap-2">
            <Button size="icon" variant="ghost" className="text-gray-400 hover:text-white"><Search className="h-4 w-4" /></Button>
            <Button size="icon" variant="ghost" className="text-gray-400 hover:text-white"><Download className="h-4 w-4" /></Button>
            <Button size="icon" variant="ghost" className="text-gray-400 hover:text-white"><LayoutGrid className="h-4 w-4" /></Button>
            <Button size="icon" variant="ghost" className="text-primary"><List className="h-4 w-4" /></Button>
          </div>
        </div>

        {/* Kanban Board */}
        <main className="flex-1 overflow-x-auto p-6">
          <DndContext
            sensors={sensors}
            collisionDetection={closestCorners}
            onDragStart={handleDragStart}
            onDragOver={handleDragOver}
            onDragEnd={handleDragEnd}
          >
            <div className="flex items-start gap-4 w-max">
              {columns.map((col) => (
                <DroppableColumn 
                  key={col.id} 
                  col={col} 
                  onSelect={(o) => { setSelected(o); setOpen(true); }} 
                />
              ))}
            </div>
            
            <DragOverlay>
              {activeOpportunity ? (
                <div className="rounded-lg border shadow-sm bg-[#000000] border-[#1a1a1c] p-4 text-white cursor-pointer hover:border-primary opacity-80">
                  <div className="space-y-2">
                    <p className="font-medium text-sm truncate" title={activeOpportunity.name}>
                      {activeOpportunity.name}
                    </p>
                    <p className="text-xs">
                      <span className="font-semibold text-gray-400">Opportunity Source:</span>{" "}
                      <span className="text-gray-500">{activeOpportunity.source}</span>
                    </p>
                    <p className="text-xs">
                      <span className="font-semibold text-gray-400">Opportunity Value:</span>{" "}
                      <span className="text-gray-500">
                        Bs.{activeOpportunity.value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </span>
                    </p>
                  </div>
                  <div className="flex items-center justify-between mt-4 text-gray-400">
                    <div className="flex gap-4 text-gray-400 [&_svg]:h-4 [&_svg]:w-4 [&_svg]:cursor-pointer hover:[&_svg]:text-primary relative">
                      <Phone />
                      <MessageCircle />
                      <div className="relative">
                        <Tag />
                        <span className="absolute -top-2 -right-2 bg-blue-600 text-[10px] rounded-full h-4 w-4 flex items-center justify-center">
                          1
                        </span>
                      </div>
                      <FileText />
                      <CheckSquare />
                      <CalendarPlus />
                    </div>
                    <span className="relative flex shrink-0 overflow-hidden rounded-full h-6 w-6">
                      <span className="flex h-full w-full items-center justify-center rounded-full text-[10px] bg-primary/10 text-primary">
                        <User className="h-3 w-3" />
                      </span>
                    </span>
                  </div>
                </div>
              ) : null}
            </DragOverlay>
          </DndContext>
        </main>

        {/* Edit Opportunity Modal */}
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent className="bg-[#0A0A0A] border-gray-800 text-white max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-xl font-bold">Editar Oportunidad</DialogTitle>
            </DialogHeader>

            {selected && (
              <div className="flex flex-col lg:flex-row py-4 gap-6 max-h-[70vh]">
                {/* Side Menu */}
                <div className="w-full lg:w-1/4 bg-[#0F0F0F] p-4 border border-[#1a1a1c] rounded-md space-y-2 h-fit">
                  {[
                    "Opportunity Details",
                    "Book/Update Appointment",
                    "Tasks",
                    "Notes",
                    "Payments",
                  ].map((item, idx) => (
                    <button
                      key={idx}
                      className={`block w-full text-left px-3 py-2 rounded-md text-sm ${idx===0? 'bg-blue-600/20 text-blue-400 font-medium':'hover:bg-[#1A1A1C] text-gray-300'}`}
                    >
                      {item}
                    </button>
                  ))}
                </div>

                {/* Form Content */}
                <div className="flex-1 overflow-y-auto pr-2">
                  {/* Contact Details */}
                  <div className="mb-8 space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold">Contact details</h3>
                      <button className="text-[#5E17EB] text-sm flex items-center gap-1">
                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13l-3 3m0 0l-3-3m3 3V8m0 13a9 9 0 110-18 9 9 0 010 18z"/></svg>
                        Hide Empty Fields
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label className="text-[#D1D5DB]">Primary Contact Name <span className="text-red-500">*</span></Label>
                        <Input defaultValue={selected.name} className="bg-[#1A1A1C] border-[#4B5563] text-white focus:border-[#5E17EB]" />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-[#D1D5DB]">Primary Email</Label>
                        <Input placeholder="Enter Email" className="bg-[#1A1A1C] border-[#4B5563] text-white focus:border-[#5E17EB]" />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-[#D1D5DB]">Primary Phone</Label>
                        <Input placeholder="Phone" className="bg-[#1A1A1C] border-[#4B5563] text-white focus:border-[#5E17EB]" />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-[#D1D5DB]">Additional Contacts</Label>
                        <Input placeholder="Add additional contacts" className="bg-[#1A1A1C] border-[#4B5563] text-white focus:border-[#5E17EB]" />
                      </div>
                    </div>
                  </div>

                  {/* Opportunity Details */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Opportunity Details</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {[
                        { label: "Opportunity Name *", value: selected.name },
                        { label: "Stage", value: "Primer Mensaje Enviado" },
                        { label: "Pipeline", value: "AUTO X KM (MAIN)" },
                        { label: "Opportunity Value", value: `Bs.${selected.value.toLocaleString('en-US',{minimumFractionDigits:2})}` },
                        { label: "Status", value: "Open" },
                        { label: "Followers", value: "Add Followers" },
                        { label: "Owner", value: "Unassigned" },
                        { label: "Opportunity Source", value: selected.source },
                        { label: "Business Name", value: "" },
                      ].map((f, idx)=>(
                        <div key={idx} className="space-y-2">
                          <Label className="text-[#D1D5DB]">{f.label}</Label>
                          <Input defaultValue={f.value} placeholder={f.label} className="bg-[#1A1A1C] border-[#4B5563] text-white focus:border-[#5E17EB]" />
                        </div>
                      ))}
                    </div>

                    {/* Tags */}
                    <div className="space-y-2">
                      <Label className="text-[#D1D5DB]">Tags</Label>
                      <Input placeholder="Add tags" className="bg-[#1A1A1C] border-[#4B5563] text-white focus:border-[#5E17EB]" />
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex justify-end gap-3 pt-6">
                    <DialogClose asChild>
                      <Button variant="secondary" className="bg-[#374151] text-white">Cancelar</Button>
                    </DialogClose>
                    <Button className="bg-[#5E17EB] hover:bg-[#5E17EB]/90 text-white">Update</Button>
                  </div>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* Pipeline Manager */}
        {statusFilter === "Opportunities" ? (
          <>
            {/* existing pipeline ribbon, filter bar, board rendering remain */}
          </>
        ) : (
          <PipelineManager pipelines={["AUTO X KM (MAIN)", "Comercial Cochabamba", "Comercial La Paz", "Comercial Santa Cruz"]} />
        )}
      </div>
    </div>
  )
} 