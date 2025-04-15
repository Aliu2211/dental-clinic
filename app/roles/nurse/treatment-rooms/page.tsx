"use client"

import { useState } from "react"
import { useAuth } from "@/contexts/auth-context"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { ScrollArea } from "@/components/ui/scroll-area"
import { CheckCircle, Clock, AlertCircle, RefreshCw, Search } from "lucide-react"

export default function TreatmentRoomsPage() {
  const { user } = useAuth()
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("all")

  // Mock data for treatment rooms
  const treatmentRooms = [
    {
      id: 1,
      name: "Room 101",
      status: "ready",
      lastCleaned: "2023-03-31T09:00:00",
      equipment: ["Dental Chair", "X-Ray Machine", "Sterilizer"],
      nextAppointment: "10:30 AM - Dr. Smith",
      notes: "Equipment maintenance scheduled for next week",
    },
    {
      id: 2,
      name: "Room 102",
      status: "occupied",
      patient: "John Doe",
      doctor: "Dr. Johnson",
      procedure: "Root Canal",
      startTime: "09:15 AM",
      estimatedEndTime: "10:45 AM",
      equipment: ["Dental Chair", "Endodontic Equipment", "Microscope"],
    },
    {
      id: 3,
      name: "Room 103",
      status: "cleaning",
      lastPatient: "Sarah Williams",
      lastProcedure: "Dental Filling",
      cleaningStarted: "09:30 AM",
      estimatedCompletion: "09:45 AM",
      assignedStaff: "Maria Rodriguez",
    },
    {
      id: 4,
      name: "Room 104",
      status: "maintenance",
      issue: "Dental Chair Malfunction",
      reportedBy: "Dr. Anderson",
      reportedAt: "08:45 AM",
      technician: "Tech Support Team",
      estimatedResolution: "12:00 PM",
    },
    {
      id: 5,
      name: "Room 105",
      status: "ready",
      lastCleaned: "2023-03-31T08:30:00",
      equipment: ["Dental Chair", "Intraoral Camera", "Curing Light"],
      nextAppointment: "11:00 AM - Dr. Wilson",
      notes: "",
    },
  ]

  // Filter rooms based on search query and active tab
  const filteredRooms = treatmentRooms.filter((room) => {
    const matchesSearch = room.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesTab = activeTab === "all" || room.status === activeTab
    return matchesSearch && matchesTab
  })

  // Get status badge color
  const getStatusBadge = (status) => {
    switch (status) {
      case "ready":
        return <Badge className="bg-green-500">Ready</Badge>
      case "occupied":
        return <Badge className="bg-blue-500">Occupied</Badge>
      case "cleaning":
        return <Badge className="bg-yellow-500">Cleaning</Badge>
      case "maintenance":
        return <Badge className="bg-red-500">Maintenance</Badge>
      default:
        return <Badge>Unknown</Badge>
    }
  }

  // Get status icon
  const getStatusIcon = (status) => {
    switch (status) {
      case "ready":
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case "occupied":
        return <Clock className="h-5 w-5 text-blue-500" />
      case "cleaning":
        return <RefreshCw className="h-5 w-5 text-yellow-500" />
      case "maintenance":
        return <AlertCircle className="h-5 w-5 text-red-500" />
      default:
        return null
    }
  }

  return (
    <div className="container mx-auto p-6">
      <div className="mb-6 flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Treatment Rooms</h1>
          <p className="text-muted-foreground">Manage and monitor treatment room status and equipment</p>
        </div>
        <div className="flex items-center space-x-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search rooms..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button>Add Room</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Treatment Room</DialogTitle>
                <DialogDescription>Enter the details for the new treatment room.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="room-name" className="text-right">
                    Room Name
                  </Label>
                  <Input id="room-name" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="room-status" className="text-right">
                    Status
                  </Label>
                  <Select>
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ready">Ready</SelectItem>
                      <SelectItem value="occupied">Occupied</SelectItem>
                      <SelectItem value="cleaning">Cleaning</SelectItem>
                      <SelectItem value="maintenance">Maintenance</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label className="text-right">Equipment</Label>
                  <div className="col-span-3 space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="dental-chair" />
                      <label htmlFor="dental-chair">Dental Chair</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="xray" />
                      <label htmlFor="xray">X-Ray Machine</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="sterilizer" />
                      <label htmlFor="sterilizer">Sterilizer</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="intraoral-camera" />
                      <label htmlFor="intraoral-camera">Intraoral Camera</label>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="notes" className="text-right">
                    Notes
                  </Label>
                  <Input id="notes" className="col-span-3" />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Save Room</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Tabs defaultValue="all" className="mb-6" onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="all">All Rooms</TabsTrigger>
          <TabsTrigger value="ready">Ready</TabsTrigger>
          <TabsTrigger value="occupied">Occupied</TabsTrigger>
          <TabsTrigger value="cleaning">Cleaning</TabsTrigger>
          <TabsTrigger value="maintenance">Maintenance</TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredRooms.map((room) => (
          <Card key={room.id} className="overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div>
                <CardTitle className="text-xl">{room.name}</CardTitle>
                <CardDescription>{getStatusBadge(room.status)}</CardDescription>
              </div>
              {getStatusIcon(room.status)}
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-40">
                {room.status === "ready" && (
                  <div className="space-y-2">
                    <p>
                      <span className="font-semibold">Last Cleaned:</span>{" "}
                      {new Date(room.lastCleaned).toLocaleTimeString()}
                    </p>
                    <p>
                      <span className="font-semibold">Equipment:</span> {room.equipment.join(", ")}
                    </p>
                    <p>
                      <span className="font-semibold">Next Appointment:</span> {room.nextAppointment}
                    </p>
                    {room.notes && (
                      <p>
                        <span className="font-semibold">Notes:</span> {room.notes}
                      </p>
                    )}
                  </div>
                )}
                {room.status === "occupied" && (
                  <div className="space-y-2">
                    <p>
                      <span className="font-semibold">Patient:</span> {room.patient}
                    </p>
                    <p>
                      <span className="font-semibold">Doctor:</span> {room.doctor}
                    </p>
                    <p>
                      <span className="font-semibold">Procedure:</span> {room.procedure}
                    </p>
                    <p>
                      <span className="font-semibold">Started:</span> {room.startTime}
                    </p>
                    <p>
                      <span className="font-semibold">Est. End Time:</span> {room.estimatedEndTime}
                    </p>
                    <p>
                      <span className="font-semibold">Equipment:</span> {room.equipment.join(", ")}
                    </p>
                  </div>
                )}
                {room.status === "cleaning" && (
                  <div className="space-y-2">
                    <p>
                      <span className="font-semibold">Last Patient:</span> {room.lastPatient}
                    </p>
                    <p>
                      <span className="font-semibold">Last Procedure:</span> {room.lastProcedure}
                    </p>
                    <p>
                      <span className="font-semibold">Cleaning Started:</span> {room.cleaningStarted}
                    </p>
                    <p>
                      <span className="font-semibold">Est. Completion:</span> {room.estimatedCompletion}
                    </p>
                    <p>
                      <span className="font-semibold">Assigned Staff:</span> {room.assignedStaff}
                    </p>
                  </div>
                )}
                {room.status === "maintenance" && (
                  <div className="space-y-2">
                    <p>
                      <span className="font-semibold">Issue:</span> {room.issue}
                    </p>
                    <p>
                      <span className="font-semibold">Reported By:</span> {room.reportedBy}
                    </p>
                    <p>
                      <span className="font-semibold">Reported At:</span> {room.reportedAt}
                    </p>
                    <p>
                      <span className="font-semibold">Technician:</span> {room.technician}
                    </p>
                    <p>
                      <span className="font-semibold">Est. Resolution:</span> {room.estimatedResolution}
                    </p>
                  </div>
                )}
              </ScrollArea>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" size="sm">
                Update Status
              </Button>
              <Button size="sm">View Details</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}
