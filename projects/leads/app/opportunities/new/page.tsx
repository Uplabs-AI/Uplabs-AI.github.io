"use client"

import { useState } from "react"
import Link from "next/link"
import { Sidebar } from "@/components/layout/sidebar"
import UserInfoBar from "@/components/layout/user-info-bar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Plus, Trash2 } from "lucide-react"

export default function CreateOpportunityPage() {
  const [customFields, setCustomFields] = useState<{ id: number; label: string; value: string }[]>([])

  const handleAddField = () => {
    setCustomFields([...customFields, { id: Date.now(), label: "", value: "" }])
  }

  const handleRemoveField = (id: number) => {
    setCustomFields(customFields.filter((f) => f.id !== id))
  }

  const handleFieldChange = (id: number, type: "label" | "value", text: string) => {
    setCustomFields(customFields.map((f) => (f.id === id ? { ...f, [type]: text } : f)))
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
          <h1 className="text-xl font-semibold">Crear Oportunidad</h1>
          <UserInfoBar email="usuario@empresa.com" />
        </header>

        {/* Body */}
        <div className="flex-1 p-6 overflow-y-auto">
          <div className="space-y-4 pt-4">
            {/* Title + Actions */}
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-4">
                <Link href="/opportunities" passHref>
                  <Button variant="ghost" className="hover:bg-accent text-gray-400 hover:text-white h-9 px-3">
                    <ArrowLeft className="h-4 w-4 mr-2" /> Volver
                  </Button>
                </Link>
                <h2 className="text-2xl font-bold">Add new opportunity</h2>
              </div>
              <div className="flex gap-2">
                <Link href="/opportunities" passHref>
                  <Button variant="outline" className="bg-background">Cancelar</Button>
                </Link>
                <Button className="bg-[#5E17EB] hover:bg-[#5E17EB]/90">Guardar</Button>
              </div>
            </div>

            <div className="border border-border rounded-lg bg-black p-8">
              <h3 className="text-xl font-semibold mb-6">Create new opportunity by filling in details and selecting a contact</h3>

              {/* Contact Details */}
              <div className="space-y-8">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Contact details</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Primary Contact Name<span className="text-red-500"> *</span></Label>
                      <Input placeholder="Select Contact" className="bg-[#1f1f22] border-[#374151] focus-visible:ring-[#5E17EB]" />
                    </div>
                    <div className="space-y-2">
                      <Label>Primary Email</Label>
                      <Input type="email" placeholder="Enter Email" className="bg-[#1f1f22] border-[#374151] focus-visible:ring-[#5E17EB]" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Primary Phone</Label>
                    <Input placeholder="Phone" className="bg-[#1f1f22] border-[#374151] focus-visible:ring-[#5E17EB]" />
                  </div>
                </div>

                {/* Opportunity Details */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Opportunity Details</h3>
                  <div className="space-y-2">
                    <Label>Opportunity Name<span className="text-red-500"> *</span></Label>
                    <Input placeholder="Enter opportunity name" className="bg-[#1f1f22] border-[#374151] focus-visible:ring-[#5E17EB]" />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                      { label: "Pipeline", placeholder: "AUTO X KM (MAIN)" },
                      { label: "Stage", placeholder: "Nuevo Leads" },
                      { label: "Status", placeholder: "Open" },
                      { label: "Opportunity Value", placeholder: "Bs. 0" },
                      { label: "Owner", placeholder: "Unassigned" },
                      { label: "Followers", placeholder: "Add Followers" },
                      { label: "Business Name", placeholder: "Enter Business Name" },
                      { label: "Opportunity Source", placeholder: "Enter Source" },
                    ].map((field, idx) => (
                      <div className="space-y-2" key={idx}>
                        <Label>{field.label}</Label>
                        <Input placeholder={field.placeholder} className="bg-[#1f1f22] border-[#374151] focus-visible:ring-[#5E17EB]" />
                      </div>
                    ))}
                  </div>

                  <div className="space-y-2">
                    <Label>Tags</Label>
                    <Input placeholder="Add tags" className="bg-[#1f1f22] border-[#374151] focus-visible:ring-[#5E17EB]" />
                  </div>
                </div>

                {/* Custom Fields */}
                <div className="mt-6 pt-6 border-t border-[#374151]">
                  {customFields.map((field) => (
                    <div key={field.id} className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4 items-end">
                      <div className="space-y-2">
                        <Label>Nombre del Campo</Label>
                        <Input
                          placeholder="Ej. Fecha de cierre"
                          value={field.label}
                          onChange={(e) => handleFieldChange(field.id, "label", e.target.value)}
                          className="bg-[#1f1f22] border-[#374151] focus-visible:ring-[#5E17EB]"
                        />
                      </div>
                      <div className="flex items-end gap-2">
                        <div className="space-y-2 flex-grow">
                          <Label>Valor</Label>
                          <Input
                            placeholder="Ej. 30/06/2024"
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

                  <Button onClick={handleAddField} className="w-full bg-[#5E17EB] hover:bg-[#5E17EB]/90 flex items-center gap-2 mt-2">
                    <Plus className="h-4 w-4 mr-2" />
                    Agregar Campo Personalizado
                  </Button>
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="flex justify-end gap-2 mt-6">
              <Link href="/opportunities" passHref>
                <Button variant="outline" className="bg-background">Cancelar</Button>
              </Link>
              <Button className="bg-[#5E17EB] hover:bg-[#5E17EB]/90">Guardar</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 