const FLAGS = [
  { color: "#FDD900", label: "Yellow", meaning: "Danger — no overtaking" },
  { color: "#E8002D", label: "Red", meaning: "Session stopped" },
  { color: "#3671C6", label: "Blue", meaning: "Faster car behind — let it lap you" },
  { color: "#22C55E", label: "Green", meaning: "Hazard cleared — racing resumes" },
  { color: "checkered", label: "Checkered", meaning: "Session over" },
  { color: "half", label: "Black & white", meaning: "Warning for unsporting driving" },
];

export function FlagGallery() {
  return (
    <svg viewBox="0 0 400 230" role="img" aria-label="The main racing flags and their meanings" className="w-full">
      {FLAGS.map((flag, index) => {
        const x = 20 + (index % 2) * 190;
        const y = 16 + Math.floor(index / 2) * 70;
        return (
          <g key={flag.label} transform={`translate(${x}, ${y})`}>
            <line x1="0" y1="0" x2="0" y2="52" stroke="var(--muted-foreground)" strokeWidth="3" />
            {flag.color === "checkered" ? (
              <g>
                {[0, 1, 2, 3].map((col) =>
                  [0, 1, 2].map((row) => (
                    <rect
                      key={`${col}-${row}`}
                      x={2 + col * 11}
                      y={2 + row * 11}
                      width="11"
                      height="11"
                      fill={(col + row) % 2 === 0 ? "var(--foreground)" : "var(--background)"}
                      stroke="var(--border)"
                      strokeWidth="0.5"
                    />
                  )),
                )}
              </g>
            ) : flag.color === "half" ? (
              <g>
                <path d="M 2 2 L 46 2 L 2 35 Z" fill="var(--foreground)" />
                <path d="M 46 2 L 46 35 L 2 35 Z" fill="var(--background)" stroke="var(--border)" />
              </g>
            ) : (
              <rect x="2" y="2" width="44" height="33" rx="2" fill={flag.color} />
            )}
            <text x="56" y="16" fontSize="12" fontWeight="700" fill="currentColor">
              {flag.label}
            </text>
            <text x="56" y="32" fontSize="10" fill="currentColor" opacity="0.7">
              {flag.meaning}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
