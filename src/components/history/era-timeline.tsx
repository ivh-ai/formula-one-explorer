import { FadeIn } from "@/components/ui-kit/fade-in";
import type { Era } from "@/content/history/eras";

export function EraTimeline({ eras }: { eras: Era[] }) {
  return (
    <ol className="relative space-y-10 border-l-2 border-border pl-6 sm:pl-10">
      {eras.map((era, index) => (
        <li key={era.id}>
          <FadeIn delay={Math.min(index * 0.05, 0.3)}>
            <span
              aria-hidden
              className="absolute -left-[9px] mt-2 block size-4 rounded-full border-4 border-background bg-primary"
            />
            <p className="timing-mono text-sm font-semibold text-muted-foreground">
              {era.years}
            </p>
            <h3 className="heading-editorial mt-1 text-2xl">{era.name}</h3>
            <p className="mt-2 max-w-3xl leading-relaxed text-muted-foreground">
              {era.summary}
            </p>
            <div className="mt-3 flex flex-wrap gap-x-6 gap-y-1 text-sm">
              <p>
                <span className="font-semibold">Defining cars:</span>{" "}
                <span className="text-muted-foreground">{era.keyCars.join(", ")}</span>
              </p>
              <p>
                <span className="font-semibold">Defining drivers:</span>{" "}
                <span className="text-muted-foreground">{era.keyDrivers.join(", ")}</span>
              </p>
            </div>
            <div className="mt-4 grid gap-3 md:grid-cols-3">
              {era.moments.map((moment) => (
                <div key={moment.title} className="glass-panel rounded-xl p-4">
                  <p className="timing-mono text-xs font-bold text-primary">{moment.year}</p>
                  <p className="mt-0.5 font-semibold leading-snug">{moment.title}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{moment.description}</p>
                </div>
              ))}
            </div>
          </FadeIn>
        </li>
      ))}
    </ol>
  );
}
