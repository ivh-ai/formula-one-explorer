const STAGES = [
  { name: "Q1", minutes: 18, inCount: "All 22 cars", out: "Slowest 5 eliminated (P18–P22)", width: 340 },
  { name: "Q2", minutes: 15, inCount: "17 cars", out: "Slowest 5 eliminated (P13–P17)", width: 260 },
  { name: "Q3", minutes: 12, inCount: "Top 10 shootout", out: "Fastest lap takes pole", width: 180 },
];

export function QualifyingFormatDiagram() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-label="The three knockout stages of qualifying" className="w-full">
      {STAGES.map((stage, index) => {
        const y = 16 + index * 62;
        return (
          <g key={stage.name}>
            <rect x="20" y={y} width={stage.width} height="44" rx="8" fill="#3671C6" opacity={1 - index * 0.25} />
            <text x="34" y={y + 20} fontSize="14" fontWeight="800" fill="#fff">
              {stage.name}
            </text>
            <text x="34" y={y + 36} fontSize="10" fill="#fff" opacity="0.9">
              {stage.minutes} min · {stage.inCount}
            </text>
            <text x={stage.width + 30} y={y + 26} fontSize="10" fill="currentColor" opacity="0.75">
              {stage.out}
            </text>
          </g>
        );
      })}
      <text x="20" y="202" fontSize="12" fill="currentColor" opacity="0.7">
        Three knockout rounds, shrinking field, pole to the fastest Q3 lap
      </text>
    </svg>
  );
}
