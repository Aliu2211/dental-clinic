"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { UserRole, hasPermission, Permission } from "@/lib/auth"
import { useAuth } from "@/hooks/use-auth"

// Define interfaces for shared data types
export interface Patient {
  id: string
  name: string
  email: string
  phone: string
  dateOfBirth: string
  gender: string
  address: string
  insuranceProvider?: string
  insuranceNumber?: string
  medicalHistory?: string
  allergies?: string[]
  assignedDoctor?: string
  assignedNurse?: string
  lastVisit?: string
  status: "Active" | "Inactive"
  registeredDate: string
}

export interface Appointment {
  id: string
  patientId: string
  patientName: string
  doctorId: string
  doctorName: string
  date: string
  time: string
  duration: number
  type: string
  status: "Scheduled" | "Checked In" | "In Progress" | "Completed" | "Cancelled" | "No Show"
  notes?: string
  room?: string
  createdBy: string
  createdAt: string
}

export interface MedicalRecord {
  id: string
  patientId: string
  doctorId: string
  date: string
  type: string
  diagnosis: string
  treatment: string
  notes: string
  attachments: number
  verified: boolean
  blockchainHash?: string
}

export interface Invoice {
  id: string
  patientId: string
  patientName: string
  date: string
  dueDate: string
  amount: string
  service: string
  status: "Paid" | "Pending" | "Partially Paid" | "Overdue"
  paymentMethod?: string
  paymentDate?: string
  cashierId?: string
}

export interface Prescription {
  id: string
  patientId: string
  patientName: string
  doctorId: string
  doctorName: string
  date: string
  medications: {
    name: string
    dosage: string
    frequency: string
    duration: string
    instructions: string
  }[]
  status: "Active" | "Completed" | "Cancelled"
  notes?: string
}

export interface VitalSign {
  id: string
  patientId: string
  nurseId: string
  date: string
  time: string
  bloodPressure?: string
  heartRate?: number
  temperature?: number
  respiratoryRate?: number
  oxygenSaturation?: number
  pain?: number
  notes?: string
}

export interface Supply {
  id: string
  name: string
  category: string
  quantity: number
  unit: string
  threshold: number
  location: string
  lastRestocked: string
  restockedBy: string
}

export interface TreatmentRoom {
  id: string
  name: string
  status: "Ready" | "Occupied" | "Cleaning" | "Maintenance"
  currentPatient?: string
  currentDoctor?: string
  currentProcedure?: string
  lastCleaned?: string
  equipment: string[]
}

// Define the shared data context type
interface SharedDataContextType {
  // Data collections
  patients: Patient[]
  appointments: Appointment[]
  medicalRecords: MedicalRecord[]
  invoices: Invoice[]
  prescriptions: Prescription[]
  vitalSigns: VitalSign[]
  supplies: Supply[]
  treatmentRooms: TreatmentRoom[]

  // Data access methods
  getPatientById: (id: string) => Patient | undefined
  getAppointmentsForPatient: (patientId: string) => Appointment[]
  getAppointmentsForDoctor: (doctorId: string) => Appointment[]
  getMedicalRecordsForPatient: (patientId: string) => MedicalRecord[]
  getInvoicesForPatient: (patientId: string) => Invoice[]
  getPrescriptionsForPatient: (patientId: string) => Prescription[]
  getVitalSignsForPatient: (patientId: string) => VitalSign[]

  // Data mutation methods
  addPatient: (patient: Omit<Patient, "id" | "registeredDate">) => Promise<Patient>
  updatePatient: (id: string, data: Partial<Patient>) => Promise<Patient>
  addAppointment: (appointment: Omit<Appointment, "id" | "createdAt">) => Promise<Appointment>
  updateAppointment: (id: string, data: Partial<Appointment>) => Promise<Appointment>
  addMedicalRecord: (record: Omit<MedicalRecord, "id">) => Promise<MedicalRecord>
  addInvoice: (invoice: Omit<Invoice, "id">) => Promise<Invoice>
  updateInvoice: (id: string, data: Partial<Invoice>) => Promise<Invoice>
  addPrescription: (prescription: Omit<Prescription, "id">) => Promise<Prescription>
  addVitalSign: (vitalSign: Omit<VitalSign, "id">) => Promise<VitalSign>
  updateSupply: (id: string, data: Partial<Supply>) => Promise<Supply>
  updateTreatmentRoom: (id: string, data: Partial<TreatmentRoom>) => Promise<TreatmentRoom>

