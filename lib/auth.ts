export enum UserRole {
  ADMIN = 0,
  DOCTOR = 1,
  NURSE = 2,
  RECEPTIONIST = 3,
  CASHIER = 4,
  PATIENT = 5,
}

export interface User {
  id: string
  name: string
  email: string
  role: UserRole
  profileImage?: string
}

// Mock users for testing
export const mockUsers: User[] = [
  {
    id: "1",
    name: "Admin User",
    email: "admin@dentonic.com",
    role: UserRole.ADMIN,
    profileImage: "/placeholder.svg?height=32&width=32",
  },
  {
    id: "2",
    name: "Dr. Sarah Johnson",
    email: "doctor@dentonic.com",
    role: UserRole.DOCTOR,
    profileImage: "/placeholder.svg?height=32&width=32",
  },
  {
    id: "3",
    name: "Nurse Emily",
    email: "nurse@dentonic.com",
    role: UserRole.NURSE,
    profileImage: "/placeholder.svg?height=32&width=32",
  },
  {
    id: "4",
    name: "Receptionist Lisa",
    email: "receptionist@dentonic.com",
    role: UserRole.RECEPTIONIST,
    profileImage: "/placeholder.svg?height=32&width=32",
  },
  {
    id: "5",
    name: "Cashier Michael",
    email: "cashier@dentonic.com",
    role: UserRole.CASHIER,
    profileImage: "/placeholder.svg?height=32&width=32",
  },
  {
    id: "6",
    name: "Peter Patient",
    email: "patient@example.com",
    role: UserRole.PATIENT,
    profileImage: "/placeholder.svg?height=32&width=32",
  },
  {
    id: "7",
    name: "Dr. James Wilson",
    email: "drwilson@dentonic.com",
    role: UserRole.DOCTOR,
    profileImage: "/placeholder.svg?height=32&width=32",
  },
]

// Function to find a user by email and password
export function findUserByCredentials(email: string, password: string): User | null {
  // In a real app, you would hash the password and check against a database
  // For this demo, we'll just check if the email exists in our mock users
  // and assume the password is "password" for all users
  const user = mockUsers.find((user) => user.email === email)

  // Check if user exists and password is correct (in this case, always "password")
  if (user && password === "password") {
    return user
  }

  return null
}

// Define permissions for each role
export const rolePermissions: Record<string, number[]> = {
  // Admin has access to everything
  [UserRole.ADMIN]: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
  // Doctor has access to patients, appointments, medical records, prescriptions
  [UserRole.DOCTOR]: [1, 2, 3, 4, 8, 9, 10],
  // Nurse has access to patients, vitals, basic medical records
  [UserRole.NURSE]: [1, 2, 5, 8],
  // Receptionist has access to appointments, patient registration
  [UserRole.RECEPTIONIST]: [1, 2, 3, 6],
  // Cashier has access to billing and payments
  [UserRole.CASHIER]: [1, 7, 11],
  // Patient has access to their own records, appointments, and payments
  [UserRole.PATIENT]: [1, 2, 3, 7, 8, 12],
}

// Permission IDs
export enum Permission {
  VIEW_DASHBOARD = 1,
  VIEW_PATIENTS = 2,
  MANAGE_APPOINTMENTS = 3,
  EDIT_MEDICAL_RECORDS = 4,
  RECORD_VITALS = 5,
  REGISTER_PATIENTS = 6,
  PROCESS_PAYMENTS = 7,
  VIEW_MEDICAL_RECORDS = 8,
  PRESCRIBE_MEDICATION = 9,
  ORDER_TESTS = 10,
  MANAGE_BILLING = 11,
  VIEW_OWN_RECORDS = 12,
  MANAGE_STAFF = 13,
  SYSTEM_SETTINGS = 14,
  AUDIT_LOGS = 15,
}

// Function to check if a user has a specific permission
export function hasPermission(user: User | null, permission: Permission): boolean {
  if (!user) return false
  const permissions = rolePermissions[user.role]
  return permissions ? permissions.includes(permission) : false
}

// Browser-safe implementations for JWT and cookies
export async function signToken(payload: any): Promise<string> {
  // In a real app, you would use a library like jsonwebtoken
  // For this demo, we'll just stringify the payload
  return `mock-jwt-token-${JSON.stringify(payload)}`
}

export async function verifyToken(token: string): Promise<any> {
  if (token.startsWith("mock-jwt-token-")) {
    try {
      return JSON.parse(token.replace("mock-jwt-token-", ""))
    } catch {
      return null
    }
  }
  return null
}

export function setAuthCookie(token: string): void {
  if (typeof document !== "undefined") {
    document.cookie = `auth_token=${token}; path=/; max-age=3600`
  }
}

export function clearAuthCookie(): void {
  if (typeof document !== "undefined") {
    document.cookie = "auth_token=; path=/; max-age=0"
  }
}

export function getAuthCookie(): string | null {
  if (typeof document === "undefined") return null

  const name = "auth_token="
  const decodedCookie = decodeURIComponent(document.cookie)
  const ca = decodedCookie.split(";")
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i]
    while (c.charAt(0) == " ") {
      c = c.substring(1)
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length)
    }
  }
  return null
}
