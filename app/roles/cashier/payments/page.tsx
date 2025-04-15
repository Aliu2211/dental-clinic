"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DollarSign,
  CreditCard,
  Banknote,
  Smartphone,
  Search,
  Filter,
  Calendar,
  Download,
  CheckCircle,
  Clock,
  XCircle,
  ArrowUpDown,
  Plus,
  Shield,
} from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useAuth } from "@/contexts/auth-context"

export default function PaymentsPage() {
  const { user } = useAuth()
  const [searchQuery, setSearchQuery] = useState("")

  const payments = [
    {
      id: "PAY-2023-001",
      patient: "John Doe",
      amount: "GHS 250.00",
      date: "2023-03-15",
      method: "Credit Card",
      status: "Completed",
      reference: "VISA-4242",
      time: "10:30 AM",
    },
    {
      id: "PAY-2023-002",
      patient: "Jane Smith",
      amount: "GHS 150.00",
      date: "2023-03-15",
      method: "Cash",
      status: "Completed",
      reference: "CASH-1234",
      time: "11:45 AM",
    },
    {
      id: "PAY-2023-003",
      patient: "Robert Johnson",
      amount: "0.02 ETH",
      date: "2023-03-15",
      method: "Crypto",
      status: "Completed",
      reference: "ETH-TX-5678",
      time: "1:15 PM",
    },
    {
      id: "PAY-2023-004",
      patient: "Emily Davis",
      amount: "GHS 350.00",
      date: "2023-03-15",
      method: "Mobile Money",
      status: "Pending",
      reference: "MOMO-9012",
      time: "2:30 PM",
    },
    {
      id: "PAY-2023-005",
      patient: "Michael Wilson",
      amount: "GHS 500.00",
      date: "2023-03-15",
      method: "Insurance",
      status: "Processing",
      reference: "INS-3456",
      time: "3:45 PM",
    },
    {
      id: "PAY-2023-006",
      patient: "Sarah Brown",
      amount: "GHS 200.00",
      date: "2023-03-14",
      method: "Credit Card",
      status: "Completed",
      reference: "VISA-7890",
      time: "9:15 AM",
    },
    {
      id: "PAY-2023-007",
      patient: "David Lee",
      amount: "GHS 175.00",
      date: "2023-03-14",
      method: "Cash",
      status: "Completed",
      reference: "CASH-2345",
      time: "10:45 AM",
    },
    {
      id: "PAY-2023-008",
      patient: "Lisa Taylor",
      amount: "GHS 450.00",
      date: "2023-03-14",
      method: "Insurance",
      status: "Failed",
      reference: "INS-6789",
      time: "1:30 PM",
    },
  ]

  const filteredPayments = payments.filter(
    (payment) =>
      payment.patient.toLowerCase().includes(searchQuery.toLowerCase()) ||
      payment.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      payment.reference.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Payments</h2>
          <p className="text-muted-foreground">Manage and track all payment transactions</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            New Payment
          </Button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search by patient, ID, or reference..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2">
          <Select defaultValue="all">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Payment Method" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Methods</SelectItem>
              <SelectItem value="card">Credit Card</SelectItem>
              <SelectItem value="cash">Cash</SelectItem>
              <SelectItem value="mobile">Mobile Money</SelectItem>
              <SelectItem value="crypto">Cryptocurrency</SelectItem>
              <SelectItem value="insurance">Insurance</SelectItem>
            </SelectContent>
          </Select>
          <Select defaultValue="all">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="processing">Processing</SelectItem>
              <SelectItem value="failed">Failed</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon">
            <Calendar className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All Payments</TabsTrigger>
          <TabsTrigger value="today">Today</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="failed">Failed</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="space-y-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Payment Transactions</CardTitle>
              <CardDescription>
                Showing {filteredPayments.length} of {payments.length} total payments
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <div className="grid grid-cols-7 bg-muted/50 p-3 text-sm font-medium">
                  <div className="col-span-2">Patient / Reference</div>
                  <div className="text-center">Date & Time</div>
                  <div className="text-center">Amount</div>
                  <div className="text-center">Method</div>
                  <div className="text-center">Status</div>
                  <div className="text-right">Actions</div>
                </div>
                <div className="divide-y">
                  {filteredPayments.map((payment, index) => (
                    <div key={index} className="grid grid-cols-7 items-center p-3 text-sm">
                      <div className="col-span-2 flex items-center gap-3">
                        <Avatar className="h-9 w-9">
                          <AvatarImage src={`/placeholder.svg?height=36&width=36`} alt={payment.patient} />
                          <AvatarFallback>{payment.patient.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{payment.patient}</p>
                          <p className="text-xs text-muted-foreground">
                            {payment.id} • {payment.reference}
                          </p>
                        </div>
                      </div>
                      <div className="text-center">
                        <p>{payment.date}</p>
                        <p className="text-xs text-muted-foreground">{payment.time}</p>
                      </div>
                      <div className="text-center font-medium">{payment.amount}</div>
                      <div className="text-center">
                        <Badge variant="outline" className="flex items-center justify-center gap-1 w-fit mx-auto">
                          {payment.method === "Credit Card" && <CreditCard className="h-3 w-3" />}
                          {payment.method === "Cash" && <Banknote className="h-3 w-3" />}
                          {payment.method === "Mobile Money" && <Smartphone className="h-3 w-3" />}
                          {payment.method === "Crypto" && <DollarSign className="h-3 w-3" />}
                          {payment.method === "Insurance" && <Shield className="h-3 w-3" />}
                          <span>{payment.method}</span>
                        </Badge>
                      </div>
                      <div className="text-center">
                        <Badge
                          variant="outline"
                          className={`
                            ${payment.status === "Completed" ? "bg-green-50 text-green-700" : ""}
                            ${payment.status === "Pending" ? "bg-amber-50 text-amber-700" : ""}
                            ${payment.status === "Processing" ? "bg-blue-50 text-blue-700" : ""}
                            ${payment.status === "Failed" ? "bg-red-50 text-red-700" : ""}
                          `}
                        >
                          {payment.status === "Completed" && <CheckCircle className="mr-1 h-3 w-3" />}
                          {payment.status === "Pending" && <Clock className="mr-1 h-3 w-3" />}
                          {payment.status === "Processing" && <ArrowUpDown className="mr-1 h-3 w-3" />}
                          {payment.status === "Failed" && <XCircle className="mr-1 h-3 w-3" />}
                          {payment.status}
                        </Badge>
                      </div>
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="sm">
                          View
                        </Button>
                        <Button variant="ghost" size="sm">
                          Receipt
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex items-center justify-between border-t p-4">
              <div className="text-sm text-muted-foreground">
                Showing <strong>1-8</strong> of <strong>24</strong> payments
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" disabled>
                  Previous
                </Button>
                <Button variant="outline" size="sm">
                  Next
                </Button>
              </div>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="today" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Today's Payments</CardTitle>
              <CardDescription>All payments processed today</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Showing payments for {new Date().toLocaleDateString()}</p>
              {/* Similar content as "all" tab but filtered for today */}
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="pending" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Pending Payments</CardTitle>
              <CardDescription>Payments awaiting processing or confirmation</CardDescription>
            </CardHeader>
            <CardContent>{/* Similar content as "all" tab but filtered for pending status */}</CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="failed" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Failed Payments</CardTitle>
              <CardDescription>Payments that could not be processed</CardDescription>
            </CardHeader>
            <CardContent>{/* Similar content as "all" tab but filtered for failed status */}</CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
