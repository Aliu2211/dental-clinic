"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Plus, Clock, User, CheckCircle, XCircle, Calendar, FileText } from "lucide-react"
import { Badge } from "@/components/ui/badge"
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
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/toast-notification"

// Mock appointments data
const appointmentsData = [
  {
    id: "APT001",
    patientName: "John Doe",
    patientId: "P001",
    date: "2023-10-20",
    time: "10:30 AM",
    duration: "30 min",
    type: "Checkup",
    status: "Scheduled",
    notes: "Regular dental checkup and cleaning",
  },
  {
    id: "APT002",
    patientName: "Jane Smith",
    patientId: "P002",
    date: "2023-10-20",
    time: "11:15 AM",
    duration: "45 min",
    type: "Follow-up",
    status: "Scheduled",
    notes: "Follow-up after root canal treatment",
  },
  {
    id: "APT003",
    patientName: "Robert Johnson",
    patientId: "P003",
    date: "2023-10-20",
    time: "1:00 PM",
    duration: "60 min",
    type: "Consultation",
    status: "Scheduled",
    notes: "Initial consultation for dental implants",
  },
  {
    id: "APT004",
    patientName: "Emily Davis",
    patientId: "P004",
    date: "2023-10-20",
    time: "2:30 PM",
    duration: "45 min",
    type: "Procedure",
    status: "Scheduled",
    notes: "Tooth extraction - wisdom tooth",
  },
  {
    id: "APT005",
    patientName: "Michael Brown",
    patientId: "P005",
    date: "2023-10-21",
    time: "9:00 AM",
    duration: "30 min",
    type: "Checkup",
    status: "Scheduled",
    notes: "Regular dental checkup",
  },
  {
    id: "APT006",
    patientName: "Sarah Wilson",
    patientId: "P006",
    date: "2023-10-19",
    time: "10:00 AM",
    duration: "30 min",
    type: "Checkup",
    status: "Completed",
    notes: "Regular dental checkup - no issues found",
  },
  {
    id: "APT007",
    patientName: "David Lee",
    patientId: "P007",
    date: "2023-10-19",
    time: "11:30 AM",
    duration: "45 min",
    type: "Procedure",
    status: "Completed",
    notes: "Filling replacement completed successfully",
  },
  {
    id: "APT008",
    patientName: "Lisa Taylor",
    patientId: "P008",
    date: "2023-10-19",
    time: "2:00 PM",
    duration: "60 min",
    type: "Consultation",
    status: "Completed",
    notes: "Orthodontic treatment planning completed",
  },
]

// Mock patients for dropdown
const patients = [
  { id: "P001", name: "John Doe" },
  { id: "P002", name: "Jane Smith" },
  { id: "P003", name: "Robert Johnson" },
  { id: "P004", name: "Emily Davis" },
  { id: "P005", name: "Michael Brown" },
  { id: "P006", name: "Sarah Wilson" },
  { id: "P007", name: "David Lee" },
  { id: "P008", name: "Lisa Taylor" },
]

// Appointment types for dropdown
const appointmentTypes = [
  "Checkup",
  "Follow-up",
  "Consultation",
  "Procedure",
  "Emergency",
  "Cleaning",
  "X-Ray",
  "Surgery",
]

