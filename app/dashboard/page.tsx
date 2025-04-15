"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import { UserRole } from "@/lib/auth"

export default function DashboardPage() {
  const { user, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading) {
      if (!user) {
        router.push("/auth/login")
      } else {
        // Redirect based on user role
        const roleRoutes = {
          [UserRole.ADMIN]: "/roles/admin/dashboard",
          [UserRole.DOCTOR]: "/roles/doctor/dashboard",
          [UserRole.NURSE]: "/roles/nurse/dashboard",
          [UserRole.RECEPTIONIST]: "/roles/receptionist/dashboard",
          [UserRole.CASHIER]: "/roles/cashier/dashboard",
          [UserRole.PATIENT]: "/roles/patient/dashboard",
        }

        router.push(roleRoutes[user.role])
      }
    }
  }, [user, isLoading, router])

  // Show loading state while checking authentication
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="text-center">
        <div className="mb-4 h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent mx-auto"></div>
        <p className="text-lg font-medium">Redirecting to your dashboard...</p>
      </div>
    </div>
  )
}
