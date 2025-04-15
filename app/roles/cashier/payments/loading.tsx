import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function PaymentsLoading() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
        <div>
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-4 w-64 mt-2" />
        </div>
        <div className="flex items-center gap-2">
          <Skeleton className="h-10 w-24" />
          <Skeleton className="h-10 w-32" />
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
        <Skeleton className="h-10 w-full md:w-1/2" />
        <div className="flex items-center gap-2">
          <Skeleton className="h-10 w-[180px]" />
          <Skeleton className="h-10 w-[180px]" />
          <Skeleton className="h-10 w-10" />
          <Skeleton className="h-10 w-10" />
        </div>
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All Payments</TabsTrigger>
          <TabsTrigger value="today">Today</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="failed">Failed</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="space-y-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>
                <Skeleton className="h-5 w-40" />
              </CardTitle>
              <CardDescription>
                <Skeleton className="h-4 w-60" />
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <div className="grid grid-cols-7 bg-muted/50 p-3 text-sm font-medium">
                  <div className="col-span-2">
                    <Skeleton className="h-4 w-32" />
                  </div>
                  <div className="text-center">
                    <Skeleton className="h-4 w-20 mx-auto" />
                  </div>
                  <div className="text-center">
                    <Skeleton className="h-4 w-16 mx-auto" />
                  </div>
                  <div className="text-center">
                    <Skeleton className="h-4 w-16 mx-auto" />
                  </div>
                  <div className="text-center">
                    <Skeleton className="h-4 w-16 mx-auto" />
                  </div>
                  <div className="text-right">
                    <Skeleton className="h-4 w-20 ml-auto" />
                  </div>
                </div>
                <div className="divide-y">
                  {Array(5)
                    .fill(0)
                    .map((_, index) => (
                      <div key={index} className="grid grid-cols-7 items-center p-3 text-sm">
                        <div className="col-span-2 flex items-center gap-3">
                          <Skeleton className="h-9 w-9 rounded-full" />
                          <div>
                            <Skeleton className="h-4 w-24" />
                            <Skeleton className="h-3 w-32 mt-1" />
                          </div>
                        </div>
                        <div className="text-center">
                          <Skeleton className="h-4 w-20 mx-auto" />
                          <Skeleton className="h-3 w-16 mx-auto mt-1" />
                        </div>
                        <div className="text-center">
                          <Skeleton className="h-4 w-16 mx-auto" />
                        </div>
                        <div className="text-center">
                          <Skeleton className="h-6 w-24 mx-auto rounded-full" />
                        </div>
                        <div className="text-center">
                          <Skeleton className="h-6 w-24 mx-auto rounded-full" />
                        </div>
                        <div className="flex justify-end gap-2">
                          <Skeleton className="h-8 w-16" />
                          <Skeleton className="h-8 w-16" />
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex items-center justify-between border-t p-4">
              <Skeleton className="h-4 w-40" />
              <div className="flex items-center gap-2">
                <Skeleton className="h-8 w-20" />
                <Skeleton className="h-8 w-20" />
              </div>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
