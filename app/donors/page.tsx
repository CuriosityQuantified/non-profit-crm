/**
 * File: donors/page.tsx
 * Purpose: Donor management page with list view and detail panel
 * Used by: Main navigation
 */

"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { type Donor } from "@/components/donor-card"
import { formatCurrency, formatDate } from "@/lib/utils"
import { 
  Search, 
  Plus, 
  Users, 
  DollarSign, 
  Calendar,
  Building2,
  Phone,
  Mail,
  TrendingUp,
  User,
  Edit,
  Save,
  X,
  MessageSquare,
  Target,
  Heart,
  Clock
} from "lucide-react"

// Extended donor interface with notes and interactions
interface ExtendedDonor extends Donor {
  notes?: string
  interactions?: Array<{
    id: number
    date: Date
    type: 'call' | 'email' | 'meeting' | 'donation'
    summary: string
  }>
  plans?: string
  thoughts?: string
}

// Hardcoded donor data with notes
const donors: ExtendedDonor[] = [
  {
    id: 1,
    name: "Sarah Johnson",
    organization: "Johnson & Associates",
    email: "sarah@johnsonassoc.com",
    phone: "(555) 123-4567",
    totalGiven: 125000,
    lastGiftDate: new Date("2024-01-15"),
    lastGiftAmount: 25000,
    notes: "Sarah is passionate about education equity. Her daughter attended City Tutors programs 10 years ago. Prefers phone calls over email.",
    interactions: [
      { id: 1, date: new Date("2024-01-15"), type: "donation", summary: "Donated $25,000 for spring program expansion" },
      { id: 2, date: new Date("2024-01-10"), type: "call", summary: "Discussed impact of her previous donations" },
      { id: 3, date: new Date("2023-12-05"), type: "meeting", summary: "Annual donor appreciation dinner - brought her daughter" }
    ],
    plans: "Schedule quarterly check-ins. Invite to student showcase in March.",
    thoughts: "Consider for board position in 2025. Very engaged and brings valuable perspective."
  },
  {
    id: 2,
    name: "Michael Chen",
    organization: "Chen Tech Solutions",
    email: "mchen@chentech.com",
    phone: "(555) 234-5678",
    totalGiven: 85000,
    lastGiftDate: new Date("2024-01-20"),
    lastGiftAmount: 10000,
    notes: "Tech entrepreneur who believes in STEM education. Interested in funding coding workshops. Best reached early mornings.",
    interactions: [
      { id: 1, date: new Date("2024-01-20"), type: "donation", summary: "Sponsored new computer lab - $10,000" },
      { id: 2, date: new Date("2024-01-05"), type: "email", summary: "Sent proposal for tech mentorship program" },
      { id: 3, date: new Date("2023-11-15"), type: "meeting", summary: "Tour of tutoring facilities with his team" }
    ],
    plans: "Propose partnership for summer coding camp. Connect with our IT needs assessment.",
    thoughts: "Could be instrumental in modernizing our tech infrastructure. Has connections in Silicon Valley."
  },
  {
    id: 3,
    name: "Williams Foundation",
    organization: null,
    email: "info@williamsfoundation.org",
    phone: "(555) 345-6789",
    totalGiven: 250000,
    lastGiftDate: new Date("2024-01-10"),
    lastGiftAmount: 50000,
    notes: "Family foundation focused on youth development. Requires detailed impact reports. Grant applications due in Q3.",
    interactions: [
      { id: 1, date: new Date("2024-01-10"), type: "donation", summary: "Q1 grant installment - $50,000" },
      { id: 2, date: new Date("2023-12-01"), type: "email", summary: "Submitted annual impact report" },
      { id: 3, date: new Date("2023-10-15"), type: "meeting", summary: "Site visit from foundation board members" }
    ],
    plans: "Prepare Q2 report by April 15. Apply for capacity building grant.",
    thoughts: "Our most reliable institutional funder. Must maintain excellent reporting standards."
  },
  {
    id: 4,
    name: "Emily Rodriguez",
    organization: "Rodriguez Consulting",
    email: "emily@rodriguezcons.com",
    phone: "(555) 456-7890",
    totalGiven: 45000,
    lastGiftDate: new Date("2023-12-15"),
    lastGiftAmount: 5000,
    notes: "HR consultant who volunteers as career mentor. Daughter is current student. Interested in college prep programs.",
    interactions: [
      { id: 1, date: new Date("2023-12-15"), type: "donation", summary: "Year-end gift - $5,000" },
      { id: 2, date: new Date("2023-11-20"), type: "meeting", summary: "Volunteered at career day event" },
      { id: 3, date: new Date("2023-10-05"), type: "call", summary: "Offered to conduct mock interviews" }
    ],
    plans: "Engage in volunteer recruitment committee. Feature in donor spotlight.",
    thoughts: "Bridge between donor and volunteer. Her professional network could be valuable."
  },
  {
    id: 5,
    name: "James Patterson",
    organization: null,
    email: "jpatterson@email.com",
    phone: "(555) 567-8901",
    totalGiven: 30000,
    lastGiftDate: new Date("2023-11-20"),
    lastGiftAmount: 2500,
    notes: "Retired teacher, gives consistently but modestly. Very interested in literacy programs. Likes handwritten thank you notes.",
    interactions: [
      { id: 1, date: new Date("2023-11-20"), type: "donation", summary: "Annual giving - $2,500" },
      { id: 2, date: new Date("2023-09-10"), type: "email", summary: "Sent newsletter with student success stories" },
      { id: 3, date: new Date("2023-06-15"), type: "call", summary: "Birthday call - shared memories of teaching" }
    ],
    plans: "Send quarterly updates on reading program. Invite to volunteer as reading tutor.",
    thoughts: "Loyal supporter with deep commitment to education. Consider legacy giving conversation."
  },
  {
    id: 6,
    name: "Tech Innovators Inc.",
    organization: null,
    email: "giving@techinnovators.com",
    phone: "(555) 678-9012",
    totalGiven: 175000,
    lastGiftDate: new Date("2024-01-25"),
    lastGiftAmount: 35000,
    notes: "Corporate partner with employee volunteer program. Matches employee donations 2:1. Fiscal year ends in June.",
    interactions: [
      { id: 1, date: new Date("2024-01-25"), type: "donation", summary: "Q4 corporate sponsorship - $35,000" },
      { id: 2, date: new Date("2024-01-15"), type: "meeting", summary: "Planning meeting for employee volunteer day" },
      { id: 3, date: new Date("2023-12-10"), type: "email", summary: "Renewed annual partnership agreement" }
    ],
    plans: "Coordinate spring volunteer day. Submit proposal for increased support in new fiscal year.",
    thoughts: "Growing relationship with potential for significant expansion. CEO is personally invested."
  },
  {
    id: 7,
    name: "Maria Gonzalez",
    organization: "Gonzalez Family Fund",
    email: "mgonzalez@gff.org",
    phone: "(555) 789-0123",
    totalGiven: 95000,
    lastGiftDate: new Date("2024-01-05"),
    lastGiftAmount: 15000,
    notes: "First-generation college graduate, supports college access programs. Bilingual - helps with Spanish-speaking families.",
    interactions: [
      { id: 1, date: new Date("2024-01-05"), type: "donation", summary: "New Year gift for scholarship fund - $15,000" },
      { id: 2, date: new Date("2023-11-30"), type: "meeting", summary: "Spoke at parent information night" },
      { id: 3, date: new Date("2023-09-20"), type: "call", summary: "Discussed creating named scholarship" }
    ],
    plans: "Finalize scholarship criteria. Invite to graduation ceremony as keynote speaker.",
    thoughts: "Powerful advocate in Latino community. Her story resonates with our families."
  },
  {
    id: 8,
    name: "Robert Thompson",
    organization: "Thompson Enterprises",
    email: "rthompson@thompsonent.com",
    phone: "(555) 890-1234",
    totalGiven: 60000,
    lastGiftDate: new Date("2023-10-30"),
    lastGiftAmount: 7500,
    notes: "Business owner who benefited from mentorship as youth. Interested in entrepreneurship programs for teens.",
    interactions: [
      { id: 1, date: new Date("2023-10-30"), type: "donation", summary: "Funded business plan competition - $7,500" },
      { id: 2, date: new Date("2023-09-15"), type: "meeting", summary: "Judged student business pitch event" },
      { id: 3, date: new Date("2023-07-20"), type: "email", summary: "Offered internships at his company" }
    ],
    plans: "Develop formal internship partnership. Explore young entrepreneurs program.",
    thoughts: "Natural mentor figure. His business network could open doors for students."
  },
  {
    id: 9,
    name: "Community First Bank",
    organization: null,
    email: "community@cfbank.com",
    phone: "(555) 901-2345",
    totalGiven: 140000,
    lastGiftDate: new Date("2024-01-18"),
    lastGiftAmount: 20000,
    notes: "Local bank with strong community investment policy. Supports financial literacy programs. Decision maker is VP of Community Relations.",
    interactions: [
      { id: 1, date: new Date("2024-01-18"), type: "donation", summary: "Financial literacy program grant - $20,000" },
      { id: 2, date: new Date("2023-12-05"), type: "meeting", summary: "Bank staff volunteered for money matters workshop" },
      { id: 3, date: new Date("2023-10-20"), type: "email", summary: "Invited to apply for community grant" }
    ],
    plans: "Submit grant for expanded financial education. Arrange student field trip to bank.",
    thoughts: "Stable corporate partner with aligned values. Potential for multi-year commitment."
  },
  {
    id: 10,
    name: "Dr. Lisa Wang",
    organization: "Wang Medical Group",
    email: "lwang@wangmedical.com",
    phone: "(555) 012-3456",
    totalGiven: 55000,
    lastGiftDate: new Date("2023-12-20"),
    lastGiftAmount: 8000,
    notes: "Pediatrician who sees impact of education on health. Provides free health screenings for students. Morning person.",
    interactions: [
      { id: 1, date: new Date("2023-12-20"), type: "donation", summary: "Year-end gift - $8,000" },
      { id: 2, date: new Date("2023-11-10"), type: "meeting", summary: "Conducted health workshop for families" },
      { id: 3, date: new Date("2023-09-05"), type: "call", summary: "Discussed mental health support needs" }
    ],
    plans: "Partner on wellness initiative. Apply for health-focused grant together.",
    thoughts: "Brings unique health perspective. Could help address holistic student needs."
  },
  {
    id: 11,
    name: "Green Energy Solutions",
    organization: null,
    email: "support@greenenergy.com",
    phone: "(555) 123-4567",
    totalGiven: 200000,
    lastGiftDate: new Date("2024-01-22"),
    lastGiftAmount: 40000,
    notes: "Renewable energy company supporting STEM and environmental education. CEO is City Tutors alum from 20 years ago.",
    interactions: [
      { id: 1, date: new Date("2024-01-22"), type: "donation", summary: "STEM lab equipment - $40,000" },
      { id: 2, date: new Date("2024-01-10"), type: "meeting", summary: "CEO toured facilities with leadership team" },
      { id: 3, date: new Date("2023-11-25"), type: "email", summary: "Expressed interest in creating green jobs pipeline" }
    ],
    plans: "Develop environmental science curriculum. Create summer internship program.",
    thoughts: "Major growth potential. CEO's personal connection drives deep commitment."
  },
  {
    id: 12,
    name: "David Martinez",
    organization: "Martinez & Sons",
    email: "dmartinez@martinezandsons.com",
    phone: "(555) 234-5678",
    totalGiven: 72000,
    lastGiftDate: new Date("2023-11-15"),
    lastGiftAmount: 6000,
    notes: "Family business owner, values work ethic and practical skills. Has hired several program graduates. Spanish speaker.",
    interactions: [
      { id: 1, date: new Date("2023-11-15"), type: "donation", summary: "Vocational training support - $6,000" },
      { id: 2, date: new Date("2023-10-01"), type: "meeting", summary: "Hosted students for career shadow day" },
      { id: 3, date: new Date("2023-08-20"), type: "call", summary: "Offered apprenticeship opportunities" }
    ],
    plans: "Formalize apprenticeship program. Feature in employer spotlight.",
    thoughts: "Practical supporter who provides real job opportunities. Key to workforce development."
  },
  {
    id: 13,
    name: "The Anderson Trust",
    organization: null,
    email: "trustees@andersontrust.org",
    phone: "(555) 345-6789",
    totalGiven: 300000,
    lastGiftDate: new Date("2024-01-12"),
    lastGiftAmount: 75000,
    notes: "Major family trust supporting education and arts. Formal application process. Site visits required. Trustee meeting in May.",
    interactions: [
      { id: 1, date: new Date("2024-01-12"), type: "donation", summary: "Annual grant disbursement - $75,000" },
      { id: 2, date: new Date("2023-11-30"), type: "email", summary: "Submitted comprehensive impact report" },
      { id: 3, date: new Date("2023-09-15"), type: "meeting", summary: "Trustees toured facilities and met students" }
    ],
    plans: "Prepare for May trustee meeting. Document student outcomes meticulously.",
    thoughts: "Largest institutional funder. Maintaining trust requires exceptional stewardship."
  },
  {
    id: 14,
    name: "Jennifer Kim",
    organization: "Kim Architecture",
    email: "jkim@kimarch.com",
    phone: "(555) 456-7890",
    totalGiven: 38000,
    lastGiftDate: new Date("2023-12-05"),
    lastGiftAmount: 3000,
    notes: "Architect interested in creating inspiring learning spaces. Provided pro bono design consultation. Aesthetic focus.",
    interactions: [
      { id: 1, date: new Date("2023-12-05"), type: "donation", summary: "Design and renovation fund - $3,000" },
      { id: 2, date: new Date("2023-10-20"), type: "meeting", summary: "Presented renovation concepts to board" },
      { id: 3, date: new Date("2023-08-15"), type: "email", summary: "Volunteered to lead design thinking workshop" }
    ],
    plans: "Engage in facility planning committee. Explore capital campaign leadership.",
    thoughts: "Brings unique design perspective. Could transform our physical spaces."
  },
  {
    id: 15,
    name: "Citywide Insurance",
    organization: null,
    email: "giving@citywideins.com",
    phone: "(555) 567-8901",
    totalGiven: 165000,
    lastGiftDate: new Date("2024-01-08"),
    lastGiftAmount: 25000,
    notes: "Insurance company with community giving program. Employees volunteer as math tutors. Decisions made quarterly.",
    interactions: [
      { id: 1, date: new Date("2024-01-08"), type: "donation", summary: "Q1 community partnership - $25,000" },
      { id: 2, date: new Date("2023-12-12"), type: "meeting", summary: "Signed MOU for ongoing partnership" },
      { id: 3, date: new Date("2023-10-30"), type: "email", summary: "Recruited 15 employee volunteers" }
    ],
    plans: "Expand volunteer tutoring program. Apply for disaster preparedness grant.",
    thoughts: "Model corporate partner with engaged employees. Relationship deepening each year."
  },
  {
    id: 16,
    name: "Thomas Brown",
    organization: "Brown Legal Services",
    email: "tbrown@brownlegal.com",
    phone: "(555) 678-9012",
    totalGiven: 82000,
    lastGiftDate: new Date("2023-12-28"),
    lastGiftAmount: 12000,
    notes: "Attorney providing pro bono legal services. Passionate about juvenile justice reform. Board member's close friend.",
    interactions: [
      { id: 1, date: new Date("2023-12-28"), type: "donation", summary: "Year-end leadership gift - $12,000" },
      { id: 2, date: new Date("2023-11-05"), type: "meeting", summary: "Advised on legal compliance issues" },
      { id: 3, date: new Date("2023-09-22"), type: "call", summary: "Offered to mentor pre-law students" }
    ],
    plans: "Engage in governance committee. Cultivate for planned giving.",
    thoughts: "Strategic ally with legal expertise. Natural board candidate when opening arises."
  },
  {
    id: 17,
    name: "Sustainable Future Fund",
    organization: null,
    email: "info@sustainablefuture.org",
    phone: "(555) 789-0123",
    totalGiven: 225000,
    lastGiftDate: new Date("2024-01-30"),
    lastGiftAmount: 45000,
    notes: "Environmental foundation supporting green education initiatives. Requires environmental impact metrics. Very data-driven.",
    interactions: [
      { id: 1, date: new Date("2024-01-30"), type: "donation", summary: "Green schools initiative - $45,000" },
      { id: 2, date: new Date("2024-01-15"), type: "email", summary: "Submitted environmental impact assessment" },
      { id: 3, date: new Date("2023-11-20"), type: "meeting", summary: "Presented sustainability plan to board" }
    ],
    plans: "Implement composting program. Document environmental education outcomes.",
    thoughts: "Pushing us toward sustainability. Aligns with younger donors' values."
  },
  {
    id: 18,
    name: "Angela Davis",
    organization: "Davis Investments",
    email: "adavis@davisinvest.com",
    phone: "(555) 890-1234",
    totalGiven: 67000,
    lastGiftDate: new Date("2023-11-25"),
    lastGiftAmount: 9000,
    notes: "Investment advisor who teaches financial literacy. Grew up in the neighborhood. Prefers text communication.",
    interactions: [
      { id: 1, date: new Date("2023-11-25"), type: "donation", summary: "Financial empowerment fund - $9,000" },
      { id: 2, date: new Date("2023-10-10"), type: "meeting", summary: "Led student investment club session" },
      { id: 3, date: new Date("2023-08-30"), type: "email", summary: "Proposed stock market simulation program" }
    ],
    plans: "Launch investment club with her guidance. Feature in alumni success stories.",
    thoughts: "Role model for students. Her local roots make her relatable and inspiring."
  },
  {
    id: 19,
    name: "Peter Wilson",
    organization: null,
    email: "pwilson@email.com",
    phone: "(555) 901-2345",
    totalGiven: 42000,
    lastGiftDate: new Date("2023-12-10"),
    lastGiftAmount: 4000,
    notes: "Quiet donor who gives annually. Lost son to violence, supports conflict resolution programs. Very private person.",
    interactions: [
      { id: 1, date: new Date("2023-12-10"), type: "donation", summary: "Peace and conflict resolution - $4,000" },
      { id: 2, date: new Date("2023-10-15"), type: "email", summary: "Thanked for supporting peer mediation training" },
      { id: 3, date: new Date("2023-06-20"), type: "call", summary: "Annual check-in, brief but warm" }
    ],
    plans: "Continue gentle cultivation. Honor his son's memory in program naming.",
    thoughts: "Deeply personal connection. Handle with extra sensitivity and respect."
  },
  {
    id: 20,
    name: "Excellence Foundation",
    organization: null,
    email: "grants@excellencefdn.org",
    phone: "(555) 012-3456",
    totalGiven: 350000,
    lastGiftDate: new Date("2024-01-02"),
    lastGiftAmount: 100000,
    notes: "National foundation with focus on educational excellence. Highly competitive grants. Requires rigorous evaluation.",
    interactions: [
      { id: 1, date: new Date("2024-01-02"), type: "donation", summary: "Excellence in tutoring grant - $100,000" },
      { id: 2, date: new Date("2023-11-15"), type: "email", summary: "Submitted 50-page grant proposal" },
      { id: 3, date: new Date("2023-09-30"), type: "meeting", summary: "Program officer site visit with external evaluator" }
    ],
    plans: "Maintain exceptional program quality. Prepare for mid-year evaluation visit.",
    thoughts: "Prestigious funder that validates our work. Success here opens other doors."
  },
]

