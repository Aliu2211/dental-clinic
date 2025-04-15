"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, UserPlus, FileText, Calendar, Activity } from "lucide-react"

// Mock patient data
const patients = [
  { id: "P001", name: "John Doe", age: 35, lastVisit: "2023-10-15", status: "Active" },
  { id: "P002", name: "Jane Smith", age: 28, lastVisit: "2023-10-10", status: "Active" },
  { id: "P003", name: "Robert Johnson", age: 42, lastVisit: "2023-09-30", status: "Active" },
  { id: "P004", name: "Emily Davis", age: 31, lastVisit: "2023-09-25", status: "Inactive" },
  { id: "P005", name: "Michael Brown", age: 45, lastVisit: "2023-09-20", status: "Active" },
  { id: "P006", name: "Sarah Wilson", age: 29, lastVisit: "2023-09-15", status: "Active" },
  { id: "P007", name: "David Lee", age: 38, lastVisit: "2023-09-10", status: "Inactive" },
  { id: "P008", name: "Lisa Taylor", age: 33, lastVisit: "2023-09-05", status: "Active" },
]

export default function PatientsPage() {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredPatients = patients.filter(
    (patient) =>
      patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.id.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="space-y-4">
      <h2 className="text-3xl font-bold tracking-tight">Patient Management</h2>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All Patients</TabsTrigger>
          <TabsTrigger value="active">Active Patients</TabsTrigger>
          <TabsTrigger value="recent">Recent Visits</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Patients</CardTitle>
                  <CardDescription>View and manage patient records</CardDescription>
                </div>
                <Button className="flex items-center gap-2">
                  <UserPlus className="h-4 w-4" />
                  Add Patient
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="mb-4 flex items-center gap-2">
                <div className="relative flex-1">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search patients..."
                    className="pl-8"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Patient ID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Age</TableHead>
                    <TableHead>Last Visit</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPatients.map((patient) => (
                    <TableRow key={patient.id}>
                      <TableCell className="font-medium">{patient.id}</TableCell>
                      <TableCell>{patient.name}</TableCell>
                      <TableCell>{patient.age}</TableCell>
                      <TableCell>{patient.lastVisit}</TableCell>
                      <TableCell>
                        <span
                          className={`px-2 py-1 rounded-full text-xs ${
                            patient.status === "Active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {patient.status}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="ghost" size="icon" title="View Records">
                            <FileText className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" title="Schedule Appointment">
                            <Calendar className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" title="Record Vitals">
                            <Activity className="h-4 w-4" />
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
              <CardTitle>Active Patients</CardTitle>
              <CardDescription>Patients with active treatment plans</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Active patients content would go here.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="recent" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Visits</CardTitle>
              <CardDescription>Patients who visited in the last 30 days</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Recent visits content would go here.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
