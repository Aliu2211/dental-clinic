import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

export default function Loading() {
  return (
    <div className="space-y-4">
      <Skeleton className="h-10 w-[250px]" />

      <div className="space-y-2">
        <Skeleton className="h-10 w-[300px]" />

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <Skeleton className="h-6 w-[150px] mb-2" />
                <Skeleton className="h-4 w-[250px]" />
              </div>
              <div className="flex gap-2">
                <Skeleton className="h-10 w-[150px]" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Skeleton className="h-10 w-full mb-4" />

            <div className="space-y-2">
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-12 w-full" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
