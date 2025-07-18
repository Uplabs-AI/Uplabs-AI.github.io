import { Button } from "@/components/ui/button"
import Link from "next/link"

interface UserInfoBarProps {
  email: string
}

export default function UserInfoBar({ email }: UserInfoBarProps) {
  const initial = email.charAt(0).toUpperCase()
  return (
    <div className="flex items-center gap-4">
      {/* Avatar + email */}
      <div className="flex items-center gap-3 bg-[#121212] border border-[#1d1d20] rounded-md px-4 py-2">
        <div className="w-7 h-7 bg-[#241543] rounded-full flex items-center justify-center">
          <span className="text-[#ad84ff] text-sm font-medium select-none">
            {initial}
          </span>
        </div>
        <span className="text-white text-sm font-medium whitespace-nowrap">
          {email}
        </span>
      </div>

      {/* Sign out */}
      <Button
        variant="outline"
        size="sm"
        asChild
        className="bg-[#121212] border-[#1d1d20] text-white hover:bg-[#1a1a1c]"
      >
        <Link href="/auth/logout">Sign Out</Link>
      </Button>
    </div>
  )
} 