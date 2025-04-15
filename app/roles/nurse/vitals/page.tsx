"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Plus, FileText, Activity, AlertTriangle } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
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

// Mock vitals data
const vitalsRecords = [
  {
    id: "V001",
    patientName: "John Doe",
    patientId: "P001",
    temperature: "98.6°F",
    bloodPressure: "120/80",
    heartRate: "72 bpm",
    respiratoryRate: "16 bpm",
    oxygenSaturation: "98%",
    date: "2023-10-15",
    time: "09:30 AM",
    status: "normal",
  },
  {
    id: "V002",
    patientName: "Jane Smith",
    patientId: "P002",
    temperature: "99.1°F",
    bloodPressure: "130/85",
    heartRate: "78 bpm",
    respiratoryRate: "18 bpm",
    oxygenSaturation: "97%",
    date: "2023-10-15",
    time: "10:15 AM",
    status: "normal",
  },
  {
    id: "V003",
    patientName: "Robert Johnson",
    patientId: "P003",
    temperature: "98.9°F",
    bloodPressure: "125/82",
    heartRate: "70 bpm",
    respiratoryRate: "15 bpm",
    oxygenSaturation: "99%",
    date: "2023-10-15",
    time: "11:00 AM",
    status: "normal",
  },
  {
    id: "V004",
    patientName: "Emily Davis",
    patientId: "P004",
    temperature: "101.2°F",
    bloodPressure: "118/75",
    heartRate: "88 bpm",
    respiratoryRate: "20 bpm",
    oxygenSaturation: "96%",
    date: "2023-10-14",
    time: "02:45 PM",
    status: "abnormal",
  },
  {
    id: "V005",
    patientName: "Michael Brown",
    patientId: "P005",
    temperature: "99.0°F",
    bloodPressure: "145/95",
    heartRate: "80 bpm",
    respiratoryRate: "17 bpm",
    oxygenSaturation: "96%",
    date: "2023-10-14",
    time: "03:30 PM",
    status: "abnormal",
  },
]

