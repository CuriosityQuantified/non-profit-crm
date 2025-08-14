/**
 * File: calendar/page.tsx
 * Purpose: Calendar page with visual calendar, event management, and scheduling
 * Features: Monthly calendar view, event CRUD operations, upcoming events sidebar
 */

"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { formatDate } from "@/lib/utils"
import { 
  Calendar, 
  Plus, 
  ChevronLeft, 
  ChevronRight,
  Clock,
  Users,
  Video,
  Phone,
  MapPin,
  DollarSign,
  Target,
  Trash2,
  Edit,
  Eye,
  AlertCircle,
  CheckCircle2,
  Star,
  Mail,
  Building2,
  User,
  Coffee,
  HandHeart,
  FileText,
  Trophy
} from "lucide-react"

// Event interface
interface CalendarEvent {
  id: string
  title: string
  description: string
  date: Date
  startTime: string
  endTime?: string
  type: 'meeting' | 'call' | 'deadline' | 'event' | 'donation' | 'volunteer' | 'board' | 'fundraiser'
  status: 'scheduled' | 'completed' | 'cancelled'
  location?: string
  attendees?: string[]
  priority: 'low' | 'medium' | 'high'
  reminder?: number // minutes before
  notes?: string
  relatedDonor?: string
  amount?: number // for donation events
}

// Sample calendar events
const initialEvents: CalendarEvent[] = [
  {
    id: '1',
    title: 'Board Meeting',
    description: 'Monthly board meeting to review finances and programs',
    date: new Date('2024-02-15'),
    startTime: '18:00',
    endTime: '19:30',
    type: 'board',
    status: 'scheduled',
    location: 'Conference Room A',
    attendees: ['Michael Chen', 'Sarah Williams', 'Robert Johnson'],
    priority: 'high',
    reminder: 60,
    notes: 'Review Q1 budget and new program proposals'
  },
  {
    id: '2',
    title: 'Donor Meeting - Tech Innovators Inc.',
    description: 'Quarterly check-in with corporate sponsor',
    date: new Date('2024-02-18'),
    startTime: '14:00',
    endTime: '15:00',
    type: 'meeting',
    status: 'scheduled',
    location: 'Their office',
    priority: 'high',
    relatedDonor: 'Tech Innovators Inc.',
    notes: 'Discuss employee volunteer program expansion'
  },
  {
    id: '3',
    title: 'Spring Gala Planning Call',
    description: 'Planning committee call for annual fundraising gala',
    date: new Date('2024-02-20'),
    startTime: '10:00',
    endTime: '11:00',
    type: 'call',
    status: 'scheduled',
    attendees: ['Sarah Williams', 'Linda Thompson', 'Event Committee'],
    priority: 'medium',
    reminder: 30
  },
  {
    id: '4',
    title: 'Grant Application Deadline',
    description: 'Williams Foundation capacity building grant due',
    date: new Date('2024-02-22'),
    startTime: '17:00',
    type: 'deadline',
    status: 'scheduled',
    priority: 'high',
    amount: 50000,
    notes: 'Final review with program team before submission'
  },
  {
    id: '5',
    title: 'Student Showcase Event',
    description: 'Quarterly student achievement showcase for donors',
    date: new Date('2024-02-25'),
    startTime: '15:00',
    endTime: '17:00',
    type: 'event',
    status: 'scheduled',
    location: 'Main auditorium',
    attendees: ['Students', 'Families', 'Donors', 'Board Members'],
    priority: 'high',
    notes: 'Invite major donors - great cultivation opportunity'
  },
  {
    id: '6',
    title: 'Coffee with Michael Chen',
    description: 'Informal check-in with board chair',
    date: new Date('2024-02-12'),
    startTime: '08:00',
    endTime: '09:00',
    type: 'meeting',
    status: 'completed',
    location: 'Starbucks downtown',
    priority: 'medium',
    relatedDonor: 'Michael Chen',
    notes: 'Discussed strategic planning retreat'
  },
  {
    id: '7',
    title: 'Volunteer Orientation',
    description: 'Monthly orientation for new volunteers',
    date: new Date('2024-02-28'),
    startTime: '18:30',
    endTime: '20:00',
    type: 'volunteer',
    status: 'scheduled',
    location: 'Training room',
    priority: 'medium',
    notes: '12 new volunteers signed up'
  },
  {
    id: '8',
    title: 'Anderson Trust Site Visit',
    description: 'Trustee visit to review program impact',
    date: new Date('2024-03-05'),
    startTime: '13:00',
    endTime: '16:00',
    type: 'meeting',
    status: 'scheduled',
    location: 'City Tutors facility',
    priority: 'high',
    relatedDonor: 'The Anderson Trust',
    amount: 75000,
    notes: 'Prepare student testimonials and impact data'
  },
  {
    id: '9',
    title: 'Spring Fundraising Gala',
    description: 'Annual fundraising gala - Hearts for Education',
    date: new Date('2024-03-15'),
    startTime: '18:00',
    endTime: '22:00',
    type: 'fundraiser',
    status: 'scheduled',
    location: 'Grand Ballroom Hotel',
    priority: 'high',
    notes: 'Goal: $200,000 raised. 300 attendees expected.'
  },
  {
    id: '10',
    title: 'Program Team Meeting',
    description: 'Weekly program coordination meeting',
    date: new Date('2024-02-14'),
    startTime: '09:00',
    endTime: '10:00',
    type: 'meeting',
    status: 'scheduled',
    priority: 'medium',
    notes: 'Review student progress reports'
  }
]

