"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Download,
  TrendingUp,
  Printer,
  Mail,
  Share2,
  Filter,
  CreditCard,
  Banknote,
  Smartphone,
  Database,
} from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { useAuth } from "@/contexts/auth-context"

export default function ReportsPage() {
  const { user } = useAuth()
  const [dateRange, setDateRange] = useState("month")

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Financial Reports</h2>
          <p className="text-muted-foreground">Generate and analyze financial data</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <Printer className="mr-2 h-4 w-4" />
            Print
          </Button>
          <Button variant="outline">
            <Mail className="mr-2 h-4 w-4" />
            Email
          </Button>
          <Button>
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
        <div className="flex items-center gap-2 flex-1">
          <Select value={dateRange} onValueChange={setDateRange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Date Range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="today">Today</SelectItem>
              <SelectItem value="week">This Week</SelectItem>
              <SelectItem value="month">This Month</SelectItem>
              <SelectItem value="quarter">This Quarter</SelectItem>
              <SelectItem value="year">This Year</SelectItem>
              <SelectItem value="custom">Custom Range</SelectItem>
            </SelectContent>
          </Select>
          {dateRange === "custom" && (
            <div className="flex items-center gap-2">
              <Input type="date" className="w-auto" />
              <span>to</span>
              <Input type="date" className="w-auto" />
            </div>
          )}
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Share2 className="mr-2 h-4 w-4" />
            Share Report
          </Button>
        </div>
      </div>

      <Tabs defaultValue="summary" className="space-y-4">
        <TabsList>
          <TabsTrigger value="summary">Summary</TabsTrigger>
          <TabsTrigger value="revenue">Revenue</TabsTrigger>
          <TabsTrigger value="payments">Payments</TabsTrigger>
          <TabsTrigger value="insurance">Insurance</TabsTrigger>
        </TabsList>
        <TabsContent value="summary" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">GHS 24,560.45</div>
                <div className="flex items-center pt-1">
                  <TrendingUp className="mr-1 h-3 w-3 text-green-600" />
                  <span className="text-xs text-green-600">+12.5% from last month</span>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Transactions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">156</div>
                <div className="flex items-center pt-1">
                  <TrendingUp className="mr-1 h-3 w-3 text-green-600" />
                  <span className="text-xs text-green-600">+8.2% from last month</span>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Average Transaction</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">GHS 157.44</div>
                <div className="flex items-center pt-1">
                  <TrendingUp className="mr-1 h-3 w-3 text-green-600" />
                  <span className="text-xs text-green-600">+3.8% from last month</span>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Insurance Claims</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">42</div>
                <div className="flex items-center pt-1">
                  <span className="text-xs text-muted-foreground">75% approval rate</span>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Revenue Trend</CardTitle>
                <CardDescription>Monthly revenue for the past 6 months</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[250px] flex items-end gap-2">
                  {[18500, 21200, 19800, 22400, 23100, 24560].map((amount, index) => (
                    <div key={index} className="flex-1 flex flex-col items-center gap-1">
                      <div
                        className="w-full bg-primary/80 rounded-t-sm"
                        style={{ height: `${(amount / 25000) * 100}%` }}
                      ></div>
                      <span className="text-xs text-muted-foreground">
                        {["Oct", "Nov", "Dec", "Jan", "Feb", "Mar"][index]}
                      </span>
                      <span className="text-xs font-medium">
                        {amount.toLocaleString("en-US", {
                          style: "currency",
                          currency: "GHS",
                          minimumFractionDigits: 0,
                          maximumFractionDigits: 0,
                        })}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Payment Method Distribution</CardTitle>
                <CardDescription>Breakdown by payment type</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    {
                      method: "Credit/Debit Cards",
                      icon: <CreditCard className="h-5 w-5" />,
                      percentage: 42,
                      color: "bg-blue-500",
                    },
                    { method: "Cash", icon: <Banknote className="h-5 w-5" />, percentage: 35, color: "bg-green-500" },
                    {
                      method: "Mobile Money",
                      icon: <Smartphone className="h-5 w-5" />,
                      percentage: 18,
                      color: "bg-purple-500",
                    },
                    {
                      method: "Cryptocurrency",
                      icon: <Database className="h-5 w-5" />,
                      percentage: 5,
                      color: "bg-amber-500",
                    },
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
          </div>

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
        <TabsContent value="revenue" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Revenue Analysis</CardTitle>
              <CardDescription>Detailed breakdown of revenue sources</CardDescription>
            </CardHeader>
            <CardContent>{/* Revenue analysis content */}</CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="payments" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Payment Reports</CardTitle>
              <CardDescription>Detailed payment transaction reports</CardDescription>
            </CardHeader>
            <CardContent>{/* Payment reports content */}</CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="insurance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Insurance Reports</CardTitle>
              <CardDescription>Insurance claims and reimbursements</CardDescription>
            </CardHeader>
            <CardContent>{/* Insurance reports content */}</CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
