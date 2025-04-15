"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Plus, FileText, Check, X, Filter, Download, Printer } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
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
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/toast-notification"

// Mock prescription data
const prescriptionsData = [
  {
    id: "RX001",
    patientName: "John Doe",
    patientId: "P001",
    medication: "Amoxicillin 500mg",
    dosage: "1 tablet 3 times daily",
    date: "2023-10-15",
    status: "Active",
    duration: "7 days",
    notes: "Take with food. Complete the full course.",
    doctor: "Dr. Sarah Johnson",
  },
  {
    id: "RX002",
    patientName: "Jane Smith",
    patientId: "P002",
    medication: "Ibuprofen 400mg",
    dosage: "1 tablet every 6 hours as needed",
    date: "2023-10-10",
    status: "Active",
    duration: "5 days",
    notes: "Take for pain relief. Do not exceed 4 tablets in 24 hours.",
    doctor: "Dr. Sarah Johnson",
  },
  {
    id: "RX003",
    patientName: "Robert Johnson",
    patientId: "P003",
    medication: "Metronidazole 250mg",
    dosage: "1 tablet 3 times daily",
    date: "2023-09-30",
    status: "Completed",
    duration: "10 days",
    notes: "Complete the full course even if feeling better.",
    doctor: "Dr. Sarah Johnson",
  },
  {
    id: "RX004",
    patientName: "Emily Davis",
    patientId: "P004",
    medication: "Acetaminophen 500mg",
    dosage: "1-2 tablets every 6 hours as needed",
    date: "2023-09-25",
    status: "Active",
    duration: "3 days",
    notes: "For fever and pain relief.",
    doctor: "Dr. Sarah Johnson",
  },
  {
    id: "RX005",
    patientName: "Michael Brown",
    patientId: "P005",
    medication: "Clindamycin 300mg",
    dosage: "1 capsule 4 times daily",
    date: "2023-09-20",
    status: "Completed",
    duration: "7 days",
    notes: "Take with a full glass of water.",
    doctor: "Dr. Sarah Johnson",
  },
  {
    id: "RX006",
    patientName: "Sarah Wilson",
    patientId: "P006",
    medication: "Azithromycin 250mg",
    dosage: "2 tablets on first day, then 1 tablet daily",
    date: "2023-09-18",
    status: "Completed",
    duration: "5 days",
    notes: "Take on an empty stomach.",
    doctor: "Dr. Sarah Johnson",
  },
  {
    id: "RX007",
    patientName: "David Lee",
    patientId: "P007",
    medication: "Chlorhexidine 0.12% Mouthwash",
    dosage: "Rinse with 15ml for 30 seconds twice daily",
    date: "2023-09-15",
    status: "Active",
    duration: "14 days",
    notes: "Do not eat or drink for 30 minutes after use.",
    doctor: "Dr. Sarah Johnson",
  },
]

// Mock patients for dropdown
const patients = [
  { id: "P001", name: "John Doe" },
  { id: "P002", name: "Jane Smith" },
  { id: "P003", name: "Robert Johnson" },
  { id: "P004", name: "Emily Davis" },
  { id: "P005", name: "Michael Brown" },
  { id: "P006", name: "Sarah Wilson" },
  { id: "P007", name: "David Lee" },
]

// Medications for dropdown
const medications = [
  "Amoxicillin 500mg",
  "Ibuprofen 400mg",
  "Metronidazole 250mg",
  "Acetaminophen 500mg",
  "Clindamycin 300mg",
  "Azithromycin 250mg",
  "Chlorhexidine 0.12% Mouthwash",
  "Lidocaine 2% Gel",
  "Penicillin V 500mg",
  "Doxycycline 100mg",
]

