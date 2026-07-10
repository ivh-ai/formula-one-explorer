export type HeadToHeadRow = {
  label: string;
  a: number;
  b: number;
  /** Format values for display; defaults to plain numbers. */
  format?: (value: number) => string;
};

function Bar({
  value,
  max,
  color,
  align,
}: {
  value: number;
  max: number;
  color: string;
  align: "left" | "right";
}) {
  const width = max > 0 ? Math.max((value / max) * 100, 2) : 2;
  return (
    <div className={align === "right" ? "flex justify-end" : ""}>
      <div
        aria-hidden
        className="h-2.5 rounded-full"
        style={{ width: `${width}%`, backgroundColor: color }}
      />
    </div>
  );
}

export function HeadToHeadBars({
  rows,
  colorA,
  colorB,
}: {
  rows: HeadToHeadRow[];
  colorA: string;
  colorB: string;
}) {
  return (
    <div className="glass-panel space-y-4 rounded-xl p-5">
      {rows.map((row) => {
        const max = Math.max(row.a, row.b);
        const format = row.format ?? ((value: number) => String(value));
        return (
          <div key={row.label}>
            <div className="mb-1 flex items-baseline justify-between text-sm">
              <span className="timing-mono font-bold">{format(row.a)}</span>
              <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                {row.label}
              </span>
              <span className="timing-mono font-bold">{format(row.b)}</span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <Bar value={row.a} max={max} color={colorA} align="right" />
              <Bar value={row.b} max={max} color={colorB} align="left" />
            </div>
          </div>
        );
      })}
    </div>
  );
}
