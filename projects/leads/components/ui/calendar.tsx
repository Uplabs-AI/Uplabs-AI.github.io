"use client"

import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { DayPicker } from "react-day-picker"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"

export type CalendarProps = React.ComponentProps<typeof DayPicker>

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("p-3", className)}
      classNames={{
        months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
        month: "space-y-4",
        caption: "flex justify-center pt-1 relative items-center",
        caption_label: "text-sm font-medium text-white",
        nav: "space-x-1 flex items-center",
        nav_button: cn(
          "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
          "h-7 w-7 bg-transparent border border-[#374151] text-gray-400 hover:bg-[#374151] hover:text-white p-0"
        ),
        nav_button_previous: "absolute left-1",
        nav_button_next: "absolute right-1",
        table: "w-full border-collapse space-y-1",
        head_row: "flex",
        head_cell: "text-gray-400 rounded-md w-9 font-normal text-[0.8rem]",
        row: "flex w-full mt-2",
        cell: "h-9 w-9 text-center text-sm p-0 relative [&:has([aria-selected])]:bg-transparent focus-within:relative focus-within:z-20",
        day: cn(
          "h-9 w-9 p-0 font-normal aria-selected:opacity-100",
          "[&>button]:h-full [&>button]:w-full [&>button]:flex [&>button]:items-center [&>button]:justify-center",
          "[&>button]:rounded-md [&>button]:text-white [&>button]:transition-colors",
          "[&>button]:hover:bg-[#374151] [&>button]:hover:text-white",
          "[&>button]:focus:outline-none [&>button]:focus:ring-2 [&>button]:focus:ring-[#5E17EB]"
        ),
        day_selected: "[&>button]:bg-[#5E17EB] [&>button]:text-white [&>button]:hover:bg-[#5E17EB] [&>button]:focus:bg-[#5E17EB]",
        day_today: "[&>button]:bg-[#374151] [&>button]:text-white [&>button]:font-semibold",
        day_outside: "[&>button]:text-gray-500 [&>button]:opacity-50",
        day_disabled: "[&>button]:text-gray-600 [&>button]:opacity-50",
        day_range_middle: "aria-selected:bg-[#374151] aria-selected:text-white",
        day_hidden: "invisible",
        ...classNames,
      }}
      {...props}
    />
  )
}
Calendar.displayName = "Calendar"

export { Calendar }
