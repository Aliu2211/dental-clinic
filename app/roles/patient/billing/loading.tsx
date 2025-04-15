import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"

export default function PatientBillingLoading() {
  return (
    <div className="container mx-auto p-4 space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <Skeleton className="h-8 w-64 mb-2" />
          <Skeleton className="h-4 w-48" />
        </div>
        <Skeleton className="h-10 w-40" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {Array(3)
          .fill(0)
          .map((_, i) => (
            <Card key={i}>
              <CardHeader className="pb-2">
                <Skeleton className="h-5 w-32 mb-1" />
                <Skeleton className="h-4 w-24" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-8 w-24" />
              </CardContent>
            </Card>
          ))}
      </div>

      <div className="space-y-4">
        <Skeleton className="h-10 w-full max-w-md mb-6" />

        <Skeleton className="h-6 w-40 mb-4" />

        {Array(3)
          .fill(0)
          .map((_, i) => (
            <Card key={i} className="mb-4">
              <CardHeader className="pb-2">
                <div className="flex justify-between">
                  <div>
                    <Skeleton className="h-5 w-48 mb-1" />
                    <Skeleton className="h-4 w-32" />
                  </div>
                  <Skeleton className="h-6 w-20" />
                </div>
              </CardHeader>
              <CardContent className="pb-2">
                <div className="flex justify-between">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-4 w-32" />
                </div>
              </CardContent>
              <CardFooter className="flex justify-between pt-2">
                <Skeleton className="h-6 w-20" />
                <Skeleton className="h-9 w-24" />
              </CardFooter>
            </Card>
          ))}
      </div>
    </div>
  )
}
