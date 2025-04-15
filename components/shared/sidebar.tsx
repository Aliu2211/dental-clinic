"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { UserRole } from "@/lib/auth"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/contexts/auth-context"
import {
  LayoutDashboard,
  Users,
  Calendar,
  FileText,
  Settings,
  CreditCard,
  Activity,
  Menu,
  Shield,
  X,
  FileDigit,
  BarChart,
  UserPlus,
  DollarSign,
  Clock,
  Stethoscope,
  Pill,
  PackageOpen,
  ClipboardList,
  BookOpen,
  HeartPulse,
} from "lucide-react"
import { motion } from "framer-motion"

interface SidebarProps {
  className?: string
}

export function Sidebar({ className }: SidebarProps) {
  const pathname = usePathname()
  const [expanded, setExpanded] = useState(true)
  const { user } = useAuth()
  const userRole = user?.role

  // Define navigation items based on user role
  const getNavItems = () => {
    switch (userRole) {
      case UserRole.ADMIN:
        return [
          { name: "Dashboard", href: "/roles/admin/dashboard", icon: LayoutDashboard },
          { name: "Staff", href: "/roles/admin/users", icon: Users },
          { name: "Patients", href: "/roles/admin/patients", icon: UserPlus },
          { name: "Logs", href: "/roles/admin/logs", icon: FileDigit },
          { name: "Analytics", href: "/roles/admin/analytics", icon: BarChart },
          { name: "Settings", href: "/roles/admin/settings", icon: Settings },
        ]
      case UserRole.DOCTOR:
        return [
          { name: "Dashboard", href: "/roles/doctor/dashboard", icon: LayoutDashboard },
          { name: "Patients", href: "/roles/doctor/patients", icon: Users },
          { name: "Prescriptions", href: "/roles/doctor/prescriptions", icon: FileText },
          { name: "Appointments", href: "/roles/doctor/appointments", icon: Calendar },
          { name: "Medical Records", href: "/roles/doctor/medical-records", icon: FileText },
          { name: "Treatment Plans", href: "/roles/doctor/treatment-plans", icon: ClipboardList },
          { name: "Lab Results", href: "/roles/doctor/lab-results", icon: FileDigit },
          { name: "Settings", href: "/roles/doctor/settings", icon: Settings },
        ]
      case UserRole.NURSE:
        return [
          { name: "Dashboard", href: "/roles/nurse/dashboard", icon: LayoutDashboard },
          { name: "Vitals", href: "/roles/nurse/vitals", icon: Activity },
          { name: "Patient Care", href: "/roles/nurse/patient-care", icon: HeartPulse },
          { name: "Supplies", href: "/roles/nurse/supplies", icon: PackageOpen },
          { name: "Medications", href: "/roles/nurse/medications", icon: Pill },
          { name: "Treatment Rooms", href: "/roles/nurse/treatment-rooms", icon: Stethoscope },
          { name: "Patient Education", href: "/roles/nurse/education", icon: BookOpen },
          { name: "Settings", href: "/roles/nurse/settings", icon: Settings },
        ]
      case UserRole.RECEPTIONIST:
        return [
          { name: "Dashboard", href: "/roles/receptionist/dashboard", icon: LayoutDashboard },
          { name: "Appointments", href: "/roles/receptionist/appointments", icon: Calendar },
          { name: "Patient Registration", href: "/roles/receptionist/registration", icon: UserPlus },
          { name: "Check-ins", href: "/roles/receptionist/check-ins", icon: Users },
          { name: "Waiting Room", href: "/roles/receptionist/waiting-room", icon: Clock },
          { name: "Settings", href: "/roles/receptionist/settings", icon: Settings },
        ]
      case UserRole.CASHIER:
        return [
          { name: "Dashboard", href: "/roles/cashier/dashboard", icon: LayoutDashboard },
          { name: "Billing", href: "/roles/cashier/billing", icon: CreditCard },
          { name: "Payments", href: "/roles/cashier/payments", icon: DollarSign },
          { name: "Insurance", href: "/roles/cashier/insurance", icon: Shield },
          { name: "Reports", href: "/roles/cashier/reports", icon: FileText },
          { name: "Settings", href: "/roles/cashier/settings", icon: Settings },
        ]
      case UserRole.PATIENT:
        return [
          { name: "Dashboard", href: "/roles/patient/dashboard", icon: LayoutDashboard },
          { name: "Records", href: "/roles/patient/records", icon: FileText },
          { name: "Appointments", href: "/roles/patient/appointments", icon: Calendar },
          { name: "Prescriptions", href: "/roles/patient/prescriptions", icon: Pill },
          { name: "Billing", href: "/roles/patient/billing", icon: CreditCard },
          { name: "Settings", href: "/roles/patient/settings", icon: Settings },
        ]
      default:
        return [{ name: "Dashboard", href: "/dashboard", icon: LayoutDashboard }]
    }
  }

  const navItems = getNavItems()

  // Animation variants
  const sidebarVariants = {
    expanded: { width: "16rem" },
    collapsed: { width: "4rem" },
  }

  const itemVariants = {
    expanded: { opacity: 1, x: 0 },
    collapsed: { opacity: 0, x: -10 },
  }

  return (
    <motion.div
      className={cn("flex h-screen flex-col border-r bg-background transition-all duration-300", className)}
      initial={expanded ? "expanded" : "collapsed"}
      animate={expanded ? "expanded" : "collapsed"}
      variants={sidebarVariants}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <div className="flex h-16 items-center border-b px-4">
        <div className="flex items-center gap-2">
          <Shield className="h-6 w-6 text-primary" />
          <motion.span className="text-xl font-bold" variants={itemVariants} transition={{ duration: 0.2 }}>
            {expanded && "Dentonic"}
          </motion.span>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="ml-auto"
          onClick={() => setExpanded(!expanded)}
          aria-label={expanded ? "Collapse sidebar" : "Expand sidebar"}
        >
          {expanded ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>
      <nav className="flex-1 overflow-y-auto p-2">
        <ul className="space-y-2">
          {navItems.map((item, index) => (
            <motion.li
              key={item.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05, duration: 0.3 }}
            >
              <Link href={item.href}>
                <Button
                  variant="ghost"
                  className={cn(
                    "w-full justify-start transition-all hover:bg-primary/10",
                    pathname === item.href ? "bg-primary/10 text-primary" : "hover:text-primary",
                  )}
                >
                  <item.icon className="mr-2 h-5 w-5" />
                  <motion.span variants={itemVariants} transition={{ duration: 0.2 }}>
                    {expanded && item.name}
                  </motion.span>
                </Button>
              </Link>
            </motion.li>
          ))}
        </ul>
      </nav>
    </motion.div>
  )
}
