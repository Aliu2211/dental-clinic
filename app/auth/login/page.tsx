"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Shield, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAuth } from "@/contexts/auth-context"
import { mockUsers, UserRole } from "@/lib/auth"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { login } = useAuth()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    try {
      const success = await login(email, password)
      if (success) {
        // Find the user to determine their role
        const user = mockUsers.find((u) => u.email === email)
        if (user) {
          // Redirect based on role
          const roleRoutes = {
            [UserRole.ADMIN]: "/roles/admin/dashboard",
            [UserRole.DOCTOR]: "/roles/doctor/dashboard",
            [UserRole.NURSE]: "/roles/nurse/dashboard",
            [UserRole.RECEPTIONIST]: "/roles/receptionist/dashboard",
            [UserRole.CASHIER]: "/roles/cashier/dashboard",
            [UserRole.PATIENT]: "/roles/patient/dashboard",
          }
          router.push(roleRoutes[user.role] || "/dashboard")
        } else {
          router.push("/dashboard")
        }
      } else {
        setError("Invalid email or password")
      }
    } catch (err) {
      setError("An error occurred during login")
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  const handleQuickLogin = async (userEmail: string) => {
    setEmail(userEmail)
    setPassword("password") // All mock users have the same password
    setIsLoading(true)

    try {
      const success = await login(userEmail, "password")
      if (success) {
        // Find the user to determine their role
        const user = mockUsers.find((u) => u.email === userEmail)
        if (user) {
          // Redirect based on role
          const roleRoutes = {
            [UserRole.ADMIN]: "/roles/admin/dashboard",
            [UserRole.DOCTOR]: "/roles/doctor/dashboard",
            [UserRole.NURSE]: "/roles/nurse/dashboard",
            [UserRole.RECEPTIONIST]: "/roles/receptionist/dashboard",
            [UserRole.CASHIER]: "/roles/cashier/dashboard",
            [UserRole.PATIENT]: "/roles/patient/dashboard",
          }
          router.push(roleRoutes[user.role])
        } else {
          router.push("/dashboard")
        }
      } else {
        setError("Invalid email or password")
      }
    } catch (err) {
      setError("An error occurred during login")
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-950 p-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="space-y-1 text-center">
          <div className="flex justify-center mb-2">
            <Shield className="h-12 w-12 text-primary" />
          </div>
          <CardTitle className="text-2xl font-bold">Dentonic</CardTitle>
          <CardDescription>Enter your credentials to access your account</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Staff Accounts Only</AlertTitle>
            <AlertDescription>
              This login is for staff members only. New accounts can only be created by administrators.
            </AlertDescription>
          </Alert>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {error && <p className="text-sm text-red-500">{error}</p>}
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Logging in..." : "Log In"}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">Demo Login Options</span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleQuickLogin("admin@dentonic.com")}
              disabled={isLoading}
            >
              Login as Admin
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleQuickLogin("doctor@dentonic.com")}
              disabled={isLoading}
            >
              Login as Doctor
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleQuickLogin("drwilson@dentonic.com")}
              disabled={isLoading}
            >
              Login as Dr. Wilson
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleQuickLogin("nurse@dentonic.com")}
              disabled={isLoading}
            >
              Login as Nurse
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleQuickLogin("receptionist@dentonic.com")}
              disabled={isLoading}
            >
              Login as Receptionist
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleQuickLogin("cashier@dentonic.com")}
              disabled={isLoading}
            >
              Login as Cashier
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}

function UserRoleToString(role: number): string {
  const roles = ["Admin", "Doctor", "Nurse", "Receptionist", "Cashier", "Patient"]
  return roles[role] || "Unknown"
}
