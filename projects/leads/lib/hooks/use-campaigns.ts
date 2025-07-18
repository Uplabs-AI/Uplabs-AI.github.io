"use client"

import { useEffect } from "react"
import { useCampaignStore } from "@/lib/stores/campaign-store"

export const useCampaigns = () => {
  const {
    campaigns,
    filteredCampaigns,
    filters,
    isLoading,
    error,
    fetchCampaigns,
    setFilters,
    toggleCampaignStatus,
    deleteCampaign,
  } = useCampaignStore()

  useEffect(() => {
    console.log("useCampaigns: Fetching campaigns...")
    fetchCampaigns()
  }, [fetchCampaigns])

  useEffect(() => {
    console.log("useCampaigns: Campaigns updated", {
      totalCampaigns: campaigns.length,
      filteredCampaigns: filteredCampaigns.length,
      isLoading,
      error,
    })
  }, [campaigns, filteredCampaigns, isLoading, error])

  return {
    campaigns: filteredCampaigns,
    filters,
    isLoading,
    error,
    setFilters,
    toggleCampaignStatus,
    deleteCampaign,
    refetch: fetchCampaigns,
  }
}
