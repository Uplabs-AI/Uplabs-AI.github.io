export interface Campaign {
  id: string
  name: string
  agent: string
  startDate: string
  endDate: string
  segment: {
    type: string
    label: string
    color: string
  }[]
  status: "completed" | "active" | "paused"
  isActive: boolean
  flow?: Array<{
    id: number
    label: string
    text: string
    yes: string
    no: string
  }>
}

export type CampaignStatus = "all" | "active" | "paused" | "completed"

export interface CampaignFilters {
  status: CampaignStatus
  searchQuery: string
}
