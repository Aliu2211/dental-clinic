"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Wallet } from "lucide-react"

export function WalletConnect() {
  const [isConnected, setIsConnected] = useState(false)
  const [account, setAccount] = useState<string | null>(null)

  useEffect(() => {
    // Check if MetaMask is installed
    if (typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
      // Check if user is already connected
      window.ethereum.request({ method: "eth_accounts" }).then((accounts: string[]) => {
        if (accounts.length > 0) {
          setIsConnected(true)
          setAccount(accounts[0])
        }
      })
    }
  }, [])

  const connectWallet = async () => {
    if (typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
      try {
        // Request account access
        const accounts = await window.ethereum.request({ method: "eth_requestAccounts" })
        setIsConnected(true)
        setAccount(accounts[0] as string)
      } catch (error) {
        console.error("User denied account access")
      }
    } else {
      alert("Please install MetaMask to use this feature!")
    }
  }

  const disconnectWallet = () => {
    setIsConnected(false)
    setAccount(null)
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Wallet className="h-5 w-5" />
          Connect Wallet
        </CardTitle>
        <CardDescription>Connect your Web3 wallet to interact with the blockchain</CardDescription>
      </CardHeader>
      <CardContent>
        {!isConnected ? (
          <div className="space-y-4">
            <p>Connect with MetaMask to enable blockchain features.</p>
            <Button className="w-full" onClick={connectWallet}>
              Connect Wallet
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            <p>
              Connected with account: <code>{account}</code>
            </p>
            <Button className="w-full" variant="destructive" onClick={disconnectWallet}>
              Disconnect Wallet
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
