export type NavGroup = "explore" | "learn" | "data";

export type NavLink = {
  label: string;
  href: string;
  group: NavGroup;
  description?: string;
};

export const NAV_GROUP_LABELS: Record<NavGroup, string> = {
  explore: "Explore",
  learn: "Learn",
  data: "Data",
};

export const NAV_LINKS: NavLink[] = [
  { label: "Seasons", href: "/seasons", group: "explore", description: "Every season since 1950" },
  { label: "Teams", href: "/teams", group: "explore", description: "Constructors past and present" },
  { label: "Drivers", href: "/drivers", group: "explore", description: "The current grid and the legends" },
  { label: "Circuits", href: "/circuits", group: "explore", description: "Track maps and corner guides" },
  { label: "Calendar", href: "/calendar", group: "explore", description: "Race weekends and countdowns" },
  { label: "History", href: "/history", group: "explore", description: "Eras, champions and moments" },

  { label: "Learn F1", href: "/learn", group: "learn", description: "An interactive course from zero to expert" },
  { label: "Rules", href: "/rules", group: "learn", description: "Sporting and technical regulations explained" },
  { label: "Glossary", href: "/glossary", group: "learn", description: "Every term, decoded" },

  { label: "Live Race Center", href: "/live", group: "data", description: "Live timing, flags and strategy" },
  { label: "Standings", href: "/standings/drivers", group: "data", description: "Championship tables and progression" },
  { label: "Statistics", href: "/stats", group: "data", description: "All-time records and season numbers" },
  { label: "Compare", href: "/compare", group: "data", description: "Head-to-head driver and team analysis" },
  { label: "Simulators", href: "/simulators", group: "data", description: "Championship, strategy and pit stop tools" },
];

export function navLinksByGroup(group: NavGroup): NavLink[] {
  return NAV_LINKS.filter((link) => link.group === group);
}
