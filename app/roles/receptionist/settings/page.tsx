"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { toast } from "@/hooks/use-toast"

const profileFormSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  phone: z.string().min(10, {
    message: "Phone number must be at least 10 digits.",
  }),
  bio: z.string().optional(),
})

const notificationsFormSchema = z.object({
  appointmentReminders: z.boolean().default(true),
  patientCheckIns: z.boolean().default(true),
  systemUpdates: z.boolean().default(false),
  marketingEmails: z.boolean().default(false),
})

const appearanceFormSchema = z.object({
  theme: z.enum(["light", "dark", "system"]),
  fontSize: z.enum(["sm", "md", "lg"]),
  densityMode: z.enum(["compact", "default", "comfortable"]),
})

export default function SettingsPage() {
  const [isSaving, setIsSaving] = useState(false)

  const profileForm = useForm<z.infer<typeof profileFormSchema>>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      name: "Sarah Johnson",
      email: "sarah.johnson@dentonic.com",
      phone: "(555) 123-4567",
      bio: "Front desk receptionist with 5 years of experience in dental office management.",
    },
  })

  const notificationsForm = useForm<z.infer<typeof notificationsFormSchema>>({
    resolver: zodResolver(notificationsFormSchema),
    defaultValues: {
      appointmentReminders: true,
      patientCheckIns: true,
      systemUpdates: false,
      marketingEmails: false,
    },
  })

  const appearanceForm = useForm<z.infer<typeof appearanceFormSchema>>({
    resolver: zodResolver(appearanceFormSchema),
    defaultValues: {
      theme: "system",
      fontSize: "md",
      densityMode: "default",
    },
  })

  function onProfileSubmit(data: z.infer<typeof profileFormSchema>) {
    setIsSaving(true)

    // Simulate API call
    setTimeout(() => {
      console.log(data)
      setIsSaving(false)
      toast({
        title: "Profile updated",
        description: "Your profile information has been updated successfully.",
      })
    }, 1000)
  }

  function onNotificationsSubmit(data: z.infer<typeof notificationsFormSchema>) {
    setIsSaving(true)

    // Simulate API call
    setTimeout(() => {
      console.log(data)
      setIsSaving(false)
      toast({
        title: "Notification preferences updated",
        description: "Your notification preferences have been updated successfully.",
      })
    }, 1000)
  }

  function onAppearanceSubmit(data: z.infer<typeof appearanceFormSchema>) {
    setIsSaving(true)

    // Simulate API call
    setTimeout(() => {
      console.log(data)
      setIsSaving(false)
      toast({
        title: "Appearance settings updated",
        description: "Your appearance settings have been updated successfully.",
      })
    }, 1000)
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

        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <CardTitle>Profile</CardTitle>
              <CardDescription>Manage your personal information and preferences.</CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...profileForm}>
                <form onSubmit={profileForm.handleSubmit(onProfileSubmit)} className="space-y-4">
                  <FormField
                    control={profileForm.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={profileForm.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={profileForm.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormField
                    control={profileForm.control}
                    name="bio"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Bio</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Tell us a little bit about yourself"
                            className="resize-none"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>This will be displayed on your profile.</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="flex justify-end">
                    <Button type="submit" disabled={isSaving}>
                      {isSaving ? "Saving..." : "Save Changes"}
                    </Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Notifications</CardTitle>
              <CardDescription>Configure how you receive notifications.</CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...notificationsForm}>
                <form onSubmit={notificationsForm.handleSubmit(onNotificationsSubmit)} className="space-y-4">
                  <FormField
                    control={notificationsForm.control}
                    name="appointmentReminders"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                          <FormLabel className="text-base">Appointment Reminders</FormLabel>
                          <FormDescription>Receive notifications about upcoming appointments.</FormDescription>
                        </div>
                        <FormControl>
                          <Switch checked={field.value} onCheckedChange={field.onChange} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={notificationsForm.control}
                    name="patientCheckIns"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                          <FormLabel className="text-base">Patient Check-ins</FormLabel>
                          <FormDescription>Receive notifications when patients check in.</FormDescription>
                        </div>
                        <FormControl>
                          <Switch checked={field.value} onCheckedChange={field.onChange} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={notificationsForm.control}
                    name="systemUpdates"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                          <FormLabel className="text-base">System Updates</FormLabel>
                          <FormDescription>Receive notifications about system updates and maintenance.</FormDescription>
                        </div>
                        <FormControl>
                          <Switch checked={field.value} onCheckedChange={field.onChange} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={notificationsForm.control}
                    name="marketingEmails"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                          <FormLabel className="text-base">Marketing Emails</FormLabel>
                          <FormDescription>Receive emails about new features and promotions.</FormDescription>
                        </div>
                        <FormControl>
                          <Switch checked={field.value} onCheckedChange={field.onChange} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <div className="flex justify-end">
                    <Button type="submit" disabled={isSaving}>
                      {isSaving ? "Saving..." : "Save Changes"}
                    </Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="appearance">
          <Card>
            <CardHeader>
              <CardTitle>Appearance</CardTitle>
              <CardDescription>Customize the appearance of the application.</CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...appearanceForm}>
                <form onSubmit={appearanceForm.handleSubmit(onAppearanceSubmit)} className="space-y-4">
                  <FormField
                    control={appearanceForm.control}
                    name="theme"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Theme</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a theme" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="light">Light</SelectItem>
                            <SelectItem value="dark">Dark</SelectItem>
                            <SelectItem value="system">System</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormDescription>Select the theme for the application.</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={appearanceForm.control}
                    name="fontSize"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Font Size</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a font size" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="sm">Small</SelectItem>
                            <SelectItem value="md">Medium</SelectItem>
                            <SelectItem value="lg">Large</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormDescription>Select the font size for the application.</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={appearanceForm.control}
                    name="densityMode"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Density Mode</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a density mode" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="compact">Compact</SelectItem>
                            <SelectItem value="default">Default</SelectItem>
                            <SelectItem value="comfortable">Comfortable</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormDescription>Select the density mode for the application.</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="flex justify-end">
                    <Button type="submit" disabled={isSaving}>
                      {isSaving ? "Saving..." : "Save Changes"}
                    </Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle>Security</CardTitle>
              <CardDescription>Manage your security settings and preferences.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="text-lg font-medium">Password</h3>
                <p className="text-sm text-muted-foreground">Change your password to keep your account secure.</p>
                <Separator className="my-4" />
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="current-password">Current Password</Label>
                      <Input id="current-password" type="password" />
                    </div>
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
                  <div className="flex justify-end">
                    <Button>Change Password</Button>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium">Two-Factor Authentication</h3>
                <p className="text-sm text-muted-foreground">Add an extra layer of security to your account.</p>
                <Separator className="my-4" />
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Two-Factor Authentication</p>
                    <p className="text-sm text-muted-foreground">
                      Protect your account with two-factor authentication.
                    </p>
                  </div>
                  <Button variant="outline">Enable</Button>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium">Session Management</h3>
                <p className="text-sm text-muted-foreground">Manage your active sessions and devices.</p>
                <Separator className="my-4" />
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border rounded-md">
                    <div>
                      <p className="font-medium">Current Session</p>
                      <p className="text-sm text-muted-foreground">Windows 10 • Chrome • New York, USA</p>
                    </div>
                    <Badge>Active</Badge>
                  </div>
                  <div className="flex justify-end">
                    <Button variant="destructive">Sign Out All Devices</Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
