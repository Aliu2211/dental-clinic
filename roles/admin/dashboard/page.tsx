"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Users, Calendar, Download, DollarSign, Clock } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
// Add imports for animations
import { motion } from "framer-motion"
import { DateRangePicker } from "@/components/date-range-picker"
import { RecentAppointments } from "@/components/recent-appointments"
import { RecentActivity } from "@/components/recent-activity"
import { NewPatients } from "@/components/new-patients"
import { StaffPerformance } from "@/components/staff-performance"
import { SystemStatus } from "@/components/system-status"

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

  // Replace the return statement with an animated version
  return (
    <motion.div className="space-y-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
      <div className="flex items-center justify-between">
        <motion.h2
          className="text-3xl font-bold tracking-tight"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1, type: "spring", stiffness: 100 }}
        >
          Admin Dashboard
        </motion.h2>
        <motion.div
          className="flex items-center space-x-2"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
        >
          <DateRangePicker />
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Download
          </Button>
        </motion.div>
      </div>

      <motion.div
        className="grid gap-6 md:grid-cols-2 lg:grid-cols-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
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
      </motion.div>

      <motion.div
        className="grid gap-6 md:grid-cols-2 lg:grid-cols-7"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        <Card className="col-span-4 transition-all hover:shadow-md">
          <CardHeader>
            <CardTitle>Appointments</CardTitle>
            <CardDescription>Recent and upcoming appointments</CardDescription>
          </CardHeader>
          <CardContent>
            <RecentAppointments />
          </CardContent>
        </Card>
        <Card className="col-span-3 transition-all hover:shadow-md">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest system activities</CardDescription>
          </CardHeader>
          <CardContent>
            <RecentActivity />
          </CardContent>
        </Card>
      </motion.div>

      <motion.div
        className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        <Card className="transition-all hover:shadow-md">
          <CardHeader>
            <CardTitle>New Patients</CardTitle>
            <CardDescription>Patients registered this month</CardDescription>
          </CardHeader>
          <CardContent>
            <NewPatients />
          </CardContent>
        </Card>
        <Card className="transition-all hover:shadow-md">
          <CardHeader>
            <CardTitle>Staff Performance</CardTitle>
            <CardDescription>Top performing staff members</CardDescription>
          </CardHeader>
          <CardContent>
            <StaffPerformance />
          </CardContent>
        </Card>
        <Card className="transition-all hover:shadow-md">
          <CardHeader>
            <CardTitle>System Status</CardTitle>
            <CardDescription>Current system health and metrics</CardDescription>
          </CardHeader>
          <CardContent>
            <SystemStatus />
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  )
}
