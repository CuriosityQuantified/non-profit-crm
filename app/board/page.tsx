/**
 * File: board/page.tsx
 * Purpose: Board member management with boardroom table visualization
 * Features: Visual boardroom table, CRUD operations, member details panel
 */

"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
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
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { formatCurrency, formatDate } from "@/lib/utils"
import { 
  Users, 
  Plus, 
  Edit, 
  Save,
  X,
  DollarSign,
  Calendar,
  Building2,
  Phone,
  Mail,
  User,
  Trophy,
  Target,
  AlertCircle,
  CheckCircle2,
  UserPlus,
  Trash2,
  Crown,
  Star,
  Award,
  Coins,
  FileText
} from "lucide-react"

// Board Member interface
interface BoardMember {
  id: string
  name: string
  avatarUrl?: string
  position: 'chair' | 'vice-chair' | 'treasurer' | 'secretary' | 'member'
  seatNumber: number
  termStart: Date
  termEnd: Date
  attendance: number // percentage
  donationTotal: number
  committees: string[]
  email: string
  phone: string
  company: string
  title: string
  notes: string
  status: 'active' | 'inactive' | 'emeritus'
  // Extended information
  background?: string
  expertise?: string[]
  connections?: string
  personalInterests?: string
  familyInfo?: string
  givingHistory?: string
  boardContributions?: string
  futureGoals?: string
  lastInteraction?: Date
  preferredContact?: 'email' | 'phone' | 'text' | 'in-person'
}

