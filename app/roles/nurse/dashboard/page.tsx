"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Users, HeartPulse, Calendar, ClipboardList, Pill, Stethoscope, Syringe } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

export default function NurseDashboardPage() {
  return (
    <div className="space-y-4">
      <h2 className="text-3xl font-bold tracking-tight">Nurse Dashboard</h2>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Patients Today</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">+3 from yesterday</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Vitals Pending</CardTitle>
            <HeartPulse className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4</div>
            <p className="text-xs text-muted-foreground">-1 from an hour ago</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Next Patient</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Now</div>
            <p className="text-xs text-muted-foreground">Jane Smith - Room 3</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Supplies Status</CardTitle>
            <ClipboardList className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Good</div>
            <p className="text-xs text-muted-foreground">2 items low</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="patients">Patients</TabsTrigger>
          <TabsTrigger value="tasks">Tasks</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Patient Vitals</CardTitle>
                <CardDescription>Recent vital recordings</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <Avatar>
                      <AvatarImage src="/placeholder.svg?height=40&width=40" />
                      <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                    <div className="space-y-1">
                      <p className="text-sm font-medium leading-none">John Doe</p>
                      <p className="text-sm text-muted-foreground">Room 1</p>
                      <div className="flex flex-wrap gap-1 mt-1">
                        <Badge variant="outline" className="text-xs">
                          BP: 120/80
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          Temp: 98.6°F
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <Avatar>
                      <AvatarImage src="/placeholder.svg?height=40&width=40" />
                      <AvatarFallback>JS</AvatarFallback>
                    </Avatar>
                    <div className="space-y-1">
                      <p className="text-sm font-medium leading-none">Jane Smith</p>
                      <p className="text-sm text-muted-foreground">Room 3</p>
                      <div className="flex flex-wrap gap-1 mt-1">
                        <Badge variant="outline" className="text-xs">
                          BP: 130/85
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          Temp: 99.1°F
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <Avatar>
                      <AvatarImage src="/placeholder.svg?height=40&width=40" />
                      <AvatarFallback>RJ</AvatarFallback>
                    </Avatar>
                    <div className="space-y-1">
                      <p className="text-sm font-medium leading-none">Robert Johnson</p>
                      <p className="text-sm text-muted-foreground">Room 2</p>
                      <div className="flex flex-wrap gap-1 mt-1">
                        <Badge variant="outline" className="text-xs">
                          BP: 125/82
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          Temp: 98.9°F
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Medication Schedule</CardTitle>
                <CardDescription>Upcoming medications</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="border-l-4 border-blue-500 pl-4 py-2">
                    <p className="text-sm font-semibold">11:00 AM - Room 1</p>
                    <p className="text-sm">John Doe</p>
                    <div className="flex items-center mt-1">
                      <Pill className="h-4 w-4 mr-1 text-blue-500" />
                      <span className="text-xs">Amoxicillin 500mg</span>
                    </div>
                  </div>
                  <div className="border-l-4 border-green-500 pl-4 py-2">
                    <p className="text-sm font-semibold">11:30 AM - Room 3</p>
                    <p className="text-sm">Jane Smith</p>
                    <div className="flex items-center mt-1">
                      <Pill className="h-4 w-4 mr-1 text-green-500" />
                      <span className="text-xs">Ibuprofen 400mg</span>
                    </div>
                  </div>
                  <div className="border-l-4 border-purple-500 pl-4 py-2">
                    <p className="text-sm font-semibold">12:00 PM - Room 2</p>
                    <p className="text-sm">Robert Johnson</p>
                    <div className="flex items-center mt-1">
                      <Pill className="h-4 w-4 mr-1 text-purple-500" />
                      <span className="text-xs">Lisinopril 10mg</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Tasks</CardTitle>
                <CardDescription>Pending nursing tasks</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <div className="w-2 h-2 rounded-full bg-red-500 mr-2"></div>
                      <div>
                        <p className="text-sm font-medium">Change IV bag</p>
                        <p className="text-xs text-muted-foreground">Room 1 - John Doe</p>
                      </div>
                    </div>
                    <Button size="sm" variant="outline">
                      Complete
                    </Button>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <div className="w-2 h-2 rounded-full bg-yellow-500 mr-2"></div>
                      <div>
                        <p className="text-sm font-medium">Prepare for procedure</p>
                        <p className="text-xs text-muted-foreground">Room 3 - Jane Smith</p>
                      </div>
                    </div>
                    <Button size="sm" variant="outline">
                      Complete
                    </Button>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
                      <div>
                        <p className="text-sm font-medium">Check vitals at 12:30 PM</p>
                        <p className="text-xs text-muted-foreground">Room 2 - Robert Johnson</p>
                      </div>
                    </div>
                    <Button size="sm" variant="outline">
                      Complete
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="patients" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Today's Patients</CardTitle>
              <CardDescription>Patients scheduled for today</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    name: "John Doe",
                    time: "10:00 AM",
                    doctor: "Dr. Smith",
                    procedure: "Dental Cleaning",
                    room: "Room 1",
                    status: "In Progress",
                  },
                  {
                    name: "Jane Smith",
                    time: "11:30 AM",
                    doctor: "Dr. Johnson",
                    procedure: "Root Canal",
                    room: "Room 3",
                    status: "Waiting",
                  },
                  {
                    name: "Robert Johnson",
                    time: "1:00 PM",
                    doctor: "Dr. Williams",
                    procedure: "Tooth Extraction",
                    room: "Room 2",
                    status: "Scheduled",
                  },
                  {
                    name: "Emily Davis",
                    time: "2:30 PM",
                    doctor: "Dr. Smith",
                    procedure: "Dental Filling",
                    room: "Room 1",
                    status: "Scheduled",
                  },
                ].map((patient, index) => (
                  <div
                    key={index}
                    className="flex flex-col md:flex-row md:items-center justify-between p-4 border rounded-lg"
                  >
                    <div className="space-y-1 mb-2 md:mb-0">
                      <div className="flex items-center">
                        <p className="font-medium">{patient.name}</p>
                        <Badge
                          className="ml-2"
                          variant={
                            patient.status === "In Progress"
                              ? "default"
                              : patient.status === "Waiting"
                                ? "secondary"
                                : "outline"
                          }
                        >
                          {patient.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {patient.time} - {patient.room}
                      </p>
                      <p className="text-sm">
                        {patient.doctor} - {patient.procedure}
                      </p>
                    </div>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline">
                        <Stethoscope className="h-4 w-4 mr-1" />
                        Vitals
                      </Button>
                      <Button size="sm" variant="outline">
                        <Syringe className="h-4 w-4 mr-1" />
                        Prep
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="tasks" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Task Management</CardTitle>
              <CardDescription>Manage your daily tasks</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-red-500 mr-3"></div>
                    <div>
                      <p className="font-medium">High Priority</p>
                      <p className="text-sm text-muted-foreground">Tasks that need immediate attention</p>
                    </div>
                  </div>
                  <Badge>3 Tasks</Badge>
                </div>
                <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-yellow-500 mr-3"></div>
                    <div>
                      <p className="font-medium">Medium Priority</p>
                      <p className="text-sm text-muted-foreground">Tasks to complete today</p>
                    </div>
                  </div>
                  <Badge>5 Tasks</Badge>
                </div>
                <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-green-500 mr-3"></div>
                    <div>
                      <p className="font-medium">Low Priority</p>
                      <p className="text-sm text-muted-foreground">Tasks that can be scheduled</p>
                    </div>
                  </div>
                  <Badge>2 Tasks</Badge>
                </div>
                <Button className="w-full">View All Tasks</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
