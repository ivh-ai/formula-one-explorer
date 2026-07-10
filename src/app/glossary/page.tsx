import type { Metadata } from "next";
import { PageHeader } from "@/components/ui-kit/page-header";
import { GlossaryBrowser } from "@/components/glossary/glossary-browser";

export const metadata: Metadata = {
  title: "Glossary",
  description: "Every Formula One term decoded — 100+ definitions from apex to undercut.",
};

export default function GlossaryPage() {
  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6">
      <PageHeader
        title="Glossary"
        lead="The language of Formula One, decoded — searchable and filterable by category."
      />
      <GlossaryBrowser />
    </main>
  );
}