export default function AppointmentsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [appointments, setAppointments] = useState(appointmentsData)
  const [isNewAppointmentOpen, setIsNewAppointmentOpen] = useState(false)
  const [selectedAppointment, setSelectedAppointment] = useState<any>(null)
  const [isViewAppointmentOpen, setIsViewAppointmentOpen] = useState(false)
  const { showToast, ToastContainer } = useToast()

  // Form state for new appointment
  const [newAppointment, setNewAppointment] = useState({
    patientId: "",
    date: "",
    time: "",
    duration: "30",
    type: "",
    notes: "",
  })

  const filteredAppointments = appointments.filter(
    (appointment) =>
      appointment.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appointment.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appointment.id.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const upcomingAppointments = filteredAppointments.filter((appointment) => appointment.status === "Scheduled")

  const pastAppointments = filteredAppointments.filter(
    (appointment) => appointment.status === "Completed" || appointment.status === "Cancelled",
  )

  const handleCreateAppointment = () => {
    if (!newAppointment.patientId || !newAppointment.date || !newAppointment.time || !newAppointment.type) {
      showToast({ message: "Please fill in all required fields", type: "error" })
      return
    }

    const patient = patients.find((p) => p.id === newAppointment.patientId)

    const appointment = {
      id: `APT${appointments.length + 1}`.padStart(6, "0"),
      patientName: patient?.name || "",
      patientId: newAppointment.patientId,
      date: newAppointment.date,
      time: newAppointment.time,
      duration: `${newAppointment.duration} min`,
      type: newAppointment.type,
      status: "Scheduled",
      notes: newAppointment.notes,
    }

    setAppointments([appointment, ...appointments])
    setIsNewAppointmentOpen(false)
    setNewAppointment({
      patientId: "",
      date: "",
      time: "",
      duration: "30",
      type: "",
      notes: "",
    })
    showToast({ message: "Appointment created successfully", type: "success" })
  }

  const handleViewAppointment = (appointment: any) => {
    setSelectedAppointment(appointment)
    setIsViewAppointmentOpen(true)
  }

  const handleCompleteAppointment = (id: string) => {
    setAppointments(
      appointments.map((appointment) =>
        appointment.id === id ? { ...appointment, status: "Completed" } : appointment,
      ),
    )

    if (selectedAppointment && selectedAppointment.id === id) {
      setSelectedAppointment({ ...selectedAppointment, status: "Completed" })
    }

    showToast({ message: "Appointment marked as completed", type: "success" })
  }

  const handleCancelAppointment = (id: string) => {
    setAppointments(
      appointments.map((appointment) =>
        appointment.id === id ? { ...appointment, status: "Cancelled" } : appointment,
      ),
    )

    if (selectedAppointment && selectedAppointment.id === id) {
      setSelectedAppointment({ ...selectedAppointment, status: "Cancelled" })
    }

    showToast({ message: "Appointment cancelled", type: "success" })
  }

  return (
    <div className="space-y-4">
      <ToastContainer />
      <h2 className="text-3xl font-bold tracking-tight">Appointments</h2>

      <Tabs defaultValue="upcoming" className="space-y-4">
        <TabsList>
          <TabsTrigger value="upcoming">Upcoming ({upcomingAppointments.length})</TabsTrigger>
          <TabsTrigger value="past">Past ({pastAppointments.length})</TabsTrigger>
          <TabsTrigger value="calendar">Calendar View</TabsTrigger>
        </TabsList>

        <TabsContent value="upcoming" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Upcoming Appointments</CardTitle>
                  <CardDescription>View and manage your scheduled appointments</CardDescription>
                </div>
                <Dialog open={isNewAppointmentOpen} onOpenChange={setIsNewAppointmentOpen}>
                  <DialogTrigger asChild>
                    <Button className="flex items-center gap-2">
                      <Plus className="h-4 w-4" />
                      New Appointment
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[500px]">
                    <DialogHeader>
                      <DialogTitle>Create New Appointment</DialogTitle>
                      <DialogDescription>Schedule a new appointment for a patient.</DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="new-patient" className="text-right">
                          Patient
                        </Label>
                        <Select onValueChange={(value) => setNewAppointment({ ...newAppointment, patientId: value })}>
                          <SelectTrigger className="col-span-3">
                            <SelectValue placeholder="Select patient" />
                          </SelectTrigger>
                          <SelectContent>
                            {patients.map((patient) => (
                              <SelectItem key={patient.id} value={patient.id}>
                                {patient.name} ({patient.id})
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="new-date" className="text-right">
                          Date
                        </Label>
                        <Input
                          id="new-date"
                          type="date"
                          className="col-span-3"
                          value={newAppointment.date}
                          onChange={(e) => setNewAppointment({ ...newAppointment, date: e.target.value })}
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="new-time" className="text-right">
                          Time
                        </Label>
                        <Input
                          id="new-time"
                          type="time"
                          className="col-span-3"
                          value={newAppointment.time}
                          onChange={(e) => setNewAppointment({ ...newAppointment, time: e.target.value })}
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="new-duration" className="text-right">
                          Duration
                        </Label>
                        <Select
                          value={newAppointment.duration}
                          onValueChange={(value) => setNewAppointment({ ...newAppointment, duration: value })}
                        >
                          <SelectTrigger className="col-span-3">
                            <SelectValue placeholder="Select duration" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="15">15 minutes</SelectItem>
                            <SelectItem value="30">30 minutes</SelectItem>
                            <SelectItem value="45">45 minutes</SelectItem>
                            <SelectItem value="60">60 minutes</SelectItem>
                            <SelectItem value="90">90 minutes</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="new-type" className="text-right">
                          Type
                        </Label>
                        <Select onValueChange={(value) => setNewAppointment({ ...newAppointment, type: value })}>
                          <SelectTrigger className="col-span-3">
                            <SelectValue placeholder="Select type" />
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
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="new-notes" className="text-right">
                          Notes
                        </Label>
                        <Textarea
                          id="new-notes"
                          className="col-span-3"
                          placeholder="Appointment details"
                          value={newAppointment.notes}
                          onChange={(e) => setNewAppointment({ ...newAppointment, notes: e.target.value })}
                        />
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
                    <TableHead>Appointment ID</TableHead>
                    <TableHead>Patient</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Time</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {upcomingAppointments.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-6 text-muted-foreground">
                        No upcoming appointments found. Try adjusting your search or create a new appointment.
                      </TableCell>
                    </TableRow>
                  ) : (
                    upcomingAppointments.map((appointment) => (
                      <TableRow key={appointment.id}>
                        <TableCell className="font-medium">{appointment.id}</TableCell>
                        <TableCell>{appointment.patientName}</TableCell>
                        <TableCell>{appointment.date}</TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <Clock className="h-3 w-3 mr-1 text-muted-foreground" />
                            {appointment.time} ({appointment.duration})
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant={appointment.type === "Emergency" ? "destructive" : "outline"}>
                            {appointment.type}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{appointment.status}</Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button
                              variant="ghost"
                              size="icon"
                              title="View Details"
                              onClick={() => handleViewAppointment(appointment)}
                            >
                              <FileText className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              title="View Patient"
                              onClick={() => showToast({ message: "Navigating to patient profile", type: "info" })}
                            >
                              <User className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              title="Complete"
                              onClick={() => handleCompleteAppointment(appointment.id)}
                            >
                              <CheckCircle className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              title="Cancel"
                              onClick={() => handleCancelAppointment(appointment.id)}
                            >
                              <XCircle className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="past" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Past Appointments</CardTitle>
              <CardDescription>View your completed and cancelled appointments</CardDescription>
            </CardHeader>
            <CardContent>
              {pastAppointments.length === 0 ? (
                <div className="text-center py-6 text-muted-foreground">No past appointments found.</div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Appointment ID</TableHead>
                      <TableHead>Patient</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Time</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {pastAppointments.map((appointment) => (
                      <TableRow key={appointment.id}>
                        <TableCell className="font-medium">{appointment.id}</TableCell>
                        <TableCell>{appointment.patientName}</TableCell>
                        <TableCell>{appointment.date}</TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <Clock className="h-3 w-3 mr-1 text-muted-foreground" />
                            {appointment.time} ({appointment.duration})
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant={appointment.type === "Emergency" ? "destructive" : "outline"}>
                            {appointment.type}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={appointment.status === "Completed" ? "default" : "secondary"}
                            className={
                              appointment.status === "Cancelled" ? "bg-red-100 text-red-800 border-red-200" : ""
                            }
                          >
                            {appointment.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button
                              variant="ghost"
                              size="icon"
                              title="View Details"
                              onClick={() => handleViewAppointment(appointment)}
                            >
                              <FileText className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              title="View Patient"
                              onClick={() => showToast({ message: "Navigating to patient profile", type: "info" })}
                            >
                              <User className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="calendar" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Calendar View</CardTitle>
              <CardDescription>View your appointments in a calendar</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center justify-center p-6 border rounded-md">
                <Calendar className="h-16 w-16 text-muted-foreground mb-4" />
                <p className="text-muted-foreground">Calendar view would be displayed here</p>
                <Button
                  variant="outline"
                  className="mt-4"
                  onClick={() => showToast({ message: "Calendar view is under development", type: "info" })}
                >
                  Switch to Calendar
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* View Appointment Dialog */}
      <Dialog open={isViewAppointmentOpen} onOpenChange={setIsViewAppointmentOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Appointment Details</DialogTitle>
            <DialogDescription>Appointment ID: {selectedAppointment?.id}</DialogDescription>
          </DialogHeader>
          {selectedAppointment && (
            <div className="grid gap-6 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="text-lg font-medium">Patient Information</h3>
                  <div className="mt-2 space-y-2">
                    <div>
                      <span className="text-sm font-medium text-muted-foreground">Name:</span>
                      <p>{selectedAppointment.patientName}</p>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-muted-foreground">ID:</span>
                      <p>{selectedAppointment.patientId}</p>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="mt-2"
                      onClick={() => showToast({ message: "Navigating to patient profile", type: "info" })}
                    >
                      <User className="h-3 w-3 mr-2" />
                      View Patient Profile
                    </Button>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-medium">Appointment Information</h3>
                  <div className="mt-2 space-y-2">
                    <div>
                      <span className="text-sm font-medium text-muted-foreground">Date:</span>
                      <p>{selectedAppointment.date}</p>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-muted-foreground">Time:</span>
                      <p>
                        {selectedAppointment.time} ({selectedAppointment.duration})
                      </p>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-muted-foreground">Type:</span>
                      <Badge variant={selectedAppointment.type === "Emergency" ? "destructive" : "outline"}>
                        {selectedAppointment.type}
                      </Badge>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-muted-foreground">Status:</span>
                      <Badge
                        variant={selectedAppointment.status === "Completed" ? "default" : "secondary"}
                        className={
                          selectedAppointment.status === "Cancelled" ? "bg-red-100 text-red-800 border-red-200" : ""
                        }
                      >
                        {selectedAppointment.status}
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">Notes</h3>
                <div className="border rounded-md p-4 bg-gray-50">
                  <p className="text-muted-foreground">
                    {selectedAppointment.notes || "No notes available for this appointment."}
                  </p>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            {selectedAppointment && selectedAppointment.status === "Scheduled" && (
              <>
                <Button
                  variant="outline"
                  onClick={() => {
                    handleCompleteAppointment(selectedAppointment.id)
                    setIsViewAppointmentOpen(false)
                  }}
                >
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Mark as Completed
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    handleCancelAppointment(selectedAppointment.id)
                    setIsViewAppointmentOpen(false)
                  }}
                >
                  <XCircle className="h-4 w-4 mr-2" />
                  Cancel Appointment
                </Button>
              </>
            )}
            <Button onClick={() => setIsViewAppointmentOpen(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
