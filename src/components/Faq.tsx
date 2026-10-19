import type { Faq as FaqItem } from "@/content/services";

export function Faq({ items }: { items: FaqItem[] }) {
  return (
    <div className="divide-y divide-nuit/15 border-y border-nuit/15">
      {items.map((f) => (
        <details key={f.q} className="group py-6 [&_summary::-webkit-details-marker]:hidden">
          <summary className="flex cursor-pointer list-none items-start justify-between gap-6 font-display text-[1.35rem] leading-snug">
            {f.q}
            <span className="relative mt-2 size-4 shrink-0" aria-hidden>
              <span className="absolute top-1/2 left-0 h-px w-4 bg-nuit" />
              <span className="absolute top-1/2 left-0 h-px w-4 rotate-90 bg-nuit transition-transform duration-500 group-open:rotate-0" />
            </span>
          </summary>
          <p className="mt-4 max-w-3xl leading-relaxed text-nuit/70">{f.a}</p>
        </details>
      ))}
    </div>
  );
}
