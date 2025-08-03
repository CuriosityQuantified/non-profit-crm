/**
 * File: dashboard/page.tsx
 * Purpose: CEO's daily dashboard view with priorities, metrics, and recent activity
 * Used by: Homepage and main navigation
 */

"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { formatCurrency, formatDate } from "@/lib/utils"
import { 
  DollarSign, 
  Users, 
  Calendar, 
  TrendingUp,
  Phone,
  Mail,
  CheckCircle2,
  AlertCircle,
  ArrowUp,
  Clock,
  Target,
  Building2
} from "lucide-react"

// Hardcoded data for Phase 1
const metrics = {
  totalRaised: 125000,
  monthlyGoal: 150000,
  activeGivers: 234,
  averageGift: 534,
}

const todaysPriorities = [
  {
    id: 1,
    title: "Call Sarah Johnson about major gift",
    donor: "Sarah Johnson",
    type: "call",
    priority: "high",
    amount: 25000,
  },
  {
    id: 2,
    title: "Send thank you to Williams Foundation",
    donor: "Williams Foundation",
    type: "email",
    priority: "medium",
    amount: 10000,
  },
  {
    id: 3,
    title: "Schedule lunch with board member Tom",
    donor: "Tom Peterson",
    type: "meeting",
    priority: "medium",
    amount: null,
  },
]

const recentDonors = [
  {
    id: 1,
    name: "Jennifer Smith",
    organization: "Smith Holdings",
    amount: 5000,
    date: new Date("2024-01-28"),
    totalGiven: 45000,
  },
  {
    id: 2,
    name: "Michael Chen",
    organization: "Chen Tech Solutions",
    amount: 2500,
    date: new Date("2024-01-27"),
    totalGiven: 15000,
  },
  {
    id: 3,
    name: "Williams Foundation",
    organization: null,
    amount: 10000,
    date: new Date("2024-01-26"),
    totalGiven: 120000,
  },
]

const upcomingTasks = [
  {
    id: 1,
    title: "Annual Gala Planning Meeting",
    date: new Date("2024-02-05"),
    type: "event",
  },
  {
    id: 2,
    title: "Grant Report Due - Smith Foundation",
    date: new Date("2024-02-08"),
    type: "deadline",
  },
  {
    id: 3,
    title: "Board Meeting",
    date: new Date("2024-02-15"),
    type: "meeting",
  },
]

