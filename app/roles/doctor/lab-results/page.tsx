"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, FileText, Download, ExternalLink, AlertTriangle, CheckCircle, Check, X } from "lucide-react"
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

// Mock lab results data
const labResultsData = [
  {
    id: "LAB001",
    patientName: "John Doe",
    patientId: "P001",
    testType: "Blood Work",
    date: "2023-10-15",
    status: "Completed",
    reviewed: true,
    abnormal: false,
  },
  {
    id: "LAB002",
    patientName: "Jane Smith",
    patientId: "P002",
    testType: "X-Ray",
    date: "2023-10-12",
    status: "Completed",
    reviewed: false,
    abnormal: true,
  },
  {
    id: "LAB003",
    patientName: "Robert Johnson",
    patientId: "P003",
    testType: "CT Scan",
    date: "2023-10-10",
    status: "Completed",
    reviewed: true,
    abnormal: false,
  },
  {
    id: "LAB004",
    patientName: "Emily Davis",
    patientId: "P004",
    testType: "MRI",
    date: "2023-10-08",
    status: "In Progress",
    reviewed: false,
    abnormal: false,
  },
  {
    id: "LAB005",
    patientName: "Michael Brown",
    patientId: "P005",
    testType: "Blood Work",
    date: "2023-10-05",
    status: "Completed",
    reviewed: true,
    abnormal: true,
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

// Test types for dropdown
const testTypes = [
  "Blood Work",
  "X-Ray",
  "CT Scan",
  "MRI",
  "Ultrasound",
  "Dental Panoramic X-ray",
  "Cone Beam CT",
  "Cephalometric X-ray",
  "Salivary Test",
]

// Lab facilities for dropdown
const labFacilities = [
  "Main Clinic Lab",
  "Dental Imaging Center",
  "City Medical Labs",
  "Advanced Diagnostics",
  "Regional Hospital Lab",
]

export default function LabResultsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [labResults, setLabResults] = useState(labResultsData)
  const [isOrderTestOpen, setIsOrderTestOpen] = useState(false)
  const [selectedResult, setSelectedResult] = useState<any>(null)
  const [isViewResultOpen, setIsViewResultOpen] = useState(false)
  const { showToast, ToastContainer } = useToast()

  // Form state for new test order
  const [newTestOrder, setNewTestOrder] = useState({
    patientId: "",
    testType: "",
    labFacility: "",
    urgency: "Normal",
    notes: "",
  })

  const filteredResults = labResults.filter(
    (result) =>
      result.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      result.testType.toLowerCase().includes(searchTerm.toLowerCase()) ||
      result.id.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const pendingReviewResults = filteredResults.filter((result) => result.status === "Completed" && !result.reviewed)

  const abnormalResults = filteredResults.filter((result) => result.abnormal)

  const handleOrderTest = () => {
    if (!newTestOrder.patientId || !newTestOrder.testType || !newTestOrder.labFacility) {
      showToast({ message: "Please fill in all required fields", type: "error" })
      return
    }

    const patient = patients.find((p) => p.id === newTestOrder.patientId)

    // In a real app, this would send the order to the lab system
    showToast({ message: "Test ordered successfully", type: "success" })
    setIsOrderTestOpen(false)
    setNewTestOrder({
      patientId: "",
      testType: "",
      labFacility: "",
      urgency: "Normal",
      notes: "",
    })
  }

  const handleViewResult = (result: any) => {
    setSelectedResult(result)
    setIsViewResultOpen(true)
  }

  const handleDownloadResult = (id: string) => {
    showToast({ message: "Result downloaded successfully", type: "success" })
  }

  const handleMarkAsReviewed = (id: string) => {
    setLabResults(labResults.map((result) => (result.id === id ? { ...result, reviewed: true } : result)))

    if (selectedResult && selectedResult.id === id) {
      setSelectedResult({ ...selectedResult, reviewed: true })
    }

    showToast({ message: "Result marked as reviewed", type: "success" })
  }

  return (
    <div className="space-y-4">
      <ToastContainer />
      <h2 className="text-3xl font-bold tracking-tight">Lab Results</h2>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All Results ({filteredResults.length})</TabsTrigger>
          <TabsTrigger value="pending">Pending Review ({pendingReviewResults.length})</TabsTrigger>
          <TabsTrigger value="abnormal">Abnormal Results ({abnormalResults.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Lab Results</CardTitle>
                  <CardDescription>View and manage patient lab results</CardDescription>
                </div>
                <Dialog open={isOrderTestOpen} onOpenChange={setIsOrderTestOpen}>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="flex items-center gap-2">
                      <ExternalLink className="h-4 w-4" />
                      Order New Test
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[500px]">
                    <DialogHeader>
                      <DialogTitle>Order New Lab Test</DialogTitle>
                      <DialogDescription>Order a new lab test for a patient.</DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="order-patient" className="text-right">
                          Patient
                        </Label>
                        <Select onValueChange={(value) => setNewTestOrder({ ...newTestOrder, patientId: value })}>
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
                        <Label htmlFor="order-test-type" className="text-right">
                          Test Type
                        </Label>
                        <Select onValueChange={(value) => setNewTestOrder({ ...newTestOrder, testType: value })}>
                          <SelectTrigger className="col-span-3">
                            <SelectValue placeholder="Select test type" />
                          </SelectTrigger>
                          <SelectContent>
                            {testTypes.map((type) => (
                              <SelectItem key={type} value={type}>
                                {type}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="order-lab" className="text-right">
                          Lab Facility
                        </Label>
                        <Select onValueChange={(value) => setNewTestOrder({ ...newTestOrder, labFacility: value })}>
                          <SelectTrigger className="col-span-3">
                            <SelectValue placeholder="Select lab facility" />
                          </SelectTrigger>
                          <SelectContent>
                            {labFacilities.map((lab) => (
                              <SelectItem key={lab} value={lab}>
                                {lab}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="order-urgency" className="text-right">
                          Urgency
                        </Label>
                        <Select
                          value={newTestOrder.urgency}
                          onValueChange={(value) => setNewTestOrder({ ...newTestOrder, urgency: value })}
                        >
                          <SelectTrigger className="col-span-3">
                            <SelectValue placeholder="Select urgency" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Urgent">Urgent</SelectItem>
                            <SelectItem value="High">High</SelectItem>
                            <SelectItem value="Normal">Normal</SelectItem>
                            <SelectItem value="Low">Low</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="order-notes" className="text-right">
                          Notes
                        </Label>
                        <Textarea
                          id="order-notes"
                          className="col-span-3"
                          placeholder="Additional instructions for the lab"
                          value={newTestOrder.notes}
                          onChange={(e) => setNewTestOrder({ ...newTestOrder, notes: e.target.value })}
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setIsOrderTestOpen(false)}>
                        Cancel
                      </Button>
                      <Button onClick={handleOrderTest}>Order Test</Button>
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
                    placeholder="Search results..."
                    className="pl-8"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Lab ID</TableHead>
                    <TableHead>Patient</TableHead>
                    <TableHead>Test Type</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Flags</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredResults.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-6 text-muted-foreground">
                        No lab results found. Try adjusting your search or order a new test.
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredResults.map((result) => (
                      <TableRow key={result.id}>
                        <TableCell className="font-medium">{result.id}</TableCell>
                        <TableCell>{result.patientName}</TableCell>
                        <TableCell>{result.testType}</TableCell>
                        <TableCell>{result.date}</TableCell>
                        <TableCell>
                          <Badge variant={result.status === "Completed" ? "default" : "secondary"}>
                            {result.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {result.abnormal && (
                            <div className="flex items-center text-amber-600">
                              <AlertTriangle className="h-4 w-4 mr-1" />
                              <span className="text-xs">Abnormal</span>
                            </div>
                          )}
                          {!result.reviewed && result.status === "Completed" && (
                            <div className="flex items-center text-blue-600">
                              <span className="text-xs">Needs Review</span>
                            </div>
                          )}
                          {result.reviewed && !result.abnormal && (
                            <div className="flex items-center text-green-600">
                              <CheckCircle className="h-4 w-4 mr-1" />
                              <span className="text-xs">Normal</span>
                            </div>
                          )}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button
                              variant="ghost"
                              size="icon"
                              title="View Results"
                              onClick={() => handleViewResult(result)}
                            >
                              <FileText className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              title="Download Results"
                              onClick={() => handleDownloadResult(result.id)}
                            >
                              <Download className="h-4 w-4" />
                            </Button>
                            {!result.reviewed && result.status === "Completed" && (
                              <Button
                                variant="ghost"
                                size="icon"
                                title="Mark as Reviewed"
                                onClick={() => handleMarkAsReviewed(result.id)}
                              >
                                <Check className="h-4 w-4" />
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

        <TabsContent value="pending" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Pending Review</CardTitle>
              <CardDescription>Results that need your review</CardDescription>
            </CardHeader>
            <CardContent>
              {pendingReviewResults.length === 0 ? (
                <div className="text-center py-6 text-muted-foreground">No results pending review.</div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Lab ID</TableHead>
                      <TableHead>Patient</TableHead>
                      <TableHead>Test Type</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Flags</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {pendingReviewResults.map((result) => (
                      <TableRow key={result.id}>
                        <TableCell className="font-medium">{result.id}</TableCell>
                        <TableCell>{result.patientName}</TableCell>
                        <TableCell>{result.testType}</TableCell>
                        <TableCell>{result.date}</TableCell>
                        <TableCell>
                          {result.abnormal && (
                            <div className="flex items-center text-amber-600">
                              <AlertTriangle className="h-4 w-4 mr-1" />
                              <span className="text-xs">Abnormal</span>
                            </div>
                          )}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button
                              variant="ghost"
                              size="icon"
                              title="View Results"
                              onClick={() => handleViewResult(result)}
                            >
                              <FileText className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              title="Mark as Reviewed"
                              onClick={() => handleMarkAsReviewed(result.id)}
                            >
                              <Check className="h-4 w-4" />
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

        <TabsContent value="abnormal" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Abnormal Results</CardTitle>
              <CardDescription>Results with abnormal findings</CardDescription>
            </CardHeader>
            <CardContent>
              {abnormalResults.length === 0 ? (
                <div className="text-center py-6 text-muted-foreground">No abnormal results found.</div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Lab ID</TableHead>
                      <TableHead>Patient</TableHead>
                      <TableHead>Test Type</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Reviewed</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {abnormalResults.map((result) => (
                      <TableRow key={result.id}>
                        <TableCell className="font-medium">{result.id}</TableCell>
                        <TableCell>{result.patientName}</TableCell>
                        <TableCell>{result.testType}</TableCell>
                        <TableCell>{result.date}</TableCell>
                        <TableCell>
                          {result.reviewed ? (
                            <div className="flex items-center text-green-600">
                              <CheckCircle className="h-4 w-4 mr-1" />
                              <span className="text-xs">Yes</span>
                            </div>
                          ) : (
                            <div className="flex items-center text-amber-600">
                              <X className="h-4 w-4 mr-1" />
                              <span className="text-xs">No</span>
                            </div>
                          )}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button
                              variant="ghost"
                              size="icon"
                              title="View Results"
                              onClick={() => handleViewResult(result)}
                            >
                              <FileText className="h-4 w-4" />
                            </Button>
                            {!result.reviewed && (
                              <Button
                                variant="ghost"
                                size="icon"
                                title="Mark as Reviewed"
                                onClick={() => handleMarkAsReviewed(result.id)}
                              >
                                <Check className="h-4 w-4" />
                              </Button>
                            )}
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

      {/* View Result Dialog */}
      <Dialog open={isViewResultOpen} onOpenChange={setIsViewResultOpen}>
        <DialogContent className="sm:max-w-[700px]">
          <DialogHeader>
            <DialogTitle>Lab Result Details</DialogTitle>
            <DialogDescription>Result ID: {selectedResult?.id}</DialogDescription>
          </DialogHeader>
          {selectedResult && (
            <div className="grid gap-6 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="text-lg font-medium">Patient Information</h3>
                  <div className="mt-2 space-y-2">
                    <div>
                      <span className="text-sm font-medium text-muted-foreground">Name:</span>
                      <p>{selectedResult.patientName}</p>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-muted-foreground">ID:</span>
                      <p>{selectedResult.patientId}</p>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-medium">Test Information</h3>
                  <div className="mt-2 space-y-2">
                    <div>
                      <span className="text-sm font-medium text-muted-foreground">Type:</span>
                      <p>{selectedResult.testType}</p>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-muted-foreground">Date:</span>
                      <p>{selectedResult.date}</p>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-muted-foreground">Status:</span>
                      <Badge variant={selectedResult.status === "Completed" ? "default" : "secondary"}>
                        {selectedResult.status}
                      </Badge>
                    </div>
                    {selectedResult.abnormal && (
                      <div>
                        <span className="text-sm font-medium text-muted-foreground">Flags:</span>
                        <div className="flex items-center text-amber-600">
                          <AlertTriangle className="h-4 w-4 mr-1" />
                          <span>Abnormal Results</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">Result Details</h3>
                <div className="border rounded-md p-4 bg-gray-50">
                  <p className="text-muted-foreground">
                    This is a placeholder for the actual lab result content. In a real application, this would display
                    detailed test results, measurements, reference ranges, and interpretations.
                  </p>
                  {selectedResult.abnormal && (
                    <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-md">
                      <h4 className="text-amber-800 font-medium flex items-center">
                        <AlertTriangle className="h-4 w-4 mr-2" />
                        Abnormal Findings
                      </h4>
                      <p className="mt-1 text-amber-700 text-sm">
                        Some values are outside the normal reference range. Please review the highlighted sections
                        above.
                      </p>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">Interpretation</h3>
                <div className="border rounded-md p-4 bg-gray-50">
                  <p className="text-muted-foreground">
                    This is a placeholder for the lab technician's interpretation. In a real application, this would
                    include professional analysis and recommendations based on the test results.
                  </p>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            {selectedResult && !selectedResult.reviewed && selectedResult.status === "Completed" && (
              <Button
                variant="outline"
                onClick={() => {
                  handleMarkAsReviewed(selectedResult.id)
                  setIsViewResultOpen(false)
                }}
              >
                <Check className="h-4 w-4 mr-2" />
                Mark as Reviewed
              </Button>
            )}
            <Button variant="outline" onClick={() => handleDownloadResult(selectedResult?.id)}>
              <Download className="h-4 w-4 mr-2" />
              Download
            </Button>
            <Button onClick={() => setIsViewResultOpen(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
