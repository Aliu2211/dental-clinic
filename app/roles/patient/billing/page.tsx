"use client"

import { useState } from "react"
import { useContext } from "react"
import { AuthContext } from "@/contexts/auth-context"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CreditCard, Download, Receipt, Clock, DollarSign, Calendar, AlertCircle } from "lucide-react"
import { CryptoPayment } from "@/components/blockchain/crypto-payment"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

// Mock data for billing
const billingData = {
  currentBalance: 850.0,
  nextPaymentDue: "2023-05-15",
  paymentHistory: [
    { id: "INV-001", date: "2023-04-01", amount: 150.0, status: "paid", description: "Dental Cleaning" },
    { id: "INV-002", date: "2023-03-15", amount: 350.0, status: "paid", description: "Cavity Filling (2)" },
    { id: "INV-003", date: "2023-02-28", amount: 200.0, status: "paid", description: "X-Ray and Consultation" },
  ],
  pendingInvoices: [
    { id: "INV-004", date: "2023-04-15", dueDate: "2023-05-15", amount: 450.0, description: "Root Canal Treatment" },
    { id: "INV-005", date: "2023-04-20", dueDate: "2023-05-20", amount: 400.0, description: "Crown Installation" },
  ],
  insuranceClaims: [
    {
      id: "CLM-001",
      date: "2023-04-15",
      amount: 350.0,
      status: "processing",
      description: "Root Canal - Insurance Claim",
    },
    { id: "CLM-002", date: "2023-04-20", amount: 300.0, status: "approved", description: "Crown - Insurance Claim" },
  ],
}

export default function PatientBillingPage() {
  const { user } = useContext(AuthContext)
  const [showPaymentModal, setShowPaymentModal] = useState(false)
  const [selectedInvoice, setSelectedInvoice] = useState<any>(null)

  const handlePayNow = (invoice: any) => {
    setSelectedInvoice(invoice)
    setShowPaymentModal(true)
  }

  const handlePaymentSuccess = () => {
    // In a real app, you would update the invoice status in the database
    setTimeout(() => {
      setShowPaymentModal(false)
      setSelectedInvoice(null)
    }, 2000)
  }

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Alert variant="destructive" className="max-w-md">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Authentication Error</AlertTitle>
          <AlertDescription>You must be logged in to view this page. Please log in and try again.</AlertDescription>
        </Alert>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-4 space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Billing & Payments</h1>
          <p className="text-muted-foreground">Manage your invoices, payments, and insurance claims</p>
        </div>
        <Button className="flex items-center gap-2">
          <Download className="h-4 w-4" />
          Download Statement
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">Current Balance</CardTitle>
            <CardDescription>Outstanding amount</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">${billingData.currentBalance.toFixed(2)}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">Next Payment Due</CardTitle>
            <CardDescription>Mark your calendar</CardDescription>
          </CardHeader>
          <CardContent className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-muted-foreground" />
            <div className="text-xl font-medium">
              {new Date(billingData.nextPaymentDue).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">Payment Methods</CardTitle>
            <CardDescription>Manage your payment options</CardDescription>
          </CardHeader>
          <CardContent className="flex gap-2">
            <Button variant="outline" size="sm" className="flex items-center gap-2">
              <CreditCard className="h-4 w-4" />
              Credit Card
            </Button>
            <Button variant="outline" size="sm" className="flex items-center gap-2">
              <DollarSign className="h-4 w-4" />
              Crypto
            </Button>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="invoices" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-6">
          <TabsTrigger value="invoices">Invoices</TabsTrigger>
          <TabsTrigger value="payment-history">Payment History</TabsTrigger>
          <TabsTrigger value="insurance">Insurance Claims</TabsTrigger>
        </TabsList>

        <TabsContent value="invoices" className="space-y-4">
          <h2 className="text-xl font-semibold mb-4">Pending Invoices</h2>
          {billingData.pendingInvoices.map((invoice) => (
            <Card key={invoice.id} className="mb-4">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg font-medium">{invoice.description}</CardTitle>
                    <CardDescription>Invoice #{invoice.id}</CardDescription>
                  </div>
                  <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
                    Pending
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="pb-2">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <Receipt className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">
                      Issued: {new Date(invoice.date).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">
                      Due: {new Date(invoice.dueDate).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between pt-2">
                <div className="text-xl font-bold">${invoice.amount.toFixed(2)}</div>
                <Button onClick={() => handlePayNow(invoice)}>Pay Now</Button>
              </CardFooter>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="payment-history" className="space-y-4">
          <h2 className="text-xl font-semibold mb-4">Payment History</h2>
          {billingData.paymentHistory.map((payment) => (
            <Card key={payment.id} className="mb-4">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg font-medium">{payment.description}</CardTitle>
                    <CardDescription>Receipt #{payment.id}</CardDescription>
                  </div>
                  <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                    Paid
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="pb-2">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">
                    Paid on: {new Date(payment.date).toLocaleDateString()}
                  </span>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between pt-2">
                <div className="text-xl font-bold">${payment.amount.toFixed(2)}</div>
                <Button variant="outline" size="sm" className="flex items-center gap-2">
                  <Download className="h-4 w-4" />
                  Receipt
                </Button>
              </CardFooter>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="insurance" className="space-y-4">
          <h2 className="text-xl font-semibold mb-4">Insurance Claims</h2>
          {billingData.insuranceClaims.map((claim) => (
            <Card key={claim.id} className="mb-4">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg font-medium">{claim.description}</CardTitle>
                    <CardDescription>Claim #{claim.id}</CardDescription>
                  </div>
                  <Badge
                    variant="outline"
                    className={
                      claim.status === "approved"
                        ? "bg-green-50 text-green-700 border-green-200"
                        : "bg-blue-50 text-blue-700 border-blue-200"
                    }
                  >
                    {claim.status === "approved" ? "Approved" : "Processing"}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="pb-2">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">
                    Filed on: {new Date(claim.date).toLocaleDateString()}
                  </span>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between pt-2">
                <div className="text-xl font-bold">${claim.amount.toFixed(2)}</div>
                <Button variant="outline" size="sm">
                  View Details
                </Button>
              </CardFooter>
            </Card>
          ))}
        </TabsContent>
      </Tabs>

      {showPaymentModal && selectedInvoice && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-lg max-w-md w-full">
            <div className="p-4 border-b">
              <h2 className="text-xl font-bold">Pay Invoice #{selectedInvoice.id}</h2>
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-4 right-4"
                onClick={() => setShowPaymentModal(false)}
              >
                ✕
              </Button>
            </div>
            <div className="p-4">
              <CryptoPayment
                amount={selectedInvoice.amount}
                invoiceId={selectedInvoice.id}
                onSuccess={handlePaymentSuccess}
                onCancel={() => setShowPaymentModal(false)}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
