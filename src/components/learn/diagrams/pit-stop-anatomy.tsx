const CREW = [
  { x: 70, y: 60, label: "Gun (×4)" },
  { x: 70, y: 140, label: "" },
  { x: 310, y: 60, label: "" },
  { x: 310, y: 140, label: "" },
  { x: 40, y: 100, label: "Front jack" },
  { x: 345, y: 100, label: "Rear jack" },
  { x: 190, y: 40, label: "Stabilizers" },
];

export function PitStopAnatomy() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-label="Positions of a pit stop crew around the car" className="w-full">
      {/* Car */}
      <rect x="90" y="80" width="210" height="44" rx="18" fill="var(--foreground)" opacity="0.85" />
      <circle cx="120" cy="76" r="13" fill="none" stroke="#E8002D" strokeWidth="5" />
      <circle cx="120" cy="128" r="13" fill="none" stroke="#E8002D" strokeWidth="5" />
      <circle cx="270" cy="76" r="13" fill="none" stroke="#E8002D" strokeWidth="5" />
      <circle cx="270" cy="128" r="13" fill="none" stroke="#E8002D" strokeWidth="5" />
      {/* Crew */}
      {CREW.map((member, index) => (
        <g key={index}>
          <circle cx={member.x} cy={member.y} r="8" fill="#3671C6" />
          {member.label ? (
            <text
              x={member.x}
              y={member.y - 14}
              fontSize="10"
              fill="currentColor"
              textAnchor="middle"
              fontWeight="600"
            >
              {member.label}
            </text>
          ) : null}
        </g>
      ))}
      <text x="195" y="106" fontSize="11" fontWeight="700" fill="var(--background)" textAnchor="middle">
        ~2.0 SECONDS
      </text>
      <text x="30" y="190" fontSize="12" fill="currentColor" opacity="0.7">
        ~20 crew: 3 per wheel, two jacks, stabilizers and a release controller — no refueling since 2010
      </text>
    </svg>
  );
}
