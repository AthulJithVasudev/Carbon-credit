"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

export interface Project {
  id: string
  name: string
  type: "Mangrove" | "Plantation" | "Restoration"
  location: string
  date: string
  status: "Pending" | "Verified" | "Rejected"
  credits: number
}

interface ProjectContextType {
  projects: Project[]
  addProject: (project: Omit<Project, "id">) => void
  updateProject: (id: string, updates: Partial<Project>) => void
  getTotalCredits: () => number
}

const ProjectContext = createContext<ProjectContextType | undefined>(undefined)

export function ProjectProvider({ children }: { children: ReactNode }) {
  const [projects, setProjects] = useState<Project[]>([])

  const addProject = (project: Omit<Project, "id">) => {
    const newProject: Project = {
      ...project,
      id: Date.now().toString(),
      status: "Pending",
      credits: 0,
    }
    setProjects((prev) => [...prev, newProject])
  }

  const updateProject = (id: string, updates: Partial<Project>) => {
    setProjects((prev) => prev.map((project) => (project.id === id ? { ...project, ...updates } : project)))
  }

  const getTotalCredits = () => {
    return projects
      .filter((project) => project.status === "Verified")
      .reduce((total, project) => total + project.credits, 0)
  }

  return (
    <ProjectContext.Provider
      value={{
        projects,
        addProject,
        updateProject,
        getTotalCredits,
      }}
    >
      {children}
    </ProjectContext.Provider>
  )
}

export function useProjects() {
  const context = useContext(ProjectContext)
  if (context === undefined) {
    throw new Error("useProjects must be used within a ProjectProvider")
  }
  return context
}
