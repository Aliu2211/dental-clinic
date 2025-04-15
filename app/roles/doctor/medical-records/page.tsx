"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, FileText, Download, Upload, Lock, Shield } from "lucide-react"
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
import { useToast } from "@/components/ui/toast-notification"
import { PatientRecordNFT } from "@/components/blockchain/patient-record-nft"
import { verifyMedicalRecord } from "@/lib/blockchain-service"

// Mock medical records data
const medicalRecords = [
  {
    id: "MR001",
    patientName: "John Doe",
    patientId: "P001",
    recordType: "Dental X-Ray",
    date: "2023-10-15",
    status: "Verified",
    blockchainVerified: true,
  },
  {
    id: "MR002",
    patientName: "Jane Smith",
    patientId: "P002",
    recordType: "Treatment Plan",
    date: "2023-10-10",
    status: "Pending Review",
    blockchainVerified: false,
  },
  {
    id: "MR003",
    patientName: "Robert Johnson",
    patientId: "P003",
    recordType: "Procedure Notes",
    date: "2023-09-30",
    status: "Verified",
    blockchainVerified: true,
  },
  {
    id: "MR004",
    patientName: "Emily Davis",
    patientId: "P004",
    recordType: "Lab Results",
    date: "2023-09-25",
    status: "Pending Review",
    blockchainVerified: false,
  },
  {
    id: "MR005",
    patientName: "Michael Brown",
    patientId: "P005",
    recordType: "Prescription History",
    date: "2023-09-20",
    status: "Verified",
    blockchainVerified: true,
  },
]

// Mock patients for dropdown
const patients = [
  { id: "P001", name: "John Doe" },
  { id: "P002", name: "Jane Smith" },
  { id: "P003", name: "Robert Johnson" },
  { id: "P004", name: "Emily Davis" },
  { id: "P005", name: "Michael Brown" },
]

// Record types for dropdown
const recordTypes = [
  "Dental X-Ray",
  "Treatment Plan",
  "Procedure Notes",
  "Lab Results",
  "Prescription History",
  "Clinical Examination",
  "Dental Impressions",
  "Orthodontic Records",
]

