"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Shield,
  Search,
  Filter,
  Calendar,
  Download,
  CheckCircle,
  Clock,
  XCircle,
  AlertTriangle,
  Plus,
  RefreshCw,
} from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { useAuth } from "@/contexts/auth-context"

export default function InsurancePage() {
  const { user } = useAuth()
  const [searchQuery, setSearchQuery] = useState("")

  const insuranceClaims = [
    {
      id: "INS-2023-001",
      patient: "John Doe",
      provider: "National Health Insurance",
      amount: "GHS 450.00",
      date: "2023-03-10",
      status: "Approved",
      progress: 100,
      procedure: "Root Canal",
    },
    {
      id: "INS-2023-002",
      patient: "Jane Smith",
      provider: "Dental Care Plus",
      amount: "GHS 300.00",
      date: "2023-03-12",
      status: "Under review",
      progress: 50,
      procedure: "Dental Cleaning",
    },
    {
      id: "INS-2023-003",
      patient: "Robert Johnson",
      provider: "Health Assurance",
      amount: "GHS 500.00",
      date: "2023-03-14",
      status: "Additional info requested",
      progress: 25,
      procedure: "Dental Implant",
    },
    {
      id: "INS-2023-004",
      patient: "Emily Davis",
      provider: "National Health Insurance",
      amount: "GHS 250.00",
      date: "2023-03-15",
      status: "Submitted",
      progress: 10,
      procedure: "Filling",
    },
    {
      id: "INS-2023-005",
      patient: "Michael Wilson",
      provider: "Dental Care Plus",
      amount: "GHS 350.00",
      date: "2023-03-08",
      status: "Rejected",
      progress: 100,
      procedure: "Orthodontic Treatment",
    },
    {
      id: "INS-2023-006",
      patient: "Sarah Brown",
      provider: "Health Assurance",
      amount: "GHS 400.00",
      date: "2023-03-05",
      status: "Approved",
      progress: 100,
      procedure: "Wisdom Tooth Extraction",
    },
  ]

  const filteredClaims = insuranceClaims.filter(
    (claim) =>
      claim.patient.toLowerCase().includes(searchQuery.toLowerCase()) ||
      claim.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      claim.provider.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Insurance Claims</h2>
          <p className="text-muted-foreground">Manage and track insurance claims for patients</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export Claims
          </Button>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            New Claim
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Claims</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{insuranceClaims.length}</div>
            <p className="text-xs text-muted-foreground">For the current month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Approved</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {insuranceClaims.filter((claim) => claim.status === "Approved").length}
            </div>
            <p className="text-xs text-muted-foreground">
              {Math.round(
                (insuranceClaims.filter((claim) => claim.status === "Approved").length / insuranceClaims.length) * 100,
              )}
              % approval rate
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-600">
              {
                insuranceClaims.filter((claim) =>
                  ["Under review", "Additional info requested", "Submitted"].includes(claim.status),
                ).length
              }
            </div>
            <p className="text-xs text-muted-foreground">Awaiting processing or review</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Rejected</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              {insuranceClaims.filter((claim) => claim.status === "Rejected").length}
            </div>
            <p className="text-xs text-muted-foreground">Need attention or resubmission</p>
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search by patient, ID, or provider..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2">
          <Select defaultValue="all">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Insurance Provider" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Providers</SelectItem>
              <SelectItem value="national">National Health Insurance</SelectItem>
              <SelectItem value="dental">Dental Care Plus</SelectItem>
              <SelectItem value="health">Health Assurance</SelectItem>
            </SelectContent>
          </Select>
          <Select defaultValue="all">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="approved">Approved</SelectItem>
              <SelectItem value="review">Under Review</SelectItem>
              <SelectItem value="submitted">Submitted</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
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
          <TabsTrigger value="all">All Claims</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="approved">Approved</TabsTrigger>
          <TabsTrigger value="rejected">Rejected</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="space-y-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Insurance Claims</CardTitle>
              <CardDescription>
                Showing {filteredClaims.length} of {insuranceClaims.length} total claims
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <div className="grid grid-cols-7 bg-muted/50 p-3 text-sm font-medium">
                  <div className="col-span-2">Patient / Claim ID</div>
                  <div className="text-center">Provider</div>
                  <div className="text-center">Procedure</div>
                  <div className="text-center">Amount</div>
                  <div className="text-center">Status</div>
                  <div className="text-right">Actions</div>
                </div>
                <div className="divide-y">
                  {filteredClaims.map((claim, index) => (
                    <div key={index} className="grid grid-cols-7 items-center p-3 text-sm">
                      <div className="col-span-2 flex items-center gap-3">
                        <Avatar className="h-9 w-9">
                          <AvatarImage src={`/placeholder.svg?height=36&width=36`} alt={claim.patient} />
                          <AvatarFallback>{claim.patient.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{claim.patient}</p>
                          <p className="text-xs text-muted-foreground">
                            {claim.id} • {claim.date}
                          </p>
                        </div>
                      </div>
                      <div className="text-center">
                        <Badge variant="outline" className="bg-blue-50 text-blue-700">
                          <Shield className="mr-1 h-3 w-3" />
                          {claim.provider}
                        </Badge>
                      </div>
                      <div className="text-center text-sm">{claim.procedure}</div>
                      <div className="text-center font-medium">{claim.amount}</div>
                      <div className="text-center">
                        <div className="space-y-1">
                          <Badge
                            variant="outline"
                            className={`
                              ${claim.status === "Approved" ? "bg-green-50 text-green-700" : ""}
                              ${claim.status === "Under review" ? "bg-amber-50 text-amber-700" : ""}
                              ${claim.status === "Additional info requested" ? "bg-blue-50 text-blue-700" : ""}
                              ${claim.status === "Submitted" ? "bg-purple-50 text-purple-700" : ""}
                              ${claim.status === "Rejected" ? "bg-red-50 text-red-700" : ""}
                            `}
                          >
                            {claim.status === "Approved" && <CheckCircle className="mr-1 h-3 w-3" />}
                            {claim.status === "Under review" && <Clock className="mr-1 h-3 w-3" />}
                            {claim.status === "Additional info requested" && <AlertTriangle className="mr-1 h-3 w-3" />}
                            {claim.status === "Submitted" && <RefreshCw className="mr-1 h-3 w-3" />}
                            {claim.status === "Rejected" && <XCircle className="mr-1 h-3 w-3" />}
                            {claim.status}
                          </Badge>
                          <Progress value={claim.progress} className="h-1.5 w-24 mx-auto" />
                        </div>
                      </div>
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="sm">
                          View
                        </Button>
                        <Button variant="ghost" size="sm">
                          Update
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex items-center justify-between border-t p-4">
              <div className="text-sm text-muted-foreground">
                Showing <strong>1-6</strong> of <strong>6</strong> claims
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" disabled>
                  Previous
                </Button>
                <Button variant="outline" size="sm" disabled>
                  Next
                </Button>
              </div>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="pending" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Pending Claims</CardTitle>
              <CardDescription>Claims awaiting processing or review</CardDescription>
            </CardHeader>
            <CardContent>{/* Similar content as "all" tab but filtered for pending status */}</CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="approved" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Approved Claims</CardTitle>
              <CardDescription>Successfully processed claims</CardDescription>
            </CardHeader>
            <CardContent>{/* Similar content as "all" tab but filtered for approved status */}</CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="rejected" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Rejected Claims</CardTitle>
              <CardDescription>Claims that were denied</CardDescription>
            </CardHeader>
            <CardContent>{/* Similar content as "all" tab but filtered for rejected status */}</CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
