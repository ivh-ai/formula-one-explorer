export function DownforceDiagram() {
  return (
    <svg viewBox="0 0 400 200" role="img" aria-label="Diagram of airflow over an F1 car producing downforce" className="w-full">
      <rect x="0" y="170" width="400" height="4" fill="var(--muted-foreground)" opacity="0.4" />
      {/* Airflow lines */}
      {[46, 62, 78].map((y, index) => (
        <path
          key={y}
          d={`M 10 ${y} C 120 ${y - 8}, 200 ${y + 24}, 390 ${y + 10}`}
          fill="none"
          stroke="#3671C6"
          strokeWidth="2"
          strokeDasharray="6 5"
          opacity={0.8 - index * 0.2}
        />
      ))}
      {/* Simplified car body */}
      <path
        d="M 80 150 L 120 128 C 150 116 200 114 240 122 L 290 134 L 330 134 L 330 150 Z"
        fill="var(--foreground)"
        opacity="0.85"
      />
      <circle cx="130" cy="152" r="16" fill="var(--foreground)" />
      <circle cx="290" cy="152" r="16" fill="var(--foreground)" />
      {/* Front & rear wings */}
      <rect x="60" y="146" width="34" height="6" rx="2" fill="#E8002D" />
      <rect x="320" y="112" width="40" height="6" rx="2" fill="#E8002D" />
      <line x1="338" y1="118" x2="338" y2="134" stroke="#E8002D" strokeWidth="4" />
      {/* Downforce arrows */}
      <g stroke="#22C55E" strokeWidth="4" fill="#22C55E">
        <line x1="180" y1="60" x2="180" y2="100" />
        <path d="M 180 108 L 172 94 L 188 94 Z" />
        <line x1="340" y1="70" x2="340" y2="98" />
        <path d="M 340 106 L 332 92 L 348 92 Z" />
      </g>
      <text x="150" y="48" fontSize="13" fill="currentColor" fontWeight="600">Downforce</text>
      <text x="12" y="36" fontSize="12" fill="#3671C6">Airflow</text>
      <text x="120" y="190" fontSize="12" fill="currentColor" opacity="0.7">
        Wings + floor push the car into the track = more cornering grip
      </text>
    </svg>
  );
}
