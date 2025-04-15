"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  CreditCard,
  Receipt,
  Database,
  FileText,
  TrendingUp,
  Calendar,
  Users,
  AlertCircle,
  DollarSign,
  Banknote,
  Smartphone,
  ArrowRight,
  Clock,
  CheckCircle,
  XCircle,
  AlertTriangle,
  BarChart3,
  Wallet,
  Shield,
  Activity,
} from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { useState } from "react"

export default function CashierDashboardPage() {
  const { user } = useAuth()
  const [currentDate] = useState(
    new Date().toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    }),
  )

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Welcome back, {user?.name || "Cashier"}</h2>
          <p className="text-muted-foreground">{currentDate} | Here's an overview of today's financial activities</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">Download Reports</Button>
          <Button>Process Payment</Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Today's Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">GHS 4,231.89</div>
            <div className="flex items-center pt-1">
              <TrendingUp className="mr-1 h-3 w-3 text-green-600" />
              <span className="text-xs text-green-600">+15% from yesterday</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Payments</CardTitle>
            <Receipt className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
            <div className="flex items-center justify-between pt-1">
              <span className="text-xs text-muted-foreground">GHS 1,250.00 total</span>
              <Badge variant="outline" className="text-amber-600 bg-amber-50">
                Attention Needed
              </Badge>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Crypto Payments</CardTitle>
            <Database className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <div className="flex items-center justify-between pt-1">
              <span className="text-xs text-muted-foreground">0.05 ETH total</span>
              <Badge variant="outline" className="text-blue-600 bg-blue-50">
                Blockchain
              </Badge>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Insurance Claims</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <div className="flex items-center justify-between pt-1">
              <span className="text-xs text-muted-foreground">3 pending approval</span>
              <Badge variant="outline" className="text-purple-600 bg-purple-50">
                Processing
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="payments">Recent Payments</TabsTrigger>
          <TabsTrigger value="pending">Pending Actions</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Recent Transactions</CardTitle>
                <CardDescription>Latest payment transactions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { name: "John Doe", amount: "GHS 250.00", method: "Credit Card", time: "30 mins ago" },
                    { name: "Jane Smith", amount: "GHS 150.00", method: "Cash", time: "1 hour ago" },
                    { name: "Robert Johnson", amount: "0.02 ETH", method: "Crypto", time: "2 hours ago" },
                    { name: "Emily Davis", amount: "GHS 350.00", method: "Mobile Money", time: "3 hours ago" },
                  ].map((transaction, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <Avatar className="h-9 w-9">
                        <AvatarImage src={`/placeholder.svg?height=36&width=36`} alt={transaction.name} />
                        <AvatarFallback>{transaction.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="space-y-0.5">
                        <p className="text-sm font-medium">{transaction.name}</p>
                        <div className="flex items-center">
                          <p className="text-sm text-muted-foreground">{transaction.amount}</p>
                          <span className="mx-1 text-muted-foreground">•</span>
                          <p className="text-xs text-muted-foreground">{transaction.method}</p>
                        </div>
                        <p className="text-xs text-muted-foreground">{transaction.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="ghost" className="w-full" size="sm">
                  View All Transactions
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Pending Payments</CardTitle>
                <CardDescription>Payments awaiting processing</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      name: "Michael Brown",
                      amount: "GHS 350.00",
                      status: "Insurance claim pending",
                      priority: "High",
                    },
                    {
                      name: "Sarah Wilson",
                      amount: "GHS 200.00",
                      status: "Awaiting payment method",
                      priority: "Medium",
                    },
                    { name: "David Lee", amount: "GHS 175.00", status: "Payment plan setup needed", priority: "Low" },
                  ].map((payment, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between">
                        <p className="text-sm font-medium">{payment.name}</p>
                        <Badge
                          variant="outline"
                          className={
                            payment.priority === "High"
                              ? "text-red-600 bg-red-50"
                              : payment.priority === "Medium"
                                ? "text-amber-600 bg-amber-50"
                                : "text-green-600 bg-green-50"
                          }
                        >
                          {payment.priority}
                        </Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <p className="text-sm font-bold">{payment.amount}</p>
                        <Button variant="ghost" size="sm">
                          Process
                        </Button>
                      </div>
                      <p className="text-xs text-muted-foreground">{payment.status}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="ghost" className="w-full" size="sm">
                  View All Pending Payments
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Insurance Claims</CardTitle>
                <CardDescription>Status of recent claims</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { name: "John Doe", amount: "GHS 450.00", status: "Approved", progress: 100 },
                    { name: "Jane Smith", amount: "GHS 300.00", status: "Under review", progress: 50 },
                    { name: "Robert Johnson", amount: "GHS 500.00", status: "Additional info requested", progress: 25 },
                  ].map((claim, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between">
                        <p className="text-sm font-medium">{claim.name}</p>
                        <p className="text-sm font-bold">{claim.amount}</p>
                      </div>
                      <div className="space-y-1">
                        <div className="flex justify-between text-xs">
                          <span>{claim.status}</span>
                          <span>{claim.progress}%</span>
                        </div>
                        <Progress value={claim.progress} className="h-2" />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="ghost" className="w-full" size="sm">
                  View All Insurance Claims
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Daily Revenue Breakdown</CardTitle>
                <CardDescription>Payment methods distribution</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { method: "Credit/Debit Cards", amount: "GHS 2,150.00", percentage: 50.8 },
                    { method: "Cash", amount: "GHS 950.00", percentage: 22.5 },
                    { method: "Mobile Money", amount: "GHS 750.00", percentage: 17.7 },
                    { method: "Cryptocurrency", amount: "GHS 381.89", percentage: 9.0 },
                  ].map((item, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between">
                        <p className="text-sm font-medium">{item.method}</p>
                        <p className="text-sm font-bold">{item.amount}</p>
                      </div>
                      <div className="space-y-1">
                        <Progress value={item.percentage} className="h-2" />
                        <p className="text-xs text-right text-muted-foreground">{item.percentage}%</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Today's Schedule</CardTitle>
                <CardDescription>Upcoming appointments with payments</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { time: "10:00 AM", patient: "Alice Johnson", procedure: "Dental Cleaning", amount: "GHS 150.00" },
                    { time: "11:30 AM", patient: "Bob Smith", procedure: "Root Canal", amount: "GHS 800.00" },
                    { time: "2:00 PM", patient: "Carol Williams", procedure: "Consultation", amount: "GHS 100.00" },
                    { time: "3:30 PM", patient: "David Brown", procedure: "Filling", amount: "GHS 250.00" },
                  ].map((appointment, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="flex flex-col items-center">
                        <div className="bg-primary/10 text-primary rounded-md px-2 py-1">
                          <Calendar className="h-4 w-4" />
                        </div>
                        <div className="w-px h-full bg-border mt-1 mb-1" />
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm font-medium">
                          {appointment.time} - {appointment.patient}
                        </p>
                        <p className="text-xs text-muted-foreground">{appointment.procedure}</p>
                        <div className="flex items-center">
                          <p className="text-xs font-medium">{appointment.amount}</p>
                          <Badge variant="outline" className="ml-2 text-xs">
                            Expected Payment
                          </Badge>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="payments" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Payments</CardTitle>
              <CardDescription>All payments processed in the last 24 hours</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    id: "PAY001",
                    patient: "John Doe",
                    amount: "GHS 250.00",
                    method: "Credit Card",
                    time: "30 mins ago",
                    status: "Completed",
                  },
                  {
                    id: "PAY002",
                    patient: "Jane Smith",
                    amount: "GHS 150.00",
                    method: "Cash",
                    time: "1 hour ago",
                    status: "Completed",
                  },
                  {
                    id: "PAY003",
                    patient: "Robert Johnson",
                    amount: "0.02 ETH",
                    method: "Crypto",
                    time: "2 hours ago",
                    status: "Completed",
                  },
                  {
                    id: "PAY004",
                    patient: "Emily Davis",
                    amount: "GHS 350.00",
                    method: "Mobile Money",
                    time: "3 hours ago",
                    status: "Completed",
                  },
                  {
                    id: "PAY005",
                    patient: "Michael Wilson",
                    amount: "GHS 500.00",
                    method: "Insurance",
                    time: "4 hours ago",
                    status: "Processing",
                  },
                ].map((payment, index) => (
                  <div key={index} className="flex items-center justify-between border-b pb-3 last:border-0 last:pb-0">
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-9 w-9">
                        <AvatarImage src={`/placeholder.svg?height=36&width=36`} alt={payment.patient} />
                        <AvatarFallback>{payment.patient.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium">{payment.patient}</p>
                        <div className="flex items-center">
                          <p className="text-xs text-muted-foreground">ID: {payment.id}</p>
                          <span className="mx-1 text-muted-foreground">•</span>
                          <p className="text-xs text-muted-foreground">{payment.time}</p>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold">{payment.amount}</p>
                      <div className="flex items-center justify-end space-x-2">
                        <p className="text-xs text-muted-foreground">{payment.method}</p>
                        <Badge
                          variant="outline"
                          className={
                            payment.status === "Completed" ? "text-green-600 bg-green-50" : "text-amber-600 bg-amber-50"
                          }
                        >
                          {payment.status}
                        </Badge>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="pending" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Pending Actions</CardTitle>
              <CardDescription>Items requiring your attention</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    title: "Insurance Claim Verification",
                    description: "3 claims need verification before submission",
                    icon: <FileText className="h-5 w-5" />,
                    priority: "High",
                  },
                  {
                    title: "Payment Plan Setup",
                    description: "2 patients waiting for payment plan configuration",
                    icon: <Users className="h-5 w-5" />,
                    priority: "Medium",
                  },
                  {
                    title: "Crypto Payment Confirmation",
                    description: "1 blockchain transaction pending confirmation",
                    icon: <Database className="h-5 w-5" />,
                    priority: "Medium",
                  },
                  {
                    title: "End of Day Reconciliation",
                    description: "Daily cash and electronic payments reconciliation",
                    icon: <Receipt className="h-5 w-5" />,
                    priority: "Low",
                  },
                ].map((action, index) => (
                  <div key={index} className="flex items-start space-x-3 border-b pb-3 last:border-0 last:pb-0">
                    <div
                      className={`rounded-full p-2 
                      ${
                        action.priority === "High"
                          ? "bg-red-100 text-red-600"
                          : action.priority === "Medium"
                            ? "bg-amber-100 text-amber-600"
                            : "bg-green-100 text-green-600"
                      }`}
                    >
                      {action.icon}
                    </div>
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium">{action.title}</p>
                        <Badge
                          variant="outline"
                          className={
                            action.priority === "High"
                              ? "text-red-600 bg-red-50"
                              : action.priority === "Medium"
                                ? "text-amber-600 bg-amber-50"
                                : "text-green-600 bg-green-50"
                          }
                        >
                          {action.priority}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">{action.description}</p>
                    </div>
                    <Button variant="outline" size="sm">
                      Action
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="bg-amber-50 text-amber-800 border-b">
              <div className="flex items-center space-x-2">
                <AlertCircle className="h-5 w-5" />
                <CardTitle>System Notifications</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="space-y-3">
                <p className="text-sm">
                  The insurance claim system will be under maintenance tonight from 10 PM to 2 AM. Please complete all
                  pending submissions before that time.
                </p>
                <p className="text-sm">
                  New payment processing fees will take effect starting next month. Please review the updated fee
                  schedule in the settings.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="analytics" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Weekly Revenue Trend</CardTitle>
                <CardDescription>Last 7 days performance</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[200px] flex items-end gap-2">
                  {[65, 45, 80, 72, 95, 60, 85].map((height, index) => (
                    <div key={index} className="flex-1 flex flex-col items-center gap-1">
                      <div className="w-full bg-primary/80 rounded-t-sm" style={{ height: `${height}%` }}></div>
                      <span className="text-xs text-muted-foreground">
                        {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"][index]}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Revenue</p>
                    <p className="text-xl font-bold">GHS 24,560.45</p>
                  </div>
                  <Badge className="bg-green-100 text-green-800">+12.5% from last week</Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Payment Method Distribution</CardTitle>
                <CardDescription>Current month breakdown</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { method: "Cash", icon: <Banknote className="h-5 w-5" />, percentage: 35, color: "bg-green-500" },
                    { method: "Card", icon: <CreditCard className="h-5 w-5" />, percentage: 42, color: "bg-blue-500" },
                    {
                      method: "Mobile",
                      icon: <Smartphone className="h-5 w-5" />,
                      percentage: 18,
                      color: "bg-purple-500",
                    },
                    { method: "Crypto", icon: <Database className="h-5 w-5" />, percentage: 5, color: "bg-amber-500" },
                  ].map((item, index) => (
                    <div key={index} className="flex flex-col items-center justify-center p-4 rounded-lg border">
                      <div className="p-3 rounded-full bg-muted mb-2">{item.icon}</div>
                      <p className="font-medium text-sm">{item.method}</p>
                      <p className="text-2xl font-bold">{item.percentage}%</p>
                      <div className="w-full h-1.5 bg-muted rounded-full mt-2 overflow-hidden">
                        <div className={`h-full ${item.color}`} style={{ width: `${item.percentage}%` }}></div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Financial Health</CardTitle>
                <CardDescription>Key performance indicators</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      title: "Daily Target",
                      value: "85%",
                      icon: <BarChart3 className="h-5 w-5" />,
                      description: "GHS 4,231.89 of GHS 5,000.00",
                      trend: "positive",
                    },
                    {
                      title: "Collection Rate",
                      value: "92%",
                      icon: <Wallet className="h-5 w-5" />,
                      description: "Outstanding: GHS 1,250.00",
                      trend: "positive",
                    },
                    {
                      title: "Insurance Claims",
                      value: "75%",
                      icon: <Shield className="h-5 w-5" />,
                      description: "6 of 8 claims approved",
                      trend: "neutral",
                    },
                    {
                      title: "Transaction Success",
                      value: "98%",
                      icon: <Activity className="h-5 w-5" />,
                      description: "1 failed out of 50 transactions",
                      trend: "positive",
                    },
                  ].map((item, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-full bg-primary/10 text-primary">{item.icon}</div>
                        <div>
                          <p className="font-medium">{item.title}</p>
                          <p className="text-xs text-muted-foreground">{item.description}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <p className="text-xl font-bold">{item.value}</p>
                        {item.trend === "positive" && <TrendingUp className="h-4 w-4 text-green-500" />}
                        {item.trend === "negative" && <TrendingUp className="h-4 w-4 text-red-500 rotate-180" />}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Payment Status Overview</CardTitle>
              <CardDescription>Current month payment processing status</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {[
                  {
                    title: "Completed",
                    count: 42,
                    icon: <CheckCircle className="h-5 w-5" />,
                    color: "text-green-500 bg-green-50",
                    description: "Successfully processed payments",
                  },
                  {
                    title: "Pending",
                    count: 8,
                    icon: <Clock className="h-5 w-5" />,
                    color: "text-amber-500 bg-amber-50",
                    description: "Awaiting processing or confirmation",
                  },
                  {
                    title: "Failed",
                    count: 3,
                    icon: <XCircle className="h-5 w-5" />,
                    color: "text-red-500 bg-red-50",
                    description: "Transactions that could not be completed",
                  },
                  {
                    title: "Disputed",
                    count: 1,
                    icon: <AlertTriangle className="h-5 w-5" />,
                    color: "text-orange-500 bg-orange-50",
                    description: "Payments under review due to disputes",
                  },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="flex flex-col items-center justify-center p-6 rounded-lg border text-center"
                  >
                    <div className={`p-3 rounded-full mb-3 ${item.color}`}>{item.icon}</div>
                    <p className="font-medium">{item.title}</p>
                    <p className="text-3xl font-bold my-2">{item.count}</p>
                    <p className="text-xs text-muted-foreground">{item.description}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Top Services by Revenue</CardTitle>
              <CardDescription>Highest revenue generating dental procedures</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { service: "Dental Implants", revenue: "GHS 12,500.00", percentage: 28, count: 5 },
                  { service: "Root Canal Therapy", revenue: "GHS 8,400.00", percentage: 19, count: 12 },
                  { service: "Orthodontic Treatment", revenue: "GHS 7,200.00", percentage: 16, count: 4 },
                  { service: "Teeth Whitening", revenue: "GHS 5,600.00", percentage: 13, count: 14 },
                  { service: "Dental Crowns", revenue: "GHS 4,800.00", percentage: 11, count: 8 },
                ].map((item, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">{item.service}</p>
                        <p className="text-xs text-muted-foreground">{item.count} procedures</p>
                      </div>
                      <p className="font-bold">{item.revenue}</p>
                    </div>
                    <div className="space-y-1">
                      <Progress value={item.percentage} className="h-2" />
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>{item.percentage}% of total revenue</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
