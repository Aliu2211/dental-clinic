import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

export default function DoctorSettingsLoading() {
  return (
    <div className="space-y-6">
      <div>
        <Skeleton className="h-10 w-[250px]" />
        <Skeleton className="h-4 w-[350px] mt-2" />
      </div>

      <div className="space-y-2">
        <Skeleton className="h-10 w-[300px]" />
        <Card>
          <CardHeader>
            <Skeleton className="h-6 w-[200px]" />
            <Skeleton className="h-4 w-[300px] mt-2" />
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex flex-col sm:flex-row gap-6">
              <Skeleton className="h-24 w-24 rounded-full" />
              <div className="flex-1 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                  <Skeleton className="h-10 w-full" />
                </div>
                <div className="space-y-2">
                  <Skeleton className="h-4 w-[100px]" />
                  <Skeleton className="h-10 w-full" />
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <Skeleton className="h-4 w-[100px]" />
              <Skeleton className="h-10 w-full" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-4 w-[100px]" />
              <Skeleton className="h-20 w-full" />
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
