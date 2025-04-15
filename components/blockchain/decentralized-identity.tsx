"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Fingerprint, Shield, CheckCircle, AlertCircle, Key, FileText } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export function DecentralizedIdentity() {
  const [identityStatus, setIdentityStatus] = useState<"none" | "creating" | "created">("none")
  const [verificationStatus, setVerificationStatus] = useState<"unverified" | "verifying" | "verified">("unverified")

  const handleCreateIdentity = () => {
    setIdentityStatus("creating")
    // Simulate identity creation process
    setTimeout(() => {
      setIdentityStatus("created")
    }, 2000)
  }

  const handleVerifyIdentity = () => {
    setVerificationStatus("verifying")
    // Simulate verification process
    setTimeout(() => {
      setVerificationStatus("verified")
    }, 2000)
  }

  return (
    <Card className="w-full">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Decentralized Identity</CardTitle>
            <CardDescription>Manage your self-sovereign identity on the blockchain</CardDescription>
          </div>
          {identityStatus === "created" && (
            <Badge variant={verificationStatus === "verified" ? "default" : "outline"} className="ml-2">
              {verificationStatus === "verified" ? "Verified" : "Unverified"}
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="create">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="create">Create</TabsTrigger>
            <TabsTrigger value="verify" disabled={identityStatus !== "created"}>
              Verify
            </TabsTrigger>
            <TabsTrigger value="manage" disabled={verificationStatus !== "verified"}>
              Manage
            </TabsTrigger>
          </TabsList>

          <TabsContent value="create" className="space-y-4">
            {identityStatus === "none" && (
              <>
                <div className="space-y-4 py-2">
                  <div className="flex items-center space-x-4">
                    <Fingerprint className="h-10 w-10 text-primary" />
                    <div>
                      <h3 className="text-lg font-medium">Create Your Digital Identity</h3>
                      <p className="text-sm text-muted-foreground">
                        Your decentralized identity gives you control over your personal data
                      </p>
                    </div>
                  </div>

                  <Alert>
                    <Shield className="h-4 w-4" />
                    <AlertTitle>Privacy Focused</AlertTitle>
                    <AlertDescription>
                      Your identity is stored on the blockchain and only you control who can access it.
                    </AlertDescription>
                  </Alert>
                </div>

                <div className="space-y-4">
                  <div className="grid gap-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" placeholder="Enter your full name" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="Enter your email" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="did-password">Create Password</Label>
                    <Input id="did-password" type="password" placeholder="Create a secure password" />
                  </div>
                </div>

                <Button className="w-full" onClick={handleCreateIdentity}>
                  Create Decentralized Identity
                </Button>
              </>
            )}

            {identityStatus === "creating" && (
              <div className="flex flex-col items-center justify-center py-8 space-y-4">
                <div className="animate-pulse flex flex-col items-center">
                  <Fingerprint className="h-16 w-16 text-primary mb-4" />
                  <h3 className="text-lg font-medium">Creating Your Identity</h3>
                  <p className="text-sm text-muted-foreground text-center mt-2">
                    Please wait while we generate your decentralized identity on the blockchain...
                  </p>
                </div>
              </div>
            )}

            {identityStatus === "created" && (
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <CheckCircle className="h-10 w-10 text-green-500" />
                  <div>
                    <h3 className="text-lg font-medium">Identity Created Successfully!</h3>
                    <p className="text-sm text-muted-foreground">
                      Your decentralized identity has been created on the blockchain
                    </p>
                  </div>
                </div>

                <div className="rounded-md bg-muted p-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">DID Identifier:</span>
                      <span className="text-sm text-muted-foreground">did:ethr:0x7e35...</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">Created On:</span>
                      <span className="text-sm text-muted-foreground">{new Date().toLocaleDateString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">Status:</span>
                      <Badge variant="outline">Unverified</Badge>
                    </div>
                  </div>
                </div>

                <Alert>
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Next Step: Verification</AlertTitle>
                  <AlertDescription>
                    Please proceed to the Verify tab to complete the verification process.
                  </AlertDescription>
                </Alert>
              </div>
            )}
          </TabsContent>

          <TabsContent value="verify" className="space-y-4">
            {verificationStatus === "unverified" && (
              <>
                <div className="space-y-4 py-2">
                  <div className="flex items-center space-x-4">
                    <Shield className="h-10 w-10 text-primary" />
                    <div>
                      <h3 className="text-lg font-medium">Verify Your Identity</h3>
                      <p className="text-sm text-muted-foreground">Complete verification to access all features</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="grid gap-2">
                    <Label htmlFor="id-number">National ID Number</Label>
                    <Input id="id-number" placeholder="Enter your ID number" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" type="tel" placeholder="Enter your phone number" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="verification-code">Verification Code</Label>
                    <div className="flex space-x-2">
                      <Input id="verification-code" placeholder="Enter code" />
                      <Button variant="outline">Send Code</Button>
                    </div>
                  </div>
                </div>

                <Button className="w-full" onClick={handleVerifyIdentity}>
                  Verify Identity
                </Button>
              </>
            )}

            {verificationStatus === "verifying" && (
              <div className="flex flex-col items-center justify-center py-8 space-y-4">
                <div className="animate-pulse flex flex-col items-center">
                  <Shield className="h-16 w-16 text-primary mb-4" />
                  <h3 className="text-lg font-medium">Verifying Your Identity</h3>
                  <p className="text-sm text-muted-foreground text-center mt-2">
                    Please wait while we verify your identity credentials...
                  </p>
                </div>
              </div>
            )}

            {verificationStatus === "verified" && (
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <CheckCircle className="h-10 w-10 text-green-500" />
                  <div>
                    <h3 className="text-lg font-medium">Identity Verified!</h3>
                    <p className="text-sm text-muted-foreground">Your identity has been successfully verified</p>
                  </div>
                </div>

                <div className="rounded-md bg-muted p-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">Verification ID:</span>
                      <span className="text-sm text-muted-foreground">VER-2023-8752</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">Verified On:</span>
                      <span className="text-sm text-muted-foreground">{new Date().toLocaleDateString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">Status:</span>
                      <Badge>Verified</Badge>
                    </div>
                  </div>
                </div>

                <Alert className="bg-green-50 border-green-200">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <AlertTitle className="text-green-800">Verification Complete</AlertTitle>
                  <AlertDescription className="text-green-700">
                    You now have full access to all features. Proceed to the Manage tab to control your identity.
                  </AlertDescription>
                </Alert>
              </div>
            )}
          </TabsContent>

          <TabsContent value="manage" className="space-y-4">
            <div className="space-y-4 py-2">
              <div className="flex items-center space-x-4">
                <Key className="h-10 w-10 text-primary" />
                <div>
                  <h3 className="text-lg font-medium">Manage Your Identity</h3>
                  <p className="text-sm text-muted-foreground">Control access to your identity and personal data</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="rounded-md border p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <FileText className="h-5 w-5 text-primary" />
                    <div>
                      <h4 className="text-sm font-medium">Medical Records Access</h4>
                      <p className="text-xs text-muted-foreground">Control who can access your medical records</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    Manage
                  </Button>
                </div>
              </div>

              <div className="rounded-md border p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Shield className="h-5 w-5 text-primary" />
                    <div>
                      <h4 className="text-sm font-medium">Credentials & Verifications</h4>
                      <p className="text-xs text-muted-foreground">Manage your verified credentials</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    Manage
                  </Button>
                </div>
              </div>

              <div className="rounded-md border p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Key className="h-5 w-5 text-primary" />
                    <div>
                      <h4 className="text-sm font-medium">Recovery Keys</h4>
                      <p className="text-xs text-muted-foreground">Manage your identity recovery keys</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    Manage
                  </Button>
                </div>
              </div>
            </div>

            <div className="pt-4">
              <Button variant="outline" className="w-full">
                Export Identity Document
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="border-t pt-4 text-xs text-muted-foreground">
        Your decentralized identity is secured using blockchain technology and follows W3C DID standards.
      </CardFooter>
    </Card>
  )
}
