"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/ThemeToggle"
import Image from "next/image"

export function Navigation() {
  const pathname = usePathname()

  // Hide navigation on the dedicated PDF route for a distraction-free view
  if (pathname.startsWith("/pdf")) {
    return null
  }

  const navItems = [
    { href: "/", label: "Home", icon: "🏠" },
    { href: "/user", label: "User Portal", icon: "👤" },
    { href: "/admin", label: "Admin Portal", icon: "🛠️" },
  ]

  return (
    <nav className="border-b bg-card/50 backdrop-blur-sm transition-colors duration-300">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
            <Image src="/images/bluelog-logo.png" alt="Bluelog Logo" width={40} height={40} className="rounded-lg" />
            <span className="font-bold text-xl bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
              Bluelog
            </span>
          </Link>
          <div className="flex items-center space-x-2">
            {navItems.map((item) => (
              <Button
                key={item.href}
                variant={pathname === item.href ? "default" : "ghost"}
                asChild
                className="transition-all duration-200 hover:scale-105"
              >
                <Link href={item.href} className="flex items-center space-x-2">
                  <span>{item.icon}</span>
                  <span>{item.label}</span>
                </Link>
              </Button>
            ))}
            <ThemeToggle />
          </div>
        </div>
      </div>
    </nav>
  )
}
