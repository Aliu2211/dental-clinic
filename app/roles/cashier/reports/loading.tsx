import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function ReportsLoading() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
        <div>
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-4 w-64 mt-2" />
        </div>
        <div className="flex items-center gap-2">
          <Skeleton className="h-10 w-24" />
          <Skeleton className="h-10 w-24" />
          <Skeleton className="h-10 w-24" />
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
        <div className="flex items-center gap-2 flex-1">
          <Skeleton className="h-10 w-[180px]" />
          <Skeleton className="h-10 w-10" />
        </div>
        <Skeleton className="h-10 w-32" />
      </div>

      <Tabs defaultValue="summary" className="space-y-4">
        <TabsList>
          <TabsTrigger value="summary">Summary</TabsTrigger>
          <TabsTrigger value="revenue">Revenue</TabsTrigger>
          <TabsTrigger value="payments">Payments</TabsTrigger>
          <TabsTrigger value="insurance">Insurance</TabsTrigger>
        </TabsList>
        <TabsContent value="summary" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-4">
            {Array(4)
              .fill(0)
              .map((_, index) => (
                <Card key={index}>
                  <CardHeader className="pb-2">
                    <CardTitle>
                      <Skeleton className="h-4 w-32" />
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Skeleton className="h-8 w-24" />
                    <Skeleton className="h-3 w-40 mt-1" />
                  </CardContent>
                </Card>
              ))}
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>
                  <Skeleton className="h-5 w-32" />
                </CardTitle>
                <CardDescription>
                  <Skeleton className="h-4 w-64" />
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Skeleton className="h-[250px] w-full" />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>
                  <Skeleton className="h-5 w-48" />
                </CardTitle>
                <CardDescription>
                  <Skeleton className="h-4 w-40" />
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  {Array(4)
                    .fill(0)
                    .map((_, index) => (
                      <Skeleton key={index} className="h-32 w-full" />
                    ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>
                <Skeleton className="h-5 w-40" />
              </CardTitle>
              <CardDescription>
                <Skeleton className="h-4 w-64" />
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {Array(5)
                  .fill(0)
                  .map((_, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <div>
                          <Skeleton className="h-4 w-32" />
                          <Skeleton className="h-3 w-24 mt-1" />
                        </div>
                        <Skeleton className="h-4 w-24" />
                      </div>
                      <Skeleton className="h-2 w-full" />
                      <Skeleton className="h-3 w-20" />
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
