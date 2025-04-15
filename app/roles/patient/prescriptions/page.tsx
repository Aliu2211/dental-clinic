"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Search, Pill, Calendar, Clock, User, AlertCircle, FileText, RefreshCw, Download, Printer } from "lucide-react"

// Mock prescriptions data
const prescriptions = [
  {
    id: "RX001",
    medication: "Amoxicillin",
    dosage: "500mg",
    frequency: "3 times daily",
    duration: "7 days",
    doctor: "Dr. Sarah Johnson",
    date: "2023-10-01",
    expiryDate: "2023-10-31",
    refillsRemaining: 1,
    refillsTotal: 2,
    status: "Active",
    instructions: "Take with food. Complete the full course even if you feel better.",
    sideEffects: "May cause nausea, diarrhea, or rash. Contact your doctor if you experience severe side effects.",
  },
  {
    id: "RX002",
    medication: "Ibuprofen",
    dosage: "400mg",
    frequency: "As needed for pain",
    duration: "5 days",
    doctor: "Dr. Michael Lee",
    date: "2023-09-15",
    expiryDate: "2023-10-15",
    refillsRemaining: 0,
    refillsTotal: 0,
    status: "Active",
    instructions: "Take with food or milk. Do not exceed 3 tablets in 24 hours.",
    sideEffects: "May cause stomach upset, heartburn, or dizziness.",
  },
  {
    id: "RX003",
    medication: "Chlorhexidine Mouthwash",
    dosage: "15ml",
    frequency: "Twice daily",
    duration: "14 days",
    doctor: "Dr. Sarah Johnson",
    date: "2023-08-20",
    expiryDate: "2023-09-20",
    refillsRemaining: 0,
    refillsTotal: 1,
    status: "Expired",
    instructions: "Rinse for 30 seconds and then spit out. Do not eat or drink for 30 minutes after use.",
    sideEffects: "May cause staining of teeth or altered taste sensation.",
  },
  {
    id: "RX004",
    medication: "Fluoride Gel",
    dosage: "5ml",
    frequency: "Once daily",
    duration: "30 days",
    doctor: "Dr. Michael Lee",
    date: "2023-07-10",
    expiryDate: "2023-10-10",
    refillsRemaining: 2,
    refillsTotal: 3,
    status: "Active",
    instructions: "Apply to teeth before bedtime after brushing. Do not rinse, eat, or drink after application.",
    sideEffects: "Rarely causes nausea if swallowed in large amounts.",
  },
  {
    id: "RX005",
    medication: "Penicillin V",
    dosage: "250mg",
    frequency: "4 times daily",
    duration: "10 days",
    doctor: "Dr. Sarah Johnson",
    date: "2023-06-05",
    expiryDate: "2023-07-05",
    refillsRemaining: 0,
    refillsTotal: 0,
    status: "Expired",
    instructions: "Take on an empty stomach, 1 hour before or 2 hours after meals.",
    sideEffects: "May cause allergic reactions, nausea, or diarrhea.",
  },
]

