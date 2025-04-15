import { type User, UserRole, Permission, hasPermission } from "@/lib/auth"

// Define role relationships
export const roleRelationships = {
  [UserRole.ADMIN]: {
    canManage: [UserRole.DOCTOR, UserRole.NURSE, UserRole.RECEPTIONIST, UserRole.CASHIER, UserRole.PATIENT],
    canView: [UserRole.DOCTOR, UserRole.NURSE, UserRole.RECEPTIONIST, UserRole.CASHIER, UserRole.PATIENT],
  },
  [UserRole.DOCTOR]: {
    canManage: [],
    canView: [UserRole.NURSE, UserRole.PATIENT],
  },
  [UserRole.NURSE]: {
    canManage: [],
    canView: [UserRole.PATIENT],
  },
  [UserRole.RECEPTIONIST]: {
    canManage: [],
    canView: [UserRole.PATIENT],
  },
  [UserRole.CASHIER]: {
    canManage: [],
    canView: [UserRole.PATIENT],
  },
  [UserRole.PATIENT]: {
    canManage: [],
    canView: [],
  },
}

// Check if a user can manage another user based on roles
export function canManageUser(manager: User, target: User): boolean {
  if (!manager || !target) return false

  // Users can't manage themselves through this function
  if (manager.id === target.id) return false

  const relationships = roleRelationships[manager.role]
  return relationships ? relationships.canManage.includes(target.role) : false
}

// Check if a user can view another user's data
export function canViewUserData(viewer: User, target: User): boolean {
  if (!viewer || !target) return false

  // Users can always view their own data
  if (viewer.id === target.id) return true

  const relationships = roleRelationships[viewer.role]
  return relationships ? relationships.canView.includes(target.role) : false
}

// Define data access matrix - which roles can access which data types
export const dataAccessMatrix = {
  patient: {
    create: [Permission.REGISTER_PATIENTS],
    read: [
      Permission.VIEW_PATIENTS,
      Permission.VIEW_DASHBOARD,
      Permission.VIEW_OWN_RECORDS,
      Permission.MANAGE_APPOINTMENTS,
    ],
    update: [Permission.REGISTER_PATIENTS],
    delete: [Permission.SYSTEM_SETTINGS], // Only admins can delete patients
  },
  appointment: {
    create: [Permission.MANAGE_APPOINTMENTS],
    read: [Permission.MANAGE_APPOINTMENTS, Permission.VIEW_DASHBOARD, Permission.VIEW_OWN_RECORDS],
    update: [Permission.MANAGE_APPOINTMENTS],
    delete: [Permission.MANAGE_APPOINTMENTS],
  },
  medicalRecord: {
    create: [Permission.EDIT_MEDICAL_RECORDS],
    read: [Permission.VIEW_MEDICAL_RECORDS, Permission.EDIT_MEDICAL_RECORDS, Permission.VIEW_OWN_RECORDS],
    update: [Permission.EDIT_MEDICAL_RECORDS],
    delete: [Permission.SYSTEM_SETTINGS], // Only admins can delete medical records
  },
  prescription: {
    create: [Permission.PRESCRIBE_MEDICATION],
    read: [Permission.PRESCRIBE_MEDICATION, Permission.VIEW_MEDICAL_RECORDS, Permission.VIEW_OWN_RECORDS],
    update: [Permission.PRESCRIBE_MEDICATION],
    delete: [Permission.PRESCRIBE_MEDICATION],
  },
  invoice: {
    create: [Permission.MANAGE_BILLING],
    read: [Permission.MANAGE_BILLING, Permission.PROCESS_PAYMENTS, Permission.VIEW_OWN_RECORDS],
    update: [Permission.PROCESS_PAYMENTS, Permission.MANAGE_BILLING],
    delete: [Permission.MANAGE_BILLING],
  },
  vitalSign: {
    create: [Permission.RECORD_VITALS],
    read: [
      Permission.RECORD_VITALS,
      Permission.VIEW_MEDICAL_RECORDS,
      Permission.EDIT_MEDICAL_RECORDS,
      Permission.VIEW_OWN_RECORDS,
    ],
    update: [Permission.RECORD_VITALS],
    delete: [Permission.RECORD_VITALS],
  },
  supply: {
    create: [Permission.SYSTEM_SETTINGS],
    read: [Permission.VIEW_DASHBOARD, Permission.RECORD_VITALS],
    update: [Permission.RECORD_VITALS, Permission.SYSTEM_SETTINGS],
    delete: [Permission.SYSTEM_SETTINGS],
  },
  treatmentRoom: {
    create: [Permission.SYSTEM_SETTINGS],
    read: [Permission.VIEW_DASHBOARD, Permission.MANAGE_APPOINTMENTS, Permission.RECORD_VITALS],
    update: [Permission.MANAGE_APPOINTMENTS, Permission.RECORD_VITALS, Permission.SYSTEM_SETTINGS],
    delete: [Permission.SYSTEM_SETTINGS],
  },
}

