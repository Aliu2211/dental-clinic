import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="flex h-screen bg-gray-100">
      <div className="hidden md:flex md:w-64 md:flex-col">
        <div className="flex flex-col flex-grow pt-5 overflow-y-auto bg-white border-r border-gray-200">
          <div className="flex items-center flex-shrink-0 px-4">
            <Skeleton className="h-8 w-8" />
            <Skeleton className="h-6 w-24 ml-2" />
          </div>
          <div className="mt-5 flex-grow flex flex-col">
            <nav className="flex-1 px-2 pb-4 space-y-1">
              {Array(6)
                .fill(0)
                .map((_, i) => (
                  <Skeleton key={i} className="h-9 w-full" />
                ))}
            </nav>
          </div>
          <div className="flex-shrink-0 flex border-t border-gray-200 p-4">
            <Skeleton className="h-9 w-9 rounded-full" />
            <div className="ml-3">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-3 w-16 mt-1" />
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col flex-1 overflow-hidden">
        <div className="flex items-center justify-between p-4 bg-white border-b border-gray-200 md:hidden">
          <Skeleton className="h-8 w-32" />
          <Skeleton className="h-8 w-8 rounded-full" />
        </div>
        <main className="flex-1 relative overflow-y-auto focus:outline-none p-4 md:p-6">
          <div className="space-y-6">
            <Skeleton className="h-8 w-48" />
            <Skeleton className="h-4 w-64" />

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {Array(4)
                .fill(0)
                .map((_, i) => (
                  <Skeleton key={i} className="h-32 w-full" />
                ))}
            </div>

            <Skeleton className="h-64 w-full" />
          </div>
        </main>
      </div>
    </div>
  )
}
