import { Flag } from "lucide-react";
import type { RaceControlMessage } from "@/lib/models/live";
import { cn } from "@/lib/utils";

const FLAG_STYLES: Record<string, string> = {
  YELLOW: "border-l-yellow-400",
  "DOUBLE YELLOW": "border-l-yellow-500",
  RED: "border-l-red-500",
  GREEN: "border-l-green-500",
  BLUE: "border-l-blue-500",
  CHEQUERED: "border-l-foreground",
};

function isMajor(message: RaceControlMessage): boolean {
  const text = message.message.toUpperCase();
  return (
    text.includes("SAFETY CAR") ||
    text.includes("VIRTUAL SAFETY CAR") ||
    text.includes("RED FLAG") ||
    message.flag === "RED"
  );
}

export function RaceControlFeed({ messages }: { messages: RaceControlMessage[] }) {
  const recent = [...messages].reverse().slice(0, 30);

  return (
    <div className="glass-panel rounded-xl p-4">
      <h2 className="mb-3 flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-muted-foreground">
        <Flag className="size-4" aria-hidden /> Race control
      </h2>
      {recent.length === 0 ? (
        <p className="text-sm text-muted-foreground">No messages yet.</p>
      ) : (
        <ol className="max-h-96 space-y-2 overflow-y-auto pr-1">
          {recent.map((message, index) => (
            <li
              key={`${message.dateUtc}-${index}`}
              className={cn(
                "rounded-md border-l-4 bg-muted/40 px-3 py-2 text-sm",
                FLAG_STYLES[message.flag ?? ""] ?? "border-l-border",
                isMajor(message) && "font-semibold",
              )}
            >
              <p>{message.message}</p>
              <p className="mt-0.5 text-xs text-muted-foreground">
                {new Date(message.dateUtc).toLocaleTimeString()} · {message.category}
              </p>
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}
