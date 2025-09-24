"use client"

import { useEffect, useMemo, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Document, Page, pdfjs } from "react-pdf"
import "react-pdf/dist/Page/AnnotationLayer.css"
import "react-pdf/dist/Page/TextLayer.css"
import { Minus, Plus, RotateCcw, RotateCw, Download as DownloadIcon } from "lucide-react"

type PDFViewerProps = {
  variant?: "compact" | "full"
  title?: string
  src?: string
}

export function PDFViewer({
  variant = "compact",
  title = "Carbon Credit Documentation",
  src = "/BlueLog-1.pdf",
}: PDFViewerProps) {
  // Configure pdf.js worker
  useEffect(() => {
    try {
      // Use CDN worker to avoid bundling issues in Next.js
      pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`
    } catch {}
  }, [])

  const [numPages, setNumPages] = useState<number>(0)
  const [scale, setScale] = useState<number>(variant === "full" ? 1.1 : 1.0)
  const [rotation, setRotation] = useState<number>(0)

  const containerClasses = useMemo(
    () =>
      variant === "full"
        ? "max-w-none w-full"
        : "w-full max-w-4xl mx-auto",
    [variant]
  )

  const frameHeightClass = variant === "full" ? "h-[calc(100vh-4rem)] md:h-[calc(100vh-4rem)]" : "h-96"

  const Controls = (
    <div className="pointer-events-none absolute inset-x-0 bottom-4 flex justify-center">
      <div className="pointer-events-auto z-30 flex items-center gap-2 rounded-full border border-border bg-background/90 px-2.5 py-1.5 shadow-md backdrop-blur supports-[backdrop-filter]:bg-background/70 opacity-0 group-hover:opacity-100 transition-opacity">
        <Button variant="ghost" size="sm" onClick={() => setScale((s) => Math.min(s + 0.1, 3))}>
          <Plus className="size-4" />
        </Button>
        <Button variant="ghost" size="sm" onClick={() => setScale((s) => Math.max(s - 0.1, 0.5))}>
          <Minus className="size-4" />
        </Button>
        <div className="mx-1 h-5 w-px bg-border" />
        <Button variant="ghost" size="sm" onClick={() => setRotation((r) => (r + 90) % 360)}>
          <RotateCw className="size-4" />
        </Button>
        <Button variant="ghost" size="sm" onClick={() => setRotation((r) => (r + 270) % 360)}>
          <RotateCcw className="size-4" />
        </Button>
        <div className="mx-1 h-5 w-px bg-border" />
        <Button asChild variant="outline" size="sm" className="border-blue-200 dark:border-blue-900">
          <a href={src} download>
            <DownloadIcon className="size-4" />
          </a>
        </Button>
      </div>
    </div>
  )

  const pdfContent = (
    <div className={`relative ${frameHeightClass} group`}> 
      {/* Scrollable area */}
      <div className="absolute inset-0 overflow-auto">
        <Document
          file={src}
          onLoadSuccess={({ numPages: n }) => setNumPages(n)}
          onLoadError={(err) => {
            // eslint-disable-next-line no-console
            console.error("PDF load error:", err)
          }}
          loading={<div className="flex h-full items-center justify-center text-sm text-muted-foreground">Loading PDF…</div>}
          error={<div className="flex h-full items-center justify-center text-sm text-destructive">Failed to load PDF</div>}
          options={{}}
        >
          <div className="flex flex-col items-center gap-6 py-6">
            {Array.from({ length: numPages }).map((_, pageIndex) => (
              <Page
                key={`page_${pageIndex + 1}`}
                pageNumber={pageIndex + 1}
                scale={scale}
                rotate={rotation}
                renderTextLayer={true}
                renderAnnotationLayer={true}
              />
            ))}
          </div>
        </Document>
      </div>
      {/* Floating controls overlay (outside scroll area) */}
      <div className="absolute inset-0 z-20 pointer-events-none">
        {Controls}
      </div>
    </div>
  )

  if (variant === "full") {
    // Borderless, seamless full-viewport experience
    return (
      <div className={`${containerClasses}`}>
        {pdfContent}
      </div>
    )
  }

  // Compact variant with subtle title, borderless content
  return (
    <Card className={containerClasses}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between gap-3">
          <CardTitle className="bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
            {title}
          </CardTitle>
          <div className="flex items-center gap-1.5">
            <Button asChild variant="ghost" size="sm" className="hover:scale-105">
              <a href={src} target="_blank" rel="noreferrer">Open</a>
            </Button>
            <Button asChild variant="outline" size="sm" className="border-blue-200 dark:border-blue-900">
              <a href={src} download>Download</a>
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className={`w-full overflow-hidden rounded-lg bg-transparent`}>{pdfContent}</div>
        <p className="text-sm text-muted-foreground mt-2 text-center">
          Interactive PDF viewer - Learn about carbon credit processes and regulations
        </p>
      </CardContent>
    </Card>
  )
}
