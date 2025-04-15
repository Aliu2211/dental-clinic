import type { Prescription } from "@/contexts/shared-data-context"

// Mock prescriptions data
export const mockPrescriptions: Prescription[] = [
  {
    id: "PRE001",
    patientId: "P001",
    patientName: "John Doe",
    doctorId: "2",
    doctorName: "Dr. Sarah Johnson",
    date: "2023-10-01",
    medications: [
      {
        name: "Amoxicillin",
        dosage: "500mg",
        frequency: "3 times daily",
        duration: "7 days",
        instructions: "Take with food",
      },
      {
        name: "Ibuprofen",
        dosage: "400mg",
        frequency: "Every 6 hours as needed",
        duration: "3 days",
        instructions: "Take for pain",
      },
    ],
    status: "Active",
    notes: "For post-procedure infection prevention and pain management",
  },
  {
    id: "PRE002",
    patientId: "P003",
    patientName: "Robert Johnson",
    doctorId: "7",
    doctorName: "Dr. James Wilson",
    date: "2023-06-05",
    medications: [
      {
        name: "Amoxicillin",
        dosage: "500mg",
        frequency: "3 times daily",
        duration: "7 days",
        instructions: "Take with food",
      },
      {
        name: "Acetaminophen",
        dosage: "500mg",
        frequency: "Every 6 hours as needed",
        duration: "5 days",
        instructions: "Take for pain",
      },
    ],
    status: "Completed",
    notes: "For root canal procedure",
  },
  {
    id: "PRE003",
    patientId: "P002",
    patientName: "Jane Smith",
    doctorId: "2",
    doctorName: "Dr. Sarah Johnson",
    date: "2023-09-15",
    medications: [
      {
        name: "Chlorhexidine",
        dosage: "0.12%",
        frequency: "Twice daily",
        duration: "14 days",
        instructions: "Rinse for 30 seconds and spit out",
      },
    ],
    status: "Active",
    notes: "For gum inflammation",
  },
]
