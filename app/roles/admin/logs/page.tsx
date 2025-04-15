"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Search,
  Download,
  Filter,
  AlertTriangle,
  Info,
  AlertCircle,
  CheckCircle,
  RefreshCw,
  Calendar,
  Clock,
  User,
  Server,
  Database,
  Shield,
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Add imports for animations
import { motion } from "framer-motion"

// Mock log data
const generateMockLogs = (count: number) => {
  const logTypes = ["info", "warning", "error", "success"]
  const components = ["auth", "database", "api", "blockchain", "system", "user"]
  const actions = [
    "User login",
    "User logout",
    "Record created",
    "Record updated",
    "Payment processed",
    "API request",
    "Database query",
    "Blockchain transaction",
    "System startup",
    "System shutdown",
  ]
  const users = ["admin@dentonic.com", "doctor@dentonic.com", "nurse@dentonic.com", "patient@example.com"]

  return Array.from({ length: count })
    .map((_, i) => {
      const type = logTypes[Math.floor(Math.random() * logTypes.length)]
      const component = components[Math.floor(Math.random() * components.length)]
      const action = actions[Math.floor(Math.random() * actions.length)]
      const user = users[Math.floor(Math.random() * users.length)]
      const timestamp = new Date(Date.now() - Math.floor(Math.random() * 7) * 24 * 60 * 60 * 1000)

      return {
        id: `log-${i + 1}`,
        type,
        component,
        action,
        user,
        timestamp,
        details: `${action} performed by ${user} in ${component} module.`,
      }
    })
    .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
}

const logs = generateMockLogs(50)

