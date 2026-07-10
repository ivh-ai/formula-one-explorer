import type { Metadata } from "next";
import { PageHeader } from "@/components/ui-kit/page-header";
import { LiveCenter } from "@/app/live/live-center";

export const metadata: Metadata = {
  title: "Live Race Center",
  description:
    "Live Formula One timing: leaderboard, gaps, tires, pit stops, race control and weather — updating in real time during sessions.",
};

export default function LivePage() {
  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6">
      <PageHeader
        title="Live Race Center"
        lead="Leaderboard, tires, flags, radio and weather. Live during every session; replaying the latest one in between."
      />
      <LiveCenter />
    </main>
  );
}
