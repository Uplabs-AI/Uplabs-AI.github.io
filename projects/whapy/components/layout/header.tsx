"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import UserInfoBar from "./user-info-bar"

interface HeaderProps {
  title: string
  className?: string
}

export function Header({ title, className }: HeaderProps) {
  return (
    <header className={`flex items-center justify-between p-4 border-b border-border ${className}`}>
      <h1 className="text-xl font-semibold">{title}</h1>
      <UserInfoBar email="usuario@empresa.com" />
    </header>
  )
}