export default function PatientPrescriptionsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedPrescription, setSelectedPrescription] = useState<any>(null)
  const [isRefillDialogOpen, setIsRefillDialogOpen] = useState(false)

  const filteredPrescriptions = prescriptions.filter(
    (prescription) =>
      prescription.medication.toLowerCase().includes(searchTerm.toLowerCase()) ||
      prescription.doctor.toLowerCase().includes(searchTerm.toLowerCase()) ||
      prescription.id.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const activePrescriptions = filteredPrescriptions.filter((p) => p.status === "Active")
  const expiredPrescriptions = filteredPrescriptions.filter((p) => p.status === "Expired")

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">My Prescriptions</h2>
          <p className="text-muted-foreground">View and manage your dental prescriptions</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="gap-1">
            <Printer className="h-4 w-4" />
            <span>Print All</span>
          </Button>
          <Button variant="outline" size="sm" className="gap-1">
            <Download className="h-4 w-4" />
            <span>Export</span>
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Prescriptions</CardTitle>
            <Pill className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activePrescriptions.length}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {activePrescriptions.filter((p) => p.refillsRemaining > 0).length} eligible for refill
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Next Expiration</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {activePrescriptions.length > 0
                ? new Date(
                    Math.min(...activePrescriptions.map((p) => new Date(p.expiryDate).getTime())),
                  ).toLocaleDateString("en-US", { month: "short", day: "numeric" })
                : "None"}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {activePrescriptions.length > 0
                ? activePrescriptions.sort(
                    (a, b) => new Date(a.expiryDate).getTime() - new Date(b.expiryDate).getTime(),
                  )[0]?.medication
                : "No active prescriptions"}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Refills Available</CardTitle>
            <RefreshCw className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {activePrescriptions.reduce((sum, p) => sum + p.refillsRemaining, 0)}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Across {activePrescriptions.filter((p) => p.refillsRemaining > 0).length} medications
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Expired Prescriptions</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{expiredPrescriptions.length}</div>
            <p className="text-xs text-muted-foreground mt-1">In the last 6 months</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="active" className="space-y-4">
        <TabsList>
          <TabsTrigger value="active">Active Prescriptions</TabsTrigger>
          <TabsTrigger value="history">Prescription History</TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Active Prescriptions</CardTitle>
                  <CardDescription>Your current medications</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="mb-4 flex items-center gap-2">
                <div className="relative flex-1">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search prescriptions..."
                    className="pl-8"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-4">
                {activePrescriptions.map((prescription) => (
                  <div key={prescription.id} className="p-4 bg-muted/50 rounded-lg">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium">
                          {prescription.medication} {prescription.dosage}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {prescription.frequency} for {prescription.duration}
                        </p>
                      </div>
                      <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Active</Badge>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mt-3">
                      <div className="flex items-center text-sm">
                        <User className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span>{prescription.doctor}</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span>Expires: {prescription.expiryDate}</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <RefreshCw className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span>
                          Refills: {prescription.refillsRemaining}/{prescription.refillsTotal}
                        </span>
                      </div>
                    </div>

                    <div className="flex justify-end gap-2 mt-4">
                      <Button variant="outline" size="sm" onClick={() => setSelectedPrescription(prescription)}>
                        <FileText className="h-4 w-4 mr-2" />
                        Details
                      </Button>
                      {prescription.refillsRemaining > 0 && (
                        <Button
                          size="sm"
                          onClick={() => {
                            setSelectedPrescription(prescription)
                            setIsRefillDialogOpen(true)
                          }}
                        >
                          <RefreshCw className="h-4 w-4 mr-2" />
                          Request Refill
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {activePrescriptions.length === 0 && (
                <div className="text-center py-10">
                  <Pill className="h-10 w-10 mx-auto text-muted-foreground" />
                  <h3 className="mt-2 text-lg font-medium">No Active Prescriptions</h3>
                  <p className="text-muted-foreground mt-1">You don't have any active prescriptions at this time.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Prescription History</CardTitle>
              <CardDescription>Your past medications</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Medication</TableHead>
                    <TableHead>Prescribed</TableHead>
                    <TableHead>Doctor</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPrescriptions.map((prescription) => (
                    <TableRow key={prescription.id}>
                      <TableCell>
                        <div className="font-medium">{prescription.medication}</div>
                        <div className="text-sm text-muted-foreground">{prescription.dosage}</div>
                      </TableCell>
                      <TableCell>{prescription.date}</TableCell>
                      <TableCell>{prescription.doctor}</TableCell>
                      <TableCell>
                        {prescription.status === "Active" ? (
                          <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                            {prescription.status}
                          </Badge>
                        ) : (
                          <Badge variant="outline" className="bg-gray-100 text-gray-800 hover:bg-gray-100">
                            {prescription.status}
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8"
                          onClick={() => setSelectedPrescription(prescription)}
                        >
                          <FileText className="h-4 w-4 mr-2" />
                          View Details
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {selectedPrescription && (
        <Dialog
          open={!!selectedPrescription && !isRefillDialogOpen}
          onOpenChange={(open) => {
            if (!open) setSelectedPrescription(null)
          }}
        >
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Prescription Details</DialogTitle>
              <DialogDescription>
                {selectedPrescription.id} - {selectedPrescription.medication}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-medium text-lg">
                    {selectedPrescription.medication} {selectedPrescription.dosage}
                  </h3>
                  <p className="text-muted-foreground">
                    {selectedPrescription.frequency} for {selectedPrescription.duration}
                  </p>
                </div>
                {selectedPrescription.status === "Active" ? (
                  <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                    {selectedPrescription.status}
                  </Badge>
                ) : (
                  <Badge variant="outline" className="bg-gray-100 text-gray-800 hover:bg-gray-100">
                    {selectedPrescription.status}
                  </Badge>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Prescribed By</p>
                  <p>{selectedPrescription.doctor}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Date Prescribed</p>
                  <p>{selectedPrescription.date}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Expiry Date</p>
                  <p>{selectedPrescription.expiryDate}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Refills</p>
                  <p>
                    {selectedPrescription.refillsRemaining} of {selectedPrescription.refillsTotal} remaining
                  </p>
                </div>
              </div>

              <div>
                <p className="text-sm text-muted-foreground">Instructions</p>
                <p className="mt-1">{selectedPrescription.instructions}</p>
              </div>

              <div className="bg-yellow-50 p-3 rounded-lg border border-yellow-200">
                <div className="flex items-start">
                  <AlertCircle className="h-5 w-5 mr-2 text-yellow-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-yellow-800">Side Effects</h4>
                    <p className="text-sm text-yellow-700 mt-1">{selectedPrescription.sideEffects}</p>
                  </div>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setSelectedPrescription(null)}>
                Close
              </Button>
              <Button variant="outline">
                <Printer className="h-4 w-4 mr-2" />
                Print
              </Button>
              {selectedPrescription.status === "Active" && selectedPrescription.refillsRemaining > 0 && (
                <Button
                  onClick={() => {
                    setIsRefillDialogOpen(true)
                  }}
                >
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Request Refill
                </Button>
              )}
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {selectedPrescription && (
        <Dialog open={isRefillDialogOpen} onOpenChange={setIsRefillDialogOpen}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Request Prescription Refill</DialogTitle>
              <DialogDescription>
                {selectedPrescription.medication} {selectedPrescription.dosage}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="p-4 bg-muted rounded-lg">
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-muted-foreground">Medication</span>
                  <span>
                    {selectedPrescription.medication} {selectedPrescription.dosage}
                  </span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-muted-foreground">Prescribed By</span>
                  <span>{selectedPrescription.doctor}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-muted-foreground">Refills Remaining</span>
                  <span>
                    {selectedPrescription.refillsRemaining} of {selectedPrescription.refillsTotal}
                  </span>
                </div>
              </div>

              <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
                <div className="flex items-start">
                  <AlertCircle className="h-5 w-5 mr-2 text-blue-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-blue-800">Refill Information</h4>
                    <p className="text-sm text-blue-700 mt-1">
                      Your refill request will be sent to your doctor for approval. You will be notified when your
                      prescription is ready for pickup.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => {
                  setIsRefillDialogOpen(false)
                }}
              >
                Cancel
              </Button>
              <Button type="submit">Submit Refill Request</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}