export default function PrescriptionsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [prescriptions, setPrescriptions] = useState(prescriptionsData)
  const [selectedPrescription, setSelectedPrescription] = useState<any>(null)
  const [isNewPrescriptionOpen, setIsNewPrescriptionOpen] = useState(false)
  const [isViewPrescriptionOpen, setIsViewPrescriptionOpen] = useState(false)
  const { showToast, ToastContainer } = useToast()

  // Form state for new prescription
  const [newPrescription, setNewPrescription] = useState({
    patientId: "",
    medication: "",
    dosage: "",
    duration: "",
    notes: "",
  })

  const filteredPrescriptions = prescriptions.filter(
    (prescription) =>
      prescription.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      prescription.medication.toLowerCase().includes(searchTerm.toLowerCase()) ||
      prescription.id.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const activePrescriptions = filteredPrescriptions.filter((prescription) => prescription.status === "Active")

  const completedPrescriptions = filteredPrescriptions.filter((prescription) => prescription.status === "Completed")

  const handleCreatePrescription = () => {
    if (
      !newPrescription.patientId ||
      !newPrescription.medication ||
      !newPrescription.dosage ||
      !newPrescription.duration
    ) {
      showToast({ message: "Please fill in all required fields", type: "error" })
      return
    }

    const patient = patients.find((p) => p.id === newPrescription.patientId)

    const prescription = {
      id: `RX${prescriptions.length + 1}`.padStart(4, "0"),
      patientName: patient?.name || "",
      patientId: newPrescription.patientId,
      medication: newPrescription.medication,
      dosage: newPrescription.dosage,
      date: new Date().toISOString().split("T")[0],
      status: "Active",
      duration: newPrescription.duration,
      notes: newPrescription.notes,
      doctor: "Dr. Sarah Johnson",
    }

    setPrescriptions([prescription, ...prescriptions])
    setIsNewPrescriptionOpen(false)
    setNewPrescription({
      patientId: "",
      medication: "",
      dosage: "",
      duration: "",
      notes: "",
    })
    showToast({ message: "Prescription created successfully", type: "success" })
  }

  const handleViewPrescription = (prescription: any) => {
    setSelectedPrescription(prescription)
    setIsViewPrescriptionOpen(true)
  }

  const handleMarkAsComplete = (id: string) => {
    setPrescriptions(
      prescriptions.map((prescription) =>
        prescription.id === id ? { ...prescription, status: "Completed" } : prescription,
      ),
    )

    if (selectedPrescription && selectedPrescription.id === id) {
      setSelectedPrescription({ ...selectedPrescription, status: "Completed" })
    }

    showToast({ message: "Prescription marked as completed", type: "success" })
  }

  const handleCancelPrescription = (id: string) => {
    setPrescriptions(
      prescriptions.map((prescription) =>
        prescription.id === id ? { ...prescription, status: "Cancelled" } : prescription,
      ),
    )

    if (selectedPrescription && selectedPrescription.id === id) {
      setSelectedPrescription({ ...selectedPrescription, status: "Cancelled" })
    }

    showToast({ message: "Prescription cancelled", type: "success" })
  }

  const handlePrintPrescription = (id: string) => {
    showToast({ message: "Prescription sent to printer", type: "success" })
  }

  const handleExportPrescriptions = () => {
    showToast({ message: "Prescriptions exported successfully", type: "success" })
  }

  return (
    <div className="space-y-6">
      <ToastContainer />
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Prescription Management</h2>
          <p className="text-muted-foreground">View, create and manage patient prescriptions</p>
        </div>
        <div className="flex items-center gap-2">
          <Dialog open={isNewPrescriptionOpen} onOpenChange={setIsNewPrescriptionOpen}>
            <DialogTrigger asChild>
              <Button className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                New Prescription
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Create New Prescription</DialogTitle>
                <DialogDescription>Fill in the details to create a new prescription for a patient.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="patient" className="text-right">
                    Patient
                  </Label>
                  <Select onValueChange={(value) => setNewPrescription({ ...newPrescription, patientId: value })}>
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
                  <Label htmlFor="medication" className="text-right">
                    Medication
                  </Label>
                  <Select onValueChange={(value) => setNewPrescription({ ...newPrescription, medication: value })}>
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select medication" />
                    </SelectTrigger>
                    <SelectContent>
                      {medications.map((medication) => (
                        <SelectItem key={medication} value={medication}>
                          {medication}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="dosage" className="text-right">
                    Dosage
                  </Label>
                  <Input
                    id="dosage"
                    className="col-span-3"
                    placeholder="e.g., 1 tablet 3 times daily"
                    value={newPrescription.dosage}
                    onChange={(e) => setNewPrescription({ ...newPrescription, dosage: e.target.value })}
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="duration" className="text-right">
                    Duration
                  </Label>
                  <Input
                    id="duration"
                    className="col-span-3"
                    placeholder="e.g., 7 days"
                    value={newPrescription.duration}
                    onChange={(e) => setNewPrescription({ ...newPrescription, duration: e.target.value })}
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="notes" className="text-right">
                    Notes
                  </Label>
                  <Textarea
                    id="notes"
                    className="col-span-3"
                    placeholder="Additional instructions or notes"
                    value={newPrescription.notes}
                    onChange={(e) => setNewPrescription({ ...newPrescription, notes: e.target.value })}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsNewPrescriptionOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleCreatePrescription}>Create Prescription</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search prescriptions..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="h-9">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
          <Button variant="outline" size="sm" className="h-9" onClick={handleExportPrescriptions}>
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="h-9"
            onClick={() => showToast({ message: "Print dialog opened", type: "info" })}
          >
            <Printer className="mr-2 h-4 w-4" />
            Print
          </Button>
        </div>
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All Prescriptions ({filteredPrescriptions.length})</TabsTrigger>
          <TabsTrigger value="active">Active ({activePrescriptions.length})</TabsTrigger>
          <TabsTrigger value="completed">Completed ({completedPrescriptions.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Rx ID</TableHead>
                    <TableHead>Patient</TableHead>
                    <TableHead>Medication</TableHead>
                    <TableHead>Dosage</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPrescriptions.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-6 text-muted-foreground">
                        No prescriptions found. Try adjusting your search.
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredPrescriptions.map((prescription) => (
                      <TableRow key={prescription.id}>
                        <TableCell className="font-medium">{prescription.id}</TableCell>
                        <TableCell>{prescription.patientName}</TableCell>
                        <TableCell>{prescription.medication}</TableCell>
                        <TableCell>{prescription.dosage}</TableCell>
                        <TableCell>{prescription.date}</TableCell>
                        <TableCell>
                          <Badge
                            variant={prescription.status === "Active" ? "default" : "secondary"}
                            className={prescription.status === "Active" ? "bg-green-500" : ""}
                          >
                            {prescription.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button
                              variant="ghost"
                              size="icon"
                              title="View Details"
                              onClick={() => handleViewPrescription(prescription)}
                            >
                              <FileText className="h-4 w-4" />
                            </Button>
                            {prescription.status === "Active" && (
                              <>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  title="Mark as Complete"
                                  onClick={() => handleMarkAsComplete(prescription.id)}
                                >
                                  <Check className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  title="Cancel Prescription"
                                  onClick={() => handleCancelPrescription(prescription.id)}
                                >
                                  <X className="h-4 w-4" />
                                </Button>
                              </>
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

        <TabsContent value="active" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Active Prescriptions</CardTitle>
              <CardDescription>Currently active patient prescriptions</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Rx ID</TableHead>
                    <TableHead>Patient</TableHead>
                    <TableHead>Medication</TableHead>
                    <TableHead>Dosage</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {activePrescriptions.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-6 text-muted-foreground">
                        No active prescriptions found.
                      </TableCell>
                    </TableRow>
                  ) : (
                    activePrescriptions.map((prescription) => (
                      <TableRow key={prescription.id}>
                        <TableCell className="font-medium">{prescription.id}</TableCell>
                        <TableCell>{prescription.patientName}</TableCell>
                        <TableCell>{prescription.medication}</TableCell>
                        <TableCell>{prescription.dosage}</TableCell>
                        <TableCell>{prescription.date}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button
                              variant="ghost"
                              size="icon"
                              title="View Details"
                              onClick={() => handleViewPrescription(prescription)}
                            >
                              <FileText className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              title="Mark as Complete"
                              onClick={() => handleMarkAsComplete(prescription.id)}
                            >
                              <Check className="h-4 w-4" />
                            </Button>
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

        <TabsContent value="completed" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Completed Prescriptions</CardTitle>
              <CardDescription>Prescriptions that have been completed</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Rx ID</TableHead>
                    <TableHead>Patient</TableHead>
                    <TableHead>Medication</TableHead>
                    <TableHead>Dosage</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {completedPrescriptions.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-6 text-muted-foreground">
                        No completed prescriptions found.
                      </TableCell>
                    </TableRow>
                  ) : (
                    completedPrescriptions.map((prescription) => (
                      <TableRow key={prescription.id}>
                        <TableCell className="font-medium">{prescription.id}</TableCell>
                        <TableCell>{prescription.patientName}</TableCell>
                        <TableCell>{prescription.medication}</TableCell>
                        <TableCell>{prescription.dosage}</TableCell>
                        <TableCell>{prescription.date}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button
                              variant="ghost"
                              size="icon"
                              title="View Details"
                              onClick={() => handleViewPrescription(prescription)}
                            >
                              <FileText className="h-4 w-4" />
                            </Button>
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
      </Tabs>

      {/* View Prescription Dialog */}
      <Dialog open={isViewPrescriptionOpen} onOpenChange={setIsViewPrescriptionOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Prescription Details</DialogTitle>
            <DialogDescription>Prescription ID: {selectedPrescription?.id}</DialogDescription>
          </DialogHeader>
          {selectedPrescription && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">Patient</h4>
                  <p>
                    {selectedPrescription.patientName} ({selectedPrescription.patientId})
                  </p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">Date</h4>
                  <p>{selectedPrescription.date}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">Medication</h4>
                  <p>{selectedPrescription.medication}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">Dosage</h4>
                  <p>{selectedPrescription.dosage}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">Duration</h4>
                  <p>{selectedPrescription.duration}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">Status</h4>
                  <Badge
                    variant={selectedPrescription.status === "Active" ? "default" : "secondary"}
                    className={selectedPrescription.status === "Active" ? "bg-green-500" : ""}
                  >
                    {selectedPrescription.status}
                  </Badge>
                </div>
                <div className="col-span-2">
                  <h4 className="text-sm font-medium text-muted-foreground">Notes</h4>
                  <p>{selectedPrescription.notes}</p>
                </div>
                <div className="col-span-2">
                  <h4 className="text-sm font-medium text-muted-foreground">Prescribed By</h4>
                  <p>{selectedPrescription.doctor}</p>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => handlePrintPrescription(selectedPrescription?.id)}>
              <Printer className="h-4 w-4 mr-2" />
              Print
            </Button>
            {selectedPrescription && selectedPrescription.status === "Active" && (
              <>
                <Button
                  variant="outline"
                  onClick={() => {
                    handleMarkAsComplete(selectedPrescription.id)
                    setIsViewPrescriptionOpen(false)
                  }}
                >
                  <Check className="h-4 w-4 mr-2" />
                  Mark as Complete
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    handleCancelPrescription(selectedPrescription.id)
                    setIsViewPrescriptionOpen(false)
                  }}
                >
                  <X className="h-4 w-4 mr-2" />
                  Cancel
                </Button>
              </>
            )}
            <Button onClick={() => setIsViewPrescriptionOpen(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
