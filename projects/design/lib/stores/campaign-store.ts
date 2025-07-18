import { create } from "zustand"
import type { Campaign, CampaignFilters } from "@/lib/types/campaign"
import { campaignService } from "@/lib/services/campaign-service"

interface CampaignState {
  campaigns: Campaign[]
  filters: CampaignFilters
  isLoading: boolean
  error: string | null

  // Actions
  fetchCampaigns: () => Promise<void>
  setFilters: (filters: Partial<CampaignFilters>) => void
  toggleCampaignStatus: (id: string) => Promise<void>
  deleteCampaign: (id: string) => Promise<void>

  // Computed
  filteredCampaigns: Campaign[]
}

export const useCampaignStore = create<CampaignState>((set, get) => ({
  campaigns: [],
  filters: {
    status: "all",
    searchQuery: "",
  },
  isLoading: false,
  error: null,

  fetchCampaigns: async () => {
    set({ isLoading: true, error: null })

    try {
      const campaigns = await campaignService.fetchCampaigns()
      set({ campaigns, isLoading: false })
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : "Error fetching campaigns",
        isLoading: false,
      })
    }
  },

  setFilters: (newFilters) => {
    set((state) => ({
      filters: { ...state.filters, ...newFilters },
    }))
  },

  toggleCampaignStatus: async (id) => {
    const { campaigns } = get()
    const campaign = campaigns.find((c) => c.id === id)

    if (!campaign) return

    try {
      const newStatus = campaign.status === "active" ? "paused" : "active"
      const updatedCampaign = await campaignService.updateCampaign(id, {
        status: newStatus,
        isActive: newStatus === "active",
      })

      set((state) => ({
        campaigns: state.campaigns.map((c) => (c.id === id ? updatedCampaign : c)),
      }))
    } catch (error) {
      set({ error: error instanceof Error ? error.message : "Error updating campaign" })
    }
  },

  deleteCampaign: async (id) => {
    try {
      await campaignService.deleteCampaign(id)
      set((state) => ({
        campaigns: state.campaigns.filter((c) => c.id !== id),
      }))
    } catch (error) {
      set({ error: error instanceof Error ? error.message : "Error deleting campaign" })
    }
  },

  get filteredCampaigns() {
    const { campaigns, filters } = get()

    return campaigns.filter((campaign) => {
      // Filter by status
      if (filters.status !== "all" && campaign.status !== filters.status) {
        return false
      }

      // Filter by search query
      if (filters.searchQuery) {
        const query = filters.searchQuery.toLowerCase()
        return campaign.name.toLowerCase().includes(query) || campaign.agent.toLowerCase().includes(query)
      }

      return true
    })
  },
}))