export default function MedicalRecordsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [records, setRecords] = useState(medicalRecords)
  const [isNewRecordOpen, setIsNewRecordOpen] = useState(false)
  const [isUploadOpen, setIsUploadOpen] = useState(false)
  const [selectedRecord, setSelectedRecord] = useState<any>(null)
  const [isViewRecordOpen, setIsViewRecordOpen] = useState(false)
  const [isVerifying, setIsVerifying] = useState(false)
  const { showToast, ToastContainer } = useToast()

  // Form state for new record
  const [newRecord, setNewRecord] = useState({
    patientId: "",
    recordType: "",
    notes: "",
  })

  const filteredRecords = records.filter(
    (record) =>
      record.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.recordType.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.id.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const verifiedRecords = filteredRecords.filter((record) => record.status === "Verified")
  const pendingRecords = filteredRecords.filter((record) => record.status === "Pending Review")

  const handleCreateRecord = () => {
    if (!newRecord.patientId || !newRecord.recordType) {
      showToast({ message: "Please fill in all required fields", type: "error" })
      return
    }

    const patient = patients.find((p) => p.id === newRecord.patientId)

    const record = {
      id: `MR${records.length + 1}`.padStart(4, "0"),
      patientName: patient?.name || "",
      patientId: newRecord.patientId,
      recordType: newRecord.recordType,
      date: new Date().toISOString().split("T")[0],
      status: "Pending Review",
      blockchainVerified: false,
    }

    setRecords([record, ...records])
    setIsNewRecordOpen(false)
    setNewRecord({ patientId: "", recordType: "", notes: "" })
    showToast({ message: "Medical record created successfully", type: "success" })
  }

  const handleUploadRecord = () => {
    showToast({ message: "Record uploaded successfully", type: "success" })
    setIsUploadOpen(false)
  }

  const handleVerifyRecord = async (id: string) => {
    setIsVerifying(true)

    try {
      // Call our simplified blockchain service
      const result = await verifyMedicalRecord(id)

      if (result.success) {
        // Update the record in our local state
        setRecords(
          records.map((record) =>
            record.id === id ? { ...record, status: "Verified", blockchainVerified: true } : record,
          ),
        )

        showToast({
          message: "Record verified successfully with transaction hash: " + result.txHash.substring(0, 10) + "...",
          type: "success",
        })
      } else {
        showToast({ message: "Failed to verify record", type: "error" })
      }
    } catch (error) {
      console.error("Error verifying record:", error)
      showToast({ message: "An error occurred while verifying the record", type: "error" })
    } finally {
      setIsVerifying(false)
    }
  }

  const handleViewRecord = (record: any) => {
    setSelectedRecord(record)
    setIsViewRecordOpen(true)
  }

  const handleDownloadRecord = (id: string) => {
    showToast({ message: "Record downloaded successfully", type: "success" })
  }

  return (
    <div className="space-y-4">
      <ToastContainer />
      <h2 className="text-3xl font-bold tracking-tight">Medical Records</h2>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All Records ({filteredRecords.length})</TabsTrigger>
          <TabsTrigger value="verified">Verified ({verifiedRecords.length})</TabsTrigger>
          <TabsTrigger value="pending">Pending Review ({pendingRecords.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Medical Records</CardTitle>
                  <CardDescription>View and manage patient medical records</CardDescription>
                </div>
                <div className="flex gap-2">
                  <Dialog open={isUploadOpen} onOpenChange={setIsUploadOpen}>
                    <DialogTrigger asChild>
                      <Button variant="outline" className="flex items-center gap-2">
                        <Upload className="h-4 w-4" />
                        Upload
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[500px]">
                      <DialogHeader>
                        <DialogTitle>Upload Medical Record</DialogTitle>
                        <DialogDescription>Upload a medical record file for a patient.</DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="upload-patient" className="text-right">
                            Patient
                          </Label>
                          <Select>
                            <SelectTrigger className="col-span-3">
                              <SelectValue placeholder="Select patient" />
                            </SelectTrigger>
                            <SelectContent>
                              {patients.map((patient) => (
                                <SelectItem key={patient.id} value={patient.id}>
                                  {patient.name} ({patient.id})
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="upload-type" className="text-right">
                            Record Type
                          </Label>
                          <Select>
                            <SelectTrigger className="col-span-3">
                              <SelectValue placeholder="Select record type" />
                            </SelectTrigger>
                            <SelectContent>
                              {recordTypes.map((type) => (
                                <SelectItem key={type} value={type}>
                                  {type}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="upload-file" className="text-right">
                            File
                          </Label>
                          <div className="col-span-3">
                            <Input id="upload-file" type="file" />
                          </div>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="upload-notes" className="text-right">
                            Notes
                          </Label>
                          <Textarea id="upload-notes" className="col-span-3" placeholder="Additional notes" />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button variant="outline" onClick={() => setIsUploadOpen(false)}>
                          Cancel
                        </Button>
                        <Button onClick={handleUploadRecord}>Upload Record</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>

                  <Dialog open={isNewRecordOpen} onOpenChange={setIsNewRecordOpen}>
                    <DialogTrigger asChild>
                      <Button className="flex items-center gap-2">
                        <FileText className="h-4 w-4" />
                        New Record
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[500px]">
                      <DialogHeader>
                        <DialogTitle>Create New Medical Record</DialogTitle>
                        <DialogDescription>Create a new medical record for a patient.</DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="new-patient" className="text-right">
                            Patient
                          </Label>
                          <Select onValueChange={(value) => setNewRecord({ ...newRecord, patientId: value })}>
                            <SelectTrigger className="col-span-3">
                              <SelectValue placeholder="Select patient" />
                            </SelectTrigger>
                            <SelectContent>
                              {patients.map((patient) => (
                                <SelectItem key={patient.id} value={patient.id}>
                                  {patient.name} ({patient.id})
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="new-type" className="text-right">
                            Record Type
                          </Label>
                          <Select onValueChange={(value) => setNewRecord({ ...newRecord, recordType: value })}>
                            <SelectTrigger className="col-span-3">
                              <SelectValue placeholder="Select record type" />
                            </SelectTrigger>
                            <SelectContent>
                              {recordTypes.map((type) => (
                                <SelectItem key={type} value={type}>
                                  {type}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="new-notes" className="text-right">
                            Notes
                          </Label>
                          <Textarea
                            id="new-notes"
                            className="col-span-3"
                            placeholder="Additional notes"
                            value={newRecord.notes}
                            onChange={(e) => setNewRecord({ ...newRecord, notes: e.target.value })}
                          />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button variant="outline" onClick={() => setIsNewRecordOpen(false)}>
                          Cancel
                        </Button>
                        <Button onClick={handleCreateRecord}>Create Record</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
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
                    <TableHead>Patient</TableHead>
                    <TableHead>Record Type</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Blockchain</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredRecords.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-6 text-muted-foreground">
                        No records found. Try adjusting your search or create a new record.
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredRecords.map((record) => (
                      <TableRow key={record.id}>
                        <TableCell className="font-medium">{record.id}</TableCell>
                        <TableCell>{record.patientName}</TableCell>
                        <TableCell>{record.recordType}</TableCell>
                        <TableCell>{record.date}</TableCell>
                        <TableCell>
                          <Badge variant={record.status === "Verified" ? "default" : "secondary"}>
                            {record.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {record.blockchainVerified ? (
                            <div className="flex items-center text-green-600">
                              <Shield className="h-4 w-4 mr-1" />
                              <span className="text-xs">Verified</span>
                            </div>
                          ) : (
                            <div className="flex items-center text-amber-600">
                              <Lock className="h-4 w-4 mr-1" />
                              <span className="text-xs">Pending</span>
                            </div>
                          )}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button
                              variant="ghost"
                              size="icon"
                              title="View Record"
                              onClick={() => handleViewRecord(record)}
                            >
                              <FileText className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              title="Download Record"
                              onClick={() => handleDownloadRecord(record.id)}
                            >
                              <Download className="h-4 w-4" />
                            </Button>
                            {!record.blockchainVerified && (
                              <Button
                                variant="ghost"
                                size="icon"
                                title="Verify on Blockchain"
                                onClick={() => handleVerifyRecord(record.id)}
                                disabled={isVerifying}
                              >
                                <Shield className="h-4 w-4" />
                              </Button>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="verified" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Verified Records</CardTitle>
              <CardDescription>Records that have been verified on the blockchain</CardDescription>
            </CardHeader>
            <CardContent>
              {verifiedRecords.length === 0 ? (
                <div className="text-center py-6 text-muted-foreground">No verified records found.</div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Record ID</TableHead>
                      <TableHead>Patient</TableHead>
                      <TableHead>Record Type</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {verifiedRecords.map((record) => (
                      <TableRow key={record.id}>
                        <TableCell className="font-medium">{record.id}</TableCell>
                        <TableCell>{record.patientName}</TableCell>
                        <TableCell>{record.recordType}</TableCell>
                        <TableCell>{record.date}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button
                              variant="ghost"
                              size="icon"
                              title="View Record"
                              onClick={() => handleViewRecord(record)}
                            >
                              <FileText className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              title="Download Record"
                              onClick={() => handleDownloadRecord(record.id)}
                            >
                              <Download className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pending" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Pending Review</CardTitle>
              <CardDescription>Records that need your review and verification</CardDescription>
            </CardHeader>
            <CardContent>
              {pendingRecords.length === 0 ? (
                <div className="text-center py-6 text-muted-foreground">No pending records found.</div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Record ID</TableHead>
                      <TableHead>Patient</TableHead>
                      <TableHead>Record Type</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {pendingRecords.map((record) => (
                      <TableRow key={record.id}>
                        <TableCell className="font-medium">{record.id}</TableCell>
                        <TableCell>{record.patientName}</TableCell>
                        <TableCell>{record.recordType}</TableCell>
                        <TableCell>{record.date}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button
                              variant="ghost"
                              size="icon"
                              title="View Record"
                              onClick={() => handleViewRecord(record)}
                            >
                              <FileText className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              title="Verify on Blockchain"
                              onClick={() => handleVerifyRecord(record.id)}
                              disabled={isVerifying}
                            >
                              <Shield className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* View Record Dialog */}
      <Dialog open={isViewRecordOpen} onOpenChange={setIsViewRecordOpen}>
        <DialogContent className="sm:max-w-[700px]">
          <DialogHeader>
            <DialogTitle>Medical Record Details</DialogTitle>
            <DialogDescription>Record ID: {selectedRecord?.id}</DialogDescription>
          </DialogHeader>
          {selectedRecord && (
            <div className="grid gap-6 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="text-lg font-medium">Patient Information</h3>
                  <div className="mt-2 space-y-2">
                    <div>
                      <span className="text-sm font-medium text-muted-foreground">Name:</span>
                      <p>{selectedRecord.patientName}</p>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-muted-foreground">ID:</span>
                      <p>{selectedRecord.patientId}</p>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-medium">Record Information</h3>
                  <div className="mt-2 space-y-2">
                    <div>
                      <span className="text-sm font-medium text-muted-foreground">Type:</span>
                      <p>{selectedRecord.recordType}</p>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-muted-foreground">Date:</span>
                      <p>{selectedRecord.date}</p>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-muted-foreground">Status:</span>
                      <Badge variant={selectedRecord.status === "Verified" ? "default" : "secondary"}>
                        {selectedRecord.status}
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>

              {selectedRecord.blockchainVerified && (
                <div>
                  <h3 className="text-lg font-medium mb-2">Blockchain Verification</h3>
                  <PatientRecordNFT recordId={selectedRecord.id} />
                </div>
              )}

              <div>
                <h3 className="text-lg font-medium mb-2">Record Content</h3>
                <div className="border rounded-md p-4 bg-gray-50">
                  <p className="text-muted-foreground">
                    This is a placeholder for the actual record content. In a real application, this would display the
                    medical record data, images, or other relevant information.
                  </p>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            {selectedRecord && !selectedRecord.blockchainVerified && (
              <Button
                variant="outline"
                onClick={() => {
                  handleVerifyRecord(selectedRecord.id)
                  setIsViewRecordOpen(false)
                }}
                disabled={isVerifying}
              >
                <Shield className="h-4 w-4 mr-2" />
                Verify on Blockchain
              </Button>
            )}
            <Button variant="outline" onClick={() => handleDownloadRecord(selectedRecord?.id)}>
              <Download className="h-4 w-4 mr-2" />
              Download
            </Button>
            <Button onClick={() => setIsViewRecordOpen(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
