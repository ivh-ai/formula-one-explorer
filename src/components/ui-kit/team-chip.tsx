import Link from "next/link";
import { getTeamColor } from "@/content/teams/team-meta";
import { cn } from "@/lib/utils";

/** Team name with its accent color bar; links to the team page. */
export function TeamChip({
  constructorId,
  name,
  link = true,
  className,
}: {
  constructorId: string;
  name: string;
  link?: boolean;
  className?: string;
}) {
  const content = (
    <span className={cn("inline-flex items-center gap-2", className)}>
      <span
        aria-hidden
        className="inline-block h-3.5 w-1 rounded-full"
        style={{ backgroundColor: getTeamColor(constructorId) }}
      />
      <span className="whitespace-nowrap">{name}</span>
    </span>
  );

  if (!link) return content;
  return (
    <Link href={`/teams/${constructorId}`} className="hover:underline">
      {content}
    </Link>
  );
}
