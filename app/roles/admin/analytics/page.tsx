"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar, Download, BarChart, LineChart, PieChart, Users, CreditCard, Activity } from "lucide-react"

// Add imports for animations
import { motion } from "framer-motion"

export default function AnalyticsPage() {
  return (
    <motion.div className="space-y-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
      <motion.div
        className="flex items-center justify-between"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1, type: "spring", stiffness: 100 }}
      >
        <h2 className="text-3xl font-bold tracking-tight">Analytics</h2>
        <div className="flex items-center space-x-2">
          <Select defaultValue="30">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7">Last 7 days</SelectItem>
              <SelectItem value="30">Last 30 days</SelectItem>
              <SelectItem value="90">Last 90 days</SelectItem>
              <SelectItem value="365">Last year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Calendar className="mr-2 h-4 w-4" />
            Custom Range
          </Button>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="patients">Patients</TabsTrigger>
            <TabsTrigger value="appointments">Appointments</TabsTrigger>
            <TabsTrigger value="revenue">Revenue</TabsTrigger>
            <TabsTrigger value="blockchain">Blockchain</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Patients</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">750</div>
                  <p className="text-xs text-muted-foreground">
                    <span className="text-green-500">+12%</span> from last month
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Appointments</CardTitle>
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">432</div>
                  <p className="text-xs text-muted-foreground">
                    <span className="text-green-500">+8%</span> from last month
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Revenue</CardTitle>
                  <CreditCard className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">GHS 45,231.89</div>
                  <p className="text-xs text-muted-foreground">
                    <span className="text-green-500">+20.1%</span> from last month
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Users</CardTitle>
                  <Activity className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">24</div>
                  <p className="text-xs text-muted-foreground">
                    <span className="text-green-500">+5%</span> from last month
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
              <Card className="col-span-4">
                <CardHeader>
                  <CardTitle>Revenue Overview</CardTitle>
                  <CardDescription>Monthly revenue for the current year</CardDescription>
                </CardHeader>
                <CardContent className="h-[300px]">
                  <div className="flex h-full items-center justify-center">
                    <BarChart className="h-16 w-16 text-muted-foreground" />
                    <p className="ml-2 text-sm text-muted-foreground">Revenue chart would be displayed here</p>
                  </div>
                </CardContent>
              </Card>
              <Card className="col-span-3">
                <CardHeader>
                  <CardTitle>Patient Distribution</CardTitle>
                  <CardDescription>Distribution by age group</CardDescription>
                </CardHeader>
                <CardContent className="h-[300px]">
                  <div className="flex h-full items-center justify-center">
                    <PieChart className="h-16 w-16 text-muted-foreground" />
                    <p className="ml-2 text-sm text-muted-foreground">
                      Patient distribution chart would be displayed here
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader>
                  <CardTitle>Top Procedures</CardTitle>
                  <CardDescription>Most common dental procedures</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium">Dental Cleaning</p>
                        <p className="text-xs text-muted-foreground">32% of procedures</p>
                      </div>
                      <p className="text-sm font-medium">245</p>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium">Fillings</p>
                        <p className="text-xs text-muted-foreground">28% of procedures</p>
                      </div>
                      <p className="text-sm font-medium">210</p>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium">Root Canal</p>
                        <p className="text-xs text-muted-foreground">15% of procedures</p>
                      </div>
                      <p className="text-sm font-medium">112</p>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium">Extractions</p>
                        <p className="text-xs text-muted-foreground">12% of procedures</p>
                      </div>
                      <p className="text-sm font-medium">89</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Appointment Trends</CardTitle>
                  <CardDescription>Weekly appointment distribution</CardDescription>
                </CardHeader>
                <CardContent className="h-[300px]">
                  <div className="flex h-full items-center justify-center">
                    <LineChart className="h-16 w-16 text-muted-foreground" />
                    <p className="ml-2 text-sm text-muted-foreground">
                      Appointment trends chart would be displayed here
                    </p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Staff Performance</CardTitle>
                  <CardDescription>Appointments handled by staff</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium">Dr. Sarah Johnson</p>
                        <p className="text-xs text-muted-foreground">Dentist</p>
                      </div>
                      <p className="text-sm font-medium">124 patients</p>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium">Dr. Michael Lee</p>
                        <p className="text-xs text-muted-foreground">Dentist</p>
                      </div>
                      <p className="text-sm font-medium">98 patients</p>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium">Nurse Emily</p>
                        <p className="text-xs text-muted-foreground">Nurse</p>
                      </div>
                      <p className="text-sm font-medium">210 patients</p>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium">Receptionist Lisa</p>
                        <p className="text-xs text-muted-foreground">Receptionist</p>
                      </div>
                      <p className="text-sm font-medium">432 bookings</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="patients" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Patient Analytics</CardTitle>
                <CardDescription>Detailed patient statistics and trends</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Patient analytics content would go here.</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="appointments" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Appointment Analytics</CardTitle>
                <CardDescription>Detailed appointment statistics and trends</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Appointment analytics content would go here.</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="revenue" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Revenue Analytics</CardTitle>
                <CardDescription>Detailed revenue statistics and trends</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Revenue analytics content would go here.</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="blockchain" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Blockchain Analytics</CardTitle>
                <CardDescription>Blockchain transaction statistics and trends</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Blockchain analytics content would go here.</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </motion.div>
    </motion.div>
  )
}
