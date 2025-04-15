"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AlertCircle, CheckCircle2, Wallet } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

interface CryptoPaymentProps {
  amount: number
  invoiceId: string
  onSuccess?: () => void
  onCancel?: () => void
}

export function CryptoPayment({ amount, invoiceId, onSuccess, onCancel }: CryptoPaymentProps) {
  const [paymentStatus, setPaymentStatus] = useState<"idle" | "processing" | "success" | "error">("idle")
  const [selectedCrypto, setSelectedCrypto] = useState("ETH")
  const [walletAddress, setWalletAddress] = useState("")

  const handlePayment = async () => {
    try {
      setPaymentStatus("processing")

      // Simulate payment processing
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Simulate successful payment
      setPaymentStatus("success")

      // Call onSuccess callback if provided
      if (onSuccess) {
        setTimeout(() => {
          onSuccess()
        }, 1500)
      }
    } catch (error) {
      setPaymentStatus("error")
      console.error("Payment failed:", error)
    }
  }

  const cryptoOptions = {
    ETH: {
      name: "Ethereum",
      rate: 0.00042,
      icon: "⟠",
    },
    BTC: {
      name: "Bitcoin",
      rate: 0.000023,
      icon: "₿",
    },
    USDT: {
      name: "Tether",
      rate: 1,
      icon: "₮",
    },
  }

  const cryptoAmount = (amount * cryptoOptions[selectedCrypto as keyof typeof cryptoOptions].rate).toFixed(6)

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Wallet className="h-5 w-5" />
          Crypto Payment
        </CardTitle>
        <CardDescription>Pay your dental invoice #{invoiceId} using cryptocurrency</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="pay" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="pay">Pay</TabsTrigger>
            <TabsTrigger value="wallet">Connect Wallet</TabsTrigger>
          </TabsList>
          <TabsContent value="pay" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="amount">Amount Due</Label>
              <div className="flex items-center gap-2">
                <div className="text-2xl font-bold">${amount.toFixed(2)}</div>
                <div className="text-sm text-muted-foreground">USD</div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="crypto">Select Cryptocurrency</Label>
              <Select value={selectedCrypto} onValueChange={setSelectedCrypto}>
                <SelectTrigger>
                  <SelectValue placeholder="Select cryptocurrency" />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(cryptoOptions).map(([key, { name, icon }]) => (
                    <SelectItem key={key} value={key}>
                      <span className="flex items-center gap-2">
                        <span>{icon}</span> {name}
                      </span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="p-3 bg-muted rounded-md">
              <div className="flex justify-between items-center">
                <span className="text-sm">Equivalent Amount:</span>
                <span className="font-medium">
                  {cryptoAmount} {selectedCrypto}
                </span>
              </div>
            </div>

            {paymentStatus === "success" && (
              <Alert variant="default" className="bg-green-50 border-green-200">
                <CheckCircle2 className="h-4 w-4 text-green-600" />
                <AlertTitle className="text-green-800">Payment Successful</AlertTitle>
                <AlertDescription className="text-green-700">
                  Your payment has been processed successfully.
                </AlertDescription>
              </Alert>
            )}

            {paymentStatus === "error" && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Payment Failed</AlertTitle>
                <AlertDescription>There was an error processing your payment. Please try again.</AlertDescription>
              </Alert>
            )}
          </TabsContent>

          <TabsContent value="wallet" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="wallet">Your Wallet Address</Label>
              <Input
                id="wallet"
                placeholder="0x..."
                value={walletAddress}
                onChange={(e) => setWalletAddress(e.target.value)}
              />
              <p className="text-xs text-muted-foreground">
                Connect your wallet to make payments and manage your dental records on the blockchain.
              </p>
            </div>

            <Button className="w-full" variant="outline">
              Connect Wallet
            </Button>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={onCancel} disabled={paymentStatus === "processing"}>
          Cancel
        </Button>
        <Button onClick={handlePayment} disabled={paymentStatus === "processing" || paymentStatus === "success"}>
          {paymentStatus === "processing" ? "Processing..." : "Pay Now"}
        </Button>
      </CardFooter>
    </Card>
  )
}
