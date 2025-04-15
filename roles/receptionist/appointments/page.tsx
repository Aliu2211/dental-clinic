"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Plus, Edit, X, Check } from "lucide-react"

// Mock appointments data
const appointments = [
  {
    id: "A001",
    patientName: "John Doe",
    patientId: "P001",
    doctor: "Dr. Sarah Johnson",
    date: "2023-10-16",
    time: "09:30 AM",
    type: "Checkup",
    status: "Scheduled",
  },
  {
    id: "A002",
    patientName: "Jane Smith",
    patientId: "P002",
    doctor: "Dr. Sarah Johnson",
    date: "2023-10-16",
    time: "10:15 AM",
    type: "Follow-up",
    status: "Scheduled",
  },
  {
    id: "A003",
    patientName: "Robert Johnson",
    patientId: "P003",
    doctor: "Dr. Michael Lee",
    date: "2023-10-16",
    time: "11:00 AM",
    type: "Consultation",
    status: "Checked In",
  },
  {
    id: "A004",
    patientName: "Emily Davis",
    patientId: "P004",
    doctor: "Dr. Sarah Johnson",
    date: "2023-10-16",
    time: "01:30 PM",
    type: "Procedure",
    status: "Scheduled",
  },
  {
    id: "A005",
    patientName: "Michael Brown",
    patientId: "P005",
    doctor: "Dr. Michael Lee",
    date: "2023-10-16",
    time: "02:45 PM",
    type: "Checkup",
    status: "Scheduled",
  },
]

export default function AppointmentsPage() {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredAppointments = appointments.filter(
    (appointment) =>
      appointment.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appointment.doctor.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appointment.id.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="space-y-4">
      <h2 className="text-3xl font-bold tracking-tight">Appointment Management</h2>

      <Tabs defaultValue="today" className="space-y-4">
        <TabsList>
          <TabsTrigger value="today">Today</TabsTrigger>
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="all">All Appointments</TabsTrigger>
        </TabsList>

        <TabsContent value="today" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Today's Appointments</CardTitle>
                  <CardDescription>Manage appointments scheduled for today</CardDescription>
                </div>
                <Button className="flex items-center gap-2">
                  <Plus className="h-4 w-4" />
                  New Appointment
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="mb-4 flex items-center gap-2">
                <div className="relative flex-1">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search appointments..."
                    className="pl-8"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Patient</TableHead>
                    <TableHead>Doctor</TableHead>
                    <TableHead>Time</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredAppointments.map((appointment) => (
                    <TableRow key={appointment.id}>
                      <TableCell className="font-medium">{appointment.id}</TableCell>
                      <TableCell>{appointment.patientName}</TableCell>
                      <TableCell>{appointment.doctor}</TableCell>
                      <TableCell>{appointment.time}</TableCell>
                      <TableCell>{appointment.type}</TableCell>
                      <TableCell>
                        <span
                          className={`px-2 py-1 rounded-full text-xs ${
                            appointment.status === "Checked In"
                              ? "bg-green-100 text-green-800"
                              : "bg-blue-100 text-blue-800"
                          }`}
                        >
                          {appointment.status}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="ghost" size="icon" title="Check In">
                            <Check className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" title="Edit">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" title="Cancel">
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

        <TabsContent value="upcoming" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Appointments</CardTitle>
              <CardDescription>View and manage future appointments</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Upcoming appointments content would go here.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="all" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>All Appointments</CardTitle>
              <CardDescription>Complete appointment history</CardDescription>
            </CardHeader>
            <CardContent>
              <p>All appointments content would go here.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
