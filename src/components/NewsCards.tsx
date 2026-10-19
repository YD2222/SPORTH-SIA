import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { NewsItem } from "@/content/news";
import { Reveal } from "./motion";

const fmt = (d: string) => new Date(d + "T12:00:00").toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" });

export function NewsCards({ items }: { items: NewsItem[] }) {
  if (!items.length) {
    return <p className="text-nuit/60">Aucune offre en cours pour le moment. Revenez bientôt, ou demandez à Charly.</p>;
  }
  return (
    <div className="grid gap-5 md:grid-cols-3">
      {items.map((n, i) => (
        <Reveal key={n.id} delay={i * 0.08} className="h-full">
          <article className="flex h-full flex-col rounded-[24px] border border-nuit/10 bg-white/50 p-7 transition-colors duration-500 hover:border-or/60 hover:bg-white">
            <p className="eyebrow text-or">{n.kind}</p>
            <h3 className="font-display mt-4 text-[1.65rem] leading-tight">{n.title}</h3>
            <p className="mt-3 leading-relaxed text-nuit/75">{n.text}</p>
            {(n.conditions || n.validUntil) && (
              <p className="mt-5 border-t border-nuit/10 pt-4 text-sm leading-relaxed text-ardoise">
                {n.conditions}
                {n.validUntil && <> Valable jusqu&apos;au {fmt(n.validUntil)}.</>}
              </p>
            )}
            {n.link && (
              <Link href={n.link.href} className="group mt-auto inline-flex items-center gap-2 pt-6 text-[0.75rem] font-semibold tracking-[0.16em] uppercase">
                {n.link.label}
                <ArrowUpRight className="size-4 text-or transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            )}
          </article>
        </Reveal>
      ))}
    </div>
  );
}