// Sample board members data
const initialBoardMembers: BoardMember[] = [
  {
    id: '1',
    name: 'Michael Chen',
    avatarUrl: '',
    position: 'chair',
    seatNumber: 0,
    termStart: new Date('2022-01-01'),
    termEnd: new Date('2025-12-31'),
    attendance: 95,
    donationTotal: 50000,
    committees: ['Executive', 'Finance', 'Governance'],
    email: 'mchen@example.com',
    phone: '(410) 555-0001',
    company: 'Chen Enterprises',
    title: 'CEO',
    notes: 'Strong advocate for STEM education. Has connections to several tech companies for potential partnerships.',
    status: 'active',
    background: 'Founded Chen Enterprises in 2010, grew it from startup to $50M revenue. Previously worked at Microsoft for 10 years in product development. MBA from Wharton, BS Computer Science from MIT.',
    expertise: ['Technology', 'Strategic Planning', 'Fundraising', 'Board Governance'],
    connections: 'Strong ties to tech community, especially Microsoft, Google, and local startup ecosystem. Knows mayor personally from college. Connected to several family foundations focused on education.',
    personalInterests: 'Marathon runner, youth basketball coach for his daughter\'s team, passionate about educational equity and STEM access for underserved communities.',
    familyInfo: 'Married to Dr. Lisa Chen (pediatrician at Johns Hopkins), two daughters (ages 12 and 15) who both volunteer with City Tutors during summers.',
    givingHistory: 'Started with $5,000 annual gift in 2020, increased to $15,000 in 2021, then $50,000 annually since 2022. Also secured $25,000 corporate match from Chen Enterprises.',
    boardContributions: 'Led strategic planning process resulting in 3-year growth plan. Recruited 3 new major donors totaling $150,000. Chairs governance committee, modernized board policies and bylaws.',
    futureGoals: 'Wants to establish endowment fund, explore national expansion model, create corporate partnership program with tech companies.',
    lastInteraction: new Date('2024-01-10'),
    preferredContact: 'phone'
  },
  {
    id: '2',
    name: 'Sarah Williams',
    avatarUrl: '',
    position: 'vice-chair',
    seatNumber: 1,
    termStart: new Date('2023-01-01'),
    termEnd: new Date('2026-12-31'),
    attendance: 88,
    donationTotal: 35000,
    committees: ['Executive', 'Development'],
    email: 'swilliams@example.com',
    phone: '(410) 555-0002',
    company: 'Williams Foundation',
    title: 'Executive Director',
    notes: 'Excellent fundraiser with deep community connections.',
    status: 'active',
    background: '20+ years in nonprofit sector. Previously Development Director at United Way of Central Maryland. Managed Williams Foundation since 2018, distributing $5M annually to education causes.',
    expertise: ['Fundraising', 'Grant Writing', 'Donor Relations', 'Event Planning'],
    connections: 'Extensive network among Baltimore philanthropists. Board member of Association of Baltimore Area Grantmakers. Close relationships with Weinberg, Abell, and Casey Foundations.',
    personalInterests: 'Art collector, serves on Baltimore Museum of Art auxiliary board, passionate about arts integration in education, loves hosting dinner parties to connect donors.',
    familyInfo: 'Married to Thomas Williams (retired judge), one son at Yale Law School who plans to do education policy work.',
    givingHistory: 'Personal giving of $10,000 annually, plus $25,000 from Williams Foundation. Has directed additional $75,000 in grants to City Tutors from other foundations.',
    boardContributions: 'Organized annual gala raising $200,000. Wrote successful $100,000 grant proposal. Mentoring two newer board members on fundraising.',
    futureGoals: 'Develop major gifts program, create planned giving society, establish relationships with corporate sponsors.',
    lastInteraction: new Date('2024-01-12'),
    preferredContact: 'email'
  },
  {
    id: '3',
    name: 'Robert Johnson',
    avatarUrl: '',
    position: 'treasurer',
    seatNumber: 2,
    termStart: new Date('2021-01-01'),
    termEnd: new Date('2024-12-31'),
    attendance: 92,
    donationTotal: 25000,
    committees: ['Finance', 'Audit'],
    email: 'rjohnson@example.com',
    phone: '(410) 555-0003',
    company: 'Johnson & Associates CPAs',
    title: 'Managing Partner',
    notes: 'CPA with extensive nonprofit financial experience.',
    status: 'active',
    background: 'CPA with 25 years experience. Built Johnson & Associates from solo practice to 15-person firm. Specializes in nonprofit audits and 990 preparation. Former IRS agent.',
    expertise: ['Nonprofit Finance', 'Tax Law', 'Audit', 'Financial Planning'],
    connections: 'Works with 30+ nonprofits in Baltimore area. Strong relationships with foundation CFOs. Member of Maryland Association of CPAs nonprofit committee.',
    personalInterests: 'Golf enthusiast, coaches youth soccer, passionate about financial literacy education for underserved youth.',
    familyInfo: 'Married to Maria Johnson (teacher), three children, eldest daughter is CPA joining the family firm.',
    givingHistory: 'Consistent $10,000 annual donor since 2021, provides $15,000 in pro bono accounting services annually.',
    boardContributions: 'Implemented new financial controls, reduced audit fees by 40%, established investment policy for reserves.',
    futureGoals: 'Create financial dashboard for board, establish audit committee, explore earned revenue opportunities.',
    lastInteraction: new Date('2024-01-08'),
    preferredContact: 'email'
  },
  {
    id: '4',
    name: 'Emily Davis',
    avatarUrl: '',
    position: 'secretary',
    seatNumber: 3,
    termStart: new Date('2023-06-01'),
    termEnd: new Date('2026-05-31'),
    attendance: 96,
    donationTotal: 15000,
    committees: ['Governance', 'Marketing'],
    email: 'edavis@example.com',
    phone: '(410) 555-0004',
    company: 'Davis Law Firm',
    title: 'Partner',
    notes: 'Provides pro bono legal counsel. Very detail-oriented.',
    status: 'active'
  },
  {
    id: '5',
    name: 'James Martinez',
    avatarUrl: '',
    position: 'member',
    seatNumber: 4,
    termStart: new Date('2024-01-01'),
    termEnd: new Date('2027-12-31'),
    attendance: 85,
    donationTotal: 20000,
    committees: ['Programs', 'Development'],
    email: 'jmartinez@example.com',
    phone: '(410) 555-0005',
    company: 'Martinez Realty',
    title: 'Broker',
    notes: 'New board member, very enthusiastic. Has offered office space for events.',
    status: 'active'
  },
  {
    id: '6',
    name: 'Linda Thompson',
    avatarUrl: '',
    position: 'member',
    seatNumber: 5,
    termStart: new Date('2022-01-01'),
    termEnd: new Date('2025-12-31'),
    attendance: 78,
    donationTotal: 30000,
    committees: ['Marketing', 'Events'],
    email: 'lthompson@example.com',
    phone: '(410) 555-0006',
    company: 'Thompson Media Group',
    title: 'President',
    notes: 'Helps with PR and media coverage. Great event planner.',
    status: 'active'
  },
  {
    id: '7',
    name: 'David Brown',
    avatarUrl: '',
    position: 'member',
    seatNumber: 6,
    termStart: new Date('2023-01-01'),
    termEnd: new Date('2026-12-31'),
    attendance: 90,
    donationTotal: 40000,
    committees: ['Finance', 'Programs'],
    email: 'dbrown@example.com',
    phone: '(410) 555-0007',
    company: 'Brown Investment Partners',
    title: 'Managing Director',
    notes: 'Strong financial acumen. Interested in endowment building.',
    status: 'active'
  },
  {
    id: '8',
    name: 'Patricia Garcia',
    avatarUrl: '',
    position: 'member',
    seatNumber: 7,
    termStart: new Date('2021-06-01'),
    termEnd: new Date('2024-05-31'),
    attendance: 82,
    donationTotal: 18000,
    committees: ['Programs', 'Evaluation'],
    email: 'pgarcia@example.com',
    phone: '(410) 555-0008',
    company: 'Baltimore City Schools',
    title: 'Principal',
    notes: 'Former educator. Provides valuable program insights.',
    status: 'active'
  }
]

