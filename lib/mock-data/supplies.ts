import type { Supply } from "@/contexts/shared-data-context"

// Mock supplies data
export const mockSupplies: Supply[] = [
  {
    id: "S001",
    name: "Disposable Gloves",
    category: "PPE",
    quantity: 500,
    unit: "pairs",
    threshold: 100,
    location: "Storage Room A",
    lastRestocked: "2023-10-10",
    restockedBy: "3", // Nurse
  },
  {
    id: "S002",
    name: "Face Masks",
    category: "PPE",
    quantity: 300,
    unit: "pieces",
    threshold: 50,
    location: "Storage Room A",
    lastRestocked: "2023-10-08",
    restockedBy: "3", // Nurse
  },
  {
    id: "S003",
    name: "Dental Floss",
    category: "Dental Supplies",
    quantity: 150,
    unit: "boxes",
    threshold: 30,
    location: "Storage Room B",
    lastRestocked: "2023-10-05",
    restockedBy: "3", // Nurse
  },
  {
    id: "S004",
    name: "Composite Filling Material",
    category: "Dental Materials",
    quantity: 45,
    unit: "tubes",
    threshold: 10,
    location: "Storage Room C",
    lastRestocked: "2023-09-28",
    restockedBy: "1", // Admin
  },
  {
    id: "S005",
    name: "Dental Anesthetic",
    category: "Medications",
    quantity: 25,
    unit: "vials",
    threshold: 5,
    location: "Medicine Cabinet",
    lastRestocked: "2023-10-01",
    restockedBy: "1", // Admin
  },
  {
    id: "S006",
    name: "Sterilization Pouches",
    category: "Sterilization",
    quantity: 200,
    unit: "pieces",
    threshold: 50,
    location: "Storage Room B",
    lastRestocked: "2023-09-25",
    restockedBy: "3", // Nurse
  },
]
