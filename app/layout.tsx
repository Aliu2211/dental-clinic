import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { AuthProvider } from "@/contexts/auth-context"
import { SharedDataProvider } from "@/contexts/shared-data-context"
import { NotificationsProvider } from "@/contexts/notifications-context"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Dentonic - Dental Clinic Management System",
  description: "A comprehensive dental clinic management system with blockchain integration",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <AuthProvider>
            <SharedDataProvider>
              <NotificationsProvider>{children}</NotificationsProvider>
            </SharedDataProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}


import './globals.css'