  // Loading states
  isLoading: boolean
  error: string | null
}

// Create the context
const SharedDataContext = createContext<SharedDataContextType | undefined>(undefined)

// Mock data for demonstration
import { mockPatients } from "@/lib/mock-data/patients"
import { mockAppointments } from "@/lib/mock-data/appointments"
import { mockMedicalRecords } from "@/lib/mock-data/medical-records"
import { mockInvoices } from "@/lib/mock-data/invoices"
import { mockPrescriptions } from "@/lib/mock-data/prescriptions"
import { mockVitalSigns } from "@/lib/mock-data/vital-signs"
import { mockSupplies } from "@/lib/mock-data/supplies"
import { mockTreatmentRooms } from "@/lib/mock-data/treatment-rooms"

// Provider component
export function SharedDataProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth()

  const [patients, setPatients] = useState<Patient[]>(mockPatients)
  const [appointments, setAppointments] = useState<Appointment[]>(mockAppointments)
  const [medicalRecords, setMedicalRecords] = useState<MedicalRecord[]>(mockMedicalRecords)
  const [invoices, setInvoices] = useState<Invoice[]>(mockInvoices)
  const [prescriptions, setPrescriptions] = useState<Prescription[]>(mockPrescriptions)
  const [vitalSigns, setVitalSigns] = useState<VitalSign[]>(mockVitalSigns)
  const [supplies, setSupplies] = useState<Supply[]>(mockSupplies)
  const [treatmentRooms, setTreatmentRooms] = useState<TreatmentRoom[]>(mockTreatmentRooms)

  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Simulate data loading
  useEffect(() => {
    // In a real app, this would fetch data from an API
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  // Data access methods with role-based filtering
  const getPatientById = (id: string) => {
    // Apply role-based access control
    if (!user) return undefined

    // Admin, Doctor, Nurse, Receptionist can access all patients
    if ([UserRole.ADMIN, UserRole.DOCTOR, UserRole.NURSE, UserRole.RECEPTIONIST].includes(user.role)) {
      return patients.find((p) => p.id === id)
    }

    // Cashier can access patient basic info for billing
    if (user.role === UserRole.CASHIER) {
      const patient = patients.find((p) => p.id === id)
      if (patient) {
        // Return limited patient info for cashier
        const { medicalHistory, ...limitedInfo } = patient
        return limitedInfo as Patient
      }
      return undefined
    }

    // Patients can only access their own data
    if (user.role === UserRole.PATIENT) {
      // Assuming patient user ID matches patient ID in the system
      return user.id === id ? patients.find((p) => p.id === id) : undefined
    }

    return undefined
  }

  const getAppointmentsForPatient = (patientId: string) => {
    if (!user) return []

    // Admin, Doctor, Nurse, Receptionist can access all appointments
    if ([UserRole.ADMIN, UserRole.DOCTOR, UserRole.NURSE, UserRole.RECEPTIONIST].includes(user.role)) {
      return appointments.filter((a) => a.patientId === patientId)
    }

    // Patients can only access their own appointments
    if (user.role === UserRole.PATIENT) {
      return user.id === patientId ? appointments.filter((a) => a.patientId === patientId) : []
    }

    // Cashier has limited access
    if (user.role === UserRole.CASHIER) {
      return appointments
        .filter((a) => a.patientId === patientId)
        .map(({ notes, ...appointment }) => appointment as Appointment)
    }

    return []
  }

  const getAppointmentsForDoctor = (doctorId: string) => {
    if (!user) return []

    // Admin can access all appointments
    if (user.role === UserRole.ADMIN) {
      return appointments.filter((a) => a.doctorId === doctorId)
    }

    // Doctors can only access their own appointments
    if (user.role === UserRole.DOCTOR) {
      return user.id === doctorId ? appointments.filter((a) => a.doctorId === doctorId) : []
    }

    // Nurse and Receptionist can access appointments for all doctors
    if ([UserRole.NURSE, UserRole.RECEPTIONIST].includes(user.role)) {
      return appointments.filter((a) => a.doctorId === doctorId)
    }

    return []
  }

  const getMedicalRecordsForPatient = (patientId: string) => {
    if (!user) return []

    // Admin, Doctor can access all medical records
    if ([UserRole.ADMIN, UserRole.DOCTOR].includes(user.role)) {
      return medicalRecords.filter((r) => r.patientId === patientId)
    }

    // Nurse can access medical records but with some limitations
    if (user.role === UserRole.NURSE) {
      return medicalRecords
        .filter((r) => r.patientId === patientId)
        .map((record) => ({
          ...record,
          // Nurses might have limited access to certain fields
        }))
    }

    // Patients can only access their own records
    if (user.role === UserRole.PATIENT) {
      return user.id === patientId ? medicalRecords.filter((r) => r.patientId === patientId) : []
    }

    return []
  }

  const getInvoicesForPatient = (patientId: string) => {
    if (!user) return []

    // Admin, Cashier can access all invoices
    if ([UserRole.ADMIN, UserRole.CASHIER].includes(user.role)) {
      return invoices.filter((i) => i.patientId === patientId)
    }

    // Receptionist can access invoice status but not payment details
    if (user.role === UserRole.RECEPTIONIST) {
      return invoices
        .filter((i) => i.patientId === patientId)
        .map(({ paymentMethod, cashierId, ...invoice }) => invoice as Invoice)
    }

    // Patients can only access their own invoices
    if (user.role === UserRole.PATIENT) {
      return user.id === patientId ? invoices.filter((i) => i.patientId === patientId) : []
    }

    // Doctors and Nurses have limited access to billing info
    if ([UserRole.DOCTOR, UserRole.NURSE].includes(user.role)) {
      return invoices
        .filter((i) => i.patientId === patientId)
        .map(
          ({ amount, paymentMethod, paymentDate, cashierId, ...invoice }) =>
            ({
              ...invoice,
              amount: "Restricted", // Hide actual amount
            }) as Invoice,
        )
    }

    return []
  }

  const getPrescriptionsForPatient = (patientId: string) => {
    if (!user) return []

    // Admin, Doctor, Nurse can access all prescriptions
    if ([UserRole.ADMIN, UserRole.DOCTOR, UserRole.NURSE].includes(user.role)) {
      return prescriptions.filter((p) => p.patientId === patientId)
    }

    // Patients can only access their own prescriptions
    if (user.role === UserRole.PATIENT) {
      return user.id === patientId ? prescriptions.filter((p) => p.patientId === patientId) : []
    }

    return []
  }

  const getVitalSignsForPatient = (patientId: string) => {
    if (!user) return []

    // Admin, Doctor, Nurse can access all vital signs
    if ([UserRole.ADMIN, UserRole.DOCTOR, UserRole.NURSE].includes(user.role)) {
      return vitalSigns.filter((v) => v.patientId === patientId)
    }

    // Patients can only access their own vital signs
    if (user.role === UserRole.PATIENT) {
      return user.id === patientId ? vitalSigns.filter((v) => v.patientId === patientId) : []
    }

    return []
  }

  // Data mutation methods
  const addPatient = async (patientData: Omit<Patient, "id" | "registeredDate">) => {
    // Check permissions
    if (!user || !hasPermission(user, Permission.REGISTER_PATIENTS)) {
      throw new Error("You don't have permission to register patients")
    }

    // In a real app, this would be an API call
    const newPatient: Patient = {
      ...patientData,
      id: `P${patients.length + 1}`.padStart(4, "0"),
      registeredDate: new Date().toISOString(),
    }

    setPatients([...patients, newPatient])
    return newPatient
  }

  const updatePatient = async (id: string, data: Partial<Patient>) => {
    // Check permissions
    if (!user) throw new Error("Authentication required")

    // Admin, Doctor, Nurse, Receptionist can update patients
    if (![UserRole.ADMIN, UserRole.DOCTOR, UserRole.NURSE, UserRole.RECEPTIONIST].includes(user.role)) {
      throw new Error("You don't have permission to update patient information")
    }

    // Patients can update only certain fields of their own record
    if (user.role === UserRole.PATIENT && user.id !== id) {
      throw new Error("You can only update your own information")
    }

    // In a real app, this would be an API call
    const patientIndex = patients.findIndex((p) => p.id === id)
    if (patientIndex === -1) throw new Error("Patient not found")

    const updatedPatient = { ...patients[patientIndex], ...data }
    const updatedPatients = [...patients]
    updatedPatients[patientIndex] = updatedPatient

    setPatients(updatedPatients)
    return updatedPatient
  }

  const addAppointment = async (appointmentData: Omit<Appointment, "id" | "createdAt">) => {
    // Check permissions
    if (!user || !hasPermission(user, Permission.MANAGE_APPOINTMENTS)) {
      throw new Error("You don't have permission to create appointments")
    }

    // In a real app, this would be an API call
    const newAppointment: Appointment = {
      ...appointmentData,
      id: `A${appointments.length + 1}`.padStart(4, "0"),
      createdAt: new Date().toISOString(),
    }

    setAppointments([...appointments, newAppointment])
    return newAppointment
  }

  const updateAppointment = async (id: string, data: Partial<Appointment>) => {
    // Check permissions
    if (!user || !hasPermission(user, Permission.MANAGE_APPOINTMENTS)) {
      throw new Error("You don't have permission to update appointments")
    }

    // In a real app, this would be an API call
    const appointmentIndex = appointments.findIndex((a) => a.id === id)
    if (appointmentIndex === -1) throw new Error("Appointment not found")

    const updatedAppointment = { ...appointments[appointmentIndex], ...data }
    const updatedAppointments = [...appointments]
    updatedAppointments[appointmentIndex] = updatedAppointment

    setAppointments(updatedAppointments)
    return updatedAppointment
  }

  const addMedicalRecord = async (recordData: Omit<MedicalRecord, "id">) => {
    // Check permissions
    if (!user || !hasPermission(user, Permission.EDIT_MEDICAL_RECORDS)) {
      throw new Error("You don't have permission to add medical records")
    }

    // In a real app, this would be an API call
    const newRecord: MedicalRecord = {
      ...recordData,
      id: `MR${medicalRecords.length + 1}`.padStart(4, "0"),
    }

    setMedicalRecords([...medicalRecords, newRecord])
    return newRecord
  }

  const addInvoice = async (invoiceData: Omit<Invoice, "id">) => {
    // Check permissions
    if (!user || !hasPermission(user, Permission.MANAGE_BILLING)) {
      throw new Error("You don't have permission to create invoices")
    }

    // In a real app, this would be an API call
    const newInvoice: Invoice = {
      ...invoiceData,
      id: `INV${invoices.length + 1}`.padStart(4, "0"),
    }

    setInvoices([...invoices, newInvoice])
    return newInvoice
  }

  const updateInvoice = async (id: string, data: Partial<Invoice>) => {
    // Check permissions
    if (!user || !hasPermission(user, Permission.PROCESS_PAYMENTS)) {
      throw new Error("You don't have permission to update invoices")
    }

    // In a real app, this would be an API call
    const invoiceIndex = invoices.findIndex((i) => i.id === id)
    if (invoiceIndex === -1) throw new Error("Invoice not found")

    const updatedInvoice = { ...invoices[invoiceIndex], ...data }
    const updatedInvoices = [...invoices]
    updatedInvoices[invoiceIndex] = updatedInvoice

    setInvoices(updatedInvoices)
    return updatedInvoice
  }

  const addPrescription = async (prescriptionData: Omit<Prescription, "id">) => {
    // Check permissions
    if (!user || !hasPermission(user, Permission.PRESCRIBE_MEDICATION)) {
      throw new Error("You don't have permission to create prescriptions")
    }

    // In a real app, this would be an API call
    const newPrescription: Prescription = {
      ...prescriptionData,
      id: `PRE${prescriptions.length + 1}`.padStart(4, "0"),
    }

    setPrescriptions([...prescriptions, newPrescription])
    return newPrescription
  }

  const addVitalSign = async (vitalSignData: Omit<VitalSign, "id">) => {
    // Check permissions
    if (!user || !hasPermission(user, Permission.RECORD_VITALS)) {
      throw new Error("You don't have permission to record vital signs")
    }

    // In a real app, this would be an API call
    const newVitalSign: VitalSign = {
      ...vitalSignData,
      id: `VS${vitalSigns.length + 1}`.padStart(4, "0"),
    }

    setVitalSigns([...vitalSigns, newVitalSign])
    return newVitalSign
  }

  const updateSupply = async (id: string, data: Partial<Supply>) => {
    // Check permissions
    if (!user) throw new Error("Authentication required")

    // Admin, Nurse can update supplies
    if (![UserRole.ADMIN, UserRole.NURSE].includes(user.role)) {
      throw new Error("You don't have permission to update supplies")
    }

    // In a real app, this would be an API call
    const supplyIndex = supplies.findIndex((s) => s.id === id)
    if (supplyIndex === -1) throw new Error("Supply not found")

    const updatedSupply = { ...supplies[supplyIndex], ...data }
    const updatedSupplies = [...supplies]
    updatedSupplies[supplyIndex] = updatedSupply

    setSupplies(updatedSupplies)
    return updatedSupply
  }

  const updateTreatmentRoom = async (id: string, data: Partial<TreatmentRoom>) => {
    // Check permissions
    if (!user) throw new Error("Authentication required")

    // Admin, Nurse, Receptionist can update treatment rooms
    if (![UserRole.ADMIN, UserRole.NURSE, UserRole.RECEPTIONIST].includes(user.role)) {
      throw new Error("You don't have permission to update treatment rooms")
    }

    // In a real app, this would be an API call
    const roomIndex = treatmentRooms.findIndex((r) => r.id === id)
    if (roomIndex === -1) throw new Error("Treatment room not found")

    const updatedRoom = { ...treatmentRooms[roomIndex], ...data }
    const updatedRooms = [...treatmentRooms]
    updatedRooms[roomIndex] = updatedRoom

    setTreatmentRooms(updatedRooms)
    return updatedRoom
  }

  const value = {
    // Data collections
    patients,
    appointments,
    medicalRecords,
    invoices,
    prescriptions,
    vitalSigns,
    supplies,
    treatmentRooms,

    // Data access methods
    getPatientById,
    getAppointmentsForPatient,
    getAppointmentsForDoctor,
    getMedicalRecordsForPatient,
    getInvoicesForPatient,
    getPrescriptionsForPatient,
    getVitalSignsForPatient,

    // Data mutation methods
    addPatient,
    updatePatient,
    addAppointment,
    updateAppointment,
    addMedicalRecord,
    addInvoice,
    updateInvoice,
    addPrescription,
    addVitalSign,
    updateSupply,
    updateTreatmentRoom,

    // Loading states
    isLoading,
    error,
  }

  return <SharedDataContext.Provider value={value}>{children}</SharedDataContext.Provider>
}

// Custom hook to use the shared data context
export function useSharedData() {
  const context = useContext(SharedDataContext)
  if (context === undefined) {
    throw new Error("useSharedData must be used within a SharedDataProvider")
  }
  return context
}
