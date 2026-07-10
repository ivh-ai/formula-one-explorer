import type { ReactNode } from "react";

export function EmptyState({
  title,
  message,
  icon,
}: {
  title: string;
  message: string;
  icon?: ReactNode;
}) {
  return (
    <div className="glass-panel flex flex-col items-center gap-2 rounded-xl px-6 py-12 text-center">
      {icon}
      <p className="text-lg font-semibold">{title}</p>
      <p className="max-w-md text-sm text-muted-foreground">{message}</p>
    </div>
  );
}
