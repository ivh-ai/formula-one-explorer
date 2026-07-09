import type { ReactNode } from "react";

export function PageHeader({
  title,
  lead,
  children,
}: {
  title: string;
  lead?: string;
  children?: ReactNode;
}) {
  return (
    <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div className="max-w-2xl">
        <h1 className="heading-editorial text-4xl sm:text-5xl">{title}</h1>
        {lead ? <p className="mt-3 text-lg text-muted-foreground">{lead}</p> : null}
      </div>
      {children ? <div className="shrink-0">{children}</div> : null}
    </div>
  );
}
