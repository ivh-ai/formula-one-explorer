import { CardGridSkeleton } from "@/components/ui-kit/skeletons";

export default function Loading() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <CardGridSkeleton cards={12} />
    </div>
  );
}
