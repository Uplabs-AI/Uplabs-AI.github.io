"use client"

import * as React from "react"
import * as ToggleGroup from "@radix-ui/react-toggle-group"
import { cn } from "@/lib/utils"

interface SegmentedToggleProps {
  value: "voz" | "texto"
  onValueChange: (val: "voz" | "texto") => void
  className?: string
}

export default function SegmentedToggle({ value, onValueChange, className }: SegmentedToggleProps) {
  return (
    <ToggleGroup.Root
      type="single"
      value={value}
      onValueChange={(val) => val && onValueChange(val as "voz" | "texto")}
      className={cn("flex rounded-[21.5px] bg-[#100030] border border-[#5e17eb] h-[43px] w-[273px] p-[5px]", className)}
    >
      <ToggleGroup.Item
        value="voz"
        className={cn(
          "basis-1/2 h-full rounded-[17.5px] text-sm flex items-center justify-center whitespace-nowrap",
          "transition-all duration-300 ease-in-out transform",
          "data-[state=on]:bg-[#5e17eb] data-[state=on]:text-white data-[state=on]:font-bold data-[state=on]:shadow-lg data-[state=on]:scale-105",
          "data-[state=off]:bg-transparent data-[state=off]:text-[#5e17eb] data-[state=off]:font-normal data-[state=off]:scale-95 data-[state=off]:hover:bg-[#5e17eb]/5"
        )}
      >
        Agentes de Voz
      </ToggleGroup.Item>
      <ToggleGroup.Item
        value="texto"
        className={cn(
          "basis-1/2 h-full rounded-[17.5px] text-sm flex items-center justify-center whitespace-nowrap",
          "transition-all duration-300 ease-in-out transform",
          "data-[state=on]:bg-[#5e17eb] data-[state=on]:text-white data-[state=on]:font-bold data-[state=on]:shadow-lg data-[state=on]:scale-105",
          "data-[state=off]:bg-transparent data-[state=off]:text-[#5e17eb] data-[state=off]:font-normal data-[state=off]:scale-95 data-[state=off]:hover:bg-[#5e17eb]/5"
        )}
      >
        Agentes de Texto
      </ToggleGroup.Item>
    </ToggleGroup.Root>
  )
} 