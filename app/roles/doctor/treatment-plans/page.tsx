"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Plus, FileText, Edit, Calendar, Check } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
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

// Mock treatment plans data
const treatmentPlansData = [
  {
    id: "TP001",
    patientName: "John Doe",
    patientId: "P001",
    diagnosis: "Dental Caries",
    startDate: "2023-10-01",
    endDate: "2023-12-15",
    status: "In Progress",
    progress: 35,
  },
  {
    id: "TP002",
    patientName: "Jane Smith",
    patientId: "P002",
    diagnosis: "Periodontal Disease",
    startDate: "2023-09-15",
    endDate: "2024-01-15",
    status: "In Progress",
    progress: 20,
  },
  {
    id: "TP003",
    patientName: "Robert Johnson",
    patientId: "P003",
    diagnosis: "Orthodontic Treatment",
    startDate: "2023-08-01",
    endDate: "2024-08-01",
    status: "In Progress",
    progress: 45,
  },
  {
    id: "TP004",
    patientName: "Emily Davis",
    patientId: "P004",
    diagnosis: "Root Canal Treatment",
    startDate: "2023-10-10",
    endDate: "2023-11-10",
    status: "Not Started",
    progress: 0,
  },
  {
    id: "TP005",
    patientName: "Michael Brown",
    patientId: "P005",
    diagnosis: "Dental Implant",
    startDate: "2023-07-15",
    endDate: "2023-10-15",
    status: "Completed",
    progress: 100,
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

// Diagnosis options for dropdown
const diagnosisOptions = [
  "Dental Caries",
  "Periodontal Disease",
  "Orthodontic Treatment",
  "Root Canal Treatment",
  "Dental Implant",
  "Tooth Extraction",
  "Dental Crown",
  "Dental Bridge",
  "Dental Filling",
]

export default function TreatmentPlansPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [treatmentPlans, setTreatmentPlans] = useState(treatmentPlansData)
  const [isNewPlanOpen, setIsNewPlanOpen] = useState(false)
  const [isEditPlanOpen, setIsEditPlanOpen] = useState(false)
  const [isScheduleSessionOpen, setIsScheduleSessionOpen] = useState(false)
  const [selectedPlan, setSelectedPlan] = useState<any>(null)
  const [isViewPlanOpen, setIsViewPlanOpen] = useState(false)
  const { showToast, ToastContainer } = useToast()

  // Form state for new plan
  const [newPlan, setNewPlan] = useState({
    patientId: "",
    diagnosis: "",
    startDate: "",
    endDate: "",
    notes: "",
  })

  // Form state for edit plan
  const [editPlan, setEditPlan] = useState({
    id: "",
    patientId: "",
    patientName: "",
    diagnosis: "",
    startDate: "",
    endDate: "",
    status: "",
    progress: 0,
    notes: "",
  })

  // Form state for schedule session
  const [sessionDetails, setSessionDetails] = useState({
    planId: "",
    date: "",
    time: "",
    duration: "30",
    notes: "",
  })

  const filteredPlans = treatmentPlans.filter(
    (plan) =>
      plan.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      plan.diagnosis.toLowerCase().includes(searchTerm.toLowerCase()) ||
      plan.id.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const activePlans = filteredPlans.filter((plan) => plan.status === "In Progress")
  const completedPlans = filteredPlans.filter((plan) => plan.status === "Completed")

  const handleCreatePlan = () => {
    if (!newPlan.patientId || !newPlan.diagnosis || !newPlan.startDate || !newPlan.endDate) {
      showToast({ message: "Please fill in all required fields", type: "error" })
      return
    }

    const patient = patients.find((p) => p.id === newPlan.patientId)

    const plan = {
      id: `TP${treatmentPlans.length + 1}`.padStart(4, "0"),
      patientName: patient?.name || "",
      patientId: newPlan.patientId,
      diagnosis: newPlan.diagnosis,
      startDate: newPlan.startDate,
      endDate: newPlan.endDate,
      status: "Not Started",
      progress: 0,
    }

    setTreatmentPlans([plan, ...treatmentPlans])
    setIsNewPlanOpen(false)
    setNewPlan({ patientId: "", diagnosis: "", startDate: "", endDate: "", notes: "" })
    showToast({ message: "Treatment plan created successfully", type: "success" })
  }

  const handleEditPlan = () => {
    if (!editPlan.diagnosis || !editPlan.startDate || !editPlan.endDate) {
      showToast({ message: "Please fill in all required fields", type: "error" })
      return
    }

    setTreatmentPlans(
      treatmentPlans.map((plan) =>
        plan.id === editPlan.id
          ? {
              ...plan,
              diagnosis: editPlan.diagnosis,
              startDate: editPlan.startDate,
              endDate: editPlan.endDate,
              status: editPlan.status,
              progress: editPlan.progress,
            }
          : plan,
      ),
    )

    setIsEditPlanOpen(false)
    showToast({ message: "Treatment plan updated successfully", type: "success" })
  }

  const handleScheduleSession = () => {
    if (!sessionDetails.date || !sessionDetails.time) {
      showToast({ message: "Please fill in all required fields", type: "error" })
      return
    }

    // In a real app, this would create an appointment linked to the treatment plan
    showToast({ message: "Session scheduled successfully", type: "success" })
    setIsScheduleSessionOpen(false)
  }

  const handleViewPlan = (plan: any) => {
    setSelectedPlan(plan)
    setIsViewPlanOpen(true)
  }

  const handleEditPlanClick = (plan: any) => {
    setEditPlan({
      id: plan.id,
      patientId: plan.patientId,
      patientName: plan.patientName,
      diagnosis: plan.diagnosis,
      startDate: plan.startDate,
      endDate: plan.endDate,
      status: plan.status,
      progress: plan.progress,
      notes: "",
    })
    setIsEditPlanOpen(true)
  }

  const handleScheduleSessionClick = (plan: any) => {
    setSessionDetails({
      planId: plan.id,
      date: "",
      time: "",
      duration: "30",
      notes: "",
    })
    setIsScheduleSessionOpen(true)
  }

  const handleUpdateProgress = (id: string, newProgress: number) => {
    setTreatmentPlans(
      treatmentPlans.map((plan) =>
        plan.id === id
          ? {
              ...plan,
              progress: newProgress,
              status: newProgress === 100 ? "Completed" : "In Progress",
            }
          : plan,
      ),
    )

    showToast({ message: "Treatment progress updated", type: "success" })
  }

  return (
    <div className="space-y-4">
      <ToastContainer />
      <h2 className="text-3xl font-bold tracking-tight">Treatment Plans</h2>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All Plans ({filteredPlans.length})</TabsTrigger>
          <TabsTrigger value="active">In Progress ({activePlans.length})</TabsTrigger>
          <TabsTrigger value="completed">Completed ({completedPlans.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Treatment Plans</CardTitle>
                  <CardDescription>View and manage patient treatment plans</CardDescription>
                </div>
                <Dialog open={isNewPlanOpen} onOpenChange={setIsNewPlanOpen}>
                  <DialogTrigger asChild>
                    <Button className="flex items-center gap-2">
                      <Plus className="h-4 w-4" />
                      New Plan
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[500px]">
                    <DialogHeader>
                      <DialogTitle>Create New Treatment Plan</DialogTitle>
                      <DialogDescription>Create a new treatment plan for a patient.</DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="new-patient" className="text-right">
                          Patient
                        </Label>
                        <Select onValueChange={(value) => setNewPlan({ ...newPlan, patientId: value })}>
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
                        <Label htmlFor="new-diagnosis" className="text-right">
                          Diagnosis
                        </Label>
                        <Select onValueChange={(value) => setNewPlan({ ...newPlan, diagnosis: value })}>
                          <SelectTrigger className="col-span-3">
                            <SelectValue placeholder="Select diagnosis" />
                          </SelectTrigger>
                          <SelectContent>
                            {diagnosisOptions.map((diagnosis) => (
                              <SelectItem key={diagnosis} value={diagnosis}>
                                {diagnosis}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="new-start-date" className="text-right">
                          Start Date
                        </Label>
                        <Input
                          id="new-start-date"
                          type="date"
                          className="col-span-3"
                          value={newPlan.startDate}
                          onChange={(e) => setNewPlan({ ...newPlan, startDate: e.target.value })}
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="new-end-date" className="text-right">
                          End Date
                        </Label>
                        <Input
                          id="new-end-date"
                          type="date"
                          className="col-span-3"
                          value={newPlan.endDate}
                          onChange={(e) => setNewPlan({ ...newPlan, endDate: e.target.value })}
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="new-notes" className="text-right">
                          Notes
                        </Label>
                        <Textarea
                          id="new-notes"
                          className="col-span-3"
                          placeholder="Treatment plan details"
                          value={newPlan.notes}
                          onChange={(e) => setNewPlan({ ...newPlan, notes: e.target.value })}
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setIsNewPlanOpen(false)}>
                        Cancel
                      </Button>
                      <Button onClick={handleCreatePlan}>Create Plan</Button>
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
                    placeholder="Search plans..."
                    className="pl-8"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Plan ID</TableHead>
                    <TableHead>Patient</TableHead>
                    <TableHead>Diagnosis</TableHead>
                    <TableHead>Timeline</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Progress</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPlans.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-6 text-muted-foreground">
                        No treatment plans found. Try adjusting your search or create a new plan.
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredPlans.map((plan) => (
                      <TableRow key={plan.id}>
                        <TableCell className="font-medium">{plan.id}</TableCell>
                        <TableCell>{plan.patientName}</TableCell>
                        <TableCell>{plan.diagnosis}</TableCell>
                        <TableCell>
                          <div className="text-xs">
                            <div>Start: {plan.startDate}</div>
                            <div>End: {plan.endDate}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              plan.status === "Completed"
                                ? "default"
                                : plan.status === "In Progress"
                                  ? "secondary"
                                  : "outline"
                            }
                          >
                            {plan.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="w-[100px]">
                            <Progress value={plan.progress} className="h-2" />
                            <div className="text-xs text-right mt-1">{plan.progress}%</div>
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button variant="ghost" size="icon" title="View Plan" onClick={() => handleViewPlan(plan)}>
                              <FileText className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              title="Edit Plan"
                              onClick={() => handleEditPlanClick(plan)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              title="Schedule Session"
                              onClick={() => handleScheduleSessionClick(plan)}
                            >
                              <Calendar className="h-4 w-4" />
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

        <TabsContent value="active" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>In Progress Plans</CardTitle>
              <CardDescription>Treatment plans currently in progress</CardDescription>
            </CardHeader>
            <CardContent>
              {activePlans.length === 0 ? (
                <div className="text-center py-6 text-muted-foreground">No active treatment plans found.</div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Plan ID</TableHead>
                      <TableHead>Patient</TableHead>
                      <TableHead>Diagnosis</TableHead>
                      <TableHead>Timeline</TableHead>
                      <TableHead>Progress</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {activePlans.map((plan) => (
                      <TableRow key={plan.id}>
                        <TableCell className="font-medium">{plan.id}</TableCell>
                        <TableCell>{plan.patientName}</TableCell>
                        <TableCell>{plan.diagnosis}</TableCell>
                        <TableCell>
                          <div className="text-xs">
                            <div>Start: {plan.startDate}</div>
                            <div>End: {plan.endDate}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="w-[100px]">
                            <Progress value={plan.progress} className="h-2" />
                            <div className="text-xs text-right mt-1">{plan.progress}%</div>
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button variant="ghost" size="icon" title="View Plan" onClick={() => handleViewPlan(plan)}>
                              <FileText className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              title="Schedule Session"
                              onClick={() => handleScheduleSessionClick(plan)}
                            >
                              <Calendar className="h-4 w-4" />
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

        <TabsContent value="completed" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Completed Plans</CardTitle>
              <CardDescription>Treatment plans that have been completed</CardDescription>
            </CardHeader>
            <CardContent>
              {completedPlans.length === 0 ? (
                <div className="text-center py-6 text-muted-foreground">No completed treatment plans found.</div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Plan ID</TableHead>
                      <TableHead>Patient</TableHead>
                      <TableHead>Diagnosis</TableHead>
                      <TableHead>Timeline</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {completedPlans.map((plan) => (
                      <TableRow key={plan.id}>
                        <TableCell className="font-medium">{plan.id}</TableCell>
                        <TableCell>{plan.patientName}</TableCell>
                        <TableCell>{plan.diagnosis}</TableCell>
                        <TableCell>
                          <div className="text-xs">
                            <div>Start: {plan.startDate}</div>
                            <div>End: {plan.endDate}</div>
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button variant="ghost" size="icon" title="View Plan" onClick={() => handleViewPlan(plan)}>
                              <FileText className="h-4 w-4" />
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

      {/* Edit Plan Dialog */}
      <Dialog open={isEditPlanOpen} onOpenChange={setIsEditPlanOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Edit Treatment Plan</DialogTitle>
            <DialogDescription>Edit treatment plan for {editPlan.patientName}</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-diagnosis" className="text-right">
                Diagnosis
              </Label>
              <Select
                value={editPlan.diagnosis}
                onValueChange={(value) => setEditPlan({ ...editPlan, diagnosis: value })}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select diagnosis" />
                </SelectTrigger>
                <SelectContent>
                  {diagnosisOptions.map((diagnosis) => (
                    <SelectItem key={diagnosis} value={diagnosis}>
                      {diagnosis}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-start-date" className="text-right">
                Start Date
              </Label>
              <Input
                id="edit-start-date"
                type="date"
                className="col-span-3"
                value={editPlan.startDate}
                onChange={(e) => setEditPlan({ ...editPlan, startDate: e.target.value })}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-end-date" className="text-right">
                End Date
              </Label>
              <Input
                id="edit-end-date"
                type="date"
                className="col-span-3"
                value={editPlan.endDate}
                onChange={(e) => setEditPlan({ ...editPlan, endDate: e.target.value })}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-status" className="text-right">
                Status
              </Label>
              <Select value={editPlan.status} onValueChange={(value) => setEditPlan({ ...editPlan, status: value })}>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Not Started">Not Started</SelectItem>
                  <SelectItem value="In Progress">In Progress</SelectItem>
                  <SelectItem value="Completed">Completed</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-progress" className="text-right">
                Progress
              </Label>
              <div className="col-span-3 flex items-center gap-2">
                <Input
                  id="edit-progress"
                  type="number"
                  min="0"
                  max="100"
                  value={editPlan.progress}
                  onChange={(e) => setEditPlan({ ...editPlan, progress: Number.parseInt(e.target.value) || 0 })}
                />
                <span>%</span>
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-notes" className="text-right">
                Notes
              </Label>
              <Textarea
                id="edit-notes"
                className="col-span-3"
                placeholder="Treatment plan details"
                value={editPlan.notes}
                onChange={(e) => setEditPlan({ ...editPlan, notes: e.target.value })}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditPlanOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleEditPlan}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Schedule Session Dialog */}
      <Dialog open={isScheduleSessionOpen} onOpenChange={setIsScheduleSessionOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Schedule Treatment Session</DialogTitle>
            <DialogDescription>Schedule a session for treatment plan {sessionDetails.planId}</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="session-date" className="text-right">
                Date
              </Label>
              <Input
                id="session-date"
                type="date"
                className="col-span-3"
                value={sessionDetails.date}
                onChange={(e) => setSessionDetails({ ...sessionDetails, date: e.target.value })}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="session-time" className="text-right">
                Time
              </Label>
              <Input
                id="session-time"
                type="time"
                className="col-span-3"
                value={sessionDetails.time}
                onChange={(e) => setSessionDetails({ ...sessionDetails, time: e.target.value })}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="session-duration" className="text-right">
                Duration
              </Label>
              <Select
                value={sessionDetails.duration}
                onValueChange={(value) => setSessionDetails({ ...sessionDetails, duration: value })}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select duration" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="15">15 minutes</SelectItem>
                  <SelectItem value="30">30 minutes</SelectItem>
                  <SelectItem value="45">45 minutes</SelectItem>
                  <SelectItem value="60">60 minutes</SelectItem>
                  <SelectItem value="90">90 minutes</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="session-notes" className="text-right">
                Notes
              </Label>
              <Textarea
                id="session-notes"
                className="col-span-3"
                placeholder="Session details"
                value={sessionDetails.notes}
                onChange={(e) => setSessionDetails({ ...sessionDetails, notes: e.target.value })}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsScheduleSessionOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleScheduleSession}>Schedule</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* View Plan Dialog */}
      <Dialog open={isViewPlanOpen} onOpenChange={setIsViewPlanOpen}>
        <DialogContent className="sm:max-w-[700px]">
          <DialogHeader>
            <DialogTitle>Treatment Plan Details</DialogTitle>
            <DialogDescription>Plan ID: {selectedPlan?.id}</DialogDescription>
          </DialogHeader>
          {selectedPlan && (
            <div className="grid gap-6 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="text-lg font-medium">Patient Information</h3>
                  <div className="mt-2 space-y-2">
                    <div>
                      <span className="text-sm font-medium text-muted-foreground">Name:</span>
                      <p>{selectedPlan.patientName}</p>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-muted-foreground">ID:</span>
                      <p>{selectedPlan.patientId}</p>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-medium">Plan Information</h3>
                  <div className="mt-2 space-y-2">
                    <div>
                      <span className="text-sm font-medium text-muted-foreground">Diagnosis:</span>
                      <p>{selectedPlan.diagnosis}</p>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-muted-foreground">Timeline:</span>
                      <p>
                        {selectedPlan.startDate} to {selectedPlan.endDate}
                      </p>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-muted-foreground">Status:</span>
                      <Badge
                        variant={
                          selectedPlan.status === "Completed"
                            ? "default"
                            : selectedPlan.status === "In Progress"
                              ? "secondary"
                              : "outline"
                        }
                      >
                        {selectedPlan.status}
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">Progress</h3>
                <div className="space-y-2">
                  <Progress value={selectedPlan.progress} className="h-2" />
                  <div className="flex justify-between text-sm">
                    <span>{selectedPlan.progress}% Complete</span>
                    {selectedPlan.status !== "Completed" && (
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() =>
                            handleUpdateProgress(selectedPlan.id, Math.min(selectedPlan.progress + 10, 100))
                          }
                        >
                          <Plus className="h-3 w-3 mr-1" />
                          Update Progress
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => handleUpdateProgress(selectedPlan.id, 100)}>
                          <Check className="h-3 w-3 mr-1" />
                          Mark Complete
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">Treatment Sessions</h3>
                <div className="border rounded-md p-4 bg-gray-50">
                  <p className="text-muted-foreground">
                    No sessions scheduled yet. Click "Schedule Session" to add a new session.
                  </p>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">Treatment Notes</h3>
                <div className="border rounded-md p-4 bg-gray-50">
                  <p className="text-muted-foreground">
                    This is a placeholder for treatment notes. In a real application, this would display detailed notes
                    about the treatment plan, procedures, and patient progress.
                  </p>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            {selectedPlan && selectedPlan.status !== "Completed" && (
              <>
                <Button variant="outline" onClick={() => handleEditPlanClick(selectedPlan)}>
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Plan
                </Button>
                <Button variant="outline" onClick={() => handleScheduleSessionClick(selectedPlan)}>
                  <Calendar className="h-4 w-4 mr-2" />
                  Schedule Session
                </Button>
              </>
            )}
            <Button onClick={() => setIsViewPlanOpen(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
