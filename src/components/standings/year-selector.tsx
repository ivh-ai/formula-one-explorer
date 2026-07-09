"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CURRENT_SEASON, FIRST_SEASON } from "@/lib/utils/season";

/** Pushes ?year= into the URL; server components read it back. */
export function YearSelector({ year }: { year: number }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const years: number[] = [];
  for (let value = CURRENT_SEASON; value >= FIRST_SEASON; value -= 1) years.push(value);

  return (
    <Select
      value={String(year)}
      onValueChange={(value) => {
        const params = new URLSearchParams(searchParams);
        params.set("year", value);
        router.push(`${pathname}?${params.toString()}`);
      }}
    >
      <SelectTrigger className="w-28" aria-label="Season">
        <SelectValue />
      </SelectTrigger>
      <SelectContent className="max-h-72">
        {years.map((value) => (
          <SelectItem key={value} value={String(value)}>
            {value}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
