"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Plus, Calendar, Clock, MapPin, User, CheckCircle2, AlertCircle, FileText } from "lucide-react"
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

// Mock appointments data
const appointments = [
  {
    id: "A001",
    doctor: "Dr. Sarah Johnson",
    date: "2023-10-20",
    time: "09:30 AM",
    duration: "30 min",
    type: "Checkup",
    status: "Scheduled",
    location: "Main Clinic, Room 3",
    notes: "Regular dental checkup and cleaning",
  },
  {
    id: "A002",
    doctor: "Dr. Michael Lee",
    date: "2023-11-05",
    time: "02:15 PM",
    duration: "45 min",
    type: "Follow-up",
    status: "Scheduled",
    location: "Main Clinic, Room 5",
    notes: "Follow-up on previous treatment",
  },
  {
    id: "A003",
    doctor: "Dr. Sarah Johnson",
    date: "2023-09-15",
    time: "11:00 AM",
    duration: "60 min",
    type: "Consultation",
    status: "Completed",
    location: "Main Clinic, Room 3",
    notes: "Initial consultation for orthodontic treatment",
  },
  {
    id: "A004",
    doctor: "Dr. Michael Lee",
    date: "2023-08-22",
    time: "10:30 AM",
    duration: "90 min",
    type: "Procedure",
    status: "Completed",
    location: "Surgical Suite, Room 2",
    notes: "Wisdom tooth extraction",
  },
  {
    id: "A005",
    doctor: "Dr. Sarah Johnson",
    date: "2023-07-10",
    time: "03:45 PM",
    duration: "30 min",
    type: "Checkup",
    status: "Completed",
    location: "Main Clinic, Room 1",
    notes: "Regular dental checkup",
  },
]

