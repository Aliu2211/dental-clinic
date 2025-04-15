"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Plus, FileText, Check, X } from "lucide-react"

// Mock prescription data
const prescriptions = [
  {
    id: "RX001",
    patientName: "John Doe",
    patientId: "P001",
    medication: "Amoxicillin 500mg",
    dosage: "1 tablet 3 times daily",
    date: "2023-10-15",
    status: "Active",
  },
  {
    id: "RX002",
    patientName: "Jane Smith",
    patientId: "P002",
    medication: "Ibuprofen 400mg",
    dosage: "1 tablet every 6 hours as needed",
    date: "2023-10-10",
    status: "Active",
  },
  {
    id: "RX003",
    patientName: "Robert Johnson",
    patientId: "P003",
    medication: "Metronidazole 250mg",
    dosage: "1 tablet 3 times daily",
    date: "2023-09-30",
    status: "Completed",
  },
  {
    id: "RX004",
    patientName: "Emily Davis",
    patientId: "P004",
    medication: "Acetaminophen 500mg",
    dosage: "1-2 tablets every 6 hours as needed",
    date: "2023-09-25",
    status: "Active",
  },
  {
    id: "RX005",
    patientName: "Michael Brown",
    patientId: "P005",
    medication: "Clindamycin 300mg",
    dosage: "1 capsule 4 times daily",
    date: "2023-09-20",
    status: "Completed",
  },
]

export default function PrescriptionsPage() {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredPrescriptions = prescriptions.filter(
    (prescription) =>
      prescription.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      prescription.medication.toLowerCase().includes(searchTerm.toLowerCase()) ||
      prescription.id.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="space-y-4">
      <h2 className="text-3xl font-bold tracking-tight">Prescription Management</h2>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All Prescriptions</TabsTrigger>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Prescriptions</CardTitle>
                  <CardDescription>View and manage patient prescriptions</CardDescription>
                </div>
                <Button className="flex items-center gap-2">
                  <Plus className="h-4 w-4" />
                  New Prescription
                </Button>
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

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Rx ID</TableHead>
                    <TableHead>Patient</TableHead>
                    <TableHead>Medication</TableHead>
                    <TableHead>Dosage</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPrescriptions.map((prescription) => (
                    <TableRow key={prescription.id}>
                      <TableCell className="font-medium">{prescription.id}</TableCell>
                      <TableCell>{prescription.patientName}</TableCell>
                      <TableCell>{prescription.medication}</TableCell>
                      <TableCell>{prescription.dosage}</TableCell>
                      <TableCell>{prescription.date}</TableCell>
                      <TableCell>
                        <span
                          className={`px-2 py-1 rounded-full text-xs ${
                            prescription.status === "Active"
                              ? "bg-green-100 text-green-800"
                              : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {prescription.status}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="ghost" size="icon" title="View Details">
                            <FileText className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" title="Mark as Complete">
                            <Check className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" title="Cancel Prescription">
                            <X className="h-4 w-4" />
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

        <TabsContent value="active" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Active Prescriptions</CardTitle>
              <CardDescription>Currently active patient prescriptions</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Active prescriptions content would go here.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="completed" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Completed Prescriptions</CardTitle>
              <CardDescription>Prescriptions that have been completed</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Completed prescriptions content would go here.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
