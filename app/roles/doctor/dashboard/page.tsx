"use client"

import { useContext } from "react"
import { AuthContext } from "@/contexts/auth-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Users,
  Calendar,
  ClipboardList,
  Activity,
  Bell,
  Clock,
  FileText,
  ChevronRight,
  AlertCircle,
  CheckCircle,
  TrendingUp,
  Stethoscope,
  Pill,
  SmileIcon as Tooth,
  FlaskRoundIcon as Flask,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import Link from "next/link"

// Mock data for appointments
const todayAppointments = [
  {
    id: "A001",
    time: "10:30 AM",
    patient: "John Doe",
    type: "Checkup",
    status: "Upcoming",
    patientId: "P001",
    duration: "30 minutes",
    notes: "Regular dental checkup and cleaning",
  },
  {
    id: "A002",
    time: "11:15 AM",
    patient: "Jane Smith",
    type: "Follow-up",
    status: "Upcoming",
    patientId: "P002",
    duration: "20 minutes",
    notes: "Post-treatment follow-up",
  },
  {
    id: "A003",
    time: "1:00 PM",
    patient: "Robert Johnson",
    type: "Consultation",
    status: "Upcoming",
    patientId: "P003",
    duration: "45 minutes",
    notes: "Initial consultation for dental implants",
  },
  {
    id: "A004",
    time: "2:30 PM",
    patient: "Emily Davis",
    type: "Procedure",
    status: "Upcoming",
    patientId: "P004",
    duration: "60 minutes",
    notes: "Root canal treatment",
  },
  {
    id: "A005",
    time: "4:00 PM",
    patient: "Michael Brown",
    type: "Emergency",
    status: "Upcoming",
    patientId: "P005",
    duration: "30 minutes",
    notes: "Severe tooth pain, possible abscess",
  },
]

// Mock data for patient records
const recentPatientRecords = [
  { id: "PR001", patient: "Jane Smith", patientId: "P002", updatedAt: "2 hours ago", status: "Updated" },
  { id: "PR002", patient: "Michael Brown", patientId: "P005", updatedAt: "Yesterday", status: "Updated" },
  { id: "PR003", patient: "Sarah Wilson", patientId: "P006", updatedAt: "2 days ago", status: "Updated" },
  { id: "PR004", patient: "David Lee", patientId: "P007", updatedAt: "3 days ago", status: "Updated" },
]

// Mock data for pending actions
const pendingActions = [
  { id: "PA001", type: "Lab Results", count: 3, priority: "Medium" },
  { id: "PA002", type: "Prescriptions", count: 2, priority: "High" },
  { id: "PA003", type: "Medical Records", count: 1, priority: "Low" },
  { id: "PA004", type: "Referrals", count: 2, priority: "Medium" },
]

// Mock data for treatment plans
const treatmentPlans = [
  {
    id: "TP001",
    patient: "John Doe",
    patientId: "P001",
    treatment: "Full Mouth Restoration",
    progress: 25,
    startDate: "2023-09-01",
    endDate: "2023-12-15",
    nextAppointment: "2023-10-20",
  },
  {
    id: "TP002",
    patient: "Jane Smith",
    patientId: "P002",
    treatment: "Orthodontic Treatment",
    progress: 60,
    startDate: "2023-06-15",
    endDate: "2024-06-15",
    nextAppointment: "2023-10-25",
  },
  {
    id: "TP003",
    patient: "Robert Johnson",
    patientId: "P003",
    treatment: "Implant Placement",
    progress: 40,
    startDate: "2023-08-10",
    endDate: "2023-11-30",
    nextAppointment: "2023-10-18",
  },
]

