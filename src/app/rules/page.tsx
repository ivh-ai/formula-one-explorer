import type { Metadata } from "next";
import Link from "next/link";
import { RULE_SECTIONS } from "@/content/rules/rules";
import { PageHeader } from "@/components/ui-kit/page-header";
import { FadeIn } from "@/components/ui-kit/fade-in";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const metadata: Metadata = {
  title: "Rules",
  description:
    "Formula One's sporting, technical and financial regulations explained in plain language.",
};

export default function RulesPage() {
  return (
    <main className="mx-auto w-full max-w-4xl px-4 py-10 sm:px-6">
      <PageHeader
        title="The Rules"
        lead="The sporting, technical and financial regulations in plain language. For the interactive course versions, see the Rules & Governance lessons."
      />

      <div className="space-y-8">
        {RULE_SECTIONS.map((section, index) => (
          <FadeIn key={section.id} delay={Math.min(index * 0.05, 0.3)}>
            <section aria-labelledby={`rules-${section.id}`}>
              <h2 id={`rules-${section.id}`} className="heading-editorial text-2xl">
                {section.title}
              </h2>
              <p className="mt-1 text-muted-foreground">{section.summary}</p>
              <Accordion type="multiple" className="glass-panel mt-3 rounded-xl px-5">
                {section.items.map((item) => (
                  <AccordionItem key={item.rule} value={item.rule}>
                    <AccordionTrigger className="text-left text-sm font-medium">
                      {item.rule}
                    </AccordionTrigger>
                    <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
                      {item.explanation}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </section>
          </FadeIn>
        ))}
      </div>

      <p className="mt-10 text-sm text-muted-foreground">
        Want the full stories behind the rules? Take the{" "}
        <Link href="/learn/sporting-regulations" className="underline hover:text-foreground">
          Sporting Regulations
        </Link>
        ,{" "}
        <Link href="/learn/technical-regulations" className="underline hover:text-foreground">
          Technical Regulations
        </Link>{" "}
        and{" "}
        <Link href="/learn/stewards" className="underline hover:text-foreground">
          Stewards
        </Link>{" "}
        lessons.
      </p>
    </main>
  );
}
