import type { Campaign } from "@/lib/types/campaign"

export class CampaignService {
  async fetchCampaigns(): Promise<Campaign[]> {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 300))

    return [
      {
        id: "1",
        name: "Satisfacción Cliente Q1",
        agent: "Asistente Carlos",
        startDate: "01/01/2023",
        endDate: "31/03/2023",
        segment: [
          { type: "nps", label: "Campaña NPS", color: "#10b981" },
          { type: "cx", label: "CX", color: "#3b82f6" },
        ],
        status: "completed",
        isActive: false,
      },
      {
        id: "2",
        name: "Feedback Producto Nuevo",
        agent: "Asistente María",
        startDate: "15/04/2023",
        endDate: "15/05/2023",
        segment: [{ type: "health", label: "Proveedor salud", color: "#8b5cf6" }],
        status: "active",
        isActive: true,
      },
      {
        id: "3",
        name: "Evaluación Servicio",
        agent: "Asistente Juan",
        startDate: "01/06/2023",
        endDate: "30/06/2023",
        segment: [
          { type: "satisfaction", label: "Siniestros", color: "#10b981" },
          { type: "rpa", label: "RPA", color: "#f97316" },
        ],
        status: "paused",
        isActive: false,
      },
      {
        id: "4",
        name: "Satisfacción Post-Compra",
        agent: "Asistente Ana",
        startDate: "01/07/2023",
        endDate: "31/07/2023",
        segment: [
          { type: "auto-km", label: "Auto xKm", color: "#ef4444" },
          { type: "auto", label: "Auto", color: "#3b82f6" },
        ],
        status: "completed",
        isActive: false,
      },
      {
        id: "5",
        name: "Encuesta NPS Trimestral",
        agent: "Asistente Carlos",
        startDate: "01/04/2023",
        endDate: "30/06/2023",
        segment: [
          { type: "health", label: "Salud", color: "#3b82f6" },
          { type: "health-total", label: "Salud total", color: "#f97316" },
        ],
        status: "completed",
        isActive: false,
      },
    ]
  }

  async createCampaign(campaign: Omit<Campaign, "id">): Promise<Campaign> {
    await new Promise((resolve) => setTimeout(resolve, 500))
    return {
      ...campaign,
      id: Math.random().toString(36).substr(2, 9),
    }
  }

  async updateCampaign(id: string, updates: Partial<Campaign>): Promise<Campaign> {
    await new Promise((resolve) => setTimeout(resolve, 300))
    const campaigns = await this.fetchCampaigns()
    const campaign = campaigns.find((c) => c.id === id)

    if (!campaign) {
      throw new Error("Campaign not found")
    }

    return { ...campaign, ...updates }
  }

  async deleteCampaign(id: string): Promise<void> {
    await new Promise((resolve) => setTimeout(resolve, 300))
  }
}

export const campaignService = new CampaignService()
