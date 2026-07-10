export function ErsFlowDiagram() {
  return (
    <svg viewBox="0 0 400 220" role="img" aria-label="Energy flow diagram of a hybrid F1 power unit" className="w-full">
      {/* Engine */}
      <rect x="30" y="80" width="100" height="56" rx="8" fill="var(--foreground)" opacity="0.85" />
      <text x="80" y="112" fontSize="12" fontWeight="600" fill="var(--background)" textAnchor="middle">
        V6 Engine
      </text>
      {/* MGU-K */}
      <rect x="170" y="30" width="90" height="44" rx="8" fill="#3671C6" />
      <text x="215" y="56" fontSize="12" fontWeight="600" fill="#fff" textAnchor="middle">MGU-K</text>
      {/* Battery */}
      <rect x="170" y="150" width="90" height="44" rx="8" fill="#22C55E" />
      <text x="215" y="176" fontSize="12" fontWeight="600" fill="#fff" textAnchor="middle">Battery</text>
      {/* Wheels */}
      <circle cx="330" cy="108" r="30" fill="none" stroke="var(--foreground)" strokeWidth="6" />
      <text x="330" y="112" fontSize="11" fontWeight="600" fill="currentColor" textAnchor="middle">Wheels</text>
      {/* Flows */}
      <g stroke="#E8002D" strokeWidth="3" fill="none">
        <path d="M 130 104 L 296 106" />
      </g>
      <g stroke="#3671C6" strokeWidth="3" fill="none">
        <path d="M 215 74 L 215 146" />
        <path d="M 260 52 C 310 56 322 70 328 78" />
      </g>
      <text x="140" y="96" fontSize="10" fill="#E8002D">combustion power</text>
      <text x="222" y="114" fontSize="10" fill="#3671C6">charge / deploy</text>
      <text x="268" y="40" fontSize="10" fill="#3671C6">braking recovery</text>
      <text x="30" y="212" fontSize="12" fill="currentColor" opacity="0.7">
        Braking spins the MGU-K → energy stored in the battery → redeployed as ~350 kW of electric boost (2026 rules)
      </text>
    </svg>
  );
}
