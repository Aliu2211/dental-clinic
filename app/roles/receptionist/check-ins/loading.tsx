import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

export default function CheckInsLoading() {
  return (
    <div className="space-y-4">
      <Skeleton className="h-10 w-[250px]" />

      <Skeleton className="h-10 w-[300px]" />

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <Skeleton className="h-6 w-[180px] mb-2" />
              <Skeleton className="h-4 w-[250px]" />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <Skeleton className="h-10 w-full" />
          </div>

          <div className="space-y-4">
            <div className="flex items-center space-x-4 border-b pb-2">
              <Skeleton className="h-4 w-[150px]" />
              <Skeleton className="h-4 w-[100px]" />
              <Skeleton className="h-4 w-[150px]" />
              <Skeleton className="h-4 w-[100px]" />
              <Skeleton className="h-4 w-[100px]" />
              <Skeleton className="h-4 w-[100px]" />
            </div>

            {Array(5)
              .fill(null)
              .map((_, i) => (
                <div key={i} className="flex items-center space-x-4">
                  <Skeleton className="h-4 w-[150px]" />
                  <Skeleton className="h-4 w-[100px]" />
                  <Skeleton className="h-4 w-[150px]" />
                  <Skeleton className="h-4 w-[100px]" />
                  <Skeleton className="h-4 w-[100px]" />
                  <Skeleton className="h-8 w-[100px]" />
                </div>
              ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
