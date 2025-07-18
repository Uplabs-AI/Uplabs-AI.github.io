"use client"

import { VoiceAgentsSection } from "@/components/dashboard/sections/voice-agents-section"
import { VoiceCallsTableSection } from "@/components/dashboard/sections/voice-calls-table-section"

export function VoiceContent() {
  return (
    <>
      {/* Voice Agents Section */}
      <VoiceAgentsSection />

      {/* Voice Calls Table Section */}
      <VoiceCallsTableSection />
    </>
  )
} 