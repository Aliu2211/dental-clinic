"use client"

import type React from "react"

import { useContext, useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"
import { AuthContext } from "@/contexts/auth-context"
import { UserRole } from "@/lib/auth"
import Link from "next/link"
import {
  Users,
  Calendar,
  ClipboardList,
  Activity,
  FileText,
  Home,
  FlaskRoundIcon as Flask,
  Settings,
  LogOut,
} from "lucide-react"

export default function DoctorLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const authContext = useContext(AuthContext)
  const user = authContext?.user
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    if (!authContext?.isLoading && (!user || user.role !== UserRole.DOCTOR)) {
      router.push("/auth/login")
    }
  }, [user, authContext?.isLoading, router])

  if (authContext?.isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!user || user.role !== UserRole.DOCTOR) {
    return null
  }

  const navItems = [
    { href: "/roles/doctor/dashboard", label: "Dashboard", icon: Home },
    { href: "/roles/doctor/patients", label: "Patients", icon: Users },
    { href: "/roles/doctor/appointments", label: "Appointments", icon: Calendar },
    { href: "/roles/doctor/prescriptions", label: "Prescriptions", icon: ClipboardList },
    { href: "/roles/doctor/medical-records", label: "Medical Records", icon: FileText },
    { href: "/roles/doctor/treatment-plans", label: "Treatment Plans", icon: Activity },
    { href: "/roles/doctor/lab-results", label: "Lab Results", icon: Flask },
    { href: "/roles/doctor/settings", label: "Settings", icon: Settings },
  ]

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      {/* Sidebar */}
      <div className="hidden md:flex md:w-64 md:flex-col">
        <div className="flex flex-col flex-grow pt-5 overflow-y-auto bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700">
          <div className="flex items-center flex-shrink-0 px-4 mb-5">
            <span className="text-xl font-semibold">Dentonic</span>
            <span className="ml-2 px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">Doctor</span>
          </div>
          <div className="flex flex-col flex-grow">
            <nav className="flex-1 px-2 pb-4 space-y-1">
              {navItems.map((item) => {
                const isActive = pathname === item.href
                const Icon = item.icon
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center px-4 py-2 text-sm font-medium rounded-md ${
                      isActive
                        ? "bg-blue-100 text-blue-900 dark:bg-blue-900 dark:text-blue-100"
                        : "text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                    }`}
                  >
                    <Icon className="mr-3 h-5 w-5" />
                    {item.label}
                  </Link>
                )
              })}
              <div className="pt-4 mt-4 border-t border-gray-200 dark:border-gray-700">
                <button
                  onClick={() => router.push("/auth/logout")}
                  className="flex items-center px-4 py-2 text-sm font-medium text-red-600 rounded-md hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20 w-full"
                >
                  <LogOut className="mr-3 h-5 w-5" />
                  Logout
                </button>
              </div>
            </nav>
          </div>
          <div className="flex-shrink-0 p-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="h-10 w-10 rounded-full bg-gradient-to-r from-blue-500 to-teal-400 flex items-center justify-center text-white font-bold">
                  {user.name.charAt(0)}
                </div>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{user.name}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Doctor</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Top header */}
        <header className="bg-white dark:bg-gray-800 shadow-sm z-10">
          <div className="px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <button
                  type="button"
                  className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
                >
                  <span className="sr-only">Open sidebar</span>
                  <svg
                    className="h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </button>
                <h1 className="ml-2 md:ml-0 text-lg font-semibold text-gray-900 dark:text-white">
                  {navItems.find((item) => item.href === pathname)?.label || "Dashboard"}
                </h1>
              </div>
              <div className="flex items-center">
                <button
                  type="button"
                  className="flex items-center p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <span className="sr-only">View notifications</span>
                  <svg
                    className="h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                    />
                  </svg>
                  <span className="flex absolute h-2 w-2 top-0 right-0 -mt-1 -mr-1">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                  </span>
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto bg-gray-100 dark:bg-gray-900 p-4 sm:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  )
}
