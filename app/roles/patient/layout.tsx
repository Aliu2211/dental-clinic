"use client"

import type React from "react"

import { useContext, useEffect } from "react"
import { useRouter } from "next/navigation"
import { AuthContext } from "@/contexts/auth-context"
import { UserRole } from "@/lib/auth"
import { Home, Calendar, FileText, CreditCard, Pill, Settings, LogOut, User } from "lucide-react"

export default function PatientLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { user, isLoading, logout } = useContext(AuthContext)
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && (!user || user.role !== UserRole.PATIENT)) {
      router.push("/auth/login")
    }
  }, [user, isLoading, router])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!user || user.role !== UserRole.PATIENT) {
    return null
  }

  const navigation = [
    { name: "Dashboard", href: "/roles/patient/dashboard", icon: Home },
    { name: "Appointments", href: "/roles/patient/appointments", icon: Calendar },
    { name: "Medical Records", href: "/roles/patient/records", icon: FileText },
    { name: "Billing", href: "/roles/patient/billing", icon: CreditCard },
    { name: "Prescriptions", href: "/roles/patient/prescriptions", icon: Pill },
    { name: "Settings", href: "/roles/patient/settings", icon: Settings },
  ]

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      {/* Sidebar */}
      <div className="hidden md:flex md:w-64 md:flex-col">
        <div className="flex flex-col flex-grow pt-5 overflow-y-auto bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700">
          <div className="flex items-center flex-shrink-0 px-4">
            <img className="h-8 w-auto" src="/placeholder.svg?height=32&width=32" alt="Dentonic" />
            <h1 className="ml-2 text-xl font-semibold text-gray-900 dark:text-white">Dentonic</h1>
          </div>
          <div className="mt-5 flex-grow flex flex-col">
            <nav className="flex-1 px-2 pb-4 space-y-1">
              {navigation.map((item) => {
                const isActive = typeof window !== "undefined" && window.location.pathname.startsWith(item.href)
                return (
                  <a
                    key={item.name}
                    href={item.href}
                    className={`${
                      isActive
                        ? "bg-gray-100 dark:bg-gray-700 text-primary"
                        : "text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                    } group flex items-center px-2 py-2 text-sm font-medium rounded-md`}
                  >
                    <item.icon
                      className={`${
                        isActive ? "text-primary" : "text-gray-400 dark:text-gray-400 group-hover:text-gray-500"
                      } mr-3 flex-shrink-0 h-5 w-5`}
                      aria-hidden="true"
                    />
                    {item.name}
                  </a>
                )
              })}
            </nav>
          </div>
          <div className="flex-shrink-0 flex border-t border-gray-200 dark:border-gray-700 p-4">
            <div className="flex items-center">
              <div>
                <img
                  className="inline-block h-9 w-9 rounded-full"
                  src={user.profileImage || "/placeholder.svg?height=36&width=36"}
                  alt=""
                />
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300">{user.name}</p>
                <button
                  onClick={logout}
                  className="text-xs font-medium text-gray-500 dark:text-gray-400 group flex items-center"
                >
                  <LogOut className="mr-1 h-4 w-4" />
                  Sign out
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile header */}
      <div className="md:hidden flex items-center justify-between p-4 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center">
          <img className="h-8 w-auto" src="/placeholder.svg?height=32&width=32" alt="Dentonic" />
          <h1 className="ml-2 text-xl font-semibold text-gray-900 dark:text-white">Dentonic</h1>
        </div>
        <div className="flex items-center space-x-4">
          <button className="text-gray-500 dark:text-gray-400">
            <User className="h-6 w-6" />
          </button>
        </div>
      </div>

      {/* Mobile navigation */}
      <div className="fixed bottom-0 left-0 right-0 md:hidden bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 z-10">
        <div className="flex justify-around">
          {navigation.slice(0, 5).map((item) => {
            const isActive = typeof window !== "undefined" && window.location.pathname.startsWith(item.href)
            return (
              <a
                key={item.name}
                href={item.href}
                className={`${
                  isActive ? "text-primary" : "text-gray-500 dark:text-gray-400"
                } flex flex-col items-center py-2 px-1`}
              >
                <item.icon className="h-6 w-6" />
                <span className="text-xs mt-1">{item.name}</span>
              </a>
            )
          })}
        </div>
      </div>

      {/* Main content */}
      <div className="flex flex-col flex-1 overflow-hidden">
        <main className="flex-1 relative overflow-y-auto focus:outline-none p-4 md:p-6">{children}</main>
      </div>
    </div>
  )
}
