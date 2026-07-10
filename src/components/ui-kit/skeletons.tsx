import { Skeleton } from "@/components/ui/skeleton";

export function TableSkeleton({ rows = 10 }: { rows?: number }) {
  return (
    <div className="glass-panel space-y-3 rounded-xl p-4" aria-busy>
      <Skeleton className="h-5 w-2/5" />
      {Array.from({ length: rows }).map((_, index) => (
        <Skeleton key={index} className="h-9 w-full" />
      ))}
    </div>
  );
}

export function CardGridSkeleton({ cards = 6 }: { cards?: number }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3" aria-busy>
      {Array.from({ length: cards }).map((_, index) => (
        <div key={index} className="glass-panel space-y-3 rounded-xl p-5">
          <Skeleton className="h-4 w-1/3" />
          <Skeleton className="h-7 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
        </div>
      ))}
    </div>
  );
}

export function HeroSkeleton() {
  return (
    <div className="space-y-4 py-10" aria-busy>
      <Skeleton className="h-12 w-3/4 max-w-xl" />
      <Skeleton className="h-6 w-1/2 max-w-md" />
      <div className="grid gap-4 pt-6 sm:grid-cols-3">
        <Skeleton className="h-28" />
        <Skeleton className="h-28" />
        <Skeleton className="h-28" />
      </div>
    </div>
  );
}

export function PageSkeleton() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <HeroSkeleton />
      <TableSkeleton />
    </div>
  );
}
