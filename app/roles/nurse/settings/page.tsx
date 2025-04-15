"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Bell, Lock, Shield, Moon, Sun, Smartphone } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function NurseSettingsPage() {
  const { toast } = useToast()
  const [darkMode, setDarkMode] = useState(false)

  const handleSaveProfile = () => {
    toast({
      title: "Profile updated",
      description: "Your profile information has been updated successfully.",
    })
  }

  const handleSaveNotifications = () => {
    toast({
      title: "Notification preferences saved",
      description: "Your notification preferences have been updated.",
    })
  }

  const handleSaveAppearance = () => {
    toast({
      title: "Appearance settings saved",
      description: "Your appearance settings have been updated.",
    })
  }

  const handleSavePassword = () => {
    toast({
      title: "Password changed",
      description: "Your password has been changed successfully.",
    })
  }

  return (
    <div className="space-y-4">
      <h2 className="text-3xl font-bold tracking-tight">Settings</h2>

      <Tabs defaultValue="profile" className="space-y-4">
        <TabsList>
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>Update your personal information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
                <Avatar className="h-20 w-20">
                  <AvatarImage src="/placeholder.svg?height=80&width=80" />
                  <AvatarFallback>SN</AvatarFallback>
                </Avatar>
                <div className="space-y-1">
                  <h3 className="font-medium">Sarah Nurse</h3>
                  <p className="text-sm text-muted-foreground">sarah.nurse@dentonic.com</p>
                  <Badge>Nurse</Badge>
                </div>
                <Button variant="outline" size="sm" className="ml-auto">
                  Change Photo
                </Button>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input id="firstName" defaultValue="Sarah" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input id="lastName" defaultValue="Nurse" />
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" defaultValue="sarah.nurse@dentonic.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" type="tel" defaultValue="(555) 123-4567" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  defaultValue="Registered Dental Nurse with 5 years of experience in dental care and patient management."
                  className="min-h-[100px]"
                />
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button onClick={handleSaveProfile}>Save Changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>Manage how you receive notifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Bell className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="font-medium">Patient Check-ins</p>
                      <p className="text-sm text-muted-foreground">Receive notifications when patients check in</p>
                    </div>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Bell className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="font-medium">Medication Reminders</p>
                      <p className="text-sm text-muted-foreground">Receive reminders for medication administration</p>
                    </div>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Bell className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="font-medium">Supply Alerts</p>
                      <p className="text-sm text-muted-foreground">Receive alerts when supplies are running low</p>
                    </div>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Bell className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="font-medium">Doctor Messages</p>
                      <p className="text-sm text-muted-foreground">Receive notifications for messages from doctors</p>
                    </div>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Bell className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="font-medium">System Updates</p>
                      <p className="text-sm text-muted-foreground">Receive notifications about system updates</p>
                    </div>
                  </div>
                  <Switch />
                </div>
              </div>

              <div className="space-y-2 pt-4">
                <Label htmlFor="notificationMethod">Preferred Notification Method</Label>
                <Select defaultValue="both">
                  <SelectTrigger id="notificationMethod">
                    <SelectValue placeholder="Select notification method" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="email">Email Only</SelectItem>
                    <SelectItem value="app">In-App Only</SelectItem>
                    <SelectItem value="both">Email and In-App</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button onClick={handleSaveNotifications}>Save Preferences</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="appearance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Appearance Settings</CardTitle>
              <CardDescription>Customize how the application looks</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    {darkMode ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
                    <div>
                      <p className="font-medium">Dark Mode</p>
                      <p className="text-sm text-muted-foreground">Switch between light and dark themes</p>
                    </div>
                  </div>
                  <Switch checked={darkMode} onCheckedChange={setDarkMode} />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Smartphone className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="font-medium">Compact Mode</p>
                      <p className="text-sm text-muted-foreground">Use a more compact layout</p>
                    </div>
                  </div>
                  <Switch />
                </div>
              </div>

              <div className="space-y-2 pt-4">
                <Label htmlFor="fontSize">Font Size</Label>
                <Select defaultValue="medium">
                  <SelectTrigger id="fontSize">
                    <SelectValue placeholder="Select font size" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="small">Small</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="large">Large</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="colorTheme">Color Theme</Label>
                <Select defaultValue="blue">
                  <SelectTrigger id="colorTheme">
                    <SelectValue placeholder="Select color theme" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="blue">Blue</SelectItem>
                    <SelectItem value="green">Green</SelectItem>
                    <SelectItem value="purple">Purple</SelectItem>
                    <SelectItem value="orange">Orange</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button onClick={handleSaveAppearance}>Save Settings</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>Manage your account security</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="currentPassword">Current Password</Label>
                <Input id="currentPassword" type="password" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="newPassword">New Password</Label>
                <Input id="newPassword" type="password" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm New Password</Label>
                <Input id="confirmPassword" type="password" />
              </div>

              <div className="pt-4 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Shield className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="font-medium">Two-Factor Authentication</p>
                      <p className="text-sm text-muted-foreground">Add an extra layer of security to your account</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    Enable
                  </Button>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Lock className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="font-medium">Session Management</p>
                      <p className="text-sm text-muted-foreground">Manage your active sessions</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    View Sessions
                  </Button>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button onClick={handleSavePassword}>Change Password</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
