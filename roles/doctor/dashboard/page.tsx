"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Users, Calendar, ClipboardList, Activity } from "lucide-react"

export default function DoctorDashboardPage() {
  return (
    <div className="space-y-4">
      <h2 className="text-3xl font-bold tracking-tight">Doctor Dashboard</h2>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Patients Today</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">+2 from yesterday</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Records</CardTitle>
            <ClipboardList className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">-2 from yesterday</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Next Appointment</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">10:30 AM</div>
            <p className="text-xs text-muted-foreground">John Doe - Checkup</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Procedures Today</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
            <p className="text-xs text-muted-foreground">2 completed</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="patients">Patients</TabsTrigger>
          <TabsTrigger value="blockchain">Blockchain</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Today's Schedule</CardTitle>
                <CardDescription>Your appointments for today</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="text-sm">
                    <span className="font-medium">10:30 AM</span> - John Doe (Checkup)
                  </div>
                  <div className="text-sm">
                    <span className="font-medium">11:15 AM</span> - Jane Smith (Follow-up)
                  </div>
                  <div className="text-sm">
                    <span className="font-medium">1:00 PM</span> - Robert Johnson (Consultation)
                  </div>
                  <div className="text-sm">
                    <span className="font-medium">2:30 PM</span> - Emily Davis (Procedure)
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Patient Records</CardTitle>
                <CardDescription>Recently updated records</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="text-sm">
                    <span className="font-medium">Jane Smith</span> - Updated 2 hours ago
                  </div>
                  <div className="text-sm">
                    <span className="font-medium">Michael Brown</span> - Updated yesterday
                  </div>
                  <div className="text-sm">
                    <span className="font-medium">Sarah Wilson</span> - Updated 2 days ago
                  </div>
                  <div className="text-sm">
                    <span className="font-medium">David Lee</span> - Updated 3 days ago
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Pending Actions</CardTitle>
                <CardDescription>Tasks requiring your attention</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="text-sm">
                    <span className="font-medium">Review Lab Results</span> - 3 pending
                  </div>
                  <div className="text-sm">
                    <span className="font-medium">Sign Prescriptions</span> - 2 pending
                  </div>
                  <div className="text-sm">
                    <span className="font-medium">Complete Medical Records</span> - 1 pending
                  </div>
                  <div className="text-sm">
                    <span className="font-medium">Approve Referrals</span> - 2 pending
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="patients" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Patient Management</CardTitle>
              <CardDescription>View and manage patient records</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Patient management content would go here.</p>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="blockchain" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Blockchain Management</CardTitle>
              <CardDescription>Manage blockchain integration</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Blockchain management content would go here.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
