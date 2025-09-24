"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useProjects } from "@/contexts/ProjectContext"

export function ProjectList() {
  const { projects } = useProjects()

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Pending":
        return (
          <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
            🟡 Pending
          </Badge>
        )
      case "Verified":
        return (
          <Badge variant="default" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
            🟢 Verified
          </Badge>
        )
      case "Rejected":
        return (
          <Badge variant="destructive" className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">
            🔴 Rejected
          </Badge>
        )
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  if (projects.length === 0) {
    return (
      <Card className="border-blue-100 dark:border-blue-900">
        <CardContent className="pt-6">
          <div className="text-center text-muted-foreground">
            No projects submitted yet. Submit your first project above!
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      {projects.map((project) => (
        <Card
          key={project.id}
          className="border-blue-100 dark:border-blue-900 hover:shadow-lg transition-all duration-300 hover:scale-[1.02]"
        >
          <CardHeader className="pb-3">
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-lg text-blue-700 dark:text-blue-300">{project.name}</CardTitle>
                <div className="text-sm text-muted-foreground">
                  ID: {project.id} • {project.type} • {project.location}
                </div>
              </div>
              {getStatusBadge(project.status)}
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="flex justify-between items-center text-sm">
              <span>Started: {project.date}</span>
              <span className="font-medium text-blue-600 dark:text-blue-400">Credits Earned: {project.credits}</span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