export default function CalendarPage() {
  const [events, setEvents] = useState<CalendarEvent[]>([])
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [formData, setFormData] = useState<Partial<CalendarEvent>>({
    title: '',
    description: '',
    type: 'meeting',
    status: 'scheduled',
    startTime: '',
    endTime: '',
    location: '',
    priority: 'medium',
    reminder: 30,
    notes: ''
  })

  // Load events from localStorage
  useEffect(() => {
    const storedEvents = localStorage.getItem('calendarEvents')
    if (storedEvents) {
      const parsed = JSON.parse(storedEvents)
      setEvents(parsed.map((e: any) => ({
        ...e,
        date: new Date(e.date)
      })))
    } else {
      setEvents(initialEvents)
      localStorage.setItem('calendarEvents', JSON.stringify(initialEvents))
    }
  }, [])

  // Save events to localStorage
  useEffect(() => {
    if (events.length > 0) {
      localStorage.setItem('calendarEvents', JSON.stringify(events))
    }
  }, [events])

  // Calendar utility functions
  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
  }

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay()
  }

  const isSameDay = (date1: Date, date2: Date) => {
    return date1.getDate() === date2.getDate() &&
           date1.getMonth() === date2.getMonth() &&
           date1.getFullYear() === date2.getFullYear()
  }

  const getEventsForDate = (date: Date) => {
    return events.filter(event => isSameDay(event.date, date))
  }

  const getUpcomingEvents = () => {
    const now = new Date()
    return events
      .filter(event => event.date >= now && event.status !== 'cancelled')
      .sort((a, b) => a.date.getTime() - b.date.getTime())
      .slice(0, 8)
  }

  const getEventTypeColor = (type: string) => {
    switch(type) {
      case 'meeting': return 'bg-blue-500'
      case 'call': return 'bg-teal-500'
      case 'deadline': return 'bg-red-500'
      case 'event': return 'bg-purple-500'
      case 'donation': return 'bg-emerald-500'
      case 'volunteer': return 'bg-orange-500'
      case 'board': return 'bg-yellow-500'
      case 'fundraiser': return 'bg-pink-500'
      default: return 'bg-gray-500'
    }
  }

  const getEventTypeIcon = (type: string) => {
    switch(type) {
      case 'meeting': return <Users className="h-4 w-4" />
      case 'call': return <Phone className="h-4 w-4" />
      case 'deadline': return <AlertCircle className="h-4 w-4" />
      case 'event': return <Star className="h-4 w-4" />
      case 'donation': return <DollarSign className="h-4 w-4" />
      case 'volunteer': return <HandHeart className="h-4 w-4" />
      case 'board': return <Building2 className="h-4 w-4" />
      case 'fundraiser': return <Trophy className="h-4 w-4" />
      default: return <Calendar className="h-4 w-4" />
    }
  }

  // Event management functions
  const handleAddEvent = () => {
    if (!formData.title || !selectedDate) return

    const newEvent: CalendarEvent = {
      id: Date.now().toString(),
      title: formData.title,
      description: formData.description || '',
      date: selectedDate,
      startTime: formData.startTime || '09:00',
      endTime: formData.endTime,
      type: formData.type || 'meeting',
      status: formData.status || 'scheduled',
      location: formData.location,
      priority: formData.priority || 'medium',
      reminder: formData.reminder,
      notes: formData.notes,
      relatedDonor: formData.relatedDonor,
      amount: formData.amount
    }

    setEvents([...events, newEvent])
    setIsAddDialogOpen(false)
    resetForm()
  }

  const handleUpdateEvent = () => {
    if (!selectedEvent || !formData.title) return

    const updatedEvents = events.map(event =>
      event.id === selectedEvent.id
        ? { ...event, ...formData, date: selectedDate }
        : event
    )
    setEvents(updatedEvents)
    setSelectedEvent({ ...selectedEvent, ...formData, date: selectedDate })
    setIsEditDialogOpen(false)
    resetForm()
  }

  const handleDeleteEvent = (id: string) => {
    if (confirm('Are you sure you want to delete this event?')) {
      setEvents(events.filter(e => e.id !== id))
      if (selectedEvent?.id === id) {
        setSelectedEvent(null)
        setIsViewDialogOpen(false)
      }
    }
  }

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      type: 'meeting',
      status: 'scheduled',
      startTime: '',
      endTime: '',
      location: '',
      priority: 'medium',
      reminder: 30,
      notes: ''
    })
  }

  const openEditDialog = (event: CalendarEvent) => {
    setSelectedEvent(event)
    setFormData(event)
    setSelectedDate(event.date)
    setIsEditDialogOpen(true)
    setIsViewDialogOpen(false)
  }

  const openViewDialog = (event: CalendarEvent) => {
    setSelectedEvent(event)
    setIsViewDialogOpen(true)
  }

  // Navigation functions
  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentMonth(prev => {
      const newMonth = new Date(prev)
      newMonth.setMonth(prev.getMonth() + (direction === 'next' ? 1 : -1))
      return newMonth
    })
  }

  const goToToday = () => {
    const today = new Date()
    setCurrentMonth(today)
    setSelectedDate(today)
  }

  // Calendar stats
  const calendarStats = {
    totalEvents: events.length,
    thisWeek: events.filter(e => {
      const weekStart = new Date()
      weekStart.setDate(weekStart.getDate() - weekStart.getDay())
      const weekEnd = new Date(weekStart)
      weekEnd.setDate(weekStart.getDate() + 6)
      return e.date >= weekStart && e.date <= weekEnd
    }).length,
    upcoming: getUpcomingEvents().length,
    overdue: events.filter(e => e.date < new Date() && e.status === 'scheduled' && e.type === 'deadline').length
  }

  // Generate calendar days
  const generateCalendarDays = () => {
    const daysInMonth = getDaysInMonth(currentMonth)
    const firstDay = getFirstDayOfMonth(currentMonth)
    const days = []

    // Empty cells for days before month starts
    for (let i = 0; i < firstDay; i++) {
      days.push(null)
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day)
    }

    return days
  }

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ]

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      {/* Header */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-4xl font-bold text-white">Calendar</h1>
          <div className="flex gap-3">
            <Button 
              onClick={goToToday}
              variant="outline" 
              className="bg-gray-800/50 border-white/20 text-white hover:bg-white/10"
            >
              Today
            </Button>
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Event
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-gray-900/95 backdrop-blur-md border-white/10 text-white max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Add New Event</DialogTitle>
                  <DialogDescription className="text-gray-400">
                    Create a new calendar event for {formatDate(selectedDate)}
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="title">Title</Label>
                      <Input
                        id="title"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        className="bg-gray-800/50 border-white/10 text-white"
                        placeholder="Event title"
                      />
                    </div>
                    <div>
                      <Label htmlFor="type">Type</Label>
                      <Select 
                        value={formData.type} 
                        onValueChange={(value: any) => setFormData({ ...formData, type: value })}
                      >
                        <SelectTrigger className="bg-gray-800/50 border-white/10 text-white">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-900 border-white/10">
                          <SelectItem value="meeting">Meeting</SelectItem>
                          <SelectItem value="call">Call</SelectItem>
                          <SelectItem value="deadline">Deadline</SelectItem>
                          <SelectItem value="event">Event</SelectItem>
                          <SelectItem value="donation">Donation</SelectItem>
                          <SelectItem value="volunteer">Volunteer</SelectItem>
                          <SelectItem value="board">Board</SelectItem>
                          <SelectItem value="fundraiser">Fundraiser</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      className="bg-gray-800/50 border-white/10 text-white"
                      placeholder="Event description"
                      rows={2}
                    />
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="startTime">Start Time</Label>
                      <Input
                        id="startTime"
                        type="time"
                        value={formData.startTime}
                        onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
                        className="bg-gray-800/50 border-white/10 text-white"
                      />
                    </div>
                    <div>
                      <Label htmlFor="endTime">End Time</Label>
                      <Input
                        id="endTime"
                        type="time"
                        value={formData.endTime}
                        onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
                        className="bg-gray-800/50 border-white/10 text-white"
                      />
                    </div>
                    <div>
                      <Label htmlFor="priority">Priority</Label>
                      <Select 
                        value={formData.priority} 
                        onValueChange={(value: any) => setFormData({ ...formData, priority: value })}
                      >
                        <SelectTrigger className="bg-gray-800/50 border-white/10 text-white">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-900 border-white/10">
                          <SelectItem value="low">Low</SelectItem>
                          <SelectItem value="medium">Medium</SelectItem>
                          <SelectItem value="high">High</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="location">Location</Label>
                      <Input
                        id="location"
                        value={formData.location}
                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                        className="bg-gray-800/50 border-white/10 text-white"
                        placeholder="Event location"
                      />
                    </div>
                    <div>
                      <Label htmlFor="reminder">Reminder (minutes)</Label>
                      <Input
                        id="reminder"
                        type="number"
                        value={formData.reminder}
                        onChange={(e) => setFormData({ ...formData, reminder: parseInt(e.target.value) })}
                        className="bg-gray-800/50 border-white/10 text-white"
                        placeholder="30"
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="notes">Notes</Label>
                    <Textarea
                      id="notes"
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      className="bg-gray-800/50 border-white/10 text-white"
                      placeholder="Additional notes"
                      rows={2}
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleAddEvent} className="bg-emerald-600 hover:bg-emerald-700">
                    Add Event
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          <Card className="bg-gray-900/50 backdrop-blur-md border-white/10">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">Total Events</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <Calendar className="h-4 w-4 text-emerald-400 mr-2" />
                <span className="text-2xl font-bold text-white">{calendarStats.totalEvents}</span>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gray-900/50 backdrop-blur-md border-white/10">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">This Week</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <Clock className="h-4 w-4 text-teal-400 mr-2" />
                <span className="text-2xl font-bold text-white">{calendarStats.thisWeek}</span>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gray-900/50 backdrop-blur-md border-white/10">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">Upcoming</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <Target className="h-4 w-4 text-cyan-400 mr-2" />
                <span className="text-2xl font-bold text-white">{calendarStats.upcoming}</span>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gray-900/50 backdrop-blur-md border-white/10">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">Overdue</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <AlertCircle className="h-4 w-4 text-red-400 mr-2" />
                <span className="text-2xl font-bold text-white">{calendarStats.overdue}</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Calendar View */}
        <div className="lg:col-span-3">
          <Card className="bg-gray-900/50 backdrop-blur-md border-white/10">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
              <div className="flex items-center gap-4">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => navigateMonth('prev')}
                  className="text-white hover:bg-white/10"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <CardTitle className="text-2xl font-bold text-white">
                  {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
                </CardTitle>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => navigateMonth('next')}
                  className="text-white hover:bg-white/10"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {/* Calendar Grid */}
              <div className="grid grid-cols-7 gap-1 mb-4">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                  <div key={day} className="p-2 text-center text-sm font-medium text-gray-400">
                    {day}
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-7 gap-1">
                {generateCalendarDays().map((day, index) => {
                  if (!day) {
                    return <div key={index} className="p-2 h-24"></div>
                  }

                  const cellDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day)
                  const dayEvents = getEventsForDate(cellDate)
                  const isToday = isSameDay(cellDate, new Date())
                  const isSelected = isSameDay(cellDate, selectedDate)

                  return (
                    <div
                      key={day}
                      onClick={() => setSelectedDate(cellDate)}
                      className={`p-2 h-24 border border-white/10 cursor-pointer transition-all hover:bg-white/5 ${
                        isToday ? 'bg-emerald-600/20 border-emerald-400' :
                        isSelected ? 'bg-blue-600/20 border-blue-400' : ''
                      }`}
                    >
                      <div className={`text-sm font-medium mb-1 ${
                        isToday ? 'text-emerald-400' : 'text-white'
                      }`}>
                        {day}
                      </div>
                      <div className="space-y-1">
                        {dayEvents.slice(0, 2).map(event => (
                          <div
                            key={event.id}
                            onClick={(e) => {
                              e.stopPropagation()
                              openViewDialog(event)
                            }}
                            className={`text-xs p-1 rounded truncate cursor-pointer hover:opacity-80 ${getEventTypeColor(event.type)} text-white`}
                          >
                            {event.title}
                          </div>
                        ))}
                        {dayEvents.length > 2 && (
                          <div className="text-xs text-gray-400">
                            +{dayEvents.length - 2} more
                          </div>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          <Card className="bg-gray-900/50 backdrop-blur-md border-white/10">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Clock className="h-5 w-5 text-emerald-400" />
                Upcoming Events
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 max-h-96 overflow-y-auto">
              {getUpcomingEvents().map(event => (
                <div
                  key={event.id}
                  onClick={() => openViewDialog(event)}
                  className="p-3 rounded-lg bg-gray-800/50 border border-white/10 cursor-pointer hover:bg-gray-700/50 transition-all"
                >
                  <div className="flex items-start gap-3">
                    <div className={`p-1.5 rounded text-white ${getEventTypeColor(event.type)}`}>
                      {getEventTypeIcon(event.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-white font-medium text-sm truncate">
                        {event.title}
                      </p>
                      <p className="text-gray-400 text-xs">
                        {formatDate(event.date)} at {event.startTime}
                      </p>
                      {event.location && (
                        <p className="text-gray-500 text-xs flex items-center gap-1 mt-1">
                          <MapPin className="h-3 w-3" />
                          {event.location}
                        </p>
                      )}
                    </div>
                    {event.priority === 'high' && (
                      <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                    )}
                  </div>
                </div>
              ))}
              {getUpcomingEvents().length === 0 && (
                <div className="text-center text-gray-400 py-8">
                  <Calendar className="h-8 w-8 mx-auto mb-2" />
                  <p>No upcoming events</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Event View Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="bg-gray-900/95 backdrop-blur-md border-white/10 text-white max-w-2xl">
          {selectedEvent && (
            <>
              <DialogHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <DialogTitle className="text-xl">{selectedEvent.title}</DialogTitle>
                    <DialogDescription className="text-gray-400 mt-1">
                      {formatDate(selectedEvent.date)} at {selectedEvent.startTime}
                      {selectedEvent.endTime && ` - ${selectedEvent.endTime}`}
                    </DialogDescription>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => openEditDialog(selectedEvent)}
                      className="text-white hover:bg-white/10"
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleDeleteEvent(selectedEvent.id)}
                      className="text-red-400 hover:bg-red-900/20"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </DialogHeader>
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <div className={`p-2 rounded ${getEventTypeColor(selectedEvent.type)} text-white`}>
                    {getEventTypeIcon(selectedEvent.type)}
                  </div>
                  <span className="text-white capitalize">{selectedEvent.type}</span>
                  <span className={`px-2 py-1 rounded text-xs ${
                    selectedEvent.priority === 'high' ? 'bg-red-600' :
                    selectedEvent.priority === 'medium' ? 'bg-yellow-600' :
                    'bg-green-600'
                  } text-white`}>
                    {selectedEvent.priority} priority
                  </span>
                </div>
                
                {selectedEvent.description && (
                  <div>
                    <h4 className="text-sm font-medium text-gray-400 mb-1">Description</h4>
                    <p className="text-white">{selectedEvent.description}</p>
                  </div>
                )}

                {selectedEvent.location && (
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-gray-400" />
                    <span className="text-white">{selectedEvent.location}</span>
                  </div>
                )}

                {selectedEvent.relatedDonor && (
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-gray-400" />
                    <span className="text-white">Related to: {selectedEvent.relatedDonor}</span>
                  </div>
                )}

                {selectedEvent.amount && (
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-4 w-4 text-emerald-400" />
                    <span className="text-emerald-400 font-medium">
                      ${selectedEvent.amount.toLocaleString()}
                    </span>
                  </div>
                )}

                {selectedEvent.notes && (
                  <div>
                    <h4 className="text-sm font-medium text-gray-400 mb-1">Notes</h4>
                    <p className="text-white text-sm bg-gray-800/50 p-3 rounded">
                      {selectedEvent.notes}
                    </p>
                  </div>
                )}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Event Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="bg-gray-900/95 backdrop-blur-md border-white/10 text-white max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Event</DialogTitle>
            <DialogDescription className="text-gray-400">
              Update event details
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="edit-title">Title</Label>
                <Input
                  id="edit-title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="bg-gray-800/50 border-white/10 text-white"
                />
              </div>
              <div>
                <Label htmlFor="edit-type">Type</Label>
                <Select 
                  value={formData.type} 
                  onValueChange={(value: any) => setFormData({ ...formData, type: value })}
                >
                  <SelectTrigger className="bg-gray-800/50 border-white/10 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-900 border-white/10">
                    <SelectItem value="meeting">Meeting</SelectItem>
                    <SelectItem value="call">Call</SelectItem>
                    <SelectItem value="deadline">Deadline</SelectItem>
                    <SelectItem value="event">Event</SelectItem>
                    <SelectItem value="donation">Donation</SelectItem>
                    <SelectItem value="volunteer">Volunteer</SelectItem>
                    <SelectItem value="board">Board</SelectItem>
                    <SelectItem value="fundraiser">Fundraiser</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <Label htmlFor="edit-description">Description</Label>
              <Textarea
                id="edit-description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="bg-gray-800/50 border-white/10 text-white"
                rows={2}
              />
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label htmlFor="edit-startTime">Start Time</Label>
                <Input
                  id="edit-startTime"
                  type="time"
                  value={formData.startTime}
                  onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
                  className="bg-gray-800/50 border-white/10 text-white"
                />
              </div>
              <div>
                <Label htmlFor="edit-endTime">End Time</Label>
                <Input
                  id="edit-endTime"
                  type="time"
                  value={formData.endTime}
                  onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
                  className="bg-gray-800/50 border-white/10 text-white"
                />
              </div>
              <div>
                <Label htmlFor="edit-priority">Priority</Label>
                <Select 
                  value={formData.priority} 
                  onValueChange={(value: any) => setFormData({ ...formData, priority: value })}
                >
                  <SelectTrigger className="bg-gray-800/50 border-white/10 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-900 border-white/10">
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <Label htmlFor="edit-location">Location</Label>
              <Input
                id="edit-location"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="bg-gray-800/50 border-white/10 text-white"
              />
            </div>
            <div>
              <Label htmlFor="edit-notes">Notes</Label>
              <Textarea
                id="edit-notes"
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                className="bg-gray-800/50 border-white/10 text-white"
                rows={2}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleUpdateEvent} className="bg-emerald-600 hover:bg-emerald-700">
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}