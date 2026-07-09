import { AlertTriangle } from "lucide-react";
import type { ApiError } from "@/lib/api/fetch-json";

/** Inline degraded-state notice for a panel whose data failed to load. */
export function ErrorNote({
  context,
  error,
}: {
  context: string;
  error?: ApiError;
}) {
  return (
    <div
      role="status"
      className="flex items-start gap-3 rounded-xl border border-amber-500/30 bg-amber-500/10 p-4 text-sm"
    >
      <AlertTriangle className="mt-0.5 size-4 shrink-0 text-amber-600" aria-hidden />
      <div>
        <p className="font-medium">Couldn&apos;t load {context}.</p>
        <p className="text-muted-foreground">
          {error?.kind === "timeout"
            ? "The data source timed out — try again shortly."
            : "The data source may be briefly unavailable. The rest of the page still works."}
        </p>
      </div>
    </div>
  );
}
