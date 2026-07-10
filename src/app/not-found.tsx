import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-[60vh] w-full max-w-2xl flex-col items-center justify-center px-4 py-16 text-center">
      <div aria-hidden className="mb-6 grid grid-cols-8 gap-0.5">
        {Array.from({ length: 24 }).map((_, index) => (
          <span
            key={index}
            className={
              (index + Math.floor(index / 8)) % 2 === 0
                ? "size-3 bg-foreground"
                : "size-3 bg-background border"
            }
          />
        ))}
      </div>
      <p className="timing-mono text-6xl font-black text-muted-foreground/40">404</p>
      <h1 className="heading-editorial mt-2 text-4xl">Off track</h1>
      <p className="mt-3 max-w-md text-muted-foreground">
        This page doesn&apos;t exist — you&apos;ve found the gravel trap. Rejoin
        the racing line below.
      </p>
      <div className="mt-6 flex gap-3">
        <Button asChild>
          <Link href="/">Back to the grid</Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/learn">Learn F1</Link>
        </Button>
      </div>
    </main>
  );
}
