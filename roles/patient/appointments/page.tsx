"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Plus, Calendar, X } from "lucide-react"

// Mock appointments data
const appointments = [
  {
    id: "A001",
    doctor: "Dr. Sarah Johnson",
    date: "2023-10-20",
    time: "09:30 AM",
    type: "Checkup",
    status: "Scheduled",
  },
  {
    id: "A002",
    doctor: "Dr. Michael Lee",
    date: "2023-11-05",
    time: "02:15 PM",
    type: "Follow-up",
    status: "Scheduled",
  },
  {
    id: "A003",
    doctor: "Dr. Sarah Johnson",
    date: "2023-09-15",
    time: "11:00 AM",
    type: "Consultation",
    status: "Completed",
  },
  {
    id: "A004",
    doctor: "Dr. Michael Lee",
    date: "2023-08-22",
    time: "10:30 AM",
    type: "Procedure",
    status: "Completed",
  },
  {
    id: "A005",
    doctor: "Dr. Sarah Johnson",
    date: "2023-07-10",
    time: "03:45 PM",
    type: "Checkup",
    status: "Completed",
  },
]

export default function PatientAppointmentsPage() {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredAppointments = appointments.filter(
    (appointment) =>
      appointment.doctor.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appointment.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appointment.id.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="space-y-4">
      <h2 className="text-3xl font-bold tracking-tight">My Appointments</h2>

      <Tabs defaultValue="upcoming" className="space-y-4">
        <TabsList>
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="past">Past Appointments</TabsTrigger>
          <TabsTrigger value="all">All Appointments</TabsTrigger>
        </TabsList>

        <TabsContent value="upcoming" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Upcoming Appointments</CardTitle>
                  <CardDescription>Your scheduled appointments</CardDescription>
                </div>
                <Button className="flex items-center gap-2">
                  <Plus className="h-4 w-4" />
                  Request Appointment
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
                    <TableHead>Doctor</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Time</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredAppointments
                    .filter((appointment) => appointment.status === "Scheduled")
                    .map((appointment) => (
                      <TableRow key={appointment.id}>
                        <TableCell className="font-medium">{appointment.id}</TableCell>
                        <TableCell>{appointment.doctor}</TableCell>
                        <TableCell>{appointment.date}</TableCell>
                        <TableCell>{appointment.time}</TableCell>
                        <TableCell>{appointment.type}</TableCell>
                        <TableCell>
                          <span className="px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800">
                            {appointment.status}
                          </span>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button variant="ghost" size="icon" title="Reschedule">
                              <Calendar className="h-4 w-4" />
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

        <TabsContent value="past" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Past Appointments</CardTitle>
              <CardDescription>Your appointment history</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Doctor</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Time</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {appointments
                    .filter((appointment) => appointment.status === "Completed")
                    .map((appointment) => (
                      <TableRow key={appointment.id}>
                        <TableCell className="font-medium">{appointment.id}</TableCell>
                        <TableCell>{appointment.doctor}</TableCell>
                        <TableCell>{appointment.date}</TableCell>
                        <TableCell>{appointment.time}</TableCell>
                        <TableCell>{appointment.type}</TableCell>
                        <TableCell>
                          <span className="px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">
                            {appointment.status}
                          </span>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
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
