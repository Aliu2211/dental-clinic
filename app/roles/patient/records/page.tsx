"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Download, Share2, Shield, Eye, Calendar } from "lucide-react"
import { Badge } from "@/components/ui/badge"
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
    attachments: 2,
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
    attachments: 1,
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
    attachments: 0,
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
    attachments: 1,
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
    attachments: 3,
  },
]

export default function PatientRecordsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedRecord, setSelectedRecord] = useState<any>(null)
  const [activeTab, setActiveTab] = useState("all")

  const filteredRecords = medicalRecords.filter((record) => {
    const matchesSearch =
      record.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.diagnosis.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.doctor.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.id.toLowerCase().includes(searchTerm.toLowerCase())

    if (activeTab === "verified") return matchesSearch && record.verified
    if (activeTab === "recent") {
      // Consider records from the last 3 months as recent
      const threeMonthsAgo = new Date()
      threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3)
      const recordDate = new Date(record.date)
      return matchesSearch && recordDate >= threeMonthsAgo
    }

    return matchesSearch
  })

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Medical Records</h2>
          <p className="text-muted-foreground">View and manage your complete dental health records</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="gap-1">
            <Download className="h-4 w-4" />
            <span>Export Records</span>
          </Button>
          <Button size="sm" className="gap-1">
            <Shield className="h-4 w-4" />
            <span>Privacy Settings</span>
          </Button>
        </div>
      </div>

      <Tabs defaultValue="all" className="space-y-4" onValueChange={setActiveTab}>
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
                          <Badge variant="outline" className="bg-green-100 text-green-800 hover:bg-green-100">
                            Verified
                          </Badge>
                        ) : (
                          <Badge variant="outline" className="bg-gray-100 text-gray-800 hover:bg-gray-100">
                            Pending
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="ghost" size="icon" title="View Details">
                            <Eye className="h-4 w-4" />
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
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle>Record Details: {selectedRecord.id}</CardTitle>
                          <CardDescription>
                            {selectedRecord.date} | {selectedRecord.doctor}
                          </CardDescription>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            <Download className="h-4 w-4 mr-2" />
                            Download
                          </Button>
                          <Button variant="outline" size="sm">
                            <Share2 className="h-4 w-4 mr-2" />
                            Share
                          </Button>
                        </div>
                      </div>
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
                        <div>
                          <h4 className="font-medium text-sm text-muted-foreground">Attachments</h4>
                          <p>{selectedRecord.attachments} files</p>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-medium text-sm text-muted-foreground">Notes</h4>
                        <p>{selectedRecord.notes}</p>
                      </div>

                      {selectedRecord.verified && (
                        <div className="mt-4 p-4 bg-green-50 rounded-lg border border-green-200">
                          <h4 className="font-medium mb-2 flex items-center text-green-800">
                            <Shield className="h-4 w-4 mr-2" />
                            Blockchain Verification
                          </h4>
                          <p className="text-sm text-green-700 mb-3">
                            This record has been securely verified on the blockchain, ensuring its authenticity and
                            immutability.
                          </p>
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
              <div className="p-4 bg-green-50 rounded-lg border border-green-200 mb-4">
                <h4 className="font-medium flex items-center text-green-800">
                  <Shield className="h-4 w-4 mr-2" />
                  What is Blockchain Verification?
                </h4>
                <p className="text-sm text-green-700 mt-1">
                  Blockchain verification ensures your medical records are tamper-proof and securely stored. Each
                  verified record receives a unique digital signature that can be independently verified.
                </p>
              </div>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Record ID</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Verification Date</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredRecords.map((record) => (
                    <TableRow key={record.id}>
                      <TableCell className="font-medium">{record.id}</TableCell>
                      <TableCell>{record.date}</TableCell>
                      <TableCell>{record.type}</TableCell>
                      <TableCell>{record.date}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="outline" size="sm">
                          View Certificate
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
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
              <div className="space-y-4">
                {filteredRecords.map((record) => (
                  <div key={record.id} className="p-4 bg-muted/50 rounded-lg">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium">
                          {record.type}: {record.diagnosis}
                        </h3>
                        <p className="text-sm text-muted-foreground">{record.doctor}</p>
                      </div>
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1 text-muted-foreground" />
                        <span className="text-sm">{record.date}</span>
                      </div>
                    </div>
                    <p className="text-sm mt-2">{record.notes}</p>
                    <div className="flex justify-between items-center mt-3">
                      <div>
                        {record.verified ? (
                          <Badge variant="outline" className="bg-green-100 text-green-800 hover:bg-green-100">
                            Blockchain Verified
                          </Badge>
                        ) : null}
                      </div>
                      <Button variant="outline" size="sm" onClick={() => setSelectedRecord(record)}>
                        View Details
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
