import type { CareerSummary } from "@/lib/services/driver-career";

export type RadarDatum = {
  axis: string;
  a: number;
  b: number;
};

/**
 * Normalizes two careers onto shared 0–100 axes (relative to the pair's max)
 * for a radar chart. Win/podium/pole rates use per-start percentages so
 * short brilliant careers compare fairly with long ones.
 */
export function normalizeForRadar(a: CareerSummary, b: CareerSummary): RadarDatum[] {
  const rate = (value: number, starts: number) =>
    starts > 0 ? (value / starts) * 100 : 0;

  const axes: { axis: string; valueA: number; valueB: number }[] = [
    { axis: "Wins", valueA: a.wins, valueB: b.wins },
    { axis: "Win rate", valueA: rate(a.wins, a.starts), valueB: rate(b.wins, b.starts) },
    { axis: "Podiums", valueA: a.podiums, valueB: b.podiums },
    { axis: "Poles", valueA: a.poles, valueB: b.poles },
    { axis: "Titles", valueA: a.championships, valueB: b.championships },
    { axis: "Points", valueA: a.points, valueB: b.points },
  ];

  return axes.map(({ axis, valueA, valueB }) => {
    const max = Math.max(valueA, valueB);
    return {
      axis,
      a: max > 0 ? Math.round((valueA / max) * 100) : 0,
      b: max > 0 ? Math.round((valueB / max) * 100) : 0,
    };
  });
}
