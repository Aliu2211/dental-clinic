"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { CreditCard, Shield, Save, Percent, Banknote, Smartphone, Database } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"

export default function SettingsPage() {
  const { user } = useAuth()

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Settings</h2>
          <p className="text-muted-foreground">Manage your cashier preferences and system settings</p>
        </div>
      </div>

      <Tabs defaultValue="payment" className="space-y-4">
        <TabsList>
          <TabsTrigger value="payment">Payment Settings</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="account">Account</TabsTrigger>
        </TabsList>
        <TabsContent value="payment" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Payment Methods</CardTitle>
              <CardDescription>Configure accepted payment methods and settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <CreditCard className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium">Credit/Debit Cards</p>
                      <p className="text-sm text-muted-foreground">Accept Visa, Mastercard, etc.</p>
                    </div>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Banknote className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium">Cash Payments</p>
                      <p className="text-sm text-muted-foreground">Accept physical cash</p>
                    </div>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Smartphone className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium">Mobile Money</p>
                      <p className="text-sm text-muted-foreground">Accept mobile payment services</p>
                    </div>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Database className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium">Cryptocurrency</p>
                      <p className="text-sm text-muted-foreground">Accept Bitcoin, Ethereum, etc.</p>
                    </div>
                  </div>
                  <Switch />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Shield className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium">Insurance</p>
                      <p className="text-sm text-muted-foreground">Process insurance claims</p>
                    </div>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Tax & Fee Settings</CardTitle>
              <CardDescription>Configure tax rates and service fees</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="tax-rate">VAT Rate (%)</Label>
                  <div className="flex items-center">
                    <Input id="tax-rate" type="number" defaultValue="12.5" />
                    <Percent className="ml-2 h-4 w-4 text-muted-foreground" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="service-fee">Service Fee (%)</Label>
                  <div className="flex items-center">
                    <Input id="service-fee" type="number" defaultValue="2.5" />
                    <Percent className="ml-2 h-4 w-4 text-muted-foreground" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="card-fee">Card Processing Fee (%)</Label>
                  <div className="flex items-center">
                    <Input id="card-fee" type="number" defaultValue="1.5" />
                    <Percent className="ml-2 h-4 w-4 text-muted-foreground" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="crypto-fee">Crypto Processing Fee (%)</Label>
                  <div className="flex items-center">
                    <Input id="crypto-fee" type="number" defaultValue="1.0" />
                    <Percent className="ml-2 h-4 w-4 text-muted-foreground" />
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="ml-auto">
                <Save className="mr-2 h-4 w-4" />
                Save Changes
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Receipt Settings</CardTitle>
              <CardDescription>Configure receipt generation and printing options</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Automatic Receipt Printing</p>
                    <p className="text-sm text-muted-foreground">Print receipt after each transaction</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Email Receipt</p>
                    <p className="text-sm text-muted-foreground">Send digital receipt to patient email</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Include Tax Breakdown</p>
                    <p className="text-sm text-muted-foreground">Show detailed tax calculations on receipt</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="receipt-footer">Receipt Footer Text</Label>
                  <Textarea
                    id="receipt-footer"
                    defaultValue="Thank you for choosing Dentonic Clinic. For any inquiries, please call +233 123 456 789."
                    rows={3}
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="ml-auto">
                <Save className="mr-2 h-4 w-4" />
                Save Changes
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>Configure how you receive alerts and notifications</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Payment Alerts</p>
                    <p className="text-sm text-muted-foreground">Receive alerts for new payments</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Insurance Claim Updates</p>
                    <p className="text-sm text-muted-foreground">Notifications about insurance claim status changes</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Daily Summary</p>
                    <p className="text-sm text-muted-foreground">Receive end-of-day financial summary</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">System Maintenance</p>
                    <p className="text-sm text-muted-foreground">Notifications about system updates and maintenance</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="security" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>Manage your account security preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="current-password">Current Password</Label>
                  <Input id="current-password" type="password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="new-password">New Password</Label>
                  <Input id="new-password" type="password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Confirm New Password</Label>
                  <Input id="confirm-password" type="password" />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Two-Factor Authentication</p>
                    <p className="text-sm text-muted-foreground">Add an extra layer of security to your account</p>
                  </div>
                  <Switch />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="ml-auto">
                <Save className="mr-2 h-4 w-4" />
                Update Password
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="account" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Account Information</CardTitle>
              <CardDescription>Manage your personal information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="full-name">Full Name</Label>
                  <Input id="full-name" defaultValue={user?.name || "Cashier User"} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" defaultValue="cashier@dentonic.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" type="tel" defaultValue="+233 123 456 789" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="employee-id">Employee ID</Label>
                  <Input id="employee-id" defaultValue="CASH-001" readOnly />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="ml-auto">
                <Save className="mr-2 h-4 w-4" />
                Save Changes
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
