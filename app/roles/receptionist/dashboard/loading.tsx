import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

export default function DashboardLoading() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Skeleton className="h-10 w-[250px]" />
        <div className="flex items-center gap-2">
          <Skeleton className="h-10 w-[150px]" />
          <Skeleton className="h-10 w-[120px]" />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {Array(4)
          .fill(null)
          .map((_, i) => (
            <Card key={i}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <Skeleton className="h-4 w-[100px]" />
                <Skeleton className="h-4 w-4 rounded-full" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-8 w-[60px] mb-1" />
                <Skeleton className="h-4 w-[120px]" />
              </CardContent>
            </Card>
          ))}
      </div>

      <div className="space-y-4">
        <Skeleton className="h-10 w-[300px]" />

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {Array(3)
            .fill(null)
            .map((_, i) => (
              <Card key={i}>
                <CardHeader>
                  <Skeleton className="h-6 w-[150px] mb-2" />
                  <Skeleton className="h-4 w-[200px]" />
                </CardHeader>
                <CardContent className="space-y-2">
                  {Array(3)
                    .fill(null)
                    .map((_, j) => (
                      <div key={j} className="space-y-1">
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-3 w-[80%]" />
                      </div>
                    ))}
                </CardContent>
              </Card>
            ))}
        </div>
      </div>
    </div>
  )
}
