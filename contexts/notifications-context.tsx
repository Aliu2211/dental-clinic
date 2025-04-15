"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { useAuth } from "@/hooks/use-auth"
import {
  type Notification,
  getNotificationsForUser,
  markNotificationAsRead,
  getUnreadNotificationCount,
} from "@/lib/data-sharing-service"

interface NotificationsContextType {
  notifications: Notification[]
  unreadCount: number
  markAsRead: (notificationId: string) => void
  refreshNotifications: () => void
  isLoading: boolean
}

const NotificationsContext = createContext<NotificationsContextType | undefined>(undefined)

export function NotificationsProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth()
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [unreadCount, setUnreadCount] = useState(0)
  const [isLoading, setIsLoading] = useState(true)

  const refreshNotifications = () => {
    if (user) {
      setNotifications(getNotificationsForUser(user.id))
      setUnreadCount(getUnreadNotificationCount(user.id))
    } else {
      setNotifications([])
      setUnreadCount(0)
    }
    setIsLoading(false)
  }

  useEffect(() => {
    refreshNotifications()

    // Set up polling for new notifications
    const interval = setInterval(refreshNotifications, 30000) // Check every 30 seconds

    return () => clearInterval(interval)
  }, [user])

  const markAsRead = (notificationId: string) => {
    if (user && markNotificationAsRead(notificationId, user.id)) {
      refreshNotifications()
    }
  }

  const value = {
    notifications,
    unreadCount,
    markAsRead,
    refreshNotifications,
    isLoading,
  }

  return <NotificationsContext.Provider value={value}>{children}</NotificationsContext.Provider>
}

export function useNotifications() {
  const context = useContext(NotificationsContext)
  if (context === undefined) {
    throw new Error("useNotifications must be used within a NotificationsProvider")
  }
  return context
}
