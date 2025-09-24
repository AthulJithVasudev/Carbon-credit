"use client"

import { Button } from "@/components/ui/button"
import { useTheme } from "@/contexts/ThemeContext"

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()

  return (
    <Button variant="ghost" size="sm" onClick={toggleTheme} className="transition-all duration-300 hover:scale-105">
      {theme === "light" ? "🌙" : "☀️"}
    </Button>
  )
}
