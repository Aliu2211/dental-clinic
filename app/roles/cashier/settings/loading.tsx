import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function SettingsLoading() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
        <div>
          <Skeleton className="h-8 w-32" />
          <Skeleton className="h-4 w-64 mt-2" />
        </div>
      </div>

      <Tabs defaultValue="payment" className="space-y-4">
        <TabsList>
          <TabsTrigger value="payment">Payment Settings</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="account">Account</TabsTrigger>
        </TabsList>
        <TabsContent value="payment" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>
                <Skeleton className="h-5 w-40" />
              </CardTitle>
              <CardDescription>
                <Skeleton className="h-4 w-60" />
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                {Array(5)
                  .fill(0)
                  .map((_, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Skeleton className="h-5 w-5 rounded-full" />
                        <div>
                          <Skeleton className="h-4 w-32" />
                          <Skeleton className="h-3 w-48 mt-1" />
                        </div>
                      </div>
                      <Skeleton className="h-6 w-12 rounded-full" />
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>
                <Skeleton className="h-5 w-40" />
              </CardTitle>
              <CardDescription>
                <Skeleton className="h-4 w-60" />
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                {Array(4)
                  .fill(0)
                  .map((_, index) => (
                    <div key={index} className="space-y-2">
                      <Skeleton className="h-4 w-24" />
                      <Skeleton className="h-10 w-full" />
                    </div>
                  ))}
              </div>
            </CardContent>
            <CardFooter>
              <Skeleton className="h-10 w-32 ml-auto" />
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
