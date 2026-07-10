const POINTS = [25, 18, 15, 12, 10, 8, 6, 4, 2, 1];

export function PointsTableDiagram() {
  const max = POINTS[0];
  return (
    <svg viewBox="0 0 400 200" role="img" aria-label="Championship points awarded by finishing position" className="w-full">
      {POINTS.map((points, index) => {
        const barHeight = (points / max) * 120;
        const x = 24 + index * 36;
        return (
          <g key={index}>
            <rect
              x={x}
              y={150 - barHeight}
              width="26"
              height={barHeight}
              rx="4"
              fill={index === 0 ? "#FDD900" : index < 3 ? "#E8002D" : "#3671C6"}
              opacity={index < 3 ? 1 : 0.75}
            />
            <text x={x + 13} y={144 - barHeight} fontSize="11" fontWeight="700" fill="currentColor" textAnchor="middle">
              {points}
            </text>
            <text x={x + 13} y="168" fontSize="10" fill="currentColor" opacity="0.7" textAnchor="middle">
              P{index + 1}
            </text>
          </g>
        );
      })}
      <text x="24" y="192" fontSize="12" fill="currentColor" opacity="0.7">
        Sprint races pay 8-7-6-5-4-3-2-1 to the top eight
      </text>
    </svg>
  );
}