export default function DashboardPage() {
  const percentOfGoal = (metrics.totalRaised / metrics.monthlyGoal) * 100

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Page Header */}
      <div className="text-center md:text-left">
        <h1 className="text-4xl font-bold tracking-tight text-white">
          Good morning, Alex
        </h1>
        <p className="text-white font-bold mt-2">
          Here's what needs your attention today, {formatDate(new Date())}
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="glass-card apple-shadow hover:apple-shadow-hover transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div className="flex items-center gap-3">
              <div className="p-2 glass-button">
                <DollarSign className="h-5 w-5 text-emerald-400 medallion-glow" />
              </div>
              <CardTitle className="text-2xl font-bold text-white">Monthly Raised</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{formatCurrency(metrics.totalRaised)}</div>
            <div className="text-xs text-white font-bold">
              {percentOfGoal.toFixed(0)}% of {formatCurrency(metrics.monthlyGoal)} goal
            </div>
            <div className="mt-2 h-2 w-full rounded-full bg-white/10 overflow-hidden">
              <div 
                className="h-2 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 transition-all duration-1000 ease-out"
                style={{ width: `${Math.min(percentOfGoal, 100)}%` }}
              />
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card apple-shadow hover:apple-shadow-hover transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div className="flex items-center gap-3">
              <div className="p-2 glass-button">
                <Users className="h-5 w-5 text-sky-400 medallion-glow" />
              </div>
              <CardTitle className="text-2xl font-bold text-white">Active Givers</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{metrics.activeGivers}</div>
            <p className="text-xs text-white font-bold flex items-center">
              <ArrowUp className="h-3 w-3 mr-1 text-green-400 medallion-glow" />
              +12 from last month
            </p>
          </CardContent>
        </Card>

        <Card className="glass-card apple-shadow hover:apple-shadow-hover transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div className="flex items-center gap-3">
              <div className="p-2 glass-button">
                <TrendingUp className="h-5 w-5 text-teal-400 medallion-glow" />
              </div>
              <CardTitle className="text-2xl font-bold text-white">Average Gift</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{formatCurrency(metrics.averageGift)}</div>
            <p className="text-xs text-white font-bold flex items-center">
              <ArrowUp className="h-3 w-3 mr-1 text-green-400 medallion-glow" />
              +8.2% from last month
            </p>
          </CardContent>
        </Card>

        <Card className="glass-card apple-shadow hover:apple-shadow-hover transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div className="flex items-center gap-3">
              <div className="p-2 glass-button">
                <Calendar className="h-5 w-5 text-cyan-400 medallion-glow" />
              </div>
              <CardTitle className="text-2xl font-bold text-white">Tasks Today</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{todaysPriorities.length}</div>
            <p className="text-xs text-white font-bold flex items-center">
              <AlertCircle className="h-3 w-3 mr-1 text-rose-400 medallion-glow" />
              2 high priority
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        {/* Today's Priorities */}
        <Card className="col-span-4 glass-card apple-shadow hover:apple-shadow-hover transition-all duration-300">
          <CardHeader className="border-b border-white/20 dark:border-white/10">
            <CardTitle className="flex items-center gap-2 text-white text-2xl font-bold">
              <div className="p-1.5 glass-button rounded-lg">
                <Target className="h-5 w-5 text-teal-400 medallion-glow" />
              </div>
              Today's Priorities
            </CardTitle>
            <CardDescription className="text-white font-bold">
              Most important donor interactions for today
            </CardDescription>
          </CardHeader>
          <CardContent className="mt-4">
            <div className="space-y-3">
              {todaysPriorities.map((task) => (
                <div key={task.id} className="group flex items-center justify-between space-x-4 p-4 rounded-xl glass-morphism dark:glass-morphism-dark hover:bg-white/30 dark:hover:bg-white/10 transition-all duration-300">
                  <div className="flex items-center space-x-4">
                    <div className={`rounded-full p-2 glass-button ${
                      task.priority === 'high' 
                        ? 'text-rose-400' 
                        : 'text-amber-400'
                    }`}>
                      {task.type === 'call' && <Phone className="h-5 w-5 medallion-glow" />}
                      {task.type === 'email' && <Mail className="h-5 w-5 medallion-glow" />}
                      {task.type === 'meeting' && <Calendar className="h-5 w-5 medallion-glow" />}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white">{task.title}</p>
                      <p className="text-sm text-white font-bold mt-1">
                        {task.amount && `Potential: ${formatCurrency(task.amount)}`}
                      </p>
                    </div>
                  </div>
                  <Button 
                    size="sm" 
                    className="glass-button glass-hover text-white transition-all duration-200"
                  >
                    <CheckCircle2 className="mr-1 h-3 w-3" />
                    Complete
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Donors */}
        <Card className="col-span-3 glass-card apple-shadow hover:apple-shadow-hover transition-all duration-300">
          <CardHeader className="border-b border-white/20 dark:border-white/10">
            <CardTitle className="flex items-center gap-2 text-white text-2xl font-bold">
              <div className="p-1.5 glass-button rounded-lg">
                <Users className="h-5 w-5 text-sky-400 medallion-glow" />
              </div>
              Recent Donors
            </CardTitle>
            <CardDescription className="text-white font-bold">
              Latest contributions received
            </CardDescription>
          </CardHeader>
          <CardContent className="mt-4">
            <div className="space-y-3">
              {recentDonors.map((donor) => (
                <div key={donor.id} className="group flex items-center justify-between p-4 rounded-xl glass-morphism dark:glass-morphism-dark hover:bg-white/30 dark:hover:bg-white/10 transition-all duration-300 cursor-pointer">
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-white">{donor.name}</p>
                    <p className="text-xs text-white font-bold flex items-center gap-1">
                      {donor.organization ? (
                        <>
                          <Building2 className="h-3 w-3 medallion-glow" />
                          {donor.organization}
                        </>
                      ) : (
                        'Individual Donor'
                      )}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-emerald-400">
                      {formatCurrency(donor.amount)}
                    </p>
                    <p className="text-xs text-white font-bold flex items-center justify-end">
                      <Clock className="h-3 w-3 mr-1 medallion-glow" />
                      {formatDate(donor.date)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Upcoming Tasks */}
      <Card className="glass-card apple-shadow hover:apple-shadow-hover transition-all duration-300">
        <CardHeader className="border-b border-white/20 dark:border-white/10">
          <CardTitle className="flex items-center gap-2 text-white text-2xl font-bold">
            <div className="p-1.5 glass-button rounded-lg">
              <Calendar className="h-5 w-5 text-cyan-400 medallion-glow" />
            </div>
            Upcoming This Week
          </CardTitle>
          <CardDescription className="text-gray-600 dark:text-gray-300">
            Important dates and deadlines
          </CardDescription>
        </CardHeader>
        <CardContent className="mt-4">
          <div className="grid gap-4 md:grid-cols-3">
            {upcomingTasks.map((task) => (
              <div key={task.id} className="p-4 rounded-xl glass-morphism dark:glass-morphism-dark hover:bg-white/30 dark:hover:bg-white/10 transition-all duration-300">
                <div className="flex items-start space-x-3">
                  <div className={`rounded-full p-2 glass-button ${
                    task.type === 'deadline' 
                      ? 'text-rose-400' 
                      : 'text-cyan-400'
                  }`}>
                    {task.type === 'deadline' && <AlertCircle className="h-5 w-5 medallion-glow" />}
                    {task.type === 'event' && <Calendar className="h-5 w-5 medallion-glow" />}
                    {task.type === 'meeting' && <Users className="h-5 w-5 medallion-glow" />}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">{task.title}</p>
                    <p className="text-xs text-white font-bold mt-1">
                      {formatDate(task.date)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="flex flex-wrap gap-4">
        <Button className="glass-button glass-hover apple-shadow hover:apple-shadow-hover text-white transition-all duration-300">
          <Users className="mr-2 h-4 w-4 medallion-glow" />
          Add New Donor
        </Button>
        <Button className="glass-button glass-hover apple-shadow hover:apple-shadow-hover text-white transition-all duration-300">
          <Calendar className="mr-2 h-4 w-4 medallion-glow" />
          Schedule Meeting
        </Button>
        <Button className="glass-button glass-hover apple-shadow hover:apple-shadow-hover text-white transition-all duration-300">
          <Mail className="mr-2 h-4 w-4 medallion-glow" />
          Send Email
        </Button>
      </div>
    </div>
  )
}