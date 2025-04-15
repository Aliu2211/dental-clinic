import type { TreatmentRoom } from "@/contexts/shared-data-context"

// Mock treatment rooms data
export const mockTreatmentRooms: TreatmentRoom[] = [
  {
    id: "R001",
    name: "Room 1",
    status: "Occupied",
    currentPatient: "P001",
    currentDoctor: "2",
    currentProcedure: "Dental Checkup",
    lastCleaned: "2023-10-15T08:30:00Z",
    equipment: ["Dental Chair", "X-Ray Machine", "Suction Unit", "Dental Light", "Autoclave"],
  },
  {
    id: "R002",
    name: "Room 2",
    status: "Ready",
    lastCleaned: "2023-10-15T09:15:00Z",
    equipment: ["Dental Chair", "Suction Unit", "Dental Light", "Ultrasonic Scaler"],
  },
  {
    id: "R003",
    name: "Room 3",
    status: "Cleaning",
    lastCleaned: "2023-10-14T17:45:00Z",
    equipment: ["Dental Chair", "X-Ray Machine", "Suction Unit", "Dental Light", "Laser Unit"],
  },
  {
    id: "R004",
    name: "Room 4",
    status: "Maintenance",
    lastCleaned: "2023-10-14T16:30:00Z",
    equipment: ["Dental Chair", "Suction Unit", "Dental Light"],
  },
  {
    id: "R005",
    name: "Surgical Suite",
    status: "Ready",
    lastCleaned: "2023-10-15T07:45:00Z",
    equipment: [
      "Surgical Dental Chair",
      "Advanced Monitoring Equipment",
      "Surgical Instruments",
      "Anesthesia Equipment",
      "Emergency Cart",
    ],
  },
]
