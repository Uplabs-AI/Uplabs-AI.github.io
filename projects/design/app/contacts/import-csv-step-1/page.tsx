"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"

export default function ImportCSVStep1Page() {
  const router = useRouter()
  const [listOption, setListOption] = useState("create")
  const [newListName, setNewListName] = useState("")
  const [selectedList, setSelectedList] = useState("")

  const steps = [
    { number: 1, label: "Inicio", active: true },
    { number: 2, label: "Subir", active: false },
    { number: 3, label: "Mapeo", active: false },
    { number: 4, label: "Verificar", active: false },
  ]

  const existingLists = ["Campaña NPS", "Proveedor salud", "Siniestros", "Auto xKm", "Salud total"]

  const handleNext = () => {
    // Guardar datos en localStorage o estado global
    const formData = {
      listOption,
      newListName,
      selectedList,
      origin: localStorage.getItem("importOrigin") || "contacts", // Guardar el origen
    }
    localStorage.setItem("csvImportStep1", JSON.stringify(formData))

    // Navegar al siguiente paso
    router.push("/contacts/import-csv-step-2")
  }

  const isFormValid = () => {
    if (listOption === "create") {
      return newListName.trim().length > 0
    }
    return selectedList.length > 0
  }

  return (
    <div className="flex-1 p-8 bg-[#121212]">
      {/* Header */}
      <div className="flex items-center mb-8">
        <Link href="/contacts" className="text-gray-400 hover:text-white flex items-center gap-2">
          <ArrowLeft className="h-4 w-4" />
          <span>Volver</span>
        </Link>
        <h1 className="text-2xl font-medium text-white ml-4">Nueva Lista de Contactos</h1>
      </div>

      {/* Progress Steps */}
      <div className="flex items-center justify-center mb-12">
        <div className="flex items-center gap-8">
          {steps.map((step, index) => (
            <div key={step.number} className="flex items-center">
              <div className="flex flex-col items-center">
                <div
                  className={`w-16 h-16 rounded-full flex items-center justify-center text-xl font-medium ${
                    step.active ? "bg-[#5E17EB] text-white" : "bg-[#6B7280] text-white"
                  }`}
                >
                  {step.number}
                </div>
                <span className={`mt-2 text-sm ${step.active ? "text-white" : "text-gray-400"}`}>{step.label}</span>
              </div>
              {index < steps.length - 1 && <div className="w-16 h-px bg-[#374151] mx-4" />}
            </div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto">
        <Card className="bg-[#0A0A0A] border-[#374151]">
          <CardContent className="p-8">
            <h2 className="text-xl font-medium text-white mb-6">Asignar Lista</h2>

            <RadioGroup value={listOption} onValueChange={setListOption} className="space-y-6">
              {/* Crear nueva lista */}
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <RadioGroupItem
                    value="create"
                    id="create"
                    className="border-[#5E17EB] text-[#5E17EB] data-[state=checked]:bg-[#5E17EB] data-[state=checked]:border-[#5E17EB]"
                  />
                  <Label htmlFor="create" className="text-base font-medium text-white cursor-pointer">
                    Crear nueva lista <span className="text-red-400">*</span>
                  </Label>
                </div>

                {listOption === "create" && (
                  <div className="ml-7">
                    <Input
                      placeholder="Ej. Seguro de vida"
                      value={newListName}
                      onChange={(e) => setNewListName(e.target.value)}
                      className="max-w-md bg-[#0A0A0A] border-[#374151] focus-visible:ring-[#5E17EB] focus-visible:border-[#5E17EB] text-white placeholder:text-gray-400"
                    />
                  </div>
                )}
              </div>

              {/* Añadir a lista existente */}
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <RadioGroupItem
                    value="existing"
                    id="existing"
                    className="border-[#5E17EB] text-[#5E17EB] data-[state=checked]:bg-[#5E17EB] data-[state=checked]:border-[#5E17EB]"
                  />
                  <Label htmlFor="existing" className="text-base font-medium text-white cursor-pointer">
                    Añadir a lista existente <span className="text-red-400">*</span>
                  </Label>
                </div>

                {listOption === "existing" && (
                  <div className="ml-7">
                    <Select value={selectedList} onValueChange={setSelectedList}>
                      <SelectTrigger className="max-w-md bg-[#0A0A0A] border-[#374151] focus:ring-[#5E17EB] focus:border-[#5E17EB] text-white">
                        <SelectValue placeholder="Selecciona una lista" />
                      </SelectTrigger>
                      <SelectContent className="bg-[#0A0A0A] border-[#374151]">
                        {existingLists.map((list) => (
                          <SelectItem
                            key={list}
                            value={list}
                            className="text-white hover:bg-[#374151] focus:bg-[#374151]"
                          >
                            {list}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}
              </div>
            </RadioGroup>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex justify-end gap-4 mt-8">
          <Button
            variant="outline"
            className="border-[#374151] text-gray-400 hover:text-white hover:bg-[#0A0A0A] bg-transparent"
            onClick={() => router.push("/contacts")}
          >
            Cancelar
          </Button>
          <Button onClick={handleNext} className="bg-[#5E17EB] hover:bg-[#4c12c0] text-white" disabled={!isFormValid()}>
            Siguiente
          </Button>
        </div>
      </div>
    </div>
  )
}
