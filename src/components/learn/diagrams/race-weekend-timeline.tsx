const SESSIONS = [
  { day: "Friday", items: ["Practice 1 (60 min)", "Practice 2 (60 min)"] },
  { day: "Saturday", items: ["Practice 3 (60 min)", "Qualifying (Q1→Q2→Q3)"] },
  { day: "Sunday", items: ["The Grand Prix (~305 km)"] },
];

export function RaceWeekendTimeline() {
  return (
    <svg viewBox="0 0 400 190" role="img" aria-label="Timeline of a standard race weekend" className="w-full">
      <line x1="30" y1="30" x2="30" y2="160" stroke="var(--border)" strokeWidth="3" />
      {SESSIONS.map((session, index) => {
        const y = 40 + index * 50;
        return (
          <g key={session.day}>
            <circle cx="30" cy={y} r="7" fill="#E8002D" />
            <text x="50" y={y - 2} fontSize="13" fontWeight="700" fill="currentColor">
              {session.day}
            </text>
            {session.items.map((item, itemIndex) => (
              <text
                key={item}
                x="50"
                y={y + 14 + itemIndex * 15}
                fontSize="11"
                fill="currentColor"
                opacity="0.7"
              >
                {item}
              </text>
            ))}
          </g>
        );
      })}
      <text x="240" y="45" fontSize="11" fill="currentColor" opacity="0.7">Sprint weekends swap</text>
      <text x="240" y="60" fontSize="11" fill="currentColor" opacity="0.7">P2/P3 for Sprint</text>
      <text x="240" y="75" fontSize="11" fill="currentColor" opacity="0.7">Qualifying + Sprint race</text>
    </svg>
  );
}