export default function VitalsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [selectedPatient, setSelectedPatient] = useState("")

  const filteredVitals = vitalsRecords.filter(
    (record) =>
      record.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.patientId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.id.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const abnormalVitals = vitalsRecords.filter((record) => record.status === "abnormal")
  const todayVitals = vitalsRecords.filter((record) => record.date === "2023-10-15")

  return (
    <div className="space-y-4">
      <h2 className="text-3xl font-bold tracking-tight">Vitals Management</h2>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All Records</TabsTrigger>
          <TabsTrigger value="today">Today</TabsTrigger>
          <TabsTrigger value="abnormal">Abnormal</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Vitals Records</CardTitle>
                  <CardDescription>View and record patient vital signs</CardDescription>
                </div>
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                  <DialogTrigger asChild>
                    <Button className="flex items-center gap-2">
                      <Plus className="h-4 w-4" />
                      Record Vitals
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>Record New Vitals</DialogTitle>
                      <DialogDescription>Enter the patient's vital signs below.</DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid gap-2">
                        <Label htmlFor="patient">Patient</Label>
                        <Select value={selectedPatient} onValueChange={setSelectedPatient}>
                          <SelectTrigger id="patient">
                            <SelectValue placeholder="Select patient" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="P001">John Doe</SelectItem>
                            <SelectItem value="P002">Jane Smith</SelectItem>
                            <SelectItem value="P003">Robert Johnson</SelectItem>
                            <SelectItem value="P004">Emily Davis</SelectItem>
                            <SelectItem value="P005">Michael Brown</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="grid gap-2">
                          <Label htmlFor="temperature">Temperature</Label>
                          <Input id="temperature" placeholder="98.6°F" />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="bloodPressure">Blood Pressure</Label>
                          <Input id="bloodPressure" placeholder="120/80" />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="grid gap-2">
                          <Label htmlFor="heartRate">Heart Rate</Label>
                          <Input id="heartRate" placeholder="72 bpm" />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="respiratoryRate">Respiratory Rate</Label>
                          <Input id="respiratoryRate" placeholder="16 bpm" />
                        </div>
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="oxygenSaturation">Oxygen Saturation</Label>
                        <Input id="oxygenSaturation" placeholder="98%" />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button type="submit" onClick={() => setIsDialogOpen(false)}>
                        Save Vitals
                      </Button>
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
                    placeholder="Search records..."
                    className="pl-8"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Record ID</TableHead>
                    <TableHead>Patient</TableHead>
                    <TableHead>Temperature</TableHead>
                    <TableHead>Blood Pressure</TableHead>
                    <TableHead>Heart Rate</TableHead>
                    <TableHead>Date & Time</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredVitals.map((record) => (
                    <TableRow key={record.id}>
                      <TableCell className="font-medium">{record.id}</TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Avatar className="h-6 w-6">
                            <AvatarImage src="/placeholder.svg?height=32&width=32" />
                            <AvatarFallback>
                              {record.patientName
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <span>{record.patientName}</span>
                        </div>
                      </TableCell>
                      <TableCell>{record.temperature}</TableCell>
                      <TableCell>{record.bloodPressure}</TableCell>
                      <TableCell>{record.heartRate}</TableCell>
                      <TableCell>
                        {record.date} {record.time}
                      </TableCell>
                      <TableCell>
                        <Badge variant={record.status === "normal" ? "outline" : "destructive"}>
                          {record.status === "normal" ? "Normal" : "Abnormal"}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="ghost" size="icon" title="View Details">
                            <FileText className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" title="Record New Vitals">
                            <Activity className="h-4 w-4" />
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

        <TabsContent value="today" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Today's Vitals</CardTitle>
              <CardDescription>Vital signs recorded today</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {todayVitals.map((record) => (
                  <Card key={record.id} className="overflow-hidden">
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-2">
                          <Avatar>
                            <AvatarImage src="/placeholder.svg?height=40&width=40" />
                            <AvatarFallback>
                              {record.patientName
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <CardTitle className="text-base">{record.patientName}</CardTitle>
                            <CardDescription>{record.patientId}</CardDescription>
                          </div>
                        </div>
                        <Badge variant={record.status === "normal" ? "outline" : "destructive"}>
                          {record.status === "normal" ? "Normal" : "Abnormal"}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div className="flex items-center">
                          <span className="font-medium mr-2">Temp:</span>
                          <span>{record.temperature}</span>
                        </div>
                        <div className="flex items-center">
                          <span className="font-medium mr-2">BP:</span>
                          <span>{record.bloodPressure}</span>
                        </div>
                        <div className="flex items-center">
                          <span className="font-medium mr-2">HR:</span>
                          <span>{record.heartRate}</span>
                        </div>
                        <div className="flex items-center">
                          <span className="font-medium mr-2">RR:</span>
                          <span>{record.respiratoryRate}</span>
                        </div>
                        <div className="flex items-center col-span-2">
                          <span className="font-medium mr-2">O₂ Sat:</span>
                          <span>{record.oxygenSaturation}</span>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="bg-muted/50 text-xs">Recorded at {record.time}</CardFooter>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="abnormal" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Abnormal Vitals</CardTitle>
              <CardDescription>Vital signs outside normal ranges</CardDescription>
            </CardHeader>
            <CardContent>
              {abnormalVitals.length > 0 ? (
                <div className="space-y-4">
                  {abnormalVitals.map((record) => (
                    <div key={record.id} className="flex flex-col md:flex-row border rounded-lg p-4 bg-red-50">
                      <div className="flex items-center mb-4 md:mb-0 md:mr-6">
                        <AlertTriangle className="h-5 w-5 text-red-500 mr-2" />
                        <div>
                          <p className="font-medium">{record.patientName}</p>
                          <p className="text-sm text-muted-foreground">{record.patientId}</p>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 flex-1">
                        <div className="text-center p-2 rounded bg-white">
                          <p className="text-xs text-muted-foreground">Temperature</p>
                          <p
                            className={`font-medium ${Number.parseFloat(record.temperature) > 100 ? "text-red-500" : ""}`}
                          >
                            {record.temperature}
                          </p>
                        </div>
                        <div className="text-center p-2 rounded bg-white">
                          <p className="text-xs text-muted-foreground">Blood Pressure</p>
                          <p
                            className={`font-medium ${Number.parseInt(record.bloodPressure.split("/")[0]) > 140 ? "text-red-500" : ""}`}
                          >
                            {record.bloodPressure}
                          </p>
                        </div>
                        <div className="text-center p-2 rounded bg-white">
                          <p className="text-xs text-muted-foreground">Heart Rate</p>
                          <p className="font-medium">{record.heartRate}</p>
                        </div>
                        <div className="text-center p-2 rounded bg-white">
                          <p className="text-xs text-muted-foreground">Respiratory Rate</p>
                          <p className="font-medium">{record.respiratoryRate}</p>
                        </div>
                        <div className="text-center p-2 rounded bg-white">
                          <p className="text-xs text-muted-foreground">O₂ Saturation</p>
                          <p className="font-medium">{record.oxygenSaturation}</p>
                        </div>
                      </div>
                      <div className="mt-4 md:mt-0 md:ml-4 flex items-center">
                        <Button size="sm" variant="outline" className="mr-2">
                          Notify Doctor
                        </Button>
                        <Button size="sm">Follow Up</Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">No abnormal vitals recorded.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
