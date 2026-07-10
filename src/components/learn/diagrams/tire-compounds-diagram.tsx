const COMPOUNDS = [
  { label: "Soft", color: "#E8002D", grip: 90, life: 30 },
  { label: "Medium", color: "#FDD900", grip: 70, life: 55 },
  { label: "Hard", color: "#E5E7EB", grip: 50, life: 85 },
  { label: "Inter", color: "#22C55E", grip: 60, life: 50 },
  { label: "Wet", color: "#3671C6", grip: 45, life: 60 },
];

export function TireCompoundsDiagram() {
  return (
    <svg viewBox="0 0 400 220" role="img" aria-label="Tire compounds compared by grip and durability" className="w-full">
      {COMPOUNDS.map((compound, index) => {
        const x = 24 + index * 76;
        return (
          <g key={compound.label} transform={`translate(${x}, 20)`}>
            <circle cx="26" cy="26" r="22" fill="none" stroke={compound.color} strokeWidth="7" />
            <circle cx="26" cy="26" r="10" fill="var(--muted)" />
            <text x="26" y="66" fontSize="11" fontWeight="600" fill="currentColor" textAnchor="middle">
              {compound.label}
            </text>
            {/* Grip bar */}
            <rect x="6" y="78" width="40" height="6" rx="3" fill="var(--muted)" />
            <rect x="6" y="78" width={(40 * compound.grip) / 100} height="6" rx="3" fill={compound.color} />
            <text x="26" y="96" fontSize="8" fill="currentColor" opacity="0.7" textAnchor="middle">grip</text>
            {/* Life bar */}
            <rect x="6" y="102" width="40" height="6" rx="3" fill="var(--muted)" />
            <rect x="6" y="102" width={(40 * compound.life) / 100} height="6" rx="3" fill={compound.color} />
            <text x="26" y="120" fontSize="8" fill="currentColor" opacity="0.7" textAnchor="middle">durability</text>
          </g>
        );
      })}
      <text x="24" y="180" fontSize="12" fill="currentColor" opacity="0.7">
        Softer rubber = faster laps but shorter life. Inters clear light rain;
      </text>
      <text x="24" y="196" fontSize="12" fill="currentColor" opacity="0.7">
        full wets move up to 85 liters of water per second at speed.
      </text>
    </svg>
  );
}
