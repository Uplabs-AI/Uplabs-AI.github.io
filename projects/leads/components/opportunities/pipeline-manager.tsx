import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog"
import { Plus, Pencil, Trash, PieChart, ArrowDown, ArrowUp } from "lucide-react"

interface PipelineManagerProps {
  pipelines: string[]
  onCreate?: () => void
}

// Componente StageItem reutilizable
function StageItem({ value, onChange, onRemove }: { value: string; onChange?: (v: string) => void; onRemove?: () => void }) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex flex-col">
        <ArrowUp className="h-4 w-4 text-gray-400 cursor-pointer" />
        <ArrowDown className="h-4 w-4 text-gray-400 cursor-pointer" />
      </div>
      <Input className="flex-grow" defaultValue={value} />
      <div className="flex items-center gap-1">
        <PieChart className="h-5 w-5 text-green-500" />
        <ArrowDown className="h-5 w-5 text-gray-400" />
        <Trash className="h-5 w-5 text-red-500 cursor-pointer" onClick={onRemove} />
      </div>
    </div>
  )
}

export const PipelineManager: React.FC<PipelineManagerProps> = ({ pipelines }) => {
  const [open, setOpen] = useState(false)
  const [pipelineName, setPipelineName] = useState("")
  const [stageName, setStageName] = useState("")
  const [error, setError] = useState(false)
  const [funnelVisible, setFunnelVisible] = useState(true)
  const [pieVisible, setPieVisible] = useState(true)
  const [editOpen, setEditOpen] = useState(false)
  const [editPipelineName, setEditPipelineName] = useState("AUTO X KM (MAIN)")
  const [editStages, setEditStages] = useState([
    "Nuevo Leads",
    "Primer Mensaje Enviado",
    "Seguimiento 1 (60min)",
    "1st Call Made",
    "Seguimiento 2 (24hrs)",
    "Seguimiento 3 (7dias)",
    "En conversacion con IA",
    "Interesados",
    "No Interesado",
    "No respondio",
  ])
  const [editFunnelVisible, setEditFunnelVisible] = useState(true)
  const [editPieVisible, setEditPieVisible] = useState(true)

  const handleOpen = () => setOpen(true)
  const handleClose = () => {
    setOpen(false)
    setPipelineName("")
    setStageName("")
    setError(false)
    setFunnelVisible(true)
    setPieVisible(true)
  }

  const handleSave = () => {
    if (!pipelineName.trim()) {
      setError(true)
      return
    }
    // Aquí iría la lógica para guardar el pipeline
    handleClose()
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header controls */}
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold">Pipelines</h3>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button size="sm" className="bg-[#5E17EB] hover:bg-[#5E17EB]/90 text-white" onClick={handleOpen}>
              <Plus className="h-4 w-4 mr-2" /> Create new pipeline
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[525px] bg-[#0A0A0A] border-[#1a1a1c] text-white">
            <DialogHeader>
              <DialogTitle>Add pipeline</DialogTitle>
            </DialogHeader>
            <div className="grid gap-6 py-4">
              <div className="grid gap-2">
                <Label htmlFor="pipeline-name">Pipeline Name</Label>
                <Input
                  id="pipeline-name"
                  placeholder="Name"
                  value={pipelineName}
                  onChange={e => { setPipelineName(e.target.value); setError(false) }}
                  className={error ? "border-red-500 focus:border-red-500" : ""}
                />
                {error && (
                  <p className="text-sm text-red-500">The name field is required</p>
                )}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="stage-name">Stage Name</Label>
                <div className="flex items-center gap-2">
                  <Input
                    id="stage-name"
                    placeholder="Stage Name"
                    value={stageName}
                    onChange={e => setStageName(e.target.value)}
                    className="flex-grow"
                  />
                  <div className="flex items-center gap-1">
                    <PieChart className="h-5 w-5 text-green-500" />
                    <ArrowDown className="h-5 w-5 text-gray-400" />
                    <Trash className="h-5 w-5 text-red-500" />
                  </div>
                </div>
              </div>
              <Button variant="ghost" className="justify-start p-0 text-[#5E17EB] hover:bg-transparent">+ Add stage</Button>
              <div className="flex items-center justify-between mt-4">
                <div className="flex items-center space-x-2">
                  <Switch id="funnel-chart-visible" checked={funnelVisible} onCheckedChange={setFunnelVisible} />
                  <Label htmlFor="funnel-chart-visible">Visible in Funnel chart</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="pie-chart-visible" checked={pieVisible} onCheckedChange={setPieVisible} />
                  <Label htmlFor="pie-chart-visible">Visible in Pie chart</Label>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={handleClose}>Cancel</Button>
              <Button variant="default" className="bg-[#5E17EB] hover:bg-[#5E17EB]/90 text-white" onClick={handleSave}>Save</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Modal de edición */}
      <Dialog open={editOpen} onOpenChange={setEditOpen}>
        <DialogContent className="sm:max-w-[525px] bg-[#0A0A0A] border-[#1a1a1c] text-white">
          <DialogHeader>
            <DialogTitle>Edit pipeline</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="pipeline-name">Pipeline Name</Label>
              <Input id="pipeline-name" defaultValue={editPipelineName} />
            </div>
            <Label>Stage Name</Label>
            <div className="space-y-2">
              {editStages.map((stage, idx) => (
                <StageItem key={idx} value={stage} />
              ))}
            </div>
            <Button variant="ghost" className="justify-start p-0 h-auto text-[#5E17EB] hover:bg-transparent">+ Add stage</Button>
            <div className="flex items-center justify-between mt-4">
              <div className="flex items-center space-x-2">
                <Switch id="funnel-chart-visible" checked={editFunnelVisible} onCheckedChange={setEditFunnelVisible} />
                <Label htmlFor="funnel-chart-visible">Visible in Funnel chart</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="pie-chart-visible" checked={editPieVisible} onCheckedChange={setEditPieVisible} />
                <Label htmlFor="pie-chart-visible">Visible in Pie chart</Label>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditOpen(false)}>Cancel</Button>
            <Button variant="default" className="bg-[#5E17EB] hover:bg-[#5E17EB]/90 text-white">Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Table */}
      <div className="border border-[#1a1a1c] rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-[#1a1a1c] text-sm">
          <thead className="bg-[#0A0A0A] text-gray-400">
            <tr>
              <th className="px-4 py-2 text-left font-medium">Name</th>
              <th className="w-12"></th>
              <th className="w-12"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#1a1a1c]">
            {pipelines.map((name) => (
              <tr key={name} className="hover:bg-[#1a1a1c]/50">
                <td className="px-4 py-3 text-white">{name}</td>
                <td className="px-4 py-3 text-center">
                  <Pencil className="h-4 w-4 text-gray-400 hover:text-white cursor-pointer" onClick={() => setEditOpen(true)} />
                </td>
                <td className="px-4 py-3 text-center">
                  <Trash className="h-4 w-4 text-gray-400 hover:text-red-500 cursor-pointer" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
} 