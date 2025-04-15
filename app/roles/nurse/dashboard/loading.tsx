import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="space-y-4">
      <Skeleton className="h-10 w-[250px]" />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {Array(4)
          .fill(0)
          .map((_, i) => (
            <div key={i} className="rounded-lg border bg-card text-card-foreground shadow-sm">
              <div className="p-6 flex flex-col space-y-2">
                <Skeleton className="h-5 w-[120px]" />
                <Skeleton className="h-8 w-[60px]" />
                <Skeleton className="h-4 w-[100px]" />
              </div>
            </div>
          ))}
      </div>

      <div className="space-y-2">
        <Skeleton className="h-10 w-[300px]" />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {Array(3)
            .fill(0)
            .map((_, i) => (
              <div key={i} className="rounded-lg border bg-card text-card-foreground shadow-sm">
                <div className="p-6 flex flex-col space-y-2">
                  <Skeleton className="h-5 w-[150px]" />
                  <Skeleton className="h-4 w-[100px]" />
                  <div className="space-y-2">
                    {Array(3)
                      .fill(0)
                      .map((_, j) => (
                        <div key={j} className="flex items-center space-x-4">
                          <Skeleton className="h-10 w-10 rounded-full" />
                          <div className="space-y-2">
                            <Skeleton className="h-4 w-[150px]" />
                            <Skeleton className="h-4 w-[100px]" />
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  )
}