// Check if a user can perform an action on a data type
export function canAccessData(
  user: User | null,
  dataType: keyof typeof dataAccessMatrix,
  action: "create" | "read" | "update" | "delete",
): boolean {
  if (!user) return false

  const requiredPermissions = dataAccessMatrix[dataType][action]
  return requiredPermissions.some((permission) => hasPermission(user, permission))
}

// Define data sharing rules between roles
export const dataSharingRules = {
  [UserRole.ADMIN]: {
    canShareWith: [UserRole.ADMIN, UserRole.DOCTOR, UserRole.NURSE, UserRole.RECEPTIONIST, UserRole.CASHIER],
    canReceiveFrom: [UserRole.ADMIN, UserRole.DOCTOR, UserRole.NURSE, UserRole.RECEPTIONIST, UserRole.CASHIER],
  },
  [UserRole.DOCTOR]: {
    canShareWith: [UserRole.ADMIN, UserRole.DOCTOR, UserRole.NURSE],
    canReceiveFrom: [UserRole.ADMIN, UserRole.DOCTOR, UserRole.NURSE, UserRole.RECEPTIONIST],
  },
  [UserRole.NURSE]: {
    canShareWith: [UserRole.ADMIN, UserRole.DOCTOR, UserRole.NURSE],
    canReceiveFrom: [UserRole.ADMIN, UserRole.DOCTOR, UserRole.NURSE],
  },
  [UserRole.RECEPTIONIST]: {
    canShareWith: [UserRole.ADMIN, UserRole.DOCTOR, UserRole.NURSE, UserRole.CASHIER],
    canReceiveFrom: [UserRole.ADMIN, UserRole.CASHIER],
  },
  [UserRole.CASHIER]: {
    canShareWith: [UserRole.ADMIN, UserRole.RECEPTIONIST],
    canReceiveFrom: [UserRole.ADMIN, UserRole.RECEPTIONIST],
  },
  [UserRole.PATIENT]: {
    canShareWith: [UserRole.ADMIN, UserRole.DOCTOR, UserRole.NURSE],
    canReceiveFrom: [UserRole.ADMIN, UserRole.DOCTOR, UserRole.NURSE, UserRole.RECEPTIONIST, UserRole.CASHIER],
  },
}

// Check if a user can share data with another user
export function canShareData(sharer: User, receiver: User): boolean {
  if (!sharer || !receiver) return false

  const rules = dataSharingRules[sharer.role]
  return rules ? rules.canShareWith.includes(receiver.role) : false
}

// Check if a user can receive data from another user
export function canReceiveData(receiver: User, sharer: User): boolean {
  if (!receiver || !sharer) return false

  const rules = dataSharingRules[receiver.role]
  return rules ? rules.canReceiveFrom.includes(sharer.role) : false
}
