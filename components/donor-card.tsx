/**
 * File: donor-card.tsx
 * Purpose: Display donor information in list views
 * Used by: /donors page, search results, dashboard recent donors
 */

"use client"

import { Card } from "@/components/ui/card"
import { formatCurrency, formatDate, daysSince } from "@/lib/utils"
import { TrendingUp, TrendingDown, User, Building2 } from "lucide-react"

export interface Donor {
  id: string | number
  name: string
  organization?: string | null
  email?: string
  phone?: string
  totalGiven: number
  lastGiftDate?: Date | string | null
  lastGiftAmount?: number
}

export function DonorCard({ donor }: { donor: Donor }) {
  // Early returns for edge cases
  if (!donor) return null
  
  // Destructure what you need
  const { name, organization, totalGiven, lastGiftDate, lastGiftAmount } = donor
  
  // Calculate derived values once
  const isActive = lastGiftDate && daysSince(lastGiftDate) < 365
  const isRecent = lastGiftDate && daysSince(lastGiftDate) < 90
  
  return (
    <Card className="group p-6 hover:shadow-2xl transition-all duration-300 cursor-pointer border-gray-200/50 dark:border-gray-700/50 overflow-hidden relative">
      {/* Gradient overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      {/* Main info always visible */}
      <div className="flex justify-between items-start relative z-10">
        <div className="flex-1">
          <div className="flex items-start gap-3">
            <div className={`p-2 rounded-lg ${
              organization 
                ? 'bg-blue-100 dark:bg-blue-900/20' 
                : 'bg-gray-100 dark:bg-gray-800'
            }`}>
              {organization ? (
                <Building2 className="h-4 w-4 text-blue-600 dark:text-blue-400" />
              ) : (
                <User className="h-4 w-4 text-gray-600 dark:text-gray-400" />
              )}
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-gray-100 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                {name}
              </h3>
              {organization && (
                <p className="text-sm text-gray-600 dark:text-gray-400">{organization}</p>
              )}
              {lastGiftDate && (
                <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                  Last gift: {formatDate(lastGiftDate)}
                  {lastGiftAmount && (
                    <span className="font-medium text-gray-700 dark:text-gray-300">
                      {' '}• {formatCurrency(lastGiftAmount)}
                    </span>
                  )}
                </p>
              )}
            </div>
          </div>
        </div>
        
        {/* Key metric prominent */}
        <div className="text-right ml-4">
          <p className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
            {formatCurrency(totalGiven)}
          </p>
          <div className="flex items-center justify-end gap-1 mt-1">
            {isActive ? (
              <>
                <TrendingUp className="h-3 w-3 text-green-500" />
                <span className="text-sm font-medium text-green-600 dark:text-green-400">
                  Active
                </span>
              </>
            ) : (
              <>
                <TrendingDown className="h-3 w-3 text-gray-400" />
                <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Lapsed
                </span>
              </>
            )}
          </div>
          {isRecent && (
            <div className="mt-2">
              <span className="text-xs px-2 py-1 rounded-full bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-300 font-medium">
                Recent
              </span>
            </div>
          )}
        </div>
      </div>
    </Card>
  )
}