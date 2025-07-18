"use client"

import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";

interface Contact {
  name: string;
  phone: string;
  apellidos?: string;
  empresa?: string;
  edad?: string;
  estadoLaboral?: string;
  email?: string;
  industry?: string;
  listTag?: string;
}

// Mock data for contacts within a list
const mockContacts: { [key: string]: Contact[] } = {
  "accidentes-personales": Array.from({ length: 20 }).map((_, i) => ({
    name: `Contacto AP ${i + 1}`,
    phone: `600${10000 + i}`,
    apellidos: `Apellido AP ${i + 1}`,
    empresa: `Empresa AP ${i + 1}`,
    edad: `${20 + i}`,
    estadoLaboral: i % 2 === 0 ? "Empleado" : "Independiente",
    email: `contactoap${i + 1}@example.com`,
    industry: "Accidentes Personales",
    listTag: "Campaña NPS",
  })),
  talleres: Array.from({ length: 20 }).map((_, i) => ({
    name: `Contacto Talleres ${i + 1}`,
    phone: `601${10000 + i}`,
    apellidos: `Apellido Talleres ${i + 1}`,
    empresa: `Empresa Talleres ${i + 1}`,
    edad: `${22 + i}`,
    estadoLaboral: i % 2 === 0 ? "Independiente" : "Directivo",
    email: `contactotalleres${i + 1}@example.com`,
    industry: "Automotriz",
    listTag: "Proveedor salud",
  })),
  "salud-360": Array.from({ length: 20 }).map((_, i) => ({
    name: `Contacto Salud ${i + 1}`,
    phone: `602${10000 + i}`,
    apellidos: `Apellido Salud ${i + 1}`,
    empresa: `Empresa Salud ${i + 1}`,
    edad: `${28 + i}`,
    estadoLaboral: i % 2 === 0 ? "Jubilado" : "Empleado",
    email: `contactosalud${i + 1}@example.com`,
    industry: "Salud",
    listTag: "Salud total",
  })),
  vida: Array.from({ length: 20 }).map((_, i) => ({
    name: `Contacto Vida ${i + 1}`,
    phone: `603${10000 + i}`,
    apellidos: `Apellido Vida ${i + 1}`,
    empresa: `Empresa Vida ${i + 1}`,
    edad: `${30 + i}`,
    estadoLaboral: i % 2 === 0 ? "Empleado" : "Independiente",
    email: `contactovida${i + 1}@example.com`,
    industry: "Seguros",
    listTag: "Campaña NPS",
  })),
  "auto-xkm": Array.from({ length: 20 }).map((_, i) => ({
    name: `Contacto Auto ${i + 1}`,
    phone: `604${10000 + i}`,
    apellidos: `Apellido Auto ${i + 1}`,
    empresa: `Empresa Auto ${i + 1}`,
    edad: `${25 + i}`,
    estadoLaboral: i % 2 === 0 ? "Independiente" : "Empleado",
    email: `contactoauto${i + 1}@example.com`,
    industry: "Automotriz",
    listTag: "Auto xKm",
  })),
};

export default function ContactListPage() {
  const params = useParams();
  const listId = params.id as string;
  const listName = listId.replace(/-/g, " ").replace(/_/g, " ").split(" ").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");

  const contacts = mockContacts[listId] || [];

  return (
    <div className="flex-1 space-y-6 p-6 pt-4 bg-[#121212] min-h-screen">
      <div className="flex flex-col items-start gap-2 p-4 rounded-lg">
        <Link href="/contacts/list" className="text-gray-400 hover:text-white flex items-center">
          <ArrowLeft className="w-5 h-5 mr-1" />
          Volver a Listas
        </Link>
        <h1 className="text-2xl font-bold text-white mt-2">Contactos de {listName}</h1>
        <p className="text-gray-400 max-w-2xl text-sm">Aquí puedes ver y gestionar los contactos de esta lista.</p>
      </div>

      <div className="p-0">
        <div className="relative w-full overflow-auto">
          <table className="w-full caption-bottom text-sm">
            <thead className="[&_tr]:border-b bg-[#0A0A0A]">
              <tr className="border-b transition-colors data-[state=selected]:bg-muted hover:bg-transparent border-border">
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0 w-[40px]"><Checkbox /></th>
                <th className="h-12 px-4 text-left align-middle [&:has([role=checkbox])]:pr-0 text-xs font-medium text-muted-foreground">NOMBRE/EMAIL</th>
                <th className="h-12 px-4 text-left align-middle [&:has([role=checkbox])]:pr-0 text-xs font-medium text-muted-foreground">CELULAR</th>
                <th className="h-12 px-4 text-left align-middle [&:has([role=checkbox])]:pr-0 text-xs font-medium text-muted-foreground">EMPRESA</th>
                <th className="h-12 px-4 text-left align-middle [&:has([role=checkbox])]:pr-0 text-xs font-medium text-muted-foreground">RUBRO (INDUSTRIA)</th>
                <th className="h-12 px-4 text-left align-middle [&:has([role=checkbox])]:pr-0 text-xs font-medium text-muted-foreground">EDAD</th>
                <th className="h-12 px-4 text-left align-middle [&:has([role=checkbox])]:pr-0 text-xs font-medium text-muted-foreground">ESTADO LABORAL</th>
                <th className="h-12 px-4 align-middle [&:has([role=checkbox])]:pr-0 text-xs font-medium text-muted-foreground text-right">ACCIONES</th>
              </tr>
            </thead>
            <tbody className="[&_tr:last-child]:border-0">
              {contacts.map((contact, index) => (
                <tr key={index} className="border-b transition-colors data-[state=selected]:bg-muted hover:bg-muted/30 border-border cursor-pointer">
                  <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0 py-4"><Checkbox /></td>
                  <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0 py-4">
                    <div className="flex items-center gap-3">
                      <div className={`flex items-center justify-center w-8 h-8 rounded-full text-white text-sm font-medium ${index % 3 === 0 ? 'bg-blue-500' : index % 3 === 1 ? 'bg-purple-500' : 'bg-green-500'}`}>{contact.name.charAt(0).toUpperCase()}{contact.apellidos?.charAt(0).toUpperCase()}</div>
                      <div className="flex flex-col">
                        <span className="font-medium text-white">{contact.name} {contact.apellidos}</span>
                        <span className="text-sm text-muted-foreground">{contact.email}</span>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0 text-blue-400 py-4">{contact.phone}</td>
                  <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0 py-4 text-white">{contact.empresa}</td>
                  <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0 py-4 text-white">{contact.industry}</td>
                  <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0 py-4 text-white">{contact.edad}</td>
                  <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0 py-4 text-white">{contact.estadoLaboral}</td>
                  <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0 text-right py-4">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="icon" className="text-white hover:bg-muted">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-square-pen h-4 w-4"><path d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z"></path></svg>
                      </Button>
                      <Button variant="ghost" size="icon" className="text-white hover:bg-muted">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-trash2 h-4 w-4"><path d="M3 6h18"></path><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path><line x1="10" x2="10" y1="11" y2="17"></line><line x1="14" x2="14" y1="11" y2="17"></line></svg>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
} 