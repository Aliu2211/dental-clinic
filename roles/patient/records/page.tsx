"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, FileText, Download, Share2 } from "lucide-react"
import { PatientRecordNFT } from "@/components/blockchain/patient-record-nft"

// Mock medical records data
const medicalRecords = [
  {
    id: "MR001",
    date: "2023-10-01",
    doctor: "Dr. Sarah Johnson",
    type: "Examination",
    diagnosis: "Dental Caries",
    treatment: "Filling",
    notes: "Patient reported sensitivity to cold. Filling applied to lower right molar.",
    verified: true,
  },
  {
    id: "MR002",
    date: "2023-09-15",
    doctor: "Dr. Michael Lee",
    type: "X-Ray",
    diagnosis: "Normal",
    treatment: "None",
    notes: "Routine X-ray shows no abnormalities.",
    verified: true,
  },
  {
    id: "MR003",
    date: "2023-08-20",
    doctor: "Dr. Sarah Johnson",
    type: "Procedure",
    diagnosis: "Gingivitis",
    treatment: "Deep Cleaning",
    notes: "Mild gum inflammation. Recommended improved flossing technique.",
    verified: true,
  },
  {
    id: "MR004",
    date: "2023-07-10",
    doctor: "Dr. Sarah Johnson",
    type: "Consultation",
    diagnosis: "Wisdom Tooth Evaluation",
    treatment: "Monitoring",
    notes: "Wisdom teeth are partially erupted but not causing issues at this time. Will monitor.",
    verified: false,
  },
  {
    id: "MR005",
    date: "2023-06-05",
    doctor: "Dr. Michael Lee",
    type: "Procedure",
    diagnosis: "Dental Caries",
    treatment: "Root Canal",
    notes: "Successful root canal treatment on upper left molar.",
    verified: true,
  },
]

export default function PatientRecordsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedRecord, setSelectedRecord] = useState<any>(null)

  const filteredRecords = medicalRecords.filter(
    (record) =>
      record.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.diagnosis.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.doctor.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="space-y-4">
      <h2 className="text-3xl font-bold tracking-tight">My Medical Records</h2>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All Records</TabsTrigger>
          <TabsTrigger value="verified">Blockchain Verified</TabsTrigger>
          <TabsTrigger value="recent">Recent</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Medical Records</CardTitle>
                  <CardDescription>View your complete medical history</CardDescription>
                </div>
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
                    <TableHead>Date</TableHead>
                    <TableHead>Doctor</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Diagnosis</TableHead>
                    <TableHead>Verified</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredRecords.map((record) => (
                    <TableRow key={record.id} onClick={() => setSelectedRecord(record)} className="cursor-pointer">
                      <TableCell className="font-medium">{record.id}</TableCell>
                      <TableCell>{record.date}</TableCell>
                      <TableCell>{record.doctor}</TableCell>
                      <TableCell>{record.type}</TableCell>
                      <TableCell>{record.diagnosis}</TableCell>
                      <TableCell>
                        {record.verified ? (
                          <span className="px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">Verified</span>
                        ) : (
                          <span className="px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-800">Pending</span>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="ghost" size="icon" title="View Details">
                            <FileText className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" title="Download">
                            <Download className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" title="Share">
                            <Share2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              {selectedRecord && (
                <div className="mt-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Record Details: {selectedRecord.id}</CardTitle>
                      <CardDescription>
                        {selectedRecord.date} | {selectedRecord.doctor}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <h4 className="font-medium text-sm text-muted-foreground">Type</h4>
                          <p>{selectedRecord.type}</p>
                        </div>
                        <div>
                          <h4 className="font-medium text-sm text-muted-foreground">Diagnosis</h4>
                          <p>{selectedRecord.diagnosis}</p>
                        </div>
                        <div>
                          <h4 className="font-medium text-sm text-muted-foreground">Treatment</h4>
                          <p>{selectedRecord.treatment}</p>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-medium text-sm text-muted-foreground">Notes</h4>
                        <p>{selectedRecord.notes}</p>
                      </div>

                      {selectedRecord.verified && (
                        <div className="mt-4">
                          <h4 className="font-medium mb-2">Blockchain Verification</h4>
                          <PatientRecordNFT recordId={selectedRecord.id} />
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="verified" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Blockchain Verified Records</CardTitle>
              <CardDescription>Records that have been verified on the blockchain</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Blockchain verified records content would go here.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="recent" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Records</CardTitle>
              <CardDescription>Records from the past 3 months</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Recent records content would go here.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
