import { ProjectForm } from "@/components/ProjectForm"
import { ProjectList } from "@/components/ProjectList"

export default function UserPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2 flex items-center gap-2">
          <span className="bg-gradient-to-r from-blue-500 to-blue-700 bg-clip-text text-transparent">📊</span>
          <span className="bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">User Portal</span>
        </h1>
        <p className="text-muted-foreground">Submit and track your carbon offset projects</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        <div>
          <ProjectForm />
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-4 text-blue-700 dark:text-blue-300">Your Projects</h2>
          <ProjectList />
        </div>
      </div>
    </div>
  )
}
