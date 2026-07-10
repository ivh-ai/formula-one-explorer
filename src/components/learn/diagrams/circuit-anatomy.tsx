export function CircuitAnatomy() {
  return (
    <svg viewBox="0 0 400 230" role="img" aria-label="Anatomy of a racing circuit" className="w-full">
      {/* Track loop */}
      <path
        d="M 60 170 L 250 170 C 290 170 310 150 300 125 C 292 105 260 105 250 85 C 240 65 260 45 240 32 C 220 20 180 24 170 44 C 160 64 180 78 165 95 C 150 112 90 100 70 120 C 50 140 40 170 60 170 Z"
        fill="none"
        stroke="var(--foreground)"
        strokeWidth="10"
        strokeOpacity="0.8"
        strokeLinejoin="round"
      />
      {/* DRS zone */}
      <path d="M 60 170 L 250 170" stroke="#22C55E" strokeWidth="10" strokeLinecap="round" />
      {/* Start/finish */}
      <rect x="130" y="162" width="8" height="16" fill="var(--background)" stroke="currentColor" />
      {/* Labels */}
      <text x="120" y="198" fontSize="11" fontWeight="600" fill="#22C55E">Main straight + DRS zone</text>
      <text x="306" y="122" fontSize="11" fill="currentColor" opacity="0.8">Heavy braking</text>
      <text x="306" y="135" fontSize="11" fill="currentColor" opacity="0.8">= overtaking spot</text>
      <text x="150" y="14" fontSize="11" fill="currentColor" opacity="0.8">Chicane (slow S-curve)</text>
      <text x="20" y="105" fontSize="11" fill="currentColor" opacity="0.8">Flowing esses</text>
      <circle cx="298" cy="128" r="6" fill="#E8002D" />
      <circle cx="238" cy="34" r="6" fill="#E8002D" />
      <circle cx="120" cy="100" r="6" fill="#E8002D" />
      <text x="20" y="222" fontSize="12" fill="currentColor" opacity="0.7">
        Straights end in braking zones; corner sequences reward rhythm and set up passes
      </text>
    </svg>
  );
}
