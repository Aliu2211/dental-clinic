"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { mockUsers, UserRole } from "@/lib/auth"
import {
  Search,
  UserPlus,
  Edit,
  Trash,
  Filter,
  Download,
  MoreHorizontal,
  Shield,
  UserCog,
  Lock,
  Mail,
  AlertCircle,
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"

// Extended mock users with more details
const extendedUsers = mockUsers.map((user) => ({
  ...user,
  status: Math.random() > 0.2 ? "Active" : "Inactive",
  lastLogin: new Date(Date.now() - Math.floor(Math.random() * 10) * 24 * 60 * 60 * 1000).toISOString(),
  createdAt: new Date(Date.now() - Math.floor(Math.random() * 90) * 24 * 60 * 60 * 1000).toISOString(),
  permissions: ["View Dashboard", "View Patients", "Manage Appointments"],
  department:
    user.role === UserRole.DOCTOR
      ? "General Dentistry"
      : user.role === UserRole.NURSE
        ? "Clinical Staff"
        : user.role === UserRole.RECEPTIONIST
          ? "Front Desk"
          : user.role === UserRole.CASHIER
            ? "Finance"
            : "Administration",
  specialization: user.role === UserRole.DOCTOR ? "Orthodontics" : "",
  contactNumber: "+233 " + Math.floor(Math.random() * 900000000 + 100000000),
  address: "123 Main St, Accra, Ghana",
}))

export default function UsersPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedRole, setSelectedRole] = useState<string | null>(null)
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null)
  const [isAddUserDialogOpen, setIsAddUserDialogOpen] = useState(false)
  const [isEditUserDialogOpen, setIsEditUserDialogOpen] = useState(false)
  const [selectedUser, setSelectedUser] = useState<any>(null)
  const [addUserRole, setAddUserRole] = useState<string>(UserRole.DOCTOR.toString())
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false)
  const [userToDelete, setUserToDelete] = useState<any>(null)

  // Filter users based on search term, role, and status
  const filteredUsers = extendedUsers.filter((user) => {
    // Exclude patients from the list since they're not managed by admins
    if (user.role === UserRole.PATIENT) return false

    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesRole = selectedRole ? user.role === Number.parseInt(selectedRole) : true
    const matchesStatus = selectedStatus ? user.status === selectedStatus : true

    return matchesSearch && matchesRole && matchesStatus
  })

  const handleEditUser = (user: any) => {
    setSelectedUser(user)
    setIsEditUserDialogOpen(true)
  }

  const handleDeleteUser = (user: any) => {
    setUserToDelete(user)
    setIsDeleteConfirmOpen(true)
  }

  const confirmDeleteUser = () => {
    // In a real app, this would call an API to delete the user
    console.log(`Deleting user: ${userToDelete.id}`)
    setIsDeleteConfirmOpen(false)
    setUserToDelete(null)
  }

  const handleAddUser = () => {
    // In a real app, this would call an API to add the user
    console.log("Adding new user")
    setIsAddUserDialogOpen(false)
  }

  const handleUpdateUser = () => {
    // In a real app, this would call an API to update the user
    console.log(`Updating user: ${selectedUser.id}`)
    setIsEditUserDialogOpen(false)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">User Management</h2>
        <Button onClick={() => setIsAddUserDialogOpen(true)} className="flex items-center gap-2">
          <UserPlus className="h-4 w-4" />
          Add Staff Member
        </Button>
      </div>

      <Alert>
        <Shield className="h-4 w-4" />
        <AlertTitle>Admin Privileges</AlertTitle>
        <AlertDescription>
          As an administrator, you are responsible for creating and managing all staff accounts including doctors,
          nurses, receptionists, and cashiers.
        </AlertDescription>
      </Alert>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All Staff</TabsTrigger>
          <TabsTrigger value="doctors">Doctors</TabsTrigger>
          <TabsTrigger value="nurses">Nurses</TabsTrigger>
          <TabsTrigger value="receptionists">Receptionists</TabsTrigger>
          <TabsTrigger value="cashiers">Cashiers</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Staff Management</CardTitle>
              <CardDescription>Manage all staff members and their roles</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-4 flex flex-col space-y-3 md:flex-row md:items-center md:justify-between md:space-y-0">
                <div className="flex w-full flex-1 items-center space-x-2">
                  <div className="relative flex-1">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search staff members..."
                      className="pl-8"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="sm" className="h-9">
                        <Filter className="mr-2 h-4 w-4" />
                        Filter
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-[200px]">
                      <DropdownMenuLabel>Filter by Role</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={() => setSelectedRole(null)}>All Roles</DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setSelectedRole(UserRole.ADMIN.toString())}>
                        Admin
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setSelectedRole(UserRole.DOCTOR.toString())}>
                        Doctor
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setSelectedRole(UserRole.NURSE.toString())}>
                        Nurse
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setSelectedRole(UserRole.RECEPTIONIST.toString())}>
                        Receptionist
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setSelectedRole(UserRole.CASHIER.toString())}>
                        Cashier
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuLabel>Filter by Status</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={() => setSelectedStatus(null)}>All Statuses</DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setSelectedStatus("Active")}>Active</DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setSelectedStatus("Inactive")}>Inactive</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                  <Button variant="outline" size="sm" className="h-9">
                    <Download className="mr-2 h-4 w-4" />
                    Export
                  </Button>
                </div>
              </div>

              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Department</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredUsers.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={6} className="h-24 text-center">
                          No staff members found.
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredUsers.map((user) => (
                        <TableRow key={user.id}>
                          <TableCell className="font-medium">
                            <div className="flex items-center">
                              <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center mr-2">
                                {user.name.charAt(0)}
                              </div>
                              {user.name}
                            </div>
                          </TableCell>
                          <TableCell>{user.email}</TableCell>
                          <TableCell>
                            <Badge variant={user.role === UserRole.ADMIN ? "default" : "outline"}>
                              {UserRoleToString(user.role)}
                            </Badge>
                          </TableCell>
                          <TableCell>{user.department}</TableCell>
                          <TableCell>
                            <Badge variant={user.status === "Active" ? "success" : "secondary"}>{user.status}</Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button variant="ghost" size="icon" onClick={() => handleEditUser(user)}>
                                <Edit className="h-4 w-4" />
                              </Button>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="icon">
                                    <MoreHorizontal className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                  <DropdownMenuItem>
                                    <UserCog className="mr-2 h-4 w-4" />
                                    <span>Edit Permissions</span>
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>
                                    <Lock className="mr-2 h-4 w-4" />
                                    <span>Reset Password</span>
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>
                                    <Mail className="mr-2 h-4 w-4" />
                                    <span>Send Email</span>
                                  </DropdownMenuItem>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem className="text-red-600" onClick={() => handleDeleteUser(user)}>
                                    <Trash className="mr-2 h-4 w-4" />
                                    <span>Delete User</span>
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
            <CardFooter className="flex items-center justify-between border-t px-6 py-4">
              <div className="text-xs text-muted-foreground">
                Showing <strong>{filteredUsers.length}</strong> of{" "}
                <strong>{extendedUsers.filter((u) => u.role !== UserRole.PATIENT).length}</strong> staff members
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm" disabled>
                  Previous
                </Button>
                <Button variant="outline" size="sm" disabled>
                  Next
                </Button>
              </div>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="doctors" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Doctors</CardTitle>
              <CardDescription>Manage doctor accounts and specializations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Specialization</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {extendedUsers
                      .filter((user) => user.role === UserRole.DOCTOR)
                      .map((user) => (
                        <TableRow key={user.id}>
                          <TableCell className="font-medium">
                            <div className="flex items-center">
                              <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center mr-2">
                                {user.name.charAt(0)}
                              </div>
                              {user.name}
                            </div>
                          </TableCell>
                          <TableCell>{user.email}</TableCell>
                          <TableCell>{user.specialization || "General Dentistry"}</TableCell>
                          <TableCell>
                            <Badge variant={user.status === "Active" ? "success" : "secondary"}>{user.status}</Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="sm" onClick={() => handleEditUser(user)}>
                              Edit
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="nurses" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Nurses</CardTitle>
              <CardDescription>Manage nurse accounts</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Department</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {extendedUsers
                      .filter((user) => user.role === UserRole.NURSE)
                      .map((user) => (
                        <TableRow key={user.id}>
                          <TableCell className="font-medium">
                            <div className="flex items-center">
                              <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center mr-2">
                                {user.name.charAt(0)}
                              </div>
                              {user.name}
                            </div>
                          </TableCell>
                          <TableCell>{user.email}</TableCell>
                          <TableCell>{user.department}</TableCell>
                          <TableCell>
                            <Badge variant={user.status === "Active" ? "success" : "secondary"}>{user.status}</Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="sm" onClick={() => handleEditUser(user)}>
                              Edit
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="receptionists" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Receptionists</CardTitle>
              <CardDescription>Manage receptionist accounts</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Contact Number</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {extendedUsers
                      .filter((user) => user.role === UserRole.RECEPTIONIST)
                      .map((user) => (
                        <TableRow key={user.id}>
                          <TableCell className="font-medium">
                            <div className="flex items-center">
                              <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center mr-2">
                                {user.name.charAt(0)}
                              </div>
                              {user.name}
                            </div>
                          </TableCell>
                          <TableCell>{user.email}</TableCell>
                          <TableCell>{user.contactNumber}</TableCell>
                          <TableCell>
                            <Badge variant={user.status === "Active" ? "success" : "secondary"}>{user.status}</Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="sm" onClick={() => handleEditUser(user)}>
                              Edit
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="cashiers" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Cashiers</CardTitle>
              <CardDescription>Manage cashier accounts</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Contact Number</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {extendedUsers
                      .filter((user) => user.role === UserRole.CASHIER)
                      .map((user) => (
                        <TableRow key={user.id}>
                          <TableCell className="font-medium">
                            <div className="flex items-center">
                              <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center mr-2">
                                {user.name.charAt(0)}
                              </div>
                              {user.name}
                            </div>
                          </TableCell>
                          <TableCell>{user.email}</TableCell>
                          <TableCell>{user.contactNumber}</TableCell>
                          <TableCell>
                            <Badge variant={user.status === "Active" ? "success" : "secondary"}>{user.status}</Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="sm" onClick={() => handleEditUser(user)}>
                              Edit
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Add User Dialog */}
      <Dialog open={isAddUserDialogOpen} onOpenChange={setIsAddUserDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Add New Staff Member</DialogTitle>
            <DialogDescription>Create a new staff account. All fields are required.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-6 py-4">
            <div className="space-y-4">
              <h3 className="text-sm font-medium">Staff Role</h3>
              <RadioGroup defaultValue={addUserRole} onValueChange={setAddUserRole} className="grid grid-cols-2 gap-4">
                <div>
                  <RadioGroupItem value={UserRole.DOCTOR.toString()} id="role-doctor" className="peer sr-only" />
                  <Label
                    htmlFor="role-doctor"
                    className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                  >
                    <Shield className="mb-3 h-6 w-6" />
                    Doctor
                  </Label>
                </div>
                <div>
                  <RadioGroupItem value={UserRole.NURSE.toString()} id="role-nurse" className="peer sr-only" />
                  <Label
                    htmlFor="role-nurse"
                    className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                  >
                    <Shield className="mb-3 h-6 w-6" />
                    Nurse
                  </Label>
                </div>
                <div>
                  <RadioGroupItem
                    value={UserRole.RECEPTIONIST.toString()}
                    id="role-receptionist"
                    className="peer sr-only"
                  />
                  <Label
                    htmlFor="role-receptionist"
                    className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                  >
                    <Shield className="mb-3 h-6 w-6" />
                    Receptionist
                  </Label>
                </div>
                <div>
                  <RadioGroupItem value={UserRole.CASHIER.toString()} id="role-cashier" className="peer sr-only" />
                  <Label
                    htmlFor="role-cashier"
                    className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                  >
                    <Shield className="mb-3 h-6 w-6" />
                    Cashier
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <Separator />

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" placeholder="John Doe" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="john@example.com" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="contact">Contact Number</Label>
                <Input id="contact" placeholder="+233 123456789" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Temporary Password</Label>
                <Input id="password" type="password" />
              </div>
            </div>

            {addUserRole === UserRole.DOCTOR.toString() && (
              <div className="space-y-2">
                <Label htmlFor="specialization">Specialization</Label>
                <Select>
                  <SelectTrigger id="specialization">
                    <SelectValue placeholder="Select specialization" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="general">General Dentistry</SelectItem>
                    <SelectItem value="orthodontics">Orthodontics</SelectItem>
                    <SelectItem value="periodontics">Periodontics</SelectItem>
                    <SelectItem value="endodontics">Endodontics</SelectItem>
                    <SelectItem value="oral-surgery">Oral Surgery</SelectItem>
                    <SelectItem value="pediatric">Pediatric Dentistry</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}

            {addUserRole === UserRole.NURSE.toString() && (
              <div className="space-y-2">
                <Label htmlFor="department">Department</Label>
                <Select>
                  <SelectTrigger id="department">
                    <SelectValue placeholder="Select department" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="clinical">Clinical Staff</SelectItem>
                    <SelectItem value="surgical">Surgical Assistance</SelectItem>
                    <SelectItem value="pediatric">Pediatric Care</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <Textarea id="address" placeholder="123 Main St, Accra, Ghana" />
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox id="send-credentials" />
              <Label htmlFor="send-credentials">Send login credentials via email</Label>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddUserDialogOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" onClick={handleAddUser}>
              Create Staff Account
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit User Dialog */}
      <Dialog open={isEditUserDialogOpen} onOpenChange={setIsEditUserDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Edit Staff Member</DialogTitle>
            <DialogDescription>Update staff information and permissions.</DialogDescription>
          </DialogHeader>
          {selectedUser && (
            <div className="grid gap-6 py-4">
              <div className="flex items-center space-x-4">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                  {selectedUser.name.charAt(0)}
                </div>
                <div>
                  <h3 className="text-lg font-medium">{selectedUser.name}</h3>
                  <p className="text-sm text-muted-foreground">{UserRoleToString(selectedUser.role)}</p>
                </div>
              </div>

              <Separator />

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-name">Full Name</Label>
                  <Input id="edit-name" defaultValue={selectedUser.name} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-email">Email</Label>
                  <Input id="edit-email" type="email" defaultValue={selectedUser.email} />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-contact">Contact Number</Label>
                  <Input id="edit-contact" defaultValue={selectedUser.contactNumber} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-status">Status</Label>
                  <Select defaultValue={selectedUser.status}>
                    <SelectTrigger id="edit-status">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Active">Active</SelectItem>
                      <SelectItem value="Inactive">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {selectedUser.role === UserRole.DOCTOR && (
                <div className="space-y-2">
                  <Label htmlFor="edit-specialization">Specialization</Label>
                  <Select defaultValue={selectedUser.specialization || "general"}>
                    <SelectTrigger id="edit-specialization">
                      <SelectValue placeholder="Select specialization" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="general">General Dentistry</SelectItem>
                      <SelectItem value="orthodontics">Orthodontics</SelectItem>
                      <SelectItem value="periodontics">Periodontics</SelectItem>
                      <SelectItem value="endodontics">Endodontics</SelectItem>
                      <SelectItem value="oral-surgery">Oral Surgery</SelectItem>
                      <SelectItem value="pediatric">Pediatric Dentistry</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}

              {selectedUser.role === UserRole.NURSE && (
                <div className="space-y-2">
                  <Label htmlFor="edit-department">Department</Label>
                  <Select defaultValue={selectedUser.department || "clinical"}>
                    <SelectTrigger id="edit-department">
                      <SelectValue placeholder="Select department" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="clinical">Clinical Staff</SelectItem>
                      <SelectItem value="surgical">Surgical Assistance</SelectItem>
                      <SelectItem value="pediatric">Pediatric Care</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="edit-address">Address</Label>
                <Textarea id="edit-address" defaultValue={selectedUser.address} />
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-sm font-medium">Permissions</h3>
                <div className="grid grid-cols-2 gap-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="permission-dashboard" defaultChecked />
                    <Label htmlFor="permission-dashboard">View Dashboard</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="permission-patients" defaultChecked />
                    <Label htmlFor="permission-patients">View Patients</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="permission-appointments" defaultChecked />
                    <Label htmlFor="permission-appointments">Manage Appointments</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="permission-records" defaultChecked={selectedUser.role === UserRole.DOCTOR} />
                    <Label htmlFor="permission-records">Edit Medical Records</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="permission-billing" defaultChecked={selectedUser.role === UserRole.CASHIER} />
                    <Label htmlFor="permission-billing">Process Payments</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="permission-prescriptions" defaultChecked={selectedUser.role === UserRole.DOCTOR} />
                    <Label htmlFor="permission-prescriptions">Prescribe Medication</Label>
                  </div>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditUserDialogOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" onClick={handleUpdateUser}>
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteConfirmOpen} onOpenChange={setIsDeleteConfirmOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this staff member? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          {userToDelete && (
            <div className="py-4">
              <div className="flex items-center space-x-4">
                <div className="h-12 w-12 rounded-full bg-destructive/10 flex items-center justify-center">
                  <AlertCircle className="h-6 w-6 text-destructive" />
                </div>
                <div>
                  <h3 className="font-medium">{userToDelete.name}</h3>
                  <p className="text-sm text-muted-foreground">{userToDelete.email}</p>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteConfirmOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmDeleteUser}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

function UserRoleToString(role: number): string {
  const roles = ["Admin", "Doctor", "Nurse", "Receptionist", "Cashier", "Patient"]
  return roles[role] || "Unknown"
}
