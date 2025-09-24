"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useProjects } from "@/contexts/ProjectContext"
import { useToast } from "@/hooks/use-toast"

export function ProjectForm() {
  const { addProject } = useProjects()
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    name: "",
    type: "" as "Mangrove" | "Plantation" | "Restoration" | "",
    location: "",
    date: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.name || !formData.type || !formData.location || !formData.date) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      })
      return
    }

    addProject({
      name: formData.name,
      type: formData.type,
      location: formData.location,
      date: formData.date,
      status: "Pending",
      credits: 0,
    })

    toast({
      title: "Success",
      description: "Project submitted successfully!",
    })

    // Reset form
    setFormData({
      name: "",
      type: "",
      location: "",
      date: "",
    })
  }

  return (
    <Card className="border-blue-100 dark:border-blue-900 hover:shadow-lg transition-all duration-300">
      <CardHeader>
        <CardTitle className="text-blue-700 dark:text-blue-300">Submit New Project</CardTitle>
        <CardDescription>Submit your carbon offset project for verification</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">Project Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
              placeholder="Enter project name"
              className="focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <Label htmlFor="type">Project Type</Label>
            <Select
              value={formData.type}
              onValueChange={(value: "Mangrove" | "Plantation" | "Restoration") =>
                setFormData((prev) => ({ ...prev, type: value }))
              }
            >
              <SelectTrigger className="focus:ring-blue-500 focus:border-blue-500">
                <SelectValue placeholder="Select project type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Mangrove">Mangrove</SelectItem>
                <SelectItem value="Plantation">Plantation</SelectItem>
                <SelectItem value="Restoration">Restoration</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              value={formData.location}
              onChange={(e) => setFormData((prev) => ({ ...prev, location: e.target.value }))}
              placeholder="Enter project location"
              className="focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <Label htmlFor="date">Date Started</Label>
            <Input
              id="date"
              type="date"
              value={formData.date}
              onChange={(e) => setFormData((prev) => ({ ...prev, date: e.target.value }))}
              className="focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 transition-all duration-300"
          >
            Submit Project
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
