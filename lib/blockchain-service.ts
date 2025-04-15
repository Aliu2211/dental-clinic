// This is a mock implementation that simulates blockchain verification
// without requiring actual smart contracts

// Store verified records in memory (in a real app, this would be in a database)
const verifiedRecords = new Map<
  string,
  {
    tokenId: string
    timestamp: string
    hash: string
    verifiedBy: string
    network: string
  }
>()

export async function verifyMedicalRecord(recordId: string): Promise<{ success: boolean; txHash: string }> {
  // Generate a random transaction hash
  const txHash =
    "0x" +
    Array(64)
      .fill(0)
      .map(() => Math.floor(Math.random() * 16).toString(16))
      .join("")

  // Store verification data
  verifiedRecords.set(recordId, {
    tokenId: `NFT-${recordId}`,
    timestamp: new Date().toISOString(),
    hash:
      "0x" +
      Array(40)
        .fill(0)
        .map(() => Math.floor(Math.random() * 16).toString(16))
        .join(""),
    verifiedBy:
      "0x" +
      Array(40)
        .fill(0)
        .map(() => Math.floor(Math.random() * 16).toString(16))
        .join(""),
    network: "Simulated Blockchain Network",
  })

  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  return {
    success: true,
    txHash,
  }
}

export async function getVerificationData(recordId: string): Promise<any> {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  // Return verification data if it exists
  if (verifiedRecords.has(recordId)) {
    return {
      exists: true,
      data: verifiedRecords.get(recordId),
    }
  }

  return {
    exists: false,
    data: null,
  }
}

export async function isRecordVerified(recordId: string): Promise<boolean> {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 300))

  return verifiedRecords.has(recordId)
}