export default function SystemLogsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedType, setSelectedType] = useState<string | null>(null)
  const [selectedComponent, setSelectedComponent] = useState<string | null>(null)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [dateRange, setDateRange] = useState("7")

  const handleRefresh = () => {
    setIsRefreshing(true)
    setTimeout(() => {
      setIsRefreshing(false)
    }, 1500)
  }

  // Filter logs based on search term, type, and component
  const filteredLogs = logs.filter((log) => {
    const matchesSearch =
      log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.details.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesType = selectedType ? log.type === selectedType : true
    const matchesComponent = selectedComponent ? log.component === selectedComponent : true

    return matchesSearch && matchesType && matchesComponent
  })

  const getLogTypeIcon = (type: string) => {
    switch (type) {
      case "info":
        return <Info className="h-4 w-4 text-blue-500" />
      case "warning":
        return <AlertTriangle className="h-4 w-4 text-amber-500" />
      case "error":
        return <AlertCircle className="h-4 w-4 text-red-500" />
      case "success":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      default:
        return <Info className="h-4 w-4 text-blue-500" />
    }
  }

  const getComponentIcon = (component: string) => {
    switch (component) {
      case "auth":
        return <Shield className="h-4 w-4" />
      case "database":
        return <Database className="h-4 w-4" />
      case "api":
        return <Server className="h-4 w-4" />
      case "blockchain":
        return <Database className="h-4 w-4" />
      case "system":
        return <Server className="h-4 w-4" />
      case "user":
        return <User className="h-4 w-4" />
      default:
        return <Info className="h-4 w-4" />
    }
  }

  // Update the return statement to include animations
  return (
    <motion.div className="space-y-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
      <motion.div
        className="flex items-center justify-between"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1, type: "spring", stiffness: 100 }}
      >
        <h2 className="text-3xl font-bold tracking-tight">System Logs</h2>
        <div className="flex items-center space-x-2">
          <Button variant="outline" onClick={handleRefresh} disabled={isRefreshing}>
            {isRefreshing ? (
              <>
                <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                Refreshing...
              </>
            ) : (
              <>
                <RefreshCw className="mr-2 h-4 w-4" />
                Refresh
              </>
            )}
          </Button>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export Logs
          </Button>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <Tabs defaultValue="all" className="space-y-4">
          <TabsList>
            <TabsTrigger value="all">All Logs</TabsTrigger>
            <TabsTrigger value="errors">Errors</TabsTrigger>
            <TabsTrigger value="auth">Authentication</TabsTrigger>
            <TabsTrigger value="blockchain">Blockchain</TabsTrigger>
          </TabsList>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <TabsContent value="all" className="space-y-4">
              <Card className="transition-all hover:shadow-md">
                <CardHeader className="pb-3">
                  <CardTitle>System Activity Logs</CardTitle>
                  <CardDescription>View and filter system logs</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="mb-4 flex flex-col space-y-3 md:flex-row md:items-center md:justify-between md:space-y-0">
                    <div className="flex w-full flex-1 items-center space-x-2">
                      <div className="relative flex-1">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                          placeholder="Search logs..."
                          className="pl-8"
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                        />
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="outline" size="sm" className="h-9">
                            <Filter className="mr-2 h-4 w-4" />
                            Filter
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-[200px]">
                          <DropdownMenuLabel>Filter by Type</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem onClick={() => setSelectedType(null)}>All Types</DropdownMenuItem>
                          <DropdownMenuItem onClick={() => setSelectedType("info")}>
                            <Info className="mr-2 h-4 w-4 text-blue-500" />
                            Information
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => setSelectedType("warning")}>
                            <AlertTriangle className="mr-2 h-4 w-4 text-amber-500" />
                            Warning
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => setSelectedType("error")}>
                            <AlertCircle className="mr-2 h-4 w-4 text-red-500" />
                            Error
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => setSelectedType("success")}>
                            <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                            Success
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuLabel>Filter by Component</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem onClick={() => setSelectedComponent(null)}>All Components</DropdownMenuItem>
                          <DropdownMenuItem onClick={() => setSelectedComponent("auth")}>
                            Authentication
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => setSelectedComponent("database")}>Database</DropdownMenuItem>
                          <DropdownMenuItem onClick={() => setSelectedComponent("api")}>API</DropdownMenuItem>
                          <DropdownMenuItem onClick={() => setSelectedComponent("blockchain")}>
                            Blockchain
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => setSelectedComponent("system")}>System</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                      <Select value={dateRange} onValueChange={setDateRange}>
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Select date range" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">Last 24 hours</SelectItem>
                          <SelectItem value="7">Last 7 days</SelectItem>
                          <SelectItem value="30">Last 30 days</SelectItem>
                          <SelectItem value="90">Last 90 days</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-[100px]">Type</TableHead>
                          <TableHead>Action</TableHead>
                          <TableHead>Component</TableHead>
                          <TableHead>User</TableHead>
                          <TableHead>Timestamp</TableHead>
                          <TableHead className="text-right">Details</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredLogs.length === 0 ? (
                          <TableRow>
                            <TableCell colSpan={6} className="h-24 text-center">
                              No logs found.
                            </TableCell>
                          </TableRow>
                        ) : (
                          filteredLogs.slice(0, 20).map((log) => (
                            <TableRow key={log.id}>
                              <TableCell>
                                <Badge
                                  variant="outline"
                                  className={`
                                    ${log.type === "info" ? "bg-blue-50 text-blue-700 border-blue-200" : ""}
                                    ${log.type === "warning" ? "bg-amber-50 text-amber-700 border-amber-200" : ""}
                                    ${log.type === "error" ? "bg-red-50 text-red-700 border-red-200" : ""}
                                    ${log.type === "success" ? "bg-green-50 text-green-700 border-green-200" : ""}
                                  `}
                                >
                                  <div className="flex items-center gap-1">
                                    {getLogTypeIcon(log.type)}
                                    <span className="capitalize">{log.type}</span>
                                  </div>
                                </Badge>
                              </TableCell>
                              <TableCell className="font-medium">{log.action}</TableCell>
                              <TableCell>
                                <div className="flex items-center gap-1">
                                  {getComponentIcon(log.component)}
                                  <span className="capitalize">{log.component}</span>
                                </div>
                              </TableCell>
                              <TableCell>{log.user}</TableCell>
                              <TableCell>
                                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                  <Calendar className="h-3 w-3" />
                                  <span>{log.timestamp.toLocaleDateString()}</span>
                                  <Clock className="h-3 w-3 ml-1" />
                                  <span>{log.timestamp.toLocaleTimeString()}</span>
                                </div>
                              </TableCell>
                              <TableCell className="text-right">
                                <Button variant="ghost" size="sm">
                                  View
                                </Button>
                              </TableCell>
                            </TableRow>
                          ))
                        )}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
                <CardFooter className="flex items-center justify-between border-t px-6 py-4">
                  <div className="text-xs text-muted-foreground">
                    Showing <strong>20</strong> of <strong>{filteredLogs.length}</strong> logs
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm" disabled>
                      Previous
                    </Button>
                    <Button variant="outline" size="sm" disabled={filteredLogs.length <= 20}>
                      Next
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            </TabsContent>
          </motion.div>

          <TabsContent value="errors" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Error Logs</CardTitle>
                <CardDescription>View system errors and exceptions</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Error logs content would go here.</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="auth" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Authentication Logs</CardTitle>
                <CardDescription>View login attempts and authentication events</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Authentication logs content would go here.</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="blockchain" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Blockchain Logs</CardTitle>
                <CardDescription>View blockchain transactions and events</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Blockchain logs content would go here.</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </motion.div>
    </motion.div>
  )
}
