"use client"

import { useState } from "react"
import { Bell } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { useNotifications } from "@/contexts/notifications-context"
import { NotificationType } from "@/lib/data-sharing-service"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"

export function NotificationsPopover() {
  const { notifications, unreadCount, markAsRead } = useNotifications()
  const [open, setOpen] = useState(false)

  const getNotificationIcon = (type: NotificationType) => {
    switch (type) {
      case NotificationType.PATIENT_ASSIGNED:
        return "👤"
      case NotificationType.APPOINTMENT_SCHEDULED:
        return "📅"
      case NotificationType.MEDICAL_RECORD_CREATED:
        return "📋"
      case NotificationType.PRESCRIPTION_CREATED:
        return "💊"
      case NotificationType.VITAL_SIGNS_RECORDED:
        return "❤️"
      case NotificationType.INVOICE_CREATED:
        return "💰"
      case NotificationType.PAYMENT_PROCESSED:
        return "💳"
      case NotificationType.SUPPLY_LOW:
        return "📦"
      case NotificationType.ROOM_STATUS_CHANGED:
        return "🚪"
      default:
        return "📣"
    }
  }

  const handleNotificationClick = (id: string) => {
    markAsRead(id)
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <Badge
              variant="destructive"
              className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
            >
              {unreadCount > 9 ? "9+" : unreadCount}
            </Badge>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0" align="end">
        <div className="p-4 border-b">
          <h4 className="font-medium">Notifications</h4>
          <p className="text-xs text-muted-foreground">
            You have {unreadCount} unread notification{unreadCount !== 1 ? "s" : ""}
          </p>
        </div>
        <ScrollArea className="h-[300px]">
          {notifications.length === 0 ? (
            <div className="p-4 text-center text-muted-foreground">No notifications</div>
          ) : (
            <div>
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={cn(
                    "p-4 border-b last:border-0 cursor-pointer hover:bg-muted/50 transition-colors",
                    !notification.read[notification.recipients[0]] && "bg-muted/20",
                  )}
                  onClick={() => handleNotificationClick(notification.id)}
                >
                  <div className="flex items-start gap-3">
                    <div className="text-xl">{getNotificationIcon(notification.type)}</div>
                    <div className="flex-1 space-y-1">
                      <p className="text-sm font-medium leading-none">{notification.message}</p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(notification.createdAt).toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </ScrollArea>
      </PopoverContent>
    </Popover>
  )
}
