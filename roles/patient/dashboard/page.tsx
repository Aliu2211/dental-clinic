"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, FileText, CreditCard, ClipboardList } from "lucide-react"

export default function PatientDashboardPage() {
  return (
    <div className="space-y-4">
      <h2 className="text-3xl font-bold tracking-tight">Patient Dashboard</h2>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Next Appointment</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Mar 15</div>
            <p className="text-xs text-muted-foreground">10:30 AM - Dr. Smith</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Prescriptions</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-muted-foreground">1 needs refill</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Outstanding Balance</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">GHS 150.00</div>
            <p className="text-xs text-muted-foreground">Due in 15 days</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Medical Records</CardTitle>
            <ClipboardList className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
            <p className="text-xs text-muted-foreground">Last updated 2 weeks ago</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="records">My Records</TabsTrigger>
          <TabsTrigger value="appointments">Appointments</TabsTrigger>
          <TabsTrigger value="billing">Billing</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>My Appointments</CardTitle>
                <CardDescription>Your upcoming appointments</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="text-sm">
                    <span className="font-medium">Mar 15, 10:30 AM</span> - Dr. Smith
                    <div className="text-xs text-muted-foreground">Regular checkup</div>
                  </div>
                  <div className="text-sm">
                    <span className="font-medium">Apr 5, 2:00 PM</span> - Dr. Johnson
                    <div className="text-xs text-muted-foreground">Follow-up consultation</div>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>My Prescriptions</CardTitle>
                <CardDescription>Your current prescriptions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="text-sm">
                    <span className="font-medium">Amoxicillin 500mg</span>
                    <div className="text-xs text-muted-foreground">3x daily - Refills: 1</div>
                  </div>
                  <div className="text-sm">
                    <span className="font-medium">Ibuprofen 400mg</span>
                    <div className="text-xs text-muted-foreground">As needed - Refills: 0</div>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Recent Visits</CardTitle>
                <CardDescription>Your recent clinic visits</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="text-sm">
                    <span className="font-medium">Feb 20, 2023</span> - Dr. Smith
                    <div className="text-xs text-muted-foreground">Dental cleaning</div>
                  </div>
                  <div className="text-sm">
                    <span className="font-medium">Jan 10, 2023</span> - Dr. Johnson
                    <div className="text-xs text-muted-foreground">Tooth extraction</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="records" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>My Medical Records</CardTitle>
              <CardDescription>View your medical history</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Medical records content would go here.</p>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="appointments" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>My Appointments</CardTitle>
              <CardDescription>View and schedule appointments</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Appointments content would go here.</p>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="billing" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>My Billing</CardTitle>
              <CardDescription>View and pay bills</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Billing content would go here.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
