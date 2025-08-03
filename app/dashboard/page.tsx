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
        <Card className="overflow-hidden border-purple-200 dark:border-purple-900/50 bg-purple-50 dark:bg-purple-950/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-purple-900 dark:text-purple-100">Monthly Raised</CardTitle>
            <div className="p-2 bg-purple-600 rounded-lg">
              <DollarSign className="h-4 w-4 text-white" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-900 dark:text-purple-100">{formatCurrency(metrics.totalRaised)}</div>
            <div className="text-xs text-purple-700 dark:text-purple-300">
              {percentOfGoal.toFixed(0)}% of {formatCurrency(metrics.monthlyGoal)} goal
            </div>
            <div className="mt-2 h-2 w-full rounded-full bg-purple-200 dark:bg-purple-900/50 overflow-hidden">
              <div 
                className="h-2 rounded-full bg-purple-600 dark:bg-purple-500 transition-all duration-1000 ease-out"
                style={{ width: `${Math.min(percentOfGoal, 100)}%` }}
              />
            </div>
          </CardContent>
        </Card>

        <Card className="overflow-hidden border-blue-200 dark:border-blue-900/50 bg-blue-50 dark:bg-blue-950/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-blue-900 dark:text-blue-100">Active Givers</CardTitle>
            <div className="p-2 bg-blue-600 rounded-lg">
              <Users className="h-4 w-4 text-white" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-900 dark:text-blue-100">{metrics.activeGivers}</div>
            <p className="text-xs text-blue-700 dark:text-blue-300 flex items-center">
              <ArrowUp className="h-3 w-3 mr-1 text-green-600 dark:text-green-400" />
              +12 from last month
            </p>
          </CardContent>
        </Card>

        <Card className="overflow-hidden border-green-200 dark:border-green-900/50 bg-green-50 dark:bg-green-950/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-green-900 dark:text-green-100">Average Gift</CardTitle>
            <div className="p-2 bg-green-600 rounded-lg">
              <TrendingUp className="h-4 w-4 text-white" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-900 dark:text-green-100">{formatCurrency(metrics.averageGift)}</div>
            <p className="text-xs text-green-700 dark:text-green-300 flex items-center">
              <ArrowUp className="h-3 w-3 mr-1 text-green-600 dark:text-green-400" />
              +8.2% from last month
            </p>
          </CardContent>
        </Card>

        <Card className="overflow-hidden border-orange-200 dark:border-orange-900/50 bg-orange-50 dark:bg-orange-950/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-orange-900 dark:text-orange-100">Tasks Today</CardTitle>
            <div className="p-2 bg-orange-600 rounded-lg">
              <Calendar className="h-4 w-4 text-white" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-900 dark:text-orange-100">{todaysPriorities.length}</div>
            <p className="text-xs text-orange-700 dark:text-orange-300 flex items-center">
              <AlertCircle className="h-3 w-3 mr-1 text-red-600 dark:text-red-400" />
              2 high priority
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        {/* Today's Priorities */}
        <Card className="col-span-4 overflow-hidden border-gray-300 dark:border-gray-600">
          <CardHeader className="border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
            <CardTitle className="flex items-center gap-2 text-gray-900 dark:text-gray-100">
              <Target className="h-5 w-5 text-purple-600 dark:text-purple-400" />
              Today's Priorities
            </CardTitle>
            <CardDescription className="text-gray-600 dark:text-gray-400">
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
                    variant="outline"
                    className="border-gray-300 dark:border-gray-600 hover:bg-purple-50 dark:hover:bg-purple-900/20 hover:border-purple-300 dark:hover:border-purple-700"
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
        <Card className="col-span-3 overflow-hidden border-gray-300 dark:border-gray-600">
          <CardHeader className="border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
            <CardTitle className="flex items-center gap-2 text-gray-900 dark:text-gray-100">
              <Users className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              Recent Donors
            </CardTitle>
            <CardDescription className="text-gray-600 dark:text-gray-400">
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
      <Card className="overflow-hidden border-gray-300 dark:border-gray-600">
        <CardHeader className="border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
          <CardTitle className="flex items-center gap-2 text-gray-900 dark:text-gray-100">
            <Calendar className="h-5 w-5 text-orange-600 dark:text-orange-400" />
            Upcoming This Week
          </CardTitle>
          <CardDescription className="text-gray-600 dark:text-gray-400">
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
        <Button className="bg-purple-600 hover:bg-purple-700 text-white shadow-md hover:shadow-lg transition-all duration-300">
          <Users className="mr-2 h-4 w-4" />
          Add New Donor
        </Button>
        <Button variant="outline" className="border-2 border-gray-300 dark:border-gray-600 hover:border-purple-400 dark:hover:border-purple-600 hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-colors">
          <Calendar className="mr-2 h-4 w-4" />
          Schedule Meeting
        </Button>
        <Button variant="outline" className="border-2 border-gray-300 dark:border-gray-600 hover:border-purple-400 dark:hover:border-purple-600 hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-colors">
          <Mail className="mr-2 h-4 w-4" />
          Send Email
        </Button>
      </div>
    </div>
  )
}