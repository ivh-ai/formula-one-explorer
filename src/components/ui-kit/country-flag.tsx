/* eslint-disable @next/next/no-img-element */
import { countryToIso, nationalityToIso } from "@/lib/utils/countries";
import { cn } from "@/lib/utils";

/**
 * Small flag image from flagcdn, resolved from a driver nationality or a
 * country name. Renders nothing when unresolvable.
 */
export function CountryFlag({
  nationality,
  country,
  className,
}: {
  nationality?: string;
  country?: string;
  className?: string;
}) {
  const iso =
    (nationality ? nationalityToIso(nationality) : null) ??
    (country ? countryToIso(country) : null);
  if (!iso) return null;

  const label = nationality ?? country ?? "";
  return (
    <img
      src={`https://flagcdn.com/${iso}.svg`}
      alt={label ? `${label} flag` : "flag"}
      width={20}
      height={15}
      loading="lazy"
      className={cn("inline-block h-[0.9em] w-auto rounded-[2px] border border-black/10", className)}
    />
  );
}
