"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search, Clock, CheckCircle, Pill, AlertTriangle, Calendar, User } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Checkbox } from "@/components/ui/checkbox"
import { format } from "date-fns"

// Mock medication data
const medications = [
  {
    id: "M001",
    patientName: "John Doe",
    patientId: "P001",
    medication: "Amoxicillin",
    dosage: "500mg",
    route: "Oral",
    frequency: "Every 8 hours",
    scheduledTime: "11:00 AM",
    status: "pending",
    notes: "Take with food",
  },
  {
    id: "M002",
    patientName: "Jane Smith",
    patientId: "P002",
    medication: "Ibuprofen",
    dosage: "400mg",
    route: "Oral",
    frequency: "Every 6 hours",
    scheduledTime: "11:30 AM",
    status: "pending",
    notes: "For pain management",
  },
  {
    id: "M003",
    patientName: "Robert Johnson",
    patientId: "P003",
    medication: "Lisinopril",
    dosage: "10mg",
    route: "Oral",
    frequency: "Once daily",
    scheduledTime: "12:00 PM",
    status: "pending",
    notes: "For blood pressure control",
  },
  {
    id: "M004",
    patientName: "Emily Davis",
    patientId: "P004",
    medication: "Acetaminophen",
    dosage: "650mg",
    route: "Oral",
    frequency: "Every 6 hours",
    scheduledTime: "10:00 AM",
    status: "administered",
    notes: "For fever and pain",
  },
  {
    id: "M005",
    patientName: "Michael Brown",
    patientId: "P005",
    medication: "Loratadine",
    dosage: "10mg",
    route: "Oral",
    frequency: "Once daily",
    scheduledTime: "9:00 AM",
    status: "administered",
    notes: "For allergies",
  },
]

// Upcoming medications for the day
const upcomingMedications = medications.filter((med) => med.status === "pending")

// Administered medications
const administeredMedications = medications.filter((med) => med.status === "administered")

export default function MedicationsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedMedications, setSelectedMedications] = useState<string[]>([])

  const filteredMedications = medications.filter(
    (med) =>
      med.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      med.medication.toLowerCase().includes(searchTerm.toLowerCase()) ||
      med.patientId.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleCheckboxChange = (id: string) => {
    setSelectedMedications((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]))
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return (
          <Badge variant="outline" className="flex items-center gap-1">
            <Clock className="h-3 w-3" /> Pending
          </Badge>
        )
      case "administered":
        return (
          <Badge variant="secondary" className="flex items-center gap-1">
            <CheckCircle className="h-3 w-3" /> Administered
          </Badge>
        )
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  return (
    <div className="space-y-4">
      <h2 className="text-3xl font-bold tracking-tight">Medication Administration</h2>

      <Tabs defaultValue="upcoming" className="space-y-4">
        <TabsList>
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="all">All Medications</TabsTrigger>
          <TabsTrigger value="administered">Administered</TabsTrigger>
        </TabsList>

        <TabsContent value="upcoming" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Upcoming Medications</CardTitle>
                  <CardDescription>Medications scheduled for administration</CardDescription>
                </div>
                <Button disabled={selectedMedications.length === 0}>
                  Administer Selected ({selectedMedications.length})
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {upcomingMedications.length > 0 ? (
                <div className="space-y-4">
                  {upcomingMedications.map((med) => (
                    <div key={med.id} className="flex items-center border rounded-lg p-4">
                      <Checkbox
                        id={med.id}
                        checked={selectedMedications.includes(med.id)}
                        onCheckedChange={() => handleCheckboxChange(med.id)}
                        className="mr-4"
                      />
                      <div className="flex flex-col md:flex-row md:items-center flex-1">
                        <div className="flex items-center mb-2 md:mb-0 md:mr-6 md:min-w-[200px]">
                          <Avatar className="h-10 w-10 mr-3">
                            <AvatarImage src="/placeholder.svg?height=40&width=40" />
                            <AvatarFallback>
                              {med.patientName
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{med.patientName}</p>
                            <p className="text-sm text-muted-foreground">{med.patientId}</p>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 flex-1">
                          <div>
                            <p className="text-xs text-muted-foreground">Medication</p>
                            <div className="flex items-center">
                              <Pill className="h-3 w-3 mr-1 text-blue-500" />
                              <p className="font-medium">{med.medication}</p>
                            </div>
                            <p className="text-xs">
                              {med.dosage} - {med.route}
                            </p>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground">Frequency</p>
                            <p className="font-medium">{med.frequency}</p>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground">Scheduled Time</p>
                            <div className="flex items-center">
                              <Clock className="h-3 w-3 mr-1 text-amber-500" />
                              <p className="font-medium">{med.scheduledTime}</p>
                            </div>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground">Notes</p>
                            <p className="text-sm">{med.notes}</p>
                          </div>
                        </div>
                        <div className="mt-4 md:mt-0 md:ml-4">
                          <Button size="sm">Administer</Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
                  <p className="text-muted-foreground">No pending medications at this time.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="all" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>All Medications</CardTitle>
              <CardDescription>View and manage all medication orders</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-4 relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search medications or patients..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Patient</TableHead>
                    <TableHead>Medication</TableHead>
                    <TableHead>Dosage</TableHead>
                    <TableHead>Time</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredMedications.map((med) => (
                    <TableRow key={med.id}>
                      <TableCell className="font-medium">{med.id}</TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Avatar className="h-6 w-6">
                            <AvatarImage src="/placeholder.svg?height=32&width=32" />
                            <AvatarFallback>
                              {med.patientName
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <span>{med.patientName}</span>
                        </div>
                      </TableCell>
                      <TableCell>{med.medication}</TableCell>
                      <TableCell>
                        {med.dosage} ({med.route})
                      </TableCell>
                      <TableCell>{med.scheduledTime}</TableCell>
                      <TableCell>{getStatusBadge(med.status)}</TableCell>
                      <TableCell className="text-right">
                        <Button
                          size="sm"
                          variant={med.status === "administered" ? "outline" : "default"}
                          disabled={med.status === "administered"}
                        >
                          {med.status === "administered" ? "Administered" : "Administer"}
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="administered" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Administered Medications</CardTitle>
              <CardDescription>Record of medications that have been administered</CardDescription>
            </CardHeader>
            <CardContent>
              {administeredMedications.length > 0 ? (
                <div className="space-y-4">
                  {administeredMedications.map((med) => (
                    <div key={med.id} className="border rounded-lg p-4 bg-muted/30">
                      <div className="flex flex-col md:flex-row">
                        <div className="flex items-center mb-4 md:mb-0 md:mr-6">
                          <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                          <div>
                            <p className="font-medium">
                              {med.medication} {med.dosage}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {med.route} - {med.frequency}
                            </p>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 flex-1">
                          <div className="flex items-center">
                            <User className="h-4 w-4 mr-2 text-muted-foreground" />
                            <div>
                              <p className="text-sm font-medium">{med.patientName}</p>
                              <p className="text-xs text-muted-foreground">{med.patientId}</p>
                            </div>
                          </div>
                          <div className="flex items-center">
                            <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                            <div>
                              <p className="text-sm font-medium">{format(new Date(), "MMM d, yyyy")}</p>
                              <p className="text-xs text-muted-foreground">{med.scheduledTime}</p>
                            </div>
                          </div>
                          <div className="flex items-center">
                            <AlertTriangle className="h-4 w-4 mr-2 text-muted-foreground" />
                            <p className="text-sm">{med.notes}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">No medications have been administered yet.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
