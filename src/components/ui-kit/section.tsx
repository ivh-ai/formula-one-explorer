import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function Section({
  title,
  lead,
  href,
  hrefLabel,
  children,
}: {
  title: string;
  lead?: string;
  href?: string;
  hrefLabel?: string;
  children: ReactNode;
}) {
  return (
    <section className="py-8">
      <div className="mb-5 flex items-end justify-between gap-4">
        <div>
          <h2 className="heading-editorial text-2xl sm:text-3xl">{title}</h2>
          {lead ? <p className="mt-1 text-muted-foreground">{lead}</p> : null}
        </div>
        {href ? (
          <Link
            href={href}
            className="inline-flex shrink-0 items-center gap-1 text-sm font-medium text-primary hover:underline"
          >
            {hrefLabel ?? "View all"} <ArrowRight className="size-3.5" aria-hidden />
          </Link>
        ) : null}
      </div>
      {children}
    </section>
  );
}
