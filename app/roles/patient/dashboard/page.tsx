"use client"

import { useContext } from "react"
import { AuthContext } from "@/contexts/auth-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Calendar, CreditCard, Bell, Activity, Pill } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"

export default function PatientDashboardPage() {
  const { user } = useContext(AuthContext)

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Welcome, {user?.name}</h2>
          <p className="text-muted-foreground">Here's an overview of your dental health and upcoming appointments.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="gap-1">
            <Bell className="h-4 w-4" />
            <span className="hidden sm:inline">Notifications</span>
            <span className="inline-flex items-center justify-center w-5 h-5 text-xs font-medium text-white bg-primary rounded-full">
              3
            </span>
          </Button>
          <Button size="sm" className="gap-1">
            <Calendar className="h-4 w-4" />
            <span>Book Appointment</span>
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Next Appointment</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Mar 15</div>
            <div className="flex items-center mt-1">
              <div className="w-2 h-2 rounded-full bg-blue-500 mr-2"></div>
              <p className="text-xs text-muted-foreground">10:30 AM - Dr. Sarah Johnson</p>
            </div>
            <div className="text-xs text-muted-foreground mt-1">Regular Checkup</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Prescriptions</CardTitle>
            <Pill className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2 Active</div>
            <div className="flex items-center mt-1">
              <div className="w-2 h-2 rounded-full bg-yellow-500 mr-2"></div>
              <p className="text-xs text-muted-foreground">1 needs refill (3 days)</p>
            </div>
            <Button variant="link" className="px-0 h-auto text-xs mt-1">
              View prescriptions
            </Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Outstanding Balance</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">GHS 150.00</div>
            <div className="flex items-center mt-1">
              <div className="w-2 h-2 rounded-full bg-red-500 mr-2"></div>
              <p className="text-xs text-muted-foreground">Due in 15 days</p>
            </div>
            <Button variant="link" className="px-0 h-auto text-xs mt-1">
              Make payment
            </Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Treatment Progress</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">75%</div>
            <Progress value={75} className="h-2 mt-2" />
            <p className="text-xs text-muted-foreground mt-2">Orthodontic treatment - 3 of 4 sessions completed</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="appointments">Appointments</TabsTrigger>
          <TabsTrigger value="records">Medical Records</TabsTrigger>
          <TabsTrigger value="billing">Billing</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Upcoming Appointments</CardTitle>
                <CardDescription>Your scheduled dental visits</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-muted/50 p-3 rounded-lg">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium">Regular Checkup</p>
                      <p className="text-sm text-muted-foreground">Dr. Sarah Johnson</p>
                    </div>
                    <div className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">Confirmed</div>
                  </div>
                  <div className="flex items-center mt-2 text-sm">
                    <Calendar className="h-4 w-4 mr-1 text-muted-foreground" />
                    <span>Mar 15, 2023 - 10:30 AM</span>
                  </div>
                  <div className="flex justify-between mt-3">
                    <Button variant="outline" size="sm">
                      Reschedule
                    </Button>
                    <Button variant="outline" size="sm">
                      Cancel
                    </Button>
                  </div>
                </div>

                <div className="bg-muted/50 p-3 rounded-lg">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium">Follow-up Consultation</p>
                      <p className="text-sm text-muted-foreground">Dr. Michael Lee</p>
                    </div>
                    <div className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">Confirmed</div>
                  </div>
                  <div className="flex items-center mt-2 text-sm">
                    <Calendar className="h-4 w-4 mr-1 text-muted-foreground" />
                    <span>Apr 5, 2023 - 2:00 PM</span>
                  </div>
                  <div className="flex justify-between mt-3">
                    <Button variant="outline" size="sm">
                      Reschedule
                    </Button>
                    <Button variant="outline" size="sm">
                      Cancel
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Treatment Plan</CardTitle>
                <CardDescription>Your current dental treatment plan</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">Orthodontic Treatment</span>
                      <span className="text-sm text-muted-foreground">75%</span>
                    </div>
                    <Progress value={75} className="h-2" />
                    <p className="text-xs text-muted-foreground mt-1">3 of 4 sessions completed</p>
                  </div>

                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">Cavity Treatment</span>
                      <span className="text-sm text-muted-foreground">100%</span>
                    </div>
                    <Progress value={100} className="h-2" />
                    <p className="text-xs text-muted-foreground mt-1">Completed on Feb 20, 2023</p>
                  </div>

                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">Teeth Whitening</span>
                      <span className="text-sm text-muted-foreground">0%</span>
                    </div>
                    <Progress value={0} className="h-2" />
                    <p className="text-xs text-muted-foreground mt-1">Scheduled for Apr 20, 2023</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Your recent dental care activities</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex gap-3">
                    <div className="relative mt-1">
                      <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                      <div className="absolute top-2 bottom-0 left-1 -ml-px w-px bg-muted-foreground/20"></div>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Prescription Issued</p>
                      <p className="text-xs text-muted-foreground">Dr. Sarah Johnson prescribed Amoxicillin</p>
                      <p className="text-xs text-muted-foreground mt-1">Feb 20, 2023</p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <div className="relative mt-1">
                      <div className="w-2 h-2 rounded-full bg-green-500"></div>
                      <div className="absolute top-2 bottom-0 left-1 -ml-px w-px bg-muted-foreground/20"></div>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Appointment Completed</p>
                      <p className="text-xs text-muted-foreground">Dental cleaning with Dr. Smith</p>
                      <p className="text-xs text-muted-foreground mt-1">Feb 20, 2023</p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <div className="relative mt-1">
                      <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                      <div className="absolute top-2 bottom-0 left-1 -ml-px w-px bg-muted-foreground/20"></div>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Payment Made</p>
                      <p className="text-xs text-muted-foreground">GHS 200.00 for dental services</p>
                      <p className="text-xs text-muted-foreground mt-1">Feb 20, 2023</p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <div className="mt-1">
                      <div className="w-2 h-2 rounded-full bg-purple-500"></div>
                    </div>
                    <div>
                      <p className="text-sm font-medium">X-Ray Taken</p>
                      <p className="text-xs text-muted-foreground">Full mouth X-ray for treatment planning</p>
                      <p className="text-xs text-muted-foreground mt-1">Jan 10, 2023</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Your Dental Team</CardTitle>
                <CardDescription>Healthcare professionals managing your care</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src="/placeholder.svg?height=40&width=40" />
                      <AvatarFallback>SJ</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">Dr. Sarah Johnson</p>
                      <p className="text-sm text-muted-foreground">Primary Dentist</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src="/placeholder.svg?height=40&width=40" />
                      <AvatarFallback>ML</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">Dr. Michael Lee</p>
                      <p className="text-sm text-muted-foreground">Orthodontist</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src="/placeholder.svg?height=40&width=40" />
                      <AvatarFallback>NE</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">Nurse Emily</p>
                      <p className="text-sm text-muted-foreground">Dental Hygienist</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Health Reminders</CardTitle>
                <CardDescription>Important reminders for your dental health</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="bg-yellow-50 border-l-4 border-yellow-400 p-3">
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <Bell className="h-5 w-5 text-yellow-400" />
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-yellow-800">Prescription Refill Needed</p>
                        <p className="text-xs text-yellow-700 mt-1">
                          Your Amoxicillin prescription needs refill in 3 days
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-blue-50 border-l-4 border-blue-400 p-3">
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <Bell className="h-5 w-5 text-blue-400" />
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-blue-800">Upcoming Appointment</p>
                        <p className="text-xs text-blue-700 mt-1">Remember your appointment on Mar 15, 2023</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-green-50 border-l-4 border-green-400 p-3">
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <Bell className="h-5 w-5 text-green-400" />
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-green-800">Dental Hygiene Reminder</p>
                        <p className="text-xs text-green-700 mt-1">Remember to floss daily and brush twice a day</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="appointments" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Appointments</CardTitle>
                  <CardDescription>Manage your dental appointments</CardDescription>
                </div>
                <Button>
                  <Calendar className="mr-2 h-4 w-4" />
                  Book New Appointment
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <p>Detailed appointments management would go here.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="records" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Medical Records</CardTitle>
              <CardDescription>View your complete dental history</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Medical records content would go here.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="billing" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Billing & Payments</CardTitle>
              <CardDescription>Manage your bills and payment methods</CardDescription>
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
