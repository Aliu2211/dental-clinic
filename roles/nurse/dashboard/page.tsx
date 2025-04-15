"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Users, HeartPulse, Calendar, ClipboardList } from "lucide-react"

export default function NurseDashboardPage() {
  return (
    <div className="space-y-4">
      <h2 className="text-3xl font-bold tracking-tight">Nurse Dashboard</h2>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Patients Today</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">+3 from yesterday</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Vitals Pending</CardTitle>
            <HeartPulse className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4</div>
            <p className="text-xs text-muted-foreground">-1 from an hour ago</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Next Patient</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Now</div>
            <p className="text-xs text-muted-foreground">Jane Smith - Room 3</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Supplies Status</CardTitle>
            <ClipboardList className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Good</div>
            <p className="text-xs text-muted-foreground">2 items low</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="vitals">Vitals</TabsTrigger>
          <TabsTrigger value="patients">Patients</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Patient Vitals</CardTitle>
                <CardDescription>Recent vital recordings</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="text-sm">
                    <span className="font-medium">John Doe</span> - Room 1
                    <div className="text-xs text-muted-foreground">BP: 120/80, Temp: 98.6°F</div>
                  </div>
                  <div className="text-sm">
                    <span className="font-medium">Jane Smith</span> - Room 3
                    <div className="text-xs text-muted-foreground">BP: 130/85, Temp: 99.1°F</div>
                  </div>
                  <div className="text-sm">
                    <span className="font-medium">Robert Johnson</span> - Room 2
                    <div className="text-xs text-muted-foreground">BP: 125/82, Temp: 98.9°F</div>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Medication Schedule</CardTitle>
                <CardDescription>Upcoming medications</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="text-sm">
                    <span className="font-medium">11:00 AM</span> - Room 1, John Doe
                    <div className="text-xs text-muted-foreground">Amoxicillin 500mg</div>
                  </div>
                  <div className="text-sm">
                    <span className="font-medium">11:30 AM</span> - Room 3, Jane Smith
                    <div className="text-xs text-muted-foreground">Ibuprofen 400mg</div>
                  </div>
                  <div className="text-sm">
                    <span className="font-medium">12:00 PM</span> - Room 2, Robert Johnson
                    <div className="text-xs text-muted-foreground">Lisinopril 10mg</div>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Tasks</CardTitle>
                <CardDescription>Pending nursing tasks</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="text-sm">
                    <span className="font-medium">Room 1 - John Doe</span>
                    <div className="text-xs text-muted-foreground">Change IV bag</div>
                  </div>
                  <div className="text-sm">
                    <span className="font-medium">Room 3 - Jane Smith</span>
                    <div className="text-xs text-muted-foreground">Prepare for procedure</div>
                  </div>
                  <div className="text-sm">
                    <span className="font-medium">Room 2 - Robert Johnson</span>
                    <div className="text-xs text-muted-foreground">Check vitals at 12:30 PM</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="vitals" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Vitals Management</CardTitle>
              <CardDescription>Record and monitor patient vitals</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Vitals management content would go here.</p>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="patients" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Patient Management</CardTitle>
              <CardDescription>View and manage patients</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Patient management content would go here.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
