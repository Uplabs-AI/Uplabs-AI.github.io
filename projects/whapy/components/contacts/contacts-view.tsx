"use client"

import { useState } from "react"
import { Search, Filter, Mail, Phone, Instagram, Link2, Download, ChevronDown, Edit, Trash2, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { contactsData } from "./contacts-data"

export default function ContactsView() {
  const [activeTab, setActiveTab] = useState("todos")

  return (
    <div className="flex-1 space-y-4 p-6 pt-4">
      <div className="flex flex-col space-y-2">
        <h1 className="text-2xl font-bold tracking-tight">Contactos</h1>
        <p className="text-muted-foreground">Gestione sus contactos para campañas NPS</p>
      </div>

      <div className="flex flex-col space-y-6">
        <Tabs defaultValue="todos" className="w-full" onValueChange={setActiveTab}>
          <div className="flex justify-between items-center">
            <TabsList className="bg-background border-b border-border rounded-none w-auto h-auto p-0">
              <TabsTrigger
                value="todos"
                className={`rounded-none px-4 py-2 h-auto data-[state=active]:bg-transparent data-[state=active]:shadow-none ${activeTab === "todos" ? "border-b-2 border-primary" : ""}`}
              >
                Todos
              </TabsTrigger>
              <TabsTrigger
                value="listas"
                className={`rounded-none px-4 py-2 h-auto data-[state=active]:bg-transparent data-[state=active]:shadow-none ${activeTab === "listas" ? "border-b-2 border-primary" : ""}`}
              >
                Listas
              </TabsTrigger>
            </TabsList>

            <div className="flex gap-2">
              <Button variant="outline" className="gap-2">
                <Plus className="h-4 w-4" />
                Crear nuevo contacto
              </Button>
              <Button className="bg-[#5E17EB] hover:bg-[#5E17EB]/90 gap-2">
                <Plus className="h-4 w-4" />
                Importar CSV
              </Button>
            </div>
          </div>

          <TabsContent value="todos" className="p-0 mt-4">
            <div className="flex flex-col space-y-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" className="h-9 gap-2">
                    <Filter className="h-4 w-4" />
                    Filtrar
                  </Button>
                  <Button variant="outline" size="icon" className="h-9 w-9">
                    <Mail className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon" className="h-9 w-9">
                    <Phone className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon" className="h-9 w-9">
                    <Instagram className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon" className="h-9 w-9">
                    <Link2 className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon" className="h-9 w-9">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>

                <div className="flex items-center gap-2">
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="search"
                      placeholder="Buscar contactos..."
                      className="pl-8 w-[250px] bg-background border-border"
                    />
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" className="gap-2">
                        Columnas
                        <ChevronDown className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>Nombre/Email</DropdownMenuItem>
                      <DropdownMenuItem>Celular</DropdownMenuItem>
                      <DropdownMenuItem>Empresa</DropdownMenuItem>
                      <DropdownMenuItem>Rubro (Industria)</DropdownMenuItem>
                      <DropdownMenuItem>Edad</DropdownMenuItem>
                      <DropdownMenuItem>Estado Laboral</DropdownMenuItem>
                      <DropdownMenuItem>Lista</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" className="gap-2">
                        Más Filtros
                        <ChevronDown className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>Por Edad</DropdownMenuItem>
                      <DropdownMenuItem>Por Estado Laboral</DropdownMenuItem>
                      <DropdownMenuItem>Por Industria</DropdownMenuItem>
                      <DropdownMenuItem>Por Lista</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>

              <div className="text-sm text-muted-foreground">Total 2,547 registros | 1 de 128 Páginas</div>

              <div className="border border-border rounded-md">
                <Table>
                  <TableHeader className="bg-background">
                    <TableRow className="hover:bg-transparent border-border">
                      <TableHead className="w-[40px]">
                        <Checkbox />
                      </TableHead>
                      <TableHead className="text-xs font-medium text-muted-foreground">NOMBRE/EMAIL</TableHead>
                      <TableHead className="text-xs font-medium text-muted-foreground">CELULAR</TableHead>
                      <TableHead className="text-xs font-medium text-muted-foreground">EMPRESA</TableHead>
                      <TableHead className="text-xs font-medium text-muted-foreground">RUBRO (INDUSTRIA)</TableHead>
                      <TableHead className="text-xs font-medium text-muted-foreground">EDAD</TableHead>
                      <TableHead className="text-xs font-medium text-muted-foreground">ESTADO LABORAL</TableHead>
                      <TableHead className="text-xs font-medium text-muted-foreground">LISTA</TableHead>
                      <TableHead className="text-xs font-medium text-muted-foreground text-right">ACCIONES</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {contactsData.map((contact) => (
                      <TableRow key={contact.id} className="hover:bg-muted/30 border-border">
                        <TableCell className="py-4">
                          <Checkbox />
                        </TableCell>
                        <TableCell className="py-4">
                          <div className="flex items-center gap-3">
                            <div
                              className={`flex items-center justify-center w-8 h-8 rounded-full ${contact.color} text-white text-sm font-medium`}
                            >
                              {contact.initials}
                            </div>
                            <div className="flex flex-col">
                              <span className="font-medium">{contact.name}</span>
                              <span className="text-sm text-muted-foreground">{contact.email}</span>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="text-blue-400 py-4">{contact.phone}</TableCell>
                        <TableCell className="py-4">{contact.company}</TableCell>
                        <TableCell className="py-4">{contact.industry}</TableCell>
                        <TableCell className="py-4">{contact.age}</TableCell>
                        <TableCell className="py-4">{contact.employmentStatus}</TableCell>
                        <TableCell className="py-4">
                          <div className="flex flex-wrap gap-1">
                            {contact.lists.map((list, index) => (
                              <Badge key={index} className={`${list.color} hover:${list.color} text-white`}>
                                {list.name}
                              </Badge>
                            ))}
                          </div>
                        </TableCell>
                        <TableCell className="text-right py-4">
                          <div className="flex justify-end gap-2">
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              <div className="text-sm text-muted-foreground">Mostrando 1-20 de 2,547 contactos</div>

              <div className="flex justify-end">
                <div className="flex items-center gap-1">
                  <Button variant="outline" size="sm" className="h-8 px-3">
                    Anterior
                  </Button>
                  <Button variant="outline" size="sm" className="h-8 w-8 bg-primary text-primary-foreground">
                    1
                  </Button>
                  <Button variant="outline" size="sm" className="h-8 w-8">
                    2
                  </Button>
                  <Button variant="outline" size="sm" className="h-8 w-8">
                    3
                  </Button>
                  <Button variant="outline" size="sm" className="h-8 px-3">
                    Siguiente
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="listas" className="p-0 mt-4">
            <div className="flex items-center justify-center h-40 border rounded-md">
              <p className="text-muted-foreground">Contenido de listas aquí</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
