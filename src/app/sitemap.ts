import type { MetadataRoute } from "next";
import { LESSONS } from "@/content/lessons/registry";
import { CURRENT_CIRCUIT_IDS } from "@/content/circuits/circuit-guides";
import { CURRENT_SEASON, FIRST_SEASON } from "@/lib/utils/season";

const BASE = "https://f1explorer.example.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/learn",
    "/seasons",
    "/standings/drivers",
    "/standings/constructors",
    "/drivers",
    "/teams",
    "/circuits",
    "/calendar",
    "/live",
    "/history",
    "/rules",
    "/glossary",
    "/compare",
    "/simulators",
    "/stats",
    "/settings",
  ].map((path) => ({ url: `${BASE}${path}` }));

  const lessons = LESSONS.map((lesson) => ({ url: `${BASE}/learn/${lesson.slug}` }));
  const circuits = CURRENT_CIRCUIT_IDS.map((id) => ({ url: `${BASE}/circuits/${id}` }));
  const seasons: MetadataRoute.Sitemap = [];
  for (let year = CURRENT_SEASON; year >= FIRST_SEASON; year -= 1) {
    seasons.push({ url: `${BASE}/seasons/${year}` });
  }

  return [...staticRoutes, ...lessons, ...circuits, ...seasons];
}
