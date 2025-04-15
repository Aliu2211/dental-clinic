import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="space-y-4">
      <Skeleton className="h-10 w-[250px]" />

      <Skeleton className="h-10 w-[300px]" />

      <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
        <div className="p-6 space-y-4">
          <div className="space-y-2">
            <Skeleton className="h-5 w-[150px]" />
            <Skeleton className="h-4 w-[200px]" />
          </div>

          <div className="flex items-center space-x-4">
            <Skeleton className="h-20 w-20 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-5 w-[150px]" />
              <Skeleton className="h-4 w-[200px]" />
              <Skeleton className="h-6 w-[80px]" />
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {Array(4)
              .fill(0)
              .map((_, i) => (
                <div key={i} className="space-y-2">
                  <Skeleton className="h-4 w-[100px]" />
                  <Skeleton className="h-10 w-full" />
                </div>
              ))}
          </div>

          <div className="space-y-2">
            <Skeleton className="h-4 w-[100px]" />
            <Skeleton className="h-24 w-full" />
          </div>

          <div className="flex justify-end">
            <Skeleton className="h-10 w-[120px]" />
          </div>
        </div>
      </div>
    </div>
  )
}
