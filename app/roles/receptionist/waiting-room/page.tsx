"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Clock, User, MessageSquare, Bell, AlertCircle } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Mock waiting patients data
const waitingPatients = [
  {
    id: "P001",
    name: "John Doe",
    appointmentTime: "09:30 AM",
    checkedInAt: "09:15 AM",
    waitTime: "15 min",
    doctor: "Dr. Sarah Johnson",
    room: null,
    status: "Waiting",
    priority: "Normal",
  },
  {
    id: "P003",
    name: "Robert Johnson",
    appointmentTime: "11:00 AM",
    checkedInAt: "10:45 AM",
    waitTime: "15 min",
    doctor: "Dr. Michael Lee",
    room: "Room 2",
    status: "With Doctor",
    priority: "Normal",
  },
  {
    id: "P006",
    name: "Lisa Williams",
    appointmentTime: "10:00 AM",
    checkedInAt: "09:50 AM",
    waitTime: "40 min",
    doctor: "Dr. Sarah Johnson",
    room: null,
    status: "Waiting",
    priority: "High",
  },
]

export default function WaitingRoomPage() {
  const [selectedPatient, setSelectedPatient] = useState<any>(null)
  const [notifyDialogOpen, setNotifyDialogOpen] = useState(false)
  const [alertDialogOpen, setAlertDialogOpen] = useState(false)

  const handleNotifyPatient = (patient: any) => {
    setSelectedPatient(patient)
    setNotifyDialogOpen(true)
  }

  const handleAlertDoctor = (patient: any) => {
    setSelectedPatient(patient)
    setAlertDialogOpen(true)
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
      case "Ready":
        return (
          <Badge variant="outline" className="bg-blue-100 text-blue-800 hover:bg-blue-100">
            Ready
          </Badge>
        )
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "High":
        return (
          <Badge variant="outline" className="bg-red-100 text-red-800 hover:bg-red-100">
            High Priority
          </Badge>
        )
      case "Normal":
        return null
      default:
        return null
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Waiting Room</h2>
        <Button>Refresh Status</Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Waiting</CardTitle>
            <User className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-muted-foreground">Average wait: 27 min</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">With Doctor</CardTitle>
            <User className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1</div>
            <p className="text-xs text-muted-foreground">In treatment rooms</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Longest Wait</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">40 min</div>
            <p className="text-xs text-muted-foreground">Lisa Williams</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Available Rooms</CardTitle>
            <User className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">Ready for patients</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="waiting" className="space-y-4">
        <TabsList>
          <TabsTrigger value="waiting">Waiting Patients</TabsTrigger>
          <TabsTrigger value="with-doctor">With Doctor</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
        </TabsList>

        <TabsContent value="waiting" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Waiting Patients</CardTitle>
              <CardDescription>Patients currently in the waiting room</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {waitingPatients
                  .filter((patient) => patient.status === "Waiting")
                  .map((patient) => (
                    <div
                      key={patient.id}
                      className="flex flex-col md:flex-row md:items-center justify-between p-4 rounded-md border"
                    >
                      <div className="space-y-1 mb-2 md:mb-0">
                        <div className="flex items-center gap-2">
                          <h3 className="font-medium">{patient.name}</h3>
                          {getPriorityBadge(patient.priority)}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Checked in at {patient.checkedInAt} • Waiting for {patient.waitTime}
                        </div>
                        <div className="text-sm">{patient.doctor}</div>
                      </div>
                      <div className="flex flex-col md:flex-row items-center gap-2">
                        <div className="flex items-center gap-1 text-sm bg-yellow-50 text-yellow-700 px-2 py-1 rounded-md">
                          <Clock className="h-3 w-3" />
                          {patient.appointmentTime}
                        </div>
                        {getStatusBadge(patient.status)}
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex items-center gap-1"
                          onClick={() => handleNotifyPatient(patient)}
                        >
                          <Bell className="h-3 w-3" />
                          Notify
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex items-center gap-1"
                          onClick={() => handleAlertDoctor(patient)}
                        >
                          <AlertCircle className="h-3 w-3" />
                          Alert Doctor
                        </Button>
                      </div>
                    </div>
                  ))}
                {waitingPatients.filter((patient) => patient.status === "Waiting").length === 0 && (
                  <div className="text-center py-8 text-muted-foreground">No patients currently waiting</div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="with-doctor" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Patients With Doctor</CardTitle>
              <CardDescription>Patients currently being seen by doctors</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {waitingPatients
                  .filter((patient) => patient.status === "With Doctor")
                  .map((patient) => (
                    <div
                      key={patient.id}
                      className="flex flex-col md:flex-row md:items-center justify-between p-4 rounded-md border"
                    >
                      <div className="space-y-1 mb-2 md:mb-0">
                        <h3 className="font-medium">{patient.name}</h3>
                        <div className="text-sm text-muted-foreground">
                          Checked in at {patient.checkedInAt} • In {patient.room}
                        </div>
                        <div className="text-sm">{patient.doctor}</div>
                      </div>
                      <div className="flex flex-col md:flex-row items-center gap-2">
                        <div className="flex items-center gap-1 text-sm bg-green-50 text-green-700 px-2 py-1 rounded-md">
                          <Clock className="h-3 w-3" />
                          {patient.appointmentTime}
                        </div>
                        {getStatusBadge(patient.status)}
                        <Button variant="outline" size="sm" className="flex items-center gap-1">
                          <MessageSquare className="h-3 w-3" />
                          Message
                        </Button>
                      </div>
                    </div>
                  ))}
                {waitingPatients.filter((patient) => patient.status === "With Doctor").length === 0 && (
                  <div className="text-center py-8 text-muted-foreground">No patients currently with doctors</div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="completed" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Completed Appointments</CardTitle>
              <CardDescription>Patients who have completed their appointments today</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-muted-foreground">No completed appointments yet today</div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Dialog open={notifyDialogOpen} onOpenChange={setNotifyDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Notify Patient</DialogTitle>
            <DialogDescription>Send a notification to the patient</DialogDescription>
          </DialogHeader>
          {selectedPatient && (
            <div className="space-y-4">
              <div>
                <Label>Patient</Label>
                <div className="font-medium">{selectedPatient.name}</div>
              </div>

              <div className="space-y-2">
                <Label>Notification Type</Label>
                <Select defaultValue="ready">
                  <SelectTrigger>
                    <SelectValue placeholder="Select notification type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ready">Doctor Ready</SelectItem>
                    <SelectItem value="delay">Appointment Delay</SelectItem>
                    <SelectItem value="forms">Complete Forms</SelectItem>
                    <SelectItem value="custom">Custom Message</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Message</Label>
                <Textarea placeholder="The doctor is ready to see you now. Please proceed to Room 1." />
              </div>

              <div className="space-y-2">
                <Label>Notification Method</Label>
                <Select defaultValue="sms">
                  <SelectTrigger>
                    <SelectValue placeholder="Select notification method" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sms">SMS</SelectItem>
                    <SelectItem value="app">Mobile App</SelectItem>
                    <SelectItem value="both">Both</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setNotifyDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => setNotifyDialogOpen(false)}>Send Notification</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={alertDialogOpen} onOpenChange={setAlertDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Alert Doctor</DialogTitle>
            <DialogDescription>Send an alert to the doctor about this patient</DialogDescription>
          </DialogHeader>
          {selectedPatient && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Patient</Label>
                  <div className="font-medium">{selectedPatient.name}</div>
                </div>
                <div>
                  <Label>Doctor</Label>
                  <div className="font-medium">{selectedPatient.doctor}</div>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Alert Type</Label>
                <Select defaultValue="waiting">
                  <SelectTrigger>
                    <SelectValue placeholder="Select alert type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="waiting">Patient Waiting Long</SelectItem>
                    <SelectItem value="urgent">Urgent Attention Needed</SelectItem>
                    <SelectItem value="ready">Patient Ready</SelectItem>
                    <SelectItem value="custom">Custom Alert</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Message</Label>
                <Textarea placeholder="Patient has been waiting for over 30 minutes. Please advise on status." />
              </div>

              <div className="space-y-2">
                <Label>Priority</Label>
                <Select defaultValue="normal">
                  <SelectTrigger>
                    <SelectValue placeholder="Select priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="normal">Normal</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setAlertDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => setAlertDialogOpen(false)}>Send Alert</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