export default function PatientAppointmentsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedAppointment, setSelectedAppointment] = useState<any>(null)
  const [isBookingOpen, setIsBookingOpen] = useState(false)

  const filteredAppointments = appointments.filter(
    (appointment) =>
      appointment.doctor.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appointment.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appointment.id.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">My Appointments</h2>
          <p className="text-muted-foreground">Schedule and manage your dental appointments</p>
        </div>
        <Dialog open={isBookingOpen} onOpenChange={setIsBookingOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Request Appointment
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Request New Appointment</DialogTitle>
              <DialogDescription>Fill out the form below to request a new dental appointment.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="appointment-type" className="text-right">
                  Type
                </Label>
                <Select>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select appointment type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="checkup">Regular Checkup</SelectItem>
                    <SelectItem value="cleaning">Teeth Cleaning</SelectItem>
                    <SelectItem value="consultation">Consultation</SelectItem>
                    <SelectItem value="procedure">Dental Procedure</SelectItem>
                    <SelectItem value="emergency">Emergency</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="doctor" className="text-right">
                  Doctor
                </Label>
                <Select>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select doctor" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="dr-johnson">Dr. Sarah Johnson</SelectItem>
                    <SelectItem value="dr-lee">Dr. Michael Lee</SelectItem>
                    <SelectItem value="dr-wilson">Dr. James Wilson</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="date" className="text-right">
                  Date
                </Label>
                <Input id="date" type="date" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="time" className="text-right">
                  Preferred Time
                </Label>
                <Select>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select time" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="morning">Morning (9AM - 12PM)</SelectItem>
                    <SelectItem value="afternoon">Afternoon (12PM - 3PM)</SelectItem>
                    <SelectItem value="evening">Evening (3PM - 6PM)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="notes" className="text-right">
                  Notes
                </Label>
                <Textarea id="notes" placeholder="Any specific concerns or requests" className="col-span-3" />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsBookingOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">Submit Request</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

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

              <div className="space-y-4">
                {filteredAppointments
                  .filter((appointment) => appointment.status === "Scheduled")
                  .map((appointment) => (
                    <div key={appointment.id} className="p-4 bg-muted/50 rounded-lg">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium">{appointment.type}</h3>
                          <p className="text-sm text-muted-foreground">{appointment.doctor}</p>
                        </div>
                        <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">{appointment.status}</Badge>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mt-3">
                        <div className="flex items-center text-sm">
                          <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                          <span>{appointment.date}</span>
                        </div>
                        <div className="flex items-center text-sm">
                          <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                          <span>
                            {appointment.time} ({appointment.duration})
                          </span>
                        </div>
                        <div className="flex items-center text-sm">
                          <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                          <span>{appointment.location}</span>
                        </div>
                      </div>

                      {appointment.notes && (
                        <div className="mt-3 text-sm">
                          <p className="text-muted-foreground">{appointment.notes}</p>
                        </div>
                      )}

                      <div className="flex justify-end gap-2 mt-4">
                        <Button variant="outline" size="sm" onClick={() => setSelectedAppointment(appointment)}>
                          View Details
                        </Button>
                        <Button variant="outline" size="sm">
                          Reschedule
                        </Button>
                        <Button variant="outline" size="sm" className="text-red-500 hover:text-red-700">
                          Cancel
                        </Button>
                      </div>
                    </div>
                  ))}
              </div>

              {filteredAppointments.filter((a) => a.status === "Scheduled").length === 0 && (
                <div className="text-center py-10">
                  <Calendar className="h-10 w-10 mx-auto text-muted-foreground" />
                  <h3 className="mt-2 text-lg font-medium">No upcoming appointments</h3>
                  <p className="text-muted-foreground mt-1">
                    Schedule your next dental visit to maintain your oral health.
                  </p>
                  <Button className="mt-4" onClick={() => setIsBookingOpen(true)}>
                    Request Appointment
                  </Button>
                </div>
              )}
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
                    <TableHead>Date & Time</TableHead>
                    <TableHead>Doctor</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {appointments
                    .filter((appointment) => appointment.status === "Completed")
                    .map((appointment) => (
                      <TableRow key={appointment.id}>
                        <TableCell>
                          <div className="font-medium">{appointment.date}</div>
                          <div className="text-sm text-muted-foreground">{appointment.time}</div>
                        </TableCell>
                        <TableCell>{appointment.doctor}</TableCell>
                        <TableCell>{appointment.type}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className="bg-green-100 text-green-800 hover:bg-green-100">
                            {appointment.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8"
                            onClick={() => setSelectedAppointment(appointment)}
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

        <TabsContent value="all" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>All Appointments</CardTitle>
              <CardDescription>Complete appointment history</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Date & Time</TableHead>
                    <TableHead>Doctor</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {appointments.map((appointment) => (
                    <TableRow key={appointment.id}>
                      <TableCell className="font-medium">{appointment.id}</TableCell>
                      <TableCell>
                        <div>{appointment.date}</div>
                        <div className="text-sm text-muted-foreground">{appointment.time}</div>
                      </TableCell>
                      <TableCell>{appointment.doctor}</TableCell>
                      <TableCell>{appointment.type}</TableCell>
                      <TableCell>
                        {appointment.status === "Scheduled" ? (
                          <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">{appointment.status}</Badge>
                        ) : (
                          <Badge variant="outline" className="bg-green-100 text-green-800 hover:bg-green-100">
                            {appointment.status}
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8"
                          onClick={() => setSelectedAppointment(appointment)}
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

      {selectedAppointment && (
        <Dialog open={!!selectedAppointment} onOpenChange={() => setSelectedAppointment(null)}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Appointment Details</DialogTitle>
              <DialogDescription>
                {selectedAppointment.id} - {selectedAppointment.type}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <User className="h-5 w-5 mr-2 text-muted-foreground" />
                  <span className="font-medium">{selectedAppointment.doctor}</span>
                </div>
                {selectedAppointment.status === "Scheduled" ? (
                  <Badge className="bg-blue-100 text-blue-800">
                    <CheckCircle2 className="h-3 w-3 mr-1" />
                    {selectedAppointment.status}
                  </Badge>
                ) : (
                  <Badge variant="outline" className="bg-green-100 text-green-800">
                    <CheckCircle2 className="h-3 w-3 mr-1" />
                    {selectedAppointment.status}
                  </Badge>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-muted-foreground">Date</Label>
                  <div className="flex items-center mt-1">
                    <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span>{selectedAppointment.date}</span>
                  </div>
                </div>
                <div>
                  <Label className="text-muted-foreground">Time</Label>
                  <div className="flex items-center mt-1">
                    <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span>
                      {selectedAppointment.time} ({selectedAppointment.duration})
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <Label className="text-muted-foreground">Location</Label>
                <div className="flex items-center mt-1">
                  <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span>{selectedAppointment.location}</span>
                </div>
              </div>

              <div>
                <Label className="text-muted-foreground">Notes</Label>
                <p className="mt-1 text-sm">{selectedAppointment.notes || "No notes available"}</p>
              </div>

              {selectedAppointment.status === "Scheduled" && (
                <div className="bg-yellow-50 p-3 rounded-lg border border-yellow-200">
                  <div className="flex items-start">
                    <AlertCircle className="h-5 w-5 mr-2 text-yellow-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-yellow-800">Appointment Reminders</h4>
                      <ul className="text-sm text-yellow-700 mt-1 list-disc list-inside space-y-1">
                        <li>Please arrive 15 minutes before your appointment time</li>
                        <li>Bring your insurance card and ID</li>
                        <li>If you need to cancel, please do so at least 24 hours in advance</li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <DialogFooter>
              {selectedAppointment.status === "Scheduled" ? (
                <>
                  <Button variant="outline" onClick={() => setSelectedAppointment(null)}>
                    Close
                  </Button>
                  <Button variant="outline">Reschedule</Button>
                  <Button variant="destructive">Cancel Appointment</Button>
                </>
              ) : (
                <Button onClick={() => setSelectedAppointment(null)}>Close</Button>
              )}
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}
