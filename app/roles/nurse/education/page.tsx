"use client"

import { useState } from "react"
import { useAuth } from "@/contexts/auth-context"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
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
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Search, FileText, Video, Image, Download, Share2, Plus, BookOpen } from "lucide-react"

export default function PatientEducationPage() {
  const { user } = useAuth()
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("all")

  // Mock data for educational materials
  const educationalMaterials = [
    {
      id: 1,
      title: "Proper Brushing Techniques",
      type: "document",
      format: "PDF",
      category: "oral-hygiene",
      description: "A comprehensive guide on proper brushing techniques for optimal dental health.",
      lastUpdated: "2023-02-15",
      language: "English",
      thumbnail: "/placeholder.svg?height=100&width=100",
    },
    {
      id: 2,
      title: "Understanding Dental Implants",
      type: "video",
      format: "MP4",
      category: "procedures",
      description: "An informative video explaining the dental implant procedure and aftercare.",
      duration: "5:32",
      lastUpdated: "2023-01-20",
      language: "English",
      thumbnail: "/placeholder.svg?height=100&width=100",
    },
    {
      id: 3,
      title: "Cuidado de Ortodoncia",
      type: "document",
      format: "PDF",
      category: "orthodontics",
      description: "Guía para el cuidado adecuado de aparatos ortodónticos.",
      lastUpdated: "2023-03-05",
      language: "Spanish",
      thumbnail: "/placeholder.svg?height=100&width=100",
    },
    {
      id: 4,
      title: "Post-Extraction Care",
      type: "document",
      format: "PDF",
      category: "post-care",
      description: "Instructions for proper care after tooth extraction to promote healing and prevent complications.",
      lastUpdated: "2023-02-28",
      language: "English",
      thumbnail: "/placeholder.svg?height=100&width=100",
    },
    {
      id: 5,
      title: "Dental Anatomy for Patients",
      type: "image",
      format: "PNG",
      category: "education",
      description: "Detailed diagram of dental anatomy with labels and explanations for patient education.",
      lastUpdated: "2023-01-10",
      language: "English",
      thumbnail: "/placeholder.svg?height=100&width=100",
    },
    {
      id: 6,
      title: "Preventing Gum Disease",
      type: "video",
      format: "MP4",
      category: "oral-hygiene",
      description: "Educational video on preventing gum disease through proper oral hygiene practices.",
      duration: "4:15",
      lastUpdated: "2023-03-12",
      language: "English",
      thumbnail: "/placeholder.svg?height=100&width=100",
    },
  ]

  // Filter materials based on search query and active tab
  const filteredMaterials = educationalMaterials.filter((material) => {
    const matchesSearch =
      material.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      material.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesTab = activeTab === "all" || material.type === activeTab
    return matchesSearch && matchesTab
  })

  // Get type icon
  const getTypeIcon = (type) => {
    switch (type) {
      case "document":
        return <FileText className="h-5 w-5" />
      case "video":
        return <Video className="h-5 w-5" />
      case "image":
        return <Image className="h-5 w-5" />
      default:
        return <BookOpen className="h-5 w-5" />
    }
  }

  return (
    <div className="container mx-auto p-6">
      <div className="mb-6 flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Patient Education</h1>
          <p className="text-muted-foreground">Manage and share educational materials with patients</p>
        </div>
        <div className="flex items-center space-x-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search materials..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add Material
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[525px]">
              <DialogHeader>
                <DialogTitle>Add Educational Material</DialogTitle>
                <DialogDescription>Upload or create new educational material for patients.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="title" className="text-right">
                    Title
                  </Label>
                  <Input id="title" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="type" className="text-right">
                    Type
                  </Label>
                  <Select>
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="document">Document</SelectItem>
                      <SelectItem value="video">Video</SelectItem>
                      <SelectItem value="image">Image</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="category" className="text-right">
                    Category
                  </Label>
                  <Select>
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="oral-hygiene">Oral Hygiene</SelectItem>
                      <SelectItem value="procedures">Procedures</SelectItem>
                      <SelectItem value="orthodontics">Orthodontics</SelectItem>
                      <SelectItem value="post-care">Post-Care</SelectItem>
                      <SelectItem value="education">General Education</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="language" className="text-right">
                    Language
                  </Label>
                  <Select>
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select language" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="english">English</SelectItem>
                      <SelectItem value="spanish">Spanish</SelectItem>
                      <SelectItem value="french">French</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="description" className="text-right">
                    Description
                  </Label>
                  <Textarea id="description" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="file" className="text-right">
                    Upload File
                  </Label>
                  <Input id="file" type="file" className="col-span-3" />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Save Material</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Tabs defaultValue="all" className="mb-6" onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="all">All Materials</TabsTrigger>
          <TabsTrigger value="document">Documents</TabsTrigger>
          <TabsTrigger value="video">Videos</TabsTrigger>
          <TabsTrigger value="image">Images</TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredMaterials.map((material) => (
          <Card key={material.id}>
            <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
              <div>
                <CardTitle className="text-lg">{material.title}</CardTitle>
                <CardDescription>
                  <div className="flex items-center gap-2">
                    {getTypeIcon(material.type)}
                    <span className="capitalize">{material.type}</span>
                    <Badge variant="outline">{material.format}</Badge>
                  </div>
                </CardDescription>
              </div>
              <Badge>{material.language}</Badge>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4">
                <img
                  src={material.thumbnail || "/placeholder.svg"}
                  alt={material.title}
                  className="h-16 w-16 rounded-md object-cover"
                />
                <div className="flex-1">
                  <p className="text-sm text-muted-foreground line-clamp-3">{material.description}</p>
                  <p className="mt-2 text-xs text-muted-foreground">
                    Last updated: {material.lastUpdated}
                    {material.duration && ` • Duration: ${material.duration}`}
                  </p>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" size="sm">
                <Download className="mr-2 h-4 w-4" />
                Download
              </Button>
              <Button size="sm">
                <Share2 className="mr-2 h-4 w-4" />
                Share
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}
