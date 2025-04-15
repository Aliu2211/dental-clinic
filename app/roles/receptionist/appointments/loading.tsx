import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

export default function Loading() {
  return (
    <div className="space-y-4">
      <Skeleton className="h-10 w-[250px]" />

      <div className="space-y-4">
        <div className="flex space-x-2">
          <Skeleton className="h-10 w-[100px]" />
          <Skeleton className="h-10 w-[100px]" />
          <Skeleton className="h-10 w-[150px]" />
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <Skeleton className="h-6 w-[200px]" />
                <Skeleton className="h-4 w-[300px]" />
              </div>
              <Skeleton className="h-10 w-[150px]" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="mb-4 flex items-center gap-2">
              <Skeleton className="h-10 flex-1" />
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between border-b pb-2">
                <Skeleton className="h-4 w-[50px]" />
                <Skeleton className="h-4 w-[100px]" />
                <Skeleton className="h-4 w-[150px]" />
                <Skeleton className="h-4 w-[80px]" />
                <Skeleton className="h-4 w-[80px]" />
                <Skeleton className="h-4 w-[80px]" />
                <Skeleton className="h-4 w-[100px]" />
              </div>

              {Array(5)
                .fill(null)
                .map((_, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <Skeleton className="h-4 w-[50px]" />
                    <Skeleton className="h-4 w-[100px]" />
                    <Skeleton className="h-4 w-[150px]" />
                    <Skeleton className="h-4 w-[80px]" />
                    <Skeleton className="h-4 w-[80px]" />
                    <Skeleton className="h-4 w-[80px]" />
                    <Skeleton className="h-4 w-[100px]" />
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
