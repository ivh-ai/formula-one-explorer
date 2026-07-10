"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export type PickerOption = { id: string; label: string; group: string };

export function ComparePicker({
  param,
  value,
  options,
  ariaLabel,
}: {
  param: "a" | "b";
  value: string;
  options: PickerOption[];
  ariaLabel: string;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const groups = [...new Set(options.map((option) => option.group))];

  return (
    <Select
      value={value}
      onValueChange={(next) => {
        const params = new URLSearchParams(searchParams);
        params.set(param, next);
        router.push(`${pathname}?${params.toString()}`);
      }}
    >
      <SelectTrigger className="w-full sm:w-60" aria-label={ariaLabel}>
        <SelectValue />
      </SelectTrigger>
      <SelectContent className="max-h-80">
        {groups.map((group) => (
          <SelectGroup key={group}>
            <SelectLabel>{group}</SelectLabel>
            {options
              .filter((option) => option.group === group)
              .map((option) => (
                <SelectItem key={option.id} value={option.id}>
                  {option.label}
                </SelectItem>
              ))}
          </SelectGroup>
        ))}
      </SelectContent>
    </Select>
  );
}
