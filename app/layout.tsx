/**
 * File: layout.tsx
 * Purpose: Root layout with navigation bar and providers
 * Used by: All pages in the application
 */

import type { Metadata } from "next"
import { Inter } from "next/font/google"
import Link from "next/link"
import { Home, Users, UserCheck, Calendar } from "lucide-react"
import { ThemeProvider } from "@/components/theme-provider"
import { ThemeToggle } from "@/components/theme-toggle"
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
            <nav className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 sticky top-0 z-50 shadow-sm">
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                  <div className="flex items-center">
                    <h1 className="text-xl font-bold text-purple-600 dark:text-purple-400">
                      City Tutors CRM
                    </h1>
                  </div>
                  
                  <div className="flex items-center space-x-8">
                    <Link
                      href="/dashboard"
                      className="flex items-center space-x-2 text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-200"
                    >
                      <Home className="h-4 w-4" />
                      <span>Dashboard</span>
                    </Link>
                    
                    <Link
                      href="/donors"
                      className="flex items-center space-x-2 text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-200"
                    >
                      <Users className="h-4 w-4" />
                      <span>Donors</span>
                    </Link>
                    
                    <Link
                      href="/board"
                      className="flex items-center space-x-2 text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-200"
                    >
                      <UserCheck className="h-4 w-4" />
                      <span>Board</span>
                    </Link>
                    
                    <Link
                      href="/calendar"
                      className="flex items-center space-x-2 text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-200"
                    >
                      <Calendar className="h-4 w-4" />
                      <span>Calendar</span>
                    </Link>
                    
                    <ThemeToggle />
                  </div>
                </div>
              </div>
            </nav>
            
            {/* Main content */}
            <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
              {children}
            </main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}