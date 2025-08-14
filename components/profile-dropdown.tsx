/**
 * Profile dropdown menu component
 * Provides user account management and settings
 */

"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  User, Settings, LogOut, HelpCircle, Bell, 
  Shield, CreditCard, ChevronRight, Mail, 
  Phone, Building2, Briefcase, Award
} from "lucide-react"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

interface UserProfile {
  name: string
  email: string
  role: string
  organization: string
  avatar?: string
  phone?: string
  memberSince: Date
  plan: 'free' | 'pro' | 'enterprise'
}

// Mock user data
const mockUser: UserProfile = {
  name: "John Smith",
  email: "john.smith@citytutors.org",
  role: "Executive Director",
  organization: "City Tutors",
  phone: "(410) 555-0100",
  memberSince: new Date("2023-01-15"),
  plan: 'pro'
}

export function ProfileDropdown() {
  const [isOpen, setIsOpen] = useState(false)
  const [activeSection, setActiveSection] = useState<string | null>(null)

  const menuItems = [
    {
      id: 'profile',
      label: 'My Profile',
      icon: User,
      action: () => setActiveSection('profile')
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: Settings,
      action: () => setActiveSection('settings')
    },
    {
      id: 'notifications',
      label: 'Notifications',
      icon: Bell,
      badge: '3',
      action: () => setActiveSection('notifications')
    },
    {
      id: 'billing',
      label: 'Billing & Plan',
      icon: CreditCard,
      action: () => setActiveSection('billing')
    },
    {
      id: 'security',
      label: 'Security',
      icon: Shield,
      action: () => setActiveSection('security')
    },
    {
      id: 'help',
      label: 'Help & Support',
      icon: HelpCircle,
      action: () => window.open('/help', '_blank')
    }
  ]

  const getPlanBadgeColor = (plan: string) => {
    switch(plan) {
      case 'enterprise': return 'bg-purple-500/20 text-purple-400 border-purple-500/30'
      case 'pro': return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30'
    }
  }

  const handleLogout = () => {
    // In a real app, this would clear auth tokens and redirect
    console.log('Logging out...')
    setIsOpen(false)
  }

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <button className="relative h-9 w-9 rounded-full glass-button glass-hover flex items-center justify-center group">
          <User className="h-5 w-5 text-emerald-400 medallion-glow" />
          <span className="absolute -bottom-1 -right-1 w-2 h-2 bg-green-400 rounded-full animate-pulse" />
        </button>
      </PopoverTrigger>
      
      <PopoverContent 
        align="end" 
        sideOffset={8}
        className="w-80 p-0 bg-gray-900/95 backdrop-blur-xl border-white/10 rounded-xl overflow-hidden"
      >
        <AnimatePresence mode="wait">
          {!activeSection ? (
            <motion.div
              key="main-menu"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.15 }}
            >
              {/* User Info Header */}
              <div className="p-4 bg-gradient-to-br from-emerald-500/10 to-teal-500/10 border-b border-white/10">
                <div className="flex items-start space-x-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 flex items-center justify-center">
                    <span className="text-white font-bold text-lg">
                      {mockUser.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div className="flex-1">
                    <p className="text-white font-semibold">{mockUser.name}</p>
                    <p className="text-xs text-gray-400">{mockUser.email}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge 
                        variant="outline" 
                        className={`text-xs px-2 py-0 ${getPlanBadgeColor(mockUser.plan)}`}
                      >
                        {mockUser.plan.toUpperCase()}
                      </Badge>
                      <span className="text-xs text-gray-500">
                        Member since {mockUser.memberSince.getFullYear()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Menu Items */}
              <div className="p-2">
                {menuItems.map((item, index) => (
                  <motion.button
                    key={item.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    onClick={item.action}
                    className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm text-gray-300 hover:text-white hover:bg-white/5 transition-all group"
                  >
                    <div className="flex items-center space-x-3">
                      <item.icon className="h-4 w-4 text-gray-400 group-hover:text-emerald-400 transition-colors" />
                      <span>{item.label}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      {item.badge && (
                        <Badge 
                          variant="outline" 
                          className="text-xs px-1.5 py-0 bg-emerald-500/20 text-emerald-400 border-emerald-500/30"
                        >
                          {item.badge}
                        </Badge>
                      )}
                      <ChevronRight className="h-3 w-3 text-gray-600 group-hover:text-gray-400" />
                    </div>
                  </motion.button>
                ))}
              </div>

              <Separator className="bg-white/10" />

              {/* Logout Button */}
              <div className="p-2">
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-all"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Log Out</span>
                </button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key={activeSection}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.15 }}
            >
              {/* Section Header */}
              <div className="p-4 border-b border-white/10 flex items-center space-x-3">
                <button
                  onClick={() => setActiveSection(null)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <ChevronRight className="h-5 w-5 rotate-180" />
                </button>
                <h3 className="text-white font-semibold capitalize">
                  {activeSection.replace('-', ' ')}
                </h3>
              </div>

              {/* Section Content */}
              <div className="p-4">
                {activeSection === 'profile' && (
                  <div className="space-y-4">
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2 text-sm">
                        <User className="h-4 w-4 text-gray-400" />
                        <span className="text-gray-400">Name:</span>
                        <span className="text-white">{mockUser.name}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm">
                        <Briefcase className="h-4 w-4 text-gray-400" />
                        <span className="text-gray-400">Role:</span>
                        <span className="text-white">{mockUser.role}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm">
                        <Building2 className="h-4 w-4 text-gray-400" />
                        <span className="text-gray-400">Organization:</span>
                        <span className="text-white">{mockUser.organization}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm">
                        <Mail className="h-4 w-4 text-gray-400" />
                        <span className="text-gray-400">Email:</span>
                        <span className="text-white">{mockUser.email}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm">
                        <Phone className="h-4 w-4 text-gray-400" />
                        <span className="text-gray-400">Phone:</span>
                        <span className="text-white">{mockUser.phone}</span>
                      </div>
                    </div>
                    <Button 
                      className="w-full bg-emerald-600 hover:bg-emerald-700 text-white"
                      size="sm"
                    >
                      Edit Profile
                    </Button>
                  </div>
                )}

                {activeSection === 'settings' && (
                  <div className="space-y-3">
                    <button className="w-full text-left px-3 py-2 rounded-lg text-sm text-gray-300 hover:text-white hover:bg-white/5 transition-all">
                      General Preferences
                    </button>
                    <button className="w-full text-left px-3 py-2 rounded-lg text-sm text-gray-300 hover:text-white hover:bg-white/5 transition-all">
                      Email Preferences
                    </button>
                    <button className="w-full text-left px-3 py-2 rounded-lg text-sm text-gray-300 hover:text-white hover:bg-white/5 transition-all">
                      Display Settings
                    </button>
                    <button className="w-full text-left px-3 py-2 rounded-lg text-sm text-gray-300 hover:text-white hover:bg-white/5 transition-all">
                      Data & Privacy
                    </button>
                  </div>
                )}

                {activeSection === 'notifications' && (
                  <div className="space-y-3">
                    <div className="p-3 bg-emerald-500/10 rounded-lg border border-emerald-500/20">
                      <p className="text-sm text-emerald-400 font-medium">3 New Notifications</p>
                      <p className="text-xs text-gray-400 mt-1">
                        New donor added • Meeting scheduled • Payment received
                      </p>
                    </div>
                    <Button 
                      variant="outline" 
                      className="w-full border-white/10 text-white hover:bg-white/5"
                      size="sm"
                    >
                      View All Notifications
                    </Button>
                  </div>
                )}

                {activeSection === 'billing' && (
                  <div className="space-y-3">
                    <div className="p-3 bg-gray-800/50 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-gray-400">Current Plan</span>
                        <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30">
                          PRO
                        </Badge>
                      </div>
                      <p className="text-xs text-gray-500">$49/month • Renews Feb 15, 2024</p>
                    </div>
                    <Button 
                      className="w-full bg-purple-600 hover:bg-purple-700 text-white"
                      size="sm"
                    >
                      Upgrade to Enterprise
                    </Button>
                  </div>
                )}

                {activeSection === 'security' && (
                  <div className="space-y-3">
                    <button className="w-full text-left px-3 py-2 rounded-lg text-sm text-gray-300 hover:text-white hover:bg-white/5 transition-all">
                      Change Password
                    </button>
                    <button className="w-full text-left px-3 py-2 rounded-lg text-sm text-gray-300 hover:text-white hover:bg-white/5 transition-all">
                      Two-Factor Authentication
                    </button>
                    <button className="w-full text-left px-3 py-2 rounded-lg text-sm text-gray-300 hover:text-white hover:bg-white/5 transition-all">
                      Active Sessions
                    </button>
                    <button className="w-full text-left px-3 py-2 rounded-lg text-sm text-gray-300 hover:text-white hover:bg-white/5 transition-all">
                      Login History
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </PopoverContent>
    </Popover>
  )
}