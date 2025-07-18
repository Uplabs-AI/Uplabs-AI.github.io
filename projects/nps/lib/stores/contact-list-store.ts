import { create } from "zustand"
import { persist, createJSONStorage } from "zustand/middleware"

// Interfaces para tipado fuerte
export interface Contact {
  name: string
  phone: string
  apellidos?: string
  empresa?: string
  edad?: string
  estadoLaboral?: string
}

export interface ContactList {
  id: string
  name: string
  contacts: Contact[]
  lastModified: string
  contactCount: number
}

// Interfaz para el estado del store
interface ContactListState {
  contactLists: ContactList[]
  addList: (newList: ContactList) => void
  updateListName: (listId: string, newName: string) => void
  deleteList: (listId: string) => void
  // Futuras acciones (ej. addContactToList) pueden ir aquí
}

// Datos iniciales por defecto, para asegurar que la app siempre tenga un estado base
const defaultContactLists: ContactList[] = [
  {
    id: "accidentes-personales",
    name: "Accidentes Personales",
    contacts: [],
    lastModified: "01/05/2025, 09:44 hrs",
    contactCount: 100,
  },
  {
    id: "talleres",
    name: "Talleres",
    contacts: [],
    lastModified: "01/05/2025, 09:44 hrs",
    contactCount: 100,
  },
  {
    id: "salud-360",
    name: "Salud 360",
    contacts: [],
    lastModified: "01/05/2025, 09:44 hrs",
    contactCount: 100,
  },
  {
    id: "vida",
    name: "Vida",
    contacts: [],
    lastModified: "01/05/2025, 09:44 hrs",
    contactCount: 100,
  },
  {
    id: "auto-xkm",
    name: "Auto xKm",
    contacts: [],
    lastModified: "01/05/2025, 09:44 hrs",
    contactCount: 100,
  },
]

// Creación del store con persistencia en localStorage
export const useContactListStore = create<ContactListState>()(
  persist(
    (set, get) => ({
      contactLists: defaultContactLists,

      addList: (newList: ContactList) => {
        set((state) => ({
          contactLists: [...state.contactLists, newList],
        }))
      },

      updateListName: (listId: string, newName: string) => {
        set((state) => ({
          contactLists: state.contactLists.map((list) =>
            list.id === listId ? { ...list, name: newName, lastModified: new Date().toLocaleDateString("es-ES") + ", " + new Date().toLocaleTimeString("es-ES", { hour: '2-digit', minute: '2-digit' }) + " hrs" } : list
          ),
        }))
      },

      deleteList: (listId: string) => {
        set((state) => ({
          contactLists: state.contactLists.filter((list) => list.id !== listId),
        }))
      },
    }),
    {
      name: 'contact-lists-storage', // Clave segura en localStorage
      storage: createJSONStorage(() => localStorage),
      // Lógica de migración para no perder datos de la implementación anterior
      migrate: (persistedState, version) => {
        if (version === 0) {
          try {
            const oldData = localStorage.getItem('contact-lists');
            if (oldData) {
              const oldLists = JSON.parse(oldData);
              const combinedState = persistedState as ContactListState;
              const existingIds = new Set(combinedState.contactLists.map(l => l.id));
              const listsToMigrate = oldLists.filter((l: ContactList) => !existingIds.has(l.id));
              
              if(listsToMigrate.length > 0) {
                combinedState.contactLists = [...combinedState.contactLists, ...listsToMigrate];
                localStorage.removeItem('contact-lists'); // Limpiar la data vieja
              }
              
              return combinedState;
            }
          } catch(e) {
            console.error("Error migrating old contact lists", e);
          }
        }
        return persistedState as ContactListState;
      },
      version: 1, // Incrementar versión si la estructura del estado cambia en el futuro
    }
  )
) 