// Textarea component for multi-line editing
const Textarea = ({ value, onChange, className, ...props }: any) => (
  <textarea
    value={value}
    onChange={onChange}
    className={`w-full rounded-md border border-white/20 bg-white/5 px-3 py-2 text-sm text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent ${className}`}
    {...props}
  />
)

export default function DonorsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedDonor, setSelectedDonor] = useState<ExtendedDonor | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [editedDonor, setEditedDonor] = useState<ExtendedDonor | null>(null)
  const [newNote, setNewNote] = useState("")

  // Debug effect to monitor selectedDonor changes
  useEffect(() => {
    console.log('Selected donor changed:', selectedDonor?.name, selectedDonor?.id)
  }, [selectedDonor])

  // Select first donor by default
  useEffect(() => {
    if (!selectedDonor && donors.length > 0) {
      setSelectedDonor(donors[0])
      setEditedDonor(donors[0])
    }
  }, [])

  // Filter donors based on search
  const filteredDonors = donors.filter(donor =>
    donor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    donor.organization?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  // Calculate donor stats
  const totalRaised = donors.reduce((sum, donor) => sum + donor.totalGiven, 0)
  const averageGift = totalRaised / donors.length
  const recentDonors = donors.filter(d => d.lastGiftDate && new Date(d.lastGiftDate) > new Date(Date.now() - 90 * 24 * 60 * 60 * 1000))

  const handleEdit = () => {
    setIsEditing(true)
    setEditedDonor(selectedDonor)
  }

  const handleSave = () => {
    if (editedDonor && selectedDonor) {
      // In a real app, this would save to a database
      const index = donors.findIndex(d => d.id === selectedDonor.id)
      if (index !== -1) {
        donors[index] = editedDonor
        setSelectedDonor(editedDonor)
      }
    }
    setIsEditing(false)
  }

  const handleCancel = () => {
    setIsEditing(false)
    setEditedDonor(selectedDonor)
  }

  const handleAddNote = () => {
    if (newNote.trim() && selectedDonor) {
      const newInteraction = {
        id: Date.now(),
        date: new Date(),
        type: 'meeting' as const,
        summary: newNote
      }
      
      const updatedDonor = {
        ...selectedDonor,
        interactions: [...(selectedDonor.interactions || []), newInteraction]
      }
      
      // Update the donor in the array
      const index = donors.findIndex(d => d.id === selectedDonor.id)
      if (index !== -1) {
        donors[index] = updatedDonor
        setSelectedDonor(updatedDonor)
      }
      
      setNewNote("")
    }
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Page Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold tracking-tight text-white mb-2">
          Donor Network
        </h1>
        <p className="text-white font-bold">
          Search and manage your donor relationships
        </p>
      </div>

      {/* Search and Actions Bar */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/60" />
          <Input
            type="search"
            placeholder="Search donors by name or organization..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 glass-morphism dark:glass-morphism-dark border-white/20 text-white placeholder:text-white/60 font-bold"
          />
        </div>
        <Button className="glass-button glass-hover apple-shadow hover:apple-shadow-hover text-white transition-all duration-300">
          <Plus className="mr-2 h-4 w-4 medallion-glow" />
          Add New Donor
        </Button>
      </div>

      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="glass-card apple-shadow hover:apple-shadow-hover transition-all duration-300">
          <CardHeader className="pb-2">
            <div className="flex items-center gap-2">
              <div className="p-2 glass-button">
                <Users className="h-5 w-5 text-emerald-400 medallion-glow" />
              </div>
              <CardTitle className="text-lg font-bold text-white">Total Donors</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-white">{donors.length}</p>
          </CardContent>
        </Card>

        <Card className="glass-card apple-shadow hover:apple-shadow-hover transition-all duration-300">
          <CardHeader className="pb-2">
            <div className="flex items-center gap-2">
              <div className="p-2 glass-button">
                <DollarSign className="h-5 w-5 text-teal-400 medallion-glow" />
              </div>
              <CardTitle className="text-lg font-bold text-white">Total Raised</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-white">{formatCurrency(totalRaised)}</p>
          </CardContent>
        </Card>

        <Card className="glass-card apple-shadow hover:apple-shadow-hover transition-all duration-300">
          <CardHeader className="pb-2">
            <div className="flex items-center gap-2">
              <div className="p-2 glass-button">
                <TrendingUp className="h-5 w-5 text-cyan-400 medallion-glow" />
              </div>
              <CardTitle className="text-lg font-bold text-white">Average Gift</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-white">{formatCurrency(averageGift)}</p>
          </CardContent>
        </Card>

        <Card className="glass-card apple-shadow hover:apple-shadow-hover transition-all duration-300">
          <CardHeader className="pb-2">
            <div className="flex items-center gap-2">
              <div className="p-2 glass-button">
                <Calendar className="h-5 w-5 text-sky-400 medallion-glow" />
              </div>
              <CardTitle className="text-lg font-bold text-white">Recent Donors</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-white">{recentDonors.length}</p>
          </CardContent>
        </Card>
      </div>

      {/* Split View: Donor List and Details */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Donor List */}
        <Card className="glass-card apple-shadow hover:apple-shadow-hover transition-all duration-300 h-[800px] overflow-hidden">
          <CardHeader className="border-b border-white/20">
            <CardTitle className="text-xl font-bold text-white">
              All Donors ({filteredDonors.length})
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="h-[720px] overflow-y-auto relative z-10">
              {filteredDonors.map((donor) => (
                <div
                  key={donor.id}
                  onClick={() => {
                    console.log('Clicked donor:', donor.name, donor.id)
                    console.log('Current selected:', selectedDonor?.name, selectedDonor?.id)
                    setSelectedDonor(donor)
                    setIsEditing(false)
                    setEditedDonor(donor)
                    console.log('State updated')
                  }}
                  className={`p-4 border-b border-white/10 cursor-pointer transition-all duration-200 hover:bg-white/10 active:bg-white/20
                    ${selectedDonor?.id === donor.id ? 'bg-emerald-500/10 border-l-4 border-l-emerald-400' : ''}`}
                >
                  <div className="flex items-center justify-between pointer-events-none">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg glass-button ${
                        donor.organization ? 'text-blue-400' : 'text-white'
                      }`}>
                        {donor.organization ? (
                          <Building2 className="h-4 w-4 medallion-glow" />
                        ) : (
                          <User className="h-4 w-4 medallion-glow" />
                        )}
                      </div>
                      <div>
                        <p className="font-bold text-white">{donor.name}</p>
                        {donor.organization && (
                          <p className="text-sm text-white/80 font-bold">{donor.organization}</p>
                        )}
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-emerald-400">
                        {formatCurrency(donor.totalGiven)}
                      </p>
                      {donor.lastGiftDate && (
                        <p className="text-xs text-white/60 font-bold">
                          {formatDate(donor.lastGiftDate)}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Donor Details */}
        <Card className="glass-card apple-shadow hover:apple-shadow-hover transition-all duration-300 h-[800px] overflow-hidden">
          {selectedDonor ? (
            <>
              <CardHeader className="border-b border-white/20">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-lg glass-button ${
                      selectedDonor.organization ? 'text-blue-400' : 'text-white'
                    }`}>
                      {selectedDonor.organization ? (
                        <Building2 className="h-6 w-6 medallion-glow" />
                      ) : (
                        <User className="h-6 w-6 medallion-glow" />
                      )}
                    </div>
                    <div>
                      <CardTitle className="text-2xl font-bold text-white">{selectedDonor.name}</CardTitle>
                      {selectedDonor.organization && (
                        <p className="text-white font-bold mt-1">{selectedDonor.organization}</p>
                      )}
                    </div>
                  </div>
                  <Button
                    onClick={isEditing ? handleSave : handleEdit}
                    size="icon"
                    className="glass-button glass-hover"
                  >
                    {isEditing ? (
                      <Save className="h-4 w-4 text-emerald-400" />
                    ) : (
                      <Edit className="h-4 w-4 text-white" />
                    )}
                  </Button>
                  {isEditing && (
                    <Button
                      onClick={handleCancel}
                      size="icon"
                      variant="ghost"
                      className="text-white hover:bg-white/10 ml-2"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </CardHeader>
              <CardContent className="h-[700px] overflow-y-auto">
                <div className="mt-6 space-y-6">
                  {/* Donation Summary */}
                  <div className="grid gap-4 md:grid-cols-3">
                    <div className="p-4 rounded-xl glass-morphism dark:glass-morphism-dark">
                      <p className="text-sm font-bold text-white/80">Total Given</p>
                      <p className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                        {formatCurrency(selectedDonor.totalGiven)}
                      </p>
                    </div>
                    {selectedDonor.lastGiftDate && (
                      <>
                        <div className="p-4 rounded-xl glass-morphism dark:glass-morphism-dark">
                          <p className="text-sm font-bold text-white/80">Last Gift</p>
                          <p className="text-lg font-bold text-white">
                            {selectedDonor.lastGiftAmount && formatCurrency(selectedDonor.lastGiftAmount)}
                          </p>
                        </div>
                        <div className="p-4 rounded-xl glass-morphism dark:glass-morphism-dark">
                          <p className="text-sm font-bold text-white/80">Last Gift Date</p>
                          <p className="text-lg font-bold text-white">
                            {formatDate(selectedDonor.lastGiftDate)}
                          </p>
                        </div>
                      </>
                    )}
                  </div>

                  {/* Contact Information */}
                  <div>
                    <h3 className="text-lg font-bold text-white mb-3">Contact Information</h3>
                    <div className="space-y-3">
                      {selectedDonor.email && (
                        <div className="flex items-center gap-3">
                          <div className="p-2 rounded-lg glass-button">
                            <Mail className="h-4 w-4 text-cyan-400 medallion-glow" />
                          </div>
                          <div>
                            <p className="text-sm font-bold text-white/80">Email</p>
                            <p className="text-white font-bold">{selectedDonor.email}</p>
                          </div>
                        </div>
                      )}
                      {selectedDonor.phone && (
                        <div className="flex items-center gap-3">
                          <div className="p-2 rounded-lg glass-button">
                            <Phone className="h-4 w-4 text-teal-400 medallion-glow" />
                          </div>
                          <div>
                            <p className="text-sm font-bold text-white/80">Phone</p>
                            <p className="text-white font-bold">{selectedDonor.phone}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Notes Section */}
                  <div>
                    <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                      <MessageSquare className="h-5 w-5 text-emerald-400" />
                      Notes
                    </h3>
                    {isEditing ? (
                      <Textarea
                        value={editedDonor?.notes || ''}
                        onChange={(e: any) => setEditedDonor({...editedDonor!, notes: e.target.value})}
                        rows={3}
                        placeholder="Add notes about this donor..."
                      />
                    ) : (
                      <p className="text-white/90 p-3 rounded-lg glass-morphism dark:glass-morphism-dark">
                        {selectedDonor.notes || 'No notes yet.'}
                      </p>
                    )}
                  </div>

                  {/* Plans Section */}
                  <div>
                    <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                      <Target className="h-5 w-5 text-teal-400" />
                      Plans
                    </h3>
                    {isEditing ? (
                      <Textarea
                        value={editedDonor?.plans || ''}
                        onChange={(e: any) => setEditedDonor({...editedDonor!, plans: e.target.value})}
                        rows={2}
                        placeholder="Future plans for this donor..."
                      />
                    ) : (
                      <p className="text-white/90 p-3 rounded-lg glass-morphism dark:glass-morphism-dark">
                        {selectedDonor.plans || 'No plans documented.'}
                      </p>
                    )}
                  </div>

                  {/* Thoughts Section */}
                  <div>
                    <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                      <Heart className="h-5 w-5 text-rose-400" />
                      Thoughts
                    </h3>
                    {isEditing ? (
                      <Textarea
                        value={editedDonor?.thoughts || ''}
                        onChange={(e: any) => setEditedDonor({...editedDonor!, thoughts: e.target.value})}
                        rows={2}
                        placeholder="Personal thoughts and insights..."
                      />
                    ) : (
                      <p className="text-white/90 p-3 rounded-lg glass-morphism dark:glass-morphism-dark">
                        {selectedDonor.thoughts || 'No thoughts recorded.'}
                      </p>
                    )}
                  </div>

                  {/* Interactions History */}
                  <div>
                    <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                      <Clock className="h-5 w-5 text-sky-400" />
                      Interaction History
                    </h3>
                    <div className="space-y-2 mb-4">
                      {selectedDonor.interactions?.map((interaction) => (
                        <div key={interaction.id} className="p-3 rounded-lg glass-morphism dark:glass-morphism-dark">
                          <div className="flex items-start justify-between">
                            <div className="flex items-start gap-2">
                              <div className={`p-1.5 rounded glass-button ${
                                interaction.type === 'donation' ? 'text-emerald-400' :
                                interaction.type === 'call' ? 'text-teal-400' :
                                interaction.type === 'email' ? 'text-cyan-400' :
                                'text-sky-400'
                              }`}>
                                {interaction.type === 'donation' ? <DollarSign className="h-4 w-4" /> :
                                 interaction.type === 'call' ? <Phone className="h-4 w-4" /> :
                                 interaction.type === 'email' ? <Mail className="h-4 w-4" /> :
                                 <Users className="h-4 w-4" />}
                              </div>
                              <p className="text-white text-sm">{interaction.summary}</p>
                            </div>
                            <p className="text-xs text-white/60">{formatDate(interaction.date)}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    {/* Add New Note */}
                    <div className="flex gap-2">
                      <Input
                        value={newNote}
                        onChange={(e) => setNewNote(e.target.value)}
                        placeholder="Add a quick note..."
                        className="glass-morphism dark:glass-morphism-dark border-white/20 text-white placeholder:text-white/60 font-bold"
                        onKeyPress={(e) => e.key === 'Enter' && handleAddNote()}
                      />
                      <Button
                        onClick={handleAddNote}
                        className="glass-button glass-hover"
                        disabled={!newNote.trim()}
                      >
                        <Plus className="h-4 w-4 text-white" />
                      </Button>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-3 pt-4">
                    <Button className="glass-button glass-hover apple-shadow hover:apple-shadow-hover text-white">
                      <Phone className="mr-2 h-4 w-4 medallion-glow" />
                      Call Donor
                    </Button>
                    <Button className="glass-button glass-hover apple-shadow hover:apple-shadow-hover text-white">
                      <Mail className="mr-2 h-4 w-4 medallion-glow" />
                      Send Email
                    </Button>
                    <Button className="glass-button glass-hover apple-shadow hover:apple-shadow-hover text-white">
                      <Calendar className="mr-2 h-4 w-4 medallion-glow" />
                      Schedule Meeting
                    </Button>
                  </div>
                </div>
              </CardContent>
            </>
          ) : (
            <div className="h-full flex items-center justify-center">
              <div className="text-center">
                <div className="p-4 rounded-full glass-button w-20 h-20 mx-auto mb-4 flex items-center justify-center">
                  <User className="h-10 w-10 text-white/60" />
                </div>
                <p className="text-white/60 font-bold">Select a donor to view details</p>
              </div>
            </div>
          )}
        </Card>
      </div>
    </div>
  )
}