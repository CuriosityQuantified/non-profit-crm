/**
 * File: finances/page.tsx
 * Purpose: Comprehensive financial management and reporting dashboard
 * Features: Revenue tracking, expense management, budget analysis, donation insights
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
import { formatCurrency, formatDate } from "@/lib/utils"
import { 
  DollarSign, 
  TrendingUp, 
  TrendingDown,
  Receipt, 
  PiggyBank,
  Plus,
  Download,
  Calendar,
  Target,
  AlertTriangle,
  CheckCircle2,
  BarChart3,
  PieChart,
  Users,
  Building2,
  CreditCard,
  Wallet,
  ArrowUpRight,
  ArrowDownRight,
  FileText,
  Filter,
  Search,
  Edit,
  Trash2,
  Eye
} from "lucide-react"

// Financial interfaces
interface Transaction {
  id: string
  date: Date
  description: string
  amount: number
  type: 'income' | 'expense'
  category: string
  subcategory?: string
  source?: string
  donorId?: string
  recurring: boolean
  status: 'pending' | 'completed' | 'cancelled'
  notes?: string
}

interface Budget {
  id: string
  category: string
  budgeted: number
  spent: number
  period: 'monthly' | 'quarterly' | 'yearly'
  year: number
  month?: number
}

interface DonationSummary {
  source: string
  amount: number
  count: number
  averageGift: number
  percentage: number
}

// Sample financial data
const initialTransactions: Transaction[] = [
  {
    id: '1',
    date: new Date('2024-02-01'),
    description: 'Major Donor Contribution - Anderson Trust',
    amount: 75000,
    type: 'income',
    category: 'Donations',
    subcategory: 'Major Gifts',
    source: 'Foundation Grant',
    donorId: 'anderson-trust',
    recurring: false,
    status: 'completed',
    notes: 'Annual capacity building grant'
  },
  {
    id: '2',
    date: new Date('2024-02-03'),
    description: 'Staff Salaries - February',
    amount: -28500,
    type: 'expense',
    category: 'Personnel',
    subcategory: 'Salaries',
    recurring: true,
    status: 'completed',
    notes: '8 full-time staff members'
  },
  {
    id: '3',
    date: new Date('2024-02-05'),
    description: 'Corporate Sponsorship - Tech Innovators Inc.',
    amount: 40000,
    type: 'income',
    category: 'Donations',
    subcategory: 'Corporate',
    source: 'Corporate Partnership',
    donorId: 'tech-innovators',
    recurring: false,
    status: 'completed',
    notes: 'STEM lab equipment sponsorship'
  },
  {
    id: '4',
    date: new Date('2024-02-07'),
    description: 'Office Rent - February',
    amount: -4500,
    type: 'expense',
    category: 'Operations',
    subcategory: 'Facilities',
    recurring: true,
    status: 'completed'
  },
  {
    id: '5',
    date: new Date('2024-02-10'),
    description: 'Educational Materials Purchase',
    amount: -2800,
    type: 'expense',
    category: 'Programs',
    subcategory: 'Supplies',
    recurring: false,
    status: 'completed',
    notes: 'Books, workbooks, and digital resources'
  },
  {
    id: '6',
    date: new Date('2024-02-12'),
    description: 'Individual Donations - Online Portal',
    amount: 8500,
    type: 'income',
    category: 'Donations',
    subcategory: 'Individual',
    source: 'Online Donations',
    recurring: false,
    status: 'completed',
    notes: '45 individual donors'
  },
  {
    id: '7',
    date: new Date('2024-02-15'),
    description: 'Insurance Premiums - Quarterly',
    amount: -3200,
    type: 'expense',
    category: 'Operations',
    subcategory: 'Insurance',
    recurring: true,
    status: 'completed'
  },
  {
    id: '8',
    date: new Date('2024-02-18'),
    description: 'Community First Bank Grant',
    amount: 20000,
    type: 'income',
    category: 'Donations',
    subcategory: 'Corporate',
    source: 'Bank Grant',
    donorId: 'community-first-bank',
    recurring: false,
    status: 'completed',
    notes: 'Financial literacy program funding'
  },
  {
    id: '9',
    date: new Date('2024-02-20'),
    description: 'Technology Equipment',
    amount: -12000,
    type: 'expense',
    category: 'Programs',
    subcategory: 'Equipment',
    recurring: false,
    status: 'completed',
    notes: '20 new tablets for students'
  },
  {
    id: '10',
    date: new Date('2024-02-22'),
    description: 'Spring Gala Venue Deposit',
    amount: -5000,
    type: 'expense',
    category: 'Fundraising',
    subcategory: 'Events',
    recurring: false,
    status: 'completed',
    notes: 'Grand Ballroom Hotel - March 15'
  },
  {
    id: '11',
    date: new Date('2024-02-25'),
    description: 'Monthly Utilities',
    amount: -1200,
    type: 'expense',
    category: 'Operations',
    subcategory: 'Utilities',
    recurring: true,
    status: 'completed'
  },
  {
    id: '12',
    date: new Date('2024-02-28'),
    description: 'Board Member Donations',
    amount: 15000,
    type: 'income',
    category: 'Donations',
    subcategory: 'Board',
    source: 'Board Giving',
    recurring: false,
    status: 'completed',
    notes: 'Quarterly board member contributions'
  }
]

const initialBudgets: Budget[] = [
  { id: '1', category: 'Personnel', budgeted: 300000, spent: 57000, period: 'yearly', year: 2024 },
  { id: '2', category: 'Programs', budgeted: 150000, spent: 14800, period: 'yearly', year: 2024 },
  { id: '3', category: 'Operations', budgeted: 75000, spent: 8900, period: 'yearly', year: 2024 },
  { id: '4', category: 'Fundraising', budgeted: 25000, spent: 5000, period: 'yearly', year: 2024 },
  { id: '5', category: 'Administration', budgeted: 20000, spent: 2100, period: 'yearly', year: 2024 }
]

export default function FinancesPage() {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [budgets, setBudgets] = useState<Budget[]>([])
  const [viewPeriod, setViewPeriod] = useState<'monthly' | 'yearly'>('monthly')
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth())
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear())
  const [isAddTransactionOpen, setIsAddTransactionOpen] = useState(false)
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null)
  const [isViewTransactionOpen, setIsViewTransactionOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterCategory, setFilterCategory] = useState<string>('all')
  const [formData, setFormData] = useState<Partial<Transaction>>({
    description: '',
    amount: 0,
    type: 'income',
    category: 'Donations',
    status: 'completed',
    recurring: false
  })

  // Load data from localStorage
  useEffect(() => {
    const storedTransactions = localStorage.getItem('financialTransactions')
    if (storedTransactions) {
      const parsed = JSON.parse(storedTransactions)
      setTransactions(parsed.map((t: any) => ({
        ...t,
        date: new Date(t.date)
      })))
    } else {
      setTransactions(initialTransactions)
      localStorage.setItem('financialTransactions', JSON.stringify(initialTransactions))
    }

    const storedBudgets = localStorage.getItem('financialBudgets')
    if (storedBudgets) {
      setBudgets(JSON.parse(storedBudgets))
    } else {
      setBudgets(initialBudgets)
      localStorage.setItem('financialBudgets', JSON.stringify(initialBudgets))
    }
  }, [])

  // Save data to localStorage
  useEffect(() => {
    if (transactions.length > 0) {
      localStorage.setItem('financialTransactions', JSON.stringify(transactions))
    }
  }, [transactions])

  useEffect(() => {
    if (budgets.length > 0) {
      localStorage.setItem('financialBudgets', JSON.stringify(budgets))
    }
  }, [budgets])

  // Financial calculations
  const getFilteredTransactions = () => {
    let filtered = transactions

    if (viewPeriod === 'monthly') {
      filtered = filtered.filter(t => 
        t.date.getMonth() === selectedMonth && 
        t.date.getFullYear() === selectedYear &&
        t.status === 'completed'
      )
    } else {
      filtered = filtered.filter(t => 
        t.date.getFullYear() === selectedYear &&
        t.status === 'completed'
      )
    }

    if (searchTerm) {
      filtered = filtered.filter(t => 
        t.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        t.category.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    if (filterCategory !== 'all') {
      filtered = filtered.filter(t => t.category === filterCategory)
    }

    return filtered.sort((a, b) => b.date.getTime() - a.date.getTime())
  }

  const calculateFinancials = () => {
    const filtered = getFilteredTransactions()
    const income = filtered.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0)
    const expenses = filtered.filter(t => t.type === 'expense').reduce((sum, t) => sum + Math.abs(t.amount), 0)
    const netIncome = income - expenses

    // Previous period comparison
    const prevPeriodStart = viewPeriod === 'monthly' 
      ? new Date(selectedYear, selectedMonth - 1, 1)
      : new Date(selectedYear - 1, 0, 1)
    const prevPeriodEnd = viewPeriod === 'monthly'
      ? new Date(selectedYear, selectedMonth, 0)
      : new Date(selectedYear - 1, 11, 31)

    const prevTransactions = transactions.filter(t => 
      t.date >= prevPeriodStart && 
      t.date <= prevPeriodEnd &&
      t.status === 'completed'
    )
    const prevIncome = prevTransactions.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0)
    const prevExpenses = prevTransactions.filter(t => t.type === 'expense').reduce((sum, t) => sum + Math.abs(t.amount), 0)

    return {
      income,
      expenses,
      netIncome,
      incomeChange: prevIncome > 0 ? ((income - prevIncome) / prevIncome) * 100 : 0,
      expenseChange: prevExpenses > 0 ? ((expenses - prevExpenses) / prevExpenses) * 100 : 0
    }
  }

  const getDonationBreakdown = (): DonationSummary[] => {
    const donations = getFilteredTransactions().filter(t => t.type === 'income' && t.category === 'Donations')
    const breakdown = new Map<string, { amount: number, count: number }>()

    donations.forEach(d => {
      const key = d.subcategory || 'Other'
      const existing = breakdown.get(key) || { amount: 0, count: 0 }
      breakdown.set(key, {
        amount: existing.amount + d.amount,
        count: existing.count + 1
      })
    })

    const total = donations.reduce((sum, d) => sum + d.amount, 0)
    
    return Array.from(breakdown.entries()).map(([source, data]) => ({
      source,
      amount: data.amount,
      count: data.count,
      averageGift: data.amount / data.count,
      percentage: total > 0 ? (data.amount / total) * 100 : 0
    })).sort((a, b) => b.amount - a.amount)
  }

  const getBudgetAnalysis = () => {
    return budgets.map(budget => {
      const percentage = budget.budgeted > 0 ? (budget.spent / budget.budgeted) * 100 : 0
      const remaining = budget.budgeted - budget.spent
      const status = percentage > 90 ? 'warning' : percentage > 100 ? 'over' : 'good'
      return { ...budget, percentage, remaining, status }
    })
  }

  // Transaction management
  const handleAddTransaction = () => {
    if (!formData.description || !formData.amount) return

    const newTransaction: Transaction = {
      id: Date.now().toString(),
      description: formData.description,
      amount: formData.type === 'expense' ? -Math.abs(formData.amount) : Math.abs(formData.amount),
      type: formData.type || 'income',
      category: formData.category || 'Donations',
      subcategory: formData.subcategory,
      source: formData.source,
      date: new Date(),
      recurring: formData.recurring || false,
      status: formData.status || 'completed',
      notes: formData.notes
    }

    setTransactions([newTransaction, ...transactions])
    setIsAddTransactionOpen(false)
    resetForm()
  }

  const handleDeleteTransaction = (id: string) => {
    if (confirm('Are you sure you want to delete this transaction?')) {
      setTransactions(transactions.filter(t => t.id !== id))
      if (selectedTransaction?.id === id) {
        setSelectedTransaction(null)
        setIsViewTransactionOpen(false)
      }
    }
  }

  const resetForm = () => {
    setFormData({
      description: '',
      amount: 0,
      type: 'income',
      category: 'Donations',
      status: 'completed',
      recurring: false
    })
  }

  const openViewDialog = (transaction: Transaction) => {
    setSelectedTransaction(transaction)
    setIsViewTransactionOpen(true)
  }

  const exportData = () => {
    const csvData = getFilteredTransactions().map(t => ({
      Date: formatDate(t.date),
      Description: t.description,
      Amount: t.amount,
      Type: t.type,
      Category: t.category,
      Status: t.status
    }))
    
    const csv = [
      Object.keys(csvData[0]).join(','),
      ...csvData.map(row => Object.values(row).join(','))
    ].join('\n')
    
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `financial-report-${selectedYear}-${selectedMonth + 1}.csv`
    a.click()
    window.URL.revokeObjectURL(url)
  }

  const financials = calculateFinancials()
  const donationBreakdown = getDonationBreakdown()
  const budgetAnalysis = getBudgetAnalysis()
  const filteredTransactions = getFilteredTransactions()
  
  const categories = ['all', ...Array.from(new Set(transactions.map(t => t.category)))]

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      {/* Header */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-4xl font-bold text-white">Financial Dashboard</h1>
            <p className="text-gray-400 mt-2">Track revenue, expenses, and financial health</p>
          </div>
          <div className="flex gap-3">
            <Button
              onClick={exportData}
              variant="outline" 
              className="bg-gray-800/50 border-white/20 text-white hover:bg-white/10"
            >
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
            <Dialog open={isAddTransactionOpen} onOpenChange={setIsAddTransactionOpen}>
              <DialogTrigger asChild>
                <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Transaction
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-gray-900/95 backdrop-blur-md border-white/10 text-white max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Add New Transaction</DialogTitle>
                  <DialogDescription className="text-gray-400">
                    Record a new financial transaction
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="description">Description</Label>
                      <Input
                        id="description"
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        className="bg-gray-800/50 border-white/10 text-white"
                        placeholder="Transaction description"
                      />
                    </div>
                    <div>
                      <Label htmlFor="amount">Amount</Label>
                      <Input
                        id="amount"
                        type="number"
                        value={formData.amount}
                        onChange={(e) => setFormData({ ...formData, amount: parseFloat(e.target.value) })}
                        className="bg-gray-800/50 border-white/10 text-white"
                        placeholder="0.00"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
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
                          <SelectItem value="income">Income</SelectItem>
                          <SelectItem value="expense">Expense</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="category">Category</Label>
                      <Select 
                        value={formData.category} 
                        onValueChange={(value) => setFormData({ ...formData, category: value })}
                      >
                        <SelectTrigger className="bg-gray-800/50 border-white/10 text-white">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-900 border-white/10">
                          <SelectItem value="Donations">Donations</SelectItem>
                          <SelectItem value="Programs">Programs</SelectItem>
                          <SelectItem value="Personnel">Personnel</SelectItem>
                          <SelectItem value="Operations">Operations</SelectItem>
                          <SelectItem value="Fundraising">Fundraising</SelectItem>
                          <SelectItem value="Administration">Administration</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="status">Status</Label>
                      <Select 
                        value={formData.status} 
                        onValueChange={(value: any) => setFormData({ ...formData, status: value })}
                      >
                        <SelectTrigger className="bg-gray-800/50 border-white/10 text-white">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-900 border-white/10">
                          <SelectItem value="completed">Completed</SelectItem>
                          <SelectItem value="pending">Pending</SelectItem>
                          <SelectItem value="cancelled">Cancelled</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="subcategory">Subcategory</Label>
                      <Input
                        id="subcategory"
                        value={formData.subcategory}
                        onChange={(e) => setFormData({ ...formData, subcategory: e.target.value })}
                        className="bg-gray-800/50 border-white/10 text-white"
                        placeholder="Optional subcategory"
                      />
                    </div>
                    <div>
                      <Label htmlFor="source">Source</Label>
                      <Input
                        id="source"
                        value={formData.source}
                        onChange={(e) => setFormData({ ...formData, source: e.target.value })}
                        className="bg-gray-800/50 border-white/10 text-white"
                        placeholder="Payment source"
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
                  <Button variant="outline" onClick={() => setIsAddTransactionOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleAddTransaction} className="bg-emerald-600 hover:bg-emerald-700">
                    Add Transaction
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Period Selector */}
        <div className="flex items-center gap-4 mb-6">
          <div className="flex items-center gap-2">
            <Button
              variant={viewPeriod === 'monthly' ? 'default' : 'outline'}
              onClick={() => setViewPeriod('monthly')}
              className={viewPeriod === 'monthly' ? 'bg-emerald-600' : 'bg-gray-800/50 border-white/20 text-white hover:bg-white/10'}
            >
              Monthly
            </Button>
            <Button
              variant={viewPeriod === 'yearly' ? 'default' : 'outline'}
              onClick={() => setViewPeriod('yearly')}
              className={viewPeriod === 'yearly' ? 'bg-emerald-600' : 'bg-gray-800/50 border-white/20 text-white hover:bg-white/10'}
            >
              Yearly
            </Button>
          </div>
          
          {viewPeriod === 'monthly' && (
            <Select value={selectedMonth.toString()} onValueChange={(value) => setSelectedMonth(parseInt(value))}>
              <SelectTrigger className="w-32 bg-gray-800/50 border-white/20 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-gray-900 border-white/10">
                {Array.from({ length: 12 }, (_, i) => (
                  <SelectItem key={i} value={i.toString()}>
                    {new Date(2024, i, 1).toLocaleDateString('en-US', { month: 'long' })}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
          
          <Select value={selectedYear.toString()} onValueChange={(value) => setSelectedYear(parseInt(value))}>
            <SelectTrigger className="w-24 bg-gray-800/50 border-white/20 text-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-gray-900 border-white/10">
              <SelectItem value="2024">2024</SelectItem>
              <SelectItem value="2023">2023</SelectItem>
              <SelectItem value="2022">2022</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card className="bg-gray-900/50 backdrop-blur-md border-white/10">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">Total Revenue</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <DollarSign className="h-4 w-4 text-emerald-400 mr-2" />
                  <span className="text-2xl font-bold text-white">{formatCurrency(financials.income)}</span>
                </div>
                <div className={`flex items-center text-sm ${
                  financials.incomeChange >= 0 ? 'text-emerald-400' : 'text-red-400'
                }`}>
                  {financials.incomeChange >= 0 ? (
                    <ArrowUpRight className="h-4 w-4 mr-1" />
                  ) : (
                    <ArrowDownRight className="h-4 w-4 mr-1" />
                  )}
                  {Math.abs(financials.incomeChange).toFixed(1)}%
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-900/50 backdrop-blur-md border-white/10">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">Total Expenses</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Receipt className="h-4 w-4 text-red-400 mr-2" />
                  <span className="text-2xl font-bold text-white">{formatCurrency(financials.expenses)}</span>
                </div>
                <div className={`flex items-center text-sm ${
                  financials.expenseChange <= 0 ? 'text-emerald-400' : 'text-red-400'
                }`}>
                  {financials.expenseChange <= 0 ? (
                    <ArrowDownRight className="h-4 w-4 mr-1" />
                  ) : (
                    <ArrowUpRight className="h-4 w-4 mr-1" />
                  )}
                  {Math.abs(financials.expenseChange).toFixed(1)}%
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-900/50 backdrop-blur-md border-white/10">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">Net Income</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                {financials.netIncome >= 0 ? (
                  <TrendingUp className="h-4 w-4 text-emerald-400 mr-2" />
                ) : (
                  <TrendingDown className="h-4 w-4 text-red-400 mr-2" />
                )}
                <span className={`text-2xl font-bold ${
                  financials.netIncome >= 0 ? 'text-emerald-400' : 'text-red-400'
                }`}>
                  {formatCurrency(financials.netIncome)}
                </span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-900/50 backdrop-blur-md border-white/10">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">Cash Reserves</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <PiggyBank className="h-4 w-4 text-purple-400 mr-2" />
                <span className="text-2xl font-bold text-white">{formatCurrency(875000)}</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Charts and Analysis */}
        <div className="lg:col-span-2 space-y-6">
          {/* Donation Sources */}
          <Card className="bg-gray-900/50 backdrop-blur-md border-white/10">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <PieChart className="h-5 w-5 text-emerald-400" />
                Donation Sources
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {donationBreakdown.map((source, index) => (
                  <div key={source.source} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div 
                        className={`w-4 h-4 rounded ${
                          index === 0 ? 'bg-emerald-500' :
                          index === 1 ? 'bg-teal-500' :
                          index === 2 ? 'bg-cyan-500' :
                          index === 3 ? 'bg-blue-500' :
                          'bg-purple-500'
                        }`}
                      ></div>
                      <div>
                        <p className="text-white font-medium">{source.source}</p>
                        <p className="text-gray-400 text-sm">
                          {source.count} donations • Avg: {formatCurrency(source.averageGift)}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-white font-medium">{formatCurrency(source.amount)}</p>
                      <p className="text-gray-400 text-sm">{source.percentage.toFixed(1)}%</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Budget vs Actual */}
          <Card className="bg-gray-900/50 backdrop-blur-md border-white/10">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Target className="h-5 w-5 text-emerald-400" />
                Budget Analysis
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {budgetAnalysis.map((budget) => (
                  <div key={budget.id} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-white font-medium">{budget.category}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-gray-400 text-sm">
                          {formatCurrency(budget.spent)} / {formatCurrency(budget.budgeted)}
                        </span>
                        {budget.status === 'warning' && (
                          <AlertTriangle className="h-4 w-4 text-yellow-400" />
                        )}
                        {budget.status === 'over' && (
                          <AlertTriangle className="h-4 w-4 text-red-400" />
                        )}
                        {budget.status === 'good' && (
                          <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                        )}
                      </div>
                    </div>
                    <div className="w-full bg-gray-700/50 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${
                          budget.status === 'over' ? 'bg-red-500' :
                          budget.status === 'warning' ? 'bg-yellow-500' :
                          'bg-emerald-500'
                        }`}
                        style={{ width: `${Math.min(budget.percentage, 100)}%` }}
                      ></div>
                    </div>
                    <div className="text-right">
                      <span className={`text-sm ${
                        budget.remaining >= 0 ? 'text-emerald-400' : 'text-red-400'
                      }`}>
                        {budget.remaining >= 0 ? 'Remaining: ' : 'Over budget: '}
                        {formatCurrency(Math.abs(budget.remaining))}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Recent Transactions */}
        <div className="lg:col-span-1">
          <Card className="bg-gray-900/50 backdrop-blur-md border-white/10">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-white flex items-center gap-2">
                  <FileText className="h-5 w-5 text-emerald-400" />
                  Recent Transactions
                </CardTitle>
                <span className="text-gray-400 text-sm">
                  {filteredTransactions.length} total
                </span>
              </div>
              <div className="flex gap-2 mt-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search transactions..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 bg-gray-800/50 border-white/10 text-white placeholder:text-gray-400"
                  />
                </div>
                <Select value={filterCategory} onValueChange={setFilterCategory}>
                  <SelectTrigger className="w-32 bg-gray-800/50 border-white/10 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-900 border-white/10">
                    {categories.map(cat => (
                      <SelectItem key={cat} value={cat}>
                        {cat === 'all' ? 'All' : cat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent className="space-y-3 max-h-96 overflow-y-auto">
              {filteredTransactions.map((transaction) => (
                <div
                  key={transaction.id}
                  onClick={() => openViewDialog(transaction)}
                  className="p-3 rounded-lg bg-gray-800/50 border border-white/10 cursor-pointer hover:bg-gray-700/50 transition-all"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3 flex-1 min-w-0">
                      <div className={`p-1.5 rounded text-white ${
                        transaction.type === 'income' ? 'bg-emerald-600' : 'bg-red-600'
                      }`}>
                        {transaction.type === 'income' ? (
                          <DollarSign className="h-4 w-4" />
                        ) : (
                          <Receipt className="h-4 w-4" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-white font-medium text-sm truncate">
                          {transaction.description}
                        </p>
                        <p className="text-gray-400 text-xs">
                          {formatDate(transaction.date)} • {transaction.category}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`text-sm font-medium ${
                        transaction.type === 'income' ? 'text-emerald-400' : 'text-red-400'
                      }`}>
                        {transaction.type === 'income' ? '+' : ''}{formatCurrency(transaction.amount)}
                      </p>
                      <span className={`text-xs px-1.5 py-0.5 rounded ${
                        transaction.status === 'completed' ? 'bg-emerald-900/50 text-emerald-300' :
                        transaction.status === 'pending' ? 'bg-yellow-900/50 text-yellow-300' :
                        'bg-red-900/50 text-red-300'
                      }`}>
                        {transaction.status}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
              {filteredTransactions.length === 0 && (
                <div className="text-center text-gray-400 py-8">
                  <FileText className="h-8 w-8 mx-auto mb-2" />
                  <p>No transactions found</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Transaction View Dialog */}
      <Dialog open={isViewTransactionOpen} onOpenChange={setIsViewTransactionOpen}>
        <DialogContent className="bg-gray-900/95 backdrop-blur-md border-white/10 text-white max-w-2xl">
          {selectedTransaction && (
            <>
              <DialogHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <DialogTitle className="text-xl">{selectedTransaction.description}</DialogTitle>
                    <DialogDescription className="text-gray-400 mt-1">
                      {formatDate(selectedTransaction.date)} • {selectedTransaction.category}
                    </DialogDescription>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleDeleteTransaction(selectedTransaction.id)}
                      className="text-red-400 hover:bg-red-900/20"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </DialogHeader>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-sm font-medium text-gray-400 mb-1">Amount</h4>
                    <p className={`text-2xl font-bold ${
                      selectedTransaction.type === 'income' ? 'text-emerald-400' : 'text-red-400'
                    }`}>
                      {formatCurrency(selectedTransaction.amount)}
                    </p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-400 mb-1">Type</h4>
                    <div className="flex items-center gap-2">
                      <div className={`p-1.5 rounded text-white ${
                        selectedTransaction.type === 'income' ? 'bg-emerald-600' : 'bg-red-600'
                      }`}>
                        {selectedTransaction.type === 'income' ? (
                          <DollarSign className="h-4 w-4" />
                        ) : (
                          <Receipt className="h-4 w-4" />
                        )}
                      </div>
                      <span className="text-white capitalize">{selectedTransaction.type}</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-sm font-medium text-gray-400 mb-1">Category</h4>
                    <p className="text-white">{selectedTransaction.category}</p>
                  </div>
                  {selectedTransaction.subcategory && (
                    <div>
                      <h4 className="text-sm font-medium text-gray-400 mb-1">Subcategory</h4>
                      <p className="text-white">{selectedTransaction.subcategory}</p>
                    </div>
                  )}
                </div>

                {selectedTransaction.source && (
                  <div>
                    <h4 className="text-sm font-medium text-gray-400 mb-1">Source</h4>
                    <p className="text-white">{selectedTransaction.source}</p>
                  </div>
                )}

                <div className="flex items-center gap-4">
                  <div>
                    <h4 className="text-sm font-medium text-gray-400 mb-1">Status</h4>
                    <span className={`px-2 py-1 rounded text-xs ${
                      selectedTransaction.status === 'completed' ? 'bg-emerald-900/50 text-emerald-300' :
                      selectedTransaction.status === 'pending' ? 'bg-yellow-900/50 text-yellow-300' :
                      'bg-red-900/50 text-red-300'
                    }`}>
                      {selectedTransaction.status}
                    </span>
                  </div>
                  {selectedTransaction.recurring && (
                    <div>
                      <h4 className="text-sm font-medium text-gray-400 mb-1">Recurring</h4>
                      <span className="px-2 py-1 rounded text-xs bg-blue-900/50 text-blue-300">
                        Yes
                      </span>
                    </div>
                  )}
                </div>

                {selectedTransaction.notes && (
                  <div>
                    <h4 className="text-sm font-medium text-gray-400 mb-1">Notes</h4>
                    <p className="text-white text-sm bg-gray-800/50 p-3 rounded">
                      {selectedTransaction.notes}
                    </p>
                  </div>
                )}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}