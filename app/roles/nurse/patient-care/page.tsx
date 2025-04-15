"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Search, Clipboard, CheckCircle, AlertCircle, Clock, FileText, MessageSquare } from "lucide-react"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"

// Mock patient data
const patients = [
  {
    id: "P001",
    name: "John Doe",
    age: 45,
    gender: "Male",
    room: "Room 1",
    doctor: "Dr. Smith",
    procedure: "Dental Cleaning",
    status: "In Treatment",
    notes: "Patient has a history of dental anxiety. Use nitrous oxide if necessary.",
    allergies: ["Penicillin", "Latex"],
    careItems: [
      { id: "C1", task: "Pre-procedure rinse", completed: true },
      { id: "C2", task: "Take vitals", completed: true },
      { id: "C3", task: "Prepare dental tools", completed: false },
      { id: "C4", task: "Assist with procedure", completed: false },
      { id: "C5", task: "Post-procedure instructions", completed: false },
    ],
  },
  {
    id: "P002",
    name: "Jane Smith",
    age: 32,
    gender: "Female",
    room: "Room 3",
    doctor: "Dr. Johnson",
    procedure: "Root Canal",
    status: "Waiting",
    notes: "Patient is nervous about procedure. Explained process in detail.",
    allergies: ["Codeine"],
    careItems: [
      { id: "C6", task: "Pre-procedure rinse", completed: false },
      { id: "C7", task: "Take vitals", completed: false },
      { id: "C8", task: "Prepare dental tools", completed: false },
      { id: "C9", task: "Assist with procedure", completed: false },
      { id: "C10", task: "Post-procedure instructions", completed: false },
    ],
  },
  {
    id: "P003",
    name: "Robert Johnson",
    age: 58,
    gender: "Male",
    room: "Room 2",
    doctor: "Dr. Williams",
    procedure: "Tooth Extraction",
    status: "Scheduled",
    notes: "Patient is on blood thinners. Monitor closely for excessive bleeding.",
    allergies: ["Aspirin", "Sulfa drugs"],
    careItems: [
      { id: "C11", task: "Pre-procedure rinse", completed: false },
      { id: "C12", task: "Take vitals", completed: false },
      { id: "C13", task: "Prepare dental tools", completed: false },
      { id: "C14", task: "Assist with procedure", completed: false },
      { id: "C15", task: "Post-procedure instructions", completed: false },
    ],
  },
  {
    id: "P004",
    name: "Emily Davis",
    age: 27,
    gender: "Female",
    room: "Room 1",
    doctor: "Dr. Smith",
    procedure: "Dental Filling",
    status: "Scheduled",
    notes: "Patient prefers minimal anesthesia if possible.",
    allergies: [],
    careItems: [
      { id: "C16", task: "Pre-procedure rinse", completed: false },
      { id: "C17", task: "Take vitals", completed: false },
      { id: "C18", task: "Prepare dental tools", completed: false },
      { id: "C19", task: "Assist with procedure", completed: false },
      { id: "C20", task: "Post-procedure instructions", completed: false },
    ],
  },
]

