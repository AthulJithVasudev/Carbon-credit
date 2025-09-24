import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import dynamic from "next/dynamic"
const PDFViewer = dynamic(() => import("@/components/PDFViewer").then(m => m.PDFViewer), { ssr: false })

export default function HomePage() {
  const features = [
    {
      title: "User Submission",
      description: "Submit your carbon offset projects for verification and credit generation.",
      icon: "📝",
    },
    {
      title: "Admin Verification",
      description: "Rigorous verification process ensures project authenticity and impact.",
      icon: "✅",
    },
    {
      title: "Transparent Credits",
      description: "Blockchain-powered transparency for all carbon credit transactions.",
      icon: "🔗",
    },
  ]

  return (
    <div className="container mx-auto px-4 py-12 space-y-16">
      {/* Hero Section */}
      <div className="text-center">
        <div className="flex justify-center mb-6">
          <Image
            src="/images/bluelog-logo.png"
            alt="Bluelog Logo"
            width={80}
            height={80}
            className="rounded-xl shadow-lg hover:scale-105 transition-transform duration-300"
          />
        </div>
        <h1 className="text-5xl font-bold mb-4 text-balance bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
          Bluelog
        </h1>
        <p className="text-xl text-muted-foreground mb-8 text-balance">Blockchain-powered Carbon Credit Tracking</p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            asChild
            size="lg"
            className="text-lg px-8 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 transition-all duration-300 hover:scale-105"
          >
            <Link href="/user">Go to User Portal</Link>
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="text-lg px-8 border-blue-200 text-blue-700 hover:bg-blue-50 dark:border-blue-800 dark:text-blue-300 dark:hover:bg-blue-950 transition-all duration-300 hover:scale-105 bg-transparent"
          >
            <Link href="/admin">Go to Admin Portal</Link>
          </Button>
        </div>
      </div>

      <PDFViewer variant="compact" />

      {/* Features Section */}
      <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
        {features.map((feature, index) => (
          <Card
            key={index}
            className="text-center hover:shadow-lg transition-all duration-300 hover:scale-105 border-blue-100 dark:border-blue-900"
          >
            <CardHeader>
              <div className="text-3xl mb-2">{feature.icon}</div>
              <CardTitle className="text-xl text-blue-700 dark:text-blue-300">{feature.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base">{feature.description}</CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Stats Section */}
      <div className="text-center">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto">
          <div className="transition-transform duration-300 hover:scale-105">
            <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
              100%
            </div>
            <div className="text-muted-foreground">Transparent</div>
          </div>
          <div className="transition-transform duration-300 hover:scale-105">
            <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
              24/7
            </div>
            <div className="text-muted-foreground">Available</div>
          </div>
          <div className="transition-transform duration-300 hover:scale-105">
            <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
              Secure
            </div>
            <div className="text-muted-foreground">Blockchain</div>
          </div>
        </div>
      </div>
    </div>
  )
}
