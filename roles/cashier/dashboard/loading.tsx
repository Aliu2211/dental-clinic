export default function Loading() {
  return (
    <div className="space-y-6">
      <div className="h-8 w-64 bg-muted rounded animate-pulse" />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {Array(4)
          .fill(0)
          .map((_, i) => (
            <div key={i} className="h-32 bg-muted rounded animate-pulse" />
          ))}
      </div>
      <div className="h-8 w-48 bg-muted rounded animate-pulse" />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {Array(3)
          .fill(0)
          .map((_, i) => (
            <div key={i} className="h-64 bg-muted rounded animate-pulse" />
          ))}
      </div>
    </div>
  )
}
