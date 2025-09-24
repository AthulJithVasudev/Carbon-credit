"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useProjects } from "@/contexts/ProjectContext"
import { useToast } from "@/hooks/use-toast"

export default function AdminPage() {
  const { projects, updateProject, getTotalCredits } = useProjects()
  const { toast } = useToast()

  const handleVerify = (id: string) => {
    updateProject(id, { status: "Verified", credits: 10 })
    toast({
      title: "Project Verified",
      description: "Project has been verified and 10 credits awarded.",
    })
  }

  const handleReject = (id: string) => {
    updateProject(id, { status: "Rejected", credits: 0 })
    toast({
      title: "Project Rejected",
      description: "Project has been rejected.",
      variant: "destructive",
    })
  }

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

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2 flex items-center gap-2">
          <span className="bg-gradient-to-r from-blue-500 to-blue-700 bg-clip-text text-transparent">🛠️</span>
          <span className="bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">Admin Portal</span>
        </h1>
        <p className="text-muted-foreground">Review and verify carbon offset projects</p>
      </div>

      {/* Total Credits Card */}
      <Card className="mb-8 border-blue-100 dark:border-blue-900">
        <CardHeader>
          <CardTitle className="text-blue-700 dark:text-blue-300">Total Credits Issued</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
            {getTotalCredits()} Credits
          </div>
          <p className="text-sm text-muted-foreground mt-1">
            From {projects.filter((p) => p.status === "Verified").length} verified projects
          </p>
        </CardContent>
      </Card>

      {/* Projects List */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-blue-700 dark:text-blue-300">Project Reviews</h2>

        {projects.length === 0 ? (
          <Card className="border-blue-100 dark:border-blue-900">
            <CardContent className="pt-6">
              <div className="text-center text-muted-foreground">
                No projects submitted yet. Waiting for user submissions...
              </div>
            </CardContent>
          </Card>
        ) : (
          projects.map((project) => (
            <Card
              key={project.id}
              className="border-blue-100 dark:border-blue-900 hover:shadow-lg transition-all duration-300"
            >
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <CardTitle className="text-lg text-blue-700 dark:text-blue-300">{project.name}</CardTitle>
                    <div className="text-sm text-muted-foreground mt-1">
                      <div>ID: {project.id}</div>
                      <div>
                        Type: {project.type} • Location: {project.location}
                      </div>
                      <div>Started: {project.date}</div>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    {getStatusBadge(project.status)}
                    <div className="text-sm font-medium text-blue-600 dark:text-blue-400">
                      Credits: {project.credits}
                    </div>
                  </div>
                </div>
              </CardHeader>

              {project.status === "Pending" && (
                <CardContent className="pt-0">
                  <div className="flex gap-2">
                    <Button
                      onClick={() => handleVerify(project.id)}
                      className="bg-green-600 hover:bg-green-700 text-white transition-all duration-300"
                    >
                      ✅ Verify (10 Credits)
                    </Button>
                    <Button
                      onClick={() => handleReject(project.id)}
                      variant="destructive"
                      className="transition-all duration-300"
                    >
                      ❌ Reject
                    </Button>
                  </div>
                </CardContent>
              )}
            </Card>
          ))
        )}
      </div>
    </div>
  )
}