export default function PatientCarePage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedPatient, setSelectedPatient] = useState(patients[0])
  const [careItems, setCareItems] = useState(patients[0].careItems)
  const [noteText, setNoteText] = useState("")

  const filteredPatients = patients.filter(
    (patient) =>
      patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.room.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handlePatientSelect = (patient) => {
    setSelectedPatient(patient)
    setCareItems(patient.careItems)
  }

  const handleCheckboxChange = (id) => {
    setCareItems(careItems.map((item) => (item.id === id ? { ...item, completed: !item.completed } : item)))
  }

  const getStatusBadge = (status) => {
    switch (status) {
      case "In Treatment":
        return <Badge>In Treatment</Badge>
      case "Waiting":
        return <Badge variant="secondary">Waiting</Badge>
      case "Scheduled":
        return <Badge variant="outline">Scheduled</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  return (
    <div className="space-y-4">
      <h2 className="text-3xl font-bold tracking-tight">Patient Care</h2>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="md:col-span-1">
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Today's Patients</CardTitle>
              <CardDescription>Manage patient care tasks</CardDescription>
              <div className="relative mt-2">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search patients..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="max-h-[500px] overflow-y-auto">
                {filteredPatients.map((patient) => (
                  <div
                    key={patient.id}
                    className={`p-4 border-b cursor-pointer hover:bg-muted/50 transition-colors ${
                      selectedPatient.id === patient.id ? "bg-muted" : ""
                    }`}
                    onClick={() => handlePatientSelect(patient)}
                  >
                    <div className="flex items-center space-x-3">
                      <Avatar>
                        <AvatarImage src="/placeholder.svg?height=40&width=40" />
                        <AvatarFallback>
                          {patient.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{patient.name}</p>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <span>{patient.room}</span>
                          <span className="mx-1">•</span>
                          <span>{patient.procedure}</span>
                        </div>
                        <div className="mt-1">{getStatusBadge(patient.status)}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-2">
          <Card className="h-full">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle>{selectedPatient.name}</CardTitle>
                  <CardDescription>
                    {selectedPatient.age} years • {selectedPatient.gender} • {selectedPatient.id}
                  </CardDescription>
                </div>
                {getStatusBadge(selectedPatient.status)}
              </div>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="care" className="space-y-4">
                <TabsList>
                  <TabsTrigger value="care">Care Plan</TabsTrigger>
                  <TabsTrigger value="notes">Notes</TabsTrigger>
                  <TabsTrigger value="details">Patient Details</TabsTrigger>
                </TabsList>

                <TabsContent value="care" className="space-y-4">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-medium">Care Checklist</h3>
                      <div className="text-sm text-muted-foreground">
                        {careItems.filter((item) => item.completed).length} of {careItems.length} completed
                      </div>
                    </div>

                    <div className="space-y-2">
                      {careItems.map((item) => (
                        <div key={item.id} className="flex items-center space-x-2 p-2 rounded border">
                          <Checkbox
                            id={item.id}
                            checked={item.completed}
                            onCheckedChange={() => handleCheckboxChange(item.id)}
                          />
                          <label
                            htmlFor={item.id}
                            className={`flex-1 text-sm ${item.completed ? "line-through text-muted-foreground" : ""}`}
                          >
                            {item.task}
                          </label>
                          {item.completed ? (
                            <CheckCircle className="h-4 w-4 text-green-500" />
                          ) : (
                            <Clock className="h-4 w-4 text-muted-foreground" />
                          )}
                        </div>
                      ))}
                    </div>

                    <div className="pt-4">
                      <h3 className="text-lg font-medium mb-2">Procedure Information</h3>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div>
                          <p className="font-medium">Doctor</p>
                          <p className="text-muted-foreground">{selectedPatient.doctor}</p>
                        </div>
                        <div>
                          <p className="font-medium">Procedure</p>
                          <p className="text-muted-foreground">{selectedPatient.procedure}</p>
                        </div>
                        <div>
                          <p className="font-medium">Room</p>
                          <p className="text-muted-foreground">{selectedPatient.room}</p>
                        </div>
                        <div>
                          <p className="font-medium">Status</p>
                          <p className="text-muted-foreground">{selectedPatient.status}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="notes" className="space-y-4">
                  <div className="space-y-4">
                    <div className="p-4 border rounded bg-muted/50">
                      <div className="flex items-center mb-2">
                        <FileText className="h-4 w-4 mr-2 text-muted-foreground" />
                        <p className="font-medium">Clinical Notes</p>
                      </div>
                      <p className="text-sm">{selectedPatient.notes}</p>
                    </div>

                    <div className="space-y-2">
                      <h3 className="text-lg font-medium">Add Note</h3>
                      <Textarea
                        placeholder="Enter your notes here..."
                        value={noteText}
                        onChange={(e) => setNoteText(e.target.value)}
                        className="min-h-[100px]"
                      />
                      <div className="flex justify-end">
                        <Button className="flex items-center gap-2">
                          <MessageSquare className="h-4 w-4" />
                          Save Note
                        </Button>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="details" className="space-y-4">
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-lg font-medium mb-2">Patient Information</h3>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="font-medium">Patient ID</p>
                          <p className="text-muted-foreground">{selectedPatient.id}</p>
                        </div>
                        <div>
                          <p className="font-medium">Name</p>
                          <p className="text-muted-foreground">{selectedPatient.name}</p>
                        </div>
                        <div>
                          <p className="font-medium">Age</p>
                          <p className="text-muted-foreground">{selectedPatient.age} years</p>
                        </div>
                        <div>
                          <p className="font-medium">Gender</p>
                          <p className="text-muted-foreground">{selectedPatient.gender}</p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-medium mb-2">Allergies</h3>
                      {selectedPatient.allergies.length > 0 ? (
                        <div className="flex flex-wrap gap-2">
                          {selectedPatient.allergies.map((allergy, index) => (
                            <div
                              key={index}
                              className="flex items-center px-3 py-1 rounded-full bg-red-100 text-red-800 text-sm"
                            >
                              <AlertCircle className="h-3 w-3 mr-1" />
                              {allergy}
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-sm text-muted-foreground">No known allergies</p>
                      )}
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
            <CardFooter className="border-t bg-muted/50 flex justify-between">
              <Button variant="outline" className="flex items-center gap-2">
                <Clipboard className="h-4 w-4" />
                Print Care Plan
              </Button>
              <Button className="flex items-center gap-2">Complete Care</Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}
