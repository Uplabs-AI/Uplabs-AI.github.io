import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent } from "@/components/ui/card"
import { Sidebar } from "@/components/layout/sidebar"

export default function LoadingCreateSurvey() {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center gap-4">
            <Skeleton className="h-9 w-20" />
            <Skeleton className="h-7 w-32" />
          </div>
          <div className="flex items-center gap-2">
            <Skeleton className="h-9 w-24" />
            <Skeleton className="h-9 w-36" />
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-4xl mx-auto space-y-8">
            {/* Información básica */}
            <Card>
              <CardContent className="p-6">
                <Skeleton className="h-64 w-full" />
              </CardContent>
            </Card>

            {/* Preguntas */}
            <div className="space-y-6">
              <Skeleton className="h-7 w-32" />
              {[1, 2, 3].map((i) => (
                <Card key={i}>
                  <CardContent className="p-6">
                    <Skeleton className="h-72 w-full" />
                  </CardContent>
                </Card>
              ))}
              <Skeleton className="h-12 w-full rounded-lg" />
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="flex items-center justify-between p-6 border-t border-border">
          <Skeleton className="h-9 w-20" />
          <div className="flex items-center gap-2">
            <Skeleton className="h-9 w-44" />
            <Skeleton className="h-9 w-36" />
          </div>
        </footer>
      </div>
    </div>
  )
}
