import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

export default function RegistrationLoading() {
  return (
    <div className="space-y-4">
      <Skeleton className="h-10 w-[250px]" />

      <Card>
        <CardHeader>
          <Skeleton className="h-6 w-[200px] mb-2" />
          <Skeleton className="h-4 w-[300px]" />
        </CardHeader>
        <CardContent>
          <Skeleton className="h-10 w-full mb-6" />

          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Array(6)
                .fill(null)
                .map((_, i) => (
                  <div key={i} className="space-y-2">
                    <Skeleton className="h-4 w-[100px]" />
                    <Skeleton className="h-10 w-full" />
                  </div>
                ))}
            </div>

            <div className="flex justify-end">
              <Skeleton className="h-10 w-[100px]" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
