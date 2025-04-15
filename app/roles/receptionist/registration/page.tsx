"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { format } from "date-fns"
import { CalendarIcon, CheckCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"
import { cn } from "@/lib/utils"

const formSchema = z.object({
  firstName: z.string().min(2, {
    message: "First name must be at least 2 characters.",
  }),
  lastName: z.string().min(2, {
    message: "Last name must be at least 2 characters.",
  }),
  dateOfBirth: z.date({
    required_error: "Date of birth is required.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  phone: z.string().min(10, {
    message: "Phone number must be at least 10 digits.",
  }),
  address: z.string().min(5, {
    message: "Address must be at least 5 characters.",
  }),
  city: z.string().min(2, {
    message: "City must be at least 2 characters.",
  }),
  state: z.string().min(2, {
    message: "State must be at least 2 characters.",
  }),
  zipCode: z.string().min(5, {
    message: "Zip code must be at least 5 characters.",
  }),
  insuranceProvider: z.string().optional(),
  insurancePolicyNumber: z.string().optional(),
  emergencyContactName: z.string().min(2, {
    message: "Emergency contact name must be at least 2 characters.",
  }),
  emergencyContactPhone: z.string().min(10, {
    message: "Emergency contact phone must be at least 10 digits.",
  }),
  medicalHistory: z.string().optional(),
  allergies: z.string().optional(),
  currentMedications: z.string().optional(),
  consentToTreatment: z.boolean().refine((value) => value === true, {
    message: "You must consent to treatment.",
  }),
  consentToShareInformation: z.boolean().refine((value) => value === true, {
    message: "You must consent to share information.",
  }),
})

export default function PatientRegistrationPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      state: "",
      zipCode: "",
      insuranceProvider: "",
      insurancePolicyNumber: "",
      emergencyContactName: "",
      emergencyContactPhone: "",
      medicalHistory: "",
      allergies: "",
      currentMedications: "",
      consentToTreatment: false,
      consentToShareInformation: false,
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
    setIsSubmitted(true)
  }

  const nextStep = () => {
    setCurrentStep(currentStep + 1)
  }

  const prevStep = () => {
    setCurrentStep(currentStep - 1)
  }

  if (isSubmitted) {
    return (
      <div className="flex items-center justify-center min-h-[80vh]">
        <Card className="w-full max-w-2xl">
          <CardHeader>
            <div className="flex items-center justify-center mb-4">
              <CheckCircle className="h-16 w-16 text-green-500" />
            </div>
            <CardTitle className="text-center text-2xl">Registration Complete</CardTitle>
            <CardDescription className="text-center">
              The patient has been successfully registered in the system.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="rounded-md bg-primary/10 p-4">
              <h3 className="font-medium">Next Steps</h3>
              <ul className="mt-2 space-y-2 text-sm">
                <li>Verify insurance information</li>
                <li>Schedule an initial appointment</li>
                <li>Provide new patient welcome packet</li>
              </ul>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={() => setIsSubmitted(false)}>
              Register Another Patient
            </Button>
            <Button>Schedule Appointment</Button>
          </CardFooter>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Patient Registration</h2>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>New Patient Registration Form</CardTitle>
          <CardDescription>Enter the patient's information to register them in the system.</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs
            defaultValue="personal"
            value={currentStep === 1 ? "personal" : currentStep === 2 ? "medical" : "consent"}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="personal">Personal Information</TabsTrigger>
              <TabsTrigger value="medical">Medical History</TabsTrigger>
              <TabsTrigger value="consent">Consent Forms</TabsTrigger>
            </TabsList>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 pt-6">
                <TabsContent value="personal" className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="firstName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>First Name</FormLabel>
                          <FormControl>
                            <Input placeholder="John" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="lastName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Last Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Doe" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="dateOfBirth"
                      render={({ field }) => (
                        <FormItem className="flex flex-col">
                          <FormLabel>Date of Birth</FormLabel>
                          <Popover>
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button
                                  variant={"outline"}
                                  className={cn(
                                    "w-full pl-3 text-left font-normal",
                                    !field.value && "text-muted-foreground",
                                  )}
                                >
                                  {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                </Button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                              <Calendar
                                mode="single"
                                selected={field.value}
                                onSelect={field.onChange}
                                disabled={(date) => date > new Date() || date < new Date("1900-01-01")}
                                initialFocus
                              />
                            </PopoverContent>
                          </Popover>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input placeholder="john.doe@example.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone</FormLabel>
                          <FormControl>
                            <Input placeholder="(555) 123-4567" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="address"
                      render={({ field }) => (
                        <FormItem className="col-span-2">
                          <FormLabel>Address</FormLabel>
                          <FormControl>
                            <Input placeholder="123 Main St" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="city"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>City</FormLabel>
                          <FormControl>
                            <Input placeholder="Anytown" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="state"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>State</FormLabel>
                            <FormControl>
                              <Input placeholder="CA" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="zipCode"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Zip Code</FormLabel>
                            <FormControl>
                              <Input placeholder="12345" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <FormField
                      control={form.control}
                      name="insuranceProvider"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Insurance Provider</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select insurance provider" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="none">None</SelectItem>
                              <SelectItem value="aetna">Aetna</SelectItem>
                              <SelectItem value="bluecross">Blue Cross Blue Shield</SelectItem>
                              <SelectItem value="cigna">Cigna</SelectItem>
                              <SelectItem value="delta">Delta Dental</SelectItem>
                              <SelectItem value="humana">Humana</SelectItem>
                              <SelectItem value="metlife">MetLife</SelectItem>
                              <SelectItem value="united">UnitedHealthcare</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="insurancePolicyNumber"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Insurance Policy Number</FormLabel>
                          <FormControl>
                            <Input placeholder="Policy number" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="emergencyContactName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Emergency Contact Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Jane Doe" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="emergencyContactPhone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Emergency Contact Phone</FormLabel>
                          <FormControl>
                            <Input placeholder="(555) 987-6543" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="flex justify-end">
                    <Button type="button" onClick={nextStep}>
                      Next
                    </Button>
                  </div>
                </TabsContent>
                <TabsContent value="medical" className="space-y-4">
                  <div className="grid grid-cols-1 gap-4">
                    <FormField
                      control={form.control}
                      name="medicalHistory"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Medical History</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Please list any significant medical conditions or previous dental procedures."
                              className="min-h-[100px]"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="allergies"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Allergies</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Please list any allergies, including medications, materials, or foods."
                              className="min-h-[100px]"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="currentMedications"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Current Medications</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Please list all current medications and supplements."
                              className="min-h-[100px]"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="flex justify-between">
                    <Button type="button" variant="outline" onClick={prevStep}>
                      Previous
                    </Button>
                    <Button type="button" onClick={nextStep}>
                      Next
                    </Button>
                  </div>
                </TabsContent>
                <TabsContent value="consent" className="space-y-4">
                  <div className="space-y-4">
                    <div className="rounded-md border p-4">
                      <h3 className="font-medium mb-2">Consent to Treatment</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        I hereby consent to the performance of dental procedures agreed to be necessary or advisable,
                        including the use of local anesthesia as indicated and I will assume responsibility for fees
                        associated with those procedures.
                      </p>
                      <FormField
                        control={form.control}
                        name="consentToTreatment"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                            <FormControl>
                              <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                            </FormControl>
                            <div className="space-y-1 leading-none">
                              <FormLabel>I agree to the terms of treatment</FormLabel>
                              <FormMessage />
                            </div>
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="rounded-md border p-4">
                      <h3 className="font-medium mb-2">Consent to Share Information</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        I hereby authorize the dental practice to share my protected health information with other
                        healthcare providers, insurance companies, and other parties as necessary for treatment,
                        payment, or healthcare operations.
                      </p>
                      <FormField
                        control={form.control}
                        name="consentToShareInformation"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                            <FormControl>
                              <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                            </FormControl>
                            <div className="space-y-1 leading-none">
                              <FormLabel>I agree to the sharing of my information</FormLabel>
                              <FormMessage />
                            </div>
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <Button type="button" variant="outline" onClick={prevStep}>
                      Previous
                    </Button>
                    <Button type="submit">Submit Registration</Button>
                  </div>
                </TabsContent>
              </form>
            </Form>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
