"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Search,
  Plus,
  Receipt,
  CreditCard,
  FileText,
  Download,
  Filter,
  Calendar,
  ArrowUpDown,
  MoreHorizontal,
  Banknote,
  Smartphone,
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { CryptoPayment } from "@/components/blockchain/crypto-payment"
import { Label } from "@/components/ui/label"

// Mock billing data
const invoices = [
  {
    id: "INV001",
    patientName: "John Doe",
    patientId: "P001",
    date: "2023-10-15",
    amount: "GHS 350.00",
    service: "Dental Checkup",
    status: "Paid",
    paymentMethod: "Cash",
  },
  {
    id: "INV002",
    patientName: "Jane Smith",
    patientId: "P002",
    date: "2023-10-15",
    amount: "GHS 1,200.00",
    service: "Root Canal",
    status: "Pending",
    paymentMethod: "Pending",
  },
  {
    id: "INV003",
    patientName: "Robert Johnson",
    patientId: "P003",
    date: "2023-10-14",
    amount: "GHS 500.00",
    service: "Teeth Cleaning",
    status: "Paid",
    paymentMethod: "Credit Card",
  },
  {
    id: "INV004",
    patientName: "Emily Davis",
    patientId: "P004",
    date: "2023-10-14",
    amount: "GHS 2,500.00",
    service: "Dental Implant",
    status: "Pending",
    paymentMethod: "Pending",
  },
  {
    id: "INV005",
    patientName: "Michael Brown",
    patientId: "P005",
    date: "2023-10-13",
    amount: "GHS 800.00",
    service: "Filling",
    status: "Paid",
    paymentMethod: "Mobile Money",
  },
  {
    id: "INV006",
    patientName: "Sarah Wilson",
    patientId: "P006",
    date: "2023-10-13",
    amount: "GHS 1,500.00",
    service: "Orthodontic Treatment",
    status: "Partially Paid",
    paymentMethod: "Multiple",
  },
  {
    id: "INV007",
    patientName: "David Lee",
    patientId: "P007",
    date: "2023-10-12",
    amount: "GHS 450.00",
    service: "Dental X-Ray",
    status: "Paid",
    paymentMethod: "Insurance",
  },
  {
    id: "INV008",
    patientName: "Lisa Taylor",
    patientId: "P008",
    date: "2023-10-12",
    amount: "GHS 3,200.00",
    service: "Wisdom Tooth Extraction",
    status: "Pending",
    paymentMethod: "Pending",
  },
]

