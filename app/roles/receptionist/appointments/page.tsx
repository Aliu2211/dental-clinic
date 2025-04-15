"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Plus, Edit, X, Check, Calendar, Clock } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"

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
    phone: "(555) 123-4567",
    email: "john.doe@example.com",
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
    phone: "(555) 987-6543",
    email: "jane.smith@example.com",
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
    phone: "(555) 456-7890",
    email: "robert.johnson@example.com",
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
    phone: "(555) 234-5678",
    email: "emily.davis@example.com",
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
    phone: "(555) 876-5432",
    email: "michael.brown@example.com",
  },
]

// Mock doctors data
const doctors = [
  { id: "D001", name: "Dr. Sarah Johnson", specialty: "General Dentistry" },
  { id: "D002", name: "Dr. Michael Lee", specialty: "Orthodontics" },
  { id: "D003", name: "Dr. Emily Wilson", specialty: "Periodontics" },
  { id: "D004", name: "Dr. David Chen", specialty: "Endodontics" },
]

// Mock appointment types
const appointmentTypes = ["Checkup", "Cleaning", "Follow-up", "Consultation", "Procedure", "Emergency"]

export default function AppointmentsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [isNewAppointmentOpen, setIsNewAppointmentOpen] = useState(false)
  const [newAppointment, setNewAppointment] = useState({
    patientName: "",
    patientId: "",
    doctor: "",
    date: "",
    time: "",
    type: "",
    phone: "",
    email: "",
  })
  const { toast } = useToast()

  const filteredAppointments = appointments.filter(
    (appointment) =>
      appointment.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appointment.doctor.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appointment.id.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setNewAppointment((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setNewAppointment((prev) => ({ ...prev, [name]: value }))
  }

  const handleCreateAppointment = () => {
    // In a real app, this would send data to the server
    toast({
      title: "Appointment Created",
      description: `Appointment for ${newAppointment.patientName} with ${newAppointment.doctor} on ${newAppointment.date} at ${newAppointment.time} has been scheduled.`,
    })
    setIsNewAppointmentOpen(false)
    setNewAppointment({
      patientName: "",
      patientId: "",
      doctor: "",
      date: "",
      time: "",
      type: "",
      phone: "",
      email: "",
    })
  }

  const handleCheckIn = (appointmentId: string) => {
    // In a real app, this would update the appointment status
    toast({
      title: "Patient Checked In",
      description: `Patient for appointment ${appointmentId} has been checked in.`,
    })
  }

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
                <Dialog open={isNewAppointmentOpen} onOpenChange={setIsNewAppointmentOpen}>
                  <DialogTrigger asChild>
                    <Button className="flex items-center gap-2">
                      <Plus className="h-4 w-4" />
                      New Appointment
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[525px]">
                    <DialogHeader>
                      <DialogTitle>Schedule New Appointment</DialogTitle>
                      <DialogDescription>Fill in the details to create a new appointment.</DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="patientName">Patient Name</Label>
                          <Input
                            id="patientName"
                            name="patientName"
                            value={newAppointment.patientName}
                            onChange={handleInputChange}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="patientId">Patient ID</Label>
                          <Input
                            id="patientId"
                            name="patientId"
                            value={newAppointment.patientId}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="doctor">Doctor</Label>
                        <Select onValueChange={(value) => handleSelectChange("doctor", value)}>
                          <SelectTrigger id="doctor">
                            <SelectValue placeholder="Select a doctor" />
                          </SelectTrigger>
                          <SelectContent>
                            {doctors.map((doctor) => (
                              <SelectItem key={doctor.id} value={doctor.name}>
                                {doctor.name} - {doctor.specialty}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="date">Date</Label>
                          <div className="relative">
                            <Calendar className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                              id="date"
                              name="date"
                              type="date"
                              className="pl-8"
                              value={newAppointment.date}
                              onChange={handleInputChange}
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="time">Time</Label>
                          <div className="relative">
                            <Clock className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                              id="time"
                              name="time"
                              type="time"
                              className="pl-8"
                              value={newAppointment.time}
                              onChange={handleInputChange}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="type">Appointment Type</Label>
                        <Select onValueChange={(value) => handleSelectChange("type", value)}>
                          <SelectTrigger id="type">
                            <SelectValue placeholder="Select appointment type" />
                          </SelectTrigger>
                          <SelectContent>
                            {appointmentTypes.map((type) => (
                              <SelectItem key={type} value={type}>
                                {type}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="phone">Phone Number</Label>
                          <Input id="phone" name="phone" value={newAppointment.phone} onChange={handleInputChange} />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email</Label>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            value={newAppointment.email}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setIsNewAppointmentOpen(false)}>
                        Cancel
                      </Button>
                      <Button onClick={handleCreateAppointment}>Create Appointment</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
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
                      <TableCell>
                        <div>
                          <div>{appointment.patientName}</div>
                          <div className="text-xs text-muted-foreground">{appointment.phone}</div>
                        </div>
                      </TableCell>
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
                          {appointment.status !== "Checked In" && (
                            <Button
                              variant="ghost"
                              size="icon"
                              title="Check In"
                              onClick={() => handleCheckIn(appointment.id)}
                            >
                              <Check className="h-4 w-4" />
                            </Button>
                          )}
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
              <div className="flex flex-col space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {appointments.slice(0, 3).map((appointment) => (
                    <Card key={appointment.id} className="overflow-hidden">
                      <CardHeader className="bg-primary/5 pb-2">
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle className="text-lg">{appointment.patientName}</CardTitle>
                            <CardDescription>{appointment.id}</CardDescription>
                          </div>
                          <span
                            className={`px-2 py-1 rounded-full text-xs ${
                              appointment.status === "Checked In"
                                ? "bg-green-100 text-green-800"
                                : "bg-blue-100 text-blue-800"
                            }`}
                          >
                            {appointment.status}
                          </span>
                        </div>
                      </CardHeader>
                      <CardContent className="pt-4">
                        <div className="space-y-2">
                          <div className="flex items-center text-sm">
                            <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                            <span>{appointment.date}</span>
                          </div>
                          <div className="flex items-center text-sm">
                            <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                            <span>{appointment.time}</span>
                          </div>
                          <div className="flex items-center text-sm">
                            <span className="font-medium mr-2">Doctor:</span>
                            <span>{appointment.doctor}</span>
                          </div>
                          <div className="flex items-center text-sm">
                            <span className="font-medium mr-2">Type:</span>
                            <span>{appointment.type}</span>
                          </div>
                        </div>
                        <div className="flex justify-end mt-4 gap-2">
                          <Button variant="outline" size="sm">
                            Reschedule
                          </Button>
                          <Button size="sm">Details</Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                <Button variant="outline" className="w-full">
                  Load More
                </Button>
              </div>
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
              <div className="mb-4 flex items-center gap-2">
                <div className="relative flex-1">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search all appointments..." className="pl-8" />
                </div>
                <Select defaultValue="all">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="scheduled">Scheduled</SelectItem>
                    <SelectItem value="checkedin">Checked In</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
                <Select defaultValue="all">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter by doctor" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Doctors</SelectItem>
                    {doctors.map((doctor) => (
                      <SelectItem key={doctor.id} value={doctor.id}>
                        {doctor.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="text-center text-muted-foreground py-8">
                Advanced filtering and complete appointment history would be displayed here.
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
