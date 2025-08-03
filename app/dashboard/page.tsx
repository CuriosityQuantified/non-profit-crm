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
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
          Good morning, Alex
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Here's what needs your attention today, {formatDate(new Date())}
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="overflow-hidden border-0 bg-purple-600 dark:bg-purple-700 shadow-[0_4px_12px_rgba(147,51,234,0.3)] transform hover:scale-105 transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-white">Monthly Raised</CardTitle>
            <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
              <DollarSign className="h-4 w-4 text-white" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{formatCurrency(metrics.totalRaised)}</div>
            <div className="text-xs text-white/80">
              {percentOfGoal.toFixed(0)}% of {formatCurrency(metrics.monthlyGoal)} goal
            </div>
            <div className="mt-2 h-2 w-full rounded-full bg-white/20 overflow-hidden">
              <div 
                className="h-2 rounded-full bg-white/60 transition-all duration-1000 ease-out"
                style={{ width: `${Math.min(percentOfGoal, 100)}%` }}
              />
            </div>
          </CardContent>
        </Card>

        <Card className="overflow-hidden border-0 bg-blue-600 dark:bg-blue-700 shadow-[0_4px_12px_rgba(59,130,246,0.3)] transform hover:scale-105 transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-white">Active Givers</CardTitle>
            <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
              <Users className="h-4 w-4 text-white" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{metrics.activeGivers}</div>
            <p className="text-xs text-white/80 flex items-center">
              <ArrowUp className="h-3 w-3 mr-1 text-white" />
              +12 from last month
            </p>
          </CardContent>
        </Card>

        <Card className="overflow-hidden border-0 bg-green-600 dark:bg-green-700 shadow-[0_4px_12px_rgba(34,197,94,0.3)] transform hover:scale-105 transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-white">Average Gift</CardTitle>
            <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
              <TrendingUp className="h-4 w-4 text-white" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{formatCurrency(metrics.averageGift)}</div>
            <p className="text-xs text-white/80 flex items-center">
              <ArrowUp className="h-3 w-3 mr-1 text-white" />
              +8.2% from last month
            </p>
          </CardContent>
        </Card>

        <Card className="overflow-hidden border-0 bg-orange-600 dark:bg-orange-700 shadow-[0_4px_12px_rgba(251,146,60,0.3)] transform hover:scale-105 transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-white">Tasks Today</CardTitle>
            <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
              <Calendar className="h-4 w-4 text-white" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{todaysPriorities.length}</div>
            <p className="text-xs text-white/80 flex items-center">
              <AlertCircle className="h-3 w-3 mr-1 text-white" />
              2 high priority
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        {/* Today's Priorities */}
        <Card className="col-span-4 overflow-hidden border-0 shadow-[0_4px_12px_rgba(0,0,0,0.1)] dark:shadow-[0_4px_12px_rgba(0,0,0,0.3)] transform hover:scale-[1.02] transition-all duration-300">
          <CardHeader className="border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-700 dark:to-pink-700">
            <CardTitle className="flex items-center gap-2 text-white">
              <Target className="h-5 w-5 text-white" />
              Today's Priorities
            </CardTitle>
            <CardDescription className="text-white/80">
              Most important donor interactions for today
            </CardDescription>
          </CardHeader>
          <CardContent className="mt-4 bg-white dark:bg-gray-800">
            <div className="space-y-3">
              {todaysPriorities.map((task) => (
                <div key={task.id} className="group flex items-center justify-between space-x-4 p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-purple-300 dark:hover:border-purple-700 transition-colors bg-white dark:bg-gray-900">
                  <div className="flex items-center space-x-4">
                    <div className={`rounded-full p-2 ${
                      task.priority === 'high' 
                        ? 'bg-red-500 text-white' 
                        : 'bg-yellow-500 text-white'
                    }`}>
                      {task.type === 'call' && <Phone className="h-4 w-4" />}
                      {task.type === 'email' && <Mail className="h-4 w-4" />}
                      {task.type === 'meeting' && <Calendar className="h-4 w-4" />}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{task.title}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                        {task.amount && `Potential: ${formatCurrency(task.amount)}`}
                      </p>
                    </div>
                  </div>
                  <Button 
                    size="sm" 
                    className="bg-white/90 dark:bg-gray-800 text-gray-700 dark:text-gray-200 shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-200"
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
        <Card className="col-span-3 overflow-hidden border-0 shadow-[0_4px_12px_rgba(0,0,0,0.1)] dark:shadow-[0_4px_12px_rgba(0,0,0,0.3)] transform hover:scale-[1.02] transition-all duration-300">
          <CardHeader className="border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-blue-600 to-cyan-600 dark:from-blue-700 dark:to-cyan-700">
            <CardTitle className="flex items-center gap-2 text-white">
              <Users className="h-5 w-5 text-white" />
              Recent Donors
            </CardTitle>
            <CardDescription className="text-white/80">
              Latest contributions received
            </CardDescription>
          </CardHeader>
          <CardContent className="mt-4 bg-white dark:bg-gray-800">
            <div className="space-y-3">
              {recentDonors.map((donor) => (
                <div key={donor.id} className="group flex items-center justify-between p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-700 transition-colors cursor-pointer bg-white dark:bg-gray-900">
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{donor.name}</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400 flex items-center gap-1">
                      {donor.organization ? (
                        <>
                          <Building2 className="h-3 w-3" />
                          {donor.organization}
                        </>
                      ) : (
                        'Individual Donor'
                      )}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-green-600 dark:text-green-400">
                      {formatCurrency(donor.amount)}
                    </p>
                    <p className="text-xs text-gray-600 dark:text-gray-400 flex items-center justify-end">
                      <Clock className="h-3 w-3 mr-1" />
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
      <Card className="overflow-hidden border-0 shadow-[0_4px_12px_rgba(0,0,0,0.1)] dark:shadow-[0_4px_12px_rgba(0,0,0,0.3)] transform hover:scale-[1.01] transition-all duration-300">
        <CardHeader className="border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-orange-600 to-red-600 dark:from-orange-700 dark:to-red-700">
          <CardTitle className="flex items-center gap-2 text-white">
            <Calendar className="h-5 w-5 text-white" />
            Upcoming This Week
          </CardTitle>
          <CardDescription className="text-white/80">
            Important dates and deadlines
          </CardDescription>
        </CardHeader>
        <CardContent className="mt-4 bg-white dark:bg-gray-800">
          <div className="grid gap-4 md:grid-cols-3">
            {upcomingTasks.map((task) => (
              <div key={task.id} className="p-4 rounded-lg border-2 border-gray-200 dark:border-gray-700 hover:border-purple-300 dark:hover:border-purple-700 transition-all duration-300 bg-white dark:bg-gray-900">
                <div className="flex items-start space-x-3">
                  <div className={`rounded-full p-2 ${
                    task.type === 'deadline' 
                      ? 'bg-red-500' 
                      : 'bg-blue-500'
                  }`}>
                    {task.type === 'deadline' && <AlertCircle className="h-4 w-4 text-white" />}
                    {task.type === 'event' && <Calendar className="h-4 w-4 text-white" />}
                    {task.type === 'meeting' && <Users className="h-4 w-4 text-white" />}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{task.title}</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
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
        <Button className="bg-purple-600 hover:bg-purple-700 text-white shadow-[0_4px_12px_rgba(147,51,234,0.3)] hover:shadow-[0_6px_16px_rgba(147,51,234,0.4)] transform hover:scale-105 hover:-translate-y-0.5 transition-all duration-300">
          <Users className="mr-2 h-4 w-4" />
          Add New Donor
        </Button>
        <Button className="bg-gray-600 hover:bg-gray-700 text-white shadow-[0_4px_12px_rgba(0,0,0,0.2)] hover:shadow-[0_6px_16px_rgba(0,0,0,0.3)] transform hover:scale-105 hover:-translate-y-0.5 transition-all duration-300">
          <Calendar className="mr-2 h-4 w-4" />
          Schedule Meeting
        </Button>
        <Button className="bg-gray-600 hover:bg-gray-700 text-white shadow-[0_4px_12px_rgba(0,0,0,0.2)] hover:shadow-[0_6px_16px_rgba(0,0,0,0.3)] transform hover:scale-105 hover:-translate-y-0.5 transition-all duration-300">
          <Mail className="mr-2 h-4 w-4" />
          Send Email
        </Button>
      </div>
    </div>
  )
}