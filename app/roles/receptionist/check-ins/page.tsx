"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Search, CheckCircle, Clock } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

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
    status: "Waiting",
    checkedInAt: "09:15 AM",
    waitTime: "15 min",
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
    checkedInAt: null,
    waitTime: null,
  },
  {
    id: "A003",
    patientName: "Robert Johnson",
    patientId: "P003",
    doctor: "Dr. Michael Lee",
    date: "2023-10-16",
    time: "11:00 AM",
    type: "Consultation",
    status: "With Doctor",
    checkedInAt: "10:45 AM",
    waitTime: "15 min",
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
    checkedInAt: null,
    waitTime: null,
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
    checkedInAt: null,
    waitTime: null,
  },
]

export default function CheckInsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedAppointment, setSelectedAppointment] = useState<any>(null)
  const [checkInDialogOpen, setCheckInDialogOpen] = useState(false)

  const filteredAppointments = appointments.filter(
    (appointment) =>
      appointment.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appointment.doctor.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appointment.id.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleCheckIn = (appointment: any) => {
    setSelectedAppointment(appointment)
    setCheckInDialogOpen(true)
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Waiting":
        return (
          <Badge variant="outline" className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
            Waiting
          </Badge>
        )
      case "With Doctor":
        return (
          <Badge variant="outline" className="bg-green-100 text-green-800 hover:bg-green-100">
            With Doctor
          </Badge>
        )
      case "Completed":
        return (
          <Badge variant="outline" className="bg-blue-100 text-blue-800 hover:bg-blue-100">
            Completed
          </Badge>
        )
      case "Scheduled":
        return (
          <Badge variant="outline" className="bg-gray-100 text-gray-800 hover:bg-gray-100">
            Scheduled
          </Badge>
        )
      case "Late":
        return (
          <Badge variant="outline" className="bg-red-100 text-red-800 hover:bg-red-100">
            Late
          </Badge>
        )
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  return (
    <div className="space-y-4">
      <h2 className="text-3xl font-bold tracking-tight">Patient Check-ins</h2>

      <Tabs defaultValue="today" className="space-y-4">
        <TabsList>
          <TabsTrigger value="today">Today's Appointments</TabsTrigger>
          <TabsTrigger value="waiting">Waiting Room</TabsTrigger>
          <TabsTrigger value="history">Check-in History</TabsTrigger>
        </TabsList>

        <TabsContent value="today" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Today's Appointments</CardTitle>
                  <CardDescription>Check in patients for their appointments</CardDescription>
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

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Patient</TableHead>
                    <TableHead>Time</TableHead>
                    <TableHead>Doctor</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredAppointments.map((appointment) => (
                    <TableRow key={appointment.id}>
                      <TableCell className="font-medium">{appointment.patientName}</TableCell>
                      <TableCell>{appointment.time}</TableCell>
                      <TableCell>{appointment.doctor}</TableCell>
                      <TableCell>{appointment.type}</TableCell>
                      <TableCell>{getStatusBadge(appointment.status)}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          {appointment.status === "Scheduled" && (
                            <Button
                              variant="outline"
                              size="sm"
                              className="flex items-center gap-1"
                              onClick={() => handleCheckIn(appointment)}
                            >
                              <CheckCircle className="h-4 w-4" />
                              Check In
                            </Button>
                          )}
                          {appointment.status === "Waiting" && (
                            <Button
                              variant="outline"
                              size="sm"
                              className="flex items-center gap-1 bg-green-50 text-green-700 hover:bg-green-100 hover:text-green-800"
                            >
                              <Clock className="h-4 w-4" />
                              {appointment.waitTime}
                            </Button>
                          )}
                          {appointment.status === "With Doctor" && (
                            <Button
                              variant="outline"
                              size="sm"
                              className="flex items-center gap-1 bg-blue-50 text-blue-700 hover:bg-blue-100 hover:text-blue-800"
                            >
                              <CheckCircle className="h-4 w-4" />
                              Complete
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="waiting" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Waiting Room</CardTitle>
              <CardDescription>Patients currently waiting to be seen</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredAppointments
                  .filter((appointment) => appointment.status === "Waiting")
                  .map((appointment) => (
                    <div key={appointment.id} className="flex items-center justify-between p-4 rounded-md border">
                      <div>
                        <h3 className="font-medium">{appointment.patientName}</h3>
                        <div className="text-sm text-muted-foreground">
                          Checked in at {appointment.checkedInAt} • Waiting for {appointment.waitTime}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium">{appointment.time}</div>
                        <div className="text-sm text-muted-foreground">{appointment.doctor}</div>
                      </div>
                    </div>
                  ))}
                {filteredAppointments.filter((appointment) => appointment.status === "Waiting").length === 0 && (
                  <div className="text-center py-8 text-muted-foreground">No patients currently waiting</div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Check-in History</CardTitle>
              <CardDescription>Record of recent patient check-ins</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Check-in history content would go here.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Dialog open={checkInDialogOpen} onOpenChange={setCheckInDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Check In Patient</DialogTitle>
            <DialogDescription>Confirm patient check-in details</DialogDescription>
          </DialogHeader>
          {selectedAppointment && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Patient Name</Label>
                  <div className="font-medium">{selectedAppointment.patientName}</div>
                </div>
                <div>
                  <Label>Appointment Time</Label>
                  <div className="font-medium">{selectedAppointment.time}</div>
                </div>
                <div>
                  <Label>Doctor</Label>
                  <div className="font-medium">{selectedAppointment.doctor}</div>
                </div>
                <div>
                  <Label>Appointment Type</Label>
                  <div className="font-medium">{selectedAppointment.type}</div>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Assign Room</Label>
                <Select defaultValue="room1">
                  <SelectTrigger>
                    <SelectValue placeholder="Select a room" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="room1">Room 1</SelectItem>
                    <SelectItem value="room2">Room 2</SelectItem>
                    <SelectItem value="room3">Room 3</SelectItem>
                    <SelectItem value="room4">Room 4</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Notes</Label>
                <Input placeholder="Any special instructions or notes" />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setCheckInDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => setCheckInDialogOpen(false)}>Confirm Check-in</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
