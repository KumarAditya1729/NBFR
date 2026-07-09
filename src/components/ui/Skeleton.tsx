// Skeleton loading primitives — shimmer animation
export function SkeletonLine({ className = "" }: { className?: string }) {
  return (
    <div
      className={`bg-surface-hover rounded animate-pulse ${className}`}
      aria-hidden="true"
    />
  );
}

export function SkeletonBlock({ className = "" }: { className?: string }) {
  return (
    <div
      className={`bg-surface-hover rounded-lg animate-pulse ${className}`}
      aria-hidden="true"
    />
  );
}

export function SkeletonCircle({ className = "" }: { className?: string }) {
  return (
    <div
      className={`bg-surface-hover rounded-full animate-pulse ${className}`}
      aria-hidden="true"
    />
  );
}

export function SkeletonCard({ className = "" }: { className?: string }) {
  return (
    <div className={`tech-card p-5 flex flex-col gap-4 ${className}`} aria-hidden="true">
      <div className="flex items-center gap-3">
        <SkeletonCircle className="w-10 h-10 shrink-0" />
        <div className="flex flex-col gap-2 flex-1">
          <SkeletonLine className="h-3 w-2/3" />
          <SkeletonLine className="h-2.5 w-1/2" />
        </div>
      </div>
      <SkeletonBlock className="h-32 w-full" />
      <SkeletonLine className="h-3 w-full" />
      <SkeletonLine className="h-3 w-4/5" />
    </div>
  );
}

export function SkeletonText({ lines = 3, className = "" }: { lines?: number; className?: string }) {
  const widths = ["w-full", "w-4/5", "w-3/5", "w-2/3", "w-full", "w-3/4"];
  return (
    <div className={`flex flex-col gap-2 ${className}`} aria-hidden="true">
      {Array.from({ length: lines }).map((_, i) => (
        <SkeletonLine
          key={i}
          className={`h-3 ${widths[i % widths.length]}`}
        />
      ))}
    </div>
  );
}

// Full-page skeleton used while sections load
export function PageSkeleton() {
  return (
    <div className="min-h-screen bg-background pt-6 px-4 sm:px-6 lg:px-8 max-w-[1400px] mx-auto">
      <div className="flex flex-col gap-6">
        {/* Row 1 */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-8 flex flex-col gap-6">
            <SkeletonBlock className="h-64 sm:h-72" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <SkeletonBlock className="h-52" />
              <SkeletonBlock className="h-52" />
            </div>
          </div>
          <div className="lg:col-span-4">
            <SkeletonBlock className="h-80 sm:h-full min-h-[300px]" />
          </div>
        </div>
        {/* Row 2 */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <SkeletonBlock className="lg:col-span-8 h-52" />
          <SkeletonBlock className="lg:col-span-4 h-52" />
        </div>
        {/* Row 3 */}
        <SkeletonBlock className="h-48" />
      </div>
    </div>
  );
}
