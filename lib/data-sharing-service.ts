import type { User, UserRole } from "@/lib/auth"
import { canAccessData } from "@/lib/rbac"
import type {
  Patient,
  Appointment,
  MedicalRecord,
  Invoice,
  Prescription,
  VitalSign,
  Supply,
  TreatmentRoom,
} from "@/contexts/shared-data-context"

// Define the types of notifications for data sharing
export enum NotificationType {
  PATIENT_ASSIGNED = "PATIENT_ASSIGNED",
  APPOINTMENT_SCHEDULED = "APPOINTMENT_SCHEDULED",
  MEDICAL_RECORD_CREATED = "MEDICAL_RECORD_CREATED",
  PRESCRIPTION_CREATED = "PRESCRIPTION_CREATED",
  VITAL_SIGNS_RECORDED = "VITAL_SIGNS_RECORDED",
  INVOICE_CREATED = "INVOICE_CREATED",
  PAYMENT_PROCESSED = "PAYMENT_PROCESSED",
  SUPPLY_LOW = "SUPPLY_LOW",
  ROOM_STATUS_CHANGED = "ROOM_STATUS_CHANGED",
}

// Define the notification interface
export interface Notification {
  id: string
  type: NotificationType
  message: string
  details: any
  sender: string
  recipients: string[]
  read: Record<string, boolean>
  createdAt: string
}

// Mock notifications
const mockNotifications: Notification[] = []

// Generate a unique ID
function generateId(prefix: string): string {
  return `${prefix}${Date.now()}${Math.floor(Math.random() * 1000)}`
}

// Share patient data between roles
export async function sharePatientData(
  sender: User,
  recipientRole: UserRole,
  patient: Patient,
  message: string,
): Promise<boolean> {
  // Check if sender can share patient data
  if (!canAccessData(sender, "patient", "read")) {
    console.error("Sender does not have permission to share patient data")
    return false
  }

  // Create a notification for the data sharing
  const notification: Notification = {
    id: generateId("NOT"),
    type: NotificationType.PATIENT_ASSIGNED,
    message,
    details: {
      patientId: patient.id,
      patientName: patient.name,
    },
    sender: sender.id,
    recipients: [], // Will be populated based on recipient role
    read: {},
    createdAt: new Date().toISOString(),
  }

  // In a real app, we would query users by role and add them to recipients
  // For this mock, we'll just add the notification
  mockNotifications.push(notification)

  return true
}

// Share appointment data between roles
export async function shareAppointmentData(
  sender: User,
  recipientIds: string[],
  appointment: Appointment,
  message: string,
): Promise<boolean> {
  // Check if sender can share appointment data
  if (!canAccessData(sender, "appointment", "read")) {
    console.error("Sender does not have permission to share appointment data")
    return false
  }

  // Create a notification for the data sharing
  const notification: Notification = {
    id: generateId("NOT"),
    type: NotificationType.APPOINTMENT_SCHEDULED,
    message,
    details: {
      appointmentId: appointment.id,
      patientName: appointment.patientName,
      date: appointment.date,
      time: appointment.time,
    },
    sender: sender.id,
    recipients: recipientIds,
    read: recipientIds.reduce((acc, id) => ({ ...acc, [id]: false }), {}),
    createdAt: new Date().toISOString(),
  }

  mockNotifications.push(notification)

  return true
}

// Share medical record data between roles
export async function shareMedicalRecordData(
  sender: User,
  recipientIds: string[],
  record: MedicalRecord,
  message: string,
): Promise<boolean> {
  // Check if sender can share medical record data
  if (!canAccessData(sender, "medicalRecord", "read")) {
    console.error("Sender does not have permission to share medical record data")
    return false
  }

  // Create a notification for the data sharing
  const notification: Notification = {
    id: generateId("NOT"),
    type: NotificationType.MEDICAL_RECORD_CREATED,
    message,
    details: {
      recordId: record.id,
      patientId: record.patientId,
      type: record.type,
      diagnosis: record.diagnosis,
    },
    sender: sender.id,
    recipients: recipientIds,
    read: recipientIds.reduce((acc, id) => ({ ...acc, [id]: false }), {}),
    createdAt: new Date().toISOString(),
  }

  mockNotifications.push(notification)

  return true
}

// Share prescription data between roles
export async function sharePrescriptionData(
  sender: User,
  recipientIds: string[],
  prescription: Prescription,
  message: string,
): Promise<boolean> {
  // Check if sender can share prescription data
  if (!canAccessData(sender, "prescription", "read")) {
    console.error("Sender does not have permission to share prescription data")
    return false
  }

  // Create a notification for the data sharing
  const notification: Notification = {
    id: generateId("NOT"),
    type: NotificationType.PRESCRIPTION_CREATED,
    message,
    details: {
      prescriptionId: prescription.id,
      patientName: prescription.patientName,
      medications: prescription.medications.map((m) => m.name).join(", "),
    },
    sender: sender.id,
    recipients: recipientIds,
    read: recipientIds.reduce((acc, id) => ({ ...acc, [id]: false }), {}),
    createdAt: new Date().toISOString(),
  }

  mockNotifications.push(notification)

  return true
}

