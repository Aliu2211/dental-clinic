"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search, Plus, AlertTriangle, CheckCircle, Package, RefreshCw, ShoppingCart } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Mock supplies data
const supplies = [
  {
    id: "S001",
    name: "Disposable Gloves (S)",
    category: "PPE",
    currentStock: 120,
    minStock: 50,
    maxStock: 200,
    unit: "boxes",
    location: "Storage A",
    lastRestocked: "2023-10-10",
    status: "normal",
  },
  {
    id: "S002",
    name: "Disposable Gloves (M)",
    category: "PPE",
    currentStock: 85,
    minStock: 50,
    maxStock: 200,
    unit: "boxes",
    location: "Storage A",
    lastRestocked: "2023-10-10",
    status: "normal",
  },
  {
    id: "S003",
    name: "Disposable Gloves (L)",
    category: "PPE",
    currentStock: 30,
    minStock: 50,
    maxStock: 200,
    unit: "boxes",
    location: "Storage A",
    lastRestocked: "2023-10-05",
    status: "low",
  },
  {
    id: "S004",
    name: "Face Masks",
    category: "PPE",
    currentStock: 200,
    minStock: 100,
    maxStock: 300,
    unit: "boxes",
    location: "Storage A",
    lastRestocked: "2023-10-12",
    status: "normal",
  },
  {
    id: "S005",
    name: "Dental Bibs",
    category: "Patient Care",
    currentStock: 15,
    minStock: 20,
    maxStock: 100,
    unit: "packs",
    location: "Storage B",
    lastRestocked: "2023-10-01",
    status: "low",
  },
  {
    id: "S006",
    name: "Dental Floss",
    category: "Patient Care",
    currentStock: 45,
    minStock: 30,
    maxStock: 100,
    unit: "boxes",
    location: "Storage B",
    lastRestocked: "2023-10-08",
    status: "normal",
  },
  {
    id: "S007",
    name: "Gauze Pads",
    category: "Medical",
    currentStock: 75,
    minStock: 50,
    maxStock: 150,
    unit: "packs",
    location: "Storage C",
    lastRestocked: "2023-10-07",
    status: "normal",
  },
  {
    id: "S008",
    name: "Disinfectant Wipes",
    category: "Cleaning",
    currentStock: 25,
    minStock: 20,
    maxStock: 60,
    unit: "containers",
    location: "Storage D",
    lastRestocked: "2023-10-09",
    status: "normal",
  },
]

