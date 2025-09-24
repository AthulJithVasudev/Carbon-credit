import dynamic from "next/dynamic"

const PDFViewer = dynamic(() => import("@/components/PDFViewer").then(m => m.PDFViewer), {
  ssr: false,
  loading: () => <div className="flex h-[calc(100vh-4rem)] items-center justify-center text-sm text-muted-foreground">Loading viewer…</div>,
})

export default function PDFPage() {
  return (
    <div className="p-0 m-0">
      <div className="w-full h-[calc(100vh-4rem)] md:h-[calc(100vh-4rem)]">
        <PDFViewer variant="full" title="Bluelog: Carbon Credit Documentation" />
      </div>
    </div>
  )
}


