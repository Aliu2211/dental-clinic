import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="space-y-4">
      <Skeleton className="h-10 w-[250px]" />

      <div className="grid gap-4 md:grid-cols-3">
        <div className="md:col-span-1">
          <div className="rounded-lg border bg-card text-card-foreground shadow-sm h-full">
            <div className="p-6 space-y-4">
              <div className="space-y-2">
                <Skeleton className="h-5 w-[150px]" />
                <Skeleton className="h-4 w-[200px]" />
              </div>
              <Skeleton className="h-10 w-full" />
              <div className="space-y-4">
                {Array(4)
                  .fill(0)
                  .map((_, i) => (
                    <div key={i} className="flex items-center space-x-3">
                      <Skeleton className="h-10 w-10 rounded-full" />
                      <div className="space-y-2">
                        <Skeleton className="h-4 w-[120px]" />
                        <Skeleton className="h-3 w-[180px]" />
                        <Skeleton className="h-5 w-[80px]" />
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>

        <div className="md:col-span-2">
          <div className="rounded-lg border bg-card text-card-foreground shadow-sm h-full">
            <div className="p-6 space-y-4">
              <div className="flex justify-between items-start">
                <div className="space-y-2">
                  <Skeleton className="h-5 w-[150px]" />
                  <Skeleton className="h-4 w-[200px]" />
                </div>
                <Skeleton className="h-6 w-[80px]" />
              </div>

              <Skeleton className="h-10 w-[300px]" />

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Skeleton className="h-5 w-[120px]" />
                  <Skeleton className="h-4 w-[80px]" />
                </div>

                <div className="space-y-2">
                  {Array(5)
                    .fill(0)
                    .map((_, i) => (
                      <Skeleton key={i} className="h-10 w-full" />
                    ))}
                </div>

                <div className="pt-4 space-y-2">
                  <Skeleton className="h-5 w-[180px]" />
                  <div className="grid grid-cols-2 gap-2">
                    {Array(4)
                      .fill(0)
                      .map((_, i) => (
                        <div key={i} className="space-y-1">
                          <Skeleton className="h-4 w-[100px]" />
                          <Skeleton className="h-4 w-[120px]" />
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
