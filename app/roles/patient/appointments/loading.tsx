import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

export default function Loading() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
        <div>
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-4 w-64 mt-2" />
        </div>
        <div>
          <Skeleton className="h-9 w-40" />
        </div>
      </div>

      <Skeleton className="h-10 w-64 mb-4" />

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <Skeleton className="h-5 w-32 mb-1" />
              <Skeleton className="h-4 w-48" />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Skeleton className="h-10 w-full mb-4" />

          <div className="space-y-4">
            {Array(3)
              .fill(0)
              .map((_, i) => (
                <Skeleton key={i} className="h-32 w-full" />
              ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