// Calculate seat positions around an oval table (dynamically adjusts to number of members)
const calculateSeatPosition = (seatNumber: number, totalSeats: number) => {
  const angle = (seatNumber * 2 * Math.PI) / totalSeats - Math.PI / 2 // Start from top
  const radiusX = 280 // Horizontal radius
  const radiusY = 180 // Vertical radius
  const centerX = 400 // Center of SVG
  const centerY = 250 // Center of SVG
  
  return {
    x: centerX + radiusX * Math.cos(angle),
    y: centerY + radiusY * Math.sin(angle)
  }
}

export default function BoardPage() {
  const [boardMembers, setBoardMembers] = useState<BoardMember[]>([])
  const [selectedMember, setSelectedMember] = useState<BoardMember | null>(null)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [formData, setFormData] = useState<Partial<BoardMember>>({
    name: '',
    position: 'member',
    email: '',
    phone: '',
    company: '',
    title: '',
    notes: '',
    committees: [],
    attendance: 85,
    donationTotal: 0,
    status: 'active'
  })

  // Load board members from localStorage on mount
  useEffect(() => {
    const storedMembers = localStorage.getItem('boardMembers')
    if (storedMembers) {
      const parsed = JSON.parse(storedMembers)
      setBoardMembers(parsed.map((m: any) => ({
        ...m,
        termStart: new Date(m.termStart),
        termEnd: new Date(m.termEnd)
      })))
    } else {
      setBoardMembers(initialBoardMembers)
      localStorage.setItem('boardMembers', JSON.stringify(initialBoardMembers))
    }
  }, [])

  // Save to localStorage whenever board members change
  useEffect(() => {
    if (boardMembers.length > 0) {
      localStorage.setItem('boardMembers', JSON.stringify(boardMembers))
    }
  }, [boardMembers])

  // Add new board member
  const handleAddMember = () => {
    const newMember: BoardMember = {
      id: Date.now().toString(),
      name: formData.name || 'New Member',
      avatarUrl: formData.avatarUrl || '',
      position: formData.position || 'member',
      seatNumber: boardMembers.length,
      termStart: new Date(),
      termEnd: new Date(new Date().setFullYear(new Date().getFullYear() + 3)),
      attendance: formData.attendance || 85,
      donationTotal: formData.donationTotal || 0,
      committees: formData.committees || [],
      email: formData.email || '',
      phone: formData.phone || '',
      company: formData.company || '',
      title: formData.title || '',
      notes: formData.notes || '',
      status: formData.status || 'active'
    }
    setBoardMembers([...boardMembers, newMember])
    setIsAddDialogOpen(false)
    resetForm()
  }

  // Update existing board member
  const handleUpdateMember = () => {
    if (!selectedMember) return
    
    const updatedMembers = boardMembers.map(member => 
      member.id === selectedMember.id 
        ? { ...member, ...formData }
        : member
    )
    setBoardMembers(updatedMembers)
    setIsEditDialogOpen(false)
    setSelectedMember({ ...selectedMember, ...formData })
    resetForm()
  }

  // Delete board member
  const handleDeleteMember = (id: string) => {
    if (confirm('Are you sure you want to remove this board member?')) {
      setBoardMembers(boardMembers.filter(m => m.id !== id))
      if (selectedMember?.id === id) {
        setSelectedMember(null)
      }
    }
  }

  // Reset form
  const resetForm = () => {
    setFormData({
      name: '',
      position: 'member',
      email: '',
      phone: '',
      company: '',
      title: '',
      notes: '',
      committees: [],
      attendance: 85,
      donationTotal: 0,
      status: 'active'
    })
  }

  // Open edit dialog with member data
  const openEditDialog = (member: BoardMember) => {
    setFormData(member)
    setIsEditDialogOpen(true)
  }

  // Calculate board statistics
  const boardStats = {
    totalMembers: boardMembers.length,
    averageAttendance: Math.round(boardMembers.reduce((acc, m) => acc + m.attendance, 0) / boardMembers.length),
    totalDonations: boardMembers.reduce((acc, m) => acc + m.donationTotal, 0),
    termsExpiringSoon: boardMembers.filter(m => {
      const monthsUntilExpiry = (m.termEnd.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24 * 30)
      return monthsUntilExpiry <= 6 && monthsUntilExpiry > 0
    }).length
  }

  // Filter board members for search
  const filteredMembers = boardMembers.filter(member =>
    member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.company.toLowerCase().includes(searchTerm.toLowerCase())
  )

  // Get position color
  const getPositionColor = (position: string) => {
    switch(position) {
      case 'chair': return 'ring-yellow-400'
      case 'vice-chair': return 'ring-blue-400'
      case 'treasurer': return 'ring-emerald-400'
      case 'secretary': return 'ring-purple-400'
      default: return 'ring-white'
    }
  }

  // Get position icon
  const getPositionIcon = (position: string) => {
    switch(position) {
      case 'chair': return <Crown className="h-3 w-3" />
      case 'vice-chair': return <Award className="h-3 w-3" />
      case 'treasurer': return <Coins className="h-3 w-3" />
      case 'secretary': return <FileText className="h-3 w-3" />
      default: return null
    }
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      {/* Header with stats */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-4xl font-bold text-white">Board Members</h1>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">
                <UserPlus className="mr-2 h-4 w-4" />
                Add Board Member
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-gray-900/95 backdrop-blur-md border-white/10 text-white max-w-2xl">
              <DialogHeader>
                <DialogTitle>Add New Board Member</DialogTitle>
                <DialogDescription className="text-gray-400">
                  Add a new member to your board of directors
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="bg-gray-800/50 border-white/10 text-white"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <Label htmlFor="position">Position</Label>
                    <Select 
                      value={formData.position} 
                      onValueChange={(value: any) => setFormData({ ...formData, position: value })}
                    >
                      <SelectTrigger className="bg-gray-800/50 border-white/10 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-900 border-white/10">
                        <SelectItem value="chair">Chair</SelectItem>
                        <SelectItem value="vice-chair">Vice Chair</SelectItem>
                        <SelectItem value="treasurer">Treasurer</SelectItem>
                        <SelectItem value="secretary">Secretary</SelectItem>
                        <SelectItem value="member">Member</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="bg-gray-800/50 border-white/10 text-white"
                      placeholder="john@example.com"
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="bg-gray-800/50 border-white/10 text-white"
                      placeholder="(555) 123-4567"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="company">Company</Label>
                    <Input
                      id="company"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      className="bg-gray-800/50 border-white/10 text-white"
                      placeholder="Acme Corp"
                    />
                  </div>
                  <div>
                    <Label htmlFor="title">Title</Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      className="bg-gray-800/50 border-white/10 text-white"
                      placeholder="CEO"
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
                    placeholder="Additional notes about this board member..."
                    rows={3}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddMember} className="bg-emerald-600 hover:bg-emerald-700">
                  Add Member
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          <Card className="bg-gray-900/50 backdrop-blur-md border-white/10">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">Total Members</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <Users className="h-4 w-4 text-emerald-400 mr-2" />
                <span className="text-2xl font-bold text-white">{boardStats.totalMembers}</span>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gray-900/50 backdrop-blur-md border-white/10">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">Avg Attendance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <CheckCircle2 className="h-4 w-4 text-teal-400 mr-2" />
                <span className="text-2xl font-bold text-white">{boardStats.averageAttendance}%</span>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gray-900/50 backdrop-blur-md border-white/10">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">Total Giving</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <DollarSign className="h-4 w-4 text-cyan-400 mr-2" />
                <span className="text-2xl font-bold text-white">{formatCurrency(boardStats.totalDonations)}</span>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gray-900/50 backdrop-blur-md border-white/10">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">Terms Expiring</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <AlertCircle className="h-4 w-4 text-yellow-400 mr-2" />
                <span className="text-2xl font-bold text-white">{boardStats.termsExpiringSoon}</span>
                <span className="text-xs text-gray-400 ml-2">next 6 mo</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Main content area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Boardroom Table Visualization */}
        <div className="lg:col-span-2">
          <Card className="bg-gray-900/50 backdrop-blur-md border-white/10">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div className="bg-gray-800/50 rounded-lg px-4 py-2 border border-white/10">
                <div className="flex items-center gap-5">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                    <span className="text-xs text-gray-300">Chair</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-blue-400"></div>
                    <span className="text-xs text-gray-300">Vice Chair</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-emerald-400"></div>
                    <span className="text-xs text-gray-300">Treasurer</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-purple-400"></div>
                    <span className="text-xs text-gray-300">Secretary</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-white"></div>
                    <span className="text-xs text-gray-300">Member</span>
                  </div>
                </div>
              </div>
              <Button 
                size="sm" 
                onClick={() => setIsAddDialogOpen(true)}
                className="bg-emerald-600 hover:bg-emerald-700 text-white"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Member
              </Button>
            </CardHeader>
            <CardContent>
              <TooltipProvider>
                <svg width="100%" viewBox="0 0 800 500" className="mx-auto">
                  {/* Boardroom table */}
                  <ellipse
                    cx="400"
                    cy="250"
                    rx="240"
                    ry="140"
                    fill="none"
                    stroke="rgba(255,255,255,0.1)"
                    strokeWidth="2"
                    className="backdrop-blur-sm"
                  />
                  <ellipse
                    cx="400"
                    cy="250"
                    rx="240"
                    ry="140"
                    fill="rgba(16,185,129,0.05)"
                    className="backdrop-blur-sm"
                  />
                  
                  {/* Board member seats - dynamically positioned */}
                  {boardMembers.map((member, index) => {
                    const position = calculateSeatPosition(index, boardMembers.length)
                    const isSelected = selectedMember?.id === member.id
                    
                    return (
                      <g key={member.id}>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <g
                              className="cursor-pointer"
                              onClick={() => setSelectedMember(member)}
                            >
                              {/* Outer ring for position */}
                              <rect
                                x={position.x - 55}
                                y={position.y - 45}
                                width="110"
                                height="90"
                                rx="8"
                                fill={isSelected ? "rgba(16,185,129,0.1)" : "rgba(255,255,255,0.02)"}
                                stroke={
                                  isSelected ? "rgba(16,185,129,0.8)" :
                                  member.position === 'chair' ? "#fbbf24" :
                                  member.position === 'vice-chair' ? "#60a5fa" :
                                  member.position === 'treasurer' ? "#10b981" :
                                  member.position === 'secretary' ? "#a78bfa" :
                                  "#ffffff"
                                }
                                strokeWidth={isSelected ? "2" : "1"}
                                className="transition-all hover:fill-opacity-20"
                              />
                              
                              {/* Human silhouette outline - bigger */}
                              <path
                                d={`M ${position.x} ${position.y - 20} 
                                    c -7 0 -12 -5 -12 -12
                                    c 0 -7 5 -12 12 -12
                                    c 7 0 12 5 12 12
                                    c 0 7 -5 12 -12 12
                                    m -16 6
                                    c 0 -4 7 -10 16 -10
                                    c 9 0 16 6 16 10
                                    l 0 14
                                    l -32 0
                                    z`}
                                fill="none"
                                stroke="rgba(255,255,255,0.6)"
                                strokeWidth="1.5"
                                className="pointer-events-none"
                              />
                              
                              {/* Member first name */}
                              <text
                                x={position.x}
                                y={position.y + 18}
                                textAnchor="middle"
                                className="fill-white font-bold pointer-events-none"
                                style={{ fontSize: '12px' }}
                              >
                                {member.name.split(' ')[0]}
                              </text>
                              
                              {/* Member last name */}
                              <text
                                x={position.x}
                                y={position.y + 32}
                                textAnchor="middle"
                                className="fill-white font-bold pointer-events-none"
                                style={{ fontSize: '12px' }}
                              >
                                {member.name.split(' ').slice(1).join(' ')}
                              </text>
                              
                              {/* Position icon - top left */}
                              {getPositionIcon(member.position) && (
                                <g transform={`translate(${position.x - 52}, ${position.y - 42})`}>
                                  <foreignObject x="0" y="0" width="12" height="12">
                                    <div className={
                                      member.position === 'chair' ? 'text-yellow-400' :
                                      member.position === 'vice-chair' ? 'text-blue-400' :
                                      member.position === 'treasurer' ? 'text-emerald-400' :
                                      member.position === 'secretary' ? 'text-purple-400' :
                                      'text-white'
                                    }>
                                      {getPositionIcon(member.position)}
                                    </div>
                                  </foreignObject>
                                </g>
                              )}
                            </g>
                          </TooltipTrigger>
                          <TooltipContent className="bg-gray-900 border-white/10">
                            <div className="text-white">
                              <p className="font-bold">{member.name}</p>
                              <p className="text-sm text-gray-400">{member.position}</p>
                              <p className="text-sm">Attendance: {member.attendance}%</p>
                            </div>
                          </TooltipContent>
                        </Tooltip>
                      </g>
                    )
                  })}
                </svg>
              </TooltipProvider>
            </CardContent>
          </Card>
        </div>

        {/* Member Details Panel */}
        <div className="lg:col-span-1">
          {selectedMember ? (
            <Card className="bg-gray-900/50 backdrop-blur-md border-white/10 max-h-[calc(100vh-200px)] overflow-y-auto">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-white text-xl">{selectedMember.name}</CardTitle>
                    <Badge className="mt-2" variant={selectedMember.status === 'active' ? 'default' : 'secondary'}>
                      {selectedMember.position}
                    </Badge>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => openEditDialog(selectedMember)}
                      className="text-white hover:bg-white/10"
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleDeleteMember(selectedMember.id)}
                      className="text-red-400 hover:bg-red-900/20"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Contact Information */}
                <div className="space-y-2">
                  <h3 className="text-sm font-semibold text-gray-400">Contact Information</h3>
                  <div className="space-y-1">
                    <div className="flex items-center text-white">
                      <Mail className="h-4 w-4 mr-2 text-gray-400" />
                      <span className="text-sm">{selectedMember.email}</span>
                    </div>
                    <div className="flex items-center text-white">
                      <Phone className="h-4 w-4 mr-2 text-gray-400" />
                      <span className="text-sm">{selectedMember.phone}</span>
                    </div>
                    <div className="flex items-center text-white">
                      <Building2 className="h-4 w-4 mr-2 text-gray-400" />
                      <span className="text-sm">{selectedMember.company}</span>
                    </div>
                    <div className="flex items-center text-white">
                      <User className="h-4 w-4 mr-2 text-gray-400" />
                      <span className="text-sm">{selectedMember.title}</span>
                    </div>
                    {selectedMember.preferredContact && (
                      <div className="flex items-center text-white">
                        <CheckCircle2 className="h-4 w-4 mr-2 text-gray-400" />
                        <span className="text-sm">Prefers: {selectedMember.preferredContact}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Board Service */}
                <div className="space-y-2">
                  <h3 className="text-sm font-semibold text-gray-400">Board Service</h3>
                  <div className="space-y-1">
                    <div className="flex justify-between text-white text-sm">
                      <span className="text-gray-400">Term:</span>
                      <span>{formatDate(selectedMember.termStart)} - {formatDate(selectedMember.termEnd)}</span>
                    </div>
                    <div className="flex justify-between text-white text-sm">
                      <span className="text-gray-400">Attendance:</span>
                      <span className={selectedMember.attendance >= 90 ? 'text-green-400' : selectedMember.attendance >= 75 ? 'text-yellow-400' : 'text-red-400'}>
                        {selectedMember.attendance}%
                      </span>
                    </div>
                    <div className="flex justify-between text-white text-sm">
                      <span className="text-gray-400">Total Giving:</span>
                      <span className="text-emerald-400">{formatCurrency(selectedMember.donationTotal)}</span>
                    </div>
                    {selectedMember.lastInteraction && (
                      <div className="flex justify-between text-white text-sm">
                        <span className="text-gray-400">Last Contact:</span>
                        <span>{formatDate(selectedMember.lastInteraction)}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Committees */}
                {selectedMember.committees.length > 0 && (
                  <div className="space-y-2">
                    <h3 className="text-sm font-semibold text-gray-400">Committees</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedMember.committees.map((committee) => (
                        <Badge key={committee} variant="outline" className="text-white border-white/20">
                          {committee}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {/* Expertise */}
                {selectedMember.expertise && selectedMember.expertise.length > 0 && (
                  <div className="space-y-2">
                    <h3 className="text-sm font-semibold text-gray-400">Areas of Expertise</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedMember.expertise.map((skill) => (
                        <Badge key={skill} className="bg-cyan-900/50 text-cyan-300 border-cyan-500/20">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {/* Extended information without divider */}
                <div className="border-t border-white/10 pt-4">
                </div>

                {/* Background */}
                {selectedMember.background && (
                  <div className="space-y-2">
                    <h3 className="text-sm font-semibold text-gray-400">Professional Background</h3>
                    <p className="text-sm text-white leading-relaxed">{selectedMember.background}</p>
                  </div>
                )}

                {/* Connections */}
                {selectedMember.connections && (
                  <div className="space-y-2">
                    <h3 className="text-sm font-semibold text-gray-400">Key Connections</h3>
                    <p className="text-sm text-white leading-relaxed">{selectedMember.connections}</p>
                  </div>
                )}

                {/* Giving History */}
                {selectedMember.givingHistory && (
                  <div className="space-y-2">
                    <h3 className="text-sm font-semibold text-gray-400">Giving History</h3>
                    <p className="text-sm text-white leading-relaxed">{selectedMember.givingHistory}</p>
                  </div>
                )}

                {/* Board Contributions */}
                {selectedMember.boardContributions && (
                  <div className="space-y-2">
                    <h3 className="text-sm font-semibold text-gray-400">Board Contributions</h3>
                    <p className="text-sm text-white leading-relaxed">{selectedMember.boardContributions}</p>
                  </div>
                )}

                {/* Personal Information */}
                {selectedMember.personalInterests && (
                  <div className="space-y-2">
                    <h3 className="text-sm font-semibold text-gray-400">Personal Interests</h3>
                    <p className="text-sm text-white leading-relaxed">{selectedMember.personalInterests}</p>
                  </div>
                )}

                {/* Family Information */}
                {selectedMember.familyInfo && (
                  <div className="space-y-2">
                    <h3 className="text-sm font-semibold text-gray-400">Family</h3>
                    <p className="text-sm text-white leading-relaxed">{selectedMember.familyInfo}</p>
                  </div>
                )}

                {/* Future Goals */}
                {selectedMember.futureGoals && (
                  <div className="space-y-2">
                    <h3 className="text-sm font-semibold text-gray-400">Future Goals & Vision</h3>
                    <p className="text-sm text-white leading-relaxed">{selectedMember.futureGoals}</p>
                  </div>
                )}

                {/* Notes */}
                {selectedMember.notes && (
                  <div className="space-y-2">
                    <h3 className="text-sm font-semibold text-gray-400">Quick Notes</h3>
                    <p className="text-sm text-white leading-relaxed">{selectedMember.notes}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          ) : (
            <Card className="bg-gray-900/50 backdrop-blur-md border-white/10">
              <CardContent className="flex flex-col items-center justify-center h-96 text-gray-400">
                <Users className="h-12 w-12 mb-4" />
                <p className="text-center">Click on a board member to view details</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="bg-gray-900/95 backdrop-blur-md border-white/10 text-white max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Board Member</DialogTitle>
            <DialogDescription className="text-gray-400">
              Update board member information
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="edit-name">Name</Label>
                <Input
                  id="edit-name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="bg-gray-800/50 border-white/10 text-white"
                />
              </div>
              <div>
                <Label htmlFor="edit-position">Position</Label>
                <Select 
                  value={formData.position} 
                  onValueChange={(value: any) => setFormData({ ...formData, position: value })}
                >
                  <SelectTrigger className="bg-gray-800/50 border-white/10 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-900 border-white/10">
                    <SelectItem value="chair">Chair</SelectItem>
                    <SelectItem value="vice-chair">Vice Chair</SelectItem>
                    <SelectItem value="treasurer">Treasurer</SelectItem>
                    <SelectItem value="secretary">Secretary</SelectItem>
                    <SelectItem value="member">Member</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="edit-email">Email</Label>
                <Input
                  id="edit-email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="bg-gray-800/50 border-white/10 text-white"
                />
              </div>
              <div>
                <Label htmlFor="edit-phone">Phone</Label>
                <Input
                  id="edit-phone"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="bg-gray-800/50 border-white/10 text-white"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="edit-company">Company</Label>
                <Input
                  id="edit-company"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  className="bg-gray-800/50 border-white/10 text-white"
                />
              </div>
              <div>
                <Label htmlFor="edit-title">Title</Label>
                <Input
                  id="edit-title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="bg-gray-800/50 border-white/10 text-white"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="edit-notes">Notes</Label>
              <Textarea
                id="edit-notes"
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                className="bg-gray-800/50 border-white/10 text-white"
                rows={3}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleUpdateMember} className="bg-emerald-600 hover:bg-emerald-700">
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}