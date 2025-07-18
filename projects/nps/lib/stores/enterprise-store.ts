import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface Enterprise {
  id: number
  name: string
  description: string
  colorBar: string
  href: string
  logo: string | null // URL de la imagen personalizada o null para usar icono por defecto
}

interface EnterpriseStore {
  selectedEnterprise: Enterprise | null
  uploadedLogos: Record<number, string> // ID empresa -> base64 image
  setSelectedEnterprise: (enterprise: Enterprise) => void
  clearSelectedEnterprise: () => void
  setUploadedLogo: (enterpriseId: number, logoBase64: string) => void
  removeUploadedLogo: (enterpriseId: number) => void
}

export const useEnterpriseStore = create<EnterpriseStore>()(
  persist(
    (set) => ({
      selectedEnterprise: null,
      uploadedLogos: {},
      setSelectedEnterprise: (enterprise) => set({ selectedEnterprise: enterprise }),
      clearSelectedEnterprise: () => set({ selectedEnterprise: null }),
      setUploadedLogo: (enterpriseId, logoBase64) => 
        set((state) => ({
          uploadedLogos: {
            ...state.uploadedLogos,
            [enterpriseId]: logoBase64
          }
        })),
      removeUploadedLogo: (enterpriseId) =>
        set((state) => {
          const newLogos = { ...state.uploadedLogos }
          delete newLogos[enterpriseId]
          return { uploadedLogos: newLogos }
        }),
    }),
    {
      name: 'enterprise-storage',
    }
  )
) 