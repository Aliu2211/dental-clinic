import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"
import { Calendar, Users, FileText, CreditCard, ArrowRight, Wallet, Shield } from "lucide-react"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <header className="sticky top-0 z-50 w-full border-b bg-white shadow-sm">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold text-gray-900">Dentonic</span>
          </div>
          <nav className="hidden md:flex gap-8">
            <Link href="#features" className="text-sm font-medium text-gray-600 transition-colors hover:text-primary">
              Features
            </Link>
            <Link href="#about" className="text-sm font-medium text-gray-600 transition-colors hover:text-primary">
              About
            </Link>
            <Link href="#contact" className="text-sm font-medium text-gray-600 transition-colors hover:text-primary">
              Contact
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link href="/auth/login">
              <Button variant="outline" className="border-gray-200 hover:border-primary hover:bg-primary/5">
                Log in
              </Button>
            </Link>
            <Link href="/auth/login">
              <Button className="bg-primary hover:bg-primary/90">Sign up</Button>
            </Link>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-white">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="flex flex-col justify-center space-y-4 animate-in">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none text-gray-900">
                    The Future of <span className="gradient-text">Dental Care</span> Management
                  </h1>
                  <p className="max-w-[600px] text-gray-500 md:text-xl">
                    Streamline your dental practice with our modern, blockchain-powered management system.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link href="/login">
                    <Button size="lg" className="gap-1 bg-primary hover:bg-primary/90">
                      Get Started <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href="#features">
                    <Button
                      size="lg"
                      variant="outline"
                      className="border-gray-200 hover:border-primary hover:bg-primary/5"
                    >
                      Learn More
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="mx-auto lg:mr-0">
                <div className="relative">
                  <Image
                    src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1468&q=80"
                    alt="Dental clinic dashboard"
                    width={550}
                    height={550}
                    className="rounded-lg object-cover shadow-lg"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
        <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-gray-50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl text-gray-900">Key Features</h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Explore the features that make Dentonic the future of dental practice management.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mt-12">
              <div className="bg-white p-6 rounded-lg shadow-sm card-hover">
                <div className="flex items-center gap-4 mb-4">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <Users className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-medium text-gray-900">Patient Management</h3>
                </div>
                <p className="text-gray-500">
                  Seamlessly manage patient records, appointments, and communications in one place.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm card-hover">
                <div className="flex items-center gap-4 mb-4">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <Calendar className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-medium text-gray-900">Appointment Booking</h3>
                </div>
                <p className="text-gray-500">
                  Effortlessly schedule, reschedule, and track appointments with our intuitive calendar.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm card-hover">
                <div className="flex items-center gap-4 mb-4">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <CreditCard className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-medium text-gray-900">Billing & Claims</h3>
                </div>
                <p className="text-gray-500">
                  Simplify billing processes, automate insurance claims, and manage payments securely.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm card-hover">
                <div className="flex items-center gap-4 mb-4">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <FileText className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-medium text-gray-900">Medical Records</h3>
                </div>
                <p className="text-gray-500">
                  Digitize and securely store patient medical records with easy access and comprehensive history
                  tracking.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm card-hover">
                <div className="flex items-center gap-4 mb-4">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <Shield className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-medium text-gray-900">Role-Based Access</h3>
                </div>
                <p className="text-gray-500">
                  Ensure data security with role-based access control for receptionists, dentists, and managers.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm card-hover">
                <div className="flex items-center gap-4 mb-4">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <Wallet className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-medium text-gray-900">Blockchain Integration</h3>
                </div>
                <p className="text-gray-500">
                  Leverage blockchain technology for secure patient records, transparent transactions, and enhanced data
                  integrity.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-white">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="mx-auto lg:ml-0">
                <div className="relative">
                  <Image
                    src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
                    alt="Dental clinic"
                    width={550}
                    height={550}
                    className="rounded-lg object-cover shadow-lg"
                  />
                </div>
              </div>
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold tracking-tighter md:text-4xl text-gray-900">
                    Why Choose Dentonic?
                  </h2>
                  <p className="text-gray-500 md:text-xl">
                    Our platform is designed with modern dental practices in mind, offering:
                  </p>
                </div>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <div className="h-6 w-6 rounded-full bg-green-100 flex items-center justify-center mt-0.5">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-green-600"
                      >
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">Enhanced Security</h3>
                      <p className="text-gray-500">Blockchain-powered security for patient data and records</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="h-6 w-6 rounded-full bg-green-100 flex items-center justify-center mt-0.5">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-green-600"
                      >
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">Streamlined Workflows</h3>
                      <p className="text-gray-500">Intuitive interfaces designed to save time and reduce errors</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="h-6 w-6 rounded-full bg-green-100 flex items-center justify-center mt-0.5">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-green-600"
                      >
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">Comprehensive Analytics</h3>
                      <p className="text-gray-500">
                        Data-driven insights to improve patient care and practice management
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="h-6 w-6 rounded-full bg-green-100 flex items-center justify-center mt-0.5">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-green-600"
                      >
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">Modern Payment Options</h3>
                      <p className="text-gray-500">Support for traditional and cryptocurrency payments</p>
                    </div>
                  </li>
                </ul>
                <div className="pt-4">
                  <Link href="/auth/login">
                    <Button className="bg-primary hover:bg-primary/90">Start Free Trial</Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t py-8 bg-white">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-medium mb-4 text-gray-900">Dentonic</h3>
              <div className="flex items-center gap-2 mb-4">
                <Shield className="h-5 w-5 text-primary" />
                <span className="text-lg font-bold text-gray-900">Dentonic</span>
              </div>
              <p className="text-sm text-gray-500">The future of dental practice management.</p>
            </div>
            <div>
              <h3 className="text-sm font-medium mb-4 text-gray-900">Product</h3>
              <ul className="space-y-3">
                <li>
                  <Link href="#" className="text-sm text-gray-500 hover:text-primary">
                    Features
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-gray-500 hover:text-primary">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-gray-500 hover:text-primary">
                    Integrations
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-gray-500 hover:text-primary">
                    FAQ
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-medium mb-4 text-gray-900">Company</h3>
              <ul className="space-y-3">
                <li>
                  <Link href="#" className="text-sm text-gray-500 hover:text-primary">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-gray-500 hover:text-primary">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-gray-500 hover:text-primary">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-gray-500 hover:text-primary">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-medium mb-4 text-gray-900">Legal</h3>
              <ul className="space-y-3">
                <li>
                  <Link href="#" className="text-sm text-gray-500 hover:text-primary">
                    Terms
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-gray-500 hover:text-primary">
                    Privacy
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-gray-500 hover:text-primary">
                    Cookies
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-gray-500 hover:text-primary">
                    Licenses
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-500">© 2024 Dentonic. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link href="#" className="text-gray-400 hover:text-primary">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
              </Link>
              <Link href="#" className="text-gray-400 hover:text-primary">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
                </svg>
              </Link>
              <Link href="#" className="text-gray-400 hover:text-primary">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                  <rect x="2" y="9" width="4" height="12"></rect>
                  <circle cx="4" cy="4" r="2"></circle>
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