export default function SuppliesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState("all")

  const filteredSupplies = supplies.filter(
    (item) =>
      (selectedCategory === "all" || item.category === selectedCategory) &&
      (item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.id.toLowerCase().includes(searchTerm.toLowerCase\
        item.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.category.toLowerCase().includes(searchTerm.toLowerCase()))
  )

  const lowStockItems = supplies.filter((item) => item.status === "low")

  const getStockPercentage = (current, max) => {
    return (current / max) * 100
  }

  const getStockStatusBadge = (status) => {
    switch (status) {
      case "low":
        return (
          <Badge variant="destructive" className="flex items-center gap-1">
            <AlertTriangle className="h-3 w-3" /> Low Stock
          </Badge>
        )
      case "normal":
        return (
          <Badge variant="outline" className="flex items-center gap-1">
            <CheckCircle className="h-3 w-3" /> Normal
          </Badge>
        )
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  return (
    <div className="space-y-4">
      <h2 className="text-3xl font-bold tracking-tight">Supplies Management</h2>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all" onClick={() => setSelectedCategory("all")}>
            All Supplies
          </TabsTrigger>
          <TabsTrigger value="low" onClick={() => setSelectedCategory("all")}>
            Low Stock
          </TabsTrigger>
          <TabsTrigger value="categories">Categories</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Inventory Management</CardTitle>
                  <CardDescription>Track and manage dental supplies</CardDescription>
                </div>
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                  <DialogTrigger asChild>
                    <Button className="flex items-center gap-2">
                      <Plus className="h-4 w-4" />
                      Add Supply
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>Add New Supply</DialogTitle>
                      <DialogDescription>Enter the details for the new supply item.</DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid gap-2">
                        <Label htmlFor="name">Item Name</Label>
                        <Input id="name" placeholder="Enter item name" />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="grid gap-2">
                          <Label htmlFor="category">Category</Label>
                          <Select>
                            <SelectTrigger id="category">
                              <SelectValue placeholder="Select category" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="PPE">PPE</SelectItem>
                              <SelectItem value="Patient Care">Patient Care</SelectItem>
                              <SelectItem value="Medical">Medical</SelectItem>
                              <SelectItem value="Cleaning">Cleaning</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="unit">Unit</Label>
                          <Input id="unit" placeholder="e.g., boxes" />
                        </div>
                      </div>
                      <div className="grid grid-cols-3 gap-4">
                        <div className="grid gap-2">
                          <Label htmlFor="currentStock">Current Stock</Label>
                          <Input id="currentStock" type="number" placeholder="0" />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="minStock">Min Stock</Label>
                          <Input id="minStock" type="number" placeholder="0" />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="maxStock">Max Stock</Label>
                          <Input id="maxStock" type="number" placeholder="0" />
                        </div>
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="location">Storage Location</Label>
                        <Input id="location" placeholder="e.g., Storage A" />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button type="submit" onClick={() => setIsDialogOpen(false)}>
                        Save Item
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent>
              <div className="mb-4 flex items-center gap-2">
                <div className="relative flex-1">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search supplies..."
                    className="pl-8"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="All Categories" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="PPE">PPE</SelectItem>
                    <SelectItem value="Patient Care">Patient Care</SelectItem>
                    <SelectItem value="Medical">Medical</SelectItem>
                    <SelectItem value="Cleaning">Cleaning</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Item ID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Stock Level</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredSupplies.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium">{item.id}</TableCell>
                      <TableCell>{item.name}</TableCell>
                      <TableCell>{item.category}</TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="flex justify-between text-xs">
                            <span>
                              {item.currentStock} {item.unit}
                            </span>
                            <span>
                              {item.maxStock} {item.unit}
                            </span>
                          </div>
                          <Progress value={getStockPercentage(item.currentStock, item.maxStock)} className="h-2" />
                        </div>
                      </TableCell>
                      <TableCell>{item.location}</TableCell>
                      <TableCell>{getStockStatusBadge(item.status)}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="ghost" size="icon" title="Restock">
                            <RefreshCw className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" title="Order">
                            <ShoppingCart className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="low" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Low Stock Items</CardTitle>
              <CardDescription>Items that need to be restocked soon</CardDescription>
            </CardHeader>
            <CardContent>
              {lowStockItems.length > 0 ? (
                <div className="space-y-4">
                  {lowStockItems.map((item) => (
                    <div key={item.id} className="flex flex-col md:flex-row border rounded-lg p-4 bg-amber-50">
                      <div className="flex items-center mb-4 md:mb-0 md:mr-6">
                        <AlertTriangle className="h-5 w-5 text-amber-500 mr-2" />
                        <div>
                          <p className="font-medium">{item.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {item.id} • {item.category}
                          </p>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 flex-1">
                        <div className="text-center p-2 rounded bg-white">
                          <p className="text-xs text-muted-foreground">Current Stock</p>
                          <p className="font-medium text-amber-600">
                            {item.currentStock} {item.unit}
                          </p>
                        </div>
                        <div className="text-center p-2 rounded bg-white">
                          <p className="text-xs text-muted-foreground">Minimum Level</p>
                          <p className="font-medium">
                            {item.minStock} {item.unit}
                          </p>
                        </div>
                        <div className="text-center p-2 rounded bg-white">
                          <p className="text-xs text-muted-foreground">Location</p>
                          <p className="font-medium">{item.location}</p>
                        </div>
                      </div>
                      <div className="mt-4 md:mt-0 md:ml-4 flex items-center">
                        <Button size="sm" variant="outline" className="mr-2">
                          <RefreshCw className="h-4 w-4 mr-1" />
                          Restock
                        </Button>
                        <Button size="sm">
                          <ShoppingCart className="h-4 w-4 mr-1" />
                          Order
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">No low stock items at the moment.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="categories" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            {["PPE", "Patient Care", "Medical", "Cleaning"].map((category) => {
              const categoryItems = supplies.filter((item) => item.category === category)
              const lowStockCount = categoryItems.filter((item) => item.status === "low").length

              return (
                <Card key={category}>
                  <CardHeader>
                    <CardTitle>{category}</CardTitle>
                    <CardDescription>
                      {categoryItems.length} items • {lowStockCount} low stock
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {categoryItems.slice(0, 3).map((item) => (
                        <div key={item.id} className="flex justify-between items-center p-2 border rounded">
                          <div>
                            <p className="font-medium text-sm">{item.name}</p>
                            <p className="text-xs text-muted-foreground">
                              {item.currentStock} {item.unit}
                            </p>
                          </div>
                          {getStockStatusBadge(item.status)}
                        </div>
                      ))}
                      {categoryItems.length > 3 && (
                        <Button variant="ghost" className="w-full text-sm">
                          View all {categoryItems.length} items
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
