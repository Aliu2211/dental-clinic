import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

export default function SettingsLoading() {
  return (
    <div className="space-y-4">
      <Skeleton className="h-10 w-[250px]" />

      <div className="space-y-2">
        <Skeleton className="h-10 w-[400px]" />

        <Card>
          <CardHeader>
            <Skeleton className="h-6 w-[150px] mb-2" />
            <Skeleton className="h-4 w-[250px]" />
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Skeleton className="h-4 w-[100px]" />
              <Skeleton className="h-10 w-full" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Skeleton className="h-4 w-[100px]" />
                <Skeleton className="h-10 w-full" />
              </div>
              <div className="space-y-2">
                <Skeleton className="h-4 w-[100px]" />
                <Skeleton className="h-10 w-full" />
              </div>
            </div>

            <div className="space-y-2">
              <Skeleton className="h-4 w-[100px]" />
              <Skeleton className="h-24 w-full" />
            </div>

            <div className="flex justify-end">
              <Skeleton className="h-10 w-[120px]" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