export default function BillingPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [showCryptoPayment, setShowCryptoPayment] = useState(false)
  const [selectedInvoice, setSelectedInvoice] = useState<any>(null)

  const filteredInvoices = invoices.filter(
    (invoice) =>
      invoice.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invoice.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invoice.service.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleProcessPayment = (invoice: any) => {
    setSelectedInvoice(invoice)
  }

  const handleCryptoPayment = (invoice: any) => {
    setSelectedInvoice(invoice)
    setShowCryptoPayment(true)
  }

  const handleCryptoPaymentSuccess = () => {
    setShowCryptoPayment(false)
    // Handle successful payment
  }

  const handleCryptoPaymentCancel = () => {
    setShowCryptoPayment(false)
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Billing Management</h2>
          <p className="text-muted-foreground">View and manage patient invoices and payments</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            Export
          </Button>
          <Button className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            New Invoice
          </Button>
        </div>
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All Invoices</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="paid">Paid</TabsTrigger>
          <TabsTrigger value="partial">Partially Paid</TabsTrigger>
          <TabsTrigger value="overdue">Overdue</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Invoices</CardTitle>
                  <CardDescription>View and manage patient invoices</CardDescription>
                </div>
                <Button className="flex items-center gap-2">
                  <Plus className="h-4 w-4" />
                  New Invoice
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="mb-4 flex flex-col sm:flex-row items-center gap-2">
                <div className="relative flex-1 w-full">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search invoices..."
                    className="pl-8"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <Button variant="outline" size="icon" title="Filter">
                    <Filter className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon" title="Date Range">
                    <Calendar className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon" title="Sort">
                    <ArrowUpDown className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Invoice ID</TableHead>
                      <TableHead>Patient</TableHead>
                      <TableHead className="hidden md:table-cell">Service</TableHead>
                      <TableHead className="hidden md:table-cell">Date</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredInvoices.map((invoice) => (
                      <TableRow key={invoice.id}>
                        <TableCell className="font-medium">{invoice.id}</TableCell>
                        <TableCell>
                          <div>
                            <div className="font-medium">{invoice.patientName}</div>
                            <div className="text-xs text-muted-foreground">ID: {invoice.patientId}</div>
                          </div>
                        </TableCell>
                        <TableCell className="hidden md:table-cell">{invoice.service}</TableCell>
                        <TableCell className="hidden md:table-cell">{invoice.date}</TableCell>
                        <TableCell>{invoice.amount}</TableCell>
                        <TableCell>
                          <Badge
                            className={`${
                              invoice.status === "Paid"
                                ? "bg-green-100 text-green-800"
                                : invoice.status === "Partially Paid"
                                  ? "bg-blue-100 text-blue-800"
                                  : "bg-amber-100 text-amber-800"
                            }`}
                          >
                            {invoice.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuItem onClick={() => handleProcessPayment(invoice)}>
                                Process Payment
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleCryptoPayment(invoice)}>
                                Crypto Payment
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem>View Details</DropdownMenuItem>
                              <DropdownMenuItem>Print Invoice</DropdownMenuItem>
                              <DropdownMenuItem>Email Invoice</DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="text-red-600">Void Invoice</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              <div className="flex items-center justify-between mt-4">
                <div className="text-sm text-muted-foreground">
                  Showing <strong>{filteredInvoices.length}</strong> of <strong>{invoices.length}</strong> invoices
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" disabled>
                    Previous
                  </Button>
                  <Button variant="outline" size="sm">
                    Next
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Payment Summary</CardTitle>
                <CardDescription>Overview of payment status</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm text-muted-foreground">Total Invoices</p>
                      <p className="text-2xl font-bold">{invoices.length}</p>
                    </div>
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <FileText className="h-5 w-5 text-primary" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Paid</span>
                      <span className="font-medium">
                        {invoices.filter((inv) => inv.status === "Paid").length} (
                        {Math.round((invoices.filter((inv) => inv.status === "Paid").length / invoices.length) * 100)}%)
                      </span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-green-500 rounded-full"
                        style={{
                          width: `${Math.round((invoices.filter((inv) => inv.status === "Paid").length / invoices.length) * 100)}%`,
                        }}
                      ></div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Pending</span>
                      <span className="font-medium">
                        {invoices.filter((inv) => inv.status === "Pending").length} (
                        {Math.round(
                          (invoices.filter((inv) => inv.status === "Pending").length / invoices.length) * 100,
                        )}
                        %)
                      </span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-amber-500 rounded-full"
                        style={{
                          width: `${Math.round((invoices.filter((inv) => inv.status === "Pending").length / invoices.length) * 100)}%`,
                        }}
                      ></div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Partially Paid</span>
                      <span className="font-medium">
                        {invoices.filter((inv) => inv.status === "Partially Paid").length} (
                        {Math.round(
                          (invoices.filter((inv) => inv.status === "Partially Paid").length / invoices.length) * 100,
                        )}
                        %)
                      </span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-blue-500 rounded-full"
                        style={{
                          width: `${Math.round((invoices.filter((inv) => inv.status === "Partially Paid").length / invoices.length) * 100)}%`,
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Payment Methods</CardTitle>
                <CardDescription>Distribution by payment type</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      method: "Cash",
                      count: 2,
                      icon: <Banknote className="h-4 w-4" />,
                      color: "bg-green-100 text-green-800",
                    },
                    {
                      method: "Credit Card",
                      count: 1,
                      icon: <CreditCard className="h-4 w-4" />,
                      color: "bg-blue-100 text-blue-800",
                    },
                    {
                      method: "Mobile Money",
                      count: 1,
                      icon: <Smartphone className="h-4 w-4" />,
                      color: "bg-purple-100 text-purple-800",
                    },
                    {
                      method: "Insurance",
                      count: 1,
                      icon: <FileText className="h-4 w-4" />,
                      color: "bg-indigo-100 text-indigo-800",
                    },
                    {
                      method: "Multiple",
                      count: 1,
                      icon: <Receipt className="h-4 w-4" />,
                      color: "bg-orange-100 text-orange-800",
                    },
                  ].map((item, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className={`p-2 rounded-full ${item.color.split(" ")[0]}`}>{item.icon}</div>
                        <span>{item.method}</span>
                      </div>
                      <Badge variant="outline" className={item.color}>
                        {item.count}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Latest billing actions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      action: "Payment Received",
                      details: "INV001 - John Doe",
                      time: "10 mins ago",
                      icon: <CreditCard className="h-4 w-4" />,
                    },
                    {
                      action: "Invoice Created",
                      details: "INV008 - Lisa Taylor",
                      time: "30 mins ago",
                      icon: <FileText className="h-4 w-4" />,
                    },
                    {
                      action: "Payment Reminder Sent",
                      details: "INV004 - Emily Davis",
                      time: "1 hour ago",
                      icon: <Receipt className="h-4 w-4" />,
                    },
                    {
                      action: "Partial Payment",
                      details: "INV006 - Sarah Wilson",
                      time: "2 hours ago",
                      icon: <Banknote className="h-4 w-4" />,
                    },
                  ].map((item, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="mt-0.5 bg-primary/10 p-1.5 rounded-full text-primary">{item.icon}</div>
                      <div>
                        <p className="font-medium text-sm">{item.action}</p>
                        <p className="text-xs text-muted-foreground">{item.details}</p>
                        <p className="text-xs text-muted-foreground">{item.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="pending" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Pending Invoices</CardTitle>
              <CardDescription>Invoices awaiting payment</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Invoice ID</TableHead>
                    <TableHead>Patient</TableHead>
                    <TableHead>Service</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {invoices
                    .filter((invoice) => invoice.status === "Pending")
                    .map((invoice) => (
                      <TableRow key={invoice.id}>
                        <TableCell className="font-medium">{invoice.id}</TableCell>
                        <TableCell>{invoice.patientName}</TableCell>
                        <TableCell>{invoice.service}</TableCell>
                        <TableCell>{invoice.date}</TableCell>
                        <TableCell>{invoice.amount}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button variant="outline" size="sm" onClick={() => handleProcessPayment(invoice)}>
                              Process Payment
                            </Button>
                            <Button variant="ghost" size="icon" title="View Invoice">
                              <FileText className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="paid" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Paid Invoices</CardTitle>
              <CardDescription>Completed payments</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Invoice ID</TableHead>
                    <TableHead>Patient</TableHead>
                    <TableHead>Service</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Payment Method</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {invoices
                    .filter((invoice) => invoice.status === "Paid")
                    .map((invoice) => (
                      <TableRow key={invoice.id}>
                        <TableCell className="font-medium">{invoice.id}</TableCell>
                        <TableCell>{invoice.patientName}</TableCell>
                        <TableCell>{invoice.service}</TableCell>
                        <TableCell>{invoice.date}</TableCell>
                        <TableCell>{invoice.amount}</TableCell>
                        <TableCell>{invoice.paymentMethod}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button variant="ghost" size="icon" title="Print Receipt">
                              <Receipt className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" title="View Invoice">
                              <FileText className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="partial" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Partially Paid Invoices</CardTitle>
              <CardDescription>Invoices with partial payments</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Invoice ID</TableHead>
                    <TableHead>Patient</TableHead>
                    <TableHead>Service</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Total Amount</TableHead>
                    <TableHead>Paid Amount</TableHead>
                    <TableHead>Remaining</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {invoices
                    .filter((invoice) => invoice.status === "Partially Paid")
                    .map((invoice) => (
                      <TableRow key={invoice.id}>
                        <TableCell className="font-medium">{invoice.id}</TableCell>
                        <TableCell>{invoice.patientName}</TableCell>
                        <TableCell>{invoice.service}</TableCell>
                        <TableCell>{invoice.date}</TableCell>
                        <TableCell>{invoice.amount}</TableCell>
                        <TableCell>GHS 750.00</TableCell>
                        <TableCell>GHS 750.00</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button variant="outline" size="sm" onClick={() => handleProcessPayment(invoice)}>
                              Complete Payment
                            </Button>
                            <Button variant="ghost" size="icon" title="View Invoice">
                              <FileText className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="overdue" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Overdue Invoices</CardTitle>
              <CardDescription>Invoices past their due date</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Overdue invoices content would go here.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Payment Processing Dialog */}
      <Dialog>
        <DialogTrigger asChild>
          <span className="hidden">Process Payment</span>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Process Payment</DialogTitle>
            <DialogDescription>Enter payment details for invoice {selectedInvoice?.id}</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="paymentMethod">Payment Method</Label>
              <Select defaultValue="cash">
                <SelectTrigger>
                  <SelectValue placeholder="Select payment method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cash">Cash</SelectItem>
                  <SelectItem value="card">Credit/Debit Card</SelectItem>
                  <SelectItem value="mobile">Mobile Money</SelectItem>
                  <SelectItem value="insurance">Insurance</SelectItem>
                  <SelectItem value="crypto">Cryptocurrency</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="amount">Amount</Label>
              <Input id="amount" defaultValue={selectedInvoice?.amount?.replace("GHS ", "")} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="reference">Reference/Receipt Number</Label>
              <Input id="reference" placeholder="Enter reference number" />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Process Payment</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Crypto Payment Modal */}
      {showCryptoPayment && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="max-w-md w-full">
            <CryptoPayment
              amount={Number.parseFloat(selectedInvoice?.amount?.replace("GHS ", "") || "0")}
              invoiceId={selectedInvoice?.id || ""}
              onSuccess={handleCryptoPaymentSuccess}
              onCancel={handleCryptoPaymentCancel}
            />
          </div>
        </div>
      )}
    </div>
  )
}
