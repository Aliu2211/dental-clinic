import type { VitalSign } from "@/contexts/shared-data-context"

// Mock vital signs data
export const mockVitalSigns: VitalSign[] = [
  {
    id: "VS001",
    patientId: "P001",
    nurseId: "3",
    date: "2023-10-15",
    time: "09:15",
    bloodPressure: "120/80",
    heartRate: 72,
    temperature: 36.6,
    respiratoryRate: 16,
    oxygenSaturation: 98,
    pain: 0,
    notes: "Patient appears relaxed",
  },
  {
    id: "VS002",
    patientId: "P002",
    nurseId: "3",
    date: "2023-10-15",
    time: "10:00",
    bloodPressure: "118/78",
    heartRate: 68,
    temperature: 36.5,
    respiratoryRate: 14,
    oxygenSaturation: 99,
    pain: 0,
    notes: "No concerns",
  },
  {
    id: "VS003",
    patientId: "P003",
    nurseId: "3",
    date: "2023-10-14",
    time: "11:30",
    bloodPressure: "135/85",
    heartRate: 76,
    temperature: 36.7,
    respiratoryRate: 18,
    oxygenSaturation: 97,
    pain: 2,
    notes: "Patient reports mild discomfort in lower jaw",
  },
  {
    id: "VS004",
    patientId: "P001",
    nurseId: "3",
    date: "2023-09-20",
    time: "14:45",
    bloodPressure: "122/82",
    heartRate: 70,
    temperature: 36.5,
    respiratoryRate: 16,
    oxygenSaturation: 98,
    pain: 0,
    notes: "Follow-up visit, vitals normal",
  },
]
