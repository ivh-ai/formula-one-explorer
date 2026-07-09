/**
 * Stylized (not survey-accurate) SVG track outlines for current circuits,
 * drawn in a 100×100 viewBox. Recognizable silhouettes for maps and cards.
 * DRS zones are short overlay paths along the relevant straights.
 */
export type TrackPath = {
  circuitId: string;
  viewBox: string;
  path: string;
  drsZones: { path: string }[];
  startFinish: { x: number; y: number };
};

const VB = "0 0 100 100";

export const TRACK_PATHS: Record<string, TrackPath> = {
  albert_park: {
    circuitId: "albert_park",
    viewBox: VB,
    path: "M 22 70 C 14 62 12 52 18 46 C 26 38 40 42 48 34 C 54 28 52 20 60 16 C 70 11 84 16 86 26 C 88 36 78 40 74 48 C 70 56 76 62 72 70 C 68 78 56 80 46 78 C 36 76 30 78 22 70 Z",
    drsZones: [
      { path: "M 22 70 C 14 62 12 52 18 46" },
      { path: "M 60 16 C 70 11 84 16 86 26" },
    ],
    startFinish: { x: 30, y: 76 },
  },
  shanghai: {
    circuitId: "shanghai",
    viewBox: VB,
    path: "M 20 78 L 64 78 C 74 78 80 72 78 64 C 76 56 66 56 62 48 C 58 40 66 34 62 26 C 58 18 44 16 36 22 C 28 28 34 38 30 46 C 26 54 14 54 12 62 C 10 72 12 78 20 78 Z",
    drsZones: [{ path: "M 20 78 L 64 78" }],
    startFinish: { x: 40, y: 78 },
  },
  suzuka: {
    circuitId: "suzuka",
    viewBox: VB,
    path: "M 14 62 C 10 52 16 44 26 42 C 36 40 42 48 52 46 C 62 44 62 32 72 28 C 82 24 90 30 88 40 C 86 50 74 50 68 58 C 62 66 68 76 58 80 C 48 84 42 74 32 74 C 22 74 18 72 14 62 Z",
    drsZones: [{ path: "M 58 80 C 48 84 42 74 32 74" }],
    startFinish: { x: 45, y: 77 },
  },
  miami: {
    circuitId: "miami",
    viewBox: VB,
    path: "M 16 72 L 70 72 C 80 72 86 66 84 58 C 82 50 70 52 64 46 C 58 40 64 32 58 26 C 52 20 38 20 32 26 C 26 32 30 42 24 48 C 18 54 10 56 10 64 C 10 70 10 72 16 72 Z",
    drsZones: [
      { path: "M 16 72 L 70 72" },
      { path: "M 58 26 C 52 20 38 20 32 26" },
    ],
    startFinish: { x: 36, y: 72 },
  },
  villeneuve: {
    circuitId: "villeneuve",
    viewBox: VB,
    path: "M 12 78 L 78 74 C 88 73 92 66 88 60 L 60 36 C 54 31 56 24 50 20 C 44 16 34 18 32 26 C 30 34 38 38 40 46 C 42 54 32 58 26 64 C 20 70 4 72 6 76 C 7 79 8 78 12 78 Z",
    drsZones: [
      { path: "M 12 78 L 78 74" },
      { path: "M 88 60 L 60 36" },
    ],
    startFinish: { x: 40, y: 77 },
  },
  monaco: {
    circuitId: "monaco",
    viewBox: VB,
    path: "M 16 64 C 12 56 18 50 28 48 C 38 46 44 40 50 34 C 56 28 66 26 74 30 C 82 34 84 42 78 46 C 72 50 62 46 58 52 C 54 58 62 64 58 70 C 54 76 44 76 36 72 C 28 68 20 72 16 64 Z",
    drsZones: [{ path: "M 28 48 C 38 46 44 40 50 34" }],
    startFinish: { x: 34, y: 49 },
  },
  catalunya: {
    circuitId: "catalunya",
    viewBox: VB,
    path: "M 18 74 L 66 74 C 76 74 82 68 80 60 C 78 52 68 52 64 44 C 60 36 68 30 62 24 C 56 18 42 18 38 26 C 34 34 42 40 38 48 C 34 56 22 54 18 62 C 14 70 12 74 18 74 Z",
    drsZones: [{ path: "M 18 74 L 66 74" }],
    startFinish: { x: 40, y: 74 },
  },
  red_bull_ring: {
    circuitId: "red_bull_ring",
    viewBox: VB,
    path: "M 20 72 C 12 68 12 60 18 54 L 50 26 C 56 21 66 20 72 26 C 78 32 76 40 82 46 C 88 52 86 62 78 66 C 68 71 60 64 50 66 C 40 68 28 76 20 72 Z",
    drsZones: [
      { path: "M 18 54 L 50 26" },
      { path: "M 78 66 C 68 71 60 64 50 66" },
    ],
    startFinish: { x: 55, y: 65 },
  },
  silverstone: {
    circuitId: "silverstone",
    viewBox: VB,
    path: "M 24 76 C 14 72 12 62 20 56 C 28 50 36 54 44 50 C 52 46 50 36 56 30 C 62 24 74 22 80 28 C 86 34 82 44 76 48 C 70 52 62 50 58 58 C 54 66 60 74 52 78 C 44 82 34 80 24 76 Z",
    drsZones: [
      { path: "M 20 56 C 28 50 36 54 44 50" },
      { path: "M 52 78 C 44 82 34 80 24 76" },
    ],
    startFinish: { x: 38, y: 79 },
  },
  spa: {
    circuitId: "spa",
    viewBox: VB,
    path: "M 18 30 C 24 22 34 22 38 30 L 50 54 C 54 62 64 62 70 58 C 78 52 74 42 80 36 C 86 30 92 36 90 44 C 86 60 74 64 66 72 C 58 80 44 82 36 76 C 28 70 32 60 26 52 C 20 44 12 38 18 30 Z",
    drsZones: [
      { path: "M 38 30 L 50 54" },
      { path: "M 66 72 C 58 80 44 82 36 76" },
    ],
    startFinish: { x: 28, y: 27 },
  },
  hungaroring: {
    circuitId: "hungaroring",
    viewBox: VB,
    path: "M 20 68 L 60 68 C 70 68 76 62 74 54 C 72 46 62 48 56 42 C 50 36 56 28 50 24 C 44 20 34 22 32 30 C 30 38 36 44 32 52 C 28 60 14 58 14 64 C 14 68 16 68 20 68 Z",
    drsZones: [{ path: "M 20 68 L 60 68" }],
    startFinish: { x: 36, y: 68 },
  },
  zandvoort: {
    circuitId: "zandvoort",
    viewBox: VB,
    path: "M 22 70 C 14 64 14 54 22 50 C 30 46 38 50 46 46 C 54 42 52 32 60 28 C 68 24 80 28 82 36 C 84 44 76 50 70 54 C 64 58 56 56 50 62 C 44 68 38 76 30 74 C 26 73 25 72 22 70 Z",
    drsZones: [{ path: "M 22 70 C 14 64 14 54 22 50" }],
    startFinish: { x: 28, y: 71 },
  },
  monza: {
    circuitId: "monza",
    viewBox: VB,
    path: "M 30 84 L 24 36 C 23 28 28 22 36 22 L 56 22 C 64 22 68 28 66 34 L 60 50 L 74 44 C 82 41 88 46 86 54 C 84 62 74 62 68 66 L 40 84 C 36 87 31 88 30 84 Z",
    drsZones: [
      { path: "M 30 84 L 24 36" },
      { path: "M 68 66 L 40 84" },
    ],
    startFinish: { x: 28, y: 60 },
  },
  madring: {
    circuitId: "madring",
    viewBox: VB,
    path: "M 18 72 L 58 72 C 68 72 74 66 72 58 C 70 50 60 50 58 42 C 56 34 66 32 64 24 C 62 16 48 14 40 20 C 32 26 36 36 30 42 C 24 48 12 48 12 58 C 12 68 12 72 18 72 Z",
    drsZones: [
      { path: "M 18 72 L 58 72" },
      { path: "M 40 20 C 32 26 36 36 30 42" },
    ],
    startFinish: { x: 34, y: 72 },
  },
  baku: {
    circuitId: "baku",
    viewBox: VB,
    path: "M 12 74 L 74 74 C 84 74 88 68 84 62 L 66 42 L 54 46 L 48 32 C 46 26 38 24 32 28 L 18 40 C 12 46 14 54 20 58 C 26 62 24 68 18 70 C 14 72 8 74 12 74 Z",
    drsZones: [{ path: "M 12 74 L 74 74" }],
    startFinish: { x: 42, y: 74 },
  },
  marina_bay: {
    circuitId: "marina_bay",
    viewBox: VB,
    path: "M 16 70 L 62 70 C 72 70 78 64 76 56 L 70 36 C 68 28 58 26 52 30 L 40 38 L 32 30 C 26 24 16 28 16 36 L 16 52 C 16 58 12 62 12 66 C 12 70 12 70 16 70 Z",
    drsZones: [
      { path: "M 16 70 L 62 70" },
      { path: "M 16 36 L 16 52" },
    ],
    startFinish: { x: 38, y: 70 },
  },
  americas: {
    circuitId: "americas",
    viewBox: VB,
    path: "M 26 80 L 20 46 C 18 38 24 32 30 34 L 44 40 C 52 43 56 36 52 30 C 48 24 56 16 64 20 C 74 25 70 36 76 42 C 82 48 88 54 84 62 C 80 70 68 68 60 72 C 52 76 40 74 34 80 C 31 83 27 84 26 80 Z",
    drsZones: [
      { path: "M 26 80 L 20 46" },
      { path: "M 84 62 C 80 70 68 68 60 72" },
    ],
    startFinish: { x: 24, y: 66 },
  },
  rodriguez: {
    circuitId: "rodriguez",
    viewBox: VB,
    path: "M 14 70 L 66 70 C 76 70 82 64 80 56 C 78 48 68 50 62 44 L 50 32 C 44 26 34 26 30 34 C 26 42 34 46 32 54 C 30 62 18 58 14 64 C 12 68 12 70 14 70 Z",
    drsZones: [{ path: "M 14 70 L 66 70" }],
    startFinish: { x: 38, y: 70 },
  },
  interlagos: {
    circuitId: "interlagos",
    viewBox: VB,
    path: "M 22 60 C 14 56 14 46 22 42 L 60 26 C 70 22 80 26 80 34 C 80 42 70 44 64 50 C 58 56 62 66 54 70 C 46 74 40 66 34 64 C 30 63 26 62 22 60 Z",
    drsZones: [
      { path: "M 22 42 L 60 26" },
      { path: "M 54 70 C 46 74 40 66 34 64" },
    ],
    startFinish: { x: 34, y: 37 },
  },
  vegas: {
    circuitId: "vegas",
    viewBox: VB,
    path: "M 68 84 C 60 86 54 82 54 74 L 54 40 L 34 40 C 26 40 22 34 26 28 C 30 22 40 24 48 24 L 66 24 C 74 24 78 30 76 36 L 72 56 L 72 74 C 72 80 74 82 68 84 Z",
    drsZones: [{ path: "M 54 74 L 54 40" }],
    startFinish: { x: 63, y: 84 },
  },
  losail: {
    circuitId: "losail",
    viewBox: VB,
    path: "M 20 74 L 56 74 C 66 74 70 66 66 60 C 62 54 52 56 48 50 C 44 44 52 38 50 30 C 48 22 36 20 30 26 C 24 32 30 40 26 48 C 22 56 12 58 12 66 C 12 72 14 74 20 74 Z",
    drsZones: [{ path: "M 20 74 L 56 74" }],
    startFinish: { x: 34, y: 74 },
  },
  yas_marina: {
    circuitId: "yas_marina",
    viewBox: VB,
    path: "M 18 68 L 58 68 C 68 68 74 62 72 54 L 68 40 C 66 32 56 30 50 34 L 42 40 C 36 44 28 42 26 36 C 24 30 16 30 14 38 C 12 46 20 50 20 58 C 20 64 14 68 18 68 Z",
    drsZones: [
      { path: "M 18 68 L 58 68" },
      { path: "M 72 54 L 68 40" },
    ],
    startFinish: { x: 34, y: 68 },
  },
};

export function getTrackPath(circuitId: string): TrackPath | undefined {
  return TRACK_PATHS[circuitId];
}
