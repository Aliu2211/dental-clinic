"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Shield, Save, RefreshCw, AlertTriangle, Database } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Progress } from "@/components/ui/progress"

// Add imports for animations
import { motion } from "framer-motion"

export default function AdminSettingsPage() {
  const [isSaving, setIsSaving] = useState(false)
  const [isBackupRunning, setIsBackupRunning] = useState(false)

  const handleSave = () => {
    setIsSaving(true)
    setTimeout(() => {
      setIsSaving(false)
    }, 1500)
  }

  const handleBackup = () => {
    setIsBackupRunning(true)
    setTimeout(() => {
      setIsBackupRunning(false)
    }, 3000)
  }

  // Update the return statement to include animations
  return (
    <motion.div className="space-y-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
      <motion.div
        className="flex items-center justify-between"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1, type: "spring", stiffness: 100 }}
      >
        <h2 className="text-3xl font-bold tracking-tight">System Settings</h2>
        <div className="flex items-center space-x-2">
          <Button variant="outline" onClick={handleBackup} disabled={isBackupRunning}>
            {isBackupRunning ? (
              <>
                <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                Backing up...
              </>
            ) : (
              <>
                <Database className="mr-2 h-4 w-4" />
                Backup System
              </>
            )}
          </Button>
          <Button onClick={handleSave} disabled={isSaving}>
            {isSaving ? (
              <>
                <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" />
                Save Changes
              </>
            )}
          </Button>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <Tabs defaultValue="general" className="space-y-4">
          <TabsList className="grid grid-cols-5 w-full">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
            <TabsTrigger value="blockchain">Blockchain</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="backups">Backups</TabsTrigger>
          </TabsList>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <TabsContent value="general" className="space-y-4">
              <Card className="transition-all hover:shadow-md">
                <CardHeader>
                  <CardTitle>General Settings</CardTitle>
                  <CardDescription>Manage general system settings</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="clinic-name">Clinic Name</Label>
                    <Input id="clinic-name" defaultValue="Dentonic Dental Clinic" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="clinic-address">Clinic Address</Label>
                    <Textarea id="clinic-address" defaultValue="123 Dental Street, Accra, Ghana" />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="clinic-phone">Clinic Phone</Label>
                      <Input id="clinic-phone" defaultValue="+233 123 456 789" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="clinic-email">Clinic Email</Label>
                      <Input id="clinic-email" defaultValue="info@dentonic.com" />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="timezone">Timezone</Label>
                      <Select defaultValue="africa/accra">
                        <SelectTrigger id="timezone">
                          <SelectValue placeholder="Select timezone" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="africa/accra">Africa/Accra (GMT+0)</SelectItem>
                          <SelectItem value="africa/lagos">Africa/Lagos (GMT+1)</SelectItem>
                          <SelectItem value="europe/london">Europe/London (GMT+0/+1)</SelectItem>
                          <SelectItem value="america/new_york">America/New York (GMT-5/-4)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="language">Default Language</Label>
                      <Select defaultValue="en">
                        <SelectTrigger id="language">
                          <SelectValue placeholder="Select language" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="en">English</SelectItem>
                          <SelectItem value="fr">French</SelectItem>
                          <SelectItem value="es">Spanish</SelectItem>
                          <SelectItem value="ar">Arabic</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="logo">Clinic Logo</Label>
                    <div className="flex items-center gap-4">
                      <div className="h-16 w-16 rounded-md bg-primary/10 flex items-center justify-center">
                        <Shield className="h-8 w-8 text-primary" />
                      </div>
                      <Button variant="outline" size="sm">
                        Change Logo
                      </Button>
                    </div>
                  </div>
                  <Separator />
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">System Preferences</h3>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="maintenance-mode">Maintenance Mode</Label>
                        <p className="text-sm text-muted-foreground">Put the system in maintenance mode</p>
                      </div>
                      <Switch id="maintenance-mode" />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="debug-mode">Debug Mode</Label>
                        <p className="text-sm text-muted-foreground">Enable detailed error logging</p>
                      </div>
                      <Switch id="debug-mode" />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="analytics">Analytics</Label>
                        <p className="text-sm text-muted-foreground">Collect anonymous usage data</p>
                      </div>
                      <Switch id="analytics" defaultChecked />
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end space-x-2 border-t px-6 py-4">
                  <Button variant="outline">Reset</Button>
                  <Button>Save Changes</Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </motion.div>

          <TabsContent value="security" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Security Settings</CardTitle>
                <CardDescription>Manage security and access control settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Authentication</h3>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="two-factor">Two-Factor Authentication</Label>
                      <p className="text-sm text-muted-foreground">Require two-factor authentication for all users</p>
                    </div>
                    <Switch id="two-factor" />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="password-expiry">Password Expiry</Label>
                      <p className="text-sm text-muted-foreground">Force password reset every 90 days</p>
                    </div>
                    <Switch id="password-expiry" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="session-timeout">Session Timeout</Label>
                      <p className="text-sm text-muted-foreground">
                        Automatically log out inactive users after 30 minutes
                      </p>
                    </div>
                    <Switch id="session-timeout" defaultChecked />
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Password Policy</h3>
                  <div className="space-y-2">
                    <Label htmlFor="min-length">Minimum Password Length</Label>
                    <Select defaultValue="8">
                      <SelectTrigger id="min-length">
                        <SelectValue placeholder="Select length" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="6">6 characters</SelectItem>
                        <SelectItem value="8">8 characters</SelectItem>
                        <SelectItem value="10">10 characters</SelectItem>
                        <SelectItem value="12">12 characters</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="login-attempts">Max Failed Login Attempts</Label>
                    <Select defaultValue="5">
                      <SelectTrigger id="login-attempts">
                        <SelectValue placeholder="Select number" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="3">3 attempts</SelectItem>
                        <SelectItem value="5">5 attempts</SelectItem>
                        <SelectItem value="10">10 attempts</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="require-special">Require Special Characters</Label>
                      <p className="text-sm text-muted-foreground">Passwords must contain special characters</p>
                    </div>
                    <Switch id="require-special" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="require-numbers">Require Numbers</Label>
                      <p className="text-sm text-muted-foreground">Passwords must contain at least one number</p>
                    </div>
                    <Switch id="require-numbers" defaultChecked />
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Audit & Compliance</h3>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="audit-logging">Enhanced Audit Logging</Label>
                      <p className="text-sm text-muted-foreground">Log all user actions for compliance</p>
                    </div>
                    <Switch id="audit-logging" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="data-encryption">Data Encryption</Label>
                      <p className="text-sm text-muted-foreground">Encrypt sensitive data at rest</p>
                    </div>
                    <Switch id="data-encryption" defaultChecked />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="retention-period">Data Retention Period</Label>
                    <Select defaultValue="7">
                      <SelectTrigger id="retention-period">
                        <SelectValue placeholder="Select period" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="3">3 years</SelectItem>
                        <SelectItem value="5">5 years</SelectItem>
                        <SelectItem value="7">7 years</SelectItem>
                        <SelectItem value="10">10 years</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end space-x-2 border-t px-6 py-4">
                <Button variant="outline">Reset</Button>
                <Button>Save Changes</Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="blockchain" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Blockchain Settings</CardTitle>
                <CardDescription>Configure blockchain integration settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <Alert>
                  <AlertTriangle className="h-4 w-4" />
                  <AlertTitle>Important</AlertTitle>
                  <AlertDescription>
                    Changing blockchain settings may affect existing records and transactions.
                  </AlertDescription>
                </Alert>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Network Configuration</h3>
                  <div className="space-y-2">
                    <Label htmlFor="blockchain-network">Default Blockchain Network</Label>
                    <Select defaultValue="ethereum">
                      <SelectTrigger id="blockchain-network">
                        <SelectValue placeholder="Select network" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ethereum">Ethereum Mainnet</SelectItem>
                        <SelectItem value="sepolia">Sepolia Testnet</SelectItem>
                        <SelectItem value="polygon">Polygon</SelectItem>
                        <SelectItem value="optimism">Optimism</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="rpc-url">RPC URL</Label>
                    <Input id="rpc-url" defaultValue="https://eth-sepolia.g.alchemy.com/v2/demo" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="chain-id">Chain ID</Label>
                    <Input id="chain-id" defaultValue="11155111" />
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Smart Contracts</h3>
                  <div className="space-y-2">
                    <Label htmlFor="patient-records-contract">Patient Records Contract Address</Label>
                    <Input id="patient-records-contract" defaultValue="0x0000000000000000000000000000000000000000" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="payment-processor-contract">Payment Processor Contract Address</Label>
                    <Input id="payment-processor-contract" defaultValue="0x0000000000000000000000000000000000000000" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="dao-contract">DAO Governance Contract Address</Label>
                    <Input id="dao-contract" defaultValue="0x0000000000000000000000000000000000000000" />
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Integration Settings</h3>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="auto-sync">Auto-Sync Records to Blockchain</Label>
                      <p className="text-sm text-muted-foreground">Automatically sync medical records to blockchain</p>
                    </div>
                    <Switch id="auto-sync" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="crypto-payments">Enable Cryptocurrency Payments</Label>
                      <p className="text-sm text-muted-foreground">Allow patients to pay with cryptocurrency</p>
                    </div>
                    <Switch id="crypto-payments" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="dao-voting">Enable DAO Governance</Label>
                      <p className="text-sm text-muted-foreground">
                        Allow stakeholders to participate in governance decisions
                      </p>
                    </div>
                    <Switch id="dao-voting" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="gas-strategy">Gas Price Strategy</Label>
                    <Select defaultValue="medium">
                      <SelectTrigger id="gas-strategy">
                        <SelectValue placeholder="Select strategy" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Low (Slower)</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="high">High (Faster)</SelectItem>
                        <SelectItem value="auto">Auto-adjust</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end space-x-2 border-t px-6 py-4">
                <Button variant="outline">Reset</Button>
                <Button>Save Changes</Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="notifications" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Notification Settings</CardTitle>
                <CardDescription>Configure system notifications and alerts</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Notification Channels</h3>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="email-notifications">Email Notifications</Label>
                      <p className="text-sm text-muted-foreground">Send notifications via email</p>
                    </div>
                    <Switch id="email-notifications" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="sms-notifications">SMS Notifications</Label>
                      <p className="text-sm text-muted-foreground">Send notifications via SMS</p>
                    </div>
                    <Switch id="sms-notifications" />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="push-notifications">Push Notifications</Label>
                      <p className="text-sm text-muted-foreground">Send push notifications to mobile devices</p>
                    </div>
                    <Switch id="push-notifications" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="in-app-notifications">In-App Notifications</Label>
                      <p className="text-sm text-muted-foreground">Show notifications within the application</p>
                    </div>
                    <Switch id="in-app-notifications" defaultChecked />
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Notification Events</h3>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="appointment-reminders">Appointment Reminders</Label>
                      <p className="text-sm text-muted-foreground">Send reminders for upcoming appointments</p>
                    </div>
                    <Switch id="appointment-reminders" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="system-alerts">System Alerts</Label>
                      <p className="text-sm text-muted-foreground">Send alerts for system events and issues</p>
                    </div>
                    <Switch id="system-alerts" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="payment-notifications">Payment Notifications</Label>
                      <p className="text-sm text-muted-foreground">Send notifications for payments and invoices</p>
                    </div>
                    <Switch id="payment-notifications" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="record-updates">Medical Record Updates</Label>
                      <p className="text-sm text-muted-foreground">Notify when medical records are updated</p>
                    </div>
                    <Switch id="record-updates" defaultChecked />
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Timing Settings</h3>
                  <div className="space-y-2">
                    <Label htmlFor="reminder-time">Appointment Reminder Time</Label>
                    <Select defaultValue="24">
                      <SelectTrigger id="reminder-time">
                        <SelectValue placeholder="Select time" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="12">12 hours before</SelectItem>
                        <SelectItem value="24">24 hours before</SelectItem>
                        <SelectItem value="48">48 hours before</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="quiet-hours">Quiet Hours</Label>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="quiet-start" className="text-xs">
                          Start Time
                        </Label>
                        <Select defaultValue="22">
                          <SelectTrigger id="quiet-start">
                            <SelectValue placeholder="Select time" />
                          </SelectTrigger>
                          <SelectContent>
                            {Array.from({ length: 24 }).map((_, i) => (
                              <SelectItem key={i} value={i.toString()}>
                                {i.toString().padStart(2, "0")}:00
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="quiet-end" className="text-xs">
                          End Time
                        </Label>
                        <Select defaultValue="7">
                          <SelectTrigger id="quiet-end">
                            <SelectValue placeholder="Select time" />
                          </SelectTrigger>
                          <SelectContent>
                            {Array.from({ length: 24 }).map((_, i) => (
                              <SelectItem key={i} value={i.toString()}>
                                {i.toString().padStart(2, "0")}:00
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end space-x-2 border-t px-6 py-4">
                <Button variant="outline">Reset</Button>
                <Button>Save Changes</Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="backups" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Backup & Recovery</CardTitle>
                <CardDescription>Configure system backup and recovery options</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Backup Schedule</h3>
                  <div className="space-y-2">
                    <Label htmlFor="backup-frequency">Backup Frequency</Label>
                    <Select defaultValue="daily">
                      <SelectTrigger id="backup-frequency">
                        <SelectValue placeholder="Select frequency" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="hourly">Hourly</SelectItem>
                        <SelectItem value="daily">Daily</SelectItem>
                        <SelectItem value="weekly">Weekly</SelectItem>
                        <SelectItem value="monthly">Monthly</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="backup-time">Backup Time</Label>
                    <Select defaultValue="2">
                      <SelectTrigger id="backup-time">
                        <SelectValue placeholder="Select time" />
                      </SelectTrigger>
                      <SelectContent>
                        {Array.from({ length: 24 }).map((_, i) => (
                          <SelectItem key={i} value={i.toString()}>
                            {i.toString().padStart(2, "0")}:00
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="auto-backup">Automatic Backups</Label>
                      <p className="text-sm text-muted-foreground">
                        Automatically backup the system according to schedule
                      </p>
                    </div>
                    <Switch id="auto-backup" defaultChecked />
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Backup Storage</h3>
                  <div className="space-y-2">
                    <Label htmlFor="storage-location">Storage Location</Label>
                    <Select defaultValue="cloud">
                      <SelectTrigger id="storage-location">
                        <SelectValue placeholder="Select location" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="local">Local Storage</SelectItem>
                        <SelectItem value="cloud">Cloud Storage</SelectItem>
                        <SelectItem value="both">Both (Local & Cloud)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="retention-count">Backup Retention Count</Label>
                    <Select defaultValue="7">
                      <SelectTrigger id="retention-count">
                        <SelectValue placeholder="Select count" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="3">3 backups</SelectItem>
                        <SelectItem value="7">7 backups</SelectItem>
                        <SelectItem value="14">14 backups</SelectItem>
                        <SelectItem value="30">30 backups</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="encrypt-backups">Encrypt Backups</Label>
                      <p className="text-sm text-muted-foreground">Encrypt backup files for additional security</p>
                    </div>
                    <Switch id="encrypt-backups" defaultChecked />
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Manual Backup</h3>
                  <div className="space-y-2">
                    <Label>Last Backup</Label>
                    <div className="flex items-center justify-between rounded-md border p-3">
                      <div>
                        <p className="text-sm font-medium">Daily Backup</p>
                        <p className="text-xs text-muted-foreground">Today, 02:00 AM</p>
                      </div>
                      <Badge variant="outline" className="text-green-600 bg-green-50">
                        Successful
                      </Badge>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Button className="w-full" onClick={handleBackup} disabled={isBackupRunning}>
                      {isBackupRunning ? (
                        <>
                          <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                          Backing up... (25%)
                        </>
                      ) : (
                        <>
                          <Database className="mr-2 h-4 w-4" />
                          Create Manual Backup
                        </>
                      )}
                    </Button>
                    {isBackupRunning && <Progress value={25} className="h-2 mt-2" />}
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end space-x-2 border-t px-6 py-4">
                <Button variant="outline">Reset</Button>
                <Button>Save Changes</Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </motion.div>
    </motion.div>
  )
}
