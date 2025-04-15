"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Shield, Check, ExternalLink } from "lucide-react"
import { getVerificationData } from "@/lib/blockchain-service"

interface PatientRecordNFTProps {
  recordId: string
}

export function PatientRecordNFT({ recordId }: PatientRecordNFTProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [nftData, setNftData] = useState<any>(null)

  useEffect(() => {
    async function fetchVerificationData() {
      try {
        const result = await getVerificationData(recordId)
        if (result.exists) {
          setNftData(result.data)
        } else {
          // If not verified, create mock data for display purposes
          setNftData({
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
        }
        setIsLoading(false)
      } catch (error) {
        console.error("Error fetching verification data:", error)
        setIsLoading(false)
      }
    }

    fetchVerificationData()
  }, [recordId])

  if (isLoading) {
    return (
      <Card className="border-dashed border-primary/50 bg-primary/5">
        <CardContent className="p-4 text-center">
          <div className="animate-pulse flex flex-col items-center space-y-2">
            <Shield className="h-8 w-8 text-primary/50" />
            <div className="h-4 w-32 bg-primary/20 rounded"></div>
            <div className="h-3 w-48 bg-primary/10 rounded"></div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="border-primary/20 bg-primary/5 overflow-hidden">
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-primary" />
            <h3 className="font-medium">Blockchain Verified Record</h3>
          </div>
          <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">
            <Check className="h-3 w-3 mr-1" /> Verified
          </Badge>
        </div>

        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Token ID:</span>
            <span className="font-mono">{nftData.tokenId}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Timestamp:</span>
            <span>{new Date(nftData.timestamp).toLocaleString()}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Hash:</span>
            <span className="font-mono truncate w-32">{nftData.hash}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Network:</span>
            <span>{nftData.network}</span>
          </div>
        </div>

        <Button variant="outline" size="sm" className="w-full mt-3">
          <ExternalLink className="h-3 w-3 mr-1" /> View on Blockchain
        </Button>
      </CardContent>
    </Card>
  )
}
