"use client"

import type React from "react"

import { createContext, useContext, useState, useEffect, useMemo, useCallback } from "react"
import { useRouter } from "next/navigation"
import { type User, UserRole, findUserByCredentials, hasPermission as checkPermission, Permission } from "@/lib/auth"

interface AuthContextType {
  user: User | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
  hasPermission: (permission: Permission) => boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  // Load user from localStorage on initial render
  useEffect(() => {
    try {
      const storedUser = typeof window !== "undefined" ? localStorage.getItem("user") : null
      if (storedUser) {
        setUser(JSON.parse(storedUser))
      }
    } catch (error) {
      console.error("Failed to parse stored user:", error)
      if (typeof window !== "undefined") {
        localStorage.removeItem("user")
      }
    } finally {
      setIsLoading(false)
    }
  }, [])

  const login = useCallback(async (email: string, password: string): Promise<boolean> => {
    try {
      // In a real app, this would be an API call
      const user = findUserByCredentials(email, password)

      if (user) {
        setUser(user)
        if (typeof window !== "undefined") {
          localStorage.setItem("user", JSON.stringify(user))
        }
        return true
      }
      return false
    } catch (error) {
      console.error("Login error:", error)
      return false
    }
  }, [])

  const logout = useCallback(() => {
    setUser(null)
    if (typeof window !== "undefined") {
      localStorage.removeItem("user")
    }
    router.push("/auth/login")
  }, [router])

  const hasPermission = useCallback(
    (permission: Permission): boolean => {
      return checkPermission(user, permission)
    },
    [user],
  )

  // Memoize the context value to prevent unnecessary re-renders
  const contextValue = useMemo(
    () => ({
      user,
      isLoading,
      login,
      logout,
      hasPermission,
    }),
    [user, isLoading, login, logout, hasPermission],
  )

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

// Re-export UserRole and Permission for convenience
export { AuthContext, UserRole, Permission }
