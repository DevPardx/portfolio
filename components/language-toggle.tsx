"use client"

import { useLocale } from "next-intl"
import { useTransition } from "react"
import { Globe } from "lucide-react"
import { cn } from "@/lib/utils"

export function LanguageToggle() {
  const locale = useLocale()
  const [isPending, startTransition] = useTransition()

  const toggleLanguage = () => {
    const newLocale = locale === "en" ? "es" : "en"

    startTransition(() => {
      localStorage.setItem("NEXT_LOCALE", newLocale)
      document.cookie = `NEXT_LOCALE=${newLocale}; path=/; max-age=31536000; SameSite=Lax`
      window.location.reload()
    })
  }

  return (
    <button
      onClick={toggleLanguage}
      disabled={isPending}
      className={cn(
        "flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-sm font-medium text-muted-foreground backdrop-blur-sm transition-all hover:bg-white/10 hover:text-primary",
        isPending && "opacity-50 cursor-not-allowed"
      )}
      aria-label="Toggle language"
    >
      <Globe size={16} />
      <span className="font-mono text-xs uppercase">{locale}</span>
    </button>
  )
}
