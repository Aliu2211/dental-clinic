import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"

export default function PatientEducationLoading() {
  return (
    <div className="container mx-auto p-6">
      <div className="mb-6 flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
        <div>
          <Skeleton className="h-8 w-[250px]" />
          <Skeleton className="mt-2 h-4 w-[350px]" />
        </div>
        <div className="flex items-center space-x-2">
          <Skeleton className="h-10 w-[200px]" />
          <Skeleton className="h-10 w-[150px]" />
        </div>
      </div>

      <Skeleton className="mb-6 h-10 w-[400px]" />

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {Array(6)
          .fill(null)
          .map((_, index) => (
            <Card key={index}>
              <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
                <div>
                  <Skeleton className="h-6 w-[180px]" />
                  <Skeleton className="mt-1 h-4 w-[120px]" />
                </div>
                <Skeleton className="h-5 w-[60px]" />
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4">
                  <Skeleton className="h-16 w-16 rounded-md" />
                  <div className="flex-1">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="mt-1 h-4 w-full" />
                    <Skeleton className="mt-1 h-4 w-3/4" />
                    <Skeleton className="mt-2 h-3 w-1/2" />
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Skeleton className="h-9 w-[120px]" />
                <Skeleton className="h-9 w-[100px]" />
              </CardFooter>
            </Card>
          ))}
      </div>
    </div>
  )
}
