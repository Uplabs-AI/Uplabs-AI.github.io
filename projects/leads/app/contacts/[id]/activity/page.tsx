import {
  ArrowLeft,
  Star,
  UserPlus,
  CheckCircle,
  Merge,
  Mail,
  Phone,
  MoreVertical,
  Bell,
  HelpCircle,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Link from "next/link"
import { ContactDetailsPanel } from "@/components/contacts/contact-details-panel"
import { ActivityFeedAndComposer } from "@/components/contacts/activity-feed-and-composer"
import { ActivityDetailsPanel } from "@/components/contacts/activity-details-panel"
import { allContactsData } from "@/lib/data/contacts"
import { activitiesData } from "@/components/contacts/activities-data" // Create this file next

// Define a type for a single contact
type Contact = (typeof allContactsData)[0]
// Define a type for a single activity
type Activity = (typeof activitiesData)[0]

const getContactById = async (id: string): Promise<Contact | undefined> => {
  // Simulate API call
  return new Promise(resolve => {
    setTimeout(() => {
      const contact = allContactsData.find(c => c.id.toString() === id)
      resolve(contact)
    }, 300)
  })
}

const getActivitiesByContactId = async (contactId: string): Promise<Activity[]> => {
  return new Promise(resolve => {
    setTimeout(() => {
      const activities = activitiesData.filter((a: Activity) => a.contactId.toString() === contactId)
      resolve(activities)
    }, 300)
  })
}

export default async function ActivityPage({ params }: { params: { id: string } }) {
  const contact = await getContactById(params.id)
  const activities = await getActivitiesByContactId(params.id)

  if (!contact) {
    return (
      <div className="flex items-center justify-center h-screen bg-[#0A0A0A] text-white">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Contacto no encontrado</h1>
          <p className="text-gray-400">No pudimos encontrar un contacto con el ID: {params.id}</p>
          <Link href="/contacts" className="mt-4 inline-block text-[#5E17EB] hover:underline">
            Volver a la lista de contactos
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-screen bg-[#0A0A0A] text-white">
      <header className="flex items-center justify-between p-4 border-b border-border">
        <h1 className="text-xl font-semibold">Actividad del Contacto</h1>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3 bg-[#121212] border border-[#1d1d20] rounded-md px-4 py-2">
            <div className="w-7 h-7 bg-[#241543] rounded-full flex items-center justify-center">
              <span className="text-[#ad84ff] text-sm font-medium select-none">U</span>
            </div>
            <span className="text-white text-sm font-medium whitespace-nowrap">usuario@empresa.com</span>
          </div>
          <Link
            className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border hover:text-accent-foreground h-9 rounded-md px-3 bg-[#121212] border-[#1d1d20] text-white hover:bg-[#1a1a1c]"
            href="/auth/logout"
          >
            Sign Out
          </Link>
        </div>
      </header>

      {/* Header específico de la actividad */}
      <header className="flex flex-col gap-4 p-4 border-b border-[#1A1A1C] bg-[#0A0A0A] shrink-0">
        <div className="flex">
          <Link href="/contacts">
            <Button variant="ghost" className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hover:bg-accent h-9 rounded-md text-gray-400 hover:text-white p-0">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Volver a Contactos
            </Button>
          </Link>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex flex-col">
              <h1 className="text-xl font-semibold">{contact.name}</h1>
              <p className="text-xs text-gray-400">Contact ID: {params.id}</p>
            </div>
            <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-[#1A1A1C]">
              <Star className="h-5 w-5 text-gray-400" />
            </Button>
            <div className="text-sm text-gray-400 bg-[#1A1A1C] px-3 py-1 rounded-md">
              Owner (Assign To): <span className="text-white font-medium">Unassigned</span>
            </div>
          </div>
        </div>
      </header>

      {/* Body */}
      <main className="grid grid-cols-12 gap-6 p-6 flex-grow overflow-auto">
        {/* Left Sidebar */}
        <aside className="col-span-3">
          <ContactDetailsPanel contact={contact} />
        </aside>

        {/* Main Content */}
        <section className="col-span-6">
          <ActivityFeedAndComposer contact={contact} activities={activities} />
        </section>

        {/* Right Sidebar */}
        <aside className="col-span-3">
          <ActivityDetailsPanel />
        </aside>
      </main>
    </div>
  )
} 