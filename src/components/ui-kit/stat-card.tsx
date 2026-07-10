import { AnimatedNumber } from "@/components/ui-kit/animated-number";

export function StatCard({
  label,
  value,
  sub,
  accentColor,
  decimals = 0,
}: {
  label: string;
  /** Numeric values animate; strings render as-is. */
  value: number | string;
  sub?: string;
  accentColor?: string;
  decimals?: number;
}) {
  return (
    <div className="glass-panel relative overflow-hidden rounded-xl p-4">
      {accentColor ? (
        <span
          aria-hidden
          className="absolute inset-y-0 left-0 w-1"
          style={{ backgroundColor: accentColor }}
        />
      ) : null}
      <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
        {label}
      </p>
      <p className="timing-mono mt-1 text-3xl font-bold">
        {typeof value === "number" ? (
          <AnimatedNumber value={value} decimals={decimals} />
        ) : (
          value
        )}
      </p>
      {sub ? <p className="mt-1 text-xs text-muted-foreground">{sub}</p> : null}
    </div>
  );
}
