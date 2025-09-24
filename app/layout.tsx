import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { ProjectProvider } from "@/contexts/ProjectContext"
import { ThemeProvider } from "@/contexts/ThemeContext"
import { Navigation } from "@/components/Navigation"
import { Suspense } from "react"

export const metadata: Metadata = {
  title: "Bluelog",
  description: "Blockchain-powered Carbon Credit Tracking",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable} transition-colors duration-300`}>
        <Suspense fallback={<div>Loading...</div>}>
          <ThemeProvider>
            <ProjectProvider>
              <Navigation />
              <main className="min-h-screen bg-background transition-colors duration-300">{children}</main>
            </ProjectProvider>
          </ThemeProvider>
        </Suspense>
        <Analytics />
      </body>
    </html>
  )
}
