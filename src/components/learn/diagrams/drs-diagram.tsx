export function DrsDiagram() {
  return (
    <svg viewBox="0 0 400 200" role="img" aria-label="Diagram comparing a closed and open DRS rear wing" className="w-full">
      {/* Closed wing */}
      <g transform="translate(60,30)">
        <text x="30" y="0" fontSize="13" fontWeight="600" fill="currentColor">DRS closed</text>
        <line x1="20" y1="110" x2="20" y2="30" stroke="var(--muted-foreground)" strokeWidth="5" />
        <line x1="100" y1="110" x2="100" y2="30" stroke="var(--muted-foreground)" strokeWidth="5" />
        <rect x="8" y="26" width="104" height="10" rx="3" fill="#E8002D" />
        <rect x="8" y="44" width="104" height="10" rx="3" fill="var(--foreground)" />
        <path d="M -20 60 C 10 58 30 70 50 78" fill="none" stroke="#3671C6" strokeWidth="2" strokeDasharray="5 4" />
        <text x="0" y="140" fontSize="11" fill="currentColor" opacity="0.7">High drag, more grip</text>
      </g>
      {/* Open wing */}
      <g transform="translate(240,30)">
        <text x="30" y="0" fontSize="13" fontWeight="600" fill="currentColor">DRS open</text>
        <line x1="20" y1="110" x2="20" y2="30" stroke="var(--muted-foreground)" strokeWidth="5" />
        <line x1="100" y1="110" x2="100" y2="30" stroke="var(--muted-foreground)" strokeWidth="5" />
        <rect x="8" y="18" width="104" height="10" rx="3" fill="#22C55E" transform="rotate(-18 60 23)" />
        <rect x="8" y="44" width="104" height="10" rx="3" fill="var(--foreground)" />
        <path d="M -20 55 C 20 52 60 50 130 46" fill="none" stroke="#3671C6" strokeWidth="2" strokeDasharray="5 4" />
        <text x="0" y="140" fontSize="11" fill="currentColor" opacity="0.7">Flap lifts → less drag → ~10-12 km/h faster</text>
      </g>
      <text x="70" y="192" fontSize="12" fill="currentColor" opacity="0.7">
        Allowed only in DRS zones, within 1 second of the car ahead
      </text>
    </svg>
  );
}
