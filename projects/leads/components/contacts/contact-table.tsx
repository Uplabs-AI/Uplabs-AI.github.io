"use client"

import { useRouter } from "next/navigation"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Edit, Trash2 } from "lucide-react"

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

interface ContactTableProps {
  contacts: Contact[];
  activeTab: string;
  searchQuery: string;
  selectedContacts: number[];
  handleSelectContact: (id: number, checked: boolean) => void;
  handleEditContact: (contact: Contact) => void;
}

export function ContactTable({
  contacts,
  activeTab,
  searchQuery,
  selectedContacts,
  handleSelectContact,
  handleEditContact,
}: ContactTableProps) {
  const router = useRouter()

  return (
    <Table>
      <TableHeader>
        <TableRow className="border-b hover:bg-transparent border-[#1a1a1c]">
          <TableHead className="w-[50px] p-4 align-middle [&:has([role=checkbox])]:pr-0">
            <Checkbox />
          </TableHead>
          <TableHead className="p-4 align-middle [&:has([role=checkbox])]:pr-0 font-bold text-white">Contacto</TableHead>
          <TableHead className="p-4 align-middle [&:has([role=checkbox])]:pr-0 font-bold text-white">Celular</TableHead>
          <TableHead className="p-4 align-middle [&:has([role=checkbox])]:pr-0 font-bold text-white">Empresa</TableHead>
          <TableHead className="p-4 align-middle [&:has([role=checkbox])]:pr-0 font-bold text-white">Industria</TableHead>
          <TableHead className="p-4 align-middle [&:has([role=checkbox])]:pr-0 font-bold text-white">Edad</TableHead>
          <TableHead className="p-4 align-middle [&:has([role=checkbox])]:pr-0 font-bold text-white">Estado Laboral</TableHead>
          <TableHead className="p-4 align-middle [&:has([role=checkbox])]:pr-0 font-bold text-white">Lista</TableHead>
          <TableHead className="p-4 align-middle [&:has([role=checkbox])]:pr-0"></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {contacts
          .filter(
            (contact) =>
              (activeTab === "todos" || (activeTab === "listas" && contact.list)) &&
              (contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                contact.email.toLowerCase().includes(searchQuery.toLowerCase()))
          )
          .map((contact) => (
            <TableRow
              key={contact.id}
              className="border-b transition-colors data-[state=selected]:bg-muted hover:bg-[#1a1a1c]/50 border-[#1a1a1c] cursor-pointer"
              onClick={() => router.push(`/contacts/${contact.id}/activity`)}
            >
              <TableCell className="p-4 align-middle [&:has([role=checkbox])]:pr-0 py-4">
                <Checkbox
                  checked={selectedContacts.includes(contact.id)}
                  onCheckedChange={(checked) => handleSelectContact(contact.id, !!checked)}
                  onClick={(e) => e.stopPropagation()}
                />
              </TableCell>
              <TableCell className="p-4 align-middle [&:has([role=checkbox])]:pr-0 py-4">
                <div className="flex items-center gap-3">
                  <div
                    className={`flex items-center justify-center w-8 h-8 rounded-full ${contact.color} text-white text-sm font-medium`}
                  >
                    {contact.initials}
                  </div>
                  <div>
                    <div className="font-medium text-white">{contact.name}</div>
                    <div className="text-sm text-gray-400">{contact.email}</div>
                  </div>
                </div>
              </TableCell>
              <TableCell className="p-4 align-middle [&:has([role=checkbox])]:pr-0 text-blue-400 py-4">
                {contact.phone}
              </TableCell>
              <TableCell className="p-4 align-middle [&:has([role=checkbox])]:pr-0 py-4 text-white">
                {contact.company}
              </TableCell>
              <TableCell className="p-4 align-middle [&:has([role=checkbox])]:pr-0 py-4 text-white">
                {contact.industry}
              </TableCell>
              <TableCell className="p-4 align-middle [&:has([role=checkbox])]:pr-0 py-4 text-white">
                {contact.age}
              </TableCell>
              <TableCell className="p-4 align-middle [&:has([role=checkbox])]:pr-0 py-4 text-white">
                {contact.employmentStatus}
              </TableCell>
              <TableCell className="p-4 align-middle [&:has([role=checkbox])]:pr-0 py-4">
                <Badge className={`${contact.list.color} hover:${contact.list.color} text-white`}>
                  {contact.list.name}
                </Badge>
              </TableCell>
              <TableCell className="p-4 align-middle [&:has([role=checkbox])]:pr-0 text-right py-4">
                <div className="flex justify-end gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-white hover:bg-muted"
                    onClick={(e) => {
                      e.stopPropagation()
                      handleEditContact(contact)
                    }}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-white hover:bg-muted"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
      </TableBody>
    </Table>
  )
} 