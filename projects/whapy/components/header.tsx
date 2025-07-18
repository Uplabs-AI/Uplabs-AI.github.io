"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"

interface HeaderProps {
  title: string
}

export function Header({ title }: HeaderProps) {
  return (
    <header className="flex items-center justify-between p-4 border-b border-border">
      <h1 className="text-xl font-semibold">{title}</h1>
      <div className="flex items-center space-x-2">
        <Button variant="outline" asChild>
          <Link href="/dashboard">Dashboard</Link>
        </Button>
        <Button variant="outline" asChild>
          <Link href="/auth/logout">Sign Out</Link>
        </Button>
      </div>
    </header>
  )
}