export default function DoctorDashboardPage() {
  // Use the AuthContext directly to avoid potential hook issues
  const authContext = useContext(AuthContext)
  const user = authContext?.user

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Doctor Dashboard</h2>
          <p className="text-muted-foreground">Welcome back, {user?.name || "Doctor"}</p>
        </div>
        <Button variant="outline" className="flex items-center gap-2">
          <Bell className="h-4 w-4" />
          <span className="relative flex h-2 w-2">
            <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
          </span>
          Notifications
        </Button>
      </div>

      {user && (
        <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 dark:bg-blue-800 rounded-full">
              <Stethoscope className="h-5 w-5 text-blue-700 dark:text-blue-300" />
            </div>
            <div>
              <h3 className="text-lg font-medium">Welcome, Dr. {user.name.split(" ")[1]}</h3>
              <p className="text-sm text-muted-foreground">
                You have 5 appointments scheduled for today and 3 pending lab results to review.
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Patients Today</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <div className="flex items-center text-xs text-muted-foreground">
              <TrendingUp className="mr-1 h-3 w-3 text-green-500" />
              <span className="text-green-500 font-medium">+2</span> from yesterday
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Records</CardTitle>
            <ClipboardList className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <div className="flex items-center text-xs text-muted-foreground">
              <TrendingUp className="mr-1 h-3 w-3 text-green-500 rotate-180" />
              <span className="text-green-500 font-medium">-2</span> from yesterday
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Next Appointment</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">10:30 AM</div>
            <p className="text-xs text-muted-foreground flex items-center">
              <Clock className="mr-1 h-3 w-3" />
              In 25 minutes with John Doe
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Procedures Today</CardTitle>
            <Tooth className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
            <div className="flex justify-between text-xs text-muted-foreground">
              <span className="flex items-center">
                <CheckCircle className="mr-1 h-3 w-3 text-green-500" />
                <span>2 completed</span>
              </span>
              <span className="flex items-center">
                <Clock className="mr-1 h-3 w-3 text-amber-500" />
                <span>3 upcoming</span>
              </span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="appointments">Appointments</TabsTrigger>
          <TabsTrigger value="patients">Patients</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card className="md:col-span-2 lg:col-span-1">
              <CardHeader>
                <CardTitle>Today's Schedule</CardTitle>
                <CardDescription>Your appointments for today</CardDescription>
              </CardHeader>
              <CardContent className="px-2">
                <div className="space-y-4">
                  {todayAppointments.map((appointment, index) => (
                    <div
                      key={appointment.id}
                      className={`flex items-start p-3 rounded-lg ${
                        index === 0 ? "bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800" : ""
                      }`}
                    >
                      <div
                        className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center ${
                          appointment.type === "Emergency"
                            ? "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                            : appointment.type === "Procedure"
                              ? "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400"
                              : "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
                        }`}
                      >
                        {appointment.type === "Emergency" ? (
                          <AlertCircle className="h-6 w-6" />
                        ) : appointment.type === "Procedure" ? (
                          <Activity className="h-6 w-6" />
                        ) : appointment.type === "Checkup" ? (
                          <CheckCircle className="h-6 w-6" />
                        ) : (
                          <Calendar className="h-6 w-6" />
                        )}
                      </div>
                      <div className="ml-4 flex-1">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium">{appointment.patient}</p>
                          <Badge variant={appointment.type === "Emergency" ? "destructive" : "outline"}>
                            {appointment.type}
                          </Badge>
                        </div>
                        <div className="flex items-center mt-1 text-sm text-muted-foreground">
                          <Clock className="mr-1 h-3 w-3" />
                          {appointment.time} ({appointment.duration})
                        </div>
                        <p className="mt-1 text-xs text-muted-foreground">{appointment.notes}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full" asChild>
                  <Link href="/roles/doctor/appointments">
                    View All Appointments
                    <ChevronRight className="ml-1 h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Patient Records</CardTitle>
                <CardDescription>Recently updated records</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentPatientRecords.map((record) => (
                    <div key={record.id} className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium">{record.patient}</p>
                        <p className="text-xs text-muted-foreground">ID: {record.patientId}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-muted-foreground">Updated {record.updatedAt}</p>
                        <Button variant="ghost" size="sm" className="h-8 px-2 mt-1">
                          View
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full" asChild>
                  <Link href="/roles/doctor/medical-records">
                    View All Records
                    <ChevronRight className="ml-1 h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Pending Actions</CardTitle>
                <CardDescription>Tasks requiring your attention</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {pendingActions.map((action) => (
                    <div key={action.id} className="flex items-center justify-between">
                      <div className="flex items-center">
                        {action.type === "Lab Results" ? (
                          <Flask className="h-4 w-4 mr-2 text-amber-500" />
                        ) : action.type === "Prescriptions" ? (
                          <Pill className="h-4 w-4 mr-2 text-red-500" />
                        ) : action.type === "Medical Records" ? (
                          <FileText className="h-4 w-4 mr-2 text-blue-500" />
                        ) : (
                          <FileText className="h-4 w-4 mr-2 text-purple-500" />
                        )}
                        <span className="text-sm font-medium">{action.type}</span>
                      </div>
                      <Badge
                        variant="outline"
                        className={`
                          ${action.priority === "High" ? "border-red-200 bg-red-50 text-red-700 dark:border-red-800 dark:bg-red-900/20 dark:text-red-400" : ""}
                          ${action.priority === "Medium" ? "border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-800 dark:bg-amber-900/20 dark:text-amber-400" : ""}
                          ${action.priority === "Low" ? "border-green-200 bg-green-50 text-green-700 dark:border-green-800 dark:bg-green-900/20 dark:text-green-400" : ""}
                        `}
                      >
                        {action.count} pending
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" size="sm">
                  Dismiss All
                </Button>
                <Button size="sm">Review All</Button>
              </CardFooter>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Treatment Plans</CardTitle>
                <CardDescription>Active treatment plans and progress</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {treatmentPlans.map((plan) => (
                    <div key={plan.id} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium">{plan.patient}</p>
                          <p className="text-xs text-muted-foreground">{plan.treatment}</p>
                        </div>
                        <Badge variant="outline">{plan.progress}% Complete</Badge>
                      </div>
                      <Progress value={plan.progress} className="h-2" />
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>Started: {plan.startDate}</span>
                        <span>Next: {plan.nextAppointment}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full" asChild>
                  <Link href="/roles/doctor/treatment-plans">
                    View All Treatment Plans
                    <ChevronRight className="ml-1 h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Your recent actions and notifications</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="mr-4 mt-0.5">
                      <div className="flex h-2 w-2 rounded-full bg-blue-500"></div>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm">
                        You updated medical records for <span className="font-medium">Jane Smith</span>
                      </p>
                      <p className="text-xs text-muted-foreground">2 hours ago</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="mr-4 mt-0.5">
                      <div className="flex h-2 w-2 rounded-full bg-green-500"></div>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm">
                        You completed a procedure for <span className="font-medium">Robert Johnson</span>
                      </p>
                      <p className="text-xs text-muted-foreground">Yesterday at 2:30 PM</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="mr-4 mt-0.5">
                      <div className="flex h-2 w-2 rounded-full bg-amber-500"></div>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm">
                        You prescribed medication for <span className="font-medium">Emily Davis</span>
                      </p>
                      <p className="text-xs text-muted-foreground">Yesterday at 11:15 AM</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="mr-4 mt-0.5">
                      <div className="flex h-2 w-2 rounded-full bg-purple-500"></div>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm">
                        You created a treatment plan for <span className="font-medium">Michael Brown</span>
                      </p>
                      <p className="text-xs text-muted-foreground">2 days ago</p>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  View All Activity
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="appointments" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Appointment Management</CardTitle>
              <CardDescription>View and manage your appointments</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid gap-4 md:grid-cols-3">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm">Today</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">5</div>
                      <p className="text-xs text-muted-foreground">Appointments</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm">This Week</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">23</div>
                      <p className="text-xs text-muted-foreground">Appointments</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm">This Month</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">87</div>
                      <p className="text-xs text-muted-foreground">Appointments</p>
                    </CardContent>
                  </Card>
                </div>

                <div className="flex items-center justify-center p-6">
                  <Button variant="outline" className="mr-2" asChild>
                    <Link href="/roles/doctor/appointments">View Calendar</Link>
                  </Button>
                  <Button asChild>
                    <Link href="/roles/doctor/appointments">Schedule Appointment</Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="patients" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Patient Management</CardTitle>
              <CardDescription>View and manage patient records</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid gap-4 md:grid-cols-3">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm">Total Patients</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">128</div>
                      <p className="text-xs text-muted-foreground">Active patients</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm">New Patients</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">12</div>
                      <p className="text-xs text-muted-foreground">This month</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm">Treatment Plans</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">45</div>
                      <p className="text-xs text-muted-foreground">Active plans</p>
                    </CardContent>
                  </Card>
                </div>

                <div className="flex items-center justify-center p-6">
                  <Button variant="outline" className="mr-2" asChild>
                    <Link href="/roles/doctor/patients">View All Patients</Link>
                  </Button>
                  <Button asChild>
                    <Link href="/roles/doctor/patients">Add New Patient</Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Performance Analytics</CardTitle>
              <CardDescription>Your performance metrics and statistics</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid gap-4 md:grid-cols-3">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm">Patients Treated</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">87</div>
                      <p className="text-xs text-muted-foreground">This month</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm">Procedures</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">124</div>
                      <p className="text-xs text-muted-foreground">This month</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm">Patient Satisfaction</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">4.8/5</div>
                      <p className="text-xs text-muted-foreground">Average rating</p>
                    </CardContent>
                  </Card>
                </div>

                <div className="flex items-center justify-center p-6">
                  <Button variant="outline">View Detailed Analytics</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
