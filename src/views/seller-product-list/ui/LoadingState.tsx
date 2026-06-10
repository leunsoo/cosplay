export function LoadingState() {
  return (
    <main className="flex flex-col min-w-0 overflow-y-auto gap-4">
      {/* Back button skeleton */}
      <div className="flex items-center">
        <div className="w-20 h-10 bg-gray-200 rounded-lg animate-pulse" />
      </div>

      {/* Profile card skeleton */}
      <div className="bg-white rounded-xl border border-border-color shadow-sm p-6">
        <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
          <div className="w-32 h-32 rounded-full bg-gray-200 animate-pulse" />
          <div className="flex-1 space-y-3">
            <div className="h-6 w-48 bg-gray-200 rounded animate-pulse" />
            <div className="h-20 w-full bg-gray-200 rounded animate-pulse" />
          </div>
        </div>
      </div>

      {/* Tab skeleton */}
      <div className="h-12 w-full bg-gray-200 rounded animate-pulse" />

      {/* Product grid skeleton */}
      <div className="grid grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-x-5 md:gap-y-6">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="space-y-3">
            <div className="aspect-square bg-gray-200 rounded-lg animate-pulse" />
            <div className="h-4 w-full bg-gray-200 rounded animate-pulse" />
            <div className="h-4 w-3/4 bg-gray-200 rounded animate-pulse" />
          </div>
        ))}
      </div>
    </main>
  );
}
