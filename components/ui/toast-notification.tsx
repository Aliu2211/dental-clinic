"use client"

import { useState, useEffect } from "react"
import { X } from "lucide-react"

interface ToastProps {
  message: string
  type?: "success" | "error" | "warning" | "info"
  duration?: number
  onClose?: () => void
}

export function Toast({ message, type = "success", duration = 3000, onClose }: ToastProps) {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false)
      if (onClose) onClose()
    }, duration)

    return () => clearTimeout(timer)
  }, [duration, onClose])

  const bgColor = {
    success: "bg-green-100 border-green-500 text-green-800",
    error: "bg-red-100 border-red-500 text-red-800",
    warning: "bg-yellow-100 border-yellow-500 text-yellow-800",
    info: "bg-blue-100 border-blue-500 text-blue-800",
  }

  const iconColor = {
    success: "text-green-500",
    error: "text-red-500",
    warning: "text-yellow-500",
    info: "text-blue-500",
  }

  if (!isVisible) return null

  return (
    <div
      className={`fixed top-4 right-4 z-50 flex items-center p-4 mb-4 rounded-lg border ${bgColor[type]}`}
      role="alert"
    >
      <div className="ml-3 text-sm font-medium">{message}</div>
      <button
        type="button"
        className={`ml-auto -mx-1.5 -my-1.5 rounded-lg focus:ring-2 p-1.5 inline-flex h-8 w-8 ${iconColor[type]}`}
        onClick={() => {
          setIsVisible(false)
          if (onClose) onClose()
        }}
        aria-label="Close"
      >
        <span className="sr-only">Close</span>
        <X className="w-5 h-5" />
      </button>
    </div>
  )
}

export function useToast() {
  const [toasts, setToasts] = useState<Array<{ id: string; props: ToastProps }>>([])

  const showToast = (props: Omit<ToastProps, "onClose">) => {
    const id = Math.random().toString(36).substring(2, 9)
    setToasts((prev) => [...prev, { id, props: { ...props, onClose: () => removeToast(id) } }])
    return id
  }

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id))
  }

  const ToastContainer = () => (
    <div className="toast-container">
      {toasts.map(({ id, props }) => (
        <Toast key={id} {...props} />
      ))}
    </div>
  )

  return { showToast, removeToast, ToastContainer }
}