// Share vital signs data between roles
export async function shareVitalSignsData(
  sender: User,
  recipientIds: string[],
  vitalSign: VitalSign,
  message: string,
): Promise<boolean> {
  // Check if sender can share vital signs data
  if (!canAccessData(sender, "vitalSign", "read")) {
    console.error("Sender does not have permission to share vital signs data")
    return false
  }

  // Create a notification for the data sharing
  const notification: Notification = {
    id: generateId("NOT"),
    type: NotificationType.VITAL_SIGNS_RECORDED,
    message,
    details: {
      vitalSignId: vitalSign.id,
      patientId: vitalSign.patientId,
      date: vitalSign.date,
      time: vitalSign.time,
    },
    sender: sender.id,
    recipients: recipientIds,
    read: recipientIds.reduce((acc, id) => ({ ...acc, [id]: false }), {}),
    createdAt: new Date().toISOString(),
  }

  mockNotifications.push(notification)

  return true
}

// Share invoice data between roles
export async function shareInvoiceData(
  sender: User,
  recipientIds: string[],
  invoice: Invoice,
  message: string,
): Promise<boolean> {
  // Check if sender can share invoice data
  if (!canAccessData(sender, "invoice", "read")) {
    console.error("Sender does not have permission to share invoice data")
    return false
  }

  // Create a notification for the data sharing
  const notification: Notification = {
    id: generateId("NOT"),
    type: NotificationType.INVOICE_CREATED,
    message,
    details: {
      invoiceId: invoice.id,
      patientName: invoice.patientName,
      amount: invoice.amount,
      service: invoice.service,
    },
    sender: sender.id,
    recipients: recipientIds,
    read: recipientIds.reduce((acc, id) => ({ ...acc, [id]: false }), {}),
    createdAt: new Date().toISOString(),
  }

  mockNotifications.push(notification)

  return true
}

// Share supply status between roles
export async function shareSupplyStatus(
  sender: User,
  recipientIds: string[],
  supply: Supply,
  message: string,
): Promise<boolean> {
  // Check if sender can share supply data
  if (!canAccessData(sender, "supply", "read")) {
    console.error("Sender does not have permission to share supply data")
    return false
  }

  // Create a notification for the data sharing
  const notification: Notification = {
    id: generateId("NOT"),
    type: NotificationType.SUPPLY_LOW,
    message,
    details: {
      supplyId: supply.id,
      supplyName: supply.name,
      quantity: supply.quantity,
      threshold: supply.threshold,
    },
    sender: sender.id,
    recipients: recipientIds,
    read: recipientIds.reduce((acc, id) => ({ ...acc, [id]: false }), {}),
    createdAt: new Date().toISOString(),
  }

  mockNotifications.push(notification)

  return true
}

// Share treatment room status between roles
export async function shareRoomStatus(
  sender: User,
  recipientIds: string[],
  room: TreatmentRoom,
  message: string,
): Promise<boolean> {
  // Check if sender can share treatment room data
  if (!canAccessData(sender, "treatmentRoom", "read")) {
    console.error("Sender does not have permission to share treatment room data")
    return false
  }

  // Create a notification for the data sharing
  const notification: Notification = {
    id: generateId("NOT"),
    type: NotificationType.ROOM_STATUS_CHANGED,
    message,
    details: {
      roomId: room.id,
      roomName: room.name,
      status: room.status,
      currentPatient: room.currentPatient,
      currentDoctor: room.currentDoctor,
    },
    sender: sender.id,
    recipients: recipientIds,
    read: recipientIds.reduce((acc, id) => ({ ...acc, [id]: false }), {}),
    createdAt: new Date().toISOString(),
  }

  mockNotifications.push(notification)

  return true
}

// Get notifications for a user
export function getNotificationsForUser(userId: string): Notification[] {
  return mockNotifications
    .filter((notification) => notification.recipients.includes(userId))
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
}

// Mark a notification as read
export function markNotificationAsRead(notificationId: string, userId: string): boolean {
  const notification = mockNotifications.find((n) => n.id === notificationId)
  if (!notification) return false

  if (notification.recipients.includes(userId)) {
    notification.read[userId] = true
    return true
  }

  return false
}

// Get unread notification count for a user
export function getUnreadNotificationCount(userId: string): number {
  return mockNotifications.filter(
    (notification) =>
      notification.recipients.includes(userId) && (!notification.read[userId] || notification.read[userId] === false),
  ).length
}
