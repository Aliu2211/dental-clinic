"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Plus, FileText, Activity } from "lucide-react"

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
  },
  {
    id: "V004",
    patientName: "Emily Davis",
    patientId: "P004",
    temperature: "98.4°F",
    bloodPressure: "118/75",
    heartRate: "68 bpm",
    respiratoryRate: "14 bpm",
    oxygenSaturation: "98%",
    date: "2023-10-14",
    time: "02:45 PM",
  },
  {
    id: "V005",
    patientName: "Michael Brown",
    patientId: "P005",
    temperature: "99.0°F",
    bloodPressure: "135/88",
    heartRate: "80 bpm",
    respiratoryRate: "17 bpm",
    oxygenSaturation: "96%",
    date: "2023-10-14",
    time: "03:30 PM",
  },
]

export default function VitalsPage() {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredVitals = vitalsRecords.filter(
    (record) =>
      record.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.patientId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.id.toLowerCase().includes(searchTerm.toLowerCase()),
  )

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
                <Button className="flex items-center gap-2">
                  <Plus className="h-4 w-4" />
                  Record Vitals
                </Button>
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
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredVitals.map((record) => (
                    <TableRow key={record.id}>
                      <TableCell className="font-medium">{record.id}</TableCell>
                      <TableCell>{record.patientName}</TableCell>
                      <TableCell>{record.temperature}</TableCell>
                      <TableCell>{record.bloodPressure}</TableCell>
                      <TableCell>{record.heartRate}</TableCell>
                      <TableCell>
                        {record.date} {record.time}
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
              <p>Today's vitals content would go here.</p>
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
              <p>Abnormal vitals content would go here.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
