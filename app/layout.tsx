/**
 * File: layout.tsx
 * Purpose: Root layout with navigation bar and providers
 * Used by: All pages in the application
 */

import type { Metadata } from "next"
import { Inter } from "next/font/google"
import Link from "next/link"
import { Home, Users, UserCheck, Calendar, DollarSign } from "lucide-react"
import { ThemeProvider } from "@/components/theme-provider"
import { AIAssistantButton } from "@/components/ai-assistant-button"
import { ProfileDropdown } from "@/components/profile-dropdown"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "City Tutors CRM",
  description: "Donor relationship management for City Tutors",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="min-h-screen gradient-bg">
            {/* Navigation */}
            <nav className="glass-morphism dark:glass-morphism-dark sticky top-0 z-50 border-b border-white/20 dark:border-white/10">
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                  <div className="flex items-center">
                    <h1 className="text-xl font-bold bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                      City Tutors CRM
                    </h1>
                  </div>
                  
                  <div className="flex items-center gap-8">
                    <Link
                      href="/dashboard"
                      className="flex items-center space-x-2 text-sm font-medium text-gray-300 hover:text-emerald-400 transition-colors duration-200"
                    >
                      <Home className="h-5 w-5 text-emerald-400 medallion-glow" />
                      <span>Dashboard</span>
                    </Link>
                    
                    <Link
                      href="/donors"
                      className="flex items-center space-x-2 text-sm font-medium text-gray-300 hover:text-emerald-400 transition-colors duration-200"
                    >
                      <Users className="h-5 w-5 text-sky-400 medallion-glow" />
                      <span>Donors</span>
                    </Link>
                    
                    <Link
                      href="/board"
                      className="flex items-center space-x-2 text-sm font-medium text-gray-300 hover:text-emerald-400 transition-colors duration-200"
                    >
                      <UserCheck className="h-5 w-5 text-teal-400 medallion-glow" />
                      <span>Board</span>
                    </Link>
                    
                    <Link
                      href="/calendar"
                      className="flex items-center space-x-2 text-sm font-medium text-gray-300 hover:text-emerald-400 transition-colors duration-200"
                    >
                      <Calendar className="h-5 w-5 text-cyan-400 medallion-glow" />
                      <span>Calendar</span>
                    </Link>
                    
                    <Link
                      href="/finances"
                      className="flex items-center space-x-2 text-sm font-medium text-gray-300 hover:text-emerald-400 transition-colors duration-200"
                    >
                      <DollarSign className="h-5 w-5 text-green-400 medallion-glow" />
                      <span>Finances</span>
                    </Link>
                    
                    <ProfileDropdown />
                  </div>
                </div>
              </div>
            </nav>
            
            {/* Main content */}
            <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
              {children}
            </main>
            
            {/* AI Assistant Button */}
            <AIAssistantButton />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}