"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, Users, UserCog } from "lucide-react"

export default function ReceptionistDashboardPage() {
  return (
    <div className="space-y-4">
      <h2 className="text-3xl font-bold tracking-tight">Receptionist Dashboard</h2>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Appointments Today</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground">+5% from yesterday</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Check-ins</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">50% of appointments</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Next Appointment</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">10:30 AM</div>
            <p className="text-xs text-muted-foreground">John Doe - Dr. Smith</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">New Patients</CardTitle>
            <UserCog className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">Forms pending</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="appointments">Appointments</TabsTrigger>
          <TabsTrigger value="patients">Patients</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Today's Appointments</CardTitle>
                <CardDescription>Scheduled appointments for today</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="text-sm">
                    <span className="font-medium">10:30 AM</span> - John Doe (Dr. Smith)
                    <div className="text-xs text-muted-foreground">Checkup - Room 1</div>
                  </div>
                  <div className="text-sm">
                    <span className="font-medium">11:15 AM</span> - Jane Smith (Dr. Johnson)
                    <div className="text-xs text-muted-foreground">Follow-up - Room 3</div>
                  </div>
                  <div className="text-sm">
                    <span className="font-medium">1:00 PM</span> - Robert Johnson (Dr. Smith)
                    <div className="text-xs text-muted-foreground">Consultation - Room 2</div>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Check-ins</CardTitle>
                <CardDescription>Patients who have checked in</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="text-sm">
                    <span className="font-medium">John Doe</span> - 10:15 AM
                    <div className="text-xs text-muted-foreground">Waiting in lobby</div>
                  </div>
                  <div className="text-sm">
                    <span className="font-medium">Jane Smith</span> - 11:00 AM
                    <div className="text-xs text-muted-foreground">Filling out forms</div>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>New Patient Forms</CardTitle>
                <CardDescription>Forms requiring processing</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="text-sm">
                    <span className="font-medium">Michael Brown</span>
                    <div className="text-xs text-muted-foreground">Insurance verification needed</div>
                  </div>
                  <div className="text-sm">
                    <span className="font-medium">Sarah Wilson</span>
                    <div className="text-xs text-muted-foreground">Missing contact information</div>
                  </div>
                  <div className="text-sm">
                    <span className="font-medium">David Lee</span>
                    <div className="text-xs text-muted-foreground">Ready for processing</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="appointments" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Appointment Management</CardTitle>
              <CardDescription>Schedule and manage appointments</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Appointment management content would go here.</p>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="patients" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Patient Registration</CardTitle>
              <CardDescription>Register and manage patients</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Patient registration content would go here.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
