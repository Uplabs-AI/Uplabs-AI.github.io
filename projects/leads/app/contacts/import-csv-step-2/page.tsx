"use client"

import type React from "react"

import { useState, useCallback } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowLeft, Upload } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function ImportCSVStep2Page() {
  const router = useRouter()
  const [dragActive, setDragActive] = useState(false)
  const [file, setFile] = useState<File | null>(null)

  const steps = [
    { number: 1, label: "Inicio", active: false, completed: true },
    { number: 2, label: "Subir", active: true, completed: false },
    { number: 3, label: "Mapeo", active: false, completed: false },
    { number: 4, label: "Verificar", active: false, completed: false },
  ]

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const droppedFile = e.dataTransfer.files[0]
      if (droppedFile.type === "text/csv" || droppedFile.name.endsWith(".csv")) {
        setFile(droppedFile)
      } else {
        alert("Por favor, selecciona un archivo CSV válido")
      }
    }
  }, [])

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0]
      if (selectedFile.type === "text/csv" || selectedFile.name.endsWith(".csv")) {
        setFile(selectedFile)
      } else {
        alert("Por favor, selecciona un archivo CSV válido")
      }
    }
  }

  const handleNext = () => {
    if (file) {
      // Guardar archivo en localStorage o estado global
      localStorage.setItem(
        "csvImportStep2",
        JSON.stringify({
          fileName: file.name,
          fileSize: file.size,
        }),
      )

      // Navegar al siguiente paso
      router.push("/contacts/import-csv-step-3")
    }
  }

  const handleCancel = () => {
    // Verificar el origen antes de cancelar
    const step1Data = localStorage.getItem("csvImportStep1")
    let origin = "contacts"

    if (step1Data) {
      try {
        const data = JSON.parse(step1Data)
        origin = data.origin || "contacts"
      } catch (error) {
        console.error("Error parsing step1 data:", error)
      }
    }

    // Limpiar datos temporales
    localStorage.removeItem("csvImportStep1")
    localStorage.removeItem("csvImportStep2")
    localStorage.removeItem("importOrigin")

    // Redirigir según el origen
    if (origin === "campaigns-create") {
      router.push("/campaigns/create")
    } else {
      router.push("/contacts")
    }
  }

  return (
    <div className="flex-1 p-8 bg-[#121212]">
      {/* Header */}
      <div className="flex items-center mb-8">
        <Link href="/contacts/import-csv-step-1" className="text-gray-400 hover:text-white flex items-center gap-2">
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
                    step.active || step.completed ? "bg-[#5E17EB] text-white" : "bg-[#6B7280] text-white"
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
            <h2 className="text-xl font-medium text-white mb-2">Subir documento CSV</h2>
            <p className="text-gray-400 mb-8">Trae el archivo CSV desde tu computador</p>

            {/* File Upload Area */}
            <div
              className={`relative border-2 border-dashed rounded-lg p-12 text-center transition-colors ${
                dragActive
                  ? "border-[#5E17EB] bg-[#5E17EB]/10"
                  : file
                    ? "border-[#5E17EB] bg-[#5E17EB]/5"
                    : "border-[#374151] bg-[#0A0A0A]"
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <input
                type="file"
                accept=".csv"
                onChange={handleFileInput}
                className="absolute inset-0 w-full h-full opacity-20 cursor-pointer bg-gray-300/20"
              />

              <div className="flex flex-col items-center">
                <div className="mb-4">
                  <Upload className="h-12 w-12 text-white" />
                </div>

                {file ? (
                  <div className="text-center">
                    <p className="text-white text-lg mb-2">Archivo seleccionado:</p>
                    <p className="text-[#5E17EB] font-medium">{file.name}</p>
                    <p className="text-gray-400 text-sm mt-1">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                  </div>
                ) : (
                  <div className="text-center">
                    <p className="text-white text-lg mb-2">Haz clic para subir o jalar el archivo CSV</p>
                    <p className="text-gray-400 text-sm">Tamaño máximo 10mb</p>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex justify-end gap-4 mt-8">
          <Button
            onClick={handleCancel}
            variant="outline"
            className="border-[#374151] text-gray-400 hover:text-white hover:bg-[#0A0A0A] bg-transparent"
          >
            Cancelar
          </Button>
          <Button onClick={handleNext} className="bg-[#5E17EB] hover:bg-[#4c12c0] text-white" disabled={!file}>
            Siguiente
          </Button>
        </div>
      </div>
    </div>
  )
}
