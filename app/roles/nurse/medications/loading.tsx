import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="space-y-4">
      <Skeleton className="h-10 w-[250px]" />

      <Skeleton className="h-10 w-[300px]" />

      <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="space-y-1">
              <Skeleton className="h-5 w-[150px]" />
              <Skeleton className="h-4 w-[200px]" />
            </div>
            <Skeleton className="h-10 w-[150px]" />
          </div>

          <div className="space-y-4">
            {Array(3)
              .fill(0)
              .map((_, i) => (
                <Skeleton key={i} className="h-24 w-full" />
              ))}
          </div>
        </div>
      </div>
    </div>
  )
}
