"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { mockUsers, UserRole } from "@/lib/auth"
import {
  Search,
  UserPlus,
  Edit,
  Trash,
  Filter,
  Download,
  MoreHorizontal,
  Shield,
  UserCog,
  Mail,
  AlertCircle,
  Calendar,
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

// Extended mock users with more details for patients
const patientUsers = mockUsers
  .filter((user) => user.role === UserRole.PATIENT)
  .map((user) => ({
    ...user,
    status: Math.random() > 0.2 ? "Active" : "Inactive",
    lastVisit: new Date(Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000).toISOString(),
    registeredDate: new Date(Date.now() - Math.floor(Math.random() * 365) * 24 * 60 * 60 * 1000).toISOString(),
    contactNumber: "+233 " + Math.floor(Math.random() * 900000000 + 100000000),
    address: "123 Main St, Accra, Ghana",
    dateOfBirth: new Date(Date.now() - (20 + Math.floor(Math.random() * 50)) * 365 * 24 * 60 * 60 * 1000).toISOString(),
    gender: Math.random() > 0.5 ? "Male" : "Female",
    insuranceProvider: ["National Health Insurance", "MetLife Dental", "None"][Math.floor(Math.random() * 3)],
    insuranceNumber:
      Math.random() > 0.7
        ? "INS" +
          Math.floor(Math.random() * 1000000)
            .toString()
            .padStart(6, "0")
        : "",
    medicalHistory: ["Hypertension", "Diabetes", "Allergies", "None"][Math.floor(Math.random() * 4)],
    assignedDoctor: mockUsers.filter((u) => u.role === UserRole.DOCTOR)[
      Math.floor(Math.random() * mockUsers.filter((u) => u.role === UserRole.DOCTOR).length)
    ].name,
    assignedNurse:
      Math.random() > 0.5
        ? mockUsers.filter((u) => u.role === UserRole.NURSE)[
            Math.floor(Math.random() * mockUsers.filter((u) => u.role === UserRole.NURSE).length)
          ].name
        : null,
  }))

// Add more mock patients
for (let i = 0; i < 15; i++) {
  const gender = Math.random() > 0.5 ? "Male" : "Female"
  const firstName =
    gender === "Male"
      ? ["John", "Michael", "David", "Robert", "James", "William", "Richard", "Joseph", "Thomas", "Charles"][
          Math.floor(Math.random() * 10)
        ]
      : ["Mary", "Patricia", "Jennifer", "Linda", "Elizabeth", "Barbara", "Susan", "Jessica", "Sarah", "Karen"][
          Math.floor(Math.random() * 10)
        ]
  const lastName = [
    "Smith",
    "Johnson",
    "Williams",
    "Brown",
    "Jones",
    "Miller",
    "Davis",
    "Garcia",
    "Rodriguez",
    "Wilson",
  ][Math.floor(Math.random() * 10)]

  patientUsers.push({
    id: `p${i + 10}`,
    name: `${firstName} ${lastName}`,
    email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@example.com`,
    role: UserRole.PATIENT,
    profileImage: "/placeholder.svg?height=32&width=32",
    status: Math.random() > 0.2 ? "Active" : "Inactive",
    lastVisit: new Date(Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000).toISOString(),
    registeredDate: new Date(Date.now() - Math.floor(Math.random() * 365) * 24 * 60 * 60 * 1000).toISOString(),
    contactNumber: "+233 " + Math.floor(Math.random() * 900000000 + 100000000),
    address: "123 Main St, Accra, Ghana",
    dateOfBirth: new Date(Date.now() - (20 + Math.floor(Math.random() * 50)) * 365 * 24 * 60 * 60 * 1000).toISOString(),
    gender,
    insuranceProvider: ["National Health Insurance", "MetLife Dental", "None"][Math.floor(Math.random() * 3)],
    insuranceNumber:
      Math.random() > 0.7
        ? "INS" +
          Math.floor(Math.random() * 1000000)
            .toString()
            .padStart(6, "0")
        : "",
    medicalHistory: ["Hypertension", "Diabetes", "Allergies", "None"][Math.floor(Math.random() * 4)],
    assignedDoctor: mockUsers.filter((u) => u.role === UserRole.DOCTOR)[
      Math.floor(Math.random() * mockUsers.filter((u) => u.role === UserRole.DOCTOR).length)
    ].name,
    assignedNurse:
      Math.random() > 0.5
        ? mockUsers.filter((u) => u.role === UserRole.NURSE)[
            Math.floor(Math.random() * mockUsers.filter((u) => u.role === UserRole.NURSE).length)
          ].name
        : null,
  })
}

export default function PatientsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null)
  const [isAddPatientDialogOpen, setIsAddPatientDialogOpen] = useState(false)
  const [isEditPatientDialogOpen, setIsEditPatientDialogOpen] = useState(false)
  const [selectedPatient, setSelectedPatient] = useState<any>(null)
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false)
  const [patientToDelete, setPatientToDelete] = useState<any>(null)
  const [isScheduleAppointmentOpen, setIsScheduleAppointmentOpen] = useState(false)

  // Filter patients based on search term and status
  const filteredPatients = patientUsers.filter((patient) => {
    const matchesSearch =
      patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.contactNumber.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = selectedStatus ? patient.status === selectedStatus : true

    return matchesSearch && matchesStatus
  })

  const handleEditPatient = (patient: any) => {
    setSelectedPatient(patient)
    setIsEditPatientDialogOpen(true)
  }

  const handleDeletePatient = (patient: any) => {
    setPatientToDelete(patient)
    setIsDeleteConfirmOpen(true)
  }

  const confirmDeletePatient = () => {
    // In a real app, this would call an API to delete the patient
    console.log(`Deleting patient: ${patientToDelete.id}`)
    setIsDeleteConfirmOpen(false)
    setPatientToDelete(null)
  }

  const handleAddPatient = () => {
    // In a real app, this would call an API to add the patient
    console.log("Adding new patient")
    setIsAddPatientDialogOpen(false)
  }

  const handleUpdatePatient = () => {
    // In a real app, this would call an API to update the patient
    console.log(`Updating patient: ${selectedPatient.id}`)
    setIsEditPatientDialogOpen(false)
  }

  const handleScheduleAppointment = (patient: any) => {
    setSelectedPatient(patient)
    setIsScheduleAppointmentOpen(true)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Patient Management</h2>
        <Button onClick={() => setIsAddPatientDialogOpen(true)} className="flex items-center gap-2">
          <UserPlus className="h-4 w-4" />
          Register New Patient
        </Button>
      </div>

      <Alert>
        <Shield className="h-4 w-4" />
        <AlertTitle>Patient Registration</AlertTitle>
        <AlertDescription>
          As an administrator, you can register new patients and assign them to doctors and nurses. Patients cannot
          register themselves.
        </AlertDescription>
      </Alert>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All Patients</TabsTrigger>
          <TabsTrigger value="recent">Recent Visits</TabsTrigger>
          <TabsTrigger value="new">New Patients</TabsTrigger>
          <TabsTrigger value="inactive">Inactive</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Patient Directory</CardTitle>
              <CardDescription>Manage patient accounts and records</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-4 flex flex-col space-y-3 md:flex-row md:items-center md:justify-between md:space-y-0">
                <div className="flex w-full flex-1 items-center space-x-2">
                  <div className="relative flex-1">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search patients..."
                      className="pl-8"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="sm" className="h-9">
                        <Filter className="mr-2 h-4 w-4" />
                        Filter
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-[200px]">
                      <DropdownMenuLabel>Filter by Status</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={() => setSelectedStatus(null)}>All Statuses</DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setSelectedStatus("Active")}>Active</DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setSelectedStatus("Inactive")}>Inactive</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                  <Button variant="outline" size="sm" className="h-9">
                    <Download className="mr-2 h-4 w-4" />
                    Export
                  </Button>
                </div>
              </div>

              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Contact</TableHead>
                      <TableHead>Last Visit</TableHead>
                      <TableHead>Assigned Staff</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredPatients.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={6} className="h-24 text-center">
                          No patients found.
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredPatients.map((patient) => (
                        <TableRow key={patient.id}>
                          <TableCell className="font-medium">
                            <div className="flex items-center">
                              <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center mr-2">
                                {patient.name.charAt(0)}
                              </div>
                              {patient.name}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex flex-col">
                              <span className="text-xs text-muted-foreground">{patient.email}</span>
                              <span>{patient.contactNumber}</span>
                            </div>
                          </TableCell>
                          <TableCell>{new Date(patient.lastVisit).toLocaleDateString()}</TableCell>
                          <TableCell>
                            <div className="flex flex-col">
                              <span className="text-xs font-medium">Dr: {patient.assignedDoctor}</span>
                              {patient.assignedNurse && (
                                <span className="text-xs text-muted-foreground">Nurse: {patient.assignedNurse}</span>
                              )}
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant={patient.status === "Active" ? "success" : "secondary"}>
                              {patient.status}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button variant="ghost" size="icon" onClick={() => handleEditPatient(patient)}>
                                <Edit className="h-4 w-4" />
                              </Button>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="icon">
                                    <MoreHorizontal className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                  <DropdownMenuItem>
                                    <UserCog className="mr-2 h-4 w-4" />
                                    <span>View Medical Records</span>
                                  </DropdownMenuItem>
                                  <DropdownMenuItem onClick={() => handleScheduleAppointment(patient)}>
                                    <Calendar className="mr-2 h-4 w-4" />
                                    <span>Schedule Appointment</span>
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>
                                    <Mail className="mr-2 h-4 w-4" />
                                    <span>Send Email</span>
                                  </DropdownMenuItem>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem
                                    className="text-red-600"
                                    onClick={() => handleDeletePatient(patient)}
                                  >
                                    <Trash className="mr-2 h-4 w-4" />
                                    <span>Delete Patient</span>
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
            <CardFooter className="flex items-center justify-between border-t px-6 py-4">
              <div className="text-xs text-muted-foreground">
                Showing <strong>{filteredPatients.length}</strong> of <strong>{patientUsers.length}</strong> patients
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm" disabled>
                  Previous
                </Button>
                <Button variant="outline" size="sm" disabled>
                  Next
                </Button>
              </div>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="recent" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Visits</CardTitle>
              <CardDescription>Patients who visited in the last 7 days</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Visit Date</TableHead>
                      <TableHead>Doctor</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {patientUsers
                      .filter((patient) => {
                        const visitDate = new Date(patient.lastVisit)
                        const sevenDaysAgo = new Date()
                        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)
                        return visitDate >= sevenDaysAgo
                      })
                      .map((patient) => (
                        <TableRow key={patient.id}>
                          <TableCell className="font-medium">{patient.name}</TableCell>
                          <TableCell>{new Date(patient.lastVisit).toLocaleDateString()}</TableCell>
                          <TableCell>{patient.assignedDoctor}</TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="sm" onClick={() => handleEditPatient(patient)}>
                              View Details
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="new" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>New Patients</CardTitle>
              <CardDescription>Patients registered in the last 30 days</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Registration Date</TableHead>
                      <TableHead>Assigned Doctor</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {patientUsers
                      .filter((patient) => {
                        const regDate = new Date(patient.registeredDate)
                        const thirtyDaysAgo = new Date()
                        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)
                        return regDate >= thirtyDaysAgo
                      })
                      .map((patient) => (
                        <TableRow key={patient.id}>
                          <TableCell className="font-medium">{patient.name}</TableCell>
                          <TableCell>{new Date(patient.registeredDate).toLocaleDateString()}</TableCell>
                          <TableCell>{patient.assignedDoctor}</TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="sm" onClick={() => handleEditPatient(patient)}>
                              View Details
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="inactive" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Inactive Patients</CardTitle>
              <CardDescription>Patients with inactive accounts</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Last Visit</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {patientUsers
                      .filter((patient) => patient.status === "Inactive")
                      .map((patient) => (
                        <TableRow key={patient.id}>
                          <TableCell className="font-medium">{patient.name}</TableCell>
                          <TableCell>{new Date(patient.lastVisit).toLocaleDateString()}</TableCell>
                          <TableCell>
                            <Badge variant="secondary">{patient.status}</Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="sm" onClick={() => handleEditPatient(patient)}>
                              Reactivate
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Add Patient Dialog */}
      <Dialog open={isAddPatientDialogOpen} onOpenChange={setIsAddPatientDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Register New Patient</DialogTitle>
            <DialogDescription>
              Create a new patient account. Required fields are marked with an asterisk (*).
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-6 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name *</Label>
                <Input id="name" placeholder="John Doe" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email *</Label>
                <Input id="email" type="email" placeholder="john@example.com" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="contact">Contact Number *</Label>
                <Input id="contact" placeholder="+233 123456789" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="dob">Date of Birth *</Label>
                <Input id="dob" type="date" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="gender">Gender *</Label>
                <Select>
                  <SelectTrigger id="gender">
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="doctor">Assigned Doctor *</Label>
                <Select>
                  <SelectTrigger id="doctor">
                    <SelectValue placeholder="Select doctor" />
                  </SelectTrigger>
                  <SelectContent>
                    {mockUsers
                      .filter((user) => user.role === UserRole.DOCTOR)
                      .map((doctor) => (
                        <SelectItem key={doctor.id} value={doctor.id}>
                          {doctor.name}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="nurse">Assigned Nurse (Optional)</Label>
              <Select>
                <SelectTrigger id="nurse">
                  <SelectValue placeholder="Select nurse" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">None</SelectItem>
                  {mockUsers
                    .filter((user) => user.role === UserRole.NURSE)
                    .map((nurse) => (
                      <SelectItem key={nurse.id} value={nurse.id}>
                        {nurse.name}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">Address *</Label>
              <Textarea id="address" placeholder="123 Main St, Accra, Ghana" />
            </div>

            <Separator />

            <div className="space-y-4">
              <h3 className="text-sm font-medium">Insurance Information</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="insurance">Insurance Provider</Label>
                  <Select>
                    <SelectTrigger id="insurance">
                      <SelectValue placeholder="Select provider" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="nhis">National Health Insurance</SelectItem>
                      <SelectItem value="metlife">MetLife Dental</SelectItem>
                      <SelectItem value="none">None</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="insurance-number">Insurance Number</Label>
                  <Input id="insurance-number" placeholder="e.g., INS123456" />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="medical-history">Medical History</Label>
              <Textarea id="medical-history" placeholder="Any relevant medical history or conditions" />
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox id="send-credentials" />
              <Label htmlFor="send-credentials">Send login credentials via email</Label>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddPatientDialogOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" onClick={handleAddPatient}>
              Register Patient
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Patient Dialog */}
      <Dialog open={isEditPatientDialogOpen} onOpenChange={setIsEditPatientDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Edit Patient</DialogTitle>
            <DialogDescription>Update patient information and details.</DialogDescription>
          </DialogHeader>
          {selectedPatient && (
            <div className="grid gap-6 py-4">
              <div className="flex items-center space-x-4">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                  {selectedPatient.name.charAt(0)}
                </div>
                <div>
                  <h3 className="text-lg font-medium">{selectedPatient.name}</h3>
                  <p className="text-sm text-muted-foreground">Patient ID: {selectedPatient.id}</p>
                </div>
              </div>

              <Separator />

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-name">Full Name</Label>
                  <Input id="edit-name" defaultValue={selectedPatient.name} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-email">Email</Label>
                  <Input id="edit-email" type="email" defaultValue={selectedPatient.email} />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-contact">Contact Number</Label>
                  <Input id="edit-contact" defaultValue={selectedPatient.contactNumber} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-status">Status</Label>
                  <Select defaultValue={selectedPatient.status}>
                    <SelectTrigger id="edit-status">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Active">Active</SelectItem>
                      <SelectItem value="Inactive">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-dob">Date of Birth</Label>
                  <Input
                    id="edit-dob"
                    type="date"
                    defaultValue={new Date(selectedPatient.dateOfBirth).toISOString().split("T")[0]}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-gender">Gender</Label>
                  <Select defaultValue={selectedPatient.gender.toLowerCase()}>
                    <SelectTrigger id="edit-gender">
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-address">Address</Label>
                <Textarea id="edit-address" defaultValue={selectedPatient.address} />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-doctor">Assigned Doctor</Label>
                  <Select defaultValue={mockUsers.find((u) => u.name === selectedPatient.assignedDoctor)?.id}>
                    <SelectTrigger id="edit-doctor">
                      <SelectValue placeholder="Select doctor" />
                    </SelectTrigger>
                    <SelectContent>
                      {mockUsers
                        .filter((user) => user.role === UserRole.DOCTOR)
                        .map((doctor) => (
                          <SelectItem key={doctor.id} value={doctor.id}>
                            {doctor.name}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-nurse">Assigned Nurse</Label>
                  <Select
                    defaultValue={
                      selectedPatient.assignedNurse
                        ? mockUsers.find((u) => u.name === selectedPatient.assignedNurse)?.id
                        : "none"
                    }
                  >
                    <SelectTrigger id="edit-nurse">
                      <SelectValue placeholder="Select nurse" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">None</SelectItem>
                      {mockUsers
                        .filter((user) => user.role === UserRole.NURSE)
                        .map((nurse) => (
                          <SelectItem key={nurse.id} value={nurse.id}>
                            {nurse.name}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-sm font-medium">Insurance Information</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="edit-insurance">Insurance Provider</Label>
                    <Select
                      defaultValue={
                        selectedPatient.insuranceProvider === "None"
                          ? "none"
                          : selectedPatient.insuranceProvider === "National Health Insurance"
                            ? "nhis"
                            : "metlife"
                      }
                    >
                      <SelectTrigger id="edit-insurance">
                        <SelectValue placeholder="Select provider" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="nhis">National Health Insurance</SelectItem>
                        <SelectItem value="metlife">MetLife Dental</SelectItem>
                        <SelectItem value="none">None</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="edit-insurance-number">Insurance Number</Label>
                    <Input id="edit-insurance-number" defaultValue={selectedPatient.insuranceNumber} />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-medical-history">Medical History</Label>
                <Textarea id="edit-medical-history" defaultValue={selectedPatient.medicalHistory} />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditPatientDialogOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" onClick={handleUpdatePatient}>
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Schedule Appointment Dialog */}
      <Dialog open={isScheduleAppointmentOpen} onOpenChange={setIsScheduleAppointmentOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Schedule Appointment</DialogTitle>
            <DialogDescription>Schedule a new appointment for this patient.</DialogDescription>
          </DialogHeader>
          {selectedPatient && (
            <div className="grid gap-6 py-4">
              <div className="flex items-center space-x-4">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                  {selectedPatient.name.charAt(0)}
                </div>
                <div>
                  <h3 className="font-medium">{selectedPatient.name}</h3>
                  <p className="text-sm text-muted-foreground">Patient ID: {selectedPatient.id}</p>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="appointment-date">Appointment Date</Label>
                <Input id="appointment-date" type="date" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="appointment-time">Appointment Time</Label>
                <Input id="appointment-time" type="time" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="appointment-doctor">Doctor</Label>
                <Select defaultValue={mockUsers.find((u) => u.name === selectedPatient.assignedDoctor)?.id}>
                  <SelectTrigger id="appointment-doctor">
                    <SelectValue placeholder="Select doctor" />
                  </SelectTrigger>
                  <SelectContent>
                    {mockUsers
                      .filter((user) => user.role === UserRole.DOCTOR)
                      .map((doctor) => (
                        <SelectItem key={doctor.id} value={doctor.id}>
                          {doctor.name}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="appointment-type">Appointment Type</Label>
                <Select>
                  <SelectTrigger id="appointment-type">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="checkup">Regular Checkup</SelectItem>
                    <SelectItem value="cleaning">Teeth Cleaning</SelectItem>
                    <SelectItem value="filling">Filling</SelectItem>
                    <SelectItem value="extraction">Tooth Extraction</SelectItem>
                    <SelectItem value="root-canal">Root Canal</SelectItem>
                    <SelectItem value="consultation">Consultation</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="appointment-notes">Notes</Label>
                <Textarea id="appointment-notes" placeholder="Any additional notes or instructions" />
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox id="send-reminder" defaultChecked />
                <Label htmlFor="send-reminder">Send appointment reminder to patient</Label>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsScheduleAppointmentOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" onClick={() => setIsScheduleAppointmentOpen(false)}>
              Schedule
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteConfirmOpen} onOpenChange={setIsDeleteConfirmOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this patient? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          {patientToDelete && (
            <div className="py-4">
              <div className="flex items-center space-x-4">
                <div className="h-12 w-12 rounded-full bg-destructive/10 flex items-center justify-center">
                  <AlertCircle className="h-6 w-6 text-destructive" />
                </div>
                <div>
                  <h3 className="font-medium">{patientToDelete.name}</h3>
                  <p className="text-sm text-muted-foreground">{patientToDelete.email}</p>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteConfirmOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmDeletePatient}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
