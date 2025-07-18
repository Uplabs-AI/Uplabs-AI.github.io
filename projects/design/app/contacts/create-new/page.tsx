"use client"

import { useState } from "react"
import Link from "next/link"
import { ChevronLeft, ArrowLeft, Plus, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function CreateContactPage() {
  const [selectedOption, setSelectedOption] = useState("create")

  // Estado para los campos personalizados
  const [customFields, setCustomFields] = useState<{ id: number; label: string; value: string }[]>([])

  // Función para agregar un nuevo campo personalizado
  const handleAddField = () => {
    setCustomFields([...customFields, { id: Date.now(), label: "", value: "" }])
  }

  // Función para eliminar un campo personalizado
  const handleRemoveField = (id: number) => {
    setCustomFields(customFields.filter((field) => field.id !== id))
  }

  // Función para actualizar el valor o etiqueta de un campo
  const handleFieldChange = (id: number, type: "label" | "value", text: string) => {
    setCustomFields(
      customFields.map((field) =>
        field.id === id ? { ...field, [type]: text } : field
      )
    )
  }

  return (
    <>
        {/* Header - Independent Container */}
        <header className="flex items-center justify-between p-4 border-b border-border">
          <h1 className="text-xl font-semibold">Crear Contacto</h1>
          <div className="flex items-center space-x-2">
            <Link href="/dashboard" passHref>
              <Button variant="outline" className="border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 transition-all duration-200 hover:scale-105">
                Dashboard
              </Button>
            </Link>
            <Link href="/auth/logout" passHref>
              <Button variant="outline" className="border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 transition-all duration-200 hover:scale-105">
                Sign Out
              </Button>
            </Link>
          </div>
        </header>

        {/* Contact Creation Section - Independent Container */}
        <div className="flex-1 p-6">
          <div className="space-y-4 pt-4">
            {/* Breadcrumb Navigation */}
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-4">
                <Link href="/contacts">
                  <Button className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hover:bg-accent h-9 rounded-md px-3 text-gray-400 hover:text-white" variant="ghost">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Volver
                  </Button>
                </Link>
                <h2 className="text-2xl font-bold">Crear Nuevo Contacto</h2>
              </div>
              <div className="flex gap-2">
                <Link href="/contacts">
                  <Button variant="outline" className="bg-background">
                    Cancelar
                  </Button>
                </Link>
                <Button className="bg-[#5E17EB] hover:bg-[#5E17EB]/90">Guardar contacto</Button>
              </div>
            </div>

            <div className="border border-border rounded-lg bg-black p-8">
              <h3 className="text-xl font-semibold mb-6">Crear Contacto</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="nombres">
                    Nombres
                  </Label>
                  <Input
                    id="nombres"
                    placeholder="Ej. Julio"
                    className="bg-[#1f1f22] border-[#374151] focus-visible:ring-[#5E17EB]"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="apellidos">
                    Apellidos
                  </Label>
                  <Input
                    id="apellidos"
                    placeholder="Ej. Perez"
                    className="bg-[#1f1f22] border-[#374151] focus-visible:ring-[#5E17EB]"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="celular" className="flex items-center">
                    Celular <span className="text-red-500 ml-1">*</span>
                  </Label>
                  <div className="flex gap-2">
                    <Select defaultValue="+591">
                      <SelectTrigger className="w-24 bg-[#1f1f22] border-[#374151] focus:ring-[#5E17EB]">
                        <SelectValue placeholder="+591" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="+591">+591</SelectItem>
                        <SelectItem value="+1">+1</SelectItem>
                        <SelectItem value="+34">+34</SelectItem>
                        <SelectItem value="+52">+52</SelectItem>
                      </SelectContent>
                    </Select>
                    <Input
                      id="celular"
                      placeholder="123 45678"
                      className="flex-1 bg-[#1f1f22] border-[#374151] focus-visible:ring-[#5E17EB]"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="empresa">
                    Empresa
                  </Label>
                  <Input
                    id="empresa"
                    placeholder="ej. Sofia"
                    className="bg-[#1f1f22] border-[#374151] focus-visible:ring-[#5E17EB]"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="edad">
                    Edad
                  </Label>
                  <Input
                    id="edad"
                    placeholder="ej. 40"
                    className="bg-[#1f1f22] border-[#374151] focus-visible:ring-[#5E17EB]"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="estado-laboral">
                    Estado Laboral
                  </Label>
                  <Input
                    id="estado-laboral"
                    placeholder="ej. dependiente"
                    className="bg-[#1f1f22] border-[#374151] focus-visible:ring-[#5E17EB]"
                  />
                </div>
              </div>

              {/* Sección de Campos Personalizados */}
              <div className="mt-6 pt-6 border-t border-[#374151]">
                {customFields.map((field) => (
                  <div key={field.id} className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4 items-end">
                    <div className="space-y-2">
                      <Label htmlFor={`custom-label-${field.id}`}>Nombre del Campo</Label>
                      <Input
                        id={`custom-label-${field.id}`}
                        placeholder="Ej. Hobby"
                        value={field.label}
                        onChange={(e) => handleFieldChange(field.id, "label", e.target.value)}
                        className="bg-[#1f1f22] border-[#374151] focus-visible:ring-[#5E17EB]"
                      />
                    </div>
                    <div className="flex items-end gap-2">
                      <div className="space-y-2 flex-grow">
                        <Label htmlFor={`custom-value-${field.id}`}>Valor</Label>
                        <Input
                          id={`custom-value-${field.id}`}
                          placeholder="Ej. Leer"
                          value={field.value}
                          onChange={(e) => handleFieldChange(field.id, "value", e.target.value)}
                          className="bg-[#1f1f22] border-[#374151] focus-visible:ring-[#5E17EB]"
                        />
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleRemoveField(field.id)}
                        className="p-2 text-gray-400 hover:text-white hover:bg-accent"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
                
                <Button
                  onClick={handleAddField}
                  className="w-full bg-[#5E17EB] hover:bg-[#5E17EB]/90 text-white flex items-center gap-2"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Agregar Campo Personalizado
                </Button>
              </div>

              <div className="mt-8">
                <h4 className="text-lg font-medium mb-4 flex items-center">
                  Asignar Lista <span className="text-red-500 ml-1">*</span>
                </h4>

                <RadioGroup
                  value={selectedOption}
                  onValueChange={setSelectedOption}
                  className="flex flex-col md:flex-row gap-6"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem
                      value="create"
                      id="create-list"
                      className="border-[#5E17EB] text-[#5E17EB] data-[state=checked]:bg-[#5E17EB]"
                    />
                    <Label htmlFor="create-list">
                      Crear nueva lista
                    </Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <RadioGroupItem
                      value="add"
                      id="add-list"
                      className="border-[#5E17EB] text-[#5E17EB] data-[state=checked]:bg-[#5E17EB]"
                    />
                    <Label htmlFor="add-list">
                      Añadir a lista existente
                    </Label>
                  </div>
                </RadioGroup>

                <div className="mt-4">
                  {selectedOption === "create" ? (
                    <Input
                      placeholder="Ej. Seguro de vida"
                      className="max-w-md bg-[#1f1f22] border-[#374151] focus-visible:ring-[#5E17EB]"
                    />
                  ) : (
                    <Select>
                      <SelectTrigger className="max-w-md bg-[#1f1f22] border-[#374151] focus:ring-[#5E17EB]">
                        <SelectValue placeholder="Selecciona una lista" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="nps">Campaña NPS</SelectItem>
                        <SelectItem value="salud">Proveedor salud</SelectItem>
                        <SelectItem value="siniestros">Siniestros</SelectItem>
                        <SelectItem value="auto">Auto xKm</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-2 mt-6">
              <Link href="/contacts">
                <Button variant="outline" className="bg-background">
                  Cancelar
                </Button>
              </Link>
              <Button className="bg-[#5E17EB] hover:bg-[#5E17EB]/90">Guardar</Button>
            </div>
          </div>
        </div>
    </>
  )
}
