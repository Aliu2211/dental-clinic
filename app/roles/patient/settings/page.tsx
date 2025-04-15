"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Smartphone, Wallet } from "lucide-react"
import { useContext } from "react"
import { AuthContext } from "@/contexts/auth-context"
import { WalletConnect } from "@/components/blockchain/wallet-connect"
import { DecentralizedIdentity } from "@/components/blockchain/decentralized-identity"

export default function PatientSettingsPage() {
  const { user } = useContext(AuthContext)
  const [isConnectingWallet, setIsConnectingWallet] = useState(false)

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Settings</h2>
        <p className="text-muted-foreground">Manage your account settings and preferences</p>
      </div>

      <Tabs defaultValue="profile" className="space-y-4">
        <TabsList>
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="privacy">Privacy & Security</TabsTrigger>
          <TabsTrigger value="blockchain">Blockchain</TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>Update your personal information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex flex-col items-center space-y-2">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src={user?.profileImage || "/placeholder.svg?height=96&width=96"} />
                    <AvatarFallback>
                      {user?.name
                        ?.split(" ")
                        .map((n) => n[0])
                        .join("") || "U"}
                    </AvatarFallback>
                  </Avatar>
                  <Button variant="outline" size="sm">
                    Change Photo
                  </Button>
                </div>

                <div className="flex-1 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="fullName">Full Name</Label>
                      <Input id="fullName" defaultValue={user?.name} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" defaultValue={user?.email} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input id="phone" type="tel" defaultValue="+233 55 123 4567" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="dob">Date of Birth</Label>
                      <Input id="dob" type="date" defaultValue="1990-01-01" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="address">Address</Label>
                    <Textarea id="address" defaultValue="123 Main Street, Accra, Ghana" />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Emergency Contact</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="emergencyName">Contact Name</Label>
                    <Input id="emergencyName" defaultValue="Jane Doe" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="emergencyRelation">Relationship</Label>
                    <Input id="emergencyRelation" defaultValue="Spouse" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="emergencyPhone">Phone Number</Label>
                    <Input id="emergencyPhone" type="tel" defaultValue="+233 55 987 6543" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="emergencyEmail">Email</Label>
                    <Input id="emergencyEmail" type="email" defaultValue="jane.doe@example.com" />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Medical Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="allergies">Allergies</Label>
                    <Textarea id="allergies" defaultValue="Penicillin, Latex" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="medicalConditions">Medical Conditions</Label>
                    <Textarea id="medicalConditions" defaultValue="None" />
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <Button>Save Changes</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>Manage how you receive notifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Appointment Notifications</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="appointment-email">Email Notifications</Label>
                      <p className="text-sm text-muted-foreground">Receive appointment reminders via email</p>
                    </div>
                    <Switch id="appointment-email" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="appointment-sms">SMS Notifications</Label>
                      <p className="text-sm text-muted-foreground">Receive appointment reminders via SMS</p>
                    </div>
                    <Switch id="appointment-sms" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="appointment-reminder-time">Reminder Time</Label>
                      <p className="text-sm text-muted-foreground">When to send appointment reminders</p>
                    </div>
                    <Select defaultValue="24h">
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select time" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1h">1 hour before</SelectItem>
                        <SelectItem value="3h">3 hours before</SelectItem>
                        <SelectItem value="24h">24 hours before</SelectItem>
                        <SelectItem value="48h">48 hours before</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Prescription Notifications</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="prescription-refill">Refill Reminders</Label>
                      <p className="text-sm text-muted-foreground">Notify when prescriptions need refill</p>
                    </div>
                    <Switch id="prescription-refill" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="prescription-expiry">Expiry Notifications</Label>
                      <p className="text-sm text-muted-foreground">Notify when prescriptions are about to expire</p>
                    </div>
                    <Switch id="prescription-expiry" defaultChecked />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Billing Notifications</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="billing-new">New Invoices</Label>
                      <p className="text-sm text-muted-foreground">Notify when new invoices are generated</p>
                    </div>
                    <Switch id="billing-new" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="billing-due">Payment Reminders</Label>
                      <p className="text-sm text-muted-foreground">Notify when payments are due</p>
                    </div>
                    <Switch id="billing-due" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="billing-receipt">Payment Receipts</Label>
                      <p className="text-sm text-muted-foreground">Receive receipts for payments made</p>
                    </div>
                    <Switch id="billing-receipt" defaultChecked />
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <Button>Save Preferences</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="privacy" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Privacy & Security</CardTitle>
              <CardDescription>Manage your privacy settings and security options</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Account Security</h3>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="current-password">Current Password</Label>
                    <Input id="current-password" type="password" />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="new-password">New Password</Label>
                      <Input id="new-password" type="password" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirm-password">Confirm New Password</Label>
                      <Input id="confirm-password" type="password" />
                    </div>
                  </div>
                  <Button variant="outline">Change Password</Button>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Two-Factor Authentication</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="2fa-enable">Enable 2FA</Label>
                      <p className="text-sm text-muted-foreground">Add an extra layer of security to your account</p>
                    </div>
                    <Switch id="2fa-enable" />
                  </div>
                  <Button variant="outline" className="gap-2">
                    <Smartphone className="h-4 w-4" />
                    Setup Authenticator App
                  </Button>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Data Privacy</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="data-sharing">Data Sharing</Label>
                      <p className="text-sm text-muted-foreground">Allow sharing your data with healthcare providers</p>
                    </div>
                    <Switch id="data-sharing" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="research-consent">Research Consent</Label>
                      <p className="text-sm text-muted-foreground">Allow anonymized data to be used for research</p>
                    </div>
                    <Switch id="research-consent" />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="marketing-consent">Marketing Communications</Label>
                      <p className="text-sm text-muted-foreground">Receive promotional emails and offers</p>
                    </div>
                    <Switch id="marketing-consent" />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Session Management</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Active Sessions</Label>
                      <p className="text-sm text-muted-foreground">Currently logged in on 1 device</p>
                    </div>
                    <Button variant="outline" size="sm">
                      Manage Sessions
                    </Button>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t">
                <Button variant="destructive">Delete Account</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="blockchain" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Blockchain Integration</CardTitle>
              <CardDescription>Manage your blockchain wallet and decentralized identity</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Wallet Connection</h3>
                {isConnectingWallet ? (
                  <div className="p-4 bg-muted rounded-lg">
                    <WalletConnect />
                  </div>
                ) : (
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Blockchain Wallet</Label>
                      <p className="text-sm text-muted-foreground">
                        Connect your wallet for crypto payments and record verification
                      </p>
                    </div>
                    <Button variant="outline" onClick={() => setIsConnectingWallet(true)}>
                      <Wallet className="h-4 w-4 mr-2" />
                      Connect Wallet
                    </Button>
                  </div>
                )}
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Decentralized Identity</h3>
                <div className="p-4 bg-muted rounded-lg">
                  <DecentralizedIdentity />
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Medical Records on Blockchain</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="blockchain-records">Enable Blockchain Records</Label>
                      <p className="text-sm text-muted-foreground">
                        Store your medical records securely on the blockchain
                      </p>
                    </div>
                    <Switch id="blockchain-records" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="record-sharing">Record Sharing</Label>
                      <p className="text-sm text-muted-foreground">Allow doctors to access your blockchain records</p>
                    </div>
                    <Switch id="record-sharing" defaultChecked />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Blockchain Notifications</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="blockchain-notifications">Transaction Notifications</Label>
                      <p className="text-sm text-muted-foreground">Receive notifications for blockchain transactions</p>
                    </div>
                    <Switch id="blockchain-notifications" defaultChecked />
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <Button>Save Blockchain Settings</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
