"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Users, Calendar, Download, DollarSign, Clock, Activity } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"

export default function AdminDashboardPage() {
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState("overview")

  // Mock data for the dashboard
  const stats = {
    totalUsers: 120,
    userGrowth: 10,
    activeDoctors: 15,
    doctorGrowth: 2,
    appointmentsToday: 24,
    appointmentGrowth: 5,
    revenue: 45231.89,
    revenueGrowth: 20.1,
    serverUptime: 99.9,
    databaseStatus: "Healthy",
    apiResponseTime: 120,
    blockchainSync: "In Sync",
    cpuUsage: 45,
    memoryUsage: 32,
    diskSpace: 28,
    networkUsage: 15,
  }

  const recentActivities = [
    { type: "User Login", user: "Admin User", time: "2 minutes ago" },
    { type: "Patient Record Updated", user: "Dr. Sarah Johnson", time: "15 minutes ago" },
    { type: "New Appointment", user: "Receptionist", time: "1 hour ago" },
    { type: "Payment Processed", user: "Cashier", time: "2 hours ago" },
    { type: "System Backup", user: "System", time: "4 hours ago" },
    { type: "New User Created", user: "Admin User", time: "Yesterday" },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Admin Dashboard</h2>
        <div className="flex items-center space-x-2">
          <div className="bg-background border rounded-md px-3 py-2 text-sm">Date Range</div>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Download
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="transition-all hover:shadow-md">
          <CardHeader className="bg-primary/5 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Patients</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-3xl font-bold">750</p>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-500 font-medium">↑ 12%</span> vs previous period
                </p>
              </div>
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Users className="h-6 w-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="transition-all hover:shadow-md">
          <CardHeader className="bg-blue-500/5 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Appointments</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-3xl font-bold">128</p>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-500 font-medium">↑ 8%</span> vs previous period
                </p>
              </div>
              <div className="h-12 w-12 rounded-full bg-blue-500/10 flex items-center justify-center">
                <Calendar className="h-6 w-6 text-blue-500" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="transition-all hover:shadow-md">
          <CardHeader className="bg-green-500/5 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Revenue</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-3xl font-bold">$24,500</p>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-500 font-medium">↑ 15%</span> vs previous period
                </p>
              </div>
              <div className="h-12 w-12 rounded-full bg-green-500/10 flex items-center justify-center">
                <DollarSign className="h-6 w-6 text-green-500" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="transition-all hover:shadow-md">
          <CardHeader className="bg-amber-500/5 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Avg. Wait Time</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-3xl font-bold">18 min</p>
                <p className="text-xs text-muted-foreground">
                  <span className="text-red-500 font-medium">↑ 3%</span> vs previous period
                </p>
              </div>
              <div className="h-12 w-12 rounded-full bg-amber-500/10 flex items-center justify-center">
                <Clock className="h-6 w-6 text-amber-500" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4 transition-all hover:shadow-md">
          <CardHeader>
            <CardTitle>Appointments</CardTitle>
            <CardDescription>Recent and upcoming appointments</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="flex items-center justify-between border-b pb-2">
                  <div className="flex items-center gap-2">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <Users className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">Patient {i}</p>
                      <p className="text-xs text-muted-foreground">Dr. Smith • {i + 8}:00 AM</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">Confirmed</span>
                    <Button variant="ghost" size="sm">
                      View
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        <Card className="col-span-3 transition-all hover:shadow-md">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest system activities</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity, i) => (
                <div key={i} className="flex items-center gap-2 border-b pb-2">
                  <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                    <Activity className="h-4 w-4 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">{activity.type}</p>
                    <p className="text-xs text-muted-foreground">
                      {activity.user} • {activity.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="transition-all hover:shadow-md">
          <CardHeader>
            <CardTitle>New Patients</CardTitle>
            <CardDescription>Patients registered this month</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="flex items-center gap-2 border-b pb-2">
                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <Users className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Patient Name {i}</p>
                    <p className="text-xs text-muted-foreground">Registered {i} days ago</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        <Card className="transition-all hover:shadow-md">
          <CardHeader>
            <CardTitle>Staff Performance</CardTitle>
            <CardDescription>Top performing staff members</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="flex items-center justify-between border-b pb-2">
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                      <Users className="h-4 w-4 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Dr. Smith {i}</p>
                      <p className="text-xs text-muted-foreground">Dentist</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium">{90 + i}%</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        <Card className="transition-all hover:shadow-md">
          <CardHeader>
            <CardTitle>System Status</CardTitle>
            <CardDescription>Current system health and metrics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <p className="text-sm">Server Uptime</p>
                <p className="text-sm font-medium">{stats.serverUptime}%</p>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-sm">Database Status</p>
                <p className="text-sm font-medium">{stats.databaseStatus}</p>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-sm">API Response Time</p>
                <p className="text-sm font-medium">{stats.apiResponseTime}ms</p>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-sm">Blockchain Sync</p>
                <p className="text-sm font-medium">{stats.blockchainSync}</p>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-sm">CPU Usage</p>
                <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full bg-green-500 rounded-full" style={{ width: `${stats.cpuUsage}%` }}></div>
                </div>
                <p className="text-sm font-medium">{stats.cpuUsage}%</p>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-sm">Memory Usage</p>
                <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-500 rounded-full" style={{ width: `${stats.memoryUsage}%` }}></div>
                </div>
                <p className="text-sm font-medium">{stats.memoryUsage}%</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
