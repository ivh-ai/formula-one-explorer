import Link from "next/link";
import { CountryFlag } from "@/components/ui-kit/country-flag";
import type { DriverRef } from "@/lib/models/f1";

export function DriverLink({
  driver,
  flag = true,
}: {
  driver: DriverRef;
  flag?: boolean;
}) {
  return (
    <Link
      href={`/drivers/${driver.driverId}`}
      className="inline-flex items-center gap-2 font-medium hover:underline"
    >
      {flag ? <CountryFlag nationality={driver.nationality} /> : null}
      <span className="whitespace-nowrap">{driver.fullName}</span>
    </Link>
  );
